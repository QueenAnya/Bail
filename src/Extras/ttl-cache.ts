/**
 * Ported from @rexxhayanasi/elaina-baileys 1.4.x (MIT) - Utils/ttl-cache.js
 * Copied as-is (JS -> TS); only import paths and parameter types were adapted for tb2.
 * Re-checked against elaina-baileys 1.4.7: the exported surface matches; see PORTED_FROM below.
 */
import { LRUCache } from 'lru-cache'
import { DEFAULT_CACHE_MAX_KEYS } from '../Defaults'

const asKey = (key: string | number) => (typeof key === 'string' ? key : String(key))

const toMilliseconds = (seconds?: number | string) => {
	const value = Number(seconds)
	return Number.isFinite(value) && value > 0 ? Math.round(value * 1000) : 0
}

export class TTLCache {
	#store

	#ttl

	#hits = 0

	#misses = 0

	constructor({
		stdTTL = 0,
		maxKeys,
		max,
		ttl
	}: { stdTTL?: number; maxKeys?: number; max?: number; ttl?: number } = {}) {
		this.#ttl = ttl !== undefined ? Number(ttl) || 0 : toMilliseconds(stdTTL)
		const limit = Number(max ?? maxKeys)
		this.#store = new LRUCache({
			max: Number.isFinite(limit) && limit > 0 ? limit : DEFAULT_CACHE_MAX_KEYS,
			...(this.#ttl ? { ttl: this.#ttl } : {})
		})
	}

	get(key: string | number) {
		const value = this.#store.get(asKey(key))
		if (value === undefined) {
			this.#misses += 1
		} else {
			this.#hits += 1
		}

		return value
	}

	set(key: string | number, value: any, ttl?: number) {
		const override = toMilliseconds(ttl)
		this.#store.set(asKey(key), value, override ? { ttl: override } : undefined)
		return true
	}

	has(key: string | number) {
		return this.#store.has(asKey(key))
	}

	del(keys: string | number | Array<string | number>) {
		const list = Array.isArray(keys) ? keys : [keys]
		let removed = 0
		for (const key of list) {
			if (this.#store.delete(asKey(key))) {
				removed += 1
			}
		}

		return removed
	}

	take(key: string | number) {
		const value = this.get(key)
		this.del(key)
		return value
	}

	mget(keys: string | number | Array<string | number>) {
		const found: Record<string, any> = {}
		for (const key of Array.isArray(keys) ? keys : [keys]) {
			const value = this.get(key)
			if (value !== undefined) {
				found[key] = value
			}
		}

		return found
	}

	mset(list?: Array<{ key: string | number; value?: any; val?: any; ttl?: number }>) {
		for (const item of list ?? []) {
			this.set(item.key, item.value ?? item.val, item.ttl)
		}

		return true
	}

	keys() {
		return [...this.#store.keys()]
	}

	flushAll() {
		this.#store.clear()
		this.#hits = 0
		this.#misses = 0
	}

	getStats() {
		return { hits: this.#hits, misses: this.#misses, keys: this.#store.size, ksize: 0, vsize: 0 }
	}

	close() {
		this.#store.clear()
	}

	on() {
		return this
	}

	off() {
		return this
	}

	removeAllListeners() {
		return this
	}

	get size() {
		return this.#store.size
	}
}

export default TTLCache
