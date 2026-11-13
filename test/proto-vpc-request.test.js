import { test } from 'node:test'
import assert from 'node:assert/strict'
import { proto } from '../WAProto/index.js'

/**
 * `Message.vpcRequestMessage` (tag 139) is referenced by elaina-baileys 1.4.9 but `proto.Message.VpcRequestMessage` is
 * never defined there. Rather than drop the field — which would silently lose whatever a real client sends — the type is
 * generated with no declared fields and its decode keeps the payload verbatim in `$unknowns`, which encode writes back.
 */
test('vpcRequestMessage is field 139 on the wire', () => {
	const inner = Buffer.from([0x08, 0x2a])
	const buf = Buffer.from(proto.Message.encode(proto.Message.create({ vpcRequestMessage: { $unknowns: [inner] } })).finish())

	// tag 139 is a two byte varint: 0xDA 0x08
	assert.equal(buf[0], 0xda)
	assert.equal(buf[1], 0x08)
	assert.equal(buf[2], inner.length, 'length-delimited, so the length follows the tag')
})

test('an unknown vpcRequestMessage payload survives decode and re-encode', () => {
	const inner = Buffer.from([0x08, 0x2a, 0x12, 0x03, 0x61, 0x62, 0x63])
	const original = Buffer.from(proto.Message.encode(proto.Message.create({ vpcRequestMessage: { $unknowns: [inner] } })).finish())

	const back = proto.Message.decode(original)
	assert.ok(back.vpcRequestMessage, 'the nested message is decoded, not skipped')
	const kept = Buffer.concat((back.vpcRequestMessage.$unknowns ?? []).map(u => Buffer.from(u)))
	assert.deepEqual(kept, inner, 'the payload comes back byte for byte')
	assert.deepEqual(Buffer.from(proto.Message.encode(back).finish()), original, 're-encoding is identical')
})

test('messages without the field are untouched', () => {
	const buf = proto.Message.encode(proto.Message.create({ conversation: 'hi' })).finish()
	const back = proto.Message.decode(buf)
	assert.equal(back.conversation, 'hi')
	assert.equal(back.vpcRequestMessage, undefined)
})
