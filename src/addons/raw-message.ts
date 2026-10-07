import { Boom } from '@hapi/boom'
import { proto } from '../../WAProto/index.js'

/**
 * Raw message mode (ported from @innovatorssoft/baileys).
 *
 * `sock.sendMessage(jid, { extendedTextMessage: {...}, raw: true })` sends a message built
 * directly from `proto.Message` keys. Helper fields (`text`, `image`, `buttons`, ...) must not
 * be mixed in, and every top-level key has to be a valid `proto.Message` key.
 *
 * (The other raw form, `{ raw: { extendedTextMessage: {...} } }`, is handled directly in
 * `generateWAMessageContent`.)
 */
const MESSAGE_PROTO_KEYS = new Set(
	Object.keys(proto.Message.prototype).filter(
		key => !key.startsWith('_') && typeof (proto.Message.prototype as any)[key] !== 'function'
	)
)

export const RAW_MODE_HELPER_KEYS = new Set([
	'raw',
	'text',
	'linkPreview',
	'mentions',
	'mentionAll',
	'contextInfo',
	'buttons',
	'templateButtons',
	'interactiveButtons',
	'nativeFlow',
	'optionText',
	'optionTitle',
	'offerText',
	'offerCode',
	'offerUrl',
	'offerExpiration',
	'title',
	'subtitle',
	'footer',
	'hasMediaAttachment',
	'sections',
	'buttonText',
	'listType',
	'cards',
	'contacts',
	'location',
	'react',
	'delete',
	'forward',
	'force',
	'disappearingMessagesInChat',
	'groupInvite',
	'adminInvite',
	'pin',
	'keep',
	'call',
	'event',
	'payment',
	'paymentInvite',
	'poll',
	'pollResult',
	'order',
	'product',
	'businessOwnerJid',
	'sharePhoneNumber',
	'requestPhoneNumber',
	'album',
	'interactiveAsTemplate',
	'groupStatus',
	'ephemeral',
	'edit',
	'viewOnce',
	'viewOnceV2',
	'viewOnceV2Extension',
	'viewOnceExt',
	'spoiler',
	'isLottie',
	'secureMetaServiceLabel',
	'code',
	'links',
	'table',
	'richResponse',
	'productList',
	'thumbnail',
	'audioFooter',
	'caption',
	'shop',
	'shopSurface',
	'collection',
	'bizJid',
	'id',
	'ptv',
	'image',
	'video',
	'audio',
	'sticker',
	'document',
	'mimetype',
	'jpegThumbnail',
	'gifPlayback',
	'fileName',
	'seconds'
])

/** Builds a `proto.Message` from a `{ ...protoKeys, raw: true }` payload, validating the keys. */
export const buildRawMessageContent = (message: Record<string, unknown>): proto.IMessage => {
	const rawPayload: Record<string, unknown> = { ...message }
	delete rawPayload.raw

	const helperKeys = Object.keys(rawPayload).filter(
		key => RAW_MODE_HELPER_KEYS.has(key) && !MESSAGE_PROTO_KEYS.has(key)
	)
	if (helperKeys.length) {
		throw new Boom(`Raw mode does not support helper fields: ${helperKeys.join(', ')}`, { statusCode: 400 })
	}

	const invalidKeys = Object.keys(rawPayload).filter(key => !MESSAGE_PROTO_KEYS.has(key))
	if (invalidKeys.length) {
		throw new Boom(`Raw mode payload contains unsupported top-level keys: ${invalidKeys.join(', ')}`, {
			statusCode: 400
		})
	}

	if (!Object.keys(rawPayload).length) {
		throw new Boom('Raw mode payload must include at least one proto message key', { statusCode: 400 })
	}

	return proto.Message.fromObject(rawPayload)
}
