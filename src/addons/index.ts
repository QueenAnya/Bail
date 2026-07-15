/**
 * Baileys Addons — complete feature layer
 *
 * Ported from @innovatorssoft/baileys (v7.4.3) and @itsliaaa/baileys (v0.3.0-rc.10)
 * into WhiskeySockets/Baileys (rc10) as a clean, tree-shakeable ESM addon layer.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  Interactive / Button Messages                                  │
 * │  Rich Response / Meta AI Messages (with correct Buffer inject)  │
 * │  Anti-Delete / Message Store                                    │
 * │  Auto-Reply System                                              │
 * │  Message Scheduler                                              │
 * │  Message Templates                                              │
 * │  Message Search                                                 │
 * │  vCard / Contact Card Generator                                 │
 * │  JID / LID Plotting Utilities                                   │
 * │  Status / Broadcast Helpers                                     │
 * │  Chat Control (TypingIndicator, PinnedMessages, ReadReceipts)   │
 * │  Baileys Event Stream (capture & replay)                        │
 * │  Auth States (SingleFile, MongoDB, CacheManager)                │
 * └─────────────────────────────────────────────────────────────────┘
 */

// ── Types & Enums ────────────────────────────────────────────────────────────
export * from './rich-types.js'

// ── Message Generators ───────────────────────────────────────────────────────
export * from './interactive-message.js'
export * from './rich-message-composer.js'
export * from './rich-message-utils.js'

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
export * from './native-flow-buttons.js'
export * from './decrypt-event-edit.js'

// ── Calls ─────────────────────────────────────────────────────────────────────
export * as OutgoingCalls from './outgoing-calls.js'
export { makeCallHandlerAddon } from './call-handler.js'

// ── In-Memory Store ───────────────────────────────────────────────────────────
export { makeInMemoryStore } from './store/make-in-memory-store.js'

// ── Auth States ───────────────────────────────────────────────────────────────
export * from './use-single-file-auth-state.js'
export * from './use-mongo-auth-state.js'
export * from './use-cache-manager-auth-state.js'
export * from './use-sqlite-auth-state.js'
