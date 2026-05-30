/**
 * Interactive Message Builders
 *
 * Best-of-both approach:
 *  — LIA (@itsliaaa/baileys): inline sendMessage() API, icon support,
 *    offer strips, bottom-sheet option lists, single_select shortcut,
 *    carousel cards, audioFooter, externalAdReply, mentionAll, groupStatus,
 *    interactiveAsTemplate, ephemeral/spoiler/viewOnce flags
 *  — INNO (@innovatorssoft/baileys): strongly-typed standalone utility
 *    functions for direct proto construction
 */

import { Boom } from '@hapi/boom'
import { proto } from '../../WAProto/index.js'
import type { WAMediaUpload, WAMessageContent } from '../Types/index.js'
import type { MediaGenerationOptions } from '../Types/Message.js'
import { prepareWAMessageMedia } from '../Utils/messages.js'

// ─── Enums (re-export for convenience) ───────────────────────────────────────

export const ButtonHeaderType = proto.Message.ButtonsMessage.HeaderType
export const ButtonType = proto.Message.ButtonsMessage.Button.Type
export const CarouselCardType = proto.Message.InteractiveMessage.CarouselMessage.CarouselCardType
export const ListType = proto.Message.ListMessage.ListType

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuickReplyButton {
	id: string
	displayText: string
}
export interface UrlButton {
	displayText: string
	url: string
	merchantUrl?: string
}
export interface CallButton {
	displayText: string
	phoneNumber: string
}
export interface CopyButton {
	displayText: string
	copyCode: string
}

export interface ListSection {
	title: string
	rows: Array<{ rowId: string; title: string; description?: string }>
}

export interface InteractiveListContent {
	title: string
	buttonText: string
	sections: ListSection[]
	footer?: string
	description?: string
}

export interface InteractiveButtonsContent {
	title?: string
	body: string
	footer?: string
	buttons: Array<{
		name: string
		buttonId: string
		displayText: string
	}>
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerDocument?: WAMediaUpload & { filename?: string }
}

export interface TemplateButtonEntry {
	index: number
	quickReplyButton?: QuickReplyButton
	urlButton?: UrlButton
	callButton?: CallButton
}

export interface TemplateContent {
	namespace?: string
	title?: string
	body: string
	footer?: string
	buttons: TemplateButtonEntry[]
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerLocation?: { latitude: number; longitude: number; name?: string; address?: string }
}

/** A single native-flow button — pass exactly one of id / copy / url / call / sections */
export interface NativeFlowButton {
	/** Quick-reply — sends this id back when tapped */
	id?: string
	/** Copy-to-clipboard */
	copy?: string
	/** Open URL */
	url?: string
	/** Dial phone number */
	call?: string
	/** Single-select picker (section list inside button) */
	sections?: proto.Message.ListMessage.ISection[]
	/** Raw pass-through: set name + paramsJson directly */
	name?: string
	paramsJson?: string
	/** Display text (falls back to emoji defaults when absent) */
	text?: string
	buttonText?: string
	/** WA button icon keyword e.g. 'LINK', 'PHONE', 'CALENDAR' */
	icon?: string
	/** Open URL inside in-app WebView */
	useWebview?: boolean
}

export interface NativeFlowOptions {
	buttons?: NativeFlowButton[]
	/** Limited-time offer strip */
	offerText?: string
	offerUrl?: string
	offerCode?: string
	offerExpiration?: number
	/** Bottom-sheet option panel */
	optionText?: string
	optionTitle?: string
	/** WA Business collection JID */
	bizJid?: string
	id?: string
	/** WA Business shop storefront surface */
	shopSurface?: number
}

// ─── Core native-flow builder (LIA logic + INNO types) ───────────────────────

/**
 * Build the nativeFlowMessage payload from a flexible button array.
 * Handles: quick_reply, cta_url, cta_copy, cta_call, single_select, raw name/paramsJson.
 * Adds offer strips and bottom-sheet option panels when present.
 */
export const buildNativeFlowMessage = (
	source: NativeFlowOptions | NativeFlowButton[],
	messageText?: string
): proto.Message.IInteractiveMessage['nativeFlowMessage'] => {
	const isArray = Array.isArray(source)
	const opts: NativeFlowOptions = isArray ? { buttons: source } : source
	const rawButtons = opts.buttons ?? (isArray ? (source as NativeFlowButton[]) : [])

	const messageParamsJson: Record<string, unknown> = {}

	// Offer strip
	if (opts.offerText) {
		messageParamsJson['limited_time_offer'] = {
			text: opts.offerText,
			url: opts.offerUrl ?? 'https://github.com/WhiskeySockets/Baileys',
			copy_code: opts.offerCode,
			expiration_time: opts.offerExpiration
		}
	}

	// Bottom-sheet option panel
	if (opts.optionText) {
		messageParamsJson['bottom_sheet'] = {
			in_thread_buttons_limit: 1,
			divider_indices: Array.from({ length: rawButtons.length }, (_, i) => i),
			list_title: opts.optionTitle ?? '📄 Select Options',
			button_title: opts.optionText
		}
	}

	const buttons = rawButtons.map((btn): proto.Message.InteractiveMessage.NativeFlowMessage.INativeFlowButton => {
		const text = btn.text ?? btn.buttonText
		const iconField = btn.icon?.toUpperCase()

		if (btn.id !== undefined) {
			return {
				name: 'quick_reply',
				buttonParamsJson: JSON.stringify({
					display_text: text ?? '👉 Click',
					id: btn.id,
					icon: iconField
				})
			}
		}
		if (btn.copy !== undefined) {
			return {
				name: 'cta_copy',
				buttonParamsJson: JSON.stringify({
					display_text: text ?? '📋 Copy',
					copy_code: btn.copy,
					icon: iconField
				})
			}
		}
		if (btn.url !== undefined) {
			return {
				name: 'cta_url',
				buttonParamsJson: JSON.stringify({
					display_text: text ?? '🌐 Visit',
					url: btn.url,
					merchant_url: btn.url,
					webview_interaction: btn.useWebview,
					icon: iconField
				})
			}
		}
		if (btn.call !== undefined) {
			return {
				name: 'cta_call',
				buttonParamsJson: JSON.stringify({
					display_text: text ?? '📞 Call',
					phone_number: btn.call,
					icon: iconField
				})
			}
		}
		if (btn.sections !== undefined) {
			return {
				name: 'single_select',
				buttonParamsJson: JSON.stringify({
					title: text ?? '📋 Select',
					sections: btn.sections,
					icon: iconField
				})
			}
		}
		// Raw pass-through
		return { name: btn.name ?? 'quick_reply', buttonParamsJson: btn.paramsJson ?? '{}' }
	})

	return {
		buttons,
		messageParamsJson: JSON.stringify(messageParamsJson),
		messageVersion: 3
	}
}

// ─── Validator helpers (LIA) ──────────────────────────────────────────────────

/** Returns truthy if the message object has a valid interactive header media */
export const hasValidInteractiveHeader = (m: proto.IMessage) =>
	m.imageMessage || m.videoMessage || m.documentMessage || m.productMessage || m.locationMessage

/** Returns truthy if the message object has a valid carousel card header media */
export const hasValidCarouselHeader = (m: proto.IMessage) => m.imageMessage || m.videoMessage || m.productMessage

// ─── Standalone utility functions (INNO typed API) ───────────────────────────

/**
 * Build a buttons-style message (old buttonsMessage proto).
 * Supports text, image, video, and document headers.
 */
export const generateInteractiveButtonMessage = async (
	content: InteractiveButtonsContent,
	options?: MediaGenerationOptions
): Promise<WAMessageContent> => {
	const buttons = content.buttons.map((btn, idx) => ({
		buttonId: btn.buttonId ?? `btn-${idx}`,
		buttonText: { displayText: btn.displayText },
		type: proto.Message.ButtonsMessage.Button.Type.RESPONSE
	}))

	const msg: proto.Message.IButtonsMessage = {
		contentText: content.body,
		footerText: content.footer,
		buttons,
		headerType: proto.Message.ButtonsMessage.HeaderType.EMPTY
	}

	if (content.headerImage && options) {
		const media = await prepareWAMessageMedia({ image: content.headerImage }, options)
		msg.imageMessage = media.imageMessage
		msg.headerType = proto.Message.ButtonsMessage.HeaderType.IMAGE
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia({ video: content.headerVideo }, options)
		msg.videoMessage = media.videoMessage
		msg.headerType = proto.Message.ButtonsMessage.HeaderType.VIDEO
	} else if (content.headerDocument && options) {
		const media = await prepareWAMessageMedia(
			{
				document: content.headerDocument,
				mimetype: 'application/pdf',
				fileName: (content.headerDocument as any).filename
			},
			options
		)
		msg.documentMessage = media.documentMessage
		msg.headerType = proto.Message.ButtonsMessage.HeaderType.DOCUMENT
	} else if (content.title) {
		msg.text = content.title
		msg.headerType = proto.Message.ButtonsMessage.HeaderType.TEXT
	}

	return { buttonsMessage: msg }
}

/**
 * Build a list message (single-select sections).
 */
export const generateInteractiveListMessage = (content: InteractiveListContent): WAMessageContent => {
	const sections = content.sections.map(section => ({
		title: section.title,
		rows: section.rows.map(row => ({
			rowId: row.rowId,
			title: row.title,
			description: row.description ?? ''
		}))
	}))

	return {
		listMessage: {
			title: content.title,
			description: content.description ?? '',
			buttonText: content.buttonText,
			footerText: content.footer ?? '',
			listType: proto.Message.ListMessage.ListType.SINGLE_SELECT,
			sections
		}
	}
}

/**
 * Build a template message (hydratedFourRowTemplate) — shown on iOS/Web/Desktop.
 */
export const generateTemplateMessage = async (
	content: TemplateContent,
	options?: MediaGenerationOptions
): Promise<WAMessageContent> => {
	const hydratedButtons = content.buttons.map(btn => {
		const h: proto.Message.HydratedFourRowTemplate.IHydratedButton = { index: btn.index }
		if (btn.quickReplyButton)
			h.quickReplyButton = { displayText: btn.quickReplyButton.displayText, id: btn.quickReplyButton.id }
		if (btn.urlButton) h.urlButton = { displayText: btn.urlButton.displayText, url: btn.urlButton.url }
		if (btn.callButton)
			h.callButton = { displayText: btn.callButton.displayText, phoneNumber: btn.callButton.phoneNumber }
		return h
	})

	const tmpl: proto.Message.IHydratedFourRowTemplate = {
		hydratedContentText: content.body,
		hydratedFooterText: content.footer,
		hydratedButtons
	}

	if (content.title) tmpl.hydratedTitleText = content.title
	if (content.headerImage && options) {
		const m = await prepareWAMessageMedia({ image: content.headerImage }, options)
		tmpl.imageMessage = m.imageMessage
	}
	if (content.headerVideo && options) {
		const m = await prepareWAMessageMedia({ video: content.headerVideo }, options)
		tmpl.videoMessage = m.videoMessage
	}
	if (content.headerLocation) {
		tmpl.locationMessage = {
			degreesLatitude: content.headerLocation.latitude,
			degreesLongitude: content.headerLocation.longitude,
			name: content.headerLocation.name,
			address: content.headerLocation.address
		}
	}

	return { templateMessage: { hydratedTemplate: tmpl } }
}

/**
 * Build an interactiveMessage with nativeFlowMessage buttons — the modern WA button type.
 * Works on iOS, Android and WhatsApp Web.
 */
export const generateNativeFlowMessage = (
	body: string,
	buttons: Array<{ name: string; buttonParamsJson: string }>,
	options?: { footer?: string; header?: { title?: string; subtitle?: string; hasMediaAttachment?: boolean } }
): WAMessageContent => ({
	interactiveMessage: {
		body: { text: body },
		footer: options?.footer ? { text: options.footer } : undefined,
		header: options?.header
			? {
					title: options.header.title,
					subtitle: options.header.subtitle,
					hasMediaAttachment: options.header.hasMediaAttachment ?? false
				}
			: { hasMediaAttachment: false },
		nativeFlowMessage: { buttons, messageParamsJson: '' }
	}
})

/** Quick-build: single copy-code button */
export const generateCopyCodeButton = (
	body: string,
	copyCode: string,
	displayText = 'Copy Code',
	options?: { footer?: string }
): WAMessageContent =>
	generateNativeFlowMessage(
		body,
		[{ name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: displayText, copy_code: copyCode }) }],
		options
	)

/** Quick-build: one or more URL buttons */
export const generateUrlButtonMessage = (
	body: string,
	buttons: Array<{ displayText: string; url: string; merchantUrl?: string }>,
	options?: { footer?: string; title?: string }
): WAMessageContent =>
	generateNativeFlowMessage(
		body,
		buttons.map(b => ({
			name: 'cta_url',
			buttonParamsJson: JSON.stringify({ display_text: b.displayText, url: b.url, merchant_url: b.merchantUrl })
		})),
		{ footer: options?.footer, header: options?.title ? { title: options.title } : undefined }
	)

/** Quick-build: one or more quick-reply buttons */
export const generateQuickReplyButtons = (
	body: string,
	buttons: Array<{ id: string; displayText: string }>,
	options?: { footer?: string; title?: string }
): WAMessageContent =>
	generateNativeFlowMessage(
		body,
		buttons.map(b => ({
			name: 'quick_reply',
			buttonParamsJson: JSON.stringify({ display_text: b.displayText, id: b.id })
		})),
		{ footer: options?.footer, header: options?.title ? { title: options.title } : undefined }
	)

/** Quick-build: mixed button types in one message */
export const generateCombinedButtons = (
	body: string,
	buttons: Array<
		| { type: 'url'; displayText: string; url: string }
		| { type: 'reply'; displayText: string; id: string }
		| { type: 'copy'; displayText: string; copyCode: string }
		| { type: 'call'; displayText: string; phoneNumber: string }
	>,
	options?: { footer?: string; title?: string }
): WAMessageContent => {
	const nativeButtons = buttons.map(b => {
		switch (b.type) {
			case 'url':
				return { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: b.displayText, url: b.url }) }
			case 'reply':
				return { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: b.displayText, id: b.id }) }
			case 'copy':
				return {
					name: 'cta_copy',
					buttonParamsJson: JSON.stringify({ display_text: b.displayText, copy_code: b.copyCode })
				}
			case 'call':
				return {
					name: 'cta_call',
					buttonParamsJson: JSON.stringify({ display_text: b.displayText, phone_number: b.phoneNumber })
				}
		}
	})
	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

// ─── Shop / Collection / PAY / PIX / Product List builders ───────────────────

/**
 * Generate a WA Business Collection message (shows biz product catalog inline).
 * Requires a bizJid (business account JID) and at least one nativeFlow button.
 */
export const generateCollectionMessage = (
	body: string,
	bizJid: string,
	buttons: NativeFlowButton[],
	options?: { footer?: string; id?: string }
): proto.IMessage => ({
	interactiveMessage: {
		body: { text: body },
		footer: options?.footer ? { text: options.footer } : undefined,
		header: { hasMediaAttachment: false },
		nativeFlowMessage: buildNativeFlowMessage({ buttons }),
		collectionMessage: {
			bizJid,
			id: options?.id ?? `col_${Date.now()}`,
			messageVersion: 1
		}
	}
})

/**
 * Generate a WA Business Shop message (opens storefront surface).
 * surface: 1 = catalog, 2 = order, 3 = product
 */
export const generateShopMessage = (
	body: string,
	surface: number,
	buttons: NativeFlowButton[],
	options?: { footer?: string; id?: string }
): proto.IMessage => ({
	interactiveMessage: {
		body: { text: body },
		footer: options?.footer ? { text: options.footer } : undefined,
		header: { hasMediaAttachment: false },
		nativeFlowMessage: buildNativeFlowMessage({ buttons }),
		shopStorefrontMessage: {
			surface,
			id: options?.id ?? `shop_${Date.now()}`,
			messageVersion: 1
		}
	}
})

/**
 * Generate a native-flow PAY button message (payment flow).
 * Builds a cta_url button pointing to payment URL.
 */
export const generatePayButtonMessage = (
	body: string,
	paymentUrl: string,
	options?: {
		displayText?: string
		footer?: string
		title?: string
	}
): proto.IMessage =>
	generateNativeFlowMessage(
		body,
		[
			{
				name: 'cta_url',
				buttonParamsJson: JSON.stringify({
					display_text: options?.displayText ?? '💳 Pay Now',
					url: paymentUrl,
					merchant_url: paymentUrl
				})
			}
		],
		{ footer: options?.footer, header: options?.title ? { title: options.title } : undefined }
	)

/**
 * Generate a native-flow PIX button message (Brazilian instant payment).
 */
export const generatePixButtonMessage = (
	body: string,
	pixKey: string,
	options?: {
		displayText?: string
		footer?: string
		amount?: number
		description?: string
	}
): proto.IMessage =>
	generateNativeFlowMessage(
		body,
		[
			{
				name: 'cta_copy',
				buttonParamsJson: JSON.stringify({
					display_text: options?.displayText ?? '🔑 Copy PIX Key',
					copy_code: pixKey
				})
			}
		],
		{
			footer: options?.footer
				? `${options.footer}${options.amount ? ` • R$ ${options.amount.toFixed(2)}` : ''}`
				: options?.amount
					? `Value: R$ ${options.amount.toFixed(2)}`
					: undefined
		}
	)

/**
 * Generate an interactive product list message.
 * Each section can contain product items — renders as a selectable product catalog.
 */
export const generateProductListMessage = (
	body: string,
	sections: Array<{
		title: string
		products: Array<{
			productId: string
			catalogId: string
			title?: string
			description?: string
			price?: number
			currencyCode?: string
			thumbnail?: Buffer
		}>
	}>,
	options?: { footer?: string; title?: string; buttonText?: string }
): proto.IMessage => {
	const listSections = sections.map(sec => ({
		title: sec.title,
		rows: sec.products.map((p, i) => ({
			rowId: p.productId,
			title: p.title ?? `Product ${i + 1}`,
			description: [p.description, p.price !== undefined ? `${p.currencyCode ?? '$'} ${p.price.toFixed(2)}` : undefined]
				.filter(Boolean)
				.join(' — ')
		}))
	}))

	return {
		listMessage: {
			title: options?.title ?? body,
			description: body,
			buttonText: options?.buttonText ?? '🛍️ View Products',
			footerText: options?.footer ?? '',
			listType: proto.Message.ListMessage.ListType.PRODUCT_LIST,
			sections: listSections
		}
	}
}

// ─── PAY / PIX Payment flow buttons (Brazil specific) ────────────────────────

/** Build a PAY (WhatsApp Pay) native-flow interactive message */
export const generatePaymentButton = (
	body: string,
	options: {
		amount: number
		currency?: string
		merchant?: string
		referenceId?: string
		footer?: string
		title?: string
	}
): WAMessageContent =>
	generateNativeFlowMessage(
		body,
		[
			{
				name: 'payment_info',
				buttonParamsJson: JSON.stringify({
					currency: options.currency ?? 'BRL',
					amount: String(options.amount),
					merchant_jid: options.merchant ?? '',
					reference_id: options.referenceId ?? `ref_${Date.now()}`
				})
			}
		],
		{ footer: options.footer, header: options.title ? { title: options.title } : undefined }
	)

/** Build a PIX payment native-flow interactive message */
export const generatePixButton = (
	body: string,
	options: {
		pixKey: string
		amount: number
		name?: string
		description?: string
		footer?: string
		title?: string
	}
): WAMessageContent =>
	generateNativeFlowMessage(
		body,
		[
			{
				name: 'pix_key',
				buttonParamsJson: JSON.stringify({
					pix_key: options.pixKey,
					amount: String(options.amount),
					name: options.name ?? '',
					description: options.description ?? ''
				})
			}
		],
		{ footer: options.footer, header: options.title ? { title: options.title } : undefined }
	)

/** Build a product list interactive message (single-select rows with products) */
export const generateProductListMessage = (
	body: string,
	products: Array<{
		id: string
		title: string
		description?: string
		price?: number
		currency?: string
	}>,
	options?: {
		buttonText?: string
		footer?: string
		title?: string
	}
): WAMessageContent => {
	const sections = [
		{
			title: options?.title ?? 'Products',
			rows: products.map(p => ({
				rowId: p.id,
				title: p.title,
				description: p.description ?? (p.price ? `${p.currency ?? 'USD'} ${p.price}` : '')
			}))
		}
	]

	return generateNativeFlowMessage(
		body,
		[
			{
				name: 'single_select',
				buttonParamsJson: JSON.stringify({ title: options?.buttonText ?? '🛒 Browse', sections })
			}
		],
		{ footer: options?.footer }
	)
}

// ─── Buttons Reply Message (user tapped a classic button) ────────────────────

/**
 * Build a buttons-reply message (buttonsResponseMessage) — sent when
 * the user taps one of the classic iOS/Android buttons.
 *
 * @example
 * await sock.sendMessage(jid, generateButtonReplyMessage('btn_1', 'Yes'))
 */
export const generateButtonReplyMessage = (
	buttonId: string,
	displayText: string,
	options?: { quotedMessageId?: string; participantJid?: string }
): WAMessageContent => ({
	buttonsResponseMessage: {
		selectedButtonId: buttonId,
		selectedDisplayText: displayText,
		type: proto.Message.ButtonsResponseMessage.Type.DISPLAY_TEXT,
		contextInfo: options?.quotedMessageId
			? { stanzaId: options.quotedMessageId, participant: options.participantJid }
			: undefined
	}
})

/**
 * Build a list-reply message (listResponseMessage) — sent when
 * the user selects a row from a list message.
 */
export const generateListReplyMessage = (rowId: string, title?: string, description?: string): WAMessageContent => ({
	listResponseMessage: {
		singleSelectReply: { selectedRowId: rowId },
		title,
		description,
		listType: proto.Message.ListResponseMessage.ListType.SINGLE_SELECT
	}
})

/**
 * Build a template-button reply message — sent when
 * the user taps one of the template buttons.
 */
export const generateTemplateButtonReplyMessage = (
	selectedId: string,
	selectedDisplayText: string,
	index: number = 0
): WAMessageContent => ({
	templateButtonReplyMessage: {
		selectedId,
		selectedDisplayText,
		index
	}
})

// ─── Lottie Sticker / Keep Chat / Flow Reply helpers ─────────────────────────

/**
 * Wrap any message content as a Lottie sticker message.
 * The recipient's client renders the inner message as an animated sticker.
 * Usage: sendMessage(jid, generateLottieStickerMessage({ sticker: buffer }))
 */
export const generateLottieStickerMessage = (innerContent: any): WAMessageContent => ({
	lottieStickerMessage: { message: innerContent }
})

/**
 * Build a keepInChat message — pins or unpins a message in the keep-in-chat tray.
 * @param key  - The WAMessageKey of the message to keep
 * @param keep - true = keep (default), false = unkeep
 *
 * @example
 * await sock.sendMessage(jid, generateKeepChatMessage(msg.key))          // keep
 * await sock.sendMessage(jid, generateKeepChatMessage(msg.key, false))   // unkeep
 */
export const generateKeepChatMessage = (key: proto.IMessageKey, keep: boolean = true): WAMessageContent => ({
	keepInChatMessage: {
		key,
		keepType: keep ? 1 : 0,
		timestampMs: Date.now()
	}
})

/**
 * Build an interactive flow-reply message (user responded to a WhatsApp Flow).
 *
 * @example
 * await sock.sendMessage(jid, generateFlowReplyMessage({
 *     name:       'flow_name',
 *     paramsJson: JSON.stringify({ selected_id: 'opt_1' })
 * }))
 */
export const generateFlowReplyMessage = (flow: {
	name: string
	paramsJson?: string
	text?: string
	version?: number
}): WAMessageContent => ({
	interactiveResponseMessage: {
		body: {
			format: proto.Message.InteractiveResponseMessage.Body.Format.DEFAULT,
			text: flow.text ?? ''
		},
		nativeFlowResponseMessage: {
			name: flow.name,
			paramsJson: flow.paramsJson ?? '{}',
			version: flow.version ?? 1
		}
	}
})
