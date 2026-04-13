/**
 * Message Utils Extras Addon
 * Ported from innovatorssoft/Baileys.
 *
 * Extra message utility functions:
 * - buildMentionContextInfo   — build contextInfo for @mentions / @all
 * - extractFromButtonsMessage — extract media from a buttons/interactive message
 * - normalizeMediaInput       — normalise various media input forms
 * - patchMessageForMdIfRequired — wrap button/template/list/interactive messages
 *                                 in viewOnceMessageV2Extension for MD devices
 * - prepareAlbumMessageContent — build album (multi-image/video) message sequence
 */

import { randomBytes } from 'crypto'
import { proto } from '../../WAProto/index.js'
import type { AnyMessageContent, MiscMessageGenerationOptions, WAMessage, WAMessageContent } from '../Types'
import { generateWAMessage, generateWAMessageFromContent } from '../Utils/messages'
import { isJidNewsletter } from '../WABinary'

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────
// buildMentionContextInfo
// ─────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────
// extractFromButtonsMessage
// ─────────────────────────────────────────────────────────────────

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
 * Extract the embedded media payload from a buttons / interactive message
 * (handles both top-level and header-nested media).
 *
 * @example
 * const media = extractFromButtonsMessage(msg.buttonsMessage!)
 * if (media?.imageMessage) { ... }
 */
export const extractFromButtonsMessage = (
	msg: ButtonsLike
):
	| { imageMessage: proto.IImageMessage }
	| { videoMessage: proto.IVideoMessage }
	| { documentMessage: proto.IDocumentMessage }
	| null => {
	const header = typeof msg.header === 'object' && msg.header !== null

	if (header ? msg.header?.imageMessage : msg.imageMessage) {
		return { imageMessage: (header ? msg.header!.imageMessage : msg.imageMessage)! }
	}
	if (header ? msg.header?.videoMessage : msg.videoMessage) {
		return { videoMessage: (header ? msg.header!.videoMessage : msg.videoMessage)! }
	}
	if (header ? msg.header?.documentMessage : msg.documentMessage) {
		return { documentMessage: (header ? msg.header!.documentMessage : msg.documentMessage)! }
	}
	return null
}

// ─────────────────────────────────────────────────────────────────
// normalizeMediaInput
// ─────────────────────────────────────────────────────────────────

/**
 * Normalise various media input forms to a consistent object.
 * - Buffer → returned as-is
 * - string → `{ url: string }`
 * - already `{ url }` or `{ stream }` → returned as-is
 * - null/undefined → returned as-is
 *
 * @example
 * const img = normalizeMediaInput('./photo.jpg')
 * // → { url: './photo.jpg' }
 */
export const normalizeMediaInput = (
	media: Buffer | string | { url: string } | { stream: NodeJS.ReadableStream } | null | undefined
): Buffer | { url: string } | { stream: NodeJS.ReadableStream } | null | undefined => {
	if (!media) return media
	if (Buffer.isBuffer(media)) return media
	if (typeof media === 'string') return { url: media }
	return media
}

// ─────────────────────────────────────────────────────────────────
// patchMessageForMdIfRequired
// ─────────────────────────────────────────────────────────────────

/**
 * Wraps `buttonsMessage`, `templateMessage`, `listMessage`, and
 * `interactiveMessage.nativeFlowMessage` in a `viewOnceMessageV2Extension`
 * envelope so they render correctly on multi-device (MD) clients.
 *
 * The original message is returned unchanged if no patching is needed.
 *
 * @example
 * const patched = patchMessageForMdIfRequired(fullMsg.message!)
 * await sock.relayMessage(jid, patched, { messageId: fullMsg.key.id! })
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

// ─────────────────────────────────────────────────────────────────
// prepareAlbumMessageContent
// ─────────────────────────────────────────────────────────────────

/**
 * Build and relay an album (multi-image / multi-video) message.
 *
 * First sends the `albumMessage` container, then relays each media item
 * with the correct `messageAssociation` linking it back to the album.
 *
 * @returns Array of individual media `WAMessage` objects
 *
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

	// 1. Send the album container first
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

	// 2. Upload and relay each media item
	for (const media of albums) {
		let mediaMsg: WAMessage | undefined

		const uploadFn = async (encFilePath: unknown, opts: { mediaType?: string }) => {
			const up = await options.suki.waUploadToServer(encFilePath, {
				...opts,
				newsletter: isJidNewsletter(jid)
			})
			return up
		}

		const sharedOpts = { userJid: options.userJid, upload: uploadFn, ...options }

		if ('image' in media && media.image) {
			mediaMsg = await generateWAMessage(jid, { image: media.image, ...media } as AnyMessageContent, sharedOpts)
		} else if ('video' in media && media.video) {
			mediaMsg = await generateWAMessage(jid, { video: media.video, ...media } as AnyMessageContent, sharedOpts)
		}

		if (mediaMsg) {
			// Link each item back to the album via messageAssociation
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
