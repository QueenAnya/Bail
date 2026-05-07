/**
 * MongoDB Auth State
 * Ported from innovatorssoft/Baileys (originally by @irull2nd / amiruldev)
 *
 * Usage:
 *   const { state, saveCreds } = await useMongoFileAuthState(mongoCollection)
 *   const sock = makeWASocket({ auth: state })
 *   sock.ev.on('creds.update', saveCreds)
 */

import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'
import type { AuthenticationState } from '../Types'

/** Minimal interface for a MongoDB-like collection (works with mongoose, native driver, etc.) */
export interface MongoCollection {
	findOne(filter: Record<string, unknown>): Promise<Record<string, unknown> | null>
	updateOne(
		filter: Record<string, unknown>,
		update: Record<string, unknown>,
		options?: Record<string, unknown>
	): Promise<unknown>
	deleteOne(filter: Record<string, unknown>): Promise<unknown>
}

export const useMongoFileAuthState = async (
	collection: MongoCollection
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<void> }> => {
	const writeData = (data: unknown, id: string): Promise<unknown> => {
		const informationToStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer))
		return collection.updateOne({ _id: id }, { $set: { ...informationToStore } }, { upsert: true })
	}

	const readData = async (id: string): Promise<unknown> => {
		try {
			const data = JSON.stringify(await collection.findOne({ _id: id }))
			return JSON.parse(data, BufferJSON.reviver)
		} catch (err) {
			console.error('[useMongoFileAuthState] readData error:', err)
			return null
		}
	}

	const removeData = async (id: string): Promise<void> => {
		try {
			await collection.deleteOne({ _id: id })
		} catch (err) {
			console.error('[useMongoFileAuthState] removeData error:', err)
		}
	}

	const creds: AuthenticationState['creds'] =
		((await readData('creds')) as AuthenticationState['creds'] | null) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type, ids) => {
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
					return data as any
				},
				set: async data => {
					const tasks: Promise<unknown>[] = []
					for (const category of Object.keys(data)) {
						for (const id of Object.keys((data as Record<string, Record<string, unknown>>)[category]!)) {
							const value = (data as Record<string, Record<string, unknown>>)[category]![id]
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
