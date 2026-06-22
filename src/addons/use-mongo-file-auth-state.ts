import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationState, SignalDataTypeMap } from '../Types'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'

type MongoCollection = {
	findOne(filter: object): Promise<any>
	updateOne(filter: object, update: object, options?: object): Promise<any>
	deleteOne(filter: object): Promise<any>
}

/**
 * MongoDB auth state — stores Baileys credentials in a MongoDB collection.
 * Pass a MongoDB collection instance (e.g. from mongoose or native driver).
 */
export const useMongoFileAuthState = async (
	collection: MongoCollection
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<void> }> => {
	const writeData = (data: any, id: string) => {
		const informationToStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer))
		return collection.updateOne({ _id: id }, { $set: { ...informationToStore } }, { upsert: true })
	}

	const readData = async (id: string) => {
		try {
			const data = JSON.stringify(await collection.findOne({ _id: id }))
			return JSON.parse(data, BufferJSON.reviver)
		} catch (err) {
			return null
		}
	}

	const removeData = async (id: string) => {
		try {
			await collection.deleteOne({ _id: id })
		} catch {}
	}

	const creds: AuthenticationCreds = (await readData('creds')) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type, ids) => {
					const data: { [_: string]: SignalDataTypeMap[typeof type] } = {}
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
				set: async data => {
					const tasks: Promise<void>[] = []
					for (const category of Object.keys(data) as (keyof SignalDataTypeMap)[]) {
						for (const id of Object.keys(data[category]!)) {
							const value = (data[category] as any)[id]
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
