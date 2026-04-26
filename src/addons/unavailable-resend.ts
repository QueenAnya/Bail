/**
 * unavailable-resend.ts
 * Ported from @innovatorssoft/baileys
 *
 * Handles "unavailable" message nodes by requesting a placeholder resend
 * from the user's phone via PeerDataOperation.
 *
 * This is a standalone utility — integrate it into your messages-recv handler
 * by calling handleUnavailableMessage() when you detect an unavailable node.
 */

import { Boom } from '@hapi/boom'
import { proto } from '../../WAProto/index.js'
import { delay } from '../Utils/generics.js'
import type { AuthenticationState } from '../Types/Auth.js'
import type { ILogger } from '../Utils/logger.js'
import type { proto as WAProto } from '../../WAProto/index.js'

export type PlaceholderResendCache = {
	get: (key: string) => boolean | undefined
	set: (key: string, value: boolean) => void
	del: (key: string) => void
}

export type UnavailableResendPrimitives = {
	authState: { creds: AuthenticationState['creds'] }
	logger: ILogger
	placeholderResendCache: PlaceholderResendCache
	/**
	 * sendPeerDataOperationMessage — available in the socket scope.
	 * Signature mirrors the one in messages-recv.
	 */
	sendPeerDataOperationMessage: (msg: object) => Promise<unknown>
}

export const makeUnavailableResendHandler = (primitives: UnavailableResendPrimitives) => {
	const { authState, logger, placeholderResendCache, sendPeerDataOperationMessage } = primitives

	/**
	 * Request a placeholder resend for an unavailable message.
	 * Returns 'RESOLVED' if the message arrived before the 5s wait elapsed.
	 */
	const requestPlaceholderResend = async (messageKey: WAProto.IMessageKey): Promise<'RESOLVED' | unknown> => {
		if (!authState.creds.me?.id) {
			throw new Boom('Not authenticated')
		}

		if (placeholderResendCache.get(messageKey.id!)) {
			logger.debug({ messageKey }, 'already requested resend')
			return
		}

		placeholderResendCache.set(messageKey.id!, true)

		await delay(5000)

		if (!placeholderResendCache.get(messageKey.id!)) {
			logger.debug({ messageKey }, 'message received while resend requested')
			return 'RESOLVED'
		}

		const pdoMessage = {
			placeholderMessageResendRequest: [{ messageKey }],
			peerDataOperationRequestType: proto.Message.PeerDataOperationRequestType.PLACEHOLDER_MESSAGE_RESEND
		}

		// Auto-clear after 15s if no response (phone may be offline)
		setTimeout(() => {
			if (placeholderResendCache.get(messageKey.id!)) {
				logger.debug({ messageKey }, 'PDO without response after 15s — phone possibly offline')
				placeholderResendCache.del(messageKey.id!)
			}
		}, 15_000)

		return sendPeerDataOperationMessage(pdoMessage)
	}

	return { requestPlaceholderResend }
}
