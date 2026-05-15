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
export * from './button-sender.js'

// ── Anti-Delete ────────────────────────────────────────────────────────────
export * from './anti-delete.js'

// ── Scheduler ─────────────────────────────────────────────────────────────
export * from './scheduling.js'

// ── Auto-Reply ────────────────────────────────────────────────────────────
export * from './auto-reply.js'

// ── vCard / Contact Cards ─────────────────────────────────────────────────
export * from './vcard.js'

// ── Status Posting + Mentions ─────────────────────────────────────────────
// createTextStatus, createImageStatus, createVideoStatus, createAudioStatus,
// TextStatusOptions, MediaStatusOptions, StatusHelper,
// makeStatusMentionsAddon, StatusMentionContent, StatusMentionsContext
export * from './status-posting.js'

// ── Message Templates ─────────────────────────────────────────────────────
export * from './templates.js'

// ── JID Plotting ──────────────────────────────────────────────────────────
export * from './jid-plotting.js'

// ── Message Utils + WS Extras + Socket Extras ─────────────────────────────
// getMediaType, getMessageType, getButtonType, getButtonArgs
// buildMentionContextInfo, patchMessageForMdIfRequired, normalizeMediaInput
// prepareAlbumMessageContent, makeMessageExtrasAddon
export * from './message-utils.js'

// ── Message Search ────────────────────────────────────────────────────────
// MessageType, SearchOptions, RegexSearchOptions, SearchResult
// extractMessageText, searchMessages, searchMessagesRegex
// MessageSearchManager, createMessageSearch
export * from './message-search.js'

// ── Interactive / Button Message Generators ───────────────────────────────
//export * from './interactive-message.js'

// ── From src/ (Anya originals) ────────────────────────────────────────────
export * from './from-chats.js'
export * from './from-messages-recv.js'
export * from './from-messages-send.js'
export * from './from-messages.js'

// ── Call Handler (WS-patched) ─────────────────────────────────────────────
export * from './call-handler.js'

// ── Auth State — re-exported from src/Utils (canonical location) ───────────
export { useSingleFileAuthState } from '../Utils/use-single-file-auth-state'
export { useMongoFileAuthState } from '../Utils/use-mongo-file-auth-state'

// ── New addons from user merged ─────────────────────────────────────────────
export * from './browser-presets.js'
export * from './lid-support.js'
export * from './message-composer.js'
export * from './message-scheduler.js'
export * from './outgoing-calls.js'
export * from './pairing-fix.js'
export * from './past-participants.js'
export * from './rich-response.js'
export * from './stickerpack.js'
