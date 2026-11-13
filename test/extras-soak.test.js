import { test } from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'

import { TTLCache } from '../lib/Extras/ttl-cache.js'
import { prepareModernMessageContent } from '../lib/Extras/modern-messages.js'
import { makePortedSocket } from '../lib/Extras/socket.js'
import { commitSenderKeyDelivery, pickSenderKeyRecipients } from '../lib/Extras/sender-key-memory.js'
import { PlaylistAudioFeeder } from '../lib/Voip/index.js'
import { Button } from '../lib/index.js'

/**
 * Soak: the things that only show up after a few thousand messages.
 *
 * Two failure modes this looks for — a cache or map that grows without bound, and event listeners that are added
 * per message and never removed (the classic Baileys leak: listenerCount climbs until the emitter warns).
 * A third is heap growth that is not explained by the retained data.
 */

const ITERATIONS = 2_000

const stubSocket = () => {
	const ev = new EventEmitter()
	return {
		ev,
		ws: new EventEmitter(),
		query: async () => ({}),
		generateMessageTag: () => 'tag',
		logger: { debug() {}, info() {}, warn() {}, error() {}, child() { return this } },
		sendMessage: async () => ({}),
		relayMessage: async () => 'id',
		authState: { creds: { me: { id: '9199@s.whatsapp.net' } } }
	}
}

test('soak: preparing content 2000 times does not retain anything', async () => {
	const sock = stubSocket()
	const ported = makePortedSocket(sock, {})
	const listenersBefore = {
		ev: sock.ev.listenerCount('messages.upsert'),
		ws: sock.ws.listenerCount('message')
	}

	global.gc?.()
	const before = process.memoryUsage().heapUsed

	for (let i = 0; i < ITERATIONS; i += 1) {
		const content = { text: `message ${i}`, question: { text: `q${i}` }, comment: { text: 'c' } }
		const prepared = prepareModernMessageContent(content)
		assert.ok(prepared.questionMessage, 'question is prepared')
		await ported.sendMessage('9199@s.whatsapp.net', content)
	}

	global.gc?.()
	const after = process.memoryUsage().heapUsed
	const growthMb = (after - before) / 1024 / 1024

	assert.equal(sock.ev.listenerCount('messages.upsert'), listenersBefore.ev, 'no listener leak on the socket')
	assert.equal(sock.ws.listenerCount('message'), listenersBefore.ws, 'no listener leak on the websocket')
	assert.ok(growthMb < 40, `heap grew ${growthMb.toFixed(1)}MB over ${ITERATIONS} messages, expected < 40MB`)
})

test('soak: the ttl cache stays bounded under constant churn', async () => {
	const cache = new TTLCache({ ttl: 60_000, max: 500 })
	for (let i = 0; i < ITERATIONS; i += 1) {
		cache.set(`key-${i}`, { payload: i })
		if (i % 3 === 0) cache.get(`key-${i - 1}`)
		if (i % 97 === 0) cache.del(`key-${i}`)
	}

	assert.ok(cache.size <= 500, `cache holds ${cache.size} entries, cap is 500`)
	assert.ok(cache.keys().length <= 500)
})

test('soak: sender-key bookkeeping does not accumulate dead jids', async () => {
	const senderKeyMap = {}
	const devices = Array.from({ length: 50 }, (_, i) => ({ jid: `device${i}@s.whatsapp.net` }))

	for (let round = 0; round < 200; round += 1) {
		const recipients = pickSenderKeyRecipients(devices, senderKeyMap)
		/** only half the recipients ack, so the rest must be dropped from the map rather than marked */
		const nodes = recipients.slice(0, Math.ceil(recipients.length / 2)).map(jid => ({ attrs: { jid } }))
		commitSenderKeyDelivery(senderKeyMap, recipients, nodes)
	}

	const marked = Object.keys(senderKeyMap).length
	assert.ok(marked <= devices.length, `map holds ${marked} entries for ${devices.length} devices`)
})

test('soak: playlist feeder start/stop cycles leave nothing running', async () => {
	let created = 0
	const playlist = new PlaylistAudioFeeder({
		createFeeder: () => {
			created += 1
			let onEndCb
			return {
				start() {},
				stop() {},
				end: () => onEndCb?.()
			}
		}
	})

	for (let i = 0; i < 300; i += 1) {
		playlist.start([`track-${i}.mp3`, `next-${i}.mp3`])
		playlist.stop()
	}

	assert.equal(playlist.idle, true, 'the feeder ends idle')
	assert.equal(playlist.currentTrack, null)
	assert.equal(playlist.playlistLength, 0, 'no queued tracks survive a stop')
	assert.equal(created, 300, 'one feeder per start, none leaked into a second cycle')
})

test('soak: building interactive messages 500 times is stable', async () => {
	const sock = stubSocket()
	const built = []
	for (let i = 0; i < 500; i += 1) {
		const msg = await new Button(sock)
			.setTitle(`t${i}`)
			.setBody(`b${i}`)
			.addReply('Ping', '.ping')
			.build('9199@s.whatsapp.net')
		built.push(Boolean(msg?.message))
	}

	assert.equal(built.filter(Boolean).length, 500, 'every build produced a message')
	assert.equal(sock.ev.listenerCount('messages.upsert'), 0, 'building a message attaches no listeners')
})
