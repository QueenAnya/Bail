import { generateWAMessageContent } from '../../Utils/messages'

// Regression test for a bug where generateWAMessageContent's catch-all
// (`else { m = await prepareWAMessageMedia(message, options) }`) fired for
// payloads whose only recognized keys live in the standalone
// sections/buttons/templateButtons/interactiveButtons/shop/collection/cards
// if-chain further down the function. Since that catch-all requires an
// image/video/audio/document/sticker key, any interactive-only payload with
// no top-level `text` key (e.g. `{ body, interactiveButtons }`) threw
// "Invalid media type" before the standalone chain ever ran.
const options = { logger: { child: () => options, warn: () => {}, error: () => {}, debug: () => {} } } as any

describe('generateWAMessageContent — interactive-only payloads', () => {
	it('buttons (with top-level text) does not throw', async () => {
		const m = await generateWAMessageContent(
			{
				text: 'Pick an option:',
				footer: 'Powered by @teamolduser/baileys',
				buttons: [
					{ buttonId: 'btn1', buttonText: { displayText: 'Option 1' }, type: 1 },
					{ buttonId: 'btn2', buttonText: { displayText: 'Option 2' }, type: 1 }
				]
			} as any,
			options
		)
		expect(m.buttonsMessage).toBeTruthy()
	})

	it('interactiveButtons with `body` (no top-level text) does not throw', async () => {
		const m = await generateWAMessageContent(
			{
				body: { text: 'Are you sure?' },
				footer: { text: 'Footer' },
				interactiveButtons: [
					{ text: 'Greeting', id: '#Greeting' },
					{ text: 'Copy Code', copy: '@teamolduser/baileys' },
					{ text: 'Source', url: 'https://github.com/Teamolduser/Baileys' }
				]
			} as any,
			options
		)
		expect(m.interactiveMessage).toBeTruthy()
	})

	it('sections (list) with top-level text does not throw', async () => {
		const m = await generateWAMessageContent(
			{
				title: 'Interactive Sections List',
				text: 'List body text',
				footer: 'Footer',
				buttonText: 'Open List Options',
				sections: [
					{
						title: 'Section 1',
						rows: [
							{ title: 'Row 1', rowId: 'r1', description: 'Description 1' },
							{ title: 'Row 2', rowId: 'r2', description: 'Description 2' }
						]
					}
				]
			} as any,
			options
		)
		expect(m.listMessage).toBeTruthy()
	})

	it('cards (carousel) with no media on cards and no top-level text does not throw', async () => {
		const m = await generateWAMessageContent(
			{
				footer: 'Footer',
				cards: [
					{
						caption: 'Slide 1',
						footer: 'Footer',
						nativeFlow: [{ text: 'Source', url: 'https://github.com/Teamolduser/Baileys', useWebview: true }]
					}
				]
			} as any,
			options
		)
		expect(m.interactiveMessage?.carouselMessage).toBeTruthy()
	})

	it('a genuinely unrecognized, non-interactive payload still throws Invalid media type', async () => {
		await expect(generateWAMessageContent({ someRandomField: 'nope' } as any, options)).rejects.toThrow(
			'Invalid media type'
		)
	})
})
