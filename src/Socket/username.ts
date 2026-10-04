/**
 * username.ts
 * WhatsApp Username socket layer — check, set, pin, find, and recommend usernames.
 *
 * NOTE: All USERNAME_QUERY_IDS are captured from live WA Web sessions.
 * They may rotate with WA updates — use the proto-extract tool to refresh them.
 */

import NodeCache from '@cacheable/node-cache'
import { DEFAULT_CACHE_TTLS } from '../Defaults'
import type {
	SocketConfig,
	UsernameCacheEntry,
	UsernameResolutionResult,
	WAUsernameLookupResult,
	WAUsernameQuery
} from '../Types'
import { UsernameInvalidError, UsernameResolutionError } from '../Types/Username'
import { normalizeUsername, validateUsername } from '../Utils/username'
import { attachVoipToSocket } from '../Voip/voip-engine'
import { isLidUser, isPnUser, jidNormalizedUser } from '../WABinary'
import { USyncQuery, USyncUser } from '../WAUSync'
import { makeCommunitiesSocket } from './communities'
import { executeWMexQuery } from './mex'

// ── Query IDs (captured from live WA Web session) ─────────────────────────────
export const USERNAME_QUERY_IDS = {
	CHECK: '26124072630599520', // UsernameCheck
	CHECK_MULTI: '27134626522840290', // UsernameCheckMulti
	SET: '27108705368767936', // UsernameSet
	GET: '32618050064506056', // UsernameGet
	GET_RECOMMENDATIONS: '26077456248616956', // UsernameGetRecommendationsQuery
	PIN_SET: '25529696019976770' // UsernamePinSet
} as const

// ── Constants ─────────────────────────────────────────────────────────────────
export const USERNAME_CHECK_RESULT = {
	SUCCESS: 'SUCCESS',
	INVALID: 'INVALID'
} as const

export const USERNAME_SOURCE = {
	FB: 'FB',
	IG: 'IG',
	USER_INPUT: 'USER_INPUT',
	SUGGESTION: 'SUGGESTION'
} as const

// ── Types ─────────────────────────────────────────────────────────────────────
export interface UsernameCheckResult {
	available: boolean
	username: string
	suggestions?: string[]
	rejectionReasons?: string[]
	suggestionsEligible?: boolean
}

export interface UsernameSetOptions {
	source?: keyof typeof USERNAME_SOURCE
	sessionId?: string
	pin?: string
}

export interface UserByUsernameResult {
	jid: string
	contact: boolean
}

// ── Socket factory ────────────────────────────────────────────────────────────
export const makeUsernameSocket = (config: SocketConfig) => {
	const sock = makeCommunitiesSocket(config)
	const { query, generateMessageTag, executeUSyncQuery } = sock

	/** Internal helper — wraps executeWMexQuery with this socket's query/tag */
	const mexQuery = <T = any>(variables: Record<string, unknown>, queryId: string, dataPath: string): Promise<T> =>
		executeWMexQuery<T>(variables, queryId, dataPath, query, generateMessageTag)

	const usernameCache = config.usernameCache || new NodeCache({ stdTTL: DEFAULT_CACHE_TTLS.USERNAME, useClones: false })

	const resolvePNForLID = async (lid: string): Promise<string | undefined> => {
		if (!isLidUser(lid)) return undefined
		try {
			const mapped = await sock.signalRepository?.lidMapping?.getPNForLID?.(lid)
			if (mapped && isPnUser(mapped)) return jidNormalizedUser(mapped)
		} catch {}

		return undefined
	}

	const resolveUsername = async (username: string): Promise<UsernameResolutionResult | null> => {
		const normalized = validateUsername(normalizeUsername(username))
		const key = `user:${normalized}`
		const cached = (await usernameCache.get<UsernameCacheEntry>(key)) as UsernameCacheEntry | undefined
		if (cached) return cached.notFound ? null : cached
		try {
			const q = new USyncQuery()
				.withContactProtocol()
				.withUsernameProtocol()
				.withUser(new USyncUser().withUsername(normalized))
			const entry: any = (await executeUSyncQuery(q))?.list?.[0]

			if (!entry || entry.error || (!entry.id && !entry.lid && !entry.pn)) {
				await usernameCache.set(
					key,
					{ username: normalized, resolvedAt: Date.now(), notFound: true },
					DEFAULT_CACHE_TTLS.USERNAME_NEGATIVE
				)
				return null
			}

			const lid = entry.lid || (entry.id && isLidUser(entry.id) ? entry.id : undefined)
			let pn = entry.pn || (entry.id && isPnUser(entry.id) ? entry.id : undefined)
			if (lid && !pn) pn = await resolvePNForLID(lid)

			const resolution = {
				username: normalized,
				jid: pn || lid || entry.id,
				...(lid ? { lid } : {}),
				...(pn ? { pn: jidNormalizedUser(pn) } : {})
			}

			if (resolution.lid && resolution.pn) {
				await sock.signalRepository?.lidMapping?.storeLIDPNMappings?.([{ lid: resolution.lid, pn: resolution.pn }])
			}

			await usernameCache.set(key, { ...resolution, resolvedAt: Date.now() }, DEFAULT_CACHE_TTLS.USERNAME)
			return resolution
		} catch (error) {
			if (error instanceof UsernameInvalidError) throw error
			throw new UsernameResolutionError(normalized, error)
		}
	}

	const resolveUsernames = async (usernames: string[]) => {
		if (!Array.isArray(usernames)) throw new UsernameInvalidError(String(usernames), 'Usernames must be an array')
		return Promise.all(usernames.map(username => resolveUsername(username)))
	}

	/**
	 * `onWhatsApp`-style username lookup, backed by `resolveUsernames` so
	 * results carry `lid`/`pn` (matching innovatorssoft's real
	 * implementation: `(await resolveUsernames(usernames.flat())).filter(Boolean)`).
	 * This replaces the raw-USync version from the earlier socket layer,
	 * which only returned `{username, jid, exists}` with no lid/pn.
	 * Not-found usernames are dropped from the results, same as upstream.
	 */
	const onWhatsAppUsername = async (...queries: WAUsernameQuery[]): Promise<WAUsernameLookupResult[]> => {
		const usernames = queries.flat().map(q => (typeof q === 'string' ? q : q.username))
		const resolved = await resolveUsernames(usernames)
		return resolved
			.filter((r): r is UsernameResolutionResult => r !== null)
			.map(r => ({
				username: r.username,
				jid: r.jid || '',
				exists: true,
				...(r.lid ? { lid: r.lid } : {}),
				...(r.pn ? { pn: r.pn } : {})
			}))
	}

	const invalidateUsername = async (username: string) => {
		await usernameCache.del(`user:${normalizeUsername(username)}`)
	}

	const refreshUsername = async (username: string) => {
		await invalidateUsername(username)
		return resolveUsername(username)
	}

	// ── VoIP calling (ported from baileys-caller, single-session — see Voip/) ──
	// Lazily initializes the WASM engine on first `initiateCall()`; bots that
	// never call it never pay the worker-pool/WASM-compile startup cost.
	const {
		initiateCall,
		initiateCalls,
		getActiveCalls,
		getCall,
		getActiveCallCount,
		endCall,
		endAllCalls,
		setVoipOptions,
		getVoipMemoryStats,
		getVoipClient,
		disconnectVoip
	} = attachVoipToSocket(sock, (config as { voip?: boolean | object }).voip as any)
	sock.registerSocketEndHandler(() => disconnectVoip())

	// ── 1. Check username availability ────────────────────────────────────────
	const checkUsername = async (username: string, includeSuggestions = true): Promise<UsernameCheckResult> => {
		if (!USERNAME_QUERY_IDS.CHECK) {
			throw new Error('Username CHECK query_id not configured — capture a live WA session to obtain it')
		}

		const data = await mexQuery<any>(
			{ username, include_suggestions: includeSuggestions },
			USERNAME_QUERY_IDS.CHECK,
			'xwa2_username_check'
		)
		if (data?.result === USERNAME_CHECK_RESULT.SUCCESS) {
			return { available: true, username }
		}

		return {
			available: false,
			username,
			suggestions: data?.suggestions ?? [],
			rejectionReasons: data?.rejection_reasons ?? [],
			suggestionsEligible: data?.suggestions_eligible ?? true
		}
	}

	// ── 2. Check multiple usernames at once ───────────────────────────────────
	const checkUsernameMulti = async (usernames: string[]) => {
		if (!USERNAME_QUERY_IDS.CHECK_MULTI) {
			throw new Error('Username CHECK_MULTI query_id not configured')
		}

		return mexQuery<any>({ usernames }, USERNAME_QUERY_IDS.CHECK_MULTI, 'xwa2_username_check_multi')
	}

	// ── 3. Set username ───────────────────────────────────────────────────────
	const setUsername = async (username: string, options: UsernameSetOptions = {}) => {
		if (!USERNAME_QUERY_IDS.SET) {
			throw new Error('Username SET query_id not configured — capture a live WA session to obtain it')
		}

		const { source = USERNAME_SOURCE.USER_INPUT, sessionId, pin } = options
		const variables: Record<string, unknown> = {
			username,
			reserved: false,
			source,
			...(sessionId ? { session_id: sessionId } : {}),
			...(pin ? { pin } : {})
		}
		return mexQuery<any>(variables, USERNAME_QUERY_IDS.SET, 'xwa2_username_set')
	}

	// ── 4. Delete / unset username ────────────────────────────────────────────
	const deleteUsername = async () => {
		if (!USERNAME_QUERY_IDS.SET) {
			throw new Error('Username SET query_id not configured — capture a live WA session to obtain it')
		}

		return mexQuery<any>({ username: null }, USERNAME_QUERY_IDS.SET, 'xwa2_username_delete')
	}

	// ── 5. Get own username ───────────────────────────────────────────────────
	const getMyUsername = async (): Promise<string | null> => {
		if (!USERNAME_QUERY_IDS.GET) {
			throw new Error('Username GET query_id not configured — capture a live WA session to obtain it')
		}

		const data = await mexQuery<any>({}, USERNAME_QUERY_IDS.GET, 'xwa2_username_get')
		return data?.username ?? null
	}

	// ── 6. Pin/unpin username (requires PIN) ──────────────────────────────────
	const setUsernamePin = async (pin: string) => {
		if (!USERNAME_QUERY_IDS.PIN_SET) {
			throw new Error('Username PIN_SET query_id not configured — capture a live WA session to obtain it')
		}

		return mexQuery<any>({ pin }, USERNAME_QUERY_IDS.PIN_SET, 'xwa2_username_pin_set')
	}

	// ── 7. Find user by username (USync) ──────────────────────────────────────
	const findUserByUsername = async (username: string, pin?: string): Promise<UserByUsernameResult | null> => {
		const usyncQuery = new USyncQuery().withContactProtocol()
		const user = new USyncUser().withUsername(username)
		if (pin) user.withUsernameKey(pin)
		usyncQuery.withUser(user)

		const result = await executeUSyncQuery(usyncQuery)
		if (!result?.list?.length) return null

		const entry = result.list[0]
		if (!entry) return null

		return {
			jid: entry.id,
			contact: Boolean(entry.contact)
		}
	}

	// ── 8. Fetch usernames of known contacts (USync) ──────────────────────────
	const fetchContactUsernames = async (...jids: string[]) => {
		const usyncQuery = new USyncQuery().withUsernameProtocol()
		for (const jid of jids) {
			usyncQuery.withUser(new USyncUser().withId(jid))
		}

		const result = await executeUSyncQuery(usyncQuery)
		return result?.list ?? []
	}

	// ── 9. Get username recommendations ──────────────────────────────────────
	const getUsernameRecommendations = async (source: keyof typeof USERNAME_SOURCE | null = null) => {
		const variables: Record<string, unknown> = {}
		if (source) variables.source = source
		return mexQuery<any>(variables, USERNAME_QUERY_IDS.GET_RECOMMENDATIONS, 'xwa2_username_get_recommendations')
	}

	// Fill in the override hook from the earlier socket layer, so the
	// existing `onWhatsApp`/`onWhatsAppMixed` (defined in Socket/socket.ts,
	// before resolveUsername existed) picks up lid/pn automatically.
	;(sock as any).usernameLookupOverride.fn = onWhatsAppUsername

	// ── incoming VoIP calls: sock.acceptCall / sock.rejectCall ─────────────────
	// When the callId belongs to an incoming call tracked by the VoIP engine, answer it through that
	// session (full signaling + audio streaming). Otherwise fall back to the plain signaling-only
	// stanzas of the base socket.
	//   sock.acceptCall(callId, callFrom, isVideo, { audio: './audio.mp3' })
	//   sock.rejectCall(callId, callFrom, 'busy')
	const baseAcceptCall = (sock as any).acceptCall as (...args: any[]) => Promise<any>
	const baseRejectCall = (sock as any).rejectCall as (...args: any[]) => Promise<any>
	const acceptCall = async (callId: string, callFrom?: string, isVideo?: boolean, options?: any) => {
		const incomingCall = await getCall(callId)
		if (incomingCall?.isIncoming) return incomingCall.accept(options ?? {})
		return baseAcceptCall(callId, callFrom, isVideo)
	}

	const rejectCall = async (callId: string, callFrom?: string, reason?: string) => {
		const incomingCall = await getCall(callId)
		if (incomingCall?.isIncoming) return incomingCall.reject(reason)
		return baseRejectCall(callId, callFrom)
	}

	return {
		...sock,
		// Username management
		checkUsername,
		checkUsernameMulti,
		setUsername,
		deleteUsername,
		getMyUsername,
		setUsernamePin,
		findUserByUsername,
		fetchContactUsernames,
		getUsernameRecommendations,
		usernameCache,
		resolveUsername,
		resolveUsernames,
		invalidateUsername,
		refreshUsername,
		// Overrides the raw-USync-only version from the earlier socket
		// layer — this one carries lid/pn (see comment at its declaration).
		onWhatsAppUsername,
		// Constants (expose for consumers)
		USERNAME_QUERY_IDS,
		USERNAME_CHECK_RESULT,
		USERNAME_SOURCE,
		// VoIP calling
		initiateCall,
		initiateCalls,
		getActiveCalls,
		getCall,
		getActiveCallCount,
		endCall,
		endAllCalls,
		setVoipOptions,
		getVoipMemoryStats,
		getVoipClient,
		disconnectVoip,
		acceptCall,
		rejectCall
	}
}

export type UsernameSocket = ReturnType<typeof makeUsernameSocket>
