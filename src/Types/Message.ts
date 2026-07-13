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
	/**
	 * Source: custom addon — a separate, user-controllable identifier kept
	 * alongside the standard `id` (which is left completely untouched).
	 * NOT part of the official WhatsApp protobuf schema — this is a
	 * local-only field attached after message construction, so it never
	 * gets sent over the wire. See `generateKeyUuid` in `Utils/generics.ts`.
	 */
	uuid?: string
	addressingMode?: string
	isViewOnce?: boolean // TODO: remove out of the message key, place in WebMessageInfo
}
export type WATextMessage = proto.Message.IExtendedTextMessage
export type WAContextInfo = proto.IContextInfo
export type WALocationMessage = proto.Message.ILocationMessage
// Source: innovatorssoft/baileys — live location was missing from upstream
export type WALiveLocationMessage = proto.Message.ILiveLocationMessage
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
/** Source: innovatorssoft/baileys & itsliaaa/baileys */
type GroupStatusable = {
	/** send this message as a Group Status update (in addition to a normal chat message) */
	groupStatus?: boolean
}
/** Source: innovatorssoft/baileys — extra post-processing modifier flags */
type ExtraModifiers = {
	/** wrap an `interactiveMessage` content into a `templateMessage` (requires `interactiveMessage` to also be set) */
	interactiveAsTemplate?: boolean
	/** mark the message content as a spoiler */
	spoiler?: boolean
	/** wrap content as an ephemeral (disappearing) message */
	ephemeral?: boolean
	/** mark a sticker as a Lottie (animated/vector) sticker */
	isLottie?: boolean
	/** alternate view-once wrapper (v2) */
	viewOnceV2?: boolean
	/** alternate view-once wrapper (v2 extension) */
	viewOnceV2Extension?: boolean
	/** alias for `viewOnceV2Extension` */
	viewOnceExt?: boolean
	/** Source: innovatorssoft/baileys — force-attach the `<biz>` binary node needed for some business/interactive message types to render correctly */
	secureMetaServiceLabel?: boolean
	/**
	 * Source: custom addon — sets `key.uuid` on the resulting message.
	 * Priority: `content.uuid` > `options.uuid` > generated default.
	 * Does not affect or replace `key.id` in any way.
	 */
	uuid?: string
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

/** Source: innovatorssoft/baileys — a single native-flow button, either
 *  shorthand (`{ text, url }` / `{ text, id }` / `{ text, copy }` / `{ text, call }`)
 *  or already-built (`{ name, buttonParamsJson }`) */
type NativeFlowButtonInput = Record<string, unknown>

type InteractiveButtonsContent = {
	/** Send native-flow buttons directly. Shorthand objects are auto-converted. */
	interactiveButtons?: NativeFlowButtonInput[]
	/** Alias for `interactiveButtons` */
	nativeFlow?: NativeFlowButtonInput[]
	body?: string | { text: string }
	footer?: string | { text: string }
	thumbnail?: Buffer | string
	audioFooter?: WAMediaUpload
	title?: string
	subtitle?: string
	/** attach this set of buttons to a Shop card */
	shop?: { surface: number; id: string }
	shopSurface?: number
	/** attach this set of buttons to a Collection card */
	collection?: { bizJid: string; id: string; version?: number }
	bizJid?: string
	id?: string
}

type ShopContent = {
	shop: { surface: number; id: string }
	text?: string
	caption?: string
	title?: string
	subtitle?: string
	footer?: string
	hasMediaAttachment?: boolean
}

type CollectionContent = {
	collection: { bizJid: string; id: string; version?: number }
	text?: string
	caption?: string
	title?: string
	subtitle?: string
	footer?: string
	hasMediaAttachment?: boolean
}

/** Source: innovatorssoft/baileys — a single Cards/Carousel slide */
type CarouselCardInput = {
	image?: WAMediaUpload
	video?: WAMediaUpload
	product?: { productImage: WAMediaUpload; [key: string]: unknown }
	title?: string
	caption?: string
	body?: string
	footer?: string
	nativeFlow?: NativeFlowButtonInput[]
	[key: string]: unknown
}

type CardsContent = {
	cards: CarouselCardInput[]
	text?: string
	footer?: string
}

/** Source: innovatorssoft/baileys */
type StickerPackContent = {
	stickerPack: {
		stickers: Array<{
			sticker: WAMediaUpload
			isAnimated?: boolean
			isLottie?: boolean
			emojis?: string[]
			accessibilityLabel?: string
		}>
		cover: WAMediaUpload
		name: string
		publisher: string
		packId?: string
		description?: string
	}
}

/** Source: innovatorssoft/baileys — send a snapshot of final poll results */
type PollResultContent = {
	pollResult: {
		name: string
		/** array of [optionName, voteCount] tuples */
		values: [string, number][]
	}
}

/** Source: innovatorssoft/baileys — see `prepareRichResponseMessage` for full shape */
type RichResponseShorthandContent = {
	richResponse?: Array<Record<string, unknown>>
	code?: string
	language?: string
	links?: Array<{ text: string; url?: string; title?: string; displayName?: string; sources?: unknown[] }>
	table?: string[][]
	headerText?: string
	contentText?: string
	footerText?: string
	disclaimerText?: string
	title?: string
	noHeading?: boolean
	items?: unknown
	inlineImage?: unknown
	imageText?: string
	alignment?: number
	tapLinkUrl?: string
	inlineVideo?: unknown
	latex?: unknown[]
	posts?: unknown
	products?: unknown
	suggested?: unknown
}

/** Source: innovatorssoft/baileys — direct `listMessage` shorthand */
type ListSectionsContent = {
	sections: Array<{ title: string; rows: Array<{ rowId: string; title: string; description?: string }> }>
	title?: string
	text?: string
	buttonText?: string
	footer?: string
}

/** Source: innovatorssoft/baileys — direct product-list `listMessage` shorthand */
type ProductListContent = {
	productList: Array<{ title: string; products: Array<{ productId: string; [key: string]: unknown }> }>
	title?: string
	text?: string
	buttonText?: string
	footer?: string
	thumbnail?: WAMediaUpload
	businessOwnerJid?: string
}

/** Source: innovatorssoft/baileys — classic `buttonsMessage` shorthand button */
type ClassicButtonShorthand = {
	id?: string
	buttonId?: string
	text?: string
	buttonText?: string | { displayText: string }
	type?: number
	name?: string
	paramsJson?: string
	sections?: unknown
}

type ClassicButtonsContent = {
	buttons: ClassicButtonShorthand[]
	text?: string
	caption?: string
	footer?: string
	title?: string
}

/** Source: innovatorssoft/baileys — classic `templateMessage` shorthand button */
type TemplateButtonShorthand = {
	text?: string
	buttonText?: string
	id?: string
	url?: string
	call?: string
	index?: number
}

type ClassicTemplateButtonsContent = {
	templateButtons: TemplateButtonShorthand[]
	text?: string
	caption?: string
	footer?: string
	title?: string
	id?: string
}

/** Source: innovatorssoft/baileys — escape-hatch passthroughs for already-built proto objects */
type RawPassthroughContent =
	| { interactiveMessage: proto.Message.IInteractiveMessage; contextInfo?: proto.IContextInfo }
	| { buttonsMessage: proto.Message.IButtonsMessage; contextInfo?: proto.IContextInfo }
	| { listMessage: proto.Message.IListMessage; contextInfo?: proto.IContextInfo }
	| { templateMessage: proto.Message.ITemplateMessage; contextInfo?: proto.IContextInfo }
	| { viewOnceMessage: proto.IMessage }
	| { viewOnceMessageV2: proto.IMessage }

export type AnyMediaMessageContent = (
	| ({
			image: WAMediaUpload
			caption?: string
			jpegThumbnail?: string
			/** Source: innovatorssoft/baileys — generate a higher-quality preview thumbnail */
			hd?: boolean
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
			/** Source: innovatorssoft/baileys — generate a higher-quality preview thumbnail */
			hd?: boolean
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
			/** Source: innovatorssoft/baileys — send as a live (real-time updating) location instead of a static pin */
			live?: boolean
	  }
	| { react: proto.Message.IReactionMessage }
	| {
			buttonReply: ButtonReplyInfo
			type: 'template' | 'plain'
	  }
	| {
			groupInvite: GroupInviteInfo
	  }
	| ({
			/** Source: innovatorssoft/baileys — send a newsletter admin invite */
			adminInvite: {
				jid: string
				name: string
				caption?: string
				expiration?: number
			}
	  } & Contextable)
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
	| {
			/** Source: innovatorssoft/baileys — pins/keeps a message in the chat */
			keep: WAMessageKey
			type?: proto.KeepType
	  }
	| {
			/** Source: innovatorssoft/baileys — sends a "scheduled call" invite card */
			call: {
				time?: number
				type?: number
				name?: string
			}
	  }
	| ({
			/** Source: innovatorssoft/baileys — requests a payment from the recipient */
			payment: {
				amount?: number
				currency?: string
				offset?: number
				expiry?: number
				from?: string
				note?: string
				image?: { placeholderArgb?: number; textArgb?: number; subtextArgb?: number }
			}
	  } & Contextable)
	| {
			/** Source: innovatorssoft/baileys — sends a payment-invite card */
			paymentInvite: {
				expiry?: number
				/** service type, defaults to 2 */
				type?: number
			}
	  }
	| ({
			/** Source: innovatorssoft/baileys — a real, simple gap: orderMessage was never wired */
			order: proto.Message.IOrderMessage
	  } & Contextable)
	| (InteractiveButtonsContent & Contextable & Mentionable)
	| (ShopContent & Contextable & Mentionable)
	| (CollectionContent & Contextable & Mentionable)
	| (CardsContent & Contextable & Mentionable)
	| (StickerPackContent & Contextable & Mentionable)
	| (PollResultContent & Contextable & Mentionable)
	| (RichResponseShorthandContent & Contextable & Mentionable)
	| (ListSectionsContent & Contextable & Mentionable)
	| (ProductListContent & Contextable & Mentionable)
	| (ClassicButtonsContent & Contextable & Mentionable)
	| (ClassicTemplateButtonsContent & Contextable & Mentionable)
	| RawPassthroughContent
	| SharePhoneNumber
	| RequestPhoneNumber
) &
	ViewOnce &
	GroupStatusable &
	ExtraModifiers

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
	/** Source: innovatorssoft/baileys — shows the small "AI" bot icon next to this message (1:1 / LID chats only) */
	ai?: boolean
	/**
	 * Source: custom addon — sets `key.uuid` on the resulting message when
	 * `content.uuid` isn't set. See `generateKeyUuid` in `Utils/generics.ts`.
	 */
	uuid?: string
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
	/** Source: innovatorssoft/baileys — force-attach the `<biz>` binary node (see `secureMetaServiceLabel` on message content) */
	addBizAttributes?: boolean
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

export type WAMessageCursor = { before: WAMessageKey | undefined } | { after: WAMessageKey | undefined }

export type MessageUserReceiptUpdate = { key: WAMessageKey; receipt: MessageUserReceipt }

export type MediaDecryptionKeyInfo = {
	iv: Uint8Array
	cipherKey: Uint8Array
	macKey?: Uint8Array
}

export type MinimalMessage = Pick<WAMessage, 'key' | 'messageTimestamp'>
