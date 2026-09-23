import type { USyncQueryProtocol } from '../Types/USync'
import { type BinaryNode, getBinaryNodeChild, jidNormalizedUser } from '../WABinary'
import { USyncBotProfileProtocol } from './Protocols/UsyncBotProfileProtocol'
import { USyncLIDProtocol } from './Protocols/UsyncLIDProtocol'
import {
	USyncContactProtocol,
	USyncDeviceProtocol,
	USyncDisappearingModeProtocol,
	USyncStatusProtocol,
	USyncTextStatusProtocol,
	USyncUsernameProtocol
} from './Protocols'
import { USyncUser } from './USyncUser'

export type USyncQueryResultList = { [protocol: string]: unknown; id: string }

export type USyncQueryResult = {
	list: USyncQueryResultList[]
	sideList: USyncQueryResultList[]
}

export class USyncQuery {
	protocols: USyncQueryProtocol[]
	users: USyncUser[]
	context: string
	mode: string

	constructor() {
		this.protocols = []
		this.users = []
		this.context = 'interactive'
		this.mode = 'query'
	}

	withMode(mode: string) {
		this.mode = mode
		return this
	}

	withContext(context: string) {
		this.context = context
		return this
	}

	withUser(user: USyncUser) {
		this.users.push(user)
		return this
	}

	parseUSyncQueryResult(result: BinaryNode | undefined): USyncQueryResult | undefined {
		if (result?.attrs.type !== 'result') {
			return
		}

		const protocolMap = Object.fromEntries(
			this.protocols.map(protocol => {
				return [protocol.name, protocol.parser]
			})
		)

		const queryResult: USyncQueryResult = {
			// TODO: implement errors etc.
			list: [],
			sideList: []
		}

		const usyncNode = getBinaryNodeChild(result, 'usync')

		//TODO: implement error backoff, refresh etc.
		//TODO: see if there are any errors in the result node
		//const resultNode = getBinaryNodeChild(usyncNode, 'result')

		const listNode = usyncNode ? getBinaryNodeChild(usyncNode, 'list') : undefined

		if (listNode?.content && Array.isArray(listNode.content)) {
			queryResult.list = listNode.content.reduce((acc: USyncQueryResultList[], node) => {
				const id = node?.attrs.jid
				if (id) {
					const data = Array.isArray(node?.content)
						? Object.fromEntries(
								node.content
									.map(content => {
										const protocol = content.tag
										const parser = protocolMap[protocol]
										if (parser) {
											return [protocol, parser(content)]
										} else {
											return [protocol, null]
										}
									})
									.filter(([, b]) => b !== null) as [string, unknown][]
							)
						: {}
					const errorNode = Array.isArray(node?.content) ? node.content.find(c => c?.tag === 'error') : undefined
					const rawLid = node?.attrs?.lid || (data as any)?.lid
					const lid = rawLid ? (String(rawLid).includes('@') ? String(rawLid) : `${rawLid}@lid`) : undefined
					let rawPn =
						node?.attrs?.pn_jid ||
						node?.attrs?.pn ||
						node?.attrs?.phone_number ||
						node?.attrs?.phone ||
						(data as any)?.pn

					if (!rawPn && Array.isArray(node?.content)) {
						for (const child of node.content) {
							const cp = child?.attrs?.phone_number || child?.attrs?.pn || child?.attrs?.pn_jid || child?.attrs?.phone

							if (cp) {
								rawPn = cp
								break
							}
						}
					}

					const pn = rawPn
						? jidNormalizedUser(String(rawPn).includes('@') ? String(rawPn) : `${rawPn}@s.whatsapp.net`)
						: undefined

					acc.push({
						...data,
						id,
						...(lid ? { lid } : {}),
						...(pn ? { pn } : {}),
						...(errorNode ? { error: errorNode.attrs } : {})
					})
				}

				return acc
			}, [])
		}

		//TODO: implement side list
		//const sideListNode = getBinaryNodeChild(usyncNode, 'side_list')
		return queryResult
	}

	withDeviceProtocol() {
		this.protocols.push(new USyncDeviceProtocol())
		return this
	}

	withContactProtocol() {
		this.protocols.push(new USyncContactProtocol())
		return this
	}

	withStatusProtocol() {
		this.protocols.push(new USyncStatusProtocol())
		return this
	}

	withDisappearingModeProtocol() {
		this.protocols.push(new USyncDisappearingModeProtocol())
		return this
	}

	withBotProfileProtocol() {
		this.protocols.push(new USyncBotProfileProtocol())
		return this
	}

	withLIDProtocol() {
		this.protocols.push(new USyncLIDProtocol())
		return this
	}

	withUsernameProtocol() {
		this.protocols.push(new USyncUsernameProtocol())
		return this
	}

	withTextStatusProtocol() {
		this.protocols.push(new USyncTextStatusProtocol())
		return this
	}
}
