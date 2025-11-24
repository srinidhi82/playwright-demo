import { test, expect } from '../../src/fixtures/testFixtures';

test.describe('Dropdown Tests', () => {
  
  test('@smoke Should navigate to dropdown page', async ({ dropdownPage }) => {
    await dropdownPage.navigate();
    expect(dropdownPage.getCurrentUrl()).toContain('/dropdown');
  });

  test('@regression Should select option by value', async ({ dropdownPage }) => {
    await dropdownPage.navigate();
    await dropdownPage.selectOption('1');
    
    const selectedValue = await dropdownPage.getSelectedValue();
    expect(selectedValue).toBe('1');
  });

  test('@regression Should select option by label', async ({ dropdownPage }) => {
    await dropdownPage.navigate();
    await dropdownPage.selectOptionByLabel('Option 2');
    
    const selectedValue = await dropdownPage.getSelectedValue();
    expect(selectedValue).toBe('2');
  });

  test('@regression Should get all available options', async ({ dropdownPage }) => {
    await dropdownPage.navigate();
    const options = await dropdownPage.getAllOptions();
    
    expect(options.length).toBeGreaterThan(0);
    expect(options).toContain('Please select an option');
  });

  test('@regression Should get selected option text', async ({ dropdownPage }) => {
    await dropdownPage.navigate();
    await dropdownPage.selectOption('2');
    
    const selectedText = await dropdownPage.getSelectedText();
    expect(selectedText).toContain('Option 2');
  });
});
