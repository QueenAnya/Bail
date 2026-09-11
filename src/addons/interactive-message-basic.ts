/**
 * interactive-message-basic.ts
 *
 * This is a pure, unmodified-scope alternate implementation — the exact 8
 * functions (`generateInteractiveButtonMessage`,
 * `generateInteractiveListMessage`, `generateTemplateMessage`,
 * `generateNativeFlowMessage`, `generateCopyCodeButton`,
 * `generateUrlButtonMessage`, `generateQuickReplyButtons`,
 * `generateCombinedButtons`), logic verified identical to
 * `interactive-message.ts` (which adds full TypeScript param/return types
 * plus doc comments, but no behavior changes). Kept as a separate file for
 * reference/audit purposes (rather than replacing `interactive-message.ts`),
 * but deliberately NOT re-exported from `addons/index.ts` — its functions
 * are already available via `interactive-message.ts`, which is exported.
 */

import { proto } from '../../WAProto/index.js'
import type { MessageGenerationOptions, WAMediaUpload } from '../Types/index.js'
import { prepareWAMessageMedia } from '../Utils/messages.js'

export type BasicButton = {
	buttonId?: string
	displayText: string
}

export type BasicButtonsContent = {
	body: string
	footer?: string
	title?: string
	buttons: BasicButton[]
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerDocument?: WAMediaUpload & { filename?: string }
}

export const generateInteractiveButtonMessage = async (
	content: BasicButtonsContent,
	options?: MessageGenerationOptions
) => {
	const buttons = content.buttons.map((btn, idx) => ({
		buttonId: btn.buttonId || `btn-${idx}`,
		buttonText: { displayText: btn.displayText },
		type: proto.Message.ButtonsMessage.Button.Type.RESPONSE,
		nativeFlowInfo: undefined
	}))

	const buttonsMessage: proto.Message.IButtonsMessage & {
		text?: string
		imageMessage?: proto.Message.IImageMessage | null
		videoMessage?: proto.Message.IVideoMessage | null
		documentMessage?: proto.Message.IDocumentMessage | null
	} = {
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
				document: content.headerDocument,
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

export type BasicListRow = {
	rowId: string
	title: string
	description?: string
}

export type BasicListSection = {
	title: string
	rows: BasicListRow[]
}

export type BasicListContent = {
	title: string
	description?: string
	buttonText: string
	footer?: string
	sections: BasicListSection[]
}

export const generateInteractiveListMessage = (content: BasicListContent) => {
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

export type BasicTemplateButton = {
	index: number
	quickReplyButton?: { displayText: string; id: string }
	urlButton?: { displayText: string; url: string }
	callButton?: { displayText: string; phoneNumber: string }
}

export type BasicTemplateContent = {
	body: string
	footer?: string
	title?: string
	buttons: BasicTemplateButton[]
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerLocation?: { latitude: number; longitude: number; name?: string; address?: string }
}

export const generateTemplateMessage = async (content: BasicTemplateContent, options?: MessageGenerationOptions) => {
	const hydratedButtons = content.buttons.map(btn => {
		const hydratedBtn: {
			index: number
			quickReplyButton?: { displayText: string; id: string }
			urlButton?: { displayText: string; url: string }
			callButton?: { displayText: string; phoneNumber: string }
		} = { index: btn.index }

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

export type BasicNativeFlowButton = {
	name: string
	buttonParamsJson: string
}

export type BasicNativeFlowOptions = {
	footer?: string
	header?: { title: string; subtitle?: string; hasMediaAttachment?: boolean }
}

export const generateNativeFlowMessage = (
	body: string,
	buttons: BasicNativeFlowButton[],
	options?: BasicNativeFlowOptions
) => {
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
	}
}

export const generateCopyCodeButton = (
	body: string,
	copyCode: string,
	displayText = 'Copy Code',
	options?: BasicNativeFlowOptions
) =>
	generateNativeFlowMessage(
		body,
		[
			{
				name: 'cta_copy',
				buttonParamsJson: JSON.stringify({
					display_text: displayText,
					copy_code: copyCode
				})
			}
		],
		options
	)

export type BasicUrlButton = { displayText: string; url: string; merchantUrl?: string }

export const generateUrlButtonMessage = (
	body: string,
	buttons: BasicUrlButton[],
	options?: { footer?: string; title?: string }
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

export type BasicQuickReplyButton = { displayText: string; id: string }

export const generateQuickReplyButtons = (
	body: string,
	buttons: BasicQuickReplyButton[],
	options?: { footer?: string; title?: string }
) => {
	const nativeButtons = buttons.map(btn => ({
		name: 'quick_reply',
		buttonParamsJson: JSON.stringify({
			display_text: btn.displayText,
			id: btn.id
		})
	}))

	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

export type BasicCombinedButton =
	| { type: 'url'; displayText: string; url: string }
	| { type: 'reply'; displayText: string; id: string }
	| { type: 'copy'; displayText: string; copyCode: string }
	| { type: 'call'; displayText: string; phoneNumber: string }

export const generateCombinedButtons = (
	body: string,
	buttons: BasicCombinedButton[],
	options?: { footer?: string; title?: string }
) => {
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
