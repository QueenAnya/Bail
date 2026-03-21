/**
 * from-messages-recv.ts
 * Source: src/Socket/messages-recv.ts
 *
 * Call stanza builders ported from innovatorssoft/baileys.
 * These pure stanza-building functions are imported into makeMessagesRecvSocket.
 *
 * NOTE: offerCall/terminateCall/initiateCall/cancelCall/acceptCall stay inside
 * messages-recv.ts because they depend on socket-bound functions
 * (getUSyncDevices, assertSessions, createParticipantNodes, callOfferCache).
 * Only the stanza-shape helpers live here.
 */

import { randomBytes } from 'crypto'
import type { BinaryNode } from '../WABinary'

/** Build reject call stanza */
export function buildRejectCallStanza(callId: string, callFrom: string, meId: string): BinaryNode {
	return {
		tag: 'call',
		attrs: { from: meId, to: callFrom },
		content: [{
			tag: 'reject',
			attrs: { 'call-id': callId, 'call-creator': callFrom, count: '0' },
			content: undefined
		}]
	}
}

/** Build terminate call stanza */
export function buildTerminateCallStanza(
	callId: string,
	callTo: string,
	meId: string,
	callCreator?: string,
	reason?: string,
	duration?: number
): BinaryNode {
	const attrs: Record<string, string> = {
		'call-id': callId,
		'call-creator': callCreator || meId
	}
	if(reason) attrs.reason = reason
	if(typeof duration === 'number') {
		attrs.duration = String(duration)
		attrs.audio_duration = String(duration)
	}
	return {
		tag: 'call',
		attrs: { to: callTo, id: randomBytes(16).toString('hex').toUpperCase() },
		content: [{ tag: 'terminate', attrs, content: undefined }]
	}
}

/** Build accept call stanza */
export function buildAcceptCallStanza(callId: string, callFrom: string, meId: string, isVideo?: boolean): BinaryNode {
	const content: any[] = [
		{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }
	]
	if(isVideo) content.push({ tag: 'video', attrs: { dec: 'H264,AV1', device_orientation: '1' }, content: undefined })
	content.push(
		{ tag: 'net', attrs: { medium: '2' }, content: undefined },
		{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
	)
	return {
		tag: 'call',
		attrs: { from: meId, to: callFrom, id: randomBytes(16).toString('hex').toUpperCase() },
		content: [{
			tag: 'accept',
			attrs: { 'call-id': callId, 'call-creator': callFrom },
			content
		}]
	}
}

/** Build offer call content nodes (audio/video/net/capability/encopt) */
export function buildOfferCallContent(isVideo: boolean): any[] {
	const content: any[] = []
	if(isVideo) {
		content.push({
			tag: 'video',
			attrs: { enc: 'vp8', dec: 'vp8', orientation: '0', screen_width: '1920', screen_height: '1080', device_orientation: '0' },
			content: undefined
		})
	}
	content.push({ tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined })
	content.push({ tag: 'audio', attrs: { enc: 'opus', rate: '8000' }, content: undefined })
	content.push({ tag: 'net', attrs: { medium: '3' }, content: undefined })
	content.push({ tag: 'capability', attrs: { ver: '1' }, content: new Uint8Array([1, 4, 255, 131, 207, 4]) })
	content.push({ tag: 'encopt', attrs: { keygen: '2' }, content: undefined })
	return content
}
