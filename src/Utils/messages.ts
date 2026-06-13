import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import { zip } from 'fflate'
import { promises as fs } from 'fs'
import { type Transform } from 'stream'
import { proto } from '../../WAProto/index.js'
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
	StickerPack,
	WAMediaUpload,
	WAMessage,
	WAMessageContent,
	WAMessageKey,
	WATextMessage
} from '../Types'
import { WAMessageStatus, WAProto } from '../Types'
import { isJidGroup, isJidNewsletter, isJidStatusBroadcast, jidNormalizedUser } from '../WABinary'
import { buildMentionContextInfo } from '../addons/message-utils'
import { sha256 } from './crypto'
import { generateMessageIDV2, getKeyAuthor, unixTimestampSeconds } from './generics'
import type { ILogger } from './logger'
import {
	downloadContentFromMessage,
	encryptedStream,
	generateThumbnail,
	getAudioDuration,
	getAudioWaveform,
	getImageProcessingLibrary,
	getRawMediaUploadData,
	getStream,
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
		uploadData.mimetype = MIMETYPE_MAP[mediaType]
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
		const { mediaUrl, directPath, thumbnailDirectPath, thumbnailSha256 } = await options.upload(filePath, {
			fileEncSha256B64: fileSha256B64,
			mediaType: mediaType,
			timeoutMs: options.mediaUploadTimeoutMs,
			newsletter: true
		})

		await fs.unlink(filePath)

		const obj = WAProto.Message.fromObject({
			// todo: add more support here
			[`${mediaType}Message`]: (MessageTypeProto as any)[mediaType].fromObject({
				// url intentionally omitted — newsletters use directPath only
				directPath,
				fileSha256,
				fileLength,
				thumbnailDirectPath,
				thumbnailSha256: thumbnailSha256 ? Buffer.from(thumbnailSha256, 'base64') : undefined,
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
	const isHDMode = Boolean((uploadData as { hd?: boolean }).hd)
	const requiresThumbnailComputation =
		(mediaType === 'image' || mediaType === 'video') && typeof uploadData['jpegThumbnail'] === 'undefined'
	const requiresWaveformProcessing =
		mediaType === 'audio' && uploadData.ptt === true && typeof uploadData.waveform === 'undefined'
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
						{ ...options, hdMode: isHDMode }
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

export const generateWAMessageContent = async (
	message: AnyMessageContent,
	options: MessageContentGenerationOptions
) => {
	let m: WAMessageContent = {}
	if (hasNonNullishProperty(message, 'text')) {
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
			case 'list':
				m.listResponseMessage = {
					title: message.buttonReply.title,
					description: message.buttonReply.description,
					singleSelectReply: {
						selectedRowId: message.buttonReply.rowId
					},
					listType: proto.Message.ListResponseMessage.ListType.SINGLE_SELECT
				}
				break
			case 'interactive':
				m.interactiveResponseMessage = {
					body: {
						text: message.buttonReply.displayText,
						format: proto.Message.InteractiveResponseMessage.Body.Format.EXTENSIONS_1
					},
					nativeFlowResponseMessage: {
						name: message.buttonReply.nativeFlows?.name,
						paramsJson: message.buttonReply.nativeFlows?.paramsJson,
						version: message.buttonReply.nativeFlows?.version
					}
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
	} else if (hasNonNullishProperty(message, 'pollResult')) {
		// Poll result snapshot — shows vote counts without revealing individual voters
		if (!Array.isArray((message as { pollResult: { values: [string, number][] } }).pollResult.values)) {
			throw new Boom('Invalid pollResult values', { statusCode: 400 })
		}

		const { name, values } = (message as { pollResult: { name: string; values: [string, number][] } }).pollResult
		const pollResultSnapshotMessage = {
			name,
			pollVotes: values.map(([optionName, optionVoteCount]) => ({ optionName, optionVoteCount }))
		}
		;(pollResultSnapshotMessage as Record<string, unknown>).contextInfo = {
			...(message.contextInfo || {}),
			...buildMentionContextInfo(message)
		}
		m.pollResultSnapshotMessage = pollResultSnapshotMessage
	} else if (hasNonNullishProperty(message, 'call')) {
		// Scheduled call creation message (call invite)
		const callMsg = (message as { call: { name?: string; type?: number; time?: number } }).call
		m.scheduledCallCreationMessage = {
			title: callMsg.name || 'Call',
			callType: callMsg.type || 1,
			scheduledTimestampMs: callMsg.time || Date.now()
		}
		;(m.scheduledCallCreationMessage as Record<string, unknown>).contextInfo = {
			...(message.contextInfo || {}),
			...buildMentionContextInfo(message)
		}
	} else if (hasNonNullishProperty(message, 'payment')) {
		// Payment request message
		const payMsg = (
			message as {
				payment: {
					note?: string
					currency?: string
					offset?: number
					amount?: number
					expiry?: number
					from?: string
					image?: { placeholderArgb?: string; textArgb?: string; subtextArgb?: string }
				}
			}
		).payment
		const requestPaymentMessage: Record<string, unknown> = {
			amount: {
				currencyCode: payMsg.currency || 'IDR',
				offset: payMsg.offset || 0,
				value: payMsg.amount || 999999999
			},
			expiryTimestamp: payMsg.expiry || 0,
			amount1000: (payMsg.amount || 999999999) * 1000,
			currencyCodeIso4217: payMsg.currency || 'IDR',
			requestFrom: payMsg.from || '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: payMsg.note || '',
					contextInfo: {
						...(message.contextInfo || {}),
						...buildMentionContextInfo(message)
					}
				}
			},
			background: {
				placeholderArgb: payMsg.image?.placeholderArgb
					? parseInt(payMsg.image.placeholderArgb.replace('#', ''), 16)
					: 0xff000000,
				textArgb: payMsg.image?.textArgb ? parseInt(payMsg.image.textArgb.replace('#', ''), 16) : 0xffffffff,
				subtextArgb: payMsg.image?.subtextArgb ? parseInt(payMsg.image.subtextArgb.replace('#', ''), 16) : 0xffffffff,
				type: 1
			}
		}
		m.requestPaymentMessage = requestPaymentMessage
	} else if (hasNonNullishProperty(message, 'raw')) {
		// Raw proto message — pass through directly without any wrapping
		// ⚠️ Use with caution — no validation is performed
		m = (message as { raw: proto.IMessage }).raw
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
			// messageSecret must NOT be set for newsletter polls —
			// newsletters handle encryption differently and a secret causes send failures
			...(!options.jid || !isJidNewsletter(options.jid)
				? {
						messageSecret: (() => {
							const provided = message.poll.messageSecret
							return provided instanceof Uint8Array && provided.length === 32 ? provided : randomBytes(32)
						})()
					}
				: {})
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
	} else if ('stickerPack' in message && message.stickerPack) {
		m = await prepareStickerPackMessage(message.stickerPack, options)
	} else if (hasNonNullishProperty(message, 'paymentInviteServiceType')) {
		// Payment invite message (Facebook Pay=1, Apple Pay=2, Stripe=3)
		m.paymentInviteMessage = {
			serviceType: (message as { paymentInviteServiceType: 1 | 2 | 3 }).paymentInviteServiceType,
			expiryTimestamp: (message as { expiry?: number }).expiry
		}
	} else if (hasNonNullishProperty(message, 'requestPaymentFrom')) {
		// Request payment from another user
		const requestPaymentMessage: Record<string, unknown> = {
			requestFrom: (message as { requestPaymentFrom: string }).requestPaymentFrom,
			background: { placeholderArgb: 0, textArgb: 0, subtextArgb: 0 },
			currencyCodeIso4217: 'IDR',
			amount1000: 0
		}
		m = { requestPaymentMessage }
	} else if (hasNonNullishProperty(message, 'orderText')) {
		// Order message
		const msg = message as { orderText: string; thumbnail?: Buffer; currency?: string; orderId?: string }
		m.orderMessage = {
			orderId: msg.orderId ?? `order_${Date.now()}`,
			thumbnail: msg.thumbnail,
			itemCount: 1,
			status: proto.Message.OrderMessage.OrderStatus.INQUIRY,
			surface: proto.Message.OrderMessage.OrderSurface.CATALOG,
			message: msg.orderText,
			orderTitle: msg.orderText,
			sellerJid: options.jid ?? '',
			token: generateMessageIDV2(),
			totalAmount1000: 0,
			totalCurrencyCode: msg.currency ?? 'IDR'
		}
	} else if (hasNonNullishProperty(message, 'adminInvite')) {
		// Admin invite to a newsletter/channel
		const invite = (
			message as {
				adminInvite: { jid: string; name: string; caption?: string; expiration?: number; jpegThumbnail?: Buffer }
			}
		).adminInvite
		m.adminInviteMessage = {
			inviteJid: invite.jid,
			inviteName: invite.name,
			caption: invite.caption ?? '',
			inviteExpiration: invite.expiration ?? 86400,
			jpegThumbnail: invite.jpegThumbnail
		}
	} else if (hasNonNullishProperty(message, 'nativeFlow')) {
		// Native-flow interactive message
		const msg = message as {
			nativeFlow?: { buttons: { name: string; buttonParamsJson: string }[]; messageParamsJson?: string }
			text?: string
			caption?: string
			title?: string
			subtitle?: string
			footer?: string
			thumbnail?: Buffer
			bizJid?: string
			shopSurface?: number
			id?: string
			audioFooter?: WAMediaUpload
		}
		const interactiveMessage: Record<string, unknown> = {
			nativeFlowMessage: {
				buttons: msg.nativeFlow?.buttons ?? [],
				messageParamsJson: msg.nativeFlow?.messageParamsJson ?? ''
			}
		}
		if (msg.bizJid) {
			interactiveMessage.collectionMessage = { bizJid: msg.bizJid, id: msg.id, messageVersion: 1 }
		} else if (msg.shopSurface !== undefined) {
			interactiveMessage.shopStorefrontMessage = { surface: msg.shopSurface, id: msg.id, messageVersion: 1 }
		}
		if (msg.text !== undefined) {
			interactiveMessage.body = { text: msg.text }
		} else if (msg.caption !== undefined) {
			interactiveMessage.header = { title: msg.title ?? '', subtitle: msg.subtitle ?? '', hasMediaAttachment: false }
			interactiveMessage.body = { text: msg.caption }
		}
		if (msg.footer !== undefined) {
			interactiveMessage.footer = { text: msg.footer }
		}
		m = { interactiveMessage }
	} else if (hasNonNullishProperty(message, 'cards')) {
		// Carousel / cards message
		const msg = message as {
			cards: Array<{
				text?: string
				caption?: string
				title?: string
				subtitle?: string
				footer?: string
				thumbnail?: Buffer
				audioFooter?: WAMediaUpload
				nativeFlow?: { buttons: { name: string; buttonParamsJson: string }[] }
				product?: WASendableProduct
				image?: WAMediaUpload
				video?: WAMediaUpload
			}>
			text?: string
			footer?: string
		}
		const cards = await Promise.all(
			msg.cards.map(async card => {
				const carouselCard: Record<string, unknown> = {
					nativeFlowMessage: { buttons: card.nativeFlow?.buttons ?? [], messageParamsJson: '' }
				}
				if (card.text !== undefined) {
					carouselCard.body = { text: card.text }
				} else if (card.caption !== undefined) {
					let cardHeader: Record<string, unknown> = {}
					if (card.image) {
						const mediaResult = await prepareWAMessageMedia({ image: card.image }, options)
						cardHeader = { ...mediaResult, hasMediaAttachment: true }
					} else if (card.video) {
						const mediaResult = await prepareWAMessageMedia({ video: card.video }, options)
						cardHeader = { ...mediaResult, hasMediaAttachment: true }
					}
					carouselCard.header = {
						title: card.title ?? '',
						subtitle: card.subtitle ?? '',
						hasMediaAttachment: !!(card.image || card.video),
						...cardHeader
					}
					carouselCard.body = { text: card.caption }
				}
				if (card.footer !== undefined) carouselCard.footer = { text: card.footer }
				return carouselCard
			})
		)
		const interactiveMessage: Record<string, unknown> = {
			carouselMessage: {
				cards,
				carouselCardType: proto.Message.InteractiveMessage.CarouselMessage.CarouselCardType.UNKNOWN,
				messageVersion: 1
			}
		}
		if (msg.text !== undefined) interactiveMessage.body = { text: msg.text }
		if (msg.footer !== undefined) interactiveMessage.footer = { text: msg.footer }
		m = { interactiveMessage }
	} else if (hasNonNullishProperty(message, 'templateButtons')) {
		// Template buttons — simplified sendMessage API
		const msg = message as {
			templateButtons: Array<{
				text?: string
				buttonText?: string
				id?: string
				url?: string
				call?: string
				index?: number
			}>
			text?: string
			caption?: string
			title?: string
			footer?: string
			image?: WAMediaUpload
			video?: WAMediaUpload
			id?: string
		}
		const hydratedButtons = msg.templateButtons.map((btn, i) => {
			const buttonText = btn.text ?? btn.buttonText
			if (btn.id !== undefined) {
				return { index: btn.index ?? i, quickReplyButton: { displayText: buttonText ?? '👉 Click', id: btn.id } }
			} else if (btn.url !== undefined) {
				return { index: btn.index ?? i, urlButton: { displayText: buttonText ?? '🌐 Visit', url: btn.url } }
			} else if (btn.call !== undefined) {
				return { index: btn.index ?? i, callButton: { displayText: buttonText ?? '📞 Call', phoneNumber: btn.call } }
			}
			return { index: btn.index ?? i }
		})
		const hydratedTemplate: Record<string, unknown> = {
			hydratedButtons,
			hydratedContentText: msg.text ?? msg.caption ?? '',
			hydratedFooterText: msg.footer,
			templateId: msg.id ?? `template-${Date.now()}`
		}
		if (msg.title) hydratedTemplate.hydratedTitleText = msg.title
		if (msg.image && options) {
			const { imageMessage } = await prepareWAMessageMedia({ image: msg.image }, options)
			hydratedTemplate.imageMessage = imageMessage
		} else if (msg.video && options) {
			const { videoMessage } = await prepareWAMessageMedia({ video: msg.video }, options)
			hydratedTemplate.videoMessage = videoMessage
		}
		m = { templateMessage: { hydratedTemplate, hydratedFourRowTemplate: hydratedTemplate } }
	} else {
		m = await prepareWAMessageMedia(message, options)
	}

	// ── Post-build wrappers (order matters — mirrors ItsLiaaa) ──────────────────

	if (hasOptionalProperty(message, 'groupStatus') && !!(message as { groupStatus?: boolean }).groupStatus) {
		const msgType = Object.keys(m)[0]! as Extract<keyof proto.IMessage, MessageWithContextInfo>
		const key = m[msgType]
		if (key && 'contextInfo' in key) {
			;(key as proto.IExtendedTextMessage).contextInfo = {
				...(key as proto.IExtendedTextMessage).contextInfo,
				isGroupStatus: true
			}
		} else if (key) {
			;(key as Record<string, unknown>).contextInfo = { isGroupStatus: true }
		}
		m = { groupStatusMessageV2: { message: m } }
	}

	if (hasOptionalProperty(message, 'spoiler') && !!(message as { spoiler?: boolean }).spoiler) {
		const msgType = Object.keys(m)[0]! as Extract<keyof proto.IMessage, MessageWithContextInfo>
		const key = m[msgType]
		if (key && 'contextInfo' in key) {
			;(key as proto.IExtendedTextMessage).contextInfo = {
				...(key as proto.IExtendedTextMessage).contextInfo,
				isSpoiler: true
			}
		} else if (key) {
			;(key as Record<string, unknown>).contextInfo = { isSpoiler: true }
		}
		m = { spoilerMessage: { message: m } }
	}

	// ─── richResponse (Meta AI–style) ────────────────────────────────────────────
	if (hasNonNullishProperty(message, 'richResponse')) {
		const DEFAULT_BOT_JID = '867051314767696@bot'
		const {
			text,
			code,
			language = 'javascript',
			botJid = DEFAULT_BOT_JID
		} = (message as { richResponse: { text?: string; code?: string; language?: string; botJid?: string } }).richResponse
		const sections: object[] = []
		if (text)
			sections.push({
				view_model: {
					primitive: { text, __typename: 'GenAIMarkdownTextUXPrimitive' },
					__typename: 'GenAISingleLayoutViewModel'
				}
			})
		if (code)
			sections.push({
				view_model: {
					primitive: { language, code_blocks: [], __typename: 'GenAICodeUXPrimitive' },
					__typename: 'GenAISingleLayoutViewModel'
				}
			})
		if (sections.length === 0) throw new Boom('richResponse requires at least one of text or code')
		const unifiedData = { response_id: randomUUID(), sections }
		m = proto.Message.fromObject({
			messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2, messageSecret: randomBytes(32) },
			botForwardedMessage: {
				message: {
					richResponseMessage: {
						submessages: [],
						messageType: 1,
						unifiedResponse: { data: Buffer.from(JSON.stringify(unifiedData)) },
						contextInfo: {
							forwardingScore: 2,
							isForwarded: true,
							forwardedAiBotMessageInfo: { botJid },
							botMessageSharingInfo: { botEntryPointOrigin: 1, forwardScore: 2 }
						}
					}
				}
			}
		})
	} else if (hasNonNullishProperty(message, 'shop') && !!(message as { shop?: object }).shop) {
		const shopMsg = (message as { shop: { surface: number; id: string } }).shop
		const interactiveMessage: proto.IMessage['interactiveMessage'] & Record<string, unknown> = {
			shopStorefrontMessage: { surface: shopMsg.surface, id: shopMsg.id }
		}
		if (hasNonNullishProperty(message, 'text')) interactiveMessage.body = { text: (message as { text: string }).text }
		else if (hasNonNullishProperty(message, 'caption'))
			interactiveMessage.body = { text: (message as { caption: string }).caption }
		if (hasNonNullishProperty(message, 'title') || hasNonNullishProperty(message, 'subtitle')) {
			interactiveMessage.header = {
				title: (message as any).title,
				subtitle: (message as any).subtitle,
				hasMediaAttachment: !!(message as any).hasMediaAttachment
			}
		}
		if (hasNonNullishProperty(message, 'footer'))
			interactiveMessage.footer = { text: (message as { footer: string }).footer }
		interactiveMessage.contextInfo = { ...(message.contextInfo || {}), ...buildMentionContextInfo(message) }
		m = { interactiveMessage }
	} else if (hasNonNullishProperty(message, 'collection') && !!(message as { collection?: object }).collection) {
		const colMsg = (message as { collection: { bizJid: string; id: string; version?: number } }).collection
		const interactiveMessage: proto.IMessage['interactiveMessage'] & Record<string, unknown> = {
			collectionMessage: { bizJid: colMsg.bizJid, id: colMsg.id, messageVersion: colMsg.version }
		}
		if (hasNonNullishProperty(message, 'text')) interactiveMessage.body = { text: (message as { text: string }).text }
		else if (hasNonNullishProperty(message, 'caption'))
			interactiveMessage.body = { text: (message as { caption: string }).caption }
		if (hasNonNullishProperty(message, 'title') || hasNonNullishProperty(message, 'subtitle')) {
			interactiveMessage.header = {
				title: (message as any).title,
				subtitle: (message as any).subtitle,
				hasMediaAttachment: !!(message as any).hasMediaAttachment
			}
		}
		if (hasNonNullishProperty(message, 'footer'))
			interactiveMessage.footer = { text: (message as { footer: string }).footer }
		interactiveMessage.contextInfo = { ...(message.contextInfo || {}), ...buildMentionContextInfo(message) }
		m = { interactiveMessage }
	} else if (hasNonNullishProperty(message, 'productList') && !!(message as { productList?: object[] }).productList) {
		const plMsg = message as {
			productList: { title?: string; products: { productId: string }[] }[]
			thumbnail?: WAMediaUpload
			buttonText?: string
			title?: string
			text?: string
			footer?: string
			businessOwnerJid?: string
		}
		const listMessage: Record<string, unknown> = {
			title: plMsg.title,
			buttonText: plMsg.buttonText,
			footerText: plMsg.footer,
			description: plMsg.text,
			productListInfo: {
				productSections: plMsg.productList,
				headerImage: { productId: plMsg.productList[0]?.products[0]?.productId },
				businessOwnerJid: plMsg.businessOwnerJid
			},
			listType: proto.Message.ListMessage.ListType.PRODUCT_LIST
		}
		listMessage.contextInfo = { ...(message.contextInfo || {}) }
		m = { listMessage }
	} else if (
		hasOptionalProperty(message, 'interactiveAsTemplate') &&
		!!(message as { interactiveAsTemplate?: boolean }).interactiveAsTemplate
	) {
		if (!m.interactiveMessage)
			throw new Boom('interactiveAsTemplate requires an interactive message', { statusCode: 400 })
		m = {
			templateMessage: {
				interactiveMessageTemplate: m.interactiveMessage,
				templateId: (message as { id?: string }).id ?? `template-${Date.now()}`
			}
		}
	}

	if (hasOptionalProperty(message, 'ephemeral') && !!(message as { ephemeral?: boolean }).ephemeral) {
		m = { ephemeralMessage: { message: m } }
	}

	if (hasOptionalProperty(message, 'isLottie') && !!(message as { isLottie?: boolean }).isLottie) {
		m = { lottieStickerMessage: { message: m } }
	}

	if (hasOptionalProperty(message, 'viewOnce') && !!message.viewOnce) {
		m = { viewOnceMessage: { message: m } }
	} else if (hasOptionalProperty(message, 'viewOnceV2') && !!(message as { viewOnceV2?: boolean }).viewOnceV2) {
		m = { viewOnceMessageV2: { message: m } }
	} else if (
		hasOptionalProperty(message, 'viewOnceV2Extension') &&
		!!(message as { viewOnceV2Extension?: boolean }).viewOnceV2Extension
	) {
		m = { viewOnceMessageV2Extension: { message: m } }
	}

	if (hasOptionalProperty(message, 'externalAdReply') && !!(message as { externalAdReply?: object }).externalAdReply) {
		const { externalAdReply: adReply } = message as {
			externalAdReply: {
				title?: string
				body?: string
				url?: string
				thumbnail?: Buffer
				largeThumbnail?: boolean
				mediaType?: number
			}
		}
		const msgType = Object.keys(m)[0]! as Extract<keyof proto.IMessage, MessageWithContextInfo>
		const key = m[msgType]
		const adReplyObj = {
			...adReply,
			mediaType: adReply.mediaType ?? 1,
			mediaUrl: adReply.url,
			renderLargerThumbnail: adReply.largeThumbnail,
			sourceUrl: adReply.url,
			thumbnailUrl: adReply.url ? adReply.url + '?ts=' + Date.now() : undefined,
			title: adReply.title ?? 'Baileys'
		}
		if (key && 'contextInfo' in key) {
			;(key as proto.IExtendedTextMessage).contextInfo = {
				...(key as proto.IExtendedTextMessage).contextInfo,
				externalAdReply: adReplyObj
			}
		} else if (key) {
			;(key as Record<string, unknown>).contextInfo = { externalAdReply: adReplyObj }
		}
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

/** Checks if a buffer contains a WebP image by its RIFF/WEBP header */
function isWebPBuffer(buffer: Buffer): boolean {
	return buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP'
}

/** Checks if a WebP buffer is animated by inspecting the VP8X chunk animation flag */
function isAnimatedWebP(buffer: Buffer): boolean {
	if (buffer.length < 21) return false
	const chunkName = buffer.toString('ascii', 12, 16)
	return chunkName === 'VP8X' && (buffer[20]! & 0x02) !== 0
}

async function prepareStickerPackMessage(
	stickerPack: StickerPack,
	options: MessageContentGenerationOptions
): Promise<proto.IMessage> {
	const { stickers, name, publisher, packId, description } = stickerPack

	if (stickers.length > 60) {
		throw new Boom('Sticker pack exceeds the maximum limit of 60 stickers', { statusCode: 400 })
	}

	if (stickers.length === 0) {
		throw new Boom('Sticker pack must contain at least one sticker', { statusCode: 400 })
	}

	const stickerPackIdValue = packId || generateMessageIDV2()

	const lib = await getImageProcessingLibrary()
	const stickerData: Record<string, [Uint8Array, { level: 0 }]> = {}
	const stickerPromises = stickers.map(async (s, i) => {
		const { stream } = await getStream(s.data)
		const buffer = await toBuffer(stream)

		let webpBuffer: Buffer
		let isAnimated = false
		const isWebP = isWebPBuffer(buffer)

		if (isWebP) {
			// Already WebP - preserve original to keep exif metadata and animation
			webpBuffer = buffer
			isAnimated = isAnimatedWebP(buffer)
		} else if ('sharp' in lib && lib.sharp) {
			// Convert to WebP, preserving metadata
			webpBuffer = await lib.sharp.default(buffer).webp().toBuffer()
			// Non-WebP inputs converted to WebP are not animated
			isAnimated = false
		} else {
			throw new Boom(
				'No image processing library (sharp) available for converting sticker to WebP. Either install sharp or provide stickers in WebP format.'
			)
		}

		if (webpBuffer.length > 1024 * 1024) {
			throw new Boom(`Sticker at index ${i} exceeds the 1MB size limit`, { statusCode: 400 })
		}

		const hash = sha256(webpBuffer).toString('base64').replace(/\//g, '-')
		const fileName = `${hash}.webp`
		stickerData[fileName] = [new Uint8Array(webpBuffer), { level: 0 as 0 }]
		return {
			fileName,
			mimetype: 'image/webp',
			isAnimated,
			emojis: s.emojis || [],
			accessibilityLabel: s.accessibilityLabel
		}
	})

	const stickerMetadata = await Promise.all(stickerPromises)

	// Process and add cover/tray icon to the ZIP
	const trayIconFileName = `${stickerPackIdValue}.webp`
	const { stream: coverStream } = await getStream(stickerPack.cover)
	const coverBuffer = await toBuffer(coverStream)

	let coverWebpBuffer: Buffer
	const isCoverWebP = isWebPBuffer(coverBuffer)

	if (isCoverWebP) {
		// Already WebP - preserve original to keep exif metadata
		coverWebpBuffer = coverBuffer
	} else if ('sharp' in lib && lib.sharp) {
		coverWebpBuffer = await lib.sharp.default(coverBuffer).webp().toBuffer()
	} else {
		throw new Boom(
			'No image processing library (sharp) available for converting cover to WebP. Either install sharp or provide cover in WebP format.'
		)
	}

	// Add cover to ZIP data
	stickerData[trayIconFileName] = [new Uint8Array(coverWebpBuffer), { level: 0 as 0 }]

	const zipBuffer = await new Promise<Buffer>((resolve, reject) => {
		zip(stickerData, (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(Buffer.from(data))
			}
		})
	})

	const stickerPackSize = zipBuffer.length

	const stickerPackUpload = await encryptedStream(zipBuffer, 'sticker-pack', {
		logger: options.logger,
		opts: options.options
	})

	const stickerPackUploadResult = await options.upload(stickerPackUpload.encFilePath, {
		fileEncSha256B64: stickerPackUpload.fileEncSha256.toString('base64'),
		mediaType: 'sticker-pack',
		timeoutMs: options.mediaUploadTimeoutMs
	})

	await fs.unlink(stickerPackUpload.encFilePath)

	const stickerPackMessage: proto.Message.IStickerPackMessage = {
		name: name,
		publisher: publisher,
		stickerPackId: stickerPackIdValue,
		packDescription: description,
		stickerPackOrigin: WAProto.Message.StickerPackMessage.StickerPackOrigin.USER_CREATED,
		stickerPackSize: stickerPackSize,
		stickers: stickerMetadata,

		fileSha256: stickerPackUpload.fileSha256,
		fileEncSha256: stickerPackUpload.fileEncSha256,
		mediaKey: stickerPackUpload.mediaKey,
		directPath: stickerPackUploadResult.directPath,
		fileLength: stickerPackUpload.fileLength,
		mediaKeyTimestamp: unixTimestampSeconds(),

		trayIconFileName: trayIconFileName
	}

	try {
		// Reuse the cover buffer we already processed for thumbnail generation
		let thumbnailBuffer: Buffer

		if ('sharp' in lib && lib.sharp) {
			thumbnailBuffer = await lib.sharp.default(coverBuffer).resize(252, 252).jpeg().toBuffer()
		} else if ('jimp' in lib && lib.jimp) {
			const jimpImage = await lib.jimp.Jimp.read(coverBuffer)
			thumbnailBuffer = await jimpImage.resize({ w: 252, h: 252 }).getBuffer('image/jpeg')
		} else {
			throw new Error('No image processing library available for thumbnail generation')
		}

		if (!thumbnailBuffer || thumbnailBuffer.length === 0) {
			throw new Error('Failed to generate thumbnail buffer')
		}

		const thumbUpload = await encryptedStream(thumbnailBuffer, 'thumbnail-sticker-pack', {
			logger: options.logger,
			opts: options.options
		})

		const thumbUploadResult = await options.upload(thumbUpload.encFilePath, {
			fileEncSha256B64: thumbUpload.fileEncSha256.toString('base64'),
			mediaType: 'thumbnail-sticker-pack',
			timeoutMs: options.mediaUploadTimeoutMs
		})

		await fs.unlink(thumbUpload.encFilePath)

		Object.assign(stickerPackMessage, {
			thumbnailDirectPath: thumbUploadResult.directPath,
			thumbnailSha256: thumbUpload.fileSha256,
			thumbnailEncSha256: thumbUpload.fileEncSha256,
			thumbnailHeight: 252,
			thumbnailWidth: 252,
			imageDataHash: sha256(thumbnailBuffer).toString('base64')
		})
	} catch (e) {
		options.logger?.warn?.(`Thumbnail generation failed: ${e}`)
	}

	return { stickerPackMessage }
}
