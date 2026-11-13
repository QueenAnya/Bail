import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AudioFeeder } from '../lib/Voip/audio-feeder.js';
import { ActiveCall, CallState, PlaylistAudioFeeder, VoipClient, makeVoipClient } from '../lib/Voip/index.js';
import { readFileSync, readdirSync } from 'node:fs';
import { EventEmitter } from 'node:events';
import { spawnSync } from 'node:child_process';
import { VideoFeeder, VIDEO_FORMAT_I420 } from '../lib/Voip/video-feeder.js';
import { getFfmpegBin } from '../lib/Utils/ffmpeg-path.js';
import { Worker } from 'node:worker_threads';
import { bindVoiceRecognition, matchVoiceWakePhrase, normalizeVoiceText, removeVoiceWakePhrase } from '../lib/Extras/voice-recognition.js';

test('voip-audio-feeder', async () => {
    const SAMPLE_RATE = 16000;
    const FRAMES = 320;
    const CHUNK_BYTES = FRAMES * Float32Array.BYTES_PER_ELEMENT;

    const makeFeeder = () => {
        const emitted = [];
        const feeder = new AudioFeeder(SAMPLE_RATE, 1, FRAMES, chunk => emitted.push(chunk));
        feeder._running = true;
        feeder._proc = {
            kill() {},
            removeAllListeners() {},
            stdout: { isPaused: () => false, pause() {}, resume() {}, removeAllListeners() {} }
        };
        return { feeder, emitted };
    };

    const rampBuffer = (bytes, start = 0) => {
        const samples = bytes / Float32Array.BYTES_PER_ELEMENT;
        const floats = new Float32Array(samples);
        for (let i = 0; i < samples; i++) {
            floats[i] = start + i;
        }
        return Buffer.from(floats.buffer, floats.byteOffset, bytes);
    };

    /**
     * ffmpeg hands over whatever size the pipe gives it, so a chunk boundary lands
     * mid-buffer constantly. The old code rebuilt one growing Buffer with concat on
     * every read, which is quadratic and stalled the 20 ms emit timer often enough
     * to inject silence into live speech.
     */
    {
        const { feeder } = makeFeeder();
        feeder._absorb(rampBuffer(CHUNK_BYTES / 2, 0));
        assert.equal(feeder.queuedChunks, 0, 'half a chunk is not emitted early');
        feeder._absorb(rampBuffer(CHUNK_BYTES / 2, FRAMES / 2));
        assert.equal(feeder.queuedChunks, 1, 'the two halves make exactly one chunk');

        const chunk = feeder._queue[0];
        assert.equal(chunk.length, FRAMES);
        assert.equal(chunk[0], 0);
        assert.equal(chunk[FRAMES / 2], FRAMES / 2, 'samples keep their order across the seam');
        assert.equal(chunk[FRAMES - 1], FRAMES - 1);
        assert.equal(feeder._pendingBytes, 0, 'nothing is left over');
    }

    /** A single read carrying several chunks is split, not merged. */
    {
        const { feeder } = makeFeeder();
        feeder._absorb(rampBuffer(CHUNK_BYTES * 3));
        assert.equal(feeder.queuedChunks, 3);
        assert.equal(feeder._pendingParts.length, 0);
    }

    /** A read that straddles chunks leaves only the remainder pending. */
    {
        const { feeder } = makeFeeder();
        feeder._absorb(rampBuffer(CHUNK_BYTES * 2 + 40));
        assert.equal(feeder.queuedChunks, 2);
        assert.equal(feeder._pendingBytes, 40, 'the tail waits for the next read');
    }

    // Elaina's _tick / _buffering / rebuffers / prebuffer behaviour is specific to its paced feeder.
    // This fork's AudioFeeder keeps its own warm-up and underflow logic (covered by src/__tests__/Voip).
});

test('voip-playlist', async () => {
    /**
     * The queue lives in PlaylistAudioFeeder; AudioFeeder itself stays single-source. A stub factory
     * keeps this test off ffmpeg entirely, so it asserts the sequencing and not the decoder.
     */
    const makeStub = (log) => ({
        createFeeder: (track, onEnd) => {
            const feeder = {
                track,
                stopped: false,
                start() {
                    log.push(['start', track]);
                },
                stop() {
                    feeder.stopped = true;
                },
                /** the real feeder calls onEnd when ffmpeg drains; the stub calls it on demand */
                end() {
                    onEnd();
                }
            };
            log.push(['create', track]);
            return feeder;
        }
    });

    /** A single track: it starts, it ends, and the feeder reports idle. */
    {
        const log = [];
        const events = [];
        const playlist = new PlaylistAudioFeeder({
            ...makeStub(log),
            onTrackStart: track => events.push(['start', track]),
            onTrackEnd: track => events.push(['end', track]),
            onIdle: () => events.push(['idle'])
        });
        playlist.start(['one.mp3']);
        assert.deepEqual(events, [['start', 'one.mp3']]);
        assert.equal(playlist.currentTrack, 'one.mp3');
        assert.equal(playlist.idle, false);
        assert.equal(playlist.playlistLength, 0);

        playlist._feederForTest.end();
        assert.deepEqual(events.slice(1), [['end', 'one.mp3'], ['idle']], 'the last track ends and goes idle');
        assert.equal(playlist.currentTrack, null);
        assert.equal(playlist.idle, true);
    }

    /** A queue: the next track starts by itself, with no gap to arrange. */
    {
        const log = [];
        const events = [];
        const playlist = new PlaylistAudioFeeder({
            ...makeStub(log),
            onTrackStart: track => events.push(['start', track]),
            onTrackEnd: track => events.push(['end', track]),
            onIdle: () => events.push(['idle'])
        });
        playlist.start(['one.mp3', 'two.mp3']);
        assert.equal(playlist.playlistLength, 1, 'the second track waits its turn');
        playlist._feederForTest.end();
        assert.deepEqual(events.slice(1), [['end', 'one.mp3'], ['start', 'two.mp3']]);
        assert.equal(playlist.currentTrack, 'two.mp3');
        assert.equal(events.some(event => event[0] === 'idle'), false, 'a full queue never goes idle');
        playlist._feederForTest.end();
        assert.deepEqual(events.slice(3), [['end', 'two.mp3'], ['idle']]);
    }

    /** A track arriving while idle picks the feeder back up without a restart. */
    {
        const log = [];
        const events = [];
        const playlist = new PlaylistAudioFeeder({
            ...makeStub(log),
            onTrackStart: track => events.push(['start', track]),
            onIdle: () => events.push(['idle'])
        });
        playlist.start(['one.mp3']);
        playlist._feederForTest.end();
        assert.equal(playlist.idle, true);

        const queued = playlist.enqueue('two.mp3');
        assert.equal(queued, 0, 'enqueueing an idle feeder starts it, it does not queue behind nothing');
        assert.equal(playlist.idle, false, 'enqueueing while idle picks the feeder back up');
        assert.equal(playlist.currentTrack, 'two.mp3');
    }

    /** Skipping drops the current track, fires its end hook once and moves on. */
    {
        const log = [];
        const events = [];
        const playlist = new PlaylistAudioFeeder({
            ...makeStub(log),
            onTrackStart: track => events.push(['start', track]),
            onTrackEnd: track => events.push(['end', track]),
            onIdle: () => events.push(['idle'])
        });
        playlist.start(['one.mp3', 'two.mp3']);
        assert.equal(playlist.skip(), true);
        assert.deepEqual(events.slice(1), [['end', 'one.mp3'], ['start', 'two.mp3']], 'skip advances exactly once');
        assert.equal(playlist.skip(), true);
        assert.deepEqual(events.slice(3), [['end', 'two.mp3'], ['idle']]);
        assert.equal(playlist.skip(), false, 'nothing left to skip');
    }

    /** A track that ends twice (feeder fires onEnd after a skip) must not double-advance. */
    {
        const log = [];
        const events = [];
        const playlist = new PlaylistAudioFeeder({
            ...makeStub(log),
            onTrackStart: track => events.push(['start', track]),
            onTrackEnd: track => events.push(['end', track])
        });
        playlist.start(['one.mp3', 'two.mp3']);
        const firstFeeder = playlist._feederForTest;
        playlist.skip();
        firstFeeder.end();
        assert.deepEqual(events, [['start', 'one.mp3'], ['end', 'one.mp3'], ['start', 'two.mp3']], 'the stale end is ignored');
    }

    /** clearPlaylist empties the queue without disturbing the current track. */
    {
        const log = [];
        const playlist = new PlaylistAudioFeeder(makeStub(log));
        playlist.start(['one.mp3', 'two.mp3', 'three.mp3']);
        playlist.clearPlaylist();
        assert.equal(playlist.playlistLength, 0);
        assert.equal(playlist.currentTrack, 'one.mp3', 'the current track keeps playing');
    }

    /** stop tears everything down and the queue stays dead until start is called again. */
    {
        const log = [];
        const events = [];
        const playlist = new PlaylistAudioFeeder({ ...makeStub(log), onIdle: () => events.push(['idle']) });
        playlist.start(['one.mp3', 'two.mp3']);
        playlist.stop();
        assert.equal(playlist.idle, true);
        assert.equal(playlist.currentTrack, null);
        playlist._feederForTest?.end();
        assert.deepEqual(events, [], 'nothing fires after stop');
    }
});

test('voip-session-client', async () => {
    /**
     * This fork ships two clients: `makeVoipClient(socket)` borrows an existing session, and
     * `VoipClient` connects on its own from an auth directory. Elaina's ported test asserted the
     * socket-only contract on `VoipClient`; these assertions cover what actually ships.
     */

    /** The socket-attached client refuses to build without a socket. */
    await assert.rejects(() => makeVoipClient(undefined), err => {
        assert.ok(err instanceof Error);
        assert.match(err.message, /socket/i);
        return true;
    });

    /** The standalone client refuses to build without an auth directory. */
    await assert.rejects(() => new VoipClient({}).connect(), err => {
        assert.match(String(err.message), /authDir|auth dir|undefined/i);
        return true;
    });

    /** Both entry points are exported, and both are constructible/awaitable types. */
    assert.equal(typeof VoipClient, 'function');
    assert.equal(typeof makeVoipClient, 'function');

    /** A borrowed socket that is already logged in is the supported path: no pairing, no QR. */
    const fakeSocket = {
        ws: new EventEmitter(),
        ev: new EventEmitter(),
        authState: { creds: { me: { id: '9199@s.whatsapp.net' } } },
        query: async () => ({}),
        generateMessageTag: () => 'tag',
        logger: { debug() {}, info() {}, warn() {}, error() {}, child() { return this; } },
        sendMessage: async () => ({}),
        relayMessage: async () => 'id',
        sendNode: async () => {}
    };
    const client = await makeVoipClient(fakeSocket);
    assert.ok(client, 'a socket-attached client is created');
    assert.equal(typeof client.disconnect, 'function', 'it can be torn down');
    await client.disconnect();
});

test('voip-video', async () => {
    // Use the same binary the feeder will spawn — the bundled ffmpeg-static build, not just PATH — or this branch runs
    // while ffmpeg is actually available and the assertion below fails for the wrong reason.
    const FFMPEG = process.env.FFMPEG_PATH || getFfmpegBin();
    const hasFfmpeg = spawnSync(FFMPEG, ['-version']).status === 0;

    /** I420 is one luma plane plus two half-size chroma planes: w * h * 3 / 2, floored. */
    {
        const feeder = new VideoFeeder('lavfi:testsrc', () => {}, null, null, { width: 640, height: 480, fps: 24 });
        assert.equal(feeder.frameSizeBytes, 640 * 480 * 1.5);
        assert.equal(feeder.width, 640);
        assert.equal(feeder.height, 480);
        assert.equal(feeder.fps, 24);
        assert.equal(VIDEO_FORMAT_I420, 0);
    }

    /** Odd sizes are rounded up so a frame length is never fractional. */
    {
        const feeder = new VideoFeeder('lavfi:testsrc', () => {}, null, null, { width: 321, height: 241 });
        assert.equal(Number.isInteger(feeder.frameSizeBytes), true);
        assert.equal(feeder.width % 2, 0, 'width is evened');
        assert.equal(feeder.height % 2, 0, 'height is evened');
    }

    /** fps is clamped to a sane range rather than trusted; 0 means "unset" and falls back to the default. */
    {
        const DEFAULT_FPS = new VideoFeeder('lavfi:testsrc', () => {}, null, null, {}).fps;
        assert.equal(new VideoFeeder('lavfi:testsrc', () => {}, null, null, { fps: 0 }).fps, DEFAULT_FPS, '0 falls back to the default');
        assert.equal(new VideoFeeder('lavfi:testsrc', () => {}, null, null, { fps: 999 }).fps, 60, 'high fps is clamped');
        assert.equal(new VideoFeeder('lavfi:testsrc', () => {}, null, null, { fps: -5 }).fps, 1, 'a negative fps clamps to 1');
    }

    /** A missing source is refused at construction, not at the first frame. */
    {
        assert.throws(() => new VideoFeeder('', () => {}), /source is required/i);
        assert.throws(() => new VideoFeeder('/nope/does-not-exist.mp4', () => {}), /not found/i);
    }

    /** A feeder that is not started reports not running, and stop is idempotent. */
    {
        const feeder = new VideoFeeder('lavfi:testsrc', () => {}, null, null, {});
        assert.equal(feeder.isRunning, false);
        feeder.stop();
        feeder.stop();
        assert.equal(feeder.isRunning, false);
        assert.equal(feeder.framesEmitted, 0);
    }

    /** Without ffmpeg the failure surfaces through onError instead of an unhandled throw. */
    if (!hasFfmpeg) {
        const errors = [];
        const feeder = new VideoFeeder('lavfi:testsrc', () => {}, null, err => errors.push(err), {});
        feeder.start();
        await new Promise(resolve => setTimeout(resolve, 500));
        feeder.stop();
        assert.ok(errors.length >= 1, 'a missing ffmpeg is reported, not swallowed');
        console.log('voip video tests passed (ffmpeg absent, decode test skipped)');
    }
});

test('voip-worker-boot', async () => {
    /**
     * worker-bootstrap.js runs as a worker_threads entry point, never as an import
     * on the main thread, so a module-scope mistake in it stays invisible until a
     * call is placed. It shipped once with a bare `require`, which threw
     * "require is not defined in ES module scope" the first time a worker started.
     * Booting it for real is the only check that covers that.
     */
    const bootWorker = () => new Promise((resolve, reject) => {
        const worker = new Worker(new URL('../lib/Voip/worker-bootstrap.js', import.meta.url), {
            workerData: { storageDir: '/tmp/elaina-voip-test', resourcesPath: '/nonexistent' },
            stdout: true,
            stderr: true
        });
        const timer = setTimeout(() => {
            worker.terminate();
            reject(new Error('worker never reported worker_ready'));
        }, 15000);
        worker.on('message', message => {
            if (message?.type === 'worker_ready') {
                clearTimeout(timer);
                worker.terminate();
                resolve(true);
            }
        });
        worker.on('error', err => {
            clearTimeout(timer);
            worker.terminate();
            reject(err);
        });
    });

    assert.equal(await bootWorker(), true, 'the worker boots and announces itself');
});

test('voice-recognition', async () => {
    const BOT = '628111111111@s.whatsapp.net';
    const USER = '628222222222@s.whatsapp.net';

    const makeHarness = options => {
        const listeners = new Map();
        const emitted = [];
        const ev = {
            on(name, handler) {
                const list = listeners.get(name) || [];
                list.push(handler);
                listeners.set(name, list);
            },
            off(name, handler) {
                listeners.set(name, (listeners.get(name) || []).filter(item => item !== handler));
            },
            emit(name, data) {
                if (name !== 'messages.upsert') {
                    emitted.push({ name, data });
                }
            }
        };
        const sock = {
            ev,
            authState: {
                creds: {
                    me: {
                        id: BOT
                    }
                }
            }
        };
        const downloadContentFromMessage = async () => (async function* () {
            yield Buffer.from('voice');
        })();
        bindVoiceRecognition(sock, {
            getMessage: async () => undefined,
            voiceRecognition: {
                enabled: true,
                transcribe: async () => options.transcript,
                wakePhrases: options.wakePhrases,
                getWakePhrases: options.getWakePhrases,
                allowQuotedActivation: options.allowQuotedActivation,
                pttOnly: options.pttOnly,
                maxDuration: options.maxDuration
            }
        }, { downloadContentFromMessage });
        return {
            emitted,
            async dispatch(message) {
                await Promise.all((listeners.get('messages.upsert') || []).map(handler => handler({ messages: [message], type: 'notify' })));
            }
        };
    };

    const message = ({ contextInfo, ptt = true, seconds = 8 } = {}) => ({
        key: {
            remoteJid: USER,
            fromMe: false,
            id: 'VOICE-1'
        },
        message: {
            audioMessage: {
                ptt,
                seconds,
                mimetype: 'audio/ogg; codecs=opus',
                mediaKey: Buffer.alloc(32, 1),
                directPath: '/voice',
                contextInfo
            }
        }
    });

    assert.equal(normalizeVoiceText('Hey, Elaina-Baileys!'), 'hey elaina baileys');
    assert.equal(matchVoiceWakePhrase('Hey Elaina Baileys please open menu', ['hey elaina-baileys'])?.phrase, 'hey elaina-baileys');
    assert.equal(removeVoiceWakePhrase('Hey Elaina Baileys please open menu', 'hey elaina-baileys'), 'please open menu');

    const wake = makeHarness({
        transcript: 'Hey Elaina Baileys, please open menu',
        getWakePhrases: async ({ senderJid }) => senderJid === USER ? ['hey elaina-baileys'] : []
    });
    await wake.dispatch(message());
    assert.equal(wake.emitted.filter(event => event.name === 'voice.transcription').length, 1);
    assert.equal(wake.emitted.filter(event => event.name === 'voice.command').length, 1);
    assert.equal(wake.emitted.find(event => event.name === 'voice.command').data.activation, 'wake-phrase');
    assert.equal(wake.emitted.find(event => event.name === 'voice.command').data.commandText, 'please open menu');

    const quoted = makeHarness({ transcript: 'Please open menu' });
    await quoted.dispatch(message({
        contextInfo: {
            stanzaId: 'BOT-MESSAGE',
            participant: BOT,
            quotedMessage: {
                conversation: 'menu'
            }
        }
    }));
    assert.equal(quoted.emitted.find(event => event.name === 'voice.command').data.activation, 'quoted');
    assert.equal(quoted.emitted.find(event => event.name === 'voice.command').data.commandText, 'please open menu');

    const ignored = makeHarness({ transcript: 'We are leaving tomorrow at seven', wakePhrases: ['hey elaina'] });
    await ignored.dispatch(message());
    assert.equal(ignored.emitted.filter(event => event.name === 'voice.transcription').length, 1);
    assert.equal(ignored.emitted.filter(event => event.name === 'voice.command').length, 0);

    const notPtt = makeHarness({ transcript: 'Hey Elaina open menu', wakePhrases: ['hey elaina'] });
    await notPtt.dispatch(message({ ptt: false }));
    assert.equal(notPtt.emitted.length, 0);

    const tooLong = makeHarness({ transcript: 'Hey Elaina open menu', wakePhrases: ['hey elaina'], maxDuration: 5 });
    await tooLong.dispatch(message({ seconds: 8 }));
    assert.equal(tooLong.emitted.length, 0);
});
