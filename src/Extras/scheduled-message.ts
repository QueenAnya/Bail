/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT) - Utils/scheduled-message.js, rewritten in TypeScript.
 *
 * Helpers for WhatsApp "scheduled messages": the message is encrypted with a random reveal key, sent as a
 * `conditionalRevealMessage`, and the server releases it at the scheduled time once it has the key (`<meta>` node).
 * This module only has the building blocks (encode / decode, meta node, unschedule message, time window check).
 */
import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from 'crypto'
import { proto } from '../../WAProto/index.js'
import type { BinaryNode } from '../WABinary'

export const SCHEDULED_MSG_META_TYPE = 'scheduled_message'
export const SCHEDULED_MSG_MAX_PER_CHAT = 30
export const SCHEDULED_MSG_MAX_MEDIA = 1
export const SCHEDULED_MSG_RESOURCE_LIMIT_NACK_CODE = 419
export const SCHEDULED_MSG_REVEAL_KEY_BYTES = 32
export const SCHEDULED_MSG_REVEAL_KEY_IV_BYTES = 12
export const SCHEDULED_MSG_REVEAL_KEY_RETENTION_DAYS = 30
export const SCHEDULED_MSG_TAG_BYTES = 16

export const SCHEDULED_MSG_WINDOW = Object.freeze({
	chat: { minSeconds: 600, maxSeconds: 1209600 },
	newsletter: { minSeconds: 600, maxSeconds: 2592000 }
})

export const generateRevealKey = () => randomBytes(SCHEDULED_MSG_REVEAL_KEY_BYTES)

export const generateRevealKeyId = () => randomUUID()

export const encryptWithRevealKey = (plaintext: Uint8Array, revealKey: Uint8Array) => {
	const key = Buffer.from(revealKey)
	if (key.length !== SCHEDULED_MSG_REVEAL_KEY_BYTES) {
		throw new TypeError(`reveal key must be ${SCHEDULED_MSG_REVEAL_KEY_BYTES} bytes`)
	}

	const encIv = randomBytes(SCHEDULED_MSG_REVEAL_KEY_IV_BYTES)
	const cipher = createCipheriv('aes-256-gcm', key, encIv)
	const body = Buffer.concat([cipher.update(Buffer.from(plaintext)), cipher.final()])
	return { encIv, encPayload: Buffer.concat([body, cipher.getAuthTag()]) }
}

export const decryptWithRevealKey = (encPayload: Uint8Array, encIv: Uint8Array, revealKey: Uint8Array) => {
	const key = Buffer.from(revealKey)
	const payload = Buffer.from(encPayload)
	if (payload.length < SCHEDULED_MSG_TAG_BYTES) {
		throw new TypeError('encrypted payload is too short to carry an auth tag')
	}

	const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(encIv))
	decipher.setAuthTag(payload.subarray(payload.length - SCHEDULED_MSG_TAG_BYTES))
	return Buffer.concat([
		decipher.update(payload.subarray(0, payload.length - SCHEDULED_MSG_TAG_BYTES)),
		decipher.final()
	])
}

export const buildConditionalRevealMessage = ({
	encPayload,
	encIv,
	revealKeyId
}: {
	encPayload: Uint8Array
	encIv: Uint8Array
	revealKeyId: string
}) => ({
	conditionalRevealMessage: {
		// @ts-expect-error the generated d.ts does not nest this type; Utils/proto-compat.ts attaches it under Message
		conditionalRevealMessageType: proto.Message.ConditionalRevealMessage.ConditionalRevealMessageType.SCHEDULED_MESSAGE,
		encPayload: Buffer.from(encPayload),
		encIv: Buffer.from(encIv),
		revealKeyId
	}
})

/** Encrypts a `proto.Message` object; send `.message` and keep `revealKey` / `revealKeyId` for the `<meta>` node. */
export const encodeScheduledMessage = (message: Record<string, any>, revealKey: Uint8Array = generateRevealKey()) => {
	const plaintext = proto.Message.encode(proto.Message.fromObject(message)).finish()
	const { encIv, encPayload } = encryptWithRevealKey(plaintext, revealKey)
	const revealKeyId = generateRevealKeyId()
	return {
		revealKey,
		revealKeyId,
		encIv,
		encPayload,
		message: buildConditionalRevealMessage({ encPayload, encIv, revealKeyId })
	}
}

export const decodeScheduledMessage = (conditionalRevealMessage: any, revealKey: Uint8Array) => {
	const inner = conditionalRevealMessage?.conditionalRevealMessage ?? conditionalRevealMessage
	if (!inner?.encPayload || !inner?.encIv) {
		throw new TypeError('conditionalRevealMessage is missing encPayload or encIv')
	}

	return proto.Message.decode(decryptWithRevealKey(inner.encPayload, inner.encIv, revealKey))
}

export const buildScheduledMsgMetaNode = ({
	kind = 'schedule',
	scheduledTimestampS,
	revealKeyId,
	revealKey
}: {
	kind?: 'schedule' | 'unschedule'
	scheduledTimestampS?: number
	revealKeyId: string
	revealKey?: Uint8Array
}): BinaryNode => {
	if (!revealKeyId) {
		throw new TypeError('revealKeyId is required')
	}

	if (kind === 'schedule' && !revealKey) {
		throw new TypeError('scheduling requires the reveal key')
	}

	const attrs: Record<string, string> = { type: SCHEDULED_MSG_META_TYPE }
	if (kind === 'schedule') {
		if (!Number.isFinite(Number(scheduledTimestampS))) {
			throw new TypeError('scheduledTimestampS must be a unix timestamp in seconds')
		}

		attrs.st = String(Math.floor(Number(scheduledTimestampS)))
	}

	return {
		tag: 'meta',
		attrs,
		content: [
			{
				tag: 'key',
				attrs: { rkid: revealKeyId },
				content: kind === 'schedule' ? Buffer.from(revealKey!) : undefined
			}
		]
	}
}

export const buildUnscheduleProtocolMessage = (key: Record<string, any>) => ({
	protocolMessage: { key, type: proto.Message.ProtocolMessage.Type.MESSAGE_UNSCHEDULE }
})

export const isScheduledTimeValid = (
	scheduledTimestampS: number,
	nowSeconds = Math.floor(Date.now() / 1000),
	window: { minSeconds: number; maxSeconds: number } = SCHEDULED_MSG_WINDOW.chat
) => {
	const rounded = Math.floor(nowSeconds / 60) * 60
	return scheduledTimestampS - rounded >= window.minSeconds && scheduledTimestampS - nowSeconds <= window.maxSeconds
}
