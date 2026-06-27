// Dogfood: lint this repository with the config it ships.
import config from './index.js';

const eslintConfig = [
  ...config,
  {
    // This repo is the config package itself, not a Next.js app, so the
    // Next.js pages/app directory probe has nothing to find.
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];

export default eslintConfig;
