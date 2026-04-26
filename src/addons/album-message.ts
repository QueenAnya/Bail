/**
 * album-message.ts
 * Ported from @innovatorssoft/baileys
 *
 * Helper for sending a WhatsApp album (multi-media) message.
 * An album is sent as:
 *   1. A parent albumMessage node (expectedImageCount + expectedVideoCount)
 *   2. Each media item relayed individually with parentMessageKey set
 *
 * Usage:
 *   const msgs = await prepareAlbumMessageContent(jid, items, { sock, userJid, upload })
 *   // msgs is already relayed — nothing more to do.
 */

import { randomBytes } from 'crypto'
import { isJidNewsletter } from '../WABinary/jid-utils.js'
import { generateWAMessage, generateWAMessageFromContent } from '../Utils/messages.js'
import type { WAMediaUpload, WAMessage, WAMessageKey } from '../Types/Message.js'

// ── Types ─────────────────────────────────────────────────────────────────────

export type AlbumItem =
	| ({ image: WAMediaUpload } & Record<string, unknown>)
	| ({ video: WAMediaUpload } & Record<string, unknown>)

export type AlbumMessageHelperOptions = {
	userJid: string
	upload: (...args: any[]) => Promise<any>
	/** The connected WASocket instance (needs relayMessage + waUploadToServer). */
	sock: {
		relayMessage: (jid: string, message: WAMessage['message'], opts: { messageId: string }) => Promise<void>
		waUploadToServer: (
			encFilePath: string,
			opts: { fileEncSha256B64: string; mediaType: string; timeoutMs?: number; newsletter?: boolean }
		) => Promise<{ handle?: string; directPath?: string; mediaUrl?: string }>
	}
	logger?: any
	options?: RequestInit
	mediaUploadTimeoutMs?: number
}

// ── Implementation ────────────────────────────────────────────────────────────

/**
 * Send a WhatsApp album message.
 * Sends the parent albumMessage first, then relays each image/video with
 * a parentMessageKey association so WhatsApp groups them into an album.
 *
 * Returns the array of child WAMessages that were sent.
 */
export const prepareAlbumMessageContent = async (
	jid: string,
	albums: AlbumItem[],
	options: AlbumMessageHelperOptions
): Promise<WAMessage[]> => {
	const { sock, userJid, upload, logger, mediaUploadTimeoutMs } = options

	// 1. Send the parent albumMessage
	const albumMsg = generateWAMessageFromContent(
		jid,
		{
			albumMessage: {
				expectedImageCount: albums.filter(item => 'image' in item).length,
				expectedVideoCount: albums.filter(item => 'video' in item).length
			}
		},
		{ userJid } as any
	)

	await sock.relayMessage(jid, albumMsg.message!, {
		messageId: albumMsg.key.id!
	})

	// 2. Relay each media item
	const messages: WAMessage[] = []

	for (const media of albums) {
		const uploadFn = async (encFilePath: string, opts: any) => {
			const up = await sock.waUploadToServer(encFilePath, {
				...opts,
				newsletter: isJidNewsletter(jid)
			})
			return up
		}

		const mediaMsg = await generateWAMessage(
			jid,
			{
				...(media as any)
			},
			{
				userJid,
				upload: uploadFn,
				logger,
				mediaUploadTimeoutMs,
				options: options.options
			} as any
		)

		// Attach the album parent key as messageAssociation
		if (mediaMsg.message) {
			mediaMsg.message.messageContextInfo = {
				...mediaMsg.message.messageContextInfo,
				messageSecret: randomBytes(32),
				messageAssociation: {
					associationType: 1,
					parentMessageKey: albumMsg.key as WAMessageKey
				}
			}
		}

		await sock.relayMessage(jid, mediaMsg.message!, {
			messageId: mediaMsg.key.id!
		})

		messages.push(mediaMsg)
	}

	return messages
}
