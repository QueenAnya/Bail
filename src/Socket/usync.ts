import { Boom } from '@hapi/boom'
import type { SocketConfig } from '../Types'
import { S_WHATSAPP_NET } from '../WABinary'
import type { USyncQuery, USyncUser } from '../WAUSync'
import { makeSocket } from './socket'

export const makeUSyncSocket = (config: SocketConfig) => {
	const sock = makeSocket(config)
	const { generateMessageTag, query } = sock

	const executeUSyncQuery = async (usyncQuery: USyncQuery) => {
		if (!usyncQuery.protocols || usyncQuery.protocols.length === 0) {
			throw new Boom('USyncQuery must have at least one protocol')
		}

		const validUsers: USyncUser[] = usyncQuery.users

		const userNodes = validUsers.map(user => ({
			tag: 'user',
			attrs: { jid: !user.phone ? user.id : undefined },
			content: usyncQuery.protocols.map((p: any) => p.getUserElement(user)).filter((n: any) => n !== null)
		}))

		const iq = {
			tag: 'iq',
			attrs: { to: S_WHATSAPP_NET, type: 'get', xmlns: 'usync' },
			content: [
				{
					tag: 'usync',
					attrs: {
						context: usyncQuery.context,
						mode: usyncQuery.mode,
						sid: generateMessageTag(),
						last: 'true',
						index: '0'
					},
					content: [
						{ tag: 'query', attrs: {}, content: usyncQuery.protocols.map((p: any) => p.getQueryElement()) },
						{ tag: 'list', attrs: {}, content: userNodes }
					]
				}
			]
		}

		const result = await query(iq)
		return result
	}

	return { ...sock, executeUSyncQuery }
}
