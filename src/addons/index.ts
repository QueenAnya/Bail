/**
 * baileys utility functions
 * Ported to TypeScript for @whiskeysockets/baileys
 *
 * Merged addons — Queen-Anya base + WS-patched extras
 *
 * Usage:
 *   import { MessageStore, createAntiDeleteHandler } from 'baileys/src/addons'
 *   import { MessageScheduler, createMessageScheduler } from 'baileys/src/addons'
 *   import { AutoReplyHandler, createAutoReply } from 'baileys/src/addons'
 *   import { generateVCard, createContactCard } from 'baileys/src/addons'
 *   import { StatusHelper, createTextStatus } from 'baileys/src/addons'
 *   import { MessageSearchManager, searchMessages } from 'baileys/src/addons'
 *   import { TemplateManager, createTemplateManager, renderTemplate } from 'baileys/src/addons'
 *   import { BaileysEventStream, createEventStream } from 'baileys/src/addons'
 *   import { CallHandlerFactory, createCallHandler } from 'baileys/src/addons'
 *   import { ChatControlManager, createChatControl } from 'baileys/src/addons'
 *   import { useSingleFileAuthState } from 'baileys/src/addons'
 *   import { useMongoFileAuthState } from 'baileys/src/addons'
 *   import { buildMentionContextInfo, patchMessageForMdIfRequired } from 'baileys/src/addons'
 */

// ─── Interactive Button Sender (Anya) ──────────────────────────────────────
export * from './button-sender'

// ─── Anti-Delete System ────────────────────────────────────────────────────
export * from './anti-delete'

// ─── Message Scheduler ────────────────────────────────────────────────────
export * from './scheduling'

// ─── Auto-Reply System ────────────────────────────────────────────────────
export * from './auto-reply'

// ─── vCard / Contact Cards ────────────────────────────────────────────────
export * from './vcard'

// ─── Status Posting ───────────────────────────────────────────────────────
export * from './status-posting'

// ─── Message Search ───────────────────────────────────────────────────────
export * from './message-search'

// ─── Message Templates ────────────────────────────────────────────────────
export * from './templates'

// ─── JID Plotting & LID Support ───────────────────────────────────────────
export * from './jid-plotting'

// ─── Message Utilities (getMediaType, getMessageType, getButtonType, + WS extras) ──
export * from './message-utils'

// ─── Interactive / Button Message Generators ──────────────────────────────
export * from './interactive-message'

// ── From src/Socket/messages-recv.ts — call stanza builders (Anya) ─────────
export * from './from-messages-recv'

// ── From src/Socket/messages-send.ts — status mentions (Anya) ──────────────
export * from './from-messages-send'

// ── From src/Socket/chats.ts — chat helpers (Anya) ─────────────────────────
export * from './from-chats'

// ── From src/Utils/messages.ts — message content builders (Anya) ────────────
export * from './from-messages'

// ─── Baileys Event Stream (WS-patched) ────────────────────────────────────
export * from './baileys-event-stream'

// ─── Call Handler Factory (WS-patched) ────────────────────────────────────
export * from './call-handler'

// ─── Chat Control (WS-patched) ────────────────────────────────────────────
export * from './chat-control'

// ─── Chat Extras (WS-patched) ─────────────────────────────────────────────
export * from './chat-extras'

// ─── Decrypt Utils (WS-patched) ───────────────────────────────────────────
export * from './decrypt-utils'

// ─── Generics Extras (WS-patched) ─────────────────────────────────────────
export * from './generics-extras'

// ─── Message Extras (WS-patched) ──────────────────────────────────────────
export * from './message-extras'

// ─── MEX Group Handler (WS-patched) ───────────────────────────────────────

// ─── Status Mentions (WS-patched) ─────────────────────────────────────────
export * from './status-mentions'

// ─── Auth State Helpers (WS-patched) ──────────────────────────────────────
//export * from './use-single-file-auth-state'
//export * from './use-mongo-file-auth-state'
