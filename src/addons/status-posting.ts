/**
 * Status / Story Posting Helpers
 * Ported from innovatorssoft/Baileys
 */

import { randomBytes } from 'crypto'
import type { WAMediaUpload } from '../Types'

/** Pre-defined solid and gradient background colours for text status */
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
		aurora: ['#06B6D4', '#8B5CF6', '#EC4899']
	}
} as const

/** Font index constants for text status (0–9) */
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

export const STATUS_BROADCAST_JID = 'status@broadcast'

/** Generate a WhatsApp-style status message ID (3EB0 prefix) */
export const generateStatusMessageId = (): string => `3EB0${randomBytes(16).toString('hex').toUpperCase()}`

/** Return the broadcast JID */
export const getStatusJid = (): string => STATUS_BROADCAST_JID

// ── Content builders ──────────────────────────────────────────────────────────

export interface TextStatusOptions {
	text: string
	backgroundColor?: string
	font?: number
	textColor?: string
	mentions?: string[]
}

export const createTextStatus = (options: TextStatusOptions) => ({
	text: options.text,
	backgroundColor: options.backgroundColor || STATUS_BACKGROUNDS.solid.green,
	font: options.font ?? STATUS_FONTS.SANS_SERIF,
	textColor: options.textColor || '#FFFFFF',
	contextInfo: {
		mentionedJid: options.mentions || [],
		isForwarded: false
	}
})

export const createImageStatus = (media: WAMediaUpload | string, options?: { caption?: string }) => ({
	image: typeof media === 'string' ? { url: media } : media,
	caption: options?.caption || ''
})

export const createVideoStatus = (
	media: WAMediaUpload | string,
	options?: { caption?: string; gifPlayback?: boolean }
) => ({
	video: typeof media === 'string' ? { url: media } : media,
	caption: options?.caption || '',
	gifPlayback: options?.gifPlayback || false
})

export const createAudioStatus = (media: WAMediaUpload | string, options?: { waveform?: Uint8Array }) => ({
	audio: typeof media === 'string' ? { url: media } : media,
	ptt: true,
	mimetype: 'audio/ogg; codecs=opus',
	waveform: options?.waveform
})

// ── High-level StatusHelper ───────────────────────────────────────────────────

export const StatusHelper = {
	text: (text: string, backgroundColor?: string, font?: number) => createTextStatus({ text, backgroundColor, font }),
	image: (buffer: WAMediaUpload, caption?: string) => createImageStatus(buffer, { caption }),
	imageUrl: (url: string, caption?: string) => createImageStatus(url, { caption }),
	video: (buffer: WAMediaUpload, caption?: string) => createVideoStatus(buffer, { caption }),
	videoUrl: (url: string, caption?: string) => createVideoStatus(url, { caption }),
	gif: (buffer: WAMediaUpload, caption?: string) => createVideoStatus(buffer, { caption, gifPlayback: true }),
	voiceNote: (buffer: WAMediaUpload) => createAudioStatus(buffer)
}
