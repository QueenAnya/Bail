// WAProto additions synced from elaina-baileys (21-oct) + the default WhatsApp Web version.
//
// Nothing here talks to WhatsApp: it only encodes and decodes protobuf messages locally,
// so it is a quick way to check that the new fields round-trip after `yarn build`.
//
// Run: node assets/examples/waproto_additions.js
import { DEFAULT_CONNECTION_CONFIG, proto } from '@teamolduser/baileys'

console.log('Default WhatsApp Web version:', DEFAULT_CONNECTION_CONFIG.version.join('.')) // 2.3000.1051456098

const roundTrip = (type, value) => type.decode(type.encode(type.fromObject(value)).finish())

// New top-level types.
console.log(roundTrip(proto.EventInviteAdditionalMetadata, { isUpdated: true }))
console.log(roundTrip(proto.RecoverableHistoryConversation, { historyChatId: '123@s.whatsapp.net', accountLid: '456@lid' }))

// New fields on existing messages.
console.log(roundTrip(proto.Conversation, { id: '123@s.whatsapp.net', acp2HistoryWithheld: true }))
console.log(
	roundTrip(proto.HistorySync, {
		syncType: 0,
		omittedConversationsProvided: true,
		omittedConversations: [{ historyChatId: '123@s.whatsapp.net' }]
	})
)
console.log(
	roundTrip(proto.MsgOpaqueData, {
		musicData: { songId: 'song-1', title: 'Title', author: 'Author', style: 1, isExplicit: false }
	})
)
console.log(
	roundTrip(proto.SyncActionValue, {
		sharedDeviceSecretAction: { secret: Buffer.from('secret'), ttlMs: 60000 },
		communityNestingStateAction: { nestingState: 1 }
	})
)
console.log(roundTrip(proto.DeviceCapabilities, { hostWriteMutationSupport: { mutationNames: ['a', 'b'] } }))

// Message.requestLocationMessage / requestLocationUpdateMessage use empty placeholder types:
// they encode/decode, and any real contents are kept as unknown fields.
console.log(roundTrip(proto.Message, { requestLocationMessage: {}, requestLocationUpdateMessage: {} }))

// BotUserSelectionMode now uses the latest names.
console.log(proto.BotModeSelectionMetadata.BotUserSelectionMode) // { '0': 'DEFAULT_MODE', '1': 'THINK_HARD_MODE', ... }
