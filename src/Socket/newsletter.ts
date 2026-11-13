import { Boom } from '@hapi/boom'
import { createHash } from 'crypto'
import { proto } from '../../WAProto/index.js'
import { toNewsletterUserSettingInput } from '../Extras/newsletter-extras'
import { toNewsletterServerId } from '../Extras/newsletter-status'
import type { NewsletterCreateResponse, SocketConfig, WAMediaUpload } from '../Types'
import type { NewsletterMetadata, NewsletterUpdate } from '../Types'
import { QueryIds, XWAPaths } from '../Types'
import { generateProfilePicture } from '../Utils/messages-media'
import { extractNewsletterMessageMeta } from '../Utils/newsletter-meta'
import { getBinaryNodeChild, getBinaryNodeChildren } from '../WABinary'
import { S_WHATSAPP_NET } from '../WABinary/jid-utils'
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

const NEWSLETTER_REACTION_SETTINGS = new Set(['ALL', 'BASIC', 'NONE', 'BLOCKLIST'])

/** Accept one id or many and return them as server ids. */
export const toNewsletterServerIds = (serverIds: string | string[]): string[] => {
	const list = Array.isArray(serverIds) ? serverIds : [serverIds]
	if (!list.length) {
		throw new TypeError('a newsletter server id is required')
	}

	return list.map(id => toNewsletterServerId(id))
}

const decodeNewsletterPlaintext = (plaintextNode: any): any => {
	if (!plaintextNode?.content) {
		return undefined
	}

	const buffer =
		typeof plaintextNode.content === 'string'
			? Buffer.from(plaintextNode.content, 'binary')
			: Buffer.from(plaintextNode.content)

	return proto.Message.decode(buffer).toJSON()
}

const decodeNewsletterMessageNodes = (parentNode: any, newsletterJid: string, logger?: any): any[] => {
	const messages: any[] = []
	for (const child of getBinaryNodeChildren(parentNode, 'message')) {
		const plaintextNode = getBinaryNodeChild(child, 'plaintext')
		if (!plaintextNode?.content) {
			continue
		}

		try {
			const fullMessage: any = proto.WebMessageInfo.fromObject({
				key: {
					remoteJid: newsletterJid,
					id: child.attrs.id || child.attrs.server_id,
					fromMe: child.attrs.is_sender === 'true'
				},
				message: decodeNewsletterPlaintext(plaintextNode),
				messageTimestamp: child.attrs.t ? +child.attrs.t : undefined
			}).toJSON()
			if (child.attrs.server_id) {
				fullMessage.key.server_id = child.attrs.server_id
			}

			const meta: any = extractNewsletterMessageMeta(child)
			if (meta) {
				fullMessage.newsletterMeta = meta
				if (meta.adminProfile?.name) {
					fullMessage.pushName = meta.adminProfile.name
				}
			}

			messages.push(fullMessage)
		} catch (error) {
			logger?.error?.({ error }, 'Failed to decode newsletter message')
		}
	}

	return messages
}

export const makeNewsletterSocket = (config: SocketConfig) => {
	const sock = makeGroupsSocket(config)
	const { query, generateMessageTag } = sock

	const executeWMexQuery = <T>(variables: Record<string, unknown>, queryId: string, dataPath: string): Promise<T> => {
		return genericExecuteWMexQuery<T>(variables, queryId, dataPath, query, generateMessageTag)
	}

	/** my_addons fetch — used by newsletterMyAddOns / newsletterStatusMyAddOns */
	const fetchMyAddOns = async (options: Record<string, any>, type?: string): Promise<any[]> => {
		const attrs: Record<string, string> = { limit: String(options.limit ?? 100) }
		if (type) {
			attrs.type = type
		}

		if (options.jid) {
			attrs.jid = options.jid
		}

		const result = await query({
			tag: 'iq',
			attrs: { id: generateMessageTag(), type: 'get', xmlns: 'newsletter', to: S_WHATSAPP_NET },
			content: [{ tag: 'my_addons', attrs, content: undefined }]
		})
		const addOns = getBinaryNodeChild(result, 'my_addons')
		if (!addOns) {
			return []
		}

		return getBinaryNodeChildren(addOns, 'messages').map((group: any) => ({
			jid: group.attrs?.jid,
			messages: getBinaryNodeChildren(group, 'message').map((entry: any) => {
				const reaction = getBinaryNodeChild(entry, 'reaction')
				const votes = getBinaryNodeChild(entry, 'votes')
				return {
					serverId: entry.attrs?.server_id ? Number(entry.attrs.server_id) : undefined,
					reaction: reaction
						? { code: reaction.attrs?.code, t: reaction.attrs?.t ? Number(reaction.attrs.t) : undefined }
						: undefined,
					pollVote: votes
						? {
								t: votes.attrs?.t ? Number(votes.attrs.t) : undefined,
								hashes: getBinaryNodeChildren(votes, 'vote').map((vote: any) =>
									Buffer.from(vote.content ?? []).toString('hex')
								)
							}
						: undefined
				}
			})
		}))
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

		/**
		 * Generic dispatch to any QueryIds action by name (e.g. 'follow', 'unfollow', 'mute').
		 *
		 * Restored on request. It is user-called only — nothing in the library invokes it — but it can issue a follow
		 * by name, so `test/no-auto-follow.test.js` keeps it honest: the only place `QueryIds[...]` may be indexed is
		 * this one method, and no code may call it on its own.
		 */
		newsletterAction: async (jid: string, type: keyof typeof QueryIds) => {
			await executeWMexQuery<any>({ newsletter_id: jid }, QueryIds[type], 'xwa2_newsletter_update')
		},

		newsletterFollow: (jid: string) => {
			return executeWMexQuery({ newsletter_id: jid }, QueryIds.FOLLOW, XWAPaths.xwa2_newsletter_join_v2)
		},

		newsletterUnfollow: (jid: string) => {
			return executeWMexQuery({ newsletter_id: jid }, QueryIds.UNFOLLOW, XWAPaths.xwa2_newsletter_leave_v2)
		},

		// mute / unmute are user settings now (`mute_v2` / `unmute_v2` are no longer served)
		/** mute via user settings — the path elaina and this repo's client revision use */
		newsletterMute: (jid: string) => newsletterUserSetting(jid, 'ADMIN_NOTIFICATIONS', true),

		newsletterUnmute: (jid: string) => newsletterUserSetting(jid, 'ADMIN_NOTIFICATIONS', false),

		/**
		 * Mute through the dedicated `mute_v2` query instead of user settings.
		 *
		 * WhiskeySockets and itsliaaa still ship this path; elaina dropped it in favour of
		 * `newsletterUpdateUserSetting`. Kept for client generations that still serve `mute_v2` — if the server
		 * answers 400, the setting-based `newsletterMute` above is the path that works.
		 */
		newsletterMuteLegacy: (jid: string) => {
			return executeWMexQuery({ newsletter_id: jid }, QueryIds.MUTE, XWAPaths.xwa2_newsletter_mute_v2)
		},

		newsletterUnmuteLegacy: (jid: string) => {
			return executeWMexQuery({ newsletter_id: jid }, QueryIds.UNMUTE, XWAPaths.xwa2_newsletter_unmute_v2)
		},

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
			await executeWMexQuery<any>(
				{ newsletter_id: jid, user_id: userJid },
				QueryIds.DEMOTE,
				XWAPaths.xwa2_newsletter_demote
			)
		},

		newsletterDelete: async (jid: string) => {
			await executeWMexQuery<any>({ newsletter_id: jid }, QueryIds.DELETE, XWAPaths.xwa2_newsletter_delete_v2)
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

		/**
		 * Fetch newsletter message_updates (state changes like reactions/views
		 * on existing messages, as opposed to newsletterFetchMessages which
		 * fetches the message content itself).
		 */
		newsletterUpdateUserSetting: (jid: string, type: string, value: boolean) =>
			newsletterUserSetting(jid, type as 'ADMIN_NOTIFICATIONS', value),

		newsletterUpdateReactions: async (jid: string, setting: string) => {
			const value = String(setting ?? '').toUpperCase()
			if (!NEWSLETTER_REACTION_SETTINGS.has(value)) {
				throw new Boom(`reaction setting must be one of ${[...NEWSLETTER_REACTION_SETTINGS].join(', ')}`, {
					statusCode: 400,
					data: { setting }
				})
			}

			return await newsletterUpdate(jid, { settings: { reaction_codes: { value } } } as any)
		},

		newsletterFetchMessageUpdates: async (jid: string, options: Record<string, any> = {}) => {
			const { count = 20, since, before, after } = options
			const attrs: Record<string, any> = { count: String(count) }
			if (since !== undefined) {
				attrs.since = String(since)
			}

			if (before !== undefined) {
				attrs.before = String(before)
			} else if (after !== undefined) {
				attrs.after = String(after)
			}

			const result = await query({
				tag: 'iq',
				attrs: { id: generateMessageTag(), type: 'get', xmlns: 'newsletter', to: jid },
				content: [{ tag: 'message_updates', attrs, content: undefined }]
			})
			const updates = getBinaryNodeChild(result, 'message_updates')
			const messages = updates && getBinaryNodeChild(updates, 'messages')
			return {
				jid: messages?.attrs?.jid ?? jid,
				messages: messages ? decodeNewsletterMessageNodes(messages, messages.attrs?.jid ?? jid) : []
			}
		},

		newsletterQuestionResponses: async (jid: string, serverId: string, options: Record<string, any> = {}) => {
			const { count = 20, before, filter, searchText } = options
			const attrs: Record<string, any> = { server_id: String(serverId), count: String(count) }
			if (before !== undefined) {
				attrs.before = String(before)
			}

			const content = []
			if (filter) {
				content.push({ tag: 'filters', attrs: {}, content: [{ tag: filter, attrs: {}, content: undefined }] })
			}

			if (searchText) {
				content.push({ tag: 'search', attrs: { text: searchText }, content: undefined })
			}

			const result = await query({
				tag: 'iq',
				attrs: { id: generateMessageTag(), type: 'get', xmlns: 'newsletter', to: jid },
				content: [{ tag: 'question_responses', attrs, content: content.length ? content : undefined }]
			})
			const responses = getBinaryNodeChild(result, 'question_responses')
			if (!responses) {
				return { jid, serverId: Number(serverId), responses: [] }
			}

			return {
				jid: result.attrs?.from ?? jid,
				serverId: responses.attrs?.server_id ? Number(responses.attrs.server_id) : Number(serverId),
				responses: getBinaryNodeChildren(responses, 'question_response').map((entry: any) => {
					const messageNode = getBinaryNodeChild(entry, 'message')
					const sender = getBinaryNodeChild(entry, 'sender')
					const picture = sender && getBinaryNodeChild(sender, 'picture')
					const flags = getBinaryNodeChild(entry, 'flags')
					const plaintext = messageNode && getBinaryNodeChild(messageNode, 'plaintext')
					return {
						id: messageNode?.attrs?.id,
						t: messageNode?.attrs?.t ? Number(messageNode.attrs.t) : undefined,
						isSender: messageNode?.attrs?.is_sender === 'true',
						responseServerId: messageNode?.attrs?.response_server_id,
						sender: {
							lid: sender?.attrs?.lid,
							notifyName: sender?.attrs?.notify_name,
							pictureDirectPath: picture?.attrs?.direct_path
						},
						replied: flags ? !!getBinaryNodeChild(flags, 'replied') : false,
						starred: flags ? !!getBinaryNodeChild(flags, 'starred') : false,
						message: decodeNewsletterPlaintext(plaintext)
					}
				})
			}
		},

		newsletterMyAddOns: async (options: Record<string, any> = {}) => {
			return fetchMyAddOns(options, undefined)
		},

		newsletterStatusMyAddOns: async (options: Record<string, any> = {}) => {
			return fetchMyAddOns(options, 'status')
		},

		newsletterAdminCapabilities: async (jid: string) => {
			const response: any = await executeWMexQuery<any>(
				{ newsletter_id: jid },
				QueryIds.ADMIN_CAPABILITIES,
				XWAPaths.xwa2_newsletter_admin_capabilities
			)
			return response?.capabilities ?? []
		},

		newsletterEnforcements: async (jid: string, locale = 'en_US') => {
			const response: any = await executeWMexQuery<any>(
				{ newsletter_id: jid, locale },
				QueryIds.ENFORCEMENTS,
				XWAPaths.xwa2_channel_enforcements
			)
			const mapBase = (entry: any): any => ({
				enforcementId: entry?.enforcement_id,
				createdAt: entry?.enforcement_creation_time ? Number(entry.enforcement_creation_time) : undefined,
				violationCategory: entry?.enforcement_violation_category,
				source: entry?.enforcement_source,
				appealState: entry?.appeal_state,
				appealCreatedAt: entry?.appeal_creation_time ? Number(entry.appeal_creation_time) : undefined,
				appealReasonOptions: (entry?.appeal_reason_options ?? []).map((option: any) => ({
					reason: option?.reason,
					label: option?.label
				})),
				appealFormUrl: entry?.enforcement_extra_data?.ip_violation_report_data?.appeal_form_url,
				policy: entry?.enforcement_policy_information
					? {
							headline: entry.enforcement_policy_information.headline,
							subtitle: entry.enforcement_policy_information.subtitle,
							overview: entry.enforcement_policy_information.overview,
							explanation: entry.enforcement_policy_information.explanation,
							adminDisclaimer: entry.enforcement_policy_information.admin_disclaimer
						}
					: undefined
			})
			const nested = (list: any): any[] =>
				(list ?? []).map((entry: any) => mapBase(entry?.base_enforcement_data ?? entry))
			return {
				adminProfiles: (response?.admin_profiles ?? []).map(mapBase),
				profilePictureDeletions: (response?.profile_picture_deletions ?? []).map(mapBase),
				suspensions: (response?.suspensions ?? []).map(mapBase),
				violatingMessages: nested(response?.violating_messages),
				geoSuspensions: nested(response?.geosuspensions)
			}
		},

		newsletterReports: async (locale = 'en_US') => {
			const response: any = await executeWMexQuery<any>(
				{ locale },
				QueryIds.CHANNEL_REPORTS,
				XWAPaths.xwa2_channels_reports
			)
			return response?.channels_reports ?? []
		},

		newsletterAppealReport: async (reportId: string, reason: string) => {
			return executeWMexQuery(
				{ report_id: String(reportId), reason },
				QueryIds.CREATE_REPORT_APPEAL,
				XWAPaths.xwa2_create_channel_report_appeal_v2
			)
		},

		newsletterCanPostStatus: async (jid: string) => {
			const capabilities = await executeWMexQuery<any>(
				{ newsletter_id: jid },
				QueryIds.ADMIN_CAPABILITIES,
				XWAPaths.xwa2_newsletter_admin_capabilities
			)
			const list = capabilities?.capabilities ?? []
			return {
				canPost: list.includes('CHANNEL_STATUS_PRODUCER'),
				canPostMusic: list.includes('CHANNEL_STATUS_MUSIC'),
				capabilities: list
			}
		},

		newsletterAdminInfo: async (jid: string) => {
			const response: any = await executeWMexQuery<any>(
				{ newsletter_id: jid },
				QueryIds.ADMIN_INFO,
				XWAPaths.xwa2_newsletter_admin_info
			)
			return {
				id: response?.id ?? jid,
				adminCount: response?.admin_count ?? 0,
				adminProfile: response?.admin_profile
					? {
							id: response.admin_profile.id,
							name: response.admin_profile.name,
							picture: response.admin_profile.picture
								? {
										id: response.admin_profile.picture.id,
										directPath: response.admin_profile.picture.direct_path
									}
								: undefined
						}
					: undefined,
				adminProfilesEnabled: response?.admin_settings?.admin_profiles_enabled ?? false
			}
		},

		newsletterPollVoters: async (jid: string, serverId: string, options: Record<string, any> = {}) => {
			return executeWMexQuery(
				{
					input: {
						newsletter_id: jid,
						server_id: String(serverId),
						limit: options.limit ?? 100,
						vote_hash: options.voteHash
					}
				},
				QueryIds.POLL_VOTERS,
				XWAPaths.voter_list
			)
		},

		newsletterReactionSenders: async (jid: string, serverId: string) => {
			return executeWMexQuery(
				{
					input: {
						id: jid,
						server_id: String(serverId)
					}
				},
				QueryIds.REACTION_SENDER_LIST,
				XWAPaths.xwa2_newsletters_reaction_sender_list
			)
		},

		newsletterPinMessages: async (jid: string, serverIds: string | string[]) => {
			const messageIds = toNewsletterServerIds(serverIds)
			return executeWMexQuery(
				{ newsletter_id: jid, input: { message_ids: messageIds } },
				QueryIds.PIN_MESSAGES,
				XWAPaths.xwa2_newsletter_pin_messages
			)
		},

		newsletterUnpinMessages: async (jid: string, serverIds: string | string[]) => {
			const messageIds = toNewsletterServerIds(serverIds)
			return executeWMexQuery(
				{ newsletter_id: jid, input: { message_ids: messageIds } },
				QueryIds.UNPIN_MESSAGES,
				XWAPaths.xwa2_newsletter_unpin_messages
			)
		},

		newsletterLabelAiContent: async (jid: string, serverId: string, messageType = 'MESSAGE') => {
			return executeWMexQuery(
				{
					newsletter_id: jid,
					server_id: String(serverId),
					message_type: messageType
				},
				QueryIds.LABEL_AI_CONTENT,
				XWAPaths.xwa2_newsletter_label_ai_content
			)
		},

		newsletterLabelPaidPartnership: async (jid: string, serverId: string, messageType = 'MESSAGE') => {
			return executeWMexQuery(
				{
					newsletter_id: jid,
					server_id: String(serverId),
					message_type: messageType
				},
				QueryIds.PAID_PARTNERSHIP_LABEL,
				XWAPaths.xwa2_newsletter_label_paid_partnership
			)
		},

		newsletterCreateAdminInvite: async (jid: string, userJid: string) => {
			return executeWMexQuery(
				{ newsletter_id: jid, user_id: userJid },
				QueryIds.CREATE_ADMIN_INVITE,
				XWAPaths.xwa2_newsletter_admin_invite_create
			)
		},

		newsletterRevokeAdminInvite: async (jid: string, userJid: string) => {
			return executeWMexQuery(
				{ newsletter_id: jid, user_id: userJid },
				QueryIds.REVOKE_ADMIN_INVITE,
				XWAPaths.xwa2_newsletter_admin_invite_revoke
			)
		},

		newsletterAcceptAdminInvite: async (jid: string) => {
			return executeWMexQuery(
				{ newsletter_id: jid },
				QueryIds.ACCEPT_ADMIN_INVITE,
				XWAPaths.xwa2_newsletter_admin_invite_accept
			)
		},

		newsletterDirectoryList: async (options: Record<string, any> = {}) => {
			return executeWMexQuery(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: {
						view: options.view ?? 'RECOMMENDED',
						filters: {
							country_codes: options.countryCodes ?? [],
							categories: options.categories ?? []
						},
						limit: options.limit ?? 20,
						start_cursor: options.cursorToken
					}
				},
				QueryIds.DIRECTORY_LIST,
				XWAPaths.xwa2_newsletters_directory_list
			)
		},

		newsletterDirectorySearch: async (searchText: string, options: Record<string, any> = {}) => {
			return executeWMexQuery(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: {
						search_text: searchText,
						categories: options.categories ?? [],
						limit: options.limit ?? 20,
						start_cursor: options.cursorToken
					}
				},
				QueryIds.DIRECTORY_SEARCH,
				XWAPaths.xwa2_newsletters_directory_search
			)
		},

		newsletterDirectoryCategories: async (options: Record<string, any> = {}) => {
			return executeWMexQuery(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: {
						categories: options.categories ?? [],
						country_code: options.countryCode || undefined,
						per_category_limit: options.perCategoryLimit ?? 10
					}
				},
				QueryIds.DIRECTORY_CATEGORIES,
				XWAPaths.xwa2_newsletters_directory_category_preview
			)
		},

		newsletterSendPollVote: async (jid: string, parentServerId: string, options: Record<string, any>) => {
			const names = Array.isArray(options) ? options : [options]
			const votes = names.map(name => ({
				tag: 'vote',
				attrs: {},
				content: createHash('sha256').update(String(name), 'utf-8').digest()
			}))
			const messageId = generateMessageTag()
			await query({
				tag: 'message',
				attrs: {
					to: jid,
					id: messageId,
					type: 'poll',
					server_id: String(parentServerId)
				},
				content: [
					{ tag: 'meta', attrs: { polltype: 'vote' } },
					{ tag: 'votes', attrs: {}, content: votes }
				]
			})
			return { id: messageId }
		},

		newsletterInsights: async (jid: string, options: Record<string, any> = {}) => {
			return executeWMexQuery(
				{
					input: {
						newsletter_id: jid,
						metrics: options.metrics ?? ['NET_FOLLOWS', 'UNFOLLOWS']
					}
				},
				QueryIds.INSIGHTS,
				XWAPaths.xwa2_newsletter_admin_insights
			)
		},

		newsletterFollowers: async (jid: string, options: Record<string, any> = {}) => {
			return executeWMexQuery(
				{
					input: {
						newsletter_id: jid,
						count: options.count ?? 100
					}
				},
				QueryIds.FOLLOWERS,
				XWAPaths.xwa2_newsletter_followers
			)
		},

		newsletterPendingAdminInvites: async (jid: string) => {
			const response: any = await executeWMexQuery<any>(
				{ newsletter_id: jid },
				QueryIds.PENDING_ADMIN_INVITES,
				XWAPaths.pending_admin_invites
			)
			return (response?.pending_admin_invites ?? []).map((invite: any) => ({
				id: invite?.user?.id,
				phoneNumber: invite?.user?.pn
			}))
		},

		newsletterQuestionResponseState: async (jid: string, serverId: string, responseServerId: string, state: string) => {
			return executeWMexQuery(
				{
					newsletter_id: jid,
					server_id: String(serverId),
					response_server_id: String(responseServerId),
					state
				},
				QueryIds.QUESTION_RESPONSE_STATE,
				XWAPaths.xwa2_newsletter_question_response_state_update
			)
		},

		newsletterRecommended: async (options: Record<string, any> = {}) => {
			return executeWMexQuery(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: {
						limit: options.limit ?? 20,
						country_codes: options.countryCodes ?? []
					}
				},
				QueryIds.RECOMMENDED,
				XWAPaths.xwa2_newsletters_recommended
			)
		},

		newsletterSimilar: async (jid: string, options: Record<string, any> = {}) => {
			return executeWMexQuery(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: {
						newsletter_id: jid,
						limit: options.limit ?? 20,
						country_codes: options.countryCodes ?? []
					}
				},
				QueryIds.SIMILAR,
				XWAPaths.xwa2_newsletters_similar
			)
		},

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
