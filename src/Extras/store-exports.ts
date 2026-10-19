/**
 * Public Store API bridge for the Elaina-to-Anya ported barrel.
 *
 * The actual Store implementations remain in Anya's existing `src/Store` module.
 * Re-exporting them here keeps the package-root export path centralized through
 * `src/Extras/index.ts` without duplicating or forking the implementations.
 */
export {
	makeInMemoryStore,
	makeOrderedDictionary,
	ObjectRepository,
	waChatKey,
	waMessageID,
	waLabelAssociationKey
} from '../Store/index.js'
export type { BaileysInMemoryStoreConfig } from '../Store/index.js'
