/**
 * addon: read-receipt-controller
 *
 * Centralized programmatic control over read receipts (blue ticks):
 * global enable/disable, an artificial reaction-time delay, and a
 * per-JID exclusion list.
 */

type MarkReadFn = (jid: string, participant: string | undefined, messageIds: string[]) => Promise<void> | void

export type ReadReceiptConfig = {
	enabled?: boolean
	/** artificial delay in ms before the receipt is actually sent */
	readDelay?: number
	/** JIDs that should never receive read receipts, even when enabled */
	excludeJids?: string[]
}

export type ReadReceiptController = {
	/** Mark as read, respecting the enabled/excludeJids/readDelay config. */
	markRead: (jid: string, participant: string | undefined, messageIds: string[]) => Promise<void>
	/** Mark as read immediately, bypassing all config (enabled, excludeJids, readDelay). */
	forceMarkRead: (jid: string, participant: string | undefined, messageIds: string[]) => Promise<void>
	/** Stop sending read receipts globally (markRead becomes a no-op). */
	disable: () => void
	/** Resume sending read receipts globally. */
	enable: () => void
	/** Merge new config values in (partial update). */
	setConfig: (config: Partial<ReadReceiptConfig>) => void
	/** Get the current effective config. */
	getConfig: () => Required<ReadReceiptConfig>
}

/**
 * @example
 * const readReceipts = createReadReceiptController(
 *     (jid, participant, ids) => sock.readMessages([{ remoteJid: jid, id: ids[0] }]),
 *     { enabled: true, readDelay: 1000, excludeJids: ['blocked@s.whatsapp.net'] }
 * )
 * await readReceipts.markRead(jid, participant, ['messageId123'])
 */
export const createReadReceiptController = (
	markReadFn: MarkReadFn,
	initialConfig?: ReadReceiptConfig
): ReadReceiptController => {
	const config: Required<ReadReceiptConfig> = {
		enabled: initialConfig?.enabled ?? true,
		readDelay: initialConfig?.readDelay ?? 0,
		excludeJids: initialConfig?.excludeJids ?? []
	}

	const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

	const forceMarkRead: ReadReceiptController['forceMarkRead'] = async (jid, participant, messageIds) => {
		await markReadFn(jid, participant, messageIds)
	}

	const markRead: ReadReceiptController['markRead'] = async (jid, participant, messageIds) => {
		if (!config.enabled) return
		if (config.excludeJids.includes(jid)) return
		if (config.readDelay > 0) await delay(config.readDelay)
		await markReadFn(jid, participant, messageIds)
	}

	return {
		markRead,
		forceMarkRead,
		disable: () => {
			config.enabled = false
		},
		enable: () => {
			config.enabled = true
		},
		setConfig: patch => {
			Object.assign(config, patch)
		},
		getConfig: () => ({ ...config })
	}
}
