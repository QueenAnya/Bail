import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
	CallTimelineStore,
	VoipDiagnostics,
	sanitizeJid,
	summarizeAttrs,
	summarizeNode,
	voipDiagnostics
} from '../lib/Voip/diagnostics.js'

/**
 * VoIP diagnostics, ported from innovatorssoft/baileys `lib/Voip/diagnostics.js`.
 *
 * Two things matter here and both are tested: the timeline must reconstruct a call, and nothing that looks like key
 * material may reach a log line.
 */

test('diagnostics: jids are stripped down to a safe form', () => {
	assert.equal(sanitizeJid('919999999999:12@s.whatsapp.net'), '919999999999:12@s.whatsapp.net')
	assert.equal(sanitizeJid('919999999999@s.whatsapp.net'), '919999999999@s.whatsapp.net')
	/** anything that is not a plain jid component is removed */
	assert.equal(sanitizeJid('user<script>@s.whatsapp.net'), 'userscript@s.whatsapp.net')
	assert.equal(sanitizeJid('token=abc123'), 'token=abc123', 'a non-jid is returned trimmed')
	assert.equal(sanitizeJid(''), '')
	assert.equal(sanitizeJid(undefined), '')
})

test('diagnostics: sensitive attributes are redacted, primitives survive', () => {
	const safe = summarizeAttrs({
		id: 'abc',
		count: 3,
		ok: true,
		enc: 'BASE64KEYMATERIAL',
		authToken: 'SECRET',
		mediaKey: 'KEY',
		nested: { a: 1 },
		list: [1, 2]
	})

	assert.equal(safe.id, 'abc')
	assert.equal(safe.count, 3)
	assert.equal(safe.ok, true)
	assert.equal(safe.enc, '[REDACTED]')
	assert.equal(safe.authToken, '[REDACTED]')
	assert.equal(safe.mediaKey, '[REDACTED]')
	assert.equal(safe.nested, undefined, 'objects are dropped, not stringified')
	assert.equal(safe.list, undefined, 'arrays are dropped')
})

test('diagnostics: a node summary carries structure, not payload bytes', () => {
	const node = {
		tag: 'call',
		attrs: { id: 'ABC', enc: 'SECRET' },
		content: [{ tag: 'audio' }, { tag: 'video' }]
	}

	const summary = summarizeNode(node)
	assert.equal(summary.tag, 'call')
	assert.equal(summary.attrs.id, 'ABC')
	assert.equal(summary.attrs.enc, '[REDACTED]')
	assert.deepEqual(summary.children, ['audio', 'video'])
	assert.equal(summary.childCount, 2)

	const binary = summarizeNode({ tag: 'enc', content: Buffer.alloc(8) })
	assert.equal(binary.contentType, 'buffer')
	assert.equal(binary.contentLength, 8, 'length is reported, the bytes are not')
	assert.equal(summarizeNode(null), null)
})

test('diagnostics: the timeline reconstructs a call in order with elapsed times', () => {
	const store = new CallTimelineStore()
	store.record('call-1', 'signaling.offer_sent', { jid: 'x@s.whatsapp.net' })
	store.record('call-1', 'engine.connected')
	store.record('call-1', 'engine.ended', { reason: 'hangup' })

	const entries = store.get('call-1')
	assert.equal(entries.length, 3)
	assert.deepEqual(
		entries.map(e => e.event),
		['signaling.offer_sent', 'engine.connected', 'engine.ended']
	)
	assert.ok(entries[2].elapsedMs >= entries[0].elapsedMs, 'elapsed time grows')

	const text = store.format('call-1')
	assert.match(text, /VoIP Call Timeline: call-1/)
	assert.match(text, /engine\.ended/)

	store.clear('call-1')
	assert.equal(store.get('call-1').length, 0)
	assert.match(store.format('missing'), /no recorded events/)
})

test('diagnostics: a timeline stays bounded per call', () => {
	const store = new CallTimelineStore({ maxEntriesPerCall: 5 })
	for (let i = 0; i < 20; i += 1) {
		store.record('call-2', `step-${i}`)
	}

	const entries = store.get('call-2')
	assert.equal(entries.length, 5, 'old entries fall off')
	assert.equal(entries[4].event, 'step-19', 'the newest entry is kept')
})

test('diagnostics: log() redacts data and records on the timeline', () => {
	const lines = []
	const logger = { info: (_o, msg) => lines.push(msg), debug: (_o, msg) => lines.push(msg) }
	const diag = new VoipDiagnostics(logger, { diagnostic: true })

	diag.log({
		level: 'debug',
		component: 'Signaling',
		event: 'offer_received',
		callId: 'c9',
		jid: '919999999999:1@s.whatsapp.net',
		data: { enc: 'SECRET', retry: 2 }
	})

	assert.equal(lines.length, 1)
	assert.match(lines[0], /component=Signaling/)
	assert.match(lines[0], /jid=919999999999:1@s\.whatsapp\.net/)
	assert.match(lines[0], /"enc":"\[REDACTED\]"/)
	assert.doesNotMatch(lines[0], /SECRET/)

	const timeline = diag.getTimeline('c9')
	assert.equal(timeline.length, 1)
	assert.equal(timeline[0].event, 'Signaling.offer_received')
})

test('diagnostics: one shared instance across imports', () => {
	assert.equal(voipDiagnostics, globalThis[Symbol.for('baileys.voip.diagnostics')])
	assert.ok(voipDiagnostics instanceof VoipDiagnostics)
})
