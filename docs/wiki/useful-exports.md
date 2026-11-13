# Useful exports

A few things you will reach for once a bot grows.

| Export | What it is |
|---|---|
| `TTLCache` | in-memory cache with per-entry expiry — safer than a plain `Map` for anything user-driven |
| `MessageStore` | keeps a copy of received messages so deleted ones can still be read |
| `extractMessageContent` | unwraps ephemeral / view-once / edited wrappers and returns the inner message |
| `extractMessageText` | pulls the text out of any message type |
| `isDeleteMessage` / `getDeletedMessageKey` | detect a revoke and find what it pointed at |
| `getMessageType` / `getMediaType` | classify a message without a long switch |
| `normalizeJidForSend` / `parseJid` | fix a jid before it reaches the wire |
| `loadOptionalModule` | load a driver lazily with a helpful error when it is missing |
