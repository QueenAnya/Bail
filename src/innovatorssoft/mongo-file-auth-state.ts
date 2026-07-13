/**
 * MongoDB-backed Auth State
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * Note (fixed during port): the original compiled source had a bug in the
 * `app-state-sync-key` branch of `keys.get` — it called
 * `AppStateSyncKeyData.fromObject(data)` using the *outer* result
 * accumulator instead of the just-read `value`, so app-state sync keys
 * would never actually decode correctly from Mongo. Fixed below to use
 * `value`.
 */

import type { Collection, Document } from 'mongodb'
import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'
import type { AuthenticationState, SignalDataTypeMap } from '../Types'

export const useMongoFileAuthState = async (
	collection: Collection<Document>
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<unknown> }> => {
	const writeData = (data: unknown, id: string) => {
		const informationToStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer))
		return collection.updateOne({ _id: id } as any, { $set: { ...informationToStore } }, { upsert: true })
	}

	const readData = async (id: string) => {
		try {
			const data = JSON.stringify(await collection.findOne({ _id: id } as any))
			return JSON.parse(data, BufferJSON.reviver)
		} catch (err) {
			console.error(err)
			return null
		}
	}

	const removeData = async (id: string) => {
		try {
			await collection.deleteOne({ _id: id } as any)
		} catch (err) {
			console.error('error', err)
		}
	}

	const creds = (await readData('creds')) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async <T extends keyof SignalDataTypeMap>(type: T, ids: string[]) => {
					const data: { [id: string]: SignalDataTypeMap[T] } = {}
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
				set: async (data: any) => {
					const tasks: Promise<unknown>[] = []
					for (const category of Object.keys(data)) {
						for (const id of Object.keys(data[category])) {
							const value = data[category][id]
							const key = `${category}-${id}`
							tasks.push(value ? writeData(value, key) : removeData(key))
						}
					}

					await Promise.all(tasks)
				}
			}
		},
		saveCreds: () => {
			return writeData(creds, 'creds')
		}
	}
}
