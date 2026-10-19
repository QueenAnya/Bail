/**
 * addon: past-participants
 * Source patch: Baileys-pastParticepnts
 *
 * Adds:
 *   - pastParticipants field on history sync events
 *   - GroupParticipant.authorPn — phone-number JID of the actor
 *   - handlePastParticipants() — processes proto.IPastParticipants[]
 *     and returns structured GroupPastParticipant[]
 *
 * The patch replaces chunkOrder with pastParticipants in history sync events.
 * groups.ts emit now includes authorPn from actingParticipantPn.
 */

import { proto } from '../../WAProto/index.js'

export type GroupPastParticipant = {
	/** JID of the participant */
	jid: string
	/** LID JID if available */
	lid?: string
	/** ISO timestamp when they left/were removed */
	leaveTs?: number
	/** How they left: 'left' | 'removed' */
	leaveReason?: 'left' | 'removed'
}

export type GroupPastParticipantsResult = {
	/** Group JID */
	groupJid: string
	participants: GroupPastParticipant[]
}

/**
 * Process proto.IPastParticipants[] from a history sync payload.
 * Returns a structured list per group.
 */
export const processPastParticipants = (
	pastParticipantsList: proto.IPastParticipants[]
): GroupPastParticipantsResult[] => {
	return pastParticipantsList.map(pp => {
		const groupJid = pp.groupJid ?? ''
		const participants: GroupPastParticipant[] = (pp.pastParticipants ?? []).map(p => ({
			jid: p.userJid ?? '',
			leaveTs: p.leaveTs ? Number(p.leaveTs) : undefined,
			leaveReason:
				p.leaveReason === proto.PastParticipant.LeaveReason.LEFT
					? 'left'
					: p.leaveReason === proto.PastParticipant.LeaveReason.REMOVED
						? 'removed'
						: undefined
		}))
		return { groupJid, participants }
	})
}

/**
 * Check if a history sync event contains past participants data.
 * (pastParticipants field replaces chunkOrder in this patch)
 */
export const hasPastParticipants = (event: { pastParticipants?: proto.IPastParticipants[] | null }): boolean => {
	return Array.isArray(event.pastParticipants) && event.pastParticipants.length > 0
}
