import { toNewsletterUserSettingInput } from '../Extras/newsletter-extras'
import type { NewsletterCreateResponse, SocketConfig, WAMediaUpload } from '../Types'
import type { NewsletterMetadata, NewsletterUpdate } from '../Types'
import { QueryIds, XWAPaths } from '../Types'
import { generateProfilePicture } from '../Utils/messages-media'
import { getBinaryNodeChild } from '../WABinary'
import { makeGroupsSocket } from './groups'
import { executeWMexQuery as genericExecuteWMexQuery, wMexQuery } from './mex'

const parseNewsletterCreateResponse = (response: NewsletterCreateResponse): NewsletterMetadata => {
	const { id, thread_metadata: thread, viewer_metadata: viewer } = response
	return {
		id: id,
		owner: undefined,
		name: thread.name.text,
		creation_time: parseInt(thread.creation_time, 10),
		description: thread.description.text,
		invite: thread.invite,
		subscribers: parseInt(thread.subscribers_count, 10),
		verification: thread.verification,
		picture: {
			id: thread.picture.id,
			directPath: thread.picture.direct_path
		},
		mute_state: viewer.mute
	}
}

const parseNewsletterMetadata = (result: unknown): NewsletterMetadata | null => {
	if (typeof result !== 'object' || result === null) {
		return null
	}

	if ('id' in result && typeof result.id === 'string') {
		return result as NewsletterMetadata
	}

	if ('result' in result && typeof result.result === 'object' && result.result !== null && 'id' in result.result) {
		return result.result as NewsletterMetadata
	}

	return null
}

export const makeNewsletterSocket = (config: SocketConfig) => {
	const sock = makeGroupsSocket(config)
	const { query, generateMessageTag } = sock

	const executeWMexQuery = <T>(variables: Record<string, unknown>, queryId: string, dataPath: string): Promise<T> => {
		return genericExecuteWMexQuery<T>(variables, queryId, dataPath, query, generateMessageTag)
	}

	/**
	 * Raw w:mex query, returning the unparsed BinaryNode response — matches the
	 * shape src/Addons/message-utils.ts's MessageExtrasContext expects for
	 * makeMessageExtrasAddon's newsletter-aware profilePictureUrl.
	 */
	const newsletterWMexQuery = (
		variables: Record<string, unknown> | undefined,
		queryId: string,
		options: Record<string, unknown>
	) => wMexQuery({ ...(variables || {}), ...options }, queryId, query, generateMessageTag)

	const newsletterUpdate = async (jid: string, updates: NewsletterUpdate) => {
		const variables = {
			newsletter_id: jid,
			// `settings` must come first: an update that carries its own settings (reaction codes) has to win
			updates: {
				settings: null,
				...updates
			}
		}
		return executeWMexQuery(variables, QueryIds.UPDATE_METADATA, 'xwa2_newsletter_update')
	}

	const newsletterUserSetting = async (
		jid: string,
		type: 'ADMIN_NOTIFICATIONS' | 'FOLLOWER_NOTIFICATIONS',
		muted: boolean
	) => {
		const response = await executeWMexQuery<{ id?: string; state?: { type?: string } }>(
			toNewsletterUserSettingInput(jid, type, muted),
			QueryIds.UPDATE_USER_SETTING,
			XWAPaths.xwa2_newsletter_update_user_setting
		)
		return { id: response?.id ?? jid, state: response?.state?.type }
	}

	return {
		...sock,
		newsletterWMexQuery,
		newsletterCreate: async (name: string, description?: string): Promise<NewsletterMetadata> => {
			const variables = {
				input: {
					name,
					description: description ?? null
				}
			}
			const rawResponse = await executeWMexQuery<NewsletterCreateResponse>(
				variables,
				QueryIds.CREATE,
				XWAPaths.xwa2_newsletter_create
			)
			return parseNewsletterCreateResponse(rawResponse)
		},

		newsletterUpdate,

		newsletterFetchAllParticipating: async () => {
			return executeWMexQuery(
				{ fetch_status_metadata: false, fetch_wamo_sub: false },
				QueryIds.SUBSCRIBED,
				XWAPaths.xwa2_newsletter_subscribed
			)
		},

		/** The followers of a channel (the subscriber *count* is `subscribers` of `newsletterMetadata`). */
		newsletterSubscribers: async (jid: string, options: { count?: number } = {}) => {
			const response = await executeWMexQuery<{
				followers?: {
					edges?: {
						role?: string
						follow_time?: string
						node?: { id?: string; pn?: string; display_name?: string; username_info?: { username?: string } }
					}[]
				}
			}>(
				{ input: { newsletter_id: jid, count: options.count ?? 100 } },
				QueryIds.FOLLOWERS,
				XWAPaths.xwa2_newsletter_followers
			)
			return (response?.followers?.edges ?? []).map(edge => ({
				id: edge?.node?.id,
				phoneNumber: edge?.node?.pn,
				displayName: edge?.node?.display_name,
				username: edge?.node?.username_info?.username,
				role: edge?.role,
				followTime: edge?.follow_time
			}))
		},

		newsletterMetadata: async (
			type: 'invite' | 'jid',
			key: string,
			options: {
				fetchCreationTime?: boolean
				fetchFullImage?: boolean
				fetchViewerMetadata?: boolean
				fetchPinnedMessages?: boolean
				fetchStatusMetadata?: boolean
				fetchWamoSub?: boolean
				viewRole?: string
			} = {}
		) => {
			const inputType = String(type).toUpperCase()
			const variables = {
				fetch_creation_time: options.fetchCreationTime ?? true,
				fetch_full_image: options.fetchFullImage ?? inputType !== 'INVITE',
				fetch_viewer_metadata: options.fetchViewerMetadata ?? true,
				fetch_pinned_messages: options.fetchPinnedMessages ?? false,
				fetch_status_metadata: options.fetchStatusMetadata ?? false,
				fetch_wamo_sub: options.fetchWamoSub ?? false,
				input: {
					key,
					type: inputType,
					...(options.viewRole ? { view_role: options.viewRole } : {})
				}
			}
			const result = await executeWMexQuery<unknown>(variables, QueryIds.METADATA, XWAPaths.xwa2_newsletter_metadata)
			return parseNewsletterMetadata(result)
		},

		newsletterFollow: (jid: string) => {
			return executeWMexQuery({ newsletter_id: jid }, QueryIds.FOLLOW, XWAPaths.xwa2_newsletter_join_v2)
		},

		newsletterUnfollow: (jid: string) => {
			return executeWMexQuery({ newsletter_id: jid }, QueryIds.UNFOLLOW, XWAPaths.xwa2_newsletter_leave_v2)
		},

		// mute / unmute are user settings now (`mute_v2` / `unmute_v2` are no longer served)
		newsletterMute: (jid: string) => newsletterUserSetting(jid, 'ADMIN_NOTIFICATIONS', true),

		newsletterUnmute: (jid: string) => newsletterUserSetting(jid, 'ADMIN_NOTIFICATIONS', false),

		newsletterUpdateName: async (jid: string, name: string) => {
			return await newsletterUpdate(jid, { name })
		},

		newsletterUpdateDescription: async (jid: string, description: string) => {
			return await newsletterUpdate(jid, { description })
		},

		newsletterUpdatePicture: async (jid: string, content: WAMediaUpload) => {
			const { img } = await generateProfilePicture(content)
			return await newsletterUpdate(jid, { picture: img.toString('base64') })
		},

		newsletterRemovePicture: async (jid: string) => {
			return await newsletterUpdate(jid, { picture: '' })
		},

		newsletterReactMessage: async (jid: string, serverId: string, reaction?: string) => {
			await query({
				tag: 'message',
				attrs: {
					to: jid,
					...(reaction ? {} : { edit: '7' }),
					type: 'reaction',
					server_id: serverId,
					id: generateMessageTag()
				},
				content: [
					{
						tag: 'reaction',
						attrs: reaction ? { code: reaction } : {}
					}
				]
			})
		},

		newsletterFetchMessages: async (jid: string, count: number, since: number, after: number) => {
			const messageUpdateAttrs: { count: string; since?: string; after?: string } = {
				count: count.toString()
			}
			if (typeof since === 'number') {
				messageUpdateAttrs.since = since.toString()
			}

			if (after) {
				messageUpdateAttrs.after = after.toString()
			}

			const result = await query({
				tag: 'iq',
				attrs: {
					id: generateMessageTag(),
					type: 'get',
					xmlns: 'newsletter',
					to: jid
				},
				content: [
					{
						tag: 'message_updates',
						attrs: messageUpdateAttrs
					}
				]
			})
			return result
		},

		subscribeNewsletterUpdates: async (jid: string): Promise<{ duration: string } | null> => {
			const result = await query({
				tag: 'iq',
				attrs: {
					id: generateMessageTag(),
					type: 'set',
					xmlns: 'newsletter',
					to: jid
				},
				content: [{ tag: 'live_updates', attrs: {}, content: [] }]
			})
			const liveUpdatesNode = getBinaryNodeChild(result, 'live_updates')
			const duration = liveUpdatesNode?.attrs?.duration
			return duration ? { duration: duration } : null
		},

		newsletterAdminCount: async (jid: string): Promise<number> => {
			const response = await executeWMexQuery<{ admin_count: number }>(
				{ newsletter_id: jid },
				QueryIds.ADMIN_COUNT,
				XWAPaths.xwa2_newsletter_admin_count
			)
			return response.admin_count
		},

		newsletterChangeOwner: async (jid: string, newOwnerJid: string) => {
			await executeWMexQuery(
				{ newsletter_id: jid, user_id: newOwnerJid },
				QueryIds.CHANGE_OWNER,
				XWAPaths.xwa2_newsletter_change_owner
			)
		},

		newsletterDemote: async (jid: string, userJid: string) => {
			await executeWMexQuery({ newsletter_id: jid, user_id: userJid }, QueryIds.DEMOTE, XWAPaths.xwa2_newsletter_demote)
		},

		newsletterDelete: async (jid: string) => {
			await executeWMexQuery({ newsletter_id: jid }, QueryIds.DELETE, XWAPaths.xwa2_newsletter_delete_v2)
		},

		/** Fetch all newsletters this account is subscribed to (like groupFetchAllParticipating, but for newsletters) */
		newsletterSubscribed: async (options: { fetchStatusMetadata?: boolean; fetchWamoSub?: boolean } = {}) => {
			return executeWMexQuery(
				{
					fetch_status_metadata: options.fetchStatusMetadata === true,
					fetch_wamo_sub: options.fetchWamoSub === true
				},
				QueryIds.SUBSCRIBED,
				XWAPaths.xwa2_newsletter_subscribed
			)
		},

		/** Set who can react to newsletter posts ('all' | 'admin' | 'none' / 'blocklist') */
		newsletterReactionMode: async (jid: string, mode: string) => {
			await executeWMexQuery(
				{ newsletter_id: jid, updates: { settings: { reaction_codes: { value: mode } } } },
				QueryIds.JOB_MUTATION,
				'xwa2_newsletter_update'
			)
		},

		/** Generic dispatch to any QueryIds action by name (e.g. 'follow', 'unfollow', 'mute') */
		newsletterAction: async (jid: string, type: keyof typeof QueryIds) => {
			await executeWMexQuery({ newsletter_id: jid }, QueryIds[type], 'xwa2_newsletter_update')
		},

		/**
		 * Fetch newsletter message_updates (state changes like reactions/views
		 * on existing messages, as opposed to newsletterFetchMessages which
		 * fetches the message content itself).
		 */
		newsletterFetchUpdates: async (jid: string, count: number, after?: number, since?: number) => {
			const result = await query({
				tag: 'iq',
				attrs: {
					id: generateMessageTag(),
					type: 'get',
					xmlns: 'newsletter',
					to: jid
				},
				content: [
					{
						tag: 'message_updates',
						attrs: {
							count: count.toString(),
							after: (after ?? 100).toString(),
							since: (since ?? 0).toString()
						}
					}
				]
			})
			return result
		}
	}
}

export type NewsletterSocket = ReturnType<typeof makeNewsletterSocket>
