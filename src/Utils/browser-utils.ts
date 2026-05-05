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

export const Browsers: BrowsersMap = {
	ubuntu: browser => ['Ubuntu', browser, PLATFORM_VERSIONS['ubuntu']!],
	macOS: browser => ['Mac OS', browser, PLATFORM_VERSIONS['darwin']!],
	baileys: browser => ['Baileys', browser, PLATFORM_VERSIONS['baileys']!],
	windows: browser => ['Windows', browser, PLATFORM_VERSIONS['win32']!],
	linux: browser => ['Linux', browser, PLATFORM_VERSIONS['linux']!],
	/** iOS device */
	iOS: browser => ['iOS', browser, PLATFORM_VERSIONS['ios']!],
	/** Android companion device — apiLevel is the Android API level e.g. '14' */
	android: (apiLevel: string) => [apiLevel, 'Android', ''],
	/** Alias for android companion used by pairing code flow */
	androidCompanion: (apiLevel: string) => [apiLevel, 'Android', ''],
	kaiOS: browser => ['KaiOS', browser, PLATFORM_VERSIONS['kaios']!],
	chromeOS: browser => ['Chrome OS', browser, PLATFORM_VERSIONS['chromeos']!],
	/** The appropriate browser based on your OS & release */
	appropriate: browser => {
		const os = platform()
		const platformName = PLATFORM_MAP[os] || 'Unknown OS'
		return [platformName, browser, PLATFORM_VERSIONS[os] || release()]
	}

export const getPlatformId = (browser: string) => {
	const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase() as any]
	return platformType ? platformType.toString() : '1' //chrome
}

export const isAndroidBrowser = (browser: WABrowserDescription): boolean =>
	browser[1]?.toLowerCase() === 'android'

export const getPlatformDisplayName = (browser: string) => {
	const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase() as any]
	return platformType ? browser : 'Chrome'
}
