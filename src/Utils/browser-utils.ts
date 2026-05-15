import { platform, release } from 'os'
import { proto } from '../../WAProto/index.js'
import type { BrowsersMap } from '../Types/index.js'

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
	smarttv: '23.3.1',
	raspberrypi: '11 (Bullseye)',
	symbian: '3',
	blackberry: '10.3.3',
	windowsphone: '8.1'
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
	},
	/** Fully custom browser tuple */
	custom: (os: string, browser: string, version: string) => {
		const platformName = PLATFORM_MAP[os.toLowerCase()] || os
		return [platformName, browser, version || PLATFORM_VERSIONS[os] || 'latest']
	}
}

/**
 * Checks if the browser tuple represents an Android companion device.
 */
export const isAndroidBrowser = (browser: [string, string, string]): boolean => {
	return browser[1]?.toUpperCase() === 'ANDROID'
}

/**
 * Returns a numeric platform ID string for the given browser name.
 * Falls back to Chrome (1) for unknown/non-browser platforms.
 */
export const getPlatformId = (browser: string) => {
	const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase() as any]
	if (platformType !== undefined) {
		return platformType.toString()
	}

	// 'ANDROID' not in PlatformType enum — map to ANDROID_PHONE
	if (browser.toUpperCase() === 'ANDROID') {
		const androidPhone = proto.DeviceProps.PlatformType['ANDROID_PHONE' as any]
		if (androidPhone !== undefined) {
			return androidPhone.toString()
		}
	}

	return (proto.DeviceProps.PlatformType.CHROME || 1).toString()
}

/**
 * Returns the display name for the given browser type.
 * Falls back to 'Chrome' if browser type is not a known platform type.
 */
export const getPlatformDisplayName = (browser: string) => {
	const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase() as any]
	return platformType !== undefined ? browser : 'Chrome'
}

/**
 * Returns the proto PlatformType for companion (QR/pairing) registration.
 * Used in buildPairingQRData to set the correct platform in device props.
 */
export const getCompanionPlatformIdFromName = (browser: string): proto.DeviceProps.PlatformType => {
	const key = browser.toUpperCase() as keyof typeof proto.DeviceProps.PlatformType
	return proto.DeviceProps.PlatformType[key] ?? proto.DeviceProps.PlatformType.CHROME
}
