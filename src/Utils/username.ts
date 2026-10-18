import { Boom } from '@hapi/boom'
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

export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 35
export const USERNAME_PIN_LENGTH = 4

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '0123456789'
const LETTER_SET = new Set(LETTERS.split(''))
const ALLOWED_SET = new Set([...LETTERS.split(''), ...DIGITS.split(''), '_', '.'])
const RESERVED_SUFFIXES = [
	'.com',
	'.org',
	'.net',
	'.int',
	'.edu',
	'.gov',
	'.mil',
	'.arpa',
	'.html',
	'.htm',
	'.txt',
	'.xml'
]
const RESERVED_WORDS = ['whatsapp', 'instagram', 'facebook', 'oculus']
const PIN_PATTERN = /^[0-9]{4}$/

export const UsernameValidationError = {
	INVALID_CHARACTER: 'INVALID_CHARACTER',
	INVALID_LENGTH: 'INVALID_LENGTH',
	INVALID_NO_LETTERS: 'INVALID_NO_LETTERS',
	INVALID_PERIODS: 'INVALID_PERIODS',
	INVALID_DOMAIN_SUFFIX: 'INVALID_DOMAIN_SUFFIX',
	INVALID_WWW_PREFIX: 'INVALID_WWW_PREFIX',
	INVALID_WORD: 'INVALID_WORD'
} as const

export type UsernameValidationErrorType = (typeof UsernameValidationError)[keyof typeof UsernameValidationError]

export const stripUsernamePrefix = (username: string): string =>
	typeof username === 'string' && username.startsWith('@') ? username.slice(1) : username

export const displayUsername = (username: string): string => '@' + stripUsernamePrefix(username)

/**
 * Detailed username format check (returns the failure reason instead of throwing).
 * Distinct from `validateUsername`, which throws on invalid input.
 */
export const validateUsernameFormat = (
	username: string
): { isValid: true } | { isValid: false; errorType: UsernameValidationErrorType } => {
	const value = stripUsernamePrefix(username)
	if (typeof value !== 'string') {
		return { isValid: false, errorType: UsernameValidationError.INVALID_CHARACTER }
	}

	const characters = Array.from(value)
	if (!characters.every(character => ALLOWED_SET.has(character))) {
		return { isValid: false, errorType: UsernameValidationError.INVALID_CHARACTER }
	}

	if (value.length < USERNAME_MIN_LENGTH || value.length > USERNAME_MAX_LENGTH) {
		return { isValid: false, errorType: UsernameValidationError.INVALID_LENGTH }
	}

	if (!characters.some(character => LETTER_SET.has(character))) {
		return { isValid: false, errorType: UsernameValidationError.INVALID_NO_LETTERS }
	}

	if (value.startsWith('.') || value.endsWith('.') || value.includes('..')) {
		return { isValid: false, errorType: UsernameValidationError.INVALID_PERIODS }
	}

	const lowered = value.toLowerCase()
	if (lowered.startsWith('www.')) {
		return { isValid: false, errorType: UsernameValidationError.INVALID_WWW_PREFIX }
	}

	if (RESERVED_SUFFIXES.some(suffix => lowered.endsWith(suffix))) {
		return { isValid: false, errorType: UsernameValidationError.INVALID_DOMAIN_SUFFIX }
	}

	if (RESERVED_WORDS.some(word => lowered.includes(word))) {
		return { isValid: false, errorType: UsernameValidationError.INVALID_WORD }
	}

	return { isValid: true }
}

/** Throws a 400 Boom when WhatsApp would reject the username; returns it without the `@`. */
export const assertUsername = (username: string): string => {
	const value = stripUsernamePrefix(username)
	const result = validateUsernameFormat(value)
	if (!result.isValid) {
		throw new Boom(`username is not accepted by WhatsApp: ${result.errorType}`, {
			statusCode: 400,
			data: { username: value, errorType: result.errorType }
		})
	}

	return value
}

export const isUsernamePin = (pin: string): boolean => typeof pin === 'string' && PIN_PATTERN.test(pin)
