/**
 * Anti-Delete / Message Store
 *
 * Source: @innovatorssoft/baileys (anti-delete.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Intercepts REVOKE protocol messages and recovers the original
 * message content before WhatsApp deletes it.
 */

import { proto } from '../../WAProto/index.js'
import type { WAMessage, WAMessageKey } from '../Types/index.js'

// ─── Types ────────────────────────────────────────────────────────────────────

export type MessageStoreOptions = {
	/** Max messages to keep per chat (default: 1000) */
	maxMessagesPerChat?: number
	/** TTL in ms before a message is evicted (default: 24h) */
	ttl?: number
	/** Interval in ms for the cleanup sweep (default: 1h) */
	cleanupInterval?: number
}

type StoredMessage = {
	message: WAMessage
	storedAt: number
	isDeleted: boolean
	deletedAt?: number
	deletedBy?: string
}

export type DeletedMessageInfo = {
	originalMessage: WAMessage
	key: WAMessageKey
	deletedAt: number
	deletedBy?: string
	isRevokedBySender: boolean
}

// ─── MessageStore ─────────────────────────────────────────────────────────────

/**
 * In-memory store for WhatsApp messages with anti-delete support.
 *
 * @example
 * const store = new MessageStore()
 * sock.ev.on('messages.upsert', createMessageStoreHandler(store))
 * sock.ev.on('messages.update', createAntiDeleteHandler(store, (info) => {
 *     console.log('Message was deleted:', info.originalMessage)
 * }))
 */
export class MessageStore {
	private readonly store = new Map<string, Map<string, StoredMessage>>()
	private readonly deletedMessages = new Map<string, DeletedMessageInfo>()
	private readonly options: Required<MessageStoreOptions>
	private cleanupTimer?: ReturnType<typeof setInterval>

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
		this.cleanupTimer.unref?.()
	}

	/** Stop the background cleanup timer (call before shutting down). */
	stopCleanup() {
		if (this.cleanupTimer) clearInterval(this.cleanupTimer)
	}

	private cleanup() {
		const cutoff = Date.now() - this.options.ttl
		for (const [chatId, messages] of this.store) {
			for (const [msgId, stored] of messages) {
				if (stored.storedAt < cutoff) messages.delete(msgId)
			}
			if (messages.size === 0) this.store.delete(chatId)
		}
		for (const [key, info] of this.deletedMessages) {
			if (info.deletedAt < cutoff) this.deletedMessages.delete(key)
		}
	}

	private storeKey(key: WAMessageKey): string {
		return `${key.remoteJid}:${key.id}`
	}

	/** Store a single message. */
	storeMessage(message: WAMessage) {
		const chatId = message.key.remoteJid
		if (!chatId || !message.key.id) return
		let chatMessages = this.store.get(chatId)
		if (!chatMessages) {
			chatMessages = new Map()
			this.store.set(chatId, chatMessages)
		}
		if (chatMessages.size >= this.options.maxMessagesPerChat) {
			const oldestKey = chatMessages.keys().next().value
			if (oldestKey) chatMessages.delete(oldestKey)
		}
		chatMessages.set(message.key.id, { message, storedAt: Date.now(), isDeleted: false })
	}

	/** Store multiple messages at once. */
	storeMessages(messages: WAMessage[]) {
		for (const msg of messages) this.storeMessage(msg)
	}

	/** Retrieve a stored message entry. */
	getMessage(key: WAMessageKey): StoredMessage | undefined {
		return this.store.get(key.remoteJid ?? '')?.get(key.id ?? '')
	}

	/** Retrieve the original WAMessage (for anti-delete). */
	getOriginalMessage(key: WAMessageKey): WAMessage | undefined {
		return this.getMessage(key)?.message
	}

	/**
	 * Mark a message as deleted and record who deleted it.
	 * Returns the DeletedMessageInfo or null if the message wasn't in the store.
	 */
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
		this.deletedMessages.set(this.storeKey(key), info)
		return info
	}

	getDeletedMessage(key: WAMessageKey): DeletedMessageInfo | undefined {
		return this.deletedMessages.get(this.storeKey(key))
	}

	getAllDeletedMessages(): DeletedMessageInfo[] {
		return Array.from(this.deletedMessages.values())
	}

	getDeletedMessagesByChat(chatId: string): DeletedMessageInfo[] {
		return Array.from(this.deletedMessages.values()).filter(info => info.key.remoteJid === chatId)
	}

	getChatMessages(chatId: string): WAMessage[] {
		return Array.from(this.store.get(chatId)?.values() ?? []).map(s => s.message)
	}

	getChatIds(): string[] {
		return Array.from(this.store.keys())
	}

	getStats() {
		let totalMessages = 0
		for (const messages of this.store.values()) totalMessages += messages.size
		return {
			totalChats: this.store.size,
			totalMessages,
			totalDeleted: this.deletedMessages.size
		}
	}

	getAllMessages(): Record<string, WAMessage[]> {
		const all: Record<string, WAMessage[]> = {}
		for (const [chatId, messages] of this.store) {
			all[chatId] = Array.from(messages.values()).map(s => s.message)
		}
		return all
	}

	clear() {
		this.store.clear()
		this.deletedMessages.clear()
	}

	clearChat(chatId: string) {
		this.store.delete(chatId)
	}
}

// ─── Helper functions ─────────────────────────────────────────────────────────

/** Check if a WAMessage is a delete/revoke message. */
export const isDeleteMessage = (message: WAMessage): boolean => {
	return message.message?.protocolMessage?.type === proto.Message.ProtocolMessage.Type.REVOKE
}

/** Extract the key of the message that was deleted from a revoke message. */
export const getDeletedMessageKey = (message: WAMessage): WAMessageKey | null => {
	const protoMsg = message.message?.protocolMessage
	if (protoMsg?.type !== proto.Message.ProtocolMessage.Type.REVOKE) return null
	return protoMsg.key ?? null
}

// ─── Event handlers ───────────────────────────────────────────────────────────

/**
 * Create a `messages.update` handler that detects deleted messages and
 * recovers them from the store.
 *
 * @param store - The MessageStore instance
 * @param onDelete - Callback fired for each recovered deleted message
 * @returns Handler to pass to `sock.ev.on('messages.update', ...)`
 */
export const createAntiDeleteHandler = (store: MessageStore, onDelete?: (info: DeletedMessageInfo) => void) => {
	return (updates: { key: WAMessageKey; update: Partial<WAMessage> }[]): DeletedMessageInfo[] => {
		const deleted: DeletedMessageInfo[] = []
		for (const { key, update } of updates) {
			if (update.messageStubType === proto.WebMessageInfo.StubType.REVOKE) {
				const info = store.markAsDeleted(key, update.messageStubParameters?.[0])
				if (info) {
					deleted.push(info)
					onDelete?.(info)
				}
			}
		}
		return deleted
	}
}

/**
 * Create a `messages.upsert` handler that stores incoming messages.
 *
 * @param store - The MessageStore instance
 * @returns Handler to pass to `sock.ev.on('messages.upsert', ...)`
 */
export const createMessageStoreHandler = (store: MessageStore) => {
	return ({ messages }: { messages: WAMessage[] }) => {
		const regular = messages.filter(msg => {
			const content = msg.message
			if (!content) return false
			if (content.protocolMessage) return false
			if (content.senderKeyDistributionMessage) return false
			return true
		})
		store.storeMessages(regular)
	}
}
