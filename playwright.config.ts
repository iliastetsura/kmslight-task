import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    reporter: 'html',
    use: {
        baseURL: 'https://kmslh.com',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
