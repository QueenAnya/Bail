/**
 * Message Scheduling System
 * Source: @innovatorssoft/baileys (scheduling.js) — converted to TypeScript
 */

import type { WAMessage } from '../Types/index.js'

export interface ScheduledMessage {
	id: string
	jid: string
	content: any
	scheduledTime: Date
	createdAt: Date
	status: 'pending' | 'sent' | 'failed' | 'cancelled'
	messageId?: string
	error?: string
}

export interface SchedulerOptions {
	maxQueue?: number
	checkInterval?: number
	onSent?: (scheduled: ScheduledMessage, msg: WAMessage | undefined) => void
	onFailed?: (scheduled: ScheduledMessage, err: Error) => void
}

export class MessageScheduler {
	private queue = new Map<string, ScheduledMessage>()
	private timer: ReturnType<typeof setInterval> | null = null
	private sendMessage: (jid: string, content: any) => Promise<WAMessage | undefined>
	private options: Required<SchedulerOptions>

	constructor(sendFn: (jid: string, content: any) => Promise<WAMessage | undefined>, options: SchedulerOptions = {}) {
		this.sendMessage = sendFn
		this.options = {
			maxQueue: options.maxQueue ?? 1000,
			checkInterval: options.checkInterval ?? 1000,
			onSent: options.onSent ?? (() => {}),
			onFailed: options.onFailed ?? (() => {})
		}
	}

	private generateId = () => `sched_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

	schedule(jid: string, content: any, scheduledTime: Date): ScheduledMessage {
		if (this.queue.size >= this.options.maxQueue) throw new Error(`Max queue (${this.options.maxQueue}) reached`)
		if (scheduledTime.getTime() <= Date.now()) throw new Error('scheduledTime must be in the future')
		const entry: ScheduledMessage = {
			id: this.generateId(),
			jid,
			content,
			scheduledTime,
			createdAt: new Date(),
			status: 'pending'
		}
		this.queue.set(entry.id, entry)
		this.ensureRunning()
		return entry
	}

	scheduleDelay(jid: string, content: any, delayMs: number): ScheduledMessage {
		return this.schedule(jid, content, new Date(Date.now() + delayMs))
	}

	cancel(id: string): boolean {
		const entry = this.queue.get(id)
		if (entry?.status === 'pending') {
			entry.status = 'cancelled'
			this.queue.delete(id)
			return true
		}
		return false
	}

	cancelForJid(jid: string): number {
		let n = 0
		for (const [id, e] of this.queue) {
			if (e.jid === jid && e.status === 'pending') {
				e.status = 'cancelled'
				this.queue.delete(id)
				n++
			}
		}
		return n
	}

	getPending() {
		return Array.from(this.queue.values()).filter(e => e.status === 'pending')
	}
	get(id: string) {
		return this.queue.get(id)
	}
	clearAll(): number {
		const n = this.queue.size
		this.queue.clear()
		this.stopTimer()
		return n
	}
	stop() {
		this.stopTimer()
	}
	start() {
		if (this.queue.size > 0) this.ensureRunning()
	}

	private async processQueue() {
		const now = Date.now()
		for (const [id, e] of this.queue) {
			if (e.status !== 'pending' || e.scheduledTime.getTime() > now) continue
			try {
				const msg = await this.sendMessage(e.jid, e.content)
				e.status = 'sent'
				e.messageId = msg?.key?.id
				this.options.onSent(e, msg)
			} catch (err: any) {
				e.status = 'failed'
				e.error = err.message
				this.options.onFailed(e, err)
			}
			this.queue.delete(id)
		}
		if (this.queue.size === 0) this.stopTimer()
	}

	private ensureRunning() {
		if (!this.timer) this.timer = setInterval(() => this.processQueue(), this.options.checkInterval)
	}
	private stopTimer() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}
}

export const createMessageScheduler = (
	sendFn: (jid: string, content: any) => Promise<WAMessage | undefined>,
	options?: SchedulerOptions
) => new MessageScheduler(sendFn, options)
