/**
 * send-group-v4-invite.ts
 * Source: src/Socket/messages-send.ts
 *
 * `sendGroupV4Invite` (+ `sendGroupInviteV4` alias) — sends a WhatsApp v4
 * group-invite message directly to a participant, and `sendGroupInvite` —
 * adds a participant via `groupParticipantsUpdate`, automatically falling
 * back to a v4 invite when WhatsApp refuses the direct add (status 403).
 * Imported back into makeMessagesSocket.
 */
import type { GroupInviteAttemptResult, MiscMessageGenerationOptions, WAMessage } from '../Types'
import type { ParticipantAction } from '../Types/GroupMetadata'
import { generateWAMessageFromContent } from '../Utils/messages'
import type { BinaryNode } from '../WABinary'

export interface GroupParticipantUpdateResult {
	status: string
	jid: string | undefined
	content: BinaryNode
}

export interface SendGroupV4InviteDeps {
	/** `authState.creds.me!.id` — the sender's own jid. */
	meId: string
	relayMessage: (jid: string, message: any, opts: any) => Promise<any>
	groupMetadata: (jid: string) => Promise<{ subject: string }>
	profilePictureUrl: (jid: string, type: 'image' | 'preview') => Promise<string | undefined>
	groupParticipantsUpdate: (
		jid: string,
		participants: string[],
		action: ParticipantAction
	) => Promise<GroupParticipantUpdateResult[]>
	httpRequestOptions?: any
	/** Override for tests; defaults to the real `generateWAMessageFromContent`. */
	generateWAMessageFromContentFn?: typeof generateWAMessageFromContent
}

/**
 * Sends a WhatsApp v4 group-invite message directly to `participant`
 * (not to the group itself). Lower-level than `content.groupInvite`:
 * it doesn't auto-fetch a group profile picture — pass `jpegThumbnail`
 * yourself if you want one shown. Shared implementation behind
 * `sock.sendGroupV4Invite`, `sock.sendGroupInviteV4`, and the
 * `sendMessage(jid, { sendGroupV4Invite / sendGroupInviteV4 })` content keys.
 */
export async function sendGroupV4Invite(
	deps: SendGroupV4InviteDeps,
	groupJid: string,
	participant: string,
	inviteCode: string,
	inviteExpiration?: number,
	groupName?: string,
	caption?: string,
	jpegThumbnail?: Buffer,
	options: MiscMessageGenerationOptions = {}
): Promise<WAMessage> {
	const generateFn = deps.generateWAMessageFromContentFn ?? generateWAMessageFromContent
	const msg = generateFn(
		participant,
		{
			groupInviteMessage: {
				inviteCode,
				inviteExpiration: Number(inviteExpiration) || Date.now() + 3 * 86400000,
				groupJid,
				groupName,
				jpegThumbnail,
				caption
			}
		},
		{ userJid: deps.meId, ...options }
	)

	await deps.relayMessage(participant, msg.message!, { messageId: msg.key.id! })
	return msg
}

/** Downloads the group's display picture as a Buffer, or undefined if it has none / the fetch fails. */
async function fetchGroupJpegThumbnail(deps: SendGroupV4InviteDeps, groupJid: string): Promise<Buffer | undefined> {
	const pfpUrl = await deps.profilePictureUrl(groupJid, 'image').catch(() => undefined)
	if (!pfpUrl) return undefined

	const resp = await fetch(pfpUrl, { method: 'GET', dispatcher: deps.httpRequestOptions?.dispatcher })
	if (!resp.ok) return undefined

	return Buffer.from(await resp.arrayBuffer())
}

// Other statuses `groupParticipantsUpdate` can return for a participant,
// besides '200' (added) and '403' (needs a v4 invite — handled separately,
// see sendGroupInvite below). Not exhaustive — WhatsApp can still send an
// undocumented code, which falls back to a generic message.
const GROUP_ADD_STATUS_MESSAGES: Record<string, string> = {
	'401': 'Not authorized to add this participant (blocked by their privacy settings)',
	'404': 'Not a WhatsApp user',
	'408': 'No response — participant may have add-requests disabled',
	'409': 'Already a participant of this group',
	'500': 'WhatsApp server error while adding this participant'
}

/**
 * Adds `user` to `groupJid` via `groupParticipantsUpdate`. If WhatsApp
 * refuses the direct add (status 403 — e.g. the group requires an
 * invite), automatically falls back to sending that participant a v4
 * group-invite message (`sendGroupV4Invite` above) using the invite
 * code/expiration WhatsApp returned in the 403 response, with the
 * group's own display picture as the thumbnail. Any other non-200 status
 * (401, 404, 408, 409, 500, ...) is reported as-is via `GROUP_ADD_STATUS_MESSAGES`,
 * with `invited: false` — no invite is sent for those.
 */
export async function sendGroupInvite(
	deps: SendGroupV4InviteDeps,
	groupJid: string,
	user: string
): Promise<GroupInviteAttemptResult[]> {
	const response = await deps.groupParticipantsUpdate(groupJid, [user], 'add')

	const results: GroupInviteAttemptResult[] = []

	for (const participant of response) {
		const participantJid = (participant.content.attrs.phone_number || participant.content.attrs.jid) as string
		const status = participant.status

		if (status === '403') {
			// WhatsApp returns the invite code/expiration inline on the
			// participant node when a direct add is refused.
			// content is `BinaryNode[] | string | Uint8Array` — narrow to the array case.
			const participantChildren = participant.content.content
			const addRequestNode = Array.isArray(participantChildren) ? participantChildren[0] : undefined
			const inviteCode = addRequestNode?.attrs.code
			const inviteExpiration = addRequestNode?.attrs.expiration

			if (inviteCode) {
				const { subject: groupName } = await deps.groupMetadata(groupJid)
				const jpegThumbnail = await fetchGroupJpegThumbnail(deps, groupJid)

				await sendGroupV4Invite(
					deps,
					groupJid,
					participantJid,
					inviteCode,
					inviteExpiration ? Number(inviteExpiration) : undefined,
					groupName,
					'Invitation to join my WhatsApp group',
					jpegThumbnail
				)
			}

			results.push({
				jid: participantJid,
				status,
				invited: true,
				message: 'Could not be added directly (403) — sent a v4 group invite instead'
			})
		} else if (status === '200') {
			results.push({
				jid: participantJid,
				status,
				invited: false,
				message: 'Added directly via groupParticipantsUpdate'
			})
		} else {
			results.push({
				jid: participantJid,
				status,
				invited: false,
				message: GROUP_ADD_STATUS_MESSAGES[status] ?? `Could not be added (status ${status})`
			})
		}
	}

	return results
}
