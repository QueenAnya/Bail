import {
	buildStickerPackProto,
	generateStickerPackId,
	prepareStickerPackMessage,
	STICKER_PACK_MESSAGE_TYPE,
	type StickerPackInput,
	type StickerPackOptions
} from '../../addons/stickerpack'

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

	it('rejects a pack with more than 60 stickers', async () => {
		const input: StickerPackInput = {
			cover: Buffer.from('cover'),
			stickers: Array.from({ length: 61 }, () => ({ data: Buffer.from('x') }))
		}

		await expect(prepareStickerPackMessage(input, baseOptions)).rejects.toThrow(
			'Sticker pack exceeds the maximum limit of 60 stickers'
		)
	})
})
