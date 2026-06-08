/**
 * Message Scheduling System
 *
 * Source: @innovatorssoft/baileys (scheduling.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Schedule messages to be sent at specific times or after a delay,
 * with per-entry status tracking and callbacks.
 */

import type { WAMessage, AnyMessageContent } from '../Types/index.js'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ScheduledMessage = {
	id: string
	jid: string
	content: AnyMessageContent
	scheduledTime: Date
	createdAt: Date
	status: 'pending' | 'sent' | 'failed' | 'cancelled'
	messageId?: string
	error?: string
}

export type SchedulerOptions = {
	/** Maximum number of messages in the queue (default: 1000) */
	maxQueue?: number
	/** How often to check the queue in ms (default: 1000) */
	checkInterval?: number
	/** Called when a message is successfully sent */
	onSent?: (scheduled: ScheduledMessage, message: WAMessage | undefined) => void
	/** Called when sending fails */
	onFailed?: (scheduled: ScheduledMessage, error: Error) => void
}

// ─── MessageScheduler ─────────────────────────────────────────────────────────

export class MessageScheduler {
	private readonly queue = new Map<string, ScheduledMessage>()
	private timer: ReturnType<typeof setInterval> | null = null
	private readonly sendMessage: (jid: string, content: AnyMessageContent) => Promise<WAMessage | undefined>
	private readonly options: Required<SchedulerOptions>

	constructor(sendMessage: MessageScheduler['sendMessage'], options: SchedulerOptions = {}) {
		this.sendMessage = sendMessage
		this.options = {
			maxQueue: options.maxQueue ?? 1000,
			checkInterval: options.checkInterval ?? 1000,
			onSent: options.onSent ?? (() => undefined),
			onFailed: options.onFailed ?? (() => undefined)
		}
	}

	private generateId(): string {
		return `sched_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
	}

	/**
	 * Schedule a message for an absolute time.
	 * @throws if the queue is full or the time is in the past
	 */
	schedule(jid: string, content: AnyMessageContent, scheduledTime: Date): ScheduledMessage {
		if (this.queue.size >= this.options.maxQueue) {
			throw new Error(`Maximum queue size (${this.options.maxQueue}) reached`)
		}
		if (scheduledTime.getTime() <= Date.now()) {
			throw new Error('Scheduled time must be in the future')
		}
		const entry: ScheduledMessage = {
			id: this.generateId(),
			jid,
			content,
			scheduledTime,
			createdAt: new Date(),
			status: 'pending'
		}
		this.queue.set(entry.id, entry)
		this.ensureTimerRunning()
		return entry
	}

	/** Schedule a message after a delay from now (in milliseconds). */
	scheduleDelay(jid: string, content: AnyMessageContent, delayMs: number): ScheduledMessage {
		return this.schedule(jid, content, new Date(Date.now() + delayMs))
	}

	/** Cancel a pending message by ID. Returns true if cancelled. */
	cancel(id: string): boolean {
		const entry = this.queue.get(id)
		if (entry?.status === 'pending') {
			entry.status = 'cancelled'
			this.queue.delete(id)
			return true
		}
		return false
	}

	/** Cancel all pending messages for a JID. Returns the count cancelled. */
	cancelForJid(jid: string): number {
		let count = 0
		for (const [id, entry] of this.queue) {
			if (entry.jid === jid && entry.status === 'pending') {
				entry.status = 'cancelled'
				this.queue.delete(id)
				count++
			}
		}
		return count
	}

	/** Get all pending scheduled messages. */
	getPending(): ScheduledMessage[] {
		return Array.from(this.queue.values()).filter(s => s.status === 'pending')
	}

	/** Get a scheduled message by ID. */
	get(id: string): ScheduledMessage | undefined {
		return this.queue.get(id)
	}

	/** Clear all pending messages and stop the timer. Returns the count cleared. */
	clearAll(): number {
		const count = this.queue.size
		this.queue.clear()
		this.stopTimer()
		return count
	}

	/** Stop the scheduler timer (queue is preserved). */
	stop() {
		this.stopTimer()
	}

	/** Restart the scheduler timer (only has effect if the queue is non-empty). */
	start() {
		if (this.queue.size > 0) this.ensureTimerRunning()
	}

	private ensureTimerRunning() {
		if (!this.timer) {
			this.timer = setInterval(() => void this.processQueue(), this.options.checkInterval)
			this.timer.unref?.()
		}
	}

	private stopTimer() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}

	private async processQueue() {
		const now = Date.now()
		for (const [id, entry] of this.queue) {
			if (entry.status !== 'pending') continue
			if (entry.scheduledTime.getTime() > now) continue
			try {
				const message = await this.sendMessage(entry.jid, entry.content)
				entry.status = 'sent'
				entry.messageId = message?.key?.id
				this.options.onSent(entry, message)
			} catch (err) {
				entry.status = 'failed'
				entry.error = (err as Error).message
				this.options.onFailed(entry, err as Error)
			}
			this.queue.delete(id)
		}
		if (this.queue.size === 0) this.stopTimer()
	}
}

/** Factory helper. */
export const createMessageScheduler = (
	sendMessage: MessageScheduler['sendMessage'],
	options?: SchedulerOptions
): MessageScheduler => new MessageScheduler(sendMessage, options)
