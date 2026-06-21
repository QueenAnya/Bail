/**
 * Auto-Reply System
 *
 * Source: @innovatorssoft/baileys (auto-reply.js)
 * Rewritten as clean TypeScript with full types, JSDoc and strict null checks.
 *
 * Keyword / regex / exact-match rule engine with per-rule cooldowns,
 * group/private filters, typing simulation, and priority ordering.
 */

import type { AnyMessageContent, WAMessage } from '../Types/index.js'

// ─── Types ────────────────────────────────────────────────────────────────────

export type AutoReplyRule = {
	/** Unique ID (auto-generated if omitted) */
	id?: string
	/** One or more keyword strings — matches if text includes any */
	keywords?: string[]
	/** Regex pattern — matches if text matches the pattern */
	pattern?: RegExp
	/** Exact text match (case-insensitive) */
	exactMatch?: string
	/** Message content to send, or an async function that returns it */
	response:
		| AnyMessageContent
		| ((msg: WAMessage, match: RegExpMatchArray) => Promise<AnyMessageContent> | AnyMessageContent)
	/** Whether to quote the incoming message */
	quoted?: boolean
	/** Cooldown per JID in ms (0 = no cooldown) */
	cooldown?: number
	/** Only match in groups */
	groupsOnly?: boolean
	/** Only match in private chats */
	privateOnly?: boolean
	/** Whitelist of JIDs that can trigger this rule */
	allowedJids?: string[]
	/** Blacklist of JIDs that will never trigger this rule */
	blockedJids?: string[]
	/** Higher value = matched first (default: 0) */
	priority?: number
	/** Whether this rule is active (default: true) */
	active?: boolean
}

type FullRule = Required<Pick<AutoReplyRule, 'id' | 'priority' | 'active'>> & AutoReplyRule

export type AutoReplyOptions = {
	/** Global per-JID cooldown in ms (default: 1000) */
	globalCooldown?: number
	/** Show typing indicator before sending (default: false) */
	simulateTyping?: boolean
	/** How long to show typing indicator in ms (default: 1000) */
	typingDuration?: number
	/** Allow multiple rules to fire per message (default: false) */
	multiMatch?: boolean
	/** Called after each successful reply */
	onReply?: (rule: FullRule, msg: WAMessage, response: AnyMessageContent) => void
	/** Called if sending a reply throws */
	onError?: (error: unknown, rule: FullRule, msg: WAMessage) => void
}

// ─── AutoReplyHandler ─────────────────────────────────────────────────────────

export class AutoReplyHandler {
	private readonly rules = new Map<string, FullRule>()
	private readonly cooldowns = new Map<string, number>()
	private readonly globalCooldown = new Map<string, number>()
	private readonly sendMessage: (
		jid: string,
		content: AnyMessageContent,
		opts?: { quoted?: WAMessage }
	) => Promise<unknown>
	private readonly sendPresence?: (jid: string, presence: string) => Promise<void>
	private readonly options: Required<AutoReplyOptions>

	constructor(
		sendMessage: AutoReplyHandler['sendMessage'],
		sendPresence?: AutoReplyHandler['sendPresence'],
		options: AutoReplyOptions = {}
	) {
		this.sendMessage = sendMessage
		this.sendPresence = sendPresence
		this.options = {
			globalCooldown: options.globalCooldown ?? 1000,
			simulateTyping: options.simulateTyping ?? false,
			typingDuration: options.typingDuration ?? 1000,
			multiMatch: options.multiMatch ?? false,
			onReply: options.onReply ?? (() => undefined),
			onError: options.onError ?? (() => undefined)
		}
	}

	private generateId(): string {
		return `ar_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
	}

	/** Add a new auto-reply rule. Returns the rule with generated ID. */
	addRule(rule: AutoReplyRule): FullRule {
		if (!rule.keywords && !rule.pattern && !rule.exactMatch) {
			throw new Error('Rule must have at least one of: keywords, pattern, or exactMatch')
		}

		const full: FullRule = {
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

	getRules(): FullRule[] {
		return Array.from(this.rules.values())
	}

	getRule(id: string): FullRule | undefined {
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

	private checkCooldown(ruleId: string, jid: string): boolean {
		const key = `${ruleId}:${jid}`
		return Date.now() > (this.cooldowns.get(key) ?? 0)
	}

	private checkGlobalCooldown(jid: string): boolean {
		return Date.now() - (this.globalCooldown.get(jid) ?? 0) > this.options.globalCooldown
	}

	private setCooldown(ruleId: string, jid: string, cooldown: number) {
		this.cooldowns.set(`${ruleId}:${jid}`, Date.now() + cooldown)
		this.globalCooldown.set(jid, Date.now())
	}

	private matchRule(text: string, rule: AutoReplyRule): RegExpMatchArray | null {
		if (!rule.active) return null
		if (text.toLowerCase() === rule.exactMatch?.toLowerCase()) {
			return [text]
		}

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
		const isNewsletter = jid.endsWith('@newsletter')
		if (isNewsletter) return false
		if (rule.groupsOnly && !isGroup) return false
		if (rule.privateOnly && isGroup) return false
		if (rule.allowedJids?.length && !rule.allowedJids.includes(jid)) return false
		if (rule.blockedJids?.includes(jid)) return false
		return true
	}

	/**
	 * Process an incoming message and fire matching auto-replies.
	 * @returns true if at least one reply was sent
	 */
	async processMessage(message: WAMessage): Promise<boolean> {
		const content = message.message
		if (!content) return false

		const text =
			content.conversation ??
			content.extendedTextMessage?.text ??
			content.imageMessage?.caption ??
			content.videoMessage?.caption ??
			content.documentMessage?.caption ??
			''

		if (!text) return false

		const jid = message.key.remoteJid
		if (!jid) return false
		if (!this.checkGlobalCooldown(jid)) return false

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
					await new Promise<void>(r => setTimeout(r, this.options.typingDuration))
					await this.sendPresence(jid, 'paused')
				}

				await this.sendMessage(jid, response, rule.quoted ? { quoted: message } : undefined)

				if (rule.cooldown) this.setCooldown(rule.id, jid, rule.cooldown)
				this.options.onReply(rule, message, response)
				matched = true
				if (!this.options.multiMatch) break
			} catch (err) {
				this.options.onError(err, rule, message)
			}
		}

		return matched
	}
}

/** Factory helper. */
export const createAutoReply = (
	sendMessage: AutoReplyHandler['sendMessage'],
	sendPresence?: AutoReplyHandler['sendPresence'],
	options?: AutoReplyOptions
): AutoReplyHandler => new AutoReplyHandler(sendMessage, sendPresence, options)
