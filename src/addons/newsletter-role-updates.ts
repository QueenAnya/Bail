/**
 * newsletter-role-updates.ts
 *
 * Builds and emits `newsletter-participants.update` events for
 * `NotificationNewsletterAdminPromote` / `NotificationNewsletterAdminDemote`
 * mex newsletter notifications.
 *
 * `NotificationNewsletterAdminDemote` was routed to
 * `handleLegacyMexNewsletterNotification` (see the opName switch in
 * Socket/messages-recv.ts) but had no case of its own there, so every
 * demotion fell through to the "unhandled mex newsletter notification"
 * default and never emitted an event. `emitNewsletterRoleUpdate` covers
 * both promote and demote from one place so that gap can't reopen.
 *
 * Source: innovatorssoft/Baileys commit 170c5af ("Handle newsletter role
 * updates safely") — ported the author/user empty-string fallback from
 * that fix; the missing Demote case itself is specific to this fork's
 * handleLegacyMexNewsletterNotification split, not something upstream
 * needed to fix.
 */
import type { BaileysEventEmitter } from '../Types'

export type NewsletterRoleUpdateAction = 'promote' | 'demote'

const ROLE_BY_ACTION: Record<NewsletterRoleUpdateAction, string> = {
	promote: 'ADMIN',
	demote: 'SUBSCRIBER'
}

/**
 * `updates` comes from `JSON.parse`d mex notification content, so it's
 * untyped at the call site; each entry is expected to carry `jid` and
 * `user` when it represents a role change.
 */
export const emitNewsletterRoleUpdate = (
	ev: BaileysEventEmitter,
	updates: Array<{ jid?: string; user?: string }>,
	author: string | undefined,
	action: NewsletterRoleUpdateAction
): void => {
	for (const update of updates) {
		if (update.jid && update.user) {
			ev.emit('newsletter-participants.update', {
				id: update.jid,
				author: author ?? '',
				user: update.user,
				new_role: ROLE_BY_ACTION[action],
				action
			})
		}
	}
}
