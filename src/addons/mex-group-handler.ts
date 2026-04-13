/**
 * MEX Group/Community Notification Handler Addon
 * Ported from innovatorssoft/Baileys.
 *
 * Extends the existing WS `mex` notification handler to also handle
 * group member-link and community-owner-change MEX operations
 * (which WhiskeySockets does not handle).
 *
 * Usage — call inside `messages-recv.ts` mex case, after the existing
 * newsletter handler:
 * ```ts
 * case 'mex':
 *     await handleMexNewsletterNotification(node)
 *     handleMexGroupNotification(id, node)
 *     break
 * ```
 */

import type { BaileysEventEmitter } from '../Types'
import type { BinaryNode } from '../WABinary'
import { MexUpdatesOperations, XWAPathsMexUpdates } from './mex-updates-types'

// WS MexOperations (already in WS Newsletter.ts)
const MexOperationsLocal = {
	UPDATE: 'NotificationNewsletterUpdate',
	PROMOTE: 'NotificationNewsletterAdminPromote',
	DEMOTE: 'NotificationNewsletterAdminDemote'
} as const

export interface MexGroupHandlerContext {
	ev: BaileysEventEmitter
	logger: { debug: (...a: unknown[]) => void; error: (...a: unknown[]) => void }
}

/**
 * Handle MEX notifications for groups and communities.
 * Emits:
 * - `groups.update`          when group member-link mode changes
 * - `limit-sharing.update`   when group limit-sharing changes
 * - `community-owner.update` when community owner changes
 * - `newsletter-participants.update` for promote/demote operations
 */
export const makeMexGroupHandler = (ctx: MexGroupHandlerContext) => {
	const { ev, logger } = ctx

	const handleMexGroupNotification = (id: string, node: BinaryNode): void => {
		try {
			const operation = node?.attrs?.op_name
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const content: any = node?.content ? JSON.parse((node.content as Buffer).toString()) : null

			if (!content) return

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let contentPath: any
			let action: string | undefined

			if (operation === MexOperationsLocal.UPDATE) {
				// Newsletter settings update — already handled by WS
				return
			} else if (operation === MexUpdatesOperations.GROUP_MEMBER_LINK) {
				contentPath = content.data?.[XWAPathsMexUpdates.GROUP_SHARING_CHANGE]
				if (contentPath) {
					ev.emit('groups.update', [
						{
							id,
							author: contentPath.updated_by?.id,
							member_link_mode: contentPath.properties?.member_link_mode
						}
					])
				}
			} else if (operation === MexUpdatesOperations.GROUP_LIMIT_SHARING) {
				contentPath = content.data?.[XWAPathsMexUpdates.GROUP_SHARING_CHANGE]
				if (contentPath) {
					ev.emit(
						'limit-sharing.update' as keyof typeof ev,
						{
							id,
							author: contentPath.updated_by?.pn || contentPath.updated_by?.id,
							action: `${contentPath.properties?.limit_sharing?.limit_sharing_enabled ? 'on' : 'off'}`,
							trigger: contentPath.properties?.limit_sharing?.limit_sharing_trigger,
							update_time: contentPath.update_time
						} as unknown as Parameters<typeof ev.emit>[1]
					)
				}
			} else if (operation === MexUpdatesOperations.OWNER_COMMUNITY) {
				contentPath = content.data?.[XWAPathsMexUpdates.COMMUNITY_OWNER_CHANGE]
				if (contentPath) {
					ev.emit(
						'community-owner.update' as keyof typeof ev,
						{
							id,
							author: contentPath.updated_by?.pn || contentPath.updated_by?.id,
							user: contentPath.role_updates?.[0]?.user?.pn || contentPath.role_updates?.[0]?.user?.jid,
							new_role: contentPath.role_updates?.[0]?.new_role,
							update_time: contentPath.update_time
						} as unknown as Parameters<typeof ev.emit>[1]
					)
				}
			} else {
				if (operation === MexOperationsLocal.PROMOTE) {
					action = 'promote'
					// Handled by WS newsletter handler
					return
				} else if (operation === MexOperationsLocal.DEMOTE) {
					action = 'demote'
					return
				}

				if (!action) {
					logger.debug({ id, operation, content }, 'unknown or malformed mex group notification')
				}
			}
		} catch (error) {
			logger.error({ id, node, error }, 'error in handleMexGroupNotification')
		}
	}

	return { handleMexGroupNotification }
}
