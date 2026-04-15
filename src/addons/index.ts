/**
 * @whiskeysockets/baileys — src/addons
 * Queen-Anya structure with WS-patched features merged in
 *
 * Quick reference:
 *   Button sender         → sendButtons, sendInteractiveMessage, sendListMessage ...
 *   Anti-delete           → MessageStore, createAntiDeleteHandler, createMessageStoreHandler
 *   Scheduler             → MessageScheduler, ScheduledMessageStatus, createMessageScheduler
 *   Auto-reply            → AutoReplyHandler, createAutoReply
 *   vCard                 → generateVCard, createContactCard, quickContact
 *   Status                → createTextStatus, createImageStatus, StatusHelper (TextStatusOptions, MediaStatusOptions)
 *   Status mentions       → makeStatusMentionsAddon → sendStatusMentions
 *   Templates             → TemplateManager, renderTemplate, PRESET_TEMPLATES
 *   JID utils             → parseJid, plotJid, JidPlotterWithMapping, createJidPlotter
 *   Message utils         → getMediaType, getMessageType, getButtonType, getButtonArgs
 *   Message WS extras     → buildMentionContextInfo, patchMessageForMdIfRequired,
 *                           prepareAlbumMessageContent, normalizeMediaInput
 *   Socket extras         → makeMessageExtrasAddon → profilePictureUrl, getEphemeralGroup
 *   Message search        → MessageType, RegexSearchOptions, searchMessages,
 *                           searchMessagesRegex, MessageSearchManager, createMessageSearch
 *   Interactive msgs      → generateInteractiveButtonMessage, generateTemplateMessage,
 *                           generateNativeFlowMessage, generateCombinedButtons ...
 *   Call handler          → makeCallHandlerAddon → initiateCall, acceptCall, muteCall ...
 *   Generics extras       → asciiDecode, getPlatformId, printQRIfNecessaryListener
 *   Auth state            → useSingleFileAuthState, useMongoFileAuthState
 *
 *   From src/ re-exports (Anya originals):
 *     from-chats.ts        → chat socket helpers
 *     from-messages-recv.ts → messages-recv helpers
 *     from-messages-send.ts → StatusMentionDeps, normalizeStatusContent, buildStatusMentionNode
 *     from-messages.ts     → message content builders (buttons, stickers, albums...)
 */

// ── Button Sender ──────────────────────────────────────────────────────────
export * from './button-sender'

// ── Anti-Delete ────────────────────────────────────────────────────────────
export * from './anti-delete'

// ── Scheduler ─────────────────────────────────────────────────────────────
export * from './scheduling'

// ── Auto-Reply ────────────────────────────────────────────────────────────
export * from './auto-reply'

// ── vCard / Contact Cards ─────────────────────────────────────────────────
export * from './vcard'

// ── Status Posting + Mentions ─────────────────────────────────────────────
// createTextStatus, createImageStatus, createVideoStatus, createAudioStatus,
// TextStatusOptions, MediaStatusOptions, StatusHelper,
// makeStatusMentionsAddon, StatusMentionContent, StatusMentionsContext
export * from './status-posting'

// ── Message Templates ─────────────────────────────────────────────────────
export * from './templates'

// ── JID Plotting ──────────────────────────────────────────────────────────
export * from './jid-plotting'

// ── Message Utils + WS Extras + Socket Extras ─────────────────────────────
// getMediaType, getMessageType, getButtonType, getButtonArgs
// buildMentionContextInfo, patchMessageForMdIfRequired, normalizeMediaInput
// prepareAlbumMessageContent, makeMessageExtrasAddon
export * from './message-utils'

// ── Message Search ────────────────────────────────────────────────────────
// MessageType, SearchOptions, RegexSearchOptions, SearchResult
// extractMessageText, searchMessages, searchMessagesRegex
// MessageSearchManager, createMessageSearch
export * from './message-search'

// ── Interactive / Button Message Generators ───────────────────────────────
//export * from './interactive-message'

// ── From src/ (Anya originals) ────────────────────────────────────────────
export * from './from-chats'
export * from './from-messages-recv'
export * from './from-messages-send'
export * from './from-messages'

// ── Call Handler (WS-patched) ─────────────────────────────────────────────
export * from './call-handler'

// ── Auth State — re-exported from src/Utils (canonical location) ───────────
//export { useSingleFileAuthState } from '../Utils/use-single-file-auth-state'
//export { useMongoFileAuthState } from '../Utils/use-mongo-file-auth-state'
