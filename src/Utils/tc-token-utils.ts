import type { SignalKeyStoreWithTransaction } from '../Types'
import type { BinaryNode } from '../WABinary'
import {
	getBinaryNodeChild,
	getBinaryNodeChildren,
	isHostedLidUser,
	isHostedPnUser,
	isJidMetaAI,
	isLidUser,
	isPnUser,
	jidNormalizedUser
} from '../WABinary'
import type { ILogger } from './logger'
import { makeKeyedMutex } from './make-mutex'

// Serializes read-compare-write per storageJid so concurrent incoming messages
// from the same contact can't race and let an older token clobber a newer one.
// Fixes PR #2752 reviewer P2: "read-compare-write sequence isn't serialized".
const tcTokenWriteMutex = makeKeyedMutex()

// Same phone-number pattern as WABinary's isJidBot, applied against the user
// part so the check is invariant to @c.us ↔ @s.whatsapp.net normalization.
const BOT_PHONE_REGEX = /^1313555\d{4}$|^131655500\d{2}$/

/**
 * Mirrors WA Web's `Wid.isRegularUser()` (user ∧ ¬PSA ∧ ¬Bot). Used to gate tctoken
 * storage against malformed notifications — WA Web filters server-side but we
 * defend here for parity with `WAWebSetTcTokenChatAction.handleIncomingTcToken`.
 * Works for both pre- and post-normalized JIDs (`@c.us` vs `@s.whatsapp.net`).
 */
function isRegularUser(jid: string | undefined): boolean {
	if (!jid) return false
	const user = jid.split('@')[0] ?? ''
	if (user === '0') return false // PSA
	if (BOT_PHONE_REGEX.test(user)) return false // Bot by phone pattern
	if (isJidMetaAI(jid)) return false // MetaAI (@bot server)
	return !!(isPnUser(jid) || isLidUser(jid) || isHostedPnUser(jid) || isHostedLidUser(jid) || jid.endsWith('@c.us'))
}

const TC_TOKEN_BUCKET_DURATION = 604800 // 7 days
const TC_TOKEN_NUM_BUCKETS = 4 // ~28-day rolling window

/** Sentinel key under `tctoken` store holding a JSON array of tracked storage JIDs for cross-session pruning. */
export const TC_TOKEN_INDEX_KEY = '__index'

/** Read the persisted tctoken JID index and return its entries (never contains the sentinel key itself). */
export async function readTcTokenIndex(keys: SignalKeyStoreWithTransaction): Promise<string[]> {
	const data = await keys.get('tctoken', [TC_TOKEN_INDEX_KEY])
	const entry = data[TC_TOKEN_INDEX_KEY]
	if (!entry?.token?.length) return []
	try {
		const parsed = JSON.parse(Buffer.from(entry.token).toString())
		if (!Array.isArray(parsed)) return []
		return parsed.filter((j): j is string => typeof j === 'string' && j.length > 0 && j !== TC_TOKEN_INDEX_KEY)
	} catch {
		return []
	}
}

/** Build a SignalDataSet fragment that writes the merged index (persisted ∪ added) under the sentinel key. */
export async function buildMergedTcTokenIndexWrite(
	keys: SignalKeyStoreWithTransaction,
	addedJids: Iterable<string>
): Promise<{ [TC_TOKEN_INDEX_KEY]: { token: Buffer } }> {
	const persisted = await readTcTokenIndex(keys)
	const merged = new Set(persisted)
	for (const jid of addedJids) {
		if (jid && jid !== TC_TOKEN_INDEX_KEY) merged.add(jid)
	}

	return {
		[TC_TOKEN_INDEX_KEY]: { token: Buffer.from(JSON.stringify([...merged])) }
	}
}

// WA Web has separate sender/receiver AB props for these but they're identical today
export function isTcTokenExpired(timestamp: number | string | null | undefined): boolean {
	if (timestamp === null || timestamp === undefined) return true
	const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp
	if (isNaN(ts)) return true
	const now = Math.floor(Date.now() / 1000)
	const currentBucket = Math.floor(now / TC_TOKEN_BUCKET_DURATION)
	const cutoffBucket = currentBucket - (TC_TOKEN_NUM_BUCKETS - 1)
	const cutoffTimestamp = cutoffBucket * TC_TOKEN_BUCKET_DURATION
	return ts < cutoffTimestamp
}

export function shouldSendNewTcToken(senderTimestamp: number | undefined): boolean {
	if (senderTimestamp === undefined) return true
	const now = Math.floor(Date.now() / 1000)
	const currentBucket = Math.floor(now / TC_TOKEN_BUCKET_DURATION)
	const senderBucket = Math.floor(senderTimestamp / TC_TOKEN_BUCKET_DURATION)
	return currentBucket > senderBucket
}

/** Resolve JID to LID for tctoken storage (WA Web stores under LID) */
export async function resolveTcTokenJid(
	jid: string,
	getLIDForPN: (pn: string) => Promise<string | null>
): Promise<string> {
	if (isLidUser(jid)) return jid
	const lid = await getLIDForPN(jid)
	return lid ?? jid
}

/** Resolve target JID for issuing privacy token based on AB prop 14303 */
export async function resolveIssuanceJid(
	jid: string,
	issueToLid: boolean,
	getLIDForPN: (pn: string) => Promise<string | null>,
	getPNForLID?: (lid: string) => Promise<string | null>
): Promise<string> {
	if (issueToLid) {
		if (isLidUser(jid)) return jid
		const lid = await getLIDForPN(jid)
		return lid ?? jid
	}

	if (!isLidUser(jid)) return jid
	if (getPNForLID) {
		const pn = await getPNForLID(jid)
		return pn ?? jid
	}

	return jid
}

type TcTokenParams = {
	jid: string
	baseContent?: BinaryNode[]
	authState: {
		keys: SignalKeyStoreWithTransaction
	}
	getLIDForPN: (pn: string) => Promise<string | null>
}

export async function buildTcTokenFromJid({
	authState,
	jid,
	baseContent = [],
	getLIDForPN
}: TcTokenParams): Promise<BinaryNode[] | undefined> {
	try {
		const storageJid = await resolveTcTokenJid(jid, getLIDForPN)
		const tcTokenData = await authState.keys.get('tctoken', [storageJid])
		const entry = tcTokenData?.[storageJid]
		const tcTokenBuffer = entry?.token
		const timestamp = entry?.timestamp

		if (!tcTokenBuffer?.length || timestamp === undefined || isTcTokenExpired(timestamp)) {
			if (tcTokenBuffer) {
				// Preserve senderTimestamp so shouldSendNewTcToken() keeps its dedupe state
				// after we drop the unusable peer token. Only wipe the record entirely when
				// there's nothing worth keeping.
				const cleared =
					entry?.senderTimestamp !== undefined
						? { token: Buffer.alloc(0), senderTimestamp: entry.senderTimestamp }
						: null
				await authState.keys.set({ tctoken: { [storageJid]: cleared } })
			}

			return baseContent.length > 0 ? baseContent : undefined
		}

		baseContent.push({
			tag: 'tctoken',
			attrs: { t: String(timestamp) },
			content: tcTokenBuffer
		})

		return baseContent
	} catch (error) {
		return baseContent.length > 0 ? baseContent : undefined
	}
}

type StoreTcTokensParams = {
	result: BinaryNode
	fallbackJid: string
	keys: SignalKeyStoreWithTransaction
	getLIDForPN: (pn: string) => Promise<string | null>
	onNewJidStored?: (jid: string) => void
}

export async function storeTcTokensFromIqResult({
	result,
	fallbackJid,
	keys,
	getLIDForPN,
	onNewJidStored
}: StoreTcTokensParams) {
	const tokensNode = getBinaryNodeChild(result, 'tokens')
	if (!tokensNode) return

	const tokenNodes = getBinaryNodeChildren(tokensNode, 'token')
	for (const tokenNode of tokenNodes) {
		if (tokenNode.attrs.type !== 'trusted_contact' || !(tokenNode.content instanceof Uint8Array)) {
			continue
		}

		// In notifications tokenNode.attrs.jid is your own device JID, not the sender's
		const rawJid = jidNormalizedUser(fallbackJid || tokenNode.attrs.jid)
		if (!isRegularUser(rawJid)) continue
		const storageJid = await resolveTcTokenJid(rawJid, getLIDForPN)
		const existingTcData = await keys.get('tctoken', [storageJid])
		const existingEntry = existingTcData[storageJid]

		const existingTs = existingEntry?.timestamp ? Number(existingEntry.timestamp) : 0
		const incomingTs = tokenNode.attrs.t ? Number(tokenNode.attrs.t) : 0
		// timestamp-less tokens would be immediately expired
		if (!incomingTs) continue
		if (existingTs > 0 && existingTs > incomingTs) continue

		await keys.set({
			tctoken: {
				[storageJid]: {
					...existingEntry,
					token: Buffer.from(tokenNode.content),
					timestamp: tokenNode.attrs.t
				}
			}
		})
		onNewJidStored?.(storageJid)
	}
}

export type StoreTcTokenFromMessageParams = {
	/** The raw incoming <message> stanza (not yet decrypted) */
	node: BinaryNode
	keys: SignalKeyStoreWithTransaction
	getLIDForPN: (pn: string) => Promise<string | null>
	onNewJidStored?: (jid: string) => void
	/** Required for any code path crossing an async boundary (key-store + LID resolution) */
	logger: ILogger
	/**
	 * Preferred sender JID, e.g. `msg.key.participant || node.attrs.from` from
	 * the already-decrypted message envelope. In a group context, `node.attrs.from`
	 * alone is the GROUP jid, not the actual sender — pass this to resolve the
	 * individual participant correctly. Falls back to `node.attrs.from` if omitted.
	 */
	fallbackJid?: string
}

/**
 * Opportunistically captures a <tctoken> child WhatsApp attaches directly to
 * incoming <message> stanzas — mirrors WA Web's WAWebSetTcTokenChatAction.
 * handleIncomingTcToken, which keeps a token on hand for warm contacts
 * proactively, before a reply is ever attempted (avoiding a later 463).
 *
 * Call this fire-and-forget right after `decryptMessageNode` returns (so
 * `msg.key.participant` is available for correct group-sender resolution via
 * `fallbackJid`), but before requiring successful decryption — capture must
 * not depend on the message body actually decrypting.
 *
 * Source: WhiskeySockets/Baileys PR #2752 (sahilashraff)
 * Fixes applied vs the PR (reviewer-flagged):
 *  - P2: read-compare-write serialized per storageJid via makeKeyedMutex
 *    (prevents a race where an older token clobbers a newer one)
 *  - P2: dedup uses `>` (overwrite on equal timestamp) to match
 *    storeTcTokensFromIqResult's semantics
 *  - nit: accepts logger: ILogger and passes it through
 *  - group-context fix: accepts `fallbackJid` (caller-supplied
 *    `msg.key.participant || node.attrs.from`) instead of only trusting
 *    `node.attrs.from`, which is the GROUP jid — not the sender — on
 *    group message stanzas
 *
 * NOTE: the exact wire shape here is reverse-engineered from the upstream
 * PR and not independently traffic-verified in this fork — confirm against a
 * live capture before relying on it if tokens aren't refreshing as expected.
 */
export async function storeTcTokenFromMessageNode({
	node,
	keys,
	getLIDForPN,
	onNewJidStored,
	logger,
	fallbackJid
}: StoreTcTokenFromMessageParams): Promise<string | undefined> {
	const tcTokenNode = getBinaryNodeChild(node, 'tctoken')
	if (!tcTokenNode || !(tcTokenNode.content instanceof Uint8Array)) {
		return undefined
	}

	const rawJidAttr = fallbackJid || node.attrs.from
	if (!rawJidAttr) return undefined

	const rawJid = jidNormalizedUser(rawJidAttr)
	if (!isRegularUser(rawJid)) return undefined

	// Prefer sender_lid when present (group/broadcast context) — same
	// resolution preference as the rest of the tc-token subsystem.
	const senderLid = node.attrs.sender_lid ? jidNormalizedUser(node.attrs.sender_lid) : undefined
	const storageJid = senderLid ?? (await resolveTcTokenJid(rawJid, getLIDForPN))

	const incomingTs = tcTokenNode.attrs.t ? Number(tcTokenNode.attrs.t) : 0
	// timestamp-less tokens would be immediately expired
	if (!incomingTs) return undefined

	// P2 FIX: serialize get → compare → set per storageJid so two incoming
	// messages from the same contact in quick succession can't interleave
	// and let an older token overwrite a newer one.
	return tcTokenWriteMutex.mutex(storageJid, async () => {
		try {
			const existingTcData = await keys.get('tctoken', [storageJid])
			const existingEntry = existingTcData[storageJid]
			const existingTs = existingEntry?.timestamp ? Number(existingEntry.timestamp) : 0

			// P2 FIX: `>` not `>=` — matches storeTcTokensFromIqResult so a
			// re-issued token with an equal timestamp (but possibly updated
			// bytes) is still accepted, consistent across both capture paths.
			if (existingTs > 0 && existingTs > incomingTs) return undefined

			await keys.set({
				tctoken: {
					[storageJid]: {
						...existingEntry,
						token: Buffer.from(tcTokenNode.content as Uint8Array),
						timestamp: tcTokenNode.attrs.t
					}
				}
			})
			onNewJidStored?.(storageJid)
			return storageJid
		} catch (err) {
			logger.debug({ err }, 'failed to store tctoken from incoming message')
			return undefined
		}
	})
}
