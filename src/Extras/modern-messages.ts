/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT) - Utils/modern-messages.js, rewritten in TypeScript.
 *
 * Content keys for the newer WhatsApp message types, converted into raw `proto.Message` content:
 *   question, questionReply, questionResponse, statusQuestionAnswer, statusQuoted, statusStickerInteraction,
 *   statusNotification, newsletterAdminInvite, newsletterFollowerInvite, pollAddOption, comment, eventInvite,
 *   scheduledCall, scheduledCallEdit, groupStatusReaction, statusMention
 * plus the helper keys newsletterStatus / groupStatusAttribution / statusAttributions / statusAudience / addYours /
 * messageAssociation that decorate any other content.
 *
 * `prepareModernMessageContent` runs in front of `sock.sendMessage` (see Extras/socket.ts), so
 *   sock.sendMessage(jid, { question: { text: 'Favourite colour?' } })
 * just works.
 *
 * `PollAddOptionMessage` / `EventInviteMessage` are attached under `proto.Message` by Utils/proto-compat.ts
 * (this WAProto keeps them flat); `pollAddOption` and `eventInvite` throw a clear error only if neither exists. `NEWSLETTER_STATUS` (attribution type 9) is sent as its number.
 */
import { proto } from '../../WAProto/index.js'

const requireObject = (value: any, name: string) => {
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		throw new TypeError(`${name} must be an object`)
	}

	return value
}

const requireKey = (value: any, name = 'key') => {
	requireObject(value, name)
	if (!value.id) {
		throw new TypeError(`${name}.id is required`)
	}

	return value
}

const enumValue = (enumObject: any, value: any, fallback: number | undefined): number | undefined => {
	if (typeof value === 'number') return value
	if (typeof value === 'string') {
		const key = value.trim().toUpperCase()
		if (key in enumObject) return enumObject[key]!
	}

	return fallback
}

/** `StatusAttribution.Type.NEWSLETTER_STATUS` (not named in this WAProto) */

export const STATUS_NOTIFICATION_TYPES: Readonly<Record<string, number>> = Object.freeze({
	...proto.Message.StatusNotificationMessage.StatusNotificationType,
	STATUS_GROUP_STATUS_REPLY: 4
})

const toSeconds = (value: any) => (value instanceof Date ? Math.floor(value.getTime() / 1000) : value)
const toMilliseconds = (value: any) => (value instanceof Date ? value.getTime() : value)

const makeInnerCommentMessage = (content: any) => {
	const data = requireObject(content, 'comment.content')
	if (data.raw && typeof data.raw === 'object') return data.raw
	if (typeof data.text === 'string') {
		return {
			extendedTextMessage: proto.Message.ExtendedTextMessage.create({ text: data.text, contextInfo: data.contextInfo })
		}
	}

	const keys = Object.keys(data)
	if (keys.some(key => key.endsWith('Message'))) return data
	throw new TypeError('comment.content supports text, raw, or protobuf message fields')
}

export const makeQuestionMessage = (input: any) => {
	const data = requireObject(input, 'question')
	if (typeof data.text !== 'string' || !data.text.length) {
		throw new TypeError('question.text is required')
	}

	return {
		questionMessage: proto.Message.FutureProofMessage.create({
			message: {
				extendedTextMessage: proto.Message.ExtendedTextMessage.create({
					text: data.text,
					contextInfo: { ...(data.contextInfo || {}), isQuestion: true }
				})
			}
		})
	}
}

export const makeQuestionResponseMessage = (input: any) => {
	const data = requireObject(input, 'questionResponse')
	requireKey(data.key, 'questionResponse.key')
	return {
		questionResponseMessage: proto.Message.QuestionResponseMessage.create({ key: data.key, text: data.text ?? '' })
	}
}

export const makeQuestionReplyMessage = (input: any) => {
	const data = requireObject(input, 'questionReply')
	if (typeof data.text !== 'string' || !data.text.length) {
		throw new TypeError('questionReply.text is required')
	}

	if (data.serverQuestionId === undefined || data.serverQuestionId === null) {
		throw new TypeError('questionReply.serverQuestionId is required')
	}

	const quoted: Record<string, any> = { serverQuestionId: Number(data.serverQuestionId) }
	if (data.quotedQuestion) quoted.quotedQuestion = data.quotedQuestion
	if (data.quotedResponse) quoted.quotedResponse = data.quotedResponse
	return {
		questionReplyMessage: proto.Message.FutureProofMessage.create({
			message: {
				extendedTextMessage: proto.Message.ExtendedTextMessage.create({
					text: data.text,
					contextInfo: { ...(data.contextInfo || {}), questionReplyQuotedMessage: quoted }
				})
			}
		})
	}
}

export const makeStatusQuestionAnswerMessage = (input: any) => {
	const data = requireObject(input, 'statusQuestionAnswer')
	requireKey(data.key, 'statusQuestionAnswer.key')
	return {
		statusQuestionAnswerMessage: proto.Message.StatusQuestionAnswerMessage.create({
			key: data.key,
			text: data.text ?? ''
		})
	}
}

export const makeStatusQuotedMessage = (input: any) => {
	const data = requireObject(input, 'statusQuoted')
	requireKey(data.originalStatusId, 'statusQuoted.originalStatusId')
	const type = enumValue(
		proto.Message.StatusQuotedMessage.StatusQuotedMessageType,
		data.type,
		proto.Message.StatusQuotedMessage.StatusQuotedMessageType.QUESTION_ANSWER
	)
	return {
		statusQuotedMessage: proto.Message.StatusQuotedMessage.create({
			type,
			text: data.text,
			thumbnail: data.thumbnail,
			originalStatusId: data.originalStatusId
		})
	}
}

export const makeStatusStickerInteractionMessage = (input: any) => {
	const data = requireObject(input, 'statusStickerInteraction')
	requireKey(data.key, 'statusStickerInteraction.key')
	if (!data.stickerKey) {
		throw new TypeError('statusStickerInteraction.stickerKey is required')
	}

	const type = enumValue(
		proto.Message.StatusStickerInteractionMessage.StatusStickerType,
		data.type,
		proto.Message.StatusStickerInteractionMessage.StatusStickerType.REACTION
	)
	return {
		statusStickerInteractionMessage: proto.Message.StatusStickerInteractionMessage.create({
			key: data.key,
			stickerKey: data.stickerKey,
			type
		})
	}
}

export const makeStatusNotificationMessage = (input: any) => {
	const data = requireObject(input, 'statusNotification')
	requireKey(data.responseMessageKey, 'statusNotification.responseMessageKey')
	requireKey(data.originalMessageKey, 'statusNotification.originalMessageKey')
	const type = enumValue(STATUS_NOTIFICATION_TYPES, data.type, STATUS_NOTIFICATION_TYPES.UNKNOWN)
	return {
		statusNotificationMessage: proto.Message.StatusNotificationMessage.create({
			responseMessageKey: data.responseMessageKey,
			originalMessageKey: data.originalMessageKey,
			type
		})
	}
}

export const makeNewsletterAdminInviteMessage = (input: any) => {
	const data = requireObject(input, 'newsletterAdminInvite')
	if (!data.newsletterJid) {
		throw new TypeError('newsletterAdminInvite.newsletterJid is required')
	}

	return {
		newsletterAdminInviteMessage: proto.Message.NewsletterAdminInviteMessage.create({
			newsletterJid: data.newsletterJid,
			newsletterName: data.newsletterName,
			jpegThumbnail: data.jpegThumbnail,
			caption: data.caption,
			inviteExpiration: data.inviteExpiration,
			contextInfo: data.contextInfo
		})
	}
}

export const makeNewsletterFollowerInviteMessage = (input: any) => {
	const data = requireObject(input, 'newsletterFollowerInvite')
	if (!data.newsletterJid) {
		throw new TypeError('newsletterFollowerInvite.newsletterJid is required')
	}

	return {
		newsletterFollowerInviteMessageV2: proto.Message.NewsletterFollowerInviteMessage.create({
			newsletterJid: data.newsletterJid,
			newsletterName: data.newsletterName,
			jpegThumbnail: data.jpegThumbnail,
			caption: data.caption,
			contextInfo: data.contextInfo
		})
	}
}

export const makePollAddOptionMessage = (input: any) => {
	const data = requireObject(input, 'pollAddOption')
	requireKey(data.pollCreationMessageKey, 'pollAddOption.pollCreationMessageKey')
	const addOption = typeof data.option === 'string' ? { optionName: data.option } : data.addOption || data.option
	if (!addOption?.optionName) {
		throw new TypeError('pollAddOption.option is required')
	}

	return {
		// @ts-expect-error the generated d.ts declares this flat; Utils/proto-compat.ts attaches it under Message
		pollAddOptionMessage: proto.Message.PollAddOptionMessage.create({
			pollCreationMessageKey: data.pollCreationMessageKey,
			addOption,
			metadata: data.metadata
		})
	}
}

export const makeCommentMessage = (input: any) => {
	const data = requireObject(input, 'comment')
	requireKey(data.targetMessageKey, 'comment.targetMessageKey')
	const message = data.message || (data.content ? makeInnerCommentMessage(data.content) : null)
	requireObject(message, 'comment.message')
	return {
		commentMessage: proto.Message.CommentMessage.create({ message, targetMessageKey: data.targetMessageKey })
	}
}

export const makeEventInviteMessage = (input: any) => {
	const data = requireObject(input, 'eventInvite')
	if (!data.eventId) {
		throw new TypeError('eventInvite.eventId is required')
	}

	return {
		// @ts-expect-error the generated d.ts declares this flat; Utils/proto-compat.ts attaches it under Message
		eventInviteMessage: proto.Message.EventInviteMessage.create({
			contextInfo: data.contextInfo,
			eventId: data.eventId,
			eventTitle: data.eventTitle,
			jpegThumbnail: data.jpegThumbnail,
			startTime: toSeconds(data.startTime),
			caption: data.caption,
			isCanceled: data.isCanceled,
			endTime: toSeconds(data.endTime),
			callLink: data.callLink
		})
	}
}

export const makeScheduledCallCreationMessage = (input: any) => {
	const data = requireObject(input, 'scheduledCall')
	if (!data.scheduledTimestampMs) {
		throw new TypeError('scheduledCall.scheduledTimestampMs is required')
	}

	const callType = enumValue(
		proto.Message.ScheduledCallCreationMessage.CallType,
		data.callType,
		proto.Message.ScheduledCallCreationMessage.CallType.UNKNOWN
	)
	return {
		scheduledCallCreationMessage: proto.Message.ScheduledCallCreationMessage.create({
			scheduledTimestampMs: toMilliseconds(data.scheduledTimestampMs),
			callType,
			title: data.title
		})
	}
}

export const makeScheduledCallEditMessage = (input: any) => {
	const data = requireObject(input, 'scheduledCallEdit')
	requireKey(data.key, 'scheduledCallEdit.key')
	const editType = enumValue(
		proto.Message.ScheduledCallEditMessage.EditType,
		data.editType,
		proto.Message.ScheduledCallEditMessage.EditType.CANCEL
	)
	return {
		scheduledCallEditMessage: proto.Message.ScheduledCallEditMessage.create({ key: data.key, editType })
	}
}

export const makeGroupStatusReactionMessage = (input: any) => {
	const data = requireObject(input, 'groupStatusReaction')
	requireKey(data.key, 'groupStatusReaction.key')
	return {
		groupStatusMessageV2: proto.Message.FutureProofMessage.create({
			message: {
				reactionMessage: proto.Message.ReactionMessage.create({
					key: data.key,
					text: data.text ?? '',
					groupingKey: data.groupingKey,
					senderTimestampMs: data.senderTimestampMs || Date.now()
				})
			}
		})
	}
}

export const makeNewsletterStatusAttribution = (input: any) => {
	const data = requireObject(input, 'newsletterStatus')
	if (!data.newsletterJid) {
		throw new TypeError('newsletterStatus.newsletterJid is required')
	}

	if (data.messageId === undefined || data.messageId === null) {
		throw new TypeError('newsletterStatus.messageId is required')
	}

	return proto.StatusAttribution.create({
		type: proto.StatusAttribution.Type.NEWSLETTER_STATUS,
		actionUrl: data.actionUrl,
		statusReshare: {
			source: proto.StatusAttribution.StatusReshare.Source.CHANNEL_RESHARE,
			metadata: {
				duration: data.duration,
				channelJid: data.newsletterJid,
				channelMessageId: Number(data.messageId),
				hasMultipleReshares: data.hasMultipleReshares ?? false
			}
		}
	})
}

export const makeGroupStatusAttribution = (input: any) => {
	const data = requireObject(input, 'groupStatusAttribution')
	if (!data.authorJid) {
		throw new TypeError('groupStatusAttribution.authorJid is required')
	}

	return proto.StatusAttribution.create({
		type: proto.StatusAttribution.Type.GROUP_STATUS,
		actionUrl: data.actionUrl,
		groupStatus: { authorJid: data.authorJid }
	})
}

export const STATUS_AUDIENCE_DEFAULT_LIST_NAME = 'Close friends'
export const STATUS_AUDIENCE_DEFAULT_EMOJI = '⭐'

export const makeStatusAudienceMetadata = (input: any) => {
	const data = typeof input === 'string' ? { listName: input } : requireObject(input, 'statusAudience')
	const audienceType = enumValue(
		proto.ContextInfo.StatusAudienceMetadata.AudienceType,
		data.audienceType,
		proto.ContextInfo.StatusAudienceMetadata.AudienceType.CLOSE_FRIENDS
	)
	const listName = data.listName === undefined ? STATUS_AUDIENCE_DEFAULT_LIST_NAME : String(data.listName)
	const listEmoji = data.listEmoji === undefined ? STATUS_AUDIENCE_DEFAULT_EMOJI : String(data.listEmoji)
	return proto.ContextInfo.StatusAudienceMetadata.create({ audienceType, listName, listEmoji })
}

export const makeMessageAssociation = (input: any) => {
	const data = requireObject(input, 'messageAssociation')
	const parentMessageKey = data.parentMessageKey ?? data.key
	requireKey(parentMessageKey, 'messageAssociation.parentMessageKey')
	const associationType = enumValue(
		proto.MessageAssociation.AssociationType,
		data.associationType ?? data.type,
		proto.MessageAssociation.AssociationType.UNKNOWN
	)
	return proto.MessageAssociation.create({ associationType, parentMessageKey, messageIndex: data.messageIndex })
}

export const makeStatusAddYoursAssociation = (input: any) => {
	const data =
		input && typeof input === 'object' && !Array.isArray(input) && input.id
			? { key: input }
			: requireObject(input, 'addYours')
	const parentMessageKey = data.key ?? data.parentMessageKey
	requireKey(parentMessageKey, 'addYours.key')
	const associationType = enumValue(
		proto.MessageAssociation.AssociationType,
		data.type ?? data.associationType,
		proto.MessageAssociation.AssociationType.STATUS_ADD_YOURS
	)
	return proto.MessageAssociation.create({ associationType, parentMessageKey, messageIndex: data.messageIndex })
}

export const makeStatusMentionMessage = (input: any) => {
	const data = requireObject(input, 'statusMention')
	requireKey(data.key, 'statusMention.key')
	const field = data.group ? 'groupStatusMentionMessage' : 'statusMentionMessage'
	return {
		[field]: proto.Message.FutureProofMessage.create({
			message: {
				protocolMessage: proto.Message.ProtocolMessage.create({
					key: data.key,
					type: proto.Message.ProtocolMessage.Type.STATUS_MENTION_MESSAGE
				})
			}
		})
	}
}

const modernBuilders: [string, (input: any) => Record<string, any>][] = [
	['question', makeQuestionMessage],
	['questionReply', makeQuestionReplyMessage],
	['questionResponse', makeQuestionResponseMessage],
	['statusQuestionAnswer', makeStatusQuestionAnswerMessage],
	['statusQuoted', makeStatusQuotedMessage],
	['statusStickerInteraction', makeStatusStickerInteractionMessage],
	['statusNotification', makeStatusNotificationMessage],
	['newsletterAdminInvite', makeNewsletterAdminInviteMessage],
	['newsletterFollowerInvite', makeNewsletterFollowerInviteMessage],
	['pollAddOption', makePollAddOptionMessage],
	['comment', makeCommentMessage],
	['eventInvite', makeEventInviteMessage],
	['scheduledCall', makeScheduledCallCreationMessage],
	['scheduledCallEdit', makeScheduledCallEditMessage],
	['groupStatusReaction', makeGroupStatusReactionMessage],
	['statusMention', makeStatusMentionMessage]
]

/** Turns the modern content keys above into `{ raw: true, ...protoFields }`; every other content passes through untouched. */
export const prepareModernMessageContent = (content: any): any => {
	if (!content || typeof content !== 'object' || Array.isArray(content)) return content
	const output: Record<string, any> = { ...content }
	const attributions = Array.isArray(output.contextInfo?.statusAttributions)
		? [...output.contextInfo.statusAttributions]
		: []
	if (output.newsletterStatus) {
		attributions.push(makeNewsletterStatusAttribution(output.newsletterStatus))
		delete output.newsletterStatus
	}

	if (output.groupStatusAttribution) {
		attributions.push(makeGroupStatusAttribution(output.groupStatusAttribution))
		delete output.groupStatusAttribution
	}

	if (Array.isArray(output.statusAttributions)) {
		attributions.push(...output.statusAttributions)
		delete output.statusAttributions
	}

	const carried: string[] = []
	const audience = output.statusAudience
	if (audience !== undefined && audience !== null) {
		carried.push('statusAudience')
		output.contextInfo = { ...(output.contextInfo || {}), statusAudienceMetadata: makeStatusAudienceMetadata(audience) }
		delete output.statusAudience
	}

	if (attributions.length) {
		output.contextInfo = { ...(output.contextInfo || {}), statusAttributions: attributions }
	}

	if (output.addYours !== undefined && output.addYours !== null) {
		carried.push('addYours')
		output.messageAssociation = makeStatusAddYoursAssociation(output.addYours)
		delete output.addYours
	} else if (output.messageAssociation !== undefined && output.messageAssociation !== null) {
		carried.push('messageAssociation')
		output.messageAssociation = makeMessageAssociation(output.messageAssociation)
	}

	for (const [key, builder] of modernBuilders) {
		if (output[key] !== undefined && output[key] !== null) {
			if (carried.length) {
				throw new TypeError(
					`${carried.join(' and ')} cannot be combined with ${key}: ${key} builds its own message and keeps no room for them. ` +
						'Build it with the low-level makers and generateWAMessageFromContent instead.'
				)
			}

			return { raw: true, ...builder(output[key]) }
		}
	}

	return output
}
