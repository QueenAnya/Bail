/**
 * addon: mex-linked-profiles
 * Source patch: Baileys-fix-mex-linked-profiles
 *
 * Problem: Mex (newsletter / meta-extension) notifications for linked profiles
 * were silently dropped if the payload came in a `update` node instead of
 * directly in `mex` node content, OR if the operation was
 * `NotificationLinkedProfilesUpdates`.
 *
 * Fix 1 — Flexible payload extraction:
 *   The fixed handler checks both mexNode.content AND a fallback `update`
 *   node (or the first child of the notification), handling both payload
 *   shapes gracefully.
 *
 * Fix 2 — NotificationLinkedProfilesUpdates operation handling:
 *   When operation === 'NotificationLinkedProfilesUpdates', the handler
 *   iterates `added_profiles` and emits `lid-mapping.update` events so
 *   the LID mapping store is updated in real-time.
 *
 * This addon exports:
 *   - parseMexPayload()        — flexibly parses a mex notification node
 *   - extractLinkedProfiles()  — parses NotificationLinkedProfilesUpdates data
 *   - LinkedProfileUpdate      — type for lid-mapping.update event payload
 */

import type { BinaryNode } from '../WABinary'
import { getBinaryNodeChild, getAllBinaryNodeChildren } from '../WABinary'

export type LinkedProfileUpdate = {
	/** LID JID */
	lid: string
	/** Phone-number JID */
	pn: string
}

/**
 * Flexibly extract the JSON payload from a mex notification node.
 * Handles two shapes:
 *   1. mexNode.content is a Buffer/string  (standard)
 *   2. An `update` child node containing the payload  (linked-profiles fix)
 *
 * Returns parsed JSON object, or null if no valid payload found.
 */
export const parseMexPayload = (node: BinaryNode): Record<string, any> | null => {
	const mexNode = getBinaryNodeChild(node, 'mex')

	const payloadNode = mexNode?.content
		? mexNode
		: (getBinaryNodeChild(node, 'update') ?? getAllBinaryNodeChildren(node)[0])

	if (!payloadNode?.content) return null

	const payloadContent = payloadNode.content
	if (Array.isArray(payloadContent)) return null // malformed

	const contentBuf: Uint8Array =
		typeof payloadContent === 'string' ? new TextEncoder().encode(payloadContent) : (payloadContent as Uint8Array)

	try {
		return JSON.parse(new TextDecoder().decode(contentBuf))
	} catch {
		return null
	}
}

/**
 * Extract the operation name, handling the `op_name` attrs fallback.
 */
export const getMexOperation = (
	data: Record<string, any> | null,
	payloadNodeAttrs?: Record<string, string>
): string | undefined => {
	return data?.operation ?? payloadNodeAttrs?.op_name
}

/**
 * Resolve the `updates` array from a mex payload, including the
 * `NotificationLinkedProfilesUpdates` shape where updates are nested
 * under `data.xwa2_notify_linked_profiles`.
 */
export const resolveMexUpdates = (data: Record<string, any> | null): any[] | undefined => {
	if (!data) return undefined
	if (Array.isArray(data.updates)) return data.updates
	const linked = data?.data?.xwa2_notify_linked_profiles
	if (linked) return [linked]
	return undefined
}

/**
 * Parse `NotificationLinkedProfilesUpdates` update items into
 * LinkedProfileUpdate pairs.
 *
 * @example
 * const pairs = extractLinkedProfiles(updates)
 * for (const { lid, pn } of pairs) {
 *   ev.emit('lid-mapping.update', { lid, pn })
 * }
 */
export const extractLinkedProfiles = (updates: any[]): LinkedProfileUpdate[] => {
	const results: LinkedProfileUpdate[] = []
	for (const update of updates) {
		const lid: string | undefined = update?.jid
		const addedProfiles: any[] = Array.isArray(update?.added_profiles) ? update.added_profiles : []
		for (const profile of addedProfiles) {
			const pn: string | undefined = typeof profile === 'string' ? profile : (profile?.pn ?? profile?.jid ?? undefined)
			if (lid && pn) {
				results.push({ lid, pn })
			}
		}
	}
	return results
}
