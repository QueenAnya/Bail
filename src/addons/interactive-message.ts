/**
 * interactive-message.ts
 * Ported from @innovatorssoft/baileys
 * Helpers for building ButtonsMessage, ListMessage, TemplateMessage,
 * and NativeFlow (interactiveMessage) payloads.
 */

import { proto } from '../../WAProto/index.js'
import { prepareWAMessageMedia } from '../Utils/messages-media.js'
import type { MediaGenerationOptions } from '../Types/Message.js'

// ── Types ─────────────────────────────────────────────────────────────────────

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

export type ButtonItem = {
	buttonId?: string
	displayText: string
}

export type InteractiveButtonContent = {
	body: string
	footer?: string
	buttons: ButtonItem[]
	title?: string
	headerImage?: Parameters<typeof prepareWAMessageMedia>[0] | { url: string } | Buffer
	headerVideo?: Parameters<typeof prepareWAMessageMedia>[0] | { url: string } | Buffer
	headerDocument?: ({ url: string } | Buffer) & { filename?: string }
}

export type InteractiveListRow = {
	rowId: string
	title: string
	description?: string
}

export type InteractiveListSection = {
	title: string
	rows: InteractiveListRow[]
}

export type InteractiveListContent = {
	title: string
	description?: string
	buttonText: string
	footer?: string
	sections: InteractiveListSection[]
}

export type TemplateButton = {
	index?: number
	quickReplyButton?: { displayText: string; id: string }
	urlButton?: { displayText: string; url: string }
	callButton?: { displayText: string; phoneNumber: string }
}

export type TemplateMessageContent = {
	body: string
	footer?: string
	title?: string
	buttons: TemplateButton[]
	headerImage?: Parameters<typeof prepareWAMessageMedia>[0] | { url: string } | Buffer
	headerVideo?: Parameters<typeof prepareWAMessageMedia>[0] | { url: string } | Buffer
	headerLocation?: { latitude: number; longitude: number; name?: string; address?: string }
}

export type CombinedButton =
	| { type: 'url'; displayText: string; url: string }
	| { type: 'reply'; displayText: string; id: string }
	| { type: 'copy'; displayText: string; copyCode: string }
	| { type: 'call'; displayText: string; phoneNumber: string }

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Generate a buttons message (classic WhatsApp ButtonsMessage).
 */
export const generateInteractiveButtonMessage = async (
	content: InteractiveButtonContent,
	options?: MediaGenerationOptions
): Promise<{ buttonsMessage: proto.Message.IButtonsMessage }> => {
	const buttons: proto.Message.ButtonsMessage.IButton[] = content.buttons.map((btn, idx) => ({
		buttonId: btn.buttonId || `btn-${idx}`,
		buttonText: { displayText: btn.displayText },
		type: proto.Message.ButtonsMessage.Button.Type.RESPONSE
	}))

	const buttonsMessage: proto.Message.IButtonsMessage = {
		contentText: content.body,
		footerText: content.footer,
		buttons,
		headerType: proto.Message.ButtonsMessage.HeaderType.EMPTY
	}

	if (content.headerImage && options) {
		const media = await prepareWAMessageMedia({ image: content.headerImage as any }, options)
		buttonsMessage.imageMessage = media.imageMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.IMAGE
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia({ video: content.headerVideo as any }, options)
		buttonsMessage.videoMessage = media.videoMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.VIDEO
	} else if (content.headerDocument && options) {
		const media = await prepareWAMessageMedia(
			{
				document: content.headerDocument as any,
				mimetype: 'application/pdf',
				fileName: (content.headerDocument as any).filename
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

/**
 * Generate a list message (WhatsApp ListMessage).
 */
export const generateInteractiveListMessage = (
	content: InteractiveListContent
): { listMessage: proto.Message.IListMessage } => {
	const sections: proto.Message.ListMessage.ISection[] = content.sections.map(section => ({
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

/**
 * Generate a template (HydratedFourRowTemplate) message.
 */
export const generateTemplateMessage = async (
	content: TemplateMessageContent,
	options?: MediaGenerationOptions
): Promise<{ templateMessage: proto.Message.ITemplateMessage }> => {
	const hydratedButtons = content.buttons.map(btn => {
		const hydratedBtn: proto.Message.HydratedFourRowTemplate.IHydratedButton = {
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

	const hydratedTemplate: proto.Message.IHydratedFourRowTemplate = {
		hydratedContentText: content.body,
		hydratedFooterText: content.footer,
		hydratedButtons
	}

	if (content.title) {
		hydratedTemplate.hydratedTitleText = content.title
	}

	if (content.headerImage && options) {
		const media = await prepareWAMessageMedia({ image: content.headerImage as any }, options)
		hydratedTemplate.imageMessage = media.imageMessage
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia({ video: content.headerVideo as any }, options)
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

/**
 * Generate a native-flow interactiveMessage (the modern button format).
 */
export const generateNativeFlowMessage = (
	body: string,
	buttons: NativeFlowButton[],
	options?: NativeFlowOptions
): { interactiveMessage: proto.Message.IInteractiveMessage } => {
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
				buttons: buttons.map(btn => ({
					name: btn.name,
					buttonParamsJson: btn.buttonParamsJson
				})),
				messageParamsJson: ''
			}
		}
	}
}

/**
 * Generate a cta_copy (copy-code) native-flow button message.
 */
export const generateCopyCodeButton = (
	body: string,
	copyCode: string,
	displayText = 'Copy Code',
	options?: NativeFlowOptions
) => {
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
 * Generate cta_url native-flow button messages.
 */
export const generateUrlButtonMessage = (
	body: string,
	buttons: Array<{ displayText: string; url: string; merchantUrl?: string }>,
	options?: { footer?: string; title?: string }
) => {
	const nativeButtons: NativeFlowButton[] = buttons.map(btn => ({
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
 * Generate quick_reply native-flow button messages.
 */
export const generateQuickReplyButtons = (
	body: string,
	buttons: Array<{ displayText: string; id: string }>,
	options?: { footer?: string; title?: string }
) => {
	const nativeButtons: NativeFlowButton[] = buttons.map(btn => ({
		name: 'quick_reply',
		buttonParamsJson: JSON.stringify({ display_text: btn.displayText, id: btn.id })
	}))

	return generateNativeFlowMessage(body, nativeButtons, {
		footer: options?.footer,
		header: options?.title ? { title: options.title } : undefined
	})
}

/**
 * Generate a mixed native-flow message supporting url, reply, copy, and call button types.
 */
export const generateCombinedButtons = (
	body: string,
	buttons: CombinedButton[],
	options?: { footer?: string; title?: string }
) => {
	const nativeButtons: NativeFlowButton[] = buttons.map(btn => {
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
