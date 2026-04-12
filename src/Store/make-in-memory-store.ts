/**
 * In-Memory Store for Baileys
 * Ported from innovatorssoft/Baileys.
 *
 * Binds to a BaileysEventEmitter and keeps an in-memory snapshot of:
 * chats, contacts, messages, group metadata, presences, labels, label associations,
 * and LID mappings.
 *
 * NOTE: Requires `@adiwajshing/keyed-db` as a peer dependency.
 * Install: npm install @adiwajshing/keyed-db
 */

import { proto } from '../../WAProto/index.js'
import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import {
	type BaileysEventEmitter,
	type Chat,
	type Contact,
	type GroupMetadata,
	type Label,
	type LabelAssociation,
	type SocketConfig,
	type WAMessage,
	type WAMessageKey
} from '../Types'
import { LabelAssociationType } from '../Types/LabelAssociation'
import { toNumber, updateMessageWithReaction, updateMessageWithReceipt } from '../Utils'
import { jidNormalizedUser } from '../WABinary'
import { makeOrderedDictionary } from './make-ordered-dictionary'
import { ObjectRepository } from './object-repository'

// =====================================================
// KEY FUNCTIONS
// =====================================================

export const waChatKey = (pin: boolean) => ({
	key: (c: Chat) =>
		(pin ? (c.pinned ? '1' : '0') : '') +
		(c.archived ? '0' : '1') +
		(c.conversationTimestamp ? c.conversationTimestamp.toString(16).padStart(8, '0') : '') +
		c.id,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
})

export const waMessageID = (m: WAMessage): string => m.key.id || ''

export const waLabelAssociationKey = {
	key: (la: LabelAssociation) =>
		la.type === LabelAssociationType.Chat ? la.chatId + la.labelId : la.chatId + la.messageId + la.labelId,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
}

const makeMessagesDictionary = () => makeOrderedDictionary(waMessageID)

// =====================================================
// STORE CONFIG
// =====================================================

export interface InMemoryStoreConfig {
	socket?: ReturnType<typeof DEFAULT_CONNECTION_CONFIG.logger.child>
	chatKey?: ReturnType<typeof waChatKey>
	labelAssociationKey?: typeof waLabelAssociationKey
	logger?: SocketConfig['logger']
}

// =====================================================
// FACTORY
// =====================================================

export const makeInMemoryStore = (config: InMemoryStoreConfig) => {
	const chatKey = config.chatKey || waChatKey(true)
	const labelAssociationKey = config.labelAssociationKey || waLabelAssociationKey
	const logger = config.logger || DEFAULT_CONNECTION_CONFIG.logger.child({ stream: 'in-mem-store' })

	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const KeyedDB = require('@adiwajshing/keyed-db').default

	const chats: typeof KeyedDB = new KeyedDB(chatKey, (c: Chat) => c.id)
	const messages: { [jid: string]: ReturnType<typeof makeMessagesDictionary> } = {}
	const contacts: { [id: string]: Contact } = {}
	const groupMetadata: { [jid: string]: GroupMetadata } = {}
	const presences: { [jid: string]: object } = {}
	const state = { connection: 'close' as string }
	const labels = new ObjectRepository<Label>()
	const labelAssociations: typeof KeyedDB = new KeyedDB(labelAssociationKey, labelAssociationKey.key)
	const lidMappings: { [key: string]: string } = {}

	const assertMessageList = (jid: string | null | undefined) => {
		if (!jid) return undefined
		if (!messages[jid]) {
			messages[jid] = makeMessagesDictionary()
		}
		return messages[jid]
	}

	const contactsUpsert = (newContacts: Contact[]): Set<string> => {
		const oldContacts = new Set(Object.keys(contacts))
		for (const contact of newContacts) {
			oldContacts.delete(contact.id)
			contacts[contact.id] = Object.assign(contacts[contact.id] || {}, contact)
		}
		return oldContacts
	}

	const labelsUpsert = (newLabels: Label[]): void => {
		for (const label of newLabels) {
			labels.upsertById(label.id, label)
		}
	}

	/**
	 * Bind the store to a BaileysEventEmitter.
	 * After this call the store automatically stays in sync with all events.
	 */
	const bind = (ev: BaileysEventEmitter): void => {
		ev.on('connection.update', update => {
			Object.assign(state, update)
		})

		ev.on(
			'messaging-history.set',
			({ chats: newChats, contacts: newContacts, messages: newMessages, isLatest, syncType }) => {
				if (syncType === proto.HistorySync.HistorySyncType.ON_DEMAND) return

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
				logger.debug({ deletedContacts: isLatest ? oldContacts.size : 0, newContacts }, 'synced contacts')

				for (const msg of newMessages) {
					const list = assertMessageList(msg.key.remoteJid)
					list?.upsert(msg, 'prepend')
				}
				logger.debug({ messages: newMessages.length }, 'synced messages')
			}
		)

		ev.on('contacts.upsert', newContacts => {
			contactsUpsert(newContacts)
		})

		ev.on('contacts.update', async updates => {
			for (const update of updates) {
				if (contacts[update.id]) {
					Object.assign(contacts[update.id], update)
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
				const result = chats.update(update.id, (chat: Chat) => {
					if ((update.unreadCount ?? 0) > 0) {
						update = { ...update }
						update.unreadCount = (chat.unreadCount || 0) + (update.unreadCount || 0)
					}
					Object.assign(chat, update)
				})
				if (!result) logger.debug({ update }, 'got update for non-existent chat')
			}
		})

		ev.on('labels.edit', (label: Label & { deleted?: boolean }) => {
			if (label.deleted) return labels.deleteById(label.id)
			if (labels.count() < 20) return labels.upsertById(label.id, label)
			logger.error('Labels count exceed')
		})

		ev.on('labels.association', ({ type, association }) => {
			switch (type) {
				case 'add':
					labelAssociations.upsert(association)
					break
				case 'remove':
					labelAssociations.delete(association)
					break
				default:
					// eslint-disable-next-line no-console
					console.error(`unknown label operation type [${type}]`)
			}
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
			switch (type) {
				case 'append':
				case 'notify':
					for (const msg of newMessages) {
						const jid = jidNormalizedUser(msg.key.remoteJid)
						const list = assertMessageList(jid)
						list?.upsert(msg, 'append')
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
				const list = assertMessageList(jidNormalizedUser(key.remoteJid))
				if (update?.status) {
					const listStatus = list?.get(key.id!)?.status
					if (listStatus && (update?.status ?? 0) <= listStatus) {
						logger.debug({ update, storedStatus: listStatus }, 'status stored newer than update')
						delete update.status
					}
				}
				const result = list?.updateAssign(key.id!, update)
				if (!result) logger.debug({ update }, 'got update for non-existent message')
			}
		})

		ev.on('messages.delete', item => {
			if ('all' in item) {
				messages[item.jid]?.clear()
			} else {
				const jid = item.keys[0].remoteJid!
				const list = messages[jid]
				if (list) {
					const idSet = new Set(item.keys.map(k => k.id))
					list.filter((m: WAMessage) => !idSet.has(m.key.id))
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
				const id = update.id!
				if (groupMetadata[id]) {
					Object.assign(groupMetadata[id], update)
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
							...participants.map(
								(
									p:
										| string
										| { id?: string; phoneNumber?: string; lid?: string; admin?: string | null; notify?: string }
								) => {
									if (typeof p === 'string') return { id: p, admin: null }
									return {
										id: p.id || p.phoneNumber || p,
										phoneNumber: p.phoneNumber,
										lid: p.lid,
										admin: p.admin || null,
										notify: p.notify
									}
								}
							)
						)
						break
					case 'demote':
					case 'promote':
						for (const participant of metadata.participants) {
							const ids = participants.map((p: string | { id?: string; phoneNumber?: string }) =>
								typeof p === 'string' ? p : p.id || p.phoneNumber
							)
							if (ids.includes(participant.id)) {
								participant.admin = action === 'promote' ? 'admin' : null
							}
						}
						break
					case 'remove':
						{
							const removeIds = participants.map((p: string | { id?: string; phoneNumber?: string }) =>
								typeof p === 'string' ? p : p.id || p.phoneNumber
							)
							metadata.participants = metadata.participants.filter((p: { id: string }) => !removeIds.includes(p.id))
						}
						break
				}
			}
		})

		ev.on('lid-mapping.update' as keyof typeof ev, ({ lid, pn }: { lid: string; pn: string }) => {
			lidMappings[lid] = pn
			lidMappings[pn] = lid
			logger.debug({ lid, pn }, 'lid mapping updated in store')
		})

		ev.on('message-receipt.update', updates => {
			for (const { key, receipt } of updates) {
				const obj = messages[key.remoteJid!]
				const msg = obj?.get(key.id!)
				if (msg) updateMessageWithReceipt(msg, receipt)
			}
		})

		ev.on('messages.reaction', reactions => {
			for (const { key, reaction } of reactions) {
				const obj = messages[key.remoteJid!]
				const msg = obj?.get(key.id!)
				if (msg) updateMessageWithReaction(msg, reaction)
			}
		})
	}

	// =====================================================
	// SERIALISATION
	// =====================================================

	const toJSON = () => ({
		chats,
		contacts,
		messages,
		labels,
		labelAssociations,
		lidMappings
	})

	const fromJSON = (json: ReturnType<typeof toJSON>): void => {
		chats.upsert(...json.chats)
		labelAssociations.upsert(...(json.labelAssociations || []))
		contactsUpsert(Object.values(json.contacts))
		labelsUpsert(Object.values(json.labels || {}))
		for (const jid in json.messages) {
			const list = assertMessageList(jid)!
			for (const msg of json.messages[jid]) {
				list.upsert(proto.WebMessageInfo.fromObject(msg), 'append')
			}
		}
	}

	// =====================================================
	// PUBLIC API
	// =====================================================

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
			if (!list) return []
			const mode = !cursor || 'before' in cursor ? 'before' : 'after'
			const cursorKey = cursor ? ('before' in cursor ? cursor.before : cursor.after) : undefined
			const cursorValue = cursorKey ? list.get(cursorKey.id) : undefined

			let msgs: WAMessage[]
			if (list && mode === 'before' && (!cursorKey || cursorValue)) {
				if (cursorValue) {
					const msgIdx = list.array.findIndex((m: WAMessage) => m.key.id === cursorKey?.id)
					msgs = list.array.slice(0, msgIdx)
				} else {
					msgs = list.array
				}
				if (msgs.length > count) msgs = msgs.slice(-count)
			} else {
				msgs = []
			}
			return msgs
		},

		getLabels: (): ObjectRepository<Label> => labels,

		getChatLabels: (chatId: string): LabelAssociation[] =>
			labelAssociations.filter((la: LabelAssociation) => la.chatId === chatId).all(),

		getMessageLabels: (messageId: string): string[] => {
			const associations = labelAssociations
				.filter((la: LabelAssociation) => la.messageId === messageId)
				.all() as LabelAssociation[]
			return associations.map(({ labelId }: { labelId: string }) => labelId)
		},

		loadMessage: async (jid: string, id: string): Promise<WAMessage | undefined> => messages[jid]?.get(id),

		mostRecentMessage: async (jid: string): Promise<WAMessage | undefined> => messages[jid]?.array.slice(-1)[0],

		fetchImageUrl: async (
			jid: string,
			sock?: { profilePictureUrl: (jid: string) => Promise<string | undefined> }
		): Promise<string | undefined> => {
			const contact = contacts[jid]
			if (!contact) return sock?.profilePictureUrl(jid)
			if (typeof contact.imgUrl === 'undefined') {
				contact.imgUrl = await sock?.profilePictureUrl(jid)
			}
			return contact.imgUrl
		},

		fetchGroupMetadata: async (
			jid: string,
			sock?: { groupMetadata: (jid: string) => Promise<GroupMetadata> }
		): Promise<GroupMetadata | undefined> => {
			if (!groupMetadata[jid]) {
				const metadata = await sock?.groupMetadata(jid)
				if (metadata) groupMetadata[jid] = metadata
			}
			return groupMetadata[jid]
		},

		fetchMessageReceipts: async ({ remoteJid, id }: WAMessageKey) => {
			const list = messages[remoteJid!]
			const msg = list?.get(id!)
			return msg?.userReceipt
		},

		/**
		 * Use this as the `getMessage` option in `makeWASocket` to enable
		 * retry decryption and poll decryption.
		 */
		getMessage: async (key: WAMessageKey): Promise<proto.IMessage | undefined> => {
			const jid = jidNormalizedUser(key.remoteJid)
			const msg = messages[jid]?.get(key.id!)
			return msg?.message || undefined
		},

		getAllMessages: () => messages,
		toJSON,
		fromJSON,

		writeToFile: (path: string): void => {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { writeFileSync } = require('fs') as typeof import('fs')
			writeFileSync(path, JSON.stringify(toJSON()))
		},

		readFromFile: (path: string): void => {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { readFileSync, existsSync } = require('fs') as typeof import('fs')
			if (existsSync(path)) {
				logger.debug({ path }, 'reading store from file')
				const json = JSON.parse(readFileSync(path, { encoding: 'utf-8' }))
				fromJSON(json)
			}
		}
	}
}
