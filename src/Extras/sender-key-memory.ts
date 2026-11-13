/**
 * Ported from @rexxhayanasi/elaina-baileys 1.4.x (MIT) - Utils/sender-key-memory.js
 * Copied as-is (JS -> TS); only import paths and parameter types were adapted for tb2.
 * Re-checked against elaina-baileys 1.4.7: the exported surface matches; see PORTED_FROM below.
 */

export const pickSenderKeyRecipients = (
	devices: any[],
	senderKeyMap: Record<string, any>,
	{ force = false, skip }: { force?: boolean; skip?: (device: any) => boolean } = {}
) => {
	const recipients = []
	for (const device of devices) {
		const deviceJid = device?.jid
		if (!deviceJid) {
			continue
		}

		if (!force && senderKeyMap[deviceJid]) {
			continue
		}

		if (skip?.(device)) {
			continue
		}

		recipients.push(deviceJid)
	}

	return recipients
}

export const deliveredSenderKeyJids = (nodes?: any[]) => {
	const delivered = new Set()
	for (const node of nodes || []) {
		const jid = node?.attrs?.jid
		if (jid) {
			delivered.add(jid)
		}
	}

	return delivered
}

export const senderKeyResetSummary = (stored: Record<string, any> | undefined, jid: string) => {
	const devices = Object.keys(stored?.[jid] || {})
	return { jid, cleared: devices.length, devices }
}

export const commitSenderKeyDelivery = (senderKeyMap: Record<string, any>, recipients: string[], nodes?: any[]) => {
	const delivered = deliveredSenderKeyJids(nodes)
	const marked = []
	const skipped = []
	for (const jid of recipients) {
		if (delivered.has(jid)) {
			senderKeyMap[jid] = true
			marked.push(jid)
		} else {
			delete senderKeyMap[jid]
			skipped.push(jid)
		}
	}

	return { marked, skipped }
}
