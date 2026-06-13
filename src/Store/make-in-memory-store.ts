import { proto } from '../../WAProto/index.js'
import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js'
import type { Label } from '../Types/Label.js'
import { LabelAssociationType } from '../Types/LabelAssociation.js'
import type { LabelAssociation } from '../Types/LabelAssociation.js'
import type {
	BaileysEventEmitter,
	Chat,
	Contact,
	GroupMetadata,
	PresenceData,
	WAMessage,
	WAMessageCursor,
	WAMessageKey
} from '../Types/index.js'
import { toNumber, updateMessageWithReaction, updateMessageWithReceipt } from '../Utils/index.js'
import { jidNormalizedUser } from '../WABinary/index.js'
import type { Logger } from 'pino'
import { makeOrderedDictionary } from './make-ordered-dictionary.js'
import { ObjectRepository } from './object-repository.js'

export type BaileysInMemoryStoreConfig = {
	logger?: Logger
}

export const waChatKey = (pin: boolean) => ({
	key: (c: Chat) =>
		(pin ? (c.pinned ? '1' : '0') : '') +
		(c.archived ? '0' : '1') +
		(c.conversationTimestamp ? c.conversationTimestamp.toString(16).padStart(8, '0') : '') +
		c.id,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
})

export const waMessageID = (m: WAMessage) => m.key.id || ''

export const waLabelAssociationKey = {
	key: (la: LabelAssociation) =>
		la.type === LabelAssociationType.Chat
			? la.chatId + la.labelId
			: la.chatId + (la as Extract<LabelAssociation, { messageId: string }>).messageId + la.labelId,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
}

const makeMessagesDictionary = () => makeOrderedDictionary(waMessageID)

/**
 * Simple in-memory store that subscribes to Baileys events and keeps
 * chats, contacts, messages, groups, presences, and labels up to date.
 *
 * @example
 * const store = makeInMemoryStore({})
 * store.readFromFile('./baileys_store.json')
 * setInterval(() => store.writeToFile('./baileys_store.json'), 10_000)
 * store.bind(sock.ev)
 */
export const makeInMemoryStore = (config: BaileysInMemoryStoreConfig) => {
	const logger = config.logger ?? DEFAULT_CONNECTION_CONFIG.logger.child({ stream: 'in-mem-store' })

	const chats: { [id: string]: Chat } = {}
	const messages: { [jid: string]: ReturnType<typeof makeMessagesDictionary> } = {}
	const contacts: { [id: string]: Contact } = {}
	const groupMetadata: { [id: string]: GroupMetadata } = {}
	const presences: { [id: string]: { [participant: string]: PresenceData } } = {}
	const labels = new ObjectRepository<Label>()
	const labelAssociations: LabelAssociation[] = []

	const assertMessageList = (jid: string) => {
		if (!messages[jid]) messages[jid] = makeMessagesDictionary()
		return messages[jid]
	}

	const contactsUpsert = (newContacts: Contact[]) => {
		for (const c of newContacts) contacts[c.id] = { ...(contacts[c.id] ?? {}), ...c }
	}

	const bind = (ev: BaileysEventEmitter) => {
		ev.on(
			'messaging-history.set',
			({ chats: newChats, contacts: newContacts, messages: newMessages, isLatest, syncType }) => {
				if (syncType === proto.HistorySync.HistorySyncType.ON_DEMAND) return
				if (isLatest) {
					for (const id of Object.keys(chats)) delete chats[id]
					for (const jid of Object.keys(messages)) delete messages[jid]
				}
				for (const chat of newChats) {
					const cid = chat.id
					if (cid && !chats[cid]) chats[cid] = chat
				}
				contactsUpsert(newContacts)
				for (const msg of newMessages) {
					const remoteJid = msg.key?.remoteJid
					if (remoteJid) assertMessageList(remoteJid).upsert(msg as WAMessage, 'prepend')
				}
				logger.debug(
					{ chats: newChats.length, contacts: newContacts.length, messages: newMessages.length },
					'history set'
				)
			}
		)

		ev.on('contacts.upsert', contactsUpsert)

		ev.on('contacts.update', updates => {
			for (const update of updates) {
				const id = update.id
				if (id && contacts[id]) Object.assign(contacts[id], update)
			}
		})

		ev.on('chats.upsert', newChats => {
			for (const chat of newChats) {
				const cid = chat.id
				if (cid) chats[cid] = { ...(chats[cid] ?? {}), ...chat }
			}
		})

		ev.on('chats.update', updates => {
			for (const upd of updates) {
				const id = upd.id
				if (!id) continue
				if (chats[id]) {
					const extra =
						(upd.unreadCount ?? 0) > 0 ? { unreadCount: (chats[id].unreadCount ?? 0) + (upd.unreadCount ?? 0) } : {}
					Object.assign(chats[id], upd, extra)
				}
			}
		})

		ev.on('chats.delete', ids => {
			for (const id of ids) delete chats[id]
		})

		ev.on('labels.edit', (label: Label) => {
			if ((label as Label & { deleted?: boolean }).deleted) labels.deleteById(label.id)
			else labels.upsertById(label.id, label)
		})

		ev.on('labels.association', ({ type, association }: { type: string; association: LabelAssociation }) => {
			if (type === 'add') {
				labelAssociations.push(association)
			} else if (type === 'remove') {
				const key = waLabelAssociationKey.key(association)
				const idx = labelAssociations.findIndex(la => waLabelAssociationKey.key(la) === key)
				if (idx >= 0) labelAssociations.splice(idx, 1)
			}
		})

		ev.on('presence.update', ({ id, presences: update }) => {
			presences[id] = { ...(presences[id] ?? {}), ...update }
		})

		ev.on('messages.upsert', ({ messages: newMessages, type }) => {
			if (type === 'append' || type === 'notify') {
				for (const msg of newMessages) {
					const remoteJid = msg.key?.remoteJid
					if (!remoteJid) continue
					const jid = jidNormalizedUser(remoteJid)
					assertMessageList(jid).upsert(msg as WAMessage, 'append')
					if (type === 'notify' && !chats[jid]) {
						ev.emit('chats.upsert', [
							{ id: jid, conversationTimestamp: toNumber(msg.messageTimestamp ?? 0), unreadCount: 1 }
						])
					}
				}
			}
		})

		ev.on('messages.update', updates => {
			for (const { update, key } of updates) {
				const remoteJid = key?.remoteJid
				if (!remoteJid) continue
				const list = assertMessageList(jidNormalizedUser(remoteJid))
				if (update?.status) {
					const stored = list.get(key.id ?? '')?.status
					if (stored != null && update.status <= stored) delete update.status
				}
				if (!list.updateAssign(key.id ?? '', update)) {
					logger.debug({ update }, 'update for non-existent message')
				}
			}
		})

		ev.on('messages.delete', item => {
			if ('all' in item) {
				messages[item.jid]?.clear()
			} else {
				const remoteJid = item.keys[0]?.remoteJid
				if (!remoteJid) return
				const list = messages[remoteJid]
				if (list) {
					const idSet = new Set(item.keys.map(k => k.id))
					list.filter(m => !idSet.has(m.key.id))
				}
			}
		})

		ev.on('groups.upsert', newGroups => {
			for (const g of newGroups) groupMetadata[g.id] = g
		})

		ev.on('groups.update', updates => {
			for (const update of updates) {
				const id = update.id
				if (id && groupMetadata[id]) Object.assign(groupMetadata[id], update)
			}
		})

		ev.on('group-participants.update', ({ id, participants, action }) => {
			const meta = groupMetadata[id]
			if (!meta) return
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const ids = participants.map((p: any) => (typeof p === 'string' ? p : (p.id ?? p.phoneNumber)))
			switch (action) {
				case 'add':
					meta.participants.push(
						...ids.map((pid: string) => ({ id: pid, admin: null as 'admin' | 'superadmin' | null }))
					)
					break
				case 'remove':
					meta.participants = meta.participants.filter(p => !ids.includes(p.id))
					break
				case 'promote':
					for (const p of meta.participants) if (ids.includes(p.id)) p.admin = 'admin'
					break
				case 'demote':
					for (const p of meta.participants) if (ids.includes(p.id)) p.admin = null
					break
			}
		})

		ev.on('message-receipt.update', updates => {
			for (const { key, receipt } of updates) {
				const remoteJid = key?.remoteJid
				if (!remoteJid) continue
				const msg = messages[remoteJid]?.get(key.id ?? '')
				if (msg) updateMessageWithReceipt(msg, receipt)
			}
		})

		ev.on('messages.reaction', reactions => {
			for (const { key, reaction } of reactions) {
				const remoteJid = key?.remoteJid
				if (!remoteJid) continue
				const msg = messages[remoteJid]?.get(key.id ?? '')
				if (msg) updateMessageWithReaction(msg, reaction)
			}
		})
	}

	const toJSON = () => ({
		chats: Object.values(chats),
		contacts,
		messages: Object.fromEntries(Object.entries(messages).map(([jid, dict]) => [jid, dict.array])),
		labels: labels.toJSON(),
		labelAssociations
	})

	const fromJSON = (json: {
		chats?: Chat[]
		contacts?: { [id: string]: Contact }
		messages?: { [jid: string]: proto.IWebMessageInfo[] }
		labels?: Label[]
		labelAssociations?: LabelAssociation[]
	}) => {
		for (const chat of json.chats ?? []) {
			const cid = chat.id
			if (cid) chats[cid] = chat
		}
		if (json.contacts) Object.assign(contacts, json.contacts)
		for (const jid in json.messages ?? {}) {
			const list = assertMessageList(jid)
			for (const msg of (json.messages ?? {})[jid] ?? []) {
				list.upsert(msg as WAMessage, 'append')
			}
		}
		for (const label of json.labels ?? []) labels.upsertById(label.id, label)
		for (const la of json.labelAssociations ?? []) labelAssociations.push(la)
	}

	return {
		chats,
		contacts,
		messages,
		groupMetadata,
		presences,
		labels,
		labelAssociations,
		bind,
		loadMessages: async (jid: string, count: number, cursor: WAMessageCursor) => {
			const list = assertMessageList(jid)
			const mode = !cursor || 'before' in cursor ? 'before' : 'after'
			const cursorKey = cursor ? ('before' in cursor ? cursor.before : cursor.after) : undefined
			if (mode === 'before') {
				const arr = list.array
				const idx = cursorKey ? arr.findIndex(m => m.key.id === cursorKey?.id) : arr.length
				const end = idx >= 0 ? idx : arr.length
				return arr.slice(Math.max(0, end - count), end)
			}
			return []
		},
		loadMessage: async (jid: string, id: string) => messages[jid]?.get(id),
		mostRecentMessage: async (jid: string) => messages[jid]?.array.slice(-1)[0],
		getMessage: async (key: WAMessageKey): Promise<proto.IMessage | undefined> => {
			const remoteJid = key?.remoteJid
			if (!remoteJid) return undefined
			return messages[jidNormalizedUser(remoteJid)]?.get(key.id ?? '')?.message ?? undefined
		},
		fetchGroupMetadata: async (jid: string, sock: { groupMetadata(jid: string): Promise<GroupMetadata> } | null) => {
			if (!groupMetadata[jid] && sock) {
				const meta = await sock.groupMetadata(jid)
				if (meta) groupMetadata[jid] = meta
			}
			return groupMetadata[jid]
		},
		getChatLabels: (chatId: string) => labelAssociations.filter(la => la.chatId === chatId),
		getMessageLabels: (messageId: string) =>
			labelAssociations
				.filter(
					la =>
						la.type === LabelAssociationType.Message &&
						(la as Extract<LabelAssociation, { messageId: string }>).messageId === messageId
				)
				.map(la => la.labelId),
		toJSON,
		fromJSON,
		writeToFile: (path: string) => {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			require('fs').writeFileSync(path, JSON.stringify(toJSON()))
		},
		readFromFile: (path: string) => {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { readFileSync, existsSync } = require('fs')
			if (existsSync(path)) {
				logger.debug({ path }, 'reading store from file')
				fromJSON(JSON.parse(readFileSync(path, 'utf-8')))
			}
		}
	}
}
