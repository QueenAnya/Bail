import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.join(root, 'src', 'Extras', 'Voip2')
const target = path.join(root, 'lib', 'Extras', 'Voip2')
fs.mkdirSync(target, { recursive: true })
fs.cpSync(path.join(source, 'assets', 'wasm'), path.join(target, 'assets', 'wasm'), { recursive: true, force: true })
for (const name of ['LICENSE', 'NOTICE.md']) {
  fs.copyFileSync(path.join(source, name), path.join(target, name))
}
console.log('Copied Elaina Voip2 WASM assets and notices into lib/Extras/Voip2')
