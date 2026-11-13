import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { useNedbAuthState } from '../lib/Extras/use-nedb-auth-state.js'
import { migrateAuthState } from '../lib/Utils/migrate-auth-state.js'
import { useMultiFileAuthState } from '../lib/Utils/use-multi-file-auth-state.js'

/**
 * NeDB auth state — for `@seald-io/nedb`, the maintained fork of the original `nedb` (stuck at 1.8.0 since 2016).
 *
 * NeDB is embedded: a file path or in-memory, never a URL. These tests run against the real package.
 */

let hasNedb = true
try {
	await import('@seald-io/nedb')
} catch {
	hasNedb = false
}

const collect = async iterable => {
	const out = []
	for await (const entry of iterable) out.push(entry)
	return out
}

const withTempDir = async fn => {
	const dir = mkdtempSync(join(tmpdir(), 'anya-nedb-'))
	try {
		return await fn(dir)
	} finally {
		rmSync(dir, { recursive: true, force: true })
	}
}

test('nedb: neither a datastore, a filename nor inMemory is an error that says what to pass', async () => {
	await assert.rejects(() => useNedbAuthState({}), /needs a datastore, a `filename`/)
})

test('nedb: a filename opens a Datastore and the data survives a reopen', async t => {
	if (!hasNedb) {
		t.skip('@seald-io/nedb not installed')
		return
	}

	await withTempDir(async dir => {
		const file = join(dir, 'auth.db')
		const first = await useNedbAuthState({ filename: file })
		await first.state.keys.set({ 'pre-key': { '1': { public: 'a' } } })
		await first.saveCreds()
		await first.close()

		const second = await useNedbAuthState(file) // positional shape: (a)
		assert.deepEqual(await second.state.keys.get('pre-key', ['1']), { '1': { public: 'a' } })
		await second.close()
	})
})

test('nedb: list and listIds feed the migrator', async t => {
	if (!hasNedb) {
		t.skip('@seald-io/nedb not installed')
		return
	}

	await withTempDir(async dir => {
		const auth = await useNedbAuthState({ filename: join(dir, 'a.db') })
		await auth.state.keys.set({ 'pre-key': { '1': { public: 'a' }, '2': { public: 'b' } } })

		assert.deepEqual(await collect(auth.state.keys.list('pre-key')), [
			['1', { public: 'a' }],
			['2', { public: 'b' }]
		])
		assert.deepEqual((await collect(auth.state.keys.listIds('pre-key'))).sort(), ['1', '2'])
		await auth.close()
	})
})

test('nedb: a session keeps its own documents, and clearAuth only drops that session', async t => {
	if (!hasNedb) {
		t.skip('@seald-io/nedb not installed')
		return
	}

	await withTempDir(async dir => {
		const { default: Datastore } = await import('@seald-io/nedb')
		const store = new Datastore({ filename: join(dir, 'shared.db'), autoload: true })

		const a = await useNedbAuthState(store, { session: 'bot-a' })
		const b = await useNedbAuthState(store, { session: 'bot-b' })

		await a.state.keys.set({ 'pre-key': { '9': { public: 'from-a' } } })
		assert.deepEqual(await b.state.keys.get('pre-key', ['9']), {}, 'session b does not see session a')

		await a.clearAuth()
		assert.deepEqual(await a.state.keys.get('pre-key', ['9']), {}, 'session a was cleared')
		await a.close()
		await b.close()
	})
})

test('nedb: migrate multi-file -> nedb copies the records', async t => {
	if (!hasNedb) {
		t.skip('@seald-io/nedb not installed')
		return
	}

	await withTempDir(async dir => {
		const from = await useMultiFileAuthState(join(dir, 'src'))
		await from.state.keys.set({ 'pre-key': { '7': { public: 'z' } } })
		await from.saveCreds()

		const to = await useNedbAuthState({ filename: join(dir, 'dst.db') })
		const result = await migrateAuthState({ from, to })

		assert.equal(result.verified, true)
		assert.equal(result.counts['pre-key'], 1)
		assert.deepEqual(await to.state.keys.get('pre-key', ['7']), { '7': { public: 'z' } })
		await to.close()
	})
})
