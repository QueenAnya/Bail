import { test } from 'node:test'
import assert from 'node:assert/strict'

import { proto } from '../WAProto/index.js'
import { PORTED_FROM } from '../lib/Extras/index.js'
import { decryptWithRevealKey, encryptWithRevealKey, generateRevealKey } from '../lib/Extras/scheduled-message.js'
import { buildSplitPayment, money } from '../lib/Extras/payment-messages.js'
import { prepareModernMessageContent } from '../lib/Extras/modern-messages.js'
import { checkHtmlApp } from '../lib/Extras/html-app.js'
import { NEWSLETTER_SERVER_ID_MAX, NEWSLETTER_SERVER_ID_MIN, toNewsletterServerId } from '../lib/Extras/newsletter-status.js'

/**
 * Guards for the one place this port cannot be byte-identical to elaina-baileys, plus the machinery that let the
 * other fourteen modules become identical.
 *
 * `scripts/audit-elaina-parity.mjs` reports the state: run it before changing anything here.
 */

test('parity: the proto compat shim attaches the types upstream addresses by name', async () => {
	/**
	 * Upstream writes `proto.Message.ConditionalRevealMessage...` and `proto.Message.PollAddOptionMessage.create`.
	 * This WAProto declares those flat, so `src/Utils/proto-compat.ts` aliases them under `Message` at load time.
	 * That is what lets the ported modules keep upstream's exact expressions — if this breaks, they all break.
	 */
	assert.equal(PORTED_FROM.recheckedAgainst, 'elaina-baileys 1.4.7')

	for (const name of ['ConditionalRevealMessage', 'PollAddOptionMessage', 'EventInviteMessage']) {
		assert.ok(proto.Message[name], `proto.Message.${name} must be attached by the shim`)
	}

	/** the nested enum upstream reads through that path has to be there too */
	assert.equal(proto.Message.ConditionalRevealMessage.ConditionalRevealMessageType.SCHEDULED_MESSAGE, 1)
	assert.equal(proto.Message.ProtocolMessage.Type.MESSAGE_UNSCHEDULE, 32)
})

test('parity: scheduled messages build and round-trip through upstream code paths', async () => {
	const key = generateRevealKey()
	const { encIv, encPayload } = encryptWithRevealKey(Buffer.from('payload'), key)
	assert.equal(decryptWithRevealKey(encPayload, encIv, key).toString(), 'payload')

	const message = proto.Message.create({
		conditionalRevealMessage: {
			conditionalRevealMessageType: proto.Message.ConditionalRevealMessage.ConditionalRevealMessageType.SCHEDULED_MESSAGE,
			encPayload,
			encIv
		}
	})

	const back = proto.Message.decode(proto.Message.encode(message).finish())
	assert.equal(back.conditionalRevealMessage?.conditionalRevealMessageType, 1, 'the envelope survives encoding')
})

test('parity: payment messages keep upstream behaviour — currency must be given', async () => {
	/**
	 * An earlier revision of this port defaulted the currency to INR. That was a behaviour change upstream does not
	 * have, so it was removed; `money` refuses a missing or malformed code exactly as upstream does.
	 */
	assert.throws(() => money(100, undefined), /three letter currency code/, 'a missing currency is refused')
	assert.throws(() => money(100, 'RUPEE'), /three letter currency code/, 'a malformed currency is refused')
	assert.deepEqual(money(100, 'INR'), { value: 100 * 1000, offset: 1000, currencyCode: 'INR' }, 'a valid code scales the amount')

	const split = buildSplitPayment({ splitId: 's1', total: 250, currency: 'INR', participants: [{ jid: 'a@s.whatsapp.net', amount: 250 }] })
	assert.ok(JSON.stringify(split).includes('INR'))
})

test('parity: modern-messages uses the shimmed types and prepares content', async () => {
	const question = prepareModernMessageContent({ text: 'hi', question: { text: 'Colour?' } })
	assert.ok(question?.questionMessage, 'question becomes questionMessage')

	const pollOption = prepareModernMessageContent({
		pollAddOption: { pollCreationMessageKey: { id: 'X', remoteJid: 'a@s.whatsapp.net', fromMe: true }, option: 'Blue' }
	})
	assert.ok(pollOption?.pollAddOptionMessage, 'pollAddOption builds through the shimmed type')

	assert.deepEqual(prepareModernMessageContent({ text: 'plain' }), { text: 'plain' }, 'unknown content is untouched')
})

test('parity: newsletter server-id helpers sit where upstream keeps them', async () => {
	/** upstream exports these from Utils/newsletter-status.js, and so does this port now */
	assert.equal(typeof toNewsletterServerId, 'function')
	assert.equal(Number.isInteger(NEWSLETTER_SERVER_ID_MIN), true)
	assert.equal(Number.isInteger(NEWSLETTER_SERVER_ID_MAX), true)
	assert.equal(String(toNewsletterServerId(12345)), String(toNewsletterServerId('12345')))

	/** and the package root still re-exports them */
	const root = await import('../lib/index.js')
	assert.equal(typeof root.toNewsletterServerId, 'function', 'reachable from the package root')
	assert.equal(typeof root.makeNewsletterStatusExtras, 'function', 'the socket factory is still exported')
})

test('parity: html-app embedded-media accounting', async () => {
	const withMedia = checkHtmlApp('<img src="data:image/png;base64,iVBORw0KGgo="><p>hi</p>')
	assert.equal(withMedia.ok, true, 'a data URI is allowed: ' + JSON.stringify(withMedia.problems))
	assert.ok(withMedia.embeddedBytes > 0, 'embedded bytes are counted')
	assert.equal(checkHtmlApp('<p>hi</p>').embeddedBytes, 0, 'no media means no embedded bytes')
})
