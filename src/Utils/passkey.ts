/**
 * passkey.ts
 * Helper to extract passkey request state from WA notification nodes.
 * Used to emit `connection.update.passkeyRequest` during companion linking.
 * Source: WhiskeySockets/Baileys PR #2696 (frndchagas)
 */

import type { BinaryNode } from '../WABinary'

export type PasskeyNotificationType = 'passkey_prologue_request' | 'crsc_continuation'

export type PasskeyRequestState = {
	/** The notification type that triggered this passkey step */
	type: PasskeyNotificationType
	/** Whether any request options were present in the notification */
	hasOptions: boolean
}

const SUPPORTED_PASSKEY_TYPES: PasskeyNotificationType[] = ['passkey_prologue_request', 'crsc_continuation']

/**
 * Extracts passkey request state from a notification node.
 * Returns undefined for unsupported notification types.
 * Redacts sensitive details — only exposes type and option presence.
 */
export const getPasskeyRequestState = (node: BinaryNode): PasskeyRequestState | undefined => {
	const type = node.attrs.type as string
	if (!SUPPORTED_PASSKEY_TYPES.includes(type as PasskeyNotificationType)) {
		return undefined
	}

	const content = Array.isArray(node.content) ? node.content : []
	const hasOptions = content.some(c => typeof c === 'object' && 'tag' in c)

	return {
		type: type as PasskeyNotificationType,
		hasOptions
	}
}
