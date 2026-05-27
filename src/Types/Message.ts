import type { Readable } from 'stream'
import type { URL } from 'url'
import { proto } from '../../WAProto/index.js'
import type { MediaType } from '../Defaults'
import type { BinaryNode } from '../WABinary'
import type { GroupMetadata } from './GroupMetadata'
import type { CacheStore } from './Socket'

// export the WAMessage Prototypes
export { proto as WAProto }
export type WAMessage = proto.IWebMessageInfo & {
	key: WAMessageKey
	messageStubParameters?: any
	category?: string
	retryCount?: number
}
export type WAMessageContent = proto.IMessage
export type WAContactMessage = proto.Message.IContactMessage
export type WAContactsArrayMessage = proto.Message.IContactsArrayMessage
export type WAMessageKey = proto.IMessageKey & {
	remoteJidAlt?: string
	remoteJidUsername?: string
	participantAlt?: string
	participantUsername?: string
	server_id?: string
	addressingMode?: string
	isViewOnce?: boolean // TODO: remove out of the message key, place in WebMessageInfo
	uuid?: string
}
export type WATextMessage = proto.Message.IExtendedTextMessage
export type WAContextInfo = proto.IContextInfo
export type WALocationMessage = proto.Message.ILocationMessage
export type WAGenericMediaMessage =
	| proto.Message.IVideoMessage
	| proto.Message.IImageMessage
	| proto.Message.IAudioMessage
	| proto.Message.IDocumentMessage
	| proto.Message.IStickerMessage
export const WAMessageStubType = proto.WebMessageInfo.StubType
export const WAMessageStatus = proto.WebMessageInfo.Status
import type { ILogger } from '../Utils/logger'
export type WAMediaPayloadURL = { url: URL | string }
export type WAMediaPayloadStream = { stream: Readable }
export type WAMediaUpload = Buffer | WAMediaPayloadStream | WAMediaPayloadURL
/** Set of message types that are supported by the library */
export type MessageType = keyof proto.Message

export enum WAMessageAddressingMode {
	PN = 'pn',
	LID = 'lid'
}

export type MessageWithContextInfo =
	| 'imageMessage'
	| 'contactMessage'
	| 'locationMessage'
	| 'extendedTextMessage'
	| 'documentMessage'
	| 'audioMessage'
	| 'videoMessage'
	| 'call'
	| 'contactsArrayMessage'
	| 'liveLocationMessage'
	| 'templateMessage'
	| 'stickerMessage'
	| 'groupInviteMessage'
	| 'templateButtonReplyMessage'
	| 'productMessage'
	| 'listMessage'
	| 'orderMessage'
	| 'listResponseMessage'
	| 'buttonsMessage'
	| 'buttonsResponseMessage'
	| 'interactiveMessage'
	| 'interactiveResponseMessage'
	| 'pollCreationMessage'
	| 'requestPhoneNumberMessage'
	| 'messageHistoryBundle'
	| 'eventMessage'
	| 'newsletterAdminInviteMessage'
	| 'albumMessage'
	| 'stickerPackMessage'
	| 'pollResultSnapshotMessage'
	| 'messageHistoryNotice'

export type DownloadableMessage = { mediaKey?: Uint8Array | null; directPath?: string | null; url?: string | null }

export type MessageReceiptType =
	| 'read'
	| 'read-self'
	| 'hist_sync'
	| 'peer_msg'
	| 'sender'
	| 'inactive'
	| 'played'
	| undefined

export type MediaConnInfo = {
	auth: string
	ttl: number
	hosts: { hostname: string; maxContentLengthBytes: number }[]
	fetchDate: Date
}

export interface WAUrlInfo {
	'canonical-url': string
	'matched-text': string
	title: string
	description?: string
	jpegThumbnail?: Buffer
	highQualityThumbnail?: proto.Message.IImageMessage
	originalThumbnailUrl?: string
}

// types to generate WA messages
type Mentionable = {
	/** list of jids that are mentioned in the accompanying text */
	mentions?: string[]
	/** mention all */
	mentionAll?: boolean
}
type Contextable = {
	/** add contextInfo to the message */
	contextInfo?: proto.IContextInfo
}
type ViewOnce = {
	viewOnce?: boolean
}

type Editable = {
	edit?: WAMessageKey
}
type WithDimensions = {
	width?: number
	height?: number
}

export type PollMessageOptions = {
	name: string
	selectableCount?: number
	values: string[]
	/** 32 byte message secret to encrypt poll selections */
	messageSecret?: Uint8Array
	toAnnouncementGroup?: boolean
}

export type EventMessageOptions = {
	name: string
	description?: string
	startDate: Date
	endDate?: Date
	location?: WALocationMessage
	call?: 'audio' | 'video'
	isCancelled?: boolean
	isScheduleCall?: boolean
	extraGuestsAllowed?: boolean
	messageSecret?: Uint8Array<ArrayBufferLike>
}

export type AlbumMessageOptions = {
	/** Number of images expected in the album */
	expectedImageCount?: number
	/** Number of videos expected in the album */
	expectedVideoCount?: number
}

type SharePhoneNumber = {
	sharePhoneNumber: boolean
}

type RequestPhoneNumber = {
	requestPhoneNumber: boolean
}

export type AnyMediaMessageContent = (
	| ({
			image: WAMediaUpload
			caption?: string
			jpegThumbnail?: string
	  } & Mentionable &
			Contextable &
			WithDimensions)
	| ({
			video: WAMediaUpload
			caption?: string
			gifPlayback?: boolean
			jpegThumbnail?: string
			/** if set to true, will send as a `video note` */
			ptv?: boolean
	  } & Mentionable &
			Contextable &
			WithDimensions)
	| {
			audio: WAMediaUpload
			/** if set to true, will send as a `voice note` */
			ptt?: boolean
			/** optionally tell the duration of the audio */
			seconds?: number
	  }
	| ({
			sticker: WAMediaUpload
			isAnimated?: boolean
	  } & WithDimensions)
	| ({
			document: WAMediaUpload
			mimetype: string
			fileName?: string
			caption?: string
	  } & Contextable)
) & { mimetype?: string } & Editable & {
		/** key of the parent albumMessage to associate this media with */
		albumParentKey?: WAMessageKey
	}

export type ButtonReplyInfo = {
	displayText: string
	id: string
	index: number
}

export type GroupInviteInfo = {
	inviteCode: string
	inviteExpiration: number
	text: string
	jid: string
	subject: string
}

export type WASendableProduct = Omit<proto.Message.ProductMessage.IProductSnapshot, 'productImage'> & {
	productImage: WAMediaUpload
}

export type AnyRegularMessageContent = (
	| ({
			text: string
			linkPreview?: WAUrlInfo | null
	  } & Mentionable &
			Contextable &
			Editable)
	| AnyMediaMessageContent
	| { event: EventMessageOptions }
	| ({
			poll: PollMessageOptions
	  } & Mentionable &
			Contextable &
			Editable)
	| ({
			album: AlbumMessageOptions
	  } & Contextable &
			Mentionable)
	| {
			contacts: {
				displayName?: string
				contacts: proto.Message.IContactMessage[]
			}
	  }
	| {
			location: WALocationMessage
	  }
	| { react: proto.Message.IReactionMessage }
	| {
			buttonReply: ButtonReplyInfo
			type: 'template' | 'plain'
	  }
	| {
			groupInvite: GroupInviteInfo
	  }
	| {
			listReply: Omit<proto.Message.IListResponseMessage, 'contextInfo'>
	  }
	| {
			pin: WAMessageKey
			type: proto.PinInChat.Type
			/**
			 * 24 hours, 7 days, 30 days
			 */
			time?: 86400 | 604800 | 2592000
	  }
	| {
			product: WASendableProduct
			businessOwnerJid?: string
			body?: string
			footer?: string
	  }
	| SharePhoneNumber
	| RequestPhoneNumber
) &
	ViewOnce

export type Sticker = {
	data: WAMediaUpload
	emojis?: string[]
	accessibilityLabel?: string
}

export type StickerPack = {
	stickers: Sticker[]
	cover: WAMediaUpload
	name: string
	publisher: string
	description?: string
	packId?: string
}

export type AnyMessageContent =
	| AnyRegularMessageContent
	| {
			forward: WAMessage
			force?: boolean
	  }
	| {
			/** Delete your message or anyone's message in a group (admin required) */
			delete: WAMessageKey
	  }
	| {
			disappearingMessagesInChat: boolean | number
	  }
	| {
			limitSharing: boolean
	  }

export type GroupMetadataParticipants = Pick<GroupMetadata, 'participants'>

type MinimalRelayOptions = {
	/** override the message ID with a custom provided string */
	messageId?: string
	/** should we use group metadata cache, or fetch afresh from the server; default assumed to be "true" */
	useCachedGroupMetadata?: boolean
}

export type MessageRelayOptions = MinimalRelayOptions & {
	/** only send to a specific participant; used when a message decryption fails for a single user */
	participant?: { jid: string; count: number }
	/** additional attributes to add to the WA binary node */
	additionalAttributes?: { [_: string]: string }
	additionalNodes?: BinaryNode[]
	/** should we use the devices cache, or fetch afresh from the server; default assumed to be "true" */
	useUserDevicesCache?: boolean
	/** jid list of participants for status@broadcast */
	statusJidList?: string[]
}

export type MiscMessageGenerationOptions = MinimalRelayOptions & {
	/** optional, if you want to manually set the timestamp of the message */
	timestamp?: Date
	/** the message you want to quote */
	quoted?: WAMessage
	/** disappearing messages settings */
	ephemeralExpiration?: number | string
	/** timeout for media upload to WA server */
	mediaUploadTimeoutMs?: number
	/** jid list of participants for status@broadcast */
	statusJidList?: string[]
	/** backgroundcolor for status */
	backgroundColor?: string
	/** font type for status */
	font?: number
	/** if it is broadcast */
	broadcast?: boolean
	/**
	 * Custom UUID to embed in the outgoing message key.
	 * If supplied, the key will carry key.uuid = uuid + randomSuffix (capped at 15 chars total).
	 * Falls back to content.uuid, then the hardcoded default.
	 */
	uuid?: string
}
export type MessageGenerationOptionsFromContent = MiscMessageGenerationOptions & {
	userJid: string
}

export type WAMediaUploadFunction = (
	encFilePath: string,
	opts: { fileEncSha256B64: string; mediaType: MediaType; timeoutMs?: number }
) => Promise<{ mediaUrl: string; directPath: string; meta_hmac?: string; ts?: number; fbid?: number }>

export type MediaGenerationOptions = {
	logger?: ILogger
	mediaTypeOverride?: MediaType
	upload: WAMediaUploadFunction
	/** cache media so it does not have to be uploaded again */
	mediaCache?: CacheStore

	mediaUploadTimeoutMs?: number

	options?: RequestInit

	backgroundColor?: string

	font?: number
}
export type MessageContentGenerationOptions = MediaGenerationOptions & {
	getUrlInfo?: (text: string) => Promise<WAUrlInfo | undefined>
	getProfilePicUrl?: (jid: string, type: 'image' | 'preview') => Promise<string | undefined>
	getCallLink?: (type: 'audio' | 'video', event?: { startTime: number }) => Promise<string | undefined>
	jid?: string
}
export type MessageGenerationOptions = MessageContentGenerationOptions & MessageGenerationOptionsFromContent

/**
 * Type of message upsert
 * 1. notify => notify the user, this message was just received
 * 2. append => append the message to the chat history, no notification required
 */
export type MessageUpsertType = 'append' | 'notify'

export type MessageUserReceipt = proto.IUserReceipt

export type WAMessageUpdate = { update: Partial<WAMessage>; key: WAMessageKey }

export type WAMessageCursor =
	| { before: WAMessageKey | undefined }
	| { after: WAMessageKey | undefined }
	| { stickerPack: StickerPack }
	// ─── Interactive / Button / NativeFlow / Carousel ───────────────────
	| {
			/** Old-style buttons (buttonsMessage) — also accepts nativeFlow button types */
			buttons: NativeFlowButton[]
			text?: string
			caption?: string
			title?: string
			footer?: string
	  }
	| {
			/** List message (single-select sections) */
			sections: proto.Message.ListMessage.ISection[]
			buttonText?: string
			title?: string
			text?: string
			footer?: string
	  }
	| {
			/** Template message (hydratedFourRowTemplate) */
			templateButtons: Array<{
				id?: string
				url?: string
				call?: string
				text?: string
				buttonText?: string
				index?: number
				quickReplyButton?: { displayText: string; id: string }
				urlButton?: { displayText: string; url: string }
				callButton?: { displayText: string; phoneNumber: string }
			}>
			text?: string
			caption?: string
			title?: string
			footer?: string
			id?: string
	  }
	| ({
			/** Native-flow interactiveMessage */
			nativeFlow: NativeFlowMessageOptions | NativeFlowButton[]
	  } & NativeFlowMessageOptions & {
				text?: string
				caption?: string
				title?: string
				subtitle?: string
				thumbnail?: Buffer
				footer?: string
				audioFooter?: WAMediaUpload
			})
	| {
			/** Carousel (carouselMessage) — array of cards with media + buttons */
			cards: CarouselCard[]
			text?: string
			footer?: string
	  }
	// ─── Message wrapper flags ────────────────────────────────────────────
	| { mentionAll?: boolean; [key: string]: any }
	| { groupStatus?: boolean; [key: string]: any }
	| { interactiveAsTemplate?: boolean; [key: string]: any }
	| { ephemeral?: boolean; [key: string]: any }
	| { spoiler?: boolean; [key: string]: any }
	| { raw?: boolean; [key: string]: any }
	| { ai?: boolean; aiBotJid?: string; aiBizJid?: string; [key: string]: any }
	// ─── Message wrapper flags ───────────────────────────────────────────────
	| { viewOnce?: boolean; [key: string]: any }
	| { viewOnceV2?: boolean; [key: string]: any }
	| { viewOnceV2Extension?: boolean; [key: string]: any }
	| { ptv?: boolean; video: WAMediaUpload; [key: string]: any }
	| { interactiveAsTemplate?: boolean; id?: string; [key: string]: any }
	| { disappearingMessagesInChat?: boolean | number; [key: string]: any }
	| { groupStatus?: boolean; groupStatusParticipant?: string; [key: string]: any }
	// ─── Reply/response message types ────────────────────────────────────────
	| { buttonReply: { id: string; displayText: string; type?: 'plain' | 'template'; index?: number } }
	| { listReply: { id: string; title?: string; description?: string } }
	// ─── Payment ─────────────────────────────────────────────────────────────
	| { paymentInviteServiceType: number }
	// ─── Status mentions ─────────────────────────────────────────────────────
	| { statusMentionMessage?: boolean; [key: string]: any }
	// ─── Additional flags ────────────────────────────────────────────────────
	| {
			externalAdReply?: {
				title?: string
				body?: string
				mediaType?: number
				url: string
				thumbnail?: Buffer
				largeThumbnail?: boolean
				[key: string]: any
			}
			[key: string]: any
	  }
	| { secureMetaServiceLabel?: boolean; [key: string]: any }
	| { spoiler?: boolean; [key: string]: any }
	| { mentionAll?: boolean; mentions?: string[]; [key: string]: any }
	| { clearChat?: boolean }
	| { isHD?: boolean; [key: string]: any }
	| { shopSurface?: number; id?: string; [key: string]: any }
	| { bizJid?: string; id?: string; [key: string]: any }
	| { requestPaymentFrom?: string; [key: string]: any }
	| { invoiceNote?: string; [key: string]: any }
	| { orderText?: string; thumbnail?: Buffer; [key: string]: any }
	| {
			adminInvite?: {
				inviteCode: string
				inviteExpiration?: number
				jid: string
				subject: string
				text?: string
				caption?: string
				thumbnail?: Buffer
			}
	  }
	| {
			groupInvite?: {
				inviteCode: string
				inviteExpiration?: number
				jid: string
				subject: string
				text?: string
				caption?: string
				thumbnail?: Buffer
			}
	  }
	| { externalAdReply?: ExternalAdReplyContent; [key: string]: any }

export type MessageUserReceiptUpdate = { key: WAMessageKey; receipt: MessageUserReceipt }

export type MediaDecryptionKeyInfo = {
	iv: Buffer
	cipherKey: Buffer
	macKey?: Buffer
}

export type MinimalMessage = Pick<WAMessage, 'key' | 'messageTimestamp'>

// ─────────────────────────────────────────────────────────
// Interactive / Button / NativeFlow / Carousel Types (from @itsliaaa/baileys)
// ─────────────────────────────────────────────────────────

/** A single native-flow button inside nativeFlow / cards */
export type NativeFlowButton = {
	/** Quick reply button — sends id back as message */
	id?: string
	/** Copy-to-clipboard button */
	copy?: string
	/** URL open button */
	url?: string
	/** Phone call button */
	call?: string
	/** Single-select list shortcut (opens a section picker) */
	sections?: proto.Message.ListMessage.ISection[]
	/** Raw native-flow button (pass name + paramsJson directly) */
	name?: string
	paramsJson?: string
	/** Display text (overrides default) */
	text?: string
	buttonText?: string
	/** Optional button icon name (e.g. 'LINK', 'PHONE') */
	icon?: string
	/** Open URL inside an in-app webview */
	useWebview?: boolean
}

/** Options passed to the nativeFlow interactiveMessage builder */
export type NativeFlowMessageOptions = {
	/** Button array */
	buttons?: NativeFlowButton[]
	/** Limited-time offer strip */
	offerText?: string
	offerUrl?: string
	offerCode?: string
	offerExpiration?: number
	/** Bottom-sheet option list */
	optionText?: string
	optionTitle?: string
	/** WA Business collection JID */
	bizJid?: string
	id?: string
	/** WA Business shop storefront surface */
	shopSurface?: number
}

/** A single card in a carousel message */
export type CarouselCard = {
	image?: WAMediaUpload
	video?: WAMediaUpload
	/** product shortcut — triggers productMessage header */
	product?: {
		productId: string
		catalogId: string
		body?: string
		footer?: string
	}
	nativeFlow?: NativeFlowMessageOptions | NativeFlowButton[]
	text?: string
	caption?: string
	title?: string
	subtitle?: string
	thumbnail?: Buffer
	footer?: string
	audioFooter?: WAMediaUpload
}

/** externalAdReply shortcut — attach ad reply without building contextInfo manually */
export type ExternalAdReplyContent = {
	title?: string
	body?: string
	mediaType?: number
	url: string
	thumbnail?: Buffer
	largeThumbnail?: boolean
}

// ─── AI icon / bot message flags ─────────────────────────────────────────────
export interface AIMessageOptions {
	/** Show the Meta AI animated icon on the message bubble */
	ai?: boolean
	/** Bot JID to attribute the message to (defaults to Meta AI bot JID) */
	aiBotJid?: string
	/** Business card JID shown with AI badge */
	aiBizJid?: string
}
