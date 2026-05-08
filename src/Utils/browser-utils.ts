import { platform, release } from 'os'
import { proto } from '../../WAProto/index.js'
import type { BrowsersMap, WABrowserDescription } from '../Types'

const PLATFORM_MAP = {
	aix: 'AIX',
	darwin: 'Mac OS',
	win32: 'Windows',
	android: 'Android',
	freebsd: 'FreeBSD',
	openbsd: 'OpenBSD',
	sunos: 'Solaris',
	linux: undefined,
	haiku: undefined,
	cygwin: undefined,
	netbsd: undefined
}

export const Browsers: BrowsersMap = {
	ubuntu: browser => ['Ubuntu', browser, '22.04.4'],
	macOS: browser => ['Mac OS', browser, '14.4.1'],
	baileys: browser => ['Baileys', browser, '6.5.0'],
	windows: browser => ['Windows', browser, '10.0.22631'],
	linux: browser => ['Linux', browser, '6.5'],
	solaris: browser => ['Solaris', browser, '11'],
	chromeOS: browser => ['Chrome OS', browser, '117.0.5938.132'],
	/** iOS companion — registers as iPhone companion */
	iOS: browser => ['iOS', browser, '18.2'],
	/** KaiOS companion */
	kaiOS: browser => ['KaiOS', browser, '3.1'],
	/** The appropriate browser based on your OS & release */
	appropriate: browser => [PLATFORM_MAP[platform()] || 'Ubuntu', browser, release()],
	/**
	 * Android browser preset — registers as an Android phone companion.
	 * @param apiLevel  Android API level string (e.g. '34')
	 */
	android: (apiLevel: string) => [apiLevel, 'Android', '']
}

export const getPlatformId = (browser: string) => {
	const upper = browser.toUpperCase()
	// Map Android string explicitly since the enum key may differ
	if (upper === 'ANDROID') {
		return proto.DeviceProps.PlatformType.ANDROID_PHONE.toString()
	}
	const platformType = proto.DeviceProps.PlatformType[upper as any]
	return platformType ? platformType.toString() : '1' //chrome
}

/**
 * Returns a human-readable browser name for pairing display.
 * Falls back to 'Chrome' for unknown browser strings.
 */
export const getPlatformDisplayName = (browser: string): string => {
	const upper = browser.toUpperCase()
	const platformType = proto.DeviceProps.PlatformType[upper as any]
	return platformType !== undefined ? browser : 'Chrome'
}

/**
 * Returns true if the given browser tuple was created via Browsers.android().
 * Used to detect Android sessions and adjust registration behaviour.
 */
export const isAndroidBrowser = (browser: WABrowserDescription): boolean => browser[1]?.toUpperCase() === 'ANDROID'
