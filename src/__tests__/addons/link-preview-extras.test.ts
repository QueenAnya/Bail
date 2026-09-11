import { jest } from '@jest/globals'
import { applyLinkPreviewMetadata, buildFaviconMMSMetadata } from '../../addons/link-preview-extras'
import type { WATextMessage, WAUrlInfo } from '../../Types'

describe('applyLinkPreviewMetadata', () => {
	it('copies linkPreviewMetadata onto the extended-text content when present', () => {
		const extContent = { text: 'hi' } as WATextMessage
		const urlInfo = {
			'canonical-url': 'https://example.com',
			'matched-text': 'https://example.com',
			title: 'Example',
			linkPreviewMetadata: { socialMediaPostType: 1 }
		} as WAUrlInfo

		applyLinkPreviewMetadata(extContent, urlInfo)

		expect(extContent.linkPreviewMetadata).toEqual({ socialMediaPostType: 1 })
	})

	it('is a no-op when urlInfo has no linkPreviewMetadata', () => {
		const extContent = { text: 'hi' } as WATextMessage
		const urlInfo = {
			'canonical-url': 'https://example.com',
			'matched-text': 'https://example.com',
			title: 'Example'
		} as WAUrlInfo

		applyLinkPreviewMetadata(extContent, urlInfo)

		expect(extContent.linkPreviewMetadata).toBeUndefined()
	})

	it('is a no-op when urlInfo itself is undefined', () => {
		const extContent = { text: 'hi' } as WATextMessage

		applyLinkPreviewMetadata(extContent, undefined)

		expect(extContent.linkPreviewMetadata).toBeUndefined()
	})
})

describe('buildFaviconMMSMetadata', () => {
	it('returns undefined when no favicon is supplied', async () => {
		const prepareMedia = jest.fn() as any

		const result = await buildFaviconMMSMetadata(undefined, {} as any, prepareMedia)

		expect(result).toBeUndefined()
		expect(prepareMedia).not.toHaveBeenCalled()
	})

	it('uploads the favicon as thumbnail-link media and maps the result', async () => {
		const prepareMedia = (jest.fn() as any).mockResolvedValue({
			imageMessage: {
				directPath: '/favicon/path',
				mediaKey: new Uint8Array([1]),
				mediaKeyTimestamp: 123,
				width: 32,
				height: 32,
				fileSha256: new Uint8Array([2]),
				fileEncSha256: new Uint8Array([3])
			}
		})

		const result = await buildFaviconMMSMetadata({ url: './favicon.png' }, {} as any, prepareMedia)

		expect(prepareMedia).toHaveBeenCalledWith(
			{ image: { url: './favicon.png' } },
			expect.objectContaining({ mediaTypeOverride: 'thumbnail-link' })
		)
		expect(result).toEqual({
			thumbnailDirectPath: '/favicon/path',
			mediaKey: new Uint8Array([1]),
			mediaKeyTimestamp: 123,
			thumbnailWidth: 32,
			thumbnailHeight: 32,
			thumbnailSha256: new Uint8Array([2]),
			thumbnailEncSha256: new Uint8Array([3])
		})
	})

	it('returns undefined when the media upload yields no imageMessage', async () => {
		const prepareMedia = (jest.fn() as any).mockResolvedValue({})

		const result = await buildFaviconMMSMetadata({ url: './favicon.png' }, {} as any, prepareMedia)

		expect(result).toBeUndefined()
	})
})
