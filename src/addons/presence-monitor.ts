/**
 * presence-monitor.ts
 * Source: @innovatorssoft/baileys fork (lib/Utils/presence-monitor.js + .d.ts)
 *
 * Monitors online/offline presence transitions for one or more WhatsApp
 * contacts. Consumes the existing `presence.update` event emitted by the
 * socket and automatically calls `sock.presenceSubscribe` on start (and on
 * reconnect, if `autoResubscribe` is enabled). No polling, no duplicate
 * low-level WS listeners.
 *
 * PN/LID behavior:
 *   - Tries PN subscription first.
 *   - If a `signalRepository.lidMapping` is available, uses `getLIDForPN(pn)`
 *     as the documented fallback mechanism for PN→LID resolution, falling
 *     back further to `onWhatsApp` if that cache misses.
 *   - Also listens for `lid-mapping.update` events to re-subscribe with the
 *     newly resolved LID when a mapping arrives asynchronously.
 *   - Matches presence event participants with `areJidsSameUser` so updates
 *     arrive for the same user whether emitted as a PN or a LID.
 *
 * Last-seen:
 *   - Only exposed via `lastSeen` when the underlying `PresenceData`
 *     actually includes a numeric `lastSeen` value (WhatsApp protocol /
 *     privacy permitting). `offlineAt` is NEVER reported as `lastSeen`.
 *
 * Session semantics:
 *   - A session is `available → unavailable` only.
 *   - Duplicate `available` or `unavailable` events are idempotent (no
 *     duplicate online/offline/session emissions).
 *   - Receiving `unavailable` with no prior online state is a no-op for
 *     session bookkeeping (status updates to offline but no fake duration /
 *     no session event).
 *   - Socket reconnects do NOT fabricate fake transitions; subscriptions are
 *     renewed (if configured) and the monitor waits for the next real event.
 *
 * @example
 * ```ts
 * const monitor = monitorPresence(sock, '923001234567@s.whatsapp.net', {
 *     logToConsole: true,
 *     autoResubscribe: true,
 *     timezone: '+05:00'
 * })
 *
 * monitor.on('online',  data => console.log('ONLINE ', data))
 * monitor.on('offline', data => console.log('OFFLINE', data))
 * monitor.on('session', s    => console.log('SESSION', s))
 * monitor.on('error',   err  => console.error(err))
 *
 * // Later:
 * // monitor.stop()
 * ```
 */
import type { LIDMappingStore } from '../Signal/lid-mapping'
import type { PresenceData } from '../Types/Chat'
import type { BaileysEventEmitter } from '../Types/Events'
import { areJidsSameUser, isPnUser, jidNormalizedUser } from '../WABinary'

export type PresenceStatus = 'online' | 'offline'

export interface PresenceMonitorOptions {
	/**
	 * Log transitions to console in the format:
	 * `[Presence] <jid> is ONLINE/OFFLINE at <time>` / `[Presence] Online duration: HH:MM:SS`
	 *
	 * @default false
	 */
	logToConsole?: boolean
	/**
	 * Automatically re-subscribe presence after the socket reconnects
	 * (when `connection.update` fires with `connection === 'open'`).
	 *
	 * @default false
	 */
	autoResubscribe?: boolean
	/**
	 * Optional timezone for display formatting, e.g. `'+05:00'` or `'-03:00'`.
	 * Only affects presentation formatting; timestamps remain as reliable epoch values.
	 */
	timezone?: string
	/**
	 * Treat an incoming message from a watched contact as an `available` presence signal
	 * (useful when WhatsApp does not push presence updates for that contact).
	 *
	 * @default false
	 */
	trackMessagesAsPresence?: boolean
}

export interface PresenceOnlineEvent {
	/** The JID as originally requested by the caller */
	jid: string
	status: 'online'
	/** Epoch ms when the online transition was observed */
	onlineAt: number
	/**
	 * If the underlying presence payload carried an actual WhatsApp `lastSeen` timestamp
	 * (unix seconds), it is exposed here. Otherwise the property is omitted.
	 *
	 * This field is controlled by WhatsApp privacy settings and may not be available.
	 * It is NEVER inferred from `offlineAt`.
	 */
	lastSeen?: number
}

export interface PresenceOfflineEvent {
	/** The JID as originally requested by the caller */
	jid: string
	status: 'offline'
	onlineAt: number
	/** Epoch ms when the offline transition was observed */
	offlineAt: number
	/** Session duration in milliseconds */
	durationMs: number
	/** Session duration formatted as `HH:MM:SS` (hours do not wrap at 24) */
	duration: string
	/** Actual WhatsApp lastSeen if present on the underlying event; otherwise omitted */
	lastSeen?: number
}

export interface PresenceSessionSummary extends PresenceOfflineEvent {
	status: 'offline'
}

export interface PresenceStateView {
	jid: string
	status: PresenceStatus
	onlineAt: number | null
	offlineAt: number | null
	durationMs: number | null
	duration: string | null
	lastSeen: number | null
}

/** Session as returned by {@link PresenceMonitor.getStatus} (timestamps as `Date`). */
export interface PresenceTrackerSession {
	jid: string
	onlineAt: Date
	offlineAt: Date
	durationMs: number
	duration: string
}

/** Rich per-contact status returned by {@link PresenceMonitor.getStatus}. */
export interface PresenceTrackerStatus {
	jid: string
	lid?: string
	currentStatus: 'online' | 'offline' | 'unknown'
	currentSessionStart?: Date
	lastSeen?: Date
	serverLastSeen?: Date
	lastOfflineAt?: Date
	lastDurationMs?: number
	lastDuration?: string
	sessions: PresenceTrackerSession[]
}

export type PresenceMonitorEvents = {
	online: PresenceOnlineEvent
	offline: PresenceOfflineEvent
	session: PresenceSessionSummary
	error: Error
}

export interface MinimalSocket {
	ev: Pick<BaileysEventEmitter, 'on' | 'off'>
	presenceSubscribe?: (toJid: string, tcToken?: Buffer | undefined) => Promise<void> | void
	signalRepository?: {
		lidMapping?: LIDMappingStore
	}
	/** Used as a fallback PN→LID resolver when `signalRepository.lidMapping` misses. */
	onWhatsApp?: (...phoneNumber: string[]) => Promise<Array<{ jid: string; lid?: string; pn?: string }> | undefined>
}

const ONLINE_PRESENCES = new Set(['available', 'composing', 'recording', 'paused'])

/**
 * Format a duration in milliseconds as `HH:MM:SS`. Hours are not wrapped at 24,
 * so a 27-hour session is correctly formatted as `27:15:04`.
 *
 * @param durationMs Duration in milliseconds
 */
export const formatDuration = (durationMs: number): string => {
	if (typeof durationMs !== 'number' || durationMs < 0 || !isFinite(durationMs)) {
		return '00:00:00'
	}

	const totalSeconds = Math.floor(durationMs / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	const pad = (n: number) => n.toString().padStart(2, '0')
	return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

type ParsedTimezone = { offsetMs: number } | { iana: string }

let defaultTimezone: string | number = 'UTC'

/** Current global default timezone, used whenever no per-monitor/per-call timezone is given. */
export const getDefaultTimezone = (): string | number => defaultTimezone

/**
 * Set the global default timezone (`'+05:00'`, `'+5'`, `5`, `'Asia/Karachi'`, `'UTC'`).
 * Ported from @innovatorssoft/baileys; unlike that fork the initial default is `'UTC'`.
 */
export const setDefaultTimezone = (zone: string | number): void => {
	defaultTimezone = zone
}

const parseTimezone = (zone?: string | number | null): ParsedTimezone => {
	if (zone === undefined || zone === null || zone === '') zone = defaultTimezone
	if (zone === undefined || zone === null || zone === '') return { offsetMs: 0 }
	if (typeof zone === 'number') return { offsetMs: zone * 3600 * 1000 }
	const str = zone.trim()
	const match = /^([+-])?(\d{1,2})(?::?(\d{2}))?$/.exec(str)
	if (match) {
		const sign = match[1] === '-' ? -1 : 1
		const minutes = parseInt(match[2]!, 10) * 60 + parseInt(match[3] || '0', 10)
		return { offsetMs: sign * minutes * 60 * 1000 }
	}

	if (/^(utc|gmt|z)$/i.test(str)) return { offsetMs: 0 }
	return { iana: str }
}

/** Accepts a `Date`, epoch milliseconds, or epoch seconds. */
const toDate = (value: Date | number): Date =>
	value instanceof Date ? value : new Date(value > 1e11 ? value : value * 1000)

const pad2 = (n: number) => n.toString().padStart(2, '0')

/** Format as `HH:MM:SS` in the given timezone (`'+05:00'`, `'+5'`, `5` or an IANA name). */
const formatClock = (value: Date | number | null | undefined, zone?: string | number | null): string => {
	if (!value) return 'N/A'
	const d = toDate(value)
	const tz = parseTimezone(zone)
	if ('offsetMs' in tz) {
		const t = new Date(d.getTime() + tz.offsetMs)
		return `${pad2(t.getUTCHours())}:${pad2(t.getUTCMinutes())}:${pad2(t.getUTCSeconds())}`
	}

	try {
		return new Intl.DateTimeFormat('en-GB', {
			timeZone: tz.iana,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(d)
	} catch {
		return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
	}
}

/** Format as `YYYY-MM-DD HH:MM:SS` in the given timezone. */
const formatDateAndClock = (value: Date | number | null | undefined, zone?: string | number | null): string => {
	if (!value) return 'N/A'
	const d = toDate(value)
	const tz = parseTimezone(zone)
	if ('offsetMs' in tz) {
		const t = new Date(d.getTime() + tz.offsetMs)
		return `${t.getUTCFullYear()}-${pad2(t.getUTCMonth() + 1)}-${pad2(t.getUTCDate())} ${formatClock(d, zone)}`
	}

	try {
		return new Intl.DateTimeFormat('en-CA', {
			timeZone: tz.iana,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		})
			.format(d)
			.replace(/,/, '')
	} catch {
		return d.toLocaleString()
	}
}

/** `HH:MM:SS` in the given timezone (falls back to the global default, see {@link setDefaultTimezone}). */
export const formatTime = (date: Date | number | null | undefined, zone?: string | number | null): string =>
	formatClock(date, zone)

/** `YYYY-MM-DD HH:MM:SS` in the given timezone (falls back to the global default). */
export const formatDateTime = (date: Date | number | null | undefined, zone?: string | number | null): string =>
	formatDateAndClock(date, zone)

/** Human-readable relative time, e.g. `45s ago`, `3m ago`, `2h ago`, `4d ago`. */
export const formatTimeAgo = (value: Date | number | null | undefined): string => {
	if (!value) return 'N/A'
	const diffMs = Date.now() - toDate(value).getTime()
	if (diffMs < 0) return 'just now'
	const diffSec = Math.floor(diffMs / 1000)
	if (diffSec < 60) return `${diffSec}s ago`
	const diffMin = Math.floor(diffSec / 60)
	if (diffMin < 60) return `${diffMin}m ago`
	const diffHour = Math.floor(diffMin / 60)
	if (diffHour < 24) return `${diffHour}h ago`
	return `${Math.floor(diffHour / 24)}d ago`
}

/**
 * Normalize user input (`923001234567`, `...@c.us`, `...@whatsapp.net`, a LID, ...) into a
 * valid WhatsApp user JID. Returns `''` for empty / non-string input.
 */
export const normalizeContactJid = (jid: string): string => {
	if (!jid || typeof jid !== 'string') return ''
	let clean = jid.trim()
	if (clean.endsWith('@whatsapp.net')) {
		clean = clean.replace('@whatsapp.net', '@s.whatsapp.net')
	} else if (clean.endsWith('@c.us')) {
		clean = clean.replace('@c.us', '@s.whatsapp.net')
	} else if (!clean.includes('@')) {
		clean = `${clean}@s.whatsapp.net`
	}

	return jidNormalizedUser(clean) || clean
}

const formatTimestamp = (timestampMs: number, timezone?: string): string => {
	const date = new Date(timestampMs)
	const pad = (n: number) => n.toString().padStart(2, '0')
	if (timezone) {
		const match = /^([+-])(\d{2}):(\d{2})$/.exec(timezone)
		if (match) {
			const sign = match[1] === '+' ? 1 : -1
			const tzHours = parseInt(match[2]!, 10)
			const tzMinutes = parseInt(match[3]!, 10)
			const offsetMs = sign * (tzHours * 3600 + tzMinutes * 60) * 1000
			const utcMs = date.getTime() + date.getTimezoneOffset() * 60000
			const localMs = utcMs + offsetMs
			const d = new Date(localMs)
			return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} ${timezone}`
		}
	}

	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const formatTimeOnly = (timestampMs: number, timezone?: string): string => {
	const full = formatTimestamp(timestampMs, timezone)
	const parts = full.split(' ')
	return parts.length >= 2 ? parts[1]!.split(' ')[0]! : full
}

interface InternalState {
	jid: string
	requestedJid: string
	status: PresenceStatus
	onlineAt: number | null
	offlineAt: number | null
	durationMs: number | null
	lastSeen: number | null
	/** Last-seen value explicitly reported by the WhatsApp server (epoch seconds or ms). */
	serverLastSeen?: number | null
}

/**
 * Monitor online/offline presence transitions for one or more WhatsApp contacts.
 * See the module doc comment above for full behavior notes.
 */
export class PresenceMonitor {
	private readonly sock: MinimalSocket
	private readonly options: Required<
		Pick<PresenceMonitorOptions, 'logToConsole' | 'autoResubscribe' | 'trackMessagesAsPresence'>
	> &
		Pick<PresenceMonitorOptions, 'timezone'>
	private readonly requestedJids: Map<string, string>
	private readonly states = new Map<string, InternalState>()
	private readonly sessions = new Map<string, PresenceSessionSummary[]>()
	private readonly subscribedJids = new Set<string>()
	private readonly listeners = new Map<keyof PresenceMonitorEvents, Set<(arg: any) => void>>()
	/** Bidirectional PN↔LID mapping for cross-JID presence correlation. */
	private readonly pnLidPairs = new Map<string, string>()
	private started = false
	private stopped = false
	private listenersAttached = false
	private timezone: string | number | undefined

	constructor(sock: MinimalSocket, targets: string | string[], options: PresenceMonitorOptions = {}) {
		if (!sock?.ev || typeof sock.ev.on !== 'function') {
			throw new Error('PresenceMonitor requires a socket with ev (BaileysEventEmitter)')
		}

		this.sock = sock
		this.options = {
			logToConsole: !!options.logToConsole,
			autoResubscribe: !!options.autoResubscribe,
			trackMessagesAsPresence: !!options.trackMessagesAsPresence,
			timezone: options.timezone
		}
		this.timezone = options.timezone

		const rawTargets = Array.isArray(targets) ? targets.slice() : [targets]
		const normalizedRequested = new Map<string, string>()
		for (const t of rawTargets) {
			if (typeof t !== 'string' || !t) continue
			const normalized = jidNormalizedUser(t) || t
			normalizedRequested.set(normalized, t)
		}

		this.requestedJids = normalizedRequested

		for (const [internalJid, requestedJid] of normalizedRequested) {
			this.states.set(internalJid, {
				jid: internalJid,
				requestedJid,
				status: 'offline',
				onlineAt: null,
				offlineAt: null,
				durationMs: null,
				lastSeen: null
			})
			this.sessions.set(internalJid, [])
		}

		this.onPresenceUpdate = this.onPresenceUpdate.bind(this)
		this.onConnectionUpdate = this.onConnectionUpdate.bind(this)
		this.onLidMappingUpdate = this.onLidMappingUpdate.bind(this)
		this.onMessagesUpsert = this.onMessagesUpsert.bind(this)
	}

	/** Register an event listener */
	on<E extends keyof PresenceMonitorEvents>(event: E, listener: (arg: PresenceMonitorEvents[E]) => void): this {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, new Set())
		}

		this.listeners.get(event)!.add(listener)
		return this
	}

	/** Remove an event listener */
	off<E extends keyof PresenceMonitorEvents>(event: E, listener: (arg: PresenceMonitorEvents[E]) => void): this {
		this.listeners.get(event)?.delete(listener)
		return this
	}

	/** Remove all listeners (optionally scoped to a single event) */
	removeAllListeners(event?: keyof PresenceMonitorEvents): this {
		if (event === undefined) {
			this.listeners.clear()
		} else {
			this.listeners.delete(event)
		}

		return this
	}

	/** @internal — used by monitorPresence() below; not part of the public API surface. */
	emit<E extends keyof PresenceMonitorEvents>(event: E, payload: PresenceMonitorEvents[E]): void {
		const set = this.listeners.get(event)
		if (!set) return
		for (const fn of set) {
			try {
				fn(payload)
			} catch (err) {
				this.notifyErrorListeners(err)
			}
		}
	}

	private notifyErrorListeners(err: unknown): void {
		const errSet = this.listeners.get('error')
		if (!errSet) return
		for (const efn of errSet) {
			try {
				efn(err as Error)
			} catch {
				/* ignore */
			}
		}
	}

	private logOnline(publicJid: string, timestampMs: number): void {
		if (!this.options.logToConsole) return
		const t = formatTimeOnly(timestampMs, this.options.timezone)
		console.log(`[Presence] ${publicJid} is ONLINE at ${t}`)
	}

	private logOffline(publicJid: string, timestampMs: number, durationMs: number): void {
		if (!this.options.logToConsole) return
		const t = formatTimeOnly(timestampMs, this.options.timezone)
		console.log(`[Presence] ${publicJid} is OFFLINE at ${t}`)
		if (typeof durationMs === 'number' && durationMs >= 0) {
			console.log(`[Presence] Online duration: ${formatDuration(durationMs)}`)
		}
	}

	/**
	 * Start monitoring: attach listeners and subscribe presence for the target JIDs.
	 * Called implicitly by the `monitorPresence(...)` factory.
	 */
	async start(): Promise<this> {
		if (this.started && !this.stopped) return this
		if (this.stopped) {
			throw new Error('PresenceMonitor cannot be restarted after stop(); create a new instance instead.')
		}

		this.started = true
		this.attachListeners()
		await this.subscribeAll()
		return this
	}

	/**
	 * Stop monitoring: detach all socket event listeners and clear subscription bookkeeping.
	 * After `stop()` the monitor cannot be restarted — create a new instance instead.
	 */
	stop(): void {
		if (this.stopped) return
		this.stopped = true
		this.detachListeners()
		this.subscribedJids.clear()
	}

	private attachListeners(): void {
		if (this.listenersAttached) return
		this.listenersAttached = true
		this.sock.ev.on('presence.update', this.onPresenceUpdate)
		if (this.options.autoResubscribe) {
			this.sock.ev.on('connection.update', this.onConnectionUpdate)
		}

		this.sock.ev.on('lid-mapping.update', this.onLidMappingUpdate)
		if (this.options.trackMessagesAsPresence) {
			this.sock.ev.on('messages.upsert', this.onMessagesUpsert)
		}
	}

	private detachListeners(): void {
		if (!this.listenersAttached) return
		this.listenersAttached = false
		this.sock.ev.off('presence.update', this.onPresenceUpdate)
		this.sock.ev.off('connection.update', this.onConnectionUpdate)
		this.sock.ev.off('lid-mapping.update', this.onLidMappingUpdate)
		this.sock.ev.off('messages.upsert', this.onMessagesUpsert)
	}

	private async subscribeAll(): Promise<void> {
		const jids = Array.from(this.requestedJids.keys())
		for (const jid of jids) {
			await this.subscribeOne(jid).catch(err => this.emit('error', err))
		}
	}

	/**
	 * Subscribe to presence for a contact, proactively resolving and subscribing
	 * to both PN and LID (mirroring the working reference implementation).
	 */
	private async subscribeOne(jid: string): Promise<void> {
		if (this.subscribedJids.has(jid)) return
		const normalized = jidNormalizedUser(jid) || jid
		let pnError: Error | undefined

		// Try primary PN subscription
		try {
			await this.sock.presenceSubscribe?.(normalized)
			this.subscribedJids.add(normalized)
		} catch (err) {
			pnError = err as Error
		}

		// Proactively discover and subscribe to LID (same strategy as reference)
		let lidFound = false
		if (isPnUser(normalized)) {
			let lid: string | null = null
			// 1. Check signalRepository lidMapping cache
			try {
				lid = (await this.sock.signalRepository?.lidMapping?.getLIDForPN(normalized)) ?? null
			} catch {
				/* swallow */
			}

			// 2. Fallback: query via onWhatsApp
			if (!lid && this.sock.onWhatsApp) {
				try {
					const res = await this.sock.onWhatsApp(normalized)
					const entry = res?.find(
						r => jidNormalizedUser(r.jid) === normalized || jidNormalizedUser(r.pn || '') === normalized
					)
					if (entry?.lid) lid = jidNormalizedUser(entry.lid) || entry.lid
				} catch {
					/* swallow */
				}
			}

			if (lid) {
				lidFound = true
				this.recordPnLidPair(normalized, lid)
				if (!this.states.has(lid)) {
					this.mirrorStateForAlternateJid(normalized, lid)
				}

				try {
					await this.sock.presenceSubscribe?.(lid)
					this.subscribedJids.add(lid)
				} catch {
					/* log silently; PN subscription already tried */
				}
			}
		}

		// If PN failed and no LID was found, re-emit the original error
		if (pnError && !lidFound) {
			this.emit('error', pnError)
		}
	}

	/** Store bidirectional PN↔LID mapping for cross-JID presence correlation */
	private recordPnLidPair(pn: string, lid: string): void {
		const pnNorm = jidNormalizedUser(pn) || pn
		const lidNorm = jidNormalizedUser(lid) || lid
		this.pnLidPairs.set(pnNorm, lidNorm)
		this.pnLidPairs.set(lidNorm, pnNorm)
	}

	private mirrorStateForAlternateJid(canonicalJid: string, altJid: string): void {
		const canonicalState = this.states.get(canonicalJid)
		if (!canonicalState) return
		this.states.set(altJid, canonicalState)
		if (!this.sessions.has(altJid)) {
			this.sessions.set(altJid, this.sessions.get(canonicalJid) || [])
		}
	}

	/** Find the canonical (requested) JID for a participant matching by user or PN↔LID pair */
	private findCanonicalForParticipant(participantJid: string): string | null {
		const normalized = jidNormalizedUser(participantJid) || participantJid
		// Direct match
		if (this.requestedJids.has(normalized)) return normalized
		// Same-user match
		for (const internal of this.requestedJids.keys()) {
			if (areJidsSameUser(participantJid, internal)) return internal
		}

		// PN↔LID pair match
		const partner = this.pnLidPairs.get(normalized)
		if (partner && this.requestedJids.has(partner)) return partner
		return null
	}

	private onConnectionUpdate(update: { connection?: string }): void {
		if (update.connection === 'open' && this.options.autoResubscribe && !this.stopped) {
			if (this.subscribedJids.size > 0) {
				const previous = Array.from(this.subscribedJids)
				this.subscribedJids.clear()
				for (const jid of previous) {
					this.subscribeOne(jid).catch(err => this.emit('error', err))
				}
			}
		}
	}

	private onLidMappingUpdate(mapping: { pn?: string; lid?: string }): void {
		if (!mapping?.pn || !mapping?.lid) return
		const pn = jidNormalizedUser(mapping.pn) || mapping.pn
		const lid = jidNormalizedUser(mapping.lid) || mapping.lid
		this.recordPnLidPair(pn, lid)
		// linkAliases: enable cross-JID matching for presence events (mirrors reference behavior)
		if (this.requestedJids.has(pn)) this.mirrorStateForAlternateJid(pn, lid)
		if (this.requestedJids.has(lid)) this.mirrorStateForAlternateJid(lid, pn)
		if (!this.started || this.stopped || !this.sock.presenceSubscribe) return
		// Subscribe to any missing counterpart
		if (this.requestedJids.has(pn) && !this.subscribedJids.has(lid)) {
			Promise.resolve(this.sock.presenceSubscribe(lid))
				.then(() => this.subscribedJids.add(lid))
				.catch(() => {})
		}

		if (this.requestedJids.has(lid) && !this.subscribedJids.has(pn)) {
			Promise.resolve(this.sock.presenceSubscribe(pn))
				.then(() => this.subscribedJids.add(pn))
				.catch(() => {})
		}
	}

	private resolvePublicJid(participantJid: string): string {
		for (const [internal, requested] of this.requestedJids) {
			if (participantJid === internal) return requested || internal
			if (areJidsSameUser(participantJid, internal)) return requested || internal
		}

		const altState = this.states.get(participantJid)
		if (altState?.requestedJid) return altState.requestedJid
		return participantJid
	}

	private isWatched(participantJid: string): boolean {
		if (!participantJid) return false
		const normalized = jidNormalizedUser(participantJid) || participantJid
		if (this.requestedJids.has(normalized)) return true
		for (const internal of this.requestedJids.keys()) {
			if (areJidsSameUser(participantJid, internal)) return true
		}

		// Check PN↔LID pairs — a LID participant is watched if its paired PN is requested
		const partner = this.pnLidPairs.get(normalized)
		if (partner && this.requestedJids.has(partner)) return true
		return false
	}

	private onPresenceUpdate(update: { id?: string; presences?: Record<string, PresenceData> }): void {
		if (!update?.presences) return
		// Match by participant JID OR by the event's top-level id (WhatsApp sometimes sends
		// presence addressed to the LID even when we subscribed to the PN)
		const normId = update.id ? jidNormalizedUser(update.id) || update.id : null
		for (const [participant, data] of Object.entries(update.presences)) {
			const normParticipant = jidNormalizedUser(participant) || participant
			// Check participant first, then fall back to event id
			const keyToCheck = normParticipant || normId
			if (!keyToCheck || !this.isWatched(keyToCheck)) continue
			this.handlePresenceForParticipant(keyToCheck, data)
		}
	}

	private onMessagesUpsert(update: {
		messages?: Array<{ key?: { remoteJid?: string | null; participant?: string | null; fromMe?: boolean | null } }>
	}): void {
		if (!update?.messages) return
		for (const msg of update.messages) {
			if (!msg?.key || msg.key.fromMe) continue
			const sender = msg.key.participant || msg.key.remoteJid
			if (!sender) continue
			const normalized = jidNormalizedUser(sender) || sender
			if (!this.isWatched(normalized)) continue
			this.handlePresenceForParticipant(normalized, { lastKnownPresence: 'available' } as PresenceData)
		}
	}

	private handlePresenceForParticipant(participant: string, data: PresenceData): void {
		const normalized = jidNormalizedUser(participant) || participant
		let state = this.states.get(normalized)
		if (!state) {
			// Check if participant is an alternate JID for any requested JID
			const canonical = this.findCanonicalForParticipant(normalized)
			if (canonical) {
				// Create a permanent mirror so future lookups work via either JID
				state = this.states.get(canonical)
				if (state) this.states.set(normalized, state)
			}

			if (!state) return
		}

		const lastKnownPresence = data?.lastKnownPresence
		const explicitLastSeen = (data as any)?.lastSeen
		if (typeof explicitLastSeen === 'number' && explicitLastSeen > 0) {
			state.serverLastSeen = explicitLastSeen
		}

		const lastSeen = typeof (data as any)?.lastSeen === 'number' ? (data as any).lastSeen : (state.lastSeen ?? null)
		const isOnline = ONLINE_PRESENCES.has(lastKnownPresence)

		if (isOnline) {
			this.transitionOnline(state, normalized, lastSeen)
		} else if (lastKnownPresence === 'unavailable') {
			this.transitionOffline(state, normalized, lastSeen)
		} else if (lastSeen !== null && lastSeen !== undefined) {
			state.lastSeen = lastSeen
		}
	}

	private transitionOnline(state: InternalState, participantJid: string, lastSeen: number | null): void {
		if (lastSeen !== null && lastSeen !== undefined) state.lastSeen = lastSeen
		if (state.status === 'online') return

		const now = Date.now()
		state.status = 'online'
		state.onlineAt = now
		state.offlineAt = null
		state.durationMs = null

		const publicJid = this.resolvePublicJid(participantJid)
		this.logOnline(publicJid, now)

		const payload: PresenceOnlineEvent = {
			jid: publicJid,
			status: 'online',
			onlineAt: now
		}
		if (state.lastSeen !== null && state.lastSeen !== undefined) {
			payload.lastSeen = state.lastSeen
		}

		this.emit('online', payload)
	}

	private transitionOffline(state: InternalState, participantJid: string, lastSeen: number | null): void {
		const hadActiveSession = state.status === 'online' && state.onlineAt !== null
		if (lastSeen !== null && lastSeen !== undefined) state.lastSeen = lastSeen

		const now = Date.now()
		state.status = 'offline'

		if (!hadActiveSession) return

		state.offlineAt = now

		const durationMs = state.offlineAt - state.onlineAt!
		state.durationMs = durationMs
		const duration = formatDuration(durationMs)

		const publicJid = this.resolvePublicJid(participantJid)
		this.logOffline(publicJid, now, durationMs)

		const offlinePayload: PresenceOfflineEvent = {
			jid: publicJid,
			status: 'offline',
			onlineAt: state.onlineAt!,
			offlineAt: state.offlineAt,
			durationMs,
			duration
		}
		if (state.lastSeen !== null && state.lastSeen !== undefined) {
			offlinePayload.lastSeen = state.lastSeen
		}

		this.emit('offline', offlinePayload)

		const sessionPayload: PresenceSessionSummary = { ...offlinePayload }
		const sessionsList = this.sessions.get(state.jid) || this.sessions.get(participantJid)
		sessionsList?.push(sessionPayload)
		this.emit('session', sessionPayload)
	}

	/**
	 * Return the current presence state for a single monitored JID, or `null` if unknown.
	 * If called without arguments, returns a map `{ [jid]: PresenceStateView }` keyed by
	 * the originally requested JIDs.
	 */
	getState(jid?: string): PresenceStateView | null | Record<string, PresenceStateView> {
		if (jid) {
			const normalized = jidNormalizedUser(jid) || jid
			const state = this.states.get(normalized) || this.findStateByUser(normalized)
			if (!state) return null
			return this.publicState(state, jid)
		}

		const result: Record<string, PresenceStateView> = {}
		for (const [internal, state] of this.states) {
			if (this.requestedJids.has(internal)) {
				const pub = this.requestedJids.get(internal) || internal
				result[pub] = this.publicState(state, pub)
			}
		}

		return result
	}

	private findStateByUser(jid: string): InternalState | null {
		for (const state of this.states.values()) {
			if (areJidsSameUser(state.jid, jid)) return state
		}

		return null
	}

	private publicState(state: InternalState, publicJid?: string): PresenceStateView {
		return {
			jid: publicJid || state.requestedJid || state.jid,
			status: state.status,
			onlineAt: state.onlineAt,
			offlineAt: state.offlineAt,
			durationMs: state.durationMs,
			duration: typeof state.durationMs === 'number' ? formatDuration(state.durationMs) : null,
			lastSeen: state.lastSeen
		}
	}

	/**
	 * Return the most recent completed session for `jid`, or `null` if no session has
	 * completed yet.
	 */
	getSession(jid: string): PresenceSessionSummary | null {
		if (!jid) return null
		const sessions = this.resolveSessions(jid)
		if (!sessions) return null
		return sessions.length ? sessions[sessions.length - 1]! : null
	}

	/**
	 * Return all completed sessions for `jid`, or — if `jid` is omitted — a map
	 * `{ [jid]: PresenceSessionSummary[] }` for every monitored contact.
	 */
	getSessions(jid?: string): PresenceSessionSummary[] | Record<string, PresenceSessionSummary[]> {
		if (jid) {
			return this.resolveSessions(jid)?.slice() ?? []
		}

		const out: Record<string, PresenceSessionSummary[]> = {}
		for (const [internal, sessionsList] of this.sessions) {
			if (this.requestedJids.has(internal)) {
				const pub = this.requestedJids.get(internal) || internal
				out[pub] = sessionsList.slice()
			}
		}

		return out
	}

	private resolveSessions(jid: string): PresenceSessionSummary[] | undefined {
		const normalized = jidNormalizedUser(jid) || jid
		let sessions = this.sessions.get(normalized)
		if (!sessions) {
			for (const internal of this.requestedJids.keys()) {
				if (areJidsSameUser(normalized, internal)) {
					sessions = this.sessions.get(internal)
					break
				}
			}
		}

		return sessions
	}

	/** True if the given JID (or its user) is being monitored */
	isMonitoring(jid: string): boolean {
		if (!jid) return false
		const normalized = jidNormalizedUser(jid) || jid
		if (this.requestedJids.has(normalized)) return true
		for (const internal of this.requestedJids.keys()) {
			if (areJidsSameUser(normalized, internal)) return true
		}

		return false
	}

	/** Change the display timezone (`'+05:00'`, `'+5'`, `5`, `'Asia/Karachi'`, `'UTC'`). */
	setTimezone(zone: string | number): void {
		this.timezone = zone
		this.options.timezone = String(zone)
	}

	/** The display timezone currently used by `formatTime` / `formatDateTime`. */
	getTimezone(): string {
		return String(this.timezone ?? defaultTimezone)
	}

	/** `HH:MM:SS` in this monitor's timezone. Accepts a `Date`, epoch ms or epoch seconds. */
	formatTime(date: Date | number | null | undefined): string {
		return formatClock(date, this.timezone)
	}

	/** `YYYY-MM-DD HH:MM:SS` in this monitor's timezone. Accepts a `Date`, epoch ms or epoch seconds. */
	formatDateTime(date: Date | number | null | undefined): string {
		return formatDateAndClock(date, this.timezone)
	}

	/**
	 * Rich status for one contact (`currentStatus` is `'unknown'` until the first presence
	 * signal arrives), or `undefined` if the JID is not monitored.
	 */
	getStatus(jid: string): PresenceTrackerStatus | undefined {
		const normalized = normalizeContactJid(jid)
		if (!normalized) return undefined
		const state = this.states.get(normalized) || this.findStateByUser(normalized)
		if (!state) return undefined

		const sessions: PresenceTrackerSession[] = (this.resolveSessions(normalized) ?? []).map(sess => ({
			jid: sess.jid,
			onlineAt: new Date(sess.onlineAt),
			offlineAt: new Date(sess.offlineAt),
			durationMs: sess.durationMs,
			duration: sess.duration
		}))
		const known = state.onlineAt !== null || state.offlineAt !== null || state.lastSeen !== null || sessions.length > 0
		const partner = this.pnLidPairs.get(normalized)
		const status: PresenceTrackerStatus = {
			jid: this.requestedJids.get(state.jid) || state.requestedJid || state.jid,
			currentStatus: known ? state.status : 'unknown',
			sessions
		}
		if (partner?.endsWith('@lid')) status.lid = partner
		if (state.status === 'online' && state.onlineAt !== null) status.currentSessionStart = new Date(state.onlineAt)
		if (state.lastSeen !== null) status.lastSeen = toDate(state.lastSeen)
		if (state.serverLastSeen) status.serverLastSeen = toDate(state.serverLastSeen)
		if (state.offlineAt !== null) status.lastOfflineAt = new Date(state.offlineAt)
		if (state.durationMs !== null) {
			status.lastDurationMs = state.durationMs
			status.lastDuration = formatDuration(state.durationMs)
		}

		return status
	}

	/** Rich status for every monitored contact, keyed by the originally requested JID. */
	getAllStatuses(): Map<string, PresenceTrackerStatus> {
		const result = new Map<string, PresenceTrackerStatus>()
		for (const [internal, requested] of this.requestedJids) {
			const publicJid = requested || internal
			const status = this.getStatus(publicJid)
			if (status) result.set(publicJid, status)
		}

		return result
	}

	/** Re-send the presence subscription for a contact (and its paired LID, if known). */
	async resubscribe(jid: string): Promise<void> {
		const normalized = normalizeContactJid(jid)
		if (!normalized || !this.sock.presenceSubscribe) return
		const targets = [normalized]
		const partner = this.pnLidPairs.get(normalized)
		if (partner) targets.push(partner)
		for (const target of targets) {
			try {
				await this.sock.presenceSubscribe(target)
			} catch {
				/* best effort */
			}
		}
	}

	/** Start monitoring one or more additional contacts and subscribe to their presence. */
	async subscribe(jid: string | string[]): Promise<void> {
		const jids = Array.isArray(jid) ? jid : [jid]
		for (const raw of jids) {
			const normalized = normalizeContactJid(raw)
			if (!normalized) continue
			if (!this.requestedJids.has(normalized)) {
				this.requestedJids.set(normalized, raw)
				this.states.set(normalized, {
					jid: normalized,
					requestedJid: raw,
					status: 'offline',
					onlineAt: null,
					offlineAt: null,
					durationMs: null,
					lastSeen: null
				})
				this.sessions.set(normalized, [])
			}

			this.subscribedJids.delete(normalized)
			await this.subscribeOne(normalized).catch(err => this.emit('error', err))
		}
	}

	/** The list of JIDs originally passed to `monitorPresence(...)` */
	getMonitoredJids(): string[] {
		return Array.from(this.requestedJids.values())
	}
}

/**
 * Factory helper. Creates a {@link PresenceMonitor} and begins monitoring
 * (async subscriptions fire in the microtask queue so errors route to the
 * `error` event rather than throwing synchronously at the call-site).
 */
export const monitorPresence = (
	sock: MinimalSocket,
	targets: string | string[],
	options?: PresenceMonitorOptions
): PresenceMonitor => {
	const monitor = new PresenceMonitor(sock, targets, options)
	Promise.resolve()
		.then(() => monitor.start())
		.catch(err => monitor.emit('error', err))
	return monitor
}

/** `true` for any WA presence that means the contact is active (`available`, `composing`, `recording`, `paused`). */
export const isOnlinePresence = (presence: string | null | undefined): boolean =>
	!!presence && ONLINE_PRESENCES.has(presence)

/** `true` when the WA presence is `unavailable`. */
export const isOfflinePresence = (presence: string | null | undefined): boolean => presence === 'unavailable'

/** Name used by @innovatorssoft/baileys — same class as {@link PresenceMonitor}. */
export { PresenceMonitor as PresenceTracker }

/** Name used by @innovatorssoft/baileys — same function as {@link monitorPresence}. */
export const createPresenceTracker = monitorPresence
