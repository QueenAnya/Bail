/**
 * Standalone VoIP client — creates its OWN independent WhatsApp connection
 * (own auth directory, own QR scan) and exposes `connect()`/`call()`/
 * `disconnect()`, for cases where you want calling fully decoupled from your
 * main bot's session. For the common case (calling from your existing bot),
 * use `sock.initiateCall()` instead — every socket created via the standard
 * `makeWASocket()` factory already has it wired in (see `Socket/username.ts`
 * → `attachVoipToSocket`, `Voip/voip-engine.ts`).
 *
 * This is this fork's own internal port of baileys-caller's `VoipClient`
 * (https://github.com/SheIITear/baileys-caller, MIT, by ShellTear) — only
 * the "create a brand-new connection" part (auth state, socket creation,
 * QR display, auto-reconnect on the post-QR 515 stream-error path) is
 * reimplemented here. The actual WASM/signaling/relay/audio call
 * orchestration is NOT duplicated — it's shared with the same-session
 * integration via `sock.initiateCall()`, since `makeWASocket()` already
 * wires that in for every socket it creates.
 */
import { resolve } from 'path'
import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import { makeUsernameSocket } from '../Socket/username'
import { DisconnectReason } from '../Types'
import { useMultiFileAuthState } from '../Utils/use-multi-file-auth-state'
import type { VoipSdkConfig } from './types'
import type { InitiateCallOptions } from './voip-engine'

export type { VoipSdkConfig, CallOptions, CallEvents, AudioConfig } from './types'
export { CallState } from './types'
export type { ActiveCall } from './voip-engine'

type StandaloneSocket = ReturnType<typeof makeUsernameSocket>

const silentLogger = {
	level: 'silent',
	child: () => silentLogger,
	trace: () => {},
	debug: () => {},
	info: () => {},
	warn: () => {},
	error: () => {},
	fatal: () => {}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

/**
 * Top-level standalone client. Connects to WhatsApp on its own dedicated
 * session and lets you place calls.
 */
export class VoipClient {
	readonly #config: VoipSdkConfig
	#sock: StandaloneSocket | null = null

	constructor(config: VoipSdkConfig) {
		this.#config = config
	}

	/** Connect to WhatsApp on a fresh, independent session. */
	connect = async (): Promise<void> => {
		const authDir = resolve(this.#config.authDir)
		const { state, saveCreds } = await useMultiFileAuthState(authDir)

		const createSocket = () =>
			makeUsernameSocket({
				...DEFAULT_CONNECTION_CONFIG,
				auth: state,
				emitOwnEvents: true,
				logger: silentLogger
			})

		// Connect with auto-reconnect on the post-QR 515 stream-error path.
		await new Promise<void>((resolveOpen, rejectOpen) => {
			let opened = false
			let retries = 0
			const maxRetries = 5

			const connectSocket = () => {
				this.#sock = createSocket()
				this.#sock.ev.on('creds.update', saveCreds)

				this.#sock.ev.on('connection.update', update => {
					if (update.qr) {
						const qr = update.qr
						void import('qrcode-terminal')
							.then(qrt => {
								const generate = (qrt as { default?: { generate: (qr: string, opts: { small: boolean }) => void } })
									.default?.generate
								generate?.(qr, { small: true })
							})
							.catch(() => {
								console.log('Scan this QR code in WhatsApp > Linked Devices:')
								console.log(qr)
							})
					}

					if (update.connection === 'open') {
						opened = true
						resolveOpen()
						return
					}

					if (update.connection === 'close' && !opened) {
						const statusCode = (update.lastDisconnect?.error as { output?: { statusCode?: number } })?.output
							?.statusCode
						const shouldReconnect = statusCode === 515 || statusCode === DisconnectReason.restartRequired

						if (shouldReconnect && retries < maxRetries) {
							retries += 1
							setTimeout(connectSocket, 1000)
						} else {
							rejectOpen(update.lastDisconnect?.error ?? new Error('socket closed before open'))
						}
					}
				})
			}

			connectSocket()
		})
	}

	/** Place an outbound voice call. Delegates to `sock.initiateCall()`,
	 *  already wired in by `makeWASocket()`'s standard socket composition.
	 *  Safe to call multiple times concurrently — see `callMany`. */
	call = async (phoneNumber: string, opts: InitiateCallOptions = {}) => {
		if (!this.#sock) throw new Error('Not connected. Call connect() first.')
		return this.#sock.initiateCall(phoneNumber, opts)
	}

	/** Place several outbound calls concurrently. */
	callMany = async (requests: Array<{ jid: string; options?: InitiateCallOptions }>) => {
		if (!this.#sock) throw new Error('Not connected. Call connect() first.')
		return this.#sock.initiateCalls(requests)
	}

	/** Snapshot of every call currently open on this client's socket. */
	getActiveCalls = async () => {
		if (!this.#sock) throw new Error('Not connected. Call connect() first.')
		return this.#sock.getActiveCalls()
	}

	/** Look up one specific open call by its callId. */
	getCall = async (callId: string) => {
		if (!this.#sock) throw new Error('Not connected. Call connect() first.')
		return this.#sock.getCall(callId)
	}

	getActiveCallCount = async () => {
		if (!this.#sock) throw new Error('Not connected. Call connect() first.')
		return this.#sock.getActiveCallCount()
	}

	/** Ends one specific call by callId. */
	endCall = async (callId: string) => {
		if (!this.#sock) throw new Error('Not connected. Call connect() first.')
		return this.#sock.endCall(callId)
	}

	/** Ends every call currently open on this client's socket. */
	endAllCalls = async () => {
		if (!this.#sock) throw new Error('Not connected. Call connect() first.')
		return this.#sock.endAllCalls()
	}

	/** Adjusts socket-level VoIP limits, e.g. `{ maxConcurrentCalls: 10 }`. */
	setOptions = async (options: { maxConcurrentCalls?: number }) => {
		if (!this.#sock) throw new Error('Not connected. Call connect() first.')
		return this.#sock.setVoipOptions(options)
	}

	/** Tear down the WhatsApp socket and release VoIP resources. */
	disconnect = (): void => {
		this.#sock?.disconnectVoip?.()
		void this.#sock?.end?.(undefined)
		this.#sock = null
	}
}

/**
 * Creates and connects a dedicated, standalone VoIP session.
 *
 * @example
 * const voip = await createVoipClient({ authDir: './voip_auth' })
 * const call = await voip.call('12345678901', { audioSource: './hello.mp3' })
 * call.on('connected', () => console.log('call connected'))
 * call.on('ended', reason => console.log('call ended:', reason))
 */
export const createVoipClient = async (config: VoipSdkConfig): Promise<VoipClient> => {
	const client = new VoipClient(config)
	await client.connect()
	return client
}
