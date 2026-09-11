// Minimal ambient types for the optional `baileys-caller` package
// (https://github.com/SheIITear/baileys-caller). It isn't published on npm
// and has no @types package, so this stub lets voip-calling.ts type-check
// the dynamic `import('baileys-caller')` without requiring the package to
// actually be installed. Only the shapes voip-calling.ts touches are
// declared — see that file for setup/usage instructions.
declare module 'baileys-caller' {
	export type VoipSdkConfig = {
		authDir: string
	}

	export class VoipClient {
		constructor(config: VoipSdkConfig)
		connect(): Promise<void>
		call(
			phoneNumber: string,
			opts?: { audioSource?: string; durationMs?: number }
		): Promise<{
			readonly callId: string
			readonly state: number
			end(): void
			mute(muted: boolean): void
			waitForEnd(): Promise<string>
			on(event: string, listener: (...args: unknown[]) => void): unknown
			once(event: string, listener: (...args: unknown[]) => void): unknown
		}>
		disconnect(): void
	}
}
