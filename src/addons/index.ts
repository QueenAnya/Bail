/**
 * @whiskeysockets/baileys — Merged Addons
 * Queen-Anya base + WS-patched extras
 *
 * Quick reference:
 *   Anti-delete        → MessageStore, createAntiDeleteHandler
 *   Scheduler          → MessageScheduler, createMessageScheduler
 *   Auto-reply         → AutoReplyHandler, createAutoReply
 *   vCard              → generateVCard, createContactCard
 *   Status             → createTextStatus, StatusHelper, createStatusMentionHandler
 *   Templates          → TemplateManager, renderTemplate
 *   JID utils          → parseJid, plotJid, createJidPlotter
 *   Message utils      → getMediaType, getMessageType, getButtonType, getButtonArgs
 *   Message search     → searchMessages, MessageSearchManager, createMessageSearch
 *   WS extras          → buildMentionContextInfo, patchMessageForMdIfRequired, prepareAlbumMessageContent
 *   Socket extras      → makeMessageExtrasAddon (profilePictureUrl, getEphemeralGroup)
 *   Interactive/Btns   → generateInteractiveButtonMessage, generateTemplateMessage, sendButtons
 *   Call handler       → createCallHandler
 *   Generics           → asciiDecode, getPlatformId, printQRIfNecessaryListener
 *   Auth state         → useSingleFileAuthState, useMongoFileAuthState
 *
 * Files present but NOT auto-exported (import directly when needed):
 *   ./baileys-event-stream  — captureEventStream, readAndEmitEventStream (debug only)
 *   ./chat-control          — TypingIndicator, PinnedMessagesManager, createReadReceiptController
 *   ./mex-updates-types     — MexUpdatesOperations, XWAPathsMexUpdates
 *   ./mex-group-handler     — makeMexGroupHandler
 *
 * Moved to src/ (not in addons):
 *   src/Utils/decrypt-utils  — decryptComment, decryptEventEdit, decryptReaction
 *   src/Socket/chat-extras   — makeChatExtrasAddon (clearMessage, getLidUser, updatePanoramaProfilePicture)
 */

// ─── Button Sender (Anya) ─────────────────────────────────────────────────
export * from './button-sender'

// ─── Anti-Delete ─────────────────────────────────────────────────────────
export * from './anti-delete'

// ─── Scheduler ───────────────────────────────────────────────────────────
export * from './scheduling'

// ─── Auto-Reply ──────────────────────────────────────────────────────────
export * from './auto-reply'

// ─── vCard ───────────────────────────────────────────────────────────────
export * from './vcard'

// ─── Status (posting + mentions) ─────────────────────────────────────────
export * from './status'

// ─── Templates ───────────────────────────────────────────────────────────
export * from './templates'

// ─── JID Plotting ────────────────────────────────────────────────────────
export * from './jid-plotting'

// ─── Message (type detection + button helpers + search + WS extras + socket extras) ──
export * from './message'

// ─── Interactive / Button Generators ─────────────────────────────────────
export * from './interactive-message'

// ─── From src/ re-exports (Anya) ─────────────────────────────────────────
export * from './from'

// ─── Generics Extras ─────────────────────────────────────────────────────
export * from './generics-extras'

// ─── Call Handler ────────────────────────────────────────────────────────
export * from './call-handler'

// ─── Auth State (re-exported from src/Utils canonical location) ───────────
export { useSingleFileAuthState } from '../Utils/use-single-file-auth-state'
export { useMongoFileAuthState } from '../Utils/use-mongo-file-auth-state'
