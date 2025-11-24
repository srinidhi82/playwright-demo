import { test, expect } from '../../src/fixtures/testFixtures';
import { InputsPage } from '../../src/pages/InputsPage';

test.describe('Inputs Tests', () => {
  
  test('@smoke Should navigate to inputs page', async ({ page }) => {
    const inputsPage = new InputsPage(page);
    await inputsPage.navigate();
    expect(inputsPage.getCurrentUrl()).toContain('/inputs');
  });

  test('@regression Should enter number value', async ({ page }) => {
    const inputsPage = new InputsPage(page);
    await inputsPage.navigate();
    await inputsPage.enterNumber(123);
    
    const value = await inputsPage.getValue();
    expect(value).toBe('123');
  });

  test('@regression Should increment value with arrow up', async ({ page }) => {
    const inputsPage = new InputsPage(page);
    await inputsPage.navigate();
    await inputsPage.enterNumber(5);
    await inputsPage.arrowUp();
    
    const value = await inputsPage.getValue();
    expect(Number(value)).toBe(6);
  });

  test('@regression Should decrement value with arrow down', async ({ page }) => {
    const inputsPage = new InputsPage(page);
    await inputsPage.navigate();
    await inputsPage.enterNumber(10);
    await inputsPage.arrowDown();
    
    const value = await inputsPage.getValue();
    expect(Number(value)).toBe(9);
  });

  test('@regression Should clear input field', async ({ page }) => {
    const inputsPage = new InputsPage(page);
    await inputsPage.navigate();
    await inputsPage.enterNumber(999);
    await inputsPage.clear();
    
    const value = await inputsPage.getValue();
    expect(value).toBe('');
  });
});
