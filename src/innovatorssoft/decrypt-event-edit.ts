/**
 * Decrypt Event Edit (RSVP-edit) Response
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * Master/upstream Baileys can decrypt the *initial* RSVP to a WhatsApp
 * Event (`decryptEventResponse` in `Utils/process-message.ts`), but does
 * not handle a later *edit* of that RSVP. WhatsApp encrypts edits with a
 * different signature string ("Event Edit" instead of "Event Response"),
 * so the initial-response decryptor cannot be reused as-is.
 */

import { proto } from '../../WAProto/index.js'
import { aesDecryptGCM, hmacSign } from '../Utils/crypto'

export interface EventEditContext {
	eventCreatorJid: string
	eventMsgId: string
	eventEncKey: Uint8Array
	responderJid: string
}

export function decryptEventEdit(
	{ encPayload, encIv }: proto.Message.IPollEncValue,
	{ eventCreatorJid, eventMsgId, eventEncKey, responderJid }: EventEditContext
): proto.Message {
	const sign = Buffer.concat([
		toBinary(eventMsgId),
		toBinary(eventCreatorJid),
		toBinary(responderJid),
		toBinary('Event Edit'),
		new Uint8Array([1])
	])

	const key0 = hmacSign(eventEncKey, new Uint8Array(32), 'sha256')
	const decKey = hmacSign(sign, key0, 'sha256')

	const decrypted = aesDecryptGCM(encPayload!, decKey, encIv!, new Uint8Array(0))
	return proto.Message.decode(decrypted)

	function toBinary(txt: string) {
		return Buffer.from(txt)
	}
}
