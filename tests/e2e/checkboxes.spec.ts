import { test, expect } from '../../src/fixtures/testFixtures';

test.describe('Checkboxes Tests', () => {
  
  test('@smoke Should navigate to checkboxes page', async ({ checkboxPage }) => {
    await checkboxPage.navigate();
    expect(checkboxPage.getCurrentUrl()).toContain('/checkboxes');
  });

  test('@regression Should check first checkbox', async ({ checkboxPage }) => {
    await checkboxPage.navigate();
    await checkboxPage.uncheckFirst(); // Ensure unchecked first
    await checkboxPage.checkFirst();
    
    expect(await checkboxPage.isFirstChecked()).toBe(true);
  });

  test('@regression Should uncheck second checkbox', async ({ checkboxPage }) => {
    await checkboxPage.navigate();
    await checkboxPage.checkSecond(); // Ensure checked first
    await checkboxPage.uncheckSecond();
    
    expect(await checkboxPage.isSecondChecked()).toBe(false);
  });

  test('@regression Should check all checkboxes', async ({ checkboxPage }) => {
    await checkboxPage.navigate();
    await checkboxPage.checkAll();
    
    expect(await checkboxPage.isFirstChecked()).toBe(true);
    expect(await checkboxPage.isSecondChecked()).toBe(true);
  });

  test('@regression Should uncheck all checkboxes', async ({ checkboxPage }) => {
    await checkboxPage.navigate();
    await checkboxPage.uncheckAll();
    
    expect(await checkboxPage.isFirstChecked()).toBe(false);
    expect(await checkboxPage.isSecondChecked()).toBe(false);
  });
});
