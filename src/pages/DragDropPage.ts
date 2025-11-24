import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Drag and Drop Page Object Model
 */
export class DragDropPage extends BasePage {
  private readonly columnA = '#column-a';
  private readonly columnB = '#column-b';
  private readonly headerA = '#column-a header';
  private readonly headerB = '#column-b header';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/drag_and_drop');
  }

  /**
   * Drag column A to column B
   */
  async dragAToB(): Promise<void> {
    const source = this.page.locator(this.columnA);
    const target = this.page.locator(this.columnB);
    await source.dragTo(target);
  }

  /**
   * Drag column B to column A
   */
  async dragBToA(): Promise<void> {
    const source = this.page.locator(this.columnB);
    const target = this.page.locator(this.columnA);
    await source.dragTo(target);
  }

  /**
   * Get header text for column A
   */
  async getColumnAHeader(): Promise<string | null> {
    return await this.getText(this.headerA);
  }

  /**
   * Get header text for column B
   */
  async getColumnBHeader(): Promise<string | null> {
    return await this.getText(this.headerB);
  }
}
