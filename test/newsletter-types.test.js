import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

/**
 * Newsletter types that other forks publish and this one must expose.
 *
 * These are type-only, so nothing about them shows up at runtime — the compiled `.d.ts` is the artefact a consumer
 * actually imports. Names came from innovatorssoft/baileys `lib/Types/Newsletter.d.ts`; the two enums they share with
 * every fork (`QueryIds`, `XWAPaths`) are covered by the follow guards instead.
 */

const decl = readFileSync(new URL('../lib/Types/Mex.d.ts', import.meta.url), 'utf8')
const barrel = readFileSync(new URL('../lib/Types/index.d.ts', import.meta.url), 'utf8')

const PORTED_TYPES = [
	'NewsletterReactionMode',
	'NewsletterState',
	'NewsletterVerification',
	'NewsletterMute',
	'NewsletterViewerMetadata',
	'SubscriberAction',
	'ReactionModeUpdate',
	'NewsletterSettingsUpdate',
	'NewsletterReaction',
	'NewsletterFetchedUpdate',
	'NewsletterMetadataExtended'
]

test('newsletter types: every ported type is declared in Types/Mex', () => {
	const missing = PORTED_TYPES.filter(name => !new RegExp(`export (?:declare )?type ${name}\\b`).test(decl))
	assert.deepEqual(missing, [], `types missing from lib/Types/Mex.d.ts: ${missing.join(', ')}`)
})

test('newsletter types: the barrel re-exports Mex, which holds them', () => {
	assert.match(barrel, /export \* from '\.\/Mex\.js'/, 'Types/index must re-export Mex')
	assert.doesNotMatch(barrel, /'\.\/Newsletter\.js'/, 'the Newsletter module is gone, so nothing may re-export it')
})

test('newsletter metadata: the merged shape carries every fork\'s fields', () => {
	/**
	 * `NewsletterMetadata` is elaina's shape widened with innovatorssoft's extra fields. Both sets must be present in
	 * the emitted declaration, or a consumer porting from either fork gets a type error.
	 */
	const mex = readFileSync(new URL('../lib/Types/Mex.d.ts', import.meta.url), 'utf8')
	const block = mex.slice(mex.indexOf('export interface NewsletterMetadata'))
	const body = block.slice(0, block.indexOf('\n}'))

	const required = ['id', 'owner', 'name', 'description', 'invite', 'creation_time', 'subscribers', 'picture',
		'verification', 'reaction_codes', 'mute_state', 'thread_metadata',
		'state', 'nameTime', 'descriptionTime', 'handle', 'preview', 'viewer_metadata']
	const missing = required.filter(f => !new RegExp(`\\b${f}\\??:`).test(body))
	assert.deepEqual(missing, [], `fields missing from NewsletterMetadata: ${missing.join(', ')}`)
})

test('newsletter types: the union members match the wire values', () => {
	assert.match(decl, /NewsletterReactionMode = 'ALL' \| 'BASIC' \| 'NONE'/)
	assert.match(decl, /NewsletterState = 'ACTIVE' \| 'GEOSUSPENDED' \| 'SUSPENDED'/)
	assert.match(decl, /NewsletterMute = 'ON' \| 'OFF' \| 'UNDEFINED'/)
	assert.match(decl, /NewsletterVerification = 'VERIFIED' \| 'UNVERIFIED'/)
})
