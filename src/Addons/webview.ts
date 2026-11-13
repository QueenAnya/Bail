/**
 * Send an HTML page as an in-app webview.
 *
 * One function, nothing else: you hand it the socket, the jid and the HTML, it relays the two stanzas WhatsApp needs.
 * No markup helpers, no validation layer, no height injection — the page is yours and it is sent exactly as given.
 *
 * The two stanzas are both required: the `botForwardedMessage` rich response, then a `protocolMessage` type-14 edit of
 * that same message id. Send only the first and the client shows a card that never opens.
 */
import { randomUUID } from 'crypto'
import { generateMessageIDV2 } from '../Utils/generics'
import { generateWAMessageFromContent } from '../Utils/messages'

/** the bot JID the forwarded-AI styling is attributed to */
export const HTML_WEBVIEW_BOT_JID = '867051314767696@bot'

/** forwardOrigin value for a Meta-AI forwarded bot message */
export const FORWARD_ORIGIN_META_AI = 4
/** botEntryPointOrigin value for a Meta-AI forward */
export const BOT_ENTRY_POINT_META_AI_FORWARD = 31

export interface WebViewOptions {
	/** the page — sent byte-for-byte as given */
	html: string
	/** disclaimer text and notification preview */
	title?: string
	/** preview line on the card */
	label?: string
	/** `true` (default) = Meta-AI forward styling, `false` = clean origin without the "Forwarded" badge */
	forwarded?: boolean
	/** quote an existing message */
	quoted?: {
		key?: { id?: string; remoteJid?: string; participant?: string }
		message?: any
		id?: string
		participant?: string
	}
	/** reuse a specific message id instead of generating one */
	messageId?: string
}

export interface WebViewResult {
	key: { remoteJid?: string | null; fromMe?: boolean; id: string }
	messageId: string
}

/** the only two things this needs from the socket */
export interface HtmlWebviewSocket {
	relayMessage: (jid: string, message: any, options?: any) => Promise<unknown>
	user?: { id?: string }
}

/** JSON.stringify with every non-ASCII code point escaped, so the payload survives the wire byte-for-byte */
const stringifyEscaped = (obj: unknown): string =>
	JSON.stringify(obj).replace(/[\u007f-\uffff]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))

/** drops `undefined` values so the payload carries only what was set */
const trimEmpty = <T extends Record<string, unknown>>(obj: T): T => {
	for (const key of Object.keys(obj)) {
		if (obj[key] === undefined) {
			delete obj[key]
		}
	}

	return obj
}

/**
 * @example
 * await webView(sock, jid, { html: '<!DOCTYPE html>…', title: 'Order status' })
 * await web(sock, jid, { html })            // same function
 */
export async function webView(
	sock: HtmlWebviewSocket,
	chatId: string,
	options: WebViewOptions
): Promise<WebViewResult> {
	if (!sock || !chatId) {
		throw new Error('webView requires sock and chatId')
	}

	const { html, title = '', label, forwarded = true, quoted, messageId } = options ?? ({} as WebViewOptions)

	if (!html || typeof html !== 'string') {
		throw new Error('webView: html is required')
	}

	const responseId = randomUUID()
	const botResponseId = randomUUID()

	const payload = Buffer.from(
		stringifyEscaped({
			response_id: responseId,
			sections: [
				{
					__typename: 'GenAIUnifiedResponseSection',
					view_model: {
						primitive: {
							__typename: 'GenAIaeacdsnwHtmlPrimitive',
							payload: html,
							trusted_sources: []
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			]
		})
	).toString('base64')

	const forward = forwarded
		? {
				forwardingScore: 1,
				isForwarded: true,
				forwardedAiBotMessageInfo: { botJid: HTML_WEBVIEW_BOT_JID },
				forwardOrigin: FORWARD_ORIGIN_META_AI,
				botMessageSharingInfo: {
					botEntryPointOrigin: BOT_ENTRY_POINT_META_AI_FORWARD,
					forwardScore: 1
				}
			}
		: {
				/** clean origin: no "Forwarded" badge, no Meta-AI attribution */
				forwardingScore: 0,
				isForwarded: false,
				forwardOrigin: 1,
				forwardedAiBotMessageInfo: { botJid: HTML_WEBVIEW_BOT_JID }
			}

	const quotedId = quoted?.key?.id ?? quoted?.id
	const quotedContext = quotedId
		? {
				stanzaId: quotedId,
				participant: quoted?.key?.participant ?? quoted?.participant ?? quoted?.key?.remoteJid,
				quotedType: 0,
				quotedMessage: quoted?.message ?? quoted
			}
		: {}

	const richResponseMessage = {
		messageType: 1,
		submessages: label ? [{ messageType: 2, messageText: String(label) }] : [],
		unifiedResponse: { data: payload },
		contextInfo: { ...forward, ...quotedContext }
	}

	const content = {
		messageContextInfo: {
			deviceListMetadata: {},
			deviceListMetadataVersion: 2,
			botMetadata: trimEmpty({
				...(title ? { messageDisclaimerText: title } : {}),
				botResponseId
			})
		},
		botForwardedMessage: { message: { richResponseMessage } }
	}

	/** `userJid` is required by the generator; for a bot-sent message it is the account itself */
	const userJid = sock.user?.id ?? chatId

	const msg = generateWAMessageFromContent(chatId, content as any, {
		userJid,
		messageId: messageId || generateMessageIDV2(),
		timestamp: new Date()
	})

	// stanza 1: the rich response
	await sock.relayMessage(chatId, msg.message!, { messageId: msg.key.id })

	// stanza 2: protocolMessage type-14 edit of the same message — this is what makes the client render the page
	const protocolMessage = {
		key: { remoteJid: chatId, fromMe: true, id: msg.key.id },
		type: 14,
		editedMessage: msg.message
	}

	const editMsg = generateWAMessageFromContent(
		chatId,
		{ botForwardedMessage: { message: { protocolMessage } } },
		{
			userJid,
			messageId: generateMessageIDV2(),
			timestamp: new Date()
		}
	)

	await sock.relayMessage(chatId, editMsg.message!, { messageId: editMsg.key.id })

	return { key: msg.key as WebViewResult['key'], messageId: msg.key.id! }
}

/** short alias — `web(sock, jid, { html })` */
export const web = webView

/** the name this shipped under first; kept so existing code keeps working */
export const sendHtmlWebview = webView
