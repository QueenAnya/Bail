import { proto } from '../../WAProto/index.js'
import type { BinaryNode } from '../WABinary'
import { normalizeMessageContent } from '../Utils/messages'
import { unixTimestampSeconds } from '../Utils/generics'

// ── Message Type Detection ─────────────────────────────────────────────────

export function getMediaType(message: proto.IMessage): string {
	if (message.imageMessage) return 'image'
	if (message.videoMessage) return message.videoMessage.gifPlayback ? 'gif' : 'video'
	if (message.audioMessage) return message.audioMessage.ptt ? 'ptt' : 'audio'
	if (message.contactMessage) return 'vcard'
	if (message.documentMessage) return 'document'
	if (message.contactsArrayMessage) return 'contact_array'
	if (message.liveLocationMessage) return 'livelocation'
	if (message.stickerMessage) return 'sticker'
	if (message.listMessage) return 'list'
	if (message.listResponseMessage) return 'list_response'
	if (message.buttonsResponseMessage) return 'buttons_response'
	if (message.orderMessage) return 'order'
	if (message.productMessage) return 'product'
	if (message.interactiveResponseMessage) return 'native_flow_response'
	if (message.groupInviteMessage) return 'url'
	return ''
}

export function getMessageType(message: proto.IMessage): string {
	const normalizedMessage = normalizeMessageContent(message)
	if (!normalizedMessage) return 'text'
	if (normalizedMessage.reactionMessage || normalizedMessage.encReactionMessage) return 'reaction'
	if (
		normalizedMessage.pollCreationMessage ||
		normalizedMessage.pollCreationMessageV2 ||
		normalizedMessage.pollCreationMessageV3 ||
		normalizedMessage.pollUpdateMessage
	)
		return 'poll'
	if (normalizedMessage.eventMessage) return 'event'
	if (getMediaType(normalizedMessage) !== '') return 'media'
	return 'text'
}

// ── Button / Biz Node Helpers ──────────────────────────────────────────────

/**
 * Detect what kind of button message this is.
 * Matches innovatorssoft/baileys getButtonType exactly.
 */
export function getButtonType(message: proto.IMessage): string | undefined {
	if (message.listMessage) return 'list'
	if (message.buttonsMessage) return 'buttons'
	if (message.interactiveMessage?.nativeFlowMessage) return 'native_flow'
	if (message.interactiveMessage?.carouselMessage) return 'native_flow'
	if (message.viewOnceMessage?.message?.interactiveMessage?.carouselMessage) return 'native_flow'
	if (message.viewOnceMessage?.message?.interactiveMessage?.nativeFlowMessage) return 'native_flow'
	return undefined
}

/**
 * Build the <biz> binary node that WhatsApp servers require for button messages.
 * Matches innovatorssoft/baileys getButtonArgs exactly.
 */
export function getButtonArgs(message: proto.IMessage): BinaryNode {
	const nativeFlow =
		message.interactiveMessage?.nativeFlowMessage ||
		message.viewOnceMessage?.message?.interactiveMessage?.nativeFlowMessage

	const carouselMessage =
		message.interactiveMessage?.carouselMessage || message.viewOnceMessage?.message?.interactiveMessage?.carouselMessage

	const firstButtonName =
		nativeFlow?.buttons?.[0]?.name ||
		(carouselMessage?.cards?.[0] as proto.Message.IInteractiveMessage | undefined)?.nativeFlowMessage?.buttons?.[0]
			?.name

	const nativeFlowSpecials = [
		'mpm',
		'cta_catalog',
		'send_location',
		'call_permission_request',
		'wa_payment_transaction_details',
		'automated_greeting_message_view_catalog'
	]

	const ts = unixTimestampSeconds().toString()

	// Payment flows
	if (nativeFlow && (firstButtonName === 'review_and_pay' || firstButtonName === 'payment_info')) {
		return {
			tag: 'biz',
			attrs: {
				native_flow_name: firstButtonName === 'review_and_pay' ? 'order_details' : firstButtonName!
			}
		}
	}

	// Special native flow (catalog, location, etc.) — WhatsApp Original only
	if (nativeFlow && nativeFlowSpecials.includes(firstButtonName ?? '')) {
		return {
			tag: 'biz',
			attrs: { actual_actors: '2', host_storage: '2', privacy_mode_ts: ts },
			content: [
				{
					tag: 'interactive',
					attrs: { type: 'native_flow', v: '1' },
					content: [{ tag: 'native_flow', attrs: { v: '2', name: firstButtonName! } }]
				},
				{ tag: 'quality_control', attrs: { source_type: 'third_party' } }
			]
		}
	}

	// Standard interactive / buttons / carousel — WhatsApp Original + Business
	if (nativeFlow || carouselMessage || message.buttonsMessage) {
		return {
			tag: 'biz',
			attrs: { actual_actors: '2', host_storage: '2', privacy_mode_ts: ts },
			content: [
				{
					tag: 'interactive',
					attrs: { type: 'native_flow', v: '1' },
					content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }]
				},
				{ tag: 'quality_control', attrs: { source_type: 'third_party' } }
			]
		}
	}

	// List message
	if (message.listMessage) {
		return {
			tag: 'biz',
			attrs: { actual_actors: '2', host_storage: '2', privacy_mode_ts: ts },
			content: [
				{ tag: 'list', attrs: { v: '2', type: 'product_list' } },
				{ tag: 'quality_control', attrs: { source_type: 'third_party' } }
			]
		}
	}

	// Fallback
	return {
		tag: 'biz',
		attrs: { actual_actors: '2', host_storage: '2', privacy_mode_ts: ts }
	}
}
