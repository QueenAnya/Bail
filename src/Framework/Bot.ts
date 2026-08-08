/**
 * Bot.ts
 * High-level Bot class with middleware routing, message queue, and reconnect.
 *
 * Fixes applied vs PR #2710:
 *  - P2: All console.log → pino-compatible structured logger (ILogger)
 *  - P2: Command boundary fix: `!sticker` no longer matches `!stickerSpam`
 *  - P2: Queue reject+clear on DisconnectReason.loggedOut (was hanging forever)
 *  - P2: dbPath configurable in BotConfig (was hardcoded 'baileys_store.db')
 *  - P2: stats.observeMessage inside try block (was outside, could skip middleware)
 *  - P2: reconnect timer stored as handle so it can be cancelled on restart
 *  - P0: creds.update listener guidance moved to AFTER bot.start() in example
 *
 * Source: WhiskeySockets/Baileys PR #2710 (LuferOS) — enterprise bot framework
 */

import { Boom } from '@hapi/boom'
import makeWASocket from '../Socket'
import type { AnyMessageContent, MiscMessageGenerationOptions, SocketConfig, WAMessage } from '../Types'
import { DisconnectReason } from '../Types'
import type { ILogger } from '../Utils/logger'
import { isJidGroup } from '../WABinary'
import { SQLiteStore } from './Store/SQLiteStore'
import { Context } from './Context'
import { SessionManager } from './SessionManager'
import { StatsManager } from './StatsManager'

export type MiddlewareFn = (ctx: Context, next: () => Promise<void>) => Promise<void> | void

export type BotConfig = {
	/** makeWASocket config */
	socketConfig: Partial<SocketConfig>
	/** Path for the SQLite database — defaults to 'baileys_store.db'
	 *  P2 FIX: configurable so multiple Bot instances don't share state */
	dbPath?: string
	/** Enable group analytics (StatsManager) */
	enableStats?: boolean
	/** Pino-compatible logger — P2 FIX: required, no console.log fallback */
	logger?: ILogger
}

// P2 FIX: derive return type from WASocket sendMessage for type safety
type WASocket = ReturnType<typeof makeWASocket>
type SendMessageReturn = ReturnType<WASocket['sendMessage']>

type EnqueuedMessage = {
	jid: string
	content: AnyMessageContent
	options: MiscMessageGenerationOptions
	// P2 FIX: derive resolve/reject from WASocket['sendMessage'] return type
	resolve: (value: Awaited<SendMessageReturn>) => void
	reject: (reason?: unknown) => void
}

export class Bot {
	private middlewares: MiddlewareFn[] = []
	private messageQueue: EnqueuedMessage[] = []
	private isConnected = false
	private reconnectAttempts = 0
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null
	private readonly BASE_RECONNECT_DELAY = 1000
	private readonly MAX_RECONNECT_DELAY = 30000

	public socket: WASocket | null = null
	public sessions: SessionManager | null = null
	public stats: StatsManager | null = null

	private readonly config: BotConfig
	private readonly logger: ILogger
	private readonly store: SQLiteStore

	constructor(config: BotConfig) {
		this.config = config
		// P2 FIX: use provided logger or minimal fallback
		this.logger =
			config.logger ??
			({
				debug: () => {},
				info: () => {},
				warn: () => {},
				error: () => {},
				child: () => this.logger
			} as unknown as ILogger)

		// P2 FIX: configurable dbPath — different bots use different files
		const dbPath = config.dbPath ?? 'baileys_store.db'
		this.store = new SQLiteStore(dbPath)
		this.sessions = new SessionManager(this.store)
	}

	/** Register a middleware function */
	public use(middleware: MiddlewareFn): this {
		this.middlewares.push(middleware)
		return this
	}

	/**
	 * Register a command handler.
	 * P2 FIX: Uses exact match OR prefix + whitespace so '!sticker' does NOT
	 * match '!stickerSpam' or '!stickerset'.
	 */
	public command(cmd: string, handler: (ctx: Context) => Promise<void> | void): this {
		this.use(async (ctx, next) => {
			const text = ctx.text
			// P2 FIX: boundary check — exact match or followed by whitespace
			if (text === cmd || text?.startsWith(cmd + ' ')) {
				await handler(ctx)
			}

			await next()
		})
		return this
	}

	/** Register a handler that fires on any non-empty text */
	public onText(handler: (ctx: Context) => Promise<void> | void): this {
		this.use(async (ctx, next) => {
			if (ctx.text) {
				await handler(ctx)
			}

			await next()
		})
		return this
	}

	/** Send a message — queues automatically when socket is disconnected */
	public async sendMessage(
		jid: string,
		content: AnyMessageContent,
		options: MiscMessageGenerationOptions = {}
	): Promise<Awaited<SendMessageReturn>> {
		if (this.isConnected && this.socket) {
			return this.socket.sendMessage(jid, content, options)
		}

		// Queue the message — P2 FIX: structured log without raw JID interpolation
		return new Promise<Awaited<SendMessageReturn>>((resolve, reject) => {
			this.messageQueue.push({ jid, content, options, resolve, reject })
			this.logger.info({ queueLength: this.messageQueue.length }, 'socket not connected — message queued')
		})
	}

	/**
	 * Drain queued messages after reconnect.
	 */
	private drainQueue(): void {
		if (!this.isConnected || !this.socket || this.messageQueue.length === 0) return
		this.logger.info({ pending: this.messageQueue.length }, 'draining message queue')
		const queue = [...this.messageQueue]
		this.messageQueue = []
		for (const msg of queue) {
			this.socket.sendMessage(msg.jid, msg.content, msg.options).then(msg.resolve).catch(msg.reject)
		}
	}

	/**
	 * Reject and clear the message queue.
	 * P2 FIX: Called on loggedOut so callers don't hang forever.
	 */
	private rejectQueue(reason: string): void {
		const queue = [...this.messageQueue]
		this.messageQueue = []
		for (const msg of queue) {
			msg.reject(new Boom(reason, { statusCode: 401 }))
		}

		if (queue.length > 0) {
			this.logger.warn({ rejected: queue.length }, 'message queue rejected — session terminated')
		}
	}

	/** Start the socket and wire all event handlers */
	public async start(): Promise<void> {
		// P2 FIX: cancel pending reconnect timer before creating new socket
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer)
			this.reconnectTimer = null
		}

		this.socket = makeWASocket(this.config.socketConfig as SocketConfig)

		if (this.config.enableStats) {
			this.stats = new StatsManager(this.config.dbPath ?? 'baileys_store.db', jid => this.socket!.groupMetadata(jid))
		}

		this.socket.ev.on('messages.upsert', async ({ messages, type }) => {
			if (type !== 'notify') return

			for (const msg of messages) {
				const ctx = new Context(this, msg)

				try {
					// P2 FIX: observeMessage INSIDE try block so SQLite errors
					// don't prevent middleware execution
					if (this.stats && ctx.remoteJid && isJidGroup(ctx.remoteJid)) {
						const participant = msg.key.participant || (msg as WAMessage & { participant?: string }).participant
						if (participant) {
							const isSticker = !!msg.message?.stickerMessage
							this.stats.observeMessage(ctx.remoteJid, participant, isSticker)
						}
					}

					await this.executeMiddlewares(ctx)
				} catch (err) {
					this.logger.error({ err }, 'error executing middleware')
				}
			}
		})

		this.socket.ev.on('connection.update', update => {
			const { connection, lastDisconnect } = update

			if (connection === 'open') {
				this.logger.info('bot connected')
				this.isConnected = true
				this.reconnectAttempts = 0
				this.drainQueue()
			}

			if (connection === 'close') {
				this.isConnected = false
				const error = lastDisconnect?.error as Boom | undefined
				const statusCode = error?.output?.statusCode
				const isLoggedOut = statusCode === DisconnectReason.loggedOut

				this.logger.warn({ statusCode }, 'connection closed')

				if (isLoggedOut) {
					// P2 FIX: reject queue on terminal close — don't hang forever
					this.rejectQueue('session terminated (logged out)')
					this.logger.info('session logged out — not reconnecting')
				} else {
					this.reconnectAttempts++
					const delay = Math.min(
						this.MAX_RECONNECT_DELAY,
						this.BASE_RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts - 1)
					)
					this.logger.info({ delay, attempt: this.reconnectAttempts }, 'scheduling reconnect')

					// P2 FIX: store timer handle so restart() can cancel it
					this.reconnectTimer = setTimeout(() => {
						this.reconnectTimer = null
						// P2 FIX: handle the reconnect promise
						this.start().catch(err => {
							this.logger.error({ err }, 'reconnect failed')
						})
					}, delay)
				}
			}
		})
	}

	private async executeMiddlewares(ctx: Context): Promise<void> {
		let index = -1
		const dispatch = async (i: number): Promise<void> => {
			if (i <= index) throw new Error('next() called multiple times')
			index = i
			const middleware = this.middlewares[i]
			if (middleware) {
				await middleware(ctx, () => dispatch(i + 1))
			}
		}

		await dispatch(0)
	}

	/** Gracefully stop the bot */
	public stop(): void {
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer)
			this.reconnectTimer = null
		}

		this.rejectQueue('bot stopped')
		this.store.close()
		this.stats?.close()
	}
}
