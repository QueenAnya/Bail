/**
 * Baileys Addons — complete feature layer
 * Merged from: @innovatorssoft/baileys + @itsliaaa/baileys + anya-bail (qb3)
 * Base: WhiskeySockets/Baileys rc10 + 11 upstream PRs
 */

// ── Interactive / Button Messages ─────────────────────────────────────────────
export * from './interactive-message.js'
export * from './button-sender.js'
export * from './message-utils.js'

// ── Rich Response / Meta AI ───────────────────────────────────────────────────
// message-composer (ANYA's full implementation)
export {
	generateTableContent,
	generateListContent,
	generateCodeBlockContent,
	generateLatexContent,
	generateLatexImageContent,
	generateLatexInlineImageContent,
	extractUnifiedResponse,
	generateUnifiedResponseContent,
	generateRichMessageContent,
	buildBotForwardedMessage,
	buildRichContextInfo,
	tokenizeCode
} from './message-composer.js'
export type {
	LatexExpression,
	CodeToken,
	RichSubMessage,
	RichMessageContent,
	CapturedUnifiedResponse
} from './message-composer.js'
export * from './rich-message-utils.js'
export * from './rich-response.js'

// ── StickerPack ───────────────────────────────────────────────────────────────
export * from './stickerpack.js'

// ── Calls (outgoing + handling) ───────────────────────────────────────────────
export * from './outgoing-calls.js'
export * from './call-handler.js'

// ── Auth States ───────────────────────────────────────────────────────────────
export * from './use-mongo-auth-state.js'
export * from './use-cache-manager-auth-state.js'

// ── Bot Utilities ─────────────────────────────────────────────────────────────
export * from './anti-delete.js'
export * from './auto-reply.js'
export * from './scheduling.js'
export * from './message-scheduler.js'
export * from './templates.js'
export * from './message-search.js'
export * from './vcard.js'
export * from './status-posting.js'
export * from './chat-control.js'
export * from './baileys-event-stream.js'

// ── JID / LID Utilities ───────────────────────────────────────────────────────
export * from './jid-plotting.js'
export * from './lid-support.js'

// ── History / Participants ────────────────────────────────────────────────────
export * from './past-participants.js'

// ── Browser Presets ───────────────────────────────────────────────────────────
export * from './browser-presets.js'

// ── Pairing ───────────────────────────────────────────────────────────────────
export * from './pairing-fix.js'

// ── Socket Extractions (from-*) ───────────────────────────────────────────────
export * from './from-messages.js'
export * from './from-messages-recv.js'
export * from './from-messages-send.js'
export * from './from-chats.js'
