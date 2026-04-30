/**
 * Anti-Delete System
 * Caches messages so that when they are deleted, the original content is preserved
 * and an event can be emitted with the original message.
 */

import type { WAMessage, WAMessageKey } from '../Types'

export type AntiDeleteEntry = {
	message: WAMessage
	cachedAt: number
}

export type AntiDeleteOptions = {
	/** Maximum number of messages to cache per chat (default: 100) */
	maxPerChat?: number
	/** Max age in ms before a cached message is evicted (default: 48h) */
	maxAgeMs?: number
	/** Only cache messages from groups */
	groupOnly?: boolean
	/** Only cache messages from private chats */
	privateOnly?: boolean
}

const DEFAULT_MAX_PER_CHAT = 100
const DEFAULT_MAX_AGE = 48 * 60 * 60 * 1000

/** cache: chatJid -> messageId -> entry */
const cache = new Map<string, Map<string, AntiDeleteEntry>>()

let options: AntiDeleteOptions = {}

/**
 * Configure the anti-delete system
 */
export const configureAntiDelete = (opts: AntiDeleteOptions): void => {
	options = opts
}

/**
 * Cache a message for anti-delete tracking
 */
export const cacheMessageForAntiDelete = (message: WAMessage): void => {
	const jid = message.key.remoteJid
	const id = message.key.id
	if (!jid || !id) return
	if (!message.message) return

	if (!cache.has(jid)) cache.set(jid, new Map())
	const chatCache = cache.get(jid)!

	const maxPerChat = options.maxPerChat ?? DEFAULT_MAX_PER_CHAT

	// Evict oldest if over limit
	if (chatCache.size >= maxPerChat) {
		const oldest = [...chatCache.entries()].sort((a, b) => a[1].cachedAt - b[1].cachedAt)[0]
		if (oldest) chatCache.delete(oldest[0])
	}

	chatCache.set(id, { message, cachedAt: Date.now() })
}

/**
 * Retrieve the original message when a delete is detected.
 * Returns null if the message was not cached.
 */
export const getAntiDeletedMessage = (key: WAMessageKey): WAMessage | null => {
	const jid = key.remoteJid
	const id = key.id
	if (!jid || !id) return null

	const chatCache = cache.get(jid)
	if (!chatCache) return null

	const entry = chatCache.get(id)
	if (!entry) return null

	const maxAge = options.maxAgeMs ?? DEFAULT_MAX_AGE
	if (Date.now() - entry.cachedAt > maxAge) {
		chatCache.delete(id)
		return null
	}

	return entry.message
}

/**
 * Manually remove a message from the anti-delete cache
 */
export const removeFromAntiDeleteCache = (key: WAMessageKey): void => {
	const jid = key.remoteJid
	const id = key.id
	if (jid && id) cache.get(jid)?.delete(id)
}

/**
 * Clear all cached messages for a given chat
 */
export const clearAntiDeleteCacheForChat = (jid: string): void => {
	cache.delete(jid)
}

/**
 * Clear all anti-delete caches
 */
export const clearAllAntiDeleteCaches = (): void => {
	cache.clear()
}

/**
 * Run periodic eviction of stale entries.
 * Call this e.g. every 30 minutes.
 */
export const evictStaleAntiDeleteEntries = (): void => {
	const maxAge = options.maxAgeMs ?? DEFAULT_MAX_AGE
	const now = Date.now()
	for (const [jid, chatCache] of cache.entries()) {
		for (const [id, entry] of chatCache.entries()) {
			if (now - entry.cachedAt > maxAge) chatCache.delete(id)
		}
		if (chatCache.size === 0) cache.delete(jid)
	}
}
