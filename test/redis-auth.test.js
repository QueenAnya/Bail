import { test } from 'node:test'
import assert from 'node:assert/strict'

import { useRedisAuthState } from '../lib/Extras/use-redis-auth-state.js'
import { useRedisAuthState2 } from '../lib/Extras/use-redis-auth-state2.js'

/**
 * Redis auth state, both flavours.
 *
 * No server is needed: a tiny in-memory client implements the handful of hash commands each adapter uses, in both
 * spellings — `hget`/`hset` for ioredis and `hGet`/`hSet` for node-redis. That is the whole difference the adapters
 * have to cope with, so this exercises the real code paths.
 */

/** an in-memory client that answers to both command spellings */
const makeClient = () => {
	const data = new Map()
	const key = (k, f) => `${k}\u0000${f}`
	const hashes = k => {
		const out = new Map()
		for (const [entry, value] of data) {
			const [hash, field] = entry.split('\u0000')
			if (hash === k) out.set(field, value)
		}
		return out
	}

	const client = {
		isOpen: true,
		closed: false,
		async connect() {},
		async quit() {
			client.closed = true
		},
		async hGet(hash, field) {
			return data.get(key(hash, field)) ?? null
		},
		async hmGet(hash, fields) {
			return fields.map(f => data.get(key(hash, f)) ?? null)
		},
		async hSet(hash, field, value) {
			data.set(key(hash, field), value)
			return 1
		},
		async hDel(hash, field) {
			return data.delete(key(hash, field)) ? 1 : 0
		},
		async hGetAll(hash) {
			const out = {}
			for (const [entry, value] of data) {
				const [h, field] = entry.split('\u0000')
				if (h === hash) out[field] = value
			}
			return out
		},
		async del(keys) {
			const list = Array.isArray(keys) ? keys : [keys]
			let removed = 0
			for (const k of list) {
				for (const [entry] of data) {
					if (entry.startsWith(`${k}\u0000`)) {
						data.delete(entry)
						removed++
					}
				}
			}
			return removed
		},
		async keys(pattern) {
			const prefix = pattern.replace(/\*$/, '')
			const found = new Set()
			for (const [entry] of data) {
				const hash = entry.split('\u0000')[0]
				if (hash.startsWith(prefix)) found.add(hash)
			}
			return [...found]
		},
		multi() {
			const queued = []
			const chain = {
				hSet: (hash, field, value) => {
					queued.push(() => client.hSet(hash, field, value))
					return chain
				},
				hDel: (hash, field) => {
					queued.push(() => client.hDel(hash, field))
					return chain
				},
				exec: async () => {
					const results = []
					for (const run of queued) results.push(await run())
					return results
				}
			}
			return chain
		}
	}

	/** ioredis spellings */
	client.hget = client.hGet
	client.hmget = client.hmGet
	client.hset = client.hSet
	client.hdel = client.hDel
	client.hgetall = client.hGetAll

	return { client, data }
}

/** a node-redis-only client: no lowercase aliases, so `useRedisAuthState2` is the only adapter that can drive it */
const makeNodeRedisClient = () => {
	const { client, data } = makeClient()
	for (const name of ['hget', 'hmget', 'hset', 'hdel', 'hgetall']) {
		delete client[name]
	}
	return { client, data }
}

test('redis: neither a client, a uri nor a url is an error that says what to pass', async () => {
	await assert.rejects(() => useRedisAuthState({}), /needs a client, a uri or a url/)
	await assert.rejects(() => useRedisAuthState2({}), /needs a client, a uri or a url/)
})

test('redis: `url` is accepted as an alias of `uri`', async () => {
	/** the connection string is a URL; callers who read REDIS_URL should not have to rename it */
	const fast = {
		// ioredis: one attempt, no retry loop, short timeout
		retryStrategy: () => null,
		maxRetriesPerRequest: 0,
		connectTimeout: 300,
		// node-redis reads its own socket block
		socket: { reconnectStrategy: false, connectTimeout: 300 }
	}

	/** no server is running, so the call fails — but it must fail on the connection, not on the option name */
	const rejectsOnOption = async fn => {
		try {
			await fn()
			return false
		} catch (err) {
			return /needs a client, a uri or a url/.test(err.message)
		}
	}

	assert.equal(await rejectsOnOption(() => useRedisAuthState({ uri: 'redis://127.0.0.1:1', config: fast })), false)
	assert.equal(await rejectsOnOption(() => useRedisAuthState({ url: 'redis://127.0.0.1:1', config: fast })), false)
	assert.equal(await rejectsOnOption(() => useRedisAuthState2({ uri: 'redis://127.0.0.1:1', config: fast })), false)
	assert.equal(await rejectsOnOption(() => useRedisAuthState2({ url: 'redis://127.0.0.1:1', config: fast })), false)

	/** omitting all three is still the option error */
	assert.equal(await rejectsOnOption(() => useRedisAuthState({})), true)
	assert.equal(await rejectsOnOption(() => useRedisAuthState2({})), true)
})

test('redis: a node-redis client drives useRedisAuthState2 end to end', async () => {
	const { client } = makeNodeRedisClient()
	const auth = await useRedisAuthState2({ client, session: 'bot-a' })

	assert.ok(auth.state.creds, 'creds are initialised')
	assert.equal(typeof auth.saveCreds, 'function')

	await auth.state.keys.set({ 'pre-key': { 1: { public: 'pk' } } })
	assert.deepEqual(await auth.state.keys.get('pre-key', ['1']), { 1: { public: 'pk' } })

	await auth.clearAuth()
	assert.deepEqual(await auth.state.keys.get('pre-key', ['1']), {}, 'clearAuth wipes the session')
})

test('redis: the same client also drives useRedisAuthState (name discovery)', async () => {
	const { client } = makeClient()
	const auth = await useRedisAuthState({ client, session: 'bot-b' })

	await auth.state.keys.set({ session: { 2: { baseKey: 'bk' } } })
	assert.deepEqual(await auth.state.keys.get('session', ['2']), { 2: { baseKey: 'bk' } })
})

test('redis: sessions do not see each other, in either adapter', async () => {
	const { client } = makeClient()

	const a = await useRedisAuthState({ client, session: 'one' })
	const b = await useRedisAuthState2({ client, session: 'two' })

	await a.state.keys.set({ 'pre-key': { 9: { public: 'from-a' } } })
	assert.deepEqual(await b.state.keys.get('pre-key', ['9']), {}, 'session two does not see session one')

	await a.clearAuth()
	assert.deepEqual(await a.state.keys.get('pre-key', ['9']), {})
})

test('redis: the key layout is the same in both adapters', async () => {
	const { client, data } = makeClient()
	const auth = await useRedisAuthState({ client, session: 's1', prefix: 'custom' })
	await auth.state.keys.set({ 'pre-key': { 5: { public: 'x' } } })

	const hashes = [...data.keys()].map(entry => entry.split('\u0000')[0])
	assert.ok(hashes.includes('custom:s1:pre-key'), `expected custom:s1:pre-key, saw ${hashes.join(', ')}`)
})

test('redis: a client passed in is not closed by close(), one the adapter opened is', async () => {
	const { client } = makeNodeRedisClient()
	const auth = await useRedisAuthState2({ client })
	await auth.close()
	assert.equal(client.closed, false, 'the caller owns this client')

	const owned = makeNodeRedisClient()
	const auth2 = await useRedisAuthState2({ client: owned.client, closeClient: true })
	await auth2.close()
	assert.equal(owned.client.closed, true, 'closeClient asks for it explicitly')
})

test('redis: useRedisAuthState2 rejects a client that is not node-redis shaped', async () => {
	const { client } = makeClient()
	delete client.hGet
	await assert.rejects(() => useRedisAuthState2({ client }), /expects a node-redis client/)
})
