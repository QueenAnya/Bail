import { execFile } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { promisify } from 'node:util'
import {
    diffBundle,
    liveRevision,
    loadBundle,
    pinnedRevision,
    readForkInterfaces,
    root,
    snapshotBundle,
    writePinnedRevision
} from './protobundle.js'
import { diffSnapshots, renderReport } from './diffbundle.js'

const execFileAsync = promisify(execFile)

const flag = name => process.argv.includes(name)
const option = (name, fallback) => {
    const at = process.argv.indexOf(name)
    return at !== -1 && process.argv[at + 1] ? process.argv[at + 1] : fallback
}

const cacheDir = option('--cache', process.env.WA_BUNDLE_CACHE || join(root, '.wa-bundle'))
const keep = Math.max(2, Number.parseInt(option('--keep', '3'), 10) || 3)
const apply = flag('--apply')
const reportDir = option('--out', join(root, '.wa-bundle'))

mkdirSync(cacheDir, { recursive: true })
mkdirSync(reportDir, { recursive: true })

const chunkCount = path => {
    try {
        return readdirSync(path).filter(name => name.endsWith('.js')).length
    }
    catch {
        return 0
    }
}

/**
 * `sw.js` and the chunk CDN can disagree during a rollout, so a directory named
 * after the advertised revision may hold an older bundle. `snapshot.json`
 * records what the chunks actually said; trust that over the folder name, or a
 * skewed capture sits in the cache forever pretending to be the new revision
 * and the real one never gets downloaded.
 */
const capturedRevision = (path, fallback) => {
    try {
        const meta = JSON.parse(readFileSync(join(path, 'snapshot.json'), 'utf8'))
        return Number.isInteger(meta.revision) ? meta.revision : fallback
    }
    catch {
        return fallback
    }
}

const snapshotDirs = () => readdirSync(cacheDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^\d+$/.test(entry.name))
    .map(entry => {
        const path = join(cacheDir, entry.name)
        return { revision: capturedRevision(path, Number.parseInt(entry.name, 10)), path }
    })
    .filter(entry => chunkCount(entry.path) > 0)
    .sort((a, b) => a.revision - b.revision)

const step = message => console.log(`• ${message}`)

const pinned = pinnedRevision()
step(`Installed repository revision: ${pinned}`)

/**
 * WhatsApp rolls a release out gradually, so different edge nodes answer with
 * different revisions at the same moment. Sampling once picks whichever node
 * replied and can walk backwards between runs; take the highest of a few.
 */
const samples = []
for (let attempt = 0; attempt < 5; attempt++) samples.push(await liveRevision())
const observed = snapshotDirs().map(entry => entry.revision)
const live = Math.max(...samples, pinned, ...observed)
const spread = [...new Set(samples)].sort((a, b) => b - a)
step(`Live WhatsApp Web revision: ${live}`)
if (spread.length > 1) step(`  multiple revisions are being served simultaneously: ${spread.join(', ')}`)
if (live > Math.max(...samples)) step(`  this sample set peaked at ${Math.max(...samples)}; using the higher previously observed value`)

let current = snapshotDirs().find(entry => entry.revision === live)

if (current) {
    step(`Snapshot for revision ${live} already exists at ${current.path}; reusing it`)
}
else {
    const staging = join(cacheDir, '.staging')
    rmSync(staging, { recursive: true, force: true })
    step(`Downloading bundle for revision ${live}`)
    const meta = await snapshotBundle({
        directory: staging,
        onProgress: (done, total) => {
            if (done % 100 === 0 || done === total) step(`  ${done}/${total} chunk`)
        }
    })
    if (meta.failed) step(`  ${meta.failed} chunks failed to download`)
    if (meta.revision !== live) {
        step(`  served chunks are for revision ${meta.revision}, not ${live}`)
    }
    const target = join(cacheDir, String(meta.revision))
    rmSync(target, { recursive: true, force: true })
    renameSync(staging, target)
    step(`  snapshot saved to ${target}`)
    current = { revision: meta.revision, path: target }
}

const analyzed = current.revision
const previous = snapshotDirs().filter(entry => entry.path !== current.path && entry.revision !== analyzed).pop()
if (analyzed !== live) step(`Revision actually analyzed: ${analyzed}`)

step('Reading protobuf specifications from the bundle')
const bundle = await loadBundle({ directory: current.path })
const fork = readForkInterfaces()
const { missingMessage, gaps, undeclared } = diffBundle(bundle, fork)
const protoGaps = missingMessage.length + gaps.length

step(`Field Message: bundle ${bundle.messageFields.size}, WAProto ${fork.get('Message').size}`)
step(`Fields missing from WAProto: ${protoGaps}`)

let snapshotDiff
if (previous) {
    step(`Comparing against revision ${previous.revision} snapshot`)
    try {
        snapshotDiff = await diffSnapshots(previous.path, current.path)
    }
    catch (error) {
        step(`  could not read snapshot ${previous.revision} (${error.message}); skipping the revision diff`)
        snapshotDiff = undefined
    }
}
else {
    step('No previous snapshot; skipping the revision diff')
}

const run = async (label, file, env = {}) => {
    step(`Running ${label}`)
    try {
        const { stdout } = await execFileAsync(process.execPath, [join(root, 'script', file)], {
            cwd: root,
            env: { ...process.env, ...env },
            maxBuffer: 64 * 1024 * 1024
        })
        return { ok: true, output: stdout.trim() }
    }
    catch (error) {
        return { ok: false, output: String(error.stdout || '').trim() + '\n' + String(error.stderr || error.message).trim() }
    }
}

const verify = await run('verifyproto (round-trip encoder)', 'verifyproto.js', {
    PROTO_BUNDLE_DIR: current.path,
    PROTO_OFFLINE: '1'
})
step(verify.ok ? `  ${verify.output.split('\n').pop()}` : '  FAILED')

const protocolTouched = snapshotDiff ? snapshotDiff.protocolTouched : protoGaps > 0

let verdict
if (protoGaps > 0) verdict = 'needs-work'
else if (!verify.ok) verdict = 'blocked'
else if (analyzed !== pinned) verdict = protocolTouched ? 'bump-and-review' : 'bump-only'
else verdict = 'no-change'

const VERDICTS = {
    'no-change': 'The installed revision is already current. Nothing needs to be done.',
    'bump-only': 'The revision increased, but no protocol surface changed. Only a version bump is needed.',
    'bump-and-review': 'The revision increased AND protocol surfaces changed. Review the diff before bumping the version.',
    'needs-work': 'WAProto is missing protobuf fields. Run sync:proto and verify again.',
    blocked: 'The encoder round-trip failed. DO NOT bump the version until this passes.'
}

const lines = []
lines.push('# WhatsApp Web Update Report')
lines.push('')
lines.push(`- Installed revision: \`${pinned}\``)
lines.push(`- Live revision: \`${live}\``)
lines.push(`- Analyzed revision: \`${analyzed}\``)
lines.push(`- Snapshot used: \`${current.path}\``)
lines.push(`- Comparison snapshot: \`${previous ? previous.path : 'none'}\``)
lines.push('')
lines.push(`## Conclusion: \`${verdict}\``)
lines.push('')
lines.push(VERDICTS[verdict])
if (analyzed !== live) {
    lines.push('')
    lines.push(`The CDN is still serving chunks for revision \`${analyzed}\` even though \`sw.js\` announces \`${live}\`. The bundle for revision \`${live}\` has not been read, so that revision is not used for any conclusion.`)
}
lines.push('')
lines.push('## Protobuf checks')
lines.push('')
lines.push(`- Field \`Message\`: bundle ${bundle.messageFields.size}, WAProto ${fork.get('Message').size}`)
lines.push(`- Missing \`Message\` fields: ${missingMessage.length}`)
if (missingMessage.length) for (const [name, id] of missingMessage) lines.push(`  - \`${name}\` (field ${id})`)
lines.push(`- Types with missing fields: ${gaps.length}`)
if (gaps.length) for (const gap of gaps) lines.push(`  - \`${gap.type}\`: ${gap.fields.map(field => field.name).sort().join(', ')}`)
lines.push(`- Types not declared in WAProto at all: ${undeclared.length}`)
lines.push(`- Round-trip encoder: ${verify.ok ? 'passed' : 'FAILED'}`)
if (!verify.ok) {
    lines.push('')
    lines.push('```')
    lines.push(verify.output.slice(0, 4000))
    lines.push('```')
}
lines.push('')

if (snapshotDiff) {
    lines.push(renderReport(snapshotDiff).split('\n').slice(1).join('\n'))
}
else {
    lines.push('## Revision diff')
    lines.push('')
    lines.push('Skipped: no previous revision snapshot is cached.')
    lines.push('')
}

const markdown = lines.join('\n')
const markdownPath = join(reportDir, 'report.md')
const jsonPath = join(reportDir, 'report.json')
writeFileSync(markdownPath, markdown + '\n')
writeFileSync(jsonPath, JSON.stringify({
    pinned,
    live,
    analyzed,
    verdict,
    protoGaps,
    missingMessage,
    gaps: gaps.map(gap => ({ type: gap.type, fields: gap.fields.map(field => field.name) })),
    undeclared: undeclared.length,
    verifyPassed: verify.ok,
    protocolTouched,
    snapshot: current.path,
    comparedWith: previous ? previous.path : null,
    diff: snapshotDiff ?? null
}, null, 2) + '\n')

console.log('')
console.log(markdown)
console.log('')
step(`Reports written to ${markdownPath} and ${jsonPath}`)

if (apply) {
    if (verdict === 'bump-only' || verdict === 'bump-and-review') {
        const touched = writePinnedRevision(analyzed)
        step(touched.length ? `Version bumped to ${analyzed} in: ${touched.join(', ')}` : 'No version files changed')
    }
    else {
        step(`--apply ignored: verdict is \`${verdict}\`, not a version bump`)
    }
}

const cached = snapshotDirs()
for (const entry of cached.slice(0, Math.max(0, cached.length - keep))) {
    step(`Removing old snapshot ${entry.path}`)
    rmSync(entry.path, { recursive: true, force: true })
}

if (verdict === 'needs-work' || verdict === 'blocked') process.exitCode = 1
