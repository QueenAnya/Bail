/**
 * from-messages.ts
 * Source: src/Utils/messages.ts
 *
 * Message content builder functions ported from baileys.
 * These are imported back into generateWAMessageContent in messages.ts.
 */
import { proto } from '../../WAProto/index.js'
import type { MessageContentGenerationOptions } from '../Types'
import type {
	AdminInviteInfo,
	CallCreationInfo,
	PaymentInviteInfo,
	PaymentMessageOptions
} from '../Types/Message'
import { generateThumbnail } from '../Utils/messages-media'

// ── adminInvite → newsletterAdminInviteMessage ─────────────────────────────

/**
 * Build newsletterAdminInviteMessage from adminInvite content
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
	if (options.getProfilePicUrl) {
		try {
			const pfpUrl = await options.getProfilePicUrl(adminInvite.jid, 'preview')
			if (pfpUrl) {
				const { thumbnail } = await generateThumbnail(pfpUrl, 'image', {})
				if (thumbnail) msg.jpegThumbnail = Buffer.from(thumbnail, 'base64')
			}
		} catch {}
	}

	return msg
}

// ── call → scheduledCallCreationMessage ───────────────────────────────────

/**
 * Build scheduledCallCreationMessage from call content, including the
 * 'Call Creation' default title.
 */
export function buildCallMessage(call: CallCreationInfo): proto.Message.IScheduledCallCreationMessage {
	return {
		scheduledTimestampMs: call.time ?? Date.now(),
		callType: call.type ?? 1,
		title: call.name ?? 'Call Creation'
	}
}

// ── paymentInvite → paymentInviteMessage ──────────────────────────────────

/**
 * Build paymentInviteMessage from paymentInvite content
 */
export function buildPaymentInviteMessage(paymentInvite: PaymentInviteInfo): proto.Message.IPaymentInviteMessage {
	return {
		expiryTimestamp: paymentInvite.expiry ?? 0,
		serviceType: paymentInvite.type ?? 2
	}
}

// ── payment → requestPaymentMessage ───────────────────────────────────────

/**
 * Build requestPaymentMessage from payment content. `amount` is in the
 * currency's smallest unit (e.g. cents) — both the legacy `amount1000`
 * field and the modern `Money` shape are populated for compatibility.
 */
export function buildPaymentMessage(payment: PaymentMessageOptions): proto.Message.IRequestPaymentMessage {
	// innovatorssoft form also passes `amount` as a string, `from` (= receiverJid), `offset` and `image`
	// ({ placeholderArgb, textArgb, subtextArgb } → background)
	const value = typeof payment.amount === 'string' ? Number(payment.amount) : payment.amount
	const offset = payment.offset && payment.offset > 0 ? payment.offset : 100
	const currency = payment.currency ?? 'IDR'
	return {
		noteMessage: payment.note ? { conversation: payment.note } : undefined,
		currencyCodeIso4217: currency,
		amount1000: Math.round((value * 1000) / offset),
		amount: { value, offset, currencyCode: currency },
		requestFrom: payment.receiverJid ?? payment.from,
		expiryTimestamp: payment.expiry ?? 0,
		...(payment.image
			? {
					background: {
						placeholderArgb: payment.image.placeholderArgb,
						textArgb: payment.image.textArgb,
						subtextArgb: payment.image.subtextArgb
					}
				}
			: {})
	}
}

// ── sticker WebP helpers ──────────────────────────────────────────────────

/**
 * Check if buffer is a valid WebP file (magic bytes: RIFF....WEBP)
 * Source: PR #84 rsalcara/InfiniteAPI
 */
export function isWebPBuffer(buffer: Buffer): boolean {
	if (buffer.length < 12) return false
	const riffHeader = buffer.toString('ascii', 0, 4)
	const webpHeader = buffer.toString('ascii', 8, 12)
	return riffHeader === 'RIFF' && webpHeader === 'WEBP'
}

/**
 * Convert any image/GIF to a WebP sticker at its ORIGINAL size and quality: no 512 cap, no upscaling,
 * WebP quality 100. Quality is NEVER lowered automatically and there is no per-sticker size cap.
 * `square: true` pads to a transparent square whose side is the image's longest side (aspect kept).
 * Animated inputs (GIF/APNG/animated WebP) stay animated.
 */
export const sharpToStickerWebp = async (
	sharpDefault: any,
	buffer: Buffer,
	opts: { square?: boolean } = {}
): Promise<Buffer> => {
	const render = (pad: boolean, side: number): Promise<Buffer> => {
		let img = sharpDefault(buffer, { animated: true })
		if (pad) img = img.resize(side, side, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
		return img.webp({ quality: 100 }).toBuffer()
	}

	if (!opts.square) {
		return render(false, 0)
	}

	const meta = await sharpDefault(buffer, { animated: true }).metadata()
	const w: number = meta.width ?? 512
	const h: number = meta.pageHeight ?? meta.height ?? w
	const side = Math.max(w, h)
	// padding an animated image isn't supported by every sharp build -> fall back to unpadded
	return render(true, side).catch(() => render(false, side))
}
