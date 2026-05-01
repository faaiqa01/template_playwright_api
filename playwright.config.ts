import { defineConfig } from '@playwright/test';

const apiBaseUrl = process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';
const apiToken = process.env.API_TOKEN;

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    expect: {
        timeout: 10_000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['list'],
        ['json', { outputFile: 'test-results/results.json' }],
    ],
    use: {
        baseURL: apiBaseUrl,
        extraHTTPHeaders: {
            Accept: 'application/json',
            ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
        },
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
    },
    outputDir: 'test-results',
});
