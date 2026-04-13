/**
 * Message Utils Addon
 * Merged from src (qb3) + srcc (innovatorssoft)
 *
 * - getMediaType                — media type string from proto message
 * - getMessageType              — message category (text/media/poll/reaction/event)
 * - getButtonType               — detect button message kind
 * - getButtonArgs               — build <biz> binary node for relayMessage
 * - buildMentionContextInfo     — build contextInfo for @mentions / @all
 * - extractFromButtonsMessage   — extract media from buttons/interactive message
 * - normalizeMediaInput         — normalise media input forms
 * - patchMessageForMdIfRequired — wrap button/template/list/interactive in viewOnceMessageV2Extension
 * - prepareAlbumMessageContent  — build & relay album (multi-image/video) message sequence
 */

import { randomBytes } from 'crypto'
import { proto } from '../../WAProto/index.js'
import type { BinaryNode } from '../WABinary'
import { isJidNewsletter } from '../WABinary'
import { normalizeMessageContent } from '../Utils/messages'
import { unixTimestampSeconds } from '../Utils/generics'
import type { AnyMessageContent, MiscMessageGenerationOptions, WAMessage } from '../Types'
import { generateWAMessage, generateWAMessageFromContent } from '../Utils/messages'

// ── Message Type Detection ─────────────────────────────────────────────────

export function getMediaType(message: proto.IMessage): string {
	if (message.imageMessage) return 'image'
	if (message.videoMessage) return message.videoMessage.gifPlayback ? 'gif' : 'video'
	if (message.audioMessage) return message.audioMessage.ptt ? 'ptt' : 'audio'
	if (message.contactMessage) return 'vcard'
	if (message.documentMessage) return 'document'
	if (message.contactsArrayMessage) return 'contact_array'
	if (message.liveLocationMessage) return 'livelocation'
	if (message.stickerMessage) return 'sticker'
	if (message.listMessage) return 'list'
	if (message.listResponseMessage) return 'list_response'
	if (message.buttonsResponseMessage) return 'buttons_response'
	if (message.orderMessage) return 'order'
	if (message.productMessage) return 'product'
	if (message.interactiveResponseMessage) return 'native_flow_response'
	if (message.groupInviteMessage) return 'url'
	return ''
}

export function getMessageType(message: proto.IMessage): string {
	const normalizedMessage = normalizeMessageContent(message)
	if (!normalizedMessage) return 'text'
	if (normalizedMessage.reactionMessage || normalizedMessage.encReactionMessage) return 'reaction'
	if (
		normalizedMessage.pollCreationMessage ||
		normalizedMessage.pollCreationMessageV2 ||
		normalizedMessage.pollCreationMessageV3 ||
		normalizedMessage.pollUpdateMessage
	)
		return 'poll'
	if (normalizedMessage.eventMessage) return 'event'
	if (getMediaType(normalizedMessage) !== '') return 'media'
	return 'text'
}

// ── Button / Biz Node Helpers ──────────────────────────────────────────────

/**
 * Detect what kind of button message this is.
 * Returns: 'list' | 'buttons' | 'native_flow' | undefined
 */
export function getButtonType(message: proto.IMessage): string | undefined {
	const inner = message.viewOnceMessageV2Extension?.message || message
	if (inner.listMessage) return 'list'
	if (inner.buttonsMessage) return 'buttons'
	if (inner.interactiveMessage?.nativeFlowMessage) return 'native_flow'
	if (inner.interactiveMessage?.carouselMessage) return 'native_flow'
	if (message.viewOnceMessage?.message?.interactiveMessage?.carouselMessage) return 'native_flow'
	if (message.viewOnceMessageV2?.message?.interactiveMessage?.carouselMessage) return 'native_flow'
	if (message.viewOnceMessage?.message?.interactiveMessage?.nativeFlowMessage) return 'native_flow'
	if (message.viewOnceMessageV2?.message?.interactiveMessage?.nativeFlowMessage) return 'native_flow'
	if (message.viewOnceMessageV2Extension?.message?.interactiveMessage?.nativeFlowMessage) return 'native_flow'
	if (message.viewOnceMessageV2Extension?.message?.interactiveMessage?.carouselMessage) return 'native_flow'
	return undefined
}

/**
 * Build the <biz> binary node that WhatsApp servers require for button messages.
 */
export function getButtonArgs(message: proto.IMessage): BinaryNode {
	const inner = message.viewOnceMessageV2Extension?.message || message

	const nativeFlow =
		inner.interactiveMessage?.nativeFlowMessage ||
		message.viewOnceMessage?.message?.interactiveMessage?.nativeFlowMessage ||
		message.viewOnceMessageV2?.message?.interactiveMessage?.nativeFlowMessage

	const carouselMessage =
		inner.interactiveMessage?.carouselMessage ||
		message.viewOnceMessage?.message?.interactiveMessage?.carouselMessage ||
		message.viewOnceMessageV2?.message?.interactiveMessage?.carouselMessage

	const firstButtonName =
		nativeFlow?.buttons?.[0]?.name ||
		(carouselMessage?.cards?.[0] as proto.Message.IInteractiveMessage | undefined)?.nativeFlowMessage?.buttons?.[0]
			?.name

	const nativeFlowSpecials = [
		'mpm',
		'cta_catalog',
		'send_location',
		'call_permission_request',
		'wa_payment_transaction_details',
		'automated_greeting_message_view_catalog'
	]

	const ts = unixTimestampSeconds().toString()

	// Payment flows
	if (nativeFlow && (firstButtonName === 'review_and_pay' || firstButtonName === 'payment_info')) {
		return {
			tag: 'biz',
			attrs: {
				native_flow_name: firstButtonName === 'review_and_pay' ? 'order_details' : firstButtonName!
			}
		}
	}

	// Special native flow (catalog, location, etc.)
	if (nativeFlow && nativeFlowSpecials.includes(firstButtonName ?? '')) {
		return {
			tag: 'biz',
			attrs: { actual_actors: '2', host_storage: '2', privacy_mode_ts: ts },
			content: [
				{
					tag: 'interactive',
					attrs: { type: 'native_flow', v: '1' },
					content: [{ tag: 'native_flow', attrs: { v: '2', name: firstButtonName! } }]
				},
				{ tag: 'quality_control', attrs: { source_type: 'third_party' } }
			]
		}
	}

	// Standard interactive / buttons / carousel
	if (nativeFlow || carouselMessage || message.buttonsMessage) {
		return {
			tag: 'biz',
			attrs: {},
			content: [
				{
					tag: 'interactive',
					attrs: { type: 'native_flow', v: '1' },
					content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }]
				}
			]
		}
	}

	// List message
	if (inner.listMessage) {
		return {
			tag: 'biz',
			attrs: {},
			content: [{ tag: 'list', attrs: { v: '2', type: 'product_list' } }]
		}
	}

	// Fallback
	return {
		tag: 'biz',
		attrs: {}
	}
}

// ── Mention Context Info ───────────────────────────────────────────────────

export interface MentionContent {
	/** Array of JIDs to @mention */
	mentions?: string[]
	/** True = @mention all participants */
	mentionAll?: boolean
}

/**
 * Build a `contextInfo` object for `@mention` or `@all` messages.
 *
 * @example
 * await sock.sendMessage(jid, {
 *     text: '@all please read this',
 *     ...buildMentionContextInfo({ mentionAll: true })
 * })
 */
export const buildMentionContextInfo = (message: MentionContent): { contextInfo: proto.IContextInfo } => {
	if (message.mentionAll) {
		return { contextInfo: { nonJidMentions: 1 } as proto.IContextInfo }
	}
	if (message.mentions?.length) {
		return { contextInfo: { mentionedJid: message.mentions } }
	}
	return { contextInfo: {} }
}

// ── Extract Media From Buttons/Interactive Message ─────────────────────────

type ButtonsLike = {
	imageMessage?: proto.IImageMessage | null
	videoMessage?: proto.IVideoMessage | null
	documentMessage?: proto.IDocumentMessage | null
	header?: {
		imageMessage?: proto.IImageMessage | null
		videoMessage?: proto.IVideoMessage | null
		documentMessage?: proto.IDocumentMessage | null
	} | null
}

/**
 * Extract the embedded media payload from a buttons / interactive message.
 */
export const extractFromButtonsMessage = (
	msg: ButtonsLike
):
	| { imageMessage: proto.IImageMessage }
	| { videoMessage: proto.IVideoMessage }
	| { documentMessage: proto.IDocumentMessage }
	| null => {
	const hasHeader = typeof msg.header === 'object' && msg.header !== null
	if (hasHeader ? msg.header?.imageMessage : msg.imageMessage) {
		return { imageMessage: (hasHeader ? msg.header!.imageMessage : msg.imageMessage)! }
	}
	if (hasHeader ? msg.header?.videoMessage : msg.videoMessage) {
		return { videoMessage: (hasHeader ? msg.header!.videoMessage : msg.videoMessage)! }
	}
	if (hasHeader ? msg.header?.documentMessage : msg.documentMessage) {
		return { documentMessage: (hasHeader ? msg.header!.documentMessage : msg.documentMessage)! }
	}
	return null
}

// ── Normalize Media Input ──────────────────────────────────────────────────

/**
 * Normalise various media input forms to a consistent object.
 */
export const normalizeMediaInput = (
	media: Buffer | string | { url: string } | { stream: NodeJS.ReadableStream } | null | undefined
): Buffer | { url: string } | { stream: NodeJS.ReadableStream } | null | undefined => {
	if (!media) return media
	if (Buffer.isBuffer(media)) return media
	if (typeof media === 'string') return { url: media }
	return media
}

// ── Patch Message for MD (viewOnceMessageV2Extension wrap) ─────────────────

/**
 * Wraps button/template/list/interactive messages in viewOnceMessageV2Extension
 * so they render correctly on multi-device (MD) clients.
 */
export const patchMessageForMdIfRequired = (message: proto.IMessage): proto.IMessage => {
	if (
		message?.buttonsMessage ||
		message?.templateMessage ||
		message?.listMessage ||
		message?.interactiveMessage?.nativeFlowMessage
	) {
		return {
			viewOnceMessageV2Extension: {
				message: {
					messageContextInfo: {
						deviceListMetadataVersion: 2,
						deviceListMetadata: {}
					},
					...message
				}
			}
		}
	}
	return message
}

// ── Album Message Content Builder ─────────────────────────────────────────

export type AlbumMediaItem =
	| ({ image: AnyMessageContent['image'] } & Partial<AnyMessageContent>)
	| ({ video: AnyMessageContent['video'] } & Partial<AnyMessageContent>)

export interface AlbumOptions extends MiscMessageGenerationOptions {
	userJid: string
	/** The socket instance (needs `relayMessage` and `waUploadToServer`) */
	suki: {
		relayMessage: (jid: string, msg: proto.IMessage, opts: { messageId: string }) => Promise<void>
		waUploadToServer: (
			stream: unknown,
			opts: { mediaType?: string; newsletter?: boolean }
		) => Promise<{
			handle?: string
			url?: string
			directPath?: string
			mediaKey?: Buffer
			fileEncSha256?: Buffer
			fileSha256?: Buffer
			fileLength?: number
		}>
	}
}

/**
 * Build and relay an album (multi-image / multi-video) message.
 *
 * @returns Array of individual media WAMessage objects
 */
export const prepareAlbumMessageContent = async (
	jid: string,
	albums: AlbumMediaItem[],
	options: AlbumOptions
): Promise<WAMessage[]> => {
	const messages: WAMessage[] = []

	const albumMsg = generateWAMessageFromContent(
		jid,
		{
			albumMessage: {
				expectedImageCount: albums.filter(item => 'image' in item).length,
				expectedVideoCount: albums.filter(item => 'video' in item).length
			}
		} as unknown as proto.IMessage,
		options
	)

	await options.suki.relayMessage(jid, albumMsg.message!, {
		messageId: albumMsg.key.id!
	})

	for (const media of albums) {
		let mediaMsg: WAMessage | undefined

		const uploadFn = async (encFilePath: unknown, opts: { mediaType?: string }) => {
			return options.suki.waUploadToServer(encFilePath, {
				...opts,
				newsletter: isJidNewsletter(jid)
			})
		}

		const sharedOpts = { userJid: options.userJid, upload: uploadFn, ...options }

		if ('image' in media && media.image) {
			mediaMsg = await generateWAMessage(jid, { image: media.image, ...media } as AnyMessageContent, sharedOpts)
		} else if ('video' in media && media.video) {
			mediaMsg = await generateWAMessage(jid, { video: media.video, ...media } as AnyMessageContent, sharedOpts)
		}

		if (mediaMsg) {
			mediaMsg.message!.messageContextInfo = {
				messageSecret: randomBytes(32),
				messageAssociation: {
					associationType: 1,
					parentMessageKey: albumMsg.key
				}
			}
			messages.push(mediaMsg)
		}
	}

	return messages
}
