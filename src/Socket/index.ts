import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import { makePortedSocket } from '../ported/socket'
import { bindVoiceRecognition } from '../ported/voice-recognition'
import type { UserFacingSocketConfig } from '../Types'
import { deriveCanonicalCompanionPlatformDisplay } from '../Utils/companion-reg-client-utils'
import { makeVoipClient as createMergedVoipClient, type MergedVoipClient } from '../Voip/socket-client'
import type { MergedVoipClientOptions } from '../Voip/types'
import { makeUsernameSocket } from './username'

// export the last socket layer
const makeWASocket = (config: UserFacingSocketConfig) => {
	const newConfig = {
		...DEFAULT_CONNECTION_CONFIG,
		...config
	}

	// Derived here, after the merge, from whichever `browser` won -- default or
	// overridden -- rather than baked into DEFAULT_CONNECTION_CONFIG for the
	// default browser alone. A caller who overrides `browser` without also
	// setting `companionPlatformDisplay` still gets a value that matches
	// their actual browser instead of one left over from the default, and
	// `deriveCanonicalCompanionPlatformDisplay` maps it to a canonical
	// browser/OS pair the server accepts rather than echoing a custom
	// browser[0]/browser[1] verbatim.
	if (!config.companionPlatformDisplay) {
		newConfig.companionPlatformDisplay = deriveCanonicalCompanionPlatformDisplay(newConfig.browser)
	}

	// Rebrand only the platform/product slot (browser[0]) shown under Linked
	// devices; browserName/version (browser[1]/browser[2]) stay untouched so
	// deriveCanonicalCompanionPlatformDisplay above still works off the
	// caller's real browser, and so `browser` stays a valid tuple.
	const browser = newConfig.browser
	newConfig.browser = ['OLDUSER BAILEYS', browser[1], browser[2]]

	// last layer: methods ported from other forks (src/ported)
	const sock = makePortedSocket(makeUsernameSocket(newConfig), {
		mediaCache: newConfig.mediaCache,
		options: newConfig.options,
		emitOwnEvents: newConfig.emitOwnEvents
	})

	// Add a socket-bound factory for the unified VoIP facade. The top-level
	// `makeVoipClient(sock, options)` export remains available as well. One
	// facade per socket prevents independent clients from competing for signaling.
	let attachedMergedVoipClient: MergedVoipClient | null = null
	const makeSocketVoipClient = async (options: MergedVoipClientOptions = {}) => {
		if (attachedMergedVoipClient) {
			throw new Error(
				'This socket already has a VoIP client. Reuse the existing client instead of attaching a second one.'
			)
		}

		const client = await createMergedVoipClient(sock, options)
		attachedMergedVoipClient = client
		sock.registerSocketEndHandler(() => {
			client.disconnect()
		})
		return client
	}

	// opt-in voice-note transcription (config.voiceRecognition = { enabled, transcribe, ... })
	bindVoiceRecognition(sock, newConfig)

	// opt-in anti-crash guard (config.AnchorGuard = true); needs the optional anchorguard package
	if (newConfig.AnchorGuard) {
		const anchorGuardPackage = '@rexxhayanasi/elaina-anchorguard'
		import(anchorGuardPackage)
			.then(({ createAntiBugGuard }) => {
				;(sock as any).anchorGuard = createAntiBugGuard(sock, {
					logger: sock.logger,
					...(newConfig.AnchorGuardConfig || {})
				})
			})
			.catch((error: Error) => {
				sock.logger?.warn(
					{ error: error.message },
					`AnchorGuard is enabled but ${anchorGuardPackage} is not installed. Run: npm install ${anchorGuardPackage}`
				)
			})
	}

	return Object.assign(sock, { makeVoipClient: makeSocketVoipClient })
}

export default makeWASocket
