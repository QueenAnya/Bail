#!/usr/bin/env node
/**
 * check-revision.mjs — is the pinned WhatsApp Web client revision still current?
 *
 * The revision in `src/Defaults/index.ts` is the `client_revision` the client claims during the handshake.
 * WhatsApp stops accepting stale ones, and that is the most common way a working bot dies silently. This script
 * fetches the live value and compares. Run it on a schedule; it exits 1 when the pin is behind.
 *
 *   node scripts/check-revision.mjs
 *   node scripts/check-revision.mjs --fix      # rewrite the constant in place
 *
 * Needs network access to web.whatsapp.com. If that is blocked (some CI runners, air-gapped boxes) the script
 * says so and exits 0 — an unreachable check is not a stale pin.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const DEFAULTS = 'src/Defaults/index.ts'
const SW_URL = 'https://web.whatsapp.com/sw.js'

const current = readFileSync(DEFAULTS, 'utf8').match(/const version = \[2, 3000, (\d+)\]/)
if (!current) {
	console.error(`could not find the version constant in ${DEFAULTS}`)
	process.exit(2)
}

const pinned = Number(current[1])
console.log(`pinned client revision: 2.3000.${pinned}`)

let live
try {
	const response = await fetch(SW_URL, { headers: { 'user-agent': 'Mozilla/5.0' } })
	if (!response.ok) throw new Error(`HTTP ${response.status}`)
	const body = await response.text()
	const match = body.match(/client_revision["']?\s*[:=]\s*["']?(\d{9,})/)
	if (!match) throw new Error('client_revision not found in sw.js')
	live = Number(match[1])
} catch (error) {
	console.log(`could not read the live revision (${error.message}); nothing to compare, not failing`)
	process.exit(0)
}

console.log(`live client revision:   2.3000.${live}`)

if (live === pinned) {
	console.log('up to date')
	process.exit(0)
}

if (live < pinned) {
	console.log(`pinned is ahead of the live bundle by ${pinned - live}; no action`)
	process.exit(0)
}

console.log(`STALE: the live revision is ${live - pinned} ahead of the pin`)

if (process.argv.includes('--fix')) {
	writeFileSync(DEFAULTS, readFileSync(DEFAULTS, 'utf8').replace(`[2, 3000, ${pinned}]`, `[2, 3000, ${live}]`))
	console.log(`updated ${DEFAULTS} to 2.3000.${live} — rebuild and re-run the live harness before shipping`)
	process.exit(0)
}

console.log('re-run with --fix to update it, then rebuild and run scripts/verify-live.mjs')
process.exit(1)
