// Status sticker / annotation helpers (src/Extras/status-stickers.ts).
//
// This example only BUILDS and READS annotation data, so it needs no socket and no login.
// Attach the annotations only through a message shape your target WhatsApp client supports,
// and test on your own account first: whether a client draws them depends on the rollout.
//
// Run: node assets/examples/status_stickers.js
import {
	stickerArea,
	locationSticker,
	channelSticker,
	linkSticker,
	messageSticker,
	musicSticker,
	normalizeStickers,
	readStickers,
	buildMusicMessage,
	readMusicMessage,
	isMusicHostAllowed
} from '@teamolduser/baileys'

// Positions are fractions of the media (0..1): { x, y, width, height }.
const area = stickerArea({ x: 0.1, y: 0.1, width: 0.3, height: 0.2 })
console.log('area vertices:', area)

// One annotation per sticker; each sticker carries only one action.
const stickers = [
	locationSticker({
		latitude: 37.7749,
		longitude: -122.4194,
		name: 'San Francisco',
		area: { x: 0.1, y: 0.1, width: 0.3, height: 0.2 }
	}),
	channelSticker({
		jid: '120363xxxxxxxxxxxx@newsletter',
		name: 'Updates',
		serverMessageId: 150,
		area: { x: 0.5, y: 0.1, width: 0.3, height: 0.2 }
	}),
	linkSticker({
		url: 'https://example.com',
		title: 'Open site',
		area: { x: 0.1, y: 0.5, width: 0.3, height: 0.2 }
	}),
	messageSticker({
		message: { conversation: 'Quoted content' },
		area: { x: 0.5, y: 0.5, width: 0.3, height: 0.2 }
	}),
	// A music annotation needs a songId or a mediaId (both come from the Meta music catalog).
	musicSticker({
		songId: '1234567890',
		title: 'Song name',
		author: 'Artist',
		startTimeMs: 0,
		durationMs: 15000,
		area: { x: 0.3, y: 0.75, width: 0.4, height: 0.15 }
	})
]

// normalizeStickers validates the shape and returns proto.InteractiveAnnotation objects.
const imageMessage = { interactiveAnnotations: normalizeStickers(stickers) }

// readStickers works on an incoming image/video message (or on the media object itself).
for (const sticker of readStickers({ imageMessage })) {
	console.log(sticker.kind, sticker.area, sticker.music ?? sticker.link ?? sticker.channel ?? sticker.location ?? '')
}

// Standalone music message. songUri / artworkUri must be hosted on a WhatsApp, Facebook or
// Instagram host, otherwise the client draws nothing and buildMusicMessage throws.
console.log('allowed host:', isMusicHostAllowed('https://mmg.whatsapp.net/v/t62.0000-0/song.mp4'))
const musicMessage = buildMusicMessage({
	songId: '1234567890',
	title: 'Song name',
	author: 'Artist',
	songUri: 'https://mmg.whatsapp.net/v/t62.0000-0/song.mp4',
	artworkUri: 'https://mmg.whatsapp.net/v/t62.0000-0/artwork.jpg'
})
console.log('music message read back:', readMusicMessage({ musicMessage }))
