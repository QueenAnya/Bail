/**
 * use-single-file-auth-state.ts
 * Advanced single-file auth state with:
 *   - LRUCache (max 20000) for fast in-memory reads
 *   - Mutex to prevent race conditions on concurrent writes
 *   - Debounced atomic write (temp → rename) with 3s flush timeout
 *     so disk I/O is batched, not triggered on every key change
 */

import { Mutex } from 'async-mutex'
import { readFile, rename, stat, writeFile } from 'fs/promises'
import { LRUCache } from 'lru-cache'
import { proto } from '../../WAProto/index.js'
import { DEFAULT_CACHE_TTLS } from '../Defaults/index.js'
import type { AuthenticationCreds, AuthenticationStateWithListing, SignalDataTypeMap } from '../Types'
import { normalizeAuthArgs, pickAlias } from './auth-args'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'
import { resetCredsInPlace } from '../Extras/auth-store'

/** Debounce delay before flushing accumulated writes to disk (ms) */
const FLUSH_TIMEOUT_MS = 3000

export interface SingleFileAuthStateOptions {
	/**
	 * Namespace this session inside the file: keys are stored as `<session>:<key>`.
	 *
	 * Omit it (or pass `default`) and the file layout is exactly what it always was. Set it and several bots can share
	 * one file without seeing each other's keys.
	 */
	session?: string
}

export const useSingleFileAuthState = async (
	/**
	 * The file, or an options object. Accepted shapes:
	 * `(file)`, `(file, { session })`, `({ filename })`, `({ filename, session })`.
	 */
	a: string | (SingleFileAuthStateOptions & { filename?: string; fileName?: string }),
	b?: SingleFileAuthStateOptions
): Promise<{
	state: AuthenticationStateWithListing
	saveCreds: () => Promise<void>
	saveState: () => Promise<void>
	clearAuth: () => Promise<void>
	/** writes immediately instead of waiting for the 3s debounce */
	flush: () => Promise<void>
}> => {
	const opts = normalizeAuthArgs<SingleFileAuthStateOptions & { filename?: string; fileName?: string }>(
		[a, b],
		['filename', 'session']
	)
	const fileName = pickAlias<string>(opts, ['filename', 'fileName', 'file'])
	if (!fileName) {
		throw new Error('useSingleFileAuthState needs a file name (or { filename })')
	}

	const session = opts.session && opts.session !== 'default' ? opts.session : undefined
	/** every key passes through this, so a session is a prefix and nothing else changes */
	const ns = (keyName: string) => (session ? `${session}:${keyName}` : keyName)
	// ── LRU Cache (fast in-memory reads) ──────────────────────────────────────
	const cache = new LRUCache<string, any>({
		max: 20000,
		ttl: 1000 * DEFAULT_CACHE_TTLS.SIGNAL_STORE,
		updateAgeOnGet: false,
		updateAgeOnHas: false,
		ttlAutopurge: true
	})

	// ── Mutex (prevent concurrent write race conditions) ──────────────────────
	const mutex = new Mutex()

	let fileData: Record<string, any> = {}
	let isLoaded = false
	let flushTimeout: ReturnType<typeof setTimeout> | null = null

	// ── Load file into memory + cache (once) ──────────────────────────────────
	const loadKey = async () => {
		return await mutex.runExclusive(async () => {
			if (isLoaded) return
			try {
				const raw = await readFile(fileName, 'utf-8')
				const data = JSON.parse(raw, BufferJSON.reviver)
				fileData = data || {}
				for (const [keyName, value] of Object.entries(fileData)) {
					cache.set(keyName, value)
				}
			} catch {
				fileData = {}
			}

			isLoaded = true
		})
	}

	// ── Atomic debounced flush (temp → rename = crash-safe) ───────────────────
	const flushKey = () => {
		if (flushTimeout) return // already pending, skip
		flushTimeout = setTimeout(async () => {
			flushTimeout = null
			try {
				await flushNow()
			} catch {
				// swallow write errors — next flush will retry
			}
		}, FLUSH_TIMEOUT_MS)
	}

	/** true when this adapter owns the key (session-less adapters own every key) */
	const ownsKey = (key: string) => !session || key.startsWith(`${session}:`)

	/**
	 * Writes now and cancels a pending debounce.
	 *
	 * Several adapters may hold the same file (one per session), so the write merges: what is on disk is re-read, the
	 * keys this adapter owns are replaced, everything else is preserved. Without that, one bot's flush would wipe
	 * another bot's keys.
	 */
	const flushNow = async () => {
		if (flushTimeout) {
			clearTimeout(flushTimeout)
			flushTimeout = null
		}

		await mutex.runExclusive(async () => {
			let onDisk: Record<string, any> = {}
			try {
				onDisk = JSON.parse(await readFile(fileName, 'utf-8'), BufferJSON.reviver) || {}
			} catch {
				onDisk = {}
			}

			for (const key of Object.keys(onDisk)) {
				if (ownsKey(key)) {
					delete onDisk[key]
				}
			}

			for (const [key, value] of Object.entries(fileData)) {
				if (ownsKey(key)) {
					onDisk[key] = value
				}
			}

			const tempFile = fileName + '.temp'
			await writeFile(tempFile, JSON.stringify(onDisk, BufferJSON.replacer))
			await rename(tempFile, fileName)
		})
	}

	// ── Write / remove helpers ─────────────────────────────────────────────────
	const writeKey = (keyName: string, value: any) => {
		const key = ns(keyName)
		cache.set(key, value)
		fileData[key] = value
		flushKey()
	}

	const removeKey = (keyName: string) => {
		const key = ns(keyName)
		cache.delete(key)
		delete fileData[key]
		flushKey()
	}

	// ── Init: create file if it doesn't exist ─────────────────────────────────
	const fileInfo = await stat(fileName).catch(() => null)
	if (!fileInfo) {
		await writeFile(fileName, '{}')
	} else if (!fileInfo.isFile()) {
		throw new Error(
			`Found something that is not a file at ${fileName}, either delete it or specify a different location`
		)
	}

	await loadKey()

	const creds: AuthenticationCreds = (fileData[ns('creds')] as AuthenticationCreds) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: <T extends keyof SignalDataTypeMap>(type: T, ids: string[]) => {
					const data: { [id: string]: SignalDataTypeMap[T] } = {}
					for (const id of ids) {
						const keyName = ns(type + id)

						// Try LRU first, fall back to fileData
						let value = cache.get(keyName)
						if (value === undefined && fileData[keyName] !== undefined) {
							value = fileData[keyName]
							cache.set(keyName, value)
						}

						// Deserialise proto object for app-state-sync-key
						if (type === 'app-state-sync-key' && value) {
							value = proto.Message.AppStateSyncKeyData.fromObject(value)
						}

						data[id] = value as SignalDataTypeMap[T]
					}

					return data
				},
				set: <T extends keyof SignalDataTypeMap>(data: {
					[K in T]?: { [id: string]: SignalDataTypeMap[K] | null | undefined }
				}) => {
					for (const category in data) {
						const categoryData = (data as Record<string, Record<string, unknown>>)[category]
						for (const id in categoryData) {
							const keyName = category + id
							const value = categoryData[id]
							// value type is `SignalDataTypeMap[K] | null | undefined` — loose `!= null`
							// correctly catches BOTH null and undefined; strict `!== null` would call
							// writeKey(key, undefined) instead of removeKey when value is undefined.

							value != null ? writeKey(keyName, value) : removeKey(keyName)
						}
					}
				},
				/**
				 * Keys in the file are `<session>:<type><id>`, so the id is whatever follows the type — the same shape
				 * `set` writes.
				 */
				list: async function* (type) {
					const prefix = ns(type)
					for (const [keyName, value] of Object.entries(fileData).sort(([a], [b]) => a.localeCompare(b))) {
						if (keyName.startsWith(prefix) && keyName !== ns('creds')) {
							yield [keyName.slice(prefix.length), value] as const
						}
					}
				},
				listIds: async function* (type) {
					const prefix = ns(type)
					for (const keyName of Object.keys(fileData).sort()) {
						if (keyName.startsWith(prefix) && keyName !== ns('creds')) {
							yield keyName.slice(prefix.length)
						}
					}
				}
			}
		},
		saveCreds: async () => writeKey('creds', creds),
		// innovatorssoft name for saveCreds: `sock.ev.on('creds.update', saveState)`
		saveState: async () => writeKey('creds', creds),
		flush: flushNow,
		/** removes this session's keys (with no session set, every key in the file) */
		clearAuth: async () => {
			const prefix = session ? `${session}:` : undefined
			for (const key of Object.keys(fileData)) {
				if (!prefix || key.startsWith(prefix)) {
					cache.delete(key)
					delete fileData[key]
				}
			}

			await flushNow()
			resetCredsInPlace(creds)
		}
	}
}
