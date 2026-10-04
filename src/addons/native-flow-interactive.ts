/**
 * native-flow-interactive.ts
 * Sources: @itsliaaa/baileys (nativeFlow shorthand, offer/option params,
 * interactiveAsTemplate, audioFooter) and @innovatorssoft/baileys (raw
 * interactiveMessage / buttonsMessage / listMessage / templateMessage
 * pass-through, `body` key, collection/shop native flow).
 *
 * Shared builders used by `generateWAMessageContent` for every
 * native-flow style message: `nativeFlow`, `interactiveButtons`, carousel
 * `cards`, plus the raw pass-through keys and `interactiveAsTemplate`.
 *
 * Kept dependency-free from Utils/messages (media preparation is injected)
 * so there is no circular import.
 */
import { Boom } from '@hapi/boom'
import type { proto } from '../../WAProto/index.js'
import { FALLBACK_LINK_URL } from '../Defaults'
import { WAProto } from '../Types'

type AnyRecord = Record<string, any>

/** Default label used when the caller gives a limited-time offer without text. */
const DEFAULT_OFFER_TEXT = '🏷️ Limited Offer'
const DEFAULT_OPTION_TITLE = '📄 Select Options'

/** Raw WhatsApp message keys that can be passed straight through. */
const RAW_INTERACTIVE_KEYS = ['interactiveMessage', 'buttonsMessage', 'listMessage', 'templateMessage'] as const

const isSet = (v: unknown): boolean => v !== null && v !== undefined

const isObject = (v: unknown): v is AnyRecord => typeof v === 'object' && v !== null

/**
 * Resolves a button's label from every spelling the fork accepts:
 * `text` | `display_text` | `displayText` | `buttonText` (string, or the
 * classic `{ displayText }` object). Same precedence button-sender.ts uses
 * (`text` first, then `displayText`), plus the native-flow `display_text`.
 */
export const resolveButtonText = (b: AnyRecord | null | undefined): string | undefined => {
	if (!b) return undefined
	const bt = b.buttonText
	const candidates = [
		b.text,
		b.display_text,
		b.displayText,
		typeof bt === 'string' ? bt : (bt?.displayText ?? bt?.display_text)
	]
	return candidates.find(c => typeof c === 'string' && c !== '')
}

const buildContextInfo = (message: AnyRecord, base?: AnyRecord) => ({
	...(base || message.contextInfo || {}),
	...(message.mentions?.length ? { mentionedJid: message.mentions } : {}),
	...(message.mentionAll ? { nonJidMentions: 1 } : {})
})

/**
 * Builds the `messageParamsJson` blob for a native-flow message:
 * `limited_time_offer` (offerText/offerCode/offerUrl/offerExpiration) and
 * `bottom_sheet` (optionText/optionTitle).
 *
 * WhatsApp reads `limited_time_offer` as `{ text, url, copy_code,
 * expiration_time }` — the key names every working fork uses. `offerExpiration`
 * is accepted in milliseconds (e.g. `Date.now() + 3_600_000`) and converted to
 * epoch seconds.
 *
 * Returns `undefined` when neither an offer nor an option sheet was requested.
 */
export const buildNativeFlowMessageParamsJson = (
	offerText: string | undefined,
	offerCode: string | undefined,
	offerUrl: string | undefined,
	offerExpiration: number | undefined,
	optionText: string | undefined,
	optionTitle: string | undefined,
	buttonCount: number
): string | undefined => {
	const params: Record<string, unknown> = {}

	if (offerText || offerCode || offerUrl || offerExpiration) {
		params.limited_time_offer = {
			text: offerText || DEFAULT_OFFER_TEXT,
			url: offerUrl || FALLBACK_LINK_URL,
			copy_code: offerCode,
			expiration_time: offerExpiration ? Math.floor(Number(offerExpiration) / 1000) : undefined
		}
	}

	if (optionText || optionTitle) {
		params.bottom_sheet = {
			in_thread_buttons_limit: 1,
			divider_indices: Array.from({ length: buttonCount }, (_, i) => i),
			list_title: optionTitle || optionText || DEFAULT_OPTION_TITLE,
			button_title: optionText || optionTitle
		}
	}

	return Object.keys(params).length > 0 ? JSON.stringify(params) : undefined
}

/**
 * Converts shorthand buttons into native_flow `{ name, buttonParamsJson }`.
 *
 *  - `{ text, id }`       → quick_reply
 *  - `{ text, copy }`     → cta_copy
 *  - `{ text, url }`      → cta_url (`useWebview` supported)
 *  - `{ text, call }`     → cta_call
 *  - `{ text, sections }` → single_select
 *  - `{ name, buttonParamsJson }` (or `{ name, ...params }`) → passed through
 *
 * `buttonText` is accepted as an alias of `text`.
 */
export const convertNativeFlowButtons = (
	rawButtons: AnyRecord[]
): proto.Message.InteractiveMessage.NativeFlowMessage.INativeFlowButton[] =>
	rawButtons.map((b: AnyRecord) => {
		// already in native form
		if (typeof b.name === 'string' && b.name) {
			if (typeof b.buttonParamsJson === 'string') return b as any
			if (isObject(b.buttonParamsJson)) return { name: b.name, buttonParamsJson: JSON.stringify(b.buttonParamsJson) }
			// `{ name: 'cta_catalog', business_phone_number: '...' }`-style: no params at all → empty JSON
			return { name: b.name, buttonParamsJson: '{}' }
		}

		const text = resolveButtonText(b)
		const icon = b.icon ? String(b.icon).toUpperCase() : undefined

		if (isSet(b.id)) {
			return {
				name: 'quick_reply',
				buttonParamsJson: JSON.stringify({ display_text: text || '👉🏻 Click', id: b.id, icon })
			}
		}

		if (isSet(b.copy)) {
			return {
				name: 'cta_copy',
				buttonParamsJson: JSON.stringify({ display_text: text || '📋 Copy', copy_code: b.copy, icon })
			}
		}

		if (isSet(b.url)) {
			return {
				name: 'cta_url',
				buttonParamsJson: JSON.stringify({
					display_text: text || '🌐 Visit',
					url: b.url,
					merchant_url: b.url,
					webview_interaction: b.useWebview ?? false,
					icon
				})
			}
		}

		if (isSet(b.call)) {
			return {
				name: 'cta_call',
				buttonParamsJson: JSON.stringify({ display_text: text || '📞 Call', phone_number: b.call, icon })
			}
		}

		if (isSet(b.sections)) {
			return {
				name: 'single_select',
				buttonParamsJson: JSON.stringify({ title: text || '📋 Select', sections: b.sections, icon })
			}
		}

		// nothing recognisable → quick_reply with whatever text we have
		return {
			name: 'quick_reply',
			buttonParamsJson: JSON.stringify({ display_text: text || '👉🏻 Click', id: b.id, icon })
		}
	})

/**
 * Builds a full `nativeFlowMessage` (`{ buttons, messageParamsJson }`) from a
 * message/card carrying `nativeFlow` (or `interactiveButtons`/`buttons`) plus
 * the optional offer/option fields.
 *
 * `messageParamsJson` always defaults to `'{}'`; WhatsApp clients (iOS in
 * particular) drop the buttons when it is missing.
 */
export const prepareNativeFlowMessage = (
	source: AnyRecord,
	rawButtons?: AnyRecord[] | { buttons?: AnyRecord[] }
): proto.Message.InteractiveMessage.INativeFlowMessage => {
	const list = Array.isArray(rawButtons) ? rawButtons : (rawButtons?.buttons ?? [])
	const buttons = convertNativeFlowButtons(list)
	const messageParamsJson = buildNativeFlowMessageParamsJson(
		source.offerText,
		source.offerCode,
		source.offerUrl,
		source.offerExpiration,
		source.optionText,
		source.optionTitle,
		buttons.length
	)
	return { buttons, messageParamsJson: messageParamsJson ?? '{}' }
}

/** True when `m` holds a media/location/product item usable as an interactive header. */
export const hasValidInteractiveHeader = (m: AnyRecord): boolean =>
	!!(m.imageMessage || m.videoMessage || m.documentMessage || m.productMessage || m.locationMessage)

/** Picks only the header-capable fields out of an already-prepared content object. */
export const pickInteractiveHeaderMedia = (m: AnyRecord): proto.Message.InteractiveMessage.IHeader => {
	const header: AnyRecord = {}
	if (m.imageMessage) header.imageMessage = m.imageMessage
	if (m.videoMessage) header.videoMessage = m.videoMessage
	if (m.documentMessage) header.documentMessage = m.documentMessage
	if (m.locationMessage) header.locationMessage = m.locationMessage
	if (m.productMessage) header.productMessage = m.productMessage
	return header
}

export interface NativeFlowInteractiveDeps {
	/** `prepareWAMessageMedia` — injected to avoid a circular import */
	prepareMedia: (content: any, options: any) => Promise<proto.IMessage>
	options: any
}

/**
 * Builds the `{ interactiveMessage }` for `nativeFlow` / `interactiveButtons`.
 *
 * `m` is the already-prepared base content (`imageMessage`, `videoMessage`,
 * `documentMessage`, `locationMessage`, `productMessage`, or a plain text
 * message) — its media becomes the interactive header.
 */
export const buildNativeFlowInteractiveMessage = async (
	message: AnyRecord,
	m: AnyRecord,
	rawButtons: AnyRecord[] | { buttons?: AnyRecord[] },
	deps: NativeFlowInteractiveDeps
): Promise<{ interactiveMessage: proto.Message.IInteractiveMessage }> => {
	const interactiveMessage: proto.Message.IInteractiveMessage = {
		nativeFlowMessage: prepareNativeFlowMessage(message, rawButtons)
	}

	// native flow on top of a collection / shop storefront
	if (message.bizJid || message.collection?.bizJid) {
		interactiveMessage.collectionMessage = {
			bizJid: message.collection?.bizJid || message.bizJid,
			id: message.collection?.id || message.id,
			messageVersion: message.collection?.version ?? message.collection?.messageVersion ?? 1
		}
	} else if (isSet(message.shopSurface) || isSet(message.shop?.surface)) {
		interactiveMessage.shopStorefrontMessage = {
			surface: message.shop?.surface ?? message.shopSurface,
			id: message.shop?.id || message.id,
			messageVersion: 1
		}
	}

	// body: explicit `body` > `text` > `caption`
	if (isSet(message.body) && message.body !== '') {
		interactiveMessage.body = typeof message.body === 'string' ? { text: message.body } : message.body
	} else if ('text' in message && isSet(message.text)) {
		interactiveMessage.body = { text: message.text }
	} else if ('caption' in message && isSet(message.caption)) {
		interactiveMessage.body = { text: message.caption }
	}

	// header: real media/location/product when present, otherwise title/subtitle only
	const hasHeaderMedia = hasValidInteractiveHeader(m)
	const mediaKeyGiven = ['image', 'video', 'document', 'location', 'product'].some(k => isSet(message[k]))
	if (mediaKeyGiven && !hasHeaderMedia) {
		throw new Boom('Invalid media type for interactive message header', { statusCode: 400 })
	}

	if (hasHeaderMedia) {
		interactiveMessage.header = {
			title: message.title || '',
			subtitle: message.subtitle || '',
			hasMediaAttachment: true,
			...pickInteractiveHeaderMedia(m)
		}
	} else if (message.title || message.subtitle) {
		interactiveMessage.header = {
			title: message.title || '',
			subtitle: message.subtitle || '',
			hasMediaAttachment: false
		}
	}

	if (message.thumbnail) {
		interactiveMessage.header = {
			...(interactiveMessage.header || { hasMediaAttachment: false }),
			jpegThumbnail: message.thumbnail
		}
	}

	// footer: audio footer wins over a text footer
	if (message.audioFooter) {
		const { audioMessage } = await deps.prepareMedia({ audio: message.audioFooter }, deps.options)
		interactiveMessage.footer = { audioMessage, hasMediaAttachment: true }
	} else if (isSet(message.footer) && message.footer !== '') {
		interactiveMessage.footer = typeof message.footer === 'string' ? { text: message.footer } : message.footer
	}

	interactiveMessage.contextInfo = buildContextInfo(message)

	return { interactiveMessage }
}

/** True when the payload carries a raw WhatsApp interactive-family message. */
export const hasRawInteractiveContent = (message: AnyRecord): boolean =>
	RAW_INTERACTIVE_KEYS.some(key => isObject(message[key]))

/**
 * Pass-through for raw `interactiveMessage` / `buttonsMessage` /
 * `listMessage` / `templateMessage` payloads (innovatorssoft style). The raw
 * object is normalised with the matching proto `fromObject` and picks up
 * mention/context info.
 */
export const prepareRawInteractiveContent = (message: AnyRecord): proto.IMessage => {
	const m: AnyRecord = {}

	if (isObject(message.interactiveMessage)) {
		const im = WAProto.Message.InteractiveMessage.fromObject(message.interactiveMessage)
		im.contextInfo = buildContextInfo(message, message.interactiveMessage.contextInfo)
		m.interactiveMessage = im
	} else if (isObject(message.buttonsMessage)) {
		const bm = WAProto.Message.ButtonsMessage.fromObject(message.buttonsMessage)
		bm.contextInfo = buildContextInfo(message, message.buttonsMessage.contextInfo)
		m.buttonsMessage = bm
	} else if (isObject(message.listMessage)) {
		const lm = WAProto.Message.ListMessage.fromObject(message.listMessage)
		lm.contextInfo = buildContextInfo(message, message.listMessage.contextInfo)
		m.listMessage = lm
	} else if (isObject(message.templateMessage)) {
		const tm = WAProto.Message.TemplateMessage.fromObject(message.templateMessage)
		tm.contextInfo = buildContextInfo(message, message.templateMessage.contextInfo)
		m.templateMessage = tm
	}

	return m
}
