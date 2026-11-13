import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationStateWithListing, SignalDataTypeMap } from '../Types'
import { normalizeAuthArgs, pickAlias } from './auth-args'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'

type MongoCollection = {
	findOne(filter: object): Promise<any>
	/** optional: only needed for `list`/`listIds` (the migrator's source side) */
	find?(filter: object): { toArray?: () => Promise<any[]> } | AsyncIterable<any>
	updateOne(filter: object, update: object, options?: object): Promise<any>
	deleteOne(filter: object): Promise<any>
}

export interface MongoFileAuthStateOptions {
	/**
	 * Namespace this session inside the collection: `_id`s become `<session>:<key>`.
	 *
	 * Omit it (or pass `default`) and the ids are exactly what they always were — one bot per collection. Set it and
	 * several bots can share one collection, each with its own credentials.
	 */
	session?: string
}

/**
 * MongoDB auth state — stores Baileys credentials in a MongoDB collection.
 * Pass a MongoDB collection instance (e.g. from mongoose or native driver).
 */
export const useMongoFileAuthState = async (
	/**
	 * The collection, or an options object. Accepted shapes:
	 * `(collection)`, `(collection, { session })`, `({ collection, session })`.
	 */
	a: MongoCollection | (MongoFileAuthStateOptions & { collection?: MongoCollection }),
	b?: MongoFileAuthStateOptions
): Promise<{ state: AuthenticationStateWithListing; saveCreds: () => Promise<void> }> => {
	const opts = normalizeAuthArgs<MongoFileAuthStateOptions & { collection?: MongoCollection }>(
		[a, b],
		['collection', 'session']
	)
	const collection = pickAlias<MongoCollection>(opts, ['collection'])
	if (!collection) {
		throw new Error('useMongoFileAuthState needs a collection (or { collection })')
	}

	/** a session is just an `_id` prefix, so nothing about the document shape changes */
	const session = opts.session && opts.session !== 'default' ? opts.session : undefined
	const scoped = (id: string) => (session ? `${session}:${id}` : id)

	/** `<session>:<type>-<id>` -> id; null when the document is not of this type */
	const idFromDocument = (type: string, doc: any): string | null => {
		const rawId = String(doc?._id ?? '')
		const withoutSession = session && rawId.startsWith(`${session}:`) ? rawId.slice(session.length + 1) : rawId
		const head = `${type}-`
		return withoutSession.startsWith(head) ? withoutSession.slice(head.length) : null
	}

	const findDocs = async (type: string): Promise<any[]> => {
		if (typeof collection.find !== 'function') {
			throw new Error('useMongoFileAuthState: this collection has no find(), so list() is unavailable')
		}

		// `_id` is a string, so a prefix range scan keeps it index-friendly
		const head = session ? `${session}:${type}-` : `${type}-`
		const result = collection.find({ _id: { $regex: `^${head.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}` } })
		if (result && typeof (result as any).toArray === 'function') {
			return await (result as any).toArray()
		}

		const out: any[] = []
		for await (const doc of result as AsyncIterable<any>) {
			out.push(doc)
		}

		return out
	}

	const writeData = (data: any, id: string) => {
		const informationToStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer))
		return collection.updateOne({ _id: scoped(id) }, { $set: { ...informationToStore } }, { upsert: true })
	}

	const readData = async (id: string) => {
		try {
			const data = JSON.stringify(await collection.findOne({ _id: scoped(id) }))
			return JSON.parse(data, BufferJSON.reviver)
		} catch (err) {
			return null
		}
	}

	const removeData = async (id: string) => {
		try {
			await collection.deleteOne({ _id: scoped(id) })
		} catch (error) {
			console.error(`[useMongoFileAuthState] Error removing ${id}:`, error)
		}
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
				},
				/**
				 * Reads the documents of one type straight from the collection. The `_id` is `<type>-<id>` (optionally
				 * prefixed with the session), so the id is what follows the type.
				 */
				list: async function* (type) {
					const docs = await findDocs(type)
					for (const doc of docs) {
						const id = idFromDocument(type, doc)
						if (id !== null) {
							yield [id, doc] as const
						}
					}
				},
				listIds: async function* (type) {
					const docs = await findDocs(type)
					for (const doc of docs) {
						const id = idFromDocument(type, doc)
						if (id !== null) {
							yield id
						}
					}
				}
			}
		},
		saveCreds: () => writeData(creds, 'creds')
	}
}

/**
 * The name every fork uses, and the one that has to accept everything.
 *
 * Two adapters live behind it:
 * - a **collection** (this file's `useMongoFileAuthState`), the original Anya API;
 * - a **connection URI** (`useMongoAuthState2` from `Extras`), which creates and owns its own client.
 *
 * The two are told apart by what `a` is: a string, or a bag with `uri` / `url`, is a connection; anything with a
 * `collection` (or a collection-looking object) is a handle. The URI path is imported lazily so this file keeps no
 * module-level dependency on `Extras`.
 */
export const useMongoAuthState = async (
	a: Parameters<typeof useMongoFileAuthState>[0] | string | { uri?: string; url?: string },
	b?: Parameters<typeof useMongoFileAuthState>[1] | string,
	c?: string
) => {
	// nothing at all: say what the two accepted forms are instead of only naming the legacy one
	const empty =
		a === undefined ||
		(typeof a === 'object' && a !== null && Object.keys(a).length === 0 && (b === undefined || (typeof b === 'object' && Object.keys(b as object).length === 0)))

	if (empty) {
		throw new Error(
			'useMongoAuthState needs a connection uri / url (useMongoAuthState("mongodb://…")) or a collection (useMongoAuthState({ collection }))'
		)
	}

	const isConnection =
		typeof a === 'string' ||
		(typeof a === 'object' && a !== null && ('uri' in a || 'url' in a)) ||
		(typeof b === 'object' && b !== null && ('uri' in b || 'url' in b))

	if (isConnection) {
		const { useMongoAuthState2 } = await import('../Extras/use-mongo-auth-state2')
		return useMongoAuthState2(a as any, b as any, c)
	}

	return useMongoFileAuthState(a as Parameters<typeof useMongoFileAuthState>[0], b as Parameters<typeof useMongoFileAuthState>[1])
}
