import { Page, Locator } from '@playwright/test';

/**
 * Utility functions for test helpers
 */

/**
 * Wait for element to be visible and stable
 */
export async function waitForElementStable(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<Locator> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  return element;
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email
 */
export function generateRandomEmail(domain: string = 'test.com'): string {
  return `test_${generateRandomString(8)}@${domain}`;
}

/**
 * Take screenshot with timestamp
 */
export async function takeScreenshot(
  page: Page,
  name: string
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ path: `test-results/screenshots/${name}_${timestamp}.png` });
}

/**
 * Scroll element into view
 */
export async function scrollIntoView(
  page: Page,
  selector: string
): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Wait for network to be idle
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout: number = 5000
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Get text content from element
 */
export async function getTextContent(
  page: Page,
  selector: string
): Promise<string | null> {
  const element = page.locator(selector);
  return await element.textContent();
}

/**
 * Check if element is visible
 */
export async function isElementVisible(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<boolean> {
  try {
    await page.locator(selector).waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * Wait for specific HTTP status code
 */
export async function waitForResponse(
  page: Page,
  urlPattern: string | RegExp,
  statusCode: number = 200,
  timeout: number = 10000
): Promise<void> {
  const response = await page.waitForResponse(
    response => {
      const urlMatch = typeof urlPattern === 'string'
        ? response.url().includes(urlPattern)
        : urlPattern.test(response.url());
      return urlMatch && response.status() === statusCode;
    },
    { timeout }
  );
  
  if (response.status() !== statusCode) {
    throw new Error(`Expected status ${statusCode}, got ${response.status()}`);
  }
}

/**
 * Retry function wrapper
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}
