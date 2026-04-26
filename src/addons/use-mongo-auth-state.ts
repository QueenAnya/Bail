/**
 * use-mongo-auth-state.ts
 * Ported from @innovatorssoft/baileys (credit: amiruldev, @irull2nd)
 *
 * MongoDB-backed authentication state for Baileys.
 * Pass a MongoDB Collection object from mongoose or the native driver.
 */

import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils.js'
import { BufferJSON } from '../Utils/generics.js'
import type { AuthenticationState } from '../Types/Auth.js'

/** Minimal interface matching both mongoose Collection and native MongoDB Collection */
export interface MongoCollection {
	findOne(filter: object): Promise<Record<string, unknown> | null>
	updateOne(filter: object, update: object, options?: object): Promise<unknown>
	deleteOne(filter: object): Promise<unknown>
}

export type MongoAuthStateResult = {
	state: AuthenticationState
	saveCreds: () => Promise<void>
}

export const useMongoAuthState = async (collection: MongoCollection): Promise<MongoAuthStateResult> => {
	const writeData = async (data: unknown, id: string) => {
		const informationToStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer))
		return collection.updateOne({ _id: id }, { $set: { ...informationToStore } }, { upsert: true })
	}

	const readData = async (id: string): Promise<unknown> => {
		try {
			const data = JSON.stringify(await collection.findOne({ _id: id }))
			return JSON.parse(data, BufferJSON.reviver)
		} catch (err) {
			console.error('[useMongoAuthState] readData error:', err)
		}
	}

	const removeData = async (id: string) => {
		try {
			await collection.deleteOne({ _id: id })
		} catch (err) {
			console.error('[useMongoAuthState] removeData error:', err)
		}
	}

	const creds = ((await readData('creds')) as AuthenticationState['creds']) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type: string, ids: string[]) => {
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
					return data
				},
				set: async (data: Record<string, Record<string, unknown>>) => {
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
		saveCreds: () => writeData(creds, 'creds') as Promise<void>
	}
}
