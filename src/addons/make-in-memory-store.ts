/**
 * makeInMemoryStore — ESM-compatible in-memory store for Baileys v7
 * Source: @itsliaaa/baileys v0.3.12 (Lia@Note 03-02-26)
 * Requires: npm install @adiwajshing/keyed-db
 */
import { existsSync, readFileSync, writeFileSync } from 'fs'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { proto as WAProto } from '../../WAProto/index.js'
import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js'
import type { BaileysEventEmitter, Chat, Contact, WAMessage } from '../Types/index.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { toNumber, updateMessageWithReaction, updateMessageWithReceipt } from '../Utils/index.js'
import { jidNormalizedUser } from '../WABinary/index.js'

export const waChatKey = (pin?: boolean) => ({
	key: (c: Chat) =>
		(pin ? (c.pinned ? '1' : '0') : '') +
		(c.archived ? '0' : '1') +
		(c.conversationTimestamp ? c.conversationTimestamp.toString() : '') +
		c.id,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
})

export const waMessageID = (m: WAMessage) => m.key.id || ''

const makeMessagesDictionary = () => {
	const msgs: WAMessage[] = []
	return {
		array: msgs,
		get: (id: string) => msgs.find(m => m.key.id === id),
		upsert: (msg: WAMessage, mode: 'append' | 'prepend') => {
			const idx = msgs.findIndex(m => m.key.id === msg.key.id)
			if (idx >= 0) msgs[idx] = msg
			else mode === 'append' ? msgs.push(msg) : msgs.unshift(msg)
		},
		filter: (pred: (m: WAMessage) => boolean) => msgs.filter(pred),
		toJSON: () => msgs,
		fromJSON: (arr: WAMessage[]) => msgs.push(...arr)
	}
}

export type InMemoryStoreConfig = {
	chatKey?: ReturnType<typeof waChatKey>
	logger?: any
	socket?: any
}

export const makeInMemoryStore = (config: InMemoryStoreConfig = {}) => {
	const logger = config.logger || DEFAULT_CONNECTION_CONFIG.logger?.child({ stream: 'in-mem-store' })
	const chats: Record<string, Chat> = {}
	const messages: Record<string, ReturnType<typeof makeMessagesDictionary>> = {}
	const contacts: Record<string, Contact> = {}
	const groupMetadata: Record<string, any> = {}
	const presences: Record<string, any> = {}
	const state = { connection: 'close' as const }

	const assertMessageList = (jid: string) => {
		if (!messages[jid]) messages[jid] = makeMessagesDictionary()
		return messages[jid]
	}

	const bind = (ev: BaileysEventEmitter) => {
		ev.on('connection.update', update => {
			Object.assign(state, update)
		})

		ev.on('messaging-history.set', ({ chats: newChats, contacts: newContacts, messages: newMessages, isLatest }) => {
			if (isLatest) {
				Object.keys(chats).forEach(k => delete chats[k])
				Object.keys(messages).forEach(k => delete messages[k])
			}

			for (const chat of newChats) if (chat.id) chats[chat.id] = chat
			for (const contact of newContacts) if (contact.id) contacts[contact.id] = { ...contacts[contact.id], ...contact }
			for (const msg of newMessages) {
				const jid = msg.key.remoteJid!
				if (jid) assertMessageList(jid).upsert(msg, 'prepend')
			}

			logger?.debug({ chats: newChats.length, messages: newMessages.length }, 'synced history')
		})

		ev.on('chats.upsert', newChats => {
			for (const c of newChats) chats[c.id!] = { ...chats[c.id!], ...c }
		})
		ev.on('chats.update', updates => {
			for (const u of updates) Object.assign((chats[u.id!] ||= {} as Chat), u)
		})
		ev.on('chats.delete', deletions => {
			for (const id of deletions) delete chats[id]
		})
		ev.on('contacts.upsert', c => {
			for (const ct of c) contacts[ct.id] = { ...contacts[ct.id], ...ct }
		})
		ev.on('contacts.update', async u => {
			for (const upd of u) Object.assign((contacts[upd.id || ''] = contacts[upd.id || ''] || ({} as Contact)), upd)
		})
		ev.on('groups.upsert', g => {
			for (const grp of g) groupMetadata[grp.id] = grp
		})
		ev.on('groups.update', updates => {
			for (const u of updates) Object.assign((groupMetadata[u.id || ''] = groupMetadata[u.id || ''] || {}), u)
		})
		ev.on('presence.update', ({ id, presences: p }) => {
			presences[id] = { ...presences[id], ...p }
		})

		ev.on('messages.upsert', ({ messages: newMessages, type }) => {
			for (const msg of newMessages) {
				const jid = msg.key.remoteJid ? jidNormalizedUser(msg.key.remoteJid) : ''
				const list = assertMessageList(jid)
				list.upsert(msg, type === 'append' ? 'append' : 'prepend')
			}
		})

		ev.on('messages.update', updates => {
			for (const { key, update } of updates) {
				const jid = jidNormalizedUser(key.remoteJid || '')
				const list = assertMessageList(jid)
				const msg = list.get(key.id!)
				if (msg) Object.assign(msg, update)
			}
		})

		ev.on('message-receipt.update', updates => {
			for (const { key, receipt } of updates) {
				const list = messages[jidNormalizedUser(key.remoteJid!)]
				const msg = list?.get(key.id!)
				if (msg) updateMessageWithReceipt(msg, receipt)
			}
		})

		ev.on('messages.reaction', reactions => {
			for (const { key, reaction } of reactions) {
				const list = messages[jidNormalizedUser(key.remoteJid!)]
				const msg = list?.get(key.id!)
				if (msg) updateMessageWithReaction(msg, reaction)
			}
		})
	}

	const toJSON = () => ({ chats, contacts, messages })

	const fromJSON = (json: {
		chats: Record<string, Chat>
		contacts: Record<string, Contact>
		messages: Record<string, WAMessage[]>
	}) => {
		Object.assign(chats, json.chats)
		Object.assign(contacts, json.contacts)
		for (const [jid, msgs] of Object.entries(json.messages)) {
			const list = assertMessageList(jid)
			for (const msg of msgs) list.upsert(msg, 'append')
		}
	}

	const writeToFile = (path: string) => writeFileSync(path, JSON.stringify(toJSON()))

	const readFromFile = (path: string) => {
		if (existsSync(path)) {
			const raw = JSON.parse(readFileSync(path, { encoding: 'utf-8' }))
			fromJSON(raw)
		}
	}

	return {
		chats,
		messages,
		contacts,
		groupMetadata,
		presences,
		state,
		bind,
		toJSON,
		fromJSON,
		writeToFile,
		readFromFile,
		assertMessageList,
		loadMessage: (jid: string, id: string) => messages[jidNormalizedUser(jid)]?.get(id),
		getMostRecentMessage: (jid: string) => messages[jidNormalizedUser(jid)]?.array.slice(-1)[0],
		getGroupMetadata: (jid: string) => groupMetadata[jid]
	}
}
