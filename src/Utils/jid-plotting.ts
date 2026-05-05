import { jidDecode, isJidGroup, isJidNewsletter } from '../WABinary'
import type { AuthenticationCreds } from '../Types'

export interface JidInfo {
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

export interface PlottedJid {
	original: string
	pn?: string
	lid?: string
	primary: string
	info: JidInfo
}

export interface SenderPnInfo {
	phoneJid: string
	phoneNumber: string
	lid?: string
	deviceId: number
	pushName?: string
	platform?: string
}

export const parseJid = (jid: string): JidInfo | null => {
	if (!jid) return null
	try {
		const decoded = jidDecode(jid)
		if (!decoded) return null
		const { user, server } = decoded
		const isLid = server === 'lid' || server?.endsWith('.lid')
		const isPn = server === 's.whatsapp.net'
		const isHosted = server === 'hosted' || server?.endsWith('@hosted')
		return {
			jid,
			user,
			server: server || '',
			device: 0,
			agent: 0,
			isLid,
			isPn,
			isHosted,
			isGroup: isJidGroup(jid),
			isNewsletter: isJidNewsletter(jid),
			normalizedUser: user
		}
	} catch {
		return null
	}
}

export const getSenderPn = (creds: AuthenticationCreds): SenderPnInfo | null => {
	const me = creds.me
	if (!me?.id) return null
	const decoded = jidDecode(me.id)
	if (!decoded) return null
	return {
		phoneJid: me.id,
		phoneNumber: decoded.user,
		lid: creds.me?.lid,
		deviceId: 0,
		pushName: me.name,
		platform: creds.platform
	}
}

export const getCurrentSenderInfo = (authState: { creds: AuthenticationCreds }): SenderPnInfo | null =>
	getSenderPn(authState.creds)

export const isSelf = (jid: string, senderPn: SenderPnInfo): boolean => {
	const decoded = jidDecode(jid)
	if (!decoded) return false
	return decoded.user === senderPn.phoneNumber
}

export const plotJid = (jid: string): PlottedJid | null => {
	const info = parseJid(jid)
	if (!info) return null
	return { original: jid, primary: jid, info }
}

export const normalizePhoneToJid = (phone: string): string => {
	const clean = phone.replace(/[^\d+]/g, '').replace(/^\+/, '')
	return `${clean}@s.whatsapp.net`
}

export const extractPhoneNumber = (jid: string): string | null => {
	const decoded = jidDecode(jid)
	if (!decoded || decoded.server !== 's.whatsapp.net') return null
	return decoded.user
}

export const formatJidDisplay = (jid: string, options: { showDevice?: boolean; showType?: boolean } = {}): string => {
	const info = parseJid(jid)
	if (!info) return jid
	let display = info.user
	if (options.showType) display = `[${info.isGroup ? 'group' : info.isLid ? 'lid' : 'user'}] ${display}`
	return display
}

export const isSameUser = (jid1: string, jid2: string): boolean => {
	const d1 = jidDecode(jid1)
	const d2 = jidDecode(jid2)
	if (!d1 || !d2) return false
	return d1.user === d2.user
}

export const getJidVariants = (phone: string): string[] => {
	const clean = phone.replace(/[^\d]/g, '')
	return [`${clean}@s.whatsapp.net`, `${clean}@lid`, `${clean}@c.us`]
}

export const constructJidWithDevice = (user: string, device: number, server = 's.whatsapp.net'): string =>
	device === 0 ? `${user}@${server}` : `${user}:${device}@${server}`

export const getRemoteJidFromMessage = (msg: { key: { remoteJid?: string; participant?: string } }) => {
	const { remoteJid, participant } = msg.key
	if (!remoteJid) return null
	return { chatJid: remoteJid, senderJid: participant || remoteJid }
}

export interface JidPlotterWithMapping {
	plotToLid: (pn: string) => Promise<string | null>
	plotToPn: (lid: string) => Promise<string | null>
	plotBidirectional: (jid: string) => Promise<PlottedJid>
}

export const createJidPlotter = (
	getLIDForPN: (pn: string) => Promise<string | null>,
	getPNForLID: (lid: string) => Promise<string | null>
): JidPlotterWithMapping => ({
	plotToLid: getLIDForPN,
	plotToPn: getPNForLID,
	async plotBidirectional(jid: string): Promise<PlottedJid> {
		const info = parseJid(jid)!
		const result: PlottedJid = { original: jid, primary: jid, info }
		if (info.isPn) result.lid = (await getLIDForPN(jid)) || undefined
		else if (info.isLid) result.pn = (await getPNForLID(jid)) || undefined
		return result
	}
})

export default {
	parseJid,
	getSenderPn,
	getCurrentSenderInfo,
	isSelf,
	plotJid,
	normalizePhoneToJid,
	extractPhoneNumber,
	formatJidDisplay,
	isSameUser,
	getJidVariants,
	constructJidWithDevice,
	getRemoteJidFromMessage,
	createJidPlotter
}
