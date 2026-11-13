#!/usr/bin/env node
/**
 * audit-elaina-parity.mjs — keep the ported modules honest without freezing them.
 *
 * Compares each module in src/Extras with its elaina-baileys source after stripping types and minifying both sides
 * through esbuild, so formatting and TypeScript annotations cannot hide a difference.
 *
 * Three outcomes per module:
 *   identical    — the code still matches upstream
 *   intentional  — it differs, and that difference is recorded in parity-baseline.json with a reason
 *   UNEXPLAINED  — it differs and nobody said why → exit 1
 *
 * So a deliberate local change is fine: record it. An accidental one — a stray edit, a half-applied upstream fix,
 * a hand-resolved merge — is not, because nobody recorded it.
 *
 *   node scripts/audit-elaina-parity.mjs <elaina-checkout>
 *   node scripts/audit-elaina-parity.mjs <elaina-checkout> --update native-flow.ts --reason "raised the button cap"
 *   node scripts/audit-elaina-parity.mjs <elaina-checkout> --update --all-identical   # drop stale entries
 *
 * Needs esbuild: npm i -D esbuild
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

let transform
try {
	;({ transform } = await import('esbuild'))
} catch {
	console.error('This audit needs esbuild: npm i -D esbuild')
	process.exit(2)
}

const args = process.argv.slice(2)
const flag = name => args.includes(`--${name}`)
const value = name => {
	const i = args.indexOf(`--${name}`)
	return i >= 0 ? args[i + 1] : undefined
}

const ELAINA = args.find(a => !a.startsWith('--') && !args[args.indexOf(a) - 1]?.startsWith('--'))
if (!ELAINA || !existsSync(join(ELAINA, 'src', 'Utils'))) {
	console.error('usage: node scripts/audit-elaina-parity.mjs /path/to/elaina-baileys-main [--update <module> --reason <why>]')
	process.exit(2)
}

const BASELINE = 'parity-baseline.json'
const baseline = existsSync(BASELINE)
	? JSON.parse(readFileSync(BASELINE, 'utf8'))
	: { upstream: 'unknown', modules: {} }

const PAIRS = [
	['group-metadata-cache.ts', 'Utils/group-metadata-cache.js'],
	['html-app.ts', 'Utils/html-app.js'],
	['html-multiplayer.ts', 'Utils/html-multiplayer.js'],
	['link-preview-metadata.ts', 'Utils/link-preview-metadata.js'],
	['native-flow.ts', 'Utils/native-flow.js'],
	['optional-media.ts', 'Utils/optional-media.js'],
	['sender-key-memory.ts', 'Utils/sender-key-memory.js'],
	['ttl-cache.ts', 'Utils/ttl-cache.js'],
	['voice-recognition.ts', 'Utils/voice-recognition.js'],
	['modern-messages.ts', 'Utils/modern-messages.js'],
	['scheduled-message.ts', 'Utils/scheduled-message.js'],
	['status-stickers.ts', 'Utils/status-stickers.js'],
	['payment-messages.ts', 'Utils/payment-messages.js'],
	['newsletter-status.ts', 'Utils/newsletter-status.js'],
	['auth-store.ts', 'Utils/auth-store.js'],
	['MessageBuilder/index.ts', 'MessageBuilder/index.js'],
	['MessageBuilder/extras.ts', 'MessageBuilder/extras.js'],
	['MessageBuilder/metaai.ts', 'MessageBuilder/metaai.js'],
	['MessageBuilder/bot-signature.ts', 'MessageBuilder/bot-signature.js']
]

const norm = async (path, loader) => {
	const out = await transform(readFileSync(path, 'utf8'), {
		loader,
		format: 'esm',
		minifySyntax: true,
		minifyWhitespace: true,
		legalComments: 'none',
		target: 'es2022'
	})
	// import order is not meaning; sort the specifier list so a reordered import does not read as a code change
	const sorted = out.code.replace(/\{([^{}]*)\}(?=\s*from\s*")/g, (_m, inner) => {
		const names = inner.split(',').map(n => n.trim()).filter(Boolean).sort()
		return '{' + names.join(',') + '}'
	})
	return sorted.replace(/from\s*"[^"]*"/g, 'from"MOD"').replace(/import\s*"[^"]*"/g, 'import"MOD"')
}

const hash = text => createHash('sha256').update(text).digest('hex').slice(0, 16)

const results = []
for (const [anya, elaina] of PAIRS) {
	const ours = await norm(join('src', 'Extras', anya), 'ts')
	const theirs = await norm(join(ELAINA, 'src', elaina), 'js')
	results.push({ module: anya, ours, theirs, identical: ours === theirs, hash: hash(ours) })
}

/** --update: record the current state of a module as intentional, with a reason */
if (flag('update')) {
	const target = value('update')
	const reason = value('reason')
	const targets = target ? results.filter(r => r.module === target) : []

	if (flag('all-identical')) {
		/** housekeeping: drop entries for modules that match upstream again */
		let dropped = 0
		for (const r of results) {
			if (r.identical && baseline.modules[r.module]) {
				delete baseline.modules[r.module]
				dropped += 1
			}
		}

		writeFileSync(BASELINE, `${JSON.stringify(baseline, null, '\t')}\n`)
		console.log(`dropped ${dropped} stale baseline entr${dropped === 1 ? 'y' : 'ies'}`)
		process.exit(0)
	}

	if (!targets.length) {
		console.error('--update needs a module name from the list above, or --all-identical')
		process.exit(2)
	}

	if (!reason) {
		console.error('--update also needs --reason "<why this differs from upstream>"')
		process.exit(2)
	}

	for (const r of targets) {
		if (r.identical) {
			console.error(`${r.module} is identical to upstream; nothing to record`)
			continue
		}

		baseline.modules[r.module] = { hash: r.hash, reason, recordedOn: new Date().toISOString().slice(0, 10) }
		console.log(`recorded ${r.module} — ${reason}`)
	}

	writeFileSync(BASELINE, `${JSON.stringify(baseline, null, '\t')}\n`)
	process.exit(0)
}

/** report */
let identical = 0
let intentional = 0
let unexplained = 0

for (const r of results) {
	if (r.identical) {
		identical += 1
		const stale = baseline.modules[r.module]
		console.log(`identical   ${r.module}${stale ? '   (baseline entry is stale: matches upstream again — run --update --all-identical)' : ''}`)
		continue
	}

	const entry = baseline.modules[r.module]
	if (entry && entry.hash === r.hash) {
		intentional += 1
		console.log(`intentional ${r.module}   — ${entry.reason}`)
		continue
	}

	unexplained += 1
	let i = 0
	while (i < r.ours.length && i < r.theirs.length && r.ours[i] === r.theirs[i]) i++
	console.log(`UNEXPLAINED ${r.module}`)
	if (entry) {
		console.log(`   recorded as intentional on ${entry.recordedOn} ("${entry.reason}") but the code changed since`)
	}

	console.log(`   elaina: ...${r.theirs.slice(Math.max(0, i - 60), i + 70)}...`)
	console.log(`   anya  : ...${r.ours.slice(Math.max(0, i - 60), i + 70)}...`)
}

console.log('')
console.log(`${identical} identical, ${intentional} intentional, ${unexplained} unexplained`)

if (unexplained) {
	console.log('')
	console.log('If a difference is deliberate:  node scripts/audit-elaina-parity.mjs <elaina> --update <module> --reason "<why>"')
	console.log('If it is not:                   re-port the module from upstream')
}

process.exit(unexplained ? 1 : 0)
