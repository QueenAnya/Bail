/**
 * Auto-Reply System
 * Source: @innovatorssoft/baileys (auto-reply.js) — converted to TypeScript
 */

import type { WAMessage } from '../Types/index.js'

export interface AutoReplyRule {
	id?: string
	keywords?: string[]
	pattern?: RegExp
	exactMatch?: string
	response: any | ((msg: WAMessage, match: RegExpMatchArray | string[]) => Promise<any> | any)
	priority?: number
	active?: boolean
	cooldown?: number
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
	onReply?: (rule: AutoReplyRule, msg: WAMessage, response: any) => void
	onError?: (err: Error, rule: AutoReplyRule, msg: WAMessage) => void
}

export class AutoReplyHandler {
	private rules = new Map<string, Required<AutoReplyRule>>()
	private cooldowns = new Map<string, number>()
	private globalCd = new Map<string, number>()
	private sendFn: (jid: string, content: any, opts?: any) => Promise<WAMessage | undefined>
	private presenceFn?: (jid: string, presence: string) => Promise<void>
	private options: Required<AutoReplyOptions>

	constructor(
		sendFn: (jid: string, content: any, opts?: any) => Promise<WAMessage | undefined>,
		presenceFn?: (jid: string, presence: string) => Promise<void>,
		options: AutoReplyOptions = {}
	) {
		this.sendFn = sendFn
		this.presenceFn = presenceFn
		this.options = {
			globalCooldown: options.globalCooldown ?? 1000,
			simulateTyping: options.simulateTyping ?? false,
			typingDuration: options.typingDuration ?? 1000,
			multiMatch: options.multiMatch ?? false,
			onReply: options.onReply ?? (() => {}),
			onError: options.onError ?? (() => {})
		}
	}

	private genId = () => `ar_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

	addRule(rule: AutoReplyRule): Required<AutoReplyRule> {
		if (!rule.keywords && !rule.pattern && !rule.exactMatch)
			throw new Error('Rule needs keywords, pattern, or exactMatch')
		const full = {
			...rule,
			id: rule.id ?? this.genId(),
			active: rule.active ?? true,
			priority: rule.priority ?? 0
		} as Required<AutoReplyRule>
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
	setRuleActive(id: string, v: boolean) {
		const r = this.rules.get(id)
		if (r) {
			r.active = v
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
	private checkGlobalCd(jid: string) {
		return Date.now() - (this.globalCd.get(jid) ?? 0) > this.options.globalCooldown
	}
	private setCooldown(ruleId: string, jid: string, ms: number) {
		this.cooldowns.set(`${ruleId}:${jid}`, Date.now() + ms)
		this.globalCd.set(jid, Date.now())
	}

	private matchRule(text: string, rule: Required<AutoReplyRule>): RegExpMatchArray | string[] | null {
		if (!rule.active) return null
		if (rule.exactMatch && text.toLowerCase() === rule.exactMatch.toLowerCase()) return [text]
		if (rule.keywords?.length) {
			const lo = text.toLowerCase()
			for (const kw of rule.keywords) {
				if (lo.includes(kw.toLowerCase())) return [kw]
			}
		}
		if (rule.pattern) return text.match(rule.pattern)
		return null
	}

	private isAllowed(jid: string, rule: Required<AutoReplyRule>) {
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
			content.conversation ??
			content.extendedTextMessage?.text ??
			content.imageMessage?.caption ??
			content.videoMessage?.caption ??
			''
		if (!text) return false
		const jid = message.key.remoteJid
		if (!jid || !this.checkGlobalCd(jid)) return false

		const sorted = Array.from(this.rules.values())
			.filter(r => r.active)
			.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
		let matched = false

		for (const rule of sorted) {
			if (!this.isAllowed(jid, rule)) continue
			if (rule.cooldown && !this.checkCooldown(rule.id, jid)) continue
			const match = this.matchRule(text, rule)
			if (!match) continue

			try {
				const response = typeof rule.response === 'function' ? await rule.response(message, match) : rule.response
				if (this.options.simulateTyping && this.presenceFn) {
					await this.presenceFn(jid, 'composing')
					await new Promise(r => setTimeout(r, this.options.typingDuration))
					await this.presenceFn(jid, 'paused')
				}
				await this.sendFn(jid, response, rule.quoted ? { quoted: message } : undefined)
				if (rule.cooldown) this.setCooldown(rule.id, jid, rule.cooldown)
				this.options.onReply(rule, message, response)
				matched = true
				if (!this.options.multiMatch) break
			} catch (err: any) {
				this.options.onError(err, rule, message)
			}
		}
		return matched
	}
}

export const createAutoReply = (
	sendFn: (jid: string, content: any, opts?: any) => Promise<WAMessage | undefined>,
	presenceFn?: (jid: string, presence: string) => Promise<void>,
	options?: AutoReplyOptions
) => new AutoReplyHandler(sendFn, presenceFn, options)
