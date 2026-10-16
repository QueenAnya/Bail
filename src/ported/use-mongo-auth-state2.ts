/**
 * MongoDB auth-state adapter ported from Elaina Baileys' Utils/use-mongo-auth-state.js.
 * Kept as `useMongoAuthState2` so the existing Anya `useMongoAuthState` API remains unchanged.
 */
import { type AuthStore, type DatabaseAuthState, loadOptionalModule, makeAuthStateFromStore } from './auth-store'

export interface MongoAuthState2Options {
	/** Existing MongoDB collection (native driver or a compatible collection implementation). */
	collection?: any
	/** Existing MongoDB Db instance. The supplied db is never closed by this function. */
	db?: any
	/** Existing MongoClient instance. It is never closed by this function. */
	client?: any
	/** MongoDB connection URI. A client is created and owned by this function when used. */
	uri?: string
	/** Options forwarded to `new MongoClient(uri, clientOptions)`. */
	clientOptions?: Record<string, unknown>
	/** Database name used with `uri` or `client`; defaults to the driver's default database. */
	dbName?: string
	/** Collection name when `collection` is not supplied. Defaults to `baileys_auth`. */
	collectionName?: string
	/** Session namespace, allowing multiple bots to share one collection. Defaults to `default`. */
	session?: string
}

/**
 * MongoDB-backed auth state with session isolation, batch key operations, `clearAuth()` and `close()`.
 * Existing `useMongoAuthState` / `useMongoFileAuthState` functions are intentionally untouched.
 */
export async function useMongoAuthState2(opts: MongoAuthState2Options = {}): Promise<DatabaseAuthState> {
	const session = opts.session ?? 'default'
	let collection = opts.collection
	let db = opts.db
	let client = opts.client
	let ownsClient = false

	if (!collection) {
		if (!db && !client) {
			if (!opts.uri) {
				throw new Error('useMongoAuthState2 needs a collection, a db, a client, or a uri')
			}

			const mongodb = await loadOptionalModule('mongodb', 'useMongoAuthState2')
			client = new mongodb.MongoClient(opts.uri, opts.clientOptions)
			ownsClient = true
			try {
				await client.connect()
			} catch (error) {
				await client.close().catch(() => undefined)
				throw error
			}
		}

		if (!db && client) {
			db = client.db(opts.dbName)
		}

		if (!db || typeof db.collection !== 'function') {
			if (ownsClient) await client?.close().catch(() => undefined)
			throw new Error('useMongoAuthState2 could not resolve a MongoDB database/collection')
		}

		collection = db.collection(opts.collectionName ?? 'baileys_auth')
	}

	if (typeof collection.createIndex !== 'function') {
		if (ownsClient) await client?.close().catch(() => undefined)
		throw new Error('useMongoAuthState2 collection must support createIndex()')
	}

	await collection.createIndex({ session: 1, type: 1, id: 1 }, { unique: true })

	const store: AuthStore = {
		read: async (type, id) => {
			const doc = await collection.findOne({ session, type, id })
			return doc?.value ?? null
		},
		readMany: async (type, ids) => {
			if (!ids.length) return {}
			const docs = await collection.find({ session, type, id: { $in: ids } }).toArray()
			const rows: Record<string, string> = {}
			for (const doc of docs) rows[doc.id] = doc.value
			return rows
		},
		write: async (type, id, value) => {
			await collection.updateOne({ session, type, id }, { $set: { value } }, { upsert: true })
		},
		apply: async (writes, removals) => {
			const operations: any[] = []
			for (const entry of writes) {
				operations.push({
					updateOne: {
						filter: { session, type: entry.type, id: entry.id },
						update: { $set: { value: entry.value } },
						upsert: true
					}
				})
			}
			for (const entry of removals) {
				operations.push({ deleteOne: { filter: { session, type: entry.type, id: entry.id } } })
			}
			if (operations.length) await collection.bulkWrite(operations, { ordered: false })
		},
		clear: async () => {
			await collection.deleteMany({ session })
		},
		close: async () => {
			if (ownsClient) await client?.close()
		}
	}

	return makeAuthStateFromStore(store)
}
