import { proto } from '../../WAProto/index.js'
import { BufferJSON, initAuthCreds } from '../Utils'
import logger from '../Utils/logger'

/**
 * Authentication state backed by cache-manager (redis, memcache, etc).
 * Ported from InnovatorsSoft Baileys.
 *
 * Requires `cache-manager` to be installed in the host project:
 *   npm install cache-manager
 *
 * @example
 * import { caching } from 'cache-manager'
 * const { state, saveCreds } = await makeCacheManagerAuthState(caching, 'my-session')
 */
export const makeCacheManagerAuthState = async (
	/** A cache-manager store instance or the `caching` factory result */
	store: any,
	sessionKey: string
) => {
	const defaultKey = (file: string) => `${sessionKey}:${file}`

	// Accepts either a raw caching() result or a store factory
	const db: any = typeof store?.get === 'function' ? store : await store

	const writeData = async (file: string, data: object) => {
		let ttl: number | undefined
		if (file === 'creds') {
			ttl = 63115200 // 2 years in seconds
		}
		const serialized = JSON.stringify(data, BufferJSON.replacer)
		await db.set(defaultKey(file), serialized, ttl)
	}

	const readData = async (file: string) => {
		try {
			const data = await db.get(defaultKey(file))
			if (data) return JSON.parse(data as string, BufferJSON.reviver)
			return null
		} catch (error) {
			logger.error(error)
			return null
		}
	}

	const removeData = async (file: string) => {
		try {
			return await db.del(defaultKey(file))
		} catch {
			logger.error(`Error removing ${file} from session ${sessionKey}`)
		}
	}

	const clearState = async () => {
		try {
			const keys = await db.store?.keys?.(`${sessionKey}*`)
			if (Array.isArray(keys)) {
				await Promise.all(keys.map((key: string) => db.del(key)))
			}
		} catch {}
	}

	const creds = (await readData('creds')) || initAuthCreds()

	return {
		clearState,
		saveCreds: () => writeData('creds', creds),
		state: {
			creds,
			keys: {
				get: async (type: string, ids: string[]) => {
					const data: { [id: string]: any } = {}
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
				set: async (data: { [category: string]: { [id: string]: any } }) => {
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
		}
	}
}
