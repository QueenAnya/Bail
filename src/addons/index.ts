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
export { useSqliteAuthState } from './auth/use-sqlite-auth-state.js'
export type { SqliteAuthStateOptions, SqliteAuthStateResult } from './auth/use-sqlite-auth-state.js'

export { useSingleFileAuthState } from './auth/use-single-file-auth-state.js'

export { useMongoAuthState } from './auth/use-mongo-auth-state.js'
export type { MongoCollectionLike, MongoAuthStateResult } from './auth/use-mongo-auth-state.js'

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

// ─── LID Support ──────────────────────────────────────────────────────────────
export { splitJidsByType, mergeLidAndPnResults } from './lid-support.js'
export type { OnWhatsAppResult } from './lid-support.js'

// ─── Past Participants ────────────────────────────────────────────────────────
export { processPastParticipants, hasPastParticipants } from './past-participants.js'
export type { GroupPastParticipant, GroupPastParticipantsResult } from './past-participants.js'

// ─── Outgoing Calls ───────────────────────────────────────────────────────────
export { createCallLink, initiateCall, rejectCall, endCall } from './outgoing-calls.js'

// ─── Pairing Fix ──────────────────────────────────────────────────────────────
export { createPairingQueue } from './pairing-fix.js'
export type { PairingQueue, SendPairingIQFn } from './pairing-fix.js'

// ─── Rich Types ───────────────────────────────────────────────────────────────
export { RichSubMessageType as RichSubMessageTypeV3, CodeHighlightType as CodeHighlightTypeV3 } from './rich-types.js'

// ─── Stickerpack ─────────────────────────────────────────────────────────────
export { generateStickerPackId, buildStickerPackProto, STICKER_PACK_MESSAGE_TYPE } from './stickerpack.js'

// ─── Message Scheduler (V2 — functional style) ───────────────────────────────
export {
	attachSchedulerSendFn,
	scheduleMessage,
	scheduleMessageAfter,
	cancelScheduledMessage,
	getScheduledMessage,
	getAllScheduledMessages,
	getPendingScheduledMessages,
	cancelAllScheduledMessages
} from './message-scheduler.js'
export type { ScheduledMessageJob } from './message-scheduler.js'

// ─── Make In-Memory Store (addons version) ───────────────────────────────────
export { makeInMemoryStore as makeInMemoryStoreV3, waChatKey as waChatKeyV3 } from './make-in-memory-store.js'

// ─── Browser Utils (addons version) ──────────────────────────────────────────
export {
	isAndroidBrowser,
	getPlatformId,
	getPlatformDisplayName,
	getCompanionPlatformIdFromName
} from './browser-utils.js'

// ─── JID Plot ─────────────────────────────────────────────────────────────────
export {
	plotJidPair,
	plotJidPairs,
	resolvePnJid,
	resolveLidJid,
	hasLidMapping,
	hasPnMapping,
	getAllJidPlotEntries,
	clearJidPlot,
	normalizeJidForSend
} from './jid-plot.js'
export type { JidPlotEntry } from './jid-plot.js'

// ─── Status Helpers (V2) ──────────────────────────────────────────────────────
export {
	STATUS_BACKGROUNDS as STATUS_BACKGROUNDS_V2,
	STATUS_FONTS as STATUS_FONTS_V2,
	generateStatusMessageId as generateStatusMessageIdV2,
	createTextStatus as createTextStatusV2,
	createImageStatus as createImageStatusV2,
	createVideoStatus as createVideoStatusV2
} from './status-helpers.js'

// ─── Rich Message Composer (V2 — proto-aligned) ───────────────────────────────
export {
	buildRichContextInfo as buildRichContextInfoV2,
	buildBotForwardedMessage as buildBotForwardedMessageV2,
	generateTableContent as generateTableContentV2,
	generateListContent as generateListContentV2,
	generateCodeBlockContent as generateCodeBlockContentV2,
	generateLatexContent as generateLatexContentV2,
	generateLatexImageContent as generateLatexImageContentV2,
	generateLatexInlineImageContent as generateLatexInlineImageContentV2,
	captureUnifiedResponse as captureUnifiedResponseV2
} from './rich-message-composer.js'
export type {
	RichLatexExpression,
	RichTableOptions,
	RichCodeOptions,
	RichLatexOptions,
	WAMessageLike
} from './rich-message-composer.js'

// ─── Rich Message Utils (V2) ──────────────────────────────────────────────────
export {
	tokenizeCode as tokenizeCodeV3,
	toUnified as toUnifiedV2,
	prepareRichResponseMessage as prepareRichResponseMessageV3,
	botMetadataSignature as botMetadataSignatureV2,
	botMetadataCertificate as botMetadataCertificateV2,
	wrapToBotForwardedMessage as wrapToBotForwardedMessageV3
} from './rich-message-utils.js'

// ─── Auth States (flat structure) ─────────────────────────────────────────────
export { useSqliteAuthState as useSqliteAuthStateFlat } from './use-sqlite-auth-state.js'
export { useSingleFileAuthState as useSingleFileAuthStateFlat } from './use-single-file-auth-state.js'
export { useMongoAuthState as useMongoAuthStateFlat } from './use-mongo-auth-state.js'
export { useCacheManagerAuthState } from './use-cache-manager-auth-state.js'
