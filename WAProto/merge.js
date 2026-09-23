// Merge-only bridge for the innovatorssoft WAProto additions (AICommon, E2E,
// HistorySync, etc.) -- existing qb2 proto message constructors are
// deliberately preserved when a name collides.
//
// These subfolder modules are genuine ESM (regenerated via `pbjs -w es6`,
// matching how the main index.js itself is built) rather than the CommonJS
// `pbjs` output they started as. Node 22's stable require(esm) support lets
// createRequire() load them synchronously here, same as any other module --
// no VM/vm.runInThisContext wrapper needed anymore.
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const modules = [
	'./AICommon/AICommon.js',
	'./AICommonDeprecated/AICommonDeprecated.js',
	'./BotMetadata/BotMetadata.js',
	'./CompanionReg/CompanionReg.js',
	'./E2E/E2E.js',
	'./HistorySync/HistorySync.js',
	'./MdStorageMsgRowOpaqueData/MdStorageMsgRowOpaqueData.js',
	'./Protocol/Protocol.js',
	'./SyncAction/SyncAction.js',
	'./Wa6/Wa6.js',
	'./Web/Web.js'
]

export const mergeMissingProtoTypes = (proto) => {
	for (const path of modules) {
		const root = require(path)
		for (const [name, value] of Object.entries(root)) {
			if (name === 'default' || name === '__esModule') continue
			if (proto[name] === undefined) proto[name] = value
			// If the root entry is a namespace object, merge only missing members.
			else if (value && typeof value === 'object' && proto[name] && typeof proto[name] === 'object') {
				const target = proto[name]
				for (const [member, memberValue] of Object.entries(value)) {
					if (target[member] === undefined) target[member] = memberValue
				}
			}
		}
	}
	return proto
}
