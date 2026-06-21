/**
 * Cache-Manager-backed Authentication State
 *
 * Source: @innovatorssoft/baileys (Store/make-cache-manager-store.js)
 * Converted to TypeScript for baileys-merged-rc13.
 *
 * Supports any `cache-manager` store (Redis, Memcached, in-memory, etc.)
 *
 * @example
 * import { caching } from 'cache-manager'
 * import { makeCacheManagerAuthState } from './addons/auth/use-cache-manager-auth-state'
 *
 * const redisStore = await caching('redis', { host: 'localhost', port: 6379 })
 * const { state, saveCreds, clearState } = await makeCacheManagerAuthState(redisStore, 'my-session')
 */

import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationState, SignalDataTypeMap } from '../Types'
import { BufferJSON, initAuthCreds } from '../Utils'

type CacheStore = {
	get(key: string): Promise<string | null | undefined>
	set(key: string, value: string, ttl?: number): Promise<unknown>
	del(key: string): Promise<unknown>
	store?: { keys(pattern: string): Promise<string[]> }
}

export const makeCacheManagerAuthState = async (
	store: CacheStore,
	sessionKey: string
): Promise<{
	state: AuthenticationState
	saveCreds: () => Promise<void>
	clearState: () => Promise<void>
}> => {
	const defaultKey = (file: string) => `${sessionKey}:${file}`

	const writeData = async (file: string, data: unknown): Promise<void> => {
		let ttl: number | undefined
		if (file === 'creds') {
			ttl = 63_115_200 // 2 years in seconds
		}

		await store.set(defaultKey(file), JSON.stringify(data, BufferJSON.replacer), ttl)
	}

	const readData = async (file: string): Promise<unknown> => {
		try {
			const data = await store.get(defaultKey(file))
			if (data) {
				return JSON.parse(data, BufferJSON.reviver)
			}

			return null
		} catch (err) {
			return null
		}
	}

	const removeData = async (file: string): Promise<void> => {
		try {
			await store.del(defaultKey(file))
		} catch {
			// ignore
		}
	}

	const clearState = async (): Promise<void> => {
		try {
			const keys = await store.store?.keys(`${sessionKey}*`)
			if (keys) {
				await Promise.all(keys.map(k => store.del(k)))
			}
		} catch {
			// ignore
		}
	}

	const creds: AuthenticationCreds = ((await readData('creds')) as AuthenticationCreds) || initAuthCreds()

	return {
		clearState,
		saveCreds: () => writeData('creds', creds),
		state: {
			creds,
			keys: {
				// @ts-ignore
				get: async <T extends keyof SignalDataTypeMap>(
					type: T,
					ids: string[]
				): Promise<{ [id: string]: SignalDataTypeMap[T] }> => {
					const data: { [id: string]: SignalDataTypeMap[T] } = {}
					await Promise.all(
						ids.map(async id => {
							let value = await readData(`${type}-${id}`)
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}

							data[id] = value as SignalDataTypeMap[T]
						})
					)

					return data
				},
				set: async data => {
					const tasks: Promise<void>[] = []
					for (const category in data) {
						for (const id in (data as any)[category]) {
							const value = (data as any)[category][id]
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
