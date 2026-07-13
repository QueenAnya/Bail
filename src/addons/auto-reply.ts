/**
 * Auto-Reply System
 * Source: @innovatorssoft/baileys auto-reply.js
 */
import { proto } from '../../WAProto/index.js'
import type { AnyMessageContent, MiscMessageGenerationOptions } from '../Types/index.js'

export type AutoReplyRule = {
	id?: string
	active?: boolean
	priority?: number
	keywords?: string[]
	pattern?: RegExp
	exactMatch?: string
	response:
		| AnyMessageContent
		| ((
				msg: proto.IWebMessageInfo,
				match: RegExpMatchArray | string[]
		  ) => Promise<AnyMessageContent> | AnyMessageContent)
	cooldown?: number
	quoted?: boolean
	groupsOnly?: boolean
	privateOnly?: boolean
	allowedJids?: string[]
	blockedJids?: string[]
}

type FullRule = Required<Pick<AutoReplyRule, 'id' | 'active' | 'priority'>> & AutoReplyRule

export type AutoReplyOptions = {
	globalCooldown?: number
	simulateTyping?: boolean
	typingDuration?: number
	multiMatch?: boolean
	onReply?: (rule: FullRule, msg: proto.IWebMessageInfo, response: AnyMessageContent) => void
	onError?: (err: Error, rule: FullRule, msg: proto.IWebMessageInfo) => void
}

type SendMessageFn = (jid: string, content: AnyMessageContent, options?: MiscMessageGenerationOptions) => Promise<any>
type SendPresenceFn = (jid: string, presence: 'composing' | 'recording' | 'paused') => Promise<void>

export class AutoReplyHandler {
	private rules = new Map<string, FullRule>()
	private cooldowns = new Map<string, number>()
	private globalCooldown = new Map<string, number>()
	private sendMessage: SendMessageFn
	private sendPresence?: SendPresenceFn
	private options: Required<AutoReplyOptions>

	constructor(sendMessage: SendMessageFn, sendPresence?: SendPresenceFn, options: AutoReplyOptions = {}) {
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

	addRule(rule: AutoReplyRule): FullRule {
		if (!rule.keywords && !rule.pattern && !rule.exactMatch)
			throw new Error('Rule must have at least one of: keywords, pattern, or exactMatch')
		const full = {
			...rule,
			id: rule.id ?? this.generateId(),
			active: rule.active ?? true,
			priority: rule.priority ?? 0
		} as FullRule
		this.rules.set(full.id, full)
		return full
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
		const key = `${ruleId}:${jid}`
		const last = this.cooldowns.get(key) ?? 0
		return Date.now() > last
	}
	private checkGlobalCooldown(jid: string) {
		const last = this.globalCooldown.get(jid) ?? 0
		return Date.now() - last > this.options.globalCooldown
	}
	private setCooldown(ruleId: string, jid: string, cooldown: number) {
		this.cooldowns.set(`${ruleId}:${jid}`, Date.now() + cooldown)
		this.globalCooldown.set(jid, Date.now())
	}

	private matchRule(text: string, rule: FullRule): RegExpMatchArray | string[] | null {
		if (!rule.active) return null
		if (rule.exactMatch && text.toLowerCase() === rule.exactMatch.toLowerCase()) return [text]
		if (rule.keywords?.length) {
			const lower = text.toLowerCase()
			for (const kw of rule.keywords) {
				if (lower.includes(kw.toLowerCase())) return [kw]
			}
		}
		if (rule.pattern) return text.match(rule.pattern)
		return null
	}

	private isJidAllowed(jid: string, rule: FullRule) {
		const isGroup = jid.endsWith('@g.us')
		if (jid.endsWith('@newsletter')) return false
		if (rule.groupsOnly && !isGroup) return false
		if (rule.privateOnly && isGroup) return false
		if (rule.allowedJids?.length && !rule.allowedJids.includes(jid)) return false
		if (rule.blockedJids?.includes(jid)) return false
		return true
	}

	async processMessage(message: proto.IWebMessageInfo): Promise<boolean> {
		const c = message.message
		if (!c) return false
		const text =
			c.conversation ||
			c.extendedTextMessage?.text ||
			c.imageMessage?.caption ||
			c.videoMessage?.caption ||
			c.documentMessage?.caption ||
			''
		if (!text) return false
		const jid = message.key?.remoteJid
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
				const response = typeof rule.response === 'function' ? await rule.response(message, match) : rule.response
				if (this.options.simulateTyping && this.sendPresence) {
					await this.sendPresence(jid, 'composing')
					await new Promise(r => setTimeout(r, this.options.typingDuration))
					await this.sendPresence(jid, 'paused')
				}
				await this.sendMessage(jid, response, rule.quoted ? { quoted: message as any } : undefined)
				if (rule.cooldown) this.setCooldown(rule.id, jid, rule.cooldown)
				this.options.onReply(rule, message, response)
				matched = true
				if (!this.options.multiMatch) break
			} catch (error) {
				this.options.onError(error as Error, rule, message)
			}
		}
		return matched
	}
}

export const createAutoReply = (
	sendMessage: SendMessageFn,
	sendPresence?: SendPresenceFn,
	options?: AutoReplyOptions
) => new AutoReplyHandler(sendMessage, sendPresence, options)
