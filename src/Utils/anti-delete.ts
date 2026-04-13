/**
 * Anti-Delete / Message Store
 *
 * Feature to store and recover deleted messages.
 *
 * @module anti-delete
 */

import { proto } from '../../WAProto/index.js'
import type { WAMessage, WAMessageKey } from '../Types'

// =====================================================
// TYPES
// =====================================================

export interface StoredMessage {
	/** Original message */
	message: WAMessage
	/** Timestamp when stored */
	storedAt: number
	/** Whether deleted */
	isDeleted: boolean
	/** Timestamp when deleted */
	deletedAt?: number
	/** Who deleted it */
	deletedBy?: string
}

export interface DeletedMessageInfo {
	/** Original message before deletion */
	originalMessage: WAMessage
	/** Key of the deleted message */
	key: WAMessageKey
	/** Timestamp when deleted */
	deletedAt: number
	/** Who deleted it (participant for groups) */
	deletedBy?: string
	/** Whether deleted by the sender (delete for everyone) */
	isRevokedBySender: boolean
}

export interface MessageStoreOptions {
	/** Max messages per chat */
	maxMessagesPerChat?: number
	/** TTL in ms (default 24 hours) */
	ttl?: number
	/** Auto cleanup interval in ms */
	cleanupInterval?: number
}

// =====================================================
// MESSAGE STORE CLASS
// =====================================================

export class MessageStore {
	private store: Map<string, Map<string, StoredMessage>> = new Map()
	private deletedMessages: Map<string, DeletedMessageInfo> = new Map()
	private options: Required<MessageStoreOptions>
	private cleanupTimer?: ReturnType<typeof setInterval>

	constructor(options: MessageStoreOptions = {}) {
		this.options = {
			maxMessagesPerChat: options.maxMessagesPerChat || 1000,
			ttl: options.ttl || 24 * 60 * 60 * 1000, // 24 hours
			cleanupInterval: options.cleanupInterval || 60 * 60 * 1000 // 1 hour
		}
		this.startCleanup()
	}

	private startCleanup() {
		this.cleanupTimer = setInterval(() => {
			this.cleanup()
		}, this.options.cleanupInterval)
	}

	stopCleanup() {
		if (this.cleanupTimer) {
			clearInterval(this.cleanupTimer)
		}
	}

	cleanup() {
		const now = Date.now()
		const cutoff = now - this.options.ttl

		for (const [chatId, messages] of this.store) {
			for (const [msgId, stored] of messages) {
				if (stored.storedAt < cutoff) {
					messages.delete(msgId)
				}
			}
			if (messages.size === 0) {
				this.store.delete(chatId)
			}
		}

		for (const [key, info] of this.deletedMessages) {
			if (info.deletedAt < cutoff) {
				this.deletedMessages.delete(key)
			}
		}
	}

	private getKey(key: WAMessageKey): string {
		return `${key.remoteJid}:${key.id}`
	}

	storeMessage(message: WAMessage): void {
		const chatId = message.key.remoteJid
		if (!chatId || !message.key.id) return

		let chatMessages = this.store.get(chatId)
		if (!chatMessages) {
			chatMessages = new Map()
			this.store.set(chatId, chatMessages)
		}

		if (chatMessages.size >= this.options.maxMessagesPerChat) {
			const oldestKey = chatMessages.keys().next().value
			if (oldestKey) {
				chatMessages.delete(oldestKey)
			}
		}

		chatMessages.set(message.key.id, {
			message,
			storedAt: Date.now(),
			isDeleted: false
		})
	}

	storeMessages(messages: WAMessage[]): void {
		for (const msg of messages) {
			this.storeMessage(msg)
		}
	}

	getMessage(key: WAMessageKey): StoredMessage | undefined {
		const chatMessages = this.store.get(key.remoteJid!)
		if (!chatMessages) return undefined
		return chatMessages.get(key.id!)
	}

	getOriginalMessage(key: WAMessageKey): WAMessage | undefined {
		return this.getMessage(key)?.message
	}

	markAsDeleted(key: WAMessageKey, deletedBy?: string): DeletedMessageInfo | null {
		const stored = this.getMessage(key)
		if (!stored) return null

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

	getDeletedMessage(key: WAMessageKey): DeletedMessageInfo | undefined {
		return this.deletedMessages.get(this.getKey(key))
	}

	getAllDeletedMessages(): DeletedMessageInfo[] {
		return Array.from(this.deletedMessages.values())
	}

	getDeletedMessagesByChat(chatId: string): DeletedMessageInfo[] {
		return Array.from(this.deletedMessages.values()).filter(info => info.key.remoteJid === chatId)
	}

	getChatMessages(chatId: string): WAMessage[] {
		const chatMessages = this.store.get(chatId)
		if (!chatMessages) return []
		return Array.from(chatMessages.values()).map(s => s.message)
	}

	getChatIds(): string[] {
		return Array.from(this.store.keys())
	}

	getStats(): { totalChats: number; totalMessages: number; totalDeleted: number } {
		let totalMessages = 0
		for (const messages of this.store.values()) {
			totalMessages += messages.size
		}
		return {
			totalChats: this.store.size,
			totalMessages,
			totalDeleted: this.deletedMessages.size
		}
	}

	clear(): void {
		this.store.clear()
		this.deletedMessages.clear()
	}

	clearChat(chatId: string): void {
		this.store.delete(chatId)
	}

	getAllMessages(): { [jid: string]: WAMessage[] } {
		const all: { [jid: string]: WAMessage[] } = {}
		for (const [chatId, messages] of this.store) {
			all[chatId] = Array.from(messages.values()).map(s => s.message)
		}
		return all
	}
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/** Check whether a message is a delete/revoke message */
export const isDeleteMessage = (message: WAMessage): boolean => {
	const content = message.message
	if (!content) return false
	return content.protocolMessage?.type === proto.Message.ProtocolMessage.Type.REVOKE
}

/** Get the deleted message key from a revoke message */
export const getDeletedMessageKey = (message: WAMessage): WAMessageKey | null => {
	const content = message.message
	if (!content) return null
	const protoMsg = content.protocolMessage
	if (protoMsg?.type !== proto.Message.ProtocolMessage.Type.REVOKE) return null
	return protoMsg.key || null
}

/**
 * Create an anti-delete handler.
 * Attach to `sock.ev.on('messages.update', handler)`.
 */
export const createAntiDeleteHandler = (store: MessageStore) => {
	return (updates: { key: WAMessageKey; update: Partial<WAMessage> }[]) => {
		const deletedMessages: DeletedMessageInfo[] = []
		for (const { key, update } of updates) {
			if (update.messageStubType === proto.WebMessageInfo.StubType.REVOKE) {
				const deletedInfo = store.markAsDeleted(key, update.messageStubParameters?.[0])
				if (deletedInfo) {
					deletedMessages.push(deletedInfo)
				}
			}
		}
		return deletedMessages
	}
}

/**
 * Create a message store handler.
 * Attach to `sock.ev.on('messages.upsert', handler)`.
 */
export const createMessageStoreHandler = (store: MessageStore) => {
	return ({ messages }: { messages: WAMessage[] }) => {
		const regularMessages = messages.filter(msg => {
			const content = msg.message
			if (!content) return false
			if (content.protocolMessage) return false
			if (content.senderKeyDistributionMessage) return false
			return true
		})
		store.storeMessages(regularMessages)
	}
}
