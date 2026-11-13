/**
 * Ported from @rexxhayanasi/elaina-baileys 1.4.x (MIT) - Utils/group-metadata-cache.js
 * Copied as-is (JS -> TS); only import paths and parameter types were adapted for tb2.
 * Re-checked against elaina-baileys 1.4.7: the exported surface matches; see PORTED_FROM below.
 */
export const GROUP_ADDRESSING_MODES: readonly string[] = Object.freeze(['pn', 'lid'])

type GroupMetadataLike = { participants?: unknown; addressingMode?: string } | null | undefined

export const isUsableGroupMetadata = (metadata: GroupMetadataLike) => {
	if (!metadata || typeof metadata !== 'object') {
		return false
	}

	if (!Array.isArray(metadata.participants)) {
		return false
	}

	return GROUP_ADDRESSING_MODES.includes(metadata.addressingMode as string)
}

export const describeUnusableGroupMetadata = (metadata: GroupMetadataLike) => {
	if (!metadata || typeof metadata !== 'object') {
		return 'nothing cached'
	}

	if (!Array.isArray(metadata.participants)) {
		return 'no participants'
	}

	if (metadata.addressingMode === undefined || metadata.addressingMode === null) {
		return 'no addressingMode'
	}

	return `addressingMode ${JSON.stringify(metadata.addressingMode)} is not pn or lid`
}
