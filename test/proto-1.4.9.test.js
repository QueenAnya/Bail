import { test } from 'node:test'
import assert from 'node:assert/strict'
import { proto } from '../WAProto/index.js'

/**
 * Elaina 1.4.9 added six messages that Anya's WAProto did not carry. They are spliced into the generated file by hand
 * (see WAProto/README note) because Anya's codec is a patched protobufjs build, so a stock regeneration would rewrite
 * the whole file. These tests pin the wire shape so a future regeneration cannot silently drop them.
 */
const cases = [
	['StatusAttribution.StatusTemplate', proto.StatusAttribution.StatusTemplate, { templateId: 't1', templateName: 'n', thumbnailUrl: 'u' }],
	['DeviceCapabilities.PhoneNumberSharing', proto.DeviceCapabilities.PhoneNumberSharing, { phoneSharingSupported: true }],
	['ClientPayload.IntegrationAttestation', proto.ClientPayload.IntegrationAttestation, { staticUnbound: 'a', onlineSigned: 'b' }],
	[
		'MembershipFormKeyFingerprintVerification',
		proto.MembershipFormKeyFingerprintVerification,
		{ requestId: 'r1', keyId: 'k1', keyFingerprint: Buffer.from([1, 2, 3]) }
	],
	['GroupRootKeyRequest', proto.GroupRootKeyRequest, { keyId: 'k2' }],
	['GroupRootKey', proto.GroupRootKey, { keyId: 'k3', rootKey: Buffer.from([9, 8]), isCurrent: true }]
]

for (const [name, Type, value] of cases) {
	test(`${name} round-trips`, () => {
		assert.equal(typeof Type, 'function', `${name} is generated into the proto`)

		const buf = Type.encode(Type.create(value)).finish()
		const decoded = Type.toObject(Type.decode(buf), { bytes: Array })
		const expected = Type.toObject(Type.fromObject(value), { bytes: Array })
		assert.deepEqual(decoded, expected, 'decode matches the value that went in')
		assert.equal(Type.encode(Type.fromObject(value)).finish().length, buf.length, 'fromObject encodes the same bytes')
	})
}

test('the parents can carry the new fields', () => {
	const pm = proto.Message.ProtocolMessage.create({
		groupRootKeyRequest: { keyId: 'k' },
		membershipFormKeyFingerprintVerification: { requestId: 'r', keyId: 'k2' }
	})
	const back = proto.Message.ProtocolMessage.decode(proto.Message.ProtocolMessage.encode(pm).finish())
	assert.equal(back.groupRootKeyRequest.keyId, 'k')
	assert.equal(back.membershipFormKeyFingerprintVerification.requestId, 'r')

	const cp = proto.ClientPayload.decode(
		proto.ClientPayload.encode(proto.ClientPayload.create({ integrationAttestation: { staticUnbound: 'x' } })).finish()
	)
	assert.equal(cp.integrationAttestation.staticUnbound, 'x')

	const dc = proto.DeviceCapabilities.decode(
		proto.DeviceCapabilities.encode(proto.DeviceCapabilities.create({ phoneNumberSharing: { phoneSharingSupported: true } }))
			.finish()
	)
	assert.equal(dc.phoneNumberSharing.phoneSharingSupported, true)

	const sa = proto.StatusAttribution.decode(
		proto.StatusAttribution.encode(proto.StatusAttribution.create({ statusTemplate: { templateId: 'id' } })).finish()
	)
	assert.equal(sa.statusTemplate.templateId, 'id')
})
