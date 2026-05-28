/**
 * Single-File Auth State with LRU cache + mutex
 * Source: @itsliaaa/baileys use-single-file-auth-state.js (Lia@Changes 22-04-26)
 */
import { readFile, rename, stat, writeFile } from 'node:fs/promises'
import { DEFAULT_CACHE_TTLS } from '../Defaults/index.js'
import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils.js'
import { BufferJSON } from '../Utils/generics.js'
import type { AuthenticationState } from '../Types/index.js'

const FLUSH_TIMEOUT_MS = 3000

/** Simple LRU-like cache backed by a Map with TTL eviction */
class SimpleLRUCache<V> {
	private cache = new Map<string, { value: V; expiresAt: number }>()
	private readonly max: number
	private readonly ttl: number

	constructor(options: { max: number; ttl: number }) {
		this.max = options.max
		this.ttl = options.ttl
	}

	get(key: string): V | undefined {
		const entry = this.cache.get(key)
		if (!entry) return undefined
		if (Date.now() > entry.expiresAt) {
			this.cache.delete(key)
			return undefined
		}
		return entry.value
	}

	set(key: string, value: V): void {
		if (this.cache.size >= this.max) {
			const oldest = this.cache.keys().next().value
			if (oldest) this.cache.delete(oldest)
		}
		this.cache.set(key, { value, expiresAt: Date.now() + this.ttl })
	}

	delete(key: string): void {
		this.cache.delete(key)
	}
	has(key: string): boolean {
		return this.cache.has(key)
	}
}

/** Simple async mutex */
class Mutex {
	private queue: (() => void)[] = []
	private locked = false

	async runExclusive<T>(fn: () => Promise<T>): Promise<T> {
		if (this.locked) await new Promise<void>(resolve => this.queue.push(resolve))
		this.locked = true
		try {
			return await fn()
		} finally {
			this.locked = false
			this.queue.shift()?.()
		}
	}
}

export const useSingleFileAuthState = async (
	fileName: string
): Promise<{
	state: AuthenticationState
	saveCreds: () => void
}> => {
	const cache = new SimpleLRUCache<unknown>({
		max: 15000,
		ttl: 1000 * DEFAULT_CACHE_TTLS.SIGNAL_STORE
	})
	const mutex = new Mutex()
	let fileData: Record<string, unknown> = {}
	let isLoaded = false
	let flushTimeout: ReturnType<typeof setTimeout> | null = null

	const loadKey = async () => {
		return mutex.runExclusive(async () => {
			if (isLoaded) return
			try {
				const data = JSON.parse(await readFile(fileName, 'utf-8'), BufferJSON.reviver)
				fileData = data || {}
				for (const [keyName, value] of Object.entries(fileData)) cache.set(keyName, value)
			} catch {
				fileData = {}
			}
			isLoaded = true
		})
	}

	const flushKey = () => {
		if (flushTimeout) return
		flushTimeout = setTimeout(async () => {
			flushTimeout = null
			await mutex.runExclusive(async () => {
				try {
					const tempFile = fileName + '.temp'
					await writeFile(tempFile, JSON.stringify(fileData, BufferJSON.replacer))
					await rename(tempFile, fileName)
				} catch {}
			})
		}, FLUSH_TIMEOUT_MS)
	}

	const writeKey = (keyName: string, value: unknown) => {
		cache.set(keyName, value)
		fileData[keyName] = value
		flushKey()
	}

	const removeKey = (keyName: string) => {
		cache.delete(keyName)
		delete fileData[keyName]
		flushKey()
	}

	const fileInfo = await stat(fileName).catch(() => null)
	if (!fileInfo) {
		await writeFile(fileName, '{}')
	} else if (!fileInfo.isFile()) {
		throw new Error(`Found something that is not a file at ${fileName}`)
	}

	await loadKey()

	const creds = (fileData['creds'] as any) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: (type: string, ids: string[]) => {
					const data: Record<string, any> = {}
					for (const id of ids) {
						const keyName = type + id
						let value = cache.get(keyName)
						if (value === undefined && fileData[keyName] !== undefined) {
							value = fileData[keyName]
							cache.set(keyName, value)
						}
						if (type === 'app-state-sync-key' && value) {
							value = proto.Message.AppStateSyncKeyData.fromObject(value)
						}
						data[id] = value
					}
					return data as any
				},
				set: (data: Record<string, Record<string, unknown>>) => {
					for (const category in data) {
						for (const id in data[category]) {
							const keyName = category + id
							const value = data[category][id]
							value ? writeKey(keyName, value) : removeKey(keyName)
						}
					}
				}
			}
		},
		saveCreds: () => writeKey('creds', creds)
	}
}
