/**
 * Message Scheduling System
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * Schedule messages to be sent automatically at specific times.
 */

import type { AnyMessageContent, WAMessage } from '../Types'

export interface ScheduledMessage {
	id: string
	jid: string
	content: AnyMessageContent
	scheduledTime: Date
	createdAt: Date
	status: 'pending' | 'sent' | 'failed' | 'cancelled'
	error?: string
	messageId?: string
}

export interface SchedulerOptions {
	maxQueue?: number
	checkInterval?: number
	onSent?: (scheduled: ScheduledMessage, message: WAMessage | undefined) => void
	onFailed?: (scheduled: ScheduledMessage, error: Error) => void
}

export type SendMessageFunction = (jid: string, content: AnyMessageContent) => Promise<WAMessage | undefined>

type FullSchedulerOptions = Required<SchedulerOptions>

export class MessageScheduler {
	private queue = new Map<string, ScheduledMessage>()
	private timer: NodeJS.Timeout | null = null
	private sendMessage: SendMessageFunction
	private options: FullSchedulerOptions

	constructor(sendMessage: SendMessageFunction, options: SchedulerOptions = {}) {
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

	scheduleDelay(jid: string, content: AnyMessageContent, delayMs: number): ScheduledMessage {
		const scheduledTime = new Date(Date.now() + delayMs)
		return this.schedule(jid, content, scheduledTime)
	}

	cancel(id: string): boolean {
		const scheduled = this.queue.get(id)
		if (scheduled && scheduled.status === 'pending') {
			scheduled.status = 'cancelled'
			this.queue.delete(id)
			return true
		}

		return false
	}

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

	getPending(): ScheduledMessage[] {
		return Array.from(this.queue.values()).filter(s => s.status === 'pending')
	}

	get(id: string): ScheduledMessage | undefined {
		return this.queue.get(id)
	}

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

	stop(): void {
		this.stopTimer()
	}

	start(): void {
		if (this.queue.size > 0) {
			this.ensureTimerRunning()
		}
	}
}

export const createMessageScheduler = (
	sendMessage: SendMessageFunction,
	options?: SchedulerOptions
): MessageScheduler => {
	return new MessageScheduler(sendMessage, options)
}
