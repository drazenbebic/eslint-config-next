import assert from 'node:assert/strict';
import { test } from 'node:test';

import { ESLint } from 'eslint';

import config from '../index.js';

test('exports a non-empty flat-config array', () => {
  assert.ok(Array.isArray(config));
  assert.ok(config.length > 0);
});

test('loads cleanly and applies the no-console rule', async () => {
  const eslint = new ESLint({
    baseConfig: config,
    overrideConfigFile: true,
  });

  const code = "console.log('debug');\n";
  const [result] = await eslint.lintText(code, { filePath: 'sample.js' });
  const ruleIds = result.messages.map(message => message.ruleId);

  assert.ok(
    ruleIds.includes('no-console'),
    `expected no-console to fire, got: ${ruleIds.join(', ')}`,
  );
});

test('sorts named imports via perfectionist', async () => {
  const eslint = new ESLint({
    baseConfig: config,
    overrideConfigFile: true,
  });

  const code = "import { b, a } from 'node:test';\n\nb();\na();\n";
  const [result] = await eslint.lintText(code, { filePath: 'sample.js' });
  const ruleIds = result.messages.map(message => message.ruleId);

  assert.ok(
    ruleIds.includes('perfectionist/sort-named-imports'),
    `expected sort-named-imports to fire, got: ${ruleIds.join(', ')}`,
  );
});

test('groups import statements via perfectionist/sort-imports', async () => {
  const eslint = new ESLint({
    baseConfig: config,
    overrideConfigFile: true,
  });

  // Relative import before a React import — wrong group order.
  const code =
    "import { x } from './local';\nimport { y } from 'react';\n\nx();\ny();\n";
  const [result] = await eslint.lintText(code, { filePath: 'sample.js' });
  const ruleIds = result.messages.map(message => message.ruleId);

  assert.ok(
    ruleIds.includes('perfectionist/sort-imports'),
    `expected sort-imports to fire, got: ${ruleIds.join(', ')}`,
  );
});

test('sorts object keys via perfectionist/sort-objects', async () => {
  const eslint = new ESLint({
    baseConfig: config,
    overrideConfigFile: true,
  });

  const code = 'const o = { b: 1, a: 2 };\n\nconsole.warn(o);\n';
  const [result] = await eslint.lintText(code, { filePath: 'sample.js' });
  const ruleIds = result.messages.map(message => message.ruleId);

  assert.ok(
    ruleIds.includes('perfectionist/sort-objects'),
    `expected sort-objects to fire, got: ${ruleIds.join(', ')}`,
  );
});

test('enforces import type on TS files via consistent-type-imports', async () => {
  const eslint = new ESLint({
    baseConfig: config,
    overrideConfigFile: true,
  });

  // `Bar` is used only as a type, so it should be an `import type`.
  const code =
    "import { Bar } from './bar';\n\ntype X = Bar;\nexport type { X };\n";
  const [result] = await eslint.lintText(code, { filePath: 'sample.ts' });
  const ruleIds = result.messages.map(message => message.ruleId);

  assert.ok(
    ruleIds.includes('@typescript-eslint/consistent-type-imports'),
    `expected consistent-type-imports to fire, got: ${ruleIds.join(', ')}`,
  );
});
