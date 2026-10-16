/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT) - Utils/use-redis-auth-state.js, rewritten in TypeScript.
 *
 * Stores the auth state in Redis (`ioredis`, a runtime dependency; a node-redis v4 client works too).
 * One hash per key type: `<prefix>:<session>:<type>`.
 */
import { type AuthStore, type DatabaseAuthState, loadOptionalModule, makeAuthStateFromStore } from './auth-store'

export interface RedisAuthStateOptions {
	/** an existing ioredis / node-redis client (it is NOT closed by `close()`) */
	client?: any
	/** connection URI, used when no client is given */
	uri?: string
	/** ioredis options, used together with `uri` */
	config?: any
	/** session name, lets several bots share one Redis, default `default` */
	session?: string
	/** key prefix, default `baileys_auth` */
	prefix?: string
}

const resolveCommand = (client: any, names: string[]): string => {
	for (const name of names) {
		if (typeof client[name] === 'function') {
			return name
		}
	}

	throw new Error(`redis client exposes none of: ${names.join(', ')}`)
}

export async function useRedisAuthState(opts: RedisAuthStateOptions = {}): Promise<DatabaseAuthState> {
	const session = opts.session ?? 'default'
	const prefix = opts.prefix ?? 'baileys_auth'
	let client = opts.client
	let owned = false

	if (!client) {
		if (!opts.uri) {
			throw new Error('useRedisAuthState needs a client or a uri')
		}

		const Redis = await loadOptionalModule('ioredis', 'useRedisAuthState')
		client = new Redis(opts.uri, opts.config)
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
