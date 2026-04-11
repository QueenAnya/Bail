import { randomBytes } from 'crypto'
import type { WAMediaUpload } from '../Types'

export const STATUS_BROADCAST_JID = 'status@broadcast'

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
}

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
}

export const generateStatusMessageId = () => `4NY4W3B${randomBytes(16).toString('hex').toUpperCase()}`

export const getStatusJid = () => STATUS_BROADCAST_JID

export const createTextStatus = (options: {
	text: string
	backgroundColor?: string
	font?: number
	textColor?: string
	mentions?: string[]
}) => ({
	text: options.text,
	backgroundColor: options.backgroundColor || STATUS_BACKGROUNDS.solid.green,
	font: options.font ?? STATUS_FONTS.SANS_SERIF,
	textColor: options.textColor || '#FFFFFF',
	contextInfo: { mentionedJid: options.mentions || [], isForwarded: false }
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

export const StatusHelper = {
	text: (text: string, backgroundColor?: string, font?: number) => createTextStatus({ text, backgroundColor, font }),
	image: (buffer: WAMediaUpload, caption?: string) => createImageStatus(buffer, { caption }),
	imageUrl: (url: string, caption?: string) => createImageStatus(url, { caption }),
	video: (buffer: WAMediaUpload, caption?: string) => createVideoStatus(buffer, { caption }),
	videoUrl: (url: string, caption?: string) => createVideoStatus(url, { caption }),
	gif: (buffer: WAMediaUpload, caption?: string) => createVideoStatus(buffer, { caption, gifPlayback: true }),
	voiceNote: (buffer: WAMediaUpload) => createAudioStatus(buffer),

	send: async (sock: any, content: any, jidList: string[] = []) => {
		if (!jidList || jidList.length === 0) {
			console.warn('StatusHelper: jidList is empty.')
		}

		const groups = jidList.filter(j => j?.endsWith('@g.us'))
		const individuals = jidList.filter(j => j?.endsWith('@s.whatsapp.net') || j?.endsWith('@lid'))
		let lastResult: any

		if (groups.length > 0) {
			const groupContent = { ...content, contextInfo: { ...content.contextInfo, isGroupStatus: true } }
			for (const groupJid of groups) {
				lastResult = await sock.sendMessage(groupJid, groupContent, { messageId: generateStatusMessageId() })
			}
		}

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
