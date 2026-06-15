/**
 * Baileys Addons — Barrel Export
 *
 * Import anything from `'@whiskeysockets/baileys/addons'` (or a relative path
 * to this file) to access all addon utilities without deep import paths.
 *
 * @example
 * import {
 *     generateInteractiveButtonMessage,
 *      *     prepareRichResponseMessage,
 *     sendTable,
 *     MessageStore,
 *     createAntiDeleteHandler,
 *     AutoReplyHandler,
 *     MessageScheduler,
 *     createMessageSearch,
 *     generateVCard,
 *     StatusHelper,
 *     createTypingIndicator,
 *     PinnedMessagesManager,
 *     createTemplateManager,
 *     parseJid,
 *     createJidPlotter,
 *     useSqliteAuthState,
 *     useSingleFileAuthState,
 *     useMongoAuthState
 * } from './addons/index.js'
 */

// ─── Interactive / Button / Template / List / Carousel Messages ───────────────
export {
	ButtonHeaderType,
	ButtonType,
	CarouselCardType,
	ListType,
	buildNativeFlowMessage,
	hasValidInteractiveHeader,
	hasValidCarouselHeader,
	generateInteractiveButtonMessage,
	generateInteractiveListMessage,
	generateTemplateMessage,
	generateNativeFlowMessage,
	generateCopyCodeButton,
	generateUrlButtonMessage,
	generateQuickReplyButtons,
	generateCombinedButtons,
	generateCollectionMessage,
	generateShopMessage,
	generatePayButtonMessage,
	generatePixButtonMessage
} from './interactive-message.js'

export type {
	QuickReplyButton,
	UrlButton,
	CallButton,
	CopyButton,
	ListSection,
	InteractiveListContent,
	InteractiveButtonsContent,
	TemplateButtonEntry,
	TemplateContent,
	NativeFlowButton,
	NativeFlowOptions
} from './interactive-message.js'

// ─── Rich Response / Meta AI Messages ────────────────────────────────────────
export {
	tokenizeCode,
	toUnified,
	botMetadataSignature,
	botMetadataCertificate,
	wrapToBotForwardedMessage,
	prepareRichResponseMessage,
	sendTable,
	sendList,
	sendCodeBlock,
	sendLatex,
	sendLatexImage,
	sendLatexInlineImage,
	sendRichMessage,
	captureUnifiedResponse,
	sendUnifiedResponse
} from './rich-message.js'

export type {
	CodeBlock,
	RichSubMessage,
	LatexExpression,
	RichContent,
	CapturedUnifiedResponse
} from './rich-message.js'

// ─── Anti-Delete / Message Store ─────────────────────────────────────────────
export {
	MessageStore,
	isDeleteMessage,
	getDeletedMessageKey,
	createAntiDeleteHandler,
	createMessageStoreHandler
} from './anti-delete.js'

export type { MessageStoreOptions, DeletedMessageInfo } from './anti-delete.js'

// ─── Auto-Reply ───────────────────────────────────────────────────────────────
export { AutoReplyHandler, createAutoReply } from './auto-reply.js'

export type { AutoReplyRule, AutoReplyOptions } from './auto-reply.js'

// ─── Message Scheduler ────────────────────────────────────────────────────────
export { MessageScheduler, createMessageScheduler } from './scheduling.js'

export type { ScheduledMessage, SchedulerOptions } from './scheduling.js'

// ─── Message Search ───────────────────────────────────────────────────────────
export {
	extractMessageText,
	searchMessages,
	searchMessagesRegex,
	MessageSearchManager,
	createMessageSearch
} from './message-search.js'

export type { MessageType, SearchOptions, SearchResult } from './message-search.js'

// ─── vCard / Contact Cards ────────────────────────────────────────────────────
export {
	generateVCard,
	generateVCards,
	parseVCard,
	createContactCard,
	createContactCards,
	quickContact
} from './vcard.js'

export type { VCardPhone, VCardEmail, VCardUrl, VCardAddress, VCardContact } from './vcard.js'

// ─── Status / Story Helpers ───────────────────────────────────────────────────
export {
	STATUS_BROADCAST_JID,
	STATUS_BACKGROUNDS,
	STATUS_FONTS,
	generateStatusMessageId,
	createTextStatus,
	createImageStatus,
	createVideoStatus,
	createAudioStatus,
	StatusHelper
} from './status-posting.js'

export type { TextStatusOptions, MediaStatusOptions, StatusFont } from './status-posting.js'

// ─── Chat Control ─────────────────────────────────────────────────────────────
export {
	DISAPPEARING_DURATIONS,
	TypingIndicator,
	createTypingIndicator,
	PinnedMessagesManager,
	createPinnedMessagesManager,
	createReadReceiptController
} from './chat-control.js'

export type { DisappearingDuration, PinnedMessage, ReadReceiptConfig, ReadReceiptController } from './chat-control.js'

// ─── Message Templates ────────────────────────────────────────────────────────
export { TemplateManager, PRESET_TEMPLATES, createTemplateManager, renderTemplate } from './templates.js'

export type {
	TemplateVariable,
	Template,
	TemplateCreateOptions,
	TemplateUpdateOptions,
	TemplateValidationResult
} from './templates.js'

// ─── JID Plotting & LID/PN Support ───────────────────────────────────────────
export {
	parseJid,
	getSenderPn,
	getCurrentSenderInfo,
	isSelf,
	plotJid,
	normalizePhoneToJid,
	extractPhoneNumber,
	formatJidDisplay,
	isSameUser,
	getJidVariants,
	constructJidWithDevice,
	getRemoteJidFromMessage,
	createJidPlotter
} from './jid-plotting.js'

export type {
	ParsedJid,
	SenderPnInfo,
	PlottedJid,
	JidFormatOptions,
	RemoteJidInfo,
	JidPlotter
} from './jid-plotting.js'

// ─── Auth State Adapters ──────────────────────────────────────────────────────
export { useSqliteAuthState } from './use-sqlite-auth-state.js'
export type { SqliteAuthStateOptions, SqliteAuthStateResult } from './use-sqlite-auth-state.js'

export { useSingleFileAuthState } from './use-single-file-auth-state.js'

export { useMongoAuthState } from './use-mongo-auth-state.js'
export type { MongoCollectionLike, MongoAuthStateResult } from './use-mongo-auth-state.js'

// ─── Re-export shared enums used by addons ────────────────────────────────────
export { CodeHighlightType, RichSubMessageType } from '../Types/RichType.js'

// ─── Baileys Event Stream ────────────────────────────────────────────────────
export { captureEventStream, readAndEmitEventStream } from './baileys-event-stream.js'

// ─── In-Memory Store ─────────────────────────────────────────────────────────
export {
	makeInMemoryStore,
	waChatKey,
	waMessageID,
	waLabelAssociationKey,
	makeOrderedDictionary,
	ObjectRepository
} from '../Store/index.js'
export type { BaileysInMemoryStoreConfig } from '../Store/index.js'

// ─── Panorama Profile Picture ─────────────────────────────────────────────────
export { generatePanoramaProfilePicture } from '../Utils/messages-media.js'

// ─── Button Sender ────────────────────────────────────────────────────────────
export { getButtonType, getButtonArgs, InteractiveValidationError } from './button-sender.js'
export type {
	NativeSendButton,
	LegacySendButton,
	OldBaileysSendButton,
	AnyRawButton,
	SendButtonsData,
	SendInteractiveData,
	ValidationResult,
	ButtonSenderSocket
} from './button-sender.js'

// ─── Call Handler ─────────────────────────────────────────────────────────────
export { makeCallHandlerAddon } from './call-handler.js'
export type { CallHandlerContext, RelayEntry, CallTransportCandidate } from './call-handler.js'

// ─── From-Chats ───────────────────────────────────────────────────────────────
export { buildClearMessageModification, createChatHelpers } from './from-chats.js'

// ─── From-Messages-Recv (Call Handlers Factory) ───────────────────────────────
export { makeCallHandlers } from './from-messages-recv.js'
export type { CallHandlerDeps } from './from-messages-recv.js'

// ─── From-Messages-Send (Status Mentions) ────────────────────────────────────
export { normalizeStatusContent, buildStatusMentionNode, execSendStatusMentions } from './from-messages-send.js'
export type { StatusMentionDeps } from './from-messages-send.js'

// ─── From-Messages (Message Builders) ────────────────────────────────────────
export {
	buildAdminInviteMessage,
	buildCallMessage,
	buildPaymentInviteMessage,
	buildStickerPackMessage,
	isWebPBuffer,
	isAnimatedWebP,
	isLottieBuffer
} from './from-messages.js'

// ─── Message Utils ────────────────────────────────────────────────────────────
export {
	getMediaType,
	getMessageType,
	buildMentionContextInfo,
	extractFromButtonsMessage,
	normalizeMediaInput,
	patchMessageForMdIfRequired,
	prepareAlbumMessageContent,
	makeMessageExtrasAddon
} from './message-utils.js'
export type { MentionContent, AlbumMediaItem, AlbumOptions, MessageExtrasContext } from './message-utils.js'

// ─── Interactive Message Types (Utils/interactive-message.ts) ────────────────
export type {
	InteractiveButton,
	InteractiveButtonMessageContent,
	ListRow,
	ListSection as InteractiveListSection,
	InteractiveListMessageContent,
	TemplateHydratedButton,
	TemplateMessageContent,
	NativeFlowButton as InteractiveNativeFlowButton,
	NativeFlowOptions as InteractiveNativeFlowOptions,
	CopyCodeButtonOptions,
	UrlButton as InteractiveUrlButton,
	UrlButtonOptions,
	QuickReplyButton as InteractiveQuickReplyButton,
	QuickReplyOptions,
	CombinedButton
} from '../Utils/interactive-message.js'

// ─── Message Composer (Rich Message Content Generators) ───────────────────────
export {
	JS_KEYWORDS as JS_KEYWORDS_V2,
	PYTHON_KEYWORDS as PYTHON_KEYWORDS_V2,
	LANGUAGE_KEYWORDS as LANGUAGE_KEYWORDS_V2,
	tokenizeCode as tokenizeCodeV2,
	buildRichContextInfo,
	buildBotForwardedMessage,
	generateTableContent,
	generateListContent,
	generateCodeBlockContent,
	generateLatexContent,
	generateLatexImageContent,
	generateLatexInlineImageContent,
	captureUnifiedResponse as captureUnifiedResponseFromComposer,
	generateUnifiedResponseContent,
	generateRichMessageContent,
	generateInlineEntityMessage,
	buildCitationMessage
} from './message-composer.js'
export type {
	CodeBlockToken,
	LatexExpression as LatexExpressionComposer,
	RichContextInfo,
	InlineEntity
} from './message-composer.js'

// ─── Rich Response (newer API from rc13-final) ────────────────────────────────
export {
	RichSubMessageType as RichSubMessageTypeV2,
	toUnifiedResponse,
	wrapToBotForwardedMessage as wrapToBotForwardedMessageV2,
	prepareRichResponseMessage as prepareRichResponseMessageV2
} from './rich-response.js'
export type {
	RichTextSubmessage,
	RichCodeSubmessage,
	RichTableSubmessage,
	RichLatexSubmessage,
	RichReelItem,
	RichContentItemsSubmessage,
	RichSubmessage,
	RichResponseInput
} from './rich-response.js'

// ─── QR Terminal ──────────────────────────────────────────────────────────────
export { printQRIfNecessaryListener } from '../Utils/generics.js'

// ─── New Utils ────────────────────────────────────────────────────────────────
export { makeLockManager } from '../Utils/lock-manager.js'
export type { LockRef } from '../Utils/lock-manager.js'
export { migrateAuthState } from '../Utils/migrate-auth-state.js'
export type { MigrateAuthStateOptions, MigrateAuthStateResult } from '../Utils/migrate-auth-state.js'
export { generateAnyaMessageID, runDetached, generateKeyUuid } from '../Utils/generics.js'
