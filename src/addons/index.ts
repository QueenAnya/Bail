/**
 * Addons — Extra features ported from innovatorssoft/Baileys
 *
 * Import what you need:
 *   import { generateInteractiveButtonMessage } from '@whiskeysockets/baileys/addons'
 *   import { makeInMemoryStore } from '@whiskeysockets/baileys/addons/Store'
 */

// ── Interactive / Button message generators ───────────────────────────────────
export * from './interactive-message'

// ── Rich Response / Meta AI message composer ─────────────────────────────────
export * from './message-composer'

// ── vCard / Contact card generator & parser ───────────────────────────────────
export * from './vcard'

// ── Message template manager ──────────────────────────────────────────────────
export * from './templates'

// ── Status posting helpers ────────────────────────────────────────────────────
export * from './status-posting'

// ── Anti-delete / message store ───────────────────────────────────────────────
export * from './anti-delete'

// ── JID / LID plotting utilities ──────────────────────────────────────────────
export * from './jid-plotting'

// ── Message scheduling ────────────────────────────────────────────────────────
export * from './scheduling'

// ── Message search utilities ──────────────────────────────────────────────────
export * from './message-search'

// ── Chat control: TypingIndicator, PinnedMessages, ReadReceipts ───────────────
export * from './chat-control'

// ── Auto-reply system ─────────────────────────────────────────────────────────
export * from './auto-reply'

// ── Auth states ───────────────────────────────────────────────────────────────
export * from './use-single-file-auth-state'
export * from './use-mongo-file-auth-state'

// ── MEX operation constants ───────────────────────────────────────────────────
export * from './MexUpdates'

// ── Store ─────────────────────────────────────────────────────────────────────
export * from './Store/make-ordered-dictionary'
export * from './Store/object-repository'
export * from './Store/make-in-memory-store'
