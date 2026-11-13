/**
 * VoIP diagnostics and per-call timeline.
 *
 * Ported from innovatorssoft/baileys `lib/Voip/diagnostics.js` (MIT), rewritten in TypeScript for this codebase.
 *
 * What it does: one place to log VoIP events in a fixed shape, keep a bounded timeline per call so a failed call can
 * be reconstructed afterwards, and redact anything that looks like key material before it reaches a log line.
 *
 * What it deliberately does not do: the original appended every line to `voip-debug.log` in the process's working
 * directory. A library should not write files into a caller's cwd because a call happened, so that is off unless
 * `logFile` is passed explicitly.
 */
import { appendFileSync } from 'node:fs'

/** Attribute keys whose values must never reach a log line. */
const SENSITIVE_ATTR_KEYS = ['enc', 'token', 'secret', 'key', 'password', 'auth', 'private', 'credential'] as const

const isSensitiveKey = (key: unknown): boolean => {
	const k = String(key ?? '').toLowerCase()
	return SENSITIVE_ATTR_KEYS.some(s => k.includes(s))
}

/** Strips anything that is not a plain JID component, so a token pasted into a JID cannot leak. */
export const sanitizeJid = (jid: unknown): string => {
	if (!jid || typeof jid !== 'string') {
		return ''
	}

	const clean = jid.trim()
	if (!clean.includes('@')) {
		return clean
	}

	const [userPart = '', serverPart = ''] = clean.split('@')
	const [user = ''] = userPart.split(':')
	const device = userPart.includes(':') ? userPart.split(':')[1] : null
	const safeUser = user.replace(/[^a-zA-Z0-9._+-]/g, '')
	const safeDevice = device ? device.replace(/[^0-9]/g, '') : null
	const safeServer = serverPart.replace(/[^a-zA-Z0-9.-]/g, '')

	return safeDevice ? `${safeUser}:${safeDevice}@${safeServer}` : `${safeUser}@${safeServer}`
}

/** Keeps primitive, non-sensitive attributes and replaces the rest. */
export const summarizeAttrs = (attrs: Record<string, unknown> = {}): Record<string, unknown> => {
	if (!attrs || typeof attrs !== 'object') {
		return {}
	}

	const safe: Record<string, unknown> = {}
	for (const [k, v] of Object.entries(attrs)) {
		if (isSensitiveKey(k)) {
			safe[k] = '[REDACTED]'
		} else if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
			safe[k] = v
		}
	}

	return safe
}

export type NodeSummary = {
	tag: string
	attrs: Record<string, unknown>
	children: string[]
	childCount: number
	hasContent: boolean
	contentType: string
	contentLength?: number
}

/** Summarises a binary node without dumping buffers or sensitive attributes. */
export const summarizeNode = (node: any): NodeSummary | null => {
	if (!node || typeof node !== 'object') {
		return null
	}

	const childTags: string[] = Array.isArray(node.content)
		? node.content.map((c: any) => (c && typeof c === 'object' ? c.tag : null)).filter(Boolean)
		: []

	const isBufferContent = node.content instanceof Uint8Array || Buffer.isBuffer(node.content)

	return {
		tag: node.tag || '',
		attrs: summarizeAttrs(node.attrs),
		children: childTags,
		childCount: childTags.length,
		hasContent: Boolean(node.content),
		contentType: isBufferContent ? 'buffer' : typeof node.content,
		contentLength: isBufferContent ? node.content.length : undefined
	}
}

export type TimelineEntry = {
	time: number
	iso: string
	event: string
	elapsedMs: number
	details: Record<string, unknown>
}

type TimelineOptions = {
	/** entries kept per call, default 120 */
	maxEntriesPerCall?: number
	/** calls tracked before stale ones are dropped, default 300 */
	maxCalls?: number
	/** how long a finished call's timeline is kept, default 5 minutes */
	ttlMs?: number
}

/** Bounded per-call event log. Old entries fall off; stale calls are swept when the map grows. */
export class CallTimelineStore {
	private readonly timelines = new Map<string, TimelineEntry[]>()
	private readonly startTimes = new Map<string, number>()
	private readonly maxEntriesPerCall: number
	private readonly maxCalls: number
	private readonly ttlMs: number

	constructor(options: TimelineOptions = {}) {
		this.maxEntriesPerCall = options.maxEntriesPerCall ?? 120
		this.maxCalls = options.maxCalls ?? 300
		this.ttlMs = options.ttlMs ?? 5 * 60_000
	}

	record(callId: string, event: string, details: Record<string, unknown> = {}): void {
		if (!callId) {
			return
		}

		const now = Date.now()
		this.cleanupStale(now)

		if (!this.startTimes.has(callId)) {
			this.startTimes.set(callId, now)
			this.timelines.set(callId, [])
		}

		const entries = this.timelines.get(callId)!
		const startTime = this.startTimes.get(callId)!
		const elapsedMs = now - startTime

		if (entries.length >= this.maxEntriesPerCall) {
			entries.shift()
		}

		entries.push({
			time: now,
			iso: new Date(now).toISOString(),
			event,
			elapsedMs,
			details: details ? { ...details } : {}
		})
	}

	get(callId: string): TimelineEntry[] {
		return this.timelines.get(callId) ?? []
	}

	format(callId: string): string {
		const entries = this.get(callId)
		if (!entries.length) {
			return `[VOIP TIMELINE] callId=${callId} (no recorded events)`
		}

		const lines = [`=== VoIP Call Timeline: ${callId} ===`]
		for (const e of entries) {
			const timeStr = e.iso.substring(11, 23)
			const elapsedStr = `(+${e.elapsedMs}ms)`.padEnd(10)
			const detailStr = Object.keys(e.details).length ? ` ${JSON.stringify(e.details)}` : ''
			lines.push(`${timeStr} ${elapsedStr} ${e.event}${detailStr}`)
		}

		return lines.join('\n')
	}

	clear(callId: string): void {
		this.timelines.delete(callId)
		this.startTimes.delete(callId)
	}

	get size(): number {
		return this.timelines.size
	}

	private cleanupStale(now: number): void {
		if (this.timelines.size <= this.maxCalls) {
			return
		}

		for (const [id, start] of this.startTimes.entries()) {
			if (now - start > this.ttlMs) {
				this.clear(id)
			}
		}
	}
}

export type VoipLogInput = {
	level?: 'trace' | 'debug' | 'info' | 'warn' | 'error'
	component?: string
	event?: string
	direction?: string
	callId?: string
	correlationId?: string
	jid?: string
	tags?: string[] | null
	state?: string
	durationMs?: number
	error?: Error | string | null
	data?: Record<string, unknown>
}

export type VoipDiagnosticsOptions = {
	/** elevate `debug` lines to `info` so they surface in production logs */
	diagnostic?: boolean
	/** alias for `diagnostic` */
	debugVoip?: boolean
	/** append every formatted line to this file; off by default — a library must not write into the caller's cwd */
	logFile?: string
	maxEntriesPerCall?: number
	maxCalls?: number
	ttlMs?: number
}

/** Structured logging plus a per-call timeline. One instance is usually enough — see `voipDiagnostics`. */
export class VoipDiagnostics {
	private logger: any = null
	private diagnosticMode: boolean
	private readonly timeline: CallTimelineStore
	private readonly logFile?: string

	constructor(logger: any = null, options: VoipDiagnosticsOptions = {}) {
		this.logger = logger
		this.diagnosticMode = Boolean(
			options.diagnostic ?? options.debugVoip ?? (typeof process !== 'undefined' && process.env?.DEBUG_VOIP)
		)
		this.logFile = options.logFile
		this.timeline = new CallTimelineStore(options)
	}

	setLogger(logger: any): void {
		this.logger = logger
	}

	getLogger(): any {
		return this.logger
	}

	setDiagnosticMode(enabled: boolean): void {
		this.diagnosticMode = Boolean(enabled)
	}

	isDiagnosticMode(): boolean {
		return this.diagnosticMode
	}

	/** Formats and logs one event, and records it on the call's timeline when a call id is known. */
	log(input: VoipLogInput = {}): void {
		const {
			level = 'debug',
			component = 'VoIP',
			event = 'event',
			direction = 'internal',
			callId = '',
			correlationId = '',
			jid = '',
			tags = null,
			state = '',
			durationMs,
			error = null,
			data = {}
		} = input

		const effectiveCallId = callId || correlationId
		const nowIso = new Date().toISOString()
		const safeJid = sanitizeJid(jid)

		if (effectiveCallId) {
			this.timeline.record(effectiveCallId, `${component}.${event}`, {
				component,
				direction,
				...(state ? { state } : {}),
				...(safeJid ? { jid: safeJid } : {}),
				...(tags?.length ? { tags } : {}),
				...(durationMs !== undefined ? { durationMs } : {}),
				...(error ? { error: (error as any)?.message ?? String(error) } : {}),
				...(data && Object.keys(data).length ? summarizeAttrs(data) : {})
			})
		}

		const parts = [
			`[VOIP][${nowIso}][${level.toUpperCase()}]`,
			`component=${component}`,
			`event=${event}`,
			`dir=${direction}`
		]

		if (callId) {
			parts.push(`callId=${callId}`)
		} else if (correlationId) {
			parts.push(`corrId=${correlationId}`)
		}

		if (safeJid) parts.push(`jid=${safeJid}`)
		if (state) parts.push(`state=${state}`)
		if (tags?.length) parts.push(`tags=[${tags.join(',')}]`)
		if (durationMs !== undefined) parts.push(`duration=${durationMs}ms`)

		if (error) {
			const errStr = error instanceof Error ? error.stack || error.message : String(error)
			parts.push(`error="${errStr}"`)
		}

		const safeData = summarizeAttrs(data)
		if (Object.keys(safeData).length) {
			parts.push(`data=${JSON.stringify(safeData)}`)
		}

		const formatted = parts.join(' ')

		const structured = {
			voip: {
				timestamp: nowIso,
				component,
				event,
				direction,
				callId: callId || undefined,
				correlationId: correlationId || undefined,
				jid: safeJid || undefined,
				tags: tags?.length ? tags : undefined,
				state: state || undefined,
				durationMs,
				error: error ? ((error as any)?.message ?? String(error)) : undefined,
				data: Object.keys(safeData).length ? safeData : undefined
			}
		}

		const targetLevel = this.diagnosticMode && level === 'debug' ? 'info' : level

		try {
			if (this.logger) {
				const logFn = this.logger[targetLevel] || this.logger[level] || this.logger.info || this.logger.log
				if (typeof logFn === 'function') {
					logFn.call(this.logger, structured, formatted)
					this.appendToFile(formatted)
					return
				}
			}

			if (this.diagnosticMode || level === 'warn' || level === 'error') {
				const consoleFn = (console as any)[targetLevel] || (console as any)[level] || console.log
				consoleFn.call(console, formatted)
			}

			this.appendToFile(formatted)
		} catch {
			// logging must never throw into a call path
		}
	}

	recordTimeline(callId: string, step: string, details: Record<string, unknown> = {}): void {
		this.timeline.record(callId, step, details)
	}

	getTimeline(callId: string): TimelineEntry[] {
		return this.timeline.get(callId)
	}

	formatTimeline(callId: string): string {
		return this.timeline.format(callId)
	}

	dumpTimeline(callId: string, level: VoipLogInput['level'] = 'info'): string {
		const text = this.formatTimeline(callId)
		this.log({ level, component: 'Timeline', event: 'call_timeline_dump', callId, data: { timelineSummary: text } })
		return text
	}

	clearTimeline(callId: string): void {
		this.timeline.clear(callId)
	}

	private appendToFile(line: string): void {
		if (!this.logFile) {
			return
		}

		try {
			appendFileSync(this.logFile, `${line}\n`)
		} catch {
			// an unwritable log file must not break a call
		}
	}
}

/** One shared instance across module copies, so a second import does not start a second timeline. */
const GLOBAL_KEY = Symbol.for('baileys.voip.diagnostics')

export const voipDiagnostics: VoipDiagnostics =
	(globalThis as any)[GLOBAL_KEY] || ((globalThis as any)[GLOBAL_KEY] = new VoipDiagnostics())
