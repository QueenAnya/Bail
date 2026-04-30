/**
 * Baileys-merged v2 — addons/index.ts
 *
 * Base: Baileys-patchd-v2 (patch features baked into source files)
 * Merged: anya-bail addon layer
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FEATURE MAP
 * ─────────────────────────────────────────────────────────────────────────────
 * addon file                  | origin
 * ────────────────────────────┼─────────────────────────────────────────────
 * auto-reply                  | innovatorssoft — Auto-Reply System
 * anti-delete                 | innovatorssoft — Anti-Delete System
 * message-scheduler           | innovatorssoft — Message Scheduler
 * jid-plot                    | innovatorssoft — JID Plotting & LID Support
 * rich-response               | innovatorssoft — sendTable/sendList/etc.
 * button-sender               | anya-bail — sendButtons, sendInteractiveMessage, sendListMessage
 * vcard                       | anya-bail — generateVCard, createContactCard, quickContact
 * status-posting              | anya-bail — createTextStatus, makeStatusMentionsAddon
 * templates                   | anya-bail — TemplateManager, renderTemplate, PRESET_TEMPLATES
 * jid-plotting                | anya-bail — parseJid, plotJid, JidPlotterWithMapping
 * message-utils               | anya-bail — getMediaType, getMessageType, getButtonType, getButtonArgs
 * message-composer            | anya-bail — generateRichMessageContent, generateTableContent, etc.
 * message-search              | anya-bail — searchMessages, searchMessagesRegex, MessageSearchManager
 * call-handler                | anya-bail — makeCallHandlerAddon → initiateCall, acceptCall, etc.
 * from-chats                  | anya-bail — chat socket helpers
 * from-messages               | anya-bail — message content builders
 * from-messages-recv          | anya-bail — messages-recv helpers
 * from-messages-send          | anya-bail — execSendStatusMentions, buildStatusMentionNode
 * auth state                  | anya-bail — useSingleFileAuthState, useMongoFileAuthState
 * NOTE: browser-presets, lid-support, pairing-fix, outgoing-calls,
 *       past-participants, mex-linked-profiles, stickerpack, privacy-tokens
 *       are now baked directly into Socket source files (v2 change).
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── innovatorssoft addons ──────────────────────────────────────────────────────
export * from './auto-reply'
export * from './anti-delete'
export * from './message-scheduler'
export * from './jid-plot'
export * from './rich-response'

// ── anya-bail addons ──────────────────────────────────────────────────────────
export * from './button-sender'
export * from './vcard'
export * from './status-posting'
export * from './templates'
export * from './jid-plotting'
export * from './message-utils'
export * from './message-composer'
export * from './message-search'
export * from './call-handler'

// ── anya-bail from-src helpers ────────────────────────────────────────────────
export * from './from-chats'
export * from './from-messages-recv'
export * from './from-messages-send'
export * from './from-messages'

// ── Auth State helpers ────────────────────────────────────────────────────────
export { useSingleFileAuthState } from '../Utils/use-single-file-auth-state'
export { useMongoFileAuthState } from '../Utils/use-mongo-file-auth-state'
