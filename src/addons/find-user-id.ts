/**
 * find-user-id.ts
 *
 * Resolves a PN or LID jid to both its phone-number and LID forms.
 * Quick helper for callers that need both identifiers from just one.
 */
import { Boom } from '@hapi/boom'
import { isHostedLidUser, isHostedPnUser, isLidUser, isPnUser, jidNormalizedUser } from '../WABinary'

export type UserIdLookup = { lid?: string; phoneNumber?: string }

type LidMappingLookup = {
	getLIDForPN(pn: string): Promise<string | null>
	getPNForLID(lid: string): Promise<string | null>
}

export const findUserId = async (pnOrLid: string, lidMapping: LidMappingLookup): Promise<UserIdLookup> => {
	const normalizedJid = jidNormalizedUser(pnOrLid)
	const userId: UserIdLookup = {
		lid: undefined,
		phoneNumber: undefined
	}
	if (isPnUser(normalizedJid) || isHostedPnUser(normalizedJid)) {
		userId.phoneNumber = normalizedJid
		const lid = await lidMapping.getLIDForPN(normalizedJid)
		userId.lid = lid ? jidNormalizedUser(lid) : undefined
	} else if (isLidUser(normalizedJid) || isHostedLidUser(normalizedJid)) {
		userId.lid = normalizedJid
		const pn = await lidMapping.getPNForLID(normalizedJid)
		userId.phoneNumber = pn ? jidNormalizedUser(pn) : undefined
	} else {
		throw new Boom('Invalid id input to find user ids', { statusCode: 400 })
	}

	return userId
}
