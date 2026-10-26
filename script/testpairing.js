import { rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import makeWASocket, { Browsers, DisconnectReason, useMultiFileAuthState } from '../lib/index.js'

const args = process.argv.slice(2)
const checkOnly = args.includes('--check-only')
const phoneNumber = (args.find(a => !a.startsWith('--')) || process.env.PAIRING_PHONE || '').replace(/\D/g, '')

if (!phoneNumber) {
    console.error('Usage: node script/testpairing.js <phone-number> [--check-only]')
    console.error('Example: node script/testpairing.js 6281234567890')
    console.error('The phone number can also be provided through the PAIRING_PHONE environment variable.')
    console.error('')
    console.error('--check-only  only reports whether the server accepted or rejected the request; the code is never printed.')
    console.error('              Required when running in an environment where other people can read the logs.')
    process.exit(2)
}

/**
 * A throwaway session directory so a live bot's credentials are never touched.
 * Pairing writes creds as it goes, and reusing the bot's folder would replace
 * the identity it is already connected with.
 */
const sessionDir = join(tmpdir(), 'elaina-pairing-test-' + Date.now())

const log = (...parts) => console.log(new Date().toISOString().slice(11, 19), ...parts)

const cleanup = async () => rm(sessionDir, { recursive: true, force: true }).catch(() => {})
process.on('uncaughtException', async error => { console.error(error); await cleanup(); process.exit(1) })
process.on('unhandledRejection', async error => { console.error(error); await cleanup(); process.exit(1) })

const silentLogger = { level: 'silent', trace() {}, debug() {}, info() {}, warn() {}, error() {}, fatal() {} }
silentLogger.child = () => silentLogger

const { state, saveCreds } = await useMultiFileAuthState(sessionDir)

const sock = makeWASocket({
    auth: state,
    browser: Browsers.macOS('Chrome'),
    printQRInTerminal: false,
    logger: silentLogger
})

sock.ev.on('creds.update', saveCreds)

let finished = false
const closeAndExit = async (code) => {
    if (finished) return
    finished = true
    try { sock.end(undefined) } catch {}
    await cleanup()
    process.exit(code)
}

sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update
    if (qr) log('server sent a QR code (normal; ignore it)')

    if (connection === 'open') {
        log('PAIRING SUCCEEDED — device linked')
        await closeAndExit(0)
    }

    if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode
        if (reason === DisconnectReason.restartRequired) {
            log('server requested a restart (normal after successful pairing)')
            await closeAndExit(0)
            return
        }
        log('connection closed; reason:', reason ?? lastDisconnect?.error?.message ?? '-')
        await closeAndExit(1)
    }
})

const wait = ms => new Promise(r => setTimeout(r, ms))
await wait(3000)

log('requesting a pairing code for', phoneNumber)

try {
    const code = await sock.requestPairingCode(phoneNumber)
    console.log('')
    if (checkOnly) {
        log('registration ACCEPTED by server — reference recorded')
        log('The code is not printed because --check-only is enabled.')
        log('The server accepted the request, so neither rate limiting nor a feature block is indicated.')
        await closeAndExit(0)
    }
    console.log('  PAIRING CODE : ' + code.match(/.{1,4}/g).join('-'))
    console.log('')
    log('registration ACCEPTED by server — reference recorded')
    log('Check your phone now: the notification "A new device is trying to connect" should appear.')
    log('If no notification appears, open WhatsApp > Linked Devices > Link with phone number,')
    log('then enter the code above. If the code is accepted, registration succeeded')
    log('and only the push notification is not working.')
    console.log('')
    log('waiting for up to 3 minutes...')
}
catch (error) {
    console.log('')
    log('REGISTRATION REJECTED')
    log('message:', error.message)
    log('code  :', error.output?.statusCode ?? error.data ?? '-')
    console.log('')
    if (String(error.message).includes('rate-overlimit')) {
        log('Meaning: too many attempts. Wait a few hours before trying again.')
    }
    else if (/not-allowed|not-acceptable|feature/i.test(String(error.message))) {
        log('Meaning: linking with a phone number is not enabled for this account yet.')
    }
    else if (String(error.message).includes('international format')) {
        log('Meaning: the phone number format is invalid. Use the country code without a leading zero, for example 6281234567890.')
    }
    else {
        log('This is the raw server response — before this fix, this error was never visible.')
    }
    await closeAndExit(1)
}

await wait(180000)
if (!finished) {
    log('time expired; the code was not used')
    await closeAndExit(1)
}
