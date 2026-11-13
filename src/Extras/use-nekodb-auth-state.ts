/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT) - Utils/useNekoDBAuth.js, rewritten in TypeScript.
 *
 * Stores the auth state in a NekoDB collection. Pass an already connected NekoDB instance.
 * Compared with Elaina's file, three things are added on top of an otherwise identical body: `session`,
 * `list` / `listIds` (needed by `migrateAuthState`), and the eight argument shapes every adapter here accepts.
 * Two deliberate differences: our default collection is `baileys_auth` (Elaina's is `baileys_elaina_auth`), and
 * `clearAuth()` drops the whole collection only when no session is set.
 */
import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationStateWithListing, SignalDataSet, SignalDataTypeMap } from '../Types'
import { normalizeAuthArgs, pickAlias } from '../Utils/auth-args'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'
import { resetCredsInPlace } from './auth-store'

export interface NekoDBAuthState {
	state: AuthenticationStateWithListing
	saveCreds: () => Promise<void>
	/** drops the whole collection */
	clearAuth: () => Promise<void>
}

export interface NekoDBAuthOptions {
	/**
	 * Namespace this session inside the collection: keys are stored as `<session>:<key>`.
	 *
	 * Omit it (or pass `default`) and keys look exactly as they always have.
	 */
	session?: string
}

export async function useNekoDBAuth(
	/**
	 * Accepted shapes: `(db)`, `(db, collectionName, { session })`, `({ db, collectionName, session })`.
	 */
	a: any,
	b: string | (NekoDBAuthOptions & { db?: any; collectionName?: string }) = 'baileys_auth',
	c?: NekoDBAuthOptions
): Promise<NekoDBAuthState> {
	const opts = normalizeAuthArgs<NekoDBAuthOptions & { db?: any; collectionName?: string }>(
		[a, b, c],
		['db', 'collectionName', 'session']
	)
	const db = pickAlias<any>(opts, ['db', 'client', 'instance'])
	const collectionName = pickAlias<string>(opts, ['collectionName', 'collection', 'connectionName']) ?? 'baileys_auth'

	const session = opts.session && opts.session !== 'default' ? opts.session : undefined
	/** every key passes through this, so a session is a prefix and nothing else changes */
	const ns = (key: string) => (session ? `${session}:${key}` : key)
	if (!db || typeof db.collection !== 'function') {
		throw new Error('useNekoDBAuth: the first argument must be a connected NekoDB instance')
	}

	const col = db.collection(collectionName).helper()

	const writeData = async (data: unknown, key: string) => {
		const value = JSON.stringify(data, BufferJSON.replacer)
		const k = ns(key)
		await col.upsert({ k }, { k, v: value })
	}

	const readData = async (key: string) => {
		try {
			const doc = await col.findOne({ k: ns(key) })
			if (doc?.v === null || doc?.v === undefined) {
				return null
			}

			return JSON.parse(doc.v, BufferJSON.reviver)
		} catch {
			return null
		}
	}

	const removeData = async (key: string) => {
		try {
			await col.deleteWhere({ k: ns(key) })
		} catch {}
	}

	const creds: AuthenticationCreds = (await readData('creds')) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type, ids) => {
					const data: { [id: string]: SignalDataTypeMap[typeof type] } = {}
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
				set: async (data: SignalDataSet) => {
					const tasks: Promise<void>[] = []
					for (const category in data) {
						const entries = data[category as keyof SignalDataTypeMap]!
						for (const id in entries) {
							const value = entries[id]
							const key = `${category}-${id}`
							tasks.push(value ? writeData(value, key) : removeData(key))
						}
					}

					await Promise.all(tasks)
				},
				/** keys are stored as `<session>:<type>-<id>`, so the id is what follows the type */
				list: async function* (type) {
					const docs = (await col.findMany({}).catch(() => [] as any[])) as any[]
					const head = ns(`${type}-`)
					for (const doc of docs) {
						if (typeof doc?.k === 'string' && doc.k.startsWith(head)) {
							yield [doc.k.slice(head.length), JSON.parse(String(doc.v), BufferJSON.reviver)] as const
						}
					}
				},
				listIds: async function* (type) {
					const docs = (await col.findMany({}).catch(() => [] as any[])) as any[]
					const head = ns(`${type}-`)
					for (const doc of docs) {
						if (typeof doc?.k === 'string' && doc.k.startsWith(head)) {
							yield doc.k.slice(head.length)
						}
					}
				}
			}
		},
		saveCreds: async () => {
			await writeData(creds, 'creds')
		},
		clearAuth: async () => {
			if (!session) {
				try {
					await db.deleteCollection(collectionName)
				} catch {}

				resetCredsInPlace(creds)
				return
			}

			/** only this session's documents — other bots sharing the collection keep theirs */
			const prefix = `${session}:`
			const docs = await col.findMany({}).catch(() => [] as any[])
			await Promise.all(
				(docs as any[])
					.filter(doc => typeof doc?.k === 'string' && doc.k.startsWith(prefix))
					.map(doc => col.deleteWhere({ k: doc.k }).catch(() => {}))
			)
			resetCredsInPlace(creds)
		}
	}
}
