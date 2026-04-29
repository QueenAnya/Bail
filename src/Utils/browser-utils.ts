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
	/** Android browser preset — reports as Android device */
	android: browser => [browser, 'Android', ''],
	/** The appropriate browser based on your OS & release */
	appropriate: browser => [PLATFORM_MAP[platform()] || 'Ubuntu', browser, release()]
}

export const getPlatformId = (browser: string) => {
	const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase() as any]
	return (platformType || proto.DeviceProps.PlatformType.CHROME).toString()
}

/**
 * Returns the canonical platform display name used in the pairing IQ
 * companion_platform_display field. Falls back to 'Chrome' for unknown names.
 * Source: Baileys-fix-pairing-code
 */
export const getPlatformDisplayName = (browser: string): string => {
	const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase() as any]
	return platformType ? browser : 'Chrome'
}
