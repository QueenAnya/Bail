declare module 'node-webpmux' {
	export class Image {
		exif: Buffer | undefined
		load(path: string): Promise<void>
		save(path: string | null): Promise<void>
	}

	const webpmux: {
		TYPE_LOSSY: number
		TYPE_LOSSLESS: number
		TYPE_EXTENDED: number
		Image: typeof Image
	}

	export default webpmux
}
