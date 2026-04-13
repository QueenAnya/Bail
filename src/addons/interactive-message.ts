/**
 * Interactive / Button Message Generators
 * Ported from Baileys-Joss / innovatorssoft.
 */

import { proto } from '../../WAProto/index.js'
import type { MediaGenerationOptions } from '../Types'
import { prepareWAMessageMedia } from '../Utils/messages'

// =====================================================
// TYPES
// =====================================================

export interface ButtonDef {
	buttonId?: string
	displayText: string
}

export interface InteractiveButtonContent {
	title?: string
	body: string
	footer?: string
	buttons: ButtonDef[]
	headerImage?: { url: string } | Buffer
	headerVideo?: { url: string } | Buffer
	headerDocument?: ({ url: string } | Buffer) & { filename?: string }
}

export interface ListRow {
	rowId: string
	title: string
	description?: string
}

export interface ListSection {
	title: string
	rows: ListRow[]
}

export interface InteractiveListContent {
	title: string
	description?: string
	buttonText: string
	footer?: string
	sections: ListSection[]
}

export interface TemplateButton {
	index: number
	quickReplyButton?: { displayText: string; id: string }
	urlButton?: { displayText: string; url: string }
	callButton?: { displayText: string; phoneNumber: string }
}

export interface TemplateContent {
	title?: string
	body: string
	footer?: string
	buttons: TemplateButton[]
	headerImage?: { url: string } | Buffer
	headerVideo?: { url: string } | Buffer
	headerLocation?: { latitude: number; longitude: number; name?: string; address?: string }
}

export interface NativeFlowButton {
	name: string
	buttonParamsJson: string
}

export interface NativeFlowOptions {
	footer?: string
	header?: { title?: string; subtitle?: string; hasMediaAttachment?: boolean }
}

export type CombinedButtonType = 'url' | 'reply' | 'copy' | 'call'

export interface CombinedButton {
	type: CombinedButtonType
	displayText: string
	url?: string
	id?: string
	copyCode?: string
	phoneNumber?: string
}

// =====================================================
// GENERATORS
// =====================================================

export const generateInteractiveButtonMessage = async (
	content: InteractiveButtonContent,
	options?: MediaGenerationOptions
) => {
	const buttons = content.buttons.map((btn, idx) => ({
		buttonId: btn.buttonId || `btn-${idx}`,
		buttonText: { displayText: btn.displayText },
		type: proto.Message.ButtonsMessage.Button.Type.RESPONSE,
		nativeFlowInfo: undefined
	}))

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const buttonsMessage: any = {
		contentText: content.body,
		footerText: content.footer,
		buttons,
		headerType: proto.Message.ButtonsMessage.HeaderType.EMPTY
	}

	if (content.headerImage && options) {
		const media = await prepareWAMessageMedia(
			{ image: content.headerImage as Parameters<typeof prepareWAMessageMedia>[0]['image'] },
			options
		)
		buttonsMessage.imageMessage = media.imageMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.IMAGE
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia(
			{ video: content.headerVideo as Parameters<typeof prepareWAMessageMedia>[0]['video'] },
			options
		)
		buttonsMessage.videoMessage = media.videoMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.VIDEO
	} else if (content.headerDocument && options) {
		const media = await prepareWAMessageMedia(
			{
				document: content.headerDocument as Parameters<typeof prepareWAMessageMedia>[0]['document'],
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

export const generateInteractiveListMessage = (content: InteractiveListContent) => {
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
			listType: proto.Message.ListMessage.ListType.SINGLE_SELECT,
			sections
		}
	}
}

export const generateTemplateMessage = async (content: TemplateContent, options?: MediaGenerationOptions) => {
	const hydratedButtons = content.buttons.map(btn => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const hydratedTemplate: any = {
		hydratedContentText: content.body,
		hydratedFooterText: content.footer,
		hydratedButtons
	}

	if (content.title) {
		hydratedTemplate.hydratedTitleText = content.title
	}

	if (content.headerImage && options) {
		const media = await prepareWAMessageMedia(
			{ image: content.headerImage as Parameters<typeof prepareWAMessageMedia>[0]['image'] },
			options
		)
		hydratedTemplate.imageMessage = media.imageMessage
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia(
			{ video: content.headerVideo as Parameters<typeof prepareWAMessageMedia>[0]['video'] },
			options
		)
		hydratedTemplate.videoMessage = media.videoMessage
	} else if (content.headerLocation) {
		hydratedTemplate.locationMessage = {
			degreesLatitude: content.headerLocation.latitude,
			degreesLongitude: content.headerLocation.longitude,
			name: content.headerLocation.name,
			address: content.headerLocation.address
		}
	}

	return { templateMessage: { hydratedTemplate } }
}

export const generateNativeFlowMessage = (body: string, buttons: NativeFlowButton[], options?: NativeFlowOptions) => {
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
				buttons,
				messageParamsJson: ''
			}
		}
	}
}

export const generateCopyCodeButton = (
	body: string,
	copyCode: string,
	displayText = 'Copy Code',
	options?: NativeFlowOptions
) => {
	return generateNativeFlowMessage(
		body,
		[{ name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: displayText, copy_code: copyCode }) }],
		options
	)
}

export const generateUrlButtonMessage = (
	body: string,
	buttons: { displayText: string; url: string; merchantUrl?: string }[],
	options?: NativeFlowOptions & { title?: string }
) => {
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

export const generateQuickReplyButtons = (
	body: string,
	buttons: { displayText: string; id: string }[],
	options?: NativeFlowOptions & { title?: string }
) => {
	const nativeButtons = buttons.map(btn => ({
		name: 'quick_reply',
		buttonParamsJson: JSON.stringify({ display_text: btn.displayText, id: btn.id })
	}))
	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

export const generateCombinedButtons = (
	body: string,
	buttons: CombinedButton[],
	options?: NativeFlowOptions & { title?: string }
) => {
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
	return generateNativeFlowMessage(body, nativeButtons as NativeFlowButton[], {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}
