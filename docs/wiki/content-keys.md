# Message content keys

The keys `sendMessage` accepts, with the shape each one expects. Anything not listed here is a wrapper — use
`extractMessageContent` before reading it.

| Key | Sends |
|---|---|
| `text` | plain text |
| `image` / `video` | `Buffer` or `{ url }`, plus `caption` |
| `audio` | `Buffer` or `{ url }`, plus `ptt: true` for a voice note |
| `document` | `Buffer` or `{ url }`, plus `fileName`, `mimetype` |
| `sticker` | `Buffer` or `{ url }` |
| `location` | `{ degreesLatitude, degreesLongitude }` |
| `contacts` | `{ displayName, contacts: [{ vcard }] }` |
| `reaction` | `{ text, key }` |
| `poll` | `{ name, values, selectableCount }` |
| `pollResult` / `pollUpdate` | a vote |
| `delete` | `{ remoteJid, fromMe, id }` — a revoke |
| `edit` | `{ text, ... }` on a message you sent |
| `forward` | `{ key }` |
| `disappearingMessagesInChat` | the timer for a chat |
| `buttons` / `templateButtons` / `sections` | legacy interactive payloads |
| `listMessage` / `buttonsMessage` / `templateMessage` | pre-built protos |
| `externalAdReply` | the ad-style card |
| `viewOnce` | wrap a media message as view-once |
| `ptv` | a video note |
| `album` | several media items in one send |

Wrapper keys you will *receive* (never send these as content):

```
ephemeralMessage, viewOnceMessage, viewOnceMessageV2, viewOnceMessageV2Extension,
documentWithCaptionMessage, editedMessage, associatedChildMessage,
groupStatusMessage, groupStatusMessageV2, spoilerMessage, lottieStickerMessage
```
