/**
 * Addons — barrel export
 *
 * Best-of-both: @itsliaaa/baileys + @innovatorssoft/baileys
 * ported to TypeScript, adapted for rc12 + merged-PRs base.
 *
 * ┌──────────────────────────────────────────────────┐
 * │  import { generateQuickReplyButtons,             │
 * │           buildNativeFlowMessage,                │
 * │           generateCodeBlockContent,              │
 * │           prepareRichResponseMessage,            │
 * │           StatusHelper,                          │
 * │           createTemplateManager,                 │
 * │           generateVCard,                         │
 * │           createAutoReply,                       │
 * │           createMessageScheduler,                │
 * │           createMessageSearch,                   │
 * │           MessageStore,                          │
 * │         } from '@whiskeysockets/baileys/addons'  │
 * └──────────────────────────────────────────────────┘
 */

// ─── Interactive / Buttons / NativeFlow / List / Template / Carousel ─────────
export * from './interactive-message.js'

// ─── Rich Message Composer (table, code-block, LaTeX, lists) ──────────────────
export * from './message-composer.js'

// ─── AI-style Rich Response (botForwardedMessage / unifiedResponse) ───────────
export * from './rich-response.js'

// ─── Status Posting (text, image, video, audio, group, broadcast) ─────────────
export * from './status-posting.js'

// ─── Message Template Manager (variable interpolation + 9 presets) ────────────
export * from './templates.js'

// ─── vCard / Contact Card Builder + Parser ────────────────────────────────────
export * from './vcard.js'

// ─── Anti-Delete System (message store + deletion tracker) ────────────────────
export * from './anti-delete.js'

// ─── Message Scheduler (queue, delay, cancel, hooks) ─────────────────────────
export * from './scheduling.js'

// ─── Auto-Reply System (keywords, regex, cooldowns, groups/private) ───────────
export * from './auto-reply.js'

// ─── Message Search (full-text, regex, type-filter, relevance scoring) ────────
export * from './message-search.js'

// ─── JID Plotting & LID ↔ PN Bidirectional Resolver ─────────────────────────
export * from './jid-plotting.js'
