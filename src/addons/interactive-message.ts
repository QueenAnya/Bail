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
