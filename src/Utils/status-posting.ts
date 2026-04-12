/**
 * WhatsApp Status / Story Posting Utilities
 * Ported from Baileys-Joss / innovatorssoft.
 */

import { randomBytes } from 'crypto'
import type { AnyMessageContent, WAMessage } from '../Types'

// =====================================================
// CONSTANTS
// =====================================================

/** Pre-defined background colors for text status */
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

/** Font types for text status (0–9) */
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

/** Target JID for personal broadcast status */
export const STATUS_BROADCAST_JID = 'status@broadcast'

// =====================================================
// TYPES
// =====================================================

export interface TextStatusOptions {
	text: string
	backgroundColor?: string
	font?: number
	textColor?: string
	mentions?: string[]
}

export interface MediaStatusOptions {
	caption?: string
	gifPlayback?: boolean
	waveform?: Uint8Array
}

// =====================================================
// GENERATORS
// =====================================================

/** Generate a typical WhatsApp status message ID starting with 3EB0 */
export const generateStatusMessageId = (): string => {
	return `3EB0${randomBytes(16).toString('hex').toUpperCase()}`
}

/** Helper to return the broadcast JID */
export const getStatusJid = (): string => STATUS_BROADCAST_JID

/** Create text status content */
export const createTextStatus = (options: TextStatusOptions): AnyMessageContent =>
	({
		text: options.text,
		backgroundColor: options.backgroundColor || STATUS_BACKGROUNDS.solid.green,
		font: options.font ?? STATUS_FONTS.SANS_SERIF,
		textColor: options.textColor || '#FFFFFF',
		contextInfo: {
			mentionedJid: options.mentions || [],
			isForwarded: false
		}
	}) as unknown as AnyMessageContent

/** Create image status content */
export const createImageStatus = (media: { url: string } | Buffer, options?: MediaStatusOptions): AnyMessageContent =>
	({
		image: typeof media === 'string' ? { url: media } : media,
		caption: options?.caption || ''
	}) as unknown as AnyMessageContent

/** Create video status content */
export const createVideoStatus = (media: { url: string } | Buffer, options?: MediaStatusOptions): AnyMessageContent =>
	({
		video: typeof media === 'string' ? { url: media } : media,
		caption: options?.caption || '',
		gifPlayback: options?.gifPlayback || false
	}) as unknown as AnyMessageContent

/** Create audio/PTT status content */
export const createAudioStatus = (media: { url: string } | Buffer, options?: MediaStatusOptions): AnyMessageContent =>
	({
		audio: typeof media === 'string' ? { url: media } : media,
		ptt: true,
		mimetype: 'audio/ogg; codecs=opus',
		waveform: options?.waveform
	}) as unknown as AnyMessageContent

// =====================================================
// STATUS HELPER
// =====================================================

interface StatusSock {
	sendMessage(
		jid: string,
		content: AnyMessageContent,
		options?: { statusJidList?: string[]; messageId?: string }
	): Promise<WAMessage | undefined>
}

/**
 * High-level builder to create and send status messages.
 *
 * @example
 * // Send text status to all contacts
 * await StatusHelper.send(sock, StatusHelper.text('Hello World!', '#25D366'))
 *
 * // Send image status to specific contacts
 * await StatusHelper.send(sock, StatusHelper.image(buffer, 'My photo'), [jid1, jid2])
 */
export const StatusHelper = {
	text: (text: string, backgroundColor?: string, font?: number) => createTextStatus({ text, backgroundColor, font }),
	image: (buffer: Buffer, caption?: string) => createImageStatus(buffer, { caption }),
	imageUrl: (url: string, caption?: string) => createImageStatus({ url }, { caption }),
	video: (buffer: Buffer, caption?: string) => createVideoStatus(buffer, { caption }),
	videoUrl: (url: string, caption?: string) => createVideoStatus({ url }, { caption }),
	gif: (buffer: Buffer, caption?: string) => createVideoStatus(buffer, { caption, gifPlayback: true }),
	voiceNote: (buffer: Buffer) => createAudioStatus(buffer),

	/**
	 * Send status to broadcast (all contacts) or a specific list.
	 * @param sock     - Baileys socket instance
	 * @param content  - Status content built via `StatusHelper.*`
	 * @param jidList  - Specific JIDs who should see this status (empty = all contacts)
	 */
	send: async (
		sock: StatusSock,
		content: AnyMessageContent,
		jidList: string[] = []
	): Promise<WAMessage | undefined> => {
		if (!jidList || jidList.length === 0) {
			// eslint-disable-next-line no-console
			console.warn('StatusHelper: jidList is empty — status may be visible to all contacts.')
		}

		const groups = jidList.filter(jid => jid && jid.endsWith('@g.us'))
		const individuals = jidList.filter(jid => jid && (jid.endsWith('@s.whatsapp.net') || jid.endsWith('@lid')))

		let lastResult: WAMessage | undefined

		// Group statuses (sent as a message to the group with groupStatus flag)
		if (groups.length > 0) {
			const groupContent = { ...content, groupStatus: true } as AnyMessageContent
			for (const groupJid of groups) {
				lastResult = await sock.sendMessage(groupJid, groupContent, {
					messageId: generateStatusMessageId()
				})
			}
		}

		// Personal status@broadcast
		if (individuals.length > 0 || jidList.length === 0) {
			const result = await sock.sendMessage(STATUS_BROADCAST_JID, content, {
				statusJidList: individuals.length > 0 ? individuals : undefined,
				messageId: generateStatusMessageId()
			})
			if (!lastResult) lastResult = result
		}

		return lastResult
	}
}
