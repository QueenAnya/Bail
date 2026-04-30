/**
 * baileys-full-merge — addons/index.ts
 * Union of: Baileys-patchd v1 + v2 + anya-bail + baileys-merged v1 + v2
 * NOTHING removed — complete feature set from all sources.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SOURCE MAP
 * ─────────────────────────────────────────────────────────────────────────────
 * innovatorssoft  → auto-reply, anti-delete, message-scheduler, jid-plot, rich-response
 * baileys-patchd  → browser-presets, lid-support, pairing-fix, outgoing-calls,
 *                   past-participants, mex-linked-profiles, privacy-tokens
 * anya-bail       → button-sender, vcard, status-posting, templates, jid-plotting,
 *                   message-utils, message-composer, message-search, call-handler,
 *                   scheduling, from-chats, from-messages, from-messages-recv,
 *                   from-messages-send, interactive-message
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── innovatorssoft ────────────────────────────────────────────────────────────
export * from './auto-reply'
export * from './anti-delete'
export * from './message-scheduler'
export * from './jid-plot'
export * from './rich-response'

// ── baileys-patchd v1 patch branches ─────────────────────────────────────────
export * from './browser-presets'
export * from './lid-support'
export * from './pairing-fix'
export * from './outgoing-calls'
export * from './past-participants'
export * from './mex-linked-profiles'
export * from './privacy-tokens'

// ── anya-bail ─────────────────────────────────────────────────────────────────
export * from './button-sender'
export * from './vcard'
export * from './status-posting'
export * from './templates'
export * from './jid-plotting'
export * from './message-utils'
export * from './message-composer'
export * from './message-search'
export * from './call-handler'
export * from './scheduling'
export * from './interactive-message'

// ── anya-bail from-src helpers ────────────────────────────────────────────────
export * from './from-chats'
export * from './from-messages'
export * from './from-messages-recv'
export * from './from-messages-send'

// ── Auth State helpers ────────────────────────────────────────────────────────
export { useSingleFileAuthState } from '../Utils/use-single-file-auth-state'
export { useMongoFileAuthState } from '../Utils/use-mongo-file-auth-state'
