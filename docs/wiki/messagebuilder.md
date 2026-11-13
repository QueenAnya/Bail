# MessageBuilder and AIRich

[← back to the README](../README.md)

## MessageBuilder / AIRich

```ts
import { MB, MessageBuilder, AIRich, Button, sendA2UI, sendHtmlApp, sendAIRichMessage, readRichMessage, verifyRichResponseSignature, forwardRichResponse } from '@teamolduser/baileys'

await new Button(sock).setTitle('Menu').addReply('Ping', 'ping').send(jid)

const rich = new AIRich(sock)
rich.addText('*Report*')
rich.addSection(MB.dividerSection())
rich.addSection(MB.taskSection({ taskId: 'job-1', title: 'Rendering', status: MB.TaskStatus.RUNNING }))
await rich.send(jid)

await sendHtmlApp(sock, jid, '<h1>Hello</h1>', { title: 'Mini app' })

// Elaina-compatible static helper attachment: helpers are available on MB/MessageBuilder.
const map = MB.mapSection({ items: [], queryStatus: 'FETCHED' })
const divider = MessageBuilder.dividerSection()

// Inspect/verify a received signed AI rich response before forwarding it.
const parsedRich = readRichMessage(incomingMessage)
const signature = verifyRichResponseSignature(incomingMessage) // { status: 'passed' } or { status: 'failed', reason }
if (parsedRich && signature.status === 'passed') {
  await forwardRichResponse(sock, jid, incomingMessage)
}
```

- The builder covers tables, code, A2UI cards, HTML mini apps, embedded screens and Meta AI sections (sports, places, quiz, search, ...).
- The Elaina name `Carousel` is **`CarouselV2`** here (the bare name `Carousel` is already a message type, so it is not exported). `CarouselV2`, `AIRichCarousel`, `AIRichCarouselV2` and `MB.Carousel` are all the same class .
- The builder is **licensed separately by its author** - keep the watermark in `src/Extras/MessageBuilder/index.ts` and keep the original watermark and license header in that file.

### AIRich widgets (`addHtmlCard`, `addSelectableText`, `addQuiz`, `addComparisonTable`, `addSports`)

Added from elaina-baileys commit `f025122` ("tambah primitive baru 2.26.39.3 ke MessageBuilder"). Elaina dropped these five methods again in its 15-oct build; they are kept here. They live in `src/Extras/MessageBuilder` next to the other `add*` helpers, each returns the builder, and each also exists as an `...V2` alias (`addQuizV2`, ...). They are experimental, so check that your target clients draw them.

```js
import { AIRich } from '@teamolduser/baileys'
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)

// Send once the connection is open (connection.update -> connection === 'open').
const jid = '6281234567890@s.whatsapp.net'

await new AIRich(sock)
    .setTitle('Widgets')
    .addHtmlCard('<h1>Hello</h1>', { width: 320, height: 160 })          // GenAIHtmlCardPrimitive
    .addSelectableText('Select me', { selectionId: 'sel-1' })              // GenAISelectableTextPrimitive
    .addQuiz('2 + 2?', ['3', { text: '4', correct: true }], { explanation: 'Basic maths' })
    .addComparisonTable(['Feature', 'A', 'B'], [['Speed', 'fast', 'slow']], { highlightLabel: 'A' })
    .addSports([{ home: 'A', away: 'B' }, { home: 'C', away: 'D' }], { league: 'NBA' })
    .send(jid)
```

The global `MB` works exactly as in elaina-baileys: the builders take the socket as their first argument (`new MB.AIRich(sock)`). On top of that, the socket carries bound versions that add `sock` for you:

```js
import { AIRich, MB } from '@teamolduser/baileys'

new MB.AIRich(sock)           // 1. as in elaina-baileys: socket as the first argument
new AIRich(sock)              // 2. named import, same thing
new sock.AIRich()             // 3. bound to this socket, no sock argument
sock.MB.AIRich                // 4. same class through sock.MB; sock.MB.sendA2UI(jid, ...) etc. also take no sock
```

`sock.MB` is `MB` with the builder classes (`AIRich`, `Button`, `ButtonV2`, `Carousel`) and the `send*` helpers (`sendA2UI`, `sendA2UIBloks`, `sendAIRichMessage`, ...) bound to that socket; every other member is passed through unchanged. The global `MB.sendA2UI(sock, jid, ...)` keeps its `sock` argument.

| Method | Arguments | Notes |
|---|---|---|
| `addHtmlCard(html, opts)` | `opts`: `mimeType` (`text/html`), `width` (300), `height` (200), `cardType`, `sandbox` | `html` must be a string |
| `addSelectableText(text, opts)` | `opts`: `selectionId` | the text is also sent as the plain submessage |
| `addQuiz(question, options, opts)` | `options`: non-empty array of strings or `{ text, correct }`; `opts`: `explanation` | a string option counts as a wrong answer |
| `addComparisonTable(columns, rows, opts)` | `rows`: arrays (wrapped into `{ cells }`) or row objects; `opts`: `highlightLabel` | |
| `addSports(games, opts)` | `games`: one game or an array; `opts`: `league` (default for each game) | one game uses the `Single` layout, several use `HScroll` |

All five accept `{ id, replace, insertAt }` like the other `add*` methods, and throw a `TypeError` for invalid input. A runnable version is in `assets/examples/airich_widgets.js`.

### Elaina sync notes (30-sep to 21-oct)

- Default WhatsApp Web version was `2.3000.1050764678` here (now `2.3000.1051456098`; `src/Defaults/index.ts`, `src/Utils/generics.ts`, `src/Defaults/baileys-version.json`, `WAProto/WAProto.proto` header).
- Carousel biz node: `shouldIncludeBizBinaryNode` only returns `true` for a carousel when at least one card holds a native flow message, and `getBizBinaryNode` falls back to the mixed native-flow node when only a later card carries the buttons.
- Interactive message headers (`generateWAMessageContent`) and `AIRich` headers no longer send an empty `title` / `subtitle` (`headerText` in `src/Utils/messages.ts`).
- WAProto additions from the 21-oct build: `Conversation.acp2HistoryWithheld`, `DeviceCapabilities.hostWriteMutationSupport`, `HistorySync.favoriteStickers` / `omittedConversations` / `omittedConversationsProvided`, `Message.instantImageMessage`, `MsgOpaqueData.musicData`, `PollAdditionalMetadata.originalOptions`, `SyncActionValue.communityNestingStateAction` / `sharedDeviceSecretAction`, `WebMessageInfo.eventInviteAdditionalMetadata`, plus the types `RecoverableHistoryConversation`, `EventInviteAdditionalMetadata`, `HostWriteMutationSupport`, `MusicData`, `CommunityNestingStateAction` and `SharedDeviceSecretAction`. `Message.requestLocationMessage` (136) / `requestLocationUpdateMessage` (138) are included too, but elaina references their message types without ever defining them, so here `Message.RequestLocationMessage` and `Message.RequestLocationUpdateMessage` are empty placeholder messages: they encode and decode, and any real contents WhatsApp sends are kept as unknown fields until the real definitions are known. The generated `WAProto/index.js` / `index.d.ts` were patched by hand for these additions; `yarn gen:protobuf` regenerates them from `WAProto/WAProto.proto`.
- `BotModeSelectionMetadata.BotUserSelectionMode` uses the latest names `DEFAULT_MODE` (0) and `THINK_HARD_MODE` (1) in `WAProto/index.js`, `index.d.ts`, `WAProto.proto` and the `BotMetadata` sub-proto (they were `UNKNOWN_MODE` / `REASONING_MODE`).
- `assets/examples/waproto_additions.js` round-trips the new WAProto fields locally (no WhatsApp connection) and prints the default WhatsApp Web version, which is a quick check after `yarn build`.
- `libsignal` stays on `@teamolduser/libsignal@1.0.1`; elaina's switch to the registry `libsignal@^6.0.0` was not adopted.
- `.github/workflows/auto-update.yml` follows elaina's 21-oct flow (manual runs publish only with `publish: true`) but uses yarn, `yarn update:version`, and this package name; the proto refresh stays in `update-proto.yml`.
- `sock.MB` and `sock.AIRich` are attached to the socket (`src/Extras/socket.ts`) and bound to it, so they need no `sock` argument. The global `MB` is unchanged from elaina-baileys (`new MB.AIRich(sock)`).
- ffmpeg: VoIP audio/video feeders and media conversion now spawn the bundled `ffmpeg-static` binary when it exists (`src/Utils/ffmpeg-path.ts`), and fall back to `ffmpeg` on PATH. `package.json` allows only the `ffmpeg-static` install script to run (`dependenciesMeta`), so `yarn install` downloads its binary even when Yarn disables dependency build scripts by default. If it was installed before this change, run `yarn rebuild ffmpeg-static` once; no system ffmpeg or PATH change is needed.
- Comparison against elaina-baileys 1.4.7 (exports, socket methods and behaviour): every socket method and export of elaina exists here (only `Carousel` is named `CarouselV2`, see above). Differences that were found and fixed: `sock.fetchNewChatMessageCap()` now sends the real query type `INDIVIDUAL_NEW_CHAT_THREAD` with id `27910975521856601` and returns the parsed object (`status`, `capped`, `warned`, `unlimited`, `remaining`, ...; see Account health signals); `normalizeMessageContent` unwraps all 32 `FUTURE_PROOF_MESSAGE_KEYS` instead of 11; a `quoted` message without readable content is sent without the quote (with a warning) instead of throwing; `requestPairingCode` validates the phone number format and strips punctuation; the `wa:update`, `wa:diff`, `audit:apk`, `verify:proto`, `verify:mex`, `fetch:bundle`, `check:proto`, `sync:proto`, `test:pairing` and `proto:update` npm scripts are wired and adapted to the TypeScript layout .
- Also taken from elaina 1.4.7: the persisted-query ids and paths of the core newsletter operations in `src/Types/Mex.ts` (`CREATE`, `METADATA`, `SUBSCRIBERS`/`FOLLOWERS`, `SUBSCRIBED`, `ADMIN_COUNT`, `CHANGE_OWNER`, `DEMOTE` and the `xwa2_newsletter_admin_demote` path) together with their call shapes: `newsletterSubscribers()` now returns the follower list (the count is `subscribers` of `newsletterMetadata()`), `newsletterMetadata()` and `newsletterSubscribed()` take the optional switches, `newsletterMute()` / `newsletterUnmute()` go through the user setting, and `newsletterUpdate()` no longer overwrites an update's own `settings` with `null`. `requestPairingCode` rejects an answer that carries no `link_code_pairing_ref` ("accepted without registering it") instead of saving `creds.me`; the pairing tests' server replies now include that reference like the real server's. Ack error `475` raises `message-capping.update`; `NACK_REASONS` gained `StaleGroupAddressingMode` (421) and `NewChatMessagesCapped` (475); 1:1 messages that carry a message secret get the recipient `deviceListMetadata`; `executeWMexQuery` errors name the query and carry the variables that were sent; `isValidUsername` / `validateUsername` follow WhatsApp's real username rules (3-35 characters, `_` allowed at the edges, at least one letter, no leading/trailing/double `.`, no reserved words or domain endings).
- Kept as Anya's own, because it is the better of the two: `fetchLatestBaileysVersion` (live version from wppconnect with a fallback, where elaina reads its own repository's `Defaults/index.js` by line number), `makeNewsletterStatus*` (thin aliases of one shared `makeNewsletterStatusExtras`), `useMongoAuthState` next to elaina's `useMongoAuthState2`, and `downloadMediaMessage`'s handling of Boom status codes. Whether the newsletter ids above are still served can be checked at any time with `npm run verify:mex`.
- Tests: `src/__tests__/Extras/airich-widgets.test.ts` and the extra cases in `src/__tests__/binary/carousel-biz-node.test.ts`.

### A2UI cards and AIRichMessage

Synced from the elaina-baileys 15-oct / 21-oct docs. The render notes below are elaina's findings from testing against real clients; they have not been re-verified for this package.

There are two A2UI payload shapes, and the difference matters:

| Shape | `data` content | Evidence |
|---|---|---|
| Ready-made element | `{"type":"info_card", ...}` and `{"type":"list_card", ...}` | Android knows exactly these two kinds, and WA Web's `a2ui_supported_elements` AB prop lists `"info_card, list_card"` |
| `createSurface` tree | `{version, createSurface:{surfaceId, root, components}}` | WA Web debug fixture; the renderer is lazy-loaded, so it is not verified from the bundle |

```js
import { MB } from '@teamolduser/baileys'
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)

// Send once the connection is open (connection.update -> connection === 'open').
const jid = '6281234567890@s.whatsapp.net'

// Ready-made element: the safest path, because Android only draws info_card and list_card.
await MB.sendA2UI(sock, jid, [], {
    type: 'im_a2ui',
    uuid: crypto.randomUUID(),
    fallback: 'MENU\nPick a category below.',
    data: MB.a2uiInfoCard({ title: 'MENU', body: 'Pick a category below.' })
})

// Same components tree through a rich response (AIRich + bloksSection).
await MB.sendA2UIBloks(sock, jid, [
    MB.a2uiColumn('root', ['img', 't1']),
    MB.a2uiImage('img', 'https://example.com/cover.jpg'),
    MB.a2uiText('t1', 'Hello')
], { uuid: crypto.randomUUID() })
```

- `a2uiInfoCard` / `a2uiListCard` build the element objects; `sendA2UI` and `sendA2UIBloks` both accept any element through `data`.
- `sendA2UIBloks` takes the same `components` tree as `sendA2UI` (raw `data` objects included). `buildA2UISection(components, options)` returns just the section if you want to assemble an `AIRich` yourself.
- `a2uiSurface` writes `root` and no longer adds `catalogId` / `sendDataModel` unless you pass them. When no `fallback` is given, `a2uiFallback` derives one from the card text.

> [!WARNING]
> Per elaina's testing, **a regular account cannot get an A2UI card drawn**, and this is not a payload bug. `sendA2UI` only shows the `fallback` text, and `sendA2UIBloks` shows an empty bubble. The WA Web client gates both: `bloksWidget` cards need `im_a2ui_require_bot_attribution` (default true) to be off or the message to be a 1P biz-bot message, and `WebMessageInfo.is1PBizBotMessage` is set by the server, so a sender cannot fill it. `FOABloksPrimitive` needs the `foABloksNodeRenderer`, which is only enabled behind a gatekeeper. Treat both helpers as tools to verify the payload shape, not as a way to get a rendered card out of a normal account.

`AIRichMessage` builds a full rich response, including the submessages and forwarding context the official generator stamps (`WAWebGenerateRichResponseMessageProto`). `sendAIRichMessage(sock, jid, options)` accepts `sections`, `text`, `nativeFlow` and `submessages` together:

```js
await MB.sendAIRichMessage(sock, jid, {
    text: 'Hello from AIRichMessage',
    submessages: [
        MB.AIRichMessage.inlineImage({ previewUrl: 'https://x/y.jpg', highResUrl: 'https://x/y-hi.jpg' }),
        MB.AIRichMessage.table({ rows: [{ items: ['Price', '10'], isHeading: true }] })
    ]
})
```

- `AIRichMessage.text`, `inlineImage`, `table` and `contentItems` are submessage factories; `AIRichMessage.textSection` and `nativeFlowSection` are section factories. `AIRichMessage.submessage(kind, payload)` picks a factory from `AI_RICH_SUBMESSAGE_KINDS` (`text`, `inline_image`, `table`, `content_items`).
- The forwarding context set by `AIRich.build` includes `botMessageSharingInfo` with `botEntryPointOrigin: 31` (`META_AI_FORWARD`) and a `forwardScore` equal to `forwardingScore`; both can be turned off with the `messageSharing` / `forwarded` options.
- `AIRich.addSubmessage` works without a section, so a submessage can be attached to a message whose sections are empty.
- `FOABloksPrimitive` now has a factory, `bloksSection`.

### Button label and payload forms

All forms below produce the same wire payload. The display-text aliases `display_text`, `text`, `displayText`, `displaytext` and
`buttonText` (string or `{ displayText }`) are accepted, and an already serialized `buttonParamsJson` string is kept byte-for-byte.

```ts
// Native flow button builder (interactiveMessage)
new Button(sock)
  .addButton('quick_reply', { text: 'Hi', id: '1' })                    // -> { text: 'Hi', id: '1', display_text: 'Hi' }
  .addButton('cta_url', JSON.stringify({ display_text: 'Site', url: 'https://example.com' })) // kept as is
  .addButton({ name: 'quick_reply', buttonParamsJson: { displayText: 'Yes', id: 'y' } })      // object form
  .addReply('Direct', '2')

// Legacy buttons builder (buttonsMessage)
new ButtonV2(sock)
  .addButton('Yes', 'y')                                    // addButton(label, id)
  .addButton({ text: 'No', id: 'n' })                       // object form: text | display_text | displayText, id | buttonId | button_id
  .addRawButton({ buttonId: 'm', text: 'Maybe', type: 1 })  // string buttonText / aliases become { displayText }
```

- `Button.addButton` throws a `TypeError` when no native flow button name is given.
- `ButtonV2.addButton({ id })` without any label falls back to an empty label.
