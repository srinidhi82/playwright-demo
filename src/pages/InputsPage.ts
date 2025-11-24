import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Inputs Page Object Model
 */
export class InputsPage extends BasePage {
  private readonly numberInput = 'input[type="number"]';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/inputs');
  }

  /**
   * Enter number value
   */
  async enterNumber(value: string | number): Promise<void> {
    await this.fill(this.numberInput, String(value));
  }

  /**
   * Get input value
   */
  async getValue(): Promise<string> {
    return await this.page.locator(this.numberInput).inputValue();
  }

  /**
   * Clear input
   */
  async clear(): Promise<void> {
    await this.page.locator(this.numberInput).clear();
  }

  /**
   * Arrow key up
   */
  async arrowUp(): Promise<void> {
    await this.page.locator(this.numberInput).press('ArrowUp');
  }

  /**
   * Arrow key down
   */
  async arrowDown(): Promise<void> {
    await this.page.locator(this.numberInput).press('ArrowDown');
  }
}
