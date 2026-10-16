/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT) - Utils/status-stickers.js, rewritten in TypeScript.
 *
 * Interactive "stickers" for status images / videos (location, channel, link, music, embedded message) as
 * `InteractiveAnnotation` objects, plus the `music` message builder / reader.
 */
import { proto } from '../../WAProto/index.js'

export const StatusLinkType = Object.freeze({
	RASTERIZED_LINK_PREVIEW: 1,
	RASTERIZED_LINK_TRUNCATED: 2,
	RASTERIZED_LINK_FULL_URL: 3
})

export const STICKER_DEFAULT_AREA = Object.freeze({ x: 0.25, y: 0.4, width: 0.5, height: 0.2 })

export interface StickerArea {
	x: number
	y: number
	width: number
	height: number
}

const trimUndefined = <T extends Record<string, any>>(object: T): T => {
	for (const key of Object.keys(object)) {
		if (object[key] === undefined) {
			delete object[key]
		}
	}

	return object
}

const fraction = (value: number, name: string): number => {
	const number = Number(value)
	if (!Number.isFinite(number) || number < 0 || number > 1) {
		throw new TypeError(`${name} must be between 0 and 1, the client reads these as a fraction of the media`)
	}

	return number
}

/** the four corners of a sticker area (fractions of the media, 0..1) */
export const stickerArea = ({ x, y, width, height }: StickerArea = STICKER_DEFAULT_AREA) => {
	const left = fraction(x, 'x')
	const top = fraction(y, 'y')
	const right = fraction(left + Number(width), 'x + width')
	const bottom = fraction(top + Number(height), 'y + height')
	if (right <= left || bottom <= top) {
		throw new TypeError('a sticker area needs a positive width and height')
	}

	return [
		{ x: left, y: top },
		{ x: right, y: top },
		{ x: right, y: bottom },
		{ x: left, y: bottom }
	]
}

const annotation = (area: StickerArea | { x: number; y: number }[] | undefined, fields: Record<string, any>) => ({
	polygonVertices: Array.isArray(area) ? area : stickerArea(area),
	...fields
})

export const locationSticker = ({
	latitude,
	longitude,
	name,
	area,
	skipConfirmation
}: { latitude?: number; longitude?: number; name?: string; area?: StickerArea; skipConfirmation?: boolean } = {}) => {
	const degreesLatitude = Number(latitude)
	const degreesLongitude = Number(longitude)
	if (!Number.isFinite(degreesLatitude) || !Number.isFinite(degreesLongitude)) {
		throw new TypeError('locationSticker needs a numeric latitude and longitude')
	}

	return annotation(area, {
		location: { degreesLatitude, degreesLongitude, ...(name ? { name } : {}) },
		...(skipConfirmation === undefined ? {} : { shouldSkipConfirmation: !!skipConfirmation })
	})
}

export const channelSticker = ({
	jid,
	name,
	serverMessageId = 0,
	accessibilityText,
	area
}: { jid?: string; name?: string; serverMessageId?: number; accessibilityText?: string; area?: StickerArea } = {}) => {
	if (typeof jid !== 'string' || !jid.endsWith('@newsletter')) {
		throw new TypeError('channelSticker needs the channel jid, the one ending in @newsletter')
	}

	return annotation(area, {
		newsletter: {
			newsletterJid: jid,
			serverMessageId: Number(serverMessageId),
			...(name ? { newsletterName: name } : {}),
			...(accessibilityText ? { accessibilityText } : {})
		}
	})
}

export const linkSticker = ({
	url,
	title,
	area,
	linkType = StatusLinkType.RASTERIZED_LINK_PREVIEW
}: { url?: string; title?: string; area?: StickerArea; linkType?: number } = {}) => {
	if (typeof url !== 'string' || !url) {
		throw new TypeError('linkSticker needs a url')
	}

	return annotation(area, {
		tapAction: { tapUrl: url, ...(title ? { title } : {}) },
		statusLinkType: linkType
	})
}

export interface MusicStickerOptions {
	songId?: string | number
	title?: string
	author?: string
	mediaId?: string | number
	artworkDirectPath?: string
	artworkSha256?: Uint8Array | string
	artworkEncSha256?: Uint8Array | string
	artworkMediaKey?: Uint8Array | string
	artistAttribution?: string
	countryBlocklist?: Uint8Array | string
	isExplicit?: boolean
	startTimeMs?: number
	derivedStartTimeMs?: number
	durationMs?: number
	area?: StickerArea
}

export const musicSticker = ({
	songId,
	title,
	author,
	mediaId,
	artworkDirectPath,
	artworkSha256,
	artworkEncSha256,
	artworkMediaKey,
	artistAttribution,
	countryBlocklist,
	isExplicit,
	startTimeMs = 0,
	derivedStartTimeMs,
	durationMs,
	area
}: MusicStickerOptions = {}) => {
	if (!songId && !mediaId) {
		throw new TypeError('musicSticker needs at least a songId or a musicContentMediaId')
	}

	const bytes = (value?: Uint8Array | string) =>
		value === undefined ? undefined : Buffer.isBuffer(value) ? value : Buffer.from(value as any, 'base64')
	const embeddedMusic: Record<string, any> = {
		...(songId ? { songId: String(songId) } : {}),
		...(mediaId ? { musicContentMediaId: String(mediaId) } : {}),
		...(title ? { title } : {}),
		...(author ? { author } : {}),
		...(artistAttribution ? { artistAttribution } : {}),
		...(artworkDirectPath ? { artworkDirectPath } : {}),
		...(isExplicit === undefined ? {} : { isExplicit: !!isExplicit }),
		musicSongStartTimeInMs: Number(startTimeMs),
		...(derivedStartTimeMs === undefined ? {} : { derivedContentStartTimeInMs: Number(derivedStartTimeMs) }),
		...(durationMs === undefined ? {} : { overlapDurationInMs: Number(durationMs) })
	}
	for (const [key, value] of [
		['artworkSha256', artworkSha256],
		['artworkEncSha256', artworkEncSha256],
		['artworkMediaKey', artworkMediaKey],
		['countryBlocklist', countryBlocklist]
	] as [string, Uint8Array | string | undefined][]) {
		const buffer = bytes(value)
		if (buffer) {
			embeddedMusic[key] = buffer
		}
	}

	return annotation(area, { embeddedContent: { embeddedMusic } })
}

export const messageSticker = ({
	stanzaId,
	message,
	area
}: { stanzaId?: string; message?: any; area?: StickerArea } = {}) => {
	if (!message) {
		throw new TypeError('messageSticker needs the message it embeds')
	}

	return annotation(area, {
		embeddedContent: { embeddedMessage: { ...(stanzaId ? { stanzaId } : {}), message } }
	})
}

const ACTIONS = ['location', 'newsletter', 'embeddedAction', 'tapAction']

/** validates sticker annotations and turns them into `proto.InteractiveAnnotation` objects */
export const normalizeStickers = (stickers: any) => {
	const list = Array.isArray(stickers) ? stickers : [stickers]
	return list.filter(Boolean).map((sticker: any, index: number) => {
		const vertices = sticker.polygonVertices
		if (!Array.isArray(vertices) || vertices.length !== 4) {
			throw new TypeError(`sticker ${index} needs four polygonVertices, the client reads corner 0 and corner 2`)
		}

		const actions = ACTIONS.filter(name => sticker[name] !== undefined && sticker[name] !== null)
		if (actions.length > 1) {
			throw new TypeError(
				`sticker ${index} sets ${actions.join(' and ')}, but the client reads only one action per sticker`
			)
		}

		return proto.InteractiveAnnotation.fromObject(sticker)
	})
}

export const readStickers = (message: any) => {
	const media = message?.imageMessage ?? message?.videoMessage ?? message
	const annotations = media?.interactiveAnnotations
	if (!Array.isArray(annotations) || !annotations.length) {
		return []
	}

	return annotations.map((item: any) => {
		const [topLeft, , bottomRight] = item.polygonVertices ?? []
		const music = item.embeddedContent?.embeddedMusic
		return {
			kind: item.location
				? 'location'
				: item.newsletter
					? 'channel'
					: item.tapAction
						? 'link'
						: music
							? 'music'
							: item.embeddedContent?.embeddedMessage
								? 'message'
								: 'unknown',
			area:
				topLeft && bottomRight
					? { x: topLeft.x, y: topLeft.y, width: bottomRight.x - topLeft.x, height: bottomRight.y - topLeft.y }
					: undefined,
			location: item.location ?? undefined,
			channel: item.newsletter ?? undefined,
			link: item.tapAction
				? { url: item.tapAction.tapUrl, title: item.tapAction.title, linkType: item.statusLinkType }
				: undefined,
			music: music ? { songId: music.songId, title: music.title, author: music.author } : undefined,
			message: item.embeddedContent?.embeddedMessage ?? undefined,
			annotation: item
		}
	})
}

export const MusicMessageStyle = Object.freeze({ UNKNOWN: 0, VINYL: 1 })

export const MUSIC_ALLOWED_HOSTS = Object.freeze([
	'.whatsapp.net',
	'.whatsapp.com',
	'.fbcdn.net',
	'.facebook.com',
	'.instagram.com',
	'.cdninstagram.com'
])

export const isMusicHostAllowed = (value: unknown): boolean => {
	let host: string
	try {
		host = new URL(String(value)).hostname.toLowerCase()
	} catch {
		return false
	}

	return MUSIC_ALLOWED_HOSTS.some(suffix => host.endsWith(suffix) || host === suffix.slice(1))
}

const assertMusicHost = (value: string | undefined, label: string) => {
	if (value === undefined) {
		return undefined
	}

	if (!isMusicHostAllowed(value)) {
		throw new TypeError(
			`${label} must be hosted on ${MUSIC_ALLOWED_HOSTS.join(', ')} — the client refuses any other host ` +
				'and draws nothing. Both uris come from Meta music catalog entries, so carry them over from a ' +
				'message you received rather than pointing at your own file'
		)
	}

	return value
}

export const buildMusicMessage = ({
	songUri,
	artworkUri,
	style = MusicMessageStyle.VINYL,
	contextInfo,
	...music
}: MusicStickerOptions & { songUri?: string; artworkUri?: string; style?: number; contextInfo?: any } = {}) =>
	trimUndefined({
		embeddedMusic: (musicSticker(music) as any).embeddedContent.embeddedMusic,
		songUri: assertMusicHost(songUri, 'songUri'),
		artworkUri: assertMusicHost(artworkUri, 'artworkUri'),
		style,
		contextInfo
	})

export const readMusicMessage = (msg: any) => {
	const message = msg?.message ?? msg
	const music = message?.musicMessage
	if (!music) {
		return null
	}

	const embedded = music.embeddedMusic ?? {}
	return {
		songId: embedded.songId,
		mediaId: embedded.musicContentMediaId,
		title: embedded.title,
		author: embedded.author,
		artistAttribution: embedded.artistAttribution,
		isExplicit: embedded.isExplicit,
		startTimeMs: embedded.musicSongStartTimeInMs,
		durationMs: embedded.overlapDurationInMs,
		songUri: music.songUri,
		artworkUri: music.artworkUri,
		style: music.style,
		embeddedMusic: embedded
	}
}
