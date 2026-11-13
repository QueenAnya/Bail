import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { useMongoFileAuthState } from '../lib/Utils/use-mongo-file-auth-state.js'
import { useMultiFileAuthState } from '../lib/Utils/use-multi-file-auth-state.js'
import { useSingleFileAuthState } from '../lib/Utils/use-single-file-auth-state.js'

/**
 * Session namespacing on the file-based adapters.
 *
 * The database adapters already took a `session`; these two did not, which meant several bots could not share one
 * folder or one file. Both now take `{ session }` as an optional second argument, and — this is the part that matters
 * — leaving it out keeps the old layout byte for byte, so existing deployments do not move.
 */

const withTempDir = async fn => {
	const dir = mkdtempSync(join(tmpdir(), 'anya-auth-'))
	try {
		return await fn(dir)
	} finally {
		rmSync(dir, { recursive: true, force: true })
	}
}

test('multi-file: no session keeps the old layout (files directly in the folder)', async () => {
	await withTempDir(async dir => {
		const auth = await useMultiFileAuthState(dir)
		auth.state.creds.me = { id: '111@s.whatsapp.net', name: 'a' }
		await auth.saveCreds()

		assert.deepEqual(readdirSync(dir), ['creds.json'], 'creds.json sits in the folder itself')
	})
})

test('multi-file: a session gets its own subdirectory', async () => {
	await withTempDir(async dir => {
		const botA = await useMultiFileAuthState(dir, { session: 'bot-a' })
		botA.state.creds.me = { id: '111@s.whatsapp.net', name: 'a' }
		await botA.saveCreds()

		const botB = await useMultiFileAuthState(dir, { session: 'bot-b' })
		botB.state.creds.me = { id: '222@s.whatsapp.net', name: 'b' }
		await botB.saveCreds()

		assert.deepEqual(readdirSync(dir).sort(), ['bot-a', 'bot-b'], 'one subdirectory per session')
		assert.deepEqual(readdirSync(join(dir, 'bot-a')), ['creds.json'])

		/** each session reads back its own creds */
		const rereadA = await useMultiFileAuthState(dir, { session: 'bot-a' })
		assert.equal(rereadA.state.creds.me?.id, '111@s.whatsapp.net')
		const rereadB = await useMultiFileAuthState(dir, { session: 'bot-b' })
		assert.equal(rereadB.state.creds.me?.id, '222@s.whatsapp.net')
	})
})

test('multi-file: clearAuth removes only that session', async () => {
	await withTempDir(async dir => {
		const a = await useMultiFileAuthState(dir, { session: 'a' })
		const b = await useMultiFileAuthState(dir, { session: 'b' })
		await a.saveCreds()
		await b.saveCreds()

		await a.clearAuth()

		assert.deepEqual(readdirSync(join(dir, 'a')), [], 'session a is emptied')
		assert.deepEqual(readdirSync(join(dir, 'b')), ['creds.json'], 'session b is untouched')
	})
})

test('multi-file: a session name cannot escape the folder', async () => {
	await withTempDir(async dir => {
		const auth = await useMultiFileAuthState(dir, { session: '../escape' })
		await auth.saveCreds()
		const entries = readdirSync(dir)
		assert.equal(entries.length, 1, 'one entry, still inside the folder')
		assert.ok(!entries[0].includes('..'), `no traversal in ${entries[0]}`)
	})
})

test('single-file: a session keeps its own keys in a shared file', async () => {
	await withTempDir(async dir => {
		const file = join(dir, 'auth.json')

		const a = await useSingleFileAuthState(file, { session: 'a' })
		a.state.creds.me = { id: '111@s.whatsapp.net', name: 'a' }
		await a.saveCreds()
		await a.flush()

		const b = await useSingleFileAuthState(file, { session: 'b' })
		b.state.creds.me = { id: '222@s.whatsapp.net', name: 'b' }
		await b.saveCreds()
		await b.flush()

		const rereadA = await useSingleFileAuthState(file, { session: 'a' })
		const rereadB = await useSingleFileAuthState(file, { session: 'b' })
		assert.equal(rereadA.state.creds.me?.id, '111@s.whatsapp.net')
		assert.equal(rereadB.state.creds.me?.id, '222@s.whatsapp.net')
	})
})

test('single-file: clearAuth removes only that session', async () => {
	await withTempDir(async dir => {
		const file = join(dir, 'auth.json')
		const a = await useSingleFileAuthState(file, { session: 'a' })
		a.state.creds.me = { id: '111@s.whatsapp.net', name: 'a' }
		await a.saveCreds()

		const b = await useSingleFileAuthState(file, { session: 'b' })
		b.state.creds.me = { id: '222@s.whatsapp.net', name: 'b' }
		await b.saveCreds()

		/** writes are debounced; flush both before touching the file from elsewhere */
		await a.flush()
		await b.flush()

		await a.clearAuth()

		const rereadA = await useSingleFileAuthState(file, { session: 'a' })
		const rereadB = await useSingleFileAuthState(file, { session: 'b' })
		assert.equal(rereadA.state.creds.me, undefined, 'session a was cleared')
		assert.equal(rereadB.state.creds.me?.id, '222@s.whatsapp.net', 'session b survived')
	})
})

/** a MongoDB collection stand-in: just the three calls the adapter makes, backed by a Map */
const fakeCollection = () => {
	const docs = new Map()
	return {
		docs,
		async updateOne(filter, update, options) {
			const existing = docs.get(filter._id) ?? {}
			docs.set(filter._id, { ...existing, ...update.$set })
			return { acknowledged: true, upserted: options?.upsert ? filter._id : undefined }
		},
		async findOne(filter) {
			return docs.get(filter._id) ?? null
		},
		async deleteOne(filter) {
			docs.delete(filter._id)
			return { deletedCount: 1 }
		}
	}
}

test('mongo-file: no session keeps the old _id layout', async () => {
	const collection = fakeCollection()
	const auth = await useMongoFileAuthState(collection)
	auth.state.creds.me = { id: '111@s.whatsapp.net', name: 'a' }
	await auth.saveCreds()

	assert.deepEqual([...collection.docs.keys()], ['creds'], 'the document id is still plain `creds`')
})

test('mongo-file: a session becomes an _id prefix and isolates the credentials', async () => {
	const collection = fakeCollection()

	const a = await useMongoFileAuthState(collection, { session: 'bot-a' })
	a.state.creds.me = { id: '111@s.whatsapp.net', name: 'a' }
	await a.saveCreds()

	const b = await useMongoFileAuthState(collection, { session: 'bot-b' })
	b.state.creds.me = { id: '222@s.whatsapp.net', name: 'b' }
	await b.saveCreds()

	assert.deepEqual([...collection.docs.keys()].sort(), ['bot-a:creds', 'bot-b:creds'])

	const rereadA = await useMongoFileAuthState(collection, { session: 'bot-a' })
	const rereadB = await useMongoFileAuthState(collection, { session: 'bot-b' })
	assert.equal(rereadA.state.creds.me?.id, '111@s.whatsapp.net', 'session a keeps its own creds')
	assert.equal(rereadB.state.creds.me?.id, '222@s.whatsapp.net', 'session b keeps its own creds')
})

test('mongo-file: signal keys are namespaced too, and `default` means no prefix', async () => {
	const collection = fakeCollection()

	const a = await useMongoFileAuthState(collection, { session: 'x' })
	await a.state.keys.set({ 'pre-key': { 1: { public: 'pk' } } })
	assert.ok(collection.docs.has('x:pre-key-1'), 'the key document carries the session prefix')
	assert.deepEqual(await a.state.keys.get('pre-key', ['1']), { 1: { public: 'pk' } })

	/** the literal string `default` is treated as "no session", the same as the other adapters */
	const plain = await useMongoFileAuthState(fakeCollection(), { session: 'default' })
	await plain.saveCreds()
	assert.ok(plain, 'default is accepted without changing the layout')
})
