import type { WABrowserDescription } from '../../Types'
import { Browsers } from '../../Utils/browser-utils'
import {
	buildCompanionRegNode,
	CompanionWebClientType,
	getPairingCodePlatform
} from '../../Utils/companion-reg-client-utils'
import type { BinaryNode } from '../../WABinary'
import { getBinaryNodeChild } from '../../WABinary'

describe('getPairingCodePlatform', () => {
	it('normalizes a custom OS label to a canonical pairing display', () => {
		expect(getPairingCodePlatform(['Aidy Staging', 'Chrome', '20.0.04'])).toEqual({
			id: '1',
			display: 'Chrome (Ubuntu)'
		})
	})

	it('preserves Ubuntu as a canonical pairing display OS', () => {
		expect(getPairingCodePlatform(Browsers.ubuntu('Firefox'))).toEqual({
			id: '2',
			display: 'Firefox (Ubuntu)'
		})
	})

	it('uses the Safari pairing platform id', () => {
		expect(getPairingCodePlatform(Browsers.macOS('Safari'))).toEqual({
			id: '5',
			display: 'Safari (Mac OS)'
		})
	})

	it('falls back to Firefox for non-browser platform names', () => {
		expect(getPairingCodePlatform(Browsers.macOS('Desktop'))).toEqual({
			id: '2',
			display: 'Firefox (Mac OS)'
		})

		expect(getPairingCodePlatform(Browsers.macOS('Unknown Browser'))).toEqual({
			id: '2',
			display: 'Firefox (Mac OS)'
		})
	})
})

const EPHEMERAL_PUB = new Uint8Array([1, 2, 3])
const AUTH_KEY_PUB = new Uint8Array([4, 5, 6])

const build = (browser: WABrowserDescription, platformDisplay?: string, platformId?: string) =>
	buildCompanionRegNode({
		jid: '15551234567@s.whatsapp.net',
		wrappedEphemeralPub: EPHEMERAL_PUB,
		serverAuthKeyPub: AUTH_KEY_PUB,
		browser,
		platformDisplay,
		platformId
	})

const childContent = (node: BinaryNode, tag: string) => getBinaryNodeChild(node, tag)?.content

describe('buildCompanionRegNode', () => {
	it('derives companion_platform_display from the browser when no override is given', () => {
		const node = build(['Ubuntu', 'Firefox', '120.'])

		expect(childContent(node, 'companion_platform_display')).toBe('Firefox (Ubuntu)')
	})

	it('sends the override as companion_platform_display verbatim when one is given', () => {
		const node = build(['My Product', 'Chrome', '22.04.4'], 'Chrome (Windows)')

		expect(childContent(node, 'companion_platform_display')).toBe('Chrome (Windows)')
	})

	it('leaves companion_platform_id derived from the browser, display override or not', () => {
		const withOverride = build(['My Product', 'Chrome', '22.04.4'], 'Chrome (Windows)')
		const without = build(['My Product', 'Chrome', '22.04.4'])

		expect(childContent(withOverride, 'companion_platform_id')).toBe(CompanionWebClientType.CHROME.toString())
		expect(childContent(without, 'companion_platform_id')).toBe(CompanionWebClientType.CHROME.toString())
	})

	it('uses the explicit platformId override for companion_platform_id when given', () => {
		// qb2's pairing-code flow restricts companion_platform_id to the 1-6
		// browser-type range the server accepts for this IQ, passing a
		// clamped id here rather than the raw getCompanionPlatformId mapping.
		const node = build(['My Product', 'Some Non-Browser Client', '1.0'], undefined, '1')

		expect(childContent(node, 'companion_platform_id')).toBe('1')
	})
})
