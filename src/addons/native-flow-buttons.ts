/**
 * Native-flow button shorthand helper, used by Shop / Collection / Cards
 * (Carousel) message generators.
 *
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * Lets a card/message define buttons with a short, friendly shape like
 * `{ text: 'Visit', url: 'https://...' }` instead of hand-building the
 * raw `{ name, buttonParamsJson }` native-flow button format.
 */

export interface NativeFlowButtonShorthand {
	text?: string
	buttonText?: string
	icon?: string
	id?: string
	copy?: string
	url?: string
	useWebview?: boolean
	call?: string
	sections?: unknown
	name?: string
	buttonParamsJson?: string
}

export interface NativeFlowShorthandSource {
	nativeFlow?: NativeFlowButtonShorthand[] | { buttons: NativeFlowButtonShorthand[] }
	offerText?: string
	offerUrl?: string
	offerCode?: string
	offerExpiration?: number
	optionText?: string
	optionTitle?: string
}

export interface NativeFlowButton {
	name: string
	buttonParamsJson: string
}

export interface PreparedNativeFlow {
	buttons: NativeFlowButton[]
	messageParamsJson: string
}

export const prepareNativeFlowButtons = (source: NativeFlowShorthandSource): PreparedNativeFlow => {
	const raw = source.nativeFlow
	const buttons: NativeFlowButtonShorthand[] = Array.isArray(raw) ? raw : raw?.buttons || []
	const messageParamsJson: Record<string, unknown> = {}

	if (source.offerText) {
		messageParamsJson.limited_time_offer = {
			text: source.offerText,
			url: source.offerUrl || '',
			copy_code: source.offerCode,
			expiration_time: source.offerExpiration
		}
	}

	if (source.optionText) {
		messageParamsJson.bottom_sheet = {
			in_thread_buttons_limit: 1,
			divider_indices: Array.from({ length: buttons.length }, (_, i) => i),
			list_title: source.optionTitle || '📄 Select Options',
			button_title: source.optionText
		}
	}

	return {
		buttons: buttons.map((button): NativeFlowButton => {
			const buttonText = button.text || button.buttonText
			const buttonIcon = button.icon ? String(button.icon).toUpperCase() : undefined

			if (button.id != null) {
				return {
					name: 'quick_reply',
					buttonParamsJson: JSON.stringify({
						display_text: buttonText || '👉 Click',
						id: button.id,
						icon: buttonIcon
					})
				}
			} else if (button.copy != null) {
				return {
					name: 'cta_copy',
					buttonParamsJson: JSON.stringify({
						display_text: buttonText || '📋 Copy',
						copy_code: button.copy,
						icon: buttonIcon
					})
				}
			} else if (button.url != null) {
				return {
					name: 'cta_url',
					buttonParamsJson: JSON.stringify({
						display_text: buttonText || '🌐 Visit',
						url: button.url,
						merchant_url: button.url,
						webview_interaction: button.useWebview || false,
						icon: buttonIcon
					})
				}
			} else if (button.call != null) {
				return {
					name: 'cta_call',
					buttonParamsJson: JSON.stringify({
						display_text: buttonText || '📞 Call',
						phone_number: button.call,
						icon: buttonIcon
					})
				}
			} else if (button.sections != null) {
				return {
					name: 'single_select',
					buttonParamsJson: JSON.stringify({
						title: buttonText || '📋 Select',
						sections: button.sections,
						icon: buttonIcon
					})
				}
			}

			return button as NativeFlowButton
		}),
		messageParamsJson: JSON.stringify(messageParamsJson)
	}
}

/** Normalize media input to the format expected by `prepareWAMessageMedia`. */
export const normalizeCardMediaInput = (media: unknown): unknown => {
	if (!media) return media
	if (Buffer.isBuffer(media)) return media
	if (typeof media === 'string') return { url: media }
	return media
}
