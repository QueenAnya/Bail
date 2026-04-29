/**
 * addon: privacy-tokens
 * Source patch: Baileys-feat-add-stickerpack-support (renamed issuePrivacyTokens → getPrivacyTokens)
 *
 * Simplified privacy token helper.
 * The original `issuePrivacyTokens` was renamed to `getPrivacyTokens` in the
 * stickerpack patch and the complex fire-and-forget TCToken issuance logic was removed.
 *
 * This addon exposes:
 *   - buildPrivacyTokenNode() — builds the XML node for sending privacy tokens to a list of JIDs
 *
 * Usage (inside your socket layer):
 *   const node = buildPrivacyTokenNode(jids, unixTimestampSeconds().toString())
 *   await sendNode(node)
 */

import type { BinaryNode } from '../WABinary'

/**
 * Builds the `iq` node that sends privacy tokens to a set of JIDs.
 * This is what getPrivacyTokens / issuePrivacyTokens sends under the hood.
 */
export const buildPrivacyTokenNode = (jids: string[], timestamp: string): BinaryNode => ({
	tag: 'iq',
	attrs: {
		to: 's.whatsapp.net',
		type: 'set',
		xmlns: 'privacy'
	},
	content: [
		{
			tag: 'tokens',
			attrs: {},
			content: jids.map(jid => ({
				tag: 'token',
				attrs: {
					jid,
					t: timestamp,
					type: 'trusted_contact'
				}
			}))
		}
	]
})
