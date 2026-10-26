import { liveRevision, writePinnedRevision } from './protobundle.js'

/**
 * Pins the live WhatsApp Web client revision in every place Anya declares it
 * (src/Defaults/index.ts, src/Utils/generics.ts, src/Defaults/baileys-version.json).
 * No checks are run here, `npm run wa:update -- --apply` is the guarded way to do the same.
 */
const revision = await liveRevision()
const touched = writePinnedRevision(revision)

console.log(`WhatsApp Web version: [2, 3000, ${revision}]`)
console.log(touched.length ? `Updated: ${touched.join(', ')}` : 'Unchanged')
