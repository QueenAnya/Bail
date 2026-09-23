import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
// import { deriveCanonicalCompanionPlatformDisplay } from '../Utils/companion-reg-client-utils'
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

	// Commented out for now — keeping this here in case I need it again later
	/***
	if (!config.companionPlatformDisplay) {
		newConfig.companionPlatformDisplay = deriveCanonicalCompanionPlatformDisplay(newConfig.browser)
	}
	*/

	return makeUsernameSocket(newConfig)
}

export default makeWASocket
