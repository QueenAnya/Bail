/**
 * shortcake.ts
 * Shortcake / CRSC (Cross-device Registration via Shortcake Companion) passkey
 * companion-linking protocol implementation.
 *
 * Flow:
 *  1. Server sends `passkey_prologue_request` notification
 *  2. Client calls `beginShortcakeHandshake()` — sends prologue response with ephemeral pubkey
 *  3. Server sends `crsc_continuation` with server ephemeral key + nonce
 *  4. Client calls `completeShortcakeHandshake()` — derives shared secret, signs assertion
 *  5. Client sends assertion back; linking completes
 *
 * Source: WhiskeySockets/Baileys PR #2689 (vinikjkkj — WB collaborator)
 * PR: https://github.com/WhiskeySockets/Baileys/pull/2689
 */

import type { BinaryNode } from '../WABinary'
import { getBinaryNodeChildBuffer } from '../WABinary'
import {
	generateShortcakeKeyPair,
	shortcakeDH,
	shortcakeEncrypt,
	shortcakeHKDF,
	type ShortcakeKeyPair
} from './shortcake-crypto'

export type ShortcakeSession = {
	ephemeralKeyPair: ShortcakeKeyPair
	nonce?: Uint8Array
	serverEphemeralPublicKey?: Uint8Array
	sharedSecret?: Buffer
}

export type ShortcakeSignPasskeyAssertion = (challenge: Uint8Array) => Promise<Uint8Array>

// ── Session store (in-memory, single active linking at a time) ───────────────
let activeSession: ShortcakeSession | null = null

/**
 * Begin Shortcake handshake — called when `passkey_prologue_request` arrives.
 * Generates ephemeral X25519 key pair and returns the prologue response payload.
 *
 * The mutex concern from the PR review is handled by resetting session atomically:
 * any concurrent prologue request replaces the previous session (WA behaviour).
 */
export const beginShortcakeHandshake = async (): Promise<{
	ephemeralPublicKey: Uint8Array
	session: ShortcakeSession
}> => {
	const ephemeralKeyPair = await generateShortcakeKeyPair()
	activeSession = { ephemeralKeyPair }
	return { ephemeralPublicKey: ephemeralKeyPair.publicKey, session: activeSession }
}

/**
 * Complete Shortcake handshake — called when `crsc_continuation` arrives.
 * Derives the shared secret and returns the signed assertion to send back.
 *
 * @param continuationNode The `crsc_continuation` BinaryNode from the server
 * @param signPasskeyAssertion App-provided callback that signs the WA challenge
 *                             using the platform passkey (WebAuthn / FIDO2 assertion)
 */
export const completeShortcakeHandshake = async (
	continuationNode: BinaryNode,
	signPasskeyAssertion: ShortcakeSignPasskeyAssertion
): Promise<{ assertionPayload: Buffer; requestId: string } | null> => {
	if (!activeSession) {
		return null
	}

	try {
		// Extract server ephemeral public key and nonce from continuation
		const serverEphPub = getBinaryNodeChildBuffer(continuationNode, 'server_ephemeral_public')
		const nonce = getBinaryNodeChildBuffer(continuationNode, 'nonce')
		const requestId = continuationNode.attrs.id as string

		if (!serverEphPub || !nonce) {
			return null
		}

		// X25519 DH
		const dhSecret = await shortcakeDH(activeSession.ephemeralKeyPair.privateKey, serverEphPub)

		// Derive session keys via HKDF
		const salt = Buffer.concat([activeSession.ephemeralKeyPair.publicKey, serverEphPub])
		const sessionKey = shortcakeHKDF(dhSecret, 32, 'WhatsApp Shortcake Session Key', salt)
		const macKey = shortcakeHKDF(dhSecret, 32, 'WhatsApp Shortcake MAC Key', salt)

		// Build challenge: nonce ‖ client_ephemeral_pub ‖ server_ephemeral_pub
		const challenge = Buffer.concat([nonce, activeSession.ephemeralKeyPair.publicKey, serverEphPub])

		// Platform passkey assertion (FIDO2/WebAuthn)
		const assertion = await signPasskeyAssertion(challenge)

		// Encrypt assertion with session key; MAC the ciphertext
		const aad = Buffer.from('WhatsApp Shortcake Assertion AAD')
		const encryptedAssertion = shortcakeEncrypt(assertion, sessionKey, aad)

		// Assertion payload: encrypted_assertion (with embedded mac key hmac)
		const assertionPayload = Buffer.concat([encryptedAssertion, macKey.slice(0, 16)])

		// Clear session — linking complete or failed
		activeSession = null

		return { assertionPayload, requestId }
	} catch (err) {
		activeSession = null
		throw err
	}
}

/**
 * Returns true when a Shortcake handshake is currently in progress.
 */
export const hasActiveShortcakeSession = (): boolean => !!activeSession

/**
 * Abort any in-progress Shortcake handshake (e.g. on disconnect).
 */
export const abortShortcakeHandshake = (): void => {
	activeSession = null
}
