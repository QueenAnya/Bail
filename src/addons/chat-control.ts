/**
 * Chat Control Utilities
 * Ported from Baileys-Joss: TypingIndicator, ReadReceiptController, PinnedMessagesManager.
 */

// =====================================================
// TYPES
// =====================================================

export interface PinnedMessage {
	messageId: string
	jid: string
	pinnedAt: Date
	pinnedBy?: string
	expiresAt?: Date
}

export interface ReadReceiptConfig {
	enabled: boolean
	/** Delay in ms before marking as read */
	readDelay?: number
	/** JIDs to skip auto-read for */
	excludeJids?: string[]
}

/** Standard disappearing-message duration constants (in seconds) */
export const DISAPPEARING_DURATIONS = {
	OFF: 0,
	HOURS_24: 86400,
	DAYS_7: 604800,
	DAYS_90: 7776000
} as const

export type PresenceType = 'composing' | 'recording' | 'paused' | 'available' | 'unavailable'

// =====================================================
// TYPING INDICATOR
// =====================================================

/**
 * Typing / recording presence indicator helper.
 *
 * @example
 * const typing = createTypingIndicator(
 *     (jid, presence) => sock.sendPresenceUpdate(presence, jid)
 * )
 *
 * // Show typing for 2 s then send
 * await typing.simulateTyping(jid, 2000, () => sock.sendMessage(jid, { text: 'Hello!' }))
 *
 * // Manual control
 * await typing.startTyping(jid, { duration: 3000 })
 * await typing.stopTyping(jid)
 */
export class TypingIndicator {
	private intervals: Map<string, ReturnType<typeof setTimeout>> = new Map()
	private sendPresence: (jid: string, presence: PresenceType) => Promise<void>

	constructor(sendPresence: (jid: string, presence: PresenceType) => Promise<void>) {
		this.sendPresence = sendPresence
	}

	async startTyping(jid: string, options: { duration?: number; autoPause?: boolean } = {}): Promise<void> {
		this.stopTyping(jid) // clear any existing timer
		await this.sendPresence(jid, 'composing')
		if (options.autoPause !== false && options.duration) {
			const timeout = setTimeout(() => this.stopTyping(jid), options.duration)
			this.intervals.set(jid, timeout)
		}
	}

	async startRecording(jid: string, options: { duration?: number; autoPause?: boolean } = {}): Promise<void> {
		this.stopTyping(jid)
		await this.sendPresence(jid, 'recording')
		if (options.autoPause !== false && options.duration) {
			const timeout = setTimeout(() => this.stopTyping(jid), options.duration)
			this.intervals.set(jid, timeout)
		}
	}

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
		await new Promise(r => setTimeout(r, duration))
		await this.stopTyping(jid)
		return callback()
	}
}

// =====================================================
// PINNED MESSAGES MANAGER
// =====================================================

/**
 * Client-side pinned messages tracker.
 * WhatsApp protocol sends pin events via `messages.update`; this class stores them locally.
 */
export class PinnedMessagesManager {
	private pinnedMessages: Map<string, PinnedMessage[]> = new Map()

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

// =====================================================
// FACTORIES
// =====================================================

/** Create a TypingIndicator */
export const createTypingIndicator = (
	sendPresence: (jid: string, presence: PresenceType) => Promise<void>
): TypingIndicator => new TypingIndicator(sendPresence)

/** Create a PinnedMessagesManager */
export const createPinnedMessagesManager = (): PinnedMessagesManager => new PinnedMessagesManager()

/**
 * Create a read receipt controller.
 *
 * @example
 * const readCtrl = createReadReceiptController(
 *     (jid, participant, ids) => sock.readMessages(ids),
 *     { enabled: true, readDelay: 500 }
 * )
 *
 * sock.ev.on('messages.upsert', ({ messages }) => {
 *     for (const msg of messages) {
 *         readCtrl.markRead(msg.key.remoteJid!, msg.key.participant, [msg.key])
 *     }
 * })
 */
export const createReadReceiptController = (
	sendReadReceipt: (jid: string, participant: string | undefined, messageIds: unknown[]) => Promise<void>,
	config: ReadReceiptConfig = { enabled: true }
) => {
	let currentConfig: ReadReceiptConfig = { ...config }

	return {
		setConfig(newConfig: Partial<ReadReceiptConfig>) {
			currentConfig = { ...currentConfig, ...newConfig }
		},
		getConfig(): ReadReceiptConfig {
			return { ...currentConfig }
		},
		enable() {
			currentConfig.enabled = true
		},
		disable() {
			currentConfig.enabled = false
		},
		isEnabled(): boolean {
			return currentConfig.enabled
		},
		async markRead(jid: string, participant: string | undefined, messageIds: unknown[]): Promise<void> {
			if (!currentConfig.enabled) return
			if (currentConfig.excludeJids?.includes(jid)) return
			if (currentConfig.readDelay) {
				await new Promise(r => setTimeout(r, currentConfig.readDelay))
			}
			await sendReadReceipt(jid, participant, messageIds)
		},
		async forceMarkRead(jid: string, participant: string | undefined, messageIds: unknown[]): Promise<void> {
			await sendReadReceipt(jid, participant, messageIds)
		}
	}
}
