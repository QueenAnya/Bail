/**
 * from-messages-recv.ts
 * Source: src/Socket/messages-recv.ts
 *
 * Call-related functions ported from innovatorssoft/baileys.
 * These are used in makeMessagesRecvSocket and imported back there.
 */
import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import type { BinaryNode } from '../../WABinary'
import type { AuthenticationState } from '../../Types'

export interface CallResult {
	callId: string
	to: string
	isVideo: boolean
}

/**
 * Build stanza + execute rejectCall
 * Source: messages-recv.ts → rejectCall
 */
export async function execRejectCall(
	callId: string,
	callFrom: string,
	meId: string,
	query: (node: BinaryNode) => Promise<any>
): Promise<void> {
	const stanza: BinaryNode = {
		tag: 'call',
		attrs: { from: meId, to: callFrom },
		content: [{
			tag: 'reject',
			attrs: { 'call-id': callId, 'call-creator': callFrom, count: '0' },
			content: undefined
		}]
	}
	await query(stanza)
}

/**
 * Build stanza + execute initiateCall
 * Source: messages-recv.ts → initiateCall
 */
export async function execInitiateCall(
	jid: string,
	isVideo: boolean,
	isGroup: boolean,
	meId: string,
	query: (node: BinaryNode) => Promise<any>,
	callOfferCache: { set: (id: string, val: any) => Promise<any> }
): Promise<CallResult> {
	const callId = randomBytes(16).toString('hex').toUpperCase()
	const audioContent: any[] = [
		{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }
	]
	if(isVideo) audioContent.push({ tag: 'video', attrs: { dec: 'H264,AV1', device_orientation: '1' }, content: undefined })
	audioContent.push(
		{ tag: 'net', attrs: { medium: '2' }, content: undefined },
		{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
	)
	const stanza: BinaryNode = {
		tag: 'call',
		attrs: { from: meId, to: jid, id: callId },
		content: [{
			tag: 'offer',
			attrs: { 'call-id': callId, 'call-creator': meId },
			content: audioContent
		}]
	}
	await query(stanza)
	await callOfferCache.set(callId, {
		chatId: jid, from: meId, id: callId,
		date: new Date(), offline: false, status: 'offer',
		isVideo, isGroup, groupJid: isGroup ? jid : undefined
	})
	return { callId, to: jid, isVideo }
}

/**
 * Build stanza + execute cancelCall
 * Source: messages-recv.ts → cancelCall
 */
export async function execCancelCall(
	callId: string,
	callTo: string,
	meId: string,
	query: (node: BinaryNode) => Promise<any>,
	callOfferCache: { del: (id: string) => Promise<any> }
): Promise<void> {
	const stanza: BinaryNode = {
		tag: 'call',
		attrs: { from: meId, to: callTo, id: randomBytes(8).toString('hex').toUpperCase() },
		content: [{
			tag: 'revoke',
			attrs: { 'call-id': callId, 'call-creator': meId },
			content: undefined
		}]
	}
	await query(stanza)
	await callOfferCache.del(callId)
}

/**
 * Build stanza + execute acceptCall
 * Source: messages-recv.ts → acceptCall
 */
export async function execAcceptCall(
	callId: string,
	callFrom: string,
	isVideo: boolean,
	meId: string,
	query: (node: BinaryNode) => Promise<any>
): Promise<void> {
	const content: any[] = [
		{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }
	]
	if(isVideo) content.push({ tag: 'video', attrs: { dec: 'H264,AV1', device_orientation: '1' }, content: undefined })
	content.push(
		{ tag: 'net', attrs: { medium: '2' }, content: undefined },
		{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
	)
	const stanza: BinaryNode = {
		tag: 'call',
		attrs: { from: meId, to: callFrom, id: randomBytes(16).toString('hex').toUpperCase() },
		content: [{
			tag: 'accept',
			attrs: { 'call-id': callId, 'call-creator': callFrom },
			content
		}]
	}
	await query(stanza)
}

/**
 * Factory: creates rejectCall, initiateCall, cancelCall, acceptCall
 * bound to an authState + query + callOfferCache.
 * Import this in makeMessagesRecvSocket and spread into return.
 *
 * Source: messages-recv.ts
 */
export function createCallHandlers(
	authState: AuthenticationState,
	query: (node: BinaryNode) => Promise<any>,
	callOfferCache: { set: (id: string, val: any) => Promise<any>; del: (id: string) => Promise<any> },
	isJidGroup: (jid: string) => boolean
) {
	const getMe = () => {
		const meId = authState.creds.me?.id
		if(!meId) throw new Boom('Not authenticated')
		return meId
	}

	return {
		rejectCall: async (callId: string, callFrom: string) => {
			await execRejectCall(callId, callFrom, getMe(), query)
		},

		initiateCall: async (jid: string, options: { isVideo?: boolean } = {}): Promise<CallResult> => {
			const meId = getMe()
			return execInitiateCall(jid, !!options.isVideo, isJidGroup(jid), meId, query, callOfferCache)
		},

		cancelCall: async (callId: string, callTo: string) => {
			await execCancelCall(callId, callTo, getMe(), query, callOfferCache)
		},

		acceptCall: async (callId: string, callFrom: string, isVideo?: boolean) => {
			await execAcceptCall(callId, callFrom, !!isVideo, getMe(), query)
		}
	}
}
