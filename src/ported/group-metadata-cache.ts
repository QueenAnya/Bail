/**
 * Ported from @rexxhayanasi/elaina-baileys 1.4.5 (MIT) - Utils/group-metadata-cache.js
 * Copied as-is (JS -> TS, type-checking disabled); only import paths were adapted for tb2.
 */
// @ts-nocheck

export const GROUP_ADDRESSING_MODES = Object.freeze(['pn', 'lid'])

export const isUsableGroupMetadata = metadata => {
	if (!metadata || typeof metadata !== 'object') {
		return false
	}

	if (!Array.isArray(metadata.participants)) {
		return false
	}

	return GROUP_ADDRESSING_MODES.includes(metadata.addressingMode)
}

export const describeUnusableGroupMetadata = metadata => {
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
