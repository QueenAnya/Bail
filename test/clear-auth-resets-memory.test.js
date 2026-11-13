import { test } from 'node:test'
import assert from 'node:assert/strict'
import { useSqliteAuthState2 } from '../lib/Extras/use-sqlite-auth-state2.js'

/**
 * `clearAuth()` empties the store, but the creds object is shared with the socket by reference. If it is not reset too,
 * the next `saveCreds()` — which a live socket calls constantly — writes the old credentials straight back and the
 * account silently returns. This pins the reset.
 */
test('clearAuth resets the in-memory creds, not just the store', async () => {
	const auth = await useSqliteAuthState2({ dbPath: ':memory:' })
	const creds = auth.state.creds
	const before = { ...creds }

	creds.platform = 'sentinel-platform'
	await auth.saveCreds()
	await auth.state.keys.set({ 'pre-key': { 1: { public: new Uint8Array([1, 2, 3]) } } })

	await auth.clearAuth()

	assert.equal(auth.state.creds, creds, 'the object identity is kept, the socket holds this reference')
	assert.notEqual(creds.platform, 'sentinel-platform', 'the sentinel is gone from memory')
	assert.notEqual(creds.registrationId, before.registrationId === creds.registrationId ? before.registrationId : undefined)

	// a save after the clear must persist the fresh creds, never the old ones
	await auth.saveCreds()
	const reopened = await useSqliteAuthState2({ dbPath: ':memory:' })
	await reopened.close()

	assert.deepEqual(await auth.state.keys.get('pre-key', ['1']), {}, 'the old key did not come back')
	assert.notEqual(auth.state.creds.platform, 'sentinel-platform', 'and neither did the old creds')

	await auth.close()
})
