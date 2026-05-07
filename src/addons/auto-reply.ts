/**
 * Auto Reply System
 * Ported from innovatorssoft/Baileys
 *
 * Keyword / pattern / exact-match based automatic response handler.
 */

import type { WAMessage } from '../Types'

export type PresenceType = 'composing' | 'recording' | 'paused' | 'available' | 'unavailable'

export interface AutoReplyRule<T = unknown> {
	id?: string
	/** Keywords — reply if message contains any of these (case-insensitive) */
	keywords?: string[]
	/** Regex pattern to match against message text */
	pattern?: RegExp
	/** Exact text to match (case-insensitive) */
	exactMatch?: string
	/** Response content (or async function that returns content) */
	response: T | ((message: WAMessage, match: RegExpMatchArray | string[]) => Promise<T>)
	/** If true, pass the original message as `quoted` in the reply */
	quoted?: boolean
	/** Per-rule cooldown per JID (ms) */
	cooldown?: number
	/** Only match in group chats */
	groupsOnly?: boolean
	/** Only match in private chats */
	privateOnly?: boolean
	/** If set, only match for these JIDs */
	allowedJids?: string[]
	/** If set, never match for these JIDs */
	blockedJids?: string[]
	/** Higher = matched first */
	priority?: number
	active?: boolean
}

export interface AutoReplyOptions {
	/** Global per-JID cooldown between any two replies (ms). Default: 1000 */
	globalCooldown?: number
	/** Show "typing…" before replying. Default: false */
	simulateTyping?: boolean
	/** How long to show typing (ms). Default: 1000 */
	typingDuration?: number
	/** If true, continue matching after first rule hit. Default: false */
	multiMatch?: boolean
	onReply?: <T>(rule: AutoReplyRule<T>, message: WAMessage, response: T) => void
	onError?: <T>(error: Error, rule: AutoReplyRule<T>, message: WAMessage) => void
}

type InternalRule<T> = Required<Pick<AutoReplyRule<T>, 'id' | 'active' | 'priority'>> & AutoReplyRule<T>

export class AutoReplyHandler<T = unknown> {
	private rules = new Map<string, InternalRule<T>>()
	private cooldowns = new Map<string, number>()
	private globalCooldown = new Map<string, number>()
	private readonly options: Required<AutoReplyOptions>

	constructor(
		private readonly sendMessage: (
			jid: string,
			content: T,
			options?: { quoted: WAMessage }
		) => Promise<WAMessage | undefined>,
		private readonly sendPresence?: (jid: string, presence: PresenceType) => Promise<void>,
		options: AutoReplyOptions = {}
	) {
		this.options = {
			globalCooldown: options.globalCooldown ?? 1000,
			simulateTyping: options.simulateTyping ?? false,
			typingDuration: options.typingDuration ?? 1000,
			multiMatch: options.multiMatch ?? false,
			onReply: options.onReply ?? (() => {}),
			onError: options.onError ?? (() => {})
		}
	}

	private generateId(): string {
		return `ar_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	addRule(rule: AutoReplyRule<T>): InternalRule<T> {
		if (!rule.keywords && !rule.pattern && !rule.exactMatch) {
			throw new Error('Rule must have at least one of: keywords, pattern, or exactMatch')
		}
		const full: InternalRule<T> = {
			...rule,
			id: rule.id ?? this.generateId(),
			active: rule.active ?? true,
			priority: rule.priority ?? 0
		}
		this.rules.set(full.id, full)
		return full
	}

	removeRule(id: string): boolean {
		return this.rules.delete(id)
	}
	getRules(): InternalRule<T>[] {
		return Array.from(this.rules.values())
	}
	getRule(id: string): InternalRule<T> | undefined {
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

	private checkCooldown(ruleId: string, jid: string): boolean {
		const key = `${ruleId}:${jid}`
		return Date.now() >= (this.cooldowns.get(key) ?? 0)
	}

	private checkGlobalCooldown(jid: string): boolean {
		return Date.now() - (this.globalCooldown.get(jid) ?? 0) > this.options.globalCooldown
	}

	private setCooldown(ruleId: string, jid: string, cooldown: number): void {
		this.cooldowns.set(`${ruleId}:${jid}`, Date.now() + cooldown)
		this.globalCooldown.set(jid, Date.now())
	}

	private matchRule(text: string, rule: InternalRule<T>): RegExpMatchArray | string[] | null {
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

	private isJidAllowed(jid: string, rule: InternalRule<T>): boolean {
		if (jid.endsWith('@newsletter')) return false
		const isGroup = jid.endsWith('@g.us')
		if (rule.groupsOnly && !isGroup) return false
		if (rule.privateOnly && isGroup) return false
		if (rule.allowedJids?.length && !rule.allowedJids.includes(jid)) return false
		if (rule.blockedJids?.includes(jid)) return false
		return true
	}

	async processMessage(message: WAMessage): Promise<boolean> {
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

		const jid = message.key.remoteJid
		if (!jid) return false
		if (!this.checkGlobalCooldown(jid)) return false

		const sortedRules = Array.from(this.rules.values())
			.filter(r => r.active)
			.sort((a, b) => b.priority - a.priority)

		let matched = false

		for (const rule of sortedRules) {
			if (!this.isJidAllowed(jid, rule)) continue
			if (rule.cooldown && !this.checkCooldown(rule.id, jid)) continue

			const match = this.matchRule(text, rule)
			if (!match) continue

			try {
				const response =
					typeof rule.response === 'function' ? await (rule.response as Function)(message, match) : rule.response

				if (this.options.simulateTyping && this.sendPresence) {
					await this.sendPresence(jid, 'composing')
					await new Promise(r => setTimeout(r, this.options.typingDuration))
					await this.sendPresence(jid, 'paused')
				}

				await this.sendMessage(jid, response, rule.quoted ? { quoted: message } : undefined)

				if (rule.cooldown) this.setCooldown(rule.id, jid, rule.cooldown)

				this.options.onReply(rule as AutoReplyRule<unknown>, message, response)
				matched = true

				if (!this.options.multiMatch) break
			} catch (error) {
				this.options.onError(error as Error, rule as AutoReplyRule<unknown>, message)
			}
		}

		return matched
	}
}

export const createAutoReply = <T = unknown>(
	sendMessage: (jid: string, content: T, options?: { quoted: WAMessage }) => Promise<WAMessage | undefined>,
	sendPresence?: (jid: string, presence: PresenceType) => Promise<void>,
	options?: AutoReplyOptions
): AutoReplyHandler<T> => new AutoReplyHandler<T>(sendMessage, sendPresence, options)
