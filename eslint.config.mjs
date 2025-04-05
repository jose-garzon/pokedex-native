import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import testingLibrary from 'eslint-plugin-testing-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/node_modules/', '**/.expo/', '**/dist/', '**/web-build/', '**/*.config.js']),
  {
    extends: compat.extends('eslint:recommended', 'plugin:react/recommended', 'prettier'),
    plugins: {
      react,
      'react-native': reactNative,
      'testing-library': testingLibrary.configs.react,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...reactNative.environments['react-native']['react-native'],
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
      'react-native/no-inline-styles': 'warn',
    },
  },
]);
