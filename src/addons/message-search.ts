/**
 * Message Search Utilities
 * Source: @innovatorssoft/baileys (message-search.js) — converted to TypeScript
 */

import type { WAMessage } from '../Types/index.js'

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

export const extractMessageText = (msg: WAMessage): string => {
	const c = msg.message
	if (!c) return ''
	return (
		c.conversation ??
		c.extendedTextMessage?.text ??
		c.imageMessage?.caption ??
		c.videoMessage?.caption ??
		c.documentMessage?.caption ??
		c.documentMessage?.fileName ??
		c.locationMessage?.name ??
		c.locationMessage?.address ??
		c.contactMessage?.displayName ??
		c.pollCreationMessage?.name ??
		''
	)
}

const getMessageType = (msg: WAMessage): MessageType => {
	const c = msg.message
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

const calcRelevance = (query: string, text: string, pos: number): number => {
	let score = 100
	if (text.toLowerCase() === query.toLowerCase()) score += 50
	score -= Math.min(pos / 10, 20)
	const lo = text.toLowerCase()
	const lq = query.toLowerCase()
	if (pos === 0 || lo[pos - 1] === ' ' || lo[pos + lq.length] === ' ' || pos + lq.length === text.length) score += 20
	return Math.max(score, 0)
}

export const searchMessages = (messages: WAMessage[], query: string, options: SearchOptions = {}): SearchResult[] => {
	const results: SearchResult[] = []
	const q = options.caseSensitive ? query : query.toLowerCase()

	for (const msg of messages) {
		if (options.jid && msg.key.remoteJid !== options.jid) continue
		if (options.fromSender && msg.key.participant !== options.fromSender) continue
		if (options.fromMe !== undefined && msg.key.fromMe !== options.fromMe) continue

		const ts = msg.messageTimestamp
		const t = ts ? new Date(typeof ts === 'number' ? ts * 1000 : Number(ts) * 1000) : null
		if (options.fromDate && t && t < options.fromDate) continue
		if (options.toDate && t && t > options.toDate) continue
		if (options.messageTypes?.length && !options.messageTypes.includes(getMessageType(msg))) continue

		const text = extractMessageText(msg)
		if (!text) continue
		const searchIn = options.caseSensitive ? text : text.toLowerCase()
		const pos = searchIn.indexOf(q)
		if (pos === -1) continue

		results.push({
			message: msg,
			matchedText: text.substring(Math.max(0, pos - 20), Math.min(text.length, pos + query.length + 20)),
			matchPosition: pos,
			relevanceScore: calcRelevance(query, text, pos)
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
	for (const msg of messages) {
		if (options.jid && msg.key.remoteJid !== options.jid) continue
		if (options.fromSender && msg.key.participant !== options.fromSender) continue
		if (options.fromMe !== undefined && msg.key.fromMe !== options.fromMe) continue
		if (options.messageTypes?.length && !options.messageTypes.includes(getMessageType(msg))) continue
		const text = extractMessageText(msg)
		if (!text) continue
		const match = text.match(pattern)
		if (match)
			results.push({ message: msg, matchedText: match[0]!, matchPosition: match.index ?? 0, relevanceScore: 100 })
		if (options.limit && results.length >= options.limit) break
	}
	return results
}

export class MessageSearchManager {
	private messages: WAMessage[] = []
	private index: Map<string, WAMessage> = new Map()

	addMessages(msgs: WAMessage[]) {
		for (const m of msgs) {
			const id = m.key.id
			if (id && !this.index.has(id)) {
				this.messages.push(m)
				this.index.set(id, m)
			}
		}
	}
	removeMessages(ids: string[]) {
		const s = new Set(ids)
		this.messages = this.messages.filter(m => !s.has(m.key.id ?? ''))
		ids.forEach(id => this.index.delete(id))
	}
	clear() {
		this.messages = []
		this.index.clear()
	}
	get count() {
		return this.messages.length
	}

	search(query: string, opts?: SearchOptions) {
		return searchMessages(this.messages, query, opts)
	}
	searchRegex(pattern: RegExp, opts?: Omit<SearchOptions, 'caseSensitive'>) {
		return searchMessagesRegex(this.messages, pattern, opts)
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
		return this.index.get(id)
	}
}

export const createMessageSearch = () => new MessageSearchManager()
