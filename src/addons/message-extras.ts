/**
 * Message Extras Addon
 * Ported from innovatorssoft/Baileys.
 *
 * Adds:
 *  - profilePictureUrl      — fetch profile pic URL for any JID incl. newsletters
 *  - getEphemeralGroup      — query a group's ephemeral (disappearing) timer
 *  - getButtonType          — detect button/interactive message type
 *  - getButtonArgs          — build bizArgs node for special native-flow buttons
 *
 * Usage — inject into makeMessagesSocket return:
 * ```ts
 * const msgExtras = makeMessageExtrasAddon({ query, sock, newsletterWMexQuery })
 * return { ...sock, ...msgExtras }
 * ```
 */

import type { proto } from '../../WAProto/index.js'
import { QueryIds, XWAPaths } from '../Types'
import { getUrlFromDirectPath, unixTimestampSeconds } from '../Utils'
import {
	type BinaryNode,
	getBinaryNodeChild,
	isJidGroup,
	isJidNewsletter,
	jidNormalizedUser,
	S_WHATSAPP_NET
} from '../WABinary'

// =====================================================
// CONTEXT
// =====================================================

export interface MessageExtrasContext {
	query: (node: BinaryNode) => Promise<BinaryNode>
	/**
	 * Needed only for newsletter profile picture lookup.
	 * Pass `undefined` to skip the newsletter branch.
	 */
	newsletterWMexQuery?: (
		variables: Record<string, unknown> | undefined,
		queryId: string,
		options: Record<string, unknown>
	) => Promise<BinaryNode>
}

// =====================================================
// BUTTON TYPE DETECTION
// =====================================================

type ButtonMessageType = 'list' | 'buttons' | 'native_flow' | undefined

/**
 * Detect the button/interactive message category from a proto message.
 *
 * @example
 * const type = getButtonType(msg.message!)
 * // → 'list' | 'buttons' | 'native_flow' | undefined
 */
export const getButtonType = (message: proto.IMessage): ButtonMessageType => {
	if (message.listMessage) return 'list'
	if (message.buttonsMessage) return 'buttons'
	if (message.interactiveMessage?.nativeFlowMessage) return 'native_flow'
	if (message.interactiveMessage?.carouselMessage) return 'native_flow'
	if (message.viewOnceMessage?.message?.interactiveMessage?.carouselMessage) return 'native_flow'
	if (message.viewOnceMessage?.message?.interactiveMessage?.nativeFlowMessage) return 'native_flow'
	return undefined
}

/**
 * Build the `bizArgs` extra node required by certain special native-flow buttons
 * (payment, catalog, location sharing, etc.).
 * Returns `undefined` for regular buttons that need no extra node.
 *
 * @example
 * const bizArgs = getButtonArgs(msg.message!)
 * if (bizArgs) { ... }
 */
export const getButtonArgs = (message: proto.IMessage): BinaryNode | undefined => {
	const nativeFlow =
		message.interactiveMessage?.nativeFlowMessage ||
		message.viewOnceMessage?.message?.interactiveMessage?.nativeFlowMessage

	const carouselMessage =
		message.interactiveMessage?.carouselMessage || message.viewOnceMessage?.message?.interactiveMessage?.carouselMessage

	const firstButtonName =
		(nativeFlow?.buttons?.[0] as { name?: string } | undefined)?.name ||
		(carouselMessage?.cards?.[0] as { nativeFlowMessage?: { buttons?: { name?: string }[] } } | undefined)
			?.nativeFlowMessage?.buttons?.[0]?.name

	const nativeFlowSpecials = [
		'mpm',
		'cta_catalog',
		'send_location',
		'call_permission_request',
		'wa_payment_transaction_details',
		'automated_greeting_message_view_catalog'
	]

	if (nativeFlow && (firstButtonName === 'review_and_pay' || firstButtonName === 'payment_info')) {
		return {
			tag: 'biz',
			attrs: {
				native_flow_name: firstButtonName === 'review_and_pay' ? 'order_details' : firstButtonName
			}
		}
	}

	if (nativeFlow && firstButtonName && nativeFlowSpecials.includes(firstButtonName)) {
		return {
			tag: 'biz',
			attrs: {
				actual_actors: '2',
				host_storage: '2',
				privacy_mode_ts: unixTimestampSeconds().toString()
			},
			content: [
				{
					tag: 'interactive',
					attrs: { type: 'native_flow', v: '1' },
					content: [
						{
							tag: 'native_flow',
							attrs: { v: '2' },
							content: undefined
						}
					]
				}
			]
		}
	}

	return undefined
}

// =====================================================
// FACTORY
// =====================================================

export const makeMessageExtrasAddon = (ctx: MessageExtrasContext) => {
	const { query, newsletterWMexQuery, groupQuery } = ctx

	/**
	 * Fetch the profile picture URL for any JID, including newsletters.
	 * Returns the URL string, or `null` if not available.
	 *
	 * @example
	 * const url = await sock.profilePictureUrl('1234567890@s.whatsapp.net')
	 */
	const profilePictureUrl = async (jid: string): Promise<string | null> => {
		// Newsletter profile picture — requires WMex query
		if (isJidNewsletter(jid) && newsletterWMexQuery) {
			const node = await newsletterWMexQuery(undefined, QueryIds.METADATA, {
				input: { key: jid, type: 'JID', view_role: 'GUEST' },
				fetch_viewer_metadata: true,
				fetch_full_image: true,
				fetch_creation_time: true
			})

			const resultStr = getBinaryNodeChild(node, 'result')?.content?.toString()
			if (!resultStr) return null

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const metadata = JSON.parse(resultStr).data[XWAPaths.xwa2_newsletter_metadata] as any
			return getUrlFromDirectPath(metadata?.thread_metadata?.picture?.direct_path || '')
		}

		// Regular user / group profile picture
		const result = await query({
			tag: 'iq',
			attrs: {
				target: jidNormalizedUser(jid),
				to: S_WHATSAPP_NET,
				type: 'get',
				xmlns: 'w:profile:picture'
			},
			content: [{ tag: 'picture', attrs: { type: 'image', query: 'url' }, content: undefined }]
		})

		const child = getBinaryNodeChild(result, 'picture')
		return child?.attrs?.url || null
	}

	/**
	 * Query the ephemeral (disappearing messages) timer configured for a group.
	 * Returns the timer in seconds, or `0` if not set.
	 *
	 * @example
	 * const timer = await sock.getEphemeralGroup('120363xxxxxxxx@g.us')
	 * // → 86400 (24 hours), 604800 (7 days), etc.
	 */
	const getEphemeralGroup = async (jid: string): Promise<number | string> => {
		if (!isJidGroup(jid)) throw new TypeError('Jid should originate from a group!')

		// Build the IQ query directly (same as groupQuery internal pattern)
		const result = await query({
			tag: 'iq',
			attrs: { id: `ephemeral-${Date.now()}`, to: jid, type: 'get', xmlns: 'w:g2' },
			content: [{ tag: 'query', attrs: { request: 'interactive' }, content: undefined }]
		})

		const group = getBinaryNodeChild(result, 'group')
		return getBinaryNodeChild(group!, 'ephemeral')?.attrs?.expiration || 0
	}

	return {
		profilePictureUrl,
		getEphemeralGroup,
		// Also export as static helpers (no context needed)
		getButtonType,
		getButtonArgs
	}
}
