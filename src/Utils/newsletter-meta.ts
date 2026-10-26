import type { BinaryNode } from '../WABinary'
import { getBinaryNodeChild } from '../WABinary'

export interface NewsletterMessageMeta {
	adminProfile?: { id?: string; name?: string; pictureId?: string; pictureDirectPath?: string }
	paidPartnership?: boolean
	aiContent?: boolean
	editTimestamp?: number
	originalTimestamp?: number
}

const readIntAttr = (attrs: Record<string, string> | undefined, key: string): number | undefined => {
	const value = attrs?.[key]
	if (value === undefined || value === null || value === '') {
		return undefined
	}

	const parsed = Number.parseInt(String(value), 10)
	return Number.isFinite(parsed) ? parsed : undefined
}

/** Reads the `<meta>` child of a newsletter `<message>` (admin profile, AI / paid-partnership labels, edit times). */
export const extractNewsletterMessageMeta = (stanza: BinaryNode): NewsletterMessageMeta | undefined => {
	const meta = getBinaryNodeChild(stanza, 'meta')
	if (!meta) {
		return undefined
	}

	const result: NewsletterMessageMeta = {}
	const adminProfile = getBinaryNodeChild(meta, 'admin_profile')
	if (adminProfile) {
		const name = getBinaryNodeChild(adminProfile, 'name')
		const picture = getBinaryNodeChild(adminProfile, 'picture')
		const content = name?.content
		result.adminProfile = {
			id: adminProfile.attrs?.id,
			name:
				typeof content === 'string'
					? content
					: content instanceof Uint8Array
						? Buffer.from(content).toString('utf-8')
						: undefined,
			pictureId: picture?.attrs?.id,
			pictureDirectPath: picture?.attrs?.direct_path
		}
	}

	if (getBinaryNodeChild(meta, 'paid_partnership')) {
		result.paidPartnership = true
	}

	if (getBinaryNodeChild(meta, 'ai_content')) {
		result.aiContent = true
	}

	const editTimestamp = readIntAttr(meta.attrs, 'msg_edit_t')
	if (editTimestamp !== undefined) {
		result.editTimestamp = editTimestamp
	}

	const originalTimestamp = readIntAttr(meta.attrs, 'original_msg_t')
	if (originalTimestamp !== undefined) {
		result.originalTimestamp = originalTimestamp
	}

	return Object.keys(result).length ? result : undefined
}
