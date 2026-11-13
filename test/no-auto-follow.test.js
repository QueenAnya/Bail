import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

import { QueryIds } from '../lib/Types/Mex.js'

/**
 * Guard against the "PhantomSub" pattern coming back.
 *
 * That campaign — OSV MAL-2026-17373 and the OX Security / pkgwarden write-ups — is a family of renamed Baileys
 * forks that issue an authenticated FOLLOW query on connect, subscribing the operator's own account to channels
 * they never chose. Every sample has the same shape: a hardcoded or decoded `@newsletter` JID plus a call to the
 * follow query from a connection handler.
 *
 * This repo does not do that, and these tests are what keeps it true. They check the source as text, because the
 * danger is not a runtime bug — it is code being added that nobody notices.
 */

const SRC = new URL('../src/', import.meta.url).pathname

const walk = dir => {
	const out = []
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry)
		if (statSync(full).isDirectory()) {
			out.push(...walk(full))
		} else if (entry.endsWith('.ts')) {
			out.push(full)
		}
	}

	return out
}

const files = walk(SRC)

const read = file => readFileSync(file, 'utf8')

const relative = file => file.slice(SRC.length)

test('follow: the query ids match upstream WhiskeySockets', () => {
	/** values taken from WhiskeySockets/Baileys master, src/Types/Mex.ts */
	assert.equal(QueryIds.FOLLOW, '24404358912487870', 'FOLLOW must be the upstream id')
	assert.equal(QueryIds.UNFOLLOW, '9767147403369991', 'UNFOLLOW must be the upstream id')
})

test('follow: no second enum redefines the follow ids', () => {
	/** a legacy duplicate enum once carried the older `7871414976211147` id; it was dead code and is gone */
	const offenders = files.filter(file => {
		const body = read(file)
		const definitions = body.match(/^\s*FOLLOW\s*=\s*'(\d+)'/gm) ?? []
		return definitions.length > 0 && !relative(file).endsWith('Types/Mex.ts')
	})

	assert.deepEqual(offenders.map(relative), [], 'no file other than Types/Mex.ts may define a FOLLOW id')

	const mex = read(join(SRC, 'Types/Mex.ts'))
	const ids = [...mex.matchAll(/^\s*FOLLOW\s*=\s*'(\d+)'/gm)].map(m => m[1])
	assert.deepEqual(ids, ['24404358912487870'], `Types/Mex.ts must define FOLLOW exactly once, got ${ids.join(', ')}`)
})

test('follow: nothing calls the follow query on its own', () => {
	/**
	 * The API method is expected — `newsletterFollow: (jid) => …` in Socket/newsletter.ts. What must not exist is a
	 * *call* to it, or a raw FOLLOW query, anywhere else in the source.
	 */
	const offenders = []
	for (const file of files) {
		const rel = relative(file)
		const body = read(file)
		body.split('\n').forEach((line, i) => {
			const isDefinition = /newsletterFollow\s*:\s*\(/.test(line) && rel === 'Socket/newsletter.ts'
			const callsFollow = /\.newsletterFollow\s*\(/.test(line) || /newsletterFollow\s*\(\s*['"`]/.test(line)
			/** Socket/newsletter.ts is where the API method lives; its body is the only place the raw query may appear */
			const rawFollow = /QueryIds\.FOLLOW\b/.test(line) && !rel.endsWith('Types/Mex.ts') && rel !== 'Socket/newsletter.ts'
			if (!isDefinition && (callsFollow || rawFollow)) {
				offenders.push(`${rel}:${i + 1} ${line.trim().slice(0, 80)}`)
			}
		})
	}

	assert.deepEqual(offenders, [], 'no source file may issue a follow query')
})

test('follow: dynamic dispatch exists only as the explicit user API', () => {
	/**
	 * `sock.newsletterAction(jid, type)` can issue any newsletter query by name, including a follow. It is restored
	 * deliberately: it is a user-called API, not library behaviour. Two properties keep it honest:
	 *   1. `QueryIds[...]` may only be indexed inside that one method;
	 *   2. nothing in the library may call `newsletterAction` itself.
	 */
	const dispatchSites = []
	const callSites = []

	for (const file of files) {
		const rel = relative(file)
		read(file)
			.split('\n')
			.forEach((line, i) => {
				const isComment = /^\s*(\*|\/\/|\/\*)/.test(line)
				if (!isComment && /QueryIds\s*\[/.test(line)) {
					dispatchSites.push(`${rel}:${i + 1}`)
				}

				if (!isComment && /\.newsletterAction\s*\(/.test(line)) {
					callSites.push(`${rel}:${i + 1} ${line.trim().slice(0, 80)}`)
				}
			})
	}

	assert.equal(dispatchSites.length, 1, `exactly one dispatch site expected, got ${dispatchSites.join(', ')}`)
	assert.match(dispatchSites[0], /^Socket\/newsletter\.ts:\d+$/, 'and it must be newsletterAction in Socket/newsletter.ts')
	assert.deepEqual(callSites, [], 'nothing in the library may call newsletterAction on its own')
})

test('follow: alternate-generation ids are documented, never used', () => {
	/**
	 * Other forks pin different WhatsApp Web generations, so their ids live here as `*_ALT` / `*_LEGACY`
	 * constants for reference. That is the only thing they may be: using one against the wrong client revision
	 * fails, and a used id is a live capability. Nothing outside Types/Mex.ts may reference them.
	 */
	const offenders = []
	for (const file of files) {
		const rel = relative(file)
		if (rel.endsWith('Types/Mex.ts')) {
			continue
		}

		read(file)
			.split('\n')
			.forEach((line, i) => {
				const isComment = /^\s*(\*|\/\/|\/\*)/.test(line)
				if (!isComment && /(QueryIds|XWAPaths)\.\w+_(ALT\d?|LEGACY\d?|legacy)\b/.test(line)) {
					offenders.push(`${rel}:${i + 1} ${line.trim().slice(0, 80)}`)
				}
			})
	}

	assert.deepEqual(offenders, [], 'alternate-generation ids must stay documentation')
})

test('follow: no channel JID is hardcoded in the source', () => {
	const offenders = []
	for (const file of files) {
		const rel = relative(file)
		/** test fixtures inside src/__tests__ are not runtime code and may hold sample JIDs */
		if (rel.startsWith('__tests__/')) {
			continue
		}

		read(file)
			.split('\n')
			.forEach((line, i) => {
				if (/['"`]\d{10,}@newsletter['"`]/.test(line)) {
					offenders.push(`${rel}:${i + 1} ${line.trim().slice(0, 80)}`)
				}
			})
	}

	assert.deepEqual(offenders, [], 'a hardcoded @newsletter JID is the payload shape this guard exists for')
})

test('follow: the socket does not subscribe to anything on connect', () => {
	const socket = read(join(SRC, 'Socket/socket.ts'))
	const openHandler = socket.split("ws.on('open'")[1] ?? ''

	assert.ok(openHandler.length > 0, "the connect handler (ws.on('open')) should exist")
	/** the first part of the handler is where an injected call would be planted, right after the session opens */
	assert.doesNotMatch(
		openHandler.slice(0, 3000),
		/newsletterFollow|QueryIds\.FOLLOW|@newsletter/,
		'nothing channel-related may run when the socket opens'
	)
})
