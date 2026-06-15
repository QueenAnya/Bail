/**
 * MongoDB-backed Authentication State
 *
 * Source: @innovatorssoft/baileys (use-mongo-file-auth-state.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Stores credentials and Signal Protocol keys in a MongoDB collection.
 * Compatible with any MongoDB driver collection that exposes
 * `findOne`, `updateOne`, and `deleteOne` (Mongoose Model, native
 * MongoClient collection, etc.).
 *
 * Requires: `mongodb` or `mongoose` (not bundled — install separately)
 *
 * @example
 * import { MongoClient } from 'mongodb'
 * import { useMongoAuthState } from './addons/auth/use-mongo-auth-state.js'
 *
 * const client = new MongoClient(process.env.MONGO_URI!)
 * await client.connect()
 * const collection = client.db('baileys').collection('auth')
 *
 * const { state, saveCreds } = await useMongoAuthState(collection)
 * const sock = makeWASocket({ auth: state })
 * sock.ev.on('creds.update', saveCreds)
 */

import { proto } from '../../../WAProto/index.js'
import { initAuthCreds } from '../../Utils/auth-utils.js'
import { BufferJSON } from '../../Utils/generics.js'
import type { AuthenticationState } from '../../Types/index.js'

// ─── Types ─────────────────────────────────────────────────────────────────────

/**
 * Minimal interface satisfied by both a native MongoDB Collection
 * and a Mongoose Model.
 */
export interface MongoCollectionLike {
	findOne(filter: Record<string, unknown>): Promise<Record<string, unknown> | null>
	updateOne(
		filter: Record<string, unknown>,
		update: Record<string, unknown>,
		options?: { upsert?: boolean }
	): Promise<unknown>
	deleteOne(filter: Record<string, unknown>): Promise<unknown>
}

export type MongoAuthStateResult = {
	state: AuthenticationState
	saveCreds: () => Promise<void>
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Construct the document `_id` for a given key category and ID.
 * e.g. `'session-6281234567890'`, `'creds'`
 */
const docId = (category: string, id?: string): string => (id ? `${category}-${id}` : category)

// ─── useMongoAuthState ─────────────────────────────────────────────────────────

/**
 * Create a MongoDB-backed auth state using the supplied collection.
 * Each credential key is stored as a separate document with `_id` as the key.
 */
export const useMongoAuthState = async (collection: MongoCollectionLike): Promise<MongoAuthStateResult> => {
	// ── Internal read / write / delete helpers ────────────────────────────────

	const readData = async (id: string): Promise<unknown> => {
		const doc = await collection.findOne({ _id: id as unknown as Record<string, unknown> })
		if (!doc) return undefined
		return JSON.parse(JSON.stringify(doc), BufferJSON.reviver)
	}

	const writeData = async (id: string, data: unknown): Promise<void> => {
		const toStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer))
		await collection.updateOne(
			{ _id: id as unknown as Record<string, unknown> },
			{ $set: { ...toStore } },
			{ upsert: true }
		)
	}

	const removeData = async (id: string): Promise<void> => {
		try {
			await collection.deleteOne({ _id: id as unknown as Record<string, unknown> })
		} catch (err) {
			// Non-fatal — the document may not exist
		}
	}

	// ── Credentials ───────────────────────────────────────────────────────────

	const creds: AuthenticationState['creds'] =
		((await readData('creds')) as AuthenticationState['creds'] | undefined) ?? initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				// @ts-ignore
				get: async (type, ids) => {
					const data: Record<string, unknown> = {}
					await Promise.all(
						ids.map(async id => {
							let value = await readData(docId(type, id))
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value as Record<string, unknown>)
							}
							data[id] = value
						})
					)
					return data
				},

				set: async data => {
					const tasks: Promise<void>[] = []
					for (const category in data) {
						const categoryData = (data as Record<string, Record<string, unknown>>)[category]
						for (const id in categoryData) {
							const value = categoryData[id]
							const key = docId(category, id)
							tasks.push(value ? writeData(key, value) : removeData(key))
						}
					}
					await Promise.all(tasks)
				}
			}
		},

		saveCreds: () => writeData('creds', creds)
	}
}
