/**
 * MongoDB Auth State
 * Ported from innovatorssoft/Baileys.
 *
 * Stores Baileys credentials and Signal keys in a MongoDB collection.
 * Original code from amiruldev, readjusted by @irull2nd.
 *
 * @example
 * import { MongoClient } from 'mongodb'
 * const client = new MongoClient(uri)
 * await client.connect()
 * const collection = client.db('baileys').collection('auth')
 * const { state, saveCreds } = await useMongoFileAuthState(collection)
 * const sock = makeWASocket({ auth: state })
 * sock.ev.on('creds.update', saveCreds)
 */

import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationState, SignalDataTypeMap } from '../Types'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'

interface MongoCollection {
	findOne(filter: object): Promise<Record<string, unknown> | null>
	updateOne(filter: object, update: object, options?: object): Promise<unknown>
	deleteOne(filter: object): Promise<unknown>
}

export const useMongoFileAuthState = async (
	collection: MongoCollection
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<unknown> }> => {
	const writeData = (data: unknown, id: string) => {
		const informationToStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer))
		return collection.updateOne({ _id: id }, { $set: { ...informationToStore } }, { upsert: true })
	}

	const readData = async (id: string): Promise<unknown> => {
		try {
			const data = JSON.stringify(await collection.findOne({ _id: id }))
			return JSON.parse(data, BufferJSON.reviver)
		} catch (err) {
			console.log(err)
		}
	}

	const removeData = async (id: string): Promise<void> => {
		try {
			await collection.deleteOne({ _id: id })
		} catch (err) {
			console.log('error', err)
		}
	}

	const creds: AuthenticationCreds = ((await readData('creds')) as AuthenticationCreds) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type: keyof SignalDataTypeMap, ids: string[]) => {
					const data: { [id: string]: unknown } = {}
					await Promise.all(
						ids.map(async id => {
							let value = await readData(`${type}-${id}`)
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value as object)
							}
							data[id] = value
						})
					)
					return data as unknown as { [id: string]: SignalDataTypeMap[typeof type] }
				},
				set: async (data: { [category: string]: { [id: string]: unknown } }) => {
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
		saveCreds: () => writeData(creds, 'creds')
	}
}
