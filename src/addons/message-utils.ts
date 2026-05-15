import { randomBytes } from 'crypto'
import { proto } from '../../WAProto/index.js'
import type {
	AnyMessageContent,
	MessageGenerationOptions,
	WAMediaUpload,
	WAMediaUploadFunction,
	WAMessage
} from '../Types/index'
import { QueryIds, XWAPaths } from '../Types/index'
import {
	generateWAMessage,
	generateWAMessageFromContent,
	getUrlFromDirectPath,
	normalizeMessageContent,
	unixTimestampSeconds
} from '../Utils/index'
import type { BinaryNode } from '../WABinary/index'
import { getBinaryNodeChild, isJidGroup, isJidNewsletter, jidNormalizedUser, S_WHATSAPP_NET } from '../WABinary/index'

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — Message Type Detection
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — Button / Biz Node Helpers
// ─────────────────────────────────────────────────────────────────────────────

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

	const firstButtonName: string | undefined =
		(nativeFlow?.buttons?.[0] as any)?.name ||
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(carouselMessage?.cards?.[0] as any)?.nativeFlowMessage?.buttons?.[0]?.name
	const nativeFlowSpecials = [
		'mpm',
		'cta_catalog',
		'send_location',
		'call_permission_request',
		'wa_payment_transaction_details',
		'automated_greeting_message_view_catalog'
	]
	const ts = unixTimestampSeconds().toString()
	if (nativeFlow && (firstButtonName === 'review_and_pay' || firstButtonName === 'payment_info')) {
		return {
			tag: 'biz',
			attrs: { native_flow_name: firstButtonName === 'review_and_pay' ? 'order_details' : firstButtonName }
		}
	}

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

	if (inner.listMessage) {
		return { tag: 'biz', attrs: {}, content: [{ tag: 'list', attrs: { v: '2', type: 'product_list' } }] }
	}

	return { tag: 'biz', attrs: {} }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — WS Extras (mentions, media, MD patch, album, socket extras)
// ─────────────────────────────────────────────────────────────────────────────

export interface MentionContent {
	mentions?: string[]
	mentionAll?: boolean
}

export type AlbumMediaItem =
	| { image: WAMediaUpload; caption?: string; [key: string]: unknown }
	| { video: WAMediaUpload; caption?: string; gifPlayback?: boolean; [key: string]: unknown }

export interface AlbumOptions {
	userJid: string
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

export interface MessageExtrasContext {
	query: (node: BinaryNode) => Promise<BinaryNode>
	newsletterWMexQuery?: (
		variables: Record<string, unknown> | undefined,
		queryId: string,
		options: Record<string, unknown>
	) => Promise<BinaryNode>
}

/** Build contextInfo for @mention or @all. */
export const buildMentionContextInfo = (message: MentionContent): { contextInfo: proto.IContextInfo } => {
	if (message.mentionAll) return { contextInfo: { nonJidMentions: 1 } as proto.IContextInfo }
	if (message.mentions?.length) return { contextInfo: { mentionedJid: message.mentions } }
	return { contextInfo: {} }
}

type _ButtonsLike = {
	imageMessage?: proto.Message.IImageMessage | null
	videoMessage?: proto.Message.IVideoMessage | null
	documentMessage?: proto.Message.IDocumentMessage | null
	header?: {
		imageMessage?: proto.Message.IImageMessage | null
		videoMessage?: proto.Message.IVideoMessage | null
		documentMessage?: proto.Message.IDocumentMessage | null
	} | null
}

/** Extract embedded media from buttons/interactive message (top-level or header-nested). */
export const extractFromButtonsMessage = (
	msg: _ButtonsLike
):
	| { imageMessage: proto.Message.IImageMessage }
	| { videoMessage: proto.Message.IVideoMessage }
	| { documentMessage: proto.Message.IDocumentMessage }
	| null => {
	const header = typeof msg.header === 'object' && msg.header !== null
	if (header ? msg.header?.imageMessage : msg.imageMessage)
		return { imageMessage: (header ? msg.header!.imageMessage : msg.imageMessage)! }
	if (header ? msg.header?.videoMessage : msg.videoMessage)
		return { videoMessage: (header ? msg.header!.videoMessage : msg.videoMessage)! }
	if (header ? msg.header?.documentMessage : msg.documentMessage)
		return { documentMessage: (header ? msg.header!.documentMessage : msg.documentMessage)! }
	return null
}

/** Normalise media input: string → { url }, Buffer → as-is, others → as-is. */
export const normalizeMediaInput = (
	media: WAMediaUpload | string | null | undefined
): WAMediaUpload | null | undefined => {
	if (!media) return media as null | undefined
	if (Buffer.isBuffer(media)) return media
	if (typeof media === 'string') return { url: media }
	return media as WAMediaUpload
}

/** Wrap buttons/template/list/interactive in viewOnceMessageV2Extension for MD clients. */
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
					messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} },
					...message
				}
			}
		}
	}

	return message
}

/**
 * Build and relay an album (multi-image/video) message.
 * @returns Array of individual media WAMessage objects
 * @example
 * const items = await prepareAlbumMessageContent(jid, [
 *     { image: { url: 'https://...' }, caption: 'Photo 1' },
 *     { video: { url: 'https://...' }, caption: 'Video 1' }
 * ], { userJid: sock.user!.id, suki: sock })
 */
export const prepareAlbumMessageContent = async (
	jid: string,
	albums: AlbumMediaItem[],
	options: AlbumOptions
): Promise<WAMessage[]> => {
	const messages: WAMessage[] = []

	// Error 1 fix: generateWAMessageFromContent needs userJid — pass it directly
	const albumMsg = generateWAMessageFromContent(
		jid,
		{
			albumMessage: {
				expectedImageCount: albums.filter(item => 'image' in item).length,
				expectedVideoCount: albums.filter(item => 'video' in item).length
			}
		} as unknown as proto.IMessage,
		{ userJid: options.userJid } as unknown as MessageGenerationOptions
	)

	await options.suki.relayMessage(jid, albumMsg.message!, { messageId: albumMsg.key.id! })

	for (const media of albums) {
		let mediaMsg: WAMessage | undefined
		const uploadFn = async (encFilePath: unknown, opts: { mediaType?: string }) => {
			const res = await options.suki.waUploadToServer(encFilePath, {
				...opts,
				newsletter: isJidNewsletter(jid)
			})
			return {
				mediaUrl: res.url ?? '',
				directPath: res.directPath ?? '',
				handle: res.handle,
				mediaKey: res.mediaKey,
				fileEncSha256: res.fileEncSha256,
				fileSha256: res.fileSha256,
				fileLength: res.fileLength
			}
		}

		const sharedOpts = {
			userJid: options.userJid,
			upload: uploadFn as unknown as WAMediaUploadFunction
		}

		// Error 2/3 fix: media already contains image/video — don't spread again (duplicate key)
		if ('image' in media && media.image)
			mediaMsg = await generateWAMessage(
				jid,
				media as unknown as AnyMessageContent,
				sharedOpts as unknown as MessageGenerationOptions
			)
		else if ('video' in media && media.video)
			mediaMsg = await generateWAMessage(
				jid,
				media as unknown as AnyMessageContent,
				sharedOpts as unknown as MessageGenerationOptions
			)

		if (mediaMsg) {
			mediaMsg.message!.messageContextInfo = {
				messageSecret: randomBytes(32),
				messageAssociation: { associationType: 1, parentMessageKey: albumMsg.key }
			}
			messages.push(mediaMsg)
		}
	}

	return messages
}

/** Addon factory for socket-level message extras (profilePictureUrl, getEphemeralGroup). */
export const makeMessageExtrasAddon = (ctx: MessageExtrasContext) => {
	const { query, newsletterWMexQuery } = ctx

	/**
	 * Fetch profile picture URL for any JID, including newsletters.
	 * @example
	 * const url = await sock.profilePictureUrl('1234567890@s.whatsapp.net')
	 */
	const profilePictureUrl = async (jid: string): Promise<string | null> => {
		if (isJidNewsletter(jid) && newsletterWMexQuery) {
			const node = await newsletterWMexQuery(undefined, QueryIds.METADATA, {
				input: { key: jid, type: 'JID', view_role: 'GUEST' },
				fetch_viewer_metadata: true,
				fetch_full_image: true,
				fetch_creation_time: true
			})
			const resultStr = getBinaryNodeChild(node, 'result')?.content?.toString()
			if (!resultStr) return null

			const metadata = JSON.parse(resultStr).data[XWAPaths.xwa2_newsletter_metadata]
			return getUrlFromDirectPath(metadata?.thread_metadata?.picture?.direct_path || '')
		}

		const result = await query({
			tag: 'iq',
			attrs: { target: jidNormalizedUser(jid), to: S_WHATSAPP_NET, type: 'get', xmlns: 'w:profile:picture' },
			content: [{ tag: 'picture', attrs: { type: 'image', query: 'url' }, content: undefined }]
		})
		return getBinaryNodeChild(result, 'picture')?.attrs?.url || null
	}

	/**
	 * Query the ephemeral (disappearing messages) timer for a group.
	 * @returns timer in seconds, or 0 if not set
	 * @example
	 * const timer = await sock.getEphemeralGroup('120363xxx@g.us')
	 */
	const getEphemeralGroup = async (jid: string): Promise<number | string> => {
		if (!isJidGroup(jid)) throw new TypeError('Jid should originate from a group!')
		const result = await query({
			tag: 'iq',
			attrs: { id: `ephemeral-${Date.now()}`, to: jid, type: 'get', xmlns: 'w:g2' },
			content: [{ tag: 'query', attrs: { request: 'interactive' }, content: undefined }]
		})
		return getBinaryNodeChild(getBinaryNodeChild(result, 'group'), 'ephemeral')?.attrs?.expiration || 0
	}

	return { profilePictureUrl, getEphemeralGroup }
}
