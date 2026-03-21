/**
 * from-messages.ts
 * Source: src/Utils/messages.ts
 *
 * Message content builder functions ported from innovatorssoft/baileys.
 * These are imported back into generateWAMessageContent in messages.ts.
 */
import { proto } from '../../WAProto/index.js'
import { WAProto } from '../Types'
import { generateMessageIDV2, unixTimestampSeconds } from '../Utils/generics'
import { sha256 } from '../Utils/crypto'
import { encryptedStream, getStream, toBuffer } from '../Utils/messages-media'
import { generateThumbnail } from '../Utils/messages-media'
import { prepareWAMessageMedia } from '../Utils/messages'
import type { MessageContentGenerationOptions } from '../Types'
import type { AdminInviteInfo, CallCreationInfo, PaymentInviteInfo, StickerPack } from '../Types/Message'

// ── adminInvite → newsletterAdminInviteMessage ─────────────────────────────

/**
 * Build newsletterAdminInviteMessage from adminInvite content
 * Source: messages.ts → adminInvite block
 */
export async function buildAdminInviteMessage(
	adminInvite: AdminInviteInfo,
	contextInfo: any,
	options: MessageContentGenerationOptions
): Promise<proto.Message.INewsletterAdminInviteMessage> {
	const msg: proto.Message.INewsletterAdminInviteMessage = {
		newsletterJid: adminInvite.jid,
		newsletterName: adminInvite.name,
		caption: adminInvite.caption,
		inviteExpiration: adminInvite.expiration,
		contextInfo
	}
	if(options.getProfilePicUrl) {
		try {
			const pfpUrl = await options.getProfilePicUrl(adminInvite.jid, 'preview')
			if(pfpUrl) {
				const { thumbnail } = await generateThumbnail(pfpUrl, 'image', {})
				if(thumbnail) msg.jpegThumbnail = Buffer.from(thumbnail, 'base64')
			}
		} catch {}
	}
	return msg
}

// ── call → scheduledCallCreationMessage ───────────────────────────────────

/**
 * Build scheduledCallCreationMessage from call content
 * Source: messages.ts → call block
 */
export function buildCallMessage(call: CallCreationInfo): proto.Message.IScheduledCallCreationMessage {
	return {
		scheduledTimestampMs: call.time ?? Date.now(),
		callType: call.type ?? 1,
		title: call.name ?? 'Call'
	}
}

// ── paymentInvite → paymentInviteMessage ──────────────────────────────────

/**
 * Build paymentInviteMessage from paymentInvite content
 * Source: messages.ts → paymentInvite block
 */
export function buildPaymentInviteMessage(paymentInvite: PaymentInviteInfo): proto.Message.IPaymentInviteMessage {
	return {
		expiryTimestamp: paymentInvite.expiry ?? 0,
		serviceType: paymentInvite.type ?? 2
	}
}

// ── stickerPack → stickerPackMessage ──────────────────────────────────────

/**
 * Build stickerPackMessage from stickerPack content
 * Source: messages.ts → stickerPack block
 */
export async function buildStickerPackMessage(
	stickerPack: StickerPack,
	options: MessageContentGenerationOptions
): Promise<proto.Message.IStickerPackMessage> {
	const { stickers, cover, name, publisher, packId, description } = stickerPack
	const { zip } = await import('fflate' as any)

	const stickerData: Record<string, any> = {}
	const stickerMetadata = await Promise.all(stickers.map(async (s: any, i: number) => {
		const raw = s.sticker ?? s.data
		const normalizedSticker = Buffer.isBuffer(raw) ? raw :
			typeof raw === 'string' ? { url: raw } : raw
		const { stream } = await getStream(normalizedSticker)
		const buffer = await toBuffer(stream)
		const hash = sha256(buffer).toString('base64url')
		const fileName = `${i.toString().padStart(2, '0')}_${hash}.webp`
		stickerData[fileName] = [new Uint8Array(buffer), { level: 0 }]
		return {
			fileName, mimetype: 'image/webp',
			isAnimated: s.isAnimated || false,
			isLottie: s.isLottie || false,
			emojis: s.emojis || [],
			accessibilityLabel: s.accessibilityLabel || ''
		}
	}))

	const zipBuffer: Buffer = await new Promise((resolve, reject) => {
		zip(stickerData, (err: any, data: any) => err ? reject(err) : resolve(Buffer.from(data)))
	})

	const coverBuffer = await toBuffer((await getStream(
		Buffer.isBuffer(cover) ? cover :
		typeof cover === 'string' ? { url: cover } :
		cover
	)).stream)
	const [stickerPackUpload, coverUpload] = await Promise.all([
		encryptedStream(zipBuffer, 'sticker-pack' as any, { logger: options.logger, opts: options.options }),
		prepareWAMessageMedia({ image: coverBuffer }, { ...options, mediaTypeOverride: 'image' as any })
	])

	const uploadResult = await options.upload(stickerPackUpload.encFilePath, {
		fileEncSha256B64: stickerPackUpload.fileEncSha256.toString('base64'),
		mediaType: 'sticker-pack' as any,
		timeoutMs: options.mediaUploadTimeoutMs
	})

	const coverImage = coverUpload.imageMessage!
	const stickerPackId = packId || generateMessageIDV2()

	return {
		name, publisher, stickerPackId,
		packDescription: description,
		stickerPackOrigin: WAProto.Message.StickerPackMessage.StickerPackOrigin.THIRD_PARTY,
		stickerPackSize: stickerPackUpload.fileLength,
		stickers: stickerMetadata,
		fileSha256: stickerPackUpload.fileSha256,
		fileEncSha256: stickerPackUpload.fileEncSha256,
		mediaKey: stickerPackUpload.mediaKey,
		directPath: uploadResult.directPath,
		fileLength: stickerPackUpload.fileLength,
		mediaKeyTimestamp: unixTimestampSeconds(),
		trayIconFileName: `${stickerPackId}.png`,
		imageDataHash: sha256(coverBuffer).toString('base64'),
		thumbnailDirectPath: coverImage.directPath,
		thumbnailSha256: coverImage.fileSha256,
		thumbnailEncSha256: coverImage.fileEncSha256,
		thumbnailHeight: coverImage.height,
		thumbnailWidth: coverImage.width
	}
}
