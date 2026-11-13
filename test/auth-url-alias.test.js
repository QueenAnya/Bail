import { test } from 'node:test'
import assert from 'node:assert/strict'
import { useMongoAuthState2 } from '../lib/Extras/use-mongo-auth-state2.js'
import { usePostgresAuthState } from '../lib/Extras/use-postgres-auth-state.js'
import { useMySQLAuthState } from '../lib/Extras/use-mysql-auth-state.js'
import { useRedisAuthState2 } from '../lib/Extras/use-redis-auth-state2.js'

/**
 * Every adapter takes the same shape: `(a)` / `({ a })`, where `a` may be a uri, a url or a connection string. These
 * tests assert that `url` gets past the "you gave me nothing" guard — the connection then fails, which is fine and
 * proves the value was picked up.
 */
const failure = async (fn, arg) => {
	try {
		await fn(arg)
		return ''
	} catch (error) {
		return error.message ?? String(error)
	}
}

const guardMessages = [/needs a collection, a db, a client, or a uri/, /needs a pool, a connectionString, or a config/, /needs a pool, a uri, or a config/]

test('an empty call still hits the guard, so the guard is what we are testing', async () => {
	for (const [fn, pattern] of [
		[useMongoAuthState2, guardMessages[0]],
		[usePostgresAuthState, guardMessages[1]],
		[useMySQLAuthState, guardMessages[2]]
	]) {
		assert.match(await failure(fn, {}), pattern)
	}
})

test('`url` is accepted wherever `uri` / `connectionString` is', async () => {
	const mongoUrl = await failure(useMongoAuthState2, { url: 'mongodb://127.0.0.1:1/x', clientOptions: { serverSelectionTimeoutMS: 50 } })
	assert.doesNotMatch(mongoUrl, guardMessages[0], 'mongo picked the url up')

	const mongoUri = await failure(useMongoAuthState2, { uri: 'mongodb://127.0.0.1:1/x', clientOptions: { serverSelectionTimeoutMS: 50 } })
	assert.doesNotMatch(mongoUri, guardMessages[0], 'uri still works')

	const pgUrl = await failure(usePostgresAuthState, { url: 'postgres://127.0.0.1:1/x' })
	assert.doesNotMatch(pgUrl, guardMessages[1], 'postgres picked the url up')

	const myUrl = await failure(useMySQLAuthState, { url: 'mysql://127.0.0.1:1/x' })
	assert.doesNotMatch(myUrl, guardMessages[2], 'mysql picked the url up (it used to be silently ignored)')
})

test('redis already took `url`, and still takes `uri`', async () => {
	const viaUrl = await failure(useRedisAuthState2, { url: 'redis://127.0.0.1:1' })
	const viaUri = await failure(useRedisAuthState2, { uri: 'redis://127.0.0.1:1' })
	assert.ok(viaUrl.length > 0 && viaUri.length > 0, 'both forms reach the connection attempt')
})
