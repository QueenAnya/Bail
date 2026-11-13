# Message types

Most messages are **not** `conversation`. A disappearing message, a view-once, an edited message and a captioned document
all wrap the real content one or more levels deep. Reading `msg.message.conversation` is therefore the single most common
source of "my bot receives nothing".

```ts
import { extractMessageContent, extractMessageText } from '@teamolduser/baileys'

const inner = extractMessageContent(msg.message) // unwraps ephemeral / viewOnce / edited / documentWithCaption
const text = extractMessageText(msg.message)     // '' when there is no text at all
```

The wrapper keys `extractMessageContent` handles:

```
ephemeralMessage, viewOnceMessage, viewOnceMessageV2, viewOnceMessageV2Extension,
documentWithCaptionMessage, editedMessage, associatedChildMessage,
groupStatusMessage, groupStatusMessageV2, spoilerMessage, lottieStickerMessage
```

If you are branching on the type yourself, check the wrapper first, then the content — never assume the top level.
