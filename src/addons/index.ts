/**
 * src/addons/index.ts
 * Barrel export for all anya-bail addons.
 *
 * All features ported from @innovatorssoft/baileys that are not present
 * in upstream WhiskeySockets/Baileys are exported from here.
 *
 * Import example:
 *   import {
 *     generateNativeFlowMessage,
 *     generateQuickReplyButtons,
 *     useSingleFileAuthState,
 *     useMongoAuthState,
 *     makeCallSocket,
 *     ExtendedBrowsers,
 *   } from '@anya/baileys/addons'
 */

// ── Interactive / Button messages ─────────────────────────────────────────────
export {
	generateInteractiveButtonMessage,
	generateInteractiveListMessage,
	generateTemplateMessage,
	generateNativeFlowMessage,
	generateCopyCodeButton,
	generateUrlButtonMessage,
	generateQuickReplyButtons,
	generateCombinedButtons
} from './interactive-message.js'

export type {
	NativeFlowButton,
	NativeFlowOptions,
	ButtonItem,
	InteractiveButtonContent,
	InteractiveListRow,
	InteractiveListSection,
	InteractiveListContent,
	TemplateButton,
	TemplateMessageContent,
	CombinedButton
} from './interactive-message.js'

// ── Rich Response (Meta AI) messages ─────────────────────────────────────────
export {
	CodeHighlightType,
	RichSubMessageType,
	tokenizeCode,
	buildRichContextInfo,
	buildBotForwardedMessage,
	generateTableContent,
	generateListContent,
	generateCodeBlockContent,
	generateLatexContent,
	generateLatexImageContent,
	generateLatexInlineImageContent,
	captureUnifiedResponse,
	generateUnifiedResponseContent,
	generateRichMessageContent
} from './message-composer.js'

export type { CapturedUnifiedResponse } from './message-composer.js'

// ── Outgoing Call API ─────────────────────────────────────────────────────────
export { makeCallSocket } from './calls.js'
export type { CallOfferCacheEntry, InitiateCallOptions, RelayInfo, CallsSocketPrimitives } from './calls.js'

// ── Auth State ────────────────────────────────────────────────────────────────
export { useSingleFileAuthState } from './use-single-file-auth-state.js'
export type { SingleFileAuthStateResult } from './use-single-file-auth-state.js'

export { useMongoAuthState } from './use-mongo-auth-state.js'
export type { MongoCollection, MongoAuthStateResult } from './use-mongo-auth-state.js'

// ── MEX Notification constants ────────────────────────────────────────────────
export { MexOperations, MexUpdatesOperations, XWAPathsMexUpdates } from './mex-updates.js'
export type { MexOperation, MexUpdatesOperation } from './mex-updates.js'

// ── Browser Presets (iOS / Android) ──────────────────────────────────────────
export { ExtendedBrowsers, IOS_BROWSER_PRESET, ANDROID_BROWSER_PRESET } from './browser-presets.js'
export type { BrowserTuple, BrowserFactory } from './browser-presets.js'

// ── Unavailable message resend ────────────────────────────────────────────────
export { makeUnavailableResendHandler } from './unavailable-resend.js'
export type { PlaceholderResendCache, UnavailableResendPrimitives } from './unavailable-resend.js'

// ── Album message helper ──────────────────────────────────────────────────────
export { prepareAlbumMessageContent } from './album-message.js'
export type { AlbumItem, AlbumMessageHelperOptions } from './album-message.js'
