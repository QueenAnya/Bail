import type { WAMessage, WAMessageKey } from '../Types'

export interface StoredMessage {
	message: WAMessage
	storedAt: number
	isDeleted: boolean
	deletedAt?: number
	deletedBy?: string
}
export interface DeletedMessageInfo {
	originalMessage: WAMessage
	key: WAMessageKey
	deletedAt: number
	deletedBy?: string
	isRevokedBySender: boolean
}
export interface MessageStoreOptions {
	maxMessagesPerChat?: number
	ttl?: number
	cleanupInterval?: number
}

export class MessageStore {
	private store = new Map<string, StoredMessage>()
	private deletedMessages = new Map<string, DeletedMessageInfo>()
	private options: Required<MessageStoreOptions>
	private cleanupTimer?: NodeJS.Timeout

	constructor(options: MessageStoreOptions = {}) {
		this.options = {
			maxMessagesPerChat: options.maxMessagesPerChat || 1000,
			ttl: options.ttl || 24 * 60 * 60 * 1000,
			cleanupInterval: options.cleanupInterval || 60 * 60 * 1000
		}
		this.startCleanup()
	}

	private startCleanup() {
		this.cleanupTimer = setInterval(() => this.cleanup(), this.options.cleanupInterval)
		this.cleanupTimer.unref?.()
	}

	stopCleanup() {
		if (this.cleanupTimer) clearInterval(this.cleanupTimer)
	}

	cleanup() {
		const cutoff = Date.now() - this.options.ttl
		for (const [key, stored] of this.store.entries()) {
			if (stored.storedAt < cutoff) this.store.delete(key)
		}
	}

	private getKey(key: WAMessageKey): string {
		return `${key.remoteJid}:${key.id}`
	}

	storeMessage(message: WAMessage) {
		if (!message.key.id || !message.key.remoteJid) return
		this.store.set(this.getKey(message.key), { message, storedAt: Date.now(), isDeleted: false })
	}

	storeMessages(messages: WAMessage[]) {
		for (const m of messages) this.storeMessage(m)
	}

	getMessage(key: WAMessageKey): StoredMessage | undefined {
		return this.store.get(this.getKey(key))
	}
	getOriginalMessage(key: WAMessageKey): WAMessage | undefined {
		return this.getMessage(key)?.message
	}

	markAsDeleted(key: WAMessageKey, deletedBy?: string): DeletedMessageInfo | null {
		const stored = this.getMessage(key)
		if (!stored) return null
		stored.isDeleted = true
		stored.deletedAt = Date.now()
		stored.deletedBy = deletedBy
		const info: DeletedMessageInfo = {
			originalMessage: stored.message,
			key,
			deletedAt: Date.now(),
			deletedBy,
			isRevokedBySender: deletedBy === key.remoteJid || !deletedBy
		}
		this.deletedMessages.set(this.getKey(key), info)
		return info
	}

	getDeletedMessage(key: WAMessageKey): DeletedMessageInfo | undefined {
		return this.deletedMessages.get(this.getKey(key))
	}
	getAllDeletedMessages(): DeletedMessageInfo[] {
		return [...this.deletedMessages.values()]
	}
	getDeletedMessagesByChat(chatId: string): DeletedMessageInfo[] {
		return [...this.deletedMessages.values()].filter(d => d.key.remoteJid === chatId)
	}

	getChatMessages(chatId: string): WAMessage[] {
		return [...this.store.values()].filter(s => s.message.key.remoteJid === chatId).map(s => s.message)
	}

	getChatIds(): string[] {
		return [...new Set([...this.store.values()].map(s => s.message.key.remoteJid!))]
	}

	getStats() {
		const chatIds = new Set([...this.store.values()].map(s => s.message.key.remoteJid))
		return { totalChats: chatIds.size, totalMessages: this.store.size, totalDeleted: this.deletedMessages.size }
	}

	clear() {
		this.store.clear()
		this.deletedMessages.clear()
	}
	clearChat(chatId: string) {
		for (const [k, v] of this.store.entries()) {
			if (v.message.key.remoteJid === chatId) this.store.delete(k)
		}
		for (const [k, v] of this.deletedMessages.entries()) {
			if (v.key.remoteJid === chatId) this.deletedMessages.delete(k)
		}
	}

	getAllMessages(): { [jid: string]: WAMessage[] } {
		const result: { [jid: string]: WAMessage[] } = {}
		for (const stored of this.store.values()) {
			const jid = stored.message.key.remoteJid!
			if (!result[jid]) result[jid] = []
			result[jid].push(stored.message)
		}
		return result
	}
}

export const isDeleteMessage = (message: WAMessage): boolean => message.message?.protocolMessage?.type === 0 // REVOKE

export const getDeletedMessageKey = (message: WAMessage): WAMessageKey | null =>
	message.message?.protocolMessage?.key || null

export const createAntiDeleteHandler =
	(store: MessageStore) =>
	(updates: { key: WAMessageKey; update: Partial<WAMessage> }[]): DeletedMessageInfo[] => {
		const deleted: DeletedMessageInfo[] = []
		for (const { key, update } of updates) {
			if (update.message?.protocolMessage?.type === 0) {
				const targetKey = update.message.protocolMessage.key || key
				const info = store.markAsDeleted(targetKey, key.participant || key.remoteJid)
				if (info) deleted.push(info)
			}
		}
		return deleted
	}

export const createMessageStoreHandler =
	(store: MessageStore) =>
	({ messages }: { messages: WAMessage[] }): void =>
		store.storeMessages(messages)

export default {
	MessageStore,
	isDeleteMessage,
	getDeletedMessageKey,
	createAntiDeleteHandler,
	createMessageStoreHandler
}
