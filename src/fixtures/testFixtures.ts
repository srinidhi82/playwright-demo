import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DynamicContentPage } from '../pages/DynamicContentPage';
import { CheckboxPage } from '../pages/CheckboxPage';
import { DropdownPage } from '../pages/DropdownPage';
import { FormAuthenticationPage } from '../pages/FormAuthenticationPage';

// Extend base test with custom fixtures
type TestFixtures = {
  loginPage: LoginPage;
  dynamicContentPage: DynamicContentPage;
  checkboxPage: CheckboxPage;
  dropdownPage: DropdownPage;
  formAuthPage: FormAuthenticationPage;
  authenticatedPage: any; // Page after authentication
};

/**
 * Custom fixtures extending Playwright's base test
 * Provides page objects and common utilities to all tests
 */
export const test = base.extend<TestFixtures>({
  // Login Page fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Dynamic Content Page fixture
  dynamicContentPage: async ({ page }, use) => {
    const dynamicContentPage = new DynamicContentPage(page);
    await use(dynamicContentPage);
  },

  // Checkbox Page fixture
  checkboxPage: async ({ page }, use) => {
    const checkboxPage = new CheckboxPage(page);
    await use(checkboxPage);
  },

  // Dropdown Page fixture
  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await use(dropdownPage);
  },

  // Form Authentication Page fixture
  formAuthPage: async ({ page }, use) => {
    const formAuthPage = new FormAuthenticationPage(page);
    await use(formAuthPage);
  },

  // Authenticated page fixture (uses storage state)
  authenticatedPage: async ({ browser, baseURL }, use) => {
    const context = await browser.newContext({
      storageState: 'storage-state.json',
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
