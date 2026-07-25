/**
 * Pinned Messages Manager & Disappearing Message Durations
 *
 * Source: @innovatorssoft/baileys (chat-control.js) — extracted pieces not
 * already covered by this fork's own typing-indicator.ts / read-receipt-controller.ts.
 */

/**
 * Standard disappearing-message duration constants (in seconds).
 * Pass to `sock.sendMessage(jid, { disappearingMessagesInChat: DISAPPEARING_DURATIONS.DAYS_7 })`.
 */
export const DISAPPEARING_DURATIONS = {
	/** Disable disappearing messages */
	OFF: 0,
	/** 24 hours */
	HOURS_24: 86_400,
	/** 7 days */
	DAYS_7: 604_800,
	/** 90 days */
	DAYS_90: 7_776_000
} as const

export type DisappearingDuration = (typeof DISAPPEARING_DURATIONS)[keyof typeof DISAPPEARING_DURATIONS]

export type PinnedMessage = {
	messageId: string
	jid: string
	pinnedAt: Date
	pinnedBy?: string
	expiresAt?: Date
}

/**
 * Client-side tracker for pinned messages.
 * Listen to `messages.update` for `pinInChatMessage` protocol messages and call
 * `manager.pin(jid, msgId, pinnedBy)` / `manager.unpin(jid, msgId)` accordingly.
 */
export class PinnedMessagesManager {
	private readonly store = new Map<string, PinnedMessage[]>()

	/**
	 * Record a newly pinned message.
	 * @returns The created pin entry
	 */
	pin(jid: string, messageId: string, pinnedBy?: string, expiresAt?: Date): PinnedMessage {
		const entry: PinnedMessage = { messageId, jid, pinnedAt: new Date(), pinnedBy, expiresAt }
		const existing = this.store.get(jid) ?? []
		// Remove any previous pin with the same message ID before re-adding
		const filtered = existing.filter(p => p.messageId !== messageId)
		filtered.push(entry)
		this.store.set(jid, filtered)
		return entry
	}

	/**
	 * Remove a pinned message.
	 * @returns `true` if the pin was found and removed, `false` otherwise
	 */
	unpin(jid: string, messageId: string): boolean {
		const existing = this.store.get(jid)
		if (!existing) return false
		const filtered = existing.filter(p => p.messageId !== messageId)
		if (filtered.length === existing.length) return false
		this.store.set(jid, filtered)
		return true
	}

	/** Get all pinned messages for a chat. */
	getPinned(jid: string): PinnedMessage[] {
		return this.store.get(jid) ?? []
	}

	/** Check if a message is pinned in a chat. */
	isPinned(jid: string, messageId: string): boolean {
		return (this.store.get(jid) ?? []).some(p => p.messageId === messageId)
	}

	/** Remove all pins for a chat. */
	clearPins(jid: string): void {
		this.store.delete(jid)
	}

	/**
	 * Evict pins whose `expiresAt` is in the past.
	 * @returns Number of expired pins removed
	 */
	clearExpired(): number {
		let cleared = 0
		const now = Date.now()
		for (const [jid, pins] of this.store) {
			const valid = pins.filter(p => !p.expiresAt || p.expiresAt.getTime() > now)
			cleared += pins.length - valid.length
			this.store.set(jid, valid)
		}

		return cleared
	}

	/** Total pin count across all chats. */
	get totalPins(): number {
		let total = 0
		for (const pins of this.store.values()) total += pins.length
		return total
	}
}

/** Factory — create a PinnedMessagesManager. */
export const createPinnedMessagesManager = (): PinnedMessagesManager => new PinnedMessagesManager()
