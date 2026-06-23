/**
 * Re-exports the enhanced single-file auth state from addons.
 * The addons version adds: LRUCache, async-mutex, atomic write via temp-file+rename,
 * 3-second debounced flush — much safer than the removed upstream impl.
 */
export { useSingleFileAuthStateV2 } from '../addons/use-single-file-auth-state.js'
/** @alias useSingleFileAuthStateV2 — original name kept for compatibility */
export { useSingleFileAuthStateV2 as useSingleFileAuthState } from '../addons/use-single-file-auth-state.js'
