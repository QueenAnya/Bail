/**
 * baileys utility functions
 * Ported to TypeScript for @whiskeysockets/baileys
 *
 * Merged addons — Queen-Anya base + WS-patched extras
 *
 * Usage:
 *   import { MessageStore, createAntiDeleteHandler } from 'baileys/src/addons'
 *   import { MessageScheduler, createMessageScheduler } from 'baileys/src/addons'
 *   import { AutoReplyHandler, createAutoReply } from 'baileys/src/addons'
 *   import { generateVCard, createContactCard } from 'baileys/src/addons'
 *   import { StatusHelper, createTextStatus } from 'baileys/src/addons'
 *   import { MessageSearchManager, searchMessages } from 'baileys/src/addons'
 *   import { TemplateManager, createTemplateManager, renderTemplate } from 'baileys/src/addons'
 *   import { buildMentionContextInfo, patchMessageForMdIfRequired } from 'baileys/src/addons'
 *   import { useSingleFileAuthState } from 'baileys/src/addons'
 *   import { useMongoFileAuthState } from 'baileys/src/addons'
 *
 * NOTE: The following files exist in addons but are NOT exported here.
 * Import them directly ONLY when needed:
 *   - ./baileys-event-stream  (debug/replay utility)
 *   - ./chat-control          (TypingIndicator, PinnedMessagesManager, ReadReceiptController)
 *   - ./mex-updates-types     (MEX operation name constants)
 *   - ./mex-group-handler     (MEX group/community notification handler)
 *
 * NOTE: These live in src/ (not addons) — import from there directly:
 *   - src/Utils/decrypt-utils  (decryptComment, decryptEventEdit, decryptReaction)
 *   - src/Socket/chat-extras   (makeChatExtrasAddon → clearMessage, getLidUser, updatePanoramaProfilePicture)
 */

// ─── Interactive Button Sender (Anya) ──────────────────────────────────────
export * from './button-sender'

// ─── Anti-Delete System ────────────────────────────────────────────────────
export * from './anti-delete'

// ─── Message Scheduler ────────────────────────────────────────────────────
export * from './scheduling'

// ─── Auto-Reply System ────────────────────────────────────────────────────
export * from './auto-reply'

// ─── vCard / Contact Cards ────────────────────────────────────────────────
export * from './vcard'

// ─── Status Posting ───────────────────────────────────────────────────────
export * from './status-posting'

// ─── Message Templates ────────────────────────────────────────────────────
export * from './templates'

// ─── JID Plotting & LID Support ───────────────────────────────────────────
export * from './jid-plotting'

// ─── Message Utils + Search (merged) ─────────────────────────────────────
//     getMediaType, getMessageType, getButtonType, getButtonArgs
//     MessageType, SearchOptions, SearchResult, RegexSearchOptions
//     extractMessageText, calculateRelevance, searchMessages, searchMessagesRegex
//     MessageSearchManager, createMessageSearch
//     buildMentionContextInfo, extractFromButtonsMessage, normalizeMediaInput
//     patchMessageForMdIfRequired, prepareAlbumMessageContent
export * from './message-utils'

// ─── Interactive / Button Message Generators ──────────────────────────────
export * from './interactive-message'

// ─── From src/Socket/messages-recv.ts (Anya) ──────────────────────────────
export * from './from-messages-recv'

// ─── From src/Socket/messages-send.ts (Anya) ──────────────────────────────
export * from './from-messages-send'

// ─── From src/Socket/chats.ts (Anya) ──────────────────────────────────────
export * from './from-chats'

// ─── From src/Utils/messages.ts (Anya) ────────────────────────────────────
export * from './from-messages'

// ─── Generics Extras (WS-patched) ─────────────────────────────────────────
export * from './generics-extras'

// ─── Message Extras (WS-patched) ──────────────────────────────────────────
export * from './message-extras'

// ─── Call Handler Factory (WS-patched) ────────────────────────────────────
export * from './call-handler'

// ─── Status Mentions (WS-patched) ─────────────────────────────────────────
export * from './status-mentions'

// ─── Auth State Helpers — re-exported from src/Utils (canonical location) ──
export { useSingleFileAuthState } from '../Utils/use-single-file-auth-state'
export { useMongoFileAuthState } from '../Utils/use-mongo-file-auth-state'
