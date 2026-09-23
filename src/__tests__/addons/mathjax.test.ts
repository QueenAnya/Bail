import { convertLatexToPng, convertLatexToSvg, renderLatexToPng, unsupportedCommands } from '../../addons/mathjax'

describe('convertLatexToSvg', () => {
	it('renders valid LaTeX to an SVG string', () => {
		const svg = convertLatexToSvg('E = mc^2')

		expect(svg).toContain('<svg')
		expect(svg).toMatch(/width="[0-9.]+ex"/)
		expect(svg).toMatch(/height="[0-9.]+ex"/)
	})

	it('throws for empty input', () => {
		expect(() => convertLatexToSvg('')).toThrow('No LaTeX input provided')
	})

	it('throws for genuinely malformed LaTeX instead of silently rendering', () => {
		expect(() => convertLatexToSvg('\\frac{1')).toThrow(/LaTeX Error/)
		expect(() => convertLatexToSvg('\\sqrt')).toThrow(/LaTeX Error/)
		expect(() => convertLatexToSvg('\\begin{matrix} 1 & 2 \\end{matrix2}')).toThrow(/LaTeX Error/)
	})

	it('blocks every unsupported/dangerous command', () => {
		for (const cmd of unsupportedCommands) {
			expect(() => convertLatexToSvg(`${cmd}{x}`)).toThrow(/Unsupported command/)
		}
	})

	it('scales the rendered SVG dimensions', () => {
		const base = convertLatexToSvg('x^2', 1)
		const scaled = convertLatexToSvg('x^2', 2)

		const baseWidth = parseFloat(/width="([0-9.]+)ex"/.exec(base)?.[1] ?? '0')
		const scaledWidth = parseFloat(/width="([0-9.]+)ex"/.exec(scaled)?.[1] ?? '0')

		expect(scaledWidth).toBeCloseTo(baseWidth * 2, 1)
	})

	it('strips a full LaTeX document preamble down to just the body', () => {
		const withPreamble = convertLatexToSvg(
			'\\documentclass{article}\\usepackage{amsmath}\\begin{document}x^2\\end{document}'
		)
		const bodyOnly = convertLatexToSvg('x^2')

		// MathJax assigns each render its own internal element-id counter, so
		// two separate calls are never byte-identical even for the same input --
		// compare the part that reflects actual rendered content/size instead.
		const dims = (svg: string) => /width="[0-9.]+ex" height="[0-9.]+ex"/.exec(svg)?.[0]
		expect(dims(withPreamble)).toBe(dims(bodyOnly))
	})
})

describe('renderLatexToPng', () => {
	it('renders a valid PNG with real (non-hardcoded) dimensions', async () => {
		const { buffer, width, height } = await renderLatexToPng('E = mc^2')

		// PNG signature
		expect(buffer.subarray(0, 4)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47]))
		expect(width).toBeGreaterThan(0)
		expect(height).toBeGreaterThan(0)
	})

	it('throws for empty input', async () => {
		await expect(renderLatexToPng('')).rejects.toThrow('No LaTeX input provided')
	})

	it('propagates the security block for unsupported commands', async () => {
		await expect(renderLatexToPng('\\input{/etc/passwd}')).rejects.toThrow(/Unsupported command/)
	})

	it('propagates LaTeX syntax errors', async () => {
		await expect(renderLatexToPng('\\frac{1')).rejects.toThrow(/LaTeX Error/)
	})

	it('produces a larger image for a larger scale option', async () => {
		const small = await renderLatexToPng('x^2', 1)
		const large = await renderLatexToPng('x^2', 2)

		expect(large.width).toBeGreaterThan(small.width)
	})

	it('accepts a percentage-string scale', async () => {
		const result = await renderLatexToPng('x^2', '200%')

		expect(result.width).toBeGreaterThan(0)
	})
})

describe('convertLatexToPng', () => {
	it('is an alias of renderLatexToPng', () => {
		expect(convertLatexToPng).toBe(renderLatexToPng)
	})
})
