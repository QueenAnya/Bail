# Coming from upstream Baileys

The API is a superset: if your code works against WhiskeySockets/Baileys it works here, with the differences listed in
[Notable behaviour changes](#️-notable-behaviour-changes). A few mechanical steps when switching:

### 1. The package name

```diff
-import makeWASocket from '@whiskeysockets/baileys'
+import makeWASocket from '@teamolduser/baileys'
```

### 2. Auth state — same call, more options

```ts
// unchanged
const { state, saveCreds } = await useMultiFileAuthState('./auth')

// or a database, with the same call shape
const { state, saveCreds } = await usePostgresAuthState({ connectionString: process.env.DATABASE_URL })
```

`useMultiFileAuthState` still takes `(folder)`, so an existing call site needs no edit. Moving to a database later is a
`migrateAuthState` call, not a re-pair.

### 3. Reading messages

```diff
-const text = msg.message?.conversation
+const text = extractMessageText(msg.message)
```

### 4. `libsignal`

This fork pins `libsignal` to its own build (`npm:@teamolduser/libsignal`). Do not override it with the upstream
package — the wire format and the session store expectations differ.

### 5. Optional drivers

`better-sqlite3`, `pg`, `mysql2`, `mongodb`, `ioredis`, `redis`, `@libsql/client` and `@seald-io/nedb` are regular
dependencies, so a plain install is enough. They are loaded lazily — a bot that never touches Postgres never pays for
it.

### 6. Where the extras live

| You want | Import from |
|---|---|
| an auth backend | `use*AuthState` — package root |
| a ported builder (`makeQuestionMessage`, `buildSplitPayment`, …) | package root (`src/Extras`) |
| a small helper (`scheduleMessage`, `generateVCard`, `searchMessages`, …) | package root (`src/Addons`) |
| the socket itself | package root (`makeWASocket`) |

Everything is exported from the root; there are no deep import paths to remember.
