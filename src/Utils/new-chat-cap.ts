import { type NewChatMessageCap, type NewChatMessageCapInfo, NewChatMessageCappingStatusType } from '../Types'

const toNumber = (value: unknown) => {
	const parsed = Number.parseInt(String(value ?? ''), 10)
	return Number.isFinite(parsed) ? parsed : undefined
}

/**
 * Turns the raw `xwa2_message_capping_info` reply into the object returned by `sock.fetchNewChatMessageCap()`.
 * No quota (or a negative one) means the account has nothing to count down, so it is reported as `unlimited`.
 */
export const parseNewChatMessageCap = (response: NewChatMessageCapInfo | null | undefined): NewChatMessageCap => {
	const totalQuota = toNumber(response?.total_quota)
	const usedQuota = toNumber(response?.used_quota)
	const status = response?.capping_status ?? NewChatMessageCappingStatusType.NONE
	const unlimited = totalQuota === undefined || totalQuota < 0
	return {
		status,
		capped: status === NewChatMessageCappingStatusType.CAPPED,
		warned:
			status === NewChatMessageCappingStatusType.FIRST_WARNING ||
			status === NewChatMessageCappingStatusType.SECOND_WARNING,
		unlimited,
		totalQuota,
		usedQuota,
		remaining: unlimited ? null : Math.max(totalQuota - (usedQuota ?? 0), 0),
		cycleStart: toNumber(response?.cycle_start_timestamp),
		cycleEnd: toNumber(response?.cycle_end_timestamp),
		serverTime: toNumber(response?.server_sent_timestamp),
		oteStatus: response?.ote_status,
		mvStatus: response?.mv_status,
		subscriptionStatus: response?.subscription_status,
		response: response ?? undefined
	}
}
