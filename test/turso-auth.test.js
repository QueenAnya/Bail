import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { useTursoAuthState, toLibsqlUrl } from '../lib/Extras/use-turso-auth-state.js'

/**
 * Turso / libSQL auth state.
 *
 * The same adapter covers both shapes Turso offers: a local file and a cloud database. The local file is what can be
 * tested here — a real round trip through `@libsql/client` against a temp database — while the cloud path is the same
 * code with a `libsql://` url and a token, which needs an account to exercise.
 */

let hasLibsql = true
try {
	await import('@libsql/client')
} catch {
	hasLibsql = false
}

test('turso: a bare path becomes a file: url, a url is left alone', () => {
	assert.equal(toLibsqlUrl({ path: './auth.db' }), 'file:./auth.db')
	assert.equal(toLibsqlUrl({ path: 'auth.db' }), 'file:auth.db')
	assert.equal(toLibsqlUrl({ url: 'libsql://db-org.turso.io' }), 'libsql://db-org.turso.io')
	assert.equal(toLibsqlUrl({ path: 'file:./x.db' }), 'file:./x.db', 'an explicit scheme is not doubled')
	/** url wins when both are given */
	assert.equal(toLibsqlUrl({ path: './x.db', url: 'libsql://db.turso.io' }), 'libsql://db.turso.io')
})

test('turso: neither path nor url is an error with a usable message', () => {
	assert.throws(() => toLibsqlUrl({}), /needs a `path` .* or a `url`/)
})

test('turso: local file round trip writes and reads the credentials', async t => {
	if (!hasLibsql) {
		t.skip('@libsql/client not installed')
		return
	}

	const dir = mkdtempSync(join(tmpdir(), 'turso-auth-'))
	const dbPath = join(dir, 'auth.db')

	try {
		const first = await useTursoAuthState({ path: dbPath, session: 'bot1' })
		first.state.creds.me = { id: '919999999999:1@s.whatsapp.net', name: 'test' }
		await first.saveCreds()
		await first.close()

		/** a second adapter on the same file must see what the first wrote */
		const second = await useTursoAuthState({ path: dbPath, session: 'bot1' })
		assert.equal(second.state.creds.me?.id, '919999999999:1@s.whatsapp.net', 'creds survived the round trip')

		/** sessions are isolated from each other */
		const other = await useTursoAuthState({ path: dbPath, session: 'bot2' })
		assert.equal(other.state.creds.me, undefined, 'a different session starts empty')

		await other.clearAuth()
		await second.clearAuth()
		await other.close()
		await second.close()
	} finally {
		rmSync(dir, { recursive: true, force: true })
	}
})

test('turso: a key round trip works through the auth store', async t => {
	if (!hasLibsql) {
		t.skip('@libsql/client not installed')
		return
	}

	const dir = mkdtempSync(join(tmpdir(), 'turso-keys-'))
	const dbPath = join(dir, 'auth.db')

	try {
		const auth = await useTursoAuthState({ path: dbPath })

		/** pre-keys are the interesting case: many ids, read back in bulk */
		await auth.state.keys.set({
			'pre-key': { '1': { public: new Uint8Array([1, 2, 3]), private: new Uint8Array([4, 5, 6]) } }
		})

		const read = await auth.state.keys.get('pre-key', ['1', '2'])
		assert.ok(read['1'], 'the stored pre-key comes back')
		/** the store omits missing ids rather than filling them with null */
		assert.equal(read['2'], undefined, 'a missing id is absent from the result')

		await auth.clearAuth()
		await auth.close()
	} finally {
		rmSync(dir, { recursive: true, force: true })
	}
})
