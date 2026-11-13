import { test } from 'node:test'
import assert from 'node:assert/strict'

import { isAllowedEndpoint, WA_ENDPOINT_HOSTS } from '../lib/Socket/socket.js'

/**
 * Endpoint allowlist.
 *
 * A WhatsApp client has to open a socket and read a session directory — that is the product, and no amount of
 * refactoring changes the shape of it. What can change is *where* the socket is allowed to go. Before this guard
 * the library would dial whatever `waWebSocketUrl` it was given, which is the same behaviour profile as a
 * session-stealer pointed at a collector. Now the destination is a decision the library makes, not one the caller
 * can smuggle in.
 */

test('endpoint: WhatsApp hosts are allowed without any opt-in', () => {
	for (const host of WA_ENDPOINT_HOSTS) {
		assert.equal(isAllowedEndpoint(new URL(`wss://${host}/ws/chat`)), true, host)
	}

	assert.equal(isAllowedEndpoint(new URL('wss://web.whatsapp.com/ws/chat')), true, 'the default endpoint')
})

test('endpoint: loopback is allowed so a local test server still works', () => {
	for (const host of ['localhost', '127.0.0.1']) {
		assert.equal(isAllowedEndpoint(new URL(`ws://${host}:8080/ws`)), true, host)
	}
})

test('endpoint: everything else is refused', () => {
	const refused = [
		'wss://collector.example.com/ws',
		'wss://whatsapp.com.evil.test/ws',
		'wss://web.whatsapp.com.attacker.io/ws',
		'wss://192.0.2.10/ws',
		'wss://xn--80ak6aa92e.com/ws'
	]

	for (const url of refused) {
		assert.equal(isAllowedEndpoint(new URL(url)), false, url)
	}
})

test('endpoint: the allowlist cannot be spoofed with a lookalike host', () => {
	/** suffix matching would let `evil-web.whatsapp.com.attacker.io` through; exact host matching does not */
	assert.equal(isAllowedEndpoint(new URL('wss://evil-web.whatsapp.com.attacker.io/ws')), false)
	assert.equal(isAllowedEndpoint(new URL('wss://web.whatsapp.com@attacker.io/ws')), false, 'userinfo trick')
})
