/**
 * Auto Reply System
 * Ported from Baileys-Joss: keyword/pattern-based automatic response handler.
 *
 * Features:
 *  - Rule matching by keywords, regex pattern, or exact text
 *  - Per-rule and global cooldowns
 *  - simulateTyping — shows "typing..." indicator before sending reply
 *  - typingDuration — how long to show the indicator (default: 1000 ms)
 *  - Group-only / private-only filters, allow/block JID lists
 *  - Priority ordering and optional multi-match
 *  - Dynamic responses via callback functions
 */

import type { AnyMessageContent, WAMessage } from '../Types'

export interface AutoReplyRule {
	id?: string
	/** Keywords to match (any keyword in the text triggers the rule) */
	keywords?: string[]
	/** Regex pattern to match */
	pattern?: RegExp
	/** Exact text match (case-insensitive) */
	exactMatch?: string
	/** Reply content (static or dynamic function) */
	response:
		| AnyMessageContent
		| ((message: WAMessage, match: RegExpMatchArray | string[]) => AnyMessageContent | Promise<AnyMessageContent>)
	/** Quote the original message in the reply */
	quoted?: boolean
	/** Rule priority (higher = matched first) */
	priority?: number
	/** Whether this rule is active */
	active?: boolean
	/** Per-rule cooldown in ms */
	cooldown?: number
	/** Only match in groups */
	groupsOnly?: boolean
	/** Only match in private chats */
	privateOnly?: boolean
	/** Whitelist of JIDs this rule applies to */
	allowedJids?: string[]
	/** Blacklist of JIDs this rule will never apply to */
	blockedJids?: string[]
}

interface FullAutoReplyRule extends AutoReplyRule {
	id: string
	active: boolean
	priority: number
}

export interface AutoReplyOptions {
	/** Global per-JID cooldown in ms (default: 1000) */
	globalCooldown?: number
	/** Show "typing..." indicator before replying */
	simulateTyping?: boolean
	/** How long to show the typing indicator in ms (default: 1000) */
	typingDuration?: number
	/** Allow multiple rules to match a single message */
	multiMatch?: boolean
	/** Called after each successful reply */
	onReply?: (rule: FullAutoReplyRule, message: WAMessage, response: AnyMessageContent) => void
	/** Called on error during reply */
	onError?: (error: Error, rule: FullAutoReplyRule, message: WAMessage) => void
}

export class AutoReplyHandler {
	private rules: Map<string, FullAutoReplyRule> = new Map()
	private cooldowns: Map<string, number> = new Map()
	private globalCooldown: Map<string, number> = new Map()

	private sendMessage: (jid: string, content: AnyMessageContent, options?: object) => Promise<unknown>
	private sendPresence: ((jid: string, presence: string) => Promise<void>) | undefined
	private options: Required<Omit<AutoReplyOptions, 'onReply' | 'onError'>> & {
		onReply: NonNullable<AutoReplyOptions['onReply']>
		onError: NonNullable<AutoReplyOptions['onError']>
	}

	constructor(
		sendMessage: (jid: string, content: AnyMessageContent, options?: object) => Promise<unknown>,
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

	private generateId(): string {
		return `ar_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	addRule(rule: AutoReplyRule): FullAutoReplyRule {
		const fullRule: FullAutoReplyRule = {
			...rule,
			id: rule.id ?? this.generateId(),
			active: rule.active ?? true,
			priority: rule.priority ?? 0
		}
		if (!fullRule.keywords && !fullRule.pattern && !fullRule.exactMatch) {
			throw new Error('Rule must have at least one of: keywords, pattern, or exactMatch')
		}
		this.rules.set(fullRule.id, fullRule)
		return fullRule
	}

	removeRule(id: string): boolean {
		return this.rules.delete(id)
	}

	getRules(): FullAutoReplyRule[] {
		return Array.from(this.rules.values())
	}

	getRule(id: string): FullAutoReplyRule | undefined {
		return this.rules.get(id)
	}

	setRuleActive(id: string, active: boolean): boolean {
		const rule = this.rules.get(id)
		if (rule) {
			rule.active = active
			return true
		}
		return false
	}

	clearRules(): void {
		this.rules.clear()
	}

	private checkCooldown(ruleId: string, jid: string): boolean {
		const key = `${ruleId}:${jid}`
		const lastTime = this.cooldowns.get(key) ?? 0
		return Date.now() - lastTime > 0
	}

	private checkGlobalCooldown(jid: string): boolean {
		const lastTime = this.globalCooldown.get(jid) ?? 0
		return Date.now() - lastTime > this.options.globalCooldown
	}

	private setCooldown(ruleId: string, jid: string, cooldown: number): void {
		const key = `${ruleId}:${jid}`
		this.cooldowns.set(key, Date.now() + cooldown)
		this.globalCooldown.set(jid, Date.now())
	}

	private matchRule(text: string, rule: FullAutoReplyRule): RegExpMatchArray | string[] | null {
		if (!rule.active) return null

		if (rule.exactMatch) {
			if (text.toLowerCase() === rule.exactMatch.toLowerCase()) {
				return [text]
			}
		}

		if (rule.keywords && rule.keywords.length > 0) {
			const lower = text.toLowerCase()
			for (const kw of rule.keywords) {
				if (lower.includes(kw.toLowerCase())) return [kw]
			}
		}

		if (rule.pattern) {
			return text.match(rule.pattern)
		}

		return null
	}

	private isJidAllowed(jid: string, rule: FullAutoReplyRule): boolean {
		const isGroup = jid.endsWith('@g.us')
		const isNewsletter = jid.endsWith('@newsletter')

		if (isNewsletter) return false
		if (rule.groupsOnly && !isGroup) return false
		if (rule.privateOnly && isGroup) return false

		if (rule.allowedJids && rule.allowedJids.length > 0) {
			if (!rule.allowedJids.includes(jid)) return false
		}
		if (rule.blockedJids && rule.blockedJids.includes(jid)) {
			return false
		}

		return true
	}

	async processMessage(message: WAMessage): Promise<boolean> {
		const messageContent = message.message
		if (!messageContent) return false

		const text =
			messageContent.conversation ||
			messageContent.extendedTextMessage?.text ||
			messageContent.imageMessage?.caption ||
			messageContent.videoMessage?.caption ||
			messageContent.documentMessage?.caption ||
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
				let response: AnyMessageContent
				if (typeof rule.response === 'function') {
					response = await rule.response(message, match)
				} else {
					response = rule.response
				}

				if (this.options.simulateTyping && this.sendPresence) {
					await this.sendPresence(jid, 'composing')
					await new Promise(r => setTimeout(r, this.options.typingDuration))
					await this.sendPresence(jid, 'paused')
				}

				await this.sendMessage(jid, response, rule.quoted ? { quoted: message } : undefined)

				if (rule.cooldown) {
					this.setCooldown(rule.id, jid, rule.cooldown)
				}

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

/**
 * Factory — create an AutoReplyHandler instance.
 *
 * @example
 * const autoReply = createAutoReply(
 *     (jid, content, opts) => sock.sendMessage(jid, content, opts),
 *     (jid, presence)      => sock.sendPresenceUpdate(presence, jid),
 *     { simulateTyping: true, typingDuration: 1500 }
 * )
 *
 * autoReply.addRule({
 *     keywords: ['hi', 'hello'],
 *     response: { text: 'Hello! How can I help you? 👋' },
 *     quoted: true
 * })
 *
 * sock.ev.on('messages.upsert', async ({ messages }) => {
 *     for (const msg of messages) {
 *         if (!msg.key.fromMe) await autoReply.processMessage(msg)
 *     }
 * })
 */
export const createAutoReply = (
	sendMessage: (jid: string, content: AnyMessageContent, options?: object) => Promise<unknown>,
	sendPresence?: (jid: string, presence: string) => Promise<void>,
	options?: AutoReplyOptions
): AutoReplyHandler => {
	return new AutoReplyHandler(sendMessage, sendPresence, options)
}
