import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const wasmDir = path.join(root, 'assets', 'wasm')
const expected = {
  'whatsapp.wasm': '5f1350997c0bf3213782a7bdd3c846529d328552bfa7b87f10224f021346ce35',
  'loader.js': 'f26ed41f30313d790b3022476b7e88c6d99941909c30d0a35c15619d98826bad',
  'worker-modules.js': '4f52cd02c8310a19820176362d292687b02c4a9cf81cc78fbf8e5cc4a28f4e99',
}
const missing = []
const mismatched = []
for (const [name, expectedHash] of Object.entries(expected)) {
  const file = path.join(wasmDir, name)
  if (!fs.existsSync(file)) {
    missing.push(name)
    continue
  }
  const actual = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
  if (actual !== expectedHash) mismatched.push({ name, expected: expectedHash, actual })
}
const readme = path.join(wasmDir, 'README.md')
if (!fs.existsSync(readme)) missing.push('README.md')
if (missing.length || mismatched.length) {
  if (missing.length) console.error(`Missing merged VoIP assets: ${missing.join(', ')}`)
  for (const item of mismatched) console.error(`SHA-256 mismatch for ${item.name}: expected ${item.expected}, got ${item.actual}`)
  process.exitCode = 1
} else {
  console.log(`Verified merged VoIP WASM assets and SHA-256 checksums: ${Object.keys(expected).join(', ')}`)
}
