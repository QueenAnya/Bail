/**
 * In-Memory Store
 * Ported from innovatorssoft/Baileys
 *
 * Binds to a BaileysEventEmitter and keeps an in-memory snapshot of
 * chats, contacts, messages, group metadata, presences, labels, and LID mappings.
 *
 * Note: Requires `@adiwajshing/keyed-db` as a peer dependency.
 *
 * @example
 * const store = makeInMemoryStore({ socket: sock })
 * store.bind(sock.ev)
 * sock.ev.on('messages.upsert', ...) // store already handles this
 *
 * // Use as getMessage option:
 * makeWASocket({ getMessage: store.getMessage })
 */

import { proto } from '../../../WAProto/index.js'
import { DEFAULT_CONNECTION_CONFIG } from '../../Defaults'
import { LabelAssociationType } from '../../Types/LabelAssociation'
import { toNumber, updateMessageWithReaction, updateMessageWithReceipt } from '../../Utils'
import { jidNormalizedUser } from '../../WABinary'
import { makeOrderedDictionary } from './make-ordered-dictionary'
import { ObjectRepository } from './object-repository'
import type {
	BaileysEventEmitter,
	Chat,
	Contact,
	GroupMetadata,
	PresenceData,
	WAMessage,
	WAMessageKey
} from '../../Types'

type KeyedDB<T> = {
	upsert(...items: T[]): { inserted: T[]; updated: T[] } | void
	update(id: string, updater: (item: T) => void): boolean
	get(id: string): T | undefined
	deleteById(id: string): void
	clear(): void
	filter(predicate: (item: T) => boolean): { all(): T[] }
	insertIfAbsent(...items: T[]): T[]
	delete(item: T): boolean
	toJSON(): T[]
}

const waChatKey = (pin?: boolean) => ({
	key: (c: Chat) =>
		(pin ? (c.pinned ? '1' : '0') : '') +
		(c.archived ? '0' : '1') +
		(c.conversationTimestamp ? c.conversationTimestamp.toString().padStart(8, '0') : '') +
		c.id,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
})

const waMessageID = (m: WAMessage) => m.key.id || ''

const waLabelAssociationKey = {
	key: (la: { type: string; chatId?: string; messageId?: string; labelId?: string }) =>
		la.type === LabelAssociationType.Chat
			? (la.chatId || '') + (la.labelId || '')
			: (la.chatId || '') + (la.messageId || '') + (la.labelId || ''),
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
}

export interface InMemoryStoreConfig {
	socket?: unknown
	chatKey?: ReturnType<typeof waChatKey>
	labelAssociationKey?: typeof waLabelAssociationKey
	logger?: typeof DEFAULT_CONNECTION_CONFIG.logger
}

export const makeInMemoryStore = (config: InMemoryStoreConfig = {}) => {
	const chatKey = config.chatKey || waChatKey(true)
	const labelAssocKey = config.labelAssociationKey || waLabelAssociationKey
	const logger = config.logger || DEFAULT_CONNECTION_CONFIG.logger.child({ stream: 'in-mem-store' })

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const KeyedDB = require('@adiwajshing/keyed-db').default

	const chats: KeyedDB<Chat> = new KeyedDB(chatKey, (c: Chat) => c.id)
	const messages: Record<string, ReturnType<typeof makeOrderedDictionary<WAMessage>>> = {}
	const contacts: Record<string, Contact> = {}
	const groupMetadata: Record<string, GroupMetadata> = {}
	const presences: Record<string, Record<string, PresenceData>> = {}
	const state = { connection: 'close' as const }
	const labels = new ObjectRepository<unknown>()
	const labelAssociations: KeyedDB<unknown> = new KeyedDB(labelAssocKey, labelAssocKey.key)
	const lidMappings: Record<string, string> = {}

	const assertMessageList = (jid: string) => {
		if (!messages[jid]) {
			messages[jid] = makeOrderedDictionary<WAMessage>(waMessageID)
		}
		return messages[jid]!
	}

	const contactsUpsert = (newContacts: Contact[]) => {
		const oldContacts = new Set(Object.keys(contacts))
		for (const contact of newContacts) {
			oldContacts.delete(contact.id)
			contacts[contact.id] = Object.assign(contacts[contact.id] || {}, contact)
		}
		return oldContacts
	}

	const labelsUpsert = (newLabels: { id: string }[]) => {
		for (const label of newLabels) {
			labels.upsertById(label.id, label)
		}
	}

	const bind = (ev: BaileysEventEmitter) => {
		ev.on('connection.update', update => Object.assign(state, update))

		ev.on(
			'messaging-history.set',
			({ chats: newChats, contacts: newContacts, messages: newMessages, isLatest, syncType }) => {
				if ((syncType as number) === proto.HistorySync.HistorySyncType.ON_DEMAND) return

				if (isLatest) {
					chats.clear()
					for (const id in messages) delete messages[id]
				}

				const chatsAdded = chats.insertIfAbsent(...newChats).length
				logger.debug({ chatsAdded }, 'synced chats')

				const oldContacts = contactsUpsert(newContacts)
				if (isLatest) {
					for (const jid of oldContacts) delete contacts[jid]
				}
				logger.debug({ deletedContacts: isLatest ? oldContacts.size : 0 }, 'synced contacts')

				for (const msg of newMessages) {
					const jid = msg.key.remoteJid!
					assertMessageList(jid).upsert(msg, 'prepend')
				}
				logger.debug({ messages: newMessages.length }, 'synced messages')
			}
		)

		ev.on('contacts.upsert', newContacts => contactsUpsert(newContacts))

		ev.on('contacts.update', async updates => {
			for (const update of updates) {
				if (contacts[update.id!]) Object.assign(contacts[update.id!], update)
				else logger.debug({ update }, 'got update for non-existent contact')
			}
		})

		ev.on('chats.upsert', newChats => chats.upsert(...newChats))

		ev.on('chats.update', updates => {
			for (let update of updates) {
				const result = chats.update(update.id!, chat => {
					if ((update.unreadCount ?? 0) > 0) {
						update = { ...update }
						update.unreadCount = (chat.unreadCount || 0) + (update.unreadCount || 0)
					}
					Object.assign(chat, update)
				})
				if (!result) logger.debug({ update }, 'got update for non-existent chat')
			}
		})

		ev.on('labels.edit', label => {
			if ((label as any).deleted) return labels.deleteById((label as any).id)
			if (labels.count() < 20) return labels.upsertById((label as any).id, label)
			logger.error('Labels count exceed')
		})

		ev.on('labels.association', ({ type, association }) => {
			if (type === 'add') labelAssociations.upsert(association)
			else labelAssociations.delete(association)
		})

		ev.on('presence.update', ({ id, presences: update }) => {
			presences[id] = presences[id] || {}
			Object.assign(presences[id], update)
		})

		ev.on('chats.delete', deletions => {
			for (const item of deletions) {
				if (chats.get(item)) chats.deleteById(item)
			}
		})

		ev.on('messages.upsert', ({ messages: newMessages, type }) => {
			if (type !== 'append' && type !== 'notify') return
			for (const msg of newMessages) {
				const jid = jidNormalizedUser(msg.key.remoteJid!)
				const list = assertMessageList(jid)
				list.upsert(msg, 'append')
				if (type === 'notify' && !chats.get(jid)) {
					ev.emit('chats.upsert', [{ id: jid, conversationTimestamp: toNumber(msg.messageTimestamp), unreadCount: 1 }])
				}
			}
		})

		ev.on('messages.update', updates => {
			for (const { update, key } of updates) {
				const list = assertMessageList(jidNormalizedUser(key.remoteJid!))
				if (update?.status) {
					const stored = list.get(key.id!)?.status
					if (stored && update.status <= stored) {
						logger.debug({ update, storedStatus: stored }, 'status stored newer than update')
						delete update.status
					}
				}
				if (!list.updateAssign(key.id!, update)) {
					logger.debug({ update }, 'got update for non-existent message')
				}
			}
		})

		ev.on('messages.delete', item => {
			if ('all' in item) {
				messages[item.jid]?.clear()
			} else {
				const jid = item.keys[0]?.remoteJid!
				const list = messages[jid]
				if (list) {
					const idSet = new Set(item.keys.map(k => k.id))
					list.filter(m => !idSet.has(m.key.id))
				}
			}
		})

		ev.on('groups.upsert', newGroups => {
			for (const group of newGroups) groupMetadata[group.id] = group
		})

		ev.on('groups.update', updates => {
			for (const update of updates) {
				const id = update.id!
				if (groupMetadata[id]) Object.assign(groupMetadata[id], update)
				else logger.debug({ update }, 'got update for non-existent group metadata')
			}
		})

		ev.on('group-participants.update', ({ id, participants, action }) => {
			const metadata = groupMetadata[id]
			if (!metadata) return

			switch (action) {
				case 'add':
					metadata.participants.push(
						...participants.map((p: any) => ({
							id: typeof p === 'string' ? p : p.id || p.phoneNumber || p,
							phoneNumber: typeof p === 'object' ? p.phoneNumber : undefined,
							lid: typeof p === 'object' ? p.lid : undefined,
							admin: typeof p === 'object' ? p.admin || null : null,
							notify: typeof p === 'object' ? p.notify : undefined
						}))
					)
					break
				case 'demote':
				case 'promote':
					for (const participant of metadata.participants) {
						const ids = participants.map((p: any) => (typeof p === 'string' ? p : p.id || p.phoneNumber))
						if (ids.includes(participant.id)) {
							participant.admin = action === 'promote' ? 'admin' : null
						}
					}
					break
				case 'remove': {
					const removeIds = new Set(participants.map((p: any) => (typeof p === 'string' ? p : p.id || p.phoneNumber)))
					metadata.participants = metadata.participants.filter(p => !removeIds.has(p.id))
					break
				}
			}
		})

		ev.on('lid-mapping.update', ({ lid, pn }) => {
			lidMappings[lid] = pn
			lidMappings[pn] = lid
			logger.debug({ lid, pn }, 'lid mapping updated in store')
		})

		ev.on('message-receipt.update', updates => {
			for (const { key, receipt } of updates) {
				const msg = messages[key.remoteJid!]?.get(key.id!)
				if (msg) updateMessageWithReceipt(msg, receipt)
			}
		})

		ev.on('messages.reaction', reactions => {
			for (const { key, reaction } of reactions) {
				const msg = messages[key.remoteJid!]?.get(key.id!)
				if (msg) updateMessageWithReaction(msg, reaction)
			}
		})
	}

	const toJSON = () => ({ chats, contacts, messages, labels, labelAssociations, lidMappings })

	const fromJSON = (json: ReturnType<typeof toJSON>) => {
		chats.upsert(...(json.chats as any))
		labelAssociations.upsert(...((json.labelAssociations as any) || []))
		contactsUpsert(Object.values(json.contacts))
		labelsUpsert(Object.values(json.labels || {}) as any[])
		for (const jid in json.messages) {
			const list = assertMessageList(jid)
			for (const msg of (json.messages as any)[jid]) {
				list.upsert(proto.WebMessageInfo.fromObject(msg), 'append')
			}
		}
	}

	return {
		chats,
		contacts,
		messages,
		groupMetadata,
		state,
		presences,
		labels,
		labelAssociations,
		bind,
		loadMessages: async (jid: string, count: number, cursor?: { before?: WAMessageKey; after?: WAMessageKey }) => {
			const list = assertMessageList(jid)
			const mode = !cursor || 'before' in cursor ? 'before' : 'after'
			const cursorKey = cursor ? ('before' in cursor ? cursor.before : cursor.after) : undefined
			const cursorValue = cursorKey ? list.get(cursorKey.id!) : undefined

			let msgs: WAMessage[]
			if (list && mode === 'before' && (!cursorKey || cursorValue)) {
				if (cursorValue) {
					const msgIdx = list.array.findIndex(m => m.key.id === cursorKey?.id)
					msgs = list.array.slice(0, msgIdx)
				} else {
					msgs = list.array
				}
				const diff = count - msgs.length
				if (diff < 0) msgs = msgs.slice(-count)
			} else {
				msgs = []
			}
			return msgs
		},
		getLabels: () => labels,
		getChatLabels: (chatId: string) => labelAssociations.filter((la: any) => la.chatId === chatId).all(),
		getMessageLabels: (messageId: string) =>
			labelAssociations
				.filter((la: any) => la.messageId === messageId)
				.all()
				.map((la: any) => la.labelId),
		loadMessage: async (jid: string, id: string) => messages[jid]?.get(id),
		mostRecentMessage: async (jid: string) => messages[jid]?.array.slice(-1)[0],
		fetchImageUrl: async (jid: string, sock?: { profilePictureUrl?: (jid: string) => Promise<string | undefined> }) => {
			const contact = contacts[jid]
			if (!contact) return sock?.profilePictureUrl?.(jid)
			if (typeof contact.imgUrl === 'undefined') {
				contact.imgUrl = await sock?.profilePictureUrl?.(jid)
			}
			return contact.imgUrl
		},
		fetchGroupMetadata: async (jid: string, sock?: { groupMetadata?: (jid: string) => Promise<GroupMetadata> }) => {
			if (!groupMetadata[jid]) {
				const metadata = await sock?.groupMetadata?.(jid)
				if (metadata) groupMetadata[jid] = metadata
			}
			return groupMetadata[jid]
		},
		fetchMessageReceipts: async ({ remoteJid, id }: WAMessageKey) => messages[remoteJid!]?.get(id!)?.userReceipt,
		getMessage: async (key: WAMessageKey) => {
			const jid = jidNormalizedUser(key.remoteJid!)
			return messages[jid]?.get(key.id!)?.message || undefined
		},
		getAllMessages: () => messages,
		toJSON,
		fromJSON,
		writeToFile: (path: string) => {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			require('fs').writeFileSync(path, JSON.stringify(toJSON()))
		},
		readFromFile: (path: string) => {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const { readFileSync, existsSync } = require('fs')
			if (existsSync(path)) {
				logger.debug({ path }, 'reading from file')
				fromJSON(JSON.parse(readFileSync(path, { encoding: 'utf-8' })))
			}
		}
	}
}
