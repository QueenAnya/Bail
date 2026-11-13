# Auth state adapters

Every adapter accepts the same eight call shapes — positional, an options object, or any mix:

```ts
// the same eight shapes, shown on the PostgreSQL adapter
usePostgresAuthState(connectionString, table, session)
usePostgresAuthState({ connectionString, table, session })
usePostgresAuthState(connectionString)
usePostgresAuthState({ connectionString })
usePostgresAuthState(connectionString, { table, session })
usePostgresAuthState({ connectionString }, table, session)
usePostgresAuthState(connectionString, table, { session })
usePostgresAuthState(connectionString, { table }, session)
```

The first argument is always where the data lives — a filename, a folder, a dbPath, a url, a uri, a connection string,
or a live handle such as a pool, client or collection. The second is the next level down, when the backend has one: a
token, a collection, a table or a connection name. The third is the session, so several bots can share one database or
folder. Adapters without a middle level simply take the session in its place.



[← back to the README](../README.md)

## Database auth states

```ts
import makeWASocket, { usePostgresAuthState, useMySQLAuthState, useRedisAuthState, useNekoDBAuth, useTursoAuthState } from '@teamolduser/baileys'

// PostgreSQL (`pg` is installed with the package) - pass a connectionString / config, or your own Pool
const { state, saveCreds, clearAuth, close } = await usePostgresAuthState({ connectionString: process.env.DATABASE_URL, session: 'bot-1' })
// MySQL / MariaDB (`mysql2` is installed with the package)
const mysql = await useMySQLAuthState({ uri: 'mysql://user:pass@host/db', table: 'baileys_auth', session: 'bot-1' })
// Redis - one hash per key type: <prefix>:<session>:<type>
// `useRedisAuthState` speaks both clients and loads whichever package is installed (`ioredis` ships with the package,
// `redis` is yours to add). `useRedisAuthState2` is the node-redis-only variant: same layout, explicit API.
const redis = await useRedisAuthState({ uri: 'redis://localhost:6379', session: 'bot-1' })
// `url` is the same option — handy when the value comes from REDIS_URL
const redisFromEnv = await useRedisAuthState({ url: process.env.REDIS_URL, session: 'bot-1' })
const redis2 = await useRedisAuthState2({ uri: 'redis://localhost:6379', session: 'bot-2' })

// or bring your own client - both accept one, and neither closes a client it did not create
const ioredis = new Redis('redis://localhost:6379')
await useRedisAuthState({ client: ioredis })
const nodeRedis = createClient({ url: 'redis://localhost:6379' })
await nodeRedis.connect()
await useRedisAuthState2({ client: nodeRedis })
// NekoDB - pass a connected NekoDB instance
const neko = await useNekoDBAuth(db, 'baileys_auth')
// Turso / libSQL - local file, or Turso cloud with a token
const tursoLocal = await useTursoAuthState({ path: './auth.db', session: 'bot-1' })
const tursoCloud = await useTursoAuthState({ url: 'libsql://my-db-myorg.turso.io', authToken: process.env.TURSO_TOKEN, session: 'bot-1' })

const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

- The MongoDB (`mongodb`), MySQL/MariaDB (`mysql2`), PostgreSQL (`pg`), SQLite (`better-sqlite3`), Turso (`@libsql/client`) and Redis (`ioredis` **and** `redis`) drivers are declared as runtime dependencies, so the package manager installs them automatically. They are loaded only when the corresponding adapter is used. NekoDB still expects you to pass an already connected database instance.
- `session` is supported by **every** adapter — multi-file (subfolder), single-file and mongo-file (key prefix), and
  every database adapter (prefix or table suffix). `useMongoFileAuthState(collection, { session })` prefixes the
  document `_id`s with `<session>:`, so several bots can share one collection.
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

## Migrating between adapters

`migrateAuthState` copies creds and every signal key record from one adapter to another, so the device stays paired and
no QR scan is needed.

```ts
import { migrateAuthState } from '@teamolduser/baileys'

const from = await useMultiFileAuthState('./auth')
const to = await usePostgresAuthState({ pool, session: 'prod' })

const result = await migrateAuthState({ from, to })
```

`from` and `to` each accept either the adapter object or the bare `.state`. Passing the adapter lets the migrator call
`saveCreds()` for you; with a bare state you must call it yourself.

| Option | Default | Meaning |
|---|---|---|
| `batchSize` | `100` | records buffered between a `list` pull and a `set` push |
| `skipExisting` | `true` | skip ids already on the destination, so a partial run resumes |
| `verify` | `true` | re-enumerate both sides afterwards and compare id sets |
| `logger` | — | receives `info` / `warn` progress lines |

Result:

```ts
{
	creds: { copied: true, saved: true },
	counts: { 'pre-key': 32, session: 14, 'app-state-sync-key': 3 },
	verified: true,
	warnings: []
}
```

The source is never modified. Listing bypasses the cache layer, so the durable content is what gets copied.

### Which adapters can be a source?

All of them — each implements `list(type)`:

| Adapter | How it enumerates |
|---|---|
| multi-file | scans the session folder |
| single-file | scans the JSON keys |
| sqlite / sqlite2 | `SELECT id, value FROM signal_keys` |
| Postgres / MySQL / Turso | paged `SELECT`, 500 rows at a time |
| Redis / Redis2 | `HGETALL <prefix>:<session>:<type>` |
| mongo / mongo-file | `find({ session, type })` |
| NekoDB | `findMany` plus a key prefix |
| NeDB (`@seald-io/nedb`) | `find` on the `k` prefix |
| cache-manager | `keys()` plus a key prefix |

`useSingleFileAuthStateLegacy` is the exception: it is a byte-for-byte upstream reference kept for parity and is
deprecated — migrate *away* from it by first opening the same file with `useSingleFileAuthState`.

### Clearing the old auth afterwards

The migrator does not delete anything on the source. That is deliberate: if verification fails you would lose your
only copy.

Clear it yourself, and only once `verified` came back true:

```ts
const result = await migrateAuthState({ from: oldAuth, to: newAuth })

if (result.verified) {
	await oldAuth.clearAuth()
} else {
	console.warn('not verified — keeping the old state', result.warnings)
}
```

| Adapter | How to clear |
|---|---|
| multi-file | `clearAuth()` — removes that session's `.json` files |
| single-file | `clearAuth()` — removes that session's keys from the shared file |
| sqlite2, Postgres, MySQL, Turso, Redis, Redis2, mongo2, NekoDB | `clearAuth()` — deletes only this session's rows |
| cache-manager | `clearState()` (the name differs) |
| mongo-file | no `clearAuth()` — delete the documents from the collection yourself |

Take a backup first — `cp -r ./auth ./auth.bak`, or a database dump. Clearing is not reversible, and clearing the
wrong session costs another QR scan.
