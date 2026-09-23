import { randomInt } from 'crypto'
import { UsernameInvalidError } from '../Types/Username'

const DEFAULT_USERNAME_KEY_LENGTH = 4
const DIGIT_REGEX = /^\d$/

export type UsernameKeyOptions = {
	/** Defaults to 4, matching WhatsApp's current username key shape. */
	length?: number
}

export type RepeatedDigitUsernameKeyOptions = UsernameKeyOptions & {
	digit: string | number
}

const assertUsernameKeyLength = (length: number) => {
	if (!Number.isInteger(length) || length <= 0) {
		throw new Error('Username key length must be a positive integer')
	}
}

const normalizeDigit = (digit: string | number) => {
	const value = digit.toString()
	if (!DIGIT_REGEX.test(value)) {
		throw new Error('Username key digit must be a single numeric digit')
	}

	return value
}

export const isValidUsernameKey = (key: string, { length = DEFAULT_USERNAME_KEY_LENGTH }: UsernameKeyOptions = {}) => {
	assertUsernameKeyLength(length)
	return key.length === length && /^\d+$/.test(key)
}

export const isRepeatedDigitUsernameKey = (
	key: string,
	{ length = DEFAULT_USERNAME_KEY_LENGTH }: UsernameKeyOptions = {}
) => {
	if (!isValidUsernameKey(key, { length })) {
		return false
	}

	return key.split('').every(digit => digit === key[0])
}

export const makeRepeatedDigitUsernameKey = ({
	digit,
	length = DEFAULT_USERNAME_KEY_LENGTH
}: RepeatedDigitUsernameKeyOptions) => {
	assertUsernameKeyLength(length)
	return normalizeDigit(digit).repeat(length)
}

export const makeRandomUsernameKey = ({ length = DEFAULT_USERNAME_KEY_LENGTH }: UsernameKeyOptions = {}) => {
	assertUsernameKeyLength(length)
	return Array.from({ length }, () => randomInt(10).toString()).join('')
}

/** Normalize a WhatsApp username: strip @, trim and lowercase. */
export const normalizeUsername = (username: string): string => {
	if (typeof username !== 'string') throw new UsernameInvalidError(String(username), 'Username must be a string')
	return username.trim().replace(/^@/, '').trim().toLowerCase()
}

export const isValidUsername = (username: string): boolean => {
	if (typeof username !== 'string') return false
	const u = username.trim().replace(/^@/, '').trim().toLowerCase()
	return (
		u.length >= 3 && u.length <= 30 && !/^\d+$/.test(u) && /^[a-z0-9][a-z0-9._]*[a-z0-9]$/.test(u) && !u.includes('..')
	)
}

export const validateUsername = (username: string): string => {
	const normalized = normalizeUsername(username)
	if (!isValidUsername(normalized)) throw new UsernameInvalidError(username, 'Invalid username format')
	return normalized
}

export const isUsernameTarget = (target: unknown): boolean =>
	typeof target === 'object' && target !== null && 'type' in target
		? (target as any).type === 'username' && typeof (target as any).username === 'string'
		: typeof target === 'string' && target.trim().startsWith('@') && target.trim().length > 1

export const isJidTarget = (target: unknown): boolean =>
	typeof target === 'object' && target !== null && 'type' in target
		? (target as any).type === 'jid' && typeof (target as any).jid === 'string'
		: typeof target === 'string' && target.trim().length > 0 && !target.trim().startsWith('@')

export const resolveMessageTarget = (target: import('../Types/Username').MessageTarget) => {
	if (typeof target === 'object' && target !== null) {
		if ((target as any).type === 'username') {
			return {
				type: 'username' as const,
				username: validateUsername((target as any).username)
			}
		}

		if ((target as any).type === 'jid') return { type: 'jid' as const, jid: (target as any).jid }
		if ((target as any).type === 'lid') return { type: 'jid' as const, jid: (target as any).lid }
	}

	if (typeof target === 'string') {
		return isUsernameTarget(target)
			? { type: 'username' as const, username: validateUsername(target) }
			: { type: 'jid' as const, jid: target }
	}

	throw new Error(`Invalid message target: ${String(target)}`)
}
