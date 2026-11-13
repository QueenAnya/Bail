/**
 * Ported from @rexxhayanasi/elaina-baileys 1.4.x (MIT) - Utils/link-preview-metadata.js
 * Copied as-is (JS -> TS); only import paths and parameter types were adapted for tb2.
 * Re-checked against elaina-baileys 1.4.7: the exported surface matches; see PORTED_FROM below.
 */

export const SocialMediaPostType = Object.freeze({
	NONE: 0,
	REEL: 1,
	LIVE_VIDEO: 2,
	LONG_VIDEO: 3,
	SINGLE_IMAGE: 4,
	CAROUSEL: 5
})

const drop = (object: Record<string, any>) => {
	for (const key of Object.keys(object)) {
		if (object[key] === undefined || object[key] === null) {
			delete object[key]
		}
	}

	return object
}

export interface VideoEndCardInput {
	username?: string
	caption?: string
	thumbnailUrl?: string
	profilePictureUrl?: string
}

export const videoEndCard = ({ username, caption, thumbnailUrl, profilePictureUrl }: VideoEndCardInput = {}) =>
	drop({
		username,
		caption,
		thumbnailImageUrl: thumbnailUrl,
		profilePictureUrl
	})

/**
 * The same video url and music node exist twice, once nested in
 * LinkPreviewMetadata and once directly on ExtendedTextMessage. Which one the
 * client reads is not visible from the client, so both carry the same value.
 */
export interface SocialPreviewInput {
	postType?: number
	videoUrl?: string
	videoCaption?: string
	muted?: boolean
	durationSeconds?: number
	experimentId?: string
	music?: any
	endCards?: any[]
}

export interface SocialPreviewInput {
	postType?: number
	videoUrl?: string
	videoCaption?: string
	muted?: boolean
	durationSeconds?: number
	experimentId?: string
	music?: any
	endCards?: any[]
}

export const buildSocialPreview = ({
	postType,
	videoUrl,
	videoCaption,
	muted,
	durationSeconds,
	experimentId,
	music,
	endCards
}: SocialPreviewInput = {}) => {
	if (postType !== undefined && !Object.values(SocialMediaPostType).includes(postType as any)) {
		throw new TypeError(`postType ${postType} is not one of ${Object.keys(SocialMediaPostType).join(', ')}`)
	}

	if (durationSeconds !== undefined && (!Number.isFinite(Number(durationSeconds)) || Number(durationSeconds) < 0)) {
		throw new TypeError('durationSeconds must be a non-negative number of seconds, not milliseconds')
	}

	const metadata = drop({
		socialMediaPostType: postType,
		linkMediaDuration: durationSeconds === undefined ? undefined : Math.round(Number(durationSeconds)),
		linkInlineVideoMuted: muted === undefined ? undefined : !!muted,
		videoContentUrl: videoUrl,
		videoContentCaption: videoCaption,
		musicMetadata: music,
		fbExperimentId: experimentId
	})

	return drop({
		linkPreviewMetadata: Object.keys(metadata).length ? metadata : undefined,
		videoContentUrl: videoUrl,
		musicMetadata: music,
		endCardTiles: endCards?.length ? endCards : undefined
	})
}

export const readSocialPreview = (msg: any) => {
	const message = msg?.message ?? msg
	const text = message?.extendedTextMessage
	if (!text) {
		return null
	}

	const metadata = text.linkPreviewMetadata
	if (!metadata && !text.endCardTiles?.length && !text.videoContentUrl) {
		return null
	}

	return drop({
		postType: metadata?.socialMediaPostType,
		durationSeconds: metadata?.linkMediaDuration,
		muted: metadata?.linkInlineVideoMuted,
		videoUrl: metadata?.videoContentUrl ?? text.videoContentUrl,
		videoCaption: metadata?.videoContentCaption,
		music: metadata?.musicMetadata ?? text.musicMetadata,
		experimentId: metadata?.fbExperimentId,
		endCards: text.endCardTiles?.length ? text.endCardTiles : undefined
	})
}
