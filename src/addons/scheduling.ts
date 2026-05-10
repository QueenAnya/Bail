/**
 * Message Scheduling System
 * Source: @innovatorssoft/baileys scheduling.js
 */
import type { AnyMessageContent } from '../Types/index.js'
import { proto } from '../../WAProto/index.js'

export type ScheduledMessageStatus = 'pending' | 'sent' | 'failed' | 'cancelled'
export type ScheduledMessage = {
	id: string
	jid: string
	content: AnyMessageContent
	scheduledTime: Date
	createdAt: Date
	status: ScheduledMessageStatus
	messageId?: string
	error?: string
}
export type SchedulerOptions = {
	maxQueue?: number
	checkInterval?: number
	onSent?: (s: ScheduledMessage, msg: proto.IWebMessageInfo | undefined) => void
	onFailed?: (s: ScheduledMessage, err: Error) => void
}

type SendMessageFn = (jid: string, content: AnyMessageContent) => Promise<proto.IWebMessageInfo | undefined>

export class MessageScheduler {
	private queue = new Map<string, ScheduledMessage>()
	private timer: ReturnType<typeof setInterval> | null = null
	private sendMessage: SendMessageFn
	private options: Required<SchedulerOptions>

	constructor(sendMessage: SendMessageFn, options: SchedulerOptions = {}) {
		this.sendMessage = sendMessage
		this.options = {
			maxQueue: options.maxQueue ?? 1000,
			checkInterval: options.checkInterval ?? 1000,
			onSent: options.onSent ?? (() => {}),
			onFailed: options.onFailed ?? (() => {})
		}
	}

	private generateId() {
		return `sched_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	schedule(jid: string, content: AnyMessageContent, scheduledTime: Date): ScheduledMessage {
		if (this.queue.size >= this.options.maxQueue)
			throw new Error(`Maximum queue size (${this.options.maxQueue}) reached`)
		if (scheduledTime.getTime() <= Date.now()) throw new Error('Scheduled time must be in the future')
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

	getPending() {
		return Array.from(this.queue.values()).filter(s => s.status === 'pending')
	}
	get(id: string) {
		return this.queue.get(id)
	}

	clearAll(): number {
		const count = this.queue.size
		this.queue.clear()
		this.stopTimer()
		return count
	}

	private async processQueue() {
		const now = Date.now()
		for (const [id, s] of this.queue) {
			if (s.status !== 'pending' || s.scheduledTime.getTime() > now) continue
			try {
				const message = await this.sendMessage(s.jid, s.content)
				s.status = 'sent'
				s.messageId = message?.key?.id ?? undefined
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

	private ensureTimerRunning() {
		if (!this.timer) this.timer = setInterval(() => this.processQueue(), this.options.checkInterval)
	}
	private stopTimer() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}
	stop() {
		this.stopTimer()
	}
	start() {
		if (this.queue.size > 0) this.ensureTimerRunning()
	}
}

export const createMessageScheduler = (sendMessage: SendMessageFn, options?: SchedulerOptions) =>
	new MessageScheduler(sendMessage, options)
