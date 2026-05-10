/**
 * MongoDB Auth State
 * Source: @innovatorssoft/baileys use-mongo-file-auth-state.js
 * Original by: amiruldev, adjusted by @irull2nd
 */
import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils.js'
import { BufferJSON } from '../Utils/generics.js'
import type { AuthenticationState } from '../Types/index.js'

/** Minimal MongoDB Collection interface — compatible with mongoose and native driver */
export type MongoCollection = {
	updateOne(filter: any, update: any, options?: any): Promise<any>
	findOne(filter: any): Promise<any>
	deleteOne(filter: any): Promise<any>
}

export const useMongoAuthState = async (
	collection: MongoCollection
): Promise<{
	state: AuthenticationState
	saveCreds: () => Promise<void>
}> => {
	const writeData = (data: unknown, id: string) => {
		const informationToStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer))
		return collection.updateOne({ _id: id }, { $set: { ...informationToStore } }, { upsert: true })
	}

	const readData = async (id: string): Promise<unknown> => {
		try {
			const data = JSON.stringify(await collection.findOne({ _id: id }))
			return JSON.parse(data, BufferJSON.reviver)
		} catch (err) {
			console.error('[useMongoAuthState] readData error:', err)
			return null
		}
	}

	const removeData = async (id: string) => {
		try {
			await collection.deleteOne({ _id: id })
		} catch (err) {
			console.error('[useMongoAuthState] removeData error:', err)
		}
	}

	const creds = ((await readData('creds')) as any) || initAuthCreds()

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
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}
							data[id] = value
						})
					)
					return data
				},
				set: async (data: Record<string, Record<string, unknown>>) => {
					const tasks: Promise<any>[] = []
					for (const category of Object.keys(data)) {
						for (const id of Object.keys(data[category]!)) {
							const value = data[category]![id]
							const key = `${category}-${id}`
							tasks.push(value ? writeData(value, key) : removeData(key))
						}
					}
					await Promise.all(tasks)
				}
			}
		},
		saveCreds: () => writeData(creds, 'creds')
	}
}
