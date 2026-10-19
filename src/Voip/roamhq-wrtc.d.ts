// Minimal ambient types for `@roamhq/wrtc` (native WebRTC bindings).
// This declaration keeps the lazy dynamic import in relay-transport.ts
// type-checkable while the package is declared as a required runtime dependency.
declare module '@roamhq/wrtc' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const wrtc: any
	export default wrtc
}
