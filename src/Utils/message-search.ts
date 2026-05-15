import type { WAMessage } from '../Types/index.js'

export interface SearchOptions {
	caseSensitive?: boolean
	jid?: string
	fromDate?: Date
	toDate?: Date
	limit?: number
	messageTypes?: ('text' | 'image' | 'video' | 'document' | 'audio' | 'sticker' | 'location' | 'contact')[]
	includeCaption?: boolean
	fromSender?: string
	fromMe?: boolean
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
	if (c.conversation) return c.conversation
	if (c.extendedTextMessage?.text) return c.extendedTextMessage.text
	if (c.imageMessage?.caption) return c.imageMessage.caption
	if (c.videoMessage?.caption) return c.videoMessage.caption
	if (c.documentMessage?.caption) return c.documentMessage.caption
	if (c.documentMessage?.fileName) return c.documentMessage.fileName
	if (c.locationMessage?.name) return c.locationMessage.name
	if (c.locationMessage?.address) return c.locationMessage.address
	if (c.contactMessage?.displayName) return c.contactMessage.displayName
	if (c.pollCreationMessage?.name) return c.pollCreationMessage.name
	return ''
}

const getMessageType = (message: WAMessage): string => {
	const c = message.message
	if (!c) return 'unknown'
	if (c.conversation || c.extendedTextMessage) return 'text'
	if (c.imageMessage) return 'image'
	if (c.videoMessage) return 'video'
	if (c.documentMessage) return 'document'
	if (c.audioMessage) return 'audio'
	if (c.stickerMessage) return 'sticker'
	if (c.locationMessage) return 'location'
	if (c.contactMessage || c.contactsArrayMessage) return 'contact'
	return 'unknown'
}

export const searchMessages = (messages: WAMessage[], query: string, options: SearchOptions = {}): SearchResult[] => {
	const { caseSensitive = false, jid, fromDate, toDate, limit, messageTypes, fromSender, fromMe } = options
	const q = caseSensitive ? query : query.toLowerCase()
	const results: SearchResult[] = []

	for (const msg of messages) {
		if (jid && msg.key.remoteJid !== jid) continue
		if (fromMe !== undefined && msg.key.fromMe !== fromMe) continue
		if (fromSender && msg.key.participant !== fromSender && msg.key.remoteJid !== fromSender) continue
		if (fromDate && msg.messageTimestamp && Number(msg.messageTimestamp) * 1000 < fromDate.getTime()) continue
		if (toDate && msg.messageTimestamp && Number(msg.messageTimestamp) * 1000 > toDate.getTime()) continue
		const msgType = getMessageType(msg)
		if (messageTypes && !messageTypes.includes(msgType as any)) continue
		const text = extractMessageText(msg)
		const searchText = caseSensitive ? text : text.toLowerCase()
		const pos = searchText.indexOf(q)
		if (pos === -1) continue
		results.push({ message: msg, matchedText: text, matchPosition: pos, relevanceScore: 1 - pos / text.length })
		if (limit && results.length >= limit) break
	}

	return results.sort((a, b) => b.relevanceScore - a.relevanceScore)
}

export const searchMessagesRegex = (
	messages: WAMessage[],
	pattern: RegExp,
	options: Omit<SearchOptions, 'caseSensitive'> = {}
): SearchResult[] => {
	const results: SearchResult[] = []
	const { jid, fromMe, fromSender, fromDate, toDate, limit } = options
	for (const msg of messages) {
		if (jid && msg.key.remoteJid !== jid) continue
		if (fromMe !== undefined && msg.key.fromMe !== fromMe) continue
		if (fromSender && msg.key.participant !== fromSender && msg.key.remoteJid !== fromSender) continue
		if (fromDate && msg.messageTimestamp && Number(msg.messageTimestamp) * 1000 < fromDate.getTime()) continue
		if (toDate && msg.messageTimestamp && Number(msg.messageTimestamp) * 1000 > toDate.getTime()) continue
		const text = extractMessageText(msg)
		const match = text.match(pattern)
		if (!match) continue
		results.push({ message: msg, matchedText: text, matchPosition: match.index || 0, relevanceScore: 1 })
		if (limit && results.length >= limit) break
	}
	return results
}

export class MessageSearchManager {
	private messages: WAMessage[] = []
	private messageIndex = new Map<string, WAMessage>()

	addMessages(messages: WAMessage[]) {
		for (const msg of messages) {
			const id = msg.key.id!
			if (!this.messageIndex.has(id)) {
				this.messages.push(msg)
				this.messageIndex.set(id, msg)
			}
		}
	}

	removeMessages(messageIds: string[]) {
		const ids = new Set(messageIds)
		this.messages = this.messages.filter(m => !ids.has(m.key.id!))
		for (const id of messageIds) this.messageIndex.delete(id)
	}

	clear() {
		this.messages = []
		this.messageIndex.clear()
	}
	get count() {
		return this.messages.length
	}
	search(query: string, options?: SearchOptions): SearchResult[] {
		return searchMessages(this.messages, query, options)
	}
	searchRegex(pattern: RegExp, options?: Omit<SearchOptions, 'caseSensitive'>): SearchResult[] {
		return searchMessagesRegex(this.messages, pattern, options)
	}
	getByJid(jid: string): WAMessage[] {
		return this.messages.filter(m => m.key.remoteJid === jid)
	}
	getBySender(sender: string): WAMessage[] {
		return this.messages.filter(m => m.key.participant === sender || m.key.remoteJid === sender)
	}
	getByType(type: string): WAMessage[] {
		return this.messages.filter(m => getMessageType(m) === type)
	}
	getById(id: string): WAMessage | undefined {
		return this.messageIndex.get(id)
	}
}

export const createMessageSearch = (): MessageSearchManager => new MessageSearchManager()
