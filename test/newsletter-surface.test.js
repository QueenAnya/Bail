import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

/**
 * Every newsletter method elaina exposes must be in the compiled socket object.
 *
 * The 31 methods ported from elaina-baileys 1.4.7 are thin wrappers around `executeWMexQuery`, so the realistic
 * failure is not a wrong computation — it is a method that never made it into the returned object, or one whose name
 * drifted during the port. Building the socket for real would open a websocket, so this inspects the compiled
 * module instead: it is the artefact that ships, and the check is exact.
 */

const compiled = readFileSync(new URL('../lib/Socket/newsletter.js', import.meta.url), 'utf8')

const PORTED_FROM_ELAINA = [
	'newsletterUpdateUserSetting',
	'newsletterUpdateReactions',
	'newsletterFetchMessageUpdates',
	'newsletterQuestionResponses',
	'newsletterMyAddOns',
	'newsletterStatusMyAddOns',
	'newsletterAdminCapabilities',
	'newsletterEnforcements',
	'newsletterReports',
	'newsletterAppealReport',
	'newsletterCanPostStatus',
	'newsletterAdminInfo',
	'newsletterPollVoters',
	'newsletterReactionSenders',
	'newsletterPinMessages',
	'newsletterUnpinMessages',
	'newsletterLabelAiContent',
	'newsletterLabelPaidPartnership',
	'newsletterCreateAdminInvite',
	'newsletterRevokeAdminInvite',
	'newsletterAcceptAdminInvite',
	'newsletterDirectoryList',
	'newsletterDirectorySearch',
	'newsletterDirectoryCategories',
	'newsletterSendPollVote',
	'newsletterInsights',
	'newsletterFollowers',
	'newsletterPendingAdminInvites',
	'newsletterQuestionResponseState',
	'newsletterRecommended',
	'newsletterSimilar'
]

const MUTE_METHODS = ['newsletterMute', 'newsletterUnmute', 'newsletterMuteLegacy', 'newsletterUnmuteLegacy']

test('newsletter: every method ported from elaina is in the compiled socket', () => {
	const missing = PORTED_FROM_ELAINA.filter(name => !new RegExp(`^\\s+${name}:`, 'm').test(compiled))
	assert.deepEqual(missing, [], `methods missing from the compiled object: ${missing.join(', ')}`)
})

test('newsletter: the mute pair exists in both flavours', () => {
	const missing = MUTE_METHODS.filter(name => !new RegExp(`^\\s+${name}:`, 'm').test(compiled))
	assert.deepEqual(missing, [], `mute methods missing: ${missing.join(', ')}`)
})

test('newsletter: the generic dispatcher is still exposed', () => {
	assert.match(compiled, /^\s+newsletterAction:/m, 'newsletterAction must stay available')
})

test('newsletter: the ported helpers resolve inside the module', () => {
	/** `fetchMyAddOns` is a closure, not an import — a port that referenced it without defining it would fail here */
	assert.match(compiled, /const fetchMyAddOns = async/, 'fetchMyAddOns must be defined in the module')
	assert.doesNotMatch(compiled, /Cannot find name|undefined is not a function/, 'no placeholder text')
})
