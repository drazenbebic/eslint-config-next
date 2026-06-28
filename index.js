import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

const PERFECTIONIST_DEFAULT_ARGS = {
  order: 'asc',
  type: 'alphabetical',
};

const PERFECTIONIST_DEFAULT_CONFIG = ['error', PERFECTIONIST_DEFAULT_ARGS];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  {
    plugins: {
      perfectionist: pluginPerfectionist,
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      curly: ['error', 'all'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'if', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'if' },
        { blankLine: 'always', next: 'for', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'for' },
        { blankLine: 'always', next: 'try', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'try' },
        { blankLine: 'always', next: 'return', prev: '*' },
      ],
      'perfectionist/sort-array-includes': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-arrays': [
        'error',
        {
          ...PERFECTIONIST_DEFAULT_ARGS,
          useConfigurationIf: {
            matchesAstSelector: 'TSAsExpression > ArrayExpression',
          },
        },
      ],
      'perfectionist/sort-enums': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-exports': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-imports': [
        'error',
        {
          ...PERFECTIONIST_DEFAULT_ARGS,
          customGroups: [
            { groupName: 'side-effects', selector: 'side-effect' },
            {
              elementNamePattern: ['^react', '^next', '^node:'],
              groupName: 'react-next-node',
            },
            { elementNamePattern: ['^@?\\w'], groupName: 'third-party' },
            { elementNamePattern: ['^@/'], groupName: 'internal' },
            { elementNamePattern: ['^\\.'], groupName: 'relative' },
          ],
          groups: [
            'side-effects',
            'react-next-node',
            'third-party',
            'internal',
            'relative',
            'unknown',
          ],
          sortSideEffects: true,
        },
      ],
      'perfectionist/sort-interfaces': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-intersection-types': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-jsx-props': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-named-exports': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-named-imports': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-object-types': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-objects': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-union-types': PERFECTIONIST_DEFAULT_CONFIG,
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': 'warn',
    },
    settings: {
      react: {
        version: '19',
      },
    },
  },
  {
    // `consistent-type-imports` needs the TypeScript plugin, which
    // eslint-config-next only registers for TS files.
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  // Default ignores carried over from eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
