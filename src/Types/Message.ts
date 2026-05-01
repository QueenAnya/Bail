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
	participantAlt?: string
	server_id?: string
	addressingMode?: string
	isViewOnce?: boolean // TODO: remove out of the message key, place in WebMessageInfo
	remoteJidUsername?: string
	participantUsername?: string
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

type WithDimensions = {
	width?: number
	height?: number
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

export type PaymentInviteInfo = {
	type?: number
	expiry?: number
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
 * Individual sticker within a sticker pack (V1 style)
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
 * Individual sticker within a sticker pack (V2 style)
 */
export type StickerPackSticker = {
	sticker: WAMediaUpload
	emojis?: string[]
	accessibilityLabel?: string
	isAnimated?: boolean
	isLottie?: boolean
}

/**
 * Full sticker pack definition (Merged V1/V2)
 */
export type StickerPack = {
	/** All stickers in the pack (V1 uses Sticker[], V2 uses StickerPackSticker[]) */
	stickers: StickerPackSticker[] | Sticker[]
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

export type StickerPack = {
	/** All stickers in the pack (V1 uses Sticker[], V2 uses StickerPackSticker[]) */
	stickers: StickerPackSticker[] | Sticker[]
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
			Buttonable &
			Templatable &
			Interactiveable &
			Shopable &
			Collectionable &
			HDable &
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
	  } & Contextable &
			Buttonable &
			Templatable &
			Interactiveable &
			Shopable &
			Collectionable)
) & { mimetype?: string } & Editable & {
		/** key of the parent albumMessage to associate this media with */
		albumParentKey?: WAMessageKey
	}

/** Info for replying to a button */
export type ButtonReplyInfo = {
	displayText?: string
	id?: string
	index?: number
	// list reply fields
	title?: string
	description?: string
	rowId?: string
	// interactive (native flow) reply fields
	nativeFlows?: {
		name: string
		paramsJson: string
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

/** Product entry for productList messages */
export type ProductListEntry = {
	productId: string
}

export type ProductListSection = {
	title: string
	products: ProductListEntry[]
}

export type StickerPackSticker = {
	sticker: WAMediaUpload
	emojis?: string[]
	accessibilityLabel?: string
	isAnimated?: boolean
	isLottie?: boolean
}

export type StickerPack = {
	stickers: StickerPackSticker[]
	cover: WAMediaUpload
	name: string
	publisher: string
	description?: string
	packId?: string
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
			Editable)
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
	| ({
			album: AlbumMessageOptions
	  } & Contextable &
			Mentionable)
	| { stickerPack: StickerPack }
	| { adminInvite: AdminInviteInfo }
	| { call: CallCreationInfo }
	| { paymentInvite: PaymentInviteInfo }
	| {
			richResponse: {
				text: string
				code?: string
				language?: string
				botJid?: string
			}
	  }
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
	/** if the message is for a newsletter */
	newsletter?: boolean
	/** additional binary nodes to attach to the message */
	additionalNodes?: BinaryNode[]
	/** if true, show AI icon on the message bubble */
	ai?: boolean
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
