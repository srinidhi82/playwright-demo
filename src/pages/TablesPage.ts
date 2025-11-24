import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HTML Tables Page Object Model
 */
export class TablesPage extends BasePage {
  private readonly table = '#table1';
  private readonly tableRows = '#table1 tbody tr';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/tables');
  }

  /**
   * Get all table rows
   */
  getRows() {
    return this.page.locator(this.tableRows);
  }

  /**
   * Get row count
   */
  async getRowCount(): Promise<number> {
    return await this.page.locator(this.tableRows).count();
  }

  /**
   * Get cell text by row and column index
   */
  async getCellText(rowIndex: number, columnIndex: number): Promise<string | null> {
    const row = this.page.locator(this.tableRows).nth(rowIndex);
    const cell = row.locator('td').nth(columnIndex);
    return await cell.textContent();
  }

  /**
   * Get all cell texts in a row
   */
  async getRowTexts(rowIndex: number): Promise<(string | null)[]> {
    const row = this.page.locator(this.tableRows).nth(rowIndex);
    const cells = row.locator('td');
    const count = await cells.count();
    const texts: (string | null)[] = [];
    
    for (let i = 0; i < count; i++) {
      texts.push(await cells.nth(i).textContent());
    }
    
    return texts;
  }

  /**
   * Find row index by cell text
   */
  async findRowByCellText(text: string): Promise<number> {
    const rows = this.getRows();
    const count = await rows.count();
    
    for (let i = 0; i < count; i++) {
      const rowText = await rows.nth(i).textContent();
      if (rowText?.includes(text)) {
        return i;
      }
    }
    
    return -1;
  }

  /**
   * Click on a cell in a row
   */
  async clickCell(rowIndex: number, columnIndex: number): Promise<void> {
    const row = this.page.locator(this.tableRows).nth(rowIndex);
    const cell = row.locator('td').nth(columnIndex);
    await cell.click();
  }
}
