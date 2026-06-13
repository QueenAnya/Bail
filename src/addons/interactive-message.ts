/**
 * Interactive / Button / Template / List / Carousel Messages
 *
 * Merged best-of-both from @itsliaaa/baileys and @innovatorssoft/baileys.
 * - Classic buttons (ButtonsMessage) — works on iOS + Android
 * - Interactive buttons (native flow) — modern WA interactive protocol
 * - Template buttons (HydratedTemplateMessage)
 * - List / Sections messages
 * - Cards / Carousel messages
 * - Shop / Collection messages
 * - Copy-code, URL, quick-reply, call, combined button helpers
 */

import { proto } from '../../WAProto/index.js'
import type { WAMediaUpload, MessageContentGenerationOptions } from '../Types/index.js'
import { prepareWAMessageMedia } from '../Utils/messages.js'

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonDef = {
	buttonId?: string
	displayText: string
}

export type ButtonHeaderType = 'empty' | 'text' | 'image' | 'video' | 'document'

export type InteractiveButtonMessageOptions = {
	body: string
	footer?: string
	buttons: ButtonDef[]
	title?: string
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerDocument?: { file: WAMediaUpload; filename?: string }
}

export type ListSection = {
	title: string
	rows: { rowId: string; title: string; description?: string }[]
}

export type InteractiveListMessageOptions = {
	title: string
	description?: string
	buttonText: string
	footer?: string
	sections: ListSection[]
}

export type TemplateButtonDef = {
	index: number
	quickReplyButton?: { displayText: string; id: string }
	urlButton?: { displayText: string; url: string }
	callButton?: { displayText: string; phoneNumber: string }
}

export type TemplateMessageOptions = {
	body: string
	footer?: string
	title?: string
	buttons: TemplateButtonDef[]
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerLocation?: { latitude: number; longitude: number; name?: string; address?: string }
}

export type NativeFlowButton = {
	name: string
	buttonParamsJson: string
}

export type NativeFlowOptions = {
	footer?: string
	header?: {
		title?: string
		subtitle?: string
		hasMediaAttachment?: boolean
	}
}

export type UrlButtonDef = {
	displayText: string
	url: string
	merchantUrl?: string
}

export type QuickReplyButtonDef = {
	displayText: string
	id: string
}

export type CombinedButtonDef =
	| { type: 'url'; displayText: string; url: string }
	| { type: 'reply'; displayText: string; id: string }
	| { type: 'copy'; displayText: string; copyCode: string }
	| { type: 'call'; displayText: string; phoneNumber: string }

export type CarouselCard = {
	title?: string
	body: string
	footer?: string
	mediaImage?: WAMediaUpload
	mediaVideo?: WAMediaUpload
	buttons: CombinedButtonDef[]
}

export type CarouselMessageOptions = {
	cards: CarouselCard[]
	header?: NativeFlowOptions['header']
}

// ─── Classic Buttons (ButtonsMessage — iOS + Android) ────────────────────────

/**
 * Build a classic ButtonsMessage (works on iOS and Android clients).
 * Supports text/image/video/document headers.
 */
export const generateInteractiveButtonMessage = async (
	content: InteractiveButtonMessageOptions,
	options?: MessageContentGenerationOptions
): Promise<proto.IMessage> => {
	const buttons = content.buttons.map((btn, idx) => ({
		buttonId: btn.buttonId ?? `btn-${idx}`,
		buttonText: { displayText: btn.displayText },
		type: proto.Message.ButtonsMessage.Button.Type.RESPONSE,
		nativeFlowInfo: undefined
	}))

	const buttonsMessage: proto.Message.IButtonsMessage = {
		contentText: content.body,
		footerText: content.footer,
		buttons,
		headerType: proto.Message.ButtonsMessage.HeaderType.EMPTY
	}

	if (content.headerImage && options) {
		const media = await prepareWAMessageMedia({ image: content.headerImage }, options)
		buttonsMessage.imageMessage = media.imageMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.IMAGE
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia({ video: content.headerVideo }, options)
		buttonsMessage.videoMessage = media.videoMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.VIDEO
	} else if (content.headerDocument && options) {
		const media = await prepareWAMessageMedia(
			{
				document: content.headerDocument.file,
				mimetype: 'application/pdf',
				fileName: content.headerDocument.filename
			},
			options
		)
		buttonsMessage.documentMessage = media.documentMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.DOCUMENT
	} else if (content.title) {
		buttonsMessage.text = content.title
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.TEXT
	}

	return { buttonsMessage }
}

// ─── Interactive List Message ────────────────────────────────────────────────

/**
 * Build a ListMessage (single-select section list).
 */
export const generateInteractiveListMessage = (content: InteractiveListMessageOptions): proto.IMessage => {
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

// ─── Template Message ────────────────────────────────────────────────────────

/**
 * Build a HydratedTemplateMessage with optional media header.
 */
export const generateTemplateMessage = async (
	content: TemplateMessageOptions,
	options?: MessageContentGenerationOptions
): Promise<proto.IMessage> => {
	const hydratedButtons: proto.Message.HydratedTemplateMessage.IHydratedTemplateButton[] = content.buttons.map(btn => {
		const hydratedBtn: proto.Message.HydratedTemplateMessage.IHydratedTemplateButton = {
			index: btn.index
		}
		if (btn.quickReplyButton) {
			hydratedBtn.quickReplyButton = {
				displayText: btn.quickReplyButton.displayText,
				id: btn.quickReplyButton.id
			}
		} else if (btn.urlButton) {
			hydratedBtn.urlButton = {
				displayText: btn.urlButton.displayText,
				url: btn.urlButton.url
			}
		} else if (btn.callButton) {
			hydratedBtn.callButton = {
				displayText: btn.callButton.displayText,
				phoneNumber: btn.callButton.phoneNumber
			}
		}
		return hydratedBtn
	})

	const hydratedTemplate: proto.Message.HydratedTemplateMessage.IHydratedFourRowTemplate = {
		hydratedContentText: content.body,
		hydratedFooterText: content.footer,
		hydratedButtons
	}

	if (content.title) hydratedTemplate.hydratedTitleText = content.title

	if (content.headerImage && options) {
		const media = await prepareWAMessageMedia({ image: content.headerImage }, options)
		hydratedTemplate.imageMessage = media.imageMessage
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia({ video: content.headerVideo }, options)
		hydratedTemplate.videoMessage = media.videoMessage
	} else if (content.headerLocation) {
		hydratedTemplate.locationMessage = {
			degreesLatitude: content.headerLocation.latitude,
			degreesLongitude: content.headerLocation.longitude,
			name: content.headerLocation.name,
			address: content.headerLocation.address
		}
	}

	return {
		templateMessage: {
			hydratedTemplate
		}
	}
}

// ─── Native Flow (Interactive) Message helpers ───────────────────────────────

/**
 * Core native-flow InteractiveMessage builder.
 */
export const generateNativeFlowMessage = (
	body: string,
	buttons: NativeFlowButton[],
	options?: NativeFlowOptions
): proto.IMessage => {
	return {
		interactiveMessage: {
			body: { text: body },
			footer: options?.footer ? { text: options.footer } : undefined,
			header: options?.header
				? {
						title: options.header.title,
						subtitle: options.header.subtitle,
						hasMediaAttachment: options.header.hasMediaAttachment ?? false
					}
				: undefined,
			nativeFlowMessage: {
				buttons,
				messageParamsJson: ''
			}
		}
	}
}

/**
 * Build a copy-code native-flow button message.
 */
export const generateCopyCodeButton = (
	body: string,
	copyCode: string,
	displayText = 'Copy Code',
	options?: NativeFlowOptions
): proto.IMessage => {
	return generateNativeFlowMessage(
		body,
		[
			{
				name: 'cta_copy',
				buttonParamsJson: JSON.stringify({ display_text: displayText, copy_code: copyCode })
			}
		],
		options
	)
}

/**
 * Build a URL button native-flow message.
 */
export const generateUrlButtonMessage = (
	body: string,
	buttons: UrlButtonDef[],
	options?: NativeFlowOptions & { title?: string }
): proto.IMessage => {
	const nativeButtons = buttons.map(btn => ({
		name: 'cta_url',
		buttonParamsJson: JSON.stringify({
			display_text: btn.displayText,
			url: btn.url,
			merchant_url: btn.merchantUrl
		})
	}))
	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

/**
 * Build quick-reply native-flow buttons.
 */
export const generateQuickReplyButtons = (
	body: string,
	buttons: QuickReplyButtonDef[],
	options?: NativeFlowOptions & { title?: string }
): proto.IMessage => {
	const nativeButtons = buttons.map(btn => ({
		name: 'quick_reply',
		buttonParamsJson: JSON.stringify({ display_text: btn.displayText, id: btn.id })
	}))
	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

/**
 * Build combined multi-type native-flow buttons (url | reply | copy | call).
 */
export const generateCombinedButtons = (
	body: string,
	buttons: CombinedButtonDef[],
	options?: NativeFlowOptions & { title?: string }
): proto.IMessage => {
	const nativeButtons = buttons.map(btn => {
		switch (btn.type) {
			case 'url':
				return {
					name: 'cta_url',
					buttonParamsJson: JSON.stringify({ display_text: btn.displayText, url: btn.url })
				}
			case 'reply':
				return {
					name: 'quick_reply',
					buttonParamsJson: JSON.stringify({ display_text: btn.displayText, id: btn.id })
				}
			case 'copy':
				return {
					name: 'cta_copy',
					buttonParamsJson: JSON.stringify({
						display_text: btn.displayText,
						copy_code: btn.copyCode
					})
				}
			case 'call':
				return {
					name: 'cta_call',
					buttonParamsJson: JSON.stringify({
						display_text: btn.displayText,
						phone_number: btn.phoneNumber
					})
				}
		}
	})
	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

// ─── Carousel / Cards Message ─────────────────────────────────────────────────

/**
 * Build a cards/carousel InteractiveMessage.
 * Each card can have its own media, body, and buttons.
 */
export const generateCarouselMessage = (options: CarouselMessageOptions): proto.IMessage => {
	const cards = options.cards.map(card => {
		const buttons: NativeFlowButton[] = card.buttons.map(btn => {
			switch (btn.type) {
				case 'url':
					return {
						name: 'cta_url',
						buttonParamsJson: JSON.stringify({ display_text: btn.displayText, url: btn.url })
					}
				case 'reply':
					return {
						name: 'quick_reply',
						buttonParamsJson: JSON.stringify({ display_text: btn.displayText, id: btn.id })
					}
				case 'copy':
					return {
						name: 'cta_copy',
						buttonParamsJson: JSON.stringify({
							display_text: btn.displayText,
							copy_code: btn.copyCode
						})
					}
				case 'call':
					return {
						name: 'cta_call',
						buttonParamsJson: JSON.stringify({
							display_text: btn.displayText,
							phone_number: btn.phoneNumber
						})
					}
			}
		})

		return {
			header: {
				title: card.title,
				hasMediaAttachment: !!(card.mediaImage || card.mediaVideo)
			},
			body: { text: card.body },
			footer: card.footer ? { text: card.footer } : undefined,
			nativeFlowMessage: { buttons, messageParamsJson: '' }
		}
	})

	return {
		interactiveMessage: {
			header: options.header
				? {
						title: options.header.title,
						hasMediaAttachment: options.header.hasMediaAttachment ?? false
					}
				: undefined,
			carouselMessage: { cards }
		}
	}
}

// ─── Shop / Collection helpers ────────────────────────────────────────────────

/**
 * Build a shop-button (single product catalogue CTA) message.
 */
export const generateShopMessage = (
	body: string,
	options?: {
		footer?: string
		thumbnail?: WAMediaUpload
		shopId?: string
	}
): proto.IMessage => {
	return generateNativeFlowMessage(
		body,
		[
			{
				name: 'cta_url',
				buttonParamsJson: JSON.stringify({
					display_text: 'View Shop',
					url: `https://wa.me/c/${options?.shopId ?? ''}`
				})
			}
		],
		{ footer: options?.footer }
	)
}

/**
 * Build a WhatsApp collection / catalogue message.
 */
export const generateCollectionMessage = (
	body: string,
	catalogId: string,
	options?: { footer?: string }
): proto.IMessage => {
	return generateNativeFlowMessage(
		body,
		[
			{
				name: 'cta_url',
				buttonParamsJson: JSON.stringify({
					display_text: 'View Catalogue',
					url: `https://wa.me/c/${catalogId}`
				})
			}
		],
		options
	)
}
