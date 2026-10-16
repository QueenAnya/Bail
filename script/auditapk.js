import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { proto } from '../WAProto/index.js'
import { loadBundle } from './protobundle.js'

/**
 * WAProto is generated from the WhatsApp Web bundle, so anything the Android
 * client knows and Web does not is simply absent from it. Point this at a
 * directory of extracted classesN.dex and it reports what is missing.
 *
 *   node script/auditapk.js <dir-with-classes.dex> [out.txt]
 */

const dir = process.argv[2]
const out = process.argv[3]
const jsonAt = process.argv.indexOf('--json')
const jsonOut = jsonAt !== -1 ? process.argv[jsonAt + 1] : null

/** Java field types the dex declares, mapped to protobuf kinds. */
const KINDS = {
    'Ljava/lang/String;': 'STRING',
    'Lcom/google/protobuf/ByteString;': 'BYTES',
    Z: 'BOOL',
    I: 'INT32',
    J: 'INT64',
    F: 'FLOAT',
    D: 'DOUBLE'
}

/**
 * libsignal's own records are maintained by hand next to the crypto that reads
 * them; patching them from a decompiled client would be reckless.
 */
const HANDS_OFF = new Set([
    'SenderKeyDistributionMessage', 'SenderKeyStateStructure', 'SenderKeyRecordStructure',
    'SessionStructure', 'RecordStructure', 'PreKeyRecordStructure', 'SignedPreKeyRecordStructure',
    'IdentityKeyPairStructure', 'SignalMessage', 'PreKeySignalMessage', 'KeyExchangeMessage',
    'SyncdRecord', 'SyncdMutation', 'Message.AppStateSyncKey'
])

if (!dir) {
    console.error('Usage: node script/auditapk.js <directory-containing-classes.dex> [output.txt]')
    process.exit(1)
}

const uleb = (buffer, offset) => {
    let result = 0
    let shift = 0
    let byte
    do {
        byte = buffer[offset++]
        result |= (byte & 0x7f) << shift
        shift += 7
    } while (byte & 0x80)
    return [result >>> 0, offset]
}

const readValue = (buffer, offset) => {
    const header = buffer[offset++]
    const kind = header & 0x1f
    const size = header >> 5
    if (kind <= 0x06) {
        let value = 0
        for (let i = 0; i <= size; i++) value |= buffer[offset + i] << (8 * i)
        return [value, offset + size + 1]
    }
    if (kind === 0x1e) return [false, offset]
    if (kind === 0x1f) return [true, offset]
    return [null, offset + size + 1]
}

const camel = name => name.toLowerCase().replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase())

/**
 * Field numbers already spoken for in WAProto, read back out of the generated
 * encoder. A name can match while the numbering does not, and writing such a
 * field in would silently overwrite an existing one on the wire.
 */
const takenNumbers = () => {
    const source = readFileSync(new URL('../WAProto/index.js', import.meta.url), 'utf8')
    const taken = new Map()
    for (const match of source.matchAll(/([A-Za-z0-9_]+)\.encode = function encode\(m, w\) \{([\s\S]*?)\n\s*\};/g)) {
        const ids = taken.get(match[1]) ?? new Set()
        for (const tag of match[2].matchAll(/w\.uint32\((\d+)\)/g)) ids.add(Number.parseInt(tag[1], 10) >>> 3)
        taken.set(match[1], ids)
    }
    return taken
}

const readDex = path => {
    const buffer = readFileSync(path)
    const stringCount = buffer.readUInt32LE(0x38)
    const stringOffset = buffer.readUInt32LE(0x3c)
    const typeOffset = buffer.readUInt32LE(0x44)
    const fieldOffset = buffer.readUInt32LE(0x54)
    const classCount = buffer.readUInt32LE(0x60)
    const classOffset = buffer.readUInt32LE(0x64)

    const strings = new Array(stringCount)
    for (let i = 0; i < stringCount; i++) {
        const at = buffer.readUInt32LE(stringOffset + i * 4)
        const [length, start] = uleb(buffer, at)
        let end = start
        let units = 0
        while (units < length) {
            const byte = buffer[end]
            end += byte < 0x80 ? 1 : (byte & 0xe0) === 0xc0 ? 2 : 3
            units++
        }
        strings[i] = buffer.toString('utf8', start, end)
    }

    const typeName = index => strings[buffer.readUInt32LE(typeOffset + index * 4)]
    const fieldName = index => strings[buffer.readUInt32LE(fieldOffset + index * 8 + 4)]

    const classes = []
    for (let i = 0; i < classCount; i++) {
        const at = classOffset + i * 32
        const dataOffset = buffer.readUInt32LE(at + 24)
        if (!dataOffset) continue

        let cursor = dataOffset
        const counts = []
        for (let k = 0; k < 4; k++) {
            const [value, next] = uleb(buffer, cursor)
            counts.push(value)
            cursor = next
        }

        const staticOffset = buffer.readUInt32LE(at + 28)
        const values = []
        if (staticOffset) {
            let q = staticOffset
            const [count, next] = uleb(buffer, q)
            q = next
            for (let k = 0; k < count; k++) {
                const [value, after] = readValue(buffer, q)
                values.push(value)
                q = after
            }
        }

        const fields = []
        const numbers = {}
        const javaTypes = {}
        let index = 0
        for (let k = 0; k < counts[0]; k++) {
            const [delta, afterIndex] = uleb(buffer, cursor)
            index += delta
            const [, afterAccess] = uleb(buffer, afterIndex)
            cursor = afterAccess
            const name = fieldName(index)
            if (!name.endsWith('_FIELD_NUMBER')) continue
            const field = camel(name.slice(0, -13))
            fields.push(field)
            numbers[field] = values[k]
        }

        let instanceIndex = 0
        for (let k = 0; k < counts[1]; k++) {
            const [delta, afterIndex] = uleb(buffer, cursor)
            instanceIndex += delta
            const [, afterAccess] = uleb(buffer, afterIndex)
            cursor = afterAccess
            const name = fieldName(instanceIndex)
            if (name.endsWith('_')) javaTypes[name.slice(0, -1)] = typeName(buffer.readUInt16LE(fieldOffset + instanceIndex * 8 + 2))
        }

        if (fields.length >= 2) {
            classes.push({ cls: typeName(buffer.readUInt32LE(at)), fields: fields.sort(), numbers, javaTypes })
        }
    }
    return classes
}

const collectOurs = () => {
    const found = []
    const walk = (namespace, path) => {
        for (const key of Object.keys(namespace)) {
            const value = namespace[key]
            if (typeof value !== 'function' || !value.prototype) continue
            const fields = Object.keys(value.prototype).filter(k => typeof value.prototype[k] !== 'function' && !k.startsWith('$'))
            if (fields.length) found.push({ name: path + key, fields: fields.map(f => f.toLowerCase()) })
            walk(value, path + key + '.')
        }
    }
    walk(proto, '')
    return found
}

const dexFiles = readdirSync(dir).filter(name => /^classes\d*\.dex$/.test(name)).sort()
if (!dexFiles.length) {
    console.error('No classes*.dex files found in ' + dir)
    process.exit(1)
}

const apk = dexFiles.flatMap(name => readDex(join(dir, name)))
const ours = collectOurs()

const overlap = (fields, other) => {
    const set = new Set(other)
    return fields.filter(field => set.has(field.toLowerCase())).length
}

/**
 * Baileys links as a WhatsApp Web device, so a field the Web bundle does not
 * declare is one the real Web client never sends. Decoding it is free; sending
 * it makes this client look like neither Web nor Android.
 */
const webFields = async () => {
    try {
        const bundle = await loadBundle({ directory: process.env.PROTO_BUNDLE_DIR })
        const map = new Map()
        for (const [name, fields] of bundle.specs) map.set(name, new Set(fields.map(f => f.name.toLowerCase())))
        map.set('Message', new Set([...bundle.messageFields.keys()].map(n => n.toLowerCase())))
        return map
    }
    catch {
        return null
    }
}

const web = await webFields()
const taken = takenNumbers()
const missingTypes = []
const missingFields = []
const matched = new Map()
const claimed = new Map()

for (const entry of apk) {
    if (entry.cls.startsWith('Lcom/google/protobuf/')) continue

    let best = null
    let bestScore = 0
    for (const candidate of ours) {
        const score = overlap(entry.fields, candidate.fields)
        if (score > bestScore) {
            bestScore = score
            best = candidate
        }
    }

    if (!best || bestScore < Math.max(2, entry.fields.length * 0.5)) {
        missingTypes.push(entry.cls + '  ' + entry.fields.map(f => f + '=' + entry.numbers[f]).join(' '))
        continue
    }

    matched.set(entry.cls, best.name)
    const held = claimed.get(best.name)
    if (!held || bestScore > held.score) claimed.set(best.name, { score: bestScore, cls: entry.cls })

    const have = new Set(best.fields)
    const gap = entry.fields.filter(field => !have.has(field.toLowerCase()))
    if (gap.length) {
        missingFields.push(best.name + '  <- ' + entry.cls + '  ' + gap.map(f => f + '=' + entry.numbers[f]).join(' '))
        entry.gap = gap
        entry.ourType = best.name
    }
}

const report = [
    'protobuf classes in APK: ' + apk.length,
    'types in our WAProto: ' + ours.length,
    '',
    '## missing fields (' + missingFields.length + ')',
    ...missingFields.sort(),
    '',
    '## unmatched types (' + missingTypes.length + ')',
    ...missingTypes.sort()
].join('\n')

if (jsonOut) {
    const gaps = []
    const skipped = []
    for (const entry of apk) {
        if (!entry.gap) continue
        if (HANDS_OFF.has(entry.ourType)) {
            skipped.push(entry.ourType + ' (' + entry.gap.join(' ') + ') — libsignal, left unchanged')
            continue
        }
        if (claimed.get(entry.ourType)?.cls !== entry.cls) {
            skipped.push(entry.ourType + ' (' + entry.gap.join(' ') + ') — ' + entry.cls + ' is not the best match')
            continue
        }
        const fields = []
        for (const name of entry.gap) {
            const java = entry.javaTypes[name]
            const id = entry.numbers[name]
            if (!java || !id) { skipped.push(entry.ourType + '.' + name + ' — type or field number could not be read'); continue }
            if (taken.get(entry.ourType.split('.').pop())?.has(id)) {
                skipped.push(entry.ourType + '.' + name + ' — field number ' + id + ' is already used by another field')
                continue
            }
            if (KINDS[java]) { fields.push({ name, id, kind: KINDS[java] }); continue }
            const ref = matched.get(java)
            if (ref) { fields.push({ name, id, kind: 'MESSAGE', ref }); continue }
            skipped.push(entry.ourType + '.' + name + ' — cannot map ' + java)
        }
        for (const field of fields) {
            field.androidOnly = web ? !web.get(entry.ourType)?.has(field.name.toLowerCase()) : null
        }
        if (fields.length) gaps.push({ type: entry.ourType, fields })
    }
    gaps.sort((a, b) => a.type.localeCompare(b.type))
    writeFileSync(jsonOut, JSON.stringify({ gaps, needed: [], specs: {} }, null, 2) + '\n')
    console.log('Ready to patch: ' + gaps.reduce((n, g) => n + g.fields.length, 0) + ' fields across ' + gaps.length + ' types -> ' + jsonOut)
    if (!web) console.log('  (Web bundle unavailable; Android-only status was not checked)')
    for (const gap of gaps) {
        for (const field of gap.fields) {
            if (field.androidOnly) console.log('  ANDROID-ONLY ' + gap.type + '.' + field.name + ' — safe to decode; send only when intentional')
        }
    }
    for (const line of skipped.sort()) console.log('  skipped ' + line)
}

if (out) {
    writeFileSync(out, report + '\n')
    console.log('Report written to ' + out)
} else {
    console.log(report)
}
