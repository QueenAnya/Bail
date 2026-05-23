/**
 * Addons — barrel export
 *
 * Best-of-both from @itsliaaa/baileys and @innovatorssoft/baileys,
 * ported to TypeScript and adapted for rc11 + merged-PRs base.
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │  import {                                               │
 * │    generateQuickReplyButtons,                           │
 * │    generateNativeFlowMessage,                           │
 * │    generateInteractiveListMessage,                      │
 * │    generateTemplateMessage,                             │
 * │    generateCombinedButtons,                             │
 * │    buildNativeFlowMessage,                              │
 * │    generateCodeBlockContent,                            │
 * │    generateTableContent,                                │
 * │    prepareRichResponseMessage,                          │
 * │    StatusHelper,                                        │
 * │    createTemplateManager,                               │
 * │  } from '@whiskeysockets/baileys/addons'                │
 * └─────────────────────────────────────────────────────────┘
 */

// ─── Interactive / Buttons / NativeFlow / List / Template / Carousel ─────────
export * from './interactive-message.js'

// ─── Rich Message Composer (table, code-block, LaTeX, lists, inline images) ───
export * from './message-composer.js'

// ─── AI-style Rich Response (botForwardedMessage / unifiedResponse) ───────────
export * from './rich-response.js'

// ─── Status Posting (text, image, video, audio, group, broadcast) ─────────────
export * from './status-posting.js'

// ─── Message Template Manager (variable interpolation + presets) ──────────────
export * from './templates.js'
