import { test } from 'node:test'
import assert from 'node:assert/strict'
import { useMongoAuthState } from '../lib/index.js'

/**
 * `useMongoAuthState` is the name every fork uses, and two adapters sit behind it: the original collection-based one
 * and the URI-based `useMongoAuthState2`. It tells them apart by what it is handed.
 */
const failure = async (...args) => {
	try {
		await useMongoAuthState(...args)
		return ''
	} catch (error) {
		return error.message ?? String(error)
	}
}

test('a connection string, uri or url all reach the URI adapter', async () => {
	const options = { clientOptions: { serverSelectionTimeoutMS: 40 } }
	for (const call of [
		['mongodb://127.0.0.1:1/x'],
		[{ uri: 'mongodb://127.0.0.1:1/x', ...options }],
		[{ url: 'mongodb://127.0.0.1:1/x', ...options }],
		['mongodb://127.0.0.1:1/x', 'baileys_auth', 'bot-1']
	]) {
		const message = await failure(...call)
		assert.doesNotMatch(message, /needs a collection/, `the URI form was not treated as a connection: ${JSON.stringify(call)}`)
	}
})

test('a collection still goes to the collection adapter', async () => {
	const docs = new Map()
	const collection = {
		findOne: async filter => docs.get(filter._id) ?? null,
		updateOne: async (filter, update) => void docs.set(filter._id, { ...filter, ...update.$set }),
		deleteOne: async filter => void docs.delete(filter._id)
	}

	const auth = await useMongoAuthState({ collection })
	assert.ok(auth.state.creds, 'the collection adapter returns creds')
	assert.equal(typeof auth.saveCreds, 'function')
	assert.equal(auth.clearAuth, undefined, 'the collection adapter has no clearAuth — that is the URI one')
})

test('nothing at all names both accepted forms', async () => {
	const message = await failure({})
	assert.match(message, /connection uri \/ url/)
	assert.match(message, /collection/)
})
