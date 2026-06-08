/**
 * Enhanced Single-File Authentication State
 *
 * Source: @itsliaaa/baileys (use-single-file-auth-state.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Improvements over the removed upstream single-file implementation:
 *  - LRUCache (15k entries, TTL = SIGNAL_STORE cache TTL) — avoids redundant disk reads
 *  - async-mutex — prevents race conditions on parallel writes
 *  - Atomic write via temp-file + rename — eliminates partial-write corruption
 *  - 3-second debounced flush — batches rapid consecutive updates
 *
 * Requires: `lru-cache` and `async-mutex` (both already in package.json)
 *
 * @example
 * import { useSingleFileAuthState } from './addons/auth/use-single-file-auth-state.js'
 *
 * const { state, saveCreds } = await useSingleFileAuthState('./auth_info.json')
 * const sock = makeWASocket({ auth: state })
 * sock.ev.on('creds.update', saveCreds)
 */

import { readFile, rename, stat, writeFile } from 'fs/promises'
import { Mutex } from 'async-mutex'
import { LRUCache } from 'lru-cache'
import { proto } from '../../../WAProto/index.js'
import { DEFAULT_CACHE_TTLS } from '../../Defaults/index.js'
import { initAuthCreds } from '../../Utils/auth-utils.js'
import { BufferJSON } from '../../Utils/generics.js'
import type { AuthenticationState } from '../../Types/index.js'

// ─── Constants ────────────────────────────────────────────────────────────────

/** How long to wait after the last write before flushing to disk (ms). */
const FLUSH_DEBOUNCE_MS = 3_000

// ─── useSingleFileAuthState ───────────────────────────────────────────────────

/**
 * Create a single-file auth state with LRU caching and atomic writes.
 *
 * All signal keys and credentials are stored as JSON in `fileName`.
 * Keys are cached in an LRU for fast repeated access without disk I/O.
 * Writes are debounced and flushed atomically via a temp file + rename.
 */
export const useSingleFileAuthState = async (
	fileName: string
): Promise<{ state: AuthenticationState; saveCreds: () => void }> => {
	// ── Cache (15k entries, TTL mirrors SIGNAL_STORE) ──────────────────────────
	const cache = new LRUCache<string, unknown>({
		max: 15_000,
		ttl: 1_000 * DEFAULT_CACHE_TTLS.SIGNAL_STORE,
		updateAgeOnGet: false,
		updateAgeOnHas: false,
		ttlAutopurge: true
	})

	// ── Race-condition safety ──────────────────────────────────────────────────
	const mutex = new Mutex()
	let fileData: Record<string, unknown> = {}
	let isLoaded = false
	let flushTimeout: ReturnType<typeof setTimeout> | null = null

	// ── File initialisation ───────────────────────────────────────────────────
	const fileInfo = await stat(fileName).catch(() => null)
	if (!fileInfo) {
		await writeFile(fileName, '{}', 'utf-8')
	} else if (!fileInfo.isFile()) {
		throw new Error(
			`Found something that is not a file at ${fileName}. ` + `Either delete it or specify a different path.`
		)
	}

	// ── Lazy load (once) ──────────────────────────────────────────────────────
	const ensureLoaded = () =>
		mutex.runExclusive(async () => {
			if (isLoaded) return
			try {
				const raw = await readFile(fileName, 'utf-8')
				fileData = JSON.parse(raw, BufferJSON.reviver) || {}
				for (const [k, v] of Object.entries(fileData)) cache.set(k, v)
			} catch {
				fileData = {}
			}
			isLoaded = true
		})

	await ensureLoaded()

	// ── Debounced flush ───────────────────────────────────────────────────────
	const scheduleFlush = () => {
		if (flushTimeout) return
		flushTimeout = setTimeout(() => {
			flushTimeout = null
			void mutex.runExclusive(async () => {
				try {
					const tmp = `${fileName}.tmp`
					await writeFile(tmp, JSON.stringify(fileData, BufferJSON.replacer), 'utf-8')
					await rename(tmp, fileName)
				} catch {
					// Flush failed — will retry on next write
				}
			})
		}, FLUSH_DEBOUNCE_MS)
	}

	// ── Internal key accessors ────────────────────────────────────────────────
	const writeKey = (keyName: string, value: unknown) => {
		cache.set(keyName, value)
		fileData[keyName] = value
		scheduleFlush()
	}

	const removeKey = (keyName: string) => {
		cache.delete(keyName)
		delete fileData[keyName]
		scheduleFlush()
	}

	// ── Creds ─────────────────────────────────────────────────────────────────
	const creds = (fileData['creds'] as AuthenticationState['creds'] | undefined) ?? initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: (type, ids) => {
					const data: Record<string, unknown> = {}
					for (const id of ids) {
						const keyName = `${type}${id}`
						let value = cache.get(keyName)
						if (value === undefined && fileData[keyName] !== undefined) {
							value = fileData[keyName]
							cache.set(keyName, value)
						}
						if (type === 'app-state-sync-key' && value) {
							value = proto.Message.AppStateSyncKeyData.fromObject(value as Record<string, unknown>)
						}
						data[id] = value
					}
					return data
				},

				set: data => {
					for (const category in data) {
						const categoryData = (data as Record<string, Record<string, unknown>>)[category]
						for (const id in categoryData) {
							const keyName = `${category}${id}`
							const value = categoryData[id]
							value ? writeKey(keyName, value) : removeKey(keyName)
						}
					}
				}
			}
		},

		saveCreds: () => writeKey('creds', creds)
	}
}
