/**
 * Ported from @rexxhayanasi/elaina-baileys 1.4.5 (MIT) - Utils/sender-key-memory.js
 * Copied as-is (JS -> TS, type-checking disabled); only import paths were adapted for tb2.
 */
// @ts-nocheck

export const pickSenderKeyRecipients = (
	devices,
	senderKeyMap,
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

export const deliveredSenderKeyJids = nodes => {
	const delivered = new Set()
	for (const node of nodes || []) {
		const jid = node?.attrs?.jid
		if (jid) {
			delivered.add(jid)
		}
	}

	return delivered
}

export const senderKeyMemoryResetSummary = (stored, jid) => {
	const devices = Object.keys(stored?.[jid] || {})
	return { jid, cleared: devices.length, devices }
}

export const commitSenderKeyDelivery = (senderKeyMap, recipients, nodes) => {
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
