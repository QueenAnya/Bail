/**
 * Message Utils
 * Combined: message type detection, button helpers, message search, WS extras
 *
 * Exports:
 *  ── Type Detection ──────────────────────────────────────────────
 *   getMediaType, getMessageType, getButtonType, getButtonArgs
 *  ── Search ──────────────────────────────────────────────────────
 *   MessageType, SearchOptions, SearchResult, RegexSearchOptions
 *   extractMessageText, calculateRelevance
 *   searchMessages, searchMessagesRegex
 *   MessageSearchManager, createMessageSearch
 *  ── WS Extras ───────────────────────────────────────────────────
 *   MentionContent, AlbumMediaItem, AlbumOptions
 *   buildMentionContextInfo, extractFromButtonsMessage
 *   normalizeMediaInput, patchMessageForMdIfRequired
 *   prepareAlbumMessageContent
 */

import { randomBytes } from 'crypto'
import { proto } from '../../WAProto/index.js'
import type { BinaryNode } from '../WABinary'
import { isJidNewsletter } from '../WABinary'
import type { AnyMessageContent, MiscMessageGenerationOptions, WAMessage, WAMessageContent } from '../Types'
import { normalizeMessageContent } from '../Utils/messages'
import { generateWAMessage, generateWAMessageFromContent } from '../Utils/messages'
import { unixTimestampSeconds } from '../Utils/generics'

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

	if (nativeFlow && (firstButtonName === 'review_and_pay' || firstButtonName === 'payment_info')) {
		return {
			tag: 'biz',
			attrs: {
				native_flow_name: firstButtonName === 'review_and_pay' ? 'order_details' : firstButtonName!
			}
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
		return {
			tag: 'biz',
			attrs: {},
			content: [{ tag: 'list', attrs: { v: '2', type: 'product_list' } }]
		}
	}

	return { tag: 'biz', attrs: {} }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — Message Search
// ─────────────────────────────────────────────────────────────────────────────

export type MessageType =
	| 'text'
	| 'image'
	| 'video'
	| 'document'
	| 'audio'
	| 'sticker'
	| 'location'
	| 'contact'
	| 'other'

export interface SearchResult {
	message: WAMessage
	matchedText: string
	matchPosition: number
	relevanceScore: number
}

export interface SearchOptions {
	/** Filter by chat JID */
	jid?: string
	/** Filter by sender JID */
	fromSender?: string
	/** Filter by fromMe flag */
	fromMe?: boolean
	/** Filter by message types */
	messageTypes?: MessageType[]
	/** Start date range */
	fromDate?: Date
	/** End date range */
	toDate?: Date
	/** Max number of results */
	limit?: number
	/** Case-sensitive search */
	caseSensitive?: boolean
}

export interface RegexSearchOptions {
	jid?: string
	fromSender?: string
	fromMe?: boolean
	messageTypes?: MessageType[]
	limit?: number
}

const _getMsgType = (message: WAMessage): MessageType => {
	const c = message.message
	if (!c) return 'other'
	if (c.conversation || c.extendedTextMessage) return 'text'
	if (c.imageMessage) return 'image'
	if (c.videoMessage) return 'video'
	if (c.documentMessage) return 'document'
	if (c.audioMessage) return 'audio'
	if (c.stickerMessage) return 'sticker'
	if (c.locationMessage || c.liveLocationMessage) return 'location'
	if (c.contactMessage || c.contactsArrayMessage) return 'contact'
	return 'other'
}

export const extractMessageText = (message: WAMessage): string => {
	const c = message.message
	if (!c) return ''
	if (c.conversation) return c.conversation
	if (c.extendedTextMessage?.text) return c.extendedTextMessage.text
	if (c.imageMessage?.caption) return c.imageMessage.caption
	if (c.videoMessage?.caption) return c.videoMessage.caption
	if (c.documentMessage?.caption) return c.documentMessage.caption
	if (c.documentMessage?.fileName) return c.documentMessage.fileName
	if (c.locationMessage?.name) return c.locationMessage.name
	if (c.locationMessage?.address) return c.locationMessage.address
	if (c.contactMessage?.displayName) return c.contactMessage.displayName
	if (c.pollCreationMessage?.name) return c.pollCreationMessage.name
	return ''
}

export const calculateRelevance = (query: string, text: string, position: number): number => {
	let score = 100
	if (text.toLowerCase() === query.toLowerCase()) score += 50
	score -= Math.min(position / 10, 20)
	const lt = text.toLowerCase(),
		lq = query.toLowerCase()
	if (
		position === 0 ||
		lt[position - 1] === ' ' ||
		lt[position + lq.length] === ' ' ||
		position + lq.length === text.length
	)
		score += 20
	return Math.max(score, 0)
}

export const searchMessages = (messages: WAMessage[], query: string, options: SearchOptions = {}): SearchResult[] => {
	const results: SearchResult[] = []
	const sq = options.caseSensitive ? query : query.toLowerCase()
	for (const message of messages) {
		if (options.jid && message.key.remoteJid !== options.jid) continue
		const ts = message.messageTimestamp
		const mt = ts ? new Date((typeof ts === 'number' ? ts : Number(ts)) * 1000) : null
		if (options.fromDate && mt && mt < options.fromDate) continue
		if (options.toDate && mt && mt > options.toDate) continue
		if (options.fromSender && message.key.participant !== options.fromSender) continue
		if (options.fromMe !== undefined && message.key.fromMe !== options.fromMe) continue
		if (options.messageTypes?.length && !options.messageTypes.includes(_getMsgType(message))) continue
		const text = extractMessageText(message)
		if (!text) continue
		const st = options.caseSensitive ? text : text.toLowerCase()
		const pos = st.indexOf(sq)
		if (pos !== -1) {
			results.push({
				message,
				matchedText: text.substring(Math.max(0, pos - 20), Math.min(text.length, pos + query.length + 20)),
				matchPosition: pos,
				relevanceScore: calculateRelevance(query, text, pos)
			})
		}
		if (options.limit && results.length >= options.limit) break
	}
	return results.sort((a, b) => b.relevanceScore - a.relevanceScore)
}

export const searchMessagesRegex = (
	messages: WAMessage[],
	pattern: RegExp,
	options: RegexSearchOptions = {}
): SearchResult[] => {
	const results: SearchResult[] = []
	for (const message of messages) {
		if (options.jid && message.key.remoteJid !== options.jid) continue
		if (options.fromSender && message.key.participant !== options.fromSender) continue
		if (options.fromMe !== undefined && message.key.fromMe !== options.fromMe) continue
		if (options.messageTypes?.length && !options.messageTypes.includes(_getMsgType(message))) continue
		const text = extractMessageText(message)
		if (!text) continue
		const match = text.match(pattern)
		if (match) results.push({ message, matchedText: match[0], matchPosition: match.index ?? 0, relevanceScore: 100 })
		if (options.limit && results.length >= options.limit) break
	}
	return results
}

export class MessageSearchManager {
	private messages: WAMessage[] = []
	private messageIndex = new Map<string, WAMessage>()

	addMessages(messages: WAMessage[]) {
		for (const msg of messages) {
			const id = msg.key.id
			if (id && !this.messageIndex.has(id)) {
				this.messages.push(msg)
				this.messageIndex.set(id, msg)
			}
		}
	}

	removeMessages(messageIds: string[]) {
		const idSet = new Set(messageIds)
		this.messages = this.messages.filter(m => !idSet.has(m.key.id || ''))
		for (const id of messageIds) this.messageIndex.delete(id)
	}

	clear() {
		this.messages = []
		this.messageIndex.clear()
	}

	get count() {
		return this.messages.length
	}

	search(query: string, options?: SearchOptions) {
		return searchMessages(this.messages, query, options)
	}

	searchRegex(pattern: RegExp, options?: RegexSearchOptions) {
		return searchMessagesRegex(this.messages, pattern, options)
	}

	getByJid(jid: string) {
		return this.messages.filter(m => m.key.remoteJid === jid)
	}
	getBySender(sender: string) {
		return this.messages.filter(m => m.key.participant === sender || m.key.remoteJid === sender)
	}
	getByType(type: MessageType) {
		return this.messages.filter(m => _getMsgType(m) === type)
	}
	getById(id: string) {
		return this.messageIndex.get(id)
	}
}

export const createMessageSearch = (): MessageSearchManager => new MessageSearchManager()

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — WS Extras (mentions, media normalise, MD patch, album)
// ─────────────────────────────────────────────────────────────────────────────

export interface MentionContent {
	/** Array of JIDs to @mention */
	mentions?: string[]
	/** True = @mention all participants */
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

/**
 * Build contextInfo for @mention or @all messages.
 *
 * @example
 * await sock.sendMessage(jid, {
 *     text: '@all please read this',
 *     ...buildMentionContextInfo({ mentionAll: true })
 * })
 */
export const buildMentionContextInfo = (message: MentionContent): { contextInfo: proto.IContextInfo } => {
	if (message.mentionAll) return { contextInfo: { nonJidMentions: 1 } as proto.IContextInfo }
	if (message.mentions?.length) return { contextInfo: { mentionedJid: message.mentions } }
	return { contextInfo: {} }
}

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

/** Extract embedded media from a buttons/interactive message (top-level or header-nested). */
export const extractFromButtonsMessage = (
	msg: ButtonsLike
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

/**
 * Wrap buttons/template/list/interactiveMessage in viewOnceMessageV2Extension
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

	await options.suki.relayMessage(jid, albumMsg.message!, { messageId: albumMsg.key.id! })

	for (const media of albums) {
		let mediaMsg: WAMessage | undefined
		const uploadFn = async (encFilePath: unknown, opts: { mediaType?: string }) =>
			options.suki.waUploadToServer(encFilePath, { ...opts, newsletter: isJidNewsletter(jid) })
		const sharedOpts = { userJid: options.userJid, upload: uploadFn, ...options }

		if ('image' in media && media.image)
			mediaMsg = await generateWAMessage(jid, { image: media.image, ...media } as AnyMessageContent, sharedOpts)
		else if ('video' in media && media.video)
			mediaMsg = await generateWAMessage(jid, { video: media.video, ...media } as AnyMessageContent, sharedOpts)

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
