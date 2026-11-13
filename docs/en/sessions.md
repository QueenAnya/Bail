# Authentication and session storage

Auth state contains credentials and Signal keys. Losing it usually means linking the device again; leaking it can compromise the linked account. Keep session files, database access, and connection strings private.

For every auth-state implementation that returns `saveCreds`, register it on the socket's `creds.update` event:

```js
sock.ev.on('creds.update', saveCreds)
```

## Multi-file auth state

```js
import { useMultiFileAuthState } from '@teamolduser/baileys'
const { state, saveCreds } = await useMultiFileAuthState('./session')
```

This is convenient for development and a single bot instance. Do not delete or edit key files while the socket is running.

## Database-backed auth states

This repository includes database adapter functions in the ported modules. Check each function's options and lifecycle contract before using it:

- `useMongoAuthState2` — MongoDB driver adapter with session namespacing and batch key operations.
- `useSqliteAuthState` — Anya's existing SQLite auth-state adapter.
- `useSqliteAuthState2` — separate Elaina-compatible SQLite adapter with `clearAuth()` and `close()` support.
- `usePostgresAuthState` — PostgreSQL adapter.
- `useMySQLAuthState` — MySQL adapter.
- `useRedisAuthState` — Redis adapter.
- `useNekoDBAuth` — adapter for a caller-provided NekoDB-like database instance.
- `useTursoAuthState` — Turso / libSQL adapter. `{ path: './auth.db' }` for a local file, or
  `{ url: 'libsql://<db>-<org>.turso.io', authToken }` for Turso cloud.

The package declares `mongodb`, `mysql2`, `pg`, `ioredis` and `@libsql/client` as runtime dependencies, so npm/Yarn installs these database drivers automatically. The driver modules are loaded only when their corresponding adapter is used. `useNekoDBAuth` accepts an already connected NekoDB instance and does not import or install a NekoDB client package for you.

## `useMongoAuthState2`

The new adapter is deliberately separate from Anya's existing MongoDB auth-state API. It accepts a MongoDB URI, an existing client, a database, or a collection:

```ts
import makeWASocket, { useMongoAuthState2 } from '@teamolduser/baileys'

const auth = await useMongoAuthState2({
  uri: process.env.MONGODB_URI,
  dbName: 'whatsapp',
  collectionName: 'baileys_auth',
  session: 'bot-1'
})

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)
```

Available options:

| Option | Description |
| --- | --- |
| `uri` | MongoDB connection URI; creates a client owned by this adapter when used alone. |
| `clientOptions` | Options passed to the MongoDB driver's `MongoClient` constructor. |
| `client` | Existing `MongoClient`; this adapter does not close it. |
| `db` | Existing MongoDB `Db` instance. |
| `collection` | Existing collection; takes precedence over `db`/`client` resolution. |
| `dbName` | Database name selected from the client. |
| `collectionName` | Collection name; defaults to `baileys_auth`. |
| `session` | Namespace for this bot's records; defaults to `default`. Use a unique value per independent bot/session. |

The returned object contains `state`, `saveCreds`, `clearAuth()`, and `close()`.

- `clearAuth()` deletes auth records for the configured `session` only.
- `close()` closes the MongoDB client only when `useMongoAuthState2` created it from `uri`. Caller-supplied clients are not closed.
- Keep `session` stable across restarts to resume the same session. Use different names to isolate separate bots sharing one collection.
- Do not call `clearAuth()` unless you intend to remove that session's stored credentials and keys.

## `useSqliteAuthState2`

`useSqliteAuthState2` is the Elaina-compatible SQLite implementation, added separately so the existing `useSqliteAuthState` API remains unchanged. It uses `better-sqlite3`, which is already a package dependency in this repository.

```ts
import makeWASocket, { useSqliteAuthState2 } from '@teamolduser/baileys'

const auth = await useSqliteAuthState2({ dbPath: './auth.db' })
const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// Call only when intentionally clearing this auth database's Baileys auth rows.
// await auth.clearAuth()

// Close the database only when this adapter opened it from dbPath.
await auth.close()
```

You can instead pass an existing `better-sqlite3` `Database` instance with `{ database: db }`; that connection remains caller-owned and `auth.close()` will not close it. The adapter uses the Elaina-compatible `creds` and `signal_keys` tables. `clearAuth()` deletes the auth rows in those tables, so do not use it if those tables contain auth state you want to preserve.

## `useTursoAuthState`

Turso / libSQL adapter. It covers both shapes Turso offers through one `@libsql/client` client:

| Target | Options | URL used |
| --- | --- | --- |
| Local database file | `{ path: './auth.db' }` | `file:./auth.db` |
| Turso cloud | `{ url: 'libsql://<db>-<org>.turso.io', authToken }` | as given |
| Explicit | `{ url: 'file:./auth.db' }` | as given |

```ts
import makeWASocket, { useTursoAuthState } from '@teamolduser/baileys'

// local file — no account, no token
const auth = await useTursoAuthState({ path: './auth.db', session: 'bot-1' })

// Turso cloud — a token is only sent when you supply one
const cloud = await useTursoAuthState({
    url: 'libsql://my-db-myorg.turso.io',
    authToken: process.env.TURSO_TOKEN,
    session: 'bot-1'
})

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// await auth.clearAuth()   // removes every row of this session
await auth.close()          // closes the client only when this adapter created it
```

Rows live in one table (`baileys_auth` by default, override with `table`) keyed by `(session, type, id)`, so several
bots can share one database. `apply()` writes through `client.batch(…, 'write')`, so an app-state patch lands in a
single transaction. `@libsql/client` is a runtime dependency and is imported lazily — a bot that does not use Turso
never loads it. `toLibsqlUrl({ path, url })` is exported if you want to resolve the URL yourself.

## Sessions across the file-based adapters

Every auth adapter now takes a `session`, so several bots can share one backend — one database, one folder, or one
file. Leaving it out keeps the previous layout exactly as it was.

| Adapter | Backend | What `session` does | `clearAuth()` scope |
| --- | --- | --- | --- |
| `useMultiFileAuthState(folder, { session })` | folder | files go in `<folder>/<session>` | that session's files |
| `useSingleFileAuthState(file, { session })` | one JSON file | keys are stored as `<session>:<key>` | that session's keys |
| `useSqliteAuthState2({ dbPath, session })` | SQLite | keys are stored as `<session>:<key>` | that session's rows |
| `useNekoDBAuth(db, collection, { session })` | NekoDB | keys are stored as `<session>:<key>` | that session's documents |
| `useMongoAuthState2({ uri, session })` · `usePostgresAuthState` · `useMySQLAuthState` · `useRedisAuthState` · `useTursoAuthState` | database | namespaced rows / keys / hashes | that session's rows |

```ts
// two bots, one folder
const a = await useMultiFileAuthState('./auth', { session: 'bot-a' })   // ./auth/bot-a/creds.json
const b = await useMultiFileAuthState('./auth', { session: 'bot-b' })   // ./auth/bot-b/creds.json

// two bots, one JSON file
const c = await useSingleFileAuthState('./auth.json', { session: 'bot-c' })   // {"bot-c:creds": …}
```

Notes that apply to all of them:

- `clearAuth()` removes **only that session** when a session is set; with no session it clears the whole store, which
  is the old behaviour.
- A session name is used as a path segment by the folder adapter, so `/` and `..` are replaced — a session cannot
  escape its folder.
- The single-file adapter writes with a 3-second debounce. Two adapters on one file merge on flush instead of
  overwriting each other, and `flush()` forces an immediate write (call it before shutdown).

## Store lifecycle

When shutting down a bot, stop accepting new work, close the socket according to your application's lifecycle, and call `auth.close()` for adapters that return it. Do not close a shared database client from an auth adapter that does not own it.

## Production guidance

Use encrypted transport where supported, restrict database permissions, store secrets in environment/secret managers, back up the data securely, and never commit session files or connection strings to version control.
