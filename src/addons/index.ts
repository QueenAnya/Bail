/**
 * anya-bail — src/addons
 * Queen-Anya structure with WS-patched features merged in
 *
 * Quick reference:
 *   Button sender         → sendButtons, sendInteractiveMessage, sendListMessage ...
 *   Anti-delete           → MessageStore, createAntiDeleteHandler, createMessageStoreHandler
 *   Scheduler             → MessageScheduler, ScheduledMessageStatus, createMessageScheduler
 *   Auto-reply            → AutoReplyHandler, createAutoReply
 *   vCard                 → generateVCard, createContactCard, quickContact
 *   Status                → createTextStatus, createImageStatus, StatusHelper (TextStatusOptions, MediaStatusOptions)
 *   Status mentions       → makeStatusMentionsAddon → sendStatusMentions
 *   Templates             → TemplateManager, renderTemplate, PRESET_TEMPLATES
 *   JID utils             → parseJid, plotJid, JidPlotterWithMapping, createJidPlotter
 *   JID plot (innov.)     → JidPlot, buildJidPlot, resolveJidPlot
 *   Message utils         → getMediaType, getMessageType, getButtonType, getButtonArgs
 *   Message WS extras     → buildMentionContextInfo, patchMessageForMdIfRequired,
 *                           prepareAlbumMessageContent, normalizeMediaInput
 *   Socket extras         → makeMessageExtrasAddon → profilePictureUrl, getEphemeralGroup
 *   Message search        → MessageType, RegexSearchOptions, searchMessages,
 *                           searchMessagesRegex, MessageSearchManager, createMessageSearch
 *   Interactive msgs      → generateInteractiveButtonMessage, generateTemplateMessage,
 *                           generateNativeFlowMessage, generateCombinedButtons ...
 *   Call handler          → makeCallHandlerAddon → initiateCall, acceptCall, muteCall ...
 *   Generics extras       → asciiDecode, getPlatformId, printQRIfNecessaryListener
 *   Rich response (innov.)→ sendTable, sendList, sendCodeBlock, sendLatex ...
 *   Scheduler (innov.)    → schedule, cancelScheduled, listScheduled ...
 *   Auth state            → useSingleFileAuthState, useMongoFileAuthState
 *   In-memory store       → makeInMemoryStore
 *   Typing indicator      → createTypingIndicator
 *   Read receipt control  → createReadReceiptController
 *
 *   From src/ re-exports (Anya originals):
 *     from-chats.ts         → chat socket helpers
 *     from-messages-recv.ts → messages-recv helpers
 *     from-messages-send.ts → StatusMentionDeps, normalizeStatusContent, buildStatusMentionNode
 *     from-messages.ts      → message content builders (buttons, stickers, albums...)
 *
 * NOTE: The following patch features are baked directly into Socket/Utils source:
 *   pairing-fix         → src/Socket/socket.ts
 *   browser-presets     → src/Utils/browser-utils.ts + src/Socket/socket.ts
 *   lid-support         → src/WABinary/jid-utils.ts
 *   outgoing-calls      → src/Socket/chats.ts + src/Socket/messages-recv.ts
 *   mex-linked-profiles → src/Socket/messages-recv.ts
 *   past-participants   → src/Utils/history.ts + src/Utils/event-buffer.ts
 *   privacy-tokens      → src/Socket/messages-send.ts
 *   stickerpack         → src/addons/from-messages.ts (buildStickerPackMessage)
 */

// ── Button Sender ──────────────────────────────────────────────────────────
export * from './button-sender'

// ── Anti-Delete ────────────────────────────────────────────────────────────
export * from './anti-delete'

// ── Auto-Reply ────────────────────────────────────────────────────────────
export * from './auto-reply'

// ── vCard / Contact Cards ─────────────────────────────────────────────────
export * from './vcard'

// ── Status Posting + Mentions ─────────────────────────────────────────────
export * from './status-posting'

// ── Message Templates ─────────────────────────────────────────────────────
export * from './templates'

// ── JID Plotting (anya-bail) ──────────────────────────────────────────────
export * from './jid-plotting'

// ── JID Plot (innovatorssoft) ─────────────────────────────────────────────
export * from './jid-plot'

// ── Message Utils + WS Extras + Socket Extras ─────────────────────────────
export * from './message-utils'

// ── Message Composer (Rich / Bot / Meta AI messages) ──────────────────────
export * from './message-composer'

// ── Message Search ────────────────────────────────────────────────────────
export * from './message-search'

// ── Interactive / Button Message Generators ───────────────────────────────
//export * from './interactive-message'

// ── Call Handler ──────────────────────────────────────────────────────────
export * from './call-handler'

// ── Scheduler (anya-bail) ─────────────────────────────────────────────────
export * from './scheduling'

// ── Message Scheduler (innovatorssoft) ────────────────────────────────────
export * from './message-scheduler'

// ── Rich Response (innovatorssoft) ────────────────────────────────────────
export * from './rich-response'

// ── From src/ (Anya originals) ────────────────────────────────────────────
export * from './from-chats'
export * from './from-messages-recv'
export * from './from-messages-send'
export * from './from-messages'

// ── Auth State — re-exported from src/Utils (canonical location) ───────────
export { useSingleFileAuthState } from '../Utils/use-single-file-auth-state'
export { useMongoFileAuthState } from '../Utils/use-mongo-file-auth-state'

// ── In-Memory Store ────────────────────────────────────────────────────────
export * from './in-memory-store'

// ── Typing Indicator ───────────────────────────────────────────────────────
export * from './typing-indicator'

// ── Read Receipt Controller ────────────────────────────────────────────────
export * from './read-receipt-controller'
