/**
 * Single-file auth state with LRUCache + Mutex for safe concurrent access.
 *
 * Stores all creds + signal keys in one JSON file.
 * Writes are debounced (3 s) and atomic (write-to-temp then rename).
 *
 * Source: @itsliaaa/baileys (use-single-file-auth-state.js) — ESM v7 adapted,
 * enhanced with LRUCache + async-mutex.
 *
 * @example
 * const { state, saveCreds } = await useSingleFileAuthState('./auth.json')
 * const sock = makeWASocket({ auth: state })
 * sock.ev.on('creds.update', saveCreds)
 */

import { rename, readFile, stat, writeFile } from 'fs/promises'
import { proto } from '../../WAProto/index.js'
import { DEFAULT_CACHE_TTLS } from '../Defaults/index.js'
import { BufferJSON } from './generics.js'
import { initAuthCreds } from './auth-utils.js'

const FLUSH_TIMEOUT_MS = 3_000

export const useSingleFileAuthState = async (fileName: string) => {
	// Lazy-load optional deps — users may not have lru-cache or async-mutex
	const [lruMod, mutexMod] = await Promise.all([
		import('lru-cache').catch(() => null),
		import('async-mutex').catch(() => null)
	])

	const LRUCache = (lruMod as any)?.LRUCache ?? (lruMod as any)?.default?.LRUCache
	const Mutex = (mutexMod as any)?.Mutex ?? (mutexMod as any)?.default?.Mutex

	const cache = LRUCache
		? new LRUCache({
				max: 15_000,
				ttl: 1_000 * DEFAULT_CACHE_TTLS.SIGNAL_STORE,
				updateAgeOnGet: false,
				updateAgeOnHas: false,
				ttlAutopurge: true
			})
		: null

	const mutex = Mutex ? new Mutex() : null
	let fileData: Record<string, any> = {}
	let isLoaded = false
	let flushTimeout: ReturnType<typeof setTimeout> | null = null

	const withLock = async <T>(fn: () => Promise<T>): Promise<T> => (mutex ? mutex.runExclusive(fn) : fn())

	const loadKey = async () =>
		withLock(async () => {
			if (isLoaded) return
			try {
				const raw = await readFile(fileName, 'utf-8')
				fileData = JSON.parse(raw, BufferJSON.reviver) ?? {}
				if (cache) {
					for (const [k, v] of Object.entries(fileData)) cache.set(k, v)
				}
			} catch {
				fileData = {}
			}
			isLoaded = true
		})

	const flushKey = () => {
		if (flushTimeout) return
		flushTimeout = setTimeout(async () => {
			flushTimeout = null
			await withLock(async () => {
				try {
					const tmp = `${fileName}.temp`
					await writeFile(tmp, JSON.stringify(fileData, BufferJSON.replacer))
					await rename(tmp, fileName)
				} catch {}
			})
		}, FLUSH_TIMEOUT_MS)
	}

	const writeKey = (keyName: string, value: any) => {
		cache?.set(keyName, value)
		fileData[keyName] = value
		flushKey()
	}

	const removeKey = (keyName: string) => {
		cache?.delete(keyName)
		delete fileData[keyName]
		flushKey()
	}

	// Ensure file exists
	const info = await stat(fileName).catch(() => null)
	if (!info) {
		await writeFile(fileName, '{}')
	} else if (!info.isFile()) {
		throw new Error(`Expected a file at ${fileName}, found something else`)
	}

	await loadKey()

	const creds = fileData['creds'] ?? initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: (type: string, ids: string[]) => {
					const data: Record<string, any> = {}
					for (const id of ids) {
						const keyName = `${type}${id}`
						let value = cache ? cache.get(keyName) : fileData[keyName]
						if (value === undefined && fileData[keyName] !== undefined) {
							value = fileData[keyName]
							cache?.set(keyName, value)
						}
						if (type === 'app-state-sync-key' && value) {
							value = proto.Message.AppStateSyncKeyData.fromObject(value)
						}
						data[id] = value
					}
					return data
				},
				set: (data: Record<string, Record<string, any>>) => {
					for (const category in data) {
						for (const id in data[category]) {
							const keyName = `${category}${id}`
							const value = data[category]![id]
							value ? writeKey(keyName, value) : removeKey(keyName)
						}
					}
				}
			}
		},
		saveCreds: () => writeKey('creds', creds)
	}
}
