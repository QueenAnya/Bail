import type { WAMessage, AnyMessageContent } from '../Types'

export interface AutoReplyRule {
	id?: string
	keywords?: string[]
	pattern?: RegExp
	exactMatch?: string
	response:
		| AnyMessageContent
		| ((message: WAMessage, match: RegExpMatchArray | string[]) => Promise<AnyMessageContent> | AnyMessageContent)
	cooldown?: number
	priority?: number
	active?: boolean
	groupsOnly?: boolean
	privateOnly?: boolean
	allowedJids?: string[]
	blockedJids?: string[]
	quoted?: boolean
}

export interface AutoReplyOptions {
	globalCooldown?: number
	simulateTyping?: boolean
	typingDuration?: number
	multiMatch?: boolean
	onReply?: (rule: AutoReplyRule, message: WAMessage, response: AnyMessageContent) => void
	onError?: (error: Error, rule: AutoReplyRule, message: WAMessage) => void
}

export class AutoReplyHandler {
	private rules = new Map<string, AutoReplyRule & { id: string }>()
	private cooldowns = new Map<string, number>()
	private globalCooldown = new Map<string, number>()
	private sendMessage: (jid: string, content: AnyMessageContent, options?: any) => Promise<any>
	private sendPresence?: (jid: string, presence: string) => Promise<void>
	private options: Required<AutoReplyOptions>

	constructor(
		sendMessage: (jid: string, content: AnyMessageContent, options?: any) => Promise<any>,
		sendPresence?: (jid: string, presence: string) => Promise<void>,
		options: AutoReplyOptions = {}
	) {
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

	private generateId() {
		return `ar_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	addRule(rule: AutoReplyRule) {
		const fullRule = {
			...rule,
			id: rule.id ?? this.generateId(),
			active: rule.active ?? true,
			priority: rule.priority ?? 0
		}
		if (!fullRule.keywords && !fullRule.pattern && !fullRule.exactMatch)
			throw new Error('Rule must have keywords, pattern, or exactMatch')
		this.rules.set(fullRule.id, fullRule)
		return fullRule
	}

	removeRule(id: string) {
		return this.rules.delete(id)
	}
	getRules() {
		return Array.from(this.rules.values())
	}
	getRule(id: string) {
		return this.rules.get(id)
	}
	setRuleActive(id: string, active: boolean) {
		const r = this.rules.get(id)
		if (r) {
			r.active = active
			return true
		}

		return false
	}
	clearRules() {
		this.rules.clear()
	}

	private checkCooldown(ruleId: string, jid: string) {
		return Date.now() - (this.cooldowns.get(`${ruleId}:${jid}`) ?? 0) > 0
	}

	private checkGlobalCooldown(jid: string) {
		return Date.now() - (this.globalCooldown.get(jid) ?? 0) > this.options.globalCooldown
	}

	private setCooldown(ruleId: string, jid: string, cooldown: number) {
		this.cooldowns.set(`${ruleId}:${jid}`, Date.now() + cooldown)
		this.globalCooldown.set(jid, Date.now())
	}

	private matchRule(text: string, rule: AutoReplyRule) {
		if (!rule.active) return null
		if (text.toLowerCase() === rule.exactMatch?.toLowerCase()) return [text]
		if (rule.keywords?.length) {
			const lower = text.toLowerCase()
			for (const kw of rule.keywords) if (lower.includes(kw.toLowerCase())) return [kw]
		}

		if (rule.pattern) return text.match(rule.pattern)
		return null
	}

	private isJidAllowed(jid: string, rule: AutoReplyRule) {
		const isGroup = jid.endsWith('@g.us')
		if (jid.endsWith('@newsletter')) return false
		if (rule.groupsOnly && !isGroup) return false
		if (rule.privateOnly && isGroup) return false
		if (rule.allowedJids?.length && !rule.allowedJids.includes(jid)) return false
		if (rule.blockedJids?.includes(jid)) return false
		return true
	}

	async processMessage(message: WAMessage): Promise<boolean> {
		const content = message.message
		if (!content) return false
		const text =
			content.conversation ||
			content.extendedTextMessage?.text ||
			content.imageMessage?.caption ||
			content.videoMessage?.caption ||
			content.documentMessage?.caption ||
			''
		if (!text) return false
		const jid = message.key.remoteJid
		if (!jid || !this.checkGlobalCooldown(jid)) return false

		const sortedRules = Array.from(this.rules.values())
			.filter(r => r.active)
			.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))

		let matched = false
		for (const rule of sortedRules) {
			if (!this.isJidAllowed(jid, rule)) continue
			if (rule.cooldown && !this.checkCooldown(rule.id, jid)) continue
			const match = this.matchRule(text, rule)
			if (!match) continue
			try {
				let response: AnyMessageContent
				if (typeof rule.response === 'function') response = await rule.response(message, match)
				else response = rule.response

				if (this.options.simulateTyping && this.sendPresence) {
					await this.sendPresence(jid, 'composing')
					await new Promise(r => setTimeout(r, this.options.typingDuration))
					await this.sendPresence(jid, 'paused')
				}

				await this.sendMessage(jid, response, rule.quoted ? { quoted: message } : undefined)
				if (rule.cooldown) this.setCooldown(rule.id, jid, rule.cooldown)
				this.options.onReply(rule, message, response)
				matched = true
				if (!this.options.multiMatch) break
			} catch (error: any) {
				this.options.onError(error, rule, message)
			}
		}

		return matched
	}
}

export const createAutoReply = (
	sendMessage: (jid: string, content: AnyMessageContent, options?: any) => Promise<any>,
	sendPresence?: (jid: string, presence: string) => Promise<void>,
	options?: AutoReplyOptions
) => new AutoReplyHandler(sendMessage, sendPresence, options)
