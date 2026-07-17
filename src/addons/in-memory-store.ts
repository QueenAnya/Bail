/**
 * addon: in-memory-store
 *
 * A minimal in-memory data store for chats, contacts, and messages —
 * reintroduced for developers who want a quick starting point without
 * building their own persistence layer from scratch.
 *
 * Important: for anything beyond quick prototyping, build your own store.
 * Keeping someone's entire chat history in memory is a lot of RAM for
 * not much benefit once your bot has real usage.
 */

import { readFileSync, writeFileSync } from 'fs'
import type { BaileysEventEmitter, Chat, Contact, WAMessage, WAMessageKey } from '../Types'
import type { ILogger } from '../Utils/logger'

export type InMemoryStoreConfig = {
	logger?: ILogger
	/** max messages retained per chat (default: 200) */
	maxMessagesPerChat?: number
}

/** Minimal KeyedDB-like wrapper so `.all()` reads naturally, like the old Baileys store. */
class KeyedCollection<T extends Record<string, any>> {
	private map = new Map<string, T>()
	constructor(private keyFn: (item: T) => string) {}

	all(): T[] {
		return [...this.map.values()]
	}

	get(id: string): T | undefined {
		return this.map.get(id)
	}

	upsert(...items: T[]): void {
		for (const item of items) {
			const key = this.keyFn(item)
			this.map.set(key, { ...(this.map.get(key) || {}), ...item })
		}
	}

	update(...items: Partial<T>[]): void {
		for (const item of items) {
			const key = this.keyFn(item as T)
			const existing = this.map.get(key)
			if (existing) this.map.set(key, { ...existing, ...item })
		}
	}

	delete(id: string): void {
		this.map.delete(id)
	}

	toJSON(): T[] {
		return this.all()
	}

	fromJSON(items: T[]): void {
		this.map.clear()
		for (const item of items || []) {
			this.map.set(this.keyFn(item), item)
		}
	}
}

export type InMemoryStore = {
	chats: KeyedCollection<Chat>
	contacts: { [jid: string]: Contact }
	messages: Map<string, WAMessage[]>
	bind: (ev: BaileysEventEmitter) => void
	readFromFile: (path: string) => void
	writeToFile: (path: string) => void
	loadMessages: (jid: string, count: number) => WAMessage[]
	loadMessage: (jid: string, id: string) => WAMessage | undefined
}

export const makeInMemoryStore = (config?: InMemoryStoreConfig): InMemoryStore => {
	const { logger, maxMessagesPerChat = 200 } = config || {}

	const chats = new KeyedCollection<Chat>(c => c.id!)
	const contacts: { [jid: string]: Contact } = {}
	const messages = new Map<string, WAMessage[]>()

	const upsertMessages = (jid: string, msgs: WAMessage[]) => {
		const arr = messages.get(jid) || []
		for (const msg of msgs) {
			const idx = arr.findIndex(m => m.key.id === msg.key.id)
			if (idx >= 0) arr[idx] = msg
			else arr.push(msg)
		}

		if (arr.length > maxMessagesPerChat) {
			arr.splice(0, arr.length - maxMessagesPerChat)
		}

		messages.set(jid, arr)
	}

	const bind = (ev: BaileysEventEmitter) => {
		ev.on('chats.upsert', newChats => chats.upsert(...newChats))
		ev.on('chats.update', updates => chats.update(...(updates as Partial<Chat>[])))
		ev.on('chats.delete', ids => {
			for (const id of ids) chats.delete(id)
		})

		ev.on('contacts.upsert', newContacts => {
			for (const c of newContacts) {
				if (c.id) contacts[c.id] = { ...contacts[c.id], ...c }
			}
		})
		ev.on('contacts.update', updates => {
			for (const c of updates) {
				if (c.id) contacts[c.id] = { ...contacts[c.id], ...c } as Contact
			}
		})

		ev.on('messages.upsert', ({ messages: msgs }) => {
			const byJid = new Map<string, WAMessage[]>()
			for (const msg of msgs) {
				const jid = msg.key.remoteJid!
				if (!jid) continue
				const arr = byJid.get(jid) || []
				arr.push(msg)
				byJid.set(jid, arr)
			}

			for (const [jid, arr] of byJid) upsertMessages(jid, arr)
		})

		ev.on('messages.update', updates => {
			for (const { key, update } of updates) {
				const jid = key.remoteJid
				if (!jid) continue
				const arr = messages.get(jid)
				const existing = arr?.find(m => m.key.id === key.id)
				if (existing) Object.assign(existing, update)
			}
		})

		ev.on('messages.delete', item => {
			if ('all' in item && item.all) {
				messages.delete(item.jid)
				return
			}

			const keys = (item as { keys: WAMessageKey[] }).keys
			for (const key of keys) {
				const jid = key.remoteJid
				if (!jid) continue
				const arr = messages.get(jid)
				if (!arr) continue
				const idx = arr.findIndex(m => m.key.id === key.id)
				if (idx >= 0) arr.splice(idx, 1)
			}
		})

		logger?.debug?.('in-memory store bound to socket events')
	}

	const loadMessages = (jid: string, count: number): WAMessage[] => {
		const arr = messages.get(jid) || []
		return arr.slice(Math.max(0, arr.length - count))
	}

	const loadMessage = (jid: string, id: string): WAMessage | undefined => {
		return messages.get(jid)?.find(m => m.key.id === id)
	}

	const writeToFile = (path: string) => {
		const json = {
			chats: chats.toJSON(),
			contacts,
			messages: Object.fromEntries(messages)
		}
		writeFileSync(path, JSON.stringify(json))
	}

	const readFromFile = (path: string) => {
		try {
			const json = JSON.parse(readFileSync(path, 'utf-8'))
			chats.fromJSON(json.chats || [])
			Object.assign(contacts, json.contacts || {})
			messages.clear()
			for (const [jid, arr] of Object.entries(json.messages || {})) {
				messages.set(jid, arr as WAMessage[])
			}
		} catch (err) {
			logger?.warn?.({ err }, 'failed to read store from file')
		}
	}

	return { chats, contacts, messages, bind, readFromFile, writeToFile, loadMessages, loadMessage }
}
