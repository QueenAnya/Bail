import { randomBytes } from 'crypto'
import type { WAMediaUpload } from '../Types'

export const STATUS_BROADCAST_JID = 'status@broadcast'

export const STATUS_BACKGROUNDS = {
	solid: {
		green: '#25D366',
		blue: '#34B7F1',
		purple: '#8B5CF6',
		red: '#EF4444',
		orange: '#F97316',
		yellow: '#EAB308',
		pink: '#EC4899',
		teal: '#14B8A6',
		gray: '#6B7280',
		black: '#000000',
		white: '#FFFFFF'
	},
	gradient: {
		sunset: ['#F97316', '#EF4444'],
		ocean: ['#3B82F6', '#06B6D4'],
		forest: ['#22C55E', '#10B981'],
		purple: ['#8B5CF6', '#EC4899'],
		midnight: ['#1E3A8A', '#4C1D95'],
		aurora: ['#06B6D4', '#8B5CF6', '#EC4899']
	}
}

export const STATUS_FONTS = {
	SANS_SERIF: 0,
	SERIF: 1,
	NORICAN: 2,
	BRYNDAN: 3,
	BEBASNEUE: 4,
	OSWALD: 5,
	DAMION: 6,
	DANCING: 7,
	COMFORTAA: 8,
	EXOTWO: 9
}

export const generateStatusMessageId = () => `4NY4W3B${randomBytes(16).toString('hex').toUpperCase()}`

export const getStatusJid = () => STATUS_BROADCAST_JID

export interface TextStatusOptions {
	text: string
	backgroundColor?: string
	font?: number
	textColor?: string
	mentions?: string[]
}

export interface MediaStatusOptions {
	caption?: string
	gifPlayback?: boolean
	waveform?: Uint8Array
}

export const createTextStatus = (options: {
	text: string
	backgroundColor?: string
	font?: number
	textColor?: string
	mentions?: string[]
}) => ({
	text: options.text,
	backgroundColor: options.backgroundColor || STATUS_BACKGROUNDS.solid.green,
	font: options.font ?? STATUS_FONTS.SANS_SERIF,
	textColor: options.textColor || '#FFFFFF',
	contextInfo: { mentionedJid: options.mentions || [], isForwarded: false }
})

export const createImageStatus = (media: WAMediaUpload | string, options?: { caption?: string }) => ({
	image: typeof media === 'string' ? { url: media } : media,
	caption: options?.caption || ''
})

export const createVideoStatus = (
	media: WAMediaUpload | string,
	options?: { caption?: string; gifPlayback?: boolean }
) => ({
	video: typeof media === 'string' ? { url: media } : media,
	caption: options?.caption || '',
	gifPlayback: options?.gifPlayback || false
})

export const createAudioStatus = (media: WAMediaUpload | string, options?: { waveform?: Uint8Array }) => ({
	audio: typeof media === 'string' ? { url: media } : media,
	ptt: true,
	mimetype: 'audio/ogg; codecs=opus',
	waveform: options?.waveform
})

export const StatusHelper = {
	text: (text: string, backgroundColor?: string, font?: number) => createTextStatus({ text, backgroundColor, font }),
	image: (buffer: WAMediaUpload, caption?: string) => createImageStatus(buffer, { caption }),
	imageUrl: (url: string, caption?: string) => createImageStatus(url, { caption }),
	video: (buffer: WAMediaUpload, caption?: string) => createVideoStatus(buffer, { caption }),
	videoUrl: (url: string, caption?: string) => createVideoStatus(url, { caption }),
	gif: (buffer: WAMediaUpload, caption?: string) => createVideoStatus(buffer, { caption, gifPlayback: true }),
	voiceNote: (buffer: WAMediaUpload) => createAudioStatus(buffer),

	send: async (sock: any, content: any, jidList: string[] = []) => {
		if (!jidList || jidList.length === 0) {
			console.warn('StatusHelper: jidList is empty.')
		}
		const groups = jidList.filter(j => j?.endsWith('@g.us'))
		const individuals = jidList.filter(j => j?.endsWith('@s.whatsapp.net') || j?.endsWith('@lid'))
		let lastResult: any

		if (groups.length > 0) {
			const groupContent = { ...content, contextInfo: { ...content.contextInfo, isGroupStatus: true } }
			for (const groupJid of groups) {
				lastResult = await sock.sendMessage(groupJid, groupContent, { messageId: generateStatusMessageId() })
			}
		}

		if (individuals.length > 0 || jidList.length === 0) {
			const result = await sock.sendMessage(STATUS_BROADCAST_JID, content, {
				statusJidList: individuals.length > 0 ? individuals : undefined,
				messageId: generateStatusMessageId()
			})
			if (!lastResult) lastResult = result
		}

		return lastResult
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — Status Mentions (Socket-level addon)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Status Mentions Addon
 * Ported from innovatorssoft/Baileys.
 *
 * `sendStatusMentions` — Send a WhatsApp status/story and tag specific
 * users or groups. Resolves group members automatically so the story
 * is visible to everyone who should see it.
 *
 * Usage — inject into makeMessagesSocket return:
 * ```ts
 * const statusMentionsAddon = makeStatusMentionsAddon({ ... })
 * return { ...sock, ...statusMentionsAddon }
 * ```
 */

import { randomBytes } from 'crypto'
import type { AnyMessageContent, GroupMetadata, MiscMessageGenerationOptions, WAMessage } from '../Types'
import { delay, generateWAMessage, generateWAMessageFromContent } from '../Utils'
import { getUrlInfo } from '../Utils/link-preview'
import { isJidGroup, isJidUser, jidNormalizedUser, STORIES_JID } from '../WABinary'

// ─────────────────────────────────────────────────────────────────

export interface StatusMentionContent extends Record<string, unknown> {
	text?: string
	image?: unknown
	video?: unknown
	audio?: unknown
	caption?: string
	font?: number
	textColor?: string
	backgroundColor?: string
	ptt?: boolean
}

export interface StatusMentionsContext {
	authState: { creds: { me?: { id: string } } }
	logger: { error: (msg: string) => void }
	linkPreviewImageThumbnailWidth: number
	generateHighQualityLinkPreview: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	axiosOptions?: any
	relayMessage: (
		jid: string,
		msg: unknown,
		opts: {
			messageId?: string
			statusJidList?: string[]
			additionalNodes?: unknown[]
		}
	) => Promise<void>
	waUploadToServer: (stream: unknown, opts: object) => Promise<{ handle?: string }>
	groupMetadata: (jid: string) => Promise<GroupMetadata>
	cachedGroupMetadata?: (jid: string) => Promise<GroupMetadata | undefined>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	config: any
}

// ─────────────────────────────────────────────────────────────────

const getRandomHexColor = (): string =>
	'#' +
	Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, '0')

// ─────────────────────────────────────────────────────────────────

export const makeStatusMentionsAddon = (ctx: StatusMentionsContext) => {
	const {
		authState,
		logger,
		linkPreviewImageThumbnailWidth,
		generateHighQualityLinkPreview,
		axiosOptions,
		relayMessage,
		waUploadToServer,
		groupMetadata,
		cachedGroupMetadata,
		config
	} = ctx

	/**
	 * Send a WhatsApp Status/Story and tag specific users or groups.
	 * Automatically resolves group participants so the story reaches everyone.
	 *
	 * @param content  - Status content (text, image, video, audio)
	 * @param jids     - Array of user JIDs or group JIDs to tag/notify
	 *
	 * @example
	 * // Send a text status visible to two specific users
	 * await sock.sendStatusMentions(
	 *     { text: 'Hello everyone!', backgroundColor: '#25D366' },
	 *     ['1234567890@s.whatsapp.net', '0987654321@s.whatsapp.net']
	 * )
	 *
	 * // Tag a whole group
	 * await sock.sendStatusMentions(
	 *     { image: { url: './photo.jpg' }, caption: 'Group photo!' },
	 *     ['120363xxxxxxxx@g.us']
	 * )
	 */
	const sendStatusMentions = async (content: StatusMentionContent, jids: string[] = []): Promise<void> => {
		const userJid = jidNormalizedUser(authState.creds.me!.id)
		const allUsers = new Set<string>()
		allUsers.add(userJid)

		// Resolve group members or add individual users
		for (const id of jids) {
			if (isJidGroup(id)) {
				try {
					const metadata =
						(cachedGroupMetadata ? await cachedGroupMetadata(id) : undefined) || (await groupMetadata(id))
					metadata.participants.map(p => jidNormalizedUser(p.id)).forEach(j => allUsers.add(j))
				} catch (error) {
					logger.error(`Error getting metadata for group ${id}: ${error}`)
				}
			} else if (isJidUser(id)) {
				allUsers.add(jidNormalizedUser(id))
			}
		}

		const uniqueUsers = Array.from(allUsers)

		// Determine media type
		const isMedia = !!(content.image || content.video || content.audio)
		const isAudio = !!content.audio

		// Build message content — clean up fields not applicable to each type
		const messageContent: StatusMentionContent = { ...content }

		if (isMedia && !isAudio) {
			if (messageContent.text) {
				messageContent.caption = messageContent.text
				delete messageContent.text
			}
			delete messageContent.ptt
			delete messageContent.font
			delete messageContent.backgroundColor
			delete messageContent.textColor
		}

		if (isAudio) {
			delete messageContent.text
			delete messageContent.caption
			delete messageContent.font
			delete messageContent.textColor
		}

		const font = !isMedia ? (content.font ?? Math.floor(Math.random() * 9)) : undefined
		const textColor = !isMedia ? content.textColor || getRandomHexColor() : undefined
		const backgroundColor = !isMedia || isAudio ? content.backgroundColor || getRandomHexColor() : undefined
		const ptt = isAudio ? (typeof content.ptt === 'boolean' ? content.ptt : true) : undefined

		// Generate the story message
		let mediaHandle: string | undefined
		let msg: WAMessage

		try {
			msg = await generateWAMessage(
				STORIES_JID,
				messageContent as AnyMessageContent,
				{
					logger,
					userJid,
					getUrlInfo: (text: string) =>
						getUrlInfo(text, {
							thumbnailWidth: linkPreviewImageThumbnailWidth,
							fetchOpts: { timeout: 3000, ...(axiosOptions || {}) },
							logger,
							uploadImage: generateHighQualityLinkPreview
								? (waUploadToServer as MiscMessageGenerationOptions['uploadImage'])
								: undefined
						}),
					upload: async (encFilePath: unknown, opts: object) => {
						const up = await waUploadToServer(encFilePath, { ...opts })
						mediaHandle = up.handle
						return up
					},
					mediaCache: config.mediaCache,
					options: config.options,
					...(font !== undefined && { font }),
					...(textColor && { textColor }),
					...(backgroundColor && { backgroundColor }),
					...(ptt !== undefined && { ptt })
				} as MiscMessageGenerationOptions
			)
		} catch (error) {
			logger.error(`Error generating status message: ${error}`)
			throw error
		}

		// Relay the story to status@broadcast with tagged user list
		await relayMessage(STORIES_JID, msg.message, {
			messageId: msg.key.id!,
			statusJidList: uniqueUsers,
			additionalNodes: [
				{
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
			]
		})

		// Send per-contact/group notification message
		for (const id of jids) {
			try {
				const normalizedId = jidNormalizedUser(id)
				const isPrivate = isJidUser(normalizedId)
				const type = isPrivate ? 'statusMentionMessage' : 'groupStatusMentionMessage'

				const protocolMessage = {
					[type]: {
						message: {
							protocolMessage: {
								key: msg.key,
								type: 25
							}
						}
					},
					messageContextInfo: {
						messageSecret: randomBytes(32)
					}
				}

				const statusMsg = await generateWAMessageFromContent(
					normalizedId,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					protocolMessage as any,
					{}
				)

				await relayMessage(normalizedId, statusMsg.message, {
					additionalNodes: [
						{
							tag: 'meta',
							attrs: isPrivate ? { is_status_mention: 'true' } : { is_group_status_mention: 'true' }
						}
					]
				})

				await delay(2000)
			} catch (error) {
				logger.error(`Error sending status mention to ${id}: ${error}`)
			}
		}

		void mediaHandle // suppress unused warning — handle stored if needed
	}

	return { sendStatusMentions }
}
