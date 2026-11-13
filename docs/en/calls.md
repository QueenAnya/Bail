## 🎧 Call queues, screen sharing and group calls

These options belong to the media-call methods of the unified `voip` client — `voip.call()`, `voip.callGroup()` and `voip.joinGroupCall()` (the Elaina-style engine). See the [unified VoIP API](#unified-voip-api) note about switching engines, and Voice calling for the basics.

### Audio queue

```js
const voip = await sock.makeVoipClient()

const call = await voip.call('628123456789', {
  playlist: ['intro.mp3', 'song.mp3'],
  idleGraceMs: 30000,   // wait this long after the queue runs dry before hanging up
  durationMs: 0         // 0 = no fixed length, the queue decides
})

call.enqueue('next-track.mp3')   // add a track while the call is running
call.queued()                    // tracks still waiting
call.nowPlaying()                // the track being played
call.skip()                      // jump to the next track
```

By default the call ends once the queue is empty, after `idleGraceMs` (0 unless you set it); pass `endWhenQueueEmpty: false` to keep it open until you end it. Sources can be files, URLs or anything ffmpeg reads.

### Video queue

One-to-one and group calls both accept video. Frames come from ffmpeg just like the audio does, so the video source can be a file, a URL, a still image or a `lavfi:` generator.

```js
const call = await voip.call('628123456789', {
  video: true,
  videoPlaylist: ['clip.mp4'],
  playlist: ['song.mp3'],
  durationMs: 0
})

call.on('videotrack', track => console.log('now showing', track))
```

```js
const call = await voip.callGroup('12345-67890@g.us', {
  video: true,
  videoPlaylist: ['clip.mp4']
})
```

Video has its own queue, separate from the audio queue: `playVideo`, `enqueueVideo`, `skipVideo`, `queuedVideo` and `nowPlayingVideo`, with the `videotrack` and `videotrackend` events. The rule for ending the call stays tied to the audio queue, so the call ends when the audio runs out, not when the pictures do.

A still image is looped rather than shown for a single frame, which makes it an easy way to send a steady card:

```js
await voip.call('628123456789', { video: true, videoSource: './poster.jpg', playlist: ['song.mp3'] })
```

The engine picks the resolution and frame rate when the call connects, and the feeder scales to fit, padding so the aspect ratio is kept. Frames go to the WASM encoder as I420. When the queue runs dry the last frame is held instead of cutting to black, so a stall reads as a frozen picture, not a flicker.

Audio and video are two ffmpeg processes with two different clocks. Playing the same file through both will drift apart; if you need the two locked together, give the file to `playlist` only and keep the picture a still image.

### Screen sharing

The same video, sent as a screen share rather than as a camera. It is a separate WASM entry point, so the receiver sees it labelled as a shared screen instead of as if the bot turned its camera on.

```js
const call = await voip.call('628123456789', {
  screenShare: true,
  videoPlaylist: ['slide.png'],
  playlist: ['narration.mp3']
})
```

`screenShare: true` already implies `video: true`. Switch it on and off mid-call with `call.startScreenShare()` and `call.stopScreenShare()`; `call.isScreenShare()` reports which one is live.

Which is better depends on what you send, and both are worth testing on a real call:

- **Screen share** suits still content — slides, lyrics, a single card. The encoder favours sharpness over motion, and a 16:9 source is not forced into a portrait camera frame.
- **The camera path** suits moving pictures and reaches everyone. Screen sharing is gated by `calling_screen_share_milestone_version`: a recipient on an older WhatsApp gets an "please update" dialog instead of your content. Groups also cap how many participants may share, and usually only one may share at a time.

### Group calls

```js
const call = await voip.callGroup('12345-67890@g.us', {
  playlist: ['one.mp3', 'two.mp3'],
  idleGraceMs: 30000,
  durationMs: 0
})
```

`callGroup` reads the member list from the group's metadata, resolves each member's LID and devices, then calls them all. Pass `participants` to call only some of them, or `metadata` if you already have it and want to skip the fetch.

To join a call somebody else started, hand `joinGroupCall` what the incoming offer says:

```js
const call = await voip.joinGroupCall({
  callId,
  callCreatorJid,
  groupJid,
  playlist: ['one.mp3']
})
```

The queue behaves the same in a group call as in a one-to-one call.

Media is produced by ffmpeg: Anya uses the bundled `ffmpeg-static` binary when it exists and falls back to `ffmpeg` on the `PATH`; set `ffmpegPath` on the client to point at a specific binary. The VoIP resources (`whatsapp.wasm`, `loader.js`, `worker-modules.js`) are WhatsApp Web's own files, carried byte for byte; `npm run verify:assets` re-checks their checksums.

---
