/**
 * JID Plotting & LID/PN Bidirectional Mapping Utilities
 *
 * Source: @innovatorssoft/baileys (jid-plotting.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Handles parsing, display, normalization, and LID↔PN resolution
 * for all WhatsApp JID formats (s.whatsapp.net, @g.us, @lid,
 * @newsletter, @hosted, @hosted.lid).
 */

import { isLidUser, jidDecode, jidNormalizedUser } from '../WABinary/index.js'
import type { AuthenticationState } from '../Types/index.js'
import type { WAMessage } from '../Types/index.js'

// ─── Internal helpers ─────────────────────────────────────────────────────────

const isPnUser = (jid?: string | null): boolean => !!jid?.endsWith('@s.whatsapp.net')
const isHostedPn = (jid?: string | null): boolean => !!jid?.endsWith('@hosted')
const isHostedLid = (jid?: string | null): boolean => !!jid?.endsWith('@hosted.lid')

// ─── Types ────────────────────────────────────────────────────────────────────

export type ParsedJid = {
	/** Original JID string */
	jid: string
	/** User part (phone number or LID hex string) */
	user: string
	/** Server part (e.g. s.whatsapp.net, g.us, lid) */
	server: string
	/** Device ID (default 0 for primary device) */
	device: number
	/** Agent ID */
	agent: number
	isLid: boolean
	isPn: boolean
	isHosted: boolean
	isGroup: boolean
	isNewsletter: boolean
	/** Normalized JID without device/agent suffix */
	normalizedUser: string
}

export type SenderPnInfo = {
	/** Full phone JID e.g. `628123456789@s.whatsapp.net` */
	phoneJid: string
	/** Phone number without domain e.g. `628123456789` */
	phoneNumber: string
	/** LID if the session has one */
	lid?: string
	/** Primary device ID */
	deviceId: number
	/** Display name / push name */
	pushName?: string
	/** Platform string from creds */
	platform?: string
}

export type PlottedJid = {
	original: string
	primary: string
	info: ParsedJid | null
	pn?: string
	lid?: string
}

export type JidFormatOptions = {
	/** Include device ID suffix (e.g. `:2`) */
	showDevice?: boolean
	/** Append type label (e.g. `(LID)`, `(Group)`) */
	showType?: boolean
}

export type RemoteJidInfo = {
	/** The chat's JID (group or individual) */
	chatJid: string
	/** The sender's JID */
	senderJid: string
}

export type JidPlotter = {
	plotToLid(pn: string): Promise<string | undefined>
	plotToPn(lid: string): Promise<string | undefined>
	plotBidirectional(jid: string): Promise<PlottedJid>
}

// ─── Core functions ────────────────────────────────────────────────────────────

/**
 * Parse and extract full metadata from any JID format.
 */
export const parseJid = (jid: string | null | undefined): ParsedJid | null => {
	if (!jid) return null
	const decoded = jidDecode(jid)
	if (!decoded) return null

	return {
		jid,
		user: decoded.user,
		server: decoded.server,
		device: decoded.device ?? 0,
		agent: 0,
		isLid: isLidUser(jid) || isHostedLid(jid),
		isPn: isPnUser(jid) || isHostedPn(jid),
		isHosted: jid.includes('@hosted') || isHostedLid(jid) || isHostedPn(jid),
		isGroup: jid.endsWith('@g.us'),
		isNewsletter: jid.endsWith('@newsletter'),
		normalizedUser: jidNormalizedUser(jid)
	}
}

/**
 * Extract phone/session information from `AuthenticationCreds`.
 */
export const getSenderPn = (creds: AuthenticationState['creds']): SenderPnInfo | null => {
	if (!creds?.me?.id) return null
	const decoded = jidDecode(creds.me.id)
	if (!decoded) return null
	const phoneNumber = decoded.user
	return {
		phoneJid: `${phoneNumber}@s.whatsapp.net`,
		phoneNumber,
		lid: creds.me.lid ?? undefined,
		deviceId: decoded.device ?? 0,
		pushName: creds.me.name,
		platform: (creds as Record<string, unknown>).platform as string | undefined
	}
}

/** Convenience wrapper over `getSenderPn` that accepts `AuthenticationState`. */
export const getCurrentSenderInfo = (authState: AuthenticationState): SenderPnInfo | null =>
	getSenderPn(authState.creds)

/**
 * Check whether `jid` belongs to the current session's account (self-check).
 * Compares both PN and LID forms.
 */
export const isSelf = (jid: string, senderPn: SenderPnInfo): boolean => {
	if (!jid) return false
	const normalized = jidNormalizedUser(jid)
	if (normalized === jidNormalizedUser(senderPn.phoneJid)) return true
	if (senderPn.lid && normalized === jidNormalizedUser(senderPn.lid)) return true
	return false
}

/**
 * Plot a JID — build a {@link PlottedJid} result without resolving LID↔PN.
 * Use {@link createJidPlotter} for bidirectional resolution.
 */
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

/**
 * Normalize various phone number formats to a `@s.whatsapp.net` JID.
 * Handles `+`, spaces, dashes, and already-formed JIDs.
 */
export const normalizePhoneToJid = (phone: string): string => {
	if (phone.includes('@')) return jidNormalizedUser(phone)
	const cleaned = phone.replace(/[^\d]/g, '')
	return `${cleaned}@s.whatsapp.net`
}

/**
 * Extract the bare phone number (no `@` domain) from a PN JID.
 * Returns `null` for non-PN JIDs.
 */
export const extractPhoneNumber = (jid: string): string | null => {
	const info = parseJid(jid)
	if (!info?.isPn) return null
	return info.user
}

/**
 * Format a JID for human-readable display.
 *
 * @example
 * formatJidDisplay('628123456789:2@s.whatsapp.net', { showDevice: true, showType: true })
 * // → '628123456789:2 (PN)'
 */
export const formatJidDisplay = (jid: string, options: JidFormatOptions = {}): string => {
	const info = parseJid(jid)
	if (!info) return jid
	let display = info.user
	if (options.showDevice && info.device > 0) display += `:${info.device}`
	if (options.showType) {
		if (info.isLid) display += ' (LID)'
		else if (info.isGroup) display += ' (Group)'
		else if (info.isNewsletter) display += ' (Newsletter)'
		else if (info.isPn) display += ' (PN)'
	}
	return display
}

/**
 * Compare two JIDs — returns `true` if they refer to the same user
 * (normalized, ignoring device suffix).
 */
export const isSameUser = (jid1: string, jid2: string): boolean => {
	const a = parseJid(jid1)
	const b = parseJid(jid2)
	if (!a || !b) return false
	return a.normalizedUser === b.normalizedUser
}

/**
 * Return all common JID variants for a bare phone number.
 * Useful for searching message history across device IDs.
 */
export const getJidVariants = (phone: string): string[] => {
	const n = phone.replace(/[^\d]/g, '')
	return [
		`${n}@s.whatsapp.net`,
		`${n}:0@s.whatsapp.net`,
		`${n}@lid`,
		`${n}:1@s.whatsapp.net`,
		`${n}:2@s.whatsapp.net`,
		`${n}:3@s.whatsapp.net`
	]
}

/**
 * Construct a JID with an explicit device ID.
 *
 * @param user    - Phone number or LID user part
 * @param device  - Device ID (0 = primary)
 * @param server  - Domain (default `s.whatsapp.net`)
 */
export const constructJidWithDevice = (user: string, device: number, server = 's.whatsapp.net'): string =>
	device === 0 ? `${user}@${server}` : `${user}:${device}@${server}`

/**
 * Extract the chat JID and sender JID from a WAMessage.
 * For group messages the sender is `key.participant`; for DMs it's `key.remoteJid`.
 */
export const getRemoteJidFromMessage = (msg: WAMessage | null | undefined): RemoteJidInfo | null => {
	if (!msg?.key?.remoteJid) return null
	const chatJid = msg.key.remoteJid
	const isGroupMsg = chatJid.endsWith('@g.us')
	const senderJid = isGroupMsg ? (msg.key.participant ?? chatJid) : chatJid
	return { chatJid, senderJid }
}

// ─── JidPlotter (async LID↔PN resolver) ──────────────────────────────────────

/**
 * Create a bidirectional JID plotter that uses the socket's signal-repository
 * LID mapping to resolve LID ↔ PN.
 *
 * @param getLIDForPN - `signalRepository.lidMapping.getLIDForPN.bind(…)`
 * @param getPNForLID - `signalRepository.lidMapping.getPNForLID.bind(…)`
 *
 * @example
 * const plotter = createJidPlotter(
 *     sock.signalRepository.lidMapping.getLIDForPN.bind(sock.signalRepository.lidMapping),
 *     sock.signalRepository.lidMapping.getPNForLID.bind(sock.signalRepository.lidMapping)
 * )
 *
 * const result = await plotter.plotBidirectional('628123456789@s.whatsapp.net')
 * console.log(result.lid) // '123456789abcdef@lid' or undefined
 */
export const createJidPlotter = (
	getLIDForPN: (pn: string) => Promise<string | undefined>,
	getPNForLID: (lid: string) => Promise<string | undefined>
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
			result.primary = result.pn ?? info.normalizedUser
		}

		return result
	}
})
