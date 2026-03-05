import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importX from 'eslint-plugin-import-x'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  // ─── Base + TypeScript (type-aware) ────────────────────────────────────────
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      prettier, // must be last — disables all formatting rules
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
      'import-x/resolver': {
        typescript: { project: './tsconfig.app.json' },
        node: true,
      },
    },
    rules: {
      // ── TypeScript ──────────────────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // ── React ───────────────────────────────────────────────────────────────
      'react/prop-types': 'off', // TypeScript handles this

      // ── Import order ────────────────────────────────────────────────────────
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'never',
        },
      ],

      // ── Project conventions ─────────────────────────────────────────────────
      // Enforce barrel imports for ui + three component directories
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['*/components/ui/*'],
              message: "Import from '../components/ui' barrel, not from the individual file.",
            },
            {
              group: ['*/components/three/*'],
              message: "Import from '../components/three' barrel, not from the individual file.",
            },
          ],
        },
      ],
    },
  },

  // ─── Three.js / R3F components — disable false positives ──────────────────
  // R3F extends JSX with Three.js props (position, rotation, args, …).
  // eslint-plugin-react has no knowledge of these, so react/no-unknown-property
  // fires on every mesh/light. Disable it for the three/ directory and for any
  // section or component that renders a <Canvas> directly.
  {
    files: [
      'src/components/three/**/*.{ts,tsx}',
      'src/components/SpaceBackground.tsx',
      'src/sections/Hero.tsx',
      'src/sections/Contact.tsx',
    ],
    rules: {
      'react/no-unknown-property': 'off',
      // Math.random() inside useMemo is intentional (stable seed per mount).
      'react-hooks/purity': 'off',
    },
  },

  // ─── Context files — intentional provider + hook co-location ────────────────
  // React context best practice is to co-locate the Provider component with
  // its companion useX() hook in the same file. The react-refresh rule would
  // force them into separate files, which adds unnecessary indirection for
  // small focused contexts like ProjectFilterContext.
  {
    files: ['src/context/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

  // ─── Relax type-aware rules for config / tooling files ────────────────────
  {
    files: ['*.config.{js,ts}', '*.config.*.{js,ts}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
])
