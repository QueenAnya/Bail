/**
 * VoipResourceManager — process-wide counters, compiled-WASM cache and memory stats for VoIP.
 *
 * Ported from @innovatorssoft/baileys (`Voip/resource-manager`). This fork runs one isolated
 * engine per call, so the worker/relay counters are only meaningful when you register them
 * yourself (or pass them in through {@link VoipResourceManager.getMemoryStats}'s `additional`
 * argument — `CallManager.getMemoryStats()` does exactly that).
 */
import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __voipDirname = path.dirname(fileURLToPath(import.meta.url))

export type VoipMemoryStatsInput = {
	activeWorkers?: number
	relayConnections?: number
	relayConnectionCount?: number
	ffmpegProcesses?: number
	ffmpegProcessCount?: number
	activeCalls?: number
	activeCallCount?: number
	waitingCalls?: number
	totalManagedCalls?: number
}

export class VoipResourceManager {
	private static wasmModuleCache = new Map<string, WebAssembly.Module>()
	private static assetPaths = new Map<string, string>()
	private static workers = 0
	private static relays = 0
	private static ffmpeg = 0

	static get activeWorkers(): number {
		return this.workers
	}

	static get relayConnections(): number {
		return this.relays
	}

	static get ffmpegProcesses(): number {
		return this.ffmpeg
	}

	static registerWorker(): void {
		this.workers++
	}

	static unregisterWorker(): void {
		if (this.workers > 0) this.workers--
	}

	static registerRelayConnection(): void {
		this.relays++
	}

	static unregisterRelayConnection(): void {
		if (this.relays > 0) this.relays--
	}

	static registerFfmpegProcess(): void {
		this.ffmpeg++
	}

	static unregisterFfmpegProcess(): void {
		if (this.ffmpeg > 0) this.ffmpeg--
	}

	/** Compile a WASM binary once and reuse the module for later engines. */
	static async compileOrGetModule(wasmBinary: BufferSource, cacheKey = 'default'): Promise<WebAssembly.Module> {
		const cached = this.wasmModuleCache.get(cacheKey)
		if (cached) return cached
		const wasmModule = await WebAssembly.compile(wasmBinary)
		this.wasmModuleCache.set(cacheKey, wasmModule)
		return wasmModule
	}

	static getCachedModule(cacheKey = 'default'): WebAssembly.Module | undefined {
		return this.wasmModuleCache.get(cacheKey)
	}

	static setCachedModule(cacheKey: string, wasmModule: WebAssembly.Module): void {
		this.wasmModuleCache.set(cacheKey, wasmModule)
	}

	static clearModuleCache(): void {
		this.wasmModuleCache.clear()
	}

	/** Absolute path of a bundled WASM asset (`whatsapp.wasm`, `loader.js`, `worker-modules.js`). */
	static getAssetPath(filename: string): string {
		const cached = this.assetPaths.get(filename)
		if (cached) return cached
		const resolved = path.resolve(__voipDirname, '..', '..', 'assets', 'wasm', filename)
		if (fs.existsSync(resolved)) this.assetPaths.set(filename, resolved)
		return resolved
	}

	static getMemoryStats(additional: VoipMemoryStatsInput = {}) {
		const mem = process.memoryUsage()
		const toMb = (bytes: number) => Math.round(bytes / 1024 / 1024)
		const activeWorkers = additional.activeWorkers ?? this.workers
		const relayConnections = additional.relayConnectionCount ?? additional.relayConnections ?? this.relays
		const ffmpegProcesses = additional.ffmpegProcessCount ?? additional.ffmpegProcesses ?? this.ffmpeg
		const cachedModules = this.wasmModuleCache.size
		const activeCalls = additional.activeCalls ?? additional.activeCallCount ?? 0
		const waitingCalls = additional.waitingCalls ?? 0
		const totalManagedCalls = additional.totalManagedCalls ?? activeCalls
		const arrayBuffers = mem.arrayBuffers ?? 0

		return {
			rss: mem.rss,
			heapUsed: mem.heapUsed,
			heapTotal: mem.heapTotal,
			external: mem.external,
			arrayBuffers,
			activeWorkers,
			relayConnections,
			ffmpegProcesses,
			cachedModules,
			activeCalls,
			waitingCalls,
			totalManagedCalls,
			process: {
				rss: mem.rss,
				rssMb: toMb(mem.rss),
				heapUsed: mem.heapUsed,
				heapUsedMb: toMb(mem.heapUsed),
				heapTotal: mem.heapTotal,
				heapTotalMb: toMb(mem.heapTotal),
				external: mem.external,
				externalMb: toMb(mem.external),
				arrayBuffers,
				arrayBuffersMb: toMb(arrayBuffers)
			},
			calls: { activeCalls, waitingCalls, totalManagedCalls },
			resourceManager: {
				activeWorkers,
				activeRelayConnections: relayConnections,
				activeFfmpegProcesses: ffmpegProcesses,
				compiledModulesCached: cachedModules
			}
		}
	}

	/**
	 * Normalise a pthread-pool size option: `'auto'` → half the CPU cores (2–6),
	 * a number → clamped to 2–16, anything else → 4.
	 */
	static resolvePthreadPoolSize(value?: number | 'auto' | null): number {
		if (value === 'auto') {
			const cpus = os.cpus().length || 4
			return Math.min(6, Math.max(2, Math.floor(cpus / 2)))
		}

		if (typeof value === 'number' && !isNaN(value)) {
			return Math.min(16, Math.max(2, Math.floor(value)))
		}

		return 4
	}
}

export const resolvePthreadPoolSize = (value?: number | 'auto' | null): number =>
	VoipResourceManager.resolvePthreadPoolSize(value)
