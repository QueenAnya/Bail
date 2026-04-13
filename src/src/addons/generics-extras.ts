/**
 * Generics Extras Addon
 * Ported from innovatorssoft/Baileys.
 *
 * Extra utility functions not present in WhiskeySockets:
 * - ASCII encode/decode helpers
 * - Unicode escape/unescape
 * - getPlatformId — maps browser string to proto PlatformType
 * - isAndroidBrowser
 * - printQRIfNecessaryListener — auto-print QR in terminal (requires qrcode-terminal)
 */

import { proto } from '../../WAProto/index.js'
import type { BaileysEventEmitter } from '../Types'

// ─────────────────────────────────────────────────────────────────
// ASCII helpers
// ─────────────────────────────────────────────────────────────────

/** Convert char-code array to string */
export const asciiDecode = (...codes: number[] | [number[]]): string => {
	const codeArray: number[] = Array.isArray(codes[0]) ? (codes[0] as number[]) : (codes as number[])
	return codeArray.map(c => String.fromCharCode(c)).join('')
}

/** Convert string to char-code array */
export const asciiEncode = (text: string): number[] => text.split('').map(c => c.charCodeAt(0))

// ─────────────────────────────────────────────────────────────────
// Unicode escape helpers
// ─────────────────────────────────────────────────────────────────

/** Convert `\\uXXXX` escape sequences to actual characters */
export const fromUnicodeEscape = (escapedText: string): string =>
	escapedText.replace(/\\u[\dA-Fa-f]{4}/g, match => String.fromCharCode(parseInt(match.slice(2), 16)))

/** Convert every character in `text` to a `\\uXXXX` escape sequence */
export const toUnicodeEscape = (text: string): string =>
	text
		.split('')
		.map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0'))
		.join('')

// ─────────────────────────────────────────────────────────────────
// Platform / browser helpers
// ─────────────────────────────────────────────────────────────────

/**
 * Map a browser/platform string to the corresponding proto `PlatformType` integer string.
 * Falls back to mapping `'ANDROID'` → `ANDROID_PHONE` since the vanilla enum lacks it.
 *
 * @example
 * getPlatformId('chrome')  // → '49' (or whatever the proto value is)
 */
export const getPlatformId = (browser: string): string | undefined => {
	const platformType =
		proto.DeviceProps.PlatformType[browser.toUpperCase() as keyof typeof proto.DeviceProps.PlatformType]
	if (platformType !== undefined) return platformType.toString()

	if (browser.toUpperCase() === 'ANDROID') {
		const androidPhone = proto.DeviceProps.PlatformType['ANDROID_PHONE' as keyof typeof proto.DeviceProps.PlatformType]
		if (androidPhone !== undefined) return androidPhone.toString()
	}

	return undefined
}

/**
 * Returns `true` when the second element of a `Browsers.*` tuple is `'Android'`.
 *
 * @example
 * isAndroidBrowser(Browsers.ubuntu('Chrome'))  // false
 * isAndroidBrowser(['WhatsApp', 'Android', ''])  // true
 */
export const isAndroidBrowser = (browser: [string, string?, string?]): boolean =>
	browser[1]?.toUpperCase() === 'ANDROID'

// ─────────────────────────────────────────────────────────────────
// QR helper
// ─────────────────────────────────────────────────────────────────

/**
 * Attach a listener to the event emitter that prints the QR code to the terminal
 * whenever `connection.update` fires with a `qr` field.
 *
 * Requires `qrcode-terminal` to be installed as a peer dependency:
 * ```
 * npm install qrcode-terminal
 * ```
 *
 * @example
 * const sock = makeWASocket({ ... })
 * printQRIfNecessaryListener(sock.ev, logger)
 */
export const printQRIfNecessaryListener = (ev: BaileysEventEmitter, logger: { error: (msg: string) => void }): void => {
	ev.on('connection.update', async ({ qr }) => {
		if (qr) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				const QR = (await import('qrcode-terminal').then(m => m.default || m)) as {
					generate: (qr: string, opts: { small: boolean }) => void
				}
				QR.generate(qr, { small: true })
			} catch {
				logger.error('QR code terminal not added as dependency — run: npm install qrcode-terminal')
			}
		}
	})
}
