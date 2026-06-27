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
    overrideConfigFile: true,
    baseConfig: config,
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
    overrideConfigFile: true,
    baseConfig: config,
  });

  const code = "import { b, a } from 'node:test';\n\nb();\na();\n";
  const [result] = await eslint.lintText(code, { filePath: 'sample.js' });
  const ruleIds = result.messages.map(message => message.ruleId);

  assert.ok(
    ruleIds.includes('perfectionist/sort-named-imports'),
    `expected sort-named-imports to fire, got: ${ruleIds.join(', ')}`,
  );
});
