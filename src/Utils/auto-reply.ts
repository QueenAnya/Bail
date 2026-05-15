import type { AnyMessageContent, WAMessage } from '../Types/index.js'
import { randomBytes } from 'crypto'

export interface AutoReplyRule {
	id: string
	keywords?: string[]
	pattern?: RegExp
	exactMatch?: string
	response:
		| AnyMessageContent
		| ((message: WAMessage, match: RegExpMatchArray | null) => AnyMessageContent | Promise<AnyMessageContent>)
	allowedJids?: string[]
	blockedJids?: string[]
	groupsOnly?: boolean
	privateOnly?: boolean
	cooldown?: number
	quoted?: boolean
	active?: boolean
	priority?: number
}

export interface AutoReplyOptions {
	globalCooldown?: number
	simulateTyping?: boolean
	typingDuration?: number
	multiMatch?: boolean
	onReply?: (rule: AutoReplyRule, message: WAMessage, response: AnyMessageContent) => void
	onError?: (error: Error, rule: AutoReplyRule, message: WAMessage) => void
}

export type AutoReplySendFunction = (
	jid: string,
	content: AnyMessageContent,
	options?: { quoted?: WAMessage }
) => Promise<WAMessage | undefined>
export type PresenceFunction = (jid: string, presence: 'composing' | 'paused') => Promise<void>

export class AutoReplyHandler {
	private rules = new Map<string, AutoReplyRule>()
	private cooldowns = new Map<string, number>()
	private globalCooldown = new Map<string, number>()
	private sendMessage: AutoReplySendFunction
	private sendPresence?: PresenceFunction
	private options: Required<AutoReplyOptions>

	constructor(sendMessage: AutoReplySendFunction, sendPresence?: PresenceFunction, options: AutoReplyOptions = {}) {
		this.sendMessage = sendMessage
		this.sendPresence = sendPresence
		this.options = {
			globalCooldown: options.globalCooldown ?? 1000,
			simulateTyping: options.simulateTyping ?? false,
			typingDuration: options.typingDuration ?? 1000,
			multiMatch: options.multiMatch ?? false,
			onReply: options.onReply ?? (() => {}),
			onError: options.onError ?? (() => {})
		}
	}

	addRule(rule: Omit<AutoReplyRule, 'id'> & { id?: string }): AutoReplyRule {
		const id = rule.id || `rule_${randomBytes(4).toString('hex')}`
		const full: AutoReplyRule = { active: true, priority: 0, ...rule, id }
		this.rules.set(id, full)
		return full
	}

	removeRule(id: string): boolean {
		return this.rules.delete(id)
	}
	getRules(): AutoReplyRule[] {
		return [...this.rules.values()].sort((a, b) => (b.priority || 0) - (a.priority || 0))
	}
	getRule(id: string): AutoReplyRule | undefined {
		return this.rules.get(id)
	}
	setRuleActive(id: string, active: boolean): boolean {
		const rule = this.rules.get(id)
		if (!rule) return false
		rule.active = active
		return true
	}
	clearRules() {
		this.rules.clear()
	}

	async processMessage(message: WAMessage): Promise<boolean> {
		const jid = message.key.remoteJid!
		const isGroup = jid.endsWith('@g.us')
		const now = Date.now()

		const lastGlobal = this.globalCooldown.get(jid) || 0
		if (now - lastGlobal < this.options.globalCooldown) return false

		const text = this.extractText(message)
		if (!text) return false

		let replied = false
		for (const rule of this.getRules()) {
			if (!rule.active) continue
			if (rule.groupsOnly && !isGroup) continue
			if (rule.privateOnly && isGroup) continue
			if (rule.allowedJids && !rule.allowedJids.includes(jid)) continue
			if (rule.blockedJids && rule.blockedJids.includes(jid)) continue

			const lastRule = this.cooldowns.get(`${rule.id}:${jid}`) || 0
			if (rule.cooldown && now - lastRule < rule.cooldown) continue

			const match = this.matchRule(rule, text)
			if (match === null) continue

			try {
				let response: AnyMessageContent
				if (typeof rule.response === 'function') {
					response = await rule.response(message, match instanceof Array ? match : null)
				} else {
					response = rule.response
				}

				if (this.options.simulateTyping && this.sendPresence) {
					await this.sendPresence(jid, 'composing')
					await new Promise(r => setTimeout(r, this.options.typingDuration))
					await this.sendPresence(jid, 'paused')
				}

				await this.sendMessage(jid, response, rule.quoted ? { quoted: message } : undefined)
				this.cooldowns.set(`${rule.id}:${jid}`, now)
				this.globalCooldown.set(jid, now)
				this.options.onReply(rule, message, response)
				replied = true

				if (!this.options.multiMatch) break
			} catch (err: any) {
				this.options.onError(err, rule, message)
			}
		}

		return replied
	}

	private extractText(message: WAMessage): string {
		const c = message.message
		if (!c) return ''
		return c.conversation || c.extendedTextMessage?.text || c.imageMessage?.caption || c.videoMessage?.caption || ''
	}

	private matchRule(rule: AutoReplyRule, text: string): true | RegExpMatchArray | null {
		const lower = text.toLowerCase()
		if (rule.exactMatch && lower === rule.exactMatch.toLowerCase()) return true
		if (rule.pattern) {
			const m = text.match(rule.pattern)
			return m
		}
		if (rule.keywords?.some(k => lower.includes(k.toLowerCase()))) return true
		return null
	}
}

export const createAutoReply = (
	sendMessage: AutoReplySendFunction,
	sendPresence?: PresenceFunction,
	options?: AutoReplyOptions
): AutoReplyHandler => new AutoReplyHandler(sendMessage, sendPresence, options)
