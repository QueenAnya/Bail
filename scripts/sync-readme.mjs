#!/usr/bin/env node
/**
 * sync-readme.mjs — copy README.md to .github/README.md and make the relative paths survive the move.
 *
 * A relative asset path that works at the repository root does not work one directory deeper, which is why the logo
 * shows on the root README and appears broken in `.github/README.md`:
 *
 *   README.md          src="Media/logo.png"   -> /Media/logo.png
 *   .github/README.md  src="Media/logo.png"   -> /.github/Media/logo.png   (does not exist)
 *
 *   node scripts/sync-readme.mjs          # write the copy
 *   node scripts/sync-readme.mjs --check  # exit 1 if the copy is stale
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'README.md')
const target = join(root, '.github', 'README.md')
const check = process.argv.includes('--check')

if (!existsSync(source)) {
	console.error('README.md not found')
	process.exit(2)
}

/** paths that live at the repository root and need `../` when the README is copied one level down */
const ROOT_PATHS = ['Media', 'assets', 'docs', 'Example', 'SECURITY.md', 'LICENSE', 'NOTICE.md', 'package.json']

let copy = readFileSync(source, 'utf8')

for (const dir of ROOT_PATHS) {
	copy = copy.replaceAll(`](${dir}`, `](../${dir}`)
	copy = copy.replaceAll(`"${dir}`, `"../${dir}`)
}

const current = existsSync(target) ? readFileSync(target, 'utf8') : null

if (current === copy) {
	console.log('.github/README.md is in sync')
	process.exit(0)
}

if (check) {
	console.error('.github/README.md is out of date — run `node scripts/sync-readme.mjs`')
	process.exit(1)
}

mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, copy)
console.log('wrote .github/README.md (asset paths rewritten with ../)')
