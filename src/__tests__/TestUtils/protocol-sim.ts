/**
 * Protocol simulation used by the socket tests: a real makeWASocket whose websocket is a local dummy,
 * with outgoing frames decoded and answered by a tiny fake server (usync devices + LIDs, prekey bundles,
 * group metadata). Sessions are real libsignal sessions, so the stanzas are the ones a device would send.
 */
// @ts-nocheck
import { WebSocketServer } from 'ws'
import { Curve, initAuthCreds, makeWASocket } from '../../index'
import { decodeBinaryNode } from '../../WABinary'
let wss: WebSocketServer | undefined
const ensureServer = () => {
	if (!wss) {
		wss = new WebSocketServer({ port: 0 })
		wss.on('connection', () => {})
	}

	return (wss.address() as any).port as number
}

export const closeSim = async () => {
	await new Promise<void>(res => (wss ? wss.close(() => res()) : res()))
	wss = undefined
}

export const logger: any = {
	level: 'silent',
	child() {
		return this
	},
	trace() {},
	debug() {},
	info() {},
	warn: (...a: any[]) => process.env.SIMLOG && console.log('WARN', JSON.stringify(a[0])?.slice(0, 300), a[1]),
	error: (...a: any[]) =>
		process.env.SIMLOG && console.log('ERROR', a[0]?.stack ?? JSON.stringify(a[0])?.slice(0, 300), a[1])
}
export type Node = any
export async function makeSim(
	opts: { onNode?: (n: Node, sock: any) => Node | Promise<Node> | void; config?: any } = {}
) {
	const creds: any = initAuthCreds()
	creds.me = { id: '911234567890:1@s.whatsapp.net', lid: '12345678901:1@lid' }
	const store: Record<string, Record<string, any>> = {}
	const keys = {
		get: async (type: string, ids: string[]) => {
			const o: any = {}
			for (const id of ids) if (store[type]?.[id] !== undefined) o[id] = store[type][id]
			return o
		},
		set: async (data: any) => {
			for (const t in data) {
				store[t] ??= {}
				for (const id in data[t]) {
					if (data[t][id] === null) delete store[t][id]
					else store[t][id] = data[t][id]
				}
			}
		}
	}
	const sock: any = makeWASocket({
		auth: { creds, keys },
		waWebSocketUrl: `ws://127.0.0.1:${ensureServer()}`,
		logger,
		markOnlineOnConnect: false,
		...(opts.config || {})
	})
	const sent: Node[] = []
	Object.defineProperty(sock.ws, 'isOpen', { get: () => true, configurable: true })
	const real = sock.ws.socket
	sock.ws.socket = {
		...real,
		send: (buf: Buffer, cb?: any) => {
			// deliberately not awaited: the websocket `send` callback is synchronous, the decode happens after it
			void (async () => {
				for (let off = 0; off < 12; off++) {
					try {
						if (buf.readUIntBE(off, 3) === buf.length - off - 3) {
							const n = await decodeBinaryNode(buf.subarray(off + 3))
							sent.push(n)
							const reply = await opts.onNode?.(n, sock)
							if (reply) setTimeout(() => sock.ws.emit(`TAG:${n.attrs.id}`, reply), 0)
							return
						}
					} catch {}
				}
			})()

			cb?.()
			return true
		}
	}
	// put the real websocket back so end() can close it, then drop the dummy server connection
	const stop = async () => {
		sock.ws.socket = real
		try {
			await sock.end(undefined)
		} catch {}
	}

	return { sock, sent, creds, keys, store, stop }
}

// ---- a tiny fake server: usync devices + encrypt prekey bundles + generic iq results
import { signedKeyPair } from '../../Utils/crypto'
import { binaryNodeToString } from '../../WABinary'
const bundles: Record<string, any> = {}
const buf3 = (n: number) => Buffer.from([(n >> 16) & 255, (n >> 8) & 255, n & 255])
function bundleFor(jid: string) {
	if (bundles[jid]) return bundles[jid]
	const identity = Curve.generateKeyPair()
	const spk = signedKeyPair(identity, 7)
	const otk = Curve.generateKeyPair()
	return (bundles[jid] = {
		tag: 'user',
		attrs: { jid },
		content: [
			{ tag: 'registration', attrs: {}, content: Buffer.from([0, 0, 0x30, 0x39]) },
			{ tag: 'identity', attrs: {}, content: identity.public },
			{
				tag: 'skey',
				attrs: {},
				content: [
					{ tag: 'id', attrs: {}, content: buf3(7) },
					{ tag: 'value', attrs: {}, content: spk.keyPair.public },
					{ tag: 'signature', attrs: {}, content: spk.signature }
				]
			},
			{
				tag: 'key',
				attrs: {},
				content: [
					{ tag: 'id', attrs: {}, content: buf3(99) },
					{ tag: 'value', attrs: {}, content: otk.public }
				]
			}
		]
	})
}

export const fakeServer =
	(log: Node[] = [], groups: Record<string, string[]> = {}) =>
	(n: Node) => {
		log.push(n)
		if (n.tag !== 'iq') return
		const res = (content?: Node[]) => ({
			tag: 'iq',
			attrs: { type: 'result', id: n.attrs.id, from: 's.whatsapp.net' },
			content
		})
		const kids = Array.isArray(n.content) ? n.content : []
		if (n.attrs.xmlns === 'usync') {
			const users = kids[0]?.content?.find((c: any) => c.tag === 'list')?.content ?? []
			return res([
				{
					tag: 'usync',
					attrs: {},
					content: [
						{
							tag: 'list',
							attrs: {},
							content: users.map((u: any) => ({
								tag: 'user',
								attrs: { jid: u.attrs.jid },
								content: [
									{
										tag: 'devices',
										attrs: {},
										content: [{ tag: 'device-list', attrs: {}, content: [{ tag: 'device', attrs: { id: '0' } }] }]
									},
									{ tag: 'lid', attrs: { val: u.attrs.jid.split('@')[0].split(':')[0] + '99@lid' } }
								]
							}))
						}
					]
				}
			])
		}

		if (n.attrs.xmlns === 'encrypt' && n.attrs.type === 'get') {
			const users = kids[0]?.content ?? []
			return res([{ tag: 'list', attrs: {}, content: users.map((u: any) => bundleFor(u.attrs.jid)) }])
		}

		if (n.attrs.xmlns === 'w:g2' && n.attrs.type === 'get' && groups[n.attrs.to]) {
			const gid = n.attrs.to
			return res([
				{
					tag: 'group',
					attrs: {
						id: gid.split('@')[0],
						subject: 'G',
						creation: '1',
						creator: '911234567890@s.whatsapp.net',
						s_t: '1',
						s_o: '911234567890@s.whatsapp.net',
						addressing_mode: 'pn'
					},
					content: groups[gid].map(j => ({ tag: 'participant', attrs: { jid: j } }))
				}
			])
		}

		return res([])
	}

export const messageNodes = (sent: Node[]) => sent.filter(n => n.tag === 'message')
export { binaryNodeToString }
export const tree = (n: Node, d = 0): string => {
	const a = Object.entries(n.attrs || {})
		.map(([k, v]) => `${k}=${v}`)
		.join(' ')
	const kids = Array.isArray(n.content) ? n.content : []
	const pad = '  '.repeat(d)
	if (n.tag === 'enc') return `${pad}<enc ${a}/>`
	return (
		`${pad}<${n.tag}${a ? ' ' + a : ''}>` + (kids.length ? '\n' + kids.map((k: Node) => tree(k, d + 1)).join('\n') : '')
	)
}
