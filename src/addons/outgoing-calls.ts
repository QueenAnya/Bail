import type { WAInitiateCallOptions, WAInitiateCallResult } from '../Types/Call.js'
/**
 * addon: outgoing-calls
 * Source patch: Baileys-feature-outgoing-calls
 *
 * Adds:
 *   - WAInitiateCallOptions / WAInitiateCallResult types
 *   - createCallLink() — creates an audio or video call invite link via WA servers
 *   - initiateCall()   — initiates a direct 1-on-1 or group call (binary node send)
 *   - rejectCall()     — rejects an incoming call by call-id
 *
 * createCallLink is wired directly into chats.ts; initiateCall and rejectCall
 * are implemented here as standalone helpers that require a `sendNode` / `query` ref.
 */

import type { BinaryNode } from '../WABinary'
import { getBinaryNodeChild } from '../WABinary'
// generateMessageTag is a socket-layer util; we inline a compatible version here
const generateMessageTag = (): string =>
	Math.random().toString(36).slice(2, 8).toUpperCase() + Date.now().toString(36).toUpperCase()

// Types imported from '../Types/Call.js'

// ── createCallLink ─────────────────────────────────────────────────────────────
/**
 * Creates an audio or video call invite link via WA servers.
 * Returns the invite token string, or undefined on failure.
 *
 * Must be called with the socket's `query` and `generateMessageTag` functions.
 *
 * @example
 * const token = await createCallLink(query, generateMessageTag, 'video')
 * // Share: https://call.whatsapp.com/voice/token/<token>
 */
export const createCallLink = async (
	query: (node: BinaryNode, timeoutMs?: number) => Promise<BinaryNode>,
	type: 'audio' | 'video',
	event?: { startTime: number },
	timeoutMs?: number
): Promise<string | undefined> => {
	const result = await query(
		{
			tag: 'call',
			attrs: {
				id: generateMessageTag(),
				to: '@call'
			},
			content: [
				{
					tag: 'link_create',
					attrs: { media: type },
					content: event ? [{ tag: 'event', attrs: { start_time: String(event.startTime) } }] : undefined
				}
			]
		},
		timeoutMs
	)
	const child = getBinaryNodeChild(result, 'link_create')
	return child?.attrs?.token
}

// ── initiateCall ──────────────────────────────────────────────────────────────
/**
 * Initiate a direct 1-on-1 or group call.
 * Sends a `call` binary node with an `offer` child to the recipient JID.
 * Returns the generated callId.
 *
 * @param sendNode  — socket's raw sendNode function
 * @param meJid     — our own JID
 * @param toJid     — recipient / group JID
 * @param opts      — { isVideo?: boolean }
 */
export const initiateCall = async (
	sendNode: (node: BinaryNode) => Promise<void>,
	meJid: string,
	toJid: string,
	opts: WAInitiateCallOptions = {}
): Promise<WAInitiateCallResult> => {
	const callId = generateMessageTag()
	const isVideo = opts.isVideo ?? false

	await sendNode({
		tag: 'call',
		attrs: {
			from: meJid,
			to: toJid
		},
		content: [
			{
				tag: 'offer',
				attrs: {
					'call-id': callId,
					'call-creator': meJid
				},
				content: [
					{
						tag: 'audio',
						attrs: { enc: 'opus', rate: '16000' }
					},
					...(isVideo
						? [{ tag: 'video', attrs: { orientation: '0', device_orientation: '0', enc: 'vp8', dec: 'vp8' } }]
						: [])
				]
			}
		]
	})

	return { callId, to: toJid, isVideo }
}

// ── rejectCall ────────────────────────────────────────────────────────────────
/**
 * Reject an incoming call.
 * Sends a `call` binary node with a `reject` child.
 *
 * @param sendNode    — socket's raw sendNode function
 * @param meJid       — our own JID
 * @param fromJid     — caller's JID
 * @param callId      — the call-id from the incoming offer
 * @param callCreator — who created the call (usually same as fromJid)
 */
export const rejectCall = async (
	sendNode: (node: BinaryNode) => Promise<void>,
	meJid: string,
	fromJid: string,
	callId: string,
	callCreator?: string
): Promise<void> => {
	await sendNode({
		tag: 'call',
		attrs: {
			from: meJid,
			to: fromJid
		},
		content: [
			{
				tag: 'reject',
				attrs: {
					'call-id': callId,
					'call-creator': callCreator ?? fromJid
				}
			}
		]
	})
}

// ── endCall ───────────────────────────────────────────────────────────────────
/**
 * Terminate / end an ongoing call.
 */
export const endCall = async (
	sendNode: (node: BinaryNode) => Promise<void>,
	meJid: string,
	toJid: string,
	callId: string,
	callCreator?: string
): Promise<void> => {
	await sendNode({
		tag: 'call',
		attrs: {
			from: meJid,
			to: toJid
		},
		content: [
			{
				tag: 'terminate',
				attrs: {
					'call-id': callId,
					'call-creator': callCreator ?? meJid,
					reason: 'timeout'
				}
			}
		]
	})
}
