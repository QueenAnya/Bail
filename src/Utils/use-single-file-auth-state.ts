/**
 * use-single-file-auth-state.ts
 * Advanced single-file auth state with:
 *   - LRUCache (max 20000) for fast in-memory reads
 *   - Mutex to prevent race conditions on concurrent writes
 *   - Debounced atomic write (temp → rename) with 3s flush timeout
 *     so disk I/O is batched, not triggered on every key change
 * Ported from @itsliaaa/baileys (Lia@Changes 22-04-26 / 26-04-26)
 */

import { Mutex } from 'async-mutex'
import { readFile, rename, stat, writeFile } from 'fs/promises'
import { LRUCache } from 'lru-cache'
import { proto } from '../../WAProto/index.js'
import { DEFAULT_CACHE_TTLS } from '../Defaults/index.js'
import type { AuthenticationCreds, AuthenticationState, SignalDataTypeMap } from '../Types'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'

/** Debounce delay before flushing accumulated writes to disk (ms) */
const FLUSH_TIMEOUT_MS = 3000

export const useSingleFileAuthState = async (
	fileName: string
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<void> }> => {
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
			await mutex.runExclusive(async () => {
				try {
					const tempFile = fileName + '.temp'
					await writeFile(tempFile, JSON.stringify(fileData, BufferJSON.replacer))
					await rename(tempFile, fileName) // atomic on most OS
				} catch {
					// swallow write errors — next flush will retry
				}
			})
		}, FLUSH_TIMEOUT_MS)
	}

	// ── Write / remove helpers ─────────────────────────────────────────────────
	const writeKey = (keyName: string, value: any) => {
		cache.set(keyName, value)
		fileData[keyName] = value
		flushKey()
	}

	const removeKey = (keyName: string) => {
		cache.delete(keyName)
		delete fileData[keyName]
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

	const creds: AuthenticationCreds = (fileData['creds'] as AuthenticationCreds) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: <T extends keyof SignalDataTypeMap>(type: T, ids: string[]) => {
					const data: { [id: string]: SignalDataTypeMap[T] } = {}
					for (const id of ids) {
						const keyName = type + id

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
							value !== null ? writeKey(keyName, value) : removeKey(keyName)
						}
					}
				}
			}
		},
		saveCreds: async () => writeKey('creds', creds)
	}
}
