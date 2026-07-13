export const DISAPPEARING_DURATIONS = {
	OFF: 0,
	HOURS_24: 86400,
	DAYS_7: 604800,
	DAYS_90: 7776000
} as const

export interface TypingOptions {
	duration?: number
	autoPause?: boolean
}

export class TypingIndicator {
	private timers = new Map<string, NodeJS.Timeout>()
	private sendPresence: (jid: string, presence: 'composing' | 'paused' | 'recording') => Promise<void>

	constructor(sendPresence: (jid: string, presence: 'composing' | 'paused' | 'recording') => Promise<void>) {
		this.sendPresence = sendPresence
	}

	async startTyping(jid: string, options: TypingOptions = {}) {
		const { duration = 5000, autoPause = true } = options
		this.clearTimer(jid)
		await this.sendPresence(jid, 'composing')
		if (autoPause)
			this.timers.set(
				jid,
				setTimeout(() => this.sendPresence(jid, 'paused'), duration)
			)
	}

	async startRecording(jid: string, options: TypingOptions = {}) {
		const { duration = 5000, autoPause = true } = options
		this.clearTimer(jid)
		await this.sendPresence(jid, 'recording')
		if (autoPause)
			this.timers.set(
				jid,
				setTimeout(() => this.sendPresence(jid, 'paused'), duration)
			)
	}

	async stopTyping(jid: string) {
		this.clearTimer(jid)
		await this.sendPresence(jid, 'paused')
	}

	async stopAll() {
		for (const jid of this.timers.keys()) await this.stopTyping(jid)
	}

	async simulateTyping<T>(jid: string, duration: number, callback: () => Promise<T>): Promise<T> {
		await this.sendPresence(jid, 'composing')
		try {
			await new Promise(r => setTimeout(r, duration))
			return await callback()
		} finally {
			await this.sendPresence(jid, 'paused').catch(() => {})
		}
	}

	private clearTimer(jid: string) {
		const t = this.timers.get(jid)
		if (t) {
			clearTimeout(t)
			this.timers.delete(jid)
		}
	}
}

export interface PinnedMessage {
	messageId: string
	jid: string
	pinnedAt: Date
	pinnedBy?: string
	expiresAt?: Date
}

export class PinnedMessagesManager {
	private pins = new Map<string, PinnedMessage[]>()

	pin(jid: string, messageId: string, pinnedBy?: string, expiresAt?: Date): PinnedMessage {
		const pin: PinnedMessage = { messageId, jid, pinnedAt: new Date(), pinnedBy, expiresAt }
		const existing = this.pins.get(jid) || []
		existing.push(pin)
		this.pins.set(jid, existing)
		return pin
	}

	unpin(jid: string, messageId: string): boolean {
		const pins = this.pins.get(jid)
		if (!pins) return false
		const idx = pins.findIndex(p => p.messageId === messageId)
		if (idx === -1) return false
		pins.splice(idx, 1)
		return true
	}

	getPinned(jid: string): PinnedMessage[] {
		return this.pins.get(jid) || []
	}
	isPinned(jid: string, messageId: string): boolean {
		return this.getPinned(jid).some(p => p.messageId === messageId)
	}
	clearPins(jid: string) {
		this.pins.delete(jid)
	}
	clearExpired(): number {
		let count = 0
		const now = new Date()
		for (const [jid, pins] of this.pins.entries()) {
			const before = pins.length
			const filtered = pins.filter(p => !p.expiresAt || p.expiresAt > now)
			this.pins.set(jid, filtered)
			count += before - filtered.length
		}
		return count
	}
}

export interface ReadReceiptConfig {
	enabled: boolean
	autoRead?: boolean
	readDelay?: number
	excludeJids?: string[]
}

export const createTypingIndicator = (
	sendPresence: (jid: string, presence: 'composing' | 'paused' | 'recording') => Promise<void>
): TypingIndicator => new TypingIndicator(sendPresence)

export const createPinnedMessagesManager = (): PinnedMessagesManager => new PinnedMessagesManager()

export const createReadReceiptController = (
	sendReadReceipt: (jid: string, participant: string | undefined, messageIds: string[]) => Promise<void>,
	config: ReadReceiptConfig = { enabled: true }
) => {
	let cfg = { ...config }
	return {
		setConfig(newConfig: Partial<ReadReceiptConfig>) {
			cfg = { ...cfg, ...newConfig }
		},
		getConfig(): ReadReceiptConfig {
			return cfg
		},
		enable() {
			cfg.enabled = true
		},
		disable() {
			cfg.enabled = false
		},
		isEnabled(): boolean {
			return cfg.enabled
		},
		async markRead(jid: string, participant: string | undefined, messageIds: string[]) {
			if (!cfg.enabled) return
			if (cfg.excludeJids?.includes(jid)) return
			if (cfg.readDelay) await new Promise(r => setTimeout(r, cfg.readDelay))
			await sendReadReceipt(jid, participant, messageIds)
		},
		async forceMarkRead(jid: string, participant: string | undefined, messageIds: string[]) {
			await sendReadReceipt(jid, participant, messageIds)
		}
	}
}
