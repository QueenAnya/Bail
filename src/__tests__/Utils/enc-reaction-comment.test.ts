import { jest } from '@jest/globals'
import { randomBytes } from 'crypto'
import { proto } from '../../../WAProto/index.js'
import type { WAMessage } from '../../Types'
import { aesEncryptGCM, hmacSign } from '../../Utils/crypto'
import processMessage, { decryptComment, decryptReaction } from '../../Utils/process-message'

const encrypt = (
	plaintext: Uint8Array,
	encKey: Uint8Array,
	msgId: string,
	creatorJid: string,
	actorJid: string,
	useCase: string
) => {
	const sign = Buffer.concat([
		Buffer.from(msgId),
		Buffer.from(creatorJid),
		Buffer.from(actorJid),
		Buffer.from(useCase),
		new Uint8Array([1])
	])
	const key0 = hmacSign(encKey, new Uint8Array(32), 'sha256')
	const decKey = hmacSign(sign, key0, 'sha256')
	const encIv = randomBytes(12)
	const encPayload = aesEncryptGCM(plaintext, decKey, encIv, Buffer.alloc(0))
	return { encPayload, encIv }
}

const CREATOR = '111@lid'
const ACTOR = '222@lid'
const GROUP = '999-1@g.us'
const MSG_ID = 'TARGET_MSG'

const setup = (secret: Uint8Array | undefined = randomBytes(32)) => {
	const events: Array<[string, unknown]> = []
	const ev = { emit: jest.fn((name: string, data: unknown) => void events.push([name, data])) }
	const target = { messageContextInfo: secret ? { messageSecret: secret } : undefined, conversation: 'orig' }
	const getMessage = jest.fn(async () => target as proto.IMessage)
	const ctx: any = {
		shouldProcessHistoryMsg: false,
		creds: { me: { id: '333:1@s.whatsapp.net', lid: '333:1@lid' } },
		keyStore: {},
		ev,
		logger: { warn: jest.fn(), info: jest.fn(), debug: jest.fn(), error: jest.fn(), trace: jest.fn() },
		options: {},
		signalRepository: {
			lidMapping: {
				getPNForLID: jest.fn(async (lid: string) => `${lid.split('@')[0]}@s.whatsapp.net`),
				getLIDForPN: jest.fn(async () => null),
				storeLIDPNMappings: jest.fn(async () => undefined)
			}
		},
		getMessage
	}
	return { ctx, events, secret, getMessage }
}

const wrap = (content: proto.IMessage): WAMessage => ({
	key: { remoteJid: GROUP, participant: ACTOR, fromMe: false, id: 'ENC_MSG' },
	message: content,
	messageTimestamp: 1700000000
})

const targetKey = { remoteJid: GROUP, participant: CREATOR, fromMe: false, id: MSG_ID }

describe('decryptReaction / decryptComment', () => {
	it('round-trips a reaction', () => {
		const secret = randomBytes(32)
		const plain = proto.Message.ReactionMessage.encode({ text: '🔥', senderTimestampMs: 5 }).finish()
		const enc = encrypt(plain, secret, MSG_ID, CREATOR, ACTOR, 'Enc Reaction')
		const out = decryptReaction(enc, { creatorJid: CREATOR, actorJid: ACTOR, encKey: secret, msgId: MSG_ID })
		expect(out.text).toBe('🔥')
	})

	it('round-trips a comment', () => {
		const secret = randomBytes(32)
		const plain = proto.Message.encode({ conversation: 'nice' }).finish()
		const enc = encrypt(plain, secret, MSG_ID, CREATOR, ACTOR, 'Enc Comment')
		const out = decryptComment(enc, { creatorJid: CREATOR, actorJid: ACTOR, encKey: secret, msgId: MSG_ID })
		expect(out.conversation).toBe('nice')
	})

	it('rejects a wrong key / wrong use-case label', () => {
		const secret = randomBytes(32)
		const plain = proto.Message.ReactionMessage.encode({ text: 'x' }).finish()
		const enc = encrypt(plain, secret, MSG_ID, CREATOR, ACTOR, 'Enc Reaction')
		expect(() =>
			decryptReaction(enc, { creatorJid: CREATOR, actorJid: ACTOR, encKey: randomBytes(32), msgId: MSG_ID })
		).toThrow()
		expect(() => decryptComment(enc, { creatorJid: CREATOR, actorJid: ACTOR, encKey: secret, msgId: MSG_ID })).toThrow()
	})
})

describe('processMessage: encReactionMessage / encCommentMessage', () => {
	it('emits messages.reaction for an encrypted reaction (wire jids)', async () => {
		const { ctx, events, secret } = setup()
		const plain = proto.Message.ReactionMessage.encode({ text: '❤️', senderTimestampMs: 42 }).finish()
		const enc = encrypt(plain, secret, MSG_ID, CREATOR, ACTOR, 'Enc Reaction')

		await processMessage(wrap({ encReactionMessage: { targetMessageKey: targetKey, ...enc } }), ctx)

		const ev = events.find(([n]) => n === 'messages.reaction')
		expect(ev).toBeDefined()
		const [{ reaction, key }] = ev![1] as any[]
		expect(reaction.text).toBe('❤️')
		expect(reaction.key.id).toBe('ENC_MSG')
		expect(key.id).toBe(MSG_ID)
	})

	it('falls back to PN-derived jids when wire-jid derivation fails', async () => {
		const { ctx, events, secret } = setup()
		const plain = proto.Message.ReactionMessage.encode({ text: '👍' }).finish()
		const enc = encrypt(plain, secret, MSG_ID, '111@s.whatsapp.net', '222@s.whatsapp.net', 'Enc Reaction')

		await processMessage(wrap({ encReactionMessage: { targetMessageKey: targetKey, ...enc } }), ctx)

		const ev = events.find(([n]) => n === 'messages.reaction')
		expect(ev).toBeDefined()
		expect((ev![1] as any[])[0].reaction.text).toBe('👍')
	})

	it('emits an appended messages.upsert for an encrypted comment', async () => {
		const { ctx, events, secret } = setup()
		const plain = proto.Message.encode({ conversation: 'a comment' }).finish()
		const enc = encrypt(plain, secret, MSG_ID, CREATOR, ACTOR, 'Enc Comment')

		await processMessage(wrap({ encCommentMessage: { targetMessageKey: targetKey, ...enc } }), ctx)

		const ev = events.find(([n]) => n === 'messages.upsert')
		expect(ev).toBeDefined()
		const payload = ev![1] as any
		expect(payload.type).toBe('append')
		expect(payload.messages[0].message.conversation).toBe('a comment')
		expect(payload.messages[0].key.id).toBe('ENC_MSG')
	})

	it('warns and emits nothing when messageSecret is missing', async () => {
		const { ctx, events } = setup(undefined)
		const enc = { encPayload: randomBytes(32), encIv: randomBytes(12) }
		await processMessage(wrap({ encReactionMessage: { targetMessageKey: targetKey, ...enc } }), ctx)
		expect(events.find(([n]) => n === 'messages.reaction')).toBeUndefined()
		expect(ctx.logger.warn).toHaveBeenCalled()
	})

	it('does not throw on garbage payload', async () => {
		const { ctx, events } = setup()
		const enc = { encPayload: randomBytes(48), encIv: randomBytes(12) }
		await expect(
			processMessage(wrap({ encCommentMessage: { targetMessageKey: targetKey, ...enc } }), ctx)
		).resolves.not.toThrow()
		expect(events.find(([n]) => n === 'messages.upsert')).toBeUndefined()
	})

	it('warns when the target message is not found', async () => {
		const { ctx, getMessage, events } = setup()
		getMessage.mockResolvedValueOnce(undefined as any)
		const enc = { encPayload: randomBytes(48), encIv: randomBytes(12) }
		await processMessage(wrap({ encReactionMessage: { targetMessageKey: targetKey, ...enc } }), ctx)
		expect(events.find(([n]) => n === 'messages.reaction')).toBeUndefined()
		expect(ctx.logger.warn).toHaveBeenCalled()
	})
})
