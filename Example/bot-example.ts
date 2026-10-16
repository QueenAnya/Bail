import { Bot, downloadMediaMessage, useMultiFileAuthState, type WAMessage } from '../src'

async function startBot() {
	const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info')

	const bot = new Bot({
		auth: state,
		printQRInTerminal: true,
		enableStats: true
	})

	// Command to convert any image/video into a sticker
	bot.command('!sticker', async ctx => {
		const msg = ctx.message

		// Check whether the message contains media or quotes a message containing media
		const isMedia = msg.message?.imageMessage || msg.message?.videoMessage
		const quotedMessage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
		const isQuotedMedia = quotedMessage?.imageMessage || quotedMessage?.videoMessage

		if (!isMedia && !isQuotedMedia) {
			await ctx.reply({ text: 'Please send an image or video with the !sticker command, or reply to one.' })
			return
		}

		try {
			await ctx.react('⏳')

			// If this is a quoted message, extract it using the Baileys utility.
			// PR #2710 review fix: build a real WAMessage (with a `key`) instead of
			// `as any` — downloadMediaMessage reads `message.key` for its reupload
			// retry path, so a bare `{ message: quotedMessage }` silently breaks it.
			const mediaMessage: WAMessage = isQuotedMedia
				? {
						key: {
							remoteJid: msg.key.remoteJid,
							id: msg.message?.extendedTextMessage?.contextInfo?.stanzaId,
							participant: msg.message?.extendedTextMessage?.contextInfo?.participant
						},
						message: quotedMessage
					}
				: msg

			// Download the buffer using Baileys
			const buffer = await downloadMediaMessage(mediaMessage, 'buffer', {})

			// MAGIC: MediaManager automatically converts the buffer to WebP and adds the author
			await ctx.replySticker(buffer, {
				packname: 'My Bot Stickers',
				author: '@luisf'
			})

			await ctx.react('✅')
		} catch (error) {
			console.error('Error while creating sticker:', error)
			await ctx.reply({ text: 'An error occurred while converting the sticker.' })
		}
	})

	await bot.start()

	// PR #2710 review fix: this listener must be attached AFTER bot.start()
	// creates the socket — `bot.socket` is undefined until then, so the
	// original `bot.socket?.ev.on(...)` placed before start() was a silent
	// no-op and credentials were never persisted.
	bot.socket?.ev.on('creds.update', saveCreds)

	console.log('🤖 Bot started. Try sending an image with !sticker!')
}

startBot()
