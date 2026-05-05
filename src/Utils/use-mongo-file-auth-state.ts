import { proto } from '../../WAProto/index.js'
import type { AuthenticationState } from '../Types'
import { BufferJSON } from './generics'
import { initAuthCreds } from './auth-utils'

/**
 * MongoDB authentication state adapter for Baileys.
 * Pass a MongoDB collection object (with updateOne, findOne, deleteOne).
 */
export const useMongoFileAuthState = async (
	collection: any
): Promise<{
	state: AuthenticationState
	saveCreds: () => Promise<void>
}> => {
	const writeData = (data: any, id: string) => {
		const informationToStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer))
		return collection.updateOne({ _id: id }, { $set: { ...informationToStore } }, { upsert: true })
	}

	const readData = async (id: string) => {
		try {
			const data = JSON.stringify(await collection.findOne({ _id: id }))
			return JSON.parse(data, BufferJSON.reviver)
		} catch (err) {
			console.log(err)
		}
	}

	const removeData = async (id: string) => {
		try {
			await collection.deleteOne({ _id: id })
		} catch (err) {
			console.log('error', err)
		}
	}

	const creds = (await readData('creds')) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type: string, ids: string[]) => {
					const data: any = {}
					await Promise.all(
						ids.map(async id => {
							let value = await readData(`${type}-${id}`)
							if (type === 'app-state-sync-key') {
								value = proto.Message.AppStateSyncKeyData.fromObject(data)
							}
							data[id] = value
						})
					)
					return data
				},
				set: async (data: any) => {
					const tasks: Promise<any>[] = []
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
		saveCreds: () => writeData(creds, 'creds')
	}
}
