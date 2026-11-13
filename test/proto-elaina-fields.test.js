import { test } from 'node:test'
import assert from 'node:assert/strict'
import { proto } from '../WAProto/index.js'

/**
 * Fields elaina-baileys 1.4.9 carries that Anya's WAProto did not. `ChatSolidColorWallpaper.backgroundLightArgb` and
 * `backgroundDarkArgb` reuse tags 1 and 2, which already hold `colorLight` and `colorDark`: a `.proto` cannot repeat a
 * number, so those two live only in the generated codec, where the decoder picks the field from the wire type.
 */
const cases = [
	['Account.pnLearnState', proto.Account, { pnLearnState: 2 }],
	['ChatSolidColorWallpaper.doodleLightArgb', proto.ChatSolidColorWallpaper, { doodleLightArgb: 3 }],
	['ClientPairingProps.isCompanionRegistrationFgsEnabled', proto.ClientPairingProps, { isCompanionRegistrationFgsEnabled: true }],
	['EventInviteMessage.status', proto.EventInviteMessage, { status: 1 }],
	['MemberLabel.showAdminBadge', proto.MemberLabel, { showAdminBadge: true }],
	[
		'MsgOpaqueData.sharableEventInvite*',
		proto.MsgOpaqueData,
		{
			sharableEventInviteStatus: 's',
			sharableEventInviteLocationName: 'l',
			sharableEventInviteCoverImageHandle: 'h',
			sharableEventInviteLastUpdatedTsUsec: 123
		}
	],
	['SettingsSyncAction.mediaAutoDownloadQuality', proto.SettingsSyncAction, { mediaAutoDownloadQuality: 3 }],
	['WebMessageInfo.groupHistoryLastCountedMessageTimestamp', proto.WebMessageInfo, { groupHistoryLastCountedMessageTimestamp: 987654321 }]
]

for (const [label, Type, value] of cases) {
	test(`${label} survives a round-trip`, () => {
		const buf = Type.encode(Type.create(value)).finish()
		const back = Type.toObject(Type.decode(buf), { bytes: Array, longs: Number })
		for (const key of Object.keys(value)) {
			assert.ok(key in back, `${key} decoded`)
		}
		assert.equal(Type.encode(Type.fromObject(value)).finish().length, buf.length, 'fromObject matches create')
	})
}

test('the message-typed fields point at real types', () => {
	const conv = proto.Conversation.create({ groupRootKeys: [{ keys: [] }] })
	const convBack = proto.Conversation.decode(proto.Conversation.encode(conv).finish())
	assert.ok(Array.isArray(convBack.groupRootKeys), 'Conversation.groupRootKeys decodes to an array')

	const pm = proto.Message.ProtocolMessage.create({ groupRootKeyShare: { keys: [] } })
	const pmBack = proto.Message.ProtocolMessage.decode(proto.Message.ProtocolMessage.encode(pm).finish())
	assert.ok(pmBack.groupRootKeyShare, 'ProtocolMessage.groupRootKeyShare decodes')
})

test('ChatSolidColorWallpaper serves both fields that share tags 1 and 2', () => {
	// wire type 5 = the fixed32 colour, wire type 2 = the string colour
	const argb = proto.ChatSolidColorWallpaper.create({ backgroundLightArgb: 0xff112233, backgroundDarkArgb: 0x44556677 })
	const argbBuf = Buffer.from(proto.ChatSolidColorWallpaper.encode(argb).finish())
	assert.equal(argbBuf[0], 0x0d, 'tag 1, wire type 5')
	assert.deepEqual(proto.ChatSolidColorWallpaper.toObject(proto.ChatSolidColorWallpaper.decode(argbBuf)), {
		backgroundLightArgb: 0xff112233,
		backgroundDarkArgb: 0x44556677
	})

	const text = proto.ChatSolidColorWallpaper.create({ colorLight: '#fff', colorDark: '#000' })
	const textBuf = Buffer.from(proto.ChatSolidColorWallpaper.encode(text).finish())
	assert.equal(textBuf[0], 0x0a, 'tag 1, wire type 2')
	assert.deepEqual(proto.ChatSolidColorWallpaper.toObject(proto.ChatSolidColorWallpaper.decode(textBuf)), {
		colorLight: '#fff',
		colorDark: '#000'
	})
})
