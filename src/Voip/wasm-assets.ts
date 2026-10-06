import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __voipDirname = path.dirname(fileURLToPath(import.meta.url))

const WASM_ASSET_FILES = ['whatsapp.wasm', 'loader.js', 'worker-modules.js'] as const

/** Directory that ships the WASM assets (`<package>/assets/wasm`). */
const bundledWasmDir = () => path.resolve(__voipDirname, '..', '..', 'assets', 'wasm')

/**
 * Makes sure the VoIP WASM assets (`whatsapp.wasm`, `loader.js`, `worker-modules.js`) exist.
 *
 * - without `targetDir` it just checks the bundled `assets/wasm` directory;
 * - with `targetDir` (absolute, or relative to `process.cwd()`) it creates the directory and
 *   copies any missing asset there — handy for bundlers/containers where `node_modules` is read-only
 *   or stripped, then pass the same folder as `resourcesPath` to your engine config.
 *
 * Ported from @innovatorssoft/baileys. Returns the directory the assets live in, or `null` if the
 * assets could not be found/copied.
 */
export const ensureWasmAssets = (targetDir?: string): string | null => {
	try {
		const source = bundledWasmDir()
		const wasmDir = targetDir
			? path.isAbsolute(targetDir)
				? targetDir
				: path.resolve(process.cwd(), targetDir)
			: source

		if (!fs.existsSync(wasmDir)) fs.mkdirSync(wasmDir, { recursive: true })

		if (wasmDir !== source) {
			for (const file of WASM_ASSET_FILES) {
				const dest = path.join(wasmDir, file)
				const src = path.join(source, file)
				if (!fs.existsSync(dest) && fs.existsSync(src)) fs.copyFileSync(src, dest)
			}
		}

		return WASM_ASSET_FILES.every(file => fs.existsSync(path.join(wasmDir, file))) ? wasmDir : null
	} catch {
		return null
	}
}
