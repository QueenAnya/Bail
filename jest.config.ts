/** @jest-config-loader esbuild-register */
import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	roots: ['<rootDir>/src', '<rootDir>/WAProto'],
	testMatch: ['<rootDir>/src/**/*.test.ts'],
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
		'^whatsapp-rust-bridge$': '<rootDir>/node_modules/whatsapp-rust-bridge/dist/index.js',
		'^p-queue$': '<rootDir>/node_modules/p-queue/dist/index.js'
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
				isolatedModules: true,
				tsconfig: {
					module: 'esnext',
					allowJs: true,
					verbatimModuleSyntax: false,
					allowImportingTsExtensions: false
				}
			}
		],
		'^.+\\.js$': [
			'ts-jest',
			{
				useESM: true,
				isolatedModules: true,
				tsconfig: {
					module: 'esnext',
					allowJs: true,
					verbatimModuleSyntax: false
				}
			}
		]
	},
	transformIgnorePatterns: [
		'node_modules/(?!(protobufjs|long|@protobufjs|@types/long|whatsapp-rust-bridge|p-queue|p-timeout|eventemitter3)/)'
	]
}

export default config
