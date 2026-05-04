/**
 * Auto-Reply System — keyword/regex-based automatic response handler
 * Part of innovatorssoft/baileys addons
 */

import type { AnyMessageContent, WAMessage } from '../Types'

export interface AutoReplyRule {
	id: string
	keywords?: string[]
	pattern?: RegExp
	exactMatch?: string
	response:
		| AnyMessageContent
		| ((msg: WAMessage, match: RegExpMatchArray | null) => AnyMessageContent | Promise<AnyMessageContent>)
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
	private rules: Map<string, AutoReplyRule> = new Map()
	private cooldowns: Map<string, number> = new Map()
	private globalCooldown: Map<string, number> = new Map()
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
		const full: AutoReplyRule = {
			...rule,
			id: rule.id ?? `ar_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
			active: rule.active ?? true,
			priority: rule.priority ?? 0
		}
		if (!full.keywords && !full.pattern && !full.exactMatch) {
			throw new Error('Rule must have at least one of: keywords, pattern, or exactMatch')
		}
		this.rules.set(full.id, full)
		return full
	}

	removeRule(id: string): boolean {
		return this.rules.delete(id)
	}
	getRules(): AutoReplyRule[] {
		return Array.from(this.rules.values())
	}
	getRule(id: string): AutoReplyRule | undefined {
		return this.rules.get(id)
	}
	setRuleActive(id: string, active: boolean): boolean {
		const r = this.rules.get(id)
		if (r) {
			r.active = active
			return true
		}
		return false
	}
	clearRules(): void {
		this.rules.clear()
	}

	private checkGlobalCooldown(jid: string): boolean {
		return Date.now() - (this.globalCooldown.get(jid) ?? 0) > this.options.globalCooldown
	}

	private matchRule(text: string, rule: AutoReplyRule): RegExpMatchArray | null {
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

	private isJidAllowed(jid: string, rule: AutoReplyRule): boolean {
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

		const sorted = Array.from(this.rules.values())
			.filter(r => r.active)
			.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))

		let matched = false
		for (const rule of sorted) {
			if (!this.isJidAllowed(jid, rule)) continue
			if (rule.cooldown) {
				const key = `${rule.id}:${jid}`
				if (Date.now() < (this.cooldowns.get(key) ?? 0)) continue
			}
			const match = this.matchRule(text, rule)
			if (!match) continue

			try {
				const response = typeof rule.response === 'function' ? await rule.response(message, match) : rule.response

				if (this.options.simulateTyping && this.sendPresence) {
					await this.sendPresence(jid, 'composing')
					await new Promise(r => setTimeout(r, this.options.typingDuration))
					await this.sendPresence(jid, 'paused')
				}

				await this.sendMessage(jid, response, rule.quoted ? { quoted: message } : undefined)

				if (rule.cooldown) {
					this.cooldowns.set(`${rule.id}:${jid}`, Date.now() + rule.cooldown)
				}
				this.globalCooldown.set(jid, Date.now())
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
	sendMessage: AutoReplySendFunction,
	sendPresence?: PresenceFunction,
	options?: AutoReplyOptions
): AutoReplyHandler => new AutoReplyHandler(sendMessage, sendPresence, options)
