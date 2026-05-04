/**
 * Chat Control Utilities
 * Ported from InnovatorsSoft Baileys (chat-control.js).
 * Includes: TypingIndicator, PinnedMessagesManager, ReadReceiptController
 */

import type { PresenceData } from '../Types'

/** Standard disappearing-message duration constants (in seconds). */
export const DISAPPEARING_DURATIONS = {
	OFF: 0,
	HOURS_24: 86400,
	DAYS_7: 604800,
	DAYS_90: 7776000
} as const

export type DisappearingDuration = (typeof DISAPPEARING_DURATIONS)[keyof typeof DISAPPEARING_DURATIONS]

type PresenceType = 'composing' | 'recording' | 'paused' | 'available' | 'unavailable'
type SendPresenceFn = (jid: string, presence: PresenceType) => Promise<void>

/**
 * Typing / recording presence indicator helper.
 *
 * Wire in sock.sendPresenceUpdate to show/hide the "typing..." bubble.
 *
 * @example
 * const typing = createTypingIndicator(
 *     (jid, presence) => sock.sendPresenceUpdate(presence, jid)
 * )
 * await typing.simulateTyping(jid, 2000, () => sock.sendMessage(jid, { text: 'Hello!' }))
 */
export class TypingIndicator {
	private intervals: Map<string, ReturnType<typeof setTimeout>> = new Map()

	constructor(private sendPresence: SendPresenceFn) {}

	async startTyping(jid: string, options: { duration?: number; autoPause?: boolean } = {}) {
		this.stopTyping(jid)
		await this.sendPresence(jid, 'composing')

		if (options.autoPause !== false && options.duration) {
			const timeout = setTimeout(() => this.stopTyping(jid), options.duration)
			this.intervals.set(jid, timeout)
		}
	}

	async startRecording(jid: string, options: { duration?: number; autoPause?: boolean } = {}) {
		this.stopTyping(jid)
		await this.sendPresence(jid, 'recording')

		if (options.autoPause !== false && options.duration) {
			const timeout = setTimeout(() => this.stopTyping(jid), options.duration)
			this.intervals.set(jid, timeout)
		}
	}

	async stopTyping(jid: string) {
		const existing = this.intervals.get(jid)
		if (existing) {
			clearTimeout(existing)
			this.intervals.delete(jid)
		}
		try {
			await this.sendPresence(jid, 'paused')
		} catch {}
	}

	async stopAll() {
		for (const [jid] of this.intervals) {
			await this.stopTyping(jid)
		}
	}

	/**
	 * Show "typing..." for `duration` ms, run `callback`, then return its result.
	 */
	async simulateTyping<T>(jid: string, duration: number, callback: () => Promise<T>): Promise<T> {
		await this.startTyping(jid)
		await new Promise(r => setTimeout(r, duration))
		await this.stopTyping(jid)
		return callback()
	}
}

type PinnedMessage = {
	messageId: string
	jid: string
	pinnedAt: Date
	pinnedBy?: string
	expiresAt?: Date
}

/**
 * Client-side pinned messages tracker.
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

	clearPins(jid: string) {
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

type ReadReceiptConfig = {
	enabled?: boolean
	readDelay?: number
	excludeJids?: string[]
}

type SendReadReceiptFn = (jid: string, participant: string | null | undefined, messageIds: string[]) => Promise<void>

/**
 * Configurable read receipt controller — can throttle, delay, or disable read receipts.
 */
export const createReadReceiptController = (
	sendReadReceipt: SendReadReceiptFn,
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
			return currentConfig.enabled ?? true
		},
		async markRead(jid: string, participant: string | null | undefined, messageIds: string[]) {
			if (!currentConfig.enabled) return
			if (currentConfig.excludeJids?.includes(jid)) return
			if (currentConfig.readDelay) {
				await new Promise(r => setTimeout(r, currentConfig.readDelay))
			}
			await sendReadReceipt(jid, participant, messageIds)
		},
		async forceMarkRead(jid: string, participant: string | null | undefined, messageIds: string[]) {
			await sendReadReceipt(jid, participant, messageIds)
		}
	}
}

/** Factory — create a TypingIndicator */
export const createTypingIndicator = (sendPresence: SendPresenceFn) => new TypingIndicator(sendPresence)

/** Factory — create a PinnedMessagesManager */
export const createPinnedMessagesManager = () => new PinnedMessagesManager()
