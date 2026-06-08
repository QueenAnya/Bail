/**
 * Status / Story Posting Helpers
 *
 * Source: @innovatorssoft/baileys (status-posting.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Build and send WhatsApp status updates (text, image, video, audio/PTT)
 * to status@broadcast or specific JIDs / groups.
 */

import { randomBytes } from 'crypto'
import type { AnyMessageContent, WAMessage } from '../Types/index.js'

// ─── Constants ────────────────────────────────────────────────────────────────

/** The WhatsApp broadcast JID for personal status updates. */
export const STATUS_BROADCAST_JID = 'status@broadcast'

/** Pre-defined solid + gradient background colors for text statuses. */
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

/** Font type numeric codes for text statuses (WA internal values). */
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
export type StatusBackground = string | string[]

// ─── Types ────────────────────────────────────────────────────────────────────

export type TextStatusOptions = {
	text: string
	backgroundColor?: string
	textColor?: string
	font?: StatusFont
	mentions?: string[]
}

export type MediaStatusOptions = {
	caption?: string
	gifPlayback?: boolean
	waveform?: Uint8Array
}

// ─── Message ID generator ─────────────────────────────────────────────────────

/**
 * Generate a WhatsApp-style status message ID beginning with `3EB0`.
 * This prefix is expected by WA clients for status messages.
 */
export const generateStatusMessageId = (): string => `3EB0${randomBytes(16).toString('hex').toUpperCase()}`

// ─── Content builders ─────────────────────────────────────────────────────────

/**
 * Build a text status message content object.
 *
 * @example
 * const content = createTextStatus({
 *     text: 'Good morning! ☀️',
 *     backgroundColor: STATUS_BACKGROUNDS.solid.blue,
 *     font: STATUS_FONTS.NORICAN
 * })
 * await StatusHelper.send(sock, content, [jid1, jid2])
 */
export const createTextStatus = (options: TextStatusOptions): AnyMessageContent =>
	({
		text: options.text,
		backgroundColor: options.backgroundColor ?? STATUS_BACKGROUNDS.solid.green,
		font: options.font ?? STATUS_FONTS.SANS_SERIF,
		textColor: options.textColor ?? '#FFFFFF',
		contextInfo: {
			mentionedJid: options.mentions ?? [],
			isForwarded: false
		}
	}) as AnyMessageContent

/**
 * Build an image status message content object.
 *
 * @param media - A Buffer (image data) or a URL string
 */
export const createImageStatus = (
	media: Buffer | string,
	options?: Pick<MediaStatusOptions, 'caption'>
): AnyMessageContent =>
	({
		image: typeof media === 'string' ? { url: media } : media,
		caption: options?.caption ?? ''
	}) as AnyMessageContent

/**
 * Build a video status message content object.
 *
 * @param media - A Buffer (video data) or a URL string
 */
export const createVideoStatus = (
	media: Buffer | string,
	options?: Pick<MediaStatusOptions, 'caption' | 'gifPlayback'>
): AnyMessageContent =>
	({
		video: typeof media === 'string' ? { url: media } : media,
		caption: options?.caption ?? '',
		gifPlayback: options?.gifPlayback ?? false
	}) as AnyMessageContent

/**
 * Build an audio/PTT status message content object.
 * WA always renders status audio as a voice note (PTT).
 *
 * @param media - A Buffer (audio data) or a URL string
 */
export const createAudioStatus = (
	media: Buffer | string,
	options?: Pick<MediaStatusOptions, 'waveform'>
): AnyMessageContent =>
	({
		audio: typeof media === 'string' ? { url: media } : media,
		ptt: true,
		mimetype: 'audio/ogg; codecs=opus',
		waveform: options?.waveform
	}) as AnyMessageContent

// ─── StatusHelper ─────────────────────────────────────────────────────────────

type Sock = {
	sendMessage(
		jid: string,
		content: AnyMessageContent,
		opts?: { statusJidList?: string[]; messageId?: string }
	): Promise<WAMessage | undefined>
}

/**
 * High-level status builder and sender.
 *
 * @example
 * // Text status visible to specific contacts
 * await StatusHelper.send(sock, StatusHelper.text('Hello world!'), [friendJid])
 *
 * // Image status from URL, visible to all contacts
 * await StatusHelper.send(sock, StatusHelper.imageUrl('https://example.com/img.jpg', 'Caption'))
 *
 * // Group status (appears as a message in the group that shows as status)
 * await StatusHelper.send(sock, StatusHelper.text('Team update!'), [groupJid])
 */
export const StatusHelper = {
	/** Create a text status content object. */
	text: (text: string, backgroundColor?: string, font?: StatusFont) =>
		createTextStatus({ text, backgroundColor, font }),

	/** Create an image status from a Buffer. */
	image: (buffer: Buffer, caption?: string) => createImageStatus(buffer, { caption }),

	/** Create an image status from a URL. */
	imageUrl: (url: string, caption?: string) => createImageStatus(url, { caption }),

	/** Create a video status from a Buffer. */
	video: (buffer: Buffer, caption?: string) => createVideoStatus(buffer, { caption }),

	/** Create a video status from a URL. */
	videoUrl: (url: string, caption?: string) => createVideoStatus(url, { caption }),

	/** Create a GIF status from a Buffer. */
	gif: (buffer: Buffer, caption?: string) => createVideoStatus(buffer, { caption, gifPlayback: true }),

	/** Create a voice note (PTT) status from a Buffer. */
	voiceNote: (buffer: Buffer, waveform?: Uint8Array) => createAudioStatus(buffer, { waveform }),

	/**
	 * Send a status to specific contacts and/or groups.
	 *
	 * - JIDs ending with `@g.us` are treated as groups — the status is sent
	 *   directly to that group chat (group status v2 behaviour).
	 * - Individual JIDs are sent via `status@broadcast` with `statusJidList`.
	 * - If `jidList` is empty the status is broadcast to all contacts.
	 *
	 * @param sock      - Baileys socket
	 * @param content   - Message content (from one of the helpers above)
	 * @param jidList   - JIDs that should see the status (default: all contacts)
	 * @returns         - The last sent WAMessage, or undefined
	 */
	send: async (sock: Sock, content: AnyMessageContent, jidList: string[] = []): Promise<WAMessage | undefined> => {
		const groups = jidList.filter(j => j.endsWith('@g.us'))
		const individuals = jidList.filter(j => j.endsWith('@s.whatsapp.net') || j.endsWith('@lid'))

		let lastResult: WAMessage | undefined

		// Group status — send as a regular group message (WA group status v2)
		for (const groupJid of groups) {
			lastResult = await sock.sendMessage(groupJid, content, {
				messageId: generateStatusMessageId()
			})
		}

		// Personal broadcast status
		if (individuals.length > 0 || jidList.length === 0) {
			lastResult = await sock.sendMessage(STATUS_BROADCAST_JID, content, {
				statusJidList: individuals.length > 0 ? individuals : undefined,
				messageId: generateStatusMessageId()
			})
		}

		return lastResult
	}
}
