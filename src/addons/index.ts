/**
 * Addons — barrel export
 * Best-of-both from @itsliaaa/baileys and @innovatorssoft/baileys
 *
 * Usage:
 *   import { generateQuickReplyButtons, StatusHelper, createAutoReply, ... } from './addons'
 */

// ─── Interactive / Buttons / NativeFlow / List / Template / Carousel ─────────
export * from './interactive-message.js'

// ─── Rich Message Composer (table, code-block, LaTeX, inline images) ──────────
export * from './message-composer.js'

// ─── AI-style Rich Response (botForwardedMessage / unifiedResponse) ───────────
export * from './rich-response.js'

// ─── Status Posting (text, image, video, audio, group, broadcast) ─────────────
export * from './status-posting.js'

// ─── Message Template Manager (variable interpolation + 9 presets) ────────────
export * from './templates.js'

// ─── vCard / Contact Card helpers ─────────────────────────────────────────────
export * from './vcard.js'

// ─── Anti-Delete / Message Store ──────────────────────────────────────────────
export * from './anti-delete.js'

// ─── Message Scheduler ────────────────────────────────────────────────────────
export * from './scheduling.js'

// ─── Auto-Reply System ────────────────────────────────────────────────────────
export * from './auto-reply.js'

// ─── Message Search ───────────────────────────────────────────────────────────
export * from './message-search.js'

// ─── JID Plotting & LID↔PN Resolution ────────────────────────────────────────
export * from './jid-plotting.js'
