/**
 * JID Plotting & LID Support utilities
 * Maps between PN JIDs (@s.whatsapp.net) and LID JIDs (@lid)
 * Useful for resolving JIDs in groups that use LID addressing
 */

import { jidDecode, jidEncode, isLidUser, isPnUser } from '../WABinary'

export type JidPlotEntry = {
	pnJid: string
	lidJid: string
}

/** In-memory JID plot map: pnJid -> lidJid and lidJid -> pnJid */
const jidPlotMap = new Map<string, string>()

/**
 * Register a PN <-> LID mapping in the plot
 */
export const plotJidPair = (pnJid: string, lidJid: string): void => {
	jidPlotMap.set(pnJid, lidJid)
	jidPlotMap.set(lidJid, pnJid)
}

/**
 * Batch register multiple PN <-> LID pairs
 */
export const plotJidPairs = (entries: JidPlotEntry[]): void => {
	for (const { pnJid, lidJid } of entries) {
		plotJidPair(pnJid, lidJid)
	}
}

/**
 * Resolve a JID to its PN form (@s.whatsapp.net)
 * If already PN, returns as-is. If LID, looks up the mapped PN.
 */
export const resolvePnJid = (jid: string): string | undefined => {
	if (isPnUser(jid)) return jid
	if (isLidUser(jid)) return jidPlotMap.get(jid)
	return jid
}

/**
 * Resolve a JID to its LID form (@lid)
 * If already LID, returns as-is. If PN, looks up the mapped LID.
 */
export const resolveLidJid = (jid: string): string | undefined => {
	if (isLidUser(jid)) return jid
	if (isPnUser(jid)) return jidPlotMap.get(jid)
	return jid
}

/**
 * Check whether a JID has a known LID counterpart in the plot
 */
export const hasLidMapping = (pnJid: string): boolean => jidPlotMap.has(pnJid)

/**
 * Check whether a LID JID has a known PN counterpart in the plot
 */
export const hasPnMapping = (lidJid: string): boolean => jidPlotMap.has(lidJid)

/**
 * Get all registered plot entries
 */
export const getAllJidPlotEntries = (): JidPlotEntry[] => {
	const entries: JidPlotEntry[] = []
	for (const [key, value] of jidPlotMap.entries()) {
		if (isPnUser(key)) {
			entries.push({ pnJid: key, lidJid: value })
		}
	}
	return entries
}

/**
 * Clear all JID plot mappings
 */
export const clearJidPlot = (): void => {
	jidPlotMap.clear()
}

/**
 * Normalize a JID — convert @c.us to @s.whatsapp.net,
 * strip device suffix, and resolve LID to PN if mapped.
 */
export const normalizeJidForSend = (jid: string): string => {
	const decoded = jidDecode(jid)
	if (!decoded) return jid
	const { user, server } = decoded
	const normalized = jidEncode(user, server === 'c.us' ? 's.whatsapp.net' : (server as any))
	return resolvePnJid(normalized) || normalized
}
