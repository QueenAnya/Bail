import { proto } from '../../WAProto/index.js'
import type { WAMessage } from '../Types/Message.js'
import { generateWAMessage } from '../Utils/messages.js'

/**
 * Generate and relay a Group Status (groupStatusMessageV2) using the
 * official WhiskeySockets message-generation/relay primitives.
 *
 * This is the extracted helper form of the `groupStatus: true` shorthand:
 *
 *   await sock.sendMessage(groupJid, { text: 'Hello', groupStatus: true })
 *
 * The normal `sendMessage(..., { groupStatus: true })` API remains supported.
 * This helper is useful when callers want an explicit socket method.
 */
export async function sendGroupStatus(
	sock: any,
	groupJid: string,
	content: Record<string, any>,
	options: Record<string, any> = {}
): Promise<WAMessage> {
	if (!sock?.relayMessage) throw new Error('sendGroupStatus: sock is required')
	if (!groupJid?.endsWith('@g.us')) {
		throw new Error(`sendGroupStatus: invalid group JID: ${groupJid}`)
	}

	if (!content || typeof content !== 'object' || Array.isArray(content)) {
		throw new Error('sendGroupStatus: content must be an object')
	}

	// Generate the ordinary inner message first so text/media/document/audio
	// content is prepared exactly like a normal Baileys message. Do not pass
	// groupStatus here: this helper performs the wrapper explicitly below.
	const generated = await generateWAMessage(groupJid, content as any, {
		...options,
		userJid: sock.user?.id,
		logger: sock.logger,
		upload: sock.waUploadToServer
	})

	if (!generated?.message) {
		throw new Error('sendGroupStatus: failed to generate message')
	}

	const message = generated.message
	const messageType = Object.keys(message).find(
		key => key !== 'messageContextInfo' && key !== 'senderKeyDistributionMessage'
	)

	if (!messageType) {
		throw new Error('sendGroupStatus: unable to determine message type')
	}

	const innerMessage = proto.Message.create(message)
	const inner = (innerMessage as any)[messageType]

	if (inner && typeof inner === 'object') {
		const contextInfo = { ...(inner.contextInfo || {}) }
		contextInfo.isGroupStatus = true
		if (contextInfo.pairedMediaType === undefined) contextInfo.pairedMediaType = 0
		if (contextInfo.forwardingScore === undefined) contextInfo.forwardingScore = 0
		if (!contextInfo.featureEligibilities) {
			contextInfo.featureEligibilities = { canBeReshared: true, canReceiveMultiReact: true }
		}

		if (sock.user?.id && !contextInfo.statusAttributions?.length) {
			contextInfo.statusAttributions = [{ type: 5 /* GROUP_STATUS */, groupStatus: { authorJid: sock.user.id } }]
		}

		inner.contextInfo = contextInfo
	}

	const wrappedMessage = proto.Message.create({
		groupStatusMessageV2: {
			message: innerMessage
		}
	})

	await sock.relayMessage(groupJid, wrappedMessage, {
		...options,
		messageId: generated.key.id
	})

	return {
		...generated,
		message: wrappedMessage
	}
}
