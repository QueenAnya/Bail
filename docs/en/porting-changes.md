# Porting and compatibility changes

This page documents the additions made during the Anya/Elaina comparison and follow-up fixes. It describes the repository state represented by this documentation update; it does not claim that a full build or runtime test suite has passed.

## 1. MessageBuilder static helper attachment

**Location:** `src/ported/MessageBuilder/`

The helper modules are kept together in a dedicated folder. `attach-static-helpers.ts` is an internal side-effect module imported by the existing `src/ported/index.ts` barrel. The folder is not exported as a second public entry point.

The attachment registers helpers from the MessageBuilder extras, Meta AI, bot-signature, native-flow, and message-helper modules on the supported static containers. The registration preserves existing properties instead of replacing them. `MessageBuilder` and `MB` refer to the same namespace object.

Example:

```ts
import { MB, MessageBuilder } from '@teamolduser/baileys'

const section = MB.mapSection({ items: [], queryStatus: 'FETCHED' })
const sameSection = MessageBuilder.mapSection({ items: [], queryStatus: 'FETCHED' })
```

Use named exports when static namespace-style access is not needed. Since this is a ported interactive-message implementation, test payloads on target WhatsApp clients.

## 2. Store root exports

**Locations:** `src/ported/store-exports.ts`, `src/ported/index.ts`, `src/Store/index.ts`, `src/__tests__/store-exports.test.ts`

The Store API is re-exported by `src/ported/store-exports.ts` and `src/ported/index.ts`; the existing package-root `src/index.ts` already exports the ported barrel, so Store helpers are available at the package root without a separate Store export path. Public Store exports include:

- `makeInMemoryStore`
- `makeOrderedDictionary`
- `ObjectRepository`
- `waChatKey`
- `waMessageID`
- `waLabelAssociationKey`
- `BaileysInMemoryStoreConfig` (type)

Example:

```ts
import {
  makeInMemoryStore,
  makeOrderedDictionary,
  ObjectRepository
} from '@teamolduser/baileys'
```

`makeInMemoryStore` binds to socket events and keeps an in-memory view of chats, contacts, messages, group metadata, presences, and labels. It is not a replacement for a durable database.

## 3. MongoDB `useMongoAuthState2`

**Location:** `src/ported/use-mongo-auth-state2.ts`

This new function is intentionally separate from the existing `useMongoAuthState` implementation, so current callers are not forced onto a changed API. It is exported through `src/ported/index.ts` and the package root.

It supports:

- MongoDB URI/client creation when a URI is supplied;
- caller-supplied `client`, `db`, or `collection`;
- configurable database and collection names;
- a `session` namespace for isolating bots in a shared collection;
- batched key reads and `bulkWrite` updates/removals;
- `clearAuth()` for the current session;
- `close()` that only closes a client owned by the adapter.

The MongoDB driver is declared as a runtime dependency and is installed automatically by the package manager. Keep the same `session` name to resume an existing bot and use distinct names for independent bots. `clearAuth()` is destructive for that session.

## 4. SQLite `useSqliteAuthState2`

**Location:** `src/ported/use-sqlite-auth-state2.ts`

This separate Elaina-compatible SQLite adapter preserves the existing `useSqliteAuthState` API. It accepts either `dbPath` or an existing `better-sqlite3` `database` handle and returns `state`, `saveCreds()`, `clearAuth()`, and `close()`. A database opened from `dbPath` is owned by the adapter and closed by `close()`; a supplied database handle remains caller-owned. It uses the `creds` and `signal_keys` tables from the Elaina implementation.

```ts
import { useSqliteAuthState2 } from '@teamolduser/baileys'

const auth = await useSqliteAuthState2({ dbPath: './auth.db' })
// Register auth.saveCreds on sock.ev's creds.update event.
// await auth.clearAuth() // destructive: deletes auth rows in the two auth tables
await auth.close()
```

## 5. Package metadata and compatibility tests

The MongoDB, MySQL/MariaDB, PostgreSQL, and Redis drivers are listed as runtime dependencies so users do not need to install them separately. The repository also contains compatibility test scripts for selected inherited test files and a Store export regression test. Run the actual build and test commands in an environment where dependencies can be installed before treating these changes as fully verified:

```bash
yarn install
yarn build
yarn test --runInBand
yarn test:compat
```

The static archive checks performed while preparing this update do not substitute for the full TypeScript build, Jest suite, integration tests, or a live WhatsApp session.

## 6. Cumulative ZIP and ported-folder organization

The current archive is cumulative across the earlier audit, static-verification, MessageBuilder, Store, MongoDB AuthState2, and English-documentation updates. The current code implementations introduced for these ports are organized under `src/ported/`, including `MessageBuilder/`, `use-mongo-auth-state2.ts`, `store-exports.ts`, the socket wrapper fix, and the other Elaina-derived feature modules.

Tests remain under `src/__tests__/` and `test/`; dependency metadata and scripts remain in `package.json`; user-facing guides remain under `docs/en/`; and the root README / LICENSE / audit files remain at repository level. These are supporting files rather than runtime feature implementations, so they are intentionally not moved into `src/ported/`.

## Elaina name compatibility

**Locations:** `src/Extras/index.ts`, `src/Extras/v2.ts`, `src/Voip/index.ts`, `src/__tests__/elaina-name-compat.test.ts`

- `src/Extras/index.ts` now re-exports `./v2`, so the 222 explicit `V2` aliases (for example `CarouselV2`, `TaskStatusV2`) are available from the package root. Before this change the file existed but was not exported.
- The Elaina name `Carousel` is `CarouselV2` here (same class as `AIRichCarousel` and `MB.Carousel`); the bare name `Carousel` stays unexported because it is already a message type.
- `src/Voip/index.ts` exports the Elaina VoIP names `ActiveCall`, `VoipClient`, `AudioFeeder`, `VideoFeeder` and `VIDEO_FORMAT_I420` next to `MergedVoipClient` / `makeVoipClient`. The old `createVoipClient({ authDir })` factory remains unexported.

See [Elaina-derived names and the V2 aliases](../elaina-interactive-apis-v2.md) for the full list.

## Elaina sync: commit f025122 to the 21-oct build

**Locations:** `src/Extras/MessageBuilder/index.ts`, `src/Extras/v2.ts`, `src/WABinary/generic-utils.ts`, `WAProto/`, `src/Defaults/`, `src/Utils/generics.ts`, `.github/workflows/auto-update.yml`, `package.json`

- Commit `f025122` only added five `AIRich` methods: `addHtmlCard`, `addSelectableText`, `addQuiz`, `addComparisonTable`, `addSports`. They are present here (plus `...V2` aliases) even though elaina removed them in its 15-oct build.
- Carousel biz node and empty header title/subtitle (`headerText` in `src/Utils/messages.ts`, plus the builder header) follow elaina's 21-oct fixes.
- WhatsApp Web version `2.3000.1050764678` and the WAProto additions from the 21-oct build are applied; see the README section "Elaina sync notes" for the field list. `Message.requestLocationMessage` / `requestLocationUpdateMessage` use empty placeholder types because elaina never defines them.
- `BotModeSelectionMetadata.BotUserSelectionMode` now uses `DEFAULT_MODE` / `THINK_HARD_MODE` (previously `UNKNOWN_MODE` / `REASONING_MODE`) in the generated WAProto files and the `BotMetadata` sub-proto.
- `libsignal` stays on `@teamolduser/libsignal@1.0.1`; elaina's move to the registry `libsignal@^6.0.0` was not adopted, so `yarn.lock` is unchanged.

- `sock.MB` and `sock.AIRich` are attached to the socket in `src/Extras/socket.ts` and bound to it (no `sock` argument, `send*` helpers included). The global `MB` is unchanged from elaina-baileys: `new MB.AIRich(sock)`.

- ffmpeg: VoIP audio/video feeders and media conversion now spawn the bundled `ffmpeg-static` binary when it exists (`src/Utils/ffmpeg-path.ts`), and fall back to `ffmpeg` on PATH. `package.json` allows only the `ffmpeg-static` install script to run (`dependenciesMeta`), so `yarn install` downloads its binary even when Yarn disables dependency build scripts by default. If it was installed before this change, run `yarn rebuild ffmpeg-static` once; no system ffmpeg or PATH change is needed.

Usage examples: `assets/examples/airich_widgets.js` and `assets/examples/waproto_additions.js`. None of this has been built, linted or run against a live WhatsApp session in the environment where it was prepared.

