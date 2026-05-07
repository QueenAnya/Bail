/**
 * Message Scheduling System
 * Ported from innovatorssoft/Baileys
 *
 * Schedule messages to be sent automatically at specific times.
 */

import type { WAMessage } from '../Types'

export type ScheduledMessageStatus = 'pending' | 'sent' | 'failed' | 'cancelled'

export interface ScheduledMessage<T = unknown> {
	id: string
	jid: string
	content: T
	scheduledTime: Date
	createdAt: Date
	status: ScheduledMessageStatus
	messageId?: string
	error?: string
}

export interface SchedulerOptions<T = unknown> {
	maxQueue?: number
	checkInterval?: number
	onSent?: (scheduled: ScheduledMessage<T>, message: WAMessage | undefined) => void
	onFailed?: (scheduled: ScheduledMessage<T>, error: Error) => void
}

export class MessageScheduler<T = unknown> {
	private queue = new Map<string, ScheduledMessage<T>>()
	private timer: ReturnType<typeof setInterval> | null = null
	private readonly sendMessage: (jid: string, content: T) => Promise<WAMessage | undefined>
	private readonly options: Required<SchedulerOptions<T>>

	constructor(
		sendMessage: (jid: string, content: T) => Promise<WAMessage | undefined>,
		options: SchedulerOptions<T> = {}
	) {
		this.sendMessage = sendMessage
		this.options = {
			maxQueue: options.maxQueue ?? 1000,
			checkInterval: options.checkInterval ?? 1000,
			onSent: options.onSent ?? (() => {}),
			onFailed: options.onFailed ?? (() => {})
		}
	}

	private generateId(): string {
		return `sched_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	/** Schedule a message at an absolute Date/time (must be in the future) */
	schedule(jid: string, content: T, scheduledTime: Date): ScheduledMessage<T> {
		if (this.queue.size >= this.options.maxQueue) {
			throw new Error(`Maximum queue size (${this.options.maxQueue}) reached`)
		}
		if (scheduledTime.getTime() <= Date.now()) {
			throw new Error('Scheduled time must be in the future')
		}

		const scheduled: ScheduledMessage<T> = {
			id: this.generateId(),
			jid,
			content,
			scheduledTime,
			createdAt: new Date(),
			status: 'pending'
		}

		this.queue.set(scheduled.id, scheduled)
		this.ensureTimerRunning()
		return scheduled
	}

	/** Schedule a message with a delay (ms) from now */
	scheduleDelay(jid: string, content: T, delayMs: number): ScheduledMessage<T> {
		return this.schedule(jid, content, new Date(Date.now() + delayMs))
	}

	/** Cancel a pending scheduled message by ID */
	cancel(id: string): boolean {
		const s = this.queue.get(id)
		if (s && s.status === 'pending') {
			s.status = 'cancelled'
			this.queue.delete(id)
			return true
		}
		return false
	}

	/** Cancel all pending messages for a JID */
	cancelForJid(jid: string): number {
		let cancelled = 0
		for (const [id, s] of this.queue) {
			if (s.jid === jid && s.status === 'pending') {
				s.status = 'cancelled'
				this.queue.delete(id)
				cancelled++
			}
		}
		return cancelled
	}

	/** Return all pending scheduled messages */
	getPending(): ScheduledMessage<T>[] {
		return Array.from(this.queue.values()).filter(s => s.status === 'pending')
	}

	/** Get a scheduled message by ID */
	get(id: string): ScheduledMessage<T> | undefined {
		return this.queue.get(id)
	}

	/** Clear all pending messages and stop the timer */
	clearAll(): number {
		const count = this.queue.size
		this.queue.clear()
		this.stopTimer()
		return count
	}

	/** Stop the internal check timer */
	stop(): void {
		this.stopTimer()
	}

	/** Restart the timer (only has effect if the queue is non-empty) */
	start(): void {
		if (this.queue.size > 0) this.ensureTimerRunning()
	}

	private async processQueue(): Promise<void> {
		const now = Date.now()

		for (const [id, s] of this.queue) {
			if (s.status !== 'pending') continue
			if (s.scheduledTime.getTime() > now) continue

			try {
				const message = await this.sendMessage(s.jid, s.content)
				s.status = 'sent'
				s.messageId = message?.key?.id
				this.options.onSent(s, message)
			} catch (error) {
				s.status = 'failed'
				s.error = (error as Error).message
				this.options.onFailed(s, error as Error)
			}

			this.queue.delete(id)
		}

		if (this.queue.size === 0) this.stopTimer()
	}

	private ensureTimerRunning(): void {
		if (!this.timer) {
			this.timer = setInterval(() => this.processQueue(), this.options.checkInterval)
		}
	}

	private stopTimer(): void {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}
}

/** Factory helper — create and return a ready-to-use MessageScheduler */
export const createMessageScheduler = <T = unknown>(
	sendMessage: (jid: string, content: T) => Promise<WAMessage | undefined>,
	options?: SchedulerOptions<T>
): MessageScheduler<T> => new MessageScheduler<T>(sendMessage, options)
