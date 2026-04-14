import { proto } from '../../WAProto/index.js'
import type { BinaryNode } from '../WABinary'
import { normalizeMessageContent } from '../Utils/messages'
import { unixTimestampSeconds } from '../Utils/generics'

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
 * Detect what kind of button message this is
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
 * Build the <biz> binary node that WhatsApp servers require for button messages
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
	// Uses exact biz node structure from sendButton — works on iOS + Android + WA Business + WA Messenger
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

// ─── WS-Patched Extras ────────────────────────────────────────────────────
// buildMentionContextInfo, extractFromButtonsMessage, normalizeMediaInput,
// patchMessageForMdIfRequired, prepareAlbumMessageContent
// makeMessageExtrasAddon (profilePictureUrl, getEphemeralGroup)
// Ported from innovatorssoft/Baileys

import { randomBytes as _randomBytes } from 'crypto'
import type { AnyMessageContent, MiscMessageGenerationOptions, WAMessage as _WAMessage } from '../Types'
import {
	generateWAMessage as _generateWAMessage,
	generateWAMessageFromContent as _generateWAMessageFromContent
} from '../Utils/messages'
import { QueryIds, XWAPaths } from '../Types'
import { getUrlFromDirectPath } from '../Utils'
import {
	getBinaryNodeChild,
	isJidGroup,
	isJidNewsletter as _isJidNewsletter,
	jidNormalizedUser as _jidNormalizedUser,
	S_WHATSAPP_NET as _S_WHATSAPP_NET
} from '../WABinary'
import type { BinaryNode as _BinaryNode } from '../WABinary'

// ── Types ──────────────────────────────────────────────────────────────────

export interface MentionContent {
	/** Array of JIDs to @mention */
	mentions?: string[]
	/** True = @mention everyone */
	mentionAll?: boolean
}

export type AlbumMediaItem =
	| ({ image: AnyMessageContent['image'] } & Partial<AnyMessageContent>)
	| ({ video: AnyMessageContent['video'] } & Partial<AnyMessageContent>)

export interface AlbumOptions extends MiscMessageGenerationOptions {
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
	query: (_BinaryNode) => Promise<_BinaryNode>
	newsletterWMexQuery?: (
		variables: Record<string, unknown> | undefined,
		queryId: string,
		options: Record<string, unknown>
	) => Promise<_BinaryNode>
}

// ── Mention / Context Helpers ──────────────────────────────────────────────

/**
 * Build contextInfo for @mention or @all.
 *
 * @example
 * await sock.sendMessage(jid, {
 *     text: '@all read this',
 *     ...buildMentionContextInfo({ mentionAll: true })
 * })
 */
export const buildMentionContextInfo = (message: MentionContent): { contextInfo: proto.IContextInfo } => {
	if (message.mentionAll) return { contextInfo: { nonJidMentions: 1 } as proto.IContextInfo }
	if (message.mentions?.length) return { contextInfo: { mentionedJid: message.mentions } }
	return { contextInfo: {} }
}

// ── Media Helpers ──────────────────────────────────────────────────────────

type _ButtonsLike = {
	imageMessage?: proto.IImageMessage | null
	videoMessage?: proto.IVideoMessage | null
	documentMessage?: proto.IDocumentMessage | null
	header?: {
		imageMessage?: proto.IImageMessage | null
		videoMessage?: proto.IVideoMessage | null
		documentMessage?: proto.IDocumentMessage | null
	} | null
}

/** Extract embedded media from buttons/interactive message (top-level or header-nested). */
export const extractFromButtonsMessage = (
	msg: _ButtonsLike
):
	| { imageMessage: proto.IImageMessage }
	| { videoMessage: proto.IVideoMessage }
	| { documentMessage: proto.IDocumentMessage }
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
	media: Buffer | string | { url: string } | { stream: NodeJS.ReadableStream } | null | undefined
): Buffer | { url: string } | { stream: NodeJS.ReadableStream } | null | undefined => {
	if (!media) return media
	if (Buffer.isBuffer(media)) return media
	if (typeof media === 'string') return { url: media }
	return media
}

// ── MD Patch ───────────────────────────────────────────────────────────────

/**
 * Wrap buttons/template/list/interactiveMessage in viewOnceMessageV2Extension
 * so they render on multi-device (MD) clients.
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
					messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} },
					...message
				}
			}
		}
	}
	return message
}

// ── Album ──────────────────────────────────────────────────────────────────

/**
 * Build and relay an album (multi-image/video) message.
 *
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
): Promise<_WAMessage[]> => {
	const messages: _WAMessage[] = []

	const albumMsg = _generateWAMessageFromContent(
		jid,
		{
			albumMessage: {
				expectedImageCount: albums.filter(item => 'image' in item).length,
				expectedVideoCount: albums.filter(item => 'video' in item).length
			}
		} as unknown as proto.IMessage,
		options
	)

	await options.suki.relayMessage(jid, albumMsg.message!, { messageId: albumMsg.key.id! })

	for (const media of albums) {
		let mediaMsg: _WAMessage | undefined
		const uploadFn = async (encFilePath: unknown, opts: { mediaType?: string }) =>
			options.suki.waUploadToServer(encFilePath, { ...opts, newsletter: _isJidNewsletter(jid) })
		const sharedOpts = { userJid: options.userJid, upload: uploadFn, ...options }

		if ('image' in media && media.image)
			mediaMsg = await _generateWAMessage(jid, { image: media.image, ...media } as AnyMessageContent, sharedOpts)
		else if ('video' in media && media.video)
			mediaMsg = await _generateWAMessage(jid, { video: media.video, ...media } as AnyMessageContent, sharedOpts)

		if (mediaMsg) {
			mediaMsg.message!.messageContextInfo = {
				messageSecret: _randomBytes(32),
				messageAssociation: { associationType: 1, parentMessageKey: albumMsg.key }
			}
			messages.push(mediaMsg)
		}
	}

	return messages
}

// ── Socket-Level Extras ────────────────────────────────────────────────────

/**
 * Addon factory for socket-level message extras.
 * Inject into makeMessagesSocket return:
 *   const msgExtras = makeMessageExtrasAddon({ query, newsletterWMexQuery })
 *   return { ...sock, ...msgExtras }
 */
export const makeMessageExtrasAddon = (ctx: MessageExtrasContext) => {
	const { query, newsletterWMexQuery } = ctx

	/**
	 * Fetch profile picture URL for any JID (users, groups, newsletters).
	 * @example
	 * const url = await sock.profilePictureUrl('1234567890@s.whatsapp.net')
	 */
	const profilePictureUrl = async (jid: string): Promise<string | null> => {
		if (_isJidNewsletter(jid) && newsletterWMexQuery) {
			const node = await newsletterWMexQuery(undefined, QueryIds.METADATA, {
				input: { key: jid, type: 'JID', view_role: 'GUEST' },
				fetch_viewer_metadata: true,
				fetch_full_image: true,
				fetch_creation_time: true
			})
			const resultStr = getBinaryNodeChild(node, 'result')?.content?.toString()
			if (!resultStr) return null
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const metadata = JSON.parse(resultStr).data[XWAPaths.xwa2_newsletter_metadata] as any
			return getUrlFromDirectPath(metadata?.thread_metadata?.picture?.direct_path || '')
		}
		const result = await query({
			tag: 'iq',
			attrs: { target: _jidNormalizedUser(jid), to: _S_WHATSAPP_NET, type: 'get', xmlns: 'w:profile:picture' },
			content: [{ tag: 'picture', attrs: { type: 'image', query: 'url' }, content: undefined }]
		})
		return getBinaryNodeChild(result, 'picture')?.attrs?.url || null
	}

	/**
	 * Query disappearing messages timer for a group.
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
		return getBinaryNodeChild(getBinaryNodeChild(result, 'group')!, 'ephemeral')?.attrs?.expiration || 0
	}

	return { profilePictureUrl, getEphemeralGroup }
}
