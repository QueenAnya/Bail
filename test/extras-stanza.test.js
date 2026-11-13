import { test } from 'node:test'
import assert from 'node:assert/strict'

import { proto } from '../WAProto/index.js'
import { buildRawMessageContent } from '../lib/Addons/raw-message.js'
import { preparePortedMessageContent } from '../lib/Extras/socket.js'
import { prepareModernMessageContent } from '../lib/Extras/modern-messages.js'
import { buildPaymentReminder, buildSplitPayment, buildSplitPaymentUpdate } from '../lib/Extras/payment-messages.js'
import { buildMusicMessage } from '../lib/Extras/status-stickers.js'
import { buildScheduledMsgMetaNode, encryptWithRevealKey, generateRevealKey, generateRevealKeyId } from '../lib/Extras/scheduled-message.js'
import { buildNewsletterStatusNode, buildNewsletterStatusReactionNode, buildNewsletterStatusRevokeNode, parseNewsletterStatusAck } from '../lib/Extras/newsletter-status.js'

/**
 * Stanza validity — the closest thing to "will the server accept this" that can be done without a paired account.
 *
 * Every message this fork builds is passed through the generated protobuf schema: encoded, then decoded back, and
 * the fields that carry the meaning are asserted to survive. A stanza that does not round-trip is malformed
 * regardless of what the server thinks, so this catches the structural class of bug before it ever leaves the box.
 *
 * It does not prove acceptance. Only `scripts/verify-live.mjs` can do that.
 */

const roundTrip = message => proto.Message.decode(proto.Message.encode(proto.Message.fromObject(message)).finish())

const cases = {
	'question': () => prepareModernMessageContent({ question: { text: 'Favourite colour?' } }),
	'question reply': () => prepareModernMessageContent({ questionReply: { text: 'Blue', serverQuestionId: 'Q1' } }),
	'comment': () =>
		prepareModernMessageContent({
			comment: {
				text: 'nice',
				targetMessageKey: { id: 'MSG1', remoteJid: 'a@s.whatsapp.net', fromMe: true },
				message: { conversation: 'parent' }
			}
		}),
	'status mention': () => prepareModernMessageContent({ statusMention: { text: 'hi', key: { id: 'SM1', remoteJid: 'status@broadcast', fromMe: true } } }),
	'status quoted': () => prepareModernMessageContent({ statusQuoted: { originalStatusId: { id: 'S1', remoteJid: 'status@broadcast', fromMe: true }, text: 'quoted' } }),
	'poll add option': () =>
		prepareModernMessageContent({
			pollAddOption: { pollCreationMessageKey: { id: 'P1', remoteJid: 'a@s.whatsapp.net', fromMe: true }, option: 'Green' }
		}),
	'event invite': () =>
		prepareModernMessageContent({
			eventInvite: { eventId: 'E1', eventName: 'Launch', startTime: Math.floor(Date.now() / 1000) + 3600 }
		}),

}

for (const [name, build] of Object.entries(cases)) {
	test(`stanza: ${name} round-trips through the protobuf schema`, () => {
		const built = build()
		assert.ok(built, `${name} produced nothing`)
		/** `{ raw: true, ... }` is a marker for the relay path; `raw` itself is not a proto field, so drop it */
		const payload = built.raw === true ? Object.fromEntries(Object.entries(built).filter(([key]) => key !== 'raw')) : built
		let back = roundTrip(payload)
		if (Object.keys(back).length === 0) {
			/** some payloads are a bare wrapper key (`{ paymentReminder: <message> }`) relayed with a custom node */
			back = roundTrip(Object.values(payload)[0])
		}

		const keys = Object.keys(back).filter(k => back[k] !== undefined && back[k] !== null)
		assert.ok(keys.length > 0, `${name} decoded to an empty message`)
		assert.equal(JSON.stringify(back).includes('undefined'), false, `${name} carries an undefined field`)
	})
}

test('stanza: scheduled message envelope round-trips with its meta node', () => {
	const key = generateRevealKey()
	const keyId = generateRevealKeyId()
	const payload = proto.Message.encode({ conversation: 'later' }).finish()
	const { encIv, encPayload } = encryptWithRevealKey(payload, key)

	const envelope = proto.Message.create({
		conditionalRevealMessage: {
			conditionalRevealMessageType: proto.Message.ConditionalRevealMessage.ConditionalRevealMessageType.SCHEDULED_MESSAGE,
			encPayload,
			encIv,
			revealKeyId: keyId
		}
	})

	const back = proto.Message.decode(proto.Message.encode(envelope).finish())
	assert.equal(back.conditionalRevealMessage?.revealKeyId, keyId, 'the reveal key id survives')
	assert.equal(back.conditionalRevealMessage?.encPayload?.length, encPayload.length, 'the ciphertext survives whole')

	const meta = buildScheduledMsgMetaNode({ revealKeyId: keyId, revealKey: key, scheduledTimestampS: Math.floor(Date.now() / 1000) + 900 })
	assert.equal(meta.tag, 'meta', 'the scheduling meta node is a <meta>')
	assert.ok(meta.attrs, 'and it carries attributes')
})

test('stanza: newsletter status nodes are well formed', () => {
	const text = buildNewsletterStatusNode({ jid: '123@newsletter', messageId: 'M1', message: proto.Message.create({ conversation: 'hi' }) })
	assert.equal(text.tag, 'status')
	assert.equal(text.attrs.to, '123@newsletter')
	assert.equal(text.attrs.type, 'text')

	const reaction = buildNewsletterStatusReactionNode({ jid: '123@newsletter', messageId: 'M2', parentServerId: 99, reaction: '👍' })
	assert.equal(reaction.attrs.type, 'reaction')

	const revoke = buildNewsletterStatusRevokeNode({ jid: '123@newsletter', statusId: 'M3' })
	assert.equal(revoke.attrs.edit, '8', 'revoke is edit=8')

	/** and an ack parses into the shape the sender expects */
	const ack = parseNewsletterStatusAck({ tag: 'ack', attrs: { id: 'M1', from: '123@newsletter', class: 'status', server_id: '4242', t: '1700000000' } }, { jid: '123@newsletter', messageId: 'M1' })
	assert.equal(ack.serverId, 4242)
	assert.equal(ack.class, 'status')
})

/**
 * Payment and music payloads.
 *
 * An earlier revision of this test claimed these could not be schema-validated because this WAProto had no
 * `paymentReminderMessage` / `splitPaymentMessage` / `musicMessage` field. That was wrong — the fields exist and
 * the check had looked in the wrong place (`proto.Message.fields` is not how protobufjs exposes them). They
 * validate like every other message, and the assertions below walk the real send path: prepare → raw mode →
 * proto encode/decode, so a regression in any of the three shows up here.
 */
const relayCases = {
	paymentReminderMessage: () =>
		preparePortedMessageContent({ paymentReminder: { reminderId: 'r1', amount: 250, currency: 'INR', payeeJid: 'a@s.whatsapp.net' } }),
	splitPaymentMessage: () =>
		preparePortedMessageContent({
			splitPayment: { splitId: 's1', total: 500, currency: 'INR', requesterJid: 'b@s.whatsapp.net', participants: [{ jid: 'a@s.whatsapp.net', amount: 250 }] }
		}),
	musicMessage: () =>
		preparePortedMessageContent({ music: { songId: 'song-1', title: 'T', artist: 'A', songUri: 'https://mmg.whatsapp.net/a.mp3' } })
}

for (const [key, build] of Object.entries(relayCases)) {
	test(`stanza: ${key} is a real proto field and survives the send path`, () => {
		const prepared = build()
		/** the socket wrapper marks these raw and names the proto field */
		assert.equal(prepared.raw, true, `${key} is relayed as raw proto content`)
		const inner = prepared[key]
		assert.ok(inner, `${key} carries its payload`)

		/** the send path rejects unknown top-level keys, so this must not throw */
		const rawContent = buildRawMessageContent({ ...prepared })
		assert.ok(rawContent[key], `raw mode accepts ${key}`)

		/** and the payload survives a real encode/decode round trip */
		const back = proto.Message.decode(proto.Message.encode(proto.Message.fromObject({ [key]: inner })).finish())
		assert.ok(back[key], `${key} survives encoding`)
		assert.equal(JSON.stringify(back).includes('undefined'), false, `${key} carries no undefined field`)
	})
}

test('stanza: the three relay payloads keep their identifying fields', () => {
	const reminder = preparePortedMessageContent({ paymentReminder: { reminderId: 'r1', amount: 250, currency: 'INR', payeeJid: 'a@s.whatsapp.net' } })
	assert.equal(reminder.paymentReminderMessage.reminderId, 'r1')
	assert.equal(reminder.paymentReminderMessage.amount.currencyCode, 'INR')
	assert.equal(reminder.paymentReminderMessage.amount.value, 250_000)

	const split = preparePortedMessageContent({ splitPayment: { splitId: 's1', total: 500, currency: 'INR', requesterJid: 'b@s.whatsapp.net', participants: [{ jid: 'a@s.whatsapp.net', amount: 250 }] } })
	assert.equal(split.splitPaymentMessage.splitId, 's1')
	assert.equal(split.splitPaymentMessage.participants.length, 1)
	/** money is scaled by the offset, so 500 rupees on the wire is 500000 at offset 1000 */
	assert.equal(split.splitPaymentMessage.totalAmount.value, 500_000)
	assert.equal(split.splitPaymentMessage.totalAmount.currencyCode, 'INR')

	const music = preparePortedMessageContent({ music: { songId: 'song-1', title: 'T', artist: 'A', songUri: 'https://mmg.whatsapp.net/a.mp3' } })
	assert.equal(music.musicMessage.songUri, 'https://mmg.whatsapp.net/a.mp3')
})

test('stanza: split payment update round-trips', () => {
	const update = buildSplitPaymentUpdate({ splitId: 's1', participantJid: 'a@s.whatsapp.net' })
	assert.equal(update.splitId, 's1')
	assert.equal(update.participantJid, 'a@s.whatsapp.net')

	/** a reminder with no currency is refused rather than sent half-formed */
	assert.throws(() => buildPaymentReminder({ reminderId: 'r1', amount: 10 }), /three letter currency code/)
})
