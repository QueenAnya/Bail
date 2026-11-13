/**
 * NeDB auth state — for `@seald-io/nedb`, the maintained fork of `nedb`.
 *
 * NeDB is an embedded datastore: no server, no connection string. It lives in your process and persists to a JSON-lines
 * file (or stays in memory when no filename is given). The original `nedb` package stopped at 1.8.0 in February 2016;
 * `@seald-io/nedb` (4.x) is the fork that is still maintained, and it is what this adapter targets.
 *
 * Layout mirrors `useNekoDBAuth`: one document per key, `{ k: '<session>:<type>-<id>', v: '<json>' }`, so the two can
 * share a store shape and the migrator can read either.
 */
import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationStateWithListing, SignalDataSet, SignalDataTypeMap } from '../Types'
import { normalizeAuthArgs, pickAlias } from '../Utils/auth-args'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'
import { loadOptionalModule, resetCredsInPlace } from './auth-store'

export interface NedbAuthState {
	state: AuthenticationStateWithListing
	saveCreds: () => Promise<void>
	/** deletes this session's documents (the whole store when no session is used) */
	clearAuth: () => Promise<void>
	/** closes nothing (NeDB has no connection) — present so the return shape matches the other adapters */
	close: () => Promise<void>
}

export interface NedbAuthStateOptions {
	/** an existing `@seald-io/nedb` Datastore (it is used as-is) */
	datastore?: any
	/** file to persist to — the adapter opens a Datastore for you */
	filename?: string
	/** an alias of `filename` */
	path?: string
	/** keep everything in memory (no file) */
	inMemory?: boolean
	/** namespace this session inside the store: keys become `<session>:<type>-<id>` */
	session?: string
}

/**
 * NeDB speaks promises in the `@seald-io` fork (`findOneAsync`) and callbacks in the original (`findOne`). Accept both
 * so a caller who is still on `nedb@1.8` is not stuck.
 */
const callAsync = async (datastore: any, method: string, ...args: unknown[]): Promise<any> => {
	const asyncName = `${method}Async`
	if (typeof datastore[asyncName] === 'function') {
		return datastore[asyncName](...args)
	}

	if (typeof datastore[method] !== 'function') {
		throw new Error(`useNedbAuthState: the datastore has no \`${method}\` (or \`${asyncName}\`) method`)
	}

	return new Promise((resolve, reject) => {
		datastore[method](...args, (err: Error | null, result: unknown) => (err ? reject(err) : resolve(result)))
	})
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** NeDB returns documents in whatever order it finds them; sort so `list` is stable. */
const sortByKey = (docs: any[] | null | undefined) =>
	[...(docs ?? [])].sort((a, b) => String(a?.k ?? '').localeCompare(String(b?.k ?? '')))

export async function useNedbAuthState(
	/**
	 * Accepted shapes: `(datastore)`, `(filename)`, `({ filename })`, `(datastore, { session })`,
	 * `({ filename, session })` — and the other mixes every adapter accepts.
	 */
	a: any,
	b?: string | NedbAuthStateOptions,
	c?: string | NedbAuthStateOptions
): Promise<NedbAuthState> {
	const opts = normalizeAuthArgs<NedbAuthStateOptions>(
		[a, b, c],
		['datastore', 'session'],
		['datastore', 'filename', 'path', 'inMemory', 'session']
	)

	// `(filename)` puts the path in the first slot, which maps to `datastore`; a string there is a filename.
	if (typeof opts.datastore === 'string') {
		opts.filename = opts.filename ?? opts.datastore
		opts.datastore = undefined
	}

	const session = opts.session && opts.session !== 'default' ? opts.session : undefined
	/** every key passes through this, so a session is a prefix and nothing else changes */
	const ns = (key: string) => (session ? `${session}:${key}` : key)

	let datastore = opts.datastore
	if (!datastore) {
		const filename = pickAlias<string>(opts, ['filename', 'path'])
		if (!filename && !opts.inMemory) {
			throw new Error(
				'useNedbAuthState needs a datastore, a `filename` (or `{ inMemory: true }`). `@seald-io/nedb` is loaded for you when you pass a filename.'
			)
		}

		// the package exports the constructor as its default (CJS `module.exports`), so accept either shape
		const mod: any = await loadOptionalModule('@seald-io/nedb', 'useNedbAuthState')
		const Datastore = mod?.Datastore ?? mod?.default ?? mod
		if (typeof Datastore !== 'function') {
			throw new Error('useNedbAuthState: `@seald-io/nedb` did not export a Datastore constructor')
		}

		datastore = new Datastore(filename ? { filename, autoload: true } : { inMemoryOnly: true })
	}

	// `autoload: true` starts loading asynchronously; wait for it so the first read sees the file
	await callAsync(datastore, 'loadDatabase').catch(() => undefined)

	// an index on `k` keeps one lookup per key instead of a full scan
	await callAsync(datastore, 'ensureIndex', { fieldName: 'k', unique: true }).catch(() => undefined)

	const writeData = async (data: unknown, key: string) => {
		const k = ns(key)
		const v = JSON.stringify(data, BufferJSON.replacer)
		await callAsync(datastore, 'update', { k }, { $set: { k, v } }, { upsert: true })
	}

	const readData = async (key: string) => {
		try {
			const doc = await callAsync(datastore, 'findOne', { k: ns(key) })
			if (!doc?.v) {
				return null
			}

			return JSON.parse(doc.v, BufferJSON.reviver)
		} catch {
			return null
		}
	}

	const removeData = async (key: string) => {
		try {
			await callAsync(datastore, 'remove', { k: ns(key) }, { multi: false })
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

							if (value !== null && value !== undefined) {
								data[id] = value
							}
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
				/** documents are `{ k: '<session>:<type>-<id>' }`, so the id is what follows the type */
				list: async function* (type) {
					const head = ns(`${type}-`)
					const docs = (await callAsync(datastore, 'find', { k: new RegExp(`^${escapeRegExp(head)}`) })) as any[]
					for (const doc of sortByKey(docs)) {
						if (typeof doc?.k === 'string' && doc.k.startsWith(head)) {
							yield [doc.k.slice(head.length), JSON.parse(String(doc.v), BufferJSON.reviver)] as const
						}
					}
				},
				listIds: async function* (type) {
					const head = ns(`${type}-`)
					const docs = (await callAsync(datastore, 'find', { k: new RegExp(`^${escapeRegExp(head)}`) })) as any[]
					for (const doc of sortByKey(docs)) {
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
				// no session: the whole store belongs to this bot
				await callAsync(datastore, 'remove', {}, { multi: true }).catch(() => undefined)
				resetCredsInPlace(creds)
				return
			}

			await callAsync(datastore, 'remove', { k: new RegExp(`^${escapeRegExp(`${session}:`)}`) }, { multi: true }).catch(
				() => undefined
			)
			resetCredsInPlace(creds)
		},
		close: async () => {
			// NeDB writes on every call, so there is nothing to flush or close
		}
	}
}
