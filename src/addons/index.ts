/**
 * Baileys Addons — Barrel Export
 *
 * Import anything from `'@whiskeysockets/baileys/addons'` (or a relative path
 * to this file) to access all addon utilities without deep import paths.
 *
 * @example
 * import {
 *     generateInteractiveButtonMessage,
 *     generateCarouselMessage,
 *     prepareRichResponseMessage,
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
	generateInteractiveButtonMessage,
	generateInteractiveListMessage,
	generateTemplateMessage,
	generateNativeFlowMessage,
	generateCopyCodeButton,
	generateUrlButtonMessage,
	generateQuickReplyButtons,
	generateCombinedButtons,
	generateCarouselMessage,
	generateShopMessage,
	generateCollectionMessage
} from './interactive-message.js'

export type {
	ButtonDef,
	ButtonHeaderType,
	InteractiveButtonMessageOptions,
	ListSection,
	InteractiveListMessageOptions,
	TemplateButtonDef,
	TemplateMessageOptions,
	NativeFlowButton,
	NativeFlowOptions,
	UrlButtonDef,
	QuickReplyButtonDef,
	CombinedButtonDef,
	CarouselCard,
	CarouselMessageOptions
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

export type { TextStatusOptions, MediaStatusOptions, StatusFont, StatusBackground } from './status-posting.js'

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
