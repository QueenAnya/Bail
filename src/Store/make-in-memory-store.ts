import { proto } from '../../WAProto/index.js'
import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import { LabelAssociationType } from '../Types/LabelAssociation'
import type { BaileysEventEmitter, Chat, Contact, GroupMetadata, WAMessage, WAMessageKey } from '../Types'
import { toNumber, updateMessageWithReaction, updateMessageWithReceipt } from '../Utils'
import { jidNormalizedUser } from '../WABinary'
import { makeOrderedDictionary } from './make-ordered-dictionary'
import { ObjectRepository } from './object-repository'

export type WAChatKey = {
	key: (c: Chat) => string
	compare: (k1: string, k2: string) => number
}

export const waChatKey = (pin: boolean): WAChatKey => ({
	key: (c: Chat) =>
		(pin ? (c.pinned ? '1' : '0') : '') +
		(c.archived ? '0' : '1') +
		(c.conversationTimestamp ? toNumber(c.conversationTimestamp).toString(16).padStart(8, '0') : '') +
		c.id,
	compare: (k1, k2) => k2.localeCompare(k1)
})

export const waMessageID = (m: WAMessage) => m.key.id || ''

export const waLabelAssociationKey = {
	key: (la: any) =>
		la.type === LabelAssociationType.Chat ? la.chatId + la.labelId : la.chatId + la.messageId + la.labelId,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
}

const makeMessagesDictionary = () => makeOrderedDictionary(waMessageID)

export type InMemoryStore = ReturnType<typeof makeInMemoryStore>

export type InMemoryStoreConfig = {
	chatKey?: WAChatKey
	labelAssociationKey?: typeof waLabelAssociationKey
	logger?: any
	socket?: any
}

export const makeInMemoryStore = (config: InMemoryStoreConfig = {}) => {
	const chatKey = config.chatKey || waChatKey(true)
	const labelAssociationKey = config.labelAssociationKey || waLabelAssociationKey
	const logger = config.logger || DEFAULT_CONNECTION_CONFIG.logger.child({ stream: 'in-mem-store' })

	// Simple keyed chat list using Map for ordered dictionary behaviour
	const chatMap: Map<string, Chat> = new Map()

	// Sort chats by key
	const sortedChatIds = (): string[] => {
		return Array.from(chatMap.keys()).sort((a, b) => {
			const ka = chatKey.key(chatMap.get(a)!)
			const kb = chatKey.key(chatMap.get(b)!)
			return chatKey.compare(ka, kb)
		})
	}

	const chats = {
		get: (id: string) => chatMap.get(id),
		upsert: (...items: Chat[]) => {
			for (const c of items) chatMap.set(c.id!, c)
		},
		insertIfAbsent: (...items: Chat[]) => {
			const added: Chat[] = []
			for (const c of items) {
				if (!chatMap.has(c.id!)) {
					chatMap.set(c.id!, c)
					added.push(c)
				}
			}
			return added
		},
		update: (id: string, updater: (c: Chat) => void): boolean => {
			const c = chatMap.get(id)
			if (c) {
				updater(c)
				return true
			}
			return false
		},
		delete: (id: string) => chatMap.delete(id),
		deleteById: (id: string) => chatMap.delete(id),
		filter: (predicate: (c: Chat) => boolean) => {
			for (const [id, c] of chatMap) {
				if (!predicate(c)) chatMap.delete(id)
			}
		},
		clear: () => chatMap.clear(),
		all: () => sortedChatIds().map(id => chatMap.get(id)!),
		count: () => chatMap.size
	}

	const messages: { [jid: string]: ReturnType<typeof makeMessagesDictionary> } = {}
	const contacts: { [id: string]: Contact } = {}
	const groupMetadata: { [jid: string]: GroupMetadata } = {}
	const presences: { [id: string]: { [participant: string]: any } } = {}
	const state: { connection: string } = { connection: 'close' }
	const labels = new ObjectRepository()
	const labelAssociations: any[] = []
	const lidMappings: { [jid: string]: string } = {}

	const assertMessageList = (jid: string) => {
		if (!messages[jid]) {
			messages[jid] = makeMessagesDictionary()
		}
		return messages[jid]
	}

	const contactsUpsert = (newContacts: Contact[]) => {
		const oldContacts = new Set(Object.keys(contacts))
		for (const contact of newContacts) {
			oldContacts.delete(contact.id)
			contacts[contact.id] = Object.assign(contacts[contact.id] || {}, contact)
		}
		return oldContacts
	}

	const labelsUpsert = (newLabels: any[]) => {
		for (const label of newLabels) {
			labels.upsertById(label.id, label)
		}
	}

	const bind = (ev: BaileysEventEmitter) => {
		ev.on('connection.update', update => {
			Object.assign(state, update)
		})

		ev.on(
			'messaging-history.set',
			({ chats: newChats, contacts: newContacts, messages: newMessages, isLatest, syncType }) => {
				if (syncType === proto.HistorySync.HistorySyncType.ON_DEMAND) {
					return
				}
				if (isLatest) {
					chats.clear()
					for (const id in messages) {
						delete messages[id]
					}
				}
				const chatsAdded = chats.insertIfAbsent(...newChats).length
				logger.debug({ chatsAdded }, 'synced chats')

				const oldContacts = contactsUpsert(newContacts)
				if (isLatest) {
					for (const jid of oldContacts) {
						delete contacts[jid]
					}
				}
				logger.debug({ deletedContacts: isLatest ? oldContacts.size : 0, newContacts }, 'synced contacts')

				for (const msg of newMessages) {
					const jid = msg.key.remoteJid!
					const list = assertMessageList(jid)
					list.upsert(msg, 'prepend')
				}
				logger.debug({ messages: newMessages.length }, 'synced messages')
			}
		)

		ev.on('contacts.upsert', newContacts => {
			contactsUpsert(newContacts)
		})

		ev.on('contacts.update', async updates => {
			for (const update of updates) {
				if (update.id && contacts[update.id]) {
					Object.assign(contacts[update.id!]!, update)
				} else {
					logger.debug({ update }, 'got update for non-existent contact')
				}
			}
		})

		ev.on('chats.upsert', newChats => {
			chats.upsert(...newChats)
		})

		ev.on('chats.update', updates => {
			for (let update of updates) {
				const result = chats.update(update.id!, chat => {
					if ((update.unreadCount || 0) > 0) {
						update = { ...update }
						update.unreadCount = (chat.unreadCount || 0) + (update.unreadCount || 0)
					}
					Object.assign(chat, update)
				})
				if (!result) {
					logger.debug({ update }, 'got update for non-existent chat')
				}
			}
		})

		ev.on('labels.edit', (label: any) => {
			if (label.deleted) {
				return labels.deleteById(label.id)
			}
			if (labels.count() < 20) {
				return labels.upsertById(label.id, label)
			}
			logger.error('Labels count exceed')
		})

		ev.on('labels.association', ({ type, association }: any) => {
			switch (type) {
				case 'add':
					labelAssociations.push(association)
					break
				case 'remove': {
					const idx = labelAssociations.findIndex(
						la => labelAssociationKey.key(la) === labelAssociationKey.key(association)
					)
					if (idx >= 0) labelAssociations.splice(idx, 1)
					break
				}
				default:
					logger.error(`unknown label association type [${type}]`)
			}
		})

		ev.on('presence.update', ({ id, presences: update }) => {
			presences[id] = presences[id] || {}
			Object.assign(presences[id], update)
		})

		ev.on('chats.delete', deletions => {
			for (const item of deletions) {
				chats.delete(item)
			}
		})

		ev.on('messages.upsert', ({ messages: newMessages, type }) => {
			switch (type) {
				case 'append':
				case 'notify':
					for (const msg of newMessages) {
						const jid = jidNormalizedUser(msg.key.remoteJid!)
						const list = assertMessageList(jid)
						list.upsert(msg, 'append')
						if (type === 'notify' && !chats.get(jid)) {
							ev.emit('chats.upsert', [
								{
									id: jid,
									conversationTimestamp: toNumber(msg.messageTimestamp),
									unreadCount: 1
								}
							])
						}
					}
					break
			}
		})

		ev.on('messages.update', updates => {
			for (const { update, key } of updates) {
				const list = assertMessageList(jidNormalizedUser(key.remoteJid!))
				if (update?.status) {
					const listStatus = list.get(key.id!)?.status
					if (listStatus && (update?.status as number) <= (listStatus as number)) {
						logger.debug({ update, storedStatus: listStatus }, 'status stored newer than update')
						delete update.status
					}
				}
				const result = list.updateAssign(key.id!, update as Partial<WAMessage>)
				if (!result) {
					logger.debug({ update }, 'got update for non-existent message')
				}
			}
		})

		ev.on('messages.delete', item => {
			if ('all' in item) {
				messages[item.jid]?.clear()
			} else {
				const jid = item.keys[0]?.remoteJid ?? ''
				const list = messages[jid]
				if (list) {
					const idSet = new Set(item.keys.map((k: WAMessageKey) => k.id!))
					list.filter(m => !idSet.has(m.key?.id!))
				}
			}
		})

		ev.on('groups.upsert', newGroups => {
			for (const group of newGroups) {
				groupMetadata[group.id] = group
				logger.debug({ id: group.id }, 'group metadata upserted')
			}
		})

		ev.on('groups.update', updates => {
			for (const update of updates) {
				if (update.id && groupMetadata[update.id]) {
					Object.assign(groupMetadata[update.id!]!, update)
				} else {
					logger.debug({ update }, 'got update for non-existent group metadata')
				}
			}
		})

		ev.on('group-participants.update', ({ id, participants, action }) => {
			const metadata = groupMetadata[id]
			if (metadata) {
				switch (action) {
					case 'add':
						metadata.participants.push(
							...participants.map((p: any) => {
								if (typeof p === 'string') return { id: p, admin: null }
								return {
									id: p.id || p.phoneNumber || p,
									phoneNumber: p.phoneNumber,
									lid: p.lid,
									admin: p.admin || null,
									notify: p.notify
								}
							})
						)
						break
					case 'demote':
					case 'promote':
						for (const participant of metadata.participants) {
							const participantIds = participants.map((p: any) => (typeof p === 'string' ? p : p.id || p.phoneNumber))
							if (participantIds.includes(participant.id)) {
								participant.admin = action === 'promote' ? 'admin' : null
							}
						}
						break
					case 'remove': {
						const removeIds = participants.map((p: any) => (typeof p === 'string' ? p : p.id || p.phoneNumber))
						metadata.participants = metadata.participants.filter(p => !removeIds.includes(p.id))
						break
					}
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
				const obj = messages[key.remoteJid!]
				const msg = obj?.get(key.id!)
				if (msg) {
					updateMessageWithReceipt(msg, receipt)
				}
			}
		})

		ev.on('messages.reaction', reactions => {
			for (const { key, reaction } of reactions) {
				const obj = messages[key.remoteJid!]
				const msg = obj?.get(key.id!)
				if (msg) {
					updateMessageWithReaction(msg, reaction)
				}
			}
		})
	}

	const toJSON = () => ({ chats: chats.all(), contacts, messages, labels, labelAssociations, lidMappings })

	const fromJSON = (json: ReturnType<typeof toJSON>) => {
		chats.upsert(...json.chats)
		if (Array.isArray(json.labelAssociations)) {
			labelAssociations.push(...json.labelAssociations)
		}
		contactsUpsert(Object.values(json.contacts))
		labelsUpsert(Object.values((json.labels as any)?.entityMap ? (json.labels as any).findAll() : json.labels || {}))
		for (const jid in json.messages) {
			const list = assertMessageList(jid)
			for (const msg of (json.messages[jid] as any).array || json.messages[jid]) {
				list.upsert(proto.WebMessageInfo.fromObject(msg) as any, 'append')
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
		lidMappings,
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
				if (diff < 0) {
					msgs = msgs.slice(-count)
				}
			} else {
				msgs = []
			}
			return msgs
		},
		getLabels: () => labels,
		getChatLabels: (chatId: string) => labelAssociations.filter(la => la.chatId === chatId),
		getMessageLabels: (messageId: string) =>
			labelAssociations.filter(la => la.messageId === messageId).map(la => la.labelId),
		loadMessage: async (jid: string, id: string) => messages[jid]?.get(id),
		mostRecentMessage: async (jid: string) => messages[jid]?.array.slice(-1)[0],
		fetchImageUrl: async (jid: string, sock?: any) => {
			const contact = contacts[jid]
			if (!contact) return sock?.profilePictureUrl(jid)
			if (typeof contact.imgUrl === 'undefined') {
				contact.imgUrl = await sock?.profilePictureUrl(jid)
			}
			return contact.imgUrl
		},
		fetchGroupMetadata: async (jid: string, sock?: any) => {
			if (!groupMetadata[jid]) {
				const metadata = await sock?.groupMetadata(jid)
				if (metadata) groupMetadata[jid] = metadata
			}
			return groupMetadata[jid]
		},
		fetchMessageReceipts: async ({ remoteJid, id }: WAMessageKey) => {
			const list = messages[remoteJid!]
			return list?.get(id!)?.userReceipt
		},
		getMessage: async (key: WAMessageKey) => {
			const jid = jidNormalizedUser(key.remoteJid!)
			return messages[jid]?.get(key.id!)?.message || undefined
		},
		getAllMessages: () => messages,
		toJSON,
		fromJSON,
		writeToFile: (path: string) => {
			const { writeFileSync } = require('fs')
			writeFileSync(path, JSON.stringify(toJSON()))
		},
		readFromFile: (path: string) => {
			const { readFileSync, existsSync } = require('fs')
			if (existsSync(path)) {
				logger.debug({ path }, 'reading from file')
				const jsonStr = readFileSync(path, { encoding: 'utf-8' })
				fromJSON(JSON.parse(jsonStr))
			}
		}
	}
}
