import { proto } from '../../../WAProto/index.js'
import type { WAMessage, WAMessageKey } from '../../Types'

// ── Types ──────────────────────────────────────────────────────────────────

export interface MessageStoreOptions {
	maxMessagesPerChat?: number
	ttl?: number
	cleanupInterval?: number
}

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

// ── MessageStore ───────────────────────────────────────────────────────────

export class MessageStore {
	private store = new Map<string, Map<string, StoredMessage>>()
	private deletedMessages = new Map<string, DeletedMessageInfo>()
	private cleanupTimer: ReturnType<typeof setInterval> | null = null
	private options: Required<MessageStoreOptions>

	constructor(options: MessageStoreOptions = {}) {
		this.options = {
			maxMessagesPerChat: options.maxMessagesPerChat ?? 1000,
			ttl: options.ttl ?? 24 * 60 * 60 * 1000,
			cleanupInterval: options.cleanupInterval ?? 60 * 60 * 1000
		}
		this.startCleanup()
	}

	private startCleanup() {
		this.cleanupTimer = setInterval(() => this.cleanup(), this.options.cleanupInterval)
	}

	stopCleanup() {
		if(this.cleanupTimer) clearInterval(this.cleanupTimer)
	}

	private cleanup() {
		const cutoff = Date.now() - this.options.ttl
		for(const [chatId, messages] of this.store) {
			for(const [msgId, stored] of messages) {
				if(stored.storedAt < cutoff) messages.delete(msgId)
			}
			if(messages.size === 0) this.store.delete(chatId)
		}
		for(const [key, info] of this.deletedMessages) {
			if(info.deletedAt < cutoff) this.deletedMessages.delete(key)
		}
	}

	private getKey(key: WAMessageKey) {
		return `${key.remoteJid}:${key.id}`
	}

	storeMessage(message: WAMessage) {
		const chatId = message.key.remoteJid
		if(!chatId || !message.key.id) return
		let chatMessages = this.store.get(chatId)
		if(!chatMessages) {
			chatMessages = new Map()
			this.store.set(chatId, chatMessages)
		}
		if(chatMessages.size >= this.options.maxMessagesPerChat) {
			const oldestKey = chatMessages.keys().next().value
			if(oldestKey) chatMessages.delete(oldestKey)
		}
		chatMessages.set(message.key.id, { message, storedAt: Date.now(), isDeleted: false })
	}

	storeMessages(messages: WAMessage[]) {
		for(const msg of messages) this.storeMessage(msg)
	}

	getMessage(key: WAMessageKey): StoredMessage | undefined {
		return this.store.get(key.remoteJid!)?.get(key.id!)
	}

	getOriginalMessage(key: WAMessageKey): WAMessage | undefined {
		return this.getMessage(key)?.message
	}

	markAsDeleted(key: WAMessageKey, deletedBy?: string): DeletedMessageInfo | null {
		const stored = this.getMessage(key)
		if(!stored) return null
		const now = Date.now()
		stored.isDeleted = true
		stored.deletedAt = now
		stored.deletedBy = deletedBy
		const info: DeletedMessageInfo = {
			originalMessage: stored.message,
			key,
			deletedAt: now,
			deletedBy,
			isRevokedBySender: !deletedBy || deletedBy === stored.message.key.participant
		}
		this.deletedMessages.set(this.getKey(key), info)
		return info
	}

	getDeletedMessage(key: WAMessageKey) {
		return this.deletedMessages.get(this.getKey(key))
	}

	getAllDeletedMessages() {
		return Array.from(this.deletedMessages.values())
	}

	getDeletedMessagesByChat(chatId: string) {
		return Array.from(this.deletedMessages.values()).filter(i => i.key.remoteJid === chatId)
	}

	getChatMessages(chatId: string): WAMessage[] {
		return Array.from(this.store.get(chatId)?.values() ?? []).map(s => s.message)
	}

	getChatIds() { return Array.from(this.store.keys()) }

	getStats() {
		let totalMessages = 0
		for(const messages of this.store.values()) totalMessages += messages.size
		return { totalChats: this.store.size, totalMessages, totalDeleted: this.deletedMessages.size }
	}

	clear() { this.store.clear(); this.deletedMessages.clear() }
	clearChat(chatId: string) { this.store.delete(chatId) }

	getAllMessages(): Record<string, WAMessage[]> {
		const all: Record<string, WAMessage[]> = {}
		for(const [chatId, messages] of this.store) {
			all[chatId] = Array.from(messages.values()).map(s => s.message)
		}
		return all
	}
}

// ── Helpers ────────────────────────────────────────────────────────────────

export const isDeleteMessage = (message: WAMessage): boolean => {
	return message.message?.protocolMessage?.type === proto.Message.ProtocolMessage.Type.REVOKE
}

export const getDeletedMessageKey = (message: WAMessage): WAMessageKey | null => {
	const protoMsg = message.message?.protocolMessage
	if(protoMsg?.type !== proto.Message.ProtocolMessage.Type.REVOKE) return null
	return protoMsg.key ?? null
}

export const createAntiDeleteHandler = (store: MessageStore) => {
	return (updates: Array<{ key: WAMessageKey; update: Partial<WAMessage> }>) => {
		const deletedMessages: DeletedMessageInfo[] = []
		for(const { key, update } of updates) {
			if(update.messageStubType === proto.WebMessageInfo.StubType.REVOKE) {
				const info = store.markAsDeleted(key, update.messageStubParameters?.[0])
				if(info) deletedMessages.push(info)
			}
		}
		return deletedMessages
	}
}

export const createMessageStoreHandler = (store: MessageStore) => {
	return ({ messages }: { messages: WAMessage[] }) => {
		const regular = messages.filter(msg => {
			const c = msg.message
			if(!c) return false
			if(c.protocolMessage) return false
			if(c.senderKeyDistributionMessage) return false
			return true
		})
		store.storeMessages(regular)
	}
}

export default { MessageStore, isDeleteMessage, getDeletedMessageKey, createAntiDeleteHandler, createMessageStoreHandler }
