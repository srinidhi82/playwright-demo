import { test, expect } from '../../src/fixtures/testFixtures';
import { TablesPage } from '../../src/pages/TablesPage';

test.describe('Tables Tests', () => {
  
  test('@smoke Should navigate to tables page', async ({ page }) => {
    const tablesPage = new TablesPage(page);
    await tablesPage.navigate();
    expect(tablesPage.getCurrentUrl()).toContain('/tables');
  });

  test('@regression Should get table row count', async ({ page }) => {
    const tablesPage = new TablesPage(page);
    await tablesPage.navigate();
    const rowCount = await tablesPage.getRowCount();
    
    expect(rowCount).toBeGreaterThan(0);
  });

  test('@regression Should get cell text by index', async ({ page }) => {
    const tablesPage = new TablesPage(page);
    await tablesPage.navigate();
    const cellText = await tablesPage.getCellText(0, 0);
    
    expect(cellText).toBeTruthy();
  });

  test('@regression Should get all row texts', async ({ page }) => {
    const tablesPage = new TablesPage(page);
    await tablesPage.navigate();
    const rowTexts = await tablesPage.getRowTexts(0);
    
    expect(rowTexts.length).toBeGreaterThan(0);
  });

  test('@regression Should find row by cell text', async ({ page }) => {
    const tablesPage = new TablesPage(page);
    await tablesPage.navigate();
    const rowIndex = await tablesPage.findRowByCellText('Smith');
    
    expect(rowIndex).toBeGreaterThanOrEqual(0);
  });
});
