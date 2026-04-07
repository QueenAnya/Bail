import type { SocketConfig, WAMediaUpload } from '../Types'
import type { NewsletterFetchedUpdate, NewsletterMetadata } from '../Types/Newsletter'
import { QueryIds, XWAPaths } from '../Types/Newsletter'
import { decryptMessageNode } from '../Utils'
import { generateProfilePicture } from '../Utils/messages-media'
import { S_WHATSAPP_NET, getAllBinaryNodeChildren, getBinaryNodeChild, getBinaryNodeChildren } from '../WABinary'
import { makeGroupsSocket } from './groups'

export const extractNewsletterMetadata = (node: any, isCreate?: boolean): NewsletterMetadata => {
	const result = getBinaryNodeChild(node, 'result')?.content?.toString()
	const path = isCreate ? XWAPaths.CREATE : XWAPaths.NEWSLETTER
	const metadataPath = JSON.parse(result).data[path]

	return {
		id: metadataPath?.id,
		state: metadataPath?.state?.type,
		creation_time: +metadataPath?.thread_metadata?.creation_time,
		name: metadataPath?.thread_metadata?.name?.text,
		nameTime: +metadataPath?.thread_metadata?.name?.update_time,
		description: metadataPath?.thread_metadata?.description?.text,
		descriptionTime: +metadataPath?.thread_metadata?.description?.update_time,
		invite: metadataPath?.thread_metadata?.invite,
		handle: metadataPath?.thread_metadata?.handle,
		picture: metadataPath?.thread_metadata?.picture?.direct_path || null,
		preview: metadataPath?.thread_metadata?.preview?.direct_path || null,
		reaction_codes: metadataPath?.thread_metadata?.settings?.reaction_codes?.value,
		subscribers: +metadataPath?.thread_metadata?.subscribers_count,
		verification: metadataPath?.thread_metadata?.verification,
		viewer_metadata: metadataPath?.viewer_metadata
	}
}

export const makeNewsletterSocket = (config: SocketConfig) => {
	const sock = makeGroupsSocket(config)
	const { authState, signalRepository, query, generateMessageTag } = sock
	const encoder = new TextEncoder()

	const newsletterQuery = async (jid: string, type: string, content: any[]) =>
		query({
			tag: 'iq',
			attrs: {
				id: generateMessageTag(),
				type,
				xmlns: 'newsletter',
				to: jid
			},
			content
		})

	const newsletterWMexQuery = async (jid: string | undefined, queryId: string, content?: Record<string, unknown>) =>
		query({
			tag: 'iq',
			attrs: {
				id: generateMessageTag(),
				type: 'get',
				xmlns: 'w:mex',
				to: S_WHATSAPP_NET
			},
			content: [
				{
					tag: 'query',
					attrs: { query_id: queryId },
					content: encoder.encode(
						JSON.stringify({
							variables: {
								...(jid ? { newsletter_id: jid } : {}),
								...(content || {})
							}
						})
					)
				}
			]
		})

	const parseFetchedUpdates = async (node: any, type: 'messages' | 'updates'): Promise<NewsletterFetchedUpdate[]> => {
		let child: any
		if (type === 'messages') {
			child = getBinaryNodeChild(node, 'messages')
		} else {
			const parent = getBinaryNodeChild(node, 'message_updates')
			child = getBinaryNodeChild(parent, 'messages')
		}

		return Promise.all(
			getAllBinaryNodeChildren(child).map(async (messageNode: any) => {
				messageNode.attrs.from = child?.attrs?.jid

				const views = parseInt(getBinaryNodeChild(messageNode, 'views_count')?.attrs?.count || '0')
				const reactionNode = getBinaryNodeChild(messageNode, 'reactions')
				const reactions = getBinaryNodeChildren(reactionNode, 'reaction').map(({ attrs }: any) => ({
					count: +attrs.count,
					code: attrs.code
				}))

				const data: NewsletterFetchedUpdate = {
					server_id: messageNode.attrs.server_id,
					views,
					reactions
				}

				if (type === 'messages') {
					const { fullMessage: message, decrypt } = await decryptMessageNode(
						messageNode,
						authState.creds.me!.id,
						authState.creds.me?.lid || '',
						signalRepository,
						config.logger
					)
					await decrypt()
					data.message = message
				}

				return data
			})
		)
	}

	const newsletterMetadata = async (
		type: 'invite' | 'jid',
		key: string,
		role?: string
	): Promise<NewsletterMetadata> => {
		const result = await newsletterWMexQuery(undefined, QueryIds.METADATA, {
			input: {
				key,
				type: type.toUpperCase(),
				view_role: role || 'GUEST'
			},
			fetch_viewer_metadata: true,
			fetch_full_image: true,
			fetch_creation_time: true
		})
		return extractNewsletterMetadata(result)
	}

	return {
		...sock,

		newsletterQuery,
		newsletterWMexQuery,

		subscribeNewsletterUpdates: async (jid: string): Promise<{ duration: string }> => {
			const result = await newsletterQuery(jid, 'set', [{ tag: 'live_updates', attrs: {}, content: [] }])
			return getBinaryNodeChild(result, 'live_updates')?.attrs as { duration: string }
		},

		newsletterReactionMode: async (jid: string, mode: string) => {
			await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
				updates: { settings: { reaction_codes: { value: mode } } }
			})
		},

		newsletterUpdateDescription: async (jid: string, description?: string) => {
			await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
				updates: { description: description || '', settings: null }
			})
		},

		newsletterUpdateName: async (jid: string, name: string) => {
			await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
				updates: { name, settings: null }
			})
		},

		newsletterUpdatePicture: async (jid: string, content: WAMediaUpload) => {
			const { img } = await generateProfilePicture(content)
			await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
				updates: { picture: img.toString('base64'), settings: null }
			})
		},

		newsletterRemovePicture: async (jid: string) => {
			await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
				updates: { picture: '', settings: null }
			})
		},

		newsletterUnfollow: async (jid: string) => {
			await newsletterWMexQuery(jid, QueryIds.UNFOLLOW)
		},

		newsletterFollow: async (jid: string) => {
			await newsletterWMexQuery(jid, QueryIds.FOLLOW)
		},

		newsletterUnmute: async (jid: string) => {
			await newsletterWMexQuery(jid, QueryIds.UNMUTE)
		},

		newsletterMute: async (jid: string) => {
			await newsletterWMexQuery(jid, QueryIds.MUTE)
		},

		newsletterCreate: async (
			name: string,
			description?: string,
			picture?: WAMediaUpload
		): Promise<NewsletterMetadata> => {
			// TOS acknowledgment required before creating newsletter
			await query({
				tag: 'iq',
				attrs: {
					to: S_WHATSAPP_NET,
					xmlns: 'tos',
					id: generateMessageTag(),
					type: 'set'
				},
				content: [
					{
						tag: 'notice',
						attrs: { id: '20601218', stage: '5' },
						content: []
					}
				]
			})

			const result = await newsletterWMexQuery(undefined, QueryIds.CREATE, {
				input: {
					name,
					description: description || null,
					picture: picture ? (await generateProfilePicture(picture)).img.toString('base64') : null,
					settings: {
						reaction_codes: {
							value: 'ALL'
						}
					}
				}
			})

			return extractNewsletterMetadata(result, true)
		},

		newsletterMetadata,

		newsletterFetchAllParticipating: async (): Promise<{ [_: string]: NewsletterMetadata }> => {
			const result = await newsletterWMexQuery(undefined, QueryIds.SUBSCRIBED)
			const child = JSON.parse(getBinaryNodeChild(result, 'result')?.content?.toString() || '{}')
			const newsletters: Array<{ id: string }> = child?.data?.[XWAPaths.SUBSCRIBED] || []

			const data: { [_: string]: NewsletterMetadata } = {}
			for (const { id } of newsletters) {
				const metadata = await newsletterMetadata('jid', id)
				data[metadata.id] = metadata
			}
			return data
		},

		newsletterAdminCount: async (jid: string): Promise<number> => {
			const result = await newsletterWMexQuery(jid, QueryIds.ADMIN_COUNT)
			const child = JSON.parse(getBinaryNodeChild(result, 'result')?.content?.toString() || '{}')
			return child?.data?.[XWAPaths.ADMIN_COUNT] || 0
		},

		newsletterChangeOwner: async (jid: string, userLid: string) => {
			await newsletterWMexQuery(jid, QueryIds.CHANGE_OWNER, { user_id: userLid })
		},

		newsletterDemote: async (jid: string, userLid: string) => {
			await newsletterWMexQuery(jid, QueryIds.DEMOTE, { user_id: userLid })
		},

		newsletterDelete: async (jid: string) => {
			await newsletterWMexQuery(jid, QueryIds.DELETE)
		},

		/** React to a newsletter message. If code is not passed, removes existing reaction. */
		newsletterReactMessage: async (jid: string, server_id: string, code?: string) => {
			await query({
				tag: 'message',
				attrs: {
					to: jid,
					...(!code ? { edit: '7' } : {}),
					type: 'reaction',
					server_id,
					id: generateMessageTag()
				},
				content: [{ tag: 'reaction', attrs: code ? { code } : {} }]
			})
		},

		newsletterFetchMessages: async (
			type: 'invite' | 'jid',
			key: string,
			count: number,
			after?: number
		): Promise<NewsletterFetchedUpdate[]> => {
			const result = await newsletterQuery(S_WHATSAPP_NET, 'get', [
				{
					tag: 'messages',
					attrs: {
						type,
						...(type === 'invite' ? { key } : { jid: key }),
						count: count.toString(),
						after: after?.toString() || '100'
					}
				}
			])
			return parseFetchedUpdates(result, 'messages')
		},

		newsletterFetchUpdates: async (
			jid: string,
			count: number,
			after?: number,
			since?: number
		): Promise<NewsletterFetchedUpdate[]> => {
			const result = await newsletterQuery(jid, 'get', [
				{
					tag: 'message_updates',
					attrs: {
						count: count.toString(),
						after: after?.toString() || '100',
						since: since?.toString() || '0'
					}
				}
			])
			return parseFetchedUpdates(result, 'updates')
		}
	}
}

export type NewsletterSocket = ReturnType<typeof makeNewsletterSocket>
