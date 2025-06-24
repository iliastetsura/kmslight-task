module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier', 'playwright'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:playwright/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
    },
};
