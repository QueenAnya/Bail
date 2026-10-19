import { deriveCanonicalCompanionPlatformDisplay } from '../../Utils/companion-reg-client-utils'

describe('deriveCanonicalCompanionPlatformDisplay', () => {
	it('reflects a canonical browser/OS pair as-is', () => {
		expect(deriveCanonicalCompanionPlatformDisplay(['Ubuntu', 'Firefox', ''])).toBe('Firefox (Ubuntu)')
		expect(deriveCanonicalCompanionPlatformDisplay(['Windows', 'Chrome', '10.0'])).toBe('Chrome (Windows)')
	})

	it('maps a custom OS label in browser[0] to a canonical fallback', () => {
		// Unlike `defaultCompanionPlatformDisplay`, which would echo 'My Product'
		// verbatim, this must fall back to a WhatsApp-accepted OS name -- the
		// server rejects an unrecognised companion_platform_display with 400.
		expect(deriveCanonicalCompanionPlatformDisplay(['My Product', 'Chrome', '10.0'])).toBe('Chrome (Ubuntu)')
	})

	it('echoes a non-browser client name verbatim, canonicalizing only the OS', () => {
		expect(deriveCanonicalCompanionPlatformDisplay(['Mac OS', 'Some Custom Client', '1.0'])).toBe(
			'Some Custom Client (Mac OS)'
		)
	})

	it('never goes stale for an overridden browser the way a value baked into DEFAULT_CONNECTION_CONFIG would', () => {
		// Regression guard: this function exists specifically so Socket/index.ts
		// can recompute companionPlatformDisplay after merging a caller's
		// overridden `browser` with DEFAULT_CONNECTION_CONFIG, rather than
		// carrying forward a value computed once for the default browser only.
		const derivedForDefault = deriveCanonicalCompanionPlatformDisplay(['Ubuntu', 'Firefox', ''])
		const derivedForOverride = deriveCanonicalCompanionPlatformDisplay(['Aidy Staging', 'Chrome', '20.0.04'])

		expect(derivedForDefault).toBe('Firefox (Ubuntu)')
		expect(derivedForOverride).toBe('Chrome (Ubuntu)')
		expect(derivedForOverride).not.toBe(derivedForDefault)
	})
})
