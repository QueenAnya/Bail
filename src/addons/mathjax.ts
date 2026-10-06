import { createRequire } from 'module'

const require = createRequire(import.meta.url)
let mathjaxInstance: any = null

export const getMathJax = () => {
	if (!mathjaxInstance) {
		const { mathjax } = require('mathjax-full/js/mathjax.js')
		const { TeX } = require('mathjax-full/js/input/tex.js')
		const { SVG } = require('mathjax-full/js/output/svg.js')
		const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js')
		const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js')
		const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js')
		const adaptor = liteAdaptor()
		RegisterHTMLHandler(adaptor)

		const tex = new TeX({
			packages: AllPackages,
			inlineMath: [
				['$', '$'],
				['\\(', '\\)']
			],
			displayMath: [
				['$$', '$$'],
				['\\[', '\\]']
			]
		})

		const svgOutput = new SVG({ fontCache: 'local' })
		const htmlDoc = mathjax.document('', { InputJax: tex, OutputJax: svgOutput })
		mathjaxInstance = { adaptor, htmlDoc }
	}

	return mathjaxInstance
}

export const scaleMap: Record<string, number> = {
	'10%': 0.1,
	'25%': 0.25,
	'50%': 0.5,
	'75%': 0.75,
	'100%': 1,
	'125%': 1.25,
	'150%': 1.5,
	'200%': 2,
	'500%': 5,
	'1000%': 10
}
export const unsupportedCommands = ['\\input', '\\include', '\\write18', '\\immediate', '\\verbatiminput']

export const convertLatexToSvg = (latexInput: string, scale: number | string = 1) => {
	if (!latexInput) throw new Error('[convertLatexToSvg] No LaTeX input provided.')
	let eq = latexInput.trim()
	const bad = unsupportedCommands.filter(cmd => eq.includes(cmd))
	if (bad.length) throw new Error(`Unsupported command(s) found: ${bad.join(', ')}. Please remove them and try again.`)
	eq = eq
		.replace(/\\documentclass(?:\[[^\]]*\])?\{[^}]+\}/g, '')
		.replace(/\\usepackage(?:\[[^\]]*\])?\{[^}]+\}/g, '')
		.replace(/\\thispagestyle\{[^}]+\}/g, '')
		.replace(/\\begin\{document\}/g, '')
		.replace(/\\end\{document\}/g, '')
		.trim()
	const { adaptor, htmlDoc } = getMathJax()

	const node = htmlDoc.convert(eq, { display: true })
	const merror = adaptor.tags(node, 'g').find((g: any) => adaptor.getAttribute(g, 'data-mml-node') === 'merror')
	if (merror) {
		throw new Error(
			`LaTeX Error: ${adaptor.getAttribute(merror, 'data-mjx-error') || 'Syntax error in LaTeX equation'}`
		)
	}

	let svg = adaptor.innerHTML(node)
	const n = typeof scale === 'string' ? (scaleMap[scale] ?? parseFloat(scale)) : scale
	if (n && n !== 1) {
		svg = svg.replace(
			/width="([0-9.]+)ex"\s+height="([0-9.]+)ex"/,
			(_m: string, w: string, h: string) =>
				`width="${(parseFloat(w) * n).toFixed(3)}ex" height="${(parseFloat(h) * n).toFixed(3)}ex"`
		)
	}

	return svg
}

export interface LatexRenderOptions {
	scale?: number | string
	outputScale?: number | string
	density?: number
	background?: any
	transparent?: boolean
}
export const renderLatexToPng = async (latexExpr: string, options: number | string | LatexRenderOptions = {}) => {
	if (!latexExpr) throw new Error('[renderLatexToPng] No LaTeX input provided.')
	let outputScale = 2
	if (typeof options === 'number') {
		outputScale = options
	} else if (typeof options === 'string') {
		outputScale = (scaleMap[options] ?? parseFloat(options)) || 2
	} else if (options.scale !== undefined) {
		outputScale =
			typeof options.scale === 'string' ? (scaleMap[options.scale] ?? parseFloat(options.scale)) : options.scale
	} else if (options.outputScale !== undefined) {
		outputScale =
			typeof options.outputScale === 'string'
				? (scaleMap[options.outputScale] ?? parseFloat(options.outputScale))
				: options.outputScale
	}

	if (!Number.isFinite(outputScale) || outputScale <= 0) outputScale = 2
	const svg = convertLatexToSvg(latexExpr, outputScale)
	const density =
		typeof options === 'object' && options.density ? Math.round(options.density) : Math.round(96 * outputScale)
	const transparent = typeof options === 'object' && (options.transparent || options.background === null)
	const background = typeof options === 'object' && options.background ? options.background : { r: 255, g: 255, b: 255 }

	// 1) sharp  2) @napi-rs/image  3) online codecogs (last resort).
	// None of these is a hard dependency, so a bot container without sharp still renders LaTeX.
	const failures: string[] = []

	const sharp = tryRequire('sharp')
	if (sharp) {
		try {
			let image = sharp(Buffer.from(svg), { density })
			if (!transparent) image = image.flatten({ background })
			const { data, info } = await image.png().toBuffer({ resolveWithObject: true })
			return { buffer: data as Buffer, width: info.width as number, height: info.height as number }
		} catch (e: any) {
			failures.push(`sharp: ${e?.message || e}`)
		}
	}

	const napi = tryRequire('@napi-rs/image')
	if (napi?.Transformer?.fromSvg) {
		try {
			const bg = transparent ? undefined : toCssColor(background)
			// @napi-rs/image rasterises at the SVG's viewBox size; scale to what sharp would produce
			// for the same density (MathJax sizes are in `ex`; sharp renders 1ex = 8px at 96 dpi).
			const target = svgTargetSize(svg, density)
			let transformer = napi.Transformer.fromSvg(svg, bg)
			if (target) transformer = transformer.resize(target.width, target.height)
			const buffer: Buffer = await transformer.png()
			return { buffer, width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
		} catch (e: any) {
			failures.push(`@napi-rs/image: ${e?.message || e}`)
		}
	}

	try {
		return await renderLatexToPngg(latexExpr)
	} catch (e: any) {
		failures.push(`online: ${e?.message || e}`)
	}

	throw new Error(
		`[renderLatexToPng] Could not render LaTeX to PNG. Install an image library (npm i sharp, or npm i @napi-rs/image). Tried -> ${failures.join(' | ') || 'no renderer available'}`
	)
}

/** `require` that returns null instead of throwing when the optional module is missing. */
function tryRequire(name: string): any {
	try {
		return require(name)
	} catch {
		return null
	}
}

const toCssColor = (c: any): string => {
	if (typeof c === 'string') return c
	const { r = 255, g = 255, b = 255 } = c || {}
	const hex = (n: number) =>
		Math.max(0, Math.min(255, Math.round(n)))
			.toString(16)
			.padStart(2, '0')
	return `#${hex(r)}${hex(g)}${hex(b)}`
}

/** Output size sharp would give for a MathJax SVG (sizes in ex, 1ex = 8 CSS px) at `density` dpi. */
const svgTargetSize = (svg: string, density: number): { width: number; height: number } | null => {
	const m = svg.match(/width="([0-9.]+)ex"\s+height="([0-9.]+)ex"/)
	if (!m) return null
	const k = (8 * density) / 96
	const width = Math.max(1, Math.round(parseFloat(m[1]!) * k))
	const height = Math.max(1, Math.round(parseFloat(m[2]!) * k))
	return { width, height }
}

/** Reads the pixel size from a PNG's IHDR chunk. */
const pngSize = (buf: Buffer): { width: number; height: number } | null =>
	buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47
		? { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
		: null

export const renderLatexToPngg = async (
	latexExpr: string
): Promise<{ buffer: Buffer; width: number; height: number }> => {
	const encoded = encodeURIComponent(latexExpr)
	const url = `https://latex.codecogs.com/png.image?%5Cdpi%7B300%7D%5Cbg%7Bwhite%7D${encoded}`
	const res = await fetch(url)
	if (!res.ok) throw new Error(`[renderLatexToPng] HTTP ${res.status}`)
	const buffer = Buffer.from(await res.arrayBuffer())
	const size = pngSize(buffer)
	if (!size) throw new Error('[renderLatexToPng] online renderer did not return a PNG')
	return { buffer, ...size }
}

export const convertLatexToPng = renderLatexToPng
