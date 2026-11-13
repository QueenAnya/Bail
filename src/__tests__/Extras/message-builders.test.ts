import { proto } from '../../../WAProto/index.js'
import {
	buildMusicMessage,
	buildPaymentReminder,
	buildScheduledMsgMetaNode,
	buildSplitPayment,
	buildSplitPaymentUpdate,
	buildUnscheduleProtocolMessage,
	channelSticker,
	decodeScheduledMessage,
	encodeScheduledMessage,
	isScheduledTimeValid,
	linkSticker,
	locationSticker,
	makeCommentMessage,
	makeEventInviteMessage,
	makePollAddOptionMessage,
	money,
	normalizeStickers,
	prepareModernMessageContent,
	preparePortedMessageContent,
	readMusicMessage,
	readPaymentReminder,
	readSplitPayment,
	readStickers,
	stickerArea
} from '../../Extras'
import { generateWAMessage } from '../../Utils/messages'

const key = { remoteJid: '1@s.whatsapp.net', id: 'ABC', fromMe: false }
const upload = async () => ({ mediaUrl: 'https://mmg.whatsapp.net/x', directPath: '/v/x' }) as any
const gen = (content: any) =>
	generateWAMessage('1@s.whatsapp.net', preparePortedMessageContent(content), {
		userJid: '2@s.whatsapp.net',
		upload
	})

describe('payment messages (currency is required, as in Elaina)', () => {
	it('money scales by the offset and validates its input', () => {
		expect(money(500, 'INR')).toEqual({ value: 500000, offset: 1000, currencyCode: 'INR' })
		expect(money('12.5', 'usd')).toEqual({ value: 12500, offset: 1000, currencyCode: 'USD' })
		expect(() => money(-1, 'INR')).toThrow('non-negative')
		expect(() => money(1, 'RUPEE')).toThrow('three letter')
		expect(() => (money as any)(500)).toThrow('three letter')
	})

	it('buildSplitPayment / readSplitPayment round-trip through the proto', async () => {
		const split = buildSplitPayment({
			splitId: 's1',
			total: 900,
			currency: 'INR',
			description: 'dinner',
			participants: [
				{ jid: 'a@s.whatsapp.net', amount: 300 },
				{ jid: 'b@s.whatsapp.net', amount: 600, status: 1 }
			]
		})
		expect(split.totalAmount).toEqual({ value: 900000, offset: 1000, currencyCode: 'INR' })

		const msg: any = await gen({
			splitPayment: {
				splitId: 's1',
				total: 900,
				currency: 'INR',
				participants: [{ jid: 'a@s.whatsapp.net', amount: 300 }]
			}
		})
		const decoded = proto.Message.decode(proto.Message.encode(msg.message).finish()).toJSON()
		const read = readSplitPayment(decoded)!
		expect(read.splitId).toBe('s1')
		expect(read.total).toEqual({ amount: 900, currencyCode: 'INR' })
		expect((read.participants as any[])[0].amount).toEqual({ amount: 300, currencyCode: 'INR' })
		expect(() => buildSplitPayment({ splitId: 'x', participants: [] })).toThrow('at least one participant')
		expect(buildSplitPaymentUpdate({ splitId: 's1', participantJid: 'a@s.whatsapp.net' })).toEqual({
			splitId: 's1',
			participantJid: 'a@s.whatsapp.net'
		})
	})

	it('paymentReminder goes through sendMessage content and reads back', async () => {
		const reminder = buildPaymentReminder({ reminderId: 'r1', amount: 99, currency: 'INR' })
		expect((reminder.amount as any).currencyCode).toBe('INR')
		const msg: any = await gen({
			paymentReminder: { reminderId: 'r1', amount: 99, currency: 'INR', payeeVpa: 'a@upi' }
		})
		const read = readPaymentReminder(msg.message)!
		expect(read.reminderId).toBe('r1')
		expect(read.payeeVpa).toBe('a@upi')
		expect((read.amount as any).currencyCode).toBe('INR')
	})
})

describe('scheduled message helpers', () => {
	it('encrypts with a reveal key and decrypts the same message back', () => {
		const enc = encodeScheduledMessage({ conversation: 'hello later' })
		expect(enc.message.conditionalRevealMessage.conditionalRevealMessageType).toBe(1)
		const inner = decodeScheduledMessage(enc.message, enc.revealKey)
		expect(inner.conversation).toBe('hello later')
		expect(() => decodeScheduledMessage(enc.message, Buffer.alloc(32, 7))).toThrow()
	})

	it('builds the meta node, the unschedule message and checks the time window', () => {
		const enc = encodeScheduledMessage({ conversation: 'x' })
		const meta = buildScheduledMsgMetaNode({
			scheduledTimestampS: 1900000000.9,
			revealKeyId: enc.revealKeyId,
			revealKey: enc.revealKey
		})
		expect(meta.attrs).toEqual({ type: 'scheduled_message', st: '1900000000' })
		expect((meta.content as any)[0].attrs.rkid).toBe(enc.revealKeyId)
		expect(() => buildScheduledMsgMetaNode({ scheduledTimestampS: 1, revealKeyId: 'k' })).toThrow('reveal key')
		expect(buildUnscheduleProtocolMessage(key).protocolMessage.type).toBe(32)

		const now = 1_800_000_000
		expect(isScheduledTimeValid(now + 1200, now)).toBe(true)
		expect(isScheduledTimeValid(now + 60, now)).toBe(false)
		expect(isScheduledTimeValid(now + 99 * 86400, now)).toBe(false)
	})
})

describe('status stickers and music', () => {
	it('validates sticker areas and rejects stickers with several actions', () => {
		expect(stickerArea({ x: 0.25, y: 0.25, width: 0.5, height: 0.25 })).toEqual([
			{ x: 0.25, y: 0.25 },
			{ x: 0.75, y: 0.25 },
			{ x: 0.75, y: 0.5 },
			{ x: 0.25, y: 0.5 }
		])
		expect(() => stickerArea({ x: 0.8, y: 0.1, width: 0.5, height: 0.2 })).toThrow('between 0 and 1')
		expect(() => locationSticker({ latitude: NaN, longitude: 1 })).toThrow('numeric')
		expect(() => channelSticker({ jid: '1@s.whatsapp.net' })).toThrow('@newsletter')
		expect(() => linkSticker({})).toThrow('url')
		const both = { ...locationSticker({ latitude: 1, longitude: 2 }), tapAction: { tapUrl: 'https://x.y' } }
		expect(() => normalizeStickers([both])).toThrow('only one action')
	})

	it('normalizeStickers builds InteractiveAnnotations and readStickers classifies them', () => {
		const list = normalizeStickers([
			locationSticker({ latitude: 24.1, longitude: 55.1, name: 'Dubai' }),
			channelSticker({ jid: '1@newsletter', name: 'Chan' }),
			linkSticker({ url: 'https://example.com', title: 'Site' })
		])
		expect(list).toHaveLength(3)
		const kinds = readStickers({ imageMessage: { interactiveAnnotations: list } }).map(s => s.kind)
		expect(kinds).toEqual(['location', 'channel', 'link'])
	})

	it('music messages only accept WhatsApp / Meta hosted uris and read back', async () => {
		expect(() => buildMusicMessage({ songId: '1', songUri: 'https://evil.example.com/a.mp3' })).toThrow('hosted on')
		expect(() => buildMusicMessage({})).toThrow('songId')
		const msg: any = await gen({
			music: { songId: '77', title: 'Song', author: 'Me', songUri: 'https://cdn.whatsapp.net/a.mp4' }
		})
		const read = readMusicMessage(msg.message)!
		expect(read.songId).toBe('77')
		expect(read.title).toBe('Song')
		expect(read.songUri).toBe('https://cdn.whatsapp.net/a.mp4')
	})
})

describe('modern message content keys', () => {
	it('passes ordinary content through untouched', () => {
		const content = { text: 'hello', mentions: ['1@s.whatsapp.net'] }
		expect(prepareModernMessageContent(content)).toEqual(content)
		expect(prepareModernMessageContent(null)).toBeNull()
	})

	it('question / questionResponse / comment / statusMention become raw proto content', async () => {
		const q: any = await gen({ question: { text: 'Favourite colour?' } })
		expect(q.message.questionMessage.message.extendedTextMessage.text).toBe('Favourite colour?')
		expect(q.message.questionMessage.message.extendedTextMessage.contextInfo.isQuestion).toBe(true)

		const r: any = await gen({ questionResponse: { key, text: 'blue' } })
		expect(r.message.questionResponseMessage.text).toBe('blue')

		const c: any = await gen({ comment: { targetMessageKey: key, content: { text: 'nice' } } })
		expect(c.message.commentMessage.message.extendedTextMessage.text).toBe('nice')
		expect(c.message.commentMessage.targetMessageKey.id).toBe('ABC')

		const s: any = await gen({ statusMention: { key } })
		expect(s.message.statusMentionMessage.message.protocolMessage.type).toBe(
			proto.Message.ProtocolMessage.Type.STATUS_MENTION_MESSAGE
		)
		const g: any = await gen({ statusMention: { key, group: true } })
		expect(g.message.groupStatusMentionMessage).toBeDefined()
	})

	it('validates its input', () => {
		expect(() => prepareModernMessageContent({ question: {} })).toThrow('question.text')
		expect(() => prepareModernMessageContent({ questionResponse: { key: {} } })).toThrow('key.id')
		expect(() => prepareModernMessageContent({ comment: { targetMessageKey: key } })).toThrow('comment.message')
	})

	it('pollAddOption and eventInvite build from the flat WAProto classes', () => {
		expect(
			makePollAddOptionMessage({ pollCreationMessageKey: key, option: 'x' }).pollAddOptionMessage.addOption?.optionName
		).toBe('x')
		expect(makeEventInviteMessage({ eventId: 'e1' }).eventInviteMessage.eventId).toBe('e1')
		expect(() => makePollAddOptionMessage({ pollCreationMessageKey: key })).toThrow('pollAddOption.option is required')
	})

	it('addYours sets the message association on any content (core hook) and statusAudience goes into contextInfo', async () => {
		const m: any = await gen({ text: 'my turn', addYours: key })
		expect(m.message.messageContextInfo.messageAssociation.associationType).toBe(
			proto.MessageAssociation.AssociationType.STATUS_ADD_YOURS
		)
		expect(m.message.messageContextInfo.messageAssociation.parentMessageKey.id).toBe('ABC')

		const a: any = await gen({ text: 'close friends only', statusAudience: 'My list' })
		expect(a.message.extendedTextMessage.contextInfo.statusAudienceMetadata.listName).toBe('My list')
	})

	it('newsletterStatus decorates content with the channel-reshare attribution (type 9)', async () => {
		const m: any = await gen({ text: 'reshared', newsletterStatus: { newsletterJid: '1@newsletter', messageId: 123 } })
		const attribution = m.message.extendedTextMessage.contextInfo.statusAttributions[0]
		expect(attribution.type).toBe(9)
		expect(Number(attribution.statusReshare.metadata.channelMessageId)).toBe(123)
	})

	it('refuses to combine addYours / statusAudience with a builder that makes its own message', () => {
		expect(() => prepareModernMessageContent({ question: { text: 'q' }, addYours: key })).toThrow('cannot be combined')
	})

	it('makeCommentMessage rejects a missing target', () => {
		expect(() => makeCommentMessage({ message: {} })).toThrow('targetMessageKey')
	})
})

// Regression: Elaina-compatible static helpers must be available on all builders.
describe('MessageBuilder static helper compatibility', () => {
	it('attaches mapSection to MB and each builder', async () => {
		const { MB, MessageBuilder, Button, ButtonV2, AIRichCarousel, AIRich, Toolkit } =
			await import('../../Extras/MessageBuilder')
		const { mapSection } = await import('../../Extras/MessageBuilder/metaai')
		expect(MB).toBe(MessageBuilder)
		for (const target of [MB, Button, ButtonV2, AIRichCarousel, AIRich, Toolkit]) {
			expect((target as any).mapSection).toBe(mapSection)
		}
	})
})

// Regression: button label aliases (text / displayText / displaytext / buttonText.displayText) must reach the serialized button.
describe('MessageBuilder button display text', () => {
	it('Button.addButton fills display_text from label aliases and keeps other payloads unchanged', async () => {
		const { Button } = await import('../../Extras/MessageBuilder')
		const btn: any = new Button({})
		const serialized = JSON.stringify({ display_text: 'Keep', id: '3' })
		btn.addButton('quick_reply', { text: 'Hi', id: '1' })
		btn.addButton('quick_reply', { buttonText: { displayText: 'Yo' }, id: '2' })
		btn.addButton('quick_reply', serialized)
		btn.addButton('custom', ['a', 'b'])
		const [a, b, c, d] = btn._buttons
		expect(JSON.parse(a.buttonParamsJson).display_text).toBe('Hi')
		expect(JSON.parse(b.buttonParamsJson).display_text).toBe('Yo')
		expect(c.buttonParamsJson).toBe(serialized)
		expect(JSON.parse(d.buttonParamsJson)).toEqual(['a', 'b'])
	})

	it('ButtonV2.addRawButton normalizes label aliases and keeps serialized buttons byte-for-byte', async () => {
		const { ButtonV2 } = await import('../../Extras/MessageBuilder')
		const btn: any = new ButtonV2({})
		const serialized = { name: 'quick_reply', buttonParamsJson: '{"display_text":"A"}' }
		btn.addRawButton(serialized)
		btn.addRawButton({ name: 'quick_reply', buttonParamsJson: { id: '1' }, text: 'B' })
		btn.addRawButton({ buttonId: 'x', displayText: 'C', type: 1 })
		btn.addRawButton({ buttonId: 'y', buttonText: { displayText: 'D' }, type: 1 })
		const [s, o, l1, l2] = btn._buttons
		expect(s).toBe(serialized)
		expect(JSON.parse(o.buttonParamsJson).display_text).toBe('B')
		expect(l1.buttonText).toEqual({ displayText: 'C' })
		expect(l2.buttonText).toEqual({ displayText: 'D' })
	})
})
