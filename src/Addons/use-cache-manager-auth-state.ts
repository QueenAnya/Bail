/**
 * Cache-Manager Auth State (redis, memcached, in-memory, etc.)
 */
import { proto } from '../../WAProto/index.js'
import type { AuthenticationStateWithListing, SignalDataTypeMap } from '../Types/index.js'
import { normalizeAuthArgs, pickAlias } from '../Utils/auth-args.js'
import { initAuthCreds } from '../Utils/auth-utils.js'
import { BufferJSON } from '../Utils/generics.js'

/** Minimal interface compatible with any cache-manager v5 store */
export type CacheManagerStore = {
	set(key: string, value: string, ttl?: number): Promise<void>
	get(key: string): Promise<string | undefined | null>
	del(key: string): Promise<void>
	keys(pattern?: string): Promise<string[]>
}

export const useCacheManagerAuthState = async (
	/**
	 * Accepted shapes: `(store, sessionKey)`, `({ store, sessionKey })`, `({ store, session })`.
	 */
	a: CacheManagerStore | { store?: CacheManagerStore; sessionKey?: string; session?: string },
	b?: string | { sessionKey?: string; session?: string }
): Promise<{
	state: AuthenticationStateWithListing
	saveCreds: () => Promise<void>
	clearState: () => Promise<void>
}> => {
	const opts = normalizeAuthArgs<{ store?: CacheManagerStore; sessionKey?: string; session?: string }>(
		[a, b],
		['store', 'sessionKey']
	)
	const store = pickAlias<CacheManagerStore>(opts, ['store', 'cache'])
	const sessionKey = pickAlias<string>(opts, ['sessionKey', 'session', 'sessionName'])
	if (!store || !sessionKey) {
		throw new Error('useCacheManagerAuthState needs a store and a session key (or { store, sessionKey })')
	}

	const defaultKey = (file: string) => `${sessionKey}:${file}`

	const writeData = async (file: string, data: unknown) => {
		const ttl = file === 'creds' ? 63_115_200 : undefined // 2 years for creds
		await store.set(defaultKey(file), JSON.stringify(data, BufferJSON.replacer), ttl)
	}

	const readData = async (file: string): Promise<unknown> => {
		try {
			const data = await store.get(defaultKey(file))
			return data !== null && data !== undefined ? JSON.parse(data, BufferJSON.reviver) : null
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
		} catch (error) {
			console.error(`[useCacheManagerAuthState] Error clearing session ${sessionKey}:`, error)
		}
	}

	const creds = ((await readData('creds')) as any) || initAuthCreds()

	return {
		clearState,
		state: {
			creds,
			keys: {
				get: async (type: string, ids: string[]) => {
					const data: Record<string, any> = {}
					await Promise.all(
						ids.map(async id => {
							let value = await readData(`${type}-${id}`)
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}

							data[id] = value
						})
					)
					return data as any
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
				},
				/** keys live at `<sessionKey>:<type>-<id>`, so the id is what follows the type */
				list: async function* (type) {
					const all = await store.keys(`${sessionKey}:${type}-*`).catch(() => [] as string[])
					for (const key of all.sort()) {
						const id = key.slice(`${sessionKey}:${type}-`.length)
						const value = await readData(`${type}-${id}`)
						if (value !== null && value !== undefined) {
							yield [id, value as SignalDataTypeMap[typeof type]] as const
						}
					}
				},
				listIds: async function* (type) {
					const all = await store.keys(`${sessionKey}:${type}-*`).catch(() => [] as string[])
					for (const key of all.sort()) {
						yield key.slice(`${sessionKey}:${type}-`.length)
					}
				}
			}
		},
		saveCreds: () => writeData('creds', creds)
	}
}

/** Alias of {@link useCacheManagerAuthState}, kept for naming compatibility with the innovatorssoft fork. */
export const makeCacheManagerAuthState = useCacheManagerAuthState
