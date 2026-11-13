import { test } from 'node:test'
import assert from 'node:assert/strict'

import { ProtocolAddress, SessionBuilder, SessionCipher, SessionRecord, curve, keyhelper } from 'libsignal'

/**
 * Signal round trip, against whatever `libsignal` package.json resolves to.
 *
 * This exists because that dependency changed: it used to be `npm:@teamolduser/libsignal@1.0.1`, a republished
 * fork, and is now upstream `libsignal@^6` — the same package elaina-baileys uses. A republished Signal
 * implementation is the most security-sensitive thing in the tree, so the swap needs a test that actually encrypts
 * and decrypts, not one that merely checks the import resolves.
 *
 * Two in-memory parties: Alice fetches Bob's pre-key bundle, builds a session, encrypts; Bob decrypts.
 */

const makeStore = () => {
	const identities = new Map()
	const sessions = new Map()
	const preKeys = new Map()
	let ourIdentity
	let registrationId

	return {
		async loadSession(id) {
			return sessions.get(id) ?? new SessionRecord()
		},
		async storeSession(id, record) {
			sessions.set(id, record)
		},
		async isTrustedIdentity(id, key) {
			const known = identities.get(id)
			if (!known) return true
			return Buffer.compare(Buffer.from(known), Buffer.from(key)) === 0
		},
		async loadIdentityKey(id) {
			return identities.get(id)
		},
		async saveIdentity(id, key) {
			identities.set(id, key)
			return true
		},
		async loadPreKey(id) {
			return preKeys.get(id)
		},
		async storePreKey(id, record) {
			preKeys.set(id, record)
		},
		async removePreKey(id) {
			preKeys.delete(id)
		},
		async loadSignedPreKey(id) {
			return preKeys.get(`signed:${id}`)
		},
		async storeSignedPreKey(id, record) {
			preKeys.set(`signed:${id}`, record)
		},
		setIdentity(pair, registration) {
			ourIdentity = pair
			if (registration !== undefined) registrationId = registration
		},
		/** libsignal asks the store for these two directly */
		async getOurIdentity() {
			return ourIdentity
		},
		async getOurRegistrationId() {
			return registrationId
		}
	}
}

test('signal: a session built from a pre-key bundle encrypts and decrypts', async () => {
	const alice = makeStore()
	const bob = makeStore()

	/** Bob publishes an identity, a signed pre-key and one one-time pre-key */
	const bobIdentity = keyhelper.generateIdentityKeyPair()
	const bobRegistrationId = keyhelper.generateRegistrationId()
	const bobSignedPreKey = keyhelper.generateSignedPreKey(bobIdentity, 1)
	const bobPreKey = keyhelper.generatePreKey(31337)

	bob.setIdentity(bobIdentity, bobRegistrationId)
	await bob.storeSignedPreKey(1, bobSignedPreKey.keyPair)
	await bob.storePreKey(31337, bobPreKey.keyPair)

	const aliceIdentity = keyhelper.generateIdentityKeyPair()
	alice.setIdentity(aliceIdentity, keyhelper.generateRegistrationId())

	const aliceAddress = new ProtocolAddress('alice', 1)
	const bobAddress = new ProtocolAddress('bob', 1)

	/** upstream's API is initOutgoing(bundle) — the same call src/Signal/libsignal.ts makes */
	const builder = new SessionBuilder(alice, bobAddress)
	await builder.initOutgoing({
		registrationId: bobRegistrationId,
		identityKey: bobIdentity.pubKey,
		signedPreKey: { keyId: 1, publicKey: bobSignedPreKey.keyPair.pubKey, signature: bobSignedPreKey.signature },
		preKey: { keyId: 31337, publicKey: bobPreKey.keyPair.pubKey }
	})

	const aliceCipher = new SessionCipher(alice, bobAddress)
	const { body } = await aliceCipher.encrypt(Buffer.from('hello from the port'))

	/** a pre-key message is decrypted with decryptPreKeyWhisperMessage */
	const bobCipher = new SessionCipher(bob, aliceAddress)
	const decrypted = await bobCipher.decryptPreKeyWhisperMessage(Buffer.from(body), 'binary')

	assert.equal(Buffer.from(decrypted).toString(), 'hello from the port', 'the round trip returns the plaintext')
})

test('signal: the helpers this build relies on are present', () => {
	for (const fn of ['generateKeyPair', 'calculateAgreement', 'calculateSignature', 'verifySignature']) {
		assert.equal(typeof curve[fn], 'function', `curve.${fn} must exist`)
	}

	for (const fn of ['generateIdentityKeyPair', 'generateRegistrationId', 'generateSignedPreKey', 'generatePreKey']) {
		assert.equal(typeof keyhelper[fn], 'function', `keyhelper.${fn} must exist`)
	}

	for (const api of [ProtocolAddress, SessionBuilder, SessionCipher, SessionRecord]) {
		assert.equal(typeof api, 'function')
	}
})
