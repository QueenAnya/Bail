import { zip } from 'fflate'
const CONCURRENCY_LIMIT = 10
import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import { promises as fs } from 'fs'
import { type Transform } from 'stream'
import { proto } from '../../WAProto/index.js'
import {
	AssociationType,
	ButtonHeaderType,
	ButtonType,
	CarouselCardType,
	ListType,
	type StickerPack
} from '../Types/Message.js'
import {
	CALL_AUDIO_PREFIX,
	CALL_VIDEO_PREFIX,
	MEDIA_KEYS,
	type MediaType,
	URL_REGEX,
	WA_DEFAULT_EPHEMERAL
} from '../Defaults'
import type {
	AnyMediaMessageContent,
	AnyMessageContent,
	DownloadableMessage,
	MessageContentGenerationOptions,
	MessageGenerationOptions,
	MessageGenerationOptionsFromContent,
	MessageUserReceipt,
	MessageWithContextInfo,
	WAMediaUpload,
	WAMessage,
	WAMessageContent,
	WAMessageKey,
	WATextMessage
} from '../Types'
import { WAMessageStatus, WAProto } from '../Types'
import { isJidGroup, isJidNewsletter, isJidStatusBroadcast, jidNormalizedUser } from '../WABinary'
import { sha256 } from './crypto'
import { generateMessageIDV2, getKeyAuthor, unixTimestampSeconds } from './generics'
import type { ILogger } from './logger'
import {
	downloadContentFromMessage,
	encryptedStream,
	generateThumbnail,
	getAudioDuration,
	getAudioWaveform,
	getRawMediaUploadData,
	getStream,
	getImageProcessingLibrary,
	type MediaDownloadOptions,
	toBuffer
} from './messages-media'
import { shouldIncludeReportingToken } from './reporting-utils'

type ExtractByKey<T, K extends PropertyKey> = T extends Record<K, any> ? T : never
type RequireKey<T, K extends keyof T> = T & {
	[P in K]-?: Exclude<T[P], null | undefined>
}

type WithKey<T, K extends PropertyKey> = T extends unknown ? (K extends keyof T ? RequireKey<T, K> : never) : never

type MediaUploadData = {
	media: WAMediaUpload
	caption?: string
	ptt?: boolean
	ptv?: boolean
	seconds?: number
	gifPlayback?: boolean
	fileName?: string
	jpegThumbnail?: string
	mimetype?: string
	width?: number
	height?: number
	waveform?: Uint8Array
	backgroundArgb?: number
}

const MIMETYPE_MAP: { [T in MediaType]?: string } = {
	image: 'image/jpeg',
	video: 'video/mp4',
	document: 'application/pdf',
	audio: 'audio/ogg; codecs=opus',
	sticker: 'image/webp',
	'product-catalog-image': 'image/jpeg'
}

const MessageTypeProto = {
	image: WAProto.Message.ImageMessage,
	video: WAProto.Message.VideoMessage,
	audio: WAProto.Message.AudioMessage,
	sticker: WAProto.Message.StickerMessage,
	document: WAProto.Message.DocumentMessage
} as const

/**
 * Uses a regex to test whether the string contains a URL, and returns the URL if it does.
 * @param text eg. hello https://google.com
 * @returns the URL, eg. https://google.com
 */
export const extractUrlFromText = (text: string) => text.match(URL_REGEX)?.[0]

export const generateLinkPreviewIfRequired = async (
	text: string,
	getUrlInfo: MessageGenerationOptions['getUrlInfo'],
	logger: MessageGenerationOptions['logger']
) => {
	const url = extractUrlFromText(text)
	if (!!getUrlInfo && url) {
		try {
			const urlInfo = await getUrlInfo(url)
			return urlInfo
		} catch (error: any) {
			// ignore if fails
			logger?.warn({ trace: error.stack }, 'url generation failed')
		}
	}
}

const assertColor = async (color: any) => {
	let assertedColor
	if (typeof color === 'number') {
		assertedColor = color > 0 ? color : 0xffffffff + Number(color) + 1
	} else {
		let hex = color.trim().replace('#', '')
		if (hex.length <= 6) {
			hex = 'FF' + hex.padStart(6, '0')
		}

		assertedColor = parseInt(hex, 16)
		return assertedColor
	}
}

export const prepareWAMessageMedia = async (
	message: AnyMediaMessageContent,
	options: MessageContentGenerationOptions
) => {
	const logger = options.logger

	let mediaType: (typeof MEDIA_KEYS)[number] | undefined
	for (const key of MEDIA_KEYS) {
		if (key in message) {
			mediaType = key
		}
	}

	if (!mediaType) {
		throw new Boom('Invalid media type', { statusCode: 400 })
	}

	const uploadData: MediaUploadData = {
		...message,
		media: (message as any)[mediaType]
	}
	delete (uploadData as any)[mediaType]
	// check if cacheable + generate cache key
	const cacheableKey =
		typeof uploadData.media === 'object' &&
		'url' in uploadData.media &&
		!!uploadData.media.url &&
		!!options.mediaCache &&
		mediaType + ':' + uploadData.media.url.toString()

	if (mediaType === 'document' && !uploadData.fileName) {
		uploadData.fileName = 'file'
	}

	if (!uploadData.mimetype) {
		uploadData.mimetype = MIMETYPE_MAP[options.mediaTypeOverride || mediaType]
	}

	if (cacheableKey) {
		const mediaBuff = await options.mediaCache!.get<Buffer>(cacheableKey)
		if (mediaBuff) {
			logger?.debug({ cacheableKey }, 'got media cache hit')

			const obj = proto.Message.decode(mediaBuff)
			const key = `${mediaType}Message`

			Object.assign(obj[key as keyof proto.Message]!, { ...uploadData, media: undefined })

			return obj
		}
	}

	const isNewsletter = !!options.jid && isJidNewsletter(options.jid)
	if (isNewsletter) {
		logger?.info({ key: cacheableKey }, 'Preparing raw media for newsletter')
		const { filePath, fileSha256, fileLength } = await getRawMediaUploadData(
			uploadData.media,
			options.mediaTypeOverride || mediaType,
			logger
		)

		const fileSha256B64 = fileSha256.toString('base64')
		const { mediaUrl, directPath } = await options.upload(filePath, {
			fileEncSha256B64: fileSha256B64,
			mediaType: mediaType,
			timeoutMs: options.mediaUploadTimeoutMs
		})

		await fs.unlink(filePath)

		const obj = WAProto.Message.fromObject({
			// todo: add more support here
			[`${mediaType}Message`]: (MessageTypeProto as any)[mediaType].fromObject({
				url: mediaUrl,
				directPath,
				fileSha256,
				fileLength,
				...uploadData,
				media: undefined
			})
		})

		if (uploadData.ptv) {
			obj.ptvMessage = obj.videoMessage
			delete obj.videoMessage
		}

		if (obj.stickerMessage) {
			obj.stickerMessage.stickerSentTs = Date.now()
		}

		if (cacheableKey) {
			logger?.debug({ cacheableKey }, 'set cache')
			await options.mediaCache!.set(cacheableKey, WAProto.Message.encode(obj).finish())
		}

		return obj
	}

	const requiresDurationComputation = mediaType === 'audio' && typeof uploadData.seconds === 'undefined'
	const requiresThumbnailComputation =
		(mediaType === 'image' || mediaType === 'video') && typeof uploadData['jpegThumbnail'] === 'undefined'
	const requiresWaveformProcessing = mediaType === 'audio' && uploadData.ptt === true
	const requiresAudioBackground = options.backgroundColor && mediaType === 'audio' && uploadData.ptt === true
	const requiresOriginalForSomeProcessing = requiresDurationComputation || requiresThumbnailComputation
	const { mediaKey, encFilePath, originalFilePath, fileEncSha256, fileSha256, fileLength } = await encryptedStream(
		uploadData.media,
		options.mediaTypeOverride || mediaType,
		{
			logger,
			saveOriginalFileIfRequired: requiresOriginalForSomeProcessing,
			opts: options.options
		}
	)

	const fileEncSha256B64 = fileEncSha256.toString('base64')
	const [{ mediaUrl, directPath }] = await Promise.all([
		(async () => {
			const result = await options.upload(encFilePath, {
				fileEncSha256B64,
				mediaType,
				timeoutMs: options.mediaUploadTimeoutMs
			})
			logger?.debug({ mediaType, cacheableKey }, 'uploaded media')
			return result
		})(),
		(async () => {
			try {
				if (requiresThumbnailComputation) {
					const { thumbnail, originalImageDimensions } = await generateThumbnail(
						originalFilePath!,
						mediaType as 'image' | 'video',
						options
					)
					uploadData.jpegThumbnail = thumbnail
					if (!uploadData.width && originalImageDimensions) {
						uploadData.width = originalImageDimensions.width
						uploadData.height = originalImageDimensions.height
						logger?.debug('set dimensions')
					}

					logger?.debug('generated thumbnail')
				}

				if (requiresDurationComputation) {
					uploadData.seconds = await getAudioDuration(originalFilePath!)
					logger?.debug('computed audio duration')
				}

				if (requiresWaveformProcessing) {
					uploadData.waveform = await getAudioWaveform(originalFilePath!, logger)
					logger?.debug('processed waveform')
				}

				if (requiresAudioBackground) {
					uploadData.backgroundArgb = await assertColor(options.backgroundColor)
					logger?.debug('computed backgroundColor audio status')
				}
			} catch (error) {
				logger?.warn({ trace: (error as any).stack }, 'failed to obtain extra info')
			}
		})()
	]).finally(async () => {
		try {
			await fs.unlink(encFilePath)
			if (originalFilePath) {
				await fs.unlink(originalFilePath)
			}

			logger?.debug('removed tmp files')
		} catch (error) {
			logger?.warn('failed to remove tmp file')
		}
	})

	const obj = WAProto.Message.fromObject({
		[`${mediaType}Message`]: MessageTypeProto[mediaType as keyof typeof MessageTypeProto].fromObject({
			url: mediaUrl,
			directPath,
			mediaKey,
			fileEncSha256,
			fileSha256,
			fileLength,
			mediaKeyTimestamp: unixTimestampSeconds(),
			...uploadData,
			media: undefined
		} as any)
	})

	if (uploadData.ptv) {
		obj.ptvMessage = obj.videoMessage
		delete obj.videoMessage
	}

	if (cacheableKey) {
		logger?.debug({ cacheableKey }, 'set cache')
		await options.mediaCache!.set(cacheableKey, WAProto.Message.encode(obj).finish())
	}

	return obj
}

export const prepareDisappearingMessageSettingContent = (ephemeralExpiration?: number) => {
	ephemeralExpiration = ephemeralExpiration || 0
	const content: WAMessageContent = {
		ephemeralMessage: {
			message: {
				protocolMessage: {
					type: WAProto.Message.ProtocolMessage.Type.EPHEMERAL_SETTING,
					ephemeralExpiration
				}
			}
		}
	}
	return WAProto.Message.fromObject(content)
}

/**
 * Generate forwarded message content like WA does
 * @param message the message to forward
 * @param options.forceForward will show the message as forwarded even if it is from you
 */
export const generateForwardMessageContent = (message: WAMessage, forceForward?: boolean) => {
	let content = message.message
	if (!content) {
		throw new Boom('no content in message', { statusCode: 400 })
	}

	// hacky copy
	content = normalizeMessageContent(content)
	content = proto.Message.decode(proto.Message.encode(content!).finish())

	let key = Object.keys(content)[0] as keyof proto.IMessage

	let score = (content?.[key] as { contextInfo: proto.IContextInfo })?.contextInfo?.forwardingScore || 0
	score += message.key.fromMe && !forceForward ? 0 : 1
	if (key === 'conversation') {
		content.extendedTextMessage = { text: content[key] }
		delete content.conversation

		key = 'extendedTextMessage'
	}

	const key_ = content?.[key] as { contextInfo: proto.IContextInfo }
	if (score > 0) {
		key_.contextInfo = { forwardingScore: score, isForwarded: true }
	} else {
		key_.contextInfo = {}
	}

	return content
}

export const hasNonNullishProperty = <K extends PropertyKey>(
	message: AnyMessageContent,
	key: K
): message is ExtractByKey<AnyMessageContent, K> => {
	return (
		typeof message === 'object' &&
		message !== null &&
		key in message &&
		(message as any)[key] !== null &&
		(message as any)[key] !== undefined
	)
}

function hasOptionalProperty<T, K extends PropertyKey>(obj: T, key: K): obj is WithKey<T, K> {
	return typeof obj === 'object' && obj !== null && key in obj && (obj as any)[key] !== null
}

// ── Interactive message helpers (itsliaaa/Lia@Changes 30-01-26 → 12-03-26) ──

export const hasValidAlbumMedia = (message: Record<string, any>) => message.imageMessage || message.videoMessage

export const hasValidInteractiveHeader = (message: Record<string, any>) =>
	message.imageMessage ||
	message.videoMessage ||
	message.documentMessage ||
	message.productMessage ||
	message.locationMessage

export const hasValidCarouselHeader = (message: Record<string, any>) =>
	message.imageMessage || message.videoMessage || message.productMessage

const prepareNativeFlowButtons = (message: Record<string, any>) => {
	const buttons = message.nativeFlow
	const isButtonsFieldArray = Array.isArray(buttons)
	const correctedField = isButtonsFieldArray ? buttons : buttons?.buttons || []
	const messageParamsJson: Record<string, any> = {}

	if (message.offerText) {
		messageParamsJson.limited_time_offer = {
			text: message.offerText || '@whiskeysockets/baileys',
			url: message.offerUrl || 'https://saweria.co/itsliaaa',
			copy_code: message.offerCode,
			expiration_time: message.offerExpiration
		}
	}
	if (message.optionText) {
		messageParamsJson.bottom_sheet = {
			in_thread_buttons_limit: 1,
			divider_indices: Array.from({ length: correctedField.length }, (_: any, i: number) => i),
			list_title: message.optionTitle || '📄 Select Options',
			button_title: message.optionText
		}
	}

	return {
		buttons: correctedField.map((button: Record<string, any>) => {
			const buttonText = button.text || button.buttonText
			const buttonIcon = button.icon?.toUpperCase()
			if (button.id)
				return {
					name: 'quick_reply',
					buttonParamsJson: JSON.stringify({ display_text: buttonText || '👉🏻 Click', id: button.id, icon: buttonIcon })
				}
			if (button.copy)
				return {
					name: 'cta_copy',
					buttonParamsJson: JSON.stringify({
						display_text: buttonText || '📋 Copy',
						copy_code: button.copy,
						icon: buttonIcon
					})
				}
			if (button.url)
				return {
					name: 'cta_url',
					buttonParamsJson: JSON.stringify({
						display_text: buttonText || '🌐 Visit',
						url: button.url,
						merchant_url: button.url,
						webview_interaction: button.useWebview,
						icon: buttonIcon
					})
				}
			if (button.call)
				return {
					name: 'cta_call',
					buttonParamsJson: JSON.stringify({
						display_text: buttonText || '📞 Call',
						phone_number: button.call,
						icon: buttonIcon
					})
				}
			if (button.sections)
				return {
					name: 'single_select',
					buttonParamsJson: JSON.stringify({
						title: buttonText || '📋 Select',
						sections: button.sections,
						icon: buttonIcon
					})
				}
			return button
		}),
		messageParamsJson: JSON.stringify(messageParamsJson),
		messageVersion: 3
	}
}

export const generateWAMessageContent = async (
	message: AnyMessageContent,
	options: MessageContentGenerationOptions
) => {
	let m: WAMessageContent = {}
	if (
		hasOptionalProperty(message, 'interactiveMessage') ||
		hasOptionalProperty(message, 'buttonsMessage') ||
		hasOptionalProperty(message, 'listMessage') ||
		hasOptionalProperty(message, 'templateMessage')
	) {
		// Raw passthrough escape hatch: the caller supplied an already-built
		// `proto.IMessage` sub-field directly (e.g. `{ interactiveMessage: {...} }`)
		// instead of going through one of the higher-level shorthands above.
		// Copied through as-is — these are real proto.IMessage field names, so
		// no transformation is needed or safe to assume.
		const { uuid: _uuid, secureMetaServiceLabel: _secureMetaServiceLabel, ...rest } = message as any
		m = rest
	} else if (hasNonNullishProperty(message, 'text')) {
		const extContent = { text: message.text } as WATextMessage

		let urlInfo = message.linkPreview
		if (typeof urlInfo === 'undefined') {
			urlInfo = await generateLinkPreviewIfRequired(message.text, options.getUrlInfo, options.logger)
		}

		if (urlInfo) {
			extContent.matchedText = urlInfo['matched-text']
			extContent.jpegThumbnail = urlInfo.jpegThumbnail
			extContent.description = urlInfo.description
			extContent.title = urlInfo.title
			extContent.previewType = 0

			const img = urlInfo.highQualityThumbnail
			if (img) {
				extContent.thumbnailDirectPath = img.directPath
				extContent.mediaKey = img.mediaKey
				extContent.mediaKeyTimestamp = img.mediaKeyTimestamp
				extContent.thumbnailWidth = img.width
				extContent.thumbnailHeight = img.height
				extContent.thumbnailSha256 = img.fileSha256
				extContent.thumbnailEncSha256 = img.fileEncSha256
			}
		}

		if (options.backgroundColor) {
			extContent.backgroundArgb = await assertColor(options.backgroundColor)
		}

		if (options.font) {
			extContent.font = options.font
		}

		m.extendedTextMessage = extContent
	} else if (hasNonNullishProperty(message, 'contacts')) {
		const contactLen = message.contacts.contacts.length
		if (!contactLen) {
			throw new Boom('require atleast 1 contact', { statusCode: 400 })
		}

		if (contactLen === 1) {
			m.contactMessage = WAProto.Message.ContactMessage.create(message.contacts.contacts[0])
		} else {
			m.contactsArrayMessage = WAProto.Message.ContactsArrayMessage.create(message.contacts)
		}
	} else if (hasNonNullishProperty(message, 'location')) {
		m.locationMessage = WAProto.Message.LocationMessage.create(message.location)
	} else if (hasNonNullishProperty(message, 'react')) {
		if (!message.react.senderTimestampMs) {
			message.react.senderTimestampMs = Date.now()
		}

		m.reactionMessage = WAProto.Message.ReactionMessage.create(message.react)
	} else if (hasNonNullishProperty(message, 'delete')) {
		m.protocolMessage = {
			key: message.delete,
			type: WAProto.Message.ProtocolMessage.Type.REVOKE
		}
	} else if (hasNonNullishProperty(message, 'forward')) {
		m = generateForwardMessageContent(message.forward, message.force)
	} else if (hasNonNullishProperty(message, 'disappearingMessagesInChat')) {
		const exp =
			typeof message.disappearingMessagesInChat === 'boolean'
				? message.disappearingMessagesInChat
					? WA_DEFAULT_EPHEMERAL
					: 0
				: message.disappearingMessagesInChat
		m = prepareDisappearingMessageSettingContent(exp)
	} else if (hasNonNullishProperty(message, 'groupInvite')) {
		m.groupInviteMessage = {}
		m.groupInviteMessage.inviteCode = message.groupInvite.inviteCode
		m.groupInviteMessage.inviteExpiration = message.groupInvite.inviteExpiration
		m.groupInviteMessage.caption = message.groupInvite.text

		m.groupInviteMessage.groupJid = message.groupInvite.jid
		m.groupInviteMessage.groupName = message.groupInvite.subject
		//TODO: use built-in interface and get disappearing mode info etc.
		//TODO: cache / use store!?
		if (options.getProfilePicUrl) {
			const pfpUrl = await options.getProfilePicUrl(message.groupInvite.jid, 'preview')
			if (pfpUrl) {
				const resp = await fetch(pfpUrl, { method: 'GET', dispatcher: options?.options?.dispatcher })
				if (resp.ok) {
					const buf = Buffer.from(await resp.arrayBuffer())
					m.groupInviteMessage.jpegThumbnail = buf
				}
			}
		}
	} else if (hasNonNullishProperty(message, 'pin')) {
		m.pinInChatMessage = {}
		m.messageContextInfo = {}

		m.pinInChatMessage.key = message.pin
		m.pinInChatMessage.type = message.type
		m.pinInChatMessage.senderTimestampMs = Date.now()

		m.messageContextInfo.messageAddOnDurationInSecs = message.type === 1 ? message.time || 86400 : 0
	} else if (hasNonNullishProperty(message, 'adminInvite')) {
		// Source: innovatorssoft/baileys — sends a newsletter "you've been made
		// an admin" invite card; upstream had the proto field but no generator.
		m.newsletterAdminInviteMessage = {
			newsletterJid: (message as any).adminInvite.jid,
			newsletterName: (message as any).adminInvite.name,
			caption: (message as any).adminInvite.caption,
			inviteExpiration: (message as any).adminInvite.expiration,
			contextInfo: (message as any).contextInfo || {}
		}

		if (options.getProfilePicUrl) {
			const pfpUrl = await options.getProfilePicUrl((message as any).adminInvite.jid, 'preview')
			if (pfpUrl) {
				const resp = await fetch(pfpUrl, { method: 'GET', dispatcher: options?.options?.dispatcher })
				if (resp.ok) {
					const buf = Buffer.from(await resp.arrayBuffer())
					m.newsletterAdminInviteMessage.jpegThumbnail = buf
				}
			}
		}
	} else if (hasNonNullishProperty(message, 'keep')) {
		// Source: innovatorssoft/baileys — pins/keeps a message in the chat
		m.keepInChatMessage = {
			key: (message as any).keep,
			keepType: (message as any).type || 1,
			timestampMs: Date.now()
		}
	} else if (hasNonNullishProperty(message, 'call')) {
		// Source: innovatorssoft/baileys — "scheduled call" invite card
		m.scheduledCallCreationMessage = {
			scheduledTimestampMs: (message as any).call?.time || Date.now(),
			callType: (message as any).call?.type || 1,
			title: (message as any).call?.name || 'Call Creation'
		}
	} else if (hasNonNullishProperty(message, 'paymentInvite')) {
		// Source: innovatorssoft/baileys — sends a payment-invite card
		m.paymentInviteMessage = {
			expiryTimestamp: (message as any).paymentInvite?.expiry || 0,
			serviceType: (message as any).paymentInvite?.type || 2
		}
	} else if (hasNonNullishProperty(message, 'payment')) {
		// Source: innovatorssoft/baileys — requests a payment from the recipient
		m.requestPaymentMessage = {
			currencyCodeIso4217: (message as any).payment?.currency || 'IDR',
			amount1000: ((message as any).payment?.amount || 999999999) * 1000,
			requestFrom: (message as any).payment?.from || '0@s.whatsapp.net',
			expiryTimestamp: (message as any).payment?.expiry || 0,
			amount: {
				value: (message as any).payment?.amount || 999999999,
				offset: (message as any).payment?.offset || 0,
				currencyCode: (message as any).payment?.currency || 'IDR'
			},
			noteMessage: {
				extendedTextMessage: {
					text: (message as any).payment?.note || 'Notes',
					contextInfo: (message as any).contextInfo || {}
				}
			},
			background: {
				placeholderArgb: (message as any).payment?.image?.placeholderArgb || 4278190080,
				textArgb: (message as any).payment?.image?.textArgb || 4294967295,
				subtextArgb: (message as any).payment?.image?.subtextArgb || 4294967295
			}
		}
	} else if (hasOptionalProperty(message, 'order') && !!(message as any).order) {
		// Source: innovatorssoft/baileys — a real, simple gap: orderMessage was never wired
		const orderMessage: any = (proto.Message as any).OrderMessage.fromObject((message as any).order)
		orderMessage.contextInfo = { ...((message as any).contextInfo || {}) }
		m.orderMessage = orderMessage
	} else if (hasOptionalProperty(message, 'pollResult') && !!(message as any).pollResult) {
		// Source: innovatorssoft/baileys — sends a snapshot of poll results
		// (e.g. when forwarding/announcing the final tally of a poll).
		const pollResult = (message as any).pollResult as { name: string; values: [string, number][] }
		if (!Array.isArray(pollResult.values)) {
			throw new Boom('Invalid pollResult values', { statusCode: 400 })
		}

		m.pollResultSnapshotMessage = {
			name: pollResult.name,
			pollVotes: pollResult.values.map(([optionName, optionVoteCount]) => ({
				optionName,
				optionVoteCount
			})),
			contextInfo: (message as any).contextInfo || {}
		}
	} else if (hasOptionalProperty(message, 'shop') && !!(message as any).shop) {
		// Source: innovatorssoft/baileys — `sock.sendMessage(jid, { shop: { surface, id }, text/caption })`
		const msg = message as any
		const interactiveMessage: any = {
			shopStorefrontMessage: { surface: msg.shop.surface, id: msg.shop.id }
		}

		if (hasOptionalProperty(message, 'text')) {
			interactiveMessage.body = { text: msg.text }
			interactiveMessage.header = { title: msg.title, subtitle: msg.subtitle, hasMediaAttachment: false }
		} else if (hasOptionalProperty(message, 'caption')) {
			interactiveMessage.body = { text: msg.caption }
			interactiveMessage.header = {
				title: msg.title,
				subtitle: msg.subtitle,
				hasMediaAttachment: msg.hasMediaAttachment || false
			}
		}

		if (hasOptionalProperty(message, 'footer') && !!msg.footer) {
			interactiveMessage.footer = { text: msg.footer }
		}

		interactiveMessage.contextInfo = msg.contextInfo || {}
		m = { interactiveMessage }
	} else if (hasOptionalProperty(message, 'collection') && !!(message as any).collection) {
		// Source: innovatorssoft/baileys — `sock.sendMessage(jid, { collection: { bizJid, id }, text/caption })`
		const msg = message as any
		const interactiveMessage: any = {
			collectionMessage: {
				bizJid: msg.collection.bizJid,
				id: msg.collection.id,
				messageVersion: msg.collection?.version
			}
		}

		if (hasOptionalProperty(message, 'text')) {
			interactiveMessage.body = { text: msg.text }
			interactiveMessage.header = { title: msg.title, subtitle: msg.subtitle, hasMediaAttachment: false }
		} else if (hasOptionalProperty(message, 'caption')) {
			interactiveMessage.body = { text: msg.caption }
			interactiveMessage.header = {
				title: msg.title,
				subtitle: msg.subtitle,
				hasMediaAttachment: msg.hasMediaAttachment || false
			}
		}

		if (hasOptionalProperty(message, 'footer') && !!msg.footer) {
			interactiveMessage.footer = { text: msg.footer }
		}

		interactiveMessage.contextInfo = msg.contextInfo || {}
		m = { interactiveMessage }
	} else if (hasNonNullishProperty(message, 'buttonReply')) {
		switch (message.type) {
			case 'template':
				m.templateButtonReplyMessage = {
					selectedDisplayText: message.buttonReply.displayText,
					selectedId: message.buttonReply.id,
					selectedIndex: message.buttonReply.index
				}
				break
			case 'plain':
				m.buttonsResponseMessage = {
					selectedButtonId: message.buttonReply.id,
					selectedDisplayText: message.buttonReply.displayText,
					type: proto.Message.ButtonsResponseMessage.Type.DISPLAY_TEXT
				}
				break
		}
	} else if (hasOptionalProperty(message, 'ptv') && message.ptv) {
		const { videoMessage } = await prepareWAMessageMedia({ video: message.video }, options)
		m.ptvMessage = videoMessage
	} else if (hasNonNullishProperty(message, 'product')) {
		const { imageMessage } = await prepareWAMessageMedia({ image: message.product.productImage }, options)
		m.productMessage = WAProto.Message.ProductMessage.create({
			...message,
			product: {
				...message.product,
				productImage: imageMessage
			}
		})
	} else if (hasNonNullishProperty(message, 'listReply')) {
		m.listResponseMessage = { ...message.listReply }
	} else if (hasNonNullishProperty(message, 'event')) {
		m.eventMessage = {}
		const startTime = Math.floor(message.event.startDate.getTime() / 1000)

		if (message.event.call && options.getCallLink) {
			const token = await options.getCallLink(message.event.call, { startTime })
			m.eventMessage.joinLink = (message.event.call === 'audio' ? CALL_AUDIO_PREFIX : CALL_VIDEO_PREFIX) + token
		}

		m.messageContextInfo = {
			// encKey
			messageSecret: message.event.messageSecret || randomBytes(32)
		}

		m.eventMessage.name = message.event.name
		m.eventMessage.description = message.event.description
		m.eventMessage.startTime = startTime
		m.eventMessage.endTime = message.event.endDate ? message.event.endDate.getTime() / 1000 : undefined
		m.eventMessage.isCanceled = message.event.isCancelled ?? false
		m.eventMessage.extraGuestsAllowed = message.event.extraGuestsAllowed
		m.eventMessage.isScheduleCall = message.event.isScheduleCall ?? false
		m.eventMessage.location = message.event.location
	} else if (hasNonNullishProperty(message, 'poll')) {
		message.poll.selectableCount ||= 0
		message.poll.toAnnouncementGroup ||= false

		if (!Array.isArray(message.poll.values)) {
			throw new Boom('Invalid poll values', { statusCode: 400 })
		}

		if (message.poll.selectableCount < 0 || message.poll.selectableCount > message.poll.values.length) {
			throw new Boom(`poll.selectableCount in poll should be >= 0 and <= ${message.poll.values.length}`, {
				statusCode: 400
			})
		}

		m.messageContextInfo = {
			// encKey
			messageSecret: message.poll.messageSecret || randomBytes(32)
		}

		const pollCreationMessage = {
			name: message.poll.name,
			selectableOptionsCount: message.poll.selectableCount,
			options: message.poll.values.map(optionName => ({ optionName }))
		}

		if (message.poll.toAnnouncementGroup) {
			// poll v2 is for community announcement groups (single select and multiple)
			m.pollCreationMessageV2 = pollCreationMessage
		} else {
			if (message.poll.selectableCount === 1) {
				//poll v3 is for single select polls
				m.pollCreationMessageV3 = pollCreationMessage
			} else {
				// poll for multiple choice polls
				m.pollCreationMessage = pollCreationMessage
			}
		}
	} else if (hasNonNullishProperty(message, 'album')) {
		m.albumMessage = {
			expectedImageCount: message.album.expectedImageCount,
			expectedVideoCount: message.album.expectedVideoCount
		}
	} else if (hasNonNullishProperty(message, 'sharePhoneNumber')) {
		m.protocolMessage = {
			type: proto.Message.ProtocolMessage.Type.SHARE_PHONE_NUMBER
		}
	} else if (hasNonNullishProperty(message, 'requestPhoneNumber')) {
		m.requestPhoneNumberMessage = {}
	} else if (hasNonNullishProperty(message, 'limitSharing')) {
		m.protocolMessage = {
			type: proto.Message.ProtocolMessage.Type.LIMIT_SHARING,
			limitSharing: {
				sharingLimited: message.limitSharing === true,
				trigger: 1,
				limitSharingSettingTimestamp: Date.now(),
				initiatedByMe: true
			}
		}
	} else if ('stickerPack' in message) {
		m = await prepareStickerPackMessage(message.stickerPack, options)
	} else {
		m = await prepareWAMessageMedia(message as AnyMediaMessageContent, options)
	}

	// ── Interactive Messages (itsliaaa/Lia@Changes 30-01-26 → 12-03-26) ──────

	if (hasNonNullishProperty(message, 'buttons')) {
		const buttonsMessage: Record<string, any> = {
			buttons: (message as any).buttons.map((button: Record<string, any>) => {
				const buttonText = button.text || button.buttonText
				if (button.sections != null) {
					return {
						nativeFlowInfo: {
							name: 'single_select',
							paramsJson: JSON.stringify({ title: buttonText, sections: button.sections })
						},
						type: ButtonType.NATIVE_FLOW
					}
				} else if (button.name != null) {
					return { nativeFlowInfo: { name: button.name, paramsJson: button.paramsJson }, type: ButtonType.NATIVE_FLOW }
				}
				return {
					buttonId: button.id || button.buttonId,
					buttonText: typeof buttonText === 'string' ? { displayText: buttonText } : buttonText,
					type: button.type || ButtonType.RESPONSE
				}
			})
		}
		if (hasOptionalProperty(message, 'text')) {
			buttonsMessage.contentText = (message as any).text
			buttonsMessage.headerType = ButtonHeaderType.EMPTY
		} else {
			if (hasOptionalProperty(message, 'caption')) buttonsMessage.contentText = (message as any).caption
			const type = (Object.keys(m)[0] || '').replace('Message', '').toUpperCase()
			buttonsMessage.headerType = (ButtonHeaderType as any)[type]
			Object.assign(buttonsMessage, m)
		}
		if (hasOptionalProperty(message, 'footer')) buttonsMessage.footerText = (message as any).footer
		m = { buttonsMessage }
	} else if (hasNonNullishProperty(message, 'sections')) {
		m = {
			listMessage: {
				sections: (message as any).sections,
				buttonText: (message as any).buttonText,
				title: (message as any).title,
				footerText: (message as any).footer,
				description: (message as any).text,
				listType: ListType.SINGLE_SELECT
			}
		}
	} else if (hasOptionalProperty(message, 'productList') && !!(message as any).productList) {
		// Product-catalog list message. Maps directly onto the real
		// `Message.ListMessage.ProductListInfo` proto schema
		// (productSections[], each with title + products[{productId}]).
		const msg = message as any
		m = {
			listMessage: {
				title: msg.title,
				description: msg.text,
				buttonText: msg.buttonText,
				footerText: msg.footer,
				listType: ListType.PRODUCT_LIST,
				productListInfo: {
					productSections: msg.productList.map(
						(section: { title: string; products: Array<{ productId: string }> }) => ({
							title: section.title,
							products: section.products.map(p => ({ productId: p.productId }))
						})
					),
					businessOwnerJid: msg.businessOwnerJid
				}
			}
		}
	} else if (hasNonNullishProperty(message, 'templateButtons')) {
		const hydratedTemplate: Record<string, any> = {
			hydratedButtons: (message as any).templateButtons.map((button: any, i: number) => {
				const buttonText = button.text || button.buttonText
				if (button.id != null)
					return { index: i, quickReplyButton: { displayText: buttonText || '👉🏻 Click', id: button.id } }
				if (button.url != null)
					return { index: i, urlButton: { displayText: buttonText || '🌐 Visit', url: button.url } }
				if (button.call != null)
					return { index: i, callButton: { displayText: buttonText || '📞 Call', phoneNumber: button.call } }
				button.index = button.index || i
				return button
			})
		}
		if (hasOptionalProperty(message, 'text')) {
			hydratedTemplate.hydratedContentText = (message as any).text
		} else {
			if (hasOptionalProperty(message, 'caption')) {
				hydratedTemplate.hydratedTitleText = (message as any).title
				hydratedTemplate.hydratedContentText = (message as any).caption
			}
			Object.assign(hydratedTemplate, m)
		}
		if (hasOptionalProperty(message, 'footer')) hydratedTemplate.hydratedFooterText = (message as any).footer
		hydratedTemplate.templateId = (message as any).id || 'template-' + Date.now()
		m = { templateMessage: { hydratedFourRowTemplate: hydratedTemplate, hydratedTemplate } }
	} else if (hasNonNullishProperty(message, 'nativeFlow')) {
		const interactiveMessage: Record<string, any> = { nativeFlowMessage: prepareNativeFlowButtons(message as any) }
		if (hasOptionalProperty(message, 'bizJid'))
			interactiveMessage.collectionMessage = {
				bizJid: (message as any).bizJid,
				id: (message as any).id,
				messageVersion: 1
			}
		else if (hasOptionalProperty(message, 'shopSurface'))
			interactiveMessage.shopStorefrontMessage = {
				surface: (message as any).shopSurface,
				id: (message as any).id,
				messageVersion: 1
			}
		if (hasOptionalProperty(message, 'text')) {
			interactiveMessage.body = { text: (message as any).text }
		} else {
			if (hasOptionalProperty(message, 'caption')) {
				const isValidHeader = hasValidInteractiveHeader(m)
				if (!isValidHeader) throw new Boom('Invalid media type for interactive message header', { statusCode: 400 })
				interactiveMessage.header = {
					title: ((message as any).title || '') as string,
					subtitle: (message as any).subtitle || '',
					hasMediaAttachment: isValidHeader
				}
				interactiveMessage.body = { text: (message as any).caption }
			}
			if (hasOptionalProperty(message, 'thumbnail') && !!(message as any).thumbnail)
				interactiveMessage.jpegThumbnail = (message as any).thumbnail
			Object.assign(interactiveMessage.header || {}, m)
		}
		if (hasOptionalProperty(message, 'audioFooter')) {
			const { audioMessage } = await prepareWAMessageMedia({ audio: (message as any).audioFooter }, options)
			interactiveMessage.footer = { audioMessage, hasMediaAttachment: true }
		} else if (hasOptionalProperty(message, 'footer')) {
			interactiveMessage.footer = { text: (message as any).footer }
		}
		m = { interactiveMessage }
	} else if (hasNonNullishProperty(message, 'cards')) {
		const interactiveMessage: Record<string, any> = {
			carouselMessage: {
				cards: await Promise.all(
					(message as any).cards.map(async (card: any) => {
						let carouselHeader: Record<string, any> = {}
						carouselHeader = await prepareWAMessageMedia(card, options).catch(() => ({}))
						const isValidHeader = hasValidCarouselHeader(carouselHeader)
						if (!isValidHeader) throw new Boom('Invalid media type for carousel card', { statusCode: 400 })
						const carouselCard: Record<string, any> = {
							nativeFlowMessage: prepareNativeFlowButtons(card.nativeFlow ? card : [])
						}
						if (hasOptionalProperty(card, 'text')) {
							carouselCard.body = { text: card.text }
						} else {
							if (hasOptionalProperty(card, 'caption')) {
								carouselCard.header = {
									title: (card as any).title || '',
									subtitle: (card as any).subtitle || '',
									hasMediaAttachment: isValidHeader
								}
								carouselCard.body = { text: (card as any).caption }
							}
							if (hasOptionalProperty(card, 'thumbnail') && !!(card as any).thumbnail)
								carouselCard.jpegThumbnail = (card as any).thumbnail
							Object.assign(carouselCard.header || {}, carouselHeader)
						}
						if (hasOptionalProperty(card, 'audioFooter')) {
							const { audioMessage } = await prepareWAMessageMedia({ audio: card.audioFooter }, options)
							carouselCard.footer = { audioMessage, hasMediaAttachment: true }
						} else if (hasOptionalProperty(card, 'footer')) carouselCard.footer = { text: (card as any).footer }
						return carouselCard
					})
				),
				carouselCardType: CarouselCardType.UNKNOWN,
				messageVersion: 1
			}
		}
		if (hasOptionalProperty(message, 'text')) interactiveMessage.body = { text: (message as any).text }
		if (hasOptionalProperty(message, 'footer')) interactiveMessage.footer = { text: (message as any).footer }
		m = { interactiveMessage }
	}

	if (hasOptionalProperty(message, 'viewOnce') && !!message.viewOnce) {
		m = { viewOnceMessage: { message: m } }
	}

	if (
		(hasOptionalProperty(message, 'mentions') && message.mentions?.length) ||
		(hasOptionalProperty(message, 'mentionAll') && message.mentionAll)
	) {
		const messageType = Object.keys(m)[0]! as Extract<keyof proto.IMessage, MessageWithContextInfo>
		const key = m[messageType]
		if (key && 'contextInfo' in key) {
			key.contextInfo = key.contextInfo || {}
			if (message.mentions?.length) {
				key.contextInfo.mentionedJid = message.mentions
			}

			if (message.mentionAll) {
				key.contextInfo.nonJidMentions = 1
			}
		} else if (key!) {
			key.contextInfo = {
				mentionedJid: message.mentions,
				nonJidMentions: message.mentionAll ? 1 : 0
			}
		}
	}

	if (hasOptionalProperty(message, 'edit')) {
		m = {
			protocolMessage: {
				key: message.edit,
				editedMessage: m,
				timestampMs: Date.now(),
				type: WAProto.Message.ProtocolMessage.Type.MESSAGE_EDIT
			}
		}
	}

	if (hasOptionalProperty(message, 'contextInfo') && !!message.contextInfo) {
		const messageType = Object.keys(m)[0]! as Extract<keyof proto.IMessage, MessageWithContextInfo>
		const key = m[messageType]
		if ('contextInfo' in key! && !!key.contextInfo) {
			key.contextInfo = { ...key.contextInfo, ...message.contextInfo }
		} else if (key!) {
			key.contextInfo = message.contextInfo
		}
	}

	if (hasOptionalProperty(message, 'albumParentKey') && !!message.albumParentKey) {
		m.messageContextInfo = {
			...m.messageContextInfo,
			messageAssociation: {
				associationType: WAProto.MessageAssociation.AssociationType.MEDIA_ALBUM,
				parentMessageKey: message.albumParentKey
			}
		}
	}

	if (shouldIncludeReportingToken(m)) {
		m.messageContextInfo = m.messageContextInfo || {}
		if (!m.messageContextInfo.messageSecret) {
			m.messageContextInfo.messageSecret = randomBytes(32)
		}
	}

	return WAProto.Message.create(m)
}

export const generateWAMessageFromContent = (
	jid: string,
	message: WAMessageContent,
	options: MessageGenerationOptionsFromContent
) => {
	// set timestamp to now
	// if not specified
	if (!options.timestamp) {
		options.timestamp = new Date()
	}

	const innerMessage = normalizeMessageContent(message)!
	const key = getContentType(innerMessage)! as Exclude<keyof proto.IMessage, 'conversation'>
	const timestamp = unixTimestampSeconds(options.timestamp)
	const { quoted, userJid } = options

	if (quoted && !isJidNewsletter(jid)) {
		const participant = quoted.key.fromMe
			? userJid // TODO: Add support for LIDs
			: quoted.participant || quoted.key.participant || quoted.key.remoteJid

		let quotedMsg = normalizeMessageContent(quoted.message)!
		const msgType = getContentType(quotedMsg)!
		// strip any redundant properties
		quotedMsg = proto.Message.create({ [msgType]: quotedMsg[msgType] })

		const quotedContent = quotedMsg[msgType]
		if (typeof quotedContent === 'object' && quotedContent && 'contextInfo' in quotedContent) {
			delete quotedContent.contextInfo
		}

		const contextInfo: proto.IContextInfo =
			('contextInfo' in innerMessage[key]! && innerMessage[key]?.contextInfo) || {}
		contextInfo.participant = jidNormalizedUser(participant!)
		contextInfo.stanzaId = quoted.key.id
		contextInfo.quotedMessage = quotedMsg

		// if a participant is quoted, then it must be a group
		// hence, remoteJid of group must also be entered
		if (jid !== quoted.key.remoteJid) {
			contextInfo.remoteJid = quoted.key.remoteJid
		}

		if (contextInfo && innerMessage[key]) {
			/* @ts-ignore */
			innerMessage[key].contextInfo = contextInfo
		}
	}

	if (
		// if we want to send a disappearing message
		!!options?.ephemeralExpiration &&
		// and it's not a protocol message -- delete, toggle disappear message
		key !== 'protocolMessage' &&
		// already not converted to disappearing message
		key !== 'ephemeralMessage' &&
		// newsletters don't support ephemeral messages
		!isJidNewsletter(jid)
	) {
		/* @ts-ignore */
		innerMessage[key].contextInfo = {
			...((innerMessage[key] as any).contextInfo || {}),
			expiration: options.ephemeralExpiration || WA_DEFAULT_EPHEMERAL
			//ephemeralSettingTimestamp: options.ephemeralOptions.eph_setting_ts?.toString()
		}
	}

	message = WAProto.Message.create(message)

	const messageJSON = {
		key: {
			remoteJid: jid,
			fromMe: true,
			id: options?.messageId || generateMessageIDV2()
		},
		message: message,
		messageTimestamp: timestamp,
		messageStubParameters: [],
		participant: isJidGroup(jid) || isJidStatusBroadcast(jid) ? userJid : undefined, // TODO: Add support for LIDs
		status: WAMessageStatus.PENDING
	}
	return WAProto.WebMessageInfo.fromObject(messageJSON) as WAMessage
}

export const generateWAMessage = async (jid: string, content: AnyMessageContent, options: MessageGenerationOptions) => {
	// ensure msg ID is with every log
	options.logger = options?.logger?.child({ msgId: options.messageId })
	// Pass jid in the options to generateWAMessageContent
	return generateWAMessageFromContent(jid, await generateWAMessageContent(content, { ...options, jid }), options)
}

/** Get the key to access the true type of content */
export const getContentType = (content: proto.IMessage | undefined) => {
	if (content) {
		const keys = Object.keys(content)
		const key = keys.find(k => (k === 'conversation' || k.includes('Message')) && k !== 'senderKeyDistributionMessage')
		return key as keyof typeof content
	}
}

/**
 * Normalizes ephemeral, view once messages to regular message content
 * Eg. image messages in ephemeral messages, in view once messages etc.
 * @param content
 * @returns
 */
export const normalizeMessageContent = (content: WAMessageContent | null | undefined): WAMessageContent | undefined => {
	if (!content) {
		return undefined
	}

	// set max iterations to prevent an infinite loop
	for (let i = 0; i < 5; i++) {
		const inner = getFutureProofMessage(content)
		if (!inner) {
			break
		}

		content = inner.message
	}

	return content!

	function getFutureProofMessage(message: typeof content) {
		return (
			message?.ephemeralMessage ||
			message?.viewOnceMessage ||
			message?.documentWithCaptionMessage ||
			message?.viewOnceMessageV2 ||
			message?.viewOnceMessageV2Extension ||
			message?.editedMessage ||
			message?.associatedChildMessage ||
			message?.groupStatusMessage ||
			message?.groupStatusMessageV2
		)
	}
}

/**
 * Extract the true message content from a message
 * Eg. extracts the inner message from a disappearing message/view once message
 */
export const extractMessageContent = (content: WAMessageContent | undefined | null): WAMessageContent | undefined => {
	const extractFromTemplateMessage = (
		msg: proto.Message.TemplateMessage.IHydratedFourRowTemplate | proto.Message.IButtonsMessage
	) => {
		if (msg.imageMessage) {
			return { imageMessage: msg.imageMessage }
		} else if (msg.documentMessage) {
			return { documentMessage: msg.documentMessage }
		} else if (msg.videoMessage) {
			return { videoMessage: msg.videoMessage }
		} else if (msg.locationMessage) {
			return { locationMessage: msg.locationMessage }
		} else {
			return {
				conversation:
					'contentText' in msg ? msg.contentText : 'hydratedContentText' in msg ? msg.hydratedContentText : ''
			}
		}
	}

	content = normalizeMessageContent(content)

	if (content?.buttonsMessage) {
		return extractFromTemplateMessage(content.buttonsMessage)
	}

	if (content?.templateMessage?.hydratedFourRowTemplate) {
		return extractFromTemplateMessage(content?.templateMessage?.hydratedFourRowTemplate)
	}

	if (content?.templateMessage?.hydratedTemplate) {
		return extractFromTemplateMessage(content?.templateMessage?.hydratedTemplate)
	}

	if (content?.templateMessage?.fourRowTemplate) {
		return extractFromTemplateMessage(content?.templateMessage?.fourRowTemplate)
	}

	return content
}

/**
 * Returns the device predicted by message ID
 */
export const getDevice = (id: string) =>
	/^3A.{18}$/.test(id)
		? 'ios'
		: /^3E.{20}$/.test(id)
			? 'web'
			: /^(.{21}|.{32})$/.test(id)
				? 'android'
				: /^(3F|.{18}$)/.test(id)
					? 'desktop'
					: 'unknown'

/** Upserts a receipt in the message */
export const updateMessageWithReceipt = (msg: Pick<WAMessage, 'userReceipt'>, receipt: MessageUserReceipt) => {
	msg.userReceipt = msg.userReceipt || []
	const recp = msg.userReceipt.find(m => m.userJid === receipt.userJid)
	if (recp) {
		Object.assign(recp, receipt)
	} else {
		msg.userReceipt.push(receipt)
	}
}

/** Update the message with a new reaction */
export const updateMessageWithReaction = (msg: Pick<WAMessage, 'reactions'>, reaction: proto.IReaction) => {
	const authorID = getKeyAuthor(reaction.key)

	const reactions = (msg.reactions || []).filter(r => getKeyAuthor(r.key) !== authorID)
	reaction.text = reaction.text || ''
	reactions.push(reaction)
	msg.reactions = reactions
}

/** Update the message with a new poll update */
export const updateMessageWithPollUpdate = (msg: Pick<WAMessage, 'pollUpdates'>, update: proto.IPollUpdate) => {
	const authorID = getKeyAuthor(update.pollUpdateMessageKey)

	const reactions = (msg.pollUpdates || []).filter(r => getKeyAuthor(r.pollUpdateMessageKey) !== authorID)
	if (update.vote?.selectedOptions?.length) {
		reactions.push(update)
	}

	msg.pollUpdates = reactions
}

/** Update the message with a new event response */
export const updateMessageWithEventResponse = (
	msg: Pick<WAMessage, 'eventResponses'>,
	update: proto.IEventResponse
) => {
	const authorID = getKeyAuthor(update.eventResponseMessageKey)

	const responses = (msg.eventResponses || []).filter(r => getKeyAuthor(r.eventResponseMessageKey) !== authorID)
	responses.push(update)

	msg.eventResponses = responses
}

type VoteAggregation = {
	name: string
	voters: string[]
}

/**
 * Aggregates all poll updates in a poll.
 * @param msg the poll creation message
 * @param meId your jid
 * @returns A list of options & their voters
 */
export function getAggregateVotesInPollMessage(
	{ message, pollUpdates }: Pick<WAMessage, 'pollUpdates' | 'message'>,
	meId?: string
) {
	const opts =
		message?.pollCreationMessage?.options ||
		message?.pollCreationMessageV2?.options ||
		message?.pollCreationMessageV3?.options ||
		[]
	const voteHashMap = opts.reduce(
		(acc, opt) => {
			const hash = sha256(Buffer.from(opt.optionName || '')).toString()
			acc[hash] = {
				name: opt.optionName || '',
				voters: []
			}
			return acc
		},
		{} as { [_: string]: VoteAggregation }
	)

	for (const update of pollUpdates || []) {
		const { vote } = update
		if (!vote) {
			continue
		}

		for (const option of vote.selectedOptions || []) {
			const hash = option.toString()
			let data = voteHashMap[hash]
			if (!data) {
				voteHashMap[hash] = {
					name: 'Unknown',
					voters: []
				}
				data = voteHashMap[hash]
			}

			voteHashMap[hash]!.voters.push(getKeyAuthor(update.pollUpdateMessageKey, meId))
		}
	}

	return Object.values(voteHashMap)
}

type ResponseAggregation = {
	response: string
	responders: string[]
}

/**
 * Aggregates all event responses in an event message.
 * @param msg the event creation message
 * @param meId your jid
 * @returns A list of response types & their responders
 */
export function getAggregateResponsesInEventMessage(
	{ eventResponses }: Pick<WAMessage, 'eventResponses'>,
	meId?: string
) {
	const responseTypes = ['GOING', 'NOT_GOING', 'MAYBE']
	const responseMap: { [_: string]: ResponseAggregation } = {}

	for (const type of responseTypes) {
		responseMap[type] = {
			response: type,
			responders: []
		}
	}

	for (const update of eventResponses || []) {
		const responseType = (update as any).eventResponse || 'UNKNOWN'
		if (responseType !== 'UNKNOWN' && responseMap[responseType]) {
			responseMap[responseType].responders.push(getKeyAuthor(update.eventResponseMessageKey, meId))
		}
	}

	return Object.values(responseMap)
}

/** Given a list of message keys, aggregates them by chat & sender. Useful for sending read receipts in bulk */
export const aggregateMessageKeysNotFromMe = (keys: WAMessageKey[]) => {
	const keyMap: { [id: string]: { jid: string; participant: string | undefined; messageIds: string[] } } = {}
	for (const { remoteJid, id, participant, fromMe } of keys) {
		if (!fromMe) {
			const uqKey = `${remoteJid}:${participant || ''}`
			if (!keyMap[uqKey]) {
				keyMap[uqKey] = {
					jid: remoteJid!,
					participant: participant!,
					messageIds: []
				}
			}

			keyMap[uqKey].messageIds.push(id!)
		}
	}

	return Object.values(keyMap)
}

type DownloadMediaMessageContext = {
	reuploadRequest: (msg: WAMessage) => Promise<WAMessage>
	logger: ILogger
}

const REUPLOAD_REQUIRED_STATUS = [410, 404]

/**
 * Downloads the given message. Throws an error if it's not a media message
 */
export const downloadMediaMessage = async <Type extends 'buffer' | 'stream'>(
	message: WAMessage,
	type: Type,
	options: MediaDownloadOptions,
	ctx?: DownloadMediaMessageContext
) => {
	const result = await downloadMsg().catch(async error => {
		if (
			ctx &&
			typeof error?.status === 'number' && // treat errors with status as HTTP failures requiring reupload
			REUPLOAD_REQUIRED_STATUS.includes(error.status as number)
		) {
			ctx.logger.info({ key: message.key }, 'sending reupload media request...')
			// request reupload
			message = await ctx.reuploadRequest(message)
			const result = await downloadMsg()
			return result
		}

		throw error
	})

	return result as Type extends 'buffer' ? Buffer : Transform

	async function downloadMsg() {
		const mContent = extractMessageContent(message.message)
		if (!mContent) {
			throw new Boom('No message present', { statusCode: 400, data: message })
		}

		const contentType = getContentType(mContent)
		let mediaType = contentType?.replace('Message', '') as MediaType
		const media = mContent[contentType!]

		if (!media || typeof media !== 'object' || (!('url' in media) && !('thumbnailDirectPath' in media))) {
			throw new Boom(`"${contentType}" message is not a media message`)
		}

		let download: DownloadableMessage
		if ('thumbnailDirectPath' in media && !('url' in media)) {
			download = {
				directPath: media.thumbnailDirectPath,
				mediaKey: media.mediaKey
			}
			mediaType = 'thumbnail-link'
		} else {
			download = media
		}

		const stream = await downloadContentFromMessage(download, mediaType, options)
		if (type === 'buffer') {
			const bufferArray: Buffer[] = []
			for await (const chunk of stream) {
				bufferArray.push(chunk)
			}

			return Buffer.concat(bufferArray)
		}

		return stream
	}
}

/** Checks whether the given message is a media message; if it is returns the inner content */
export const assertMediaContent = (content: proto.IMessage | null | undefined) => {
	content = extractMessageContent(content)
	const mediaContent =
		content?.documentMessage ||
		content?.imageMessage ||
		content?.videoMessage ||
		content?.audioMessage ||
		content?.stickerMessage
	if (!mediaContent) {
		throw new Boom('given message is not a media message', { statusCode: 400, data: content })
	}

	return mediaContent
}

/**
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * True for message types that need the `<biz>` binary node (buttons,
 * list, template, or interactive-with-nativeFlow messages) alongside them
 * for WhatsApp to render them correctly. Used by `relayMessage`.
 */
export const shouldIncludeBizBinaryNode = (message: proto.IMessage): boolean =>
	!!(
		message.buttonsMessage ||
		message.listMessage ||
		message.templateMessage ||
		(message.interactiveMessage && message.interactiveMessage.nativeFlowMessage)
	)

/**
 * Checks if a WebP buffer is animated by looking for VP8X chunk with animation flag
 * or ANIM/ANMF chunks
 */
function isAnimatedWebP(buffer: Buffer): boolean {
	// WebP must start with RIFF....WEBP
	if (
		buffer.length < 12 ||
		buffer[0] !== 0x52 ||
		buffer[1] !== 0x49 ||
		buffer[2] !== 0x46 ||
		buffer[3] !== 0x46 ||
		buffer[8] !== 0x57 ||
		buffer[9] !== 0x45 ||
		buffer[10] !== 0x42 ||
		buffer[11] !== 0x50
	) {
		return false
	}

	// Parse chunks starting after RIFF header (12 bytes)
	let offset = 12
	while (offset < buffer.length - 8) {
		const chunkFourCC = buffer.toString('ascii', offset, offset + 4)
		const chunkSize = buffer.readUInt32LE(offset + 4)

		if (chunkFourCC === 'VP8X') {
			// VP8X extended header, check animation flag (bit 1 at offset+8)
			const flagsOffset = offset + 8
			if (flagsOffset < buffer.length) {
				const flags = buffer[flagsOffset]!
				if (flags & 0x02) {
					return true
				}
			}
		} else if (chunkFourCC === 'ANIM' || chunkFourCC === 'ANMF') {
			return true
		}

		// Move to next chunk (chunk size + 8 bytes header, padded to even)
		offset += 8 + chunkSize + (chunkSize % 2)
	}

	return false
}

function isWebPBuffer(buffer: Buffer): boolean {
	return (
		buffer.length >= 12 &&
		buffer[0] === 0x52 &&
		buffer[1] === 0x49 &&
		buffer[2] === 0x46 &&
		buffer[3] === 0x46 &&
		buffer[8] === 0x57 &&
		buffer[9] === 0x45 &&
		buffer[10] === 0x42 &&
		buffer[11] === 0x50
	)
}

async function prepareStickerPackMessage(
	message: StickerPack,
	options: MessageContentGenerationOptions
): Promise<proto.IMessage> {
	const {
		cover,
		stickers = [],
		name = '📦 Sticker Pack',
		publisher = 'GitHub: itsliaaa',
		description = '🏷️ itsliaaa/baileys',
		packId
	} = message

	if (stickers.length > 60) throw new Boom('Sticker pack exceeds the maximum limit of 60 stickers', { statusCode: 400 })
	if (stickers.length === 0) throw new Boom('Sticker pack must contain at least one sticker', { statusCode: 400 })
	if (!cover) throw new Boom('Sticker pack must contain a cover', { statusCode: 400 })

	const logger = options.logger

	// Caching — skip re-upload if same URLs used (itsliaaa/Lia@Changes 01-02-26)
	let cacheableKey: string | false = false
	if (stickers.length && options.mediaCache) {
		const urls: string[] = []
		for (const s of stickers) {
			const d = s.data as any
			if (d?.url) urls.push(d.url)
		}
		if (urls.length > 0) cacheableKey = 'sticker:' + urls.join('@')
	}
	if (cacheableKey) {
		const cached = await options.mediaCache!.get<Buffer>(cacheableKey)
		if (cached) {
			logger?.debug({ cacheableKey }, 'got media cache hit')
			return (proto.Message as any).StickerPackMessage.decode(cached)
		}
	}

	const lib = await getImageProcessingLibrary()
	const hasSharp = 'sharp' in lib && !!(lib as any).sharp?.default
	const hasImage = 'image' in lib && !!(lib as any).image?.Transformer
	const hasJimp = 'jimp' in lib && !!(lib as any).jimp?.Jimp
	if (!hasSharp && !hasImage)
		throw new Boom('No image processing library (sharp or @napi-rs/image) available for converting sticker to WebP.')

	const stickerPackIdValue = packId || generateMessageIDV2()
	const stickerData: Record<string, [Uint8Array, { level: 0 }]> = {}
	const stickerMetadata: any[] = new Array(stickers.length)

	// Process stickers with concurrency limit (itsliaaa/Lia@Changes 21-04-26)
	for (let i = 0; i < stickers.length; i += CONCURRENCY_LIMIT) {
		const promises: Promise<void>[] = []
		const chunkEnd = Math.min(i + CONCURRENCY_LIMIT, stickers.length)
		for (let j = i; j < chunkEnd; j++) {
			promises.push(
				(async (index: number) => {
					const sticker = stickers[index]!
					const { stream } = await getStream(sticker.data)
					const buffer = await toBuffer(stream)
					let webpBuffer: Buffer
					let isAnimated = false
					if (isWebPBuffer(buffer)) {
						webpBuffer = buffer
						isAnimated = isAnimatedWebP(buffer)
					} else if (hasSharp) {
						webpBuffer = await (lib as any).sharp
							.default(buffer)
							.resize(512, 512, { fit: 'inside' })
							.webp({ quality: 80 })
							.toBuffer()
					} else {
						webpBuffer = await new (lib as any).image.Transformer(buffer).resize(512, 512).webp(80)
					}
					if (webpBuffer.length > 1024 * 1024)
						throw new Boom(`Sticker at index ${index} exceeds the 1MB size limit`, { statusCode: 400 })
					const hash = sha256(webpBuffer).toString('base64').replace(/\//g, '-')
					const fileName = `${hash}.webp`
					stickerData[fileName] = [new Uint8Array(webpBuffer), { level: 0 }]
					stickerMetadata[index] = {
						fileName,
						mimetype: 'image/webp',
						isAnimated,
						emojis: sticker.emojis || ['✨'],
						accessibilityLabel: sticker.accessibilityLabel || '‎'
					}
				})(j)
			)
		}
		await Promise.all(promises)
	}

	// Cover image
	const trayIconFileName = `${stickerPackIdValue}.webp`
	const { stream: coverStream } = await getStream(cover)
	const coverBuffer = await toBuffer(coverStream)
	let coverWebpBuffer: Buffer
	if (isWebPBuffer(coverBuffer)) {
		coverWebpBuffer = coverBuffer
	} else if (hasSharp) {
		coverWebpBuffer = await (lib as any).sharp
			.default(coverBuffer)
			.resize(512, 512, { fit: 'inside' })
			.webp({ quality: 80 })
			.toBuffer()
	} else {
		coverWebpBuffer = await new (lib as any).image.Transformer(coverBuffer).resize(512, 512).webp(80)
	}
	stickerData[trayIconFileName] = [new Uint8Array(coverWebpBuffer), { level: 0 }]

	const zipBuffer = await new Promise<Buffer>((resolve, reject) => {
		zip(stickerData, (err: Error | null, data: Uint8Array) => (err ? reject(err) : resolve(Buffer.from(data))))
	})

	const stickerPackUpload = await encryptedStream(zipBuffer, 'sticker-pack', { logger, opts: options.options })
	let stickerPackUploadResult: any
	try {
		stickerPackUploadResult = await options.upload(stickerPackUpload.encFilePath, {
			fileEncSha256B64: stickerPackUpload.fileEncSha256.toString('base64'),
			mediaType: 'sticker-pack',
			timeoutMs: options.mediaUploadTimeoutMs
		})
	} finally {
		fs.unlink(stickerPackUpload.encFilePath).catch(() => logger?.warn('failed to remove tmp sticker-pack file'))
	}

	const obj: any = {
		name,
		publisher,
		stickerPackId: stickerPackIdValue,
		packDescription: description,
		stickerPackOrigin: (proto.Message as any).StickerPackMessage.StickerPackOrigin.USER_CREATED,
		stickerPackSize: zipBuffer.length,
		stickers: stickerMetadata,
		fileSha256: stickerPackUpload.fileSha256,
		fileEncSha256: stickerPackUpload.fileEncSha256,
		mediaKey: stickerPackUpload.mediaKey,
		directPath: stickerPackUploadResult.directPath,
		fileLength: stickerPackUpload.fileLength,
		mediaKeyTimestamp: unixTimestampSeconds(),
		trayIconFileName
	}

	try {
		let thumbnailBuffer: Buffer
		if (hasSharp) thumbnailBuffer = await (lib as any).sharp.default(coverBuffer).resize(252, 252).jpeg().toBuffer()
		else if (hasImage) thumbnailBuffer = await new (lib as any).image.Transformer(coverBuffer).resize(252, 252).jpeg()
		else if (hasJimp) {
			const j = await (lib as any).jimp.Jimp.read(coverBuffer)
			thumbnailBuffer = await j.resize({ w: 252, h: 252 }).getBuffer('image/jpeg')
		} else throw new Error('No image processing library for thumbnail')

		if (!thumbnailBuffer! || thumbnailBuffer!.length === 0) throw new Error('Empty thumbnail buffer')

		const thumbUpload = await encryptedStream(thumbnailBuffer!, 'thumbnail-sticker-pack', {
			logger,
			opts: options.options
		})
		let thumbUploadResult: any
		try {
			thumbUploadResult = await options.upload(thumbUpload.encFilePath, {
				fileEncSha256B64: thumbUpload.fileEncSha256.toString('base64'),
				mediaType: 'thumbnail-sticker-pack',
				timeoutMs: options.mediaUploadTimeoutMs
			})
		} finally {
			fs.unlink(thumbUpload.encFilePath).catch(() => logger?.warn('failed to remove tmp thumbnail file'))
		}

		Object.assign(obj, {
			thumbnailDirectPath: thumbUploadResult.directPath,
			thumbnailSha256: thumbUpload.fileSha256,
			thumbnailEncSha256: thumbUpload.fileEncSha256,
			thumbnailHeight: 252,
			thumbnailWidth: 252,
			imageDataHash: sha256(thumbnailBuffer!).toString('base64')
		})
	} catch (error) {
		logger?.warn(`Thumbnail generation failed: ${error}`)
	}

	if (cacheableKey) {
		logger?.debug({ cacheableKey }, 'set cache (background)')
		options.mediaCache!.set(cacheableKey, (proto.Message as any).StickerPackMessage.encode(obj).finish())
	}

	const stickerPackMessage: any = (proto.Message as any).StickerPackMessage.fromObject(obj)
	// stickerPackSize/mediaKeyTimestamp are uint64 in the schema — protobufjs wraps these
	// as Long instances via fromObject(); unwrap to plain numbers for a normal JS API.
	if (stickerPackMessage.stickerPackSize && typeof stickerPackMessage.stickerPackSize === 'object') {
		stickerPackMessage.stickerPackSize = Number(stickerPackMessage.stickerPackSize.toString())
	}

	if (stickerPackMessage.fileLength && typeof stickerPackMessage.fileLength === 'object') {
		stickerPackMessage.fileLength = Number(stickerPackMessage.fileLength.toString())
	}

	if (stickerPackMessage.mediaKeyTimestamp && typeof stickerPackMessage.mediaKeyTimestamp === 'object') {
		stickerPackMessage.mediaKeyTimestamp = Number(stickerPackMessage.mediaKeyTimestamp.toString())
	}

	return { stickerPackMessage }
}
