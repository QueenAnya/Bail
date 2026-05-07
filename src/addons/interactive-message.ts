/**
 * Interactive / Button Message Generators
 * Ported from innovatorssoft/Baileys
 *
 * Provides helpers to build:
 *  - buttonsMessage         (image/video/document/text header)
 *  - listMessage            (single-select sections)
 *  - templateMessage        (hydratedTemplate)
 *  - nativeFlowMessage      (interactiveMessage)
 *  - CTA URL buttons
 *  - Quick-reply buttons
 *  - Copy-code button
 *  - Combined mixed-type buttons
 */

import { proto } from '../../WAProto/index.js'
import type { MediaGenerationOptions, WAMediaUpload } from '../Types'
import { prepareWAMessageMedia } from '../Utils/messages'

// ── Types ────────────────────────────────────────────────────────────────────

export interface ButtonDef {
	buttonId?: string
	displayText: string
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

export interface TemplateButton {
	index: number
	quickReplyButton?: { displayText: string; id: string }
	urlButton?: { displayText: string; url: string }
	callButton?: { displayText: string; phoneNumber: string }
}

export interface NativeFlowButton {
	name: string
	buttonParamsJson: string
}

export interface NativeFlowOptions {
	footer?: string
	header?: { title?: string; subtitle?: string; hasMediaAttachment?: boolean }
}

export interface InteractiveButtonContent {
	buttons: ButtonDef[]
	body: string
	footer?: string
	title?: string
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerDocument?: WAMediaUpload & { filename?: string }
}

export interface InteractiveListContent {
	title: string
	description?: string
	buttonText: string
	footer?: string
	sections: ListSection[]
}

export interface TemplateContent {
	buttons: TemplateButton[]
	body: string
	footer?: string
	title?: string
	headerImage?: WAMediaUpload
	headerVideo?: WAMediaUpload
	headerLocation?: { latitude: number; longitude: number; name?: string; address?: string }
}

export type UrlButton = { displayText: string; url: string; merchantUrl?: string }
export type ReplyButton = { displayText: string; id: string }
export type CopyButton = { displayText: string; copyCode: string }
export type CallButton = { displayText: string; phoneNumber: string }
export type CombinedButton =
	| ({ type: 'url' } & UrlButton)
	| ({ type: 'reply' } & ReplyButton)
	| ({ type: 'copy' } & CopyButton)
	| ({ type: 'call' } & CallButton)

// ── Generators ────────────────────────────────────────────────────────────────

/**
 * Build a buttonsMessage with an optional image / video / document / text header.
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
		const media = await prepareWAMessageMedia({ image: content.headerImage }, options)
		buttonsMessage.imageMessage = media.imageMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.IMAGE
	} else if (content.headerVideo && options) {
		const media = await prepareWAMessageMedia({ video: content.headerVideo }, options)
		buttonsMessage.videoMessage = media.videoMessage
		buttonsMessage.headerType = proto.Message.ButtonsMessage.HeaderType.VIDEO
	} else if (content.headerDocument && options) {
		const doc = content.headerDocument
		const media = await prepareWAMessageMedia(
			{ document: doc, mimetype: 'application/pdf', fileName: doc.filename },
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
 * Build a listMessage (single-select sections).
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
 * Build a templateMessage (hydratedTemplate) with optional image / video / location header.
 */
export const generateTemplateMessage = async (
	content: TemplateContent,
	options?: MediaGenerationOptions
): Promise<{ templateMessage: proto.Message.ITemplateMessage }> => {
	const hydratedButtons: proto.HydratedTemplateButton[] = content.buttons.map(btn => {
		const hb: proto.IHydratedTemplateButton = { index: btn.index }
		if (btn.quickReplyButton) {
			hb.quickReplyButton = {
				displayText: btn.quickReplyButton.displayText,
				id: btn.quickReplyButton.id
			}
		} else if (btn.urlButton) {
			hb.urlButton = {
				displayText: btn.urlButton.displayText,
				url: btn.urlButton.url
			}
		} else if (btn.callButton) {
			hb.callButton = {
				displayText: btn.callButton.displayText,
				phoneNumber: btn.callButton.phoneNumber
			}
		}
		return hb as proto.HydratedTemplateButton
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

/**
 * Build an interactiveMessage with nativeFlowMessage buttons.
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
 * Build a single copy-code CTA button message.
 */
export const generateCopyCodeButton = (
	body: string,
	copyCode: string,
	displayText = 'Copy Code',
	options?: NativeFlowOptions
): { interactiveMessage: proto.Message.IInteractiveMessage } => {
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
 * Build CTA URL button message(s).
 */
export const generateUrlButtonMessage = (
	body: string,
	buttons: UrlButton[],
	options?: NativeFlowOptions & { title?: string }
): { interactiveMessage: proto.Message.IInteractiveMessage } => {
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
 * Build quick-reply button message(s).
 */
export const generateQuickReplyButtons = (
	body: string,
	buttons: ReplyButton[],
	options?: NativeFlowOptions & { title?: string }
): { interactiveMessage: proto.Message.IInteractiveMessage } => {
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
 * Build a mixed-type native flow message combining url / reply / copy / call buttons.
 */
export const generateCombinedButtons = (
	body: string,
	buttons: CombinedButton[],
	options?: NativeFlowOptions & { title?: string }
): { interactiveMessage: proto.Message.IInteractiveMessage } => {
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
