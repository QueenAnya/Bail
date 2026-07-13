import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import { proto } from '../../WAProto/index.js'
import { type BinaryNode } from './types'

// some extra useful utilities

const indexCache = new WeakMap<BinaryNode, Map<string, BinaryNode[]>>()

export const getBinaryNodeChildren = (node: BinaryNode | undefined, childTag: string) => {
	if (!node || !Array.isArray(node.content)) return []

	let index = indexCache.get(node)

	// Build the index once per node
	if (!index) {
		index = new Map<string, BinaryNode[]>()

		for (const child of node.content) {
			let arr = index.get(child.tag)
			if (!arr) index.set(child.tag, (arr = []))
			arr.push(child)
		}

		indexCache.set(node, index)
	}

	// Return first matching child
	return index.get(childTag) || []
}

export const getBinaryNodeChild = (node: BinaryNode | undefined, childTag: string) => {
	return getBinaryNodeChildren(node, childTag)[0]
}

export const getAllBinaryNodeChildren = ({ content }: BinaryNode) => {
	if (Array.isArray(content)) {
		return content
	}

	return []
}

export const getBinaryNodeChildBuffer = (node: BinaryNode | undefined, childTag: string) => {
	const child = getBinaryNodeChild(node, childTag)?.content
	if (Buffer.isBuffer(child) || child instanceof Uint8Array) {
		return child
	}
}

export const getBinaryNodeChildString = (node: BinaryNode | undefined, childTag: string) => {
	const child = getBinaryNodeChild(node, childTag)?.content
	if (Buffer.isBuffer(child) || child instanceof Uint8Array) {
		return Buffer.from(child).toString('utf-8')
	} else if (typeof child === 'string') {
		return child
	}
}

export const getBinaryNodeChildUInt = (node: BinaryNode, childTag: string, length: number) => {
	const buff = getBinaryNodeChildBuffer(node, childTag)
	if (buff) {
		return bufferToUInt(buff, length)
	}
}

export const assertNodeErrorFree = (node: BinaryNode) => {
	const errNode = getBinaryNodeChild(node, 'error')
	if (errNode) {
		throw new Boom(errNode.attrs.text || 'Unknown error', { data: +errNode.attrs.code! })
	}
}

export const reduceBinaryNodeToDictionary = (node: BinaryNode, tag: string) => {
	const nodes = getBinaryNodeChildren(node, tag)
	const dict = nodes.reduce(
		(dict, { attrs }) => {
			if (typeof attrs.name === 'string') {
				dict[attrs.name] = attrs.value! || attrs.config_value!
			} else {
				dict[attrs.config_code!] = attrs.value! || attrs.config_value!
			}

			return dict
		},
		{} as { [_: string]: string }
	)
	return dict
}

export const getBinaryNodeMessages = ({ content }: BinaryNode) => {
	const msgs: proto.WebMessageInfo[] = []
	if (Array.isArray(content)) {
		for (const item of content) {
			if (item.tag === 'message') {
				msgs.push(proto.WebMessageInfo.decode(item.content as Buffer).toJSON() as proto.WebMessageInfo)
			}
		}
	}

	return msgs
}

function bufferToUInt(e: Uint8Array | Buffer, t: number) {
	let a = 0
	for (let i = 0; i < t; i++) {
		a = 256 * a + e[i]!
	}

	return a
}

const tabs = (n: number) => '\t'.repeat(n)

export function binaryNodeToString(node: BinaryNode | BinaryNode['content'], i = 0): string {
	if (!node) {
		return node!
	}

	if (typeof node === 'string') {
		return tabs(i) + node
	}

	if (node instanceof Uint8Array) {
		return tabs(i) + Buffer.from(node).toString('hex')
	}

	if (Array.isArray(node)) {
		return node.map(x => tabs(i + 1) + binaryNodeToString(x, i + 1)).join('\n')
	}

	const children = binaryNodeToString(node.content, i + 1)

	const tag = `<${node.tag} ${Object.entries(node.attrs || {})
		.filter(([, v]) => v !== undefined)
		.map(([k, v]) => `${k}='${v}'`)
		.join(' ')}`

	const content: string = children ? `>\n${children}\n${tabs(i)}</${node.tag}>` : '/>'

	return tag + content
}

/**
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * True when `additionalNodes` already contains a `native_flow`/interactive/
 * buttons/list node, or an `hsm`/`biz` node — used by `relayMessage` to
 * decide whether the caller already supplied a fully-formed biz stanza
 * (in which case the AI bot-icon node shouldn't be pushed separately).
 */
export const getBinaryFilteredButtons = (nodeContent: unknown): boolean => {
	if (!Array.isArray(nodeContent)) {
		return false
	}

	return nodeContent.some(
		(a: any) =>
			['native_flow'].includes(a?.content?.[0]?.content?.[0]?.tag) ||
			['interactive', 'buttons', 'list'].includes(a?.content?.[0]?.tag) ||
			['hsm', 'biz'].includes(a?.tag)
	)
}

/**
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * True when `additionalNodes` already contains a `bot` node with
 * `biz_bot='1'` — used to avoid double-pushing the AI bot-icon node.
 */
export const getBinaryFilteredBizBot = (nodeContent: unknown): boolean => {
	if (!Array.isArray(nodeContent)) {
		return false
	}

	return nodeContent.some((b: any) => b?.tag === 'bot' && b?.attrs?.biz_bot === '1')
}

const FLOWS_MAP: { [name: string]: true } = {
	mpm: true,
	cta_catalog: true,
	send_location: true,
	call_permission_request: true,
	wa_payment_transaction_details: true,
	automated_greeting_message_view_catalog: true
}

const DECISION_SOURCE_CONTENT: BinaryNode[] = [
	{
		tag: 'decision_source',
		attrs: { value: 'df' }
	}
]

const LIST_TYPE_CONTENT: BinaryNode = {
	tag: 'list',
	attrs: { v: '2', type: 'product_list' }
}

const NATIVE_FLOW_ATTRIBUTE = { type: 'native_flow', v: '1' }

const MIXED_NATIVE_FLOW: BinaryNode = {
	tag: 'interactive',
	attrs: NATIVE_FLOW_ATTRIBUTE,
	content: [
		{
			tag: 'native_flow',
			attrs: { v: '9', name: 'mixed' }
		}
	]
}

/**
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * Builds the `<biz>` stanza WhatsApp expects alongside buttons/list/
 * template/interactive (native-flow) messages. Without this node, those
 * message types are accepted by the send call but may not render
 * correctly (or at all) on real WhatsApp clients.
 */
export const getBizBinaryNode = (message: proto.IMessage): BinaryNode => {
	const flowMsg = message.interactiveMessage?.nativeFlowMessage
	const firstButtonName = flowMsg?.buttons?.[0]?.name

	const qualityContent: BinaryNode = {
		tag: 'quality_control',
		attrs: {
			decision_id: randomBytes(20).toString('hex'),
			source_type: 'third_party'
		},
		content: DECISION_SOURCE_CONTENT
	}

	const bizAttributes: { [key: string]: string } = {
		actual_actors: '2',
		host_storage: '2',
		privacy_mode_ts: `${(Date.now() / 1_000) | 0}`
	}

	if (firstButtonName === 'review_and_pay' || firstButtonName === 'payment_info') {
		bizAttributes.native_flow_name = firstButtonName === 'review_and_pay' ? 'order_details' : firstButtonName
		return {
			tag: 'biz',
			attrs: bizAttributes,
			content: [qualityContent]
		}
	}

	if (firstButtonName && FLOWS_MAP[firstButtonName]) {
		return {
			tag: 'biz',
			attrs: bizAttributes,
			content: [
				{
					tag: 'interactive',
					attrs: NATIVE_FLOW_ATTRIBUTE,
					content: [
						{
							tag: 'native_flow',
							attrs: { v: '2', name: firstButtonName }
						}
					]
				},
				qualityContent
			]
		}
	}

	if (flowMsg || message.buttonsMessage || message.templateMessage) {
		return {
			tag: 'biz',
			attrs: bizAttributes,
			content: [MIXED_NATIVE_FLOW, qualityContent]
		}
	}

	if (message.listMessage) {
		return {
			tag: 'biz',
			attrs: bizAttributes,
			content: [LIST_TYPE_CONTENT, qualityContent]
		}
	}

	return {
		tag: 'biz',
		attrs: bizAttributes,
		content: [qualityContent]
	}
}
