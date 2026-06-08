import { platform, release } from 'os'
import { proto } from '../../WAProto/index.js'
import type { BrowsersMap } from '../Types'

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
	/** Android companion device. apiLevel is the Android API level (e.g. '14') */
	android: (apiLevel: string) => [apiLevel, 'Android', ''],
	/** The appropriate browser based on your OS & release */
	appropriate: browser => [PLATFORM_MAP[platform()] || 'Ubuntu', browser, release()]
}

/**
 * Checks if the browser tuple represents an Android companion device.
 * @param browser - Browser tuple [os, platform, version]
 * @returns True if platform is 'Android' (case-insensitive)
 */
export const isAndroidBrowser = (browser: [string, string, string]): boolean => {
	return browser[1]?.toUpperCase() === 'ANDROID'
}

export const getPlatformId = (browser: string) => {
	const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase() as any]
	return (platformType || proto.DeviceProps.PlatformType.CHROME).toString()
}

/**
 * Returns the display name for a given browser platform string.
 * Falls back to 'Chrome' if not recognized.
 */
export const getPlatformDisplayName = (browser: string): string => {
	const known: Record<string, string> = {
		CHROME: 'Chrome',
		EDGE: 'Edge',
		FIREFOX: 'Firefox',
		IE: 'IE',
		OPERA: 'Opera',
		SAFARI: 'Safari'
	}
	return known[browser.toUpperCase()] || browser
}
