/**
 * In-memory data store — listens to all Baileys events and keeps an
 * in-memory snapshot of chats, contacts, messages, group metadata,
 * presences, and labels.
 *
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * This subsystem was removed from upstream Baileys at some point (the
 * maintainers now recommend an external/persistent store), but is
 * restored here since both source forks of this merge re-added it.
 *
 * Requires the `@adiwajshing/keyed-db` package:
 *   npm install @adiwajshing/keyed-db
 */

// @ts-expect-error — @adiwajshing/keyed-db ships its own (older-style) types
import KeyedDB from '@adiwajshing/keyed-db'
import { createRequire } from 'module'
import { proto } from '../../../WAProto/index.js'
import { DEFAULT_CONNECTION_CONFIG } from '../../Defaults'
import type {
	BaileysEventEmitter,
	Chat,
	ConnectionState,
	Contact,
	GroupMetadata,
	PresenceData,
	WAMessage,
	WAMessageCursor,
	WAMessageKey
} from '../../Types'
import type { Label } from '../../Types/Label'
import { LabelAssociationType, type LabelAssociation } from '../../Types/LabelAssociation'
import type { ILogger } from '../../Utils/logger'
import { jidNormalizedUser } from '../../WABinary'
import { toNumber, updateMessageWithReaction, updateMessageWithReceipt } from '../../Utils'
import { makeOrderedDictionary, type OrderedDictionary } from './make-ordered-dictionary'
import { ObjectRepository } from './object-repository'

/** Minimal shape matching `@adiwajshing/keyed-db`'s comparator interface. */
interface Comparable<T, K> {
	key: (data: T) => K
	compare: (k1: K, k2: K) => number
}

// `fs` is only needed by writeToFile/readFromFile; loaded lazily and
// synchronously via createRequire so consumers who never call those two
// functions don't need `fs` bundled (relevant for non-Node runtimes).
const nodeRequire = createRequire(import.meta.url)

export const waChatKey = (pin: boolean): Comparable<Chat, string> => ({
	key: (c: Chat) =>
		(pin ? (c.pinned ? '1' : '0') : '') +
		(c.archived ? '0' : '1') +
		(c.conversationTimestamp ? c.conversationTimestamp.toString(16).padStart(8, '0') : '') +
		c.id,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
})

export const waMessageID = (m: WAMessage): string => m.key.id || ''

export const waLabelAssociationKey: Comparable<LabelAssociation, string> = {
	key: (la: LabelAssociation) =>
		la.type === LabelAssociationType.Chat
			? la.chatId + la.labelId
			: la.chatId + (la as { messageId?: string }).messageId + la.labelId,
	compare: (k1: string, k2: string) => k2.localeCompare(k1)
}

const makeMessagesDictionary = () => makeOrderedDictionary<WAMessage>(waMessageID)

export type BaileysInMemoryStoreConfig = {
	chatKey?: Comparable<Chat, string>
	labelAssociationKey?: Comparable<LabelAssociation, string>
	logger?: ILogger
}

type MessagesDict = OrderedDictionary<WAMessage>

export const makeInMemoryStore = (config: BaileysInMemoryStoreConfig) => {
	const chatKey = config.chatKey || waChatKey(true)
	const labelAssociationKey = config.labelAssociationKey || waLabelAssociationKey
	const logger: ILogger = config.logger || (DEFAULT_CONNECTION_CONFIG.logger as ILogger)

	const chats = new KeyedDB<Chat, string>(chatKey, (c: Chat) => c.id)
	const messages: { [jid: string]: MessagesDict } = {}
	const contacts: { [jid: string]: Contact } = {}
	const groupMetadata: { [jid: string]: GroupMetadata } = {}
	const presences: { [id: string]: { [participant: string]: PresenceData } } = {}
	const state: ConnectionState = { connection: 'close' }
	const labels = new ObjectRepository<Label>()
	const labelAssociations = new KeyedDB<LabelAssociation, string>(labelAssociationKey, labelAssociationKey.key)
	const lidMappings: { [id: string]: string } = {}

	const assertMessageList = (jid: string): MessagesDict => {
		if (!messages[jid]) {
			messages[jid] = makeMessagesDictionary()
		}

		return messages[jid]!
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

	const bind = (ev: BaileysEventEmitter): void => {
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
				logger?.debug({ chatsAdded }, 'synced chats')

				const oldContacts = contactsUpsert(newContacts)
				if (isLatest) {
					for (const jid of oldContacts) {
						delete contacts[jid]
					}
				}

				logger?.debug({ deletedContacts: isLatest ? oldContacts.size : 0, newContacts }, 'synced contacts')

				for (const msg of newMessages) {
					const jid = msg.key.remoteJid!
					const list = assertMessageList(jid)
					list.upsert(msg, 'prepend')
				}

				logger?.debug({ messages: newMessages.length }, 'synced messages')
			}
		)

		ev.on('contacts.upsert', newContacts => {
			contactsUpsert(newContacts)
		})

		ev.on('contacts.update', async updates => {
			for (const update of updates) {
				if (update.id && contacts[update.id]) {
					Object.assign(contacts[update.id]!, update)
				} else {
					logger?.debug({ update }, 'got update for non-existant contact')
				}
			}
		})

		ev.on('chats.upsert', newChats => {
			chats.upsert(...(newChats as Chat[]))
		})

		ev.on('chats.update', updates => {
			for (let update of updates) {
				const result = chats.update(update.id!, (chat: Chat) => {
					if ((update.unreadCount || 0) > 0) {
						update = { ...update }
						update.unreadCount = (chat.unreadCount || 0) + update.unreadCount!
					}

					Object.assign(chat, update)
				})
				if (!result) {
					logger?.debug({ update }, 'got update for non-existant chat')
				}
			}
		})

		ev.on('labels.edit', label => {
			if (label.deleted) {
				return labels.deleteById(label.id)
			}

			if (labels.count() < 20) {
				return labels.upsertById(label.id, label)
			}

			logger?.error('Labels count exceed')
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
					logger?.error(`unknown operation type [${type}]`)
			}
		})

		ev.on('presence.update', ({ id, presences: update }) => {
			presences[id] = presences[id] || {}
			Object.assign(presences[id]!, update)
		})

		ev.on('chats.delete', deletions => {
			for (const item of deletions) {
				if (chats.get(item)) {
					chats.deleteById(item)
				}
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
					if (listStatus && update?.status <= listStatus) {
						logger?.debug({ update, storedStatus: listStatus }, 'status stored newer then update')
						delete (update as { status?: unknown }).status
						logger?.debug({ update }, 'new update object')
					}
				}

				const result = list.updateAssign(key.id!, update)
				if (!result) {
					logger?.debug({ update }, 'got update for non-existent message')
				}
			}
		})

		ev.on('messages.delete', item => {
			if ('all' in item) {
				const list = messages[item.jid]
				list?.clear()
			} else {
				const jid = item.keys[0]!.remoteJid!
				const list = messages[jid]
				if (list) {
					const idSet = new Set(item.keys.map(k => k.id))
					list.filter(m => !idSet.has(m.key.id))
				}
			}
		})

		ev.on('groups.upsert', newGroups => {
			for (const group of newGroups) {
				groupMetadata[group.id] = group
				logger?.debug({ id: group.id }, 'group metadata upserted')
			}
		})

		ev.on('groups.update', updates => {
			for (const update of updates) {
				const id = update.id!
				if (groupMetadata[id]) {
					Object.assign(groupMetadata[id]!, update)
				} else {
					logger?.debug({ update }, 'got update for non-existant group metadata')
				}
			}
		})

		ev.on('group-participants.update', ({ id, participants, action }) => {
			const metadata = groupMetadata[id]
			if (!metadata) {
				return
			}

			switch (action) {
				case 'add':
					metadata.participants.push(
						...(participants as unknown[]).map((p: any) => {
							if (typeof p === 'string') {
								return { id: p, admin: null }
							}

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
				case 'promote': {
					const participantIds = (participants as unknown[]).map((p: any) =>
						typeof p === 'string' ? p : p.id || p.phoneNumber
					)
					for (const participant of metadata.participants) {
						if (participantIds.includes(participant.id)) {
							;(participant as { admin?: string | null }).admin = action === 'promote' ? 'admin' : null
						}
					}

					break
				}

				case 'remove': {
					const removeIds = (participants as unknown[]).map((p: any) =>
						typeof p === 'string' ? p : p.id || p.phoneNumber
					)
					metadata.participants = metadata.participants.filter(p => !removeIds.includes(p.id))
					break
				}
			}
		})

		ev.on('lid-mapping.update', ({ lid, pn }) => {
			lidMappings[lid] = pn
			lidMappings[pn] = lid
			logger?.debug({ lid, pn }, 'lid mapping updated in store')
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

	const toJSON = () => ({
		chats,
		contacts,
		messages,
		labels,
		labelAssociations,
		lidMappings
	})

	const fromJSON = (json: {
		chats: Chat[]
		contacts: { [id: string]: Contact }
		messages: { [id: string]: WAMessage[] }
		labels?: { [labelId: string]: Label }
		labelAssociations?: LabelAssociation[]
	}): void => {
		chats.upsert(...json.chats)
		labelAssociations.upsert(...(json.labelAssociations || []))
		contactsUpsert(Object.values(json.contacts))
		labelsUpsert(Object.values(json.labels || {}))

		for (const jid in json.messages) {
			const list = assertMessageList(jid)
			for (const msg of json.messages[jid]!) {
				list.upsert(proto.WebMessageInfo.fromObject(msg) as unknown as WAMessage, 'append')
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
		loadMessages: async (jid: string, count: number, cursor: WAMessageCursor): Promise<WAMessage[]> => {
			const list = assertMessageList(jid)
			const mode = !cursor || 'before' in cursor ? 'before' : 'after'
			const cursorKey = cursor ? ('before' in cursor ? cursor.before : cursor.after) : undefined
			const cursorValue = cursorKey ? list.get(cursorKey.id!) : undefined

			let resultMessages: WAMessage[]
			if (list && mode === 'before' && (!cursorKey || cursorValue)) {
				if (cursorValue) {
					const msgIdx = list.array.findIndex(m => m.key.id === cursorKey?.id)
					resultMessages = list.array.slice(0, msgIdx)
				} else {
					resultMessages = list.array
				}

				const diff = count - resultMessages.length
				if (diff < 0) {
					resultMessages = resultMessages.slice(-count)
				}
			} else {
				resultMessages = []
			}

			return resultMessages
		},
		getLabels: () => labels,
		getChatLabels: (chatId: string): LabelAssociation[] => {
			return labelAssociations.filter((la: LabelAssociation) => la.chatId === chatId).all()
		},
		getMessageLabels: (messageId: string): string[] => {
			const associations = labelAssociations
				.filter((la: LabelAssociation & { messageId?: string }) => la.messageId === messageId)
				.all()
			return associations.map(({ labelId }: { labelId: string }) => labelId)
		},
		loadMessage: async (jid: string, id: string) => messages[jid]?.get(id),
		mostRecentMessage: async (jid: string) => messages[jid]?.array.slice(-1)[0],
		fetchImageUrl: async (
			jid: string,
			sock: { profilePictureUrl: (jid: string) => Promise<string | undefined> } | undefined
		) => {
			const contact = contacts[jid]
			if (!contact) {
				return sock?.profilePictureUrl(jid)
			}

			if (typeof (contact as { imgUrl?: string }).imgUrl === 'undefined') {
				;(contact as { imgUrl?: string }).imgUrl = await sock?.profilePictureUrl(jid)
			}

			return (contact as { imgUrl?: string }).imgUrl
		},
		fetchGroupMetadata: async (
			jid: string,
			sock: { groupMetadata: (jid: string) => Promise<GroupMetadata> } | undefined
		) => {
			if (!groupMetadata[jid]) {
				const metadata = await sock?.groupMetadata(jid)
				if (metadata) {
					groupMetadata[jid] = metadata
				}
			}

			return groupMetadata[jid]
		},
		fetchMessageReceipts: async ({ remoteJid, id }: WAMessageKey) => {
			const list = messages[remoteJid!]
			const msg = list?.get(id!)
			return msg?.userReceipt
		},
		getMessage: async (key: WAMessageKey) => {
			const jid = jidNormalizedUser(key.remoteJid!)
			const msg = messages[jid]?.get(key.id!)
			return msg?.message || undefined
		},
		getAllMessages: () => messages,
		toJSON,
		fromJSON,
		writeToFile: (path: string) => {
			const { writeFileSync } = nodeRequire('fs')
			writeFileSync(path, JSON.stringify(toJSON()))
		},
		readFromFile: (path: string) => {
			const { readFileSync, existsSync } = nodeRequire('fs')
			if (existsSync(path)) {
				logger?.debug({ path }, 'reading from file')
				const jsonStr = readFileSync(path, { encoding: 'utf-8' })
				const json = JSON.parse(jsonStr)
				fromJSON(json)
			}
		}
	}
}
