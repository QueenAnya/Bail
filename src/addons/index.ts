/**
 * Baileys Addons — complete feature layer
 *
 * Ported from @innovatorssoft/baileys (v7.4.3), @itsliaaa/baileys (v0.3.0-rc.10),
 * and @queenanya/baileys (v9.6.0) into WhiskeySockets/Baileys (rc10)
 * as a clean, tree-shakeable ESM addon layer.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  Interactive / Button / List / Template Messages               │
 * │  Rich Response / Meta AI Messages (with correct Buffer inject) │
 * │  Button Sender (sendButtons, sendInteractiveMessage, etc.)     │
 * │  Status Posting (createTextStatus, createImageStatus, etc.)    │
 * │  From-Messages Builders (album, stickerPack, call, etc.)       │
 * │  Message Utils (getButtonArgs, getButtonType, getMediaType)    │
 * │  Call Handler (initiateCall, acceptCall, muteCall, etc.)       │
 * │  Anti-Delete / Message Store                                   │
 * │  Auto-Reply System                                             │
 * │  Message Scheduler                                             │
 * │  Message Templates                                             │
 * │  Message Search                                                │
 * │  vCard / Contact Card Generator                               │
 * │  JID / LID Plotting Utilities                                  │
 * │  Status / Broadcast Helpers                                    │
 * │  Chat Control (TypingIndicator, PinnedMessages, ReadReceipts)  │
 * │  Baileys Event Stream (capture & replay)                       │
 * │  Auth States (SingleFile, MongoDB, CacheManager)               │
 * └─────────────────────────────────────────────────────────────────┘
 */

// ── Types & Enums ────────────────────────────────────────────────────────────
export * from './rich-types.js'

// ── Message Generators ───────────────────────────────────────────────────────
export * from './interactive-message.js'
export * from './rich-message-composer.js'
export * from './rich-message-utils.js'
export * from './from-messages.js'

// ── Button / Interactive Senders ─────────────────────────────────────────────
export * from './button-sender.js'
export * from './message-utils.js'

// ── Status Posting ────────────────────────────────────────────────────────────
export * from './status-posting.js'

// ── Call Handler ──────────────────────────────────────────────────────────────
export * from './call-handler.js'

// ── Messaging Hooks (internal use — not re-exported to avoid circular deps) ───
// export * from './from-messages-send.js'   // used by messages-send.ts directly
// export * from './from-messages-recv.ts'   // used by messages-recv.ts directly
// export * from './from-chats.ts'           // used by chats.ts directly

// ── Bot / Addon Utils ────────────────────────────────────────────────────────
export * from './anti-delete.js'
export * from './auto-reply.js'
export * from './scheduling.js'
export * from './templates.js'
export * from './message-search.js'
export * from './vcard.js'
export * from './jid-plotting.js'
export * from './status-helpers.js'
export * from './chat-control.js'
export * from './baileys-event-stream.js'

// ── Auth States ───────────────────────────────────────────────────────────────
export * from './use-single-file-auth-state.js'
export * from './use-mongo-auth-state.js'
export * from './use-cache-manager-auth-state.js'
