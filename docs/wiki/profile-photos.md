# Profile photos

```ts
// read the URL of someone's picture
const url = await sock.profilePictureUrl(jid, 'image')

// change your own
import { generateProfilePictureFull, updateProfilePictureFull } from '@teamolduser/baileys'

const { img } = await generateProfilePictureFull(buffer) // resized and encoded the way WA wants it
await sock.updateProfilePicture(sock.user.id, img)
await updateProfilePictureFull(sock.user.id, buffer, sock) // full-quality variant

// remove it
await sock.removeProfilePicture(jid)
```

`generateProfilePictureFull` is the important one: WhatsApp rejects pictures outside its size and aspect rules, and the
helper produces a payload the server accepts. Passing a raw buffer straight to `updateProfilePicture` usually fails
silently.
