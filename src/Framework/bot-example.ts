/**
 * bot-example.ts
 * Example usage of the Enterprise Bot Framework.
 *
 * P0 FIX applied vs PR #2710:
 *   Original code called `bot.socket?.ev.on('creds.update', saveCreds)` BEFORE
 *   `await bot.start()`. At that point `bot.socket` is still `null`, so the
 *   optional chain (`?.`) silently no-ops — the listener never gets registered,
 *   and credentials are never persisted. Every restart forces a fresh QR scan.
 *
 *   Fix: `bot.start()` creates `bot.socket` internally and registers all of its
 *   own listeners (see Bot.ts). Consumers should register `creds.update` AFTER
 *   `start()` resolves, once `bot.socket` is guaranteed to exist.
 *
 * Source: WhiskeySockets/Baileys PR #2710 (LuferOS) — fixed for @queenanya/baileys
 */

import { useMultiFileAuthState } from '../Utils/use-multi-file-auth-state'
import { Bot } from './Bot'
import pino from 'pino'

async function main() {
	const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
	const logger = pino({ level: 'info' })

	const bot = new Bot({
		socketConfig: {
			auth: state,
			logger: logger.child({ module: 'baileys' }),
			printQRInTerminal: true
		},
		dbPath: './bot_store.db', // P2 FIX: explicit, distinct per-bot-instance path
		enableStats: true,
		logger: logger.child({ module: 'bot' })
	})

	// ── P0 FIX: start the bot FIRST — this creates bot.socket internally ──────
	await bot.start()

	// ── THEN register creds.update — bot.socket is guaranteed to exist now ────
	bot.socket!.ev.on('creds.update', saveCreds)

	// ── Register commands ──────────────────────────────────────────────────────
	bot.command('!sticker', async ctx => {
		const quoted = ctx.quoted
		const imageMsg = quoted?.imageMessage || ctx.message.message?.imageMessage
		if (!imageMsg) {
			await ctx.reply({ text: 'Reply to or send an image with !sticker' })
			return
		}
		// download logic omitted for brevity — see downloadMediaMessage in Utils
		await ctx.reply({ text: 'Sticker created!' })
	})

	bot.command('!ghosts', async ctx => {
		if (!ctx.remoteJid || !bot.stats) return
		try {
			const ghosts = await bot.stats.getGhosts(ctx.remoteJid, true, 30)
			const list = ghosts.map(g => `- ${g.jid} (${g.isTotalGhost ? 'never active' : 'inactive 30d+'})`).join('\n')
			await ctx.reply({ text: list || 'No ghosts found!' })
		} catch (err) {
			logger.error({ err }, 'ghost detection failed')
			await ctx.reply({ text: 'Could not fetch group data right now.' })
		}
	})

	bot.command('!top', async ctx => {
		if (!ctx.remoteJid || !bot.stats) return
		const top = bot.stats.getTopUsers(ctx.remoteJid, 10)
		const list = top.map((u, i) => `${i + 1}. ${u.jid} — ${u.count} messages`).join('\n')
		await ctx.reply({ text: list || 'No stats yet!' })
	})
}

main().catch(err => {
	console.error('fatal error starting bot:', err)
	process.exit(1)
})
