/**
 * Message Scheduler
 * Schedule messages to be sent at a specific time or after a delay
 */

import type { AnyMessageContent, MiscMessageGenerationOptions } from '../Types'

export type ScheduledMessageJob = {
	/** Unique job ID */
	id: string
	/** Target JID */
	jid: string
	/** Message content */
	content: AnyMessageContent
	/** Options for sendMessage */
	options?: MiscMessageGenerationOptions
	/** Scheduled send time (ms since epoch) */
	sendAt: number
	/** Repeat interval in ms (0 = no repeat) */
	repeatIntervalMs?: number
	/** Max repeats (undefined = infinite) */
	maxRepeats?: number
	/** Current repeat count */
	repeatCount?: number
	/** Status */
	status: 'pending' | 'sent' | 'cancelled' | 'failed'
	/** Error if failed */
	error?: string
}

type SendFn = (jid: string, content: AnyMessageContent, options?: MiscMessageGenerationOptions) => Promise<any>

const jobs = new Map<string, ScheduledMessageJob>()
let timers = new Map<string, ReturnType<typeof setTimeout>>()
let sendFn: SendFn | null = null

/**
 * Attach the sendMessage function from a Baileys socket.
 * Must be called before scheduling any messages.
 */
export const attachSchedulerSendFn = (fn: SendFn): void => {
	sendFn = fn
}

const scheduleTimer = (job: ScheduledMessageJob): void => {
	const delay = Math.max(0, job.sendAt - Date.now())
	const timer = setTimeout(async () => {
		if (!sendFn) {
			job.status = 'failed'
			job.error = 'sendFn not attached'
			return
		}
		try {
			await sendFn(job.jid, job.content, job.options)
			job.status = 'sent'
		} catch (e: any) {
			job.status = 'failed'
			job.error = e?.message || String(e)
		}

		// Handle repeating jobs
		if (job.repeatIntervalMs && job.repeatIntervalMs > 0) {
			const nextCount = (job.repeatCount ?? 0) + 1
			if (job.maxRepeats === undefined || nextCount < job.maxRepeats) {
				job.repeatCount = nextCount
				job.sendAt = Date.now() + job.repeatIntervalMs
				job.status = 'pending'
				scheduleTimer(job)
			}
		}
	}, delay)

	timers.set(job.id, timer)
}

/**
 * Schedule a message to be sent at a specific time
 */
export const scheduleMessage = (params: {
	jid: string
	content: AnyMessageContent
	sendAt: Date | number
	options?: MiscMessageGenerationOptions
	repeatIntervalMs?: number
	maxRepeats?: number
	id?: string
}): ScheduledMessageJob => {
	const id = params.id || `sched_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
	const job: ScheduledMessageJob = {
		id,
		jid: params.jid,
		content: params.content,
		options: params.options,
		sendAt: params.sendAt instanceof Date ? params.sendAt.getTime() : params.sendAt,
		repeatIntervalMs: params.repeatIntervalMs,
		maxRepeats: params.maxRepeats,
		repeatCount: 0,
		status: 'pending'
	}
	jobs.set(id, job)
	scheduleTimer(job)
	return job
}

/**
 * Schedule a message to be sent after a delay (ms)
 */
export const scheduleMessageAfter = (params: {
	jid: string
	content: AnyMessageContent
	delayMs: number
	options?: MiscMessageGenerationOptions
	id?: string
}): ScheduledMessageJob => {
	return scheduleMessage({ ...params, sendAt: Date.now() + params.delayMs })
}

/**
 * Cancel a scheduled job
 */
export const cancelScheduledMessage = (id: string): boolean => {
	const job = jobs.get(id)
	if (!job) return false
	const timer = timers.get(id)
	if (timer) clearTimeout(timer)
	timers.delete(id)
	job.status = 'cancelled'
	return true
}

/**
 * Get a scheduled job by ID
 */
export const getScheduledMessage = (id: string): ScheduledMessageJob | undefined => jobs.get(id)

/**
 * Get all scheduled jobs
 */
export const getAllScheduledMessages = (): ScheduledMessageJob[] => [...jobs.values()]

/**
 * Get all pending scheduled jobs
 */
export const getPendingScheduledMessages = (): ScheduledMessageJob[] =>
	[...jobs.values()].filter(j => j.status === 'pending')

/**
 * Cancel all pending scheduled jobs
 */
export const cancelAllScheduledMessages = (): void => {
	for (const [id, timer] of timers.entries()) {
		clearTimeout(timer)
		const job = jobs.get(id)
		if (job && job.status === 'pending') job.status = 'cancelled'
	}
	timers.clear()
}
