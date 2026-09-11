import { jest } from '@jest/globals'
import { emitNewsletterRoleUpdate } from '../../addons/newsletter-role-updates'
import type { BaileysEventEmitter } from '../../Types'

const makeEv = () => ({ emit: jest.fn() }) as unknown as BaileysEventEmitter & { emit: jest.Mock }

describe('emitNewsletterRoleUpdate', () => {
	it('emits a promote event with new_role ADMIN', () => {
		const ev = makeEv()

		emitNewsletterRoleUpdate(
			ev,
			[{ jid: '123@newsletter', user: '456@s.whatsapp.net' }],
			'789@s.whatsapp.net',
			'promote'
		)

		expect(ev.emit).toHaveBeenCalledWith('newsletter-participants.update', {
			id: '123@newsletter',
			author: '789@s.whatsapp.net',
			user: '456@s.whatsapp.net',
			new_role: 'ADMIN',
			action: 'promote'
		})
	})

	it('emits a demote event with new_role SUBSCRIBER — the case that used to be dropped entirely', () => {
		const ev = makeEv()

		emitNewsletterRoleUpdate(
			ev,
			[{ jid: '123@newsletter', user: '456@s.whatsapp.net' }],
			'789@s.whatsapp.net',
			'demote'
		)

		expect(ev.emit).toHaveBeenCalledWith('newsletter-participants.update', {
			id: '123@newsletter',
			author: '789@s.whatsapp.net',
			user: '456@s.whatsapp.net',
			new_role: 'SUBSCRIBER',
			action: 'demote'
		})
	})

	it('defaults author to an empty string when the server omits it', () => {
		const ev = makeEv()

		emitNewsletterRoleUpdate(ev, [{ jid: '123@newsletter', user: '456@s.whatsapp.net' }], undefined, 'demote')

		expect(ev.emit).toHaveBeenCalledWith('newsletter-participants.update', expect.objectContaining({ author: '' }))
	})

	it('skips updates missing jid or user', () => {
		const ev = makeEv()

		emitNewsletterRoleUpdate(ev, [{ jid: '123@newsletter' }, { user: '456@s.whatsapp.net' }, {}], 'author', 'promote')

		expect(ev.emit).not.toHaveBeenCalled()
	})

	it('emits once per valid update in a batch', () => {
		const ev = makeEv()

		emitNewsletterRoleUpdate(
			ev,
			[
				{ jid: 'a@newsletter', user: 'u1@s.whatsapp.net' },
				{ jid: 'b@newsletter', user: 'u2@s.whatsapp.net' }
			],
			'author',
			'promote'
		)

		expect(ev.emit).toHaveBeenCalledTimes(2)
	})
})
