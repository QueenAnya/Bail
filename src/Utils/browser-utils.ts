import { platform, release } from 'os'
import { proto } from '../../WAProto/index.js'
import type { BrowsersMap } from '../Types'

const PLATFORM_MAP: Record<string, string> = {
	aix: 'AIX',
	darwin: 'Mac OS',
	win32: 'Windows',
	android: 'Android',
	freebsd: 'FreeBSD',
	openbsd: 'OpenBSD',
	sunos: 'Solaris',
	linux: 'Linux',
	ubuntu: 'Ubuntu',
	ios: 'iOS',
	baileys: 'Baileys',
	chromeos: 'Chrome OS',
	tizen: 'Tizen',
	watchos: 'watchOS',
	wearos: 'Wear OS',
	harmonyos: 'HarmonyOS',
	kaios: 'KaiOS',
	smarttv: 'Smart TV',
	raspberrypi: 'Raspberry Pi OS',
	symbian: 'Symbian',
	blackberry: 'Blackberry OS',
	windowsphone: 'Windows Phone'
}

const PLATFORM_VERSIONS: Record<string, string> = {
	ubuntu: '22.04.4',
	darwin: '18.5',
	win32: '10.0.22631',
	android: '14.0.0',
	freebsd: '13.2',
	openbsd: '7.3',
	sunos: '11',
	linux: '6.5',
	ios: '18.2',
	baileys: '6.5.0',
	chromeos: '117.0.5938.132',
	tizen: '6.5',
	watchos: '10.1',
	wearos: '4.1',
	harmonyos: '4.0.0',
	kaios: '3.1',
	smarttv: '8.0',
	raspberrypi: '12',
	symbian: '9.4',
	blackberry: '10.3.3',
	windowsphone: '8.1'
}

export const Browsers: BrowsersMap = {
	ubuntu: browser => ['Ubuntu', browser, '22.04.4'],
	macOS: browser => ['Mac OS', browser, '14.4.1'],
	baileys: browser => ['Baileys', browser, '6.5.0'],
	windows: browser => ['Windows', browser, '10.0.22631'],
	/** Android companion device. apiLevel is the Android API level (e.g. '14') */
	android: (apiLevel: string) => [apiLevel, 'Android', ''],
	/** The appropriate browser based on your OS & release */
	appropriate: browser => [PLATFORM_MAP[platform()] || 'Ubuntu', browser, PLATFORM_VERSIONS[platform()] || release()]
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
