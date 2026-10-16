import { jest } from '@jest/globals'
import { createHash } from 'crypto'
import { proto } from '../../../WAProto/index.js'
import {
	decodeNewsletterMessageNodes,
	extractNewsletterMessageMeta,
	makeNewsletterExtras,
	PortedNewsletterPaths,
	PortedNewsletterQueryIds,
	toNewsletterServerId,
	toNewsletterServerIds,
	toNewsletterUserSettingInput
} from '../../ported'
import type { BinaryNode } from '../../WABinary'

/** a WMex reply: <iq><result>{"data":{[path]: payload}}</result></iq> */
const wmexReply = (path: string, payload: unknown): BinaryNode => ({
	tag: 'iq',
	attrs: {},
	content: [{ tag: 'result', attrs: {}, content: Buffer.from(JSON.stringify({ data: { [path]: payload } })) }]
})

const make = (reply: (node: BinaryNode) => any) => {
	const sent: BinaryNode[] = []
	let n = 0
	const query = jest.fn(async (node: BinaryNode) => {
		sent.push(node)
		return reply(node)
	})
	const extras = makeNewsletterExtras({ query: query as any, generateMessageTag: () => `tag-${++n}` })
	const variablesOf = (index = 0) =>
		JSON.parse(((sent[index]!.content as BinaryNode[])[0]!.content as Buffer).toString()).variables
	const queryIdOf = (index = 0) => (sent[index]!.content as BinaryNode[])[0]!.attrs.query_id
	return { extras, sent, query, variablesOf, queryIdOf }
}

describe('server ids and settings input', () => {
	it('accepts only the 99..2147476647 range', () => {
		expect(toNewsletterServerId('150')).toBe('150')
		expect(toNewsletterServerId(2147476647)).toBe('2147476647')
		expect(() => toNewsletterServerId(98)).toThrow('not a newsletter server id')
		expect(() => toNewsletterServerId('abc', 'x')).toThrow('for x')
		expect(toNewsletterServerIds([100, '200'])).toEqual(['100', '200'])
		expect(() => toNewsletterServerIds([])).toThrow('required')
	})

	it('maps the user setting types onto the wire values', () => {
		expect(toNewsletterUserSettingInput('1@newsletter', 'ADMIN_NOTIFICATIONS', true).input).toEqual({
			newsletter_id: '1@newsletter',
			type: 'MUTE_ADMIN_ACTIVITY',
			value: 'ON'
		})
		expect(toNewsletterUserSettingInput('1@newsletter', 'FOLLOWER_NOTIFICATIONS', false).input.value).toBe('OFF')
		expect(() => toNewsletterUserSettingInput('1@g.us', 'ADMIN_NOTIFICATIONS', true)).toThrow('not a newsletter jid')
	})
})

describe('WMex based newsletter methods', () => {
	it('pin / unpin send validated ids with the right query ids', async () => {
		const t = make(() => wmexReply('xwa2_newsletter_pin_messages', { ok: true }))
		await t.extras.newsletterPinMessages('1@newsletter', [100, 200])
		expect(t.queryIdOf()).toBe(PortedNewsletterQueryIds.PIN_MESSAGES)
		expect(t.variablesOf()).toEqual({ newsletter_id: '1@newsletter', input: { message_ids: ['100', '200'] } })
		await expect(t.extras.newsletterPinMessages('1@newsletter', [5])).rejects.toThrow('server id')
	})

	it('newsletterUpdateUserSetting returns the new state', async () => {
		const t = make(() =>
			wmexReply(PortedNewsletterPaths.xwa2_newsletter_update_user_setting, {
				id: '1@newsletter',
				state: { type: 'ACTIVE' }
			})
		)
		expect(await t.extras.newsletterUpdateUserSetting('1@newsletter', 'ADMIN_NOTIFICATIONS', true)).toEqual({
			id: '1@newsletter',
			state: 'ACTIVE'
		})
		expect(t.variablesOf().input.value).toBe('ON')
	})

	it('newsletterUpdateReactions validates the setting', async () => {
		const t = make(() => wmexReply('xwa2_newsletter_update', { id: '1@newsletter' }))
		await expect(t.extras.newsletterUpdateReactions('1@newsletter', 'LOUD')).rejects.toThrow('reaction setting')
		await t.extras.newsletterUpdateReactions('1@newsletter', 'basic')
		expect(t.variablesOf().updates.settings.reaction_codes.value).toBe('BASIC')
	})

	it('newsletterCanPostStatus reads the capabilities', async () => {
		const t = make(() => wmexReply('xwa2_newsletter_admin', { capabilities: ['CHANNEL_STATUS_PRODUCER'] }))
		expect(await t.extras.newsletterCanPostStatus('1@newsletter')).toEqual({
			canPost: true,
			canPostMusic: false,
			capabilities: ['CHANNEL_STATUS_PRODUCER']
		})
	})

	it('newsletterAdminInfo maps the response', async () => {
		const t = make(() =>
			wmexReply('xwa2_newsletter_admin', {
				id: '1@newsletter',
				admin_count: 3,
				admin_profile: { id: 'p1', name: 'Boss', picture: { id: 'pic', direct_path: '/v/p' } },
				admin_settings: { admin_profiles_enabled: true }
			})
		)
		expect(await t.extras.newsletterAdminInfo('1@newsletter')).toEqual({
			id: '1@newsletter',
			adminCount: 3,
			adminProfile: { id: 'p1', name: 'Boss', picture: { id: 'pic', directPath: '/v/p' } },
			adminProfilesEnabled: true
		})
	})

	it('newsletterEnforcements maps nested enforcement data', async () => {
		const t = make(() =>
			wmexReply('xwa2_channel_enforcements', {
				suspensions: [
					{
						enforcement_id: 'e1',
						enforcement_creation_time: '1700000000',
						appeal_state: 'NONE',
						appeal_reason_options: [{ reason: 'r', label: 'l' }]
					}
				],
				violating_messages: [{ base_enforcement_data: { enforcement_id: 'e2' } }]
			})
		)
		const res = await t.extras.newsletterEnforcements('1@newsletter')
		expect(res.suspensions[0]).toMatchObject({ enforcementId: 'e1', createdAt: 1700000000, appealState: 'NONE' })
		expect(res.violatingMessages[0]!.enforcementId).toBe('e2')
		expect(res.adminProfiles).toEqual([])
	})

	it('admin invite / directory / similar methods send the documented variables', async () => {
		const t = make(() => wmexReply('x', {}))
		await t.extras.newsletterCreateAdminInvite('1@newsletter', '2@s.whatsapp.net').catch(() => {})
		expect(t.variablesOf()).toEqual({ newsletter_id: '1@newsletter', user_id: '2@s.whatsapp.net' })
		expect(t.queryIdOf()).toBe(PortedNewsletterQueryIds.CREATE_ADMIN_INVITE)

		const d = make(() => wmexReply('xwa2_newsletters_directory_search', { result: [] }))
		await d.extras.newsletterDirectorySearch('news', { limit: 5, categories: ['NEWS'] })
		expect(d.variablesOf().input).toEqual({
			search_text: 'news',
			categories: ['NEWS'],
			limit: 5,
			start_cursor: undefined
		})

		const s = make(() => wmexReply('xwa2_newsletters_similar', { result: [] }))
		await s.extras.newsletterSimilar('1@newsletter', { limit: 3 })
		expect(s.variablesOf().input).toMatchObject({ newsletter_id: '1@newsletter', limit: 3 })
	})

	it('newsletterPendingAdminInvites maps users', async () => {
		const t = make(() =>
			wmexReply('xwa2_newsletter_admin', { pending_admin_invites: [{ user: { id: 'u1', pn: '91999' } }] })
		)
		expect(await t.extras.newsletterPendingAdminInvites('1@newsletter')).toEqual([{ id: 'u1', phoneNumber: '91999' }])
	})
})

describe('IQ based newsletter methods', () => {
	it('newsletterSendPollVote hashes every option name with sha256', async () => {
		const t = make(() => ({ tag: 'ack', attrs: {} }))
		const res = await t.extras.newsletterSendPollVote('1@newsletter', 150, ['Yes', 'No'])
		const node = t.sent[0]!
		expect(node.attrs).toMatchObject({ to: '1@newsletter', type: 'poll', server_id: '150', id: res.id })
		const votes = (node.content as BinaryNode[])[1]!.content as BinaryNode[]
		expect((votes[0]!.content as Buffer).toString('hex')).toBe(createHash('sha256').update('Yes').digest('hex'))
		expect(votes).toHaveLength(2)
	})

	it('newsletterMyAddOns parses reactions and poll votes', async () => {
		const t = make(() => ({
			tag: 'iq',
			attrs: {},
			content: [
				{
					tag: 'my_addons',
					attrs: {},
					content: [
						{
							tag: 'messages',
							attrs: { jid: '1@newsletter' },
							content: [
								{
									tag: 'message',
									attrs: { server_id: '150' },
									content: [{ tag: 'reaction', attrs: { code: '👍', t: '1700' } }]
								},
								{
									tag: 'message',
									attrs: { server_id: '151' },
									content: [
										{
											tag: 'votes',
											attrs: { t: '1800' },
											content: [{ tag: 'vote', attrs: {}, content: Buffer.from('abcd', 'hex') }]
										}
									]
								}
							]
						}
					]
				}
			]
		}))
		const res = await t.extras.newsletterMyAddOns({ limit: 10 })
		expect((t.sent[0]!.content as BinaryNode[])[0]!.attrs.limit).toBe('10')
		expect(res[0]!.messages[0]).toMatchObject({ serverId: 150, reaction: { code: '👍', t: 1700 } })
		expect(res[0]!.messages[1]!.pollVote!.hashes).toEqual(['abcd'])
	})

	it('newsletterFetchMessageUpdates decodes plaintext messages and the admin meta', async () => {
		const plain = Buffer.from(proto.Message.encode(proto.Message.create({ conversation: 'edited' })).finish())
		const t = make(() => ({
			tag: 'iq',
			attrs: {},
			content: [
				{
					tag: 'message_updates',
					attrs: {},
					content: [
						{
							tag: 'messages',
							attrs: { jid: '1@newsletter' },
							content: [
								{
									tag: 'message',
									attrs: { id: 'M1', server_id: '150', t: '1700000000' },
									content: [
										{ tag: 'plaintext', attrs: {}, content: plain },
										{ tag: 'meta', attrs: { msg_edit_t: '1700000100' }, content: [{ tag: 'ai_content', attrs: {} }] }
									]
								}
							]
						}
					]
				}
			]
		}))
		const res = await t.extras.newsletterFetchMessageUpdates('1@newsletter', { count: 5, since: 10 })
		expect((t.sent[0]!.content as BinaryNode[])[0]!.attrs).toMatchObject({ count: '5', since: '10' })
		expect(res.jid).toBe('1@newsletter')
		expect(res.messages[0].message.conversation).toBe('edited')
		expect(res.messages[0].key.server_id).toBe('150')
		expect(res.messages[0].newsletterMeta).toEqual({ aiContent: true, editTimestamp: 1700000100 })
	})

	it('extractNewsletterMessageMeta / decodeNewsletterMessageNodes handle missing data', () => {
		expect(extractNewsletterMessageMeta({ tag: 'message', attrs: {} })).toBeUndefined()
		expect(
			decodeNewsletterMessageNodes(
				{ tag: 'messages', attrs: {}, content: [{ tag: 'message', attrs: { id: '1' } }] },
				'1@newsletter'
			)
		).toEqual([])
	})
})
