#!/usr/bin/env node
/**
 * verify-live.mjs — prove the stanzas this fork builds are actually accepted by WhatsApp.
 *
 * Everything in `test/` is local: it proves the crypto round-trips, the nodes have the right shape and the
 * queues advance. None of it proves the server accepts what we send. This script does, using a session you
 * have already paired. It never creates a pairing, and by default it only ever talks to your own account.
 *
 * Usage:
 *   node scripts/verify-live.mjs --session ./session
 *   node scripts/verify-live.mjs --session ./session --interactive --scheduled
 *   node scripts/verify-live.mjs --session ./session --newsletter 1234567890@newsletter --post-status
 *   node scripts/verify-live.mjs --session ./session --to 9198XXXXXXXX@s.whatsapp.net   # explicit only
 *   node scripts/verify-live.mjs --session ./session --storm 5    # force 5 disconnects, measure reconnects
 *   node scripts/verify-live.mjs --session ./session --payments   # payment reminder + music relay payloads
 *
 * Exit code is 0 only when every step that ran passed.
 */
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import makeWASocket, { Button, DisconnectReason, proto, useMultiFileAuthState } from '../lib/index.js'

const args = process.argv.slice(2)
const flag = name => args.includes(`--${name}`)
const value = name => {
	const i = args.indexOf(`--${name}`)
	return i >= 0 ? args[i + 1] : undefined
}

const SESSION = resolve(value('session') ?? './session')
const EXPLICIT_TO = value('to')
const NEWSLETTER = value('newsletter')
const TIMEOUT_MS = Number(value('timeout') ?? 45_000)

if (!existsSync(SESSION)) {
	console.error(`No session at ${SESSION}. Pair once first (see docs/en/getting-started.md), then re-run.`)
	process.exit(2)
}

const results = []
const record = (step, status, detail = '') => {
	results.push({ step, status, detail })
	const tag = status === 'PASS' ? 'ok  ' : status === 'SKIP' ? 'skip' : 'FAIL'
	console.log(`${tag} ${step.padEnd(34)} ${detail}`)
}

const withTimeout = (promise, ms, label) =>
	Promise.race([
		promise,
		new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms))
	])

const { state, saveCreds } = await useMultiFileAuthState(SESSION)
const selfJid = state.creds?.me?.id
if (!selfJid) {
	console.error('The session has no registered account (creds.me is empty). Pair first, then re-run.')
	process.exit(2)
}

const target = EXPLICIT_TO ?? selfJid
console.log(`session: ${SESSION}`)
console.log(`self:    ${selfJid}`)
console.log(`target:  ${target}${EXPLICIT_TO ? '  (explicit --to)' : '  (self only)'}`)
console.log('')

const received = []
let sock

const step = async (name, fn) => {
	try {
		const detail = await fn()
		record(name, 'PASS', detail ?? '')
	} catch (error) {
		record(name, 'FAIL', error?.message ?? String(error))
	}
}

const skip = (name, why) => record(name, 'SKIP', why)

/** 1. the handshake: a stale client revision is rejected here, so an open socket is the proof */
await step('connect (revision accepted)', async () => {
	sock = makeWASocket({ auth: state, markOnlineOnConnect: false, syncFullHistory: false })
	sock.ev.on('creds.update', saveCreds)
	sock.ev.on('messages.upsert', ({ messages, type }) => {
		if (type === 'notify') received.push(...messages)
	})

	const version = sock.authState?.creds?.me
	const opened = new Promise((resolveOpen, rejectOpen) => {
		const timer = setTimeout(() => rejectOpen(new Error('connection did not open')), TIMEOUT_MS)
		sock.ev.on('connection.update', update => {
			if (update.connection === 'open') {
				clearTimeout(timer)
				resolveOpen()
			}

			if (update.connection === 'close') {
				clearTimeout(timer)
				const code = update.lastDisconnect?.error?.output?.statusCode
				rejectOpen(new Error(`closed before open (${code ?? 'unknown'}${code === DisconnectReason.loggedOut ? ', logged out' : ''})`))
			}
		})
	})

	await opened
	return version ? 'socket open, creds intact' : 'socket open'
})

/** 2. a text message to self: proves the send path and the echo back through messages.upsert */
await step('send text, receive echo', async () => {
	const marker = `verify-live ${Date.now()}`
	const sent = await withTimeout(sock.sendMessage(target, { text: marker }), TIMEOUT_MS, 'sendMessage')

	const echo = await withTimeout(
		(async () => {
			const deadline = Date.now() + TIMEOUT_MS
			while (Date.now() < deadline) {
				const hit = received.find(m => m.key?.id === sent.key.id || m.message?.conversation === marker)
				if (hit) return hit
				await new Promise(r => setTimeout(r, 250))
			}

			throw new Error('no echo arrived')
		})(),
		TIMEOUT_MS + 5_000,
		'echo'
	)

	return `id ${sent.key.id} echoed as ${echo.key.id}`
})

/** 3. an interactive message: the builder + biz node are only accepted if the shape is right */
if (flag('interactive')) {
	await step('send interactive buttons', async () => {
		const msg = new Button(sock)
			.setTitle('verify-live')
			.setBody('Tap a button; if this renders, the interactive stanza was accepted.')
			.setFooter('anya-baileys verify-live')
			.addReply('Ping', '.ping')
			.addUrl('Docs', 'https://github.com/WhiskeySockets/Baileys')
			.build(target)

		await withTimeout(
			sock.relayMessage(target, msg.message, { messageId: msg.key.id }),
			TIMEOUT_MS,
			'relayMessage(interactive)'
		)
		return `messageId ${msg.key.id}`
	})
} else {
	skip('send interactive buttons', 'pass --interactive to include it')
}

/** 4. a scheduled message: the conditionalRevealMessage envelope is the least-verified shape we build */
if (flag('scheduled')) {
	await step('schedule + unschedule a message', async () => {
		const scheduled = await import('../lib/Extras/scheduled-message.js')
		const when = Math.floor(Date.now() / 1000) + 15 * 60
		if (!scheduled.isScheduledTimeValid(when)) throw new Error('15 minutes from now is outside the allowed window')

		const key = scheduled.generateRevealKey()
		const keyId = scheduled.generateRevealKeyId()
		const payload = proto.Message.encode({ conversation: 'verify-live scheduled message' }).finish()
		const { encIv, encPayload } = scheduled.encryptWithRevealKey(payload, key)

		const message = {
			conditionalRevealMessage: {
				conditionalRevealMessageType: 1,
				encPayload,
				encIv,
				revealKeyId: keyId
			}
		}

		const meta = scheduled.buildScheduledMsgMetaNode({ revealKeyId: keyId, revealKey: key, scheduledTimestampS: when })
		const id = await withTimeout(
			sock.relayMessage(target, message, { additionalNodes: [meta] }),
			TIMEOUT_MS,
			'relayMessage(scheduled)'
		)

		const unschedule = scheduled.buildUnscheduleProtocolMessage({ messageKey: { id, remoteJid: target, fromMe: true } })
		await withTimeout(sock.relayMessage(target, unschedule), TIMEOUT_MS, 'relayMessage(unschedule)')
		return `scheduled ${id} for ${new Date(when * 1000).toISOString()}, then unscheduled`
	})
} else {
	skip('schedule + unschedule', 'pass --scheduled to include it')
}

/** 5. channel status: needs admin rights and the CHANNEL_STATUS_PRODUCER capability, so check first */
if (NEWSLETTER && flag('post-status')) {
	await step('newsletter: capabilities', async () => {
		const caps = await withTimeout(sock.newsletterAdminCapabilities(NEWSLETTER), TIMEOUT_MS, 'capabilities')
		const canPost = JSON.stringify(caps).includes('STATUS_PRODUCER')
		if (!canPost) throw new Error(`account lacks CHANNEL_STATUS_PRODUCER: ${JSON.stringify(caps).slice(0, 160)}`)
		return 'CHANNEL_STATUS_PRODUCER present'
	})

	await step('newsletter: post + revoke a text status', async () => {
		const posted = await withTimeout(
			sock.sendNewsletterStatus(NEWSLETTER, { text: `verify-live ${new Date().toISOString()}` }),
			TIMEOUT_MS,
			'sendNewsletterStatus'
		)

		const statusId = posted?.id ?? posted?.key?.id
		if (!statusId) throw new Error(`no status id came back: ${JSON.stringify(posted)?.slice(0, 160)}`)

		const listed = await withTimeout(sock.getNewsletterStatuses(NEWSLETTER), TIMEOUT_MS, 'getNewsletterStatuses')
		const seen = JSON.stringify(listed).includes(statusId)
		await withTimeout(sock.revokeNewsletterStatus(NEWSLETTER, { statusId }), TIMEOUT_MS, 'revokeNewsletterStatus')
		if (!seen) throw new Error(`posted ${statusId} but it did not appear in getNewsletterStatuses`)
		return `posted ${statusId}, appeared in the list, revoked`
	})
} else if (NEWSLETTER) {
	skip('newsletter status', 'pass --post-status to include it')
}

/**
 * 5b. relay payloads: payment reminder, split payment and music go out as raw proto fields
 *     (paymentReminderMessage / splitPaymentMessage / musicMessage). The unit tests prove they encode and that raw
 *     mode accepts them; only the server can prove it renders. Self-target by default.
 */
if (flag('payments')) {
	await step('payment reminder (raw proto relay)', async () => {
		const sent = await withTimeout(
			sock.sendMessage(target, {
				paymentReminder: { reminderId: `r-${Date.now()}`, amount: 1, currency: 'INR', payeeJid: selfJid }
			}),
			TIMEOUT_MS,
			'sendMessage(paymentReminder)'
		)
		if (!sent?.key?.id) throw new Error('no message id came back')
		return `id ${sent.key.id}`
	})

	await step('music message (raw proto relay)', async () => {
		/** music URIs must come from a Meta catalog entry; pointing at your own file is refused by the builder */
		const catalogUri = value('music-uri')
		if (!catalogUri) throw new Error('pass --music-uri <https://mmg.whatsapp.net/...> from a music message you received')
		const sent = await withTimeout(
			sock.sendMessage(target, { music: { songId: value('music-song-id') ?? 'verify-live', songUri: catalogUri } }),
			TIMEOUT_MS,
			'sendMessage(music)'
		)
		if (!sent?.key?.id) throw new Error('no message id came back')
		return `id ${sent.key.id}`
	})
} else {
	skip('payment / music relay', 'pass --payments to include it')
}

/**
 * 6. reconnect storm: force N disconnects and prove the socket comes back each time, without leaking listeners
 *    or growing the heap cycle over cycle. This is the part no unit test can cover — it needs a live socket.
 */
if (flag('storm')) {
	const cycles = Number(value('storm') || 3)
	await step(`reconnect storm (${cycles} cycles)`, async () => {
		const timings = []
		const listeners = []
		const heaps = []

		for (let cycle = 0; cycle < cycles; cycle += 1) {
			const startedAt = Date.now()
			/** closing the underlying websocket is what a dropped connection looks like from here */
			const ws = sock.ws
			if (!ws) throw new Error('no websocket to close')

			const reopened = new Promise((resolveOpen, rejectOpen) => {
				const timer = setTimeout(() => rejectOpen(new Error(`cycle ${cycle + 1} did not reconnect in time`)), TIMEOUT_MS)
				const onUpdate = update => {
					if (update.connection === 'open') {
						clearTimeout(timer)
						sock.ev.off('connection.update', onUpdate)
						resolveOpen()
					}
				}

				sock.ev.on('connection.update', onUpdate)
			})

			ws.close()
			await reopened
			timings.push(Date.now() - startedAt)
			listeners.push(sock.ev.listenerCount('connection.update'))
			heaps.push(Math.round(process.memoryUsage().heapUsed / 1024 / 1024))
		}

		/** a leak shows up as a rising listener count; a slow leak shows up as rising heap */
		const listenerGrowth = listeners[listeners.length - 1] - listeners[0]
		const heapGrowth = heaps[heaps.length - 1] - heaps[0]
		if (listenerGrowth > 2) throw new Error(`connection.update listeners grew by ${listenerGrowth} across cycles`)
		if (heapGrowth > 60) throw new Error(`heap grew ${heapGrowth}MB across ${cycles} cycles`)

		return `reconnects ${timings.join('/')}ms, listeners ${listeners.join('/')}, heap ${heaps.join('/')}MB`
	})
} else {
	skip('reconnect storm', 'pass --storm <n> to include it')
}

/** report */
console.log('')
const failed = results.filter(r => r.status === 'FAIL')
const passed = results.filter(r => r.status === 'PASS')
const skipped = results.filter(r => r.status === 'SKIP')
console.log(`${passed.length} passed, ${failed.length} failed, ${skipped.length} skipped`)

if (failed.length) {
	console.log('\nFailures:')
	for (const f of failed) console.log(`  ${f.step}: ${f.detail}`)
}

try {
	sock?.end(undefined)
} catch {}

process.exit(failed.length ? 1 : 0)
