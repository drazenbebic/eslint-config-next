import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

const PERFECTIONIST_DEFAULT_ARGS = {
  type: 'alphabetical',
  order: 'asc',
};

const PERFECTIONIST_DEFAULT_CONFIG = ['error', PERFECTIONIST_DEFAULT_ARGS];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  {
    settings: {
      react: {
        version: '19',
      },
    },
    plugins: {
      perfectionist: pluginPerfectionist,
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      curly: ['error', 'all'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'if' },
        { blankLine: 'always', prev: 'if', next: '*' },
        { blankLine: 'always', prev: '*', next: 'for' },
        { blankLine: 'always', prev: 'for', next: '*' },
        { blankLine: 'always', prev: '*', next: 'try' },
        { blankLine: 'always', prev: 'try', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          ...PERFECTIONIST_DEFAULT_ARGS,
          sortSideEffects: true,
          customGroups: [
            { groupName: 'side-effects', selector: 'side-effect' },
            {
              groupName: 'react-next-node',
              elementNamePattern: ['^react', '^next', '^node:'],
            },
            { groupName: 'third-party', elementNamePattern: ['^@?\\w'] },
            { groupName: 'internal', elementNamePattern: ['^@/'] },
            { groupName: 'relative', elementNamePattern: ['^\\.'] },
          ],
          groups: [
            'side-effects',
            'react-next-node',
            'third-party',
            'internal',
            'relative',
            'unknown',
          ],
        },
      ],
      'perfectionist/sort-jsx-props': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-exports': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-named-exports': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-named-imports': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-intersection-types': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-array-includes': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-union-types': PERFECTIONIST_DEFAULT_CONFIG,
      'perfectionist/sort-arrays': [
        'error',
        {
          ...PERFECTIONIST_DEFAULT_ARGS,
          useConfigurationIf: {
            matchesAstSelector: 'TSAsExpression > ArrayExpression',
          },
        },
      ],
    },
  },
  // Default ignores carried over from eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
