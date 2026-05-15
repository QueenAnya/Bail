/**
 * addon: stickerpack
 * Source patch: Baileys-feat-add-stickerpack-support
 *
 * Adds support for sending WhatsApp Sticker Pack messages.
 * Sticker and StickerPack types are the canonical definitions in Types/Message.ts.
 *
 * This addon exports:
 *   - buildStickerPackProto() — builds the proto payload for a StickerPackMessage
 *   - generateStickerPackId() — generates a random pack ID
 *   - STICKER_PACK_MESSAGE_TYPE — the message type string 'sticker_pack'
 */

// Re-export Sticker and StickerPack from Types for convenience
export type { Sticker, StickerPack } from '../Types/index.js'

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Generate a random sticker pack ID (16 hex chars).
 */
export const generateStickerPackId = (): string => {
	const arr = new Uint8Array(8)
	for (let i = 0; i < 8; i++) arr[i] = Math.floor(Math.random() * 256)
	return Array.from(arr)
		.map(b => b.toString(16).padStart(2, '0'))
		.join('')
}

/**
 * Build the proto-level stickerPackMessage payload.
 * The result can be passed directly as the stickerPackMessage field in a proto.IMessage.
 */
export const buildStickerPackProto = (pack: {
	name: string
	publisher: string
	packId?: string
	description?: string
}): {
	name: string
	publisher: string
	packId: string
	description: string
} => ({
	name: pack.name,
	publisher: pack.publisher,
	packId: pack.packId ?? generateStickerPackId(),
	description: pack.description ?? ''
})

/**
 * stickerPack message type marker — getMediaType() returns this for stickerPackMessage.
 */
export const STICKER_PACK_MESSAGE_TYPE = 'sticker_pack' as const
