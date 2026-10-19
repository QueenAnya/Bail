/**
 * Elaina-compatible MessageBuilder static helper registration.
 * Internal side-effect module: public exports remain in ../index.ts.
 */
import { nativeFlowButtonsViolateConstraints } from '../messages-helpers'
import * as nativeFlow from '../native-flow'
import * as botSignature from './bot-signature'
import * as extras from './extras'
import { AIRich, AIRichCarousel, Button, ButtonV2, MessageBuilder, Toolkit } from './index'
import * as metaAi from './metaai'

type MemberContainer = object
const helpers = [
	...Object.entries(extras),
	...Object.entries(metaAi),
	...Object.entries(botSignature),
	...Object.entries(nativeFlow),
	['nativeFlowButtonsViolateConstraints', nativeFlowButtonsViolateConstraints] as const
].filter(([name]) => name !== 'default')

function register(target: MemberContainer) {
	for (const [name, value] of helpers) {
		// Preserve native class members and previously registered extensions.
		if (!(name in target)) {
			Object.defineProperty(target, name, {
				value,
				enumerable: true,
				configurable: true,
				writable: true
			})
		}
	}
}

for (const builder of [Button, ButtonV2, AIRichCarousel, AIRich, Toolkit]) register(builder)
register(MessageBuilder)
Object.freeze(MessageBuilder)
