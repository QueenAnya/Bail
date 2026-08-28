// NOTE: @queenanya/baileys is a pure ESM package ("type": "module"), so unlike
// @innovatorssoft/baileys's CommonJS original this file uses `import` instead of
// `require`. Everything below this block is otherwise unchanged from the original.
import {
	makeWASocket,
	useMultiFileAuthState,
	DisconnectReason
} from '../../lib/index.js';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';
import pino from 'pino';
import { fileURLToPath } from 'url';
import { Button, ButtonV2, Carousel, AIRich } from './MessageBuilder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startBot() {
	const authDir = path.join(__dirname, 'auth');

	// Check if clean flag is passed to reset the session
	if (process.argv.includes('--clean')) {
		console.log('Cleaning old auth session directory...');
		if (fs.existsSync(authDir)) {
			fs.rmSync(authDir, { recursive: true, force: true });
			console.log('Old session cleared successfully.');
		} else {
			console.log('No existing session directory found to clean.');
		}
	}

	console.log('Initializing connection...');

	// Setup authentication state
	const { state, saveCreds } = await useMultiFileAuthState(authDir);

	// Check if phone number is passed as an argument for pairing code instead of QR
	const usePairingCode = process.argv.includes('--phone');
	const phoneIndex = process.argv.indexOf('--phone');
	const phoneNumber = usePairingCode && phoneIndex !== -1 ? process.argv[phoneIndex + 1] : null;

	const sock = makeWASocket({
		auth: state,
		syncFullHistory: true,
		logger: pino({ level: 'silent' }),
		markOnlineOnConnect: true
	});

	// Handle pairing code registration if requested
	if (usePairingCode && phoneNumber && !state.creds.registered) {
		setTimeout(async () => {
			try {
				const code = await sock.requestPairingCode(phoneNumber.replace(/[^0-9]/g, ''));
				console.log('\n======================================');
				console.log(`PAIRING CODE: ${code}`);
				console.log('======================================\n');
			} catch (err) {
				console.error('Failed to request pairing code:', err);
			}
		}, 3000);
	}

	sock.ev.on('creds.update', saveCreds);

	sock.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect, qr, reachoutTimeLock } = update;

		if (reachoutTimeLock?.isActive) {
			console.log(`[Reachout TimeLock] Restricted until: ${reachoutTimeLock.timeEnforcementEnds}`);
		}

		if (qr && !usePairingCode) {
			console.log('Scan the QR code below to connect:');
			qrcode.generate(qr, { small: true });
		}

		if (connection === 'close') {
			const shouldReconnect = new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
			console.log('Connection closed due to:', lastDisconnect?.error, '. Reconnecting:', shouldReconnect);
			if (shouldReconnect) {
				startBot();
			} else {
				console.log('Logged out. Please delete the "auth" directory and scan again.');
			}
		} else if (connection === 'open') {
			console.log('\n======================================');
			console.log('WhatsApp Bot is successfully connected!');
			console.log('======================================\n');
		}
	});

	// Listen to messages
	sock.ev.on('messages.upsert', async (update) => {
		try {
			if (!update.messages?.length) return;
			if (update.type !== 'notify') return;

			const [message] = update.messages;
			if (!message || message.key?.fromMe) return;
			if (message.message?.protocolMessage) return;

			const msgContent = message.message || {};
			const jid = message.key.remoteJid;
			if (!jid) return;

			const normalizeJid = (id) => {
				if (!id) return '';
				if (id.includes(':')) {
					const [user, host] = id.split('@');
					const [userId] = user.split(':');
					return `${userId}@${host}`;
				}
				return id;
			};

			const normalizedJid = normalizeJid(jid);

			const getText = () =>
				msgContent.conversation ||
				msgContent.extendedTextMessage?.text ||
				msgContent.imageMessage?.caption ||
				msgContent.videoMessage?.caption ||
				'';

			const getButtonText = () => {
				if (msgContent.listResponseMessage)
					return msgContent.listResponseMessage.title || msgContent.listResponseMessage.description || '';
				if (msgContent.templateButtonReplyMessage)
					return msgContent.templateButtonReplyMessage.selectedDisplayText || msgContent.templateButtonReplyMessage.selectedId || '';
				if (msgContent.buttonsResponseMessage)
					return msgContent.buttonsResponseMessage.selectedDisplayText || msgContent.buttonsResponseMessage.selectedButtonId || '';
				if (msgContent.interactiveResponseMessage) {
					const i = msgContent.interactiveResponseMessage;
					return i.listResponse?.title ||
						i.listResponse?.description ||
						i.nativeFlowResponse?.response?.reply ||
						i.reply ||
						i.buttonReplyMessage?.displayText || '';
				}
				return '';
			};

			const text = (getText() || getButtonText() || '').trim();
			if (!text.startsWith('!')) return;

			const command = text.split(' ')[0].toLowerCase();
			const args = text.slice(command.length).trim();

			console.log(`[Command Received] ${command} from ${normalizedJid}`);

			switch (command) {
				case '!ping': {
					await sock.sendMessage(normalizedJid, { text: 'pong! 🏓' }, { quoted: message });
					break;
				}
				case '!help': {
					await sock.sendMessage(normalizedJid, { text: 'Commands:\\n!button\\n!buttonv2\\n!carousel\\n!airich' }, { quoted: message });
					break;
				}
				case '!button': {
					await new Button(sock)
						.setTitle('🚀 NIXCODE')
						.setSubtitle('Interactive Message')
						.setBody('Pilih menu di bawah')
						.setFooter('© Nixel')
						.setImage('https://cdn.ornzora.eu.cc/b57c0d1e-d7a6-4277-8739-8f6b1d9894e6-FIORA.jpg')
						.addReply('📦 Menu', '.menu', { icon: 'DEFAULT' })
						.addReply('👤 Profile', '.profile', { icon: 'REVIEW' })
						.addUrl(
							'🌐 Website',
							'https://example.com',
							true,
							{ icon: 'PROMOTION' }
						)
						.addCopy(
							'📋 Copy Code',
							'NIX-2026',
							{ icon: 'DOCUMENT' }
						)
						.addSelection('📚 Pilih Kategori')
						.makeSection('Main Menu')
						.makeRow(
							'🔥 HOT',
							'Downloader',
							'Download social media',
							'.dl'
						)
						.makeRow(
							'⚡ FAST',
							'AI Chat',
							'Chat dengan AI',
							'.ai'
						)
						.send(normalizedJid, { quoted: message });
					break;
				}
				case '!buttonv2': {
					await new ButtonV2(sock)
						.setTitle('🚀 NIXCODE')
						.setSubtitle('Buttons Message')
						.setBody('Halo dunia')
						.setFooter('Footer Message')
						.setThumbnail(
							'https://cdn.ornzora.eu.cc/4d2905ce-3707-4ec0-998a-68a3d851629f-FIORA.jpg'
						)
						.addRawButton({
							buttonText: { displayText: '📡 Menu' },
							buttonId: 'Nixel',
							type: 1,
							nativeFlowInfo: {
								name: 'single_select',
								paramsJson: "{\"title\":\"Click Here!\",\"sections\":[{\"title\":\"Fiora Sylvie\",\"highlight_label\":\"\",\"rows\":[{\"header\":\"\",\"title\":\"Nixel\",\"description\":\"\",\"id\":\"\"}]}]}"
							}
						})
						.addButton(
							'👤 Profile',
							'.profile'
						)
						.send(normalizedJid);
					break;
				}
				case '!carousel': {
					await new Carousel(sock)
						.setBody('🛍️ Product List')
						.setFooter('Swipe untuk lihat')
						.addCard(
							await new Button(sock)
								.setTitle('🍔 Burger')
								.setBody('Burger terenak')
								.setFooter('$5')
								.setImage(
									'https://cdn.ornzora.eu.cc/36df8c36-c74e-4dc2-bc03-87893f373cb4-FIORA.jpg'
								)
								.addReply(
									'🛒 Buy',
									'.buy burger'
								)
								.toCard()
						)
						.addCard(
							await new Button(sock)
								.setTitle('🍕 Pizza')
								.setBody('Pizza mozzarella')
								.setFooter('$7')
								.setImage(
									'https://cdn.ornzora.eu.cc/36df8c36-c74e-4dc2-bc03-87893f373cb4-FIORA.jpg'
								)
								.addReply(
									'🛒 Buy',
									'.buy pizza'
								)
								.toCard()
						)
						.send(normalizedJid, { quoted: message });
					break;
				}
				case '!airich': {
					await new AIRich(sock)
						.setTitle('🚀 NIXCODE')
						.setFooter('© Fiora Sylvie')
						.addSuggest("MessageBuilderV4.6")
						.addSuggest(['Nixel', 'NIXCODE', 'Fiora Sylvie', 'AIRich'])
						.addTip('Ini adalah text tip (Metadata Text)')
						.addText(`
# Halo Dunia
## NIXCODE

---

=={ Yellow Text }==

---

Ini hyperlink:
[Text] (url) 
## TRUSTED LINK
[Google](https://google.com)
## UNTRUSTED LINK
[Google](!https://google.com)

Ini auto citation:
[] (url) 
[](https://openai.com)

Ini LaTeX:
[Identifier|?Width|?Height|?Font_Height|?Padding] <url>
[Shiroko|1429|1897]<https://cdn.ornzora.eu.cc/5442e78b-fe26-4cb9-939d-e6df83acad6a-FIORA.png>
                        `)
						.addText('SingleLayout Product (Object Input):')
						.addProduct({
							title: 'Fiora Sylvie',
							brand: 'Nixel',
							price: 'Rp 1000',
							sale_price: 'Rp 0',
							url: 'https://wa.me/6285188349341',
							image: "https://cdn.ornzora.eu.cc/152f4f0b-02fb-4d60-aacc-fc4cfa87ccdb-FIORA.jpg"
						})
						.addText('HScroll Product (Array of Object Input):')
						.addProduct(Array(5).fill({
							title: 'Fiora Sylvie',
							brand: 'Nixel',
							price: 'Rp 1000',
							sale_price: 'Rp 0',
							url: 'https://wa.me/6285188349341',
							image: "https://cdn.ornzora.eu.cc/152f4f0b-02fb-4d60-aacc-fc4cfa87ccdb-FIORA.jpg"
						}))
						.addCode(
							'javascript',
							`class Nixel {
    static hello() {
        return 'Hello World';
    }
}`
						)
						.addTable([
							['Nama', 'Role'],
							['[Nixel](https://wa.me/6285188349341)', 'Developer'],
							['Fiora Sylvie', 'Assistant']
						])
						.addSource([
							[
								'https://cdn.ornzora.eu.cc/dc85c945-96f7-4d50-aaa4-1dff7249aaf4-FIORA.jpg',
								'https://github.com/ValdazGT/',
								'GitHub'
							],
							[
								'https://cdn.ornzora.eu.cc/dc85c945-96f7-4d50-aaa4-1dff7249aaf4-FIORA.jpg',
								'https://fiora.nixel.my.id/',
								'Fiora Sylvie'
							]
						])
						.addImage('https://cdn.ornzora.eu.cc/d987ff9c-c16c-4f1e-a8d6-953e375f4aec-FIORA.jpg')
						.addVideo("https://cdn.ornzora.eu.cc/5c3e1109-38d3-408e-926c-588694fd9581-FIORA.mp4")
						.addVideo({ url: "https://cdn.ornzora.eu.cc/5c3e1109-38d3-408e-926c-588694fd9581-FIORA.mp4", file_length: 100000000, duration: 120, thumbnail: "https://cdn.ornzora.eu.cc/0800269d-8f1e-4c7e-b38e-8684db560345-FIORA.jpg" })
						.addReels(Array(5).fill({
							username: 'Nixel',
							profile: 'https://cdn.ornzora.eu.cc/4d2905ce-3707-4ec0-998a-68a3d851629f-FIORA.jpg',
							thumbnail: 'https://cdn.ornzora.eu.cc/0800269d-8f1e-4c7e-b38e-8684db560345-FIORA.jpg',
							url: 'https://fiora.nixel.my.id/',
							title: 'Demo Reel',
							source: 'IG',
							verified: true
						}))
						.addPost(Array(5).fill({
							profile: "https://cdn.ornzora.eu.cc/2498bf66-6870-4f8a-8421-0a77f7baa95b-FIORA.jpg",
							username: 'Nixel',
							title: "Demo Post",
							subtitle: 'NIXCODE',
							caption: 'hii~ im fiora sylvie, just quietly observing things around here.',
							verified: true,
							url: 'https://fiora.nixel.my.id/',
							thumbnail: 'https://cdn.ornzora.eu.cc/7048efb4-2abf-4081-bdd1-2f65972d793a-FIORA.jpg',
							source: 'INSTAGRAM',
							footer: 'Fiora Sylvie',
							deeplink: 'https://fiora.nixel.my.id/',
							icon: "https://cdn.ornzora.eu.cc/2498bf66-6870-4f8a-8421-0a77f7baa95b-FIORA.jpg",
						}))
						.send(normalizedJid, { quoted: message });
					break;
				}
			}
		} catch (err) {
			console.error(`Error processing message:`, err);
		}
	});
}

startBot().catch(err => {
	console.error('Fatal error starting the bot:', err);
});