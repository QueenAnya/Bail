/**
 * Restores the nested proto types that this WAProto build leaves flat.
 *
 * The generated `WAProto/index.js` defines `ConditionalRevealMessage`, `PollAddOptionMessage` and friends, but
 * attaches some of them to the exported namespace instead of to `proto.Message`. Elaina's code addresses them as
 * `proto.Message.X` — a path that is undefined here — so ported code either hardcodes the enum values or resolves
 * the path at call time. Both work; neither is the same code as upstream.
 *
 * This module attaches the missing aliases once, at load time, so the ported modules can use upstream's exact
 * expressions and stay byte-identical. It only adds aliases that point at the generated classes; nothing is
 * re-implemented. If a future WAProto build nests these types properly, every assignment here is a no-op.
 */
import { proto } from '../../WAProto/index.js'

const NESTED_ON_MESSAGE = ['ConditionalRevealMessage', 'PollAddOptionMessage', 'EventInviteMessage'] as const

const messageNamespace = proto.Message as unknown as Record<string, unknown>
const flatNamespace = proto as unknown as Record<string, unknown>

for (const name of NESTED_ON_MESSAGE) {
	if (messageNamespace[name] === undefined && flatNamespace[name] !== undefined) {
		messageNamespace[name] = flatNamespace[name]
	}
}

export const PROTO_COMPAT_APPLIED = NESTED_ON_MESSAGE.every(name => messageNamespace[name] !== undefined)

/**
 * Field-name aliases.
 *
 * Four fields carry elaina's name now (`oldestMessageTimestampInWindow`, `hideParticipantName`, `deviceId`,
 * `deviceAgentId`) because that is what the wire schema calls them. The names this package used before are still
 * supported: each one is a getter/setter pair on the generated prototype, so reading or writing the old name reads
 * and writes the same slot. Nothing is duplicated on the wire — one field, two names.
 */
const FIELD_ALIASES: Array<{ type: any; from: string; to: string }> = [
	{ type: proto.Message?.MessageHistoryMetadata, from: 'oldestMessageTimestamp', to: 'oldestMessageTimestampInWindow' },
	{ type: proto.Message?.PollCreationMessage, from: 'hideVoterNames', to: 'hideParticipantName' },
	{ type: proto.SyncActionValue?.AgentAction, from: 'deviceID', to: 'deviceId' },
	{ type: proto.SyncActionValue?.ChatAssignmentAction, from: 'deviceAgentID', to: 'deviceAgentId' }
]

for (const { type, from, to } of FIELD_ALIASES) {
	if (!type?.prototype || from in type.prototype) {
		continue
	}

	Object.defineProperty(type.prototype, from, {
		configurable: true,
		enumerable: false,
		get(this: Record<string, unknown>) {
			return this[to]
		},
		set(this: Record<string, unknown>, value: unknown) {
			this[to] = value
		}
	})
}

/** true when every legacy field name resolves to its replacement */
export const FIELD_ALIASES_APPLIED = FIELD_ALIASES.every(({ type, from }) =>
	Boolean(type?.prototype && from in type.prototype)
)
