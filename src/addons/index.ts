/**
 * Baileys Addons — Complete Merged Layer
 *
 * Base: WhiskeySockets/Baileys rc10 (May 2026)
 * Merged with: anya-bail / Queen-Anya (May 2026)
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Button Sender          → sendButtons, sendInteractiveMessage, ...      │
 * │  Interactive Messages   → generateInteractiveButtonMessage, ...         │
 * │  Rich Message Composer  → (rc10 rich layer)                             │
 * │  Rich Response          → sendTable, sendList, sendCodeBlock, ...       │
 * │  Anti-Delete / Store    → MessageStore, createAntiDeleteHandler, ...    │
 * │  Auto-Reply System      → AutoReplyHandler, createAutoReply             │
 * │  Message Scheduler      → createMessageScheduler / MessageScheduler     │
 * │  Message Templates      → TemplateManager, renderTemplate, ...          │
 * │  Message Search         → searchMessages, createMessageSearch, ...      │
 * │  Message Utils          → getButtonArgs, getButtonType, getMediaType    │
 * │  Message Composer       → rich/bot/meta AI message builders             │
 * │  vCard / Contact Cards  → generateVCard, createContactCard, ...         │
 * │  JID / LID Plotting     → parseJid, plotJid, JidPlot, buildJidPlot      │
 * │  Status Posting         → createTextStatus, sendStatusMentions, ...     │
 * │  Status Helpers         → (rc10 status helpers)                         │
 * │  Chat Control           → TypingIndicator, PinnedMessages, ...          │
 * │  Call Handler           → initiateCall, acceptCall, muteCall, ...       │
 * │  Baileys Event Stream   → capture & replay events                       │
 * │  Auth States            → SingleFile, MongoDB, CacheManager             │
 * │  From src/ re-exports   → chats, messages-recv/send, messages           │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

// ── Types & Enums (rc10) ──────────────────────────────────────────────────
export * from './rich-types.js'

// ── Button Sender (anya) ──────────────────────────────────────────────────
export * from './button-sender.js'

// ── Interactive / Button Message Generators ───────────────────────────────
export * from './interactive-message.js'

// ── Rich Message Composer + Utils (rc10) ──────────────────────────────────
export * from './rich-message-composer.js'
export * from './rich-message-utils.js'

// ── Rich Response / Meta AI (anya/innov.) ─────────────────────────────────
export * from './rich-response.js'

// ── Anti-Delete / Message Store ───────────────────────────────────────────
export * from './anti-delete.js'

// ── Auto-Reply System ─────────────────────────────────────────────────────
export * from './auto-reply.js'

// ── Message Scheduler (anya) ──────────────────────────────────────────────
export * from './scheduling.js'

// ── Message Scheduler (innov.) ────────────────────────────────────────────
export * from './message-scheduler.js'

// ── Message Templates ─────────────────────────────────────────────────────
export * from './templates.js'

// ── Message Search ────────────────────────────────────────────────────────
export * from './message-search.js'

// ── Message Utils + WS Extras + Socket Extras (anya) ─────────────────────
export * from './message-utils.js'

// ── Message Composer (anya) ───────────────────────────────────────────────
export * from './message-composer.js'

// ── vCard / Contact Cards ─────────────────────────────────────────────────
export * from './vcard.js'

// ── JID Plotting (anya) ───────────────────────────────────────────────────
export * from './jid-plotting.js'

// ── JID Plot (innov.) ─────────────────────────────────────────────────────
export * from './jid-plot.js'

// ── Status Posting + Mentions (anya) ─────────────────────────────────────
export * from './status-posting.js'

// ── Status Helpers (rc10) ────────────────────────────────────────────────
export * from './status-helpers.js'

// ── Chat Control (rc10) ───────────────────────────────────────────────────
export * from './chat-control.js'

// ── Call Handler (anya/innov.) ────────────────────────────────────────────
export * from './call-handler.js'

// ── Outgoing Calls (anya) ─────────────────────────────────────────────────
export * from './outgoing-calls.js'

// ── Baileys Event Stream (rc10) ───────────────────────────────────────────
export * from './baileys-event-stream.js'

// ── From src/ re-exports (anya originals) ────────────────────────────────
export * from './from-chats.js'
export * from './from-messages-recv.js'
export * from './from-messages-send.js'
export * from './from-messages.js'

// ── Auth States ───────────────────────────────────────────────────────────
export * from './use-single-file-auth-state.js'
export * from './use-mongo-auth-state.js'
export * from './use-cache-manager-auth-state.js'

// ── Auth State re-exports from src/Utils (anya canonical) ─────────────────
export { useSingleFileAuthState } from '../Utils/use-single-file-auth-state.js'
export { useMongoFileAuthState } from '../Utils/use-mongo-file-auth-state.js'
