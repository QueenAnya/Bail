// NOTE: @queenanya/baileys is a pure ESM package ("type": "module"), so unlike
// @innovatorssoft/baileys's CommonJS original this file uses `import` instead of
// `require`. Everything below this block is otherwise unchanged from the original.
import { makeWASocket, useMultiFileAuthState } from '../../lib/index.js';
import path from 'path';
import pino from 'pino';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const authDir = path.join(__dirname, 'auth');
    const { state } = await useMultiFileAuthState(authDir);

    console.log('Connecting to WhatsApp...');
    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' })
    });

    sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
        if (connection === 'open') {
            console.log('Successfully connected!');
            
            console.log('\n--- 1. Testing getMyUsername() ---');
            try {
                const username = await sock.getMyUsername();
                console.log('SUCCESS! Current username is:', username);
            } catch (err) {
                console.log('FAILED! Error stack:');
                console.error(err);
                if (err.data) {
                    console.log('Raw Error Data:', JSON.stringify(err.data, null, 2));
                }
            }

            console.log('\n--- 2. Testing checkUsername("testname") ---');
            try {
                const check = await sock.checkUsername('testname');
                console.log('SUCCESS! Result:', JSON.stringify(check, null, 2));
            } catch (err) {
                console.log('FAILED! Error stack:');
                console.error(err);
                if (err.data) {
                    console.log('Raw Error Data:', JSON.stringify(err.data, null, 2));
                }
            }

            console.log('\n--- 3. Testing getUsernameRecommendations() ---');
            try {
                const recs = await sock.getUsernameRecommendations();
                console.log('SUCCESS! Result:', JSON.stringify(recs, null, 2));
            } catch (err) {
                console.log('FAILED! Error stack:');
                console.error(err);
                if (err.data) {
                    console.log('Raw Error Data:', JSON.stringify(err.data, null, 2));
                }
            }

            console.log('\n--- 4. Testing findUserByUsername("javed") ---');
            try {
                const user = await sock.findUserByUsername('javed');
                console.log('SUCCESS! Result:', JSON.stringify(user, null, 2));
            } catch (err) {
                console.log('FAILED! Error stack:');
                console.error(err);
                if (err.data) {
                    console.log('Raw Error Data:', JSON.stringify(err.data, null, 2));
                }
            }

            console.log('\n--- 5. Testing setUsernamePin("1234") ---');
            try {
                const res = await sock.setUsernamePin('1234');
                console.log('SUCCESS! Result:', JSON.stringify(res, null, 2));
            } catch (err) {
                console.log('FAILED! Error stack:');
                console.error(err);
                if (err.data) {
                    console.log('Raw Error Data:', JSON.stringify(err.data, null, 2));
                }
            }

            // Close connection and exit
            sock.end(undefined);
            process.exit(0);
        } else if (connection === 'close') {
            console.log('Connection closed.', lastDisconnect?.error);
            process.exit(1);
        }
    });
}

main().catch(err => {
    console.error('Fatal error:', err);
});
