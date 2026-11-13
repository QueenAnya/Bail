import '../Utils/proto-compat'

/** The elaina-baileys release this layer was ported from, and the release it was last checked against. */
export const PORTED_FROM = Object.freeze({
	portedFrom: 'elaina-baileys 1.4.x (forked upstream at 1.4.5)',
	recheckedAgainst: 'elaina-baileys 1.4.7',
	recheckedOn: '2026-10-28',
	/** every export of the 1.4.7 source tree resolves somewhere in this repo (712/712 names) */
	exportSurfaceMatches: true,
	/** `node scripts/audit-elaina-parity.mjs` compares the ported modules after type-stripping */
	byteIdenticalModules: '15/15'
})

/**
 * src/Extras
 *
 * Features ported from other Baileys forks (each file names its source and license in its header).
 * Same idea as `src/Addons`, kept separate so it is clear where the code came from.
 *
 *   Database auth states   -> usePostgresAuthState, useMySQLAuthState, useRedisAuthState, useRedisAuthState2,
 *                             useNekoDBAuth,
 *                             useMongoAuthState2, useSqliteAuthState2, useTursoAuthState,
 *                             makeAuthStateFromStore (source: @rexxhayanasi/elaina-baileys)
 *   Newsletter extras      -> makeNewsletterExtras (admin invites / info, followers, insights, directory, recommended,
 *                             enforcements, reports, pin, labels, poll votes ...)
 *   Chats extras           -> getUsername / removeUsername / checkUsernameAvailability / getUsernames / removeUsernamePin,
 *                             fetchAbout, updateTextStatus, notices, opt-out list, push settings, server link preview,
 *                             reportSpam, fetchProps / getServerProps, checkAccountHealth
 *   Messages extras        -> sendHD, sendImgVid (motion photo), removeMemberLabel, resetGroupSenderKey,
 *                             groupQuery, communityQuery, executeWMexQuery
 *   Newsletter status      -> sendNewsletterStatus, sendNewsletterStatusReaction, revokeNewsletterStatus,
 *                             getNewsletterStatuses, getNewsletterStatusUpdates
 *   Modern messages        -> question / comment / statusMention / statusQuoted ... content keys (modern-messages.ts),
 *                             split payment + payment reminder (payment-messages.ts), music + status stickers
 *                             (status-stickers.ts), scheduled message helpers (scheduled-message.ts)
 *   Elaina-only modules    -> group-metadata-cache, ttl-cache, sender-key-memory, optional-media, native-flow,
 *                             html-app, html-multiplayer, link-preview-metadata, voice-recognition and the
 *                             MessageBuilder/ folder (AIRich / A2UI / Bloks / Meta AI sections / bot signature)
 */
export * from './auth-store'
export * from './store-exports'
export * from './use-postgres-auth-state'
export * from './use-mysql-auth-state'
export * from './use-redis-auth-state'
export * from './use-redis-auth-state2'
export * from './use-nekodb-auth-state'
export * from './use-nedb-auth-state'
export * from './use-turso-auth-state'
export * from './use-mongo-auth-state2'
export * from './use-sqlite-auth-state2'
export * from './newsletter-extras'
export * from './chats-extras'
export * from './messages-extras'
export * from './newsletter-status'
export * from './newsletter-status-socket'
export * from './modern-messages'
export * from './payment-messages'
export * from './scheduled-message'
export * from './status-stickers'
export * from './socket'
export * from './group-metadata-cache'
export * from './ttl-cache'
export * from './sender-key-memory'
export * from './optional-media'
export * from './native-flow'
export * from './html-app'
export * from './html-multiplayer'
export * from './link-preview-metadata'
export * from './voice-recognition'
// Register Elaina-compatible static helpers once; keep this as the single public export barrel.
import './MessageBuilder/attach-static-helpers'
export * from './MessageBuilder/index'
export * from './MessageBuilder/extras'
export * from './MessageBuilder/metaai'
export * from './MessageBuilder/bot-signature'
export * from './messages-helpers'
// Explicit V2 aliases of the Elaina-derived names (CarouselV2 = Elaina 'Carousel', ...), see README "Elaina name compatibility"
export * from './v2'

// VoIP is published through the merged src/Voip API; original implementation snapshots
// were dropped from this tree; the merged implementation lives in `src/Voip/` and is what gets exported.
