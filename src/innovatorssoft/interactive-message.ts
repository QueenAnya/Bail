/**
 * Interactive Message / Buttons Helpers
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * Convenience builders for buttons, lists, templates, and native-flow
 * (URL / quick-reply / copy-code / call) button messages, plus
 * Shop / Collection / Cards (Carousel) messages.
 */

import { Boom } from '@hapi/boom'
import { proto } from '../../WAProto/index.js'
import type { WAMediaUpload, WAMessageContent } from '../Types'
import type { MediaGenerationOptions } from '../Types/Message'
import { prepareWAMessageMedia } from '../Utils/messages'
import {
	prepareNativeFlowButtons,
	normalizeCardMediaInput,
	type NativeFlowShorthandSource
} from './native-flow-buttons'

export interface InteractiveButton {
	name?: string
	buttonId: string
	displayText: string
}

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

export interface ListSection {
	title: string
	rows: ListRow[]
}

export interface ListRow {
	rowId: string
	title: string
	description?: string
}

export interface InteractiveListMessage {
	title: string
	buttonText: string
	sections: ListSection[]
	footer?: string
	description?: string
	/** Source: innovatorssoft/baileys — turns this into a "Product List" message */
	productListInfo?: {
		productSections: Array<{
			title: string
			products: Array<{ productId: string }>
		}>
		headerImage?: unknown
		businessOwnerJid?: string
	}
}

export interface InteractiveButtonsMessage {
	title?: string
	body: string
	footer?: string
	buttons: InteractiveButton[]
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerDocument?: WAMediaUpload & { filename?: string }
}

export interface TemplateButton {
	index: number
	quickReplyButton?: QuickReplyButton
	urlButton?: UrlButton
	callButton?: CallButton
}

export interface TemplateMessage {
	namespace?: string
	title?: string
	body: string
	footer?: string
	buttons: TemplateButton[]
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerLocation?: {
		latitude: number
		longitude: number
		name?: string
		address?: string
	}
}

export const generateInteractiveButtonMessage = async (
	content: InteractiveButtonsMessage,
	options?: MediaGenerationOptions
): Promise<WAMessageContent> => {
	const buttons = content.buttons.map((btn, idx) => ({
		buttonId: btn.buttonId || `btn-${idx}`,
		buttonText: { displayText: btn.displayText },
		type: proto.Message.ButtonsMessage.Button.Type.RESPONSE,
		nativeFlowInfo: undefined
	}))

	const buttonsMessage: any = {
		contentText: content.body,
		footerText: content.footer,
		buttons,
		headerType: proto.Message.ButtonsMessage.HeaderType.EMPTY
	}

	if (content.headerImage && options) {
		const media = await prepareWAMessageMedia({ image: content.headerImage } as any, options)
		buttonsMessage.imageMessage = media.imageMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.IMAGE
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia({ video: content.headerVideo } as any, options)
		buttonsMessage.videoMessage = media.videoMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.VIDEO
	} else if (content.headerDocument && options) {
		const media = await prepareWAMessageMedia(
			{
				document: content.headerDocument,
				mimetype: 'application/pdf',
				fileName: content.headerDocument.filename
			} as any,
			options
		)
		buttonsMessage.documentMessage = media.documentMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.DOCUMENT
	} else if (content.title) {
		buttonsMessage.text = content.title
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.TEXT
	}

	return { buttonsMessage } as unknown as WAMessageContent
}

export const generateInteractiveListMessage = (content: InteractiveListMessage): WAMessageContent => {
	const sections = content.sections.map(section => ({
		title: section.title,
		rows: section.rows.map(row => ({
			rowId: row.rowId,
			title: row.title,
			description: row.description || ''
		}))
	}))

	return {
		listMessage: {
			title: content.title,
			description: content.description || '',
			buttonText: content.buttonText,
			footerText: content.footer || '',
			listType: content.productListInfo
				? proto.Message.ListMessage.ListType.PRODUCT_LIST
				: proto.Message.ListMessage.ListType.SINGLE_SELECT,
			sections,
			productListInfo: content.productListInfo
		}
	} as unknown as WAMessageContent
}

export const generateTemplateMessage = async (
	content: TemplateMessage,
	options?: MediaGenerationOptions
): Promise<WAMessageContent> => {
	const hydratedButtons = content.buttons.map(btn => {
		const hydratedBtn: any = { index: btn.index }

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

	const hydratedTemplate: any = {
		hydratedContentText: content.body,
		hydratedFooterText: content.footer,
		hydratedButtons
	}

	if (content.title) {
		hydratedTemplate.hydratedTitleText = content.title
	}

	if (content.headerImage && options) {
		const media = await prepareWAMessageMedia({ image: content.headerImage } as any, options)
		hydratedTemplate.imageMessage = media.imageMessage
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia({ video: content.headerVideo } as any, options)
		hydratedTemplate.videoMessage = media.videoMessage
	} else if (content.headerLocation) {
		hydratedTemplate.locationMessage = {
			degreesLatitude: content.headerLocation.latitude,
			degreesLongitude: content.headerLocation.longitude,
			name: content.headerLocation.name,
			address: content.headerLocation.address
		}
	}

	return { templateMessage: { hydratedTemplate } } as unknown as WAMessageContent
}

export const generateNativeFlowMessage = (
	body: string,
	buttons: Array<{ name: string; buttonParamsJson: string }>,
	options?: {
		footer?: string
		header?: { title?: string; subtitle?: string; hasMediaAttachment?: boolean }
	}
): WAMessageContent => {
	const nativeFlowButtons = buttons.map(btn => ({
		name: btn.name,
		buttonParamsJson: btn.buttonParamsJson
	}))

	return {
		interactiveMessage: {
			body: { text: body },
			footer: options?.footer ? { text: options.footer } : undefined,
			header: options?.header
				? {
						title: options.header.title,
						subtitle: options.header.subtitle,
						hasMediaAttachment: options.header.hasMediaAttachment || false
					}
				: undefined,
			nativeFlowMessage: {
				buttons: nativeFlowButtons,
				messageParamsJson: ''
			}
		}
	} as unknown as WAMessageContent
}

export const generateCopyCodeButton = (
	body: string,
	copyCode: string,
	displayText = 'Copy Code',
	options?: { footer?: string }
): WAMessageContent => {
	return generateNativeFlowMessage(
		body,
		[{ name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: displayText, copy_code: copyCode }) }],
		options
	)
}

export const generateUrlButtonMessage = (
	body: string,
	buttons: Array<{ displayText: string; url: string; merchantUrl?: string }>,
	options?: { footer?: string; title?: string }
): WAMessageContent => {
	const nativeButtons = buttons.map(btn => ({
		name: 'cta_url',
		buttonParamsJson: JSON.stringify({ display_text: btn.displayText, url: btn.url, merchant_url: btn.merchantUrl })
	}))

	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

export const generateQuickReplyButtons = (
	body: string,
	buttons: Array<{ id: string; displayText: string }>,
	options?: { footer?: string; title?: string }
): WAMessageContent => {
	const nativeButtons = buttons.map(btn => ({
		name: 'quick_reply',
		buttonParamsJson: JSON.stringify({ display_text: btn.displayText, id: btn.id })
	}))

	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

type CombinedButton =
	| { type: 'url'; displayText: string; url: string }
	| { type: 'reply'; displayText: string; id: string }
	| { type: 'copy'; displayText: string; copyCode: string }
	| { type: 'call'; displayText: string; phoneNumber: string }

export const generateCombinedButtons = (
	body: string,
	buttons: CombinedButton[],
	options?: { footer?: string; title?: string }
): WAMessageContent => {
	const nativeButtons = buttons.map(btn => {
		switch (btn.type) {
			case 'url':
				return { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: btn.displayText, url: btn.url }) }
			case 'reply':
				return { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: btn.displayText, id: btn.id }) }
			case 'copy':
				return {
					name: 'cta_copy',
					buttonParamsJson: JSON.stringify({ display_text: btn.displayText, copy_code: btn.copyCode })
				}
			case 'call':
				return {
					name: 'cta_call',
					buttonParamsJson: JSON.stringify({ display_text: btn.displayText, phone_number: btn.phoneNumber })
				}
		}
	})

	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

// ── Shop / Collection / Cards (Carousel) Messages ─────────────────────────────

export interface ShopMessageOptions {
	surface: number
	id: string
	text?: string
	caption?: string
	title?: string
	subtitle?: string
	hasMediaAttachment?: boolean
	footer?: string
}

export const generateShopMessage = (content: ShopMessageOptions): WAMessageContent => {
	const interactiveMessage: any = {
		shopStorefrontMessage: { surface: content.surface, id: content.id }
	}

	if (content.text) {
		interactiveMessage.body = { text: content.text }
		interactiveMessage.header = { title: content.title, subtitle: content.subtitle, hasMediaAttachment: false }
	} else if (content.caption) {
		interactiveMessage.body = { text: content.caption }
		interactiveMessage.header = {
			title: content.title,
			subtitle: content.subtitle,
			hasMediaAttachment: content.hasMediaAttachment || false
		}
	}

	if (content.footer) {
		interactiveMessage.footer = { text: content.footer }
	}

	return { interactiveMessage } as unknown as WAMessageContent
}

export interface CollectionMessageOptions {
	bizJid: string
	id: string
	version?: number
	text?: string
	caption?: string
	title?: string
	subtitle?: string
	hasMediaAttachment?: boolean
	footer?: string
}

export const generateCollectionMessage = (content: CollectionMessageOptions): WAMessageContent => {
	const interactiveMessage: any = {
		collectionMessage: { bizJid: content.bizJid, id: content.id, messageVersion: content.version }
	}

	if (content.text) {
		interactiveMessage.body = { text: content.text }
		interactiveMessage.header = { title: content.title, subtitle: content.subtitle, hasMediaAttachment: false }
	} else if (content.caption) {
		interactiveMessage.body = { text: content.caption }
		interactiveMessage.header = {
			title: content.title,
			subtitle: content.subtitle,
			hasMediaAttachment: content.hasMediaAttachment || false
		}
	}

	if (content.footer) {
		interactiveMessage.footer = { text: content.footer }
	}

	return { interactiveMessage } as unknown as WAMessageContent
}

export interface CarouselCard extends NativeFlowShorthandSource {
	image?: WAMediaUpload
	video?: WAMediaUpload
	product?: { productImage: WAMediaUpload; [key: string]: unknown }
	title?: string
	caption?: string
	body?: string
	footer?: string
}

export interface CardsMessageOptions {
	cards: CarouselCard[]
	text?: string
	title?: string
	subtitle?: string
	footer?: string
}

export const generateCardsMessage = async (
	content: CardsMessageOptions,
	options: MediaGenerationOptions
): Promise<WAMessageContent> => {
	const slides = await Promise.all(
		content.cards.map(async card => {
			const { image, video, product, title, caption, body, footer, nativeFlow, ...mediaOptions } = card as any
			let header: any = {}

			if (product) {
				const normalizedProductImage = normalizeCardMediaInput(product.productImage)
				const { imageMessage } = await prepareWAMessageMedia(
					{ image: normalizedProductImage, ...mediaOptions } as any,
					options
				)
				header = { productMessage: { product: { ...product, productImage: imageMessage } } }
			} else if (image) {
				const normalizedImage = normalizeCardMediaInput(image)
				header = await prepareWAMessageMedia({ image: normalizedImage, ...mediaOptions } as any, options)
				if (header.imageMessage) header.imageMessage.viewOnce = true
			} else if (video) {
				const normalizedVideo = normalizeCardMediaInput(video)
				header = await prepareWAMessageMedia({ video: normalizedVideo, ...mediaOptions } as any, options)
				if (header.videoMessage) {
					header.videoMessage.viewOnce = true
					header.videoMessage.gifPlayback = false
				}
			}

			const hasMedia = !!(header.imageMessage || header.videoMessage || header.productMessage)
			if (!hasMedia) {
				throw new Boom('Each carousel card must have an image, video, or product', { statusCode: 400 })
			}

			const headerProps = { title: title || '', hasMediaAttachment: hasMedia, ...header }
			const convertedNativeFlow = nativeFlow
				? prepareNativeFlowButtons({ nativeFlow, ...(card as any) })
				: { buttons: [], messageParamsJson: '{}' }

			return proto.Message.InteractiveMessage.create({
				header: proto.Message.InteractiveMessage.Header.create(headerProps),
				body: proto.Message.InteractiveMessage.Body.create({ text: caption || body || '' }),
				footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || '' }),
				nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create(convertedNativeFlow)
			})
		})
	)

	const interactiveMessage: any = {
		carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
			cards: slides,
			carouselCardType: 0,
			messageVersion: 1
		})
	}

	if (content.text) {
		interactiveMessage.body = proto.Message.InteractiveMessage.Body.create({ text: content.text })
		interactiveMessage.header = proto.Message.InteractiveMessage.Header.create({
			title: content.title,
			subtitle: content.subtitle,
			hasMediaAttachment: false
		})
	}

	if (content.footer) {
		interactiveMessage.footer = proto.Message.InteractiveMessage.Footer.create({ text: content.footer })
	}

	return { interactiveMessage } as unknown as WAMessageContent
}
