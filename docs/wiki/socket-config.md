# Socket config reference

Every option `makeWASocket` accepts, grouped by what it changes.

### Connection

| Option | Default | Meaning |
|---|---|---|
| `version` | pinned | the WhatsApp Web version string; `scripts/update-version.ts` refreshes it |
| `browser` | `Browsers.ubuntu('Chrome')` | the fingerprint sent on connect |
| `connectTimeoutMs` | `60_000` | how long to wait for the handshake |
| `defaultQueryTimeoutMs` | `60_000` | per-IQ timeout |
| `keepAliveIntervalMs` | `30_000` | websocket keep-alive |
| `retryRequestDelayMs` | `250` | delay between retries of one request |
| `maxMsgRetryCount` | `5` | decrypt retries before giving up |
| `syncFullHistory` | `false` | request the whole history on pair |
| `shouldSyncHistoryMessage` | — | filter what is synced |
| `markOnlineOnConnect` | `true` | appear online as soon as the socket opens |
| `fireInitQueries` | `true` | send the initial queries (blocklist, privacy, …) |
| `emitOwnEvents` | `false` | emit events for your own messages too |

### Auth and session

| Option | Meaning |
|---|---|
| `auth` | the `AuthenticationState` — every adapter in this README returns one |
| `printQRInTerminal` | show the QR in the terminal |
| `pairingCode` / `requestPairingCode` | pair with a code instead |
| `AnchorGuard` | opt-in anti-crash guard (see above) |
| `AnchorGuardConfig` | options forwarded to the guard |

### Media

| Option | Meaning |
|---|---|
| `generateHighQualityLinkPreview` | fetch a full thumbnail instead of a small one |
| `mediaUploadTimeoutMs` | upload timeout |
| `options` (in `sendMessage`) | per-message overrides, e.g. `{ quoted }`, `{ ephemeralExpiration }` |

### Behaviour

| Option | Meaning |
|---|---|
| `getMessage` | callback used to re-fetch a message the store no longer has — needed for retries and decryption |
| `cachedGroupMetadata` | supply cached group metadata to skip a round trip |
| `enableAutoSessionRecreation` | recreate a broken signal session automatically |
| `enableRecentMessageCache` | keep recent messages in memory for retries |
| `logger` | a pino-compatible logger; `silent` for tests |

```ts
const sock = makeWASocket({
	auth: state,
	browser: Browsers.macOS('Desktop'),
	syncFullHistory: false,
	markOnlineOnConnect: false,
	generateHighQualityLinkPreview: true,
	getMessage: async key => (await store.loadMessage(key.remoteJid!, key.id!))?.message,
	logger: pino({ level: 'warn' })
})
```
