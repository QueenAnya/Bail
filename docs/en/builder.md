# MessageBuilder and static helpers

Anya includes the ported MessageBuilder module under `src/ported/MessageBuilder/`. The public entry point remains the existing `src/ported/index.ts` barrel, which is re-exported from the package root. The internal folder is not intended to be imported as a separate package entry point.

## Imports

```ts
import {
  MessageBuilder,
  MB,
  Button,
  ButtonV2,
  AIRich,
  AIRichCarousel,
  Toolkit,
  MESSAGE_BUILDER_VERSION,
  mapSection
} from '@teamolduser/baileys'
```

`MB` is an alias of `MessageBuilder`. The builder classes are available as named exports and through the `MessageBuilder`/`MB` namespace object.

## Build an interactive button message

```ts
const message = new Button(sock)
  .setTitle('Anya Menu')
  .setBody('Choose an action')
  .setFooter('Powered by Anya')
  .addReply('Say hello', 'hello')

await message.send('14155550123@s.whatsapp.net')
```

Builder methods can differ by builder type. Consult the method declarations/source for the exact methods available in your installed revision. Use `.build(jid)` when the builder supports building a payload without sending it, and `.send(jid)` when you want it sent directly.

## Static helper attachment

Anya registers helper functions from the MessageBuilder extras, Meta AI, bot-signature, native-flow, and message-helper modules onto the relevant static containers at runtime. The registration is performed internally by `src/ported/MessageBuilder/attach-static-helpers.ts`; it does not require a second public import.

For example, helpers such as `mapSection` can be called through the attached namespace:

```ts
const map = MB.mapSection({ items: [], queryStatus: 'FETCHED' })
const sameMap = MessageBuilder.mapSection({ items: [], queryStatus: 'FETCHED' })
```

The helper is also available as a named package export where exported by the barrel. Prefer named imports for code that does not specifically need Elaina-style static access. Static registration preserves existing class members and does not overwrite an existing property with the same name.

## Main builder families

- `Button` and `ButtonV2` — interactive native-flow buttons.
- `AIRichCarousel` — carousel-style AI-rich sections. The Elaina name `Carousel` is **`CarouselV2`** in this package (the bare name `Carousel` is not exported); `CarouselV2`, `AIRichCarouselV2` and `MB.Carousel` are the same class. See [Elaina-derived names and the V2 aliases](../elaina-interactive-apis-v2.md).
- `AIRich` — AI-rich response payloads and sections. It also offers `addHtmlCard`, `addSelectableText`, `addQuiz`, `addComparisonTable` and `addSports` (from elaina commit `f025122`); see the README for the arguments.
- `Toolkit` — helper utilities exposed by the ported builder module.
- `MessageBuilder` / `MB` — namespace-style access to the builder classes and registered helpers.

## Compatibility notes

WhatsApp's interactive payloads are protocol-sensitive and some renderers are client-specific. A successfully built payload does not guarantee every button or AI-rich primitive will render on every WhatsApp client. Validate your target devices and keep regression tests around helper calls used by your application.

## Access paths

The global `MB` works as in elaina-baileys: `new MB.AIRich(sock)` / `new AIRich(sock)` take the socket as the first argument.

The socket also carries bound versions, so no `sock` argument is needed there:

- `new sock.AIRich()` / `sock.MB.AIRich` (also `Button`, `ButtonV2`, `Carousel`): bound to that socket.
- `sock.MB.sendA2UI(jid, components, options)` and the other `send*` helpers: `sock.MB` adds the socket.
