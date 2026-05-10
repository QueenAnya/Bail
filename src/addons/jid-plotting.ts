/**
 * JID / LID Plotting & Utilities
 * Source: @innovatorssoft/baileys jid-plotting.js
 */
import { jidDecode, jidNormalizedUser, isLidUser } from '../WABinary/index.js'
import type { AuthenticationCreds } from '../Types/index.js'
import type { proto } from '../../WAProto/index.js'

export type ParsedJid = {
	jid: string
	user: string
	server: string
	device: number
	agent: number
	isLid: boolean
	isPn: boolean
	isHosted: boolean
	isGroup: boolean
	isNewsletter: boolean
	normalizedUser: string
}
export type SenderPnInfo = {
	phoneJid: string
	phoneNumber: string
	lid?: string
	deviceId: number
	pushName?: string
	platform?: string
}
export type PlottedJid = { original: string; primary: string; info: ParsedJid | null; pn?: string; lid?: string }
export type JidPlotter = {
	plotToLid(pn: string): Promise<string | null>
	plotToPn(lid: string): Promise<string | null>
	plotBidirectional(jid: string): Promise<PlottedJid>
}

const isPnUser = (jid: string) => jid?.endsWith('@s.whatsapp.net')
const isHostedPnUser = (jid: string) => jid?.endsWith('@hosted')
const isHostedLidUser = (jid: string) => jid?.endsWith('@hosted.lid')

export const parseJid = (jid: string): ParsedJid | null => {
	if (!jid) return null
	const decoded = jidDecode(jid)
	if (!decoded) return null
	return {
		jid,
		user: decoded.user,
		server: decoded.server,
		device: decoded.device || 0,
		agent: 0,
		isLid: !!(isLidUser(jid) || isHostedLidUser(jid)),
		isPn: !!(isPnUser(jid) || isHostedPnUser(jid)),
		isHosted: jid.includes('@hosted') || isHostedLidUser(jid) || isHostedPnUser(jid),
		isGroup: jid.endsWith('@g.us'),
		isNewsletter: jid.endsWith('@newsletter'),
		normalizedUser: jidNormalizedUser(jid)
	}
}

export const getSenderPn = (creds: AuthenticationCreds): SenderPnInfo | null => {
	if (!creds?.me?.id) return null
	const decoded = jidDecode(creds.me.id)
	if (!decoded) return null
	return {
		phoneJid: `${decoded.user}@s.whatsapp.net`,
		phoneNumber: decoded.user,
		lid: creds.me.lid || undefined,
		deviceId: decoded.device || 0,
		pushName: creds.me.name,
		platform: creds.platform
	}
}

export const getCurrentSenderInfo = (authState: { creds: AuthenticationCreds }) => getSenderPn(authState.creds)

export const isSelf = (jid: string, senderPn: SenderPnInfo): boolean => {
	if (!jid || !senderPn) return false
	const normalizedJid = jidNormalizedUser(jid)
	const normalizedSelf = jidNormalizedUser(senderPn.phoneJid)
	if (normalizedJid === normalizedSelf) return true
	if (senderPn.lid) {
		const normalizedLid = jidNormalizedUser(senderPn.lid)
		if (normalizedJid === normalizedLid) return true
	}
	return false
}

export const plotJid = (jid: string): PlottedJid | null => {
	const info = parseJid(jid)
	if (!info) return null
	const result: PlottedJid = { original: jid, primary: jid, info }
	if (info.isPn) {
		result.pn = info.normalizedUser
		result.primary = info.normalizedUser
	} else if (info.isLid) {
		result.lid = info.normalizedUser
		result.primary = info.normalizedUser
	}
	return result
}

export const normalizePhoneToJid = (phone: string): string => {
	if (phone.includes('@')) return jidNormalizedUser(phone)
	return `${phone.replace(/[^\d@]/g, '')}@s.whatsapp.net`
}

export const extractPhoneNumber = (jid: string): string | null => {
	const info = parseJid(jid)
	return info?.isPn ? info.user : null
}

export const formatJidDisplay = (jid: string, options?: { showDevice?: boolean; showType?: boolean }): string => {
	const info = parseJid(jid)
	if (!info) return jid
	let display = info.user
	if (options?.showDevice && info.device > 0) display += `:${info.device}`
	if (options?.showType) {
		if (info.isLid) display += ' (LID)'
		else if (info.isGroup) display += ' (Group)'
		else if (info.isNewsletter) display += ' (Newsletter)'
		else if (info.isPn) display += ' (PN)'
	}
	return display
}

export const isSameUser = (jid1: string, jid2: string): boolean => {
	const i1 = parseJid(jid1),
		i2 = parseJid(jid2)
	if (!i1 || !i2) return false
	return i1.normalizedUser === i2.normalizedUser
}

export const getJidVariants = (phone: string): string[] => {
	const cleaned = phone.replace(/[^\d]/g, '')
	return [
		`${cleaned}@s.whatsapp.net`,
		`${cleaned}:0@s.whatsapp.net`,
		`${cleaned}@lid`,
		`${cleaned}:1@s.whatsapp.net`,
		`${cleaned}:2@s.whatsapp.net`
	]
}

export const constructJidWithDevice = (user: string, device: number, server = 's.whatsapp.net'): string =>
	device === 0 ? `${user}@${server}` : `${user}:${device}@${server}`

export const getRemoteJidFromMessage = (msg: proto.IWebMessageInfo): { chatJid: string; senderJid: string } | null => {
	if (!msg?.key?.remoteJid) return null
	const chatJid = msg.key.remoteJid
	const isGroupMsg = chatJid.endsWith('@g.us')
	const senderJid = isGroupMsg ? msg.key.participant || chatJid : chatJid
	return { chatJid, senderJid }
}

export const createJidPlotter = (
	getLIDForPN: (pn: string) => Promise<string | null>,
	getPNForLID: (lid: string) => Promise<string | null>
): JidPlotter => ({
	plotToLid: pn => getLIDForPN(pn),
	plotToPn: lid => getPNForLID(lid),
	plotBidirectional: async jid => {
		const info = parseJid(jid)
		if (!info) return { original: jid, primary: jid, info: null }
		const result: PlottedJid = { original: jid, primary: jid, info }
		if (info.isPn) {
			result.pn = info.normalizedUser
			const lid = await getLIDForPN(jid)
			if (lid) result.lid = lid
			result.primary = info.normalizedUser
		} else if (info.isLid) {
			result.lid = info.normalizedUser
			const pn = await getPNForLID(jid)
			if (pn) result.pn = pn
			result.primary = result.pn || info.normalizedUser
		}
		return result
	}
})
