/**
 * Message Scheduler — schedule messages to be sent at future times
 * Part of innovatorssoft/baileys addons
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

export class MessageScheduler {
	private queue: Map<string, ScheduledMessage> = new Map()
	private timer: ReturnType<typeof setInterval> | null = null
	private sendMessage: SendMessageFunction
	private options: Required<SchedulerOptions>

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
			throw new Error(`Max queue size (${this.options.maxQueue}) reached`)
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
		return this.schedule(jid, content, new Date(Date.now() + delayMs))
	}

	cancel(id: string): boolean {
		const s = this.queue.get(id)
		if (s && s.status === 'pending') {
			s.status = 'cancelled'
			this.queue.delete(id)
			return true
		}
		return false
	}

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

	stop(): void {
		this.stopTimer()
	}

	start(): void {
		if (this.queue.size > 0) this.ensureTimerRunning()
	}

	private async processQueue(): Promise<void> {
		const now = Date.now()
		for (const [id, s] of this.queue) {
			if (s.status !== 'pending' || s.scheduledTime.getTime() > now) continue
			try {
				const message = await this.sendMessage(s.jid, s.content)
				s.status = 'sent'
				s.messageId = (message as any)?.key?.id
				this.options.onSent(s, message)
			} catch (error: any) {
				s.status = 'failed'
				s.error = error.message
				this.options.onFailed(s, error)
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

export const createMessageScheduler = (
	sendMessage: SendMessageFunction,
	options?: SchedulerOptions
): MessageScheduler => new MessageScheduler(sendMessage, options)
