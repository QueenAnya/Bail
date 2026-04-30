/**
 * Auto-Reply System
 * Register keyword patterns that automatically reply when a message matches
 */

import type { WAMessage } from '../Types'

export type AutoReplyRule = {
	/** Unique ID for this rule */
	id: string
	/** Pattern to match: string (exact/includes) or RegExp */
	pattern: string | RegExp
	/** Match mode */
	matchMode?: 'exact' | 'includes' | 'startsWith' | 'endsWith' | 'regex'
	/** Reply content (text reply) */
	replyText?: string
	/** Custom handler, return the reply text or null to suppress */
	handler?: (message: WAMessage, matchedText: string) => string | null | Promise<string | null>
	/** Only match in groups */
	groupOnly?: boolean
	/** Only match in private chats */
	privateOnly?: boolean
	/** Case-sensitive match (default: false) */
	caseSensitive?: boolean
	/** Whether to only match when the bot is mentioned */
	mentionOnly?: boolean
}

const rules: AutoReplyRule[] = []

/**
 * Register an auto-reply rule
 */
export const addAutoReplyRule = (rule: AutoReplyRule): void => {
	const existing = rules.findIndex(r => r.id === rule.id)
	if (existing !== -1) rules.splice(existing, 1)
	rules.push(rule)
}

/**
 * Remove an auto-reply rule by ID
 */
export const removeAutoReplyRule = (id: string): boolean => {
	const idx = rules.findIndex(r => r.id === id)
	if (idx !== -1) {
		rules.splice(idx, 1)
		return true
	}
	return false
}

/**
 * Get all registered auto-reply rules
 */
export const getAutoReplyRules = (): AutoReplyRule[] => [...rules]

/**
 * Clear all auto-reply rules
 */
export const clearAutoReplyRules = (): void => {
	rules.length = 0
}

/**
 * Check a message against all rules and return the first matching reply text.
 * Returns null if no rule matches.
 */
export const checkAutoReply = async (message: WAMessage, isGroup: boolean): Promise<string | null> => {
	const text = message.message?.conversation || message.message?.extendedTextMessage?.text || ''
	if (!text) return null

	for (const rule of rules) {
		if (rule.groupOnly && !isGroup) continue
		if (rule.privateOnly && isGroup) continue

		const checkText = rule.caseSensitive ? text : text.toLowerCase()
		let pattern = rule.pattern

		let matched = false
		let matchedText = text

		if (pattern instanceof RegExp) {
			const m = checkText.match(pattern)
			if (m) {
				matched = true
				matchedText = m[0]
			}
		} else {
			const p = rule.caseSensitive ? pattern : pattern.toLowerCase()
			const mode = rule.matchMode || 'includes'
			if (mode === 'exact') matched = checkText === p
			else if (mode === 'includes') matched = checkText.includes(p)
			else if (mode === 'startsWith') matched = checkText.startsWith(p)
			else if (mode === 'endsWith') matched = checkText.endsWith(p)
			if (matched) matchedText = p
		}

		if (!matched) continue

		if (rule.handler) {
			const result = await rule.handler(message, matchedText)
			if (result !== null) return result
		} else if (rule.replyText) {
			return rule.replyText
		}
	}
	return null
}
