/**
 * Cache-Manager Auth State
 * Ported from innovatorssoft/Baileys
 *
 * Stores auth state in any cache-manager compatible store
 * (redis, memcached, memory, etc.).
 *
 * @example
 * import { caching } from 'cache-manager'
 * import redisStore from 'cache-manager-redis-store'
 * const { state, saveCreds } = await makeCacheManagerAuthState(redisStore, 'my-session')
 */

import { proto } from '../../../WAProto/index.js'
import { initAuthCreds } from '../../Utils/auth-utils'
import { BufferJSON } from '../../Utils/generics'
import type { AuthenticationState } from '../../Types'

export interface CacheManagerStore {
	type: string
	[key: string]: unknown
}

export const makeCacheManagerAuthState = async (
	store: CacheManagerStore,
	sessionKey: string
): Promise<{
	state: AuthenticationState
	saveCreds: () => Promise<void>
	clearState: () => Promise<void>
}> => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { caching } = require('cache-manager') as typeof import('cache-manager')
	const defaultKey = (file: string) => `${sessionKey}:${file}`
	const databaseConn = await caching(store as any)

	const writeData = async (file: string, data: unknown): Promise<void> => {
		const ttl = file === 'creds' ? 63_115_200 /* 2 years */ : undefined
		await databaseConn.set(defaultKey(file), JSON.stringify(data, BufferJSON.replacer), ttl)
	}

	const readData = async (file: string): Promise<unknown> => {
		try {
			const data = await databaseConn.get<string>(defaultKey(file))
			return data ? JSON.parse(data, BufferJSON.reviver) : null
		} catch {
			return null
		}
	}

	const removeData = async (file: string): Promise<void> => {
		try {
			await databaseConn.del(defaultKey(file))
		} catch {
			// ignore
		}
	}

	const clearState = async (): Promise<void> => {
		try {
			// @ts-ignore — store-specific API
			const keys: string[] = (await databaseConn.store.keys?.(`${sessionKey}*`)) ?? []
			await Promise.all(keys.map(k => databaseConn.del(k)))
		} catch {
			// ignore
		}
	}

	const creds: AuthenticationState['creds'] =
		((await readData('creds')) as AuthenticationState['creds'] | null) ?? initAuthCreds()

	return {
		clearState,
		saveCreds: () => writeData('creds', creds),
		state: {
			creds,
			keys: {
				get: async (type, ids) => {
					const data: Record<string, unknown> = {}
					await Promise.all(
						ids.map(async id => {
							let value = await readData(`${type}-${id}`)
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value as object)
							}
							data[id] = value
						})
					)
					return data as any
				},
				set: async data => {
					const tasks: Promise<void>[] = []
					for (const category of Object.keys(data)) {
						for (const id of Object.keys((data as Record<string, Record<string, unknown>>)[category]!)) {
							const value = (data as Record<string, Record<string, unknown>>)[category]![id]
							tasks.push(value ? writeData(`${category}-${id}`, value) : removeData(`${category}-${id}`))
						}
					}
					await Promise.all(tasks)
				}
			}
		}
	}
}
