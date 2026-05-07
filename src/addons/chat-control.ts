/**
 * Chat Control Utilities
 * Ported from innovatorssoft/Baileys
 *
 * Provides: TypingIndicator, PinnedMessagesManager, ReadReceiptController
 */

export const DISAPPEARING_DURATIONS = {
	OFF: 0,
	HOURS_24: 86400,
	DAYS_7: 604800,
	DAYS_90: 7776000
} as const

export type PresenceType = 'composing' | 'recording' | 'paused' | 'available' | 'unavailable'

export interface PinnedMessage {
	messageId: string
	jid: string
	pinnedAt: Date
	pinnedBy?: string
	expiresAt?: Date
}

export interface ReadReceiptConfig {
	enabled: boolean
	readDelay?: number
	excludeJids?: string[]
}

// ── TypingIndicator ───────────────────────────────────────────────────────────

/**
 * Show / hide the "typing…" or "recording…" presence indicator.
 *
 * @example
 * const typing = createTypingIndicator((jid, p) => sock.sendPresenceUpdate(p, jid))
 * await typing.simulateTyping(jid, 1500, () => sock.sendMessage(jid, { text: 'Hi!' }))
 */
export class TypingIndicator {
	private intervals = new Map<string, ReturnType<typeof setTimeout>>()

	constructor(private readonly sendPresence: (jid: string, presence: PresenceType) => Promise<void>) {}

	async startTyping(jid: string, options: { duration?: number; autoPause?: boolean } = {}): Promise<void> {
		this.clearTimer(jid)
		await this.sendPresence(jid, 'composing')

		if (options.autoPause !== false && options.duration) {
			const timeout = setTimeout(() => this.stopTyping(jid), options.duration)
			this.intervals.set(jid, timeout)
		}
	}

	async startRecording(jid: string, options: { duration?: number; autoPause?: boolean } = {}): Promise<void> {
		this.clearTimer(jid)
		await this.sendPresence(jid, 'recording')

		if (options.autoPause !== false && options.duration) {
			const timeout = setTimeout(() => this.stopTyping(jid), options.duration)
			this.intervals.set(jid, timeout)
		}
	}

	async stopTyping(jid: string): Promise<void> {
		this.clearTimer(jid)
		try {
			await this.sendPresence(jid, 'paused')
		} catch {}
	}

	async stopAll(): Promise<void> {
		for (const [jid] of this.intervals) await this.stopTyping(jid)
	}

	/**
	 * Show "typing…" for `duration` ms, run `callback`, return its result.
	 */
	async simulateTyping<T>(jid: string, duration: number, callback: () => Promise<T>): Promise<T> {
		await this.startTyping(jid)
		await new Promise(r => setTimeout(r, duration))
		await this.stopTyping(jid)
		return callback()
	}

	private clearTimer(jid: string): void {
		const existing = this.intervals.get(jid)
		if (existing) {
			clearTimeout(existing)
			this.intervals.delete(jid)
		}
	}
}

// ── PinnedMessagesManager ─────────────────────────────────────────────────────

export class PinnedMessagesManager {
	private pinnedMessages = new Map<string, PinnedMessage[]>()

	pin(jid: string, messageId: string, pinnedBy?: string, expiresAt?: Date): PinnedMessage {
		const pinned: PinnedMessage = { messageId, jid, pinnedAt: new Date(), pinnedBy, expiresAt }
		const existing = (this.pinnedMessages.get(jid) || []).filter(p => p.messageId !== messageId)
		existing.push(pinned)
		this.pinnedMessages.set(jid, existing)
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
			cleared += pins.length - valid.length
			this.pinnedMessages.set(jid, valid)
		}
		return cleared
	}
}

// ── ReadReceiptController ─────────────────────────────────────────────────────

export const createReadReceiptController = (
	sendReadReceipt: (jid: string, participant: string | undefined, messageIds: string[]) => Promise<void>,
	config: ReadReceiptConfig = { enabled: true }
) => {
	let currentConfig = { ...config }

	return {
		setConfig(newConfig: Partial<ReadReceiptConfig>) {
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
			return currentConfig.enabled
		},
		async markRead(jid: string, participant: string | undefined, messageIds: string[]) {
			if (!currentConfig.enabled) return
			if (currentConfig.excludeJids?.includes(jid)) return
			if (currentConfig.readDelay) {
				await new Promise(r => setTimeout(r, currentConfig.readDelay))
			}
			await sendReadReceipt(jid, participant, messageIds)
		},
		async forceMarkRead(jid: string, participant: string | undefined, messageIds: string[]) {
			await sendReadReceipt(jid, participant, messageIds)
		}
	}
}

// ── Factories ─────────────────────────────────────────────────────────────────

export const createTypingIndicator = (
	sendPresence: (jid: string, presence: PresenceType) => Promise<void>
): TypingIndicator => new TypingIndicator(sendPresence)

export const createPinnedMessagesManager = (): PinnedMessagesManager => new PinnedMessagesManager()
