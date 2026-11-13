# Auth state adapters — a, b, c

Every adapter returns an `AuthenticationState` for `makeWASocket`, plus a way to persist the credentials:

```ts
import makeWASocket from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./auth') // or any adapter below
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

## How the arguments line up

Every adapter is called the same way: the location first, then the next level down where the backend has one, then the
session. Each of those three can also arrive inside an options object.

| Position | What goes there | Examples |
| --- | --- | --- |
| location | where the data lives | filename, folder, `dbPath`, `url`, `uri`, `connectionString`, or a live pool / client / collection |
| second level | only where the backend has one | token, collection, table, connection name |
| session | which bot's data this is | `'bot-1'`, `'bot-a'` |

```ts
await useMultiFileAuthState('./auth')                                   // location only
await useMultiFileAuthState({ foldername: './auth', session: 'bot-a' }) // options object
await usePostgresAuthState(connectionString, table, session)            // all three, positional
await usePostgresAuthState({ connectionString, table, session })        // all three, options object
```

---

# One positional argument

One positional argument, nothing else.

### `useSingleFileAuthStateLegacy(filename)`

**Deprecated.** Byte-for-byte upstream: synchronous, no debounce, no atomic swap. Returns `{ state, saveState }` —
`saveState`, not `saveCreds`, and it is not async.

```ts
const { state, saveState } = useSingleFileAuthStateLegacy('./auth.json')
saveState()
```

---

# Three positional arguments

Positional arguments. `b` is the collection name where the backend has one, `c` is the session.

### `useMultiFileAuthState(foldername, { session })`

First argument: the folder. The session becomes a subfolder. One JSON file per key type.

```ts
const { state, saveCreds, clearAuth } = await useMultiFileAuthState('./auth')
const botB = await useMultiFileAuthState('./auth', { session: 'bot-b' }) // ./auth/bot-b/
```

### `useSingleFileAuthState(filename, { session })`

First argument: the file. Debounced (3 s) atomic writes; `flush()` writes now.

```ts
const { state, saveCreds, flush, clearAuth } = await useSingleFileAuthState('./auth.json')
await saveCreds()
await flush() // before shutdown
```

### `useMongoFileAuthState(collection, { session })`

First argument: the collection object itself; the session is the second. Also exported as `useMongoAuthState`.

```ts
const collection = client.db('bot').collection('baileys_auth')
const { state, saveCreds } = await useMongoFileAuthState(collection, { session: 'bot-a' })
```

### `useNekoDBAuth(db, collectionname, { session })`

Takes the connected NekoDB instance, then the collection name, then the session. Positional only — it does not take
an options object.

```ts
const { state, saveCreds, clearAuth } = await useNekoDBAuth(db, 'baileys_auth', { session: 'bot-a' })
```

### `useCacheManagerAuthState(store, sessionname)`

Takes a cache-manager v5 store (`set` / `get` / `del` / `keys`), then the session name as a plain string.
Clearing is `clearState`, not `clearAuth`.

```ts
const { state, saveCreds, clearState } = await useCacheManagerAuthState(cache, 'bot-a')
```

---

# Options object with just the location

Options object with just the location.

### `useSqliteAuthState({ dbpath })`

Takes a `dbPath`, or an existing `database` handle instead.

```ts
const { state, saveCreds } = await useSqliteAuthState({ dbPath: './auth.db' })
```

---

# Options object with every level

Options object: where it lives, then the token / table / collection, then the session.

### `useSqliteAuthState2({ dbpath, session })`

Takes a `dbPath` (alias `path`) or an existing `database`, then the session.

```ts
const { state, saveCreds, clearAuth, close } = await useSqliteAuthState2({
	dbPath: './auth.db',
	session: 'bot-a'
})
```

### `usePostgresAuthState({ connectionstring, table, session })`

Takes a `connectionString` (or its alias `url`, or a `pool` / `config`), then the table, then the session.

```ts
const { state, saveCreds, close } = await usePostgresAuthState({
	connectionString: process.env.DATABASE_URL,
	table: 'baileys_auth',
	session: 'bot-a'
})
```

### `useMySQLAuthState({ uri, table, session })`

Takes a `uri` (or its alias `url`, or a `pool` / `config`), then the table, then the session.

```ts
const { state, saveCreds, close } = await useMySQLAuthState({
	uri: process.env.MYSQL_URL,
	table: 'baileys_auth',
	session: 'bot-a'
})
```

### `useTursoAuthState({ url, token, table, session })`

Takes a `url` for a cloud database, or a `path` for a local file; then the `authToken` / table, then the session.

```ts
const local = await useTursoAuthState({ path: './auth.db', session: 'bot-a' })

const cloud = await useTursoAuthState({
	url: process.env.TURSO_URL, // libsql://my-db-myorg.turso.io
	authToken: process.env.TURSO_TOKEN,
	session: 'bot-a'
})
```

### `useRedisAuthState({ uri, session })`

Takes a `uri` (or its alias `url`, or an existing `client`), then the session. `prefix` defaults to `baileys_auth`.
Speaks `ioredis` and node-redis — commands are looked up by name.

```ts
const { state, saveCreds } = await useRedisAuthState({
	uri: 'redis://localhost:6379', // or { url: process.env.REDIS_URL }
	session: 'bot-a'
})
```

### `useRedisAuthState2({ url, session })`

The node-redis-only variant. Same key layout, so you can swap it with `useRedisAuthState` without migrating.

```ts
const { state, saveCreds, close } = await useRedisAuthState2({
	url: process.env.REDIS_URL,
	session: 'bot-a',
	closeClient: true // also close a client you passed in
})
```

### `useMongoAuthState2({ uri, collectionname, session })`

Takes a `uri` (or its alias `url`, or a `collection` / `db` / `client`), then the collection name (`dbName` goes
with it), then the session.

```ts
const { state, saveCreds, close } = await useMongoAuthState2({
	uri: process.env.MONGO_URL,
	dbName: 'bot',
	collectionName: 'baileys_auth',
	session: 'bot-a'
})
```

---

## Return shapes

Most adapters return `{ state, saveCreds, clearAuth, close }`. The exceptions:

| Adapter | Differs how |
|---|---|
| `useMultiFileAuthState` | no `close` (nothing to close) |
| `useSingleFileAuthState` | adds `flush()` and an alias `saveState` |
| `useSingleFileAuthStateLegacy` | sync, returns `{ state, saveState }` only |
| `useMongoFileAuthState` | returns `{ state, saveCreds }` — no `clearAuth` |
| `useNekoDBAuth` | `clearAuth()` drops the whole collection |
| `useCacheManagerAuthState` | `clearState()` instead of `clearAuth()` |
| `useSqliteAuthState` | returns `{ state, saveCreds }` |

## Sharing one backend between bots

Every adapter takes `c` (session). Omit it (or pass `'default'`) and the layout stays exactly as it was, so existing
deployments do not move.

```ts
const botA = await usePostgresAuthState({ pool, session: 'shop' })
const botB = await usePostgresAuthState({ pool, session: 'support' })
```

## Moving between adapters later

`migrateAuthState` copies creds and every signal key, so switching backends does not need another QR scan. See
[auth-state.md](auth-state.md#migrating-between-adapters).
