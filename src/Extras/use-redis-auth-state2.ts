/**
 * Redis auth state, node-redis flavour.
 *
 * `useRedisAuthState` already accepts a node-redis client, but it discovers every command by name so it can serve both
 * libraries. This one is written against node-redis (`redis` v4 / v5) directly: camelCase commands, `createClient`,
 * and a real `multi()` transaction. Pick it when you know you are on node-redis and want the adapter to speak only
 * that API; pick `useRedisAuthState` when the same code has to work with `ioredis` too.
 *
 * Layout is identical to `useRedisAuthState`, so the two can be swapped without migrating anything:
 * one hash per key type, `<prefix>:<session>:<type>`.
 */
import { normalizeAuthArgs, promoteHandle } from '../Utils/auth-args'
import { type AuthStore, type DatabaseAuthState, loadOptionalModule, makeAuthStateFromStore } from './auth-store'

export interface RedisAuthState2Options {
	/** an existing node-redis client (it is NOT closed by `close()` unless `closeClient` is true) */
	client?: any
	/** connection string, used when no client is given, e.g. `redis://localhost:6379` */
	uri?: string
	/** alias of `uri` — the same connection string, for callers who read `REDIS_URL` */
	url?: string
	/** extra `createClient` options, merged over `{ url: uri }` */
	config?: any
	/** session name, lets several bots share one Redis, default `default` */
	session?: string
	/** key prefix, default `baileys_auth` — the same default as `useRedisAuthState` */
	prefix?: string
	/** close the client in `close()` even when it was passed in, default false */
	closeClient?: boolean
}

export async function useRedisAuthState2(
	/** `(url)`, `(url, session)`, `({ url, session })`, `({ client })`. */
	a: string | RedisAuthState2Options = {},
	b?: string | RedisAuthState2Options,
	c?: string
): Promise<DatabaseAuthState> {
	const opts = promoteHandle(
		normalizeAuthArgs<RedisAuthState2Options>(
			[a, b, c],
			['url', 'session'],
			['url', 'uri', 'client', 'config', 'session', 'prefix', 'closeClient']
		),
		['url', 'uri'],
		'client',
		(v: any) => typeof v?.hGet === 'function'
	)
	const session = opts.session ?? 'default'
	const prefix = opts.prefix ?? 'baileys_auth'
	let client = opts.client
	let owned = false

	if (!client) {
		const target = opts.uri ?? opts.url
		if (!target) {
			throw new Error('useRedisAuthState2 needs a client, a uri or a url')
		}

		const { createClient } = await loadOptionalModule('redis', 'useRedisAuthState2')
		client = createClient({ url: target, ...(opts.config ?? {}) })
		owned = true
	}

	// node-redis only starts talking after connect(); a client passed in may already be open
	if (typeof client.connect === 'function' && client.isOpen === false) {
		await client.connect()
	}

	for (const command of ['hGet', 'hmGet', 'hSet', 'hDel', 'hGetAll', 'del', 'keys', 'multi']) {
		if (typeof client[command] !== 'function') {
			throw new Error(`useRedisAuthState2 expects a node-redis client, but it has no \`${command}\` method`)
		}
	}

	const hashKey = (type: string) => `${prefix}:${session}:${type}`

	const store: AuthStore = {
		read: async (type, id) => {
			const value = await client.hGet(hashKey(type), id)
			return value ?? null
		},
		readMany: async (type, ids) => {
			if (!ids.length) {
				return {}
			}

			const values: unknown[] = await client.hmGet(hashKey(type), ids)
			const rows: Record<string, string> = {}
			ids.forEach((id, index) => {
				const value = values?.[index]
				if (value !== null && value !== undefined) {
					rows[id] = String(value)
				}
			})
			return rows
		},
		write: async (type, id, value) => {
			await client.hSet(hashKey(type), id, value)
		},
		apply: async (writes, removals) => {
			const chain = client.multi()
			for (const entry of writes) {
				chain.hSet(hashKey(entry.type), entry.id, entry.value)
			}

			for (const entry of removals) {
				chain.hDel(hashKey(entry.type), entry.id)
			}

			await chain.exec()
		},
		list: async function* (type) {
			const hash = await client.hGetAll(hashKey(type))
			for (const [id, value] of Object.entries(hash ?? {})) {
				yield [id, String(value)] as const
			}
		},
		listIds: async function* (type) {
			const hash = await client.hGetAll(hashKey(type))
			for (const id of Object.keys(hash ?? {})) {
				yield id
			}
		},
		clear: async () => {
			const found: string[] = await client.keys(`${prefix}:${session}:*`)
			if (found?.length) {
				await client.del(found)
			}
		},
		close: async () => {
			if ((owned || opts.closeClient) && typeof client.quit === 'function') {
				await client.quit()
			}
		}
	}

	return makeAuthStateFromStore(store)
}
