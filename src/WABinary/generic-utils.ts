import { randomBytes } from 'crypto'
import { Boom } from '@hapi/boom'
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

// ─── Biz Binary Node (IT/itsliaaa port) ──────────────────────────────────────

const FLOWS_MAP: { [k: string]: boolean } = {
	mpm: true,
	cta_catalog: true,
	send_location: true,
	call_permission_request: true,
	wa_payment_transaction_details: true,
	automated_greeting_message_view_catalog: true
}

const DECISION_SOURCE_CONTENT: BinaryNode[] = [{ tag: 'decision_source', attrs: { value: 'df' }, content: undefined }]

const LIST_TYPE_CONTENT: BinaryNode = {
	tag: 'list',
	attrs: { v: '2', type: 'product_list' },
	content: undefined
}

const NATIVE_FLOW_ATTRIBUTE = { type: 'native_flow', v: '1' }

const MIXED_NATIVE_FLOW: BinaryNode = {
	tag: 'interactive',
	attrs: NATIVE_FLOW_ATTRIBUTE,
	content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' }, content: undefined }]
}

/**
 * Build the correct `<biz>` binary node for a given message.
 * Handles nativeFlow buttons, list messages, template/buttons messages,
 * and payment-related flows (review_and_pay, payment_info).
 *
 * Used automatically by `relayMessage` when `shouldIncludeBizBinaryNode`
 * returns true, and also when `addBizAttributes: true` is passed.
 */
export const getBizBinaryNode = (message: proto.IMessage): BinaryNode => {
	const flowMsg = message.interactiveMessage?.nativeFlowMessage
	const firstButtonName = (flowMsg?.buttons as any)?.[0]?.name as string | undefined

	const qualityContent: BinaryNode = {
		tag: 'quality_control',
		attrs: {
			decision_id: randomBytes(20).toString('hex'),
			source_type: 'third_party'
		},
		content: DECISION_SOURCE_CONTENT
	}

	const bizAttributes = {
		actual_actors: '2',
		host_storage: '2',
		privacy_mode_ts: `${Math.floor(Date.now() / 1000)}`
	}

	// Payment flows — review_and_pay / payment_info
	if (firstButtonName === 'review_and_pay' || firstButtonName === 'payment_info') {
		return {
			tag: 'biz',
			attrs: {
				...bizAttributes,
				native_flow_name: firstButtonName === 'review_and_pay' ? 'order_details' : firstButtonName
			},
			content: [qualityContent]
		}
	}

	// Known native flow types (mpm, cta_catalog, etc.)
	if (firstButtonName && FLOWS_MAP[firstButtonName]) {
		return {
			tag: 'biz',
			attrs: bizAttributes,
			content: [
				{
					tag: 'interactive',
					attrs: NATIVE_FLOW_ATTRIBUTE,
					content: [{ tag: 'native_flow', attrs: { v: '2', name: firstButtonName }, content: undefined }]
				},
				qualityContent
			]
		}
	}

	// Generic nativeFlow / buttonsMessage / templateMessage
	if (flowMsg || message.buttonsMessage || message.templateMessage) {
		return {
			tag: 'biz',
			attrs: bizAttributes,
			content: [MIXED_NATIVE_FLOW, qualityContent]
		}
	}

	// List message
	if (message.listMessage) {
		return {
			tag: 'biz',
			attrs: bizAttributes,
			content: [LIST_TYPE_CONTENT, qualityContent]
		}
	}

	// Default — secureMetaServiceLabel or unknown message type
	return {
		tag: 'biz',
		attrs: bizAttributes,
		content: [qualityContent]
	}
}

/**
 * Returns true if the message type requires a biz binary node to be injected
 * into the WA stanza (buttons, list, template, nativeFlow interactive).
 */
export const shouldIncludeBizBinaryNode = (message: proto.IMessage): boolean =>
	!!(
		message.buttonsMessage ||
		message.listMessage ||
		message.templateMessage ||
		message.interactiveMessage?.nativeFlowMessage
	)

/**
 * Returns truthy if the additionalNodes array already contains a button/interactive/biz/list node.
 * Used to avoid double-injecting a biz node when one already exists.
 */
export const getBinaryFilteredButtons = (nodeContent: BinaryNode | BinaryNode['content']): BinaryNode['content'] => {
	if (!Array.isArray(nodeContent)) return false as any
	return nodeContent.some((a: BinaryNode) => {
		const firstChild = Array.isArray(a?.content) ? a.content[0] : undefined
		const firstGrandchild = Array.isArray(firstChild?.content) ? firstChild.content[0] : undefined
		return (
			(typeof firstGrandchild?.tag === 'string' && ['native_flow'].includes(firstGrandchild.tag)) ||
			(typeof firstChild?.tag === 'string' && ['interactive', 'buttons', 'list'].includes(firstChild.tag)) ||
			['hsm', 'biz'].includes(a?.tag)
		)
	}) as any
}

/**
 * Returns truthy if the additionalNodes array already contains a <bot biz_bot="1"> node.
 */
export const getBinaryFilteredBizBot = (nodeContent: BinaryNode | BinaryNode['content']): BinaryNode['content'] => {
	if (!Array.isArray(nodeContent)) return false as any
	return nodeContent.some((b: BinaryNode) => b?.tag === 'bot' && b?.attrs?.biz_bot === '1') as any
}
