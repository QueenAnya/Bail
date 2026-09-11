/**
 * media-set.ts
 * Profile-picture setters (full/panoramic variants) and group-status /
 * member-label senders.
 *
 * Ported from a user-supplied `media-set.js`, which imported its WA
 * primitives from the published `@queenanya/baileys` package (as an
 * external consumer would). Since this file now lives *inside* the
 * queenanya package itself, those imports were changed to relative
 * internal paths instead.
 *
 * NOTE ON DUPLICATE-LOOKING SETTERS: `updateProfilePictureFull` and
 * `updateProfilePictureFull2` are genuinely different, not duplicates —
 * the first sends the `img` buffer from `generateProfilePictureFP`
 * (scaled-to-fit 720x720 main image), the second sends the `preview`
 * buffer from `generatePP` (normalized preview). Both are kept.
 */

import { randomBytes } from 'node:crypto'
import type { WASocket } from '../index.js'
import type { AnyMessageContent } from '../Types/index.js'
import { generateWAMessageContent, generateWAMessageFromContent, unixTimestampSeconds } from '../Utils/index.js'
import { S_WHATSAPP_NET } from '../WABinary/index.js'
import { generatePP, generateProfilePictureFP } from './media-messages.js'

/** Update the profile picture for yourself or a group — sends the main (scaled-to-fit) image. */
export const updateProfilePictureFull = async (jid: string, content: Buffer | string, sock: WASocket) => {
	const { query } = sock
	const { img } = await generateProfilePictureFP(content)
	const media = await query({
		tag: 'iq',
		attrs: {
			target: jid,
			to: S_WHATSAPP_NET,
			type: 'set',
			xmlns: 'w:profile:picture'
		},
		content: [
			{
				tag: 'picture',
				attrs: { type: 'image' },
				content: img
			}
		]
	})
	return media
}

/** Update the profile picture for yourself or a group — sends the normalized preview image. */
export const updateProfilePictureFull2 = async (jid: string, content: Buffer | string, sock: WASocket) => {
	const { query } = sock
	const { preview } = await generatePP(content)
	const media = await query({
		tag: 'iq',
		attrs: {
			target: jid,
			to: S_WHATSAPP_NET,
			type: 'set',
			xmlns: 'w:profile:picture'
		},
		content: [
			{
				tag: 'picture',
				attrs: { type: 'image' },
				content: preview
			}
		]
	})
	return media
}

type GroupStatusContent = AnyMessageContent & { backgroundColor?: string }

/** Send a group status (status update visible only within a group's members). */
export const groupStatus = async (jid: string, content: GroupStatusContent, sock: WASocket) => {
	const { backgroundColor, ...rest } = content

	const inside = await generateWAMessageContent(rest, {
		upload: sock.waUploadToServer,
		backgroundColor
	})

	const messageSecret = randomBytes(32)

	const m = generateWAMessageFromContent(
		jid,
		{
			messageContextInfo: { messageSecret },
			groupStatusMessageV2: {
				message: {
					...inside,
					messageContextInfo: { messageSecret }
				}
			}
		},
		{} as any
	)

	await sock.relayMessage(jid, m.message!, { messageId: m.key.id! })
	return m
}

/** Send the same group status to multiple groups at once. */
export const groupStatusV2 = async (jids: string[], content: GroupStatusContent, sock: WASocket) => {
	const { backgroundColor, ...rest } = content

	const inside = await generateWAMessageContent(rest, {
		upload: sock.waUploadToServer,
		backgroundColor
	})

	const messageSecret = randomBytes(32)
	const results = []

	for (const id of jids) {
		const m = generateWAMessageFromContent(
			id,
			{
				messageContextInfo: { messageSecret },
				groupStatusMessageV2: {
					message: {
						...inside,
						messageContextInfo: { messageSecret }
					}
				}
			},
			{} as any
		)

		await sock.relayMessage(id, m.message!, { messageId: m.key.id! })
		results.push(m)
	}

	return results
}

/**
 * Set/update a member's label in a group (awaits the relay and returns the result).
 * Label is truncated to 30 characters (WA's limit).
 */
export const groupSetMemberLabel = async (jid: string, memberLabel: string, sock: WASocket) => {
	const result = await sock.relayMessage(
		jid,
		{
			protocolMessage: {
				type: 30,
				memberLabel: {
					label: memberLabel.slice(0, 30),
					labelTimestamp: unixTimestampSeconds() || Date.now()
				}
			}
		},
		{
			additionalNodes: [
				{
					tag: 'meta',
					attrs: {
						tag_reason: 'user_update',
						appdata: 'member_tag'
					},
					content: undefined
				}
			]
		}
	)
	return result
}

/**
 * Set/update a member's label in a group — fire-and-forget variant (errors
 * are swallowed, matching the source's behavior; prefer
 * `groupSetMemberLabel` if you need to await/observe failures).
 */
export const groupLabel = async (jid: string, text: string, sock: WASocket): Promise<void> => {
	try {
		void sock.relayMessage(
			jid,
			{
				protocolMessage: {
					type: 30,
					memberLabel: {
						label: text.slice(0, 30),
						labelTimestamp: Date.now()
					}
				}
			},
			{
				additionalNodes: [
					{
						tag: 'meta',
						attrs: {
							tag_reason: 'user_update',
							appdata: 'member_tag'
						},
						content: undefined
					}
				]
			}
		)
	} catch {
		// intentionally swallowed — matches source behavior
	}
}
