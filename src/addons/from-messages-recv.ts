/**
 * from-messages-recv.ts
 * Source: addons/baileys + WhiskeySockets/Baileys + PR #2375
 *
 * All call functions as a factory — makeCallHandlers(deps) injects
 * socket-bound dependencies and returns all call functions ready to use.
 */

import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import type { WACallEvent, WAInitiateCallOptions, WAInitiateCallResult } from '../Types'
import { encodeSignedDeviceIdentity } from '../Utils'
import type { BinaryNode } from '../WABinary'
import { isJidGroup, jidEncode } from '../WABinary'

export type CallHandlerDeps = {
	authState: any
	query: (node: BinaryNode) => Promise<any>
	sendNode: (node: BinaryNode) => Promise<void>
	generateMessageTag: () => string
	getUSyncDevices: (
		jids: string[],
		useCache: boolean,
		ignoreZeroDevices: boolean
	) => Promise<Array<{ user: string; device?: number }>>
	assertSessions: (jids: string[], force?: boolean) => Promise<any>
	createParticipantNodes: (
		jids: string[],
		message: any,
		extraAttrs?: any
	) => Promise<{ nodes: BinaryNode[]; shouldIncludeDeviceIdentity: boolean }>
	callOfferCache: { set: (k: string, v: any, ttl?: number) => any; del: (k: string) => any }
}

export function makeCallHandlers(deps: CallHandlerDeps) {
	const {
		authState,
		query,
		sendNode,
		generateMessageTag,
		getUSyncDevices,
		assertSessions,
		createParticipantNodes,
		callOfferCache
	} = deps

	/** Reject an incoming call (WhiskeySockets) */
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

	/** Build and send a call offer stanza with proper E2E encryption (baileys) */
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
		offerContent.push({ tag: 'capability', attrs: { ver: '1' }, content: new Uint8Array([1, 4, 255, 131, 207, 4]) })
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

		await query({
			tag: 'call',
			attrs: { id: generateMessageTag(), to: toJid },
			content: [
				{
					tag: 'offer',
					attrs: { 'call-id': callId, 'call-creator': authState.creds.me!.id },
					content: offerContent
				}
			]
		})
		return { id: callId, to: toJid }
	}

	/** Initiate an outgoing call — calls offerCall, caches state (PR #2375 + addons) */
	const initiateCall = async (jid: string, options: WAInitiateCallOptions = {}): Promise<WAInitiateCallResult> => {
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
		} as WACallEvent)

		return { callId, to: jid, isVideo }
	}

	/** Terminate/hang up an active or ringing call (baileys) */
	const terminateCall = async (
		callId: string,
		callTo: string,
		callCreator?: string,
		reason?: string,
		duration?: number
	) => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated', { statusCode: 401 })

		const attrs: Record<string, string> = { 'call-id': callId, 'call-creator': callCreator || meId }
		if (reason) attrs.reason = reason
		if (typeof duration === 'number') {
			attrs.duration = String(duration)
			attrs.audio_duration = String(duration)
		}

		await query({
			tag: 'call',
			attrs: { to: callTo, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'terminate', attrs, content: undefined }]
		})
		await callOfferCache.del(callId)
	}

	/** Cancel an outgoing call — delegates to terminateCall */
	const cancelCall = async (callId: string, callTo: string) => terminateCall(callId, callTo)

	/** Accept (answer) an incoming call (baileys) */
	const acceptCall = async (callId: string, callFrom: string, isVideo?: boolean) => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated', { statusCode: 401 })

		const content: BinaryNode[] = [{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }]
		if (isVideo) content.push({ tag: 'video', attrs: { dec: 'H264,AV1', device_orientation: '1' }, content: undefined })
		content.push(
			{ tag: 'net', attrs: { medium: '2' }, content: undefined },
			{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
		)
		await query({
			tag: 'call',
			attrs: { from: meId, to: callFrom, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'accept', attrs: { 'call-id': callId, 'call-creator': callFrom }, content }]
		})
	}

	/** Send preaccept signal (codec capabilities) for an incoming call (baileys) */
	const preacceptCall = async (callId: string, callCreator: string, isVideo?: boolean) => {
		const content: BinaryNode[] = [{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }]
		if (isVideo) {
			content.push({
				tag: 'video',
				attrs: { screen_width: '1080', screen_height: '2400', dec: 'H264,H265,AV1', device_orientation: '0' },
				content: undefined
			})
		}

		content.push(
			{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined },
			{ tag: 'capability', attrs: { ver: '1' }, content: undefined }
		)
		await query({
			tag: 'call',
			attrs: { to: callCreator, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'preaccept', attrs: { 'call-id': callId, 'call-creator': callCreator }, content }]
		})
	}

	/** Report relay latency measurements (baileys) */
	const sendRelayLatency = async (
		callId: string,
		callCreator: string,
		relays: Array<{ relayName?: string; latency: number; relayId?: string; dlBw?: number; ulBw?: number }>,
		transactionId?: string
	) => {
		const attrs: Record<string, string> = { 'call-id': callId, 'call-creator': callCreator }
		if (transactionId) attrs['transaction-id'] = transactionId

		await sendNode({
			tag: 'call',
			attrs: { to: callCreator, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'relaylatency',
					attrs,
					content: relays.map(r => {
						const a: Record<string, string> = {}
						if (r.relayName) a.relay_name = r.relayName
						a.latency = String(r.latency)
						if (r.relayId) a.relay_id = r.relayId
						if (r.dlBw !== undefined) a.dl_bw = String(r.dlBw)
						if (r.ulBw !== undefined) a.ul_bw = String(r.ulBw)
						return { tag: 'te', attrs: a, content: undefined }
					})
				}
			]
		})
	}

	/** Send ICE transport candidates (baileys) */
	const sendTransport = async (
		callId: string,
		callCreator: string,
		to: string,
		candidates: Array<{ priority: string; data: Uint8Array }>,
		round?: number
	) => {
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

	/** Send call duration log after a call ends (baileys) */
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

	/** Mute or unmute during a call (baileys) */
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

	/** Send heartbeat to keep a group/link call alive (baileys) */
	const sendHeartbeat = async (callId: string, callCreator: string) => {
		await sendNode({
			tag: 'call',
			attrs: { to: `${callId}@call`, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'heartbeat', attrs: { 'call-id': callId, 'call-creator': callCreator }, content: undefined }]
		})
	}

	/** Send encryption re-key during a call (baileys) */
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

	/** Send video state change during a call (baileys) */
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

	/** Query info about a call link before joining (baileys) */
	const queryCallLink = async (token: string, media = 'video') => {
		return await query({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'link_query', attrs: { media, token }, content: undefined }]
		})
	}

	/** Join a call via its link token (baileys) */
	const joinCallLink = async (token: string, media = 'video') => {
		const content: BinaryNode[] = [
			{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined },
			{ tag: 'net', attrs: { medium: '2' }, content: undefined },
			{ tag: 'capability', attrs: { ver: '1' }, content: undefined }
		]
		if (media === 'video') {
			content.splice(1, 0, {
				tag: 'video',
				attrs: { screen_width: '1080', screen_height: '2400', dec: 'H264,H265,AV1', device_orientation: '0' },
				content: undefined
			})
		}

		return await query({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'link_join', attrs: { media, token }, content }]
		})
	}

	return {
		rejectCall,
		offerCall,
		initiateCall,
		terminateCall,
		cancelCall,
		acceptCall,
		preacceptCall,
		sendRelayLatency,
		sendTransport,
		sendCallDuration,
		muteCall,
		sendHeartbeat,
		sendEncRekey,
		sendVideoState,
		queryCallLink,
		joinCallLink
	}
}
