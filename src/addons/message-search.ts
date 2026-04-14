import type { WAMessage } from '../Types'

export type MessageType =
	| 'text'
	| 'image'
	| 'video'
	| 'document'
	| 'audio'
	| 'sticker'
	| 'location'
	| 'contact'
	| 'other'

export interface RegexSearchOptions {
	jid?: string
	fromSender?: string
	fromMe?: boolean
	messageTypes?: MessageType[]
	limit?: number
}

export interface SearchOptions {
	jid?: string
	fromDate?: Date
	toDate?: Date
	fromSender?: string
	fromMe?: boolean
	messageTypes?: MessageType[]
	limit?: number
	caseSensitive?: boolean
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

export const calculateRelevance = (query: string, text: string, position: number): number => {
	let score = 100
	if (text.toLowerCase() === query.toLowerCase()) score += 50
	score -= Math.min(position / 10, 20)
	const lt = text.toLowerCase(),
		lq = query.toLowerCase()
	if (
		position === 0 ||
		lt[position - 1] === ' ' ||
		lt[position + lq.length] === ' ' ||
		position + lq.length === text.length
	)
		score += 20
	return Math.max(score, 0)
}

export const searchMessages = (messages: WAMessage[], query: string, options: SearchOptions = {}): SearchResult[] => {
	const results: SearchResult[] = []
	const sq = options.caseSensitive ? query : query.toLowerCase()
	for (const message of messages) {
		if (options.jid && message.key.remoteJid !== options.jid) continue
		const ts = message.messageTimestamp
		const mt = ts ? new Date((typeof ts === 'number' ? ts : Number(ts)) * 1000) : null
		if (options.fromDate && mt && mt < options.fromDate) continue
		if (options.toDate && mt && mt > options.toDate) continue
		if (options.fromSender && message.key.participant !== options.fromSender) continue
		if (options.fromMe !== undefined && message.key.fromMe !== options.fromMe) continue
		if (options.messageTypes?.length) {
			if (!options.messageTypes.includes(getMessageType(message))) continue
		}
		const text = extractMessageText(message)
		if (!text) continue
		const st = options.caseSensitive ? text : text.toLowerCase()
		const pos = st.indexOf(sq)
		if (pos !== -1) {
			results.push({
				message,
				matchedText: text.substring(Math.max(0, pos - 20), Math.min(text.length, pos + query.length + 20)),
				matchPosition: pos,
				relevanceScore: calculateRelevance(query, text, pos)
			})
		}
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
		if (options.messageTypes?.length) {
			if (!options.messageTypes.includes(getMessageType(message))) continue
		}
		const text = extractMessageText(message)
		if (!text) continue
		const match = text.match(pattern)
		if (match) results.push({ message, matchedText: match[0], matchPosition: match.index ?? 0, relevanceScore: 100 })
		if (options.limit && results.length >= options.limit) break
	}
	return results
}

export class MessageSearchManager {
	private messages: WAMessage[] = []
	private messageIndex = new Map<string, WAMessage>()

	addMessages(messages: WAMessage[]) {
		for (const msg of messages) {
			const id = msg.key.id
			if (id && !this.messageIndex.has(id)) {
				this.messages.push(msg)
				this.messageIndex.set(id, msg)
			}
		}
	}

	removeMessages(messageIds: string[]) {
		const idSet = new Set(messageIds)
		this.messages = this.messages.filter(m => !idSet.has(m.key.id || ''))
		for (const id of messageIds) this.messageIndex.delete(id)
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
	searchRegex(pattern: RegExp, options?: Omit<SearchOptions, 'caseSensitive'>) {
		return searchMessagesRegex(this.messages, pattern, options)
	}
	getByJid(jid: string) {
		return this.messages.filter(m => m.key.remoteJid === jid)
	}
	getBySender(sender: string) {
		return this.messages.filter(m => m.key.participant === sender || m.key.remoteJid === sender)
	}
	getByType(type: MessageType) {
		return this.messages.filter(m => getMessageType(m) === type)
	}
	getById(id: string) {
		return this.messageIndex.get(id)
	}
}

export const createMessageSearch = () => new MessageSearchManager()
