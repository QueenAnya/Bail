/**
 * @queenanya/baileys addons index
 * Merged from src (qb3) + srcc (innovatorssoft) — all addon exports
 */

// ── Button Sender (from @ryuu-reinzz/button-helper port) ──────────────────
export * from './button-sender'

// ── Interactive Message Generators ────────────────────────────────────────
export * from './interactive-message'

// ── Message Utilities ─────────────────────────────────────────────────────
export * from './message-utils'
// Selective export from message-extras (getButtonType/getButtonArgs already in message-utils)
export { makeMessageExtrasAddon, MessageExtrasContext } from './message-extras'

// ── Anti-Delete System ────────────────────────────────────────────────────
export * from './anti-delete'

// ── Message Scheduler ─────────────────────────────────────────────────────
export * from './scheduling'

// ── Auto-Reply System ─────────────────────────────────────────────────────
export * from './auto-reply'

// ── vCard / Contact Cards ─────────────────────────────────────────────────
export * from './vcard'

// ── Status Posting ────────────────────────────────────────────────────────
export * from './status-posting'
export * from './status-mentions'

// ── Message Search ────────────────────────────────────────────────────────
export * from './message-search'

// ── Message Templates ─────────────────────────────────────────────────────
export * from './templates'

// ── JID Plotting & LID Support ────────────────────────────────────────────
export * from './jid-plotting'

// Auth state helpers are exported from Utils/ directly

// ── Call Handler ──────────────────────────────────────────────────────────
export * from './call-handler'

// ── Chat Extras ───────────────────────────────────────────────────────────
// Selective export from chat-extras (buildClearMessageModification/createChatHelpers already in from-chats)
export { makeChatExtrasAddon, ChatExtrasContext } from './chat-extras'

// ── Decrypt Utils ─────────────────────────────────────────────────────────
export * from './decrypt-utils'

// ── Generics Extras ───────────────────────────────────────────────────────
// Selective export from generics-extras (getPlatformId/isAndroidBrowser/printQRIfNecessaryListener already in Utils)
export { asciiDecode, asciiEncode, fromUnicodeEscape, toUnicodeEscape } from './generics-extras'

// ── From src/Socket & src/Utils extractions ───────────────────────────────
export * from './from-messages-recv'
export * from './from-messages-send'
export * from './from-chats'
export * from './from-messages'
