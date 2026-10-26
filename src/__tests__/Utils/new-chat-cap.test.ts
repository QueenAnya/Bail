import { describe, expect, it } from '@jest/globals'
import { NewChatMessageCappingStatusType, QueryIds } from '../../Types'
import { parseNewChatMessageCap } from '../../Utils/new-chat-cap'

describe('parseNewChatMessageCap', () => {
	it('reads the quota, cycle and status of a healthy account', () => {
		const cap = parseNewChatMessageCap({
			total_quota: 50,
			used_quota: 12,
			cycle_start_timestamp: '1700000000',
			cycle_end_timestamp: '1700600000',
			server_sent_timestamp: '1700100000',
			capping_status: NewChatMessageCappingStatusType.NONE
		})

		expect(cap).toMatchObject({
			status: 'NONE',
			capped: false,
			warned: false,
			unlimited: false,
			totalQuota: 50,
			usedQuota: 12,
			remaining: 38,
			cycleStart: 1700000000,
			cycleEnd: 1700600000,
			serverTime: 1700100000
		})
	})

	it('flags both warning steps as warned and CAPPED as capped', () => {
		for (const status of [
			NewChatMessageCappingStatusType.FIRST_WARNING,
			NewChatMessageCappingStatusType.SECOND_WARNING
		]) {
			expect(parseNewChatMessageCap({ capping_status: status, total_quota: 10, used_quota: 9 })).toMatchObject({
				capped: false,
				warned: true
			})
		}

		expect(
			parseNewChatMessageCap({
				capping_status: NewChatMessageCappingStatusType.CAPPED,
				total_quota: 10,
				used_quota: 10
			})
		).toMatchObject({ capped: true, warned: false, remaining: 0 })
	})

	it('never reports a negative remaining quota', () => {
		expect(parseNewChatMessageCap({ total_quota: 5, used_quota: 9 }).remaining).toBe(0)
	})

	it('reports an account without a quota as unlimited', () => {
		expect(parseNewChatMessageCap({})).toMatchObject({ status: 'NONE', unlimited: true, remaining: null })
		expect(parseNewChatMessageCap({ total_quota: -1, used_quota: 3 })).toMatchObject({
			unlimited: true,
			remaining: null
		})
		expect(parseNewChatMessageCap(undefined)).toMatchObject({ unlimited: true, capped: false, warned: false })
	})

	it('passes the verification / subscription fields through and keeps the raw reply', () => {
		const response = {
			total_quota: 1,
			ote_status: 'ELIGIBLE',
			mv_status: 'ACTIVE',
			subscription_status: 'SUBSCRIBED'
		} as never
		const cap = parseNewChatMessageCap(response)
		expect(cap).toMatchObject({ oteStatus: 'ELIGIBLE', mvStatus: 'ACTIVE', subscriptionStatus: 'SUBSCRIBED' })
		expect(cap.response).toBe(response)
	})
})

describe('new chat cap query', () => {
	it('uses the persisted query id of WAWebMexFetchNewChatMessageCappingInfoJobQuery', () => {
		expect(QueryIds.MESSAGE_CAPPING_INFO).toBe('27910975521856601')
	})
})
