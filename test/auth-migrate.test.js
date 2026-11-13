import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { useMultiFileAuthState } from '../lib/Utils/use-multi-file-auth-state.js'
import { useSingleFileAuthState } from '../lib/Utils/use-single-file-auth-state.js'
import { useSqliteAuthState2 } from '../lib/Extras/use-sqlite-auth-state2.js'
import { useCacheManagerAuthState } from '../lib/Addons/use-cache-manager-auth-state.js'
import { useNekoDBAuth } from '../lib/Extras/use-nekodb-auth-state.js'
import { useMongoAuthState2 } from '../lib/Extras/use-mongo-auth-state2.js'
import { migrateAuthState } from '../lib/Utils/migrate-auth-state.js'

/**
 * `list` / `listIds` on the adapters, and the migration that needs them.
 *
 * Without these the migrator could only ever throw "source store does not implement list(type)", so the feature
 * existed but did nothing. Each adapter now enumerates its own storage: folder scan, JSON key scan, SQL SELECT.
 */

const collect = async iterable => {
	const out = []
	for await (const entry of iterable) out.push(entry)
	return out
}

const withTempDir = async fn => {
	const dir = mkdtempSync(join(tmpdir(), 'anya-migrate-'))
	try {
		return await fn(dir)
	} finally {
		rmSync(dir, { recursive: true, force: true })
	}
}

const seed = async auth => {
	await auth.state.keys.set({
		'pre-key': { 1: { public: 'a' }, 2: { public: 'b' } },
		session: { 3: { baseKey: 'c' } }
	})
	await auth.saveCreds()
}

test('multi-file: list enumerates the session folder', async () => {
	await withTempDir(async dir => {
		const auth = await useMultiFileAuthState(dir)
		await seed(auth)

		assert.deepEqual(await collect(auth.state.keys.list('pre-key')), [
			['1', { public: 'a' }],
			['2', { public: 'b' }]
		])
		assert.deepEqual(await collect(auth.state.keys.listIds('session')), ['3'])
	})
})

test('multi-file: `pre-key` is not parsed as type `pre`', async () => {
	await withTempDir(async dir => {
		const auth = await useMultiFileAuthState(dir)
		await seed(auth)

		const ids = await collect(auth.state.keys.listIds('pre-key'))
		assert.deepEqual(ids, ['1', '2'], 'the hyphen inside the type name must not split it')
	})
})

test('single-file: list reads the keys out of one JSON file', async () => {
	await withTempDir(async dir => {
		const auth = await useSingleFileAuthState(join(dir, 'auth.json'))
		await seed(auth)
		await auth.flush()

		assert.deepEqual(await collect(auth.state.keys.list('pre-key')), [
			['1', { public: 'a' }],
			['2', { public: 'b' }]
		])
		assert.deepEqual(await collect(auth.state.keys.listIds('session')), ['3'])
	})
})

test('sqlite2: list reads the signal_keys table, with and without a session', async () => {
	await withTempDir(async dir => {
		const plain = await useSqliteAuthState2({ path: join(dir, 'plain.db') })
		await seed(plain)
		assert.deepEqual(await collect(plain.state.keys.list('pre-key')), [
			['1', { public: 'a' }],
			['2', { public: 'b' }]
		])
		await plain.close?.()

		const scoped = await useSqliteAuthState2({ path: join(dir, 'scoped.db'), session: 'bot-a' })
		await seed(scoped)
		assert.deepEqual(
			await collect(scoped.state.keys.listIds('pre-key')),
			['1', '2'],
			'the session prefix is stripped from the id'
		)
		await scoped.close?.()
	})
})

test('migrate: multi-file -> sqlite2 copies every record and verifies', async () => {
	await withTempDir(async dir => {
		const from = await useMultiFileAuthState(join(dir, 'src'))
		await seed(from)

		const to = await useSqliteAuthState2({ path: join(dir, 'dst.db') })
		const result = await migrateAuthState({ from: from.state, to: to.state })

		assert.equal(result.verified, true)
		assert.equal(result.counts['pre-key'], 2)
		assert.equal(result.counts.session, 1)
		assert.deepEqual(await to.state.keys.get('pre-key', ['1', '2']), {
			1: { public: 'a' },
			2: { public: 'b' }
		})
		await to.close?.()
	})
})

test('migrate: a source without list() still fails loudly', async () => {
	const noList = { creds: {}, keys: { get: async () => ({}), set: async () => {} } }
	await assert.rejects(() => migrateAuthState({ from: noList, to: noList }), /does not implement `list\(type\)`/)
})

test('cache-manager: list reads the keys of one session out of the cache store', async () => {
	const cache = new Map()
	const store = {
		set: async (key, value) => void cache.set(key, value),
		get: async key => cache.get(key) ?? null,
		del: async key => void cache.delete(key),
		keys: async pattern => [...cache.keys()].filter(k => k.startsWith(pattern.replace(/\*$/, '')))
	}

	const auth = await useCacheManagerAuthState(store, 'bot')
	await auth.state.keys.set({ 'pre-key': { 1: { public: 'a' } } })

	assert.deepEqual(await collect(auth.state.keys.list('pre-key')), [['1', { public: 'a' }]])
	assert.deepEqual(await collect(auth.state.keys.listIds('pre-key')), ['1'])
})

test('nekodb: list reads the collection and strips the session prefix', async () => {
	const docs = new Map()
	const helper = {
		upsert: async (_filter, doc) => void docs.set(doc.k, doc),
		findOne: async filter => docs.get(filter.k) ?? null,
		findMany: async () => [...docs.values()],
		deleteWhere: async filter => void docs.delete(filter.k)
	}
	const db = { collection: () => ({ helper: () => helper }) }

	const auth = await useNekoDBAuth(db, 'baileys_auth', { session: 'bot-a' })
	await auth.state.keys.set({ 'pre-key': { 7: { public: 'x' } } })

	assert.deepEqual(await collect(auth.state.keys.list('pre-key')), [['7', { public: 'x' }]])
	assert.deepEqual(await collect(auth.state.keys.listIds('pre-key')), ['7'])
})

test('mongo2: list reads the collection for the session', async () => {
	const docs = []
	const collection = {
		findOne: async filter =>
			docs.find(d => d.session === filter.session && d.type === filter.type && d.id === filter.id) ?? null,
		find: filter => ({
			toArray: async () =>
				docs.filter(d => d.session === filter.session && (filter.type === undefined || d.type === filter.type))
		}),
		updateOne: async (filter, update) => {
			const found = docs.find(d => d.session === filter.session && d.type === filter.type && d.id === filter.id)
			if (found) found.value = update.$set.value
			else docs.push({ ...filter, value: update.$set.value })
		},
		bulkWrite: async ops => {
			for (const op of ops) {
				if (op.updateOne) {
					const { filter, update } = op.updateOne
					const found = docs.find(d => d.session === filter.session && d.type === filter.type && d.id === filter.id)
					if (found) found.value = update.$set.value
					else docs.push({ ...filter, value: update.$set.value })
				}
			}
		},
		deleteMany: async filter => {
			for (let i = docs.length - 1; i >= 0; i--) if (docs[i].session === filter.session) docs.splice(i, 1)
		},
		/** the adapter sets up its indexes on first use */
		createIndex: async () => 'ok'
	}

	const auth = await useMongoAuthState2({ collection, session: 'bot-a' })
	await auth.state.keys.set({ session: { 9: { baseKey: 'k' } } })

	assert.deepEqual(await collect(auth.state.keys.list('session')), [['9', { baseKey: 'k' }]])
	assert.deepEqual(await collect(auth.state.keys.listIds('session')), ['9'])
})

test('migrate: passing the adapters saves the creds on the destination', async () => {
	await withTempDir(async dir => {
		const from = await useMultiFileAuthState(join(dir, 'src'))
		from.state.creds.me = { id: '999@s.whatsapp.net', name: 'migrated' }
		await from.saveCreds()
		await from.state.keys.set({ 'pre-key': { 1: { public: 'a' } } })

		const to = await useSqliteAuthState2({ dbPath: join(dir, 'dst.db') })
		const result = await migrateAuthState({ from, to })

		assert.equal(result.creds.copied, true)
		assert.equal(result.creds.saved, true, 'the adapter we were given persisted the creds')
		await to.close?.()

		/** a fresh open must see them — that is what "saved" means */
		const reopened = await useSqliteAuthState2({ dbPath: join(dir, 'dst.db') })
		assert.equal(reopened.state.creds.me?.id, '999@s.whatsapp.net')
		assert.deepEqual(await reopened.state.keys.get('pre-key', ['1']), { 1: { public: 'a' } })
		await reopened.close?.()
	})
})

test('migrate: a bare state still works, and reports that it did not save', async () => {
	await withTempDir(async dir => {
		const from = await useMultiFileAuthState(join(dir, 'src'))
		await from.state.keys.set({ 'pre-key': { 1: { public: 'a' } } })

		const to = await useSqliteAuthState2({ dbPath: join(dir, 'dst.db') })
		const result = await migrateAuthState({ from: from.state, to: to.state })

		assert.equal(result.creds.copied, true)
		assert.equal(result.creds.saved, false, 'a bare state cannot persist itself')
		await to.close?.()
	})
})

test('sqlite2: `path` works as an alias of `dbPath`, and a typo is an error, not an in-memory DB', async () => {
	await withTempDir(async dir => {
		const file = join(dir, 'alias.db')
		const auth = await useSqliteAuthState2({ path: file })
		await auth.state.keys.set({ 'pre-key': { 1: { public: 'a' } } })
		await auth.saveCreds()
		await auth.close?.()

		assert.ok(existsSync(file), 'the file is really created')

		await assert.rejects(() => useSqliteAuthState2({ pathh: file }), /needs a `dbPath`/)
	})
})
