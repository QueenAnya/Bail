import { Bot, downloadMediaMessage, useMultiFileAuthState, type WAMessage } from '../src'

async function startBot() {
	const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info')

	const bot = new Bot({
		auth: state,
		printQRInTerminal: true,
		enableStats: true
	})

	// Comando para convertir cualquier imagen/video a sticker
	bot.command('!sticker', async ctx => {
		const msg = ctx.message

		// Verifica si el mensaje tiene multimedia o cita a un mensaje con multimedia
		const isMedia = msg.message?.imageMessage || msg.message?.videoMessage
		const quotedMessage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
		const isQuotedMedia = quotedMessage?.imageMessage || quotedMessage?.videoMessage

		if (!isMedia && !isQuotedMedia) {
			await ctx.reply({ text: 'Por favor, envía una imagen o video con el comando !sticker, o responde a uno.' })
			return
		}

		try {
			await ctx.react('⏳')

			// Si es un mensaje citado, lo extraemos usando la utilidad de Baileys.
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

			// Descargar el buffer usando Baileys
			const buffer = await downloadMediaMessage(mediaMessage, 'buffer', {})

			// MAGIA: El MediaManager convierte el buffer a WebP automáticamente y le pone autor
			await ctx.replySticker(buffer, {
				packname: 'MiBot Stickers',
				author: '@luisf'
			})

			await ctx.react('✅')
		} catch (error) {
			console.error('Error al hacer sticker:', error)
			await ctx.reply({ text: 'Hubo un error convirtiendo el sticker.' })
		}
	})

	await bot.start()

	// PR #2710 review fix: this listener must be attached AFTER bot.start()
	// creates the socket — `bot.socket` is undefined until then, so the
	// original `bot.socket?.ev.on(...)` placed before start() was a silent
	// no-op and credentials were never persisted.
	bot.socket?.ev.on('creds.update', saveCreds)

	console.log('🤖 Bot iniciado. ¡Prueba enviar una imagen con !sticker!')
}

startBot()
