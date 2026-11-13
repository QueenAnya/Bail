#!/usr/bin/env node
/**
 * live-check.mjs — exercises the four paths where this package diverges from upstream WhiskeySockets.
 *
 * Every check prints PASS, FAIL or SKIP and never throws, so one broken path does not hide the others. Run it against
 * your own account; nothing here writes to anyone else.
 *
 *   ANOTHER_AUTH_DIR=./auth node scripts/live-check.mjs            # all checks
 *   ANOTHER_AUTH_DIR=./auth node scripts/live-check.mjs --check 1  # just the handshake
 *
 * Env:
 *   ANOTHER_AUTH_DIR   folder for the multi-file auth state (created on first run)   [required]
 *   ANOTHER_PASSIVE    "true" to send passive:true in the login node (upstream behaviour), default false
 *   ANOTHER_WAIT_MS    how long to wait for each network answer (default 30000)
 */
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import qrcode from 'qrcode-terminal'
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '../lib/index.js'

const args = process.argv.slice(2)
const only = args.includes('--check') ? Number(args[args.indexOf('--check') + 1]) : 0
const waitMs = Number(process.env.ANOTHER_WAIT_MS ?? 30_000)
const passiveLogin = process.env.ANOTHER_PASSIVE === 'true'
const authDir = resolve(process.env.ANOTHER_AUTH_DIR ?? './auth')

const results = []
const record = (name, status, detail) => {
	results.push({ name, status, detail })
	console.log(`  ${status.padEnd(5)} ${name}${detail ? ` — ${detail}` : ''}`)
}

const silent = {
	level: 'silent',
	child: () => silent,
	trace: () => {},
	debug: () => {},
	info: () => {},
	warn: () => {},
	error: () => {}
}

const withTimeout = (promise, ms, what) =>
	Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error(`timed out waiting for ${what}`)), ms))])

mkdirSync(dirname(authDir), { recursive: true })
const { state, saveCreds } = await useMultiFileAuthState(authDir)

console.log(`\nauth dir : ${authDir}`)
console.log(`passive  : ${passiveLogin ? 'true (upstream WhiskeySockets)' : 'false (this package default)'}\n`)

const sock = makeWASocket({ auth: state, passiveLogin, logger: silent, syncFullHistory: false })
sock.ev.on('creds.update', saveCreds)

/** ── 1. handshake / pairing (#2682) ─────────────────────────────────────────────────────────────────────────── */
async function checkHandshake() {
	console.log('[1] handshake and pairing — the `passive` flag (upstream PR #2682)')

	if (sock.authState.creds.registered) {
		const outcome = await withTimeout(
			new Promise(resolve => {
				sock.ev.on('connection.update', u => {
					if (u.connection === 'open') resolve({ open: true })
					if (u.connection === 'close') resolve({ open: false, code: u.lastDisconnect?.error?.output?.statusCode })
				})
			}),
			waitMs,
			'the connection'
		).catch(err => ({ open: false, code: 'timeout', err }))

		if (outcome.open) return record('handshake', 'PASS', 'already paired, connection opened')
		if (outcome.code === 428) {
			return record('handshake', 'FAIL', '428 before QR — flip ANOTHER_PASSIVE and run again')
		}
		return record('handshake', 'FAIL', `closed with ${outcome.code}`)
	}

	/** not paired yet: watch for a QR and for the 428 that the passive flag is suspected to cause */
	const outcome = await withTimeout(
		new Promise(resolve => {
			let sawQR = false
			sock.ev.on('connection.update', u => {
				if (u.qr) {
					if (!sawQR) {
						console.log('\nscan this from WhatsApp → Linked devices → Link a device:\n')
						qrcode.generate(u.qr, { small: true })
						console.log('\nwaiting for the scan…')
					}
					sawQR = true
					resolve({ qr: true })
				}
				if (u.connection === 'close') resolve({ qr: sawQR, code: u.lastDisconnect?.error?.output?.statusCode })
			})
		}),
		waitMs,
		'a QR or a close'
	).catch(err => ({ qr: false, code: 'timeout', err }))

	if (outcome.qr) {
		return record('handshake', 'PASS', 'QR emitted — scan it to finish pairing, then rerun for the reconnect check')
	}
	if (outcome.code === 428) {
		return record('handshake', 'FAIL', '428 before any QR — this is the passive flag; try ANOTHER_PASSIVE flipped')
	}
	record('handshake', 'FAIL', `no QR, closed with ${outcome.code}`)
}

/** ── 2. inbound message and ack (#2749) ─────────────────────────────────────────────────────────────────────── */
async function checkAck() {
	console.log('[2] inbound message and ack stanza (upstream PR #2749)')
	if (!sock.authState.creds.registered) return record('ack', 'SKIP', 'not paired')

	const selfJid = sock.authState.creds.me.id
	const text = `live-check ${Date.now()}`
	const seen = []

	sock.ev.on('messages.upsert', ({ messages, type }) => {
		for (const m of messages) {
			if (m.key.remoteJid === selfJid && m.message?.conversation === text) seen.push(type)
		}
	})

	try {
		await withTimeout(sock.sendMessage(selfJid, { text }), waitMs, 'sendMessage')
	} catch (err) {
		return record('ack', 'FAIL', `send failed: ${err.message}`)
	}

	const got = await withTimeout(
		new Promise(resolve => {
			const timer = setInterval(() => {
				if (seen.length) {
					clearInterval(timer)
					resolve(seen)
				}
			}, 200)
		}),
		waitMs,
		'the echo of your own message'
	).catch(() => null)

	if (!got) return record('ack', 'FAIL', 'sent, but never came back — receive path or ack is broken')
	if (got.length > 1) return record('ack', 'FAIL', `delivered ${got.length} times — duplicate re-delivery (ack not landing)`)
	record('ack', 'PASS', 'sent once, received once')
}

/** ── 3. LID → PN recovery (#2744) ───────────────────────────────────────────────────────────────────────────── */
async function checkLid() {
	console.log('[3] LID-addressed senders resolve to a phone number (upstream PR #2744)')
	if (!sock.authState.creds.registered) return record('lid', 'SKIP', 'not paired')

	const unresolved = []
	let seenGroups = 0
	let seenDirect = 0

	sock.ev.on('messages.upsert', ({ messages }) => {
		for (const m of messages) {
			const chat = m.key.remoteJid ?? ''
			const isGroup = chat.endsWith('@g.us')

			// In a group the sender is `participant`, not `remoteJid`: the group jid is the chat, and the participant is
			// the LID-addressed member. Checking only remoteJid made every group message look resolved.
			const sender = isGroup ? (m.key.participant ?? '') : chat
			const alt = isGroup ? m.key.participantAlt : m.key.remoteJidAlt

			if (isGroup) seenGroups++
			else seenDirect++

			if (sender.endsWith('@lid') && !alt) {
				unresolved.push(isGroup ? `${sender} (in ${chat})` : sender)
			}
		}
	})

	console.log('      watching for 20s — send a message in any GROUP you are in (that is where LID senders show up),')
	console.log('      or from a LID-addressed contact / a linked device')
	await new Promise(r => setTimeout(r, 20_000))

	if (unresolved.length) return record('lid', 'FAIL', `unresolved LID sender(s): ${unresolved.slice(0, 3).join(', ')}`)

	if (!seenGroups && !seenDirect) {
		return record('lid', 'SKIP', 'no message arrived in the window — nothing was tested')
	}

	record('lid', 'PASS', `no unresolved LID senders (${seenGroups} group, ${seenDirect} direct message(s) checked)`)
}

/** ── 4. status update over w:mex (#2755) ────────────────────────────────────────────────────────────────────── */
async function checkStatus() {
	console.log('[4] status update via the migrated w:mex endpoint (upstream PR #2755)')
	if (!sock.authState.creds.registered) return record('status', 'SKIP', 'not paired')

	const selfJid = sock.authState.creds.me.id
	try {
		const sent = await withTimeout(
			sock.sendMessage('status@broadcast', { text: `live-check ${new Date().toISOString()}` }, { statusJidList: [selfJid] }),
			waitMs,
			'sending a status update'
		)
		if (!sent) return record('status', 'FAIL', 'sendMessage returned undefined')
		record('status', 'PASS', `status posted (id ${sent.key.id}) — check it appears in your status tab`)
	} catch (err) {
		record('status', 'FAIL', `${err.message} — the w:mex migration may not match what the server expects`)
	}
}

const checks = [checkHandshake, checkAck, checkLid, checkStatus]
for (const [i, check] of checks.entries()) {
	if (only && only !== i + 1) continue
	await check()
	console.log()
}

console.log('─'.repeat(70))
const failed = results.filter(r => r.status === 'FAIL')
const skipped = results.filter(r => r.status === 'SKIP')
console.log(`${results.length - failed.length - skipped.length} pass, ${failed.length} fail, ${skipped.length} skip`)
if (failed.length) {
	console.log('\nFAILED:')
	for (const f of failed) console.log(`  ${f.name}: ${f.detail}`)
}
console.log('\nNothing above is destructive. The status post is visible only to you (statusJidList is your own jid).')

await sock.end(undefined)
process.exit(failed.length ? 1 : 0)
