import { describe, expect, it } from '@jest/globals'
import { UsernameInvalidError } from '../../Types/Username'
import { isValidUsername, validateUsername } from '../../Utils/username'

describe('WhatsApp username rules', () => {
	it('normalizes a valid username (strip @, trim, lowercase)', () => {
		expect(validateUsername(' @Some_Name.99 ')).toBe('some_name.99')
	})

	it('accepts what WhatsApp accepts: 3-35 characters, underscores at the edges, one letter is enough', () => {
		expect(validateUsername('_abc')).toBe('_abc')
		expect(validateUsername('abc_')).toBe('abc_')
		expect(validateUsername('1234a')).toBe('1234a')
		expect(validateUsername('a'.repeat(35))).toBe('a'.repeat(35))
	})

	it.each([
		['ab', 'INVALID_LENGTH'],
		['a'.repeat(36), 'INVALID_LENGTH'],
		['123456', 'INVALID_NO_LETTERS'],
		['.abc', 'INVALID_PERIODS'],
		['abc.', 'INVALID_PERIODS'],
		['a..b', 'INVALID_PERIODS'],
		['ab c', 'INVALID_CHARACTER'],
		['name!', 'INVALID_CHARACTER'],
		['www.example', 'INVALID_WWW_PREFIX'],
		['site.com', 'INVALID_DOMAIN_SUFFIX'],
		['my_whatsapp', 'INVALID_WORD']
	])('rejects %s with %s', (name, reason) => {
		expect(() => validateUsername(name)).toThrow(UsernameInvalidError)
		expect(() => validateUsername(name)).toThrow(reason)
	})

	it('tells a username apart from a phone number by shape alone', () => {
		expect(isValidUsername('919876543210')).toBe(false)
		expect(isValidUsername('some.name')).toBe(true)
		// reserved words are a validation matter, not a "this is a phone number" matter
		expect(isValidUsername('whatsapp_fan')).toBe(true)
		expect(isValidUsername('a')).toBe(false)
		expect(isValidUsername(undefined as never)).toBe(false)
	})
})
