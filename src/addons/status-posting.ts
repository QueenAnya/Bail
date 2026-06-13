/**
 * Status Posting Helpers
 *
 * High-level utilities for sending WhatsApp status updates:
 *  — Text status with background colors, gradients, and fonts
 *  — Image, video, GIF, and audio status
 *  — Group status (sends to group JID with groupStatus flag)
 *  — Personal broadcast (status@broadcast) with optional jidList
 *
 * Source: @innovatorssoft/baileys (status-posting.js)
 */

import { randomBytes } from 'crypto'
import type { WAMediaUpload } from '../Types/index.js'

// ─── Constants ────────────────────────────────────────────────────────────────

export const STATUS_BROADCAST_JID = 'status@broadcast'

/** Pre-defined solid + gradient background colours for text status */
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

/** WA status font indices (0–9) */
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

export type StatusFont = (typeof STATUS_FONTS)[keyof typeof STATUS_FONTS]

// ─── ID generator ─────────────────────────────────────────────────────────────

/** Generate a WhatsApp-style status message ID (starts with 3EB0) */
export const generateStatusMessageId = (): string => `3EB0${randomBytes(16).toString('hex').toUpperCase()}`

export const getStatusJid = () => STATUS_BROADCAST_JID

// ─── Content builders ─────────────────────────────────────────────────────────

export interface TextStatusOptions {
	text: string
	backgroundColor?: string
	font?: StatusFont
	textColor?: string
	mentions?: string[]
}

export interface MediaStatusOptions {
	caption?: string
	gifPlayback?: boolean
	waveform?: Buffer | Uint8Array
}

/** Build text status content object (pass directly to sendMessage) */
export const createTextStatus = (options: TextStatusOptions) => ({
	text: options.text,
	backgroundColor: options.backgroundColor ?? STATUS_BACKGROUNDS.solid.green,
	font: options.font ?? STATUS_FONTS.SANS_SERIF,
	textColor: options.textColor ?? '#FFFFFF',
	contextInfo: {
		mentionedJid: options.mentions ?? [],
		isForwarded: false
	}
})

/** Build image status content */
export const createImageStatus = (media: WAMediaUpload | string, options?: MediaStatusOptions) => ({
	image: typeof media === 'string' ? { url: media } : media,
	caption: options?.caption ?? ''
})

/** Build video status content */
export const createVideoStatus = (media: WAMediaUpload | string, options?: MediaStatusOptions) => ({
	video: typeof media === 'string' ? { url: media } : media,
	caption: options?.caption ?? '',
	gifPlayback: options?.gifPlayback ?? false
})

/** Build PTT/audio status content */
export const createAudioStatus = (media: WAMediaUpload | string, options?: MediaStatusOptions) => ({
	audio: typeof media === 'string' ? { url: media } : media,
	ptt: true,
	mimetype: 'audio/ogg; codecs=opus',
	waveform: options?.waveform
})

// ─── High-level StatusHelper ──────────────────────────────────────────────────

/**
 * High-level helper object for building and sending status updates.
 *
 * @example
 * // Text status
 * await StatusHelper.send(sock, StatusHelper.text('Hello World!', '#25D366'), contacts)
 *
 * // Image status
 * await StatusHelper.send(sock, StatusHelper.image(buffer, 'My photo'))
 *
 * // Group status
 * await StatusHelper.send(sock, StatusHelper.text('Team update'), ['123@g.us'])
 */
export const StatusHelper = {
	/** Build a text status */
	text: (text: string, backgroundColor?: string, font?: StatusFont) =>
		createTextStatus({ text, backgroundColor, font }),

	/** Build an image status from a Buffer */
	image: (buffer: Buffer, caption?: string) => createImageStatus(buffer, { caption }),

	/** Build an image status from a URL */
	imageUrl: (url: string, caption?: string) => createImageStatus(url, { caption }),

	/** Build a video status from a Buffer */
	video: (buffer: Buffer, caption?: string) => createVideoStatus(buffer, { caption }),

	/** Build a video status from a URL */
	videoUrl: (url: string, caption?: string) => createVideoStatus(url, { caption }),

	/** Build a GIF status (looped video) */
	gif: (buffer: Buffer, caption?: string) => createVideoStatus(buffer, { caption, gifPlayback: true }),

	/** Build a PTT voice note status */
	voiceNote: (buffer: Buffer, waveform?: Buffer) => createAudioStatus(buffer, { waveform }),

	/**
	 * Send status to a list of JIDs (or broadcast to all contacts if empty).
	 * Handles groups separately via the groupStatus flag.
	 *
	 * @param sock      - Baileys socket instance
	 * @param content   - Status content (from createTextStatus, createImageStatus, etc.)
	 * @param jidList   - JIDs who should see the status; leave empty for all contacts
	 */
	send: async (
		sock: {
			sendMessage: (jid: string, content: any, opts?: any) => Promise<any>
		},
		content: any,
		jidList: string[] = []
	) => {
		if (jidList.length === 0) {
			console.warn('[StatusHelper] jidList is empty — status visible to all contacts')
		}

		const groups = jidList.filter(j => j?.endsWith('@g.us'))
		const individuals = jidList.filter(j => j?.endsWith('@s.whatsapp.net') || j?.endsWith('@lid'))

		let lastResult: any

		// Group status — sends into each group chat with groupStatus=true
		for (const groupJid of groups) {
			lastResult = await sock.sendMessage(
				groupJid,
				{ ...content, groupStatus: true },
				{ messageId: generateStatusMessageId() }
			)
		}

		// Personal broadcast
		if (individuals.length > 0 || groups.length === 0) {
			const result = await sock.sendMessage(STATUS_BROADCAST_JID, content, {
				statusJidList: individuals.length > 0 ? individuals : undefined,
				messageId: generateStatusMessageId()
			})
			if (!lastResult) lastResult = result
		}

		return lastResult
	}
}
