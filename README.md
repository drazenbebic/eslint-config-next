# @drazenbebic/eslint-config-next

> Opinionated, shareable [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for personal Next.js projects.

It composes the official [`eslint-config-next`](https://www.npmjs.com/package/eslint-config-next) (Core Web Vitals + TypeScript) with Prettier, import sorting, unused-import removal, and [`perfectionist`](https://perfectionist.dev/) sorting — so a new Next.js app gets a consistent, batteries-included lint setup from a single dependency.

> **Heads up:** this is a personal config tuned to my own preferences. You're welcome to use it, but it will change to suit my projects, not yours. Pin a version if that matters to you.

## What's inside

- **`eslint-config-next/core-web-vitals`** and **`eslint-config-next/typescript`** — the official Next.js rules.
- **Prettier** via [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) (`prettier/prettier` runs as an ESLint rule, and conflicting stylistic rules are turned off by `eslint-config-prettier`).
- **`unused-imports`** — auto-removes unused imports and warns on unused vars.
- **`perfectionist`** — all sorting. Import statements are grouped (side-effects → React/Next/Node built-ins → third-party → `@/` alias → relative, with `import type` intermixed by path), plus alphabetical sorting of JSX props, named imports/exports, re-exports, union/intersection types, and arrays.
- A few hand-picked core rules: `no-console` (allowing `warn`/`error`), `curly: all`, and `padding-line-between-statements` (blank lines around `if`/`for`/`try`/`return`).
- Default ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.

## Requirements

- **Node.js** `>= 20`
- **ESLint** `^9 || ^10` (flat config only — there is no `.eslintrc` support)
- **Next.js** (`next`) `>= 15` — already in your app; required because this config extends `eslint-config-next`, whose parser loads from `next`
- **Prettier** `^3`
- **TypeScript** `>= 5` (optional, only if your project uses it)

The ESLint plugins themselves ship as dependencies of this package, so you don't install them separately — only the peers above. In a real Next.js project `next` is already present, so you typically only add `eslint` and `prettier`.

## Installation

```bash
pnpm add -D @drazenbebic/eslint-config-next eslint prettier
# add typescript if your project uses it:
pnpm add -D typescript
```

<details>
<summary>npm / yarn</summary>

```bash
npm install -D @drazenbebic/eslint-config-next eslint prettier typescript
# or
yarn add -D @drazenbebic/eslint-config-next eslint prettier typescript
```

</details>

## Usage

Create an `eslint.config.mjs` (flat config) at the root of your project:

```js
import config from '@drazenbebic/eslint-config-next';

export default config;
```

That's it. The default export is a flat-config array, so you can spread it and add your own overrides on top.

### Adding project-specific overrides

Because the config is a plain array, anything you add **after** the spread wins:

```js
import { globalIgnores } from 'eslint/config';

import config from '@drazenbebic/eslint-config-next';

const eslintConfig = [
  ...config,

  // Ignore generated files (e.g. Sanity TypeGen output).
  globalIgnores(['sanity.types.ts']),

  // Tweak or disable rules for your project.
  {
    rules: {
      'no-console': 'off',
    },
  },
];

export default eslintConfig;
```

> **Note:** This config no longer ignores `sanity.types.ts` by default — add the `globalIgnores` line above in projects that use Sanity TypeGen.

### Prettier

`prettier/prettier` runs inside ESLint, so formatting issues show up as lint errors and are fixable with `eslint --fix`. Add your own `.prettierrc` to control formatting (this config does not impose a Prettier style on your project). A typical `package.json`:

```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "eslint . --fix"
  }
}
```

### The `@/` import group

The import-sort rules put imports matching `^@/` in their own group, which assumes you use the `@/*` path alias (the Next.js default). If you use a different alias, override `perfectionist/sort-imports` in your project config.

## Releasing (maintainer notes)

This package uses [release-please](https://github.com/googleapis/release-please) with **Conventional Commits**. Versions, the changelog, and the GitHub release are derived from commit messages on `main`:

- `feat: …` → minor bump
- `fix: …` / `perf: …` → patch bump
- `feat!: …` or a `BREAKING CHANGE:` footer → major bump (minor while pre-1.0)

When release-please's "Version Packages" PR is merged, the `release-please` workflow publishes to npm with [provenance](https://docs.npmjs.com/generating-provenance-statements) using [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) — there is no long-lived `NPM_TOKEN` secret to manage.

**One-time bootstrap** (because npm can only attach a trusted publisher to a package that already exists):

1. Publish once manually to claim the name and create the package:
   ```bash
   npm publish --access public
   ```
2. On npmjs.com → the package's **Settings → Trusted Publisher**, add this repo's GitHub Actions workflow (`.github/workflows/release-please.yml`).
3. From then on, merging the release-please PR publishes hands-free via OIDC.

## License

[MIT](./LICENSE)
