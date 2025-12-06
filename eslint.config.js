// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      // Add your custom rules or overrides here if any.
      // For now, keeping it minimal to match the original .eslintrc.json behavior.
    },
  },
]);

export default eslintConfig;
