/**
 * Sticker Pack Test Suite
 *
 * Covers:
 *   - generateStickerPackId()
 *   - buildStickerPackProto()
 *   - StickerPackSticker type compat (.sticker vs .data field)
 *   - prepareStickerPackMessage() validation (via mocked messages.ts)
 *   - getMediaType() for stickerMessage
 *   - mediaCache hit/miss logic
 *   - sticker.data ?? sticker.sticker fallback
 */

import { buildStickerPackProto, generateStickerPackId, STICKER_PACK_MESSAGE_TYPE } from '../../addons/stickerpack'

// ─────────────────────────────────────────────────────────────────────────────
// Mocks — keep WAProto / sharp / p-queue out of the jest transform chain
// ─────────────────────────────────────────────────────────────────────────────

jest.mock('../../Utils/messages', () => {
	const { Boom } = require('@hapi/boom')
	const CONCURRENCY_LIMIT = 3

	const prepareStickerPackMessage = async (
		message: {
			cover?: unknown
			stickers?: unknown[]
			name?: string
			publisher?: string
			description?: string
		},
		options: {
			upload?: jest.Mock
			mediaCache?: { get: jest.Mock; set: jest.Mock }
			logger?: unknown
		}
	) => {
		const { cover, stickers = [], name = '📦 Sticker Pack', publisher = 'GitHub: itsliaaa', description = '🏷️ itsliaaa/baileys' } = message

		if (stickers.length > 60) throw new Boom('Sticker pack exceeds the maximum limit of 60 stickers', { statusCode: 400 })
		if (stickers.length === 0) throw new Boom('Sticker pack must contain at least one sticker', { statusCode: 400 })
		if (!cover) throw new Boom('Sticker pack must contain a cover', { statusCode: 400 })

		// Simulate cache hit
		if (options.mediaCache) {
			const urls: string[] = []
			for (const s of stickers as any[]) {
				const d = s.data ?? s.sticker
				if (typeof d === 'object' && d?.url) urls.push(d.url)
			}
			if (urls.length > 0) {
				const cacheKey = 'sticker:' + urls.join('@')
				const cached = await options.mediaCache.get(cacheKey)
				if (cached) {
					return { stickerPackMessage: { _fromCache: true, raw: cached } }
				}
			}
		}

		return {
			stickerPackMessage: {
				name,
				publisher,
				description,
				stickers: stickers.map((s: any, i: number) => ({
					fileName: `sticker_${i}.webp`,
					emojis: s.emojis ?? ['✨'],
					accessibilityLabel: s.accessibilityLabel ?? '‎'
				})),
				trayIconFileName: 'cover.webp'
			}
		}
	}

	return { prepareStickerPackMessage, CONCURRENCY_LIMIT }
})

const { prepareStickerPackMessage } = require('../../Utils/messages') as {
	prepareStickerPackMessage: (msg: any, opts: any) => Promise<any>
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. generateStickerPackId
// ─────────────────────────────────────────────────────────────────────────────

describe('generateStickerPackId', () => {
	it('returns a 16-char lowercase hex string', () => {
		const id = generateStickerPackId()
		expect(id).toMatch(/^[0-9a-f]{16}$/)
	})

	it('returns unique IDs on each call', () => {
		const ids = new Set(Array.from({ length: 100 }, () => generateStickerPackId()))
		expect(ids.size).toBe(100)
	})

	it('is exactly 16 chars', () => {
		expect(generateStickerPackId()).toHaveLength(16)
	})
})

// ─────────────────────────────────────────────────────────────────────────────
// 2. buildStickerPackProto
// ─────────────────────────────────────────────────────────────────────────────

describe('buildStickerPackProto', () => {
	it('returns correct name and publisher', () => {
		const result = buildStickerPackProto({ name: 'MyPack', publisher: 'Tester' })
		expect(result.name).toBe('MyPack')
		expect(result.publisher).toBe('Tester')
	})

	it('auto-generates packId if not provided', () => {
		const result = buildStickerPackProto({ name: 'Pack', publisher: 'Me' })
		expect(result.packId).toMatch(/^[0-9a-f]{16}$/)
	})

	it('uses provided packId', () => {
		const result = buildStickerPackProto({ name: 'Pack', publisher: 'Me', packId: 'abc123' })
		expect(result.packId).toBe('abc123')
	})

	it('defaults description to empty string', () => {
		const result = buildStickerPackProto({ name: 'Pack', publisher: 'Me' })
		expect(result.description).toBe('')
	})

	it('uses provided description', () => {
		const result = buildStickerPackProto({ name: 'Pack', publisher: 'Me', description: 'Cool stickers' })
		expect(result.description).toBe('Cool stickers')
	})

//	it('two builds with same input have different auto-generated packIds', () => {
	//	const a = buildStickerPackProto(name: 'P
		