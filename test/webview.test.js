import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
	BOT_ENTRY_POINT_META_AI_FORWARD,
	FORWARD_ORIGIN_META_AI,
	HTML_WEBVIEW_BOT_JID,
	sendHtmlWebview,
	web,
	webView
} from '../lib/Addons/webview.js'

/**
 * webView (aliases: web, sendHtmlWebview) — one function, no validation layer, no markup helpers.
 *
 * What is worth testing: the page goes out exactly as given, and both stanzas are relayed (the rich response and the
 * type-14 edit that makes the client render it).
 */

const makeSocket = () => {
	const relays = []
	return {
		relays,
		user: { id: '919999999999:1@s.whatsapp.net' },
		relayMessage: async (jid, message, options) => {
			relays.push({ jid, message, options })
			return { id: options?.messageId }
		}
	}
}

const PAGE = '<!DOCTYPE html><html><body><p>hello</p></body></html>'

const decodePage = relay => {
	const rich = relay.message.botForwardedMessage.message.richResponseMessage
	const decoded = JSON.parse(Buffer.from(rich.unifiedResponse.data, 'base64').toString('utf8'))
	return decoded.sections[0].view_model.primitive.payload
}

test('webview: the html goes out byte-for-byte as given', async () => {
	const sock = makeSocket()
	await webView(sock, 'x@g.us', { html: PAGE })

	assert.equal(decodePage(sock.relays[0]), PAGE, 'no wrapping, no injection, no rewriting')
})

test('webview: two stanzas, the second is the type-14 edit of the first', async () => {
	const sock = makeSocket()
	const result = await webView(sock, '120363000000000000@g.us', { html: PAGE })

	assert.equal(sock.relays.length, 2)
	const [first, second] = sock.relays
	assert.ok(first.message.botForwardedMessage?.message?.richResponseMessage)
	const protocolMessage = second.message.botForwardedMessage?.message?.protocolMessage
	assert.equal(protocolMessage.type, 14)
	assert.equal(protocolMessage.key.id, result.messageId)
	assert.ok(protocolMessage.editedMessage)
})

test('webview: forwarded styling defaults on and can be turned off', async () => {
	const on = makeSocket()
	await webView(on, 'x@g.us', { html: PAGE })
	const onCtx = on.relays[0].message.botForwardedMessage.message.richResponseMessage.contextInfo
	assert.equal(onCtx.isForwarded, true)
	assert.equal(onCtx.forwardOrigin, FORWARD_ORIGIN_META_AI)
	assert.equal(onCtx.botMessageSharingInfo.botEntryPointOrigin, BOT_ENTRY_POINT_META_AI_FORWARD)
	assert.equal(onCtx.forwardedAiBotMessageInfo.botJid, HTML_WEBVIEW_BOT_JID)

	const off = makeSocket()
	await webView(off, 'x@g.us', { html: PAGE, forwarded: false })
	const offCtx = off.relays[0].message.botForwardedMessage.message.richResponseMessage.contextInfo
	assert.equal(offCtx.isForwarded, false)
	assert.equal(offCtx.forwardOrigin, 1)
})

test('webview: title and label land where the client reads them', async () => {
	const sock = makeSocket()
	await webView(sock, 'x@g.us', { html: PAGE, title: 'Order #42', label: 'tap to open' })

	const message = sock.relays[0].message
	assert.equal(message.messageContextInfo.botMetadata.messageDisclaimerText, 'Order #42')
	assert.deepEqual(message.botForwardedMessage.message.richResponseMessage.submessages, [
		{ messageType: 2, messageText: 'tap to open' }
	])
})

test('webview: a quoted message is carried in the context', async () => {
	const sock = makeSocket()
	await webView(sock, 'x@g.us', {
		html: PAGE,
		quoted: { key: { id: 'ABC123', remoteJid: 'x@g.us', participant: 'y@s.whatsapp.net' } }
	})

	const ctx = sock.relays[0].message.botForwardedMessage.message.richResponseMessage.contextInfo
	assert.equal(ctx.stanzaId, 'ABC123')
	assert.equal(ctx.participant, 'y@s.whatsapp.net')
})

test('webview: a page that would fail in the client is still sent — no guard here', async () => {
	/** the function validates nothing; a caller who wants checks runs them before calling */
	const sock = makeSocket()
	const risky = '<html><body><script>fetch("/x")</script></body></html>'
	await webView(sock, 'x@g.us', { html: risky })

	assert.equal(sock.relays.length, 2, 'it went out')
	assert.equal(decodePage(sock.relays[0]), risky)
})

test('webview: web and sendHtmlWebview are the same function', () => {
	assert.equal(web, webView, '`web` is an alias')
	assert.equal(sendHtmlWebview, webView, '`sendHtmlWebview` still points at the same function')
})

test('webview: missing arguments fail loudly', async () => {
	const sock = makeSocket()
	await assert.rejects(() => webView(null, 'x@g.us', { html: PAGE }), /requires sock and chatId/)
	await assert.rejects(() => webView(sock, '', { html: PAGE }), /requires sock and chatId/)
	await assert.rejects(() => webView(sock, 'x@g.us', {}), /html is required/)
})

test('webview: the socket carries webView, web and sendHtmlWebview', async () => {
	/** bound methods: the caller should not have to hand the socket back in */
	const { default: makeWASocket } = await import('../lib/index.js')
	const sock = makeWASocket({ auth: { creds: {}, keys: {} } })

	for (const name of ['webView', 'web', 'sendHtmlWebview']) {
		assert.equal(typeof sock[name], 'function', `sock.${name} should be callable`)
	}

	// all three are the same bound function
	assert.equal(sock.web, sock.webView)
	assert.equal(sock.sendHtmlWebview, sock.webView)

	await sock.end(undefined)
})
