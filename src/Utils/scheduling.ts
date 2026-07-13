import type { AnyMessageContent, WAMessage } from '../Types'
import { randomBytes } from 'crypto'

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
	onSent?: (scheduled: ScheduledMessage, message: WAMessage) => void
	onFailed?: (scheduled: ScheduledMessage, error: Error) => void
}

export type SendMessageFunction = (jid: string, content: AnyMessageContent) => Promise<WAMessage | undefined>

export class MessageScheduler {
	private queue = new Map<string, ScheduledMessage>()
	private timer: NodeJS.Timeout | null = null
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
		return `sched_${Date.now()}_${randomBytes(3).toString('hex')}`
	}

	private startTimer() {
		if (this.timer) return
		this.timer = setInterval(() => this.tick(), this.options.checkInterval)
	}

	private stopTimer() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}

	private async tick() {
		const now = Date.now()
		const due = [...this.queue.values()].filter(m => m.status === 'pending' && m.scheduledTime.getTime() <= now)
		for (const entry of due) {
			try {
				const msg = await this.sendMessage(entry.jid, entry.content)
				entry.status = 'sent'
				entry.messageId = (msg as any)?.key?.id
				this.options.onSent(entry, msg!)
			} catch (err: any) {
				entry.status = 'failed'
				entry.error = err.message
				this.options.onFailed(entry, err)
			}
		}
		if ([...this.queue.values()].every(m => m.status !== 'pending')) this.stopTimer()
	}

	schedule(jid: string, content: AnyMessageContent, scheduledTime: Date): ScheduledMessage {
		if (scheduledTime.getTime() <= Date.now()) throw new Error('scheduledTime must be in the future')
		if (this.getPending().length >= this.options.maxQueue) throw new Error('Queue is full')
		const entry: ScheduledMessage = {
			id: this.generateId(),
			jid,
			content,
			scheduledTime,
			createdAt: new Date(),
			status: 'pending'
		}
		this.queue.set(entry.id, entry)
		this.startTimer()
		return entry
	}

	scheduleDelay(jid: string, content: AnyMessageContent, delayMs: number): ScheduledMessage {
		return this.schedule(jid, content, new Date(Date.now() + delayMs))
	}

	cancel(id: string): boolean {
		const entry = this.queue.get(id)
		if (!entry || entry.status !== 'pending') return false
		entry.status = 'cancelled'
		return true
	}

	cancelForJid(jid: string): number {
		let count = 0
		for (const entry of this.queue.values()) {
			if (entry.jid === jid && entry.status === 'pending') {
				entry.status = 'cancelled'
				count++
			}
		}
		return count
	}

	getPending(): ScheduledMessage[] {
		return [...this.queue.values()].filter(m => m.status === 'pending')
	}

	get(id: string): ScheduledMessage | undefined {
		return this.queue.get(id)
	}

	clearAll(): number {
		const count = this.getPending().length
		this.queue.clear()
		this.stopTimer()
		return count
	}

	stop() {
		this.stopTimer()
	}
	start() {
		if (this.getPending().length > 0) this.startTimer()
	}
}

export const createMessageScheduler = (
	sendMessage: SendMessageFunction,
	options?: SchedulerOptions
): MessageScheduler => new MessageScheduler(sendMessage, options)
