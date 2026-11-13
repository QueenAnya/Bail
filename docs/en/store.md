## Store APIs at the package root

The existing in-memory store is available from the package root. It subscribes to socket events when bound and keeps an in-memory view of chats, contacts, messages, groups, presences, and labels. It is not a durable database by itself.

```ts
import makeWASocket, {
  makeInMemoryStore,
  makeOrderedDictionary,
  ObjectRepository,
  useMultiFileAuthState
} from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./auth')
const sock = makeWASocket({ auth: state })
const store = makeInMemoryStore({})
store.readFromFile('./baileys-store.json')
store.bind(sock.ev)

sock.ev.on('creds.update', saveCreds)
// Persist on your own chosen cadence or during graceful shutdown.
store.writeToFile('./baileys-store.json')

// Useful store lookups:
const message = await store.loadMessage('12345@s.whatsapp.net', 'MESSAGE_ID')
const latest = await store.mostRecentMessage('12345@s.whatsapp.net')
const group = await store.fetchGroupMetadata('GROUP_ID@g.us', sock)

// A small ordered dictionary keyed by an item's id:
const recent = makeOrderedDictionary<{ id: string; text: string }>(item => item.id)
recent.upsert({ id: 'm1', text: 'hello' }, 'append')
console.log(recent.get('m1'), recent.array)

// Generic in-memory repository for entities with string ids:
const labels = new ObjectRepository<{ id: string; name: string }>()
labels.upsertById('label-1', { id: 'label-1', name: 'Important' })
console.log(labels.findById('label-1'), labels.findAll())
```

`store.readFromFile()` / `writeToFile()` are synchronous JSON helpers. Protect the file appropriately and prefer a database-backed store if you need durability, concurrent writers, or large histories.
