#!/usr/bin/env node
/**
 * Checks that every page declared in `docs/meta.json` has a file somewhere, using the same lookup order the site
 * builder uses:
 *
 *   docs/<language>/<id>.md  ->  docs/wiki/<id>.md  ->  docs/en/<id>.md
 *
 * `build:docs2` used to fail on the first missing file, which turned one absent page into a dead site build. This
 * script reports the same problem in a second, without building anything, so CI can fail early and clearly.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { root } from './protobundle.js'

const docs = join(root, 'docs')
const meta = JSON.parse(readFileSync(join(docs, 'meta.json'), 'utf8'))

const candidatesFor = (language, id) => {
	const list = [join(docs, language, `${id}.md`)]
	if (language !== 'en') list.push(join(docs, 'wiki', `${id}.md`), join(docs, 'en', `${id}.md`))
	else list.push(join(docs, 'wiki', `${id}.md`))
	return list
}

const missing = []
const fallbacks = []
const duplicateIds = []
const seen = new Set()

for (const page of meta.pages) {
	if (seen.has(page.id)) duplicateIds.push(page.id)
	seen.add(page.id)

	if (page.generated === 'api') continue

	for (const language of meta.languages) {
		const candidates = candidatesFor(language, page.id)
		const found = candidates.find(candidate => existsSync(candidate))
		if (!found) {
			missing.push({ language, id: page.id, looked: candidates.map(c => c.slice(root.length + 1)) })
		} else if (found !== candidates[0]) {
			fallbacks.push(`${language}/${page.id} -> ${found.slice(root.length + 1)}`)
		}
	}
}

const relative = path => path.slice(root.length + 1)

if (duplicateIds.length) {
	console.error(`Duplicate page id(s) in docs/meta.json: ${duplicateIds.join(', ')}`)
}

if (fallbacks.length) {
	console.log(`${fallbacks.length} page(s) fall back to another folder (the site still builds):`)
	for (const line of fallbacks) console.log(`  ${line}`)
}

if (missing.length) {
	console.error(`\n${missing.length} page(s) have no file anywhere — build:docs2 would fail:`)
	for (const entry of missing) {
		console.error(`  ${entry.id} (${entry.language}) — looked in ${entry.looked.join(', ')}`)
	}
	console.error('\nFix one of: add the markdown file, or drop the page from docs/meta.json.')
	process.exit(1)
}

console.log(`\nAll ${meta.pages.length} declared pages resolve for ${meta.languages.join(' + ')}.`)
if (duplicateIds.length) process.exit(1)
