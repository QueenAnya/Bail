> Halaman ini belum diterjemahkan — isinya masih dalam bahasa Inggris.

## Database auth states

```ts
import makeWASocket, { usePostgresAuthState, useMySQLAuthState, useRedisAuthState, useNekoDBAuth, useTursoAuthState } from '@teamolduser/baileys'

// PostgreSQL (`pg` is installed with the package) - pass a connectionString / config, or your own Pool
const { state, saveCreds, clearAuth, close } = await usePostgresAuthState({ connectionString: process.env.DATABASE_URL, session: 'bot-1' })
// MySQL / MariaDB (`mysql2` is installed with the package)
const mysql = await useMySQLAuthState({ uri: 'mysql://user:pass@host/db', table: 'baileys_auth', session: 'bot-1' })
// Redis (`ioredis` is installed with the package) - one hash per key type: <prefix>:<session>:<type>
const redis = await useRedisAuthState({ uri: 'redis://localhost:6379', session: 'bot-1' })
// NekoDB - pass a connected NekoDB instance
const neko = await useNekoDBAuth(db, 'baileys_auth')
// Turso / libSQL - local file, or Turso cloud with a token
const tursoLocal = await useTursoAuthState({ path: './auth.db', session: 'bot-1' })
const tursoCloud = await useTursoAuthState({ url: 'libsql://my-db-myorg.turso.io', authToken: process.env.TURSO_TOKEN, session: 'bot-1' })

const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

- The MongoDB (`mongodb`), MySQL/MariaDB (`mysql2`), PostgreSQL (`pg`), and Redis (`ioredis`) drivers are declared as runtime dependencies, so the package manager installs them automatically. They are loaded only when the corresponding adapter is used. NekoDB still expects you to pass an already connected database instance.
- `session` lets several bots share one backend — a table, a Redis prefix, a folder or a file. Every adapter takes it
  now, including the file-based ones (`useMultiFileAuthState(folder, { session })`, `useSingleFileAuthState(file, { session })`);
  see sessions across the file-based adapters. `clearAuth()`
  deletes only that session, `close()` closes a connection the helper created itself (a pool / client you passed in is
  never closed).
- Writes are transactional (PostgreSQL / MySQL) or `MULTI` (Redis). Table names must be plain identifiers.
- `makeAuthStateFromStore(store)` builds the same thing on top of any key/value store that implements `AuthStore`.

## MongoDB Auth State 2 (`useMongoAuthState2`)

`useMongoAuthState2` is the Elaina-compatible MongoDB adapter added without changing the existing `useMongoAuthState` API. The `mongodb` driver is declared as a runtime dependency and is installed automatically with the package. Create a MongoDB-backed auth state from a URI:

```ts
import makeWASocket, { useMongoAuthState2 } from '@teamolduser/baileys'

const auth = await useMongoAuthState2({
  uri: process.env.MONGODB_URI!,
  dbName: 'whatsapp',
  collectionName: 'baileys_auth',
  session: 'bot-1'
})

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// On an intentional logout/reset, this deletes only the selected session.
// await auth.clearAuth()

// Call only when this auth-state instance is no longer needed.
// Since the adapter created the client from `uri`, close() closes that client.
// await auth.close()
```

You can instead pass an existing MongoDB `client`, `db`, or `collection`; those resources remain caller-owned and `close()` will not close them. Use the same `session` string to resume a bot and a different string for each independent bot sharing the collection. `clearAuth()` is destructive for that session. The adapter creates a unique `{ session, type, id }` index and uses batched reads plus `bulkWrite` for key updates/removals.

## SQLite Auth State 2 (`useSqliteAuthState2`)

`useSqliteAuthState2` is a separate Elaina-compatible SQLite adapter. The existing `useSqliteAuthState` remains unchanged. This adapter adds `clearAuth()` and `close()` lifecycle methods.

```ts
import makeWASocket, { useSqliteAuthState2 } from '@teamolduser/baileys'

const auth = await useSqliteAuthState2({ dbPath: './auth.db' })
const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// Destructive: clears auth rows from the `creds` and `signal_keys` tables.
// await auth.clearAuth()

// Closes the database only when the adapter opened it from dbPath.
await auth.close()
```

To reuse an existing `better-sqlite3` connection, pass `{ database: db }`. The adapter will not close a caller-owned database handle. The adapter uses the Elaina-compatible `creds` and `signal_keys` schema. `better-sqlite3` is already a dependency of this package.

---

## Turso / libSQL Auth State (`useTursoAuthState`)

One adapter for both shapes Turso offers, because `@libsql/client` speaks the same protocol for each:

| Target | What to pass | Resulting URL |
| --- | --- | --- |
| Local file | `{ path: './auth.db' }` | `file:./auth.db` |
| Turso cloud | `{ url: 'libsql://<db>-<org>.turso.io', authToken: '…' }` | used as given |
| Explicit | `{ url: 'file:./auth.db' }` | used as given |

```ts
import makeWASocket, { useTursoAuthState } from '@teamolduser/baileys'

// local database file — no account, no token
const auth = await useTursoAuthState({ path: './auth.db', session: 'bot-1' })

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// Turso cloud
const cloud = await useTursoAuthState({
    url: 'libsql://my-db-myorg.turso.io',
    authToken: process.env.TURSO_TOKEN,
    session: 'bot-1'
})

// Destructive: removes every row of this session
// await auth.clearAuth()

// Closes the client only when the adapter created it
await auth.close()
```

- A token is only sent when you supply one, so the local file needs neither an account nor a token.
- `session` lets several bots share one database; `table` (default `baileys_auth`) names the table. Rows are
  `(session, type, id, value)` with a composite primary key.
- `apply()` runs through `client.batch(…, 'write')`, so an app-state patch lands in one transaction.
- `@libsql/client` is a declared runtime dependency but is loaded lazily — a bot that never uses Turso does not touch it.
- `toLibsqlUrl({ path })` is exported if you want to resolve the URL yourself before calling.

---

## Memindahkan kredensial ke backend lain

`migrateAuthState` menyalin creds dan seluruh signal key dari satu adapter ke adapter lain, sehingga perangkat tetap
tertaut tanpa scan QR ulang.

```ts
import { migrateAuthState } from '@teamolduser/baileys'

const from = await useMultiFileAuthState('./auth')
const to = await usePostgresAuthState({ pool, session: 'prod' })

const { creds, counts, verified } = await migrateAuthState({ from, to })
// creds: { copied: true, saved: true }   counts: { 'pre-key': 32, … }   verified: true
```

- `from` dan `to` menerima objek adapter atau `.state` langsung. Jika objek adapter, `saveCreds()` dipanggil otomatis.
- Data dialirkan per batch (`batchSize`, default 100); menjalankan ulang aman karena id yang sudah ada dilewati.
- Sumber tidak pernah diubah. Setelah `verified` bernilai true, hapus sendiri dengan `oldAuth.clearAuth()` — buat
  cadangan terlebih dahulu.
- Semua adapter mengimplementasikan `list(type)`, jadi semuanya bisa menjadi sumber.
