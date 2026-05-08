import { proto } from '../../WAProto/index.js'
import { makeLibSignalRepository } from '../Signal/libsignal'
import type { AuthenticationState, SocketConfig, WAVersion } from '../Types'
import { Browsers } from '../Utils/browser-utils'
import logger from '../Utils/logger'

const version = [2, 3000, 1035194821]

export const UNAUTHORIZED_CODES = [401, 403, 419]

export const DEFAULT_ORIGIN = 'https://web.whatsapp.com'
export const CALL_VIDEO_PREFIX = 'https://call.whatsapp.com/video/'
export const CALL_AUDIO_PREFIX = 'https://call.whatsapp.com/voice/'
export const DEF_CALLBACK_PREFIX = 'CB:'
export const DEF_TAG_PREFIX = 'TAG:'
export const PHONE_CONNECTION_CB = 'CB:Pong'

export const WA_ADV_ACCOUNT_SIG_PREFIX = Buffer.from([6, 0])
export const WA_ADV_DEVICE_SIG_PREFIX = Buffer.from([6, 1])
export const WA_ADV_HOSTED_ACCOUNT_SIG_PREFIX = Buffer.from([6, 5])
export const WA_ADV_HOSTED_DEVICE_SIG_PREFIX = Buffer.from([6, 6])

export const WA_DEFAULT_EPHEMERAL = 7 * 24 * 60 * 60

/** Status messages older than 24 hours are considered expired */
export const STATUS_EXPIRY_SECONDS = 24 * 60 * 60

/** WA Web enforces a 14-day maximum age for placeholder resend requests */
export const PLACEHOLDER_MAX_AGE_SECONDS = 14 * 24 * 60 * 60

export const NOISE_MODE = 'Noise_XX_25519_AESGCM_SHA256\0\0\0\0'
export const DICT_VERSION = 3
export const KEY_BUNDLE_TYPE = Buffer.from([5])
export const NOISE_WA_HEADER = Buffer.from([87, 65, 6, DICT_VERSION]) // last is "DICT_VERSION"
/** from: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url */
export const URL_REGEX = /https:\/\/(?![^:@\/\s]+:[^:@\/\s]+@)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?/g

export const WA_CERT_DETAILS = {
\tSERIAL: 0,
\tISSUER: 'WhatsAppLongTerm1',
\tPUBLIC_KEY: Buffer.from('142375574d0a587166aae71ebe516437c4a28b73e3695c6ce1f7f9545da8ee6b', 'hex')
}

export const PROCESSABLE_HISTORY_TYPES = [
\tproto.HistorySync.HistorySyncType.INITIAL_BOOTSTRAP,
\tproto.HistorySync.HistorySyncType.PUSH_NAME,
\tproto.HistorySync.HistorySyncType.RECENT,
\tproto.HistorySync.HistorySyncType.FULL,
\tproto.HistorySync.HistorySyncType.ON_DEMAND,
\tproto.HistorySync.HistorySyncType.NON_BLOCKING_DATA,
\tproto.HistorySync.HistorySyncType.INITIAL_STATUS_V3
]

/**
 * Maps HKDF label names to WA key-derivation strings.
 * This is also the source of truth for the MediaType union.
 * Types present here but absent from MEDIA_PATH_MAP (gif, ptt, ppic, etc.)
 * are never directly uploaded — they reuse a parent type at upload time.
 */
export const MEDIA_HKDF_KEY_MAPPING = {
\taudio: 'Audio',
\tdocument: 'Document',
\tgif: 'Video',
\timage: 'Image',
\tppic: '',
\tproduct: 'Image',
\tptt: 'Audio',
\tsticker: 'Image',
\t'sticker-pack': 'Sticker Pack',
\t'thumbnail-sticker-pack': 'Image Thumbnail',
\tvideo: 'Video',
\t'thumbnail-document': 'Document Thumbnail',
\t'thumbnail-image': 'Image Thumbnail',
\t'thumbnail-video': 'Video Thumbnail',
\t'thumbnail-link': 'Link Thumbnail',
\t'md-msg-hist': 'History',
\t'md-app-state': 'App State',
\t'product-catalog-image': '',
\t'payment-bg-image': 'Payment Background',
\tptv: 'Video',
\t'biz-cover-photo': 'Image'
}

/**
 * MediaType is the union of all keys in MEDIA_HKDF_KEY_MAPPING.
 * Defined here (after MEDIA_HKDF_KEY_MAPPING) so that MEDIA_PATH_MAP
 * below can reference it without a forward-reference issue.
 */
export type MediaType = keyof typeof MEDIA_HKDF_KEY_MAPPING

/**
 * Maps MediaType to WA CDN upload path.
 * Only types that are directly uploaded to the WA media CDN have entries here.
 * Types like gif/ptt/ptv/ppic are absent — they reuse video/audio/image at upload time.
 */
export const MEDIA_PATH_MAP: { [T in MediaType]?: string } = {
\timage: '/mms/image',
\tvideo: '/mms/video',
\tdocument: '/mms/document',
\taudio: '/mms/audio',
\tsticker: '/mms/image',
\t// Sticker pack ZIPs use the /mms/sticker endpoint (same CDN path as single stickers)
\t'sticker-pack': '/mms/sticker',
\t// Sticker pack tray-icon thumbnail is a regular image upload
\t'thumbnail-sticker-pack': '/mms/image',
\t'thumbnail-link': '/mms/image',
\t'product-catalog-image': '/product/image',
\t'md-app-state': '',
\t'md-msg-hist': '/mms/md-app-state',
\t'biz-cover-photo': '/pps/biz-cover-photo'
}

export const MEDIA_KEYS = Object.keys(MEDIA_PATH_MAP) as MediaType[]

/** 120s timeout for history sync stall detection, same as WA Web's handleChunkProgress / restartPausedTimer (g = 120) */
export const HISTORY_SYNC_PAUSED_TIMEOUT_MS = 120_000

export const MIN_PREKEY_COUNT = 5

export const INITIAL_PREKEY_COUNT = 812

export const UPLOAD_TIMEOUT = 30000 // 30 seconds
export const MIN_UPLOAD_INTERVAL = 5000 // 5 seconds minimum between uploads

export const DEFAULT_CACHE_TTLS = {
\tSIGNAL_STORE: 5 * 60, // 5 minutes
\tMSG_RETRY: 60 * 60, // 1 hour
\tCALL_OFFER: 5 * 60, // 5 minutes
\tUSER_DEVICES: 5 * 60 // 5 minutes
}

export const TimeMs = {
\tMinute: 60 * 1000,
\tHour: 60 * 60 * 1000,
\tDay: 24 * 60 * 60 * 1000,
\tWeek: 7 * 24 * 60 * 60 * 1000
}

export const DEFAULT_CONNECTION_CONFIG: SocketConfig = {
\tversion: version as WAVersion,
\tbrowser: Browsers.macOS('Chrome'),
\twaWebSocketUrl: 'wss://web.whatsapp.com/ws/chat',
\tconnectTimeoutMs: 20_000,
\tkeepAliveIntervalMs: 30_000,
\tlogger: logger.child({ class: 'baileys' }),
\temitOwnEvents: true,
\tdefaultQueryTimeoutMs: 60_000,
\tcustomUploadHosts: [],
\tretryRequestDelayMs: 250,
\tmaxMsgRetryCount: 5,
\tfireInitQueries: true,
\tauth: undefined as unknown as AuthenticationState,
\tmarkOnlineOnConnect: true,
\tsyncFullHistory: true,
\tpatchMessageBeforeSending: msg => msg,
\tshouldSyncHistoryMessage: ({ syncType }: proto.Message.IHistorySyncNotification) => {
\t\treturn syncType !== proto.HistorySync.HistorySyncType.FULL
\t},
\tshouldIgnoreJid: () => false,
\tlinkPreviewImageThumbnailWidth: 192,
\ttransactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
\tgenerateHighQualityLinkPreview: false,
\tenableAutoSessionRecreation: true,
\tenableRecentMessageCache: true,
\toptions: {},
\tappStateMacVerification: {
\t\tpatch: false,
\t\tsnapshot: false
\t},
\tcountryCode: 'US',
\tgetMessage: async () => undefined,
\tcachedGroupMetadata: async () => undefined,
\tmakeSignalRepository: makeLibSignalRepository
}

/**
 * Maps dialing code strings (e.g. "1", "44", "91") to their ITU Mobile Country Code (MCC).
 * Used when resolving phone numbers to their carrier/country for USync queries.
 * Source: ITU-T E.212 (includes all 221 country assignments).
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const PHONENUMBER_MCC: Record<string, number> = require('./phonenumber-mcc.json') as Record<string, number>
