/**
 * makeInMemoryStore — minimal in-memory data store for Baileys v7 (rc12).
 *
 * Converted to ESM TypeScript from @whiskeysockets/baileys v6.7.16.
 * Adapted for v7 compatibility by @itsliaaa/baileys.
 *
 * @example
 * const store = await makeInMemoryStore({ logger })
 * store.bind(sock.ev)
 * const chat = store.chats.get('123@s.whatsapp.net')
 */

import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js'
import type { BaileysEventEmitter, Chat, Contact, PresenceData, WAMessage } from '../Types/index.js'
import { WAProto } from '../Types/index.js'
import { jidNormalizedUser } from '../WABinary/index.js'
import { toNumber } from './generics.js'
import { updateMessageWithReaction, updateMessageWithReceipt } from './messages.js'

// ─── Simple ordered dictionary (no external dep needed) ───────────────────────

class OrderedDictionary<T> {
	private dict = new Map<string, T>()
	private arr: T[] = []
	private getId: (item: T) => string

	constructor(getId: (item: T) => string) {
		this.getId = getId
	}

	get array() {
		return this.arr
	}
	get size() {
		return this.arr.length
	}

	get(id: string) {
		return this.dict.get(id)
	}
	has(id: string) {
		return this.dict.has(id)
	}
	deleteById(id: string) {
		const v = this.dict.get(id)
		if (v) {
			this.dict.delete(id)
			this.arr = this.arr.filter(x => this.getId(x) !== id)
		}
	}
	upsert(item: T, mode: 'prepend' | 'append' = 'append') {
		const id = this.getId(item)
		if (this.dict.has(id)) {
			Object.assign(this.dict.get(id)!, item)
			return
		}

		this.dict.set(id, item)
		if (mode === 'prepend') this.arr.unshift(item)
		else this.arr.push(item)
	}
	clear() {
		this.dict.clear()
		this.arr = []
	}
	filter(fn: (item: T) => boolean) {
		return this.arr.filter(fn)
	}
}

// ─── Simple keyed DB for chats ────────────────────────────────────────────────

class KeyedChatStore {
	private map = new Map<string, Chat>()
	private key: { key: (c: Chat) => string; compare: (a: string, b: string) => number }

	constructor(key: { key: (c: Chat) => string; compare: (a: string, b: string) => number }) {
		this.key = key
	}

	get(id: string) {
		return this.map.get(id)
	}
	has(id: string) {
		return this.map.has(id)
	}
	clear() {
		this.map.clear()
	}
	deleteById(id: string) {
		this.map.delete(id)
	}

	get all() {
		return Array.from(this.map.values()).sort((a, b) => this.key.compare(this.key.key(a), this.key.key(b)))
	}

	insertIfAbsent(...chats: Chat[]) {
		const added: Chat[] = []
		for (const c of chats) {
			if (!c.id) continue
			if (!this.map.has(c.id)) {
				this.map.set(c.id, c)
				added.push(c)
			}
		}

		return added
	}

	upsert(chat: Chat) {
		if (!chat.id) return
		this.map.set(chat.id, Object.assign(this.map.get(chat.id) ?? {}, chat))
	}
}

// ─── waChatKey ────────────────────────────────────────────────────────────────

export const waChatKey = (pin = true) => ({
	key: (c: Chat) =>
		(pin ? (c.pinned ? '1' : '0') : '') +
		(c.archived ? '0' : '1') +
		(c.conversationTimestamp ? c.conversationTimestamp.toString(16).padStart(8, '0') : '') +
		c.id,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
})

export const waMessageID = (m: WAMessage) => m.key.id ?? ''

// ─── Config ───────────────────────────────────────────────────────────────────

export interface InMemoryStoreConfig {
	socket?: any
	logger?: any
	chatKey?: ReturnType<typeof waChatKey>
}

// ─── makeInMemoryStore ────────────────────────────────────────────────────────

export const makeInMemoryStore = (config: InMemoryStoreConfig = {}) => {
	void config.logger // suppress unused warning
	const chatKey = config.chatKey ?? waChatKey(true)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const logger = config.logger ?? (DEFAULT_CONNECTION_CONFIG.logger as any).child({ stream: 'in-mem-store' })
	const socket = config.socket

	const chats = new KeyedChatStore(chatKey)
	const messages: Record<string, OrderedDictionary<WAMessage>> = {}
	const contacts: Record<string, Contact> = {}
	const groupMetadata: Record<string, any> = {}
	const presences: Record<string, Record<string, PresenceData>> = {}
	const state: Record<string, any> = { connection: 'close' }

	const assertMessages = (jid: string) => {
		if (!messages[jid]) messages[jid] = new OrderedDictionary(waMessageID)
		return messages[jid]
	}

	const contactsUpsert = (newContacts: Contact[]) => {
		const old = new Set(Object.keys(contacts))
		for (const c of newContacts) {
			old.delete(c.id)
			contacts[c.id] = Object.assign(contacts[c.id] ?? {}, c)
		}

		return old
	}

	const bind = (ev: BaileysEventEmitter) => {
		ev.on('connection.update', u => Object.assign(state, u))

		ev.on('messaging-history.set', ({ chats: nc, contacts: ncon, messages: nm, isLatest, syncType }) => {
			if ((syncType as any) === WAProto?.HistorySync?.HistorySyncType?.ON_DEMAND) return
			if (isLatest) {
				chats.clear()
				for (const id in messages) delete messages[id]
			}

			chats.insertIfAbsent(...nc)
			const oldC = contactsUpsert(ncon)
			if (isLatest) {
				for (const jid of oldC) delete contacts[jid]
			}

			for (const msg of nm) {
				const jid = jidNormalizedUser((msg.key as any).remoteJidAlt ?? msg.key.remoteJid!)
				assertMessages(jid).upsert(msg, 'prepend')
			}
		})

		ev.on('contacts.upsert', c => contactsUpsert(c))
		ev.on('contacts.update', async updates => {
			for (const u of updates) {
				if (!u.id) continue
				const c = contacts[u.id]
				if (!c) continue
				if (u.imgUrl === 'changed')
					c.imgUrl = socket ? await socket.profilePictureUrl?.(c.id).catch(() => undefined) : undefined
				else if (u.imgUrl === 'removed') delete c.imgUrl
				else Object.assign(c, u)
			}
		})

		ev.on('chats.upsert', nc => {
			for (const c of nc) chats.upsert(c)
		})
		ev.on('chats.update', updates => {
			for (const u of updates) {
				const c = chats.get(u.id!)
				if (c) Object.assign(c, u)
			}
		})
		ev.on('chats.delete', ids => ids.forEach(id => chats.deleteById(id)))
		ev.on('presence.update', ({ id, presences: prs }) => {
			presences[id] = presences[id] ?? {}
			Object.assign(presences[id], prs)
		})

		ev.on('messages.upsert', ({ messages: nm, type }) => {
			if (type !== 'notify' && type !== 'append') return
			for (const msg of nm) {
				const jid = jidNormalizedUser((msg.key as any).remoteJidAlt ?? msg.key.remoteJid!)
				const list = assertMessages(jid)
				list.upsert(msg, 'append')
				if (type === 'notify' && !chats.has(jid)) {
					chats.insertIfAbsent({
						id: jid,
						conversationTimestamp: toNumber(msg.messageTimestamp),
						unreadCount: 1
					})
				}
			}
		})

		ev.on('messages.update', updates => {
			for (const u of updates) {
				const list = messages[jidNormalizedUser(u.key.remoteJid!)]
				if (list) {
					const m = list.get(u.key.id!)
					if (m && u.update) Object.assign(m, u.update)
				}
			}
		})
		ev.on('messages.delete', item => {
			if ('all' in item) {
				delete messages[item.jid]
			} else {
				const list = messages[jidNormalizedUser(item.keys[0]!.remoteJid!)]
				if (list) for (const k of item.keys) list.deleteById(k.id!)
			}
		})
		ev.on('message-receipt.update', updates => {
			for (const u of updates) {
				const list = messages[jidNormalizedUser(u.key.remoteJid!)]
				if (list) {
					const m = list.get(u.key.id!)
					if (m) updateMessageWithReceipt(m, u.receipt)
				}
			}
		})
		ev.on('messages.reaction', updates => {
			for (const u of updates) {
				const list = messages[jidNormalizedUser(u.key.remoteJid!)]
				if (list) {
					const m = list.get(u.key.id!)
					if (m) updateMessageWithReaction(m, u.reaction)
				}
			}
		})
		ev.on('groups.update', updates => {
			for (const u of updates) {
				if (groupMetadata[u.id!]) Object.assign(groupMetadata[u.id!], u)
			}
		})
		ev.on('groups.upsert', groups => {
			for (const g of groups) groupMetadata[g.id] = g
		})
	}

	const toJSON = () => ({ chats: chats.all, contacts, messages: Object.values(messages).map(d => d.array) })
	const fromJSON = (json: { chats?: Chat[]; contacts?: Contact[]; messages?: WAMessage[][] }) => {
		chats.insertIfAbsent(...(json.chats ?? []))
		contactsUpsert(json.contacts ?? [])
		for (const msgList of json.messages ?? [])
			for (const m of msgList) {
				assertMessages(jidNormalizedUser(m.key.remoteJid!)).upsert(m, 'append')
			}
	}

	return { chats, contacts, groupMetadata, presences, state, messages, bind, toJSON, fromJSON }
}
