import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

/**
 * Socket API surface, compared against the four upstream forks.
 *
 * Every method exposed by elaina-baileys 1.4.7, WhiskeySockets/Baileys (GitHub master), innovatorssoft/baileys and
 * itsliaaa/baileys in chats / communities / groups / newsletter must exist here. The lists below are that union;
 * this test is what keeps the claim true after a refactor.
 */

const MODULES = {
	chats: [
		'return_snapshot',
		'version'
	],
	communities: [
		'admin',
		'communityAcceptInvite',
		'communityCreate',
		'communityCreateGroup',
		'communityFetchLinkedGroups',
		'communityGetInviteInfo',
		'communityInviteCode',
		'communityJoinApprovalMode',
		'communityLeave',
		'communityLinkGroup',
		'communityMemberAddMode',
		'communityParticipantsUpdate',
		'communityRequestParticipantsList',
		'communityRequestParticipantsUpdate',
		'communityRevokeInvite',
		'communityRevokeInviteV4',
		'communitySettingUpdate',
		'communityToggleEphemeral',
		'communityUnlinkGroup',
		'communityUpdateDescription',
		'communityUpdateSubject',
		'empty',
		'of'
	],
	groups: [
		'admin',
		'groupAcceptInvite',
		'groupCreate',
		'groupGetInviteInfo',
		'groupInviteCode',
		'groupJoinApprovalMode',
		'groupLeave',
		'groupMemberAddMode',
		'groupParticipantsUpdate',
		'groupRequestParticipantsList',
		'groupRequestParticipantsUpdate',
		'groupRevokeInvite',
		'groupRevokeInviteV4',
		'groupSettingUpdate',
		'groupToggleEphemeral',
		'groupUpdateDescription',
		'groupUpdateSubject'
	],
	newsletter: [
		'newsletterAcceptAdminInvite',
		'newsletterAction',
		'newsletterAdminCapabilities',
		'newsletterAdminCount',
		'newsletterAdminInfo',
		'newsletterAppealReport',
		'newsletterCanPostStatus',
		'newsletterChangeOwner',
		'newsletterCreate',
		'newsletterCreateAdminInvite',
		'newsletterDelete',
		'newsletterDemote',
		'newsletterDirectoryCategories',
		'newsletterDirectoryList',
		'newsletterDirectorySearch',
		'newsletterEnforcements',
		'newsletterFetchAllParticipating',
		'newsletterFetchMessageUpdates',
		'newsletterFetchMessages',
		'newsletterFetchUpdates',
		'newsletterFollow',
		'newsletterFollowers',
		'newsletterInsights',
		'newsletterLabelAiContent',
		'newsletterLabelPaidPartnership',
		'newsletterMetadata',
		'newsletterMute',
		'newsletterMyAddOns',
		'newsletterPendingAdminInvites',
		'newsletterPinMessages',
		'newsletterPollVoters',
		'newsletterQuestionResponseState',
		'newsletterQuestionResponses',
		'newsletterReactMessage',
		'newsletterReactionMode',
		'newsletterReactionSenders',
		'newsletterRecommended',
		'newsletterRemovePicture',
		'newsletterReports',
		'newsletterRevokeAdminInvite',
		'newsletterSendPollVote',
		'newsletterSimilar',
		'newsletterStatusMyAddOns',
		'newsletterSubscribed',
		'newsletterSubscribers',
		'newsletterUnfollow',
		'newsletterUnmute',
		'newsletterUnpinMessages',
		'newsletterUpdateDescription',
		'newsletterUpdateName',
		'newsletterUpdatePicture',
		'newsletterUpdateReactions',
		'newsletterUpdateUserSetting',
		'subscribeNewsletterUpdates'
	],
}

const compiled = mod => readFileSync(new URL(`../lib/Socket/${mod}.js`, import.meta.url), 'utf8')

test('socket surface: every upstream chats/communities/groups/newsletter method exists', () => {
	const missing = {}
	for (const [mod, names] of Object.entries(MODULES)) {
		const body = compiled(mod)
		const absent = names.filter(name => !new RegExp(`^[\\t ]+${name}:`, 'm').test(body))
		if (absent.length) {
			missing[mod] = absent
		}
	}

	assert.deepEqual(missing, {}, `methods missing from the compiled socket: ${JSON.stringify(missing)}`)
})
