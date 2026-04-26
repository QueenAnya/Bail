/**
 * browser-presets.ts
 * Ported from @innovatorssoft/baileys
 *
 * Extended browser presets including iOS and Android spoofing,
 * which are not present in the upstream WhiskeySockets Browsers map.
 *
 * Usage:
 *   import { ExtendedBrowsers } from './addons/browser-presets.js'
 *   makeWASocket({ browser: ExtendedBrowsers.iOS('Chrome') })
 *   makeWASocket({ browser: ExtendedBrowsers.android('Chrome') })
 */

export type BrowserTuple = [string, string, string]
export type BrowserFactory = (browser: string) => BrowserTuple

/** Extended browser presets, including iOS and Android. */
export const ExtendedBrowsers: Record<string, BrowserFactory> = {
	/** Simulate an iOS 18.2 device. */
	iOS: browser => ['iOS', browser, '18.2'],
	/** Simulate an Android 15 device. */
	android: browser => ['Android', browser, '15.0'],
	/** Standard Ubuntu spoof (same as upstream). */
	ubuntu: browser => ['Ubuntu', browser, '22.04.4'],
	/** Standard macOS spoof (same as upstream). */
	macOS: browser => ['Mac OS', browser, '14.4.1'],
	/** Standard Windows spoof (same as upstream). */
	windows: browser => ['Windows', browser, '10.0.22631'],
	/** Baileys identifier. */
	baileys: browser => ['Baileys', browser, '6.5.0']
}

/** Preset connection config browser value for iOS (used in DEFAULT_CONNECTION_CONFIG override). */
export const IOS_BROWSER_PRESET: BrowserTuple = ['iOS', 'Chrome', '18.2']

/** Preset connection config browser value for Android. */
export const ANDROID_BROWSER_PRESET: BrowserTuple = ['Android', 'Chrome', '15.0']
