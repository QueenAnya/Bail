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
	const sharp = require('sharp')
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
	let image = sharp(Buffer.from(svg), { density })
	const transparent = typeof options === 'object' && (options.transparent || options.background === null)
	if (!transparent) {
		image = image.flatten({
			background: typeof options === 'object' && options.background ? options.background : { r: 255, g: 255, b: 255 }
		})
	}

	const { data, info } = await image.png().toBuffer({ resolveWithObject: true })

	return { buffer: data, width: info.width, height: info.height }
}

export const renderLatexToPngg = async (
	latexExpr: string
): Promise<{ buffer: Buffer; width: number; height: number }> => {
	const encoded = encodeURIComponent(latexExpr)
	const url = `https://latex.codecogs.com/png.image?%5Cdpi%7B1200%7D%5Cbg%7Bwhite%7D${encoded}`
	const res = await fetch(url)
	if (!res.ok) throw new Error(`[renderLatexToPng] HTTP ${res.status}`)
	const buffer = Buffer.from(await res.arrayBuffer())
	return { buffer, width: 1200, height: 600 }
}

export const convertLatexToPng = renderLatexToPng
