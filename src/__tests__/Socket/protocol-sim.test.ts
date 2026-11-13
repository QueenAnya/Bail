import { afterAll, describe, expect, it } from '@jest/globals'
import { proto } from '../../../WAProto/index.js'
import { unpadRandomMax16 } from '../../Utils/generics'
import { closeSim, fakeServer, makeSim, messageNodes } from '../TestUtils/protocol-sim'

const PEER = '5551234567@s.whatsapp.net'
const GROUP = '120363000000000001@g.us'
const key = { remoteJid: PEER, id: 'ABC', fromMe: false }

const encAttrs = (node: any): Array<Record<string, string>> => [
	...(node.tag === 'enc' ? [node.attrs] : []),
	...(Array.isArray(node.content) ? node.content.flatMap(encAttrs) : [])
]
const meta = (node: any) => (Array.isArray(node.content) ? node.content.find((c: any) => c.tag === 'meta') : undefined)

describe('stanzas sent by a real socket against a fake server', () => {
	afterAll(async () => {
		await closeSim()
	}, 20000)

	it('adds <meta content_type="add_on"> and decrypt-fail=hide to reactions, pins and keeps, and polltype=vote to votes', async () => {
		const { sock, sent, stop } = await makeSim({ onNode: fakeServer() })
		const lastMessage = () => messageNodes(sent).pop()!

		await sock.sendMessage(PEER, { react: { text: '👍', key } })
		expect(meta(lastMessage()).attrs).toEqual({ content_type: 'add_on' })
		expect(encAttrs(lastMessage()).every(a => a['decrypt-fail'] === 'hide')).toBe(true)

		await sock.sendMessage(PEER, { pin: key, type: 1, time: 86400 })
		expect(meta(lastMessage()).attrs).toEqual({ content_type: 'add_on' })

		await sock.sendMessage(PEER, { keep: key, type: 1 })
		expect(meta(lastMessage()).attrs).toEqual({ content_type: 'add_on' })

		await sock.relayMessage(
			PEER,
			{
				pollUpdateMessage: {
					pollCreationMessageKey: key,
					vote: { encPayload: Buffer.alloc(16), encIv: Buffer.alloc(12) },
					senderTimestampMs: Date.now()
				}
			},
			{ messageId: 'VOTE1' }
		)
		expect(meta(lastMessage()).attrs).toEqual({ polltype: 'vote' })

		// a plain text message carries neither
		await sock.sendMessage(PEER, { text: 'hi' })
		expect(meta(lastMessage())).toBeUndefined()
		expect(encAttrs(lastMessage()).some(a => 'decrypt-fail' in a)).toBe(false)
		await stop()
	}, 60000)

	it.each([
		['inlineSenderKeyDistribution on (default)', {}, true],
		['inlineSenderKeyDistribution: false', { inlineSenderKeyDistribution: false }, false]
	])(
		'group message: %s',
		async (_label, config, inlined) => {
			const { sock, sent, stop } = await makeSim({
				onNode: fakeServer([], { [GROUP]: ['911234567890@s.whatsapp.net', PEER] }),
				config
			})
			const plaintexts: proto.IMessage[] = []
			const original = sock.signalRepository.encryptGroupMessage.bind(sock.signalRepository)
			sock.signalRepository.encryptGroupMessage = async (args: any) => {
				plaintexts.push(proto.Message.decode(unpadRandomMax16(args.data)))
				return original(args)
			}

			await sock.sendMessage(GROUP, { text: 'one' })
			// the first send has no sender key yet: it is distributed pairwise (pkmsg) next to the skmsg
			expect(plaintexts[0]!.senderKeyDistributionMessage).toBeFalsy()
			expect(encAttrs(messageNodes(sent).pop()).map(a => a.type)).toContain('pkmsg')

			sent.length = 0
			await sock.sendMessage(GROUP, { text: 'two' })
			expect(!!plaintexts[1]!.senderKeyDistributionMessage).toBe(inlined)
			expect(encAttrs(messageNodes(sent).pop()).map(a => a.type)).toEqual(['skmsg'])
			await stop()
		},
		60000
	)

	it.each([
		[2, 2],
		[64, 8]
	])(
		'maxRetryQueueSize %i: a flood of 8 undecryptable messages gets %i retry receipts',
		async (cap, expectedRetries) => {
			const { sock, sent, stop } = await makeSim({ onNode: fakeServer(), config: { maxRetryQueueSize: cap } })
			for (let i = 0; i < 8; i++) {
				sock.ws.emit('CB:message', {
					tag: 'message',
					attrs: { from: PEER, id: `INC${i}`, t: String(Math.floor(Date.now() / 1000)), type: 'text', notify: 'Peer' },
					content: [{ tag: 'enc', attrs: { v: '2', type: 'msg' }, content: Buffer.from(`3308garbagegarbage${i}`) }]
				})
			}

			await new Promise(resolve => setTimeout(resolve, 3000))
			expect(sent.filter(n => n.tag === 'receipt' && n.attrs.type === 'retry')).toHaveLength(expectedRetries)
			// every message is acked either way
			expect(sent.filter(n => n.tag === 'ack')).toHaveLength(8)
			await stop()
		},
		60000
	)
	it('newsletter stanza attributes: sticker kinds, link kinds, question and poll result meta', async () => {
		const { sock, sent, stop } = await makeSim({ onNode: fakeServer() })
		const NL = '120363000000000000@newsletter'
		const plaintext = (node: any) => node.content.find((c: any) => c.tag === 'plaintext')
		const relay = async (content: proto.IMessage) => {
			sent.length = 0
			await sock.relayMessage(NL, content, {})
			return messageNodes(sent).pop()!
		}

		expect(
			plaintext(await relay({ stickerMessage: { isLottie: true, url: 'u', mimetype: 'image/webp' } })).attrs.mediatype
		).toBe('1p_sticker')
		expect(
			plaintext(await relay({ stickerMessage: { isAvatar: true, url: 'u', mimetype: 'image/webp' } })).attrs.mediatype
		).toBe('avatar_sticker')
		expect(plaintext(await relay({ stickerMessage: { url: 'u', mimetype: 'image/webp' } })).attrs.mediatype).toBe(
			'sticker'
		)
		expect(plaintext(await relay({ extendedTextMessage: { text: 'see https://wa.me/c/123' } })).attrs.mediatype).toBe(
			'cataloglink'
		)
		expect(plaintext(await relay({ conversation: 'https://wa.me/p/55/123' })).attrs.mediatype).toBe('productlink')
		expect(
			plaintext(await relay({ extendedTextMessage: { text: 'x', matchedText: 'https://a.b' } })).attrs.mediatype
		).toBe('url')
		expect(plaintext(await relay({ conversation: 'hi' })).attrs.mediatype).toBeUndefined()

		expect(meta(await relay({ questionMessage: { message: { conversation: 'q?' } } } as any)).attrs).toEqual({
			questiontype: 'question'
		})
		expect(meta(await relay({ questionReplyMessage: { message: { conversation: 'r' } } } as any)).attrs).toEqual({
			questiontype: 'reply'
		})

		sent.length = 0
		await sock.sendMessage(NL, {
			pollResult: {
				name: 'Fav?',
				votes: [
					{ name: 'A', voteCount: 3 },
					{ name: 'B', voteCount: 1 }
				]
			}
		})
		expect(meta(messageNodes(sent).pop()).attrs).toEqual({ polltype: 'result_snapshot' })
		await stop()
	}, 60000)
})
