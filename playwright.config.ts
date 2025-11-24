import { defineConfig, devices } from '@playwright/test';
import { loadEnvConfig } from './src/utils/envLoader';

// Load environment configuration
const env = process.env.ENV || 'dev';
const envConfig = loadEnvConfig(env);

/**
 * Playwright configuration with ENV-based settings
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  // Timeout settings
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL from environment config
    baseURL: envConfig.baseUrl,
    
    // API base URL
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
    
    // Collect trace on failure
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Storage state for authenticated tests
    storageState: envConfig.useStorageState ? 'storage-state.json' : undefined,
  },
  
  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  // Global setup and teardown
  globalSetup: require.resolve('./src/globalSetup.ts'),
  
  // Web server configuration (optional - for local app testing)
  // webServer: {
  //   command: 'npm run start',
  //   url: envConfig.baseUrl,
  //   reuseExistingServer: !process.env.CI,
  // },
});
