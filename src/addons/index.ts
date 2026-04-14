/**
 * baileys utility functions
 * Ported to TypeScript for @whiskeysockets/baileys
 *
 * Usage:
 *   import { MessageStore, createAntiDeleteHandler } from 'baileys/src/addons'
 *   import { MessageScheduler, createMessageScheduler } from 'baileys/src/addons'
 *   import { AutoReplyHandler, createAutoReply } from 'baileys/src/addons'
 *   import { generateVCard, createContactCard } from 'baileys/src/addons'
 *   import { StatusHelper, createTextStatus } from 'baileys/src/addons'
 *   import { MessageSearchManager, searchMessages } from 'baileys/src/addons'
 *   import { TemplateManager, createTemplateManager, renderTemplate } from 'baileys/src/addons'
 */

// Interactive Button Sender — runtime helpers (sendButtons, sendInteractiveMessage, etc.)
// Ported from @ryuu-reinzz/button-helper v2.2.5
export * from './button-sender'

// Anti-Delete System
export * from './anti-delete'

// Message Scheduler
export * from './scheduling'

// Auto-Reply System
export * from './auto-reply'

// vCard / Contact Cards
export * from './vcard'

// Status Posting
export * from './status-posting'

// JID Plotting & LID Support
export * from './jid-plotting'

// Message Utilities (button detection, biz nodes, media type, text extraction)
export * from './message-utils'

// From src/Utils/messages.ts — message content builders
export * from './from-messages'
