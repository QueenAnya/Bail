/**
 * End-to-end smoke test: a real socket against a real (local) WebSocket server.
 *
 * This is the transport half of what upstream's e2e harness does. It does not speak the WhatsApp protocol — the local
 * server is a bare `ws` endpoint that accepts the connection and drops it — so what it proves is the part that unit
 * tests cannot: that `makeWASocket` opens a socket, reaches `connection: 'connecting'`, and shuts down cleanly.
 *
 * It needs no credentials, no network and no docker, so it can run in CI on every push. Point `SOCKET_URL` at a mock
 * WhatsApp server (upstream uses `bartender`) to exercise the full handshake instead.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { WebSocketServer } from 'ws'

const built = existsSync(new URL('../../lib/index.js', import.meta.url))

test('e2e: socket connects to a local endpoint and reports connecting', { skip: built ? false : 'run `npm run build` first' }, async t => {
	const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = await import('../../lib/index.js')

	const dir = mkdtempSync(join(tmpdir(), 'anya-e2e-'))
	const server = new WebSocketServer({ port: 0, host: '127.0.0.1' })
	await new Promise(resolve => server.once('listening', resolve))
	const { port } = server.address()

	/** resolves once the socket's WebSocket actually reaches our server */
	const accepted = new Promise(resolve => {
		server.on('connection', ws => {
			resolve(true)
			/** the socket will start its noise handshake; we are not a WhatsApp server, so close politely */
			setTimeout(() => ws.close(), 50)
		})
	})

	t.after(() => {
		server.close()
		rmSync(dir, { recursive: true, force: true })
	})

	const { state, saveCreds } = await useMultiFileAuthState(dir)

	/** a logger that swallows everything: the handshake with a non-WhatsApp endpoint is expected to fail loudly */
	const silentLogger = {
		level: 'silent',
		child: () => silentLogger,
		trace: () => {},
		debug: () => {},
		info: () => {},
		warn: () => {},
		error: () => {}
	}

	const sock = makeWASocket({
		auth: state,
		waWebSocketUrl: `ws://127.0.0.1:${port}`,
		browser: ['Anya e2e', 'Chrome', '1.0.0'],
		syncFullHistory: false,
		markOnlineOnConnect: false,
		emitOwnEvents: false,
		logger: silentLogger
	})

	sock.ev.on('creds.update', saveCreds)

	/** resolve as soon as the transport reports a connection state */
	const connecting = await new Promise(resolve => {
		const timer = setTimeout(() => resolve('timeout'), 15_000)

		sock.ev.on('connection.update', update => {
			if (update.connection === 'connecting') {
				clearTimeout(timer)
				resolve('connecting')
			}

			if (update.connection === 'close') {
				const statusCode = (update.lastDisconnect?.error)?.output?.statusCode
				/** a closed socket after a refused handshake still proves the transport worked */
				if (statusCode === DisconnectReason.connectionClosed || statusCode === DisconnectReason.connectionLost) {
					clearTimeout(timer)
					resolve('connecting')
				}
			}
		})
	})

	assert.equal(connecting, 'connecting', 'the socket reaches a connecting state against a local endpoint')

	const reached = await Promise.race([accepted, new Promise(resolve => setTimeout(() => resolve(false), 15_000))])
	assert.equal(reached, true, 'the WebSocket connection actually reached the local server')

	sock.end(undefined)
})
