/**
 * Cache-Manager Auth State for Baileys
 * Ported from innovatorssoft/Baileys.
 *
 * Stores Baileys credentials and signal keys using any `cache-manager` v5 compatible store.
 *
 * NOTE: Requires `cache-manager` as a peer dependency.
 * Install: npm install cache-manager
 *
 * @example
 * import { caching } from 'cache-manager'
 * import { makeCacheManagerAuthState } from './Store'
 *
 * // Memory store
 * const { state, saveCreds } = await makeCacheManagerAuthState('memory', 'my-session')
 *
 * // Redis store (with cache-manager-redis-store)
 * const { state, saveCreds } = await makeCacheManagerAuthState(redisStore, 'my-session')
 */

import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationState, SignalDataTypeMap } from '../Types'
import { BufferJSON, initAuthCreds } from '../Utils'
import logger from '../Utils/logger'

interface CacheManagerStore {
	get(key: string): Promise<string | null | undefined>
	set(key: string, value: string, ttl?: number): Promise<void>
	del(key: string): Promise<void>
	store?: { keys?: (pattern: string) => Promise<string[]> }
}

export const makeCacheManagerAuthState = async (
	store: unknown,
	sessionKey: string
): Promise<{ clearState: () => Promise<void>; saveCreds: () => Promise<void>; state: AuthenticationState }> => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { caching } = require('cache-manager') as { caching: (store: unknown) => Promise<CacheManagerStore> }
	const databaseConn = await caching(store)

	const defaultKey = (file: string) => `${sessionKey}:${file}`

	const writeData = async (file: string, data: unknown): Promise<void> => {
		const ttl = file === 'creds' ? 63115200 /* 2 years */ : undefined
		await databaseConn.set(defaultKey(file), JSON.stringify(data, BufferJSON.replacer), ttl)
	}

	const readData = async (file: string): Promise<unknown> => {
		try {
			const data = await databaseConn.get(defaultKey(file))
			if (data) return JSON.parse(data as string, BufferJSON.reviver)
			return null
		} catch (error) {
			logger.error(error)
			return null
		}
	}

	const removeData = async (file: string): Promise<void> => {
		try {
			await databaseConn.del(defaultKey(file))
		} catch {
			logger.error(`Error removing ${file} from session ${sessionKey}`)
		}
	}

	const clearState = async (): Promise<void> => {
		try {
			const keys = await databaseConn.store?.keys?.(`${sessionKey}*`)
			if (keys) await Promise.all(keys.map(key => databaseConn.del(key)))
		} catch {}
	}

	const creds: AuthenticationCreds = ((await readData('creds')) as AuthenticationCreds) || initAuthCreds()

	return {
		clearState,
		saveCreds: () => writeData('creds', creds),
		state: {
			creds,
			keys: {
				get: async (type: keyof SignalDataTypeMap, ids: string[]) => {
					const data: { [id: string]: unknown } = {}
					await Promise.all(
						ids.map(async id => {
							let value = await readData(`${type}-${id}`)
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value as object)
							}
							data[id] = value
						})
					)
					return data as unknown as { [id: string]: SignalDataTypeMap[typeof type] }
				},
				set: async (data: { [category: string]: { [id: string]: unknown } }) => {
					const tasks: Promise<void>[] = []
					for (const category in data) {
						for (const id in data[category]) {
							const value = data[category][id]
							const key = `${category}-${id}`
							tasks.push(value ? writeData(key, value) : removeData(key))
						}
					}
					await Promise.all(tasks)
				}
			}
		}
	}
}
