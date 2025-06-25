import { defineConfig } from 'eslint-define-config';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import playwrightPlugin from 'eslint-plugin-playwright';
import parser from '@typescript-eslint/parser';

export default defineConfig({
    languageOptions: {
        parser,
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
        globals: {
            browser: true,
            node: true,
            es2021: true,
        },
    },
    plugins: {
        '@typescript-eslint': typescriptEslintPlugin,
        prettier: prettierPlugin,
        playwright: playwrightPlugin,
    },
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'playwright/no-wait-for-timeout': 'warn',
    },
});
