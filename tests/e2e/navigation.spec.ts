import { test, expect } from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';

test.describe('Navigation Tests', () => {
  
  test('@smoke Should navigate to home page', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.goto('/');
    
    const title = await basePage.getTitle();
    expect(title).toBeTruthy();
  });

  test('@regression Should navigate between pages', async ({ page }) => {
    const basePage = new BasePage(page);
    
    await basePage.goto('/');
    expect(basePage.getCurrentUrl()).toContain('the-internet.herokuapp.com');
    
    await basePage.goto('/login');
    expect(basePage.getCurrentUrl()).toContain('/login');
  });

  test('@regression Should get page title', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.goto('/');
    
    const title = await basePage.getTitle();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });
});
