/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT) - Utils/use-redis-auth-state.js, rewritten in TypeScript.
 *
 * Stores the auth state in Redis. One hash per key type: `<prefix>:<session>:<type>`.
 *
 * Both clients work, because every command is looked up by name:
 *   - `ioredis`      — lowercase commands (`hget`, `hset`), connects on its own. Ships as a dependency.
 *   - `redis` (v4+)  — camelCase commands (`hGet`, `hSet`), needs `await client.connect()`.
 * Pass an existing client, or a `uri` and let the adapter load whichever package is installed. For a dedicated
 * node-redis adapter with its own options, see `useRedisAuthState2`.
 */
import { normalizeAuthArgs, promoteHandle } from '../Utils/auth-args'
import { type AuthStore, type DatabaseAuthState, loadOptionalModule, makeAuthStateFromStore } from './auth-store'

export interface RedisAuthStateOptions {
	/** an existing ioredis / node-redis client (it is NOT closed by `close()`) */
	client?: any
	/** connection string, used when no client is given, e.g. `redis://localhost:6379` */
	uri?: string
	/** alias of `uri` — the same connection string, for callers who read `REDIS_URL` */
	url?: string
	/** ioredis options, used together with `uri` */
	config?: any
	/** session name, lets several bots share one Redis, default `default` */
	session?: string
	/** key prefix, default `baileys_auth` */
	prefix?: string
}

/**
 * Opens a connection from a URI using whichever Redis package is installed, preferring `ioredis` (a dependency) and
 * falling back to node-redis (`redis` v4+), which the caller installs.
 */
export const connectFromUri = async (uri: string, config?: any): Promise<any> => {
	try {
		const Redis = await loadOptionalModule('ioredis', 'useRedisAuthState')
		return new Redis(uri, config)
	} catch (ioredisError) {
		try {
			const { createClient } = await loadOptionalModule('redis', 'useRedisAuthState')
			const client = createClient({ url: uri, ...(config ?? {}) })
			await client.connect()
			return client
		} catch {
			throw ioredisError
		}
	}
}

const resolveCommand = (client: any, names: string[]): string => {
	for (const name of names) {
		if (typeof client[name] === 'function') {
			return name
		}
	}

	throw new Error(`redis client exposes none of: ${names.join(', ')}`)
}

export async function useRedisAuthState(
	/** `(uri)`, `(uri, session)`, `({ uri, session })`, `({ client })`. */
	a: string | RedisAuthStateOptions = {},
	b?: string | RedisAuthStateOptions,
	c?: string
): Promise<DatabaseAuthState> {
	const opts = promoteHandle(
		normalizeAuthArgs<RedisAuthStateOptions>(
			[a, b, c],
			['uri', 'session'],
			['uri', 'url', 'client', 'config', 'session', 'prefix']
		),
		['uri', 'url'],
		'client',
		(v: any) => typeof v?.hGet === 'function' || typeof v?.hget === 'function'
	)
	const session = opts.session ?? 'default'
	const prefix = opts.prefix ?? 'baileys_auth'
	let client = opts.client
	let owned = false

	if (!client) {
		const target = opts.uri ?? opts.url
		if (!target) {
			throw new Error('useRedisAuthState needs a client, a uri or a url')
		}

		client = await connectFromUri(target, opts.config)
		owned = true
	}

	// node-redis v4 clients must be connected explicitly; ioredis connects on its own
	if (typeof client.connect === 'function' && client.isOpen === false) {
		await client.connect()
	}

	const commands = {
		hget: resolveCommand(client, ['hGet', 'hget']),
		hmget: resolveCommand(client, ['hmGet', 'hmget']),
		hset: resolveCommand(client, ['hSet', 'hset']),
		hdel: resolveCommand(client, ['hDel', 'hdel']),
		del: resolveCommand(client, ['del', 'DEL']),
		keys: resolveCommand(client, ['keys', 'KEYS'])
	}

	// hgetall is only needed by list()/listIds(), so a minimal client without it still works for everything else
	const hgetall = () => resolveCommand(client, ['hGetAll', 'hgetall'])

	const hashKey = (type: string) => `${prefix}:${session}:${type}`

	const store: AuthStore = {
		read: async (type, id) => {
			const value = await client[commands.hget](hashKey(type), id)
			return value ?? null
		},
		readMany: async (type, ids) => {
			if (!ids.length) {
				return {}
			}

			const values = await client[commands.hmget](hashKey(type), ids)
			const rows: Record<string, string> = {}
			ids.forEach((id, index) => {
				const value = values?.[index]
				if (value !== null && value !== undefined) {
					rows[id] = value
				}
			})
			return rows
		},
		write: async (type, id, value) => {
			await client[commands.hset](hashKey(type), id, value)
		},
		apply: async (writes, removals) => {
			const chain = typeof client.multi === 'function' ? client.multi() : null
			if (chain) {
				for (const entry of writes) {
					chain[commands.hset](hashKey(entry.type), entry.id, entry.value)
				}

				for (const entry of removals) {
					chain[commands.hdel](hashKey(entry.type), entry.id)
				}

				await chain.exec()
				return
			}

			for (const entry of writes) {
				await client[commands.hset](hashKey(entry.type), entry.id, entry.value)
			}

			for (const entry of removals) {
				await client[commands.hdel](hashKey(entry.type), entry.id)
			}
		},
		list: async function* (type) {
			const hash = await client[hgetall()](hashKey(type))
			for (const [id, value] of Object.entries(hash ?? {})) {
				yield [id, String(value)] as const
			}
		},
		listIds: async function* (type) {
			const hash = await client[hgetall()](hashKey(type))
			for (const id of Object.keys(hash ?? {})) {
				yield id
			}
		},
		clear: async () => {
			const found = await client[commands.keys](`${prefix}:${session}:*`)
			if (found?.length) {
				await client[commands.del](found)
			}
		},
		close: async () => {
			if (owned) {
				await (client.quit?.() ?? client.disconnect?.())
			}
		}
	}

	return makeAuthStateFromStore(store)
}
