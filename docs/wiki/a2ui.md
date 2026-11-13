# A2UI cards

A2UI is the card format Meta uses for rich, structured replies. The builders live in
`src/Extras/MessageBuilder/extras.ts` and produce the node tree the spec expects.

```ts
import { a2uiText, a2uiImage, A2UI_BASIC_CATALOG, BLOKS_A2UI_TYPE } from '@teamolduser/baileys'

const card = {
	type: BLOKS_A2UI_TYPE,
	catalog: A2UI_BASIC_CATALOG,
	body: [
		a2uiImage('img', 'https://example.com/cover.jpg'),
		a2uiText('title', 'Anya Baileys', { variant: 'heading' }),
		a2uiText('body', 'Multi-device socket, MessageBuilder and channels.')
	]
}
```

| Export | Purpose |
|---|---|
| `BLOKS_A2UI_TYPE` | the `im_a2ui` type string the client expects |
| `BLOKS_A2UI_REPLY_ACTION` | action id used when the user taps the card |
| `A2UI_BASIC_CATALOG` | the v0.9 basic catalog URL |
| `a2uiText(id, text, { variant })` | a text node (`body`, `heading`, …) |
| `a2uiImage(id, url, { variant, fit })` | an image node; throws on an empty URL |

Cards are validated by the client, not by us — a node with an unknown `variant` or a missing id is dropped silently, so
send one card to a test number before wiring it into a flow.
