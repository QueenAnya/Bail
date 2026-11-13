#!/usr/bin/env node
/**
 * README generator — rebuilds the *reference* half of the README from the real sources.
 *
 * The README is maintained by hand, so nothing here runs on its own. Use it when you want to refresh the reference
 * sections after the wiki, the guides or the source changed.
 *
 *   node scripts/generate-readme.mjs             # write README.generated.md (README is untouched)
 *   node scripts/generate-readme.mjs --apply     # replace the marked blocks in README.md
 *   node scripts/generate-readme.mjs --stdout    # print the reference half, write nothing
 *   node scripts/generate-readme.mjs --index     # rebuild only the `📚 Index` table of contents
 *   node scripts/generate-readme.mjs --index --depth=4   # include H4 sub-sections
 *
 * `--apply` only touches the three marked regions. If the markers are not in the README yet, it refuses and tells you
 * where to put them, so a hand-written file is never overwritten by accident.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, basename } from 'node:path'
import { renderIndex } from './lib/headings.mjs'

const ROOT = process.cwd()
const README = join(ROOT, 'README.md')
const OUTPUT = join(ROOT, 'README.generated.md')
const WIKI = join(ROOT, 'docs/wiki')
const GUIDES = join(ROOT, 'docs/en')

const WIKI_BEGIN = '<!-- BEGIN GENERATED: wiki -->'
const WIKI_END = '<!-- END GENERATED: wiki -->'
const GUIDES_BEGIN = '<!-- BEGIN GENERATED: guides -->'
const GUIDES_END = '<!-- END GENERATED: guides -->'
const API_BEGIN = '<!-- BEGIN GENERATED: api -->'
const API_END = '<!-- END GENERATED: api -->'

/** The order the wiki pages appear in, and the title each one gets in the README. */
const WIKI_ORDER = [
	['auth-state.md', 'Auth state adapters'],
	['auth-examples.md', 'Auth adapter examples'],
	['store.md', 'Store APIs'],
	['socket-methods.md', 'Socket methods'],
	['message-content.md', 'Message content'],
	['messagebuilder.md', 'MessageBuilder and AIRich'],
	['native-flow.md', 'Native flow payloads'],
	['interactive-v2.md', 'V2 interactive names'],
	['newsletter.md', 'Newsletter and channels'],
	['calls.md', 'Calls, queues and screen sharing'],
	['voip.md', 'VoIP'],
	['webview.md', 'In-app HTML webview'],
	['account-health.md', 'Account health signals'],
	['pairing.md', 'Pairing code'],
	['anchor-guard.md', 'AnchorGuard'],
	['ad-reply.md', 'External ad reply'],
	['link-previews.md', 'Rich link cards and status previews'],
	['a2ui.md', 'A2UI cards'],
	['message-types.md', 'Message types'],
	['content-keys.md', 'Message content keys'],
	['modern-messages.md', 'Modern message API'],
	['scheduled-messages.md', 'Scheduled messages'],
	['groups.md', 'Group administration'],
	['communities.md', 'Communities'],
	['chat-state.md', 'Chat state, labels and history'],
	['privacy.md', 'Privacy and disappearing messages'],
	['presence.md', 'Presence and read receipts'],
	['profile-photos.md', 'Profile photos'],
	['business.md', 'Business, catalog and labels'],
	['channels.md', 'Channel administration'],
	['calls-deep.md', 'Calls in depth'],
	['events.md', 'Event reference'],
	['socket-config.md', 'Socket config reference'],
	['framework.md', 'Framework'],
	['internals.md', 'Internals'],
	['useful-exports.md', 'Useful exports'],
	['updating-version.md', 'Updating the WhatsApp Web version'],
	['behaviour-changes.md', 'Notable behaviour changes'],
	['migration.md', 'Coming from upstream Baileys'],
	['troubleshooting.md', 'Troubleshooting']
]

/** Folders scanned for exports, and the heading each gets. */
const API_GROUPS = [
	['src/Extras', 'Extras'],
	['src/Addons', 'Addons'],
	['src/Utils', 'Utils']
]

const read = path => readFileSync(path, 'utf8')

/** Re-level a page's headings so they nest under its README section. */
const demote = markdown =>
	markdown
		.split('\n')
		.map(line => {
			const m = line.match(/^(#{1,6})\s/)
			if (!m) {
				return line
			}

			const level = m[1].length
			const target = level <= 2 ? 3 : Math.min(level + 1, 6)
			return '#'.repeat(target) + line.slice(level)
		})
		.join('\n')

const stripTitle = markdown => markdown.replace(/^#\s+.*\n+/, '')

const buildWikiBlock = () => {
	const parts = [
		WIKI_BEGIN,
		'',
		'## 📖 Full reference',
		'',
		'Everything below is the deep reference, written out in full so you do not have to leave this file. The same',
		'material is published as separate pages under [`docs/wiki/`](docs/wiki/) for the documentation site.',
		''
	]

	for (const [file, title] of WIKI_ORDER) {
		const path = join(WIKI, file)
		if (!existsSync(path)) {
			console.warn(`generate-readme: skipping missing ${file}`)
			continue
		}

		parts.push(`### ${title}`, '', demote(stripTitle(read(path))).trim(), '')
		parts.push(`_Also published at [docs/wiki/${file}](docs/wiki/${file})_`, '')
	}

	parts.push(WIKI_END)
	return parts.join('\n')
}

const buildGuidesBlock = async () => {
	const files = (await readdir(GUIDES).catch(() => [])).filter(name => name.endsWith('.md')).sort()
	if (!files.length) {
		return `${GUIDES_BEGIN}\n\n${GUIDES_END}`
	}

	const parts = [
		GUIDES_BEGIN,
		'',
		'## 📘 Feature guides',
		'',
		'Longer walk-throughs, one per feature. The same guides are published under [`docs/en/`](docs/en/) for the docs site.',
		''
	]

	for (const file of files) {
		const body = demote(stripTitle(read(join(GUIDES, file)))).trim()
		const title = basename(file, '.md').replace(/-/g, ' ')
		parts.push(`### ${title}`, '', body, '', `_Also published at [docs/en/${file}](docs/en/${file})_`, '')
	}

	parts.push(GUIDES_END)
	return parts.join('\n')
}

/** Pulls `export …` lines out of a source file: name, kind and the parameter list when there is one. */
const parseExports = source => {
	const out = []
	const lines = source.split('\n')

	for (let i = 0; i < lines.length; i++) {
		const m = lines[i].match(/^export (?:async )?(?:function|const|class|interface|type|enum) (\w+)(.*)$/)
		if (!m) {
			continue
		}

		const [, name, rest] = m
		const kindMatch = lines[i].match(/^export (?:async )?(function|const|class|interface|type|enum)/)
		const kind = kindMatch ? kindMatch[1] : 'const'

		let signature = rest
		if (rest.trim().startsWith('(') || rest.trim().startsWith('<')) {
			let depth = 0
			let j = i
			let text = rest
			for (;;) {
				for (const ch of text) {
					if (ch === '(') depth++
					else if (ch === ')') depth--
				}

				if (depth <= 0) break
				j++
				if (j >= lines.length) break
				text += '\n' + lines[j]
			}

			signature = text
		}

		if (!/^\s*[(<]/.test(signature)) {
			signature = ''
		}

		const paren = signature.indexOf('(')
		if (paren !== -1) {
			let depth = 0
			let end = paren
			for (let k = paren; k < signature.length; k++) {
				if (signature[k] === '(') depth++
				else if (signature[k] === ')') {
					depth--
					if (depth === 0) {
						end = k
						break
					}
				}
			}

			signature = signature.slice(paren, end + 1).replace(/\s+/g, ' ')
		} else {
			signature = ''
		}

		out.push({ name, kind, signature })
	}

	return out
}

const buildApiBlock = async () => {
	const parts = [
		API_BEGIN,
		'',
		'## 🔎 API reference',
		'',
		'Every export from `src/Extras`, `src/Addons` and `src/Utils`, with the signature it is declared with.',
		''
	]

	for (const [dir, title] of API_GROUPS) {
		const files = (await readdir(join(ROOT, dir)).catch(() => []))
			.filter(name => name.endsWith('.ts') && !name.startsWith('index'))
			.sort()

		const rows = []
		for (const file of files) {
			for (const entry of parseExports(read(join(ROOT, dir, file)))) {
				const sig = entry.signature ? `\`${entry.name}${entry.signature}\`` : `\`${entry.name}\``
				rows.push(`| \`${basename(file, '.ts')}\` | ${sig} | ${entry.kind} |`)
			}
		}

		if (!rows.length) {
			continue
		}

		parts.push(`### ${title}`, '', '| Module | Export | Kind |', '| --- | --- | --- |', ...rows, '')
	}

	parts.push(API_END)
	return parts.join('\n')
}

const replaceBlock = (text, begin, end, block) => {
	const start = text.indexOf(begin)
	const stop = text.indexOf(end)
	if (start === -1 || stop === -1) {
		return null
	}

	return text.slice(0, start) + block + text.slice(stop + end.length)
}

/**
 * Rebuilds the `## 📚 Index` list from **every** heading — H1, H2 and H3 — as a nested list.
 *
 * `--depth=N` raises the limit (4 includes the H4 sub-sections). Headings inside code fences are ignored, and duplicate
 * titles get GitHub's `-1`, `-2` suffixes.
 */
const rebuildIndex = (text, depth) => {
	const anchor = text.indexOf('## 📚 Index')
	if (anchor === -1) {
		return { text, changed: false, reason: 'no 📚 Index section' }
	}

	const next = text.indexOf('\n## ', anchor + 5)
	const tail = next === -1 ? '' : text.slice(next)

	const { body, headings } = renderIndex(text, depth)
	const updated = text.slice(0, anchor) + body + tail

	return { text: updated, changed: updated !== text, count: headings.length }
}

const main = async () => {
	const apply = process.argv.includes('--apply')
	const toStdout = process.argv.includes('--stdout')
	const indexOnly = process.argv.includes('--index')
	const depthArg = process.argv.find(arg => arg.startsWith('--depth='))
	const depth = depthArg ? Number(depthArg.split('=')[1]) || 3 : 3

	const wiki = buildWikiBlock()
	const guides = await buildGuidesBlock()
	const api = await buildApiBlock()

	const blocks = [
		[WIKI_BEGIN, WIKI_END, wiki],
		[GUIDES_BEGIN, GUIDES_END, guides],
		[API_BEGIN, API_END, api]
	]

	if (toStdout) {
		console.log(blocks.map(([, , block]) => block).join('\n\n'))
		return
	}

	// `--index` on its own: rebuild the table of contents and leave every other line alone
	if (indexOnly && !apply) {
		if (!existsSync(README)) {
			console.error('generate-readme: README.md not found')
			process.exit(1)
		}

		const current = read(README)
		const result = rebuildIndex(current, depth)

		if (result.reason) {
			console.error(`generate-readme: cannot rebuild the index — ${result.reason}`)
			process.exit(1)
		}

		if (!result.changed) {
			console.log(`generate-readme: index already up to date (${result.count} sections)`)
			return
		}

		writeFileSync(README, result.text)
		console.log(`generate-readme: rebuilt the index (${result.count} sections)`)
		return
	}

	if (apply) {
		if (!existsSync(README)) {
			console.error('generate-readme: README.md not found')
			process.exit(1)
		}

		let text = read(README)
		const present = blocks.filter(([begin, end]) => text.includes(begin) && text.includes(end))
		const absent = blocks.filter(([begin, end]) => !(text.includes(begin) && text.includes(end)))

		for (const [begin, end, block] of present) {
			text = replaceBlock(text, begin, end, block)
		}

		// the index is derived data, so it is rebuilt whether or not any block was applied
		const indexed = rebuildIndex(text, depth)
		if (indexed.text) {
			text = indexed.text
		}

		const before = read(README)
		if (text === before) {
			console.log('generate-readme: README.md is already up to date — nothing written')
			return
		}

		writeFileSync(README, text)
		console.log(
			`generate-readme: wrote README.md (${text.split('\n').length} lines, ${present.length} block(s) applied, index ${indexed.count} entries)`
		)

		if (!present.length) {
			console.warn('generate-readme: no marker pairs in README.md, so no reference blocks were written — index only.')
			console.warn('Add a pair where you want a section generated:')
			for (const [begin, end] of absent) console.warn(`  ${begin}  …  ${end}`)
		} else if (absent.length) {
			console.warn('generate-readme: skipped (no markers in README.md):')
			for (const [begin] of absent) console.warn(`  ${begin}`)
		}

		return
	}

	const body = [
		'<!-- This file is produced by `node scripts/generate-readme.mjs`. It is a candidate, not the README.',
		'     Copy the sections you want into README.md, or add the marker pairs and run `--apply`. -->',
		'',
		blocks.map(([, , block]) => block).join('\n\n'),
		''
	].join('\n')

	writeFileSync(OUTPUT, body)
	console.log(`generate-readme: wrote README.generated.md (${body.split('\n').length} lines)`)
}

await main()
