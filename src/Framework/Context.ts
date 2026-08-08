/**
 * Context.ts
 * Message context helper — wraps a WAMessage with reply, react, session, and media helpers.
 *
 * Fixes applied vs PR #2710:
 *  - P1: `import makeWASocket` → `import type makeWASocket` (verbatimModuleSyntax)
 *  - P2: text getter now includes imageMessage.caption and videoMessage.caption
 *        so bot.command('!sticker') fires when user sends image with that caption.
 *  - P2: Session generics default to `unknown` not `any`.
 *  - P2: reply/react/replySticker/replyVoiceNote throw when remoteJid is
 *        missing instead of silently no-op'ing, so callers don't assume a
 *        message went out when it never did.
 *
 * Source: WhiskeySockets/Baileys PR #2710 (LuferOS) — enterprise bot framework
 */

// P1 FIX: import type — makeWASocket is used only as a type reference
import type makeWASocket from '../Socket'
import type { AnyMessageContent, MiscMessageGenerationOptions, WAMessage } from '../Types'
import type { Bot } from './Bot'
import { MediaManager, type StickerMetadata } from './MediaManager'

export type WASocket = ReturnType<typeof makeWASocket>

export class Context {
	public readonly message: WAMessage
	public readonly bot: Bot

	constructor(bot: Bot, message: WAMessage) {
		this.bot = bot
		this.message = message
	}

	get remoteJid(): string | null | undefined {
		return this.message.key.remoteJid
	}

	/**
	 * P2 FIX: Also extracts text from image/video captions so commands like
	 * `!sticker` sent as a caption on an image are properly matched.
	 */
	get text(): string | undefined {
		return (
			this.message.message?.conversation ||
			this.message.message?.extendedTextMessage?.text ||
			// P2 FIX: media captions
			this.message.message?.imageMessage?.caption ||
			this.message.message?.videoMessage?.caption ||
			this.message.message?.documentMessage?.caption ||
			undefined
		)
	}

	get quoted(): WAMessage['message'] {
		return this.message.message?.extendedTextMessage?.contextInfo?.quotedMessage
	}

	// P2 FIX: unknown default generics for session methods
	session<T = unknown>(): T | undefined {
		return this.bot.sessions?.get<T>(this.remoteJid || '')
	}

	setSession<T = unknown>(data: T): void {
		this.bot.sessions?.set<T>(this.remoteJid || '', data)
	}

	updateSession<T = unknown>(updater: (prev: T | undefined) => T): void {
		this.bot.sessions?.update<T>(this.remoteJid || '', updater)
	}

	clearSession(): void {
		this.bot.sessions?.delete(this.remoteJid || '')
	}

	async reply(content: AnyMessageContent, options?: MiscMessageGenerationOptions): Promise<void> {
		// Silently returning here would make a caller believe the reply went
		// out when it never did — throw instead so the failure is visible.
		if (!this.remoteJid) throw new Error('Cannot reply: remoteJid is undefined')
		await this.bot.sendMessage(
			this.remoteJid,
			{
				...content
				// inject quoted context so WA shows as a reply
			},
			{
				quoted: this.message,
				...options
			}
		)
	}

	async react(emoji: string): Promise<void> {
		if (!this.remoteJid) throw new Error('Cannot react: remoteJid is undefined')
		await this.bot.sendMessage(this.remoteJid, {
			react: { text: emoji, key: this.message.key }
		})
	}

	async replySticker(inputPathOrBuffer: string | Buffer, metadata?: StickerMetadata): Promise<void> {
		if (!this.remoteJid) throw new Error('Cannot reply: remoteJid is undefined')
		const buffer = await MediaManager.convertToSticker(inputPathOrBuffer, metadata)
		await this.reply({ sticker: buffer })
	}

	async replyVoiceNote(inputPathOrBuffer: string | Buffer): Promise<void> {
		if (!this.remoteJid) throw new Error('Cannot reply: remoteJid is undefined')
		const buffer = await MediaManager.convertToVoiceNote(inputPathOrBuffer)
		await this.reply({
			audio: buffer,
			mimetype: 'audio/ogg; codecs=opus',
			ptt: true
		})
	}
}
