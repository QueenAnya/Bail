/**
 * Decrypt Utils Addon
 * Ported from innovatorssoft/Baileys.
 *
 * Cryptographic decryption helpers for:
 * - Encrypted comments (decryptComment)
 * - Encrypted event edits (decryptEventEdit)
 * - Encrypted reactions (decryptReaction)
 */

import { proto } from '../../WAProto/index.js'
import { aesDecryptGCM, hmacSign } from '../Utils/crypto'

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

export interface EncryptedPayload {
	encPayload: Buffer | Uint8Array
	encIv: Buffer | Uint8Array
}

export interface CommentDecryptContext {
	commentCreatorJid: string
	commentMsgId: string
	commentEncKey: Buffer | Uint8Array
	commentJid: string
}

export interface EventEditDecryptContext {
	eventCreatorJid: string
	eventMsgId: string
	eventEncKey: Buffer | Uint8Array
	responderJid: string
}

export interface ReactionDecryptContext {
	reactionCreatorJid: string
	reactionMsgId: string
	reactionEncKey: Buffer | Uint8Array
	reactionJid: string
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

const toBinary = (txt: string): Buffer => Buffer.from(txt)

// ─────────────────────────────────────────────────────────────────
// DECRYPT FUNCTIONS
// ─────────────────────────────────────────────────────────────────

/**
 * Decrypt an encrypted comment message.
 *
 * @example
 * const decrypted = decryptComment(
 *     { encPayload, encIv },
 *     { commentCreatorJid, commentMsgId, commentEncKey, commentJid }
 * )
 * // → proto.IMessage
 */
export const decryptComment = (
	{ encPayload, encIv }: EncryptedPayload,
	{ commentCreatorJid, commentMsgId, commentEncKey, commentJid }: CommentDecryptContext
): proto.IMessage => {
	const sign = Buffer.concat([
		toBinary(commentMsgId),
		toBinary(commentCreatorJid),
		toBinary(commentJid),
		toBinary('Enc Comment'),
		new Uint8Array([1])
	])

	const key0 = hmacSign(commentEncKey as Buffer, new Uint8Array(32) as Buffer, 'sha256')
	const decKey = hmacSign(sign, key0, 'sha256')
	const decrypted = aesDecryptGCM(encPayload as Buffer, decKey, encIv as Buffer, null as unknown as Buffer)

	return proto.Message.decode(decrypted)
}

/**
 * Decrypt an encrypted event edit message.
 *
 * @example
 * const decrypted = decryptEventEdit(
 *     { encPayload, encIv },
 *     { eventCreatorJid, eventMsgId, eventEncKey, responderJid }
 * )
 * // → proto.IMessage
 */
export const decryptEventEdit = (
	{ encPayload, encIv }: EncryptedPayload,
	{ eventCreatorJid, eventMsgId, eventEncKey, responderJid }: EventEditDecryptContext
): proto.IMessage => {
	const sign = Buffer.concat([
		toBinary(eventMsgId),
		toBinary(eventCreatorJid),
		toBinary(responderJid),
		toBinary('Event Edit'),
		new Uint8Array([1])
	])

	const key0 = hmacSign(eventEncKey as Buffer, new Uint8Array(32) as Buffer, 'sha256')
	const decKey = hmacSign(sign, key0, 'sha256')
	const decrypted = aesDecryptGCM(encPayload as Buffer, decKey, encIv as Buffer, null as unknown as Buffer)

	return proto.Message.decode(decrypted)
}

/**
 * Decrypt an encrypted reaction message.
 *
 * @example
 * const decrypted = decryptReaction(
 *     { encPayload, encIv },
 *     { reactionCreatorJid, reactionMsgId, reactionEncKey, reactionJid }
 * )
 * // → proto.IReactionMessage
 */
export const decryptReaction = (
	{ encPayload, encIv }: EncryptedPayload,
	{ reactionCreatorJid, reactionMsgId, reactionEncKey, reactionJid }: ReactionDecryptContext
): proto.Message.IReactionMessage => {
	const sign = Buffer.concat([
		toBinary(reactionMsgId),
		toBinary(reactionCreatorJid),
		toBinary(reactionJid),
		toBinary('Enc Reaction'),
		new Uint8Array([1])
	])

	const key0 = hmacSign(reactionEncKey as Buffer, new Uint8Array(32) as Buffer, 'sha256')
	const decKey = hmacSign(sign, key0, 'sha256')
	const decrypted = aesDecryptGCM(encPayload as Buffer, decKey, encIv as Buffer, null as unknown as Buffer)

	return proto.Message.ReactionMessage.decode(decrypted)
}
