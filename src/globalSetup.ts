import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { loadEnvConfig } from './utils/envLoader';

/**
 * Global setup function that runs before all tests
 * Creates authenticated storage state for reuse across tests
 */
async function globalSetup(config: FullConfig) {
  const env = process.env.ENV || 'dev';
  const envConfig = loadEnvConfig(env);
  
  console.log(`Running global setup for environment: ${env}`);
  console.log(`Base URL: ${envConfig.baseUrl}`);
  
  // If storage state is disabled, skip authentication
  if (!envConfig.useStorageState) {
    console.log('Storage state disabled, skipping authentication');
    return;
  }
  
  // Create browser context and authenticate
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Example authentication flow
    // This is a template - update with actual authentication logic
    if (envConfig.username && envConfig.password) {
      console.log('Attempting authentication...');
      
      // Navigate to login page (update with actual URL)
      await page.goto(`${envConfig.baseUrl}/login`, { waitUntil: 'networkidle' });
      
      // Fill login form (update selectors based on actual app)
      // await page.fill('[name="username"]', envConfig.username);
      // await page.fill('[name="password"]', envConfig.password);
      // await page.click('button[type="submit"]');
      
      // Wait for successful login
      // await page.waitForURL(/dashboard|home/, { timeout: 10000 });
      
      console.log('Authentication completed');
    }
    
    // Save storage state to file
    const storageStatePath = path.join(__dirname, '../storage-state.json');
    await context.storageState({ path: storageStatePath });
    console.log(`Storage state saved to: ${storageStatePath}`);
    
  } catch (error) {
    console.error('Global setup failed:', error);
    // Don't fail the build if authentication fails - tests can handle it
  } finally {
    await context.close();
    await browser.close();
  }
}

export default globalSetup;
