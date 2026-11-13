import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { normalizeAuthArgs, pickAlias, isOptionsObject } from '../lib/Utils/auth-args.js'
import { useMultiFileAuthState } from '../lib/Utils/use-multi-file-auth-state.js'
import { useSingleFileAuthState } from '../lib/Utils/use-single-file-auth-state.js'
import { useSqliteAuthState2 } from '../lib/Extras/use-sqlite-auth-state2.js'
import { useCacheManagerAuthState } from '../lib/Addons/use-cache-manager-auth-state.js'

/**
 * Every adapter accepts the same four call shapes:
 * `(a)`, `(a, b, c)`, `({ a })`, `({ a, b, c })`.
 */

const withTempDir = async fn => {
	const dir = mkdtempSync(join(tmpdir(), 'anya-args-'))
	try {
		return await fn(dir)
	} finally {
		rmSync(dir, { recursive: true, force: true })
	}
}

test('normalize: a string first argument is positional', () => {
	assert.deepEqual(normalizeAuthArgs(['./auth', { session: 's' }], ['folder', 'session']), {
		folder: './auth',
		session: 's'
	})
})

test('normalize: an options object is taken as-is', () => {
	assert.deepEqual(normalizeAuthArgs([{ folder: './auth', session: 's' }], ['folder', 'session']), {
		folder: './auth',
		session: 's'
	})
})

test('normalize: an empty object is the options form', () => {
	assert.deepEqual(normalizeAuthArgs([{}], ['uri', 'session']), {})
})

test('normalize: a handle in the first slot is assigned, never spread', () => {
	const handle = { query: async () => {} }
	const out = normalizeAuthArgs([handle, 's'], ['uri', 'session'], ['uri', 'session'])
	assert.equal(out.uri, handle, 'the pool/client stays intact')
	assert.equal(out.session, 's')
})

test('isOptionsObject: a class instance is not an options object', () => {
	class Client {}
	assert.equal(isOptionsObject(new Client()), false)
	assert.equal(isOptionsObject({ a: 1 }), true)
	assert.equal(isOptionsObject(null), false)
})

test('pickAlias: first defined alias wins', () => {
	assert.equal(pickAlias({ foldername: 'x', folder: 'y' }, ['foldername', 'folder']), 'x')
	assert.equal(pickAlias({ folder: 'y' }, ['foldername', 'folder']), 'y')
	assert.equal(pickAlias({}, ['foldername']), undefined)
})

test('multi-file: all four shapes reach the same folder', async () => {
	await withTempDir(async dir => {
		const cases = [
			[join(dir, 'one')],
			[join(dir, 'two'), { session: 's' }],
			[{ foldername: join(dir, 'three') }],
			[{ foldername: join(dir, 'four'), session: 's' }]
		]
		for (const args of cases) {
			const auth = await useMultiFileAuthState(...args)
			await auth.saveCreds()
			assert.ok(auth.state.creds, 'creds initialised')
		}
	})
})

test('single-file: all four shapes work', async () => {
	await withTempDir(async dir => {
		for (const args of [
			[join(dir, 'a.json')],
			[join(dir, 'b.json'), { session: 's' }],
			[{ filename: join(dir, 'c.json') }],
			[{ filename: join(dir, 'd.json'), session: 's' }]
		]) {
			const auth = await useSingleFileAuthState(...args)
			await auth.saveCreds()
			await auth.flush()
		}
	})
})

test('sqlite2: positional and object forms are the same call', async () => {
	await withTempDir(async dir => {
		const positional = await useSqliteAuthState2(join(dir, 'p.db'), 'bot-a')
		await positional.saveCreds()
		await positional.close?.()

		const object = await useSqliteAuthState2({ dbPath: join(dir, 'p.db'), session: 'bot-a' })
		assert.ok(object.state.creds, 'the same database opens either way')
		await object.close?.()
	})
})

test('cache-manager: (store, sessionname) and ({ store, sessionname }) both work', async () => {
	const store = () => {
		const m = new Map()
		return {
			set: async (k, v) => void m.set(k, v),
			get: async k => m.get(k) ?? null,
			del: async k => void m.delete(k),
			keys: async p => [...m.keys()].filter(k => k.startsWith(p.replace(/\*$/, '')))
		}
	}

	const positional = await useCacheManagerAuthState(store(), 'bot-a')
	await positional.saveCreds()
	assert.ok(positional.state.creds)

	const object = await useCacheManagerAuthState({ store: store(), sessionKey: 'bot-a' })
	await object.saveCreds()
	assert.ok(object.state.creds)
})

test('normalize: every argument may be a bag — all eight shapes', () => {
	const keys = ['db', 'collectionName', 'session']
	const db = { name: 'handle' }
	const expected = { db, collectionName: 'c', session: 's' }

	const shapes = [
		[[db, 'c', 's'], '(a, b, c)'],
		[[{ db, collectionName: 'c', session: 's' }], '({a, b, c})'],
		[[db], '(a)'],
		[[{ db }], '({a})'],
		[[db, { collectionName: 'c', session: 's' }], '(a, {b, c})'],
		[[{ db }, 'c', 's'], '({a}, b, c)'],
		[[db, 'c', { session: 's' }], '(a, b, {c})'],
		[[db, { collectionName: 'c' }, 's'], '(a, {b}, c)']
	]

	for (const [args, label] of shapes) {
		const out = normalizeAuthArgs(args, keys)
		assert.equal(out.db, db, `${label}: a`)
		if (args.length > 1) {
			assert.equal(out.collectionName, 'c', `${label}: b`)
			assert.equal(out.session, 's', `${label}: c`)
		}
	}

	assert.deepEqual(normalizeAuthArgs([db], keys), { db })
	assert.deepEqual(normalizeAuthArgs([{ db }], keys), { db })
	assert.deepEqual(normalizeAuthArgs([db, 'c', 's'], keys), expected)
})

test('normalize: an empty object still means the options form', () => {
	assert.deepEqual(normalizeAuthArgs([{}], ['uri', 'session']), {})
})
