/**
 * Message Search Utilities
 * Part of innovatorssoft/baileys addons
 */

import type { WAMessage } from '../Types'

export type MessageType =
	| 'text'
	| 'image'
	| 'video'
	| 'audio'
	| 'document'
	| 'sticker'
	| 'location'
	| 'contact'
	| 'other'

export interface SearchOptions {
	jid?: string
	fromDate?: Date
	toDate?: Date
	fromSender?: string
	fromMe?: boolean
	messageTypes?: MessageType[]
	caseSensitive?: boolean
	limit?: number
}

export interface SearchResult {
	message: WAMessage
	matchedText: string
	matchPosition: number
	relevanceScore: number
}

export const extractMessageText = (message: WAMessage): string => {
	const c = message.message
	if (!c) return ''
	return (
		c.conversation ||
		c.extendedTextMessage?.text ||
		c.imageMessage?.caption ||
		c.videoMessage?.caption ||
		c.documentMessage?.caption ||
		c.documentMessage?.fileName ||
		c.locationMessage?.name ||
		c.locationMessage?.address ||
		c.contactMessage?.displayName ||
		c.pollCreationMessage?.name ||
		''
	)
}

const getMessageType = (message: WAMessage): MessageType => {
	const c = message.message
	if (!c) return 'other'
	if (c.conversation || c.extendedTextMessage) return 'text'
	if (c.imageMessage) return 'image'
	if (c.videoMessage) return 'video'
	if (c.documentMessage) return 'document'
	if (c.audioMessage) return 'audio'
	if (c.stickerMessage) return 'sticker'
	if (c.locationMessage || c.liveLocationMessage) return 'location'
	if (c.contactMessage || c.contactsArrayMessage) return 'contact'
	return 'other'
}

export const searchMessages = (messages: WAMessage[], query: string, options: SearchOptions = {}): SearchResult[] => {
	const results: SearchResult[] = []
	const searchQuery = options.caseSensitive ? query : query.toLowerCase()

	for (const message of messages) {
		if (options.jid && message.key.remoteJid !== options.jid) continue
		const ts = message.messageTimestamp
		const msgTime = ts ? new Date((typeof ts === 'number' ? ts : Number(ts)) * 1000) : null
		if (options.fromDate && msgTime && msgTime < options.fromDate) continue
		if (options.toDate && msgTime && msgTime > options.toDate) continue
		if (options.fromSender && message.key.participant !== options.fromSender) continue
		if (options.fromMe !== undefined && message.key.fromMe !== options.fromMe) continue
		if (options.messageTypes?.length && !options.messageTypes.includes(getMessageType(message))) continue

		const text = extractMessageText(message)
		if (!text) continue
		const searchText = options.caseSensitive ? text : text.toLowerCase()
		const position = searchText.indexOf(searchQuery)
		if (position === -1) continue

		let score = 100
		if (text.toLowerCase() === query.toLowerCase()) score += 50
		score -= Math.min(position / 10, 20)
		if (position === 0 || searchText[position - 1] === ' ' || position + searchQuery.length === text.length) score += 20

		results.push({
			message,
			matchedText: text.substring(Math.max(0, position - 20), Math.min(text.length, position + query.length + 20)),
			matchPosition: position,
			relevanceScore: Math.max(score, 0)
		})
		if (options.limit && results.length >= options.limit) break
	}

	return results.sort((a, b) => b.relevanceScore - a.relevanceScore)
}

export const searchMessagesRegex = (
	messages: WAMessage[],
	pattern: RegExp,
	options: Omit<SearchOptions, 'caseSensitive'> = {}
): SearchResult[] => {
	const results: SearchResult[] = []
	for (const message of messages) {
		if (options.jid && message.key.remoteJid !== options.jid) continue
		if (options.fromSender && message.key.participant !== options.fromSender) continue
		if (options.fromMe !== undefined && message.key.fromMe !== options.fromMe) continue
		if (options.messageTypes?.length && !options.messageTypes.includes(getMessageType(message))) continue

		const text = extractMessageText(message)
		const match = text.match(pattern)
		if (match) {
			results.push({ message, matchedText: match[0], matchPosition: match.index || 0, relevanceScore: 100 })
		}
		if (options.limit && results.length >= options.limit) break
	}
	return results
}

export class MessageSearchManager {
	private messages: WAMessage[] = []
	private messageIndex: Map<string, WAMessage> = new Map()

	addMessages(messages: WAMessage[]): void {
		for (const msg of messages) {
			const id = msg.key.id
			if (id && !this.messageIndex.has(id)) {
				this.messages.push(msg)
				this.messageIndex.set(id, msg)
			}
		}
	}

	removeMessages(messageIds: string[]): void {
		const idSet = new Set(messageIds)
		this.messages = this.messages.filter(m => !idSet.has(m.key.id || ''))
		for (const id of messageIds) this.messageIndex.delete(id)
	}

	clear(): void {
		this.messages = []
		this.messageIndex.clear()
	}
	get count(): number {
		return this.messages.length
	}
	search(query: string, options?: SearchOptions): SearchResult[] {
		return searchMessages(this.messages, query, options)
	}
	searchRegex(pattern: RegExp, options?: SearchOptions): SearchResult[] {
		return searchMessagesRegex(this.messages, pattern, options)
	}
	getByJid(jid: string): WAMessage[] {
		return this.messages.filter(m => m.key.remoteJid === jid)
	}
	getBySender(sender: string): WAMessage[] {
		return this.messages.filter(m => m.key.participant === sender || m.key.remoteJid === sender)
	}
	getByType(type: MessageType): WAMessage[] {
		return this.messages.filter(m => getMessageType(m) === type)
	}
	getById(id: string): WAMessage | undefined {
		return this.messageIndex.get(id)
	}
}

export const createMessageSearch = (): MessageSearchManager => new MessageSearchManager()
