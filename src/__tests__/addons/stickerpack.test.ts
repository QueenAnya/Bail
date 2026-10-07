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

	it('requires at least one sticker and a cover', async () => {
		const { options } = makeOptions()
		await expect(prepareStickerPackMessage({ cover: WEBP, stickers: [] }, options)).rejects.toThrow('at least one')
		await expect(prepareStickerPackMessage({ stickers: [{ data: WEBP }] } as any, options)).rejects.toThrow('cover')
		await expect(prepareStickerPackMessage({ cover: WEBP, stickers: [{}] } as any, options)).rejects.toThrow('missing media')
	})

	it('has no sticker-count limit (150 stickers)', async () => {
		const { options } = makeOptions()
		const stickers = Array.from({ length: 150 }, (_, i) => ({ data: Buffer.concat([WEBP, Buffer.from([i])]) }))
		const msg = await prepareStickerPackMessage({ cover: WEBP, stickers }, options)
		expect(msg.stickers).toHaveLength(150)
	})

	it('accepts both `data` and `sticker`, and a custom packId', async () => {
		const { options } = makeOptions()
		const msg = await prepareStickerPackMessage(
			{ cover: WEBP, packId: 'my-pack-001', stickers: [{ data: WEBP }, { sticker: WEBP }] },
			options
		)
		expect(msg.stickerPackId).toBe('my-pack-001')
		expect(msg.trayIconFileName).toBe('my-pack-001.webp')
		expect(msg.stickers).toHaveLength(2)
	})

	it('keeps original size + quality 100 (no 1MB limit)', async () => {
		const sharp: any = (await import('sharp')).default
		const raw = Buffer.alloc(1600 * 1600 * 3)
		for (let i = 0; i < raw.length; i++) raw[i] = (i * 2654435761) >>> 24 // noisy → big file
		const png = await sharp(raw, { raw: { width: 1600, height: 1600, channels: 3 } }).png().toBuffer()
		const { options } = makeOptions()
		const m = await prepareStickerPackMessage({ cover: WEBP, stickers: [{ data: png }] }, options)
		expect(Number(m.stickerPackSize)).toBeGreaterThan(1024 * 1024)
	}, 60000)

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
		const flat = await generateWAMessageContent({ cover: WEBP, stickers: [{ data: WEBP }], name: 'X' } as any, options)
		expect(flat.stickerPackMessage?.name).toBe('X')
		const nested = await generateWAMessageContent(
			{ stickerPack: { cover: WEBP, stickers: [{ data: WEBP }], name: 'Y' } } as any,
			options
		)
		expect(nested.stickerPackMessage?.name).toBe('Y')
	})

	it('isAnimatedWebP is false for a static webp / non-webp', () => {
		expect(isAnimatedWebP(WEBP)).toBe(false)
		expect(isAnimatedWebP(Buffer.from('nope'))).toBe(false)
	})
})
