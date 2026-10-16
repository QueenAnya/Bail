/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT) - Utils/useNekoDBAuth.js, rewritten in TypeScript.
 *
 * Stores the auth state in a NekoDB collection. Pass an already connected NekoDB instance.
 * (The original forgot to import `proto`, so reading an `app-state-sync-key` threw - fixed here.)
 */
import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationState, SignalDataSet, SignalDataTypeMap } from '../Types'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'

export interface NekoDBAuthState {
	state: AuthenticationState
	saveCreds: () => Promise<void>
	/** drops the whole collection */
	clearAuth: () => Promise<void>
}

export async function useNekoDBAuth(db: any, collectionName = 'baileys_auth'): Promise<NekoDBAuthState> {
	if (!db || typeof db.collection !== 'function') {
		throw new Error('useNekoDBAuth: the first argument must be a connected NekoDB instance')
	}

	const col = db.collection(collectionName).helper()

	const writeData = async (data: unknown, key: string) => {
		const value = JSON.stringify(data, BufferJSON.replacer)
		await col.upsert({ k: key }, { k: key, v: value })
	}

	const readData = async (key: string) => {
		try {
			const doc = await col.findOne({ k: key })
			if (doc?.v === null || doc?.v === undefined) {
				return null
			}

			return JSON.parse(doc.v, BufferJSON.reviver)
		} catch {
			return null
		}
	}

	const removeData = async (key: string) => {
		try {
			await col.deleteWhere({ k: key })
		} catch {}
	}

	const creds: AuthenticationCreds = (await readData('creds')) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type, ids) => {
					const data: { [id: string]: SignalDataTypeMap[typeof type] } = {}
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
				set: async (data: SignalDataSet) => {
					const tasks: Promise<void>[] = []
					for (const category in data) {
						const entries = data[category as keyof SignalDataTypeMap]!
						for (const id in entries) {
							const value = entries[id]
							const key = `${category}-${id}`
							tasks.push(value ? writeData(value, key) : removeData(key))
						}
					}

					await Promise.all(tasks)
				}
			}
		},
		saveCreds: async () => {
			await writeData(creds, 'creds')
		},
		clearAuth: async () => {
			try {
				await db.deleteCollection(collectionName)
			} catch {}
		}
	}
}
