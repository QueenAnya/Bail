/**
 * Message Scheduling System
 * Ported from Baileys-Joss / innovatorssoft.
 *
 * Features:
 *  - schedule(jid, content, Date)          — send at an absolute time
 *  - scheduleDelay(jid, content, delayMs)  — send after N milliseconds
 *  - cancel(id)                            — cancel by ID
 *  - cancelForJid(jid)                     — cancel all pending for a JID
 *  - getPending()                          — list all pending messages
 *  - get(id)                               — get a single scheduled entry
 *  - clearAll()                            — wipe the whole queue
 *  - stop()                                — stop the internal timer
 *  - start()                               — restart the timer
 */

import type { AnyMessageContent, WAMessage } from '../Types'

export type ScheduledMessageStatus = 'pending' | 'sent' | 'cancelled' | 'failed'

export interface ScheduledMessage {
	id: string
	jid: string
	content: AnyMessageContent
	scheduledTime: Date
	createdAt: Date
	status: ScheduledMessageStatus
	messageId?: string
	error?: string
}

export interface SchedulerOptions {
	/** Max number of queued messages (default: 1000) */
	maxQueue?: number
	/** How often to check the queue in ms (default: 1000) */
	checkInterval?: number
	/** Called after a message is sent */
	onSent?: (scheduled: ScheduledMessage, message: WAMessage | undefined) => void
	/** Called when a message fails to send */
	onFailed?: (scheduled: ScheduledMessage, error: Error) => void
}

export class MessageScheduler {
	private queue: Map<string, ScheduledMessage> = new Map()
	private timer: ReturnType<typeof setInterval> | null = null
	private sendMessage: (jid: string, content: AnyMessageContent) => Promise<WAMessage | undefined>
	private options: Required<SchedulerOptions>

	constructor(
		sendMessage: (jid: string, content: AnyMessageContent) => Promise<WAMessage | undefined>,
		options: SchedulerOptions = {}
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

	/**
	 * Schedule a message to be sent at a specific Date/time.
	 * @param jid           - Recipient JID
	 * @param content       - Message content
	 * @param scheduledTime - When to send (must be in the future)
	 */
	schedule(jid: string, content: AnyMessageContent, scheduledTime: Date): ScheduledMessage {
		if (this.queue.size >= this.options.maxQueue) {
			throw new Error(`Maximum queue size (${this.options.maxQueue}) reached`)
		}
		if (scheduledTime.getTime() <= Date.now()) {
			throw new Error('Scheduled time must be in the future')
		}

		const scheduled: ScheduledMessage = {
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

	/**
	 * Schedule a message with a delay from now.
	 * @param jid     - Recipient JID
	 * @param content - Message content
	 * @param delayMs - Delay in milliseconds
	 */
	scheduleDelay(jid: string, content: AnyMessageContent, delayMs: number): ScheduledMessage {
		return this.schedule(jid, content, new Date(Date.now() + delayMs))
	}

	/** Cancel a scheduled message by ID. Returns true if cancelled. */
	cancel(id: string): boolean {
		const scheduled = this.queue.get(id)
		if (scheduled && scheduled.status === 'pending') {
			scheduled.status = 'cancelled'
			this.queue.delete(id)
			return true
		}
		return false
	}

	/** Cancel all pending messages for a specific JID. Returns count cancelled. */
	cancelForJid(jid: string): number {
		let cancelled = 0
		for (const [id, scheduled] of this.queue) {
			if (scheduled.jid === jid && scheduled.status === 'pending') {
				scheduled.status = 'cancelled'
				this.queue.delete(id)
				cancelled++
			}
		}
		return cancelled
	}

	/** Get all pending scheduled messages. */
	getPending(): ScheduledMessage[] {
		return Array.from(this.queue.values()).filter(s => s.status === 'pending')
	}

	/** Get a scheduled message by ID. */
	get(id: string): ScheduledMessage | undefined {
		return this.queue.get(id)
	}

	/** Clear all pending messages and stop the timer. Returns count cleared. */
	clearAll(): number {
		const count = this.queue.size
		this.queue.clear()
		this.stopTimer()
		return count
	}

	private async processQueue(): Promise<void> {
		const now = Date.now()
		for (const [id, scheduled] of this.queue) {
			if (scheduled.status !== 'pending') continue
			if (scheduled.scheduledTime.getTime() > now) continue

			try {
				const message = await this.sendMessage(scheduled.jid, scheduled.content)
				scheduled.status = 'sent'
				scheduled.messageId = message?.key?.id ?? undefined
				this.options.onSent(scheduled, message)
			} catch (error) {
				scheduled.status = 'failed'
				scheduled.error = (error as Error).message
				this.options.onFailed(scheduled, error as Error)
			}

			this.queue.delete(id)
		}

		if (this.queue.size === 0) {
			this.stopTimer()
		}
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

	/** Stop the scheduler (timer cleared; queued entries remain). */
	stop(): void {
		this.stopTimer()
	}

	/**
	 * (Re)start the scheduler. Only needed after an explicit `stop()`.
	 * `schedule()` and `scheduleDelay()` auto-start the timer.
	 */
	start(): void {
		if (this.queue.size > 0) {
			this.ensureTimerRunning()
		}
	}
}

/**
 * Factory helper — creates and returns a ready-to-use MessageScheduler.
 *
 * @example
 * const scheduler = createMessageScheduler(
 *     (jid, content) => sock.sendMessage(jid, content),
 *     {
 *         onSent:   (s, msg) => console.log(`Sent to ${s.jid}`),
 *         onFailed: (s, err) => console.error(`Failed: ${err.message}`)
 *     }
 * )
 *
 * const entry = scheduler.schedule(jid, { text: 'Happy Birthday!' }, new Date('2026-12-25T09:00:00'))
 * scheduler.scheduleDelay(jid, { text: 'Reminder!' }, 30 * 60 * 1000)
 * scheduler.cancel(entry.id)
 */
export const createMessageScheduler = (
	sendMessage: (jid: string, content: AnyMessageContent) => Promise<WAMessage | undefined>,
	options?: SchedulerOptions
): MessageScheduler => new MessageScheduler(sendMessage, options)
