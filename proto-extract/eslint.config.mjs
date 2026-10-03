import prettierRecommended from 'eslint-plugin-prettier/recommended'

// Standalone config for the plain-JS (CommonJS) proto extractor.
// The root eslint.config.mts is TypeScript/type-aware and ignores this folder,
// so ESLint (>= 10 looks up the nearest config per file) uses this one instead.
// Formatting follows the repo's root .prettierrc.
export default [
	prettierRecommended,
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'commonjs'
		}
	}
]
