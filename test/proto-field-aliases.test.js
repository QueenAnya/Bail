import { test } from 'node:test'
import assert from 'node:assert/strict'

/** loading the package applies the proto-compat shim */
await import('../lib/index.js')

const { proto } = await import('../WAProto/index.js')
const { FIELD_ALIASES_APPLIED } = await import('../lib/Utils/proto-compat.js')

/**
 * Four fields were renamed to elaina's spelling so the wire schema and the generated types agree:
 *
 *   oldestMessageTimestamp   -> oldestMessageTimestampInWindow
 *   hideVoterNames           -> hideParticipantName
 *   deviceID                 -> deviceId
 *   deviceAgentID            -> deviceAgentId
 *
 * The old names are kept as accessors on the generated prototypes, so code written against them keeps working and
 * still writes the one real field. These tests prove the alias is a view, not a second field.
 */

test('proto field aliases: all four are installed', () => {
	assert.equal(FIELD_ALIASES_APPLIED, true)
})

test('proto field aliases: reading the old name reads the new field', () => {
	const meta = proto.Message.MessageHistoryMetadata.create({ oldestMessageTimestampInWindow: 5 })
	assert.equal(meta.oldestMessageTimestamp, 5)

	const poll = proto.Message.PollCreationMessage.create({ hideParticipantName: true })
	assert.equal(poll.hideVoterNames, true)

	const agent = proto.SyncActionValue.AgentAction.create({ deviceId: 7 })
	assert.equal(agent.deviceID, 7)

	const assignment = proto.SyncActionValue.ChatAssignmentAction.create({ deviceAgentId: 'x' })
	assert.equal(assignment.deviceAgentID, 'x')
})

test('proto field aliases: writing the old name writes the new field, not a second one', () => {
	const meta = proto.Message.MessageHistoryMetadata.create({})
	meta.oldestMessageTimestamp = 9
	assert.equal(meta.oldestMessageTimestampInWindow, 9)

	/** the encoded object carries the new name only — there is no duplicate on the wire */
	const asObject = proto.Message.MessageHistoryMetadata.toObject(meta)
	assert.equal(asObject.oldestMessageTimestampInWindow, 9)
	assert.equal(Object.prototype.hasOwnProperty.call(asObject, 'oldestMessageTimestamp'), false)
})

test('proto field aliases: the alias survives a protobuf round trip', () => {
	const poll = proto.Message.PollCreationMessage.create({})
	poll.hideVoterNames = true

	const decoded = proto.Message.PollCreationMessage.decode(proto.Message.PollCreationMessage.encode(poll).finish())
	assert.equal(decoded.hideParticipantName, true, 'the real field is set')
	assert.equal(decoded.hideVoterNames, true, 'and the old name still reads it')
})
