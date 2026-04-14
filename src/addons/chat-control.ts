/**
 * Chat Control Utilities
 * Ported from innovatorssoft/Baileys to TypeScript
 * Includes: TypingIndicator, PinnedMessagesManager, ReadReceiptController
 */

import type { WAPresence } from '../Types'

// ── Types ──────────────────────────────────────────────────────────────────

export interface TypingIndicatorOptions {
	/** Auto-pause after this many ms */
	duration?: number
	/** Whether to auto-pause (default: true) */
	autoPause?: boolean
}

export interface ReadReceiptConfig {
	enabled?: boolean
	/** Delay in ms before marking as read */
	readDelay?: number
	/** JIDs to exclude from auto read receipts */
	excludeJids?: string[]
}

export interface PinnedMessage {
	messageId: string
	jid: string
	pinnedAt: Date
	pinnedBy?: string
	expiresAt?: Date
}

// ── Standard disappearing-message duration constants (seconds) ────────────

export const DISAPPEARING_DURATIONS = {
	OFF: 0,
	HOURS_24: 86400,
	DAYS_7: 604800,
	DAYS_90: 7776000
} as const

// ── TypingIndicator ────────────────────────────────────────────────────────

/**
 * Typing / recording presence indicator helper.
 *
 * @example
 * const typing = createTypingIndicator(
 *     (jid, presence) => sock.sendPresenceUpdate(presence, jid)
 * )
 * await typing.simulateTyping(jid, 2000, () => sock.sendMessage(jid, { text: 'Hello!' }))
 */
export class TypingIndicator {
	private intervals = new Map<string, ReturnType<typeof setTimeout>>()
	private sendPresence: (jid: string, presence: WAPresence) => Promise<void>

	constructor(sendPresence: (jid: string, presence: WAPresence) => Promise<void>) {
		this.sendPresence = sendPresence
	}

	/** Start the composing (typing) indicator for a JID. */
	async startTyping(jid: string, options: TypingIndicatorOptions = {}): Promise<void> {
		this.stopTyping(jid)
		await this.sendPresence(jid, 'composing')

		if (options.autoPause !== false && options.duration) {
			const timeout = setTimeout(() => this.stopTyping(jid), options.duration)
			this.intervals.set(jid, timeout)
		}
	}

	/** Start the recording (voice note) indicator for a JID. */
	async startRecording(jid: string, options: TypingIndicatorOptions = {}): Promise<void> {
		this.stopTyping(jid)
		await this.sendPresence(jid, 'recording')

		if (options.autoPause !== false && options.duration) {
			const timeout = setTimeout(() => this.stopTyping(jid), options.duration)
			this.intervals.set(jid, timeout)
		}
	}

	/** Stop the typing / recording indicator for a JID. */
	async stopTyping(jid: string): Promise<void> {
		const existing = this.intervals.get(jid)
		if (existing) {
			clearTimeout(existing)
			this.intervals.delete(jid)
		}
		try {
			await this.sendPresence(jid, 'paused')
		} catch {}
	}

	/** Stop all active typing indicators. */
	async stopAll(): Promise<void> {
		for (const [jid] of this.intervals) {
			await this.stopTyping(jid)
		}
	}

	/**
	 * Show "typing..." for `duration` ms, run `callback`, then return its result.
	 *
	 * @example
	 * const sent = await typing.simulateTyping(jid, 1500, () =>
	 *     sock.sendMessage(jid, { text: 'Here is your answer!' })
	 * )
	 */
	async simulateTyping<T>(jid: string, duration: number, callback: () => Promise<T>): Promise<T> {
		await this.startTyping(jid)
		await new Promise<void>(r => setTimeout(r, duration))
		await this.stopTyping(jid)
		return callback()
	}
}

// ── PinnedMessagesManager ──────────────────────────────────────────────────

/**
 * Client-side pinned messages tracker.
 * WhatsApp sends pin events via `messages.update`; this class stores them locally.
 */
export class PinnedMessagesManager {
	private pinnedMessages = new Map<string, PinnedMessage[]>()

	pin(jid: string, messageId: string, pinnedBy?: string, expiresAt?: Date): PinnedMessage {
		const pinned: PinnedMessage = { messageId, jid, pinnedAt: new Date(), pinnedBy, expiresAt }
		const existing = this.pinnedMessages.get(jid) || []
		const filtered = existing.filter(p => p.messageId !== messageId)
		filtered.push(pinned)
		this.pinnedMessages.set(jid, filtered)
		return pinned
	}

	unpin(jid: string, messageId: string): boolean {
		const existing = this.pinnedMessages.get(jid)
		if (!existing) return false
		const filtered = existing.filter(p => p.messageId !== messageId)
		if (filtered.length === existing.length) return false
		this.pinnedMessages.set(jid, filtered)
		return true
	}

	getPinned(jid: string): PinnedMessage[] {
		return this.pinnedMessages.get(jid) || []
	}

	isPinned(jid: string, messageId: string): boolean {
		return (this.pinnedMessages.get(jid) || []).some(p => p.messageId === messageId)
	}

	clearPins(jid: string): void {
		this.pinnedMessages.delete(jid)
	}

	/** Remove expired pins and return the count of cleared pins. */
	clearExpired(): number {
		let cleared = 0
		const now = Date.now()
		for (const [jid, pins] of this.pinnedMessages) {
			const valid = pins.filter(p => !p.expiresAt || p.expiresAt.getTime() > now)
			if (valid.length < pins.length) {
				cleared += pins.length - valid.length
				this.pinnedMessages.set(jid, valid)
			}
		}
		return cleared
	}
}

// ── ReadReceiptController ──────────────────────────────────────────────────

export interface ReadReceiptController {
	setConfig(config: Partial<ReadReceiptConfig>): void
	getConfig(): ReadReceiptConfig
	enable(): void
	disable(): void
	isEnabled(): boolean
	markRead(jid: string, participant: string | undefined, messageIds: string[]): Promise<void>
	forceMarkRead(jid: string, participant: string | undefined, messageIds: string[]): Promise<void>
}

// ── Factory functions ──────────────────────────────────────────────────────

/** Create a TypingIndicator instance. */
export const createTypingIndicator = (
	sendPresence: (jid: string, presence: WAPresence) => Promise<void>
): TypingIndicator => new TypingIndicator(sendPresence)

/** Create a PinnedMessagesManager instance. */
export const createPinnedMessagesManager = (): PinnedMessagesManager => new PinnedMessagesManager()

/**
 * Create a read receipt controller.
 *
 * @example
 * const rc = createReadReceiptController(
 *     (jid, participant, ids) => sock.readMessages([{ remoteJid: jid, id: ids[0], participant }])
 * )
 * rc.disable() // pause read receipts temporarily
 * await rc.markRead(jid, undefined, [messageId])
 */
export const createReadReceiptController = (
	sendReadReceipt: (jid: string, participant: string | undefined, messageIds: string[]) => Promise<void>,
	config: ReadReceiptConfig = { enabled: true }
): ReadReceiptController => {
	let currentConfig: ReadReceiptConfig = { ...config }

	return {
		setConfig(newConfig) {
			currentConfig = { ...currentConfig, ...newConfig }
		},
		getConfig() {
			return { ...currentConfig }
		},
		enable() {
			currentConfig.enabled = true
		},
		disable() {
			currentConfig.enabled = false
		},
		isEnabled() {
			return currentConfig.enabled ?? true
		},
		async markRead(jid, participant, messageIds) {
			if (!currentConfig.enabled) return
			if (currentConfig.excludeJids?.includes(jid)) return
			if (currentConfig.readDelay) {
				await new Promise<void>(r => setTimeout(r, currentConfig.readDelay))
			}
			await sendReadReceipt(jid, participant, messageIds)
		},
		async forceMarkRead(jid, participant, messageIds) {
			await sendReadReceipt(jid, participant, messageIds)
		}
	}
}
