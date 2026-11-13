import { test } from 'node:test'
import assert from 'node:assert/strict'

import { TTLCache } from '../lib/Extras/ttl-cache.js'
import { hasOptionalMedia, loadSharp } from '../lib/Extras/optional-media.js'
import { commitSenderKeyDelivery, deliveredSenderKeyJids, pickSenderKeyRecipients } from '../lib/Extras/sender-key-memory.js'
import { makePortedSocket } from '../lib/Extras/socket.js'
import { PlaylistAudioFeeder } from '../lib/Voip/index.js'

/**
 * Concurrency checks for src/Extras.
 *
 * JavaScript is single threaded, so nothing here is about torn memory. What can still go wrong is
 * interleaving at an `await`: two callers entering the same async path, a module-level cache handing
 * back a half-built promise, a shared object mutated by one caller while another is reading it, or an
 * event handler that fires twice for one transition. Those are the races this file looks for.
 */

const stubLogger = { debug() {}, info() {}, warn() {}, error() {}, child() { return this } }

test('concurrency: optional-media hands every caller the same import', async () => {
    /** The module-level cache must dedupe in-flight imports, not start one per caller. */
    const first = loadSharp()
    const second = loadSharp()
    assert.equal(first, second, 'two callers share one promise')

    const [a, b] = await Promise.all([first, second])
    assert.equal(a, b, 'and therefore one module instance')

    /** A missing package must not be cached as a rejected promise for later callers. */
    const missing = await Promise.all([
        hasOptionalMedia('definitely-not-a-package-1'),
        hasOptionalMedia('definitely-not-a-package-1')
    ])
    assert.deepEqual(missing, [false, false], 'both callers get a clean false');
    assert.equal(await hasOptionalMedia('definitely-not-a-package-1'), false, 'and it stays false afterwards')
})

test('concurrency: sendMessage wrapper does not share or mutate content across callers', async () => {
    const seen = []
    const base = {
        query: async () => ({}),
        generateMessageTag: () => 'tag',
        logger: stubLogger,
        sendMessage: async (jid, content) => {
            // a real transport serialises here; yielding forces the two calls to interleave
            await new Promise(resolve => setTimeout(resolve, 5))
            seen.push({ jid, content })
            return { key: { id: String(seen.length) } }
        },
        ev: {},
        authState: { creds: {} }
    }
    const sock = makePortedSocket(base, {})

    const content = { text: 'hello', question: { text: 'Colour?' } }
    const snapshot = JSON.stringify(content)

    await Promise.all([
        sock.sendMessage('a@s.whatsapp.net', content),
        sock.sendMessage('b@s.whatsapp.net', content)
    ])

    assert.equal(seen.length, 2, 'both sends reached the transport')
    assert.equal(JSON.stringify(content), snapshot, 'the caller object is not mutated by the wrapper')
    for (const call of seen) {
        assert.ok(call.content.questionMessage, 'each call got its own prepared copy')
        assert.notEqual(call.content, content, 'the transport never sees the caller object itself')
    }

    assert.notEqual(seen[0].content, seen[1].content, 'the two prepared payloads are distinct objects')
    assert.deepEqual(seen[0].content, seen[1].content, 'but carry the same content')
})

test('concurrency: playlist feeder keeps its place when a track is queued as one ends', async () => {
    const events = []
    let feed
    const playlist = new PlaylistAudioFeeder({
        createFeeder: (track, onEnd) => {
            feed = { track, onEnd, stop() {} }
            return { start() {}, stop() {} }
        },
        onTrackStart: track => events.push(['start', track]),
        onTrackEnd: track => events.push(['end', track]),
        onIdle: () => events.push(['idle'])
    })

    playlist.start(['one.mp3'])
    const firstFeed = feed

    /** enqueue exactly as the current track ends: the queued track must not be lost or played twice. */
    const ending = firstFeed.onEnd
    playlist.enqueue('two.mp3')
    ending()

    assert.deepEqual(events, [
        ['start', 'one.mp3'],
        ['end', 'one.mp3'],
        ['start', 'two.mp3']
    ])
    assert.equal(playlist.currentTrack, 'two.mp3')
    assert.equal(playlist.playlistLength, 0, 'the queued track was consumed exactly once')

    /** The stale end callback from the finished track must not advance again. */
    ending()
    assert.deepEqual(events.slice(3), [], 'a repeated end callback is ignored')
})

test('concurrency: sender-key delivery bookkeeping survives overlapping commits', async () => {
    const senderKeyMap = {}
    const recipients = ['a@s.whatsapp.net', 'b@s.whatsapp.net', 'c@s.whatsapp.net']
    const nodes = [{ attrs: { jid: 'a@s.whatsapp.net' } }, { attrs: { jid: 'c@s.whatsapp.net' } }]

    const delivered = deliveredSenderKeyJids(nodes)
    assert.deepEqual([...delivered].sort(), ['a@s.whatsapp.net', 'c@s.whatsapp.net'])

    /** Two overlapping commits for the same recipients: the map must end in one consistent state. */
    const [first, second] = await Promise.all([
        Promise.resolve().then(() => commitSenderKeyDelivery(senderKeyMap, recipients, nodes)),
        Promise.resolve().then(() => commitSenderKeyDelivery(senderKeyMap, recipients, nodes))
    ])

    assert.deepEqual(first, second, 'the same input produces the same summary')
    assert.equal(senderKeyMap['a@s.whatsapp.net'], true, 'delivered recipients are marked')
    assert.equal(senderKeyMap['b@s.whatsapp.net'], undefined, 'undelivered recipients are not marked')

    /** Picking recipients while another caller marks them must never return a half-marked jid. */
    const devices = recipients.map(jid => ({ jid }))
    const picked = pickSenderKeyRecipients(devices, senderKeyMap)
    assert.deepEqual(picked, ['b@s.whatsapp.net'], 'only the device that has not received a key is picked')
})

test('concurrency: ttl cache stays consistent under interleaved expiry and eviction', async () => {
    const cache = new TTLCache({ ttl: 30, max: 4 })

    /** Fill past the limit while expiry is pending. */
    for (let i = 0; i < 20; i += 1) {
        cache.set(`k${i}`, i)
        await Promise.resolve()
    }

    assert.ok(cache.size <= 4, `max size held under churn, got ${cache.size}`)
    assert.ok(cache.keys().length <= 4)

    /** A value read between two awaits must not resurrect after expiry. */
    cache.set('short', 'v', 0.02)
    assert.equal(cache.get('short'), 'v')
    await new Promise(resolve => setTimeout(resolve, 40))
    assert.equal(cache.get('short'), undefined, 'the override ttl still applies')

    /** Concurrent reads of the same key are all consistent. */
    cache.set('stable', 42)
    const reads = await Promise.all(Array.from({ length: 8 }, () => Promise.resolve(cache.get('stable'))))
    assert.deepEqual(reads, Array(8).fill(42))
})
