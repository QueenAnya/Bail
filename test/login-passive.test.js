import { test } from 'node:test'
import assert from 'node:assert/strict'
import { generateLoginNode } from '../lib/Utils/validate-connection.js'
import { DEFAULT_CONNECTION_CONFIG } from '../lib/Defaults/index.js'

/**
 * `passive` in the login node is the one wire difference between this package and upstream WhiskeySockets.
 *
 * Upstream sends `true`; this package sends `false` because reconnect/import testing reported 428s from WhatsApp for
 * existing companion sessions sent as passive (upstream PR #2682, closed as stale, never merged). Neither side has a
 * live-verified answer, so the choice is a config flag instead of a hardcoded value: `passiveLogin: true` reproduces
 * upstream exactly, which is what you need to compare the two on one account.
 */

const config = extra => ({ ...DEFAULT_CONNECTION_CONFIG, ...extra })

test('login node: passive is false by default', () => {
	const payload = generateLoginNode('12345@s.whatsapp.net', config({}))
	assert.equal(payload.passive, false)
})

test('login node: passiveLogin: true reproduces upstream behaviour', () => {
	const payload = generateLoginNode('12345@s.whatsapp.net', config({ passiveLogin: true }))
	assert.equal(payload.passive, true)
})

test('login node: passiveLogin: false is the same as leaving it out', () => {
	const withFlag = generateLoginNode('12345@s.whatsapp.net', config({ passiveLogin: false }))
	const without = generateLoginNode('12345@s.whatsapp.net', config({}))
	assert.equal(withFlag.passive, without.passive)
	assert.equal(withFlag.passive, false)
})

test('registration node always stays passive: false, whatever the flag says', async () => {
	const { generateRegistrationNode } = await import('../lib/Utils/validate-connection.js')
	const { initAuthCreds } = await import('../lib/Utils/auth-utils.js')
	const creds = initAuthCreds()

	for (const passiveLogin of [false, true]) {
		const node = generateRegistrationNode(creds, config({ passiveLogin }))
		assert.equal(node.passive, false, `registration ignores passiveLogin: ${passiveLogin}`)
	}
})
