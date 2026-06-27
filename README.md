# @drazenbebic/eslint-config-next

> Opinionated, shareable [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for personal Next.js projects.

Composes the official [`eslint-config-next`](https://www.npmjs.com/package/eslint-config-next) (Core Web Vitals + TypeScript) with Prettier, import sorting, unused-import removal, and [`perfectionist`](https://perfectionist.dev/) — a batteries-included setup from a single dependency.

> **Heads up:** a personal config tuned to my preferences. Use it if you like, but it changes to suit my projects — pin a version if that matters.

## Install

```bash
pnpm add -D @drazenbebic/eslint-config-next eslint prettier
```

All ESLint plugins are bundled. Peers you provide: **ESLint** `^9 || ^10` and **Prettier** `^3`, plus **Next.js** `>= 15` and **TypeScript** `>= 5` — both already present in a typical Next.js + TS app. Requires Node `>= 20` and flat config (no `.eslintrc`).

## Usage

Create `eslint.config.mjs` at your project root:

```js
import config from '@drazenbebic/eslint-config-next';

export default config;
```

Formatting runs through ESLint (`prettier/prettier`), but the style stays yours — add your own `.prettierrc`.

### Overrides

The default export is a flat-config array, so anything you append wins:

```js
import { globalIgnores } from 'eslint/config';

import config from '@drazenbebic/eslint-config-next';

const eslintConfig = [
  ...config,
  globalIgnores(['sanity.types.ts']), // e.g. Sanity TypeGen output
  { rules: { 'no-console': 'off' } },
];

export default eslintConfig;
```

## What's inside

- **`eslint-config-next`** — official Core Web Vitals + TypeScript rules.
- **Prettier** (`eslint-plugin-prettier` + `eslint-config-prettier`) — formatting as a lint rule.
- **`perfectionist`** — import grouping (side-effects → React/Next/Node → third-party → `@/` alias → relative, with `import type` intermixed by path) plus sorted JSX props, named imports/exports, types, and arrays.
- **`unused-imports`** — removes unused imports, warns on unused vars.
- Core rules: `no-console` (allows `warn`/`error`), `curly`, and blank lines around `if`/`for`/`try`/`return`.
- Ignores `.next/`, `out/`, `build/`, `next-env.d.ts`.

## License

[MIT](./LICENSE)
