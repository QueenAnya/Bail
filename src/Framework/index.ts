/**
 * Framework/index.ts
 * Enterprise Bot Framework exports.
 *
 * Source: WhiskeySockets/Baileys PR #2710 (LuferOS) — enterprise bot framework
 * All P0/P1/P2/P3 bugs fixed before inclusion in @queenanya/baileys.
 */

export { Bot } from './Bot'
export type { BotConfig, MiddlewareFn } from './Bot'

export { Context } from './Context'
export type { WASocket } from './Context'

export { MediaManager } from './MediaManager'
export type { StickerMetadata } from './MediaManager'

export { SessionManager } from './SessionManager'

export { StatsManager } from './StatsManager'
export type { GhostResult, StatsRanking } from './StatsManager'

export { SQLiteStore } from './Store/SQLiteStore'
