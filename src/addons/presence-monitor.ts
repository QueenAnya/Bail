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
}

/**
 * Monitor online/offline presence transitions for one or more WhatsApp contacts.
 * See the module doc comment above for full behavior notes.
 */
export class PresenceMonitor {
	private readonly sock: MinimalSocket
	private readonly options: Required<Pick<PresenceMonitorOptions, 'logToConsole' | 'autoResubscribe'>> &
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

	constructor(sock: MinimalSocket, targets: string | string[], options: PresenceMonitorOptions = {}) {
		if (!sock?.ev || typeof sock.ev.on !== 'function') {
			throw new Error('PresenceMonitor requires a socket with ev (BaileysEventEmitter)')
		}

		this.sock = sock
		this.options = {
			logToConsole: !!options.logToConsole,
			autoResubscribe: !!options.autoResubscribe,
			timezone: options.timezone
		}

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
	}

	private detachListeners(): void {
		if (!this.listenersAttached) return
		this.listenersAttached = false
		this.sock.ev.off('presence.update', this.onPresenceUpdate)
		this.sock.ev.off('connection.update', this.onConnectionUpdate)
		this.sock.ev.off('lid-mapping.update', this.onLidMappingUpdate)
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
