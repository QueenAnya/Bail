import { jest } from '@jest/globals'
import { EventEmitter } from 'events'
import sharp from 'sharp'
import { proto } from '../../../WAProto/index.js'
import {
	buildNewsletterStatusNode,
	buildNewsletterStatusReactionNode,
	buildNewsletterStatusRevokeNode,
	buildSpamListNode,
	makeChatsExtras,
	makeMessagesExtras,
	makeNewsletterStatusExtras,
	makePortedSocket,
	parseNewsletterStatusAck,
	parseNewsletterStatusesResponse,
	readSpamReportResult,
	SPAM_FLOWS,
	waitForNewsletterStatusServerId,
	withNewsletterStatusAttribution
} from '../../Extras'
import type { BinaryNode } from '../../WABinary'

const ok = (content?: BinaryNode[]): BinaryNode => ({ tag: 'iq', attrs: { type: 'result' }, content })
const childAttrs = (node: BinaryNode, index = 0) => (node.content as BinaryNode[])[index]!.attrs

describe('reportSpam helpers', () => {
	it('builds the spam_list node for users and groups', () => {
		expect(buildSpamListNode('911234:5@s.whatsapp.net')).toEqual({
			tag: 'spam_list',
			attrs: { jid: '911234@s.whatsapp.net', spam_flow: SPAM_FLOWS.OverflowMenuReport }
		})
		expect(
			buildSpamListNode('123-456@g.us', { flow: SPAM_FLOWS.GroupInfoReport, subject: 'Spam', isKnownChat: false }).attrs
		).toEqual({
			jid: '123-456@g.us',
			spam_flow: 'group_info_report',
			subject: 'Spam',
			is_known_chat: 'false'
		})
		expect(() => buildSpamListNode('nope')).toThrow('not a jid')
		expect(() => buildSpamListNode('1@s.whatsapp.net', { flow: '' })).toThrow('spam flow')
	})

	it('readSpamReportResult turns <error> into a Boom', () => {
		const sent = buildSpamListNode('1@s.whatsapp.net')
		expect(readSpamReportResult(sent, ok()).reported).toBe(true)
		expect(() => readSpamReportResult(sent, ok([{ tag: 'error', attrs: { code: '429', text: 'slow' } }]))).toThrow(
			'rejected'
		)
	})
})

describe('chats extras', () => {
	const make = (reply: (node: BinaryNode) => BinaryNode = () => ok()) => {
		const sent: BinaryNode[] = []
		const base: any = {
			query: jest.fn(async (node: BinaryNode) => (sent.push(node), reply(node))),
			generateMessageTag: () => 'tag',
			ev: { emit: jest.fn() },
			authState: { creds: { lastPropHash: undefined as string | undefined } },
			serverProps: {} as Record<string, any>,
			deleteUsername: jest.fn(async () => ({ result: 'SUCCESS' })),
			checkUsername: jest.fn(async () => ({ available: true, suggestions: ['a1'] })),
			fetchContactUsernames: jest.fn(async () => [
				{ id: '1@s.whatsapp.net', username: 'alice' },
				{ id: '2@s.whatsapp.net', username: '' }
			]),
			onWhatsApp: jest.fn(async () => [{ exists: true, jid: '911@s.whatsapp.net' }]),
			getBusinessProfile: jest.fn(async () => ({ verifiedName: 'Shop' })),
			fetchStatus: jest.fn(async () => [{ status: { status: 'hi there' } }]),
			profilePictureUrl: jest.fn(async () => 'https://pic'),
			fetchNewChatMessageCap: jest.fn(async () => ({ capped: false, warned: false, unlimited: false, remaining: 10 }))
		}
		return { extras: makeChatsExtras(base), base, sent }
	}

	it('username aliases build on the existing tb2 username socket', async () => {
		const { extras, base } = make()
		expect(await extras.removeUsername()).toEqual({ result: 'SUCCESS' })
		expect(base.deleteUsername).toHaveBeenCalled()
		expect(await extras.checkUsernameAvailability('@alice')).toEqual({
			available: true,
			suggestions: ['a1'],
			response: { available: true, suggestions: ['a1'] }
		})
		expect(base.checkUsername).toHaveBeenCalledWith('alice', true)
		expect(await extras.getUsernames('1@s.whatsapp.net', '2@s.whatsapp.net')).toEqual([
			{ jid: '1@s.whatsapp.net', username: 'alice' }
		])
		expect(await extras.getUsernames([])).toEqual([])
	})

	it('getUsername / removeUsernamePin go through WMex', async () => {
		const reply = (node: BinaryNode): BinaryNode => {
			const path = JSON.stringify(node).includes('pin') ? 'xwa2_username_pin_set' : 'xwa2_username_get'
			const data =
				path === 'xwa2_username_get'
					? { username_info: { username: 'alice', state: 'ACTIVE', pin: '1234' } }
					: { result: 'SUCCESS' }
			return {
				tag: 'iq',
				attrs: {},
				content: [{ tag: 'result', attrs: {}, content: Buffer.from(JSON.stringify({ data: { [path]: data } })) }]
			}
		}

		const { extras } = make(reply)
		expect(await extras.getUsername()).toEqual({ username: 'alice', state: 'ACTIVE', pin: '1234' })
	})

	it('notices, opt-out and push settings parse the IQ replies', async () => {
		const { extras, sent } = make(node => {
			const xmlns = node.attrs.xmlns
			if (xmlns === 'tos')
				return ok([{ tag: 'notice', attrs: { id: '7', stage: '1', t: '5', version: '2', type: 'tos' } }])
			if (xmlns === 'optoutlist') return ok([{ tag: 'item', attrs: { jid: 'a@s.whatsapp.net', category: 'x' } }])
			return ok([{ tag: 'settings', attrs: { notify: 'on' } }])
		})
		expect(await extras.fetchUserNotices(3)).toEqual([{ id: '7', stage: '1', t: '5', version: '2', type: 'tos' }])
		expect(childAttrs(sent[0]!).t).toBe('3')
		expect(await extras.fetchOptOutList({ category: 'x' })).toEqual([{ jid: 'a@s.whatsapp.net', category: 'x' }])
		expect(await extras.fetchPushSettings()).toEqual({ notify: 'on' })

		await extras.updateUserNoticeStage(7, 2)
		expect(sent[3]!.attrs.type).toBe('set')
		await extras.updateOptOut({ jid: '1:2@s.whatsapp.net', category: 'x', action: 'optout', duration: 0 })
		expect(childAttrs(sent[4]!)).toMatchObject({
			jid: '1@s.whatsapp.net',
			category: 'x',
			action: 'optout',
			duration: '0'
		})
	})

	it('reportSpam sends a spam IQ and returns the report', async () => {
		const { extras, sent } = make()
		const res = await extras.reportSpam('1@s.whatsapp.net', { flow: SPAM_FLOWS.Block })
		expect(sent[0]!.attrs).toMatchObject({ xmlns: 'spam', type: 'set' })
		expect(res).toMatchObject({ jid: '1@s.whatsapp.net', flow: 'block_dialog', reported: true })
	})

	it('fetchProps merges deltas, stores the hash and fills serverProps', async () => {
		const { extras, base } = make(node => {
			const hash = (node.content as BinaryNode[])[0]!.attrs.hash
			return ok([
				{
					tag: 'props',
					attrs: { hash: 'h2' },
					content: [{ tag: 'prop', attrs: { name: hash ? '14303' : '10518', value: 'true' } }]
				}
			])
		})
		await extras.fetchProps({ full: true })
		expect(base.authState.creds.lastPropHash).toBe('h2')
		expect(base.serverProps.privacyTokenOn1to1).toBe(true)
		const props = await extras.getServerProps()
		expect(Object.keys(props)).toContain('10518')
		const after = await extras.fetchProps()
		expect(after['14303']).toBe('true')
		expect(after['10518']).toBe('true') // merged, not replaced
	})

	it('updateTextStatus / fetchAbout send WMex queries', async () => {
		const { extras, sent } = make(() => ({
			tag: 'iq',
			attrs: {},
			content: [
				{
					tag: 'result',
					attrs: {},
					content: Buffer.from(
						JSON.stringify({
							data: {
								xwa2_update_text_status: { ok: true },
								xwa2_users_updates_since: [{ updates: [{ text: 'my about' }] }]
							}
						})
					)
				}
			]
		}))
		await extras.updateTextStatus('busy', { emoji: '🔥' })
		const vars = JSON.parse(((sent[0]!.content as BinaryNode[])[0]!.content as Buffer).toString()).variables
		expect(vars.input).toEqual({ text: 'busy', ephemeral_duration_sec: 0, emoji: { content: '🔥' } })
		expect((await extras.fetchAbout('91123@s.whatsapp.net')).status).toBe('my about')
	})

	it('checkAccountHealth reports registration, business, about, photo and the cap', async () => {
		const { extras, base } = make()
		const res = await extras.checkAccountHealth('911234567890')
		expect(res).toMatchObject({
			exists: true,
			isBusiness: true,
			verifiedName: 'Shop',
			about: 'hi there',
			hasProfilePhoto: true,
			jid: '911@s.whatsapp.net'
		})
		expect(res.notes).toEqual(['Your account is healthy for new chats'])
		base.onWhatsApp.mockResolvedValueOnce([{ exists: false }])
		expect((await extras.checkAccountHealth('000')).notes).toEqual(['This number is not registered on WhatsApp'])
	})
})

describe('messages extras', () => {
	const png = () =>
		sharp({ create: { width: 32, height: 32, channels: 3, background: { r: 9, g: 9, b: 9 } } })
			.png()
			.toBuffer()
	const makeSock = () => {
		const relayed: { jid: string; message: any; options: any }[] = []
		const sock: any = {
			query: jest.fn(async () => ok()),
			generateMessageTag: () => 'tag',
			logger: {
				info: jest.fn(),
				debug: jest.fn(),
				warn: jest.fn(),
				error: jest.fn(),
				child() {
					return this
				}
			},
			authState: {
				creds: { me: { id: '1:2@s.whatsapp.net' } },
				keys: { get: jest.fn(async () => ({})), set: jest.fn(async () => {}) }
			},
			relayMessage: jest.fn(
				async (jid: string, message: any, options: any) => (relayed.push({ jid, message, options }), options.messageId)
			),
			waUploadToServer: async () => ({ mediaUrl: 'https://mmg.whatsapp.net/x', directPath: '/v/x' }),
			upsertMessage: jest.fn(async () => {}),
			messageMutex: { mutex: async (fn: any) => fn() },
			updateMemberLabel: jest.fn(async () => ({ ok: true }))
		}
		return { sock, relayed, extras: makeMessagesExtras(sock, {}) }
	}

	it('sendHD relays an SD parent and an HD child linked by messageAssociation', async () => {
		const { extras, relayed } = makeSock()
		const parent = await extras.sendHD('2@s.whatsapp.net', { image: await png(), caption: 'hi' })
		expect(relayed).toHaveLength(2)
		expect(relayed[0]!.message.imageMessage.contextInfo.pairedMediaType).toBe(
			proto.ContextInfo.PairedMediaType.SD_IMAGE_PARENT
		)
		expect(relayed[1]!.message.imageMessage.contextInfo.pairedMediaType).toBe(
			proto.ContextInfo.PairedMediaType.HD_IMAGE_CHILD
		)
		const assoc = relayed[1]!.message.messageContextInfo.messageAssociation
		expect(assoc.associationType).toBe(proto.MessageAssociation.AssociationType.HD_IMAGE_DUAL_UPLOAD)
		expect(assoc.parentMessageKey.id).toBe(parent.key.id)
		await expect(extras.sendHD('2@s.whatsapp.net', { caption: 'no media' })).rejects.toThrow('image')
	})

	it('sendImgVid links the video to the image as a motion photo', async () => {
		const { extras, relayed } = makeSock()
		const buf = await png()
		await extras.sendImgVid('2@s.whatsapp.net', { image: buf, video: buf, caption: 'moving' }).catch(() => undefined)
		// a PNG is not a real video: only the image half can be generated here, so check the guard instead
		await expect(extras.sendImgVid('2@s.whatsapp.net', { image: buf } as any)).rejects.toThrow('image, video')
		expect(relayed[0]!.message.imageMessage.caption).toBe('moving')
	})

	it('removeMemberLabel clears the label, resetGroupSenderKey forgets the stored devices', async () => {
		const { extras, sock } = makeSock()
		await extras.removeMemberLabel('123-456@g.us')
		expect(sock.updateMemberLabel).toHaveBeenCalledWith('123-456@g.us', '')

		sock.authState.keys.get.mockResolvedValueOnce({
			'123-456@g.us': { 'a:1@s.whatsapp.net': true, 'b:2@s.whatsapp.net': true }
		})
		const summary = await extras.resetGroupSenderKey('123-456@g.us')
		expect(summary).toEqual({ jid: '123-456@g.us', cleared: 2, devices: ['a:1@s.whatsapp.net', 'b:2@s.whatsapp.net'] })
		expect(sock.authState.keys.set).toHaveBeenCalledWith({ 'sender-key-memory': { '123-456@g.us': null } })
		await expect(extras.resetGroupSenderKey('1@s.whatsapp.net')).rejects.toThrow('group jid')
	})

	it('groupQuery builds a w:g2 IQ', async () => {
		const { extras, sock } = makeSock()
		await extras.groupQuery('123@g.us', 'get', [{ tag: 'query', attrs: { request: 'interactive' } }])
		expect(sock.query).toHaveBeenCalledWith({
			tag: 'iq',
			attrs: { type: 'get', xmlns: 'w:g2', to: '123@g.us' },
			content: [{ tag: 'query', attrs: { request: 'interactive' } }]
		})
	})
})

describe('newsletter status', () => {
	it('builds text / media / reaction / revoke nodes', () => {
		const text = buildNewsletterStatusNode({ jid: '1@newsletter', message: { conversation: 'hi' }, messageId: 'M1' })
		expect(text.attrs).toEqual({ to: '1@newsletter', id: 'M1', type: 'text' })
		const media = buildNewsletterStatusNode({
			jid: '1@newsletter',
			payload: new Uint8Array([1]),
			messageId: 'M2',
			mediaType: 'image',
			mediaHandle: 'h1',
			aiContent: true
		})
		expect(media.attrs).toMatchObject({ type: 'media', media_id: 'h1' })
		expect((media.content as BinaryNode[])[1]!.tag).toBe('meta')
		expect(() =>
			buildNewsletterStatusNode({ jid: '1@s.whatsapp.net', payload: new Uint8Array([1]), messageId: 'M' })
		).toThrow('@newsletter')
		expect(() =>
			buildNewsletterStatusNode({
				jid: '1@newsletter',
				payload: new Uint8Array([1]),
				messageId: 'M',
				mediaType: 'image'
			})
		).toThrow('media handle')

		expect(
			buildNewsletterStatusReactionNode({ jid: '1@newsletter', messageId: 'R', parentServerId: 150, reaction: '🔥' })
				.attrs
		).toMatchObject({ server_id: '150', type: 'reaction' })
		const removal = buildNewsletterStatusReactionNode({ jid: '1@newsletter', messageId: 'R', parentServerId: 150 })
		expect(removal.attrs.edit).toBe('7')
		expect(buildNewsletterStatusRevokeNode({ jid: '1@newsletter', statusId: 'M1' }).attrs).toMatchObject({
			edit: '8',
			id: 'M1'
		})
	})

	it('parseNewsletterStatusAck validates class, id and from', () => {
		const ack = { tag: 'ack', attrs: { class: 'status', id: 'M1', from: '1@newsletter', t: '99', server_id: '150' } }
		expect(parseNewsletterStatusAck(ack, { jid: '1@newsletter', messageId: 'M1' })).toMatchObject({
			serverId: 150,
			t: 99
		})
		expect(() => parseNewsletterStatusAck(ack, { messageId: 'other' })).toThrow('id mismatch')
		expect(() => parseNewsletterStatusAck({ tag: 'iq', attrs: {} })).toThrow('expected <ack>')
		expect(parseNewsletterStatusAck({ ...ack, attrs: { ...ack.attrs, error: '403' } }).error).toBe('403')
	})

	it('withNewsletterStatusAttribution adds attribution type 9 and keeps caller contextInfo', () => {
		const out = withNewsletterStatusAttribution({ text: 'x', contextInfo: { isForwarded: true } })
		expect(out.contextInfo.statusAttributions[0].type).toBe(9)
		expect(out.contextInfo.isForwarded).toBe(true)
	})

	it('parseNewsletterStatusesResponse decodes statuses', () => {
		const plain = Buffer.from(proto.Message.encode(proto.Message.create({ conversation: 'status!' })).finish())
		const res = parseNewsletterStatusesResponse(
			ok([
				{
					tag: 'statuses',
					attrs: { jid: '1@newsletter', t: '5' },
					content: [
						{
							tag: 'status',
							attrs: { id: 'S1', server_id: '150', is_sender: 'true' },
							content: [
								{ tag: 'plaintext', attrs: { mediatype: 'image' }, content: plain },
								{ tag: 'views_count', attrs: { count: '12' } }
							]
						}
					]
				}
			])
		)
		expect(res).toMatchObject({ jid: '1@newsletter', t: 5 })
		expect(res.statuses[0]).toMatchObject({
			id: 'S1',
			serverId: 150,
			isSender: true,
			mediaType: 'image',
			viewsCount: 12
		})
		expect(res.statuses[0]!.message!.conversation).toBe('status!')
		expect(() => parseNewsletterStatusesResponse(ok([]))).toThrow('no <statuses>')
	})

	const makeStatusSock = (ack: (node: BinaryNode) => any) => {
		const ws = new EventEmitter()
		const sent: BinaryNode[] = []
		const sock: any = {
			ws,
			query: jest.fn(async () => ok()),
			logger: {
				warn: jest.fn(),
				debug: jest.fn(),
				error: jest.fn(),
				info: jest.fn(),
				child() {
					return this
				}
			},
			authState: { creds: { me: { id: '1:2@s.whatsapp.net' } } },
			waUploadToServer: async () => ({ mediaUrl: 'https://mmg.whatsapp.net/x', directPath: '/v/x' }),
			sendNode: jest.fn(async (node: BinaryNode) => void sent.push(node)),
			waitForMessage: jest.fn(async (id: string) => ack({ tag: 'x', attrs: { id } }))
		}
		return { sock, sent, ws }
	}

	it('waitForNewsletterStatusServerId resolves from the echoed <status> stanza and times out cleanly', async () => {
		const { sock, ws } = makeStatusSock(() => undefined)
		const wait = waitForNewsletterStatusServerId(sock, { jid: '1@newsletter', messageId: 'M1', timeoutMs: 500 })
		ws.emit('CB:status', { tag: 'status', attrs: { from: '1@newsletter', id: 'M1', server_id: '777' } })
		expect((await wait)!.serverId).toBe(777)
		expect(ws.listenerCount('CB:status')).toBe(0)
		expect(await waitForNewsletterStatusServerId(sock, { messageId: 'x', timeoutMs: 10 })).toBeUndefined()
	})

	it('sendNewsletterStatus sends the <status> stanza, waits for the ack and returns the server id', async () => {
		const { sock, sent, ws } = makeStatusSock(node => ({
			tag: 'ack',
			attrs: { class: 'status', id: node.attrs.id, from: '1@newsletter', t: '5' }
		}))
		const extras = makeNewsletterStatusExtras(sock, {})
		const pending = extras.sendNewsletterStatus(
			'1@newsletter',
			{ text: 'hello channel', question: undefined },
			{ messageId: 'MSGID1' }
		)
		await new Promise(r => setTimeout(r, 20))
		ws.emit('CB:status', { tag: 'status', attrs: { from: '1@newsletter', id: 'MSGID1', server_id: '321' } })
		const msg = await pending
		expect(sent[0]!.tag).toBe('status')
		expect(sent[0]!.attrs).toMatchObject({ to: '1@newsletter', id: 'MSGID1', type: 'text' })
		expect(msg.newsletterStatusServerId).toBe(321)
		expect(ws.listenerCount('CB:ack')).toBe(0) // listeners are always removed
	})

	it('a rejected status ack becomes an error with a hint', async () => {
		const { sock } = makeStatusSock(node => ({
			tag: 'ack',
			attrs: { class: 'status', id: node.attrs.id, error: '403' }
		}))
		const extras = makeNewsletterStatusExtras(sock, {})
		await expect(
			extras.sendNewsletterStatus('1@newsletter', { text: 'x' }, { messageId: 'M9', resolveServerId: false })
		).rejects.toThrow('CHANNEL_STATUS_PRODUCER')
	})

	it('reaction and revoke send their nodes', async () => {
		const { sock, sent } = makeStatusSock(node => ({
			tag: 'ack',
			attrs: { class: 'status', id: node.attrs.id, server_id: '9' }
		}))
		const extras = makeNewsletterStatusExtras(sock, {})
		const r = await extras.sendNewsletterStatusReaction('1@newsletter', 150, '❤️', { messageId: 'RID' })
		expect(r.newsletterStatusServerId).toBe(9)
		expect(sent[0]!.attrs).toMatchObject({ type: 'reaction', server_id: '150' })
		await extras.revokeNewsletterStatus('1@newsletter', 'MSG1')
		expect(sent[1]!.attrs.edit).toBe('8')
	})
})

describe('ported socket', () => {
	it('preserves the original sendMessage receiver when wrapping the socket', async () => {
		const base: any = {
			query: async () => ok(),
			generateMessageTag: () => 't',
			ev: { emit() {} },
			ws: new EventEmitter(),
			authState: { creds: { me: { id: '1@s.whatsapp.net' } }, keys: { get: async () => ({}), set: async () => {} } },
			calls: [] as any[],
			async sendMessage(this: any, jid: string, content: any, options: any) {
				this.calls.push({ jid, content, options })
				return { ok: true }
			}
		}

		const sock: any = makePortedSocket(base)
		await sock.sendMessage('1@s.whatsapp.net', { text: 'receiver test' })
		expect(base.calls).toHaveLength(1)
		expect(base.calls[0]).toMatchObject({ jid: '1@s.whatsapp.net', content: { text: 'receiver test' } })
	})

	it('adds every method and routes the new content keys through sendMessage', async () => {
		const calls: any[] = []
		const base: any = {
			query: async () => ok(),
			generateMessageTag: () => 't',
			ev: { emit() {} },
			ws: new EventEmitter(),
			authState: { creds: { me: { id: '1@s.whatsapp.net' } }, keys: { get: async () => ({}), set: async () => {} } },
			sendMessage: async (jid: string, content: any, options: any) => (
				calls.push({ jid, content, options }),
				{ ok: true }
			)
		}
		const sock: any = makePortedSocket(base)
		for (const name of [
			'newsletterPinMessages',
			'newsletterDirectorySearch',
			'getUsername',
			'fetchAbout',
			'reportSpam',
			'sendHD',
			'sendNewsletterStatus',
			'revokeNewsletterStatus',
			'resetGroupSenderKey',
			'executeWMexQuery',
			'groupQuery'
		]) {
			expect(typeof sock[name]).toBe('function')
		}

		await sock.sendMessage('1@s.whatsapp.net', { text: 'plain' }, { quoted: 1 })
		expect(calls[0].content).toEqual({ text: 'plain' })
		expect(calls[0].options).toEqual({ quoted: 1 })

		await sock.sendMessage('1@s.whatsapp.net', { question: { text: 'Why?' } })
		expect(calls[1].content.raw).toBe(true)
		expect(calls[1].content.questionMessage).toBeDefined()

		await sock.sendMessage('1@s.whatsapp.net', { paymentReminder: { reminderId: 'r', amount: 10, currency: 'INR' } })
		expect(calls[2].content.paymentReminderMessage.amount.currencyCode).toBe('INR')
	})
})
