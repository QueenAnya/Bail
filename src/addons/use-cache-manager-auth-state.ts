/**
 * Cache-Manager Auth State (redis, memcached, in-memory, etc.)
 * Source: @innovatorssoft/baileys make-cache-manager-store.js
 */
import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils.js'
import { BufferJSON } from '../Utils/generics.js'
import type { AuthenticationState } from '../Types/index.js'

/** Minimal interface compatible with any cache-manager v5 store */
export type CacheManagerStore = {
	set(key: string, value: string, ttl?: number): Promise<void>
	get(key: string): Promise<string | undefined | null>
	del(key: string): Promise<void>
	keys(pattern?: string): Promise<string[]>
}

export const useCacheManagerAuthState = async (
	store: CacheManagerStore,
	sessionKey: string
): Promise<{
	state: AuthenticationState
	saveCreds: () => Promise<void>
	clearState: () => Promise<void>
}> => {
	const defaultKey = (file: string) => `${sessionKey}:${file}`

	const writeData = async (file: string, data: unknown) => {
		const ttl = file === 'creds' ? 63_115_200 : undefined // 2 years for creds
		await store.set(defaultKey(file), JSON.stringify(data, BufferJSON.replacer), ttl)
	}

	const readData = async (file: string): Promise<unknown> => {
		try {
			const data = await store.get(defaultKey(file))
			return data ? JSON.parse(data, BufferJSON.reviver) : null
		} catch {
			return null
		}
	}

	const removeData = async (file: string) => {
		try {
			await store.del(defaultKey(file))
		} catch {
			console.error(`[useCacheManagerAuthState] Error removing ${file} from session ${sessionKey}`)
		}
	}

	const clearState = async () => {
		try {
			const keys = await store.keys(`${sessionKey}*`)
			await Promise.all(keys.map(key => store.del(key)))
		} catch {}
	}

	const creds = ((await readData('creds')) as any) || initAuthCreds()

	return {
		clearState,
		state: {
			creds,
			keys: {
				get: async (type: string, ids: string[]) => {
					const data: Record<string, unknown> = {}
					await Promise.all(
						ids.map(async id => {
							let value = await readData(`${type}-${id}`)
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}
							data[id] = value
						})
					)
					return data
				},
				set: async (data: Record<string, Record<string, unknown>>) => {
					const tasks: Promise<any>[] = []
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
		},
		saveCreds: () => writeData('creds', creds)
	}
}
