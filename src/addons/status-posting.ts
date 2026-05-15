import { randomBytes } from 'crypto'
import type { AnyMessageContent } from '../Types'

export type StatusType = 'text' | 'image' | 'video' | 'audio'

export interface TextStatusOptions {
	text: string
	backgroundColor?: string
	font?: number
	textColor?: string
}
export interface MediaStatusOptions {
	media: Buffer | string
	caption?: string
	viewOnce?: boolean
}
export interface StatusPostResult {
	messageId: string
	timestamp: Date
	type: StatusType
}

export const STATUS_BACKGROUNDS = {
	solid: {
		green: '#25D366',
		blue: '#34B7F1',
		purple: '#8B5CF6',
		red: '#EF4444',
		orange: '#F97316',
		yellow: '#EAB308',
		pink: '#EC4899',
		teal: '#14B8A6',
		gray: '#6B7280',
		black: '#000000',
		white: '#FFFFFF'
	},
	gradient: {
		sunset: ['#F97316', '#EF4444'],
		ocean: ['#3B82F6', '#06B6D4'],
		forest: ['#22C55E', '#10B981'],
		purple: ['#8B5CF6', '#EC4899'],
		midnight: ['#1E3A8A', '#4C1D95'],
		aurora: ['#06B6D4', '#8B5CF6']
	}
} as const

export const STATUS_FONTS = {
	SANS_SERIF: 0,
	SERIF: 1,
	NORICAN: 2,
	BRYNDAN: 3,
	BEBASNEUE: 4,
	OSWALD: 5,
	DAMION: 6,
	DANCING: 7,
	COMFORTAA: 8,
	EXOTWO: 9
} as const

export const generateStatusMessageId = (): string => `STATUS_${randomBytes(8).toString('hex').toUpperCase()}`

export const createTextStatus = (options: TextStatusOptions): AnyMessageContent =>
	({
		text: options.text,
		backgroundColor: options.backgroundColor,
		font: options.font
	}) as any

export const createImageStatus = (
	media: Buffer | string,
	options?: { caption?: string; viewOnce?: boolean }
): AnyMessageContent =>
	({
		image: typeof media === 'string' ? { url: media } : media,
		caption: options?.caption,
		viewOnce: options?.viewOnce
	}) as any

export const createVideoStatus = (
	media: Buffer | string,
	options?: { caption?: string; viewOnce?: boolean; gifPlayback?: boolean }
): AnyMessageContent =>
	({
		video: typeof media === 'string' ? { url: media } : media,
		caption: options?.caption,
		viewOnce: options?.viewOnce,
		gifPlayback: options?.gifPlayback
	}) as any

export const createAudioStatus = (media: Buffer | string, options?: { ptt?: boolean }): AnyMessageContent =>
	({
		audio: typeof media === 'string' ? { url: media } : media,
		ptt: options?.ptt
	}) as any

export const STATUS_BROADCAST_JID = 'status@broadcast'
export const getStatusJid = () => STATUS_BROADCAST_JID

export const StatusHelper = {
	text: (text: string, backgroundColor?: string): AnyMessageContent => createTextStatus({ text, backgroundColor }),
	image: (buffer: Buffer, caption?: string): AnyMessageContent => createImageStatus(buffer, { caption }),
	imageUrl: (url: string, caption?: string): AnyMessageContent => createImageStatus(url, { caption }),
	video: (buffer: Buffer, caption?: string): AnyMessageContent => createVideoStatus(buffer, { caption }),
	videoUrl: (url: string, caption?: string): AnyMessageContent => createVideoStatus(url, { caption }),
	gif: (buffer: Buffer, caption?: string): AnyMessageContent =>
		createVideoStatus(buffer, { caption, gifPlayback: true }),
	voiceNote: (buffer: Buffer): AnyMessageContent => createAudioStatus(buffer, { ptt: true })
}
