import { describe, expect, it, jest } from '@jest/globals'
import { promises as fs } from 'fs'
import { isAnimatedWebP, prepareStickerPackMessage } from '../../addons/stickerpack'
import { generateWAMessageContent } from '../../Utils/messages'

// tiny valid static WebP (1x1)
const WEBP = Buffer.from('UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==', 'base64')

const makeOptions = (extra: Record<string, any> = {}) => {
	const uploads: any[] = []
	const upload = jest.fn(async (path: string, opts: any) => {
		uploads.push({ opts, data: await fs.readFile(path) })
		return { mediaUrl: 'https://x', directPath: `/path/${opts.mediaType}` }
	})
	return { uploads, options: { upload, ...extra } as any }
}

describe('prepareStickerPackMessage', () => {
	it('builds + uploads zip and thumbnail with the same mediaKey', async () => {
		const { options, uploads } = makeOptions()
		const msg = await prepareStickerPackMessage(
			{ cover: WEBP, stickers: [{ data: WEBP, emojis: ['🔥'] }, { data: WEBP }], name: 'N', publisher: 'P' },
			options
		)
		expect(msg.name).toBe('N')
		expect(msg.publisher).toBe('P')
		expect(msg.stickers).toHaveLength(2)
		expect(msg.stickers![0]!.emojis).toEqual(['🔥'])
		expect(msg.stickers![1]!.emojis).toEqual(['✨'])
		expect(msg.directPath).toBe('/path/sticker-pack')
		expect(uploads.map(u => u.opts.mediaType)).toEqual(['sticker-pack', 'thumbnail-sticker-pack'])
		expect(msg.trayIconFileName).toBe(`${msg.stickerPackId}.webp`)
	})

	it('identical stickers share one zip entry', async () => {
		const { options } = makeOptions()
		const msg = await prepareStickerPackMessage({ cover: WEBP, stickers: [{ data: WEBP }, { data: WEBP }] }, options)
		expect(Number(msg.stickerPackSize)).toBeGreaterThan(0)
		expect(msg.stickers![0]!.fileName).toBe(msg.stickers![1]!.fileName)
	})

	it('enforces limits', async () => {
		const { options } = makeOptions()
		await expect(prepareStickerPackMessage({ cover: WEBP, stickers: [] }, options)).rejects.toThrow('at least one')
		await expect(prepareStickerPackMessage({ stickers: [{ data: WEBP }] } as any, options)).rejects.toThrow('cover')
		await expect(
			prepareStickerPackMessage({ cover: WEBP, stickers: Array(61).fill({ data: WEBP }) }, options)
		).rejects.toThrow('60')
	})

	it('uses media cache for url stickers', async () => {
		const store = new Map<string, any>()
		const mediaCache = {
			get: async (k: string) => store.get(k),
			set: async (k: string, v: any) => void store.set(k, v),
			del: async (k: string) => void store.delete(k),
			flushAll: async () => store.clear()
		}
		const dir = await fs.mkdtemp('/tmp/stk-')
		await fs.writeFile(`${dir}/a.webp`, WEBP)
		const { options, uploads } = makeOptions({ mediaCache })
		const input = { cover: WEBP, stickers: [{ data: { url: `${dir}/a.webp` } }] }
		const a = await prepareStickerPackMessage(input, options)
		const n = uploads.length
		const b = await prepareStickerPackMessage(input, options)
		expect(uploads.length).toBe(n) // cache hit, no new upload
		expect(b.stickerPackId).toBe(a.stickerPackId)
	})

	it('sendMessage-style content produces stickerPackMessage', async () => {
		const { options } = makeOptions()
		const content = await generateWAMessageContent({ cover: WEBP, stickers: [{ data: WEBP }], name: 'X' } as any, options)
		expect(content.stickerPackMessage?.name).toBe('X')
	})

	it('isAnimatedWebP is false for a static webp / non-webp', () => {
		expect(isAnimatedWebP(WEBP)).toBe(false)
		expect(isAnimatedWebP(Buffer.from('nope'))).toBe(false)
	})
})
