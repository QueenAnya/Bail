// eslint.config.js
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import queenanya from '@queenanya/eslint-config';

export default [
  {
    ignores: ['src/Tests/*'],
  },
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      }
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs
    },
    rules: {
      ...queenanya.rules,
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      'no-restricted-syntax': 'off',
      'keyword-spacing': 'warn'
    }
  }
];
