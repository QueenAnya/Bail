/**
 * from-messages-send.ts
 * Source: src/Socket/messages-send.ts
 *
 * Status mentions + content normalization ported from innovatorssoft/baileys.
 * Imported back into makeMessagesSocket.
 */
import { randomBytes } from 'crypto'
import type { AnyMessageContent, WAMessage, MessageRelayOptions } from '../Types'
import { isJidGroup, jidNormalizedUser } from '../WABinary'
import { delay } from '../Utils/generics'
import { generateWAMessage, generateWAMessageFromContent } from '../Utils/messages'

export const STORIES_JID = 'status@broadcast'

export interface StatusMentionDeps {
	meId: string
	logger: { error: (msg: string) => void }
	groupMetadata: (jid: string) => Promise<{ participants: Array<{ id: string }> }>
	cachedGroupMetadata?: (jid: string) => Promise<{ participants: Array<{ id: string }> } | undefined>
	generateWAMessageFn?: typeof generateWAMessage
	relayMessage: (jid: string, message: any, opts: any) => Promise<any>
	waUploadToServer: any
	getUrlInfo?: any
	config: any
	linkPreviewImageThumbnailWidth?: number
	generateHighQualityLinkPreview?: boolean
	httpRequestOptions?: any
}

/**
 * Normalize status content — strips fields not valid for media/audio status
 * Source: messages-send.ts → sendStatusMentions (content normalization block)
 */
export function normalizeStatusContent(content: AnyMessageContent): {
	msgContent: AnyMessageContent
	font?: number
	textColor?: string
	backgroundColor?: string
	ptt?: boolean
} {
	const getRandomHex = () =>
		'#' +
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0')
	const isMedia = 'image' in content || 'video' in content || 'audio' in content
	const isAudio = 'audio' in content
	const msgContent = { ...content } as Record<string, unknown>

	if (isMedia && !isAudio) {
		if (msgContent.text) {
			msgContent.caption = msgContent.text
			delete msgContent.text
		}
		delete msgContent.ptt
		delete msgContent.font
		delete msgContent.backgroundColor
		delete msgContent.textColor
	}
	if (isAudio) {
		delete msgContent.text
		delete msgContent.caption
		delete msgContent.font
		delete msgContent.textColor
	}

	return {
		msgContent: msgContent as AnyMessageContent,
		font: !isMedia ? ((content as any).font ?? Math.floor(Math.random() * 9)) : undefined,
		textColor: !isMedia ? ((content as any).textColor ?? getRandomHex()) : undefined,
		backgroundColor: !isMedia || isAudio ? ((content as any).backgroundColor ?? getRandomHex()) : undefined,
		ptt: isAudio ? (typeof (content as any).ptt === 'boolean' ? (content as any).ptt : true) : undefined
	}
}

/**
 * Build the mentioned_users meta node for status relay
 * Source: messages-send.ts → sendStatusMentions (additionalNodes block)
 */
export function buildStatusMentionNode(jids: string[]): any {
	return {
		tag: 'meta',
		attrs: {},
		content: [
			{
				tag: 'mentioned_users',
				attrs: {},
				content: jids.map(jid => ({
					tag: 'to',
					attrs: { jid: jidNormalizedUser(jid) }
				}))
			}
		]
	}
}

/**
 * Core sendStatusMentions logic
 * Source: messages-send.ts → sendStatusMentions
 *
 * Pass all sock dependencies explicitly so this stays testable.
 */
export async function execSendStatusMentions(
	content: AnyMessageContent,
	jids: string[],
	deps: StatusMentionDeps
): Promise<WAMessage> {
	const {
		meId,
		logger,
		groupMetadata,
		cachedGroupMetadata,
		relayMessage,
		waUploadToServer,
		getUrlInfo,
		config,
		linkPreviewImageThumbnailWidth,
		generateHighQualityLinkPreview,
		httpRequestOptions
	} = deps

	const userJid = jidNormalizedUser(meId)
	const allUsers = new Set<string>([userJid])

	for (const id of jids) {
		const isGroup = isJidGroup(id)
		// match innovatorssoft: isJidUser = ends with @s.whatsapp.net
		const isPrivate = id.endsWith('@s.whatsapp.net')

		if (isGroup) {
			try {
				// innovatorssoft: cachedGroupMetadata first, then fallback to groupMetadata
				const meta = (cachedGroupMetadata ? await cachedGroupMetadata(id) : undefined) || (await groupMetadata(id))
				meta.participants.forEach(p => allUsers.add(jidNormalizedUser(p.id)))
			} catch (e) {
				logger.error(`Error getting metadata for group ${id}: ${e}`)
			}
		} else if (isPrivate) {
			allUsers.add(jidNormalizedUser(id))
		}
	}

	const { msgContent, font, textColor, backgroundColor, ptt } = normalizeStatusContent(content)

	const msg = await generateWAMessage(STORIES_JID, msgContent, {
		logger,
		userJid,
		getUrlInfo: getUrlInfo
			? (text: string) =>
					getUrlInfo(text, {
						thumbnailWidth: linkPreviewImageThumbnailWidth,
						fetchOpts: { timeout: 3000, ...(httpRequestOptions || {}) },
						logger,
						uploadImage: generateHighQualityLinkPreview ? waUploadToServer : undefined
					})
			: undefined,
		upload: waUploadToServer,
		mediaCache: config.mediaCache,
		options: config.options,
		font,
		backgroundColor,
		ptt,
		...(textColor ? { textColor } : {})
	} as any)

	await relayMessage(STORIES_JID, msg.message!, {
		messageId: msg.key.id!,
		statusJidList: Array.from(allUsers),
		additionalNodes: [buildStatusMentionNode(jids)]
	})

	for (const id of jids) {
		try {
			const normalizedId = jidNormalizedUser(id)
			const isPrivate = normalizedId.endsWith('@s.whatsapp.net')
			const type = isPrivate ? 'statusMentionMessage' : 'groupStatusMentionMessage'
			const protocolMessage = {
				[type]: { message: { protocolMessage: { key: msg.key, type: 25 } } },
				messageContextInfo: { messageSecret: randomBytes(32) }
			}
			const statusMsg = generateWAMessageFromContent(normalizedId, protocolMessage, { userJid: meId })
			await relayMessage(normalizedId, statusMsg.message!, {
				additionalNodes: [
					{
						tag: 'meta',
						attrs: isPrivate ? { is_status_mention: 'true' } : { is_group_status_mention: 'true' }
					}
				]
			})
			await delay(2000)
		} catch (e) {
			logger.error(`Error sending status mention to ${id}: ${e}`)
		}
	}

	return msg
}
