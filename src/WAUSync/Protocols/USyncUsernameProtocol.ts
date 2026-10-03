import type { USyncQueryProtocol } from '../../Types/USync'
import { assertNodeErrorFree, type BinaryNode } from '../../WABinary'
import { USyncUser } from '../USyncUser'

export class USyncUsernameProtocol implements USyncQueryProtocol {
	name = 'username'

	getQueryElement(): BinaryNode {
		return {
			tag: 'username',
			attrs: {}
		}
	}

	getUserElement(user: USyncUser): BinaryNode | null {
		if (user.username) {
			return {
				tag: 'username',
				attrs: user.usernameKey ? { pin: user.usernameKey } : {},
				content: user.username
			}
		}

		return null
	}

	parser(node: BinaryNode): string | null {
		if (node.tag === 'username') {
			const errorNode =
				node.content && Array.isArray(node.content) ? node.content.find(c => c.tag === 'error') : undefined
			if (errorNode) return null
			assertNodeErrorFree(node)
			if (typeof node.content === 'string') {
				return node.content
			}

			if (Buffer.isBuffer(node.content) || node.content instanceof Uint8Array) {
				return Buffer.from(node.content as Uint8Array).toString('utf-8')
			}

			if (node.attrs?.val) return node.attrs.val
			if (node.attrs?.username) return node.attrs.username
			return null
		}

		return null
	}
}
