/**
 * Call Handler Addon
 * Ported from innovatorssoft/Baileys.
 *
 * Full outgoing call support: initiate, accept, cancel, mute, terminate,
 * join via link, query link, send heartbeat/transport/video-state/relay-latency/enc-rekey.
 *
 * Usage — inject into makeCallsSocket (messages-recv layer):
 * ```ts
 * const callAddon = makeCallHandlerAddon({ query, sendNode, authState, callOfferCache,
 *     assertSessions, createParticipantNodes, getUSyncDevices })
 * return { ...sock, ...callAddon }
 * ```
 */

import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import { proto } from '../../WAProto/index.js'
import type { SocketConfig } from '../Types'
import { encodeSignedDeviceIdentity } from '../Utils'
import { isJidGroup, jidEncode } from '../WABinary'

// =====================================================
// CONTEXT TYPES
// =====================================================

interface CallCacheStore {
	get<T>(key: string): Promise<T | undefined>
	set<T>(key: string, value: T): Promise<void>
	del(key: string): Promise<void>
}

interface BinaryNode {
	tag: string
	attrs: Record<string, string | undefined>
	content?: BinaryNode[] | Buffer | Uint8Array | undefined
}

export interface CallHandlerContext {
	query: (node: BinaryNode) => Promise<BinaryNode>
	sendNode: (node: BinaryNode) => Promise<void>
	authState: { creds: SocketConfig['auth']['creds'] }
	callOfferCache: CallCacheStore
	assertSessions: (jids: string[], force?: boolean) => Promise<void>
	createParticipantNodes: (
		jids: string[],
		message: proto.IMessage,
		extraAttrs?: Record<string, string>
	) => Promise<{ nodes: BinaryNode[]; shouldIncludeDeviceIdentity: boolean }>
	getUSyncDevices: (
		jids: string[],
		useCache: boolean,
		ignoreZeroDevices: boolean
	) => Promise<Array<{ user: string; device: number }>>
}

// =====================================================
// RELAY LATENCY TYPES
// =====================================================

export interface RelayEntry {
	relayName?: string
	latency: number
	relayId?: string
	dlBw?: number
	ulBw?: number
}

export interface CallTransportCandidate {
	priority: string
	data: Uint8Array
}

// =====================================================
// FACTORY
// =====================================================

export const makeCallHandlerAddon = (ctx: CallHandlerContext) => {
	const { query, sendNode, authState, callOfferCache, assertSessions, createParticipantNodes, getUSyncDevices } = ctx

	// ─── internal helper ───────────────────────────────────────────────────────

	/** Sanitize Brazilian phone numbers (removes 9th digit in some cases) */
	const sanitizeCallerPn = (pn: string | undefined): string | undefined => {
		if (!pn) return undefined
		if (!pn.startsWith('55')) return pn
		if (pn.length === 13) {
			const firstDigitAfterDDD = pn.charAt(4)
			if (['2', '3', '4', '5'].includes(firstDigitAfterDDD) && pn.endsWith('0')) {
				return pn.slice(0, -1)
			}
		}

		return pn
	}

	// ─── internal call primitives ──────────────────────────────────────────────

	const terminateCall = async (
		callId: string,
		callTo: string,
		callCreator?: string,
		reason?: string,
		duration?: number
	): Promise<void> => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated', { statusCode: 401 })

		const terminateAttrs: Record<string, string> = {
			'call-id': callId,
			'call-creator': callCreator || meId
		}
		if (reason) terminateAttrs.reason = reason
		if (typeof duration === 'number') {
			terminateAttrs.duration = String(duration)
			terminateAttrs.audio_duration = String(duration)
		}

		await query({
			tag: 'call',
			attrs: { to: callTo, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'terminate', attrs: terminateAttrs, content: undefined }]
		})
		await callOfferCache.del(callId)
	}

	const offerCall = async (toJid: string, isVideo = false): Promise<BinaryNode> => {
		const callId = randomBytes(16).toString('hex').toUpperCase().substring(0, 64)
		const offerContent: BinaryNode[] = []

		if (isVideo) {
			offerContent.push({
				tag: 'video',
				attrs: {
					enc: 'vp8',
					dec: 'vp8',
					orientation: '0',
					screen_width: '1920',
					screen_height: '1080',
					device_orientation: '0'
				},
				content: undefined
			})
		}

		offerContent.push(
			{ tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined },
			{ tag: 'audio', attrs: { enc: 'opus', rate: '8000' }, content: undefined },
			{ tag: 'net', attrs: { medium: '3' }, content: undefined },
			{ tag: 'capability', attrs: { ver: '1' }, content: new Uint8Array([1, 4, 255, 131, 207, 4]) },
			{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
		)

		const encKey = randomBytes(32)
		const devices = (await getUSyncDevices([toJid], true, false)).map(({ user, device }) =>
			jidEncode(user, 's.whatsapp.net', device)
		)

		await assertSessions(devices, true)

		const { nodes: destinations, shouldIncludeDeviceIdentity } = await createParticipantNodes(
			devices,
			{ call: { callKey: new Uint8Array(encKey) } },
			{ count: '0' }
		)
		offerContent.push({ tag: 'destination', attrs: {}, content: destinations })

		if (shouldIncludeDeviceIdentity && authState.creds.account) {
			offerContent.push({
				tag: 'device-identity',
				attrs: {},
				content: encodeSignedDeviceIdentity(authState.creds.account, true)
			})
		}

		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated', { statusCode: 401 })

		const stanza: BinaryNode = {
			tag: 'call',
			attrs: {
				from: meId,
				to: toJid,
				id: randomBytes(16).toString('hex').toUpperCase()
			},
			content: [
				{
					tag: 'offer',
					attrs: { 'call-id': callId, 'call-creator': meId },
					content: offerContent
				}
			]
		}

		return await query(stanza)
	}

	// ─── public call API ───────────────────────────────────────────────────────

	/**
	 * Initiate a voice or video call to `jid`.
	 * @returns `{ callId, to, isVideo }`
	 */
	const initiateCall = async (
		jid: string,
		options: { isVideo?: boolean } = {}
	): Promise<{ callId: string; to: string; isVideo: boolean }> => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated')

		const isVideo = !!options.isVideo
		const isGroup = isJidGroup(jid)
		const result = await offerCall(jid, isVideo)
		const callId = result.attrs?.id || ''

		await callOfferCache.set(callId, {
			chatId: jid,
			from: meId,
			id: callId,
			date: new Date(),
			offline: false,
			status: 'offer',
			isVideo,
			isGroup,
			groupJid: isGroup ? jid : undefined
		} as WACallEvent)

		return { callId, to: jid, isVideo }
	}

	/** Accept an incoming call. */
	const acceptCall = async (callId: string, callFrom: string, isVideo: boolean): Promise<void> => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated', { statusCode: 401 })

		const acceptContent: BinaryNode[] = [{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }]
		if (isVideo) {
			acceptContent.push({ tag: 'video', attrs: { dec: 'H264,AV1', device_orientation: '1' }, content: undefined })
		}

		acceptContent.push(
			{ tag: 'net', attrs: { medium: '2' }, content: undefined },
			{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
		)

		await query({
			tag: 'call',
			attrs: { from: meId, to: callFrom, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'accept', attrs: { 'call-id': callId, 'call-creator': callFrom }, content: acceptContent }]
		})
	}

	/** Cancel (terminate) an outgoing call. Alias for `terminateCall`. */
	const cancelCall = async (callId: string, callTo: string): Promise<void> => terminateCall(callId, callTo)

	/** Mute/unmute yourself in a call. */
	const muteCall = async (callId: string, callCreator: string, to: string, muted: boolean): Promise<void> => {
		await sendNode({
			tag: 'call',
			attrs: { to, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'mute_v2',
					attrs: { 'mute-state': muted ? '1' : '0', 'call-id': callId, 'call-creator': callCreator },
					content: undefined
				}
			]
		})
	}

	/** Pre-accept an incoming call (sends media capabilities before full accept). */
	const preacceptCall = async (callId: string, callCreator: string, isVideo: boolean): Promise<void> => {
		const preacceptContent: BinaryNode[] = [{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }]
		if (isVideo) {
			preacceptContent.push({
				tag: 'video',
				attrs: { screen_width: '1080', screen_height: '2400', dec: 'H264,H265,AV1', device_orientation: '0' },
				content: undefined
			})
		}

		preacceptContent.push(
			{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined },
			{ tag: 'capability', attrs: { ver: '1' }, content: undefined }
		)

		await query({
			tag: 'call',
			attrs: { to: callCreator, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{ tag: 'preaccept', attrs: { 'call-id': callId, 'call-creator': callCreator }, content: preacceptContent }
			]
		})
	}

	/** Join a call via link token. */
	const joinCallLink = async (token: string, media: 'audio' | 'video' = 'video'): Promise<BinaryNode> => {
		const joinContent: BinaryNode[] = [
			{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined },
			{ tag: 'net', attrs: { medium: '2' }, content: undefined },
			{ tag: 'capability', attrs: { ver: '1' }, content: undefined }
		]
		if (media === 'video') {
			joinContent.splice(1, 0, {
				tag: 'video',
				attrs: { screen_width: '1080', screen_height: '2400', dec: 'H264,H265,AV1', device_orientation: '0' },
				content: undefined
			})
		}

		return query({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'link_join', attrs: { media, token }, content: joinContent }]
		})
	}

	/** Query a call link (get call info before joining). */
	const queryCallLink = async (token: string, media: 'audio' | 'video' = 'video'): Promise<BinaryNode> =>
		query({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'link_query', attrs: { media, token }, content: undefined }]
		})

	/** Report call duration metrics. */
	const sendCallDuration = async (
		callId: string,
		callCreator: string,
		peer: string,
		audioDuration: number,
		callType = '1x1'
	): Promise<void> => {
		await sendNode({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'duration',
					attrs: {
						'call-id': callId,
						'call-creator': callCreator,
						peer,
						audio_duration: String(audioDuration),
						type: callType
					},
					content: undefined
				}
			]
		})
	}

	/** Send a heartbeat ping to keep the call alive. */
	const sendHeartbeat = async (callId: string, callCreator: string): Promise<void> => {
		await sendNode({
			tag: 'call',
			attrs: { to: `${callId}@call`, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'heartbeat', attrs: { 'call-id': callId, 'call-creator': callCreator }, content: undefined }]
		})
	}

	/** Send relay latency metrics for network diagnostics. */
	const sendRelayLatency = async (
		callId: string,
		callCreator: string,
		relays: RelayEntry[],
		transactionId?: string
	): Promise<void> => {
		const attrs: Record<string, string> = { 'call-id': callId, 'call-creator': callCreator }
		if (transactionId) attrs['transaction-id'] = transactionId

		const teChildren: BinaryNode[] = relays.map(r => {
			const teAttrs: Record<string, string> = {}
			if (r.relayName) teAttrs.relay_name = r.relayName
			teAttrs.latency = String(r.latency)
			if (r.relayId) teAttrs.relay_id = r.relayId
			if (r.dlBw !== undefined) teAttrs.dl_bw = String(r.dlBw)
			if (r.ulBw !== undefined) teAttrs.ul_bw = String(r.ulBw)
			return { tag: 'te', attrs: teAttrs, content: undefined }
		})

		await sendNode({
			tag: 'call',
			attrs: { to: callCreator, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'relaylatency', attrs, content: teChildren }]
		})
	}

	/** Send ICE transport candidates. */
	const sendTransport = async (
		callId: string,
		callCreator: string,
		to: string,
		candidates: CallTransportCandidate[],
		round?: number
	): Promise<void> => {
		const attrs: Record<string, string> = {
			'call-id': callId,
			'call-creator': callCreator,
			'transport-message-type': '1'
		}
		if (round !== undefined) attrs['p2p-cand-round'] = String(round)

		await sendNode({
			tag: 'call',
			attrs: { to, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'transport',
					attrs,
					content: candidates.map(c => ({ tag: 'te', attrs: { priority: c.priority }, content: c.data }))
				}
			]
		})
	}

	/** Send video state (enabled/disabled + orientation). */
	const sendVideoState = async (
		callId: string,
		callCreator: string,
		to: string,
		enabled: boolean,
		orientation = '1'
	): Promise<void> => {
		await sendNode({
			tag: 'call',
			attrs: { to, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'video',
					attrs: {
						'call-id': callId,
						'call-creator': callCreator,
						state: enabled ? '1' : '0',
						device_orientation: orientation
					},
					content: undefined
				}
			]
		})
	}

	/** Send encryption re-key request. */
	const sendEncRekey = async (
		callId: string,
		callCreator: string,
		to: string,
		transactionId: string
	): Promise<void> => {
		await sendNode({
			tag: 'call',
			attrs: { to, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'enc_rekey',
					attrs: { 'transaction-id': transactionId, 'call-id': callId, 'call-creator': callCreator },
					content: [
						{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined },
						{ tag: 'enc', attrs: { v: '2', type: 'msg' }, content: undefined }
					]
				}
			]
		})
	}

	return {
		sanitizeCallerPn,
		initiateCall,
		acceptCall,
		cancelCall,
		muteCall,
		terminateCall,
		preacceptCall,
		joinCallLink,
		queryCallLink,
		sendCallDuration,
		sendHeartbeat,
		sendRelayLatency,
		sendTransport,
		sendVideoState,
		sendEncRekey
	}
}
