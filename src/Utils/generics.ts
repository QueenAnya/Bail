import { Boom } from '@hapi/boom'
import axios, { AxiosRequestConfig } from 'axios'
import { createHash, randomBytes } from 'crypto'
import os from 'os'
import { platform, release } from 'os'
import { ILogger } from './logger'
import { proto } from '../../WAProto'
import { version as baileysVersion } from '../Defaults/baileys-version.json'
import { BaileysEventEmitter, BaileysEventMap, BrowsersMap, DisconnectReason, WACallUpdateType, WAVersion } from '../Types'
import { BinaryNode, getAllBinaryNodeChildren, jidDecode } from '../WABinary'

const COMPANION_PLATFORM_MAP = {
'Chrome': '49',
'Edge': '50',
'Firefox': '51',
'Opera': '53',
'Safari': '54',
'Brave': '1.79.112',
'Vivaldi': '6.2.3105.58',
'Tor': '12.5.3',
'Yandex': '23.7.1',
'Falkon': '22.08.3',
'Epiphany': '44.2'
}
const PLATFORM_MAP = {
'aix': 'AIX',
'darwin': 'Mac OS',
'win32': 'Windows',
'android': 'Android',
'freebsd': 'FreeBSD',
'openbsd': 'OpenBSD',
'sunos': 'Solaris',
'linux': 'Linux',
'ubuntu': 'Ubuntu',
'ios': 'iOS',
'baileys': 'Baileys', 
'chromeos': 'Chrome OS',
'tizen': 'Tizen',
'watchos': 'watchOS',
'wearos': 'Wear OS',
'harmonyos': 'HarmonyOS',
'kaios': 'KaiOS',
'smarttv': 'Smart TV',
'raspberrypi': 'Raspberry Pi OS',
'symbian': 'Symbian',
'blackberry': 'Blackberry OS',
'windowsphone': 'Windows Phone'
}
const PLATFORM_VERSIONS = {
'ubuntu': '22.04.4',
'darwin': '14.4.1', 
'win32': '10.0.22631', 
'android': '14.0.0',
'freebsd': '13.2',
'openbsd': '7.3',
'sunos': '11',
'linux': '6.5',
'ios': '18.2',
'baileys': '6.5.0', 
'chromeos': '117.0.5938.132',
'tizen': '6.5',
'watchos': '10.1',
'wearos': '4.1',
'harmonyos': '4.0.0',
'kaios': '3.1',
'smarttv': '23.3.1',
'raspberrypi': '11 (Bullseye)',
'symbian': '3',
'blackberry': '10.3.3',
'windowsphone': '8.1'
}

export const Browsers: BrowsersMap = {
	ubuntu: (browser) => ['Ubuntu', browser, '24.04.1'],
	macOS: (browser) => ['Mac OS', browser, '14.4.1'],
	baileys: (browser) => ['Baileys', browser, '6.7.9'],
	windows: (browser) => ['Windows', browser, '10.0.22631'],
	// iOS: (browser) => ['iOS', browser, '18.1'],
	/** The appropriate browser based on your OS & release */
	appropriate: (browser) => [ PLATFORM_MAP[platform()] || 'Ubuntu', browser, release() ]
}

export const Browserrs = {
ubuntu: (browser) => {
return [PLATFORM_MAP['ubuntu'], browser, PLATFORM_VERSIONS['ubuntu']]
},
macOS: (browser) => {
return [PLATFORM_MAP['darwin'], browser, PLATFORM_VERSIONS['darwin']]
},
windows: (browser) => {
return [PLATFORM_MAP['win32'], browser, PLATFORM_VERSIONS['win32']]
},
linux: (browser) => {
return [PLATFORM_MAP['linux'], browser, PLATFORM_VERSIONS['linux']]
},
solaris: (browser) => {
return [PLATFORM_MAP['sunos'], browser, PLATFORM_VERSIONS['sunos']]
},
baileys: (browser) => {
return [PLATFORM_MAP['baileys'], browser, PLATFORM_VERSIONS['baileys']]
},
android: (browser) => {
return [PLATFORM_MAP['android'], browser, PLATFORM_VERSIONS['android']]
},
iOS: (browser) => {
return [PLATFORM_MAP['ios'], browser, PLATFORM_VERSIONS['ios']]
},
kaiOS: (browser) => {
return [PLATFORM_MAP['kaios'], browser, PLATFORM_VERSIONS['kaios']]
},
chromeOS: (browser) => {
return [PLATFORM_MAP['chromeos'], browser, PLATFORM_VERSIONS['chromeos']]
},
appropriate: (browser) => {
const platform = os.platform()
const platformName = PLATFORM_MAP[platform] || 'Unknown OS'
return [platformName, browser, PLATFORM_VERSIONS[platform] || 'latest']
},
custom: (platform, browser, version) => {
const platformName = PLATFORM_MAP[platform.toLowerCase()] || platform
return [platformName, browser, version || PLATFORM_VERSIONS[platform] || 'latest']
}
}

/** Other Browser Support for Paircode */
export const getPlatformId = (browser: string) => {
	const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase()]
	return platformType ? platformType.toString() : '51' // Firefox
}

export const BufferJSON = {
	replacer: (k, value: any) => {
		if(Buffer.isBuffer(value) || value instanceof Uint8Array || value?.type === 'Buffer') {
			return { type: 'Buffer', data: Buffer.from(value?.data || value).toString('base64') }
		}

		return value
	},
	reviver: (_, value: any) => {
		if(typeof value === 'object' && !!value && (value.buffer === true || value.type === 'Buffer')) {
			const val = value.data || value.value
			return typeof val === 'string' ? Buffer.from(val, 'base64') : Buffer.from(val || [])
		}

		return value
	}
}

export const getKeyAuthor = (
	key: proto.IMessageKey | undefined | null,
	meId: string = 'me'
) => (
	(key?.fromMe ? meId : key?.participant || key?.remoteJid) || ''
)

export const writeRandomPadMax16 = (msg: Uint8Array) => {
	const pad = randomBytes(1)
	pad[0] &= 0xf
	if(!pad[0]) {
		pad[0] = 0xf
	}

	return Buffer.concat([msg, Buffer.alloc(pad[0], pad[0])])
}

export const unpadRandomMax16 = (e: Uint8Array | Buffer) => {
	const t = new Uint8Array(e)
	if(0 === t.length) {
		throw new Error('unpadPkcs7 given empty bytes')
	}

	var r = t[t.length - 1]
	if(r > t.length) {
		throw new Error(`unpad given ${t.length} bytes, but pad is ${r}`)
	}

	return new Uint8Array(t.buffer, t.byteOffset, t.length - r)
}

export const encodeWAMessage = (message: proto.IMessage) => (
	writeRandomPadMax16(
		proto.Message.encode(message).finish()
	)
)

export const encodeNewsletterMessage = (message: proto.IMessage) => (
	proto.Message.encode(message).finish()
)

export const generateRegistrationId = (): number => {
	return Uint16Array.from(randomBytes(2))[0] & 16383
}

export const encodeBigEndian = (e: number, t = 4) => {
	let r = e
	const a = new Uint8Array(t)
	for(let i = t - 1; i >= 0; i--) {
		a[i] = 255 & r
		r >>>= 8
	}

	return a
}

export const toNumber = (t: Long | number | null | undefined): number => ((typeof t === 'object' && t) ? ('toNumber' in t ? t.toNumber() : (t as any).low) : t || 0)

/** unix timestamp of a date in seconds */
export const unixTimestampSeconds = (date: Date = new Date()) => Math.floor(date.getTime() / 1000)

export type DebouncedTimeout = ReturnType<typeof debouncedTimeout>

export const debouncedTimeout = (intervalMs: number = 1000, task?: () => void) => {
	let timeout: NodeJS.Timeout | undefined
	return {
		start: (newIntervalMs?: number, newTask?: () => void) => {
			task = newTask || task
			intervalMs = newIntervalMs || intervalMs
			timeout && clearTimeout(timeout)
			timeout = setTimeout(() => task?.(), intervalMs)
		},
		cancel: () => {
			timeout && clearTimeout(timeout)
			timeout = undefined
		},
		setTask: (newTask: () => void) => task = newTask,
		setInterval: (newInterval: number) => intervalMs = newInterval
	}
}

export const delay = (ms: number) => delayCancellable (ms).delay

export const delayCancellable = (ms: number) => {
	const stack = new Error().stack
	let timeout: NodeJS.Timeout
	let reject: (error) => void
	const delay: Promise<void> = new Promise((resolve, _reject) => {
		timeout = setTimeout(resolve, ms)
		reject = _reject
	})
	const cancel = () => {
		clearTimeout (timeout)
		reject(
			new Boom('Cancelled', {
				statusCode: 500,
				data: {
					stack
				}
			})
		)
	}

	return { delay, cancel }
}

export async function promiseTimeout<T>(ms: number | undefined, promise: (resolve: (v: T) => void, reject: (error) => void) => void) {
	if(!ms) {
		return new Promise(promise)
	}

	const stack = new Error().stack
	// Create a promise that rejects in <ms> milliseconds
	const { delay, cancel } = delayCancellable (ms)
	const p = new Promise((resolve, reject) => {
		delay
			.then(() => reject(
				new Boom('Timed Out', {
					statusCode: DisconnectReason.timedOut,
					data: {
						stack
					}
				})
			))
			.catch (err => reject(err))

		promise (resolve, reject)
	})
		.finally (cancel)
	return p as Promise<T>
}

export const generateMessageIDV2 = (userId?: string): string => {
	const data = Buffer.alloc(8 + 20 + 16)
	data.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 1000)))

	if(userId) {
		const id = jidDecode(userId)
		if(id?.user) {
			data.write(id.user, 8)
			data.write('@c.us', 8 + id.user.length)
		}
	}

	const random = randomBytes(16)
	random.copy(data, 28)

	const hash = createHash('sha256').update(data).digest()
	return '4NY4W3B' + hash.toString('hex').toUpperCase().substring(0, 18)
}

// generate a random ID to attach to a message
export const generateMessageID = () => '4NY4W3B' + randomBytes(18).toString('hex').toUpperCase()

export function bindWaitForEvent<T extends keyof BaileysEventMap>(ev: BaileysEventEmitter, event: T) {
	return async(check: (u: BaileysEventMap[T]) => Promise<boolean | undefined>, timeoutMs?: number) => {
		let listener: (item: BaileysEventMap[T]) => void
		let closeListener: any
		await (
			promiseTimeout<void>(
				timeoutMs,
				(resolve, reject) => {
					closeListener = ({ connection, lastDisconnect }) => {
						if(connection === 'close') {
							reject(
								lastDisconnect?.error
								|| new Boom('Connection Closed', { statusCode: DisconnectReason.connectionClosed })
							)
						}
					}

					ev.on('connection.update', closeListener)
					listener = async(update) => {
						if(await check(update)) {
							resolve()
						}
					}

					ev.on(event, listener)
				}
			)
				.finally(() => {
					ev.off(event, listener)
					ev.off('connection.update', closeListener)
				})
		)
	}
}

export const bindWaitForConnectionUpdate = (ev: BaileysEventEmitter) => bindWaitForEvent(ev, 'connection.update')

export const printQRIfNecessaryListener = (ev: BaileysEventEmitter, logger: ILogger) => {
	ev.on('connection.update', async({ qr }) => {
		if(qr) {
			const QR = await import('qrcode-terminal')
				.then(m => m.default || m)
				.catch(() => {
					logger.error('QR code terminal not added as dependency')
				})
			QR?.generate(qr, { small: true })
		}
	})
}

/**
 * utility that fetches latest baileys version from the master branch.
 * Use to ensure your WA connection is always on the latest version
 */
 export const fetchLatestBaileysVersion = async(options: AxiosRequestConfig<any> = { }) => {
	const URL = 'https://raw.githubusercontent.com/QueenAnya/Bail/master/src/Defaults/baileys-version.json'
	try {
		const result = await axios.get<{ version: WAVersion }>(
			URL,
			{
				...options,
				responseType: 'json'
			}
		)
		return {
			version: result.data.version,
			isLatest: true
		}
	} catch(error) {
		return {
			version: baileysVersion as WAVersion,
			isLatest: false,
			error
		}
	}
}

export const fetchLatestBaileysVersion2 = async(options: AxiosRequestConfig<any> = { }) => {
	const URL = 'https://raw.githubusercontent.com/nstar-y/bail/master/src/Defaults/baileys-version.json'
	try {
		const result = await axios.get<{ version: WAVersion }>(
			URL,
			{
				...options,
				responseType: 'json'
			}
		)
		return {
			version: result.data.version,
			isLatest: true
		}
	} catch(error) {
		return {
			version: baileysVersion as WAVersion,
			isLatest: false,
			error
		}
	}
}

/**
 * utility that fetches latest baileys version from the main branch.
 * Use to ensure your WA connection is always on the latest version
 */
 export const fetchLatestBaileysVersion3 = async(options: AxiosRequestConfig<any> = { }) => {
	try {
		const result = await axios.get(
			'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/versions.json',
			{
				...options,
				responseType: 'json'
			}
		)
		
		const version = result.data.versions[result.data.versions.length - 1].version.split('.')
		const version2 = version[2].replace('-alpha', '');
		return {
			version: [+version[0], +version[1], +version2],
			isLatest: true
		}
	} catch(error) {
		return {
			version: baileysVersion as WAVersion,
			isLatest: false,
			error
		}
	}
}

/**
 * utility that fetches latest baileys version from the master branch.
 * Use to ensure your WA connection is always on the latest version
 */
 
export const fetchLatestBaileysVersion4 = async(options: AxiosRequestConfig<any> = { }) => {
  
	const URL = 'https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json'
	try {
		const result = await axios.get<{ version: WAVersion }>(
			URL,
			{
				...options,
				responseType: 'json'
			}
		)
		return {
			version: result.data.version,
			isLatest: true
		}
	} catch(error) {
		return {
			version: baileysVersion as WAVersion,
			isLatest: false,
			error
		}
	}
}

/**
 * A utility that fetches the latest web version of whatsapp.
 * Use to ensure your WA connection is always on the latest version
 */
export const fetchLatestWaWebVersion = async(options: AxiosRequestConfig<{}>) => {
	try {
		const { data } = await axios.get(
			'https://web.whatsapp.com/sw.js',
			{
				...options,
				responseType: 'json'
			}
		)

		const regex = /\\?"client_revision\\?":\s*(\d+)/
		const regexx = /\\?"server_revision\\?":\s*(\d+)/
		const match = data.match(regex)

		if(!match?.[1]) {
			return {
				version: baileysVersion as WAVersion,
				isLatest: false,
				error: {
					message: 'Could not find client revision in the fetched content'
				}
			}
		}

		const clientRevision = match[1]

		return {
			version: [2, 3000, +clientRevision] as WAVersion,
			isLatest: true
		}
	} catch(error) {
		return {
			version: baileysVersion as WAVersion,
			isLatest: false,
			error
		}
	}
}

/** unique message tag prefix for MD clients */
export const generateMdTagPrefix = () => {
	const bytes = randomBytes(4)
	return `${bytes.readUInt16BE()}.${bytes.readUInt16BE(2)}-`
}

const STATUS_MAP: { [_: string]: proto.WebMessageInfo.Status } = {
	'sender': proto.WebMessageInfo.Status.SERVER_ACK,
	'played': proto.WebMessageInfo.Status.PLAYED,
	'read': proto.WebMessageInfo.Status.READ,
	'read-self': proto.WebMessageInfo.Status.READ
}
/**
 * Given a type of receipt, returns what the new status of the message should be
 * @param type type from receipt
 */
export const getStatusFromReceiptType = (type: string | undefined) => {
	const status = STATUS_MAP[type!]
	if(typeof type === 'undefined') {
		return proto.WebMessageInfo.Status.DELIVERY_ACK
	}

	return status
}

const CODE_MAP: { [_: string]: DisconnectReason } = {
	conflict: DisconnectReason.connectionReplaced
}

/**
 * Stream errors generally provide a reason, map that to a baileys DisconnectReason
 * @param reason the string reason given, eg. "conflict"
 */
export const getErrorCodeFromStreamError = (node: BinaryNode) => {
	const [reasonNode] = getAllBinaryNodeChildren(node)
	let reason = reasonNode?.tag || 'unknown'
	const statusCode = +(node.attrs.code || CODE_MAP[reason] || DisconnectReason.badSession)

	if(statusCode === DisconnectReason.restartRequired) {
		reason = 'restart required'
	}

	return {
		reason,
		statusCode
	}
}

export const getCallStatusFromNode = ({ tag, attrs }: BinaryNode) => {
	let status: WACallUpdateType
	switch (tag) {
	case 'offer':
	case 'offer_notice':
		status = 'offer'
		break
	case 'terminate':
		if(attrs.reason === 'timeout') {
			status = 'timeout'
		} else {
			// fired when accepted/rejected/timeout/caller hangs up
			status = 'terminate'
		}

		break
	case 'reject':
		status = 'reject'
		break
	case 'accept':
		status = 'accept'
		break
	default:
		status = 'ringing'
		break
	}

	return status
}

const UNEXPECTED_SERVER_CODE_TEXT = 'Unexpected server response: '

export const getCodeFromWSError = (error: Error) => {
	let statusCode = 500
	if(error?.message?.includes(UNEXPECTED_SERVER_CODE_TEXT)) {
		const code = +error?.message.slice(UNEXPECTED_SERVER_CODE_TEXT.length)
		if(!Number.isNaN(code) && code >= 400) {
			statusCode = code
		}
	} else if(
		(error as any)?.code?.startsWith('E')
		|| error?.message?.includes('timed out')
	) { // handle ETIMEOUT, ENOTFOUND etc
		statusCode = 408
	}

	return statusCode
}

/**
 * Is the given platform WA business
 * @param platform AuthenticationCreds.platform
 */
export const isWABusinessPlatform = (platform: string) => {
	return platform === 'smbi' || platform === 'smba'
}

export function trimUndefined(obj: any) {
	for(const key in obj) {
		if(typeof obj[key] === 'undefined') {
			delete obj[key]
		}
	}

	return obj
}

const CROCKFORD_CHARACTERS = '123456789ABCDEFGHJKLMNPQRSTVWXYZ'

export function bytesToCrockford(buffer: Buffer): string {
	let value = 0
	let bitCount = 0
	const crockford: string[] = []

	for(let i = 0; i < buffer.length; i++) {
		value = (value << 8) | (buffer[i] & 0xff)
		bitCount += 8

		while(bitCount >= 5) {
			crockford.push(CROCKFORD_CHARACTERS.charAt((value >>> (bitCount - 5)) & 31))
			bitCount -= 5
		}
	}

	if(bitCount > 0) {
		crockford.push(CROCKFORD_CHARACTERS.charAt((value << (5 - bitCount)) & 31))
	}

	return crockford.join('')
}
