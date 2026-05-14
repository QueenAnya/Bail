import type { Readable } from 'stream'
import type { URL } from 'url'
import type { MediaType } from '../Defaults'
import type { BinaryNode } from '../WABinary'
import type { GroupMetadata } from './GroupMetadata'
import type { CacheStore } from './Socket'
import { proto } from '../../WAProto/index.js'

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
import type { ILogger } from '../Utils/logger'
export type WAMediaPayloadURL = { url: URL | string }
export type WAMediaPayloadStream = { stream: Readable }
export type WAMediaUpload = Buffer | WAMediaPayloadStream | WAMediaPayloadURL

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

/** Set of message types that are supported by the library */
export type MessageType = keyof proto.Message

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

/** Send image/video at HD quality */
type HDable = {
	hd?: boolean
}

/** Attach classic buttons (up to 3) to a text or media message */
type Buttonable = {
	buttons?: proto.Message.ButtonsMessage.IButton[]
}

/** Attach template buttons (quickReply / url / call) to a message */
type Templatable = {
	templateButtons?: proto.IHydratedTemplateButton[]
	footer?: string
}

/** Attach native-flow interactive buttons to a message */
type Interactiveable = {
	interactiveButtons?: proto.Message.InteractiveMessage.NativeFlowMessage.INativeFlowButton[]
	title?: string
	subtitle?: string
	footer?: string
	hasMediaAttachment?: boolean
}

/** Attach a single-select list to a text message */
type Listable = {
	sections?: proto.Message.ListMessage.ISection[]
	/** Title shown above the list */
	title?: string
	/** Label on the button that opens the list (required) */
	buttonText?: string
	footer?: string
}

/** Attach a WhatsApp Shop storefront to a message */
type Shopable = {
	shop?: proto.Message.InteractiveMessage.IShopMessage
	title?: string
	subtitle?: string
	footer?: string
	hasMediaAttachment?: boolean
}

/** Attach a WhatsApp Collection to a message */
type Collectionable = {
	collection?: proto.Message.InteractiveMessage.ICollectionMessage
	title?: string
	subtitle?: string
	footer?: string
	hasMediaAttachment?: boolean
}

/** Attach a carousel of cards to a message */
type Cardsable = {
	cards?: Carousel[]
	title?: string
	subtitle?: string
	footer?: string
}

export type PollMessageOptions = {
	name: string
	selectableCount?: number
	values: string[]
	/** 32 byte message secret to encrypt poll selections */
	messageSecret?: Uint8Array
	toAnnouncementGroup?: boolean
	/**
	 * Poll content type — used for newsletter polls meta node.
	 * 1 = TEXT (default), 2 = IMAGE
	 */
	pollContentType?: 1 | 2
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
			Buttonable &
			Templatable &
			Interactiveable &
			Shopable &
			Collectionable &
			HDable &
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
	/** for type:'list' replies */
	title?: string
	description?: string
	rowId?: string
	/** for type:'interactive' native-flow replies */
	nativeFlows?: {
		name?: string
		paramsJson?: string
		version?: number
	}
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

/** One card / slide in a carousel message */
export type Carousel = {
	image?: WAMediaUpload
	video?: WAMediaUpload
	document?: WAMediaUpload
	mimetype?: string
	fileName?: string
	product?: WASendableProduct
	title?: string
	body?: string
	footer?: string
	buttons?: proto.Message.InteractiveMessage.NativeFlowMessage.INativeFlowButton[]
}

export type ProductListEntry = {
	productId: string
}

export type StickerPackSticker = {
	sticker: WAMediaUpload
	emojis?: string[]
	accessibilityLabel?: string
	isAnimated?: boolean
	isLottie?: boolean
}

export type ProductListSection = {
	title: string
	products: ProductListEntry[]
}

export type AdminInviteInfo = {
	jid: string
	name: string
	caption?: string
	expiration?: number
}

export type CallCreationInfo = {
	name?: string
	time?: number
	type?: number
}

export type PaymentInviteInfo = {
	type?: number
	expiry?: number
}

export type AnyRegularMessageContent = (
	| ({
			text: string
			linkPreview?: WAUrlInfo | null
	  } & Mentionable &
			Contextable &
			Buttonable &
			Templatable &
			Interactiveable &
			Shopable &
			Collectionable &
			Cardsable &
			Listable &
			HDable &
			Editable)
	| AnyMediaMessageContent
	| { event: EventMessageOptions }
	| ({
			poll: PollMessageOptions
	  } & Mentionable &
			Contextable &
			Buttonable &
			Templatable &
			Interactiveable &
			Shopable &
			Collectionable &
			Cardsable &
			Listable &
			HDable &
			Editable)
	| {
			stickerPack: StickerPack
	  }
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
			type: 'template' | 'plain' | 'list' | 'interactive'
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
			/** attach interactive buttons to a product message */
			interactiveButtons?: proto.Message.InteractiveMessage.NativeFlowMessage.INativeFlowButton[]
			title?: string
			subtitle?: string
			hasMediaAttachment?: boolean
	  }
	| {
			/** productList — renders as a List Message with products */
			productList: ProductListSection[]
			text?: string
			title?: string
			buttonText?: string
			footer?: string
			businessOwnerJid?: string
			thumbnail?: WAMediaUpload | string
	  }
	| SharePhoneNumber
	| RequestPhoneNumber
	| { adminInvite: AdminInviteInfo }
	| { call: CallCreationInfo }
	| { paymentInvite: PaymentInviteInfo }
) &
	ViewOnce

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
	| {
			/**
			 * Send as a group status (story visible to group members).
			 * Set to `true` to wrap the message in groupStatusMessageV2.
			 * The jid should be a group JID (e.g. `120363xxxxxxxx@g.us`).
			 * @example
			 * await sock.sendMessage('120363xxx@g.us', { text: 'Hello group!', groupStatus: true })
			 */
			groupStatus: boolean
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
	 * Optional identifier added as key.uuid on the returned WAMessage.
	 * Value = (content.uuid || options.uuid || 'qa3#69') + random chars, total exactly 11 chars.
	 * The key.id field is NOT modified — it stays as standard '4NY4W3B...' format.
	 *
	 * @example
	 * sock.sendMessage(jid, { text: 'Hi' }, { uuid: 'text' })
	 * // → key.id   = '4NY4W3B118751AAD4EDF59842'  (unchanged)
	 * // → key.uuid = 'textA3K9Z2M' (11 chars)
	 *
	 * sock.sendMessage(jid, { text: 'Hi' })
	 * // → key.uuid = 'qa3#69A3K9Z' (11 chars, default)
	 */
	uuid?: string
}
export type MessageGenerationOptionsFromContent = MiscMessageGenerationOptions & {
	userJid: string
}

export type WAMediaUploadFunctionOpts = {
	fileEncSha256B64: string
	mediaType: MediaType
	newsletter?: boolean
	timeoutMs?: number
}

export type WAMediaUploadFunction = (
	encFilePath: string,
	opts: WAMediaUploadFunctionOpts
) => Promise<{
	mediaUrl: string
	directPath: string
	thumbnailDirectPath?: string
	thumbnailSha256?: string
	handle?: string
	meta_hmac?: string
	ts?: number
	fbid?: number
}>

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

// ── Proto enum aliases ────────────────────────────────────────────────────────
export const AssociationType = proto.MessageAssociation.AssociationType
export const ButtonHeaderType = proto.Message.ButtonsMessage.HeaderType
export const ButtonType = proto.Message.ButtonsMessage.Button.Type
export const CarouselCardType = proto.Message.InteractiveMessage.CarouselMessage.CarouselCardType
export const ListType = proto.Message.ListMessage.ListType
export const ProtocolType = proto.Message.ProtocolMessage.Type
export const WAMessageStubType = proto.WebMessageInfo.StubType
export const WAMessageStatus = proto.WebMessageInfo.Status

export enum WAMessageAddressingMode {
	PN = 'pn',
	LID = 'lid'
}
