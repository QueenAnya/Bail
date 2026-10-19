/**
 * Incoming-call helpers — relay parsing and the `<call>` stanzas used to
 * ring, answer, reject and hang up an INCOMING WhatsApp call.
 *
 * Ported from the stanza sequence in `@innovatorssoft/baileys`
 * (lib/Voip/call-manager) so that incoming calls follow the same wire order
 * that is known to work:
 *
 *   offer  →  preaccept (+ relaylatency)         (ringing)
 *   accept →  mute_v2, transport, accept(enc)    (answering)
 *   decline → reject                             (rejecting)
 *
 * Pure builders only — no I/O — so they are easy to unit test.
 */
import { randomBytes } from 'crypto'
import { getAllBinaryNodeChildren } from '../WABinary/generic-utils'

export type OfferRelayEndpoint = {
	ip: string
	port: number
	token: string
	authToken?: string
	key: string
	relayId: number
	protocol: number
	c2rRtt?: number
	relayName: string
	isFna: boolean
	addressBytes: Uint8Array
}

export type ParsedOfferRelays = {
	relays: OfferRelayEndpoint[]
	participantJids: string[]
}

const toB64 = (c: unknown): string => (c instanceof Uint8Array ? Buffer.from(c).toString('base64') : String(c))

/** Stanza id in the same shape the other call stanzas use. */
export const generateCallStanzaId = (): string => randomBytes(8).toString('hex').toUpperCase()

/**
 * Parses the `<relay>` block(s) and participant list out of an incoming
 * `<call><offer>` stanza. Relays are returned fastest-first, FNA last.
 */
export const parseOfferRelays = (node: any): ParsedOfferRelays => {
	const relays: OfferRelayEndpoint[] = []
	const participantJids: string[] = []
	const seen = new Set<string>()
	if (!node) return { relays, participantJids }

	const relayNodes: any[] = []
	const addParticipant = (jid?: string) => {
		if (jid && !seen.has(jid)) {
			seen.add(jid)
			participantJids.push(jid)
		}
	}

	const scan = (container: any, depth = 0) => {
		if (!container || typeof container !== 'object' || depth > 4) return
		if (container.tag === 'relay') relayNodes.push(container)
		if (container.tag === 'user' && Array.isArray(container.content)) {
			for (const dev of container.content) addParticipant(dev?.attrs?.jid)
		}

		if (!Array.isArray(container.content)) return
		for (const child of container.content) {
			if (!child || typeof child !== 'object') continue
			if (child.tag === 'relay') relayNodes.push(child)
			else if (child.tag === 'user' && Array.isArray(child.content)) {
				for (const dev of child.content) addParticipant(dev?.attrs?.jid)
			} else if (child.tag === 'offer') scan(child, depth + 1)
		}
	}

	scan(node)

	for (const relayNode of relayNodes) {
		const children: any[] = Array.isArray(relayNode.content) ? relayNode.content : []
		const tokens = new Map<string, string>()
		const authTokens = new Map<string, string>()
		let relayKey = ''

		for (const rc of children) {
			if (!rc || typeof rc !== 'object') continue
			if (rc.tag === 'participant') addParticipant(rc.attrs?.jid)
			else if (rc.tag === 'key' && rc.content) relayKey = String(rc.content)
			else if (rc.tag === 'token' && rc.content) tokens.set(rc.attrs?.id || '0', toB64(rc.content))
			else if (rc.tag === 'auth_token' && rc.content) authTokens.set(rc.attrs?.id || '0', toB64(rc.content))
		}

		for (const rc of children) {
			if (rc?.tag !== 'te2' || !(rc.content instanceof Uint8Array) || rc.content.length < 6) continue
			const b = rc.content
			const authTokenId = rc.attrs?.auth_token_id || ''
			relays.push({
				ip: `${b[0]}.${b[1]}.${b[2]}.${b[3]}`,
				port: (b[4]! << 8) | b[5]!,
				token: tokens.get(rc.attrs?.token_id || '0') || '',
				authToken: authTokenId ? authTokens.get(authTokenId) : undefined,
				key: relayKey,
				relayId: parseInt(rc.attrs?.relay_id || '0', 10),
				protocol: rc.attrs?.protocol ? parseInt(rc.attrs.protocol, 10) : 0,
				c2rRtt: rc.attrs?.c2r_rtt ? parseInt(rc.attrs.c2r_rtt, 10) : undefined,
				relayName: rc.attrs?.relay_name || '',
				isFna: rc.attrs?.is_fna === '1',
				addressBytes: b
			})
		}
	}

	relays.sort((a, b) => {
		if (a.isFna !== b.isFna) return a.isFna ? 1 : -1
		return (a.c2rRtt ?? Infinity) - (b.c2rRtt ?? Infinity)
	})

	return { relays, participantJids }
}

/** True when the `<call>` stanza carries an `<offer>` child. */
export const getOfferNode = (callNode: any): any | undefined =>
	getAllBinaryNodeChildren(callNode).find((c: any) => c?.tag === 'offer')

const CAPABILITY_PREACCEPT = new Uint8Array([0x01, 0x05, 0xff, 0x09, 0xe4, 0xbb, 0x07])

const call = (to: string, child: any) => ({
	tag: 'call',
	attrs: { to, id: generateCallStanzaId() },
	content: [child]
})

export const buildPreacceptStanza = (callId: string, callCreator: string, to: string, isVideo: boolean) => {
	const content: any[] = [{ tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined }]
	if (isVideo) {
		content.push({
			tag: 'video',
			attrs: { screen_width: '1080', screen_height: '2400', dec: 'H264,H265,AV1', device_orientation: '0' },
			content: undefined
		})
	}

	content.push(
		{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined },
		{ tag: 'capability', attrs: { ver: '1' }, content: CAPABILITY_PREACCEPT }
	)
	return call(to || callCreator, {
		tag: 'preaccept',
		attrs: { 'call-id': callId, 'call-creator': callCreator },
		content
	})
}

export const buildRelayLatencyStanza = (
	callId: string,
	callCreator: string,
	to: string,
	relays: OfferRelayEndpoint[],
	destinationJids: string[]
) => {
	const seen = new Set<string>()
	const content: any[] = []
	for (const relay of relays) {
		if (!relay.relayName || seen.has(relay.relayName)) continue
		seen.add(relay.relayName)
		content.push({
			tag: 'te',
			attrs: { latency: String(0x2000000 + (relay.c2rRtt || 0)), relay_name: relay.relayName },
			content: relay.addressBytes
		})
	}

	if (destinationJids.length) {
		content.push({
			tag: 'destination',
			attrs: {},
			content: destinationJids.map(jid => ({ tag: 'to', attrs: { jid }, content: undefined }))
		})
	}

	return call(to || callCreator, {
		tag: 'relaylatency',
		attrs: { 'call-id': callId, 'call-creator': callCreator },
		content
	})
}

export const buildMuteV2Stanza = (callId: string, callCreator: string, to: string) =>
	call(to || callCreator, {
		tag: 'mute_v2',
		attrs: { 'call-id': callId, 'call-creator': callCreator, 'mute-state': '0' },
		content: undefined
	})

export const buildTransportStanza = (callId: string, callCreator: string, to: string) =>
	call(to || callCreator, {
		tag: 'transport',
		attrs: {
			'call-id': callId,
			'call-creator': callCreator,
			'transport-message-type': '1',
			'p2p-cand-round': '1'
		},
		content: [{ tag: 'net', attrs: { medium: '2', protocol: '0' }, content: undefined }]
	})

/**
 * `<accept>` carrying the re-encrypted call key. `to` must be the caller's
 * DEVICE jid — a bare address never registers on the caller's phone.
 */
export const buildAcceptStanza = (
	callId: string,
	callCreator: string,
	to: string,
	isVideo: boolean,
	encNode: any,
	deviceIdentity?: any
) => {
	const content: any[] = [
		{ tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined },
		{ tag: 'net', attrs: { medium: '3' }, content: undefined },
		encNode,
		{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
	]
	if (deviceIdentity) content.push(deviceIdentity)
	if (isVideo) {
		content.push({ tag: 'video', attrs: { dec: 'H264', device_orientation: '0' }, content: undefined })
	}

	return call(to || callCreator, {
		tag: 'accept',
		attrs: { 'call-id': callId, 'call-creator': callCreator },
		content
	})
}

export const buildRejectStanza = (callId: string, callCreator: string, to: string, reason = 'declined') =>
	call(to || callCreator, {
		tag: 'reject',
		attrs: { 'call-id': callId, 'call-creator': callCreator || to, count: '0', reason },
		content: undefined
	})
