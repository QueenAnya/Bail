#!/usr/bin/env node
/**
 * sync-docs-url.mjs — keep the documentation-site URL in the READMEs in step with the real Pages URL.
 *
 * GitHub only knows the address after a deployment, so it cannot be hardcoded safely: it differs for forks, for
 * renames and for custom domains. This takes the URL the deploy step reported and rewrites every
 * `https://<owner>.github.io/<repo>/` occurrence in README.md and .github/README.md.
 *
 *   node scripts/sync-docs-url.mjs https://example.github.io/repo/
 *   DOCS_SITE_URL=https://example.github.io/repo/ node scripts/sync-docs-url.mjs
 *
 * Idempotent: exits 0 without touching the files when nothing changed. `--check` exits 1 when they are stale.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const check = process.argv.includes('--check')
const raw = process.argv.slice(2).find(arg => !arg.startsWith('--')) ?? process.env.DOCS_SITE_URL

if (!raw) {
	console.error('usage: node scripts/sync-docs-url.mjs <site-url>   (or set DOCS_SITE_URL)')
	process.exit(2)
}

const url = raw.trim().replace(/\/+$/, '') + '/'

if (!/^https:\/\/[^\s/]+\//.test(url)) {
	console.error(`not an https URL: ${raw}`)
	process.exit(2)
}

const PAGES_URL = /https:\/\/[A-Za-z0-9-]+\.github\.io\/[A-Za-z0-9._-]+\/?/g
const files = ['README.md', join('.github', 'README.md')]
let stale = 0
let changed = 0

for (const relative of files) {
	const path = join(root, relative)
	if (!existsSync(path)) continue

	const before = readFileSync(path, 'utf8')
	const found = before.match(PAGES_URL)

	if (!found) {
		console.warn(`${relative}: no github.io URL to replace`)
		continue
	}

	if (found.every(match => match === url)) continue

	stale++
	if (check) {
		console.error(`${relative}: still points at ${[...new Set(found)].join(', ')}`)
		continue
	}

	writeFileSync(path, before.replace(PAGES_URL, url))
	changed++
	console.log(`${relative}: ${[...new Set(found)].join(', ')} -> ${url}`)
}

if (check) process.exit(stale ? 1 : 0)
console.log(changed ? `updated ${changed} file(s)` : 'already in sync')
