/**
 * Interactive / Button Message Integration
 * Source: @itsliaaa/baileys messages.js (Lia@Changes 30-01-26 → 12-03-26)
 *
 * These types extend AnyMessageContent — use directly in sock.sendMessage():
 *
 * @example
 * // Classic Buttons
 * sock.sendMessage(jid, { text: 'Choose:', buttons: [{ id: 'y', text: 'Yes' }, { id: 'n', text: 'No' }] })
 *
 * // List / Sections
 * sock.sendMessage(jid, { title: 'Menu', buttonText: 'Open', sections: [{ title: 'Options', rows: [{ id: '1', title: 'Item' }] }] })
 *
 * // Native Flow (URL / copy / call / quick_reply)
 * sock.sendMessage(jid, { text: 'Click:', nativeFlow: { buttons: [{ url: 'https://...', text: 'Visit' }, { id: 'ok', text: 'OK' }] } })
 *
 * // Carousel / Cards
 * sock.sendMessage(jid, { text: 'Cards:', cards: [{ image: ..., caption: 'Card 1', nativeFlow: { buttons: [...] } }] })
 *
 * // Template Buttons
 * sock.sendMessage(jid, { text: 'Pick:', templateButtons: [{ id: 'ok', text: 'OK' }, { url: 'https://...', text: 'Visit' }] })
 */
import type { WAMediaUpload } from '../Types/Message.js'

// ── Button types ─────────────────────────────────────────────────────────────

/** A single button in a buttonsMessage */
export type WAButton =
	| { id: string; text?: string; buttonText?: string; type?: number }
	| { name: string; paramsJson: string; text?: string }
	| { sections: WASingleSelectSection[]; text?: string; buttonText?: string }

/** A row inside a list section */
export type WASectionRow = {
	id: string
	title: string
	description?: string
}

/** A section in a listMessage */
export type WAButtonSection = {
	title: string
	rows: WASectionRow[]
}

/** Shorthand for single_select sections inside buttons array */
export type WASingleSelectSection = {
	title: string
	rows: WASectionRow[]
}

/** A native flow button — supports id, url, copy, call, sections */
export type WANativeFlowButton =
	| { id: string; text?: string; icon?: string }
	| { url: string; text?: string; icon?: string; useWebview?: boolean }
	| { copy: string; text?: string; icon?: string }
	| { call: string; text?: string; icon?: string }
	| { sections: WASingleSelectSection[]; text?: string; icon?: string }

/** nativeFlow message options */
export type WANativeFlow = {
	buttons: WANativeFlowButton[]
	offerText?: string
	offerUrl?: string
	offerCode?: string
	offerExpiration?: number
	optionText?: string
	optionTitle?: string
}

/** A template button (hydrated) */
export type WATemplateButton =
	| { id: string; text?: string; buttonText?: string; index?: number }
	| { url: string; text?: string; buttonText?: string; index?: number }
	| { call: string; text?: string; buttonText?: string; index?: number }

/** A carousel card */
export type WACarouselCard = {
	image?: WAMediaUpload
	video?: WAMediaUpload
	product?: any
	caption?: string
	text?: string
	title?: string
	subtitle?: string
	footer?: string
	audioFooter?: WAMediaUpload
	thumbnail?: Buffer
	nativeFlow?: WANativeFlow
}

// ── Extended AnyMessageContent fields ────────────────────────────────────────
// These are the keys that itsliaaa added to generateWAMessageContent().
// They work directly in sock.sendMessage() when integrated.

/**
 * Extended send options added by itsliaaa/baileys.
 * Use these in the content object passed to sock.sendMessage().
 */
export type InteractiveMessageContent = {
	/** Classic buttons (buttonsMessage) — simple id/text pairs */
	buttons?: WAButton[]

	/** List message sections */
	sections?: WAButtonSection[]
	buttonText?: string
	title?: string
	description?: string

	/** Hydrated template buttons */
	templateButtons?: WATemplateButton[]
	id?: string

	/** Native flow interactive message */
	nativeFlow?: WANativeFlow | WANativeFlowButton[]

	/** Carousel / cards message */
	cards?: WACarouselCard[]

	/** Optional: shop surface ID for shop message */
	shopSurface?: number

	/** Optional: bizJid for collection message */
	bizJid?: string

	/** Optional: audio footer for interactive message */
	audioFooter?: WAMediaUpload

	/** Optional: jpeg thumbnail for interactive message header */
	thumbnail?: Buffer
}

// ── Payment Message Types ─────────────────────────────────────────────────────

export type WAPaymentOptions = {
	/** Request payment from a JID */
	requestPaymentFrom?: string
	currencyCode?: string
	amount?: number
}

export type WAInvoiceOptions = {
	invoiceNote?: string
}

// ── Extra sendMessage content flags (itsliaaa) ────────────────────────────────

export type ExtraMessageFlags = {
	/** Show Meta AI icon on message */
	ai?: boolean

	/** Mention all group participants (nonJidMentions = 1) */
	mentionAll?: boolean

	/** Wrap in ephemeral message */
	ephemeral?: boolean

	/** Group status message (contextInfo.isGroupStatus) */
	groupStatus?: boolean

	/** Wrap in spoiler */
	spoiler?: boolean

	/** Wrap in viewOnce */
	viewOnce?: boolean

	/** Wrap in viewOnceMessageV2 */
	viewOnceV2?: boolean

	/** Wrap in viewOnceMessageV2Extension */
	viewOnceV2Extension?: boolean

	/** Render interactiveMessage as templateMessage */
	interactiveAsTemplate?: boolean

	/** Secure meta service label */
	secureMetaServiceLabel?: boolean

	/** Raw message — build manually */
	raw?: boolean

	/** External ad reply (simplified) */
	externalAdReply?: {
		title?: string
		body?: string
		thumbnail?: Buffer
		url?: string
		mediaType?: number
		largeThumbnail?: boolean
	}
}

// ── Convenience builders (for manual use outside sendMessage) ─────────────────

/** Build a native flow buttons array for quick_reply buttons */
export const buildQuickReplyButtons = (items: { id: string; text: string; icon?: string }[]): WANativeFlowButton[] =>
	items.map(i => ({ id: i.id, text: i.text, icon: i.icon }))

/** Build URL buttons for native flow */
export const buildUrlButtons = (
	items: { url: string; text: string; icon?: string; useWebview?: boolean }[]
): WANativeFlowButton[] => items.map(i => ({ url: i.url, text: i.text, icon: i.icon, useWebview: i.useWebview }))

/** Build copy-code buttons for native flow */
export const buildCopyCodeButtons = (items: { copy: string; text: string; icon?: string }[]): WANativeFlowButton[] =>
	items.map(i => ({ copy: i.copy, text: i.text, icon: i.icon }))

/** Build call buttons for native flow */
export const buildCallButtons = (items: { call: string; text: string; icon?: string }[]): WANativeFlowButton[] =>
	items.map(i => ({ call: i.call, text: i.text, icon: i.icon }))

/** Build single_select sections shortcut inside native flow */
export const buildSingleSelectButton = (text: string, sections: WASingleSelectSection[]): WANativeFlowButton => ({
	sections,
	text
})

/**
 * Full native flow content builder — shortcut for sock.sendMessage()
 * @example
 * sock.sendMessage(jid, buildNativeFlowContent('Pick:', [
 *   { id: 'ok', text: '✅ OK' },
 *   { url: 'https://...', text: '🌐 Visit' }
 * ], { footer: 'Powered by Baileys' }))
 */
export const buildNativeFlowContent = (
	body: string,
	buttons: WANativeFlowButton[],
	extra?: { footer?: string; title?: string; subtitle?: string }
) => ({
	text: body,
	nativeFlow: { buttons },
	footer: extra?.footer,
	title: extra?.title,
	subtitle: extra?.subtitle
})

/**
 * Classic buttons content builder
 * @example
 * sock.sendMessage(jid, buildButtonsContent('Choose:', [
 *   { id: 'y', text: 'Yes' },
 *   { id: 'n', text: 'No' }
 * ]))
 */
export const buildButtonsContent = (
	body: string,
	buttons: Array<{ id: string; text: string }>,
	extra?: { footer?: string }
) => ({
	text: body,
	buttons: buttons.map(b => ({ id: b.id, text: b.text })),
	footer: extra?.footer
})

/**
 * List message content builder
 * @example
 * sock.sendMessage(jid, buildListContent('Menu', 'Open', [
 *   { title: 'Category', rows: [{ id: '1', title: 'Item', description: 'Details' }] }
 * ]))
 */
export const buildListContent = (
	title: string,
	buttonText: string,
	sections: WAButtonSection[],
	extra?: { text?: string; footer?: string }
) => ({
	title,
	buttonText,
	sections,
	text: extra?.text,
	footer: extra?.footer
})

/**
 * Template buttons content builder
 * @example
 * sock.sendMessage(jid, buildTemplateContent('Pick:', [
 *   { id: 'ok', text: 'OK' },
 *   { url: 'https://...', text: 'Visit' },
 *   { call: '+62...', text: 'Call' }
 * ]))
 */
export const buildTemplateContent = (
	body: string,
	buttons: WATemplateButton[],
	extra?: { footer?: string; title?: string }
) => ({
	text: body,
	templateButtons: buttons,
	footer: extra?.footer,
	title: extra?.title
})
