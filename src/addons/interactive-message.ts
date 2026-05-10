/**
 * Interactive / Button Message Generators
 * Source: @innovatorssoft/baileys interactive-message.js
 */
import { proto } from '../../WAProto/index.js'
import { prepareWAMessageMedia } from '../Utils/messages-media.js'
import type { MediaGenerationOptions } from '../Types/index.js'
import type { WAMediaUpload } from '../Types/Message.js'

export type ButtonItem = { buttonId?: string; displayText: string }
export type ButtonSectionRow = { rowId: string; title: string; description?: string }
export type ButtonSection = { title: string; rows: ButtonSectionRow[] }
export type NativeFlowButton = { name: string; buttonParamsJson: string }
export type NativeFlowOptions = {
	footer?: string
	header?: { title?: string; subtitle?: string; hasMediaAttachment?: boolean }
}
export type InteractiveButtonContent = {
	body: string
	footer?: string
	buttons: ButtonItem[]
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerDocument?: WAMediaUpload & { filename?: string }
	title?: string
}
export type ListMessageContent = {
	title: string
	description?: string
	buttonText: string
	footer?: string
	sections: ButtonSection[]
}
export type TemplateButtonItem = {
	index: number
	quickReplyButton?: { displayText: string; id: string }
	urlButton?: { displayText: string; url: string }
	callButton?: { displayText: string; phoneNumber: string }
}
export type TemplateMessageContent = {
	body: string
	footer?: string
	title?: string
	buttons: TemplateButtonItem[]
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerLocation?: { latitude: number; longitude: number; name?: string; address?: string }
}
export type UrlButton = { displayText: string; url: string; merchantUrl?: string }
export type QuickReplyButton = { displayText: string; id: string }
export type CombinedButton =
	| { type: 'url'; displayText: string; url: string }
	| { type: 'reply'; displayText: string; id: string }
	| { type: 'copy'; displayText: string; copyCode: string }
	| { type: 'call'; displayText: string; phoneNumber: string }

export const generateInteractiveButtonMessage = async (
	content: InteractiveButtonContent,
	options?: MediaGenerationOptions
): Promise<proto.IMessage> => {
	const buttons = content.buttons.map((btn, idx) => ({
		buttonId: btn.buttonId || `btn-${idx}`,
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
			{ document: content.headerDocument, mimetype: 'application/pdf', fileName: content.headerDocument.filename },
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

export const generateInteractiveListMessage = (content: ListMessageContent): proto.IMessage => ({
	listMessage: {
		title: content.title,
		description: content.description || '',
		buttonText: content.buttonText,
		footerText: content.footer || '',
		listType: proto.Message.ListMessage.ListType.SINGLE_SELECT,
		sections: content.sections.map(s => ({
			title: s.title,
			rows: s.rows.map(r => ({ rowId: r.rowId, title: r.title, description: r.description || '' }))
		}))
	}
})

export const generateTemplateMessage = async (
	content: TemplateMessageContent,
	options?: MediaGenerationOptions
): Promise<proto.IMessage> => {
	const hydratedButtons = content.buttons.map(btn => {
		const h: proto.IHydratedTemplateButton = { index: btn.index }
		if (btn.quickReplyButton)
			h.quickReplyButton = { displayText: btn.quickReplyButton.displayText, id: btn.quickReplyButton.id }
		else if (btn.urlButton) h.urlButton = { displayText: btn.urlButton.displayText, url: btn.urlButton.url }
		else if (btn.callButton)
			h.callButton = { displayText: btn.callButton.displayText, phoneNumber: btn.callButton.phoneNumber }
		return h
	})
	const hydratedTemplate: proto.Message.IHydratedFourRowTemplate = {
		hydratedContentText: content.body,
		hydratedFooterText: content.footer,
		hydratedButtons
	}
	if (content.title) hydratedTemplate.hydratedTitleText = content.title
	if (content.headerImage && options) {
		const m = await prepareWAMessageMedia({ image: content.headerImage }, options)
		hydratedTemplate.imageMessage = m.imageMessage
	} else if (content.headerVideo && options) {
		const m = await prepareWAMessageMedia({ video: content.headerVideo }, options)
		hydratedTemplate.videoMessage = m.videoMessage
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

export const generateNativeFlowMessage = (
	body: string,
	buttons: NativeFlowButton[],
	options?: NativeFlowOptions
): proto.IMessage => ({
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
			buttons: buttons.map(btn => ({ name: btn.name, buttonParamsJson: btn.buttonParamsJson })),
			messageParamsJson: ''
		}
	}
})

export const generateCopyCodeButton = (
	body: string,
	copyCode: string,
	displayText = 'Copy Code',
	options?: NativeFlowOptions
): proto.IMessage =>
	generateNativeFlowMessage(
		body,
		[{ name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: displayText, copy_code: copyCode }) }],
		options
	)

export const generateUrlButtonMessage = (
	body: string,
	buttons: UrlButton[],
	options?: { footer?: string; title?: string }
): proto.IMessage =>
	generateNativeFlowMessage(
		body,
		buttons.map(btn => ({
			name: 'cta_url',
			buttonParamsJson: JSON.stringify({ display_text: btn.displayText, url: btn.url, merchant_url: btn.merchantUrl })
		})),
		{ footer: options?.footer, header: options?.title ? { title: options.title } : undefined }
	)

export const generateQuickReplyButtons = (
	body: string,
	buttons: QuickReplyButton[],
	options?: { footer?: string; title?: string }
): proto.IMessage =>
	generateNativeFlowMessage(
		body,
		buttons.map(btn => ({
			name: 'quick_reply',
			buttonParamsJson: JSON.stringify({ display_text: btn.displayText, id: btn.id })
		})),
		{ footer: options?.footer, header: options?.title ? { title: options.title } : undefined }
	)

export const generateCombinedButtons = (
	body: string,
	buttons: CombinedButton[],
	options?: { footer?: string; title?: string }
): proto.IMessage => {
	const nativeButtons = buttons.map(btn => {
		if (btn.type === 'url')
			return { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: btn.displayText, url: btn.url }) }
		if (btn.type === 'reply')
			return { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: btn.displayText, id: btn.id }) }
		if (btn.type === 'copy')
			return {
				name: 'cta_copy',
				buttonParamsJson: JSON.stringify({ display_text: btn.displayText, copy_code: btn.copyCode })
			}
		return {
			name: 'cta_call',
			buttonParamsJson: JSON.stringify({ display_text: btn.displayText, phone_number: btn.phoneNumber })
		}
	})
	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}
