// Minimal ambient types for the optional `@roamhq/wrtc` peer dependency
// (native WebRTC bindings, only needed by the VoIP relay transport when
// falling back to a WebRTC data channel). It's an optional peerDependency
// (see package.json) — this stub lets Voip/relay-transport.ts's dynamic
// `import('@roamhq/wrtc')` type-check without requiring the native module
// to actually be built in every environment that type-checks this package.
declare module '@roamhq/wrtc' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const wrtc: any
	export default wrtc
}
