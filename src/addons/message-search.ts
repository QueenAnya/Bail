/**
 * Message Search Utilities
 * Source: @innovatorssoft/baileys message-search.js
 */
import { proto } from '../../WAProto/index.js'

export type SearchMessageType =
	| 'text'
	| 'image'
	| 'video'
	| 'document'
	| 'audio'
	| 'sticker'
	| 'location'
	| 'contact'
	| 'other'
export type SearchResult = {
	message: proto.IWebMessageInfo
	matchedText: string
	matchPosition: number
	relevanceScore: number
}
export type SearchOptions = {
	jid?: string
	fromDate?: Date
	toDate?: Date
	fromSender?: string
	fromMe?: boolean
	messageTypes?: SearchMessageType[]
	caseSensitive?: boolean
	limit?: number
}

export const extractMessageText = (message: proto.IWebMessageInfo): string => {
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

const getMessageType = (message: proto.IWebMessageInfo): SearchMessageType => {
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

const calculateRelevance = (query: string, text: string, position: number): number => {
	let score = 100
	if (text.toLowerCase() === query.toLowerCase()) score += 50
	score -= Math.min(position / 10, 20)
	const lq = query.toLowerCase(),
		lt = text.toLowerCase()
	if (
		position === 0 ||
		lt[position - 1] === ' ' ||
		lt[position + lq.length] === ' ' ||
		position + lq.length === text.length
	)
		score += 20
	return Math.max(score, 0)
}

export const searchMessages = (
	messages: proto.IWebMessageInfo[],
	query: string,
	options: SearchOptions = {}
): SearchResult[] => {
	const results: SearchResult[] = []
	const searchQuery = options.caseSensitive ? query : query.toLowerCase()
	for (const message of messages) {
		if (options.jid && message.key?.remoteJid !== options.jid) continue
		const ts = message.messageTimestamp
		const msgTime = ts ? new Date(typeof ts === 'number' ? ts * 1000 : Number(ts) * 1000) : null
		if (options.fromDate && msgTime && msgTime < options.fromDate) continue
		if (options.toDate && msgTime && msgTime > options.toDate) continue
		if (options.fromSender && message.key?.participant !== options.fromSender) continue
		if (options.fromMe !== undefined && message.key?.fromMe !== options.fromMe) continue
		if (options.messageTypes?.length && !options.messageTypes.includes(getMessageType(message))) continue
		const text = extractMessageText(message)
		if (!text) continue
		const searchText = options.caseSensitive ? text : text.toLowerCase()
		const position = searchText.indexOf(searchQuery)
		if (position !== -1) {
			results.push({
				message,
				matchedText: text.substring(Math.max(0, position - 20), Math.min(text.length, position + query.length + 20)),
				matchPosition: position,
				relevanceScore: calculateRelevance(query, text, position)
			})
		}
		if (options.limit && results.length >= options.limit) break
	}
	return results.sort((a, b) => b.relevanceScore - a.relevanceScore)
}

export const searchMessagesRegex = (
	messages: proto.IWebMessageInfo[],
	pattern: RegExp,
	options: Omit<SearchOptions, 'caseSensitive' | 'fromDate' | 'toDate'> = {}
): SearchResult[] => {
	const results: SearchResult[] = []
	for (const message of messages) {
		if (options.jid && message.key?.remoteJid !== options.jid) continue
		if (options.fromSender && message.key?.participant !== options.fromSender) continue
		if (options.fromMe !== undefined && message.key?.fromMe !== options.fromMe) continue
		if (options.messageTypes?.length && !options.messageTypes.includes(getMessageType(message))) continue
		const text = extractMessageText(message)
		if (!text) continue
		const match = text.match(pattern)
		if (match) results.push({ message, matchedText: match[0], matchPosition: match.index || 0, relevanceScore: 100 })
		if (options.limit && results.length >= options.limit) break
	}
	return results
}

export class MessageSearchManager {
	private messages: proto.IWebMessageInfo[] = []
	private messageIndex = new Map<string, proto.IWebMessageInfo>()

	addMessages(messages: proto.IWebMessageInfo[]) {
		for (const msg of messages) {
			const id = msg.key?.id
			if (id && !this.messageIndex.has(id)) {
				this.messages.push(msg)
				this.messageIndex.set(id, msg)
			}
		}
	}
	removeMessages(ids: string[]) {
		const idSet = new Set(ids)
		this.messages = this.messages.filter(m => !idSet.has(m.key?.id || ''))
		for (const id of ids) this.messageIndex.delete(id)
	}
	clear() {
		this.messages = []
		this.messageIndex.clear()
	}
	get count() {
		return this.messages.length
	}
	search(query: string, options?: SearchOptions) {
		return searchMessages(this.messages, query, options)
	}
	searchRegex(pattern: RegExp, options?: Omit<SearchOptions, 'caseSensitive' | 'fromDate' | 'toDate'>) {
		return searchMessagesRegex(this.messages, pattern, options)
	}
	getByJid(jid: string) {
		return this.messages.filter(m => m.key?.remoteJid === jid)
	}
	getBySender(sender: string) {
		return this.messages.filter(m => m.key?.participant === sender || m.key?.remoteJid === sender)
	}
	getByType(type: MessageType) {
		return this.messages.filter(m => getMessageType(m) === type)
	}
	getById(id: string) {
		return this.messageIndex.get(id)
	}
}

export const createMessageSearch = () => new MessageSearchManager()
