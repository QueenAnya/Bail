import { describe, expect, it } from '@jest/globals'
import { describeUnusableGroupMetadata, isUsableGroupMetadata } from '../../ported/group-metadata-cache'
import { makeEventInviteMessage, makePollAddOptionMessage } from '../../ported/modern-messages'
import { commitSenderKeyDelivery, pickSenderKeyRecipients } from '../../ported/sender-key-memory'
import { buildMemberLabelMessage } from '../../Socket/messages-send'
import { GroupHistoryToggleMode } from '../../Types/GroupMetadata'
import { RETRYABLE_ACK_CODES } from '../../Utils/decode-wa-message'
import { getPollOptionHash } from '../../Utils/messages'
import { generateWAMessageContent } from '../../Utils/messages'
import { assertUsername, displayUsername, validateUsernameFormat } from '../../Utils/username'
import { isJidLocationBroadcast, LOCATION_BROADCAST_JID } from '../../WABinary/jid-utils'

describe('Elaina ports', () => {
	it('hashes photo poll options deterministically', () => {
		const a = getPollOptionHash('Yes', new Uint8Array([1, 2, 3]))
		expect(a).toMatch(/^[0-9a-f]{64}$/)
		expect(getPollOptionHash('Yes', new Uint8Array([1, 2, 3]))).toBe(a)
		expect(getPollOptionHash('No', new Uint8Array([1, 2, 3]))).not.toBe(a)
	})

	it('validates usernames with a reason', () => {
		expect(validateUsernameFormat('@good.name1')).toEqual({ isValid: true })
		expect(validateUsernameFormat('a')).toEqual({ isValid: false, errorType: 'INVALID_LENGTH' })
		expect(validateUsernameFormat('my.whatsapp')).toEqual({ isValid: false, errorType: 'INVALID_WORD' })
		expect(() => assertUsername('1234')).toThrow()
		expect(displayUsername('bob')).toBe('@bob')
	})

	it('builds member label messages', () => {
		const { label, node } = buildMemberLabelMessage('1@g.us', 'x'.repeat(50))
		expect(label).toHaveLength(30)
		expect(node.attrs.tag_reason).toBe('user_update')
		expect(buildMemberLabelMessage('1@g.us', '').node.attrs.tag_reason).toBe('user_delete')
		expect(() => buildMemberLabelMessage('1@s.whatsapp.net', 'a')).toThrow()
	})

	it('checks cached group metadata usability', () => {
		expect(isUsableGroupMetadata({ participants: [], addressingMode: 'lid' })).toBe(true)
		expect(isUsableGroupMetadata({ participants: [] })).toBe(false)
		expect(describeUnusableGroupMetadata({ participants: [] })).toBe('no addressingMode')
	})

	it('tracks sender key delivery', () => {
		const map: Record<string, boolean> = { 'a:1@lid': true }
		const devices = [{ jid: 'a:1@lid' }, { jid: 'b:2@lid' }, { jid: 'c:3@lid' }]
		const recipients = pickSenderKeyRecipients(devices, map)
		expect(recipients).toEqual(['b:2@lid', 'c:3@lid'])
		const { marked, skipped } = commitSenderKeyDelivery(map, recipients, [{ tag: 'to', attrs: { jid: 'b:2@lid' } }])
		expect(marked).toEqual(['b:2@lid'])
		expect(skipped).toEqual(['c:3@lid'])
		expect(map['c:3@lid']).toBeUndefined()
	})

	it('exposes misc constants', () => {
		expect(isJidLocationBroadcast(LOCATION_BROADCAST_JID)).toBe(true)
		expect(GroupHistoryToggleMode.OFF).toBe(2)
		expect(RETRYABLE_ACK_CODES.has('503')).toBe(true)
	})

	it('builds pollAddOption and eventInvite messages from the flat proto classes', () => {
		const key = { remoteJid: '1@g.us', id: 'ABC', fromMe: false }
		const add = makePollAddOptionMessage({ pollCreationMessageKey: key, option: 'Maybe' })
		expect(add.pollAddOptionMessage.addOption?.optionName).toBe('Maybe')
		const ev = makeEventInviteMessage({ eventId: 'e1', eventTitle: 'Party', startTime: 1_800_000_000 })
		expect(ev.eventInviteMessage.eventId).toBe('e1')
	})

	describe('content types', () => {
		const opts: any = { upload: async () => ({ mediaUrl: 'x', directPath: 'y' }) }

		it('richLink builds an extended text card', async () => {
			const m = await generateWAMessageContent(
				{ richLink: { url: 'https://example.com', title: 'T', description: 'D' } },
				opts
			)
			expect(m.extendedTextMessage?.matchedText).toBe('https://example.com')
			expect(m.extendedTextMessage?.title).toBe('T')
			expect(m.extendedTextMessage?.text).toContain('https://example.com')
			await expect(generateWAMessageContent({ richLink: { title: 'x' } } as any, opts)).rejects.toThrow('needs a url')
		})

		it('groupMentions adds contextInfo and the @token', async () => {
			const m = await generateWAMessageContent(
				{ text: 'hi', groupMentions: [{ groupJid: '123@g.us', groupSubject: 'G' }] },
				opts
			)
			expect(m.extendedTextMessage?.contextInfo?.groupMentions?.[0]?.groupJid).toBe('123@g.us')
			expect(m.extendedTextMessage?.text).toContain('@123@g.us')
		})

		it('forwardedNewsletter marks the message forwarded', async () => {
			const m = await generateWAMessageContent(
				{
					text: 'hi',
					forwardedNewsletter: { newsletterJid: '1@newsletter', serverMessageId: 100, newsletterName: 'N' }
				},
				opts
			)
			expect(m.extendedTextMessage?.contextInfo?.isForwarded).toBe(true)
			expect(m.extendedTextMessage?.contextInfo?.forwardedNewsletterMessageInfo?.newsletterName).toBe('N')
		})

		it('statusLinkPreview validates the style', async () => {
			const m = await generateWAMessageContent({ text: 'hi', statusLinkPreview: 2 }, opts)
			expect((m as any).statusLinkPreviewMetadata).toEqual({ style: 2 })
			await expect(generateWAMessageContent({ text: 'hi', statusLinkPreview: -1 } as any, opts)).rejects.toThrow()
		})

		it('photo poll options with a hash use the V3 poll message', async () => {
			const m = await generateWAMessageContent(
				{ poll: { name: 'q', values: [{ name: 'a', optionHash: 'h1' }, 'b'], selectableCount: 1 } },
				opts
			)
			expect(m.pollCreationMessageV3?.options?.[0]?.optionHash).toBe('h1')
			expect(m.pollCreationMessageV3?.pollContentType).toBe(2)
		})
	})
})
