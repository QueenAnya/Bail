/**
 * calls.ts
 * Ported from @innovatorssoft/baileys
 *
 * Outgoing call API: initiate, cancel, accept, reject, mute, terminate, etc.
 * This module exports a factory function that takes the low-level socket primitives
 * and returns all call helpers — same pattern as the rest of Baileys' socket layer.
 */

import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import { isJidGroup } from '../WABinary/jid-utils.js'
import { generateMessageIDV2 } from '../Utils/generics.js'
import type { BinaryNode } from '../WABinary/types.js'
import type { AuthenticationState } from '../Types/Auth.js'
import type { ILogger } from '../Utils/logger.js'

// ── Types ─────────────────────────────────────────────────────────────────────

export type CallOfferCacheEntry = {
	chatId: string
	from: string
	id: string
	date: Date
	offline: boolean
	status: 'offer' | 'accepted' | 'terminated'
	isVideo: boolean
	isGroup: boolean
	groupJid?: string
}

export type InitiateCallOptions = {
	isVideo?: boolean
}

export type RelayInfo = {
	relayName?: string
	latency: number
	relayId?: string
	dlBw?: number
	ulBw?: number
}

export type CallsSocketPrimitives = {
	authState: { creds: AuthenticationState['creds'] }
	sendNode: (node: BinaryNode) => Promise<void>
	query: (node: BinaryNode) => Promise<BinaryNode>
	logger: ILogger
	/**
	 * A simple async key-value cache. Can be as simple as:
	 *   const cache = new Map()
	 *   { get: async k => cache.get(k), set: async (k,v) => cache.set(k,v), del: async k => cache.delete(k) }
	 */
	callOfferCache: {
		get: (key: string) => Promise<CallOfferCacheEntry | undefined>
		set: (key: string, value: CallOfferCacheEntry) => Promise<void>
		del: (key: string) => Promise<void>
	}
	/**
	 * Baileys' getUSyncDevices and assertSessions helpers (from messages-recv socket).
	 * Pass them directly from the outer socket scope.
	 */
	getUSyncDevices: (
		jids: string[],
		forceAssert: boolean,
		ignoreEphemeral: boolean
	) => Promise<Array<{ user: string; device: number }>>
	assertSessions: (devices: string[], force: boolean) => Promise<void>
	createParticipantNodes: (
		devices: string[],
		message: object,
		extraAttrs?: object
	) => Promise<{ nodes: BinaryNode[]; shouldIncludeDeviceIdentity: boolean }>
	encodeSignedDeviceIdentity: (account: unknown, includeSignatureKey: boolean) => Uint8Array
	jidEncode: (user: string, server: string, device?: number) => string
}

// ── Factory ───────────────────────────────────────────────────────────────────

export const makeCallSocket = (primitives: CallsSocketPrimitives) => {
	const {
		authState,
		sendNode,
		query,
		logger,
		callOfferCache,
		getUSyncDevices,
		assertSessions,
		createParticipantNodes,
		encodeSignedDeviceIdentity,
		jidEncode
	} = primitives

	const offerCall = async (toJid: string, isVideo = false) => {
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

		offerContent.push({ tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined })
		offerContent.push({ tag: 'audio', attrs: { enc: 'opus', rate: '8000' }, content: undefined })
		offerContent.push({ tag: 'net', attrs: { medium: '3' }, content: undefined })
		offerContent.push({
			tag: 'capability',
			attrs: { ver: '1' },
			content: new Uint8Array([1, 4, 255, 131, 207, 4])
		})
		offerContent.push({ tag: 'encopt', attrs: { keygen: '2' }, content: undefined })

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

		if (shouldIncludeDeviceIdentity) {
			offerContent.push({
				tag: 'device-identity',
				attrs: {},
				content: encodeSignedDeviceIdentity(authState.creds.account, true)
			})
		}

		const stanza: BinaryNode = {
			tag: 'call',
			attrs: { id: generateMessageIDV2(), to: toJid },
			content: [
				{
					tag: 'offer',
					attrs: { 'call-id': callId, 'call-creator': authState.creds.me!.id },
					content: offerContent
				}
			]
		}

		await query(stanza)
		return { id: callId, to: toJid }
	}

	/** Initiate an outgoing call to a JID. Returns { callId, to, isVideo }. */
	const initiateCall = async (jid: string, options: InitiateCallOptions = {}) => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated')

		const isVideo = !!options.isVideo
		const isGroup = isJidGroup(jid)
		const result = await offerCall(jid, isVideo)
		const callId = result.id

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
		})

		return { callId, to: jid, isVideo }
	}

	/** Cancel / end an outgoing call. */
	const cancelCall = async (callId: string, callTo: string) => {
		return terminateCall(callId, callTo)
	}

	/** Terminate (end) a call. */
	const terminateCall = async (
		callId: string,
		callTo: string,
		callCreator?: string,
		reason?: string,
		duration?: number
	) => {
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

		await sendNode({
			tag: 'call',
			attrs: { to: callTo, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'terminate', attrs: terminateAttrs, content: undefined }]
		})
		await callOfferCache.del(callId)
	}

	/** Reject an incoming call. */
	const rejectCall = async (callId: string, callFrom: string) => {
		await query({
			tag: 'call',
			attrs: { from: authState.creds.me!.id, to: callFrom },
			content: [
				{
					tag: 'reject',
					attrs: { 'call-id': callId, 'call-creator': callFrom, count: '0' },
					content: undefined
				}
			]
		})
	}

	/** Accept (answer) an incoming call. */
	const acceptCall = async (callId: string, callFrom: string, isVideo = false) => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated', { statusCode: 401 })

		const acceptContent: BinaryNode[] = [{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }]
		if (isVideo) {
			acceptContent.push({
				tag: 'video',
				attrs: { dec: 'H264,AV1', device_orientation: '1' },
				content: undefined
			})
		}
		acceptContent.push(
			{ tag: 'net', attrs: { medium: '2' }, content: undefined },
			{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
		)

		await query({
			tag: 'call',
			attrs: { from: meId, to: callFrom, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'accept',
					attrs: { 'call-id': callId, 'call-creator': callFrom },
					content: acceptContent
				}
			]
		})
	}

	/** Send preaccept (codec capabilities) for an incoming call. */
	const preacceptCall = async (callId: string, callCreator: string, isVideo = false) => {
		const preacceptContent: BinaryNode[] = [{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }]
		if (isVideo) {
			preacceptContent.push({
				tag: 'video',
				attrs: {
					screen_width: '1080',
					screen_height: '2400',
					dec: 'H264,H265,AV1',
					device_orientation: '0'
				},
				content: undefined
			})
		}
		preacceptContent.push(
			{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined },
			{ tag: 'capability', attrs: { ver: '1' }, content: undefined }
		)

		await sendNode({
			tag: 'call',
			attrs: { to: callCreator, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'preaccept',
					attrs: { 'call-id': callId, 'call-creator': callCreator },
					content: preacceptContent
				}
			]
		})
	}

	/** Mute or unmute audio during a call. */
	const muteCall = async (callId: string, callCreator: string, to: string, muted: boolean) => {
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

	/** Toggle video state during a call. */
	const sendVideoState = async (
		callId: string,
		callCreator: string,
		to: string,
		enabled: boolean,
		orientation = '1'
	) => {
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

	/** Send heartbeat to keep a group/link call alive. */
	const sendHeartbeat = async (callId: string, callCreator: string) => {
		await sendNode({
			tag: 'call',
			attrs: { to: `${callId}@call`, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'heartbeat',
					attrs: { 'call-id': callId, 'call-creator': callCreator },
					content: undefined
				}
			]
		})
	}

	/** Query info about a call link before joining. */
	const queryCallLink = async (token: string, media = 'video') => {
		return query({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'link_query', attrs: { media, token }, content: undefined }]
		})
	}

	/** Join a call via its link token. */
	const joinCallLink = async (token: string, media = 'video') => {
		const joinContent: BinaryNode[] = [
			{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined },
			{ tag: 'net', attrs: { medium: '2' }, content: undefined },
			{ tag: 'capability', attrs: { ver: '1' }, content: undefined }
		]
		if (media === 'video') {
			joinContent.splice(1, 0, {
				tag: 'video',
				attrs: {
					screen_width: '1080',
					screen_height: '2400',
					dec: 'H264,H265,AV1',
					device_orientation: '0'
				},
				content: undefined
			})
		}
		return query({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'link_join', attrs: { media, token }, content: joinContent }]
		})
	}

	/** Report relay latency to server. */
	const sendRelayLatency = async (callId: string, callCreator: string, relays: RelayInfo[], transactionId?: string) => {
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

	/** Send call duration log after a call ends. */
	const sendCallDuration = async (
		callId: string,
		callCreator: string,
		peer: string,
		audioDuration: number,
		callType = '1x1'
	) => {
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

	/** Send encryption re-key during a call. */
	const sendEncRekey = async (callId: string, callCreator: string, to: string, transactionId: string) => {
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
		offerCall,
		initiateCall,
		cancelCall,
		terminateCall,
		rejectCall,
		acceptCall,
		preacceptCall,
		muteCall,
		sendVideoState,
		sendHeartbeat,
		queryCallLink,
		joinCallLink,
		sendRelayLatency,
		sendCallDuration,
		sendEncRekey
	}
}
