import { describe, expect, it, jest } from '@jest/globals'
import { promises as fs } from 'fs'
import sharp from 'sharp'
import {
	isAnimatedWebP,
	isLottieBuffer,
	resolveStickerPackConcurrency,
	resolveStickerPackMaxSize,
	resolveStickerQuality
} from '../../addons/from-messages'
import {
	buildStickerPackProto,
	generateStickerPackId,
	prepareStickerPackMessage,
	STICKER_PACK_MESSAGE_TYPE,
	type StickerPackInput,
	type StickerPackOptions
} from '../../addons/stickerpack'
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
		await expect(prepareStickerPackMessage({ cover: WEBP, stickers: [{}] } as any, options)).rejects.toThrow(
			'missing media'
		)
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
		const raw = Buffer.alloc(1600 * 1600 * 3)
		let seed = 0x9e3779b9
		for (let i = 0; i < raw.length; i++) {
			seed ^= seed << 13
			seed ^= seed >>> 17
			seed ^= seed << 5
			raw[i] = seed & 0xff // xorshift32 → real pseudo-random noise (incompressible, big file)
		}

		const png = await sharp(raw, { raw: { width: 1600, height: 1600, channels: 3 } })
			.png()
			.toBuffer()
		const { options } = makeOptions()
		const m = await prepareStickerPackMessage({ cover: WEBP, stickers: [{ data: png }] }, options)
		expect(Number(m.stickerPackSize)).toBeGreaterThan(1024 * 1024)
	}, 60000)

	it('maxSize / quality shrink converted stickers (default stays original size + quality)', async () => {
		const raw = Buffer.alloc(1200 * 1200 * 3)
		let seed = 0x9e3779b9
		for (let i = 0; i < raw.length; i++) {
			seed ^= seed << 13
			seed ^= seed >>> 17
			seed ^= seed << 5
			raw[i] = seed & 0xff // xorshift32 → real pseudo-random noise (incompressible, big file)
		}

		const png = await sharp(raw, { raw: { width: 1200, height: 1200, channels: 3 } })
			.png()
			.toBuffer()
		const size = async (extra: Record<string, unknown>) => {
			const { options } = makeOptions()
			const m = await prepareStickerPackMessage({ cover: WEBP, stickers: [{ data: png }], ...extra }, options)
			return Number(m.stickerPackSize)
		}

		const original = await size({})
		expect(await size({ maxSize: false })).toBe(original)
		expect(await size({ quality: 'original' })).toBe(original)
		expect(await size({ maxSize: 256 })).toBeLessThan(original)
		expect(await size({ quality: 20 })).toBeLessThan(original)
	}, 60000)

	it('detects Lottie automatically and flags it', async () => {
		const { options } = makeOptions()
		const lottie = Buffer.from(JSON.stringify({ v: '5.5.7', fr: 30, ip: 0, op: 60, w: 512, h: 512, layers: [] }))
		expect(isLottieBuffer(lottie)).toBe(true)
		const msg = await prepareStickerPackMessage({ cover: WEBP, stickers: [{ data: lottie }] }, options)
		expect(msg.stickers![0]!.isLottie).toBe(true)
		expect(msg.stickers![0]!.isAnimated).toBe(true)
		expect(msg.stickers![0]!.mimetype).toBe('application/was')
		expect(msg.stickers![0]!.fileName!.endsWith('.was')).toBe(true)
	})

	it('explicit isAnimated / isLottie override the auto detection', async () => {
		const { options } = makeOptions()
		const msg = await prepareStickerPackMessage(
			{
				cover: WEBP,
				stickers: [
					{ data: WEBP, isAnimated: true },
					{ sticker: WEBP, isAnimated: false, isLottie: false }
				]
			},
			options
		)
		expect(msg.stickers![0]!.isAnimated).toBe(true)
		expect(msg.stickers![1]!.isAnimated).toBe(false)
		expect(msg.stickers![1]!.isLottie).toBe(false)
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

describe('generateStickerPackId', () => {
	it('returns a 16-character lowercase hex string', () => {
		const id = generateStickerPackId()
		expect(id).toHaveLength(16)
		expect(id).toMatch(/^[0-9a-f]{16}$/)
	})

	it('is different on every call', () => {
		const ids = new Set(Array.from({ length: 20 }, () => generateStickerPackId()))
		expect(ids.size).toBe(20)
	})
})

describe('buildStickerPackProto', () => {
	it('generates a packId and empty description when not given', () => {
		const result = buildStickerPackProto({ name: 'My Pack', publisher: 'Me' })

		expect(result.name).toBe('My Pack')
		expect(result.publisher).toBe('Me')
		expect(result.packId).toMatch(/^[0-9a-f]{16}$/)
		expect(result.description).toBe('')
	})

	it('preserves an explicit packId and description instead of generating one', () => {
		const result = buildStickerPackProto({
			name: 'My Pack',
			publisher: 'Me',
			packId: 'fixed-id-123',
			description: 'A pack of stickers'
		})

		expect(result.packId).toBe('fixed-id-123')
		expect(result.description).toBe('A pack of stickers')
	})
})

describe('STICKER_PACK_MESSAGE_TYPE', () => {
	it('is the expected message type marker', () => {
		expect(STICKER_PACK_MESSAGE_TYPE).toBe('sticker_pack')
	})
})

describe('prepareStickerPackMessage validation', () => {
	const baseOptions: StickerPackOptions = {
		upload: async () => ({ directPath: '/mock/path' })
	}

	it('rejects a pack with no cover', async () => {
		const input = { cover: undefined, stickers: [{ data: Buffer.from('x') }] } as unknown as StickerPackInput

		await expect(prepareStickerPackMessage(input, baseOptions)).rejects.toThrow('Sticker pack must contain a cover')
	})

	it('rejects a pack with zero stickers', async () => {
		const input: StickerPackInput = { cover: Buffer.from('cover'), stickers: [] }

		await expect(prepareStickerPackMessage(input, baseOptions)).rejects.toThrow(
			'Sticker pack must contain at least one sticker'
		)
	})

	it('accepts a pack with more than 60 stickers (no count limit)', async () => {
		const png = await sharp({
			create: { width: 16, height: 16, channels: 3, background: { r: 0, g: 128, b: 255 } }
		})
			.png()
			.toBuffer()
		const input: StickerPackInput = {
			cover: png,
			stickers: Array.from({ length: 61 }, () => ({ data: png })),
			concurrency: 10
		}

		const result = await prepareStickerPackMessage(input, baseOptions)

		expect(result.stickers).toHaveLength(61)
	}, 30000)
})

describe('resolveStickerPackConcurrency / resolveStickerPackMaxSize', () => {
	it('concurrency: default 15, rounded down, never below 1', () => {
		expect(resolveStickerPackConcurrency()).toBe(15)
		expect(resolveStickerPackConcurrency(Number.NaN)).toBe(15)
		expect(resolveStickerPackConcurrency(10.9)).toBe(10)
		expect(resolveStickerPackConcurrency(0)).toBe(1)
	})

	it("quality: 'original' (default) = lossless, numbers are clamped to 1-100", () => {
		expect(resolveStickerQuality()).toBeUndefined()
		expect(resolveStickerQuality('original')).toBeUndefined()
		expect(resolveStickerQuality(80)).toBe(80)
		expect(resolveStickerQuality(500)).toBe(100)
		expect(resolveStickerQuality(-3)).toBe(1)
	})

	it('maxSize: no cap by default (original size), numbers >= 1 are kept', () => {
		expect(resolveStickerPackMaxSize()).toBeUndefined()
		expect(resolveStickerPackMaxSize(false)).toBeUndefined()
		expect(resolveStickerPackMaxSize(512)).toBe(512)
	})
})
