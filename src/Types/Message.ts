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

export type KeepMessageOptions = {
	/** The message key to keep */
	key: proto.IMessageKey
	/** Keep duration in seconds (86400 = 24h, 604800 = 7d, 0 = unkeep) */
	keepDurationSeconds?: number
}

export type ButtonContent = {
	/** Button display text */
	displayText: string
	/** Button ID */
	id: string
	/** Button type */
	type?: 'reply' | 'url' | 'call' | 'copy'
	/** URL for url-type buttons */
	url?: string
	/** Phone number for call-type buttons */
	phoneNumber?: string
	/** Text to copy for copy-type buttons */
	copyCode?: string
}

export type ButtonsMessageOptions = {
	/** Message body text */
	text: string
	/** Footer text */
	footer?: string
	/** Header text */
	headerText?: string
	/** Buttons to display */
	buttons: ButtonContent[]
	/** Header type: text | image | video | document */
	headerType?: 'text' | 'image' | 'video' | 'document'
	/** Media for header */
	headerMedia?: WAMediaUpload
}

export type ListMessageSection = {
	title: string
	rows: {
		title: string
		rowId: string
		description?: string
	}[]
}

export type ListMessageOptions = {
	text: string
	footer?: string
	title?: string
	buttonText: string
	sections: ListMessageSection[]
}

export type TemplateButtonContent =
	| { index: number; urlButton: { displayText: string; url: string } }
	| { index: number; callButton: { displayText: string; phoneNumber: string } }
	| { index: number; quickReplyButton: { displayText: string; id: string } }

export type TemplateMessageOptions = {
	text: string
	footer?: string
	templateButtons: TemplateButtonContent[]
	/** Optional header: text, image, video, document */
	header?: string
	headerMedia?: WAMediaUpload
}

export type InteractiveButton =
	| { type: 'reply'; displayText: string; id: string }
	| { type: 'url'; displayText: string; url: string; merchantUrl?: string }
	| { type: 'cta_call'; displayText: string; phoneNumber: string }
	| { type: 'cta_copy'; displayText: string; copyCode: string }

export type CarouselCard = {
	body: string
	footer?: string
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	buttons: InteractiveButton[]
}

export type InteractiveMessageOptions = {
	body: string
	footer?: string
	/** Header options */
	header?: {
		title?: string
		subtitle?: string
		hasMediaAttachment?: boolean
	}
	/** Buttons (for native-flow / button-list style) */
	buttons?: InteractiveButton[]
	/** Carousel cards */
	cards?: CarouselCard[]
	/** Products list */
	shop?: {
		id: string
		thumbnail?: WAMediaUpload
		title?: string
	}
}

export type InteractiveMessagePIXOptions = InteractiveMessageOptions & {
	/** PIX payment key */
	pixKey: string
	/** Payment amount in cents */
	amount: number
	/** Merchant name */
	merchantName: string
}

export type InteractiveMessagePAYOptions = InteractiveMessageOptions & {
	/** Payment amount */
	amount: number
	/** Currency code, e.g. "BRL" */
	currency: string
	/** Reference ID */
	referenceId?: string
	/** Payment note */
	note?: string
}

export type PaymentMessageOptions = {
	/** Amount in smallest currency unit (e.g. cents) */
	amount: number
	/** Currency code (e.g. "USD", "BRL") */
	currency: string
	/** Note/memo for the payment */
	note?: string
	/** Receiver JID */
	receiverJid: string
	/** Request or send */
	type?: 'request' | 'send'
	/** Background color (hex) */
	backgroundColor?: string
}

export type PaymentInviteMessageOptions = {
	/** Type of payment service */
	serviceType: 'UNKNOWN' | 'FACEBOOK_PAY' | 'NOVI' | 'UPI' | 'PAYTM' | 'BR_GPY' | 'BR_PIX'
	/** Expiry timestamp (ms since epoch) */
	expiryTimestamp?: number
}

export type OrderMessageOptions = {
	/** Order ID */
	orderId: string
	/** Thumbnail image of an order item */
	thumbnail?: WAMediaUpload
	/** Item count */
	itemCount: number
	/** Order status */
	status?: 'INQUIRY' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED' | 'CANCELED'
	/** Surface (e.g. 1 = catalog, 2 = message) */
	surface?: number
	/** Message associated with the order */
	message?: string
	/** Order title */
	title?: string
	/** Seller JID */
	sellerJid?: string
	/** Token */
	token?: string
}

/**
 * Individual sticker within a sticker pack
 * Source: Baileys-feat-add-stickerpack-support
 */
export type Sticker = {
	/** Sticker media source */
	data: WAMediaUpload
	/** Emoji tags for this sticker */
	emojis?: string[]
	/** Accessibility label */
	accessibilityLabel?: string
}

/**
 * Full sticker pack definition
 * Source: Baileys-feat-add-stickerpack-support
 */
export type StickerPack = {
	/** All stickers in the pack */
	stickers: Sticker[]
	/** Cover sticker shown in the tray */
	cover: WAMediaUpload
	/** Display name of the pack */
	name: string
	/** Publisher name */
	publisher: string
	/** Optional description */
	description?: string
	/** Pack ID — auto-generated if not provided */
	packId?: string
}

export type StickerPackMessageOptions = {
	/** Pack name */
	packName: string
	/** Pack publisher */
	publisher?: string
	/** Pack ID */
	packId?: string
	/** Sticker count */
	stickerCount?: number
}

export type StatusMentionOptions = {
	/** Status JIDs to mention */
	statusJidList: string[]
	/** Text to accompany */
	text: string
	/** Background color */
	backgroundColor?: string
	/** Font */
	font?: number
}

export type ShopMessageOptions = {
	/** Surface: 1=unknown, 2=catalog */
	surface?: number
	/** Message */
	message?: string
}

export type CollectionMessageOptions = {
	/** Business JID owning the collection */
	bizJid: string
	/** Collection ID */
	id: string
	/** Message version */
	messageVersion?: number
}

export type RichTextTable = {
	/** Table data rows (first row = header if headerRow=true) */
	rows: string[][]
	/** Whether first row is a header */
	headerRow?: boolean
	/** Optional title */
	title?: string
}

export type RichTextList = {
	/** List items */
	items: string[]
	/** Ordered (numbered) list */
	ordered?: boolean
	/** Optional title */
	title?: string
}

export type CodeBlockOptions = {
	/** Code string */
	code: string
	/** Language hint */
	language?: string
}

export type LatexOptions = {
	/** LaTeX expression */
	expression: string
}

export type RichMessageOptions = {
	/** Rich text content parts */
	parts: (
		| { type: 'text'; text: string }
		| { type: 'table'; table: RichTextTable }
		| { type: 'list'; list: RichTextList }
		| { type: 'code'; code: CodeBlockOptions }
		| { type: 'latex'; latex: LatexOptions }
	)[]
	/** Optional caption */
	caption?: string
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
	| { keep: KeepMessageOptions }
	| { order: OrderMessageOptions }
	| { payment: PaymentMessageOptions }
	| { paymentInvite: PaymentInviteMessageOptions }
	| { adminInvite: { groupJid: string; inviteCode: string; inviteExpiration?: number; caption?: string } }
	| { stickerPack: StickerPackMessageOptions }
	| { richStickerPack: StickerPack }
	| { buttons: ButtonsMessageOptions }
	| { list: ListMessageOptions }
	| { template: TemplateMessageOptions }
	| { interactive: InteractiveMessageOptions }
	| { interactivePIX: InteractiveMessagePIXOptions }
	| { interactivePAY: InteractiveMessagePAYOptions }
	| { statusMention: StatusMentionOptions }
	| { shop: ShopMessageOptions }
	| { collection: CollectionMessageOptions }
	| { hdImage: WAMediaUpload; caption?: string; mimetype?: string }
	| { hdVideo: WAMediaUpload; caption?: string; mimetype?: string }
	| { callMessage: proto.Message.IScheduledCallCreationMessage }
	| { pollResult: proto.Message.IPollResultSnapshotMessage }
	| { richMessage: RichMessageOptions }
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
