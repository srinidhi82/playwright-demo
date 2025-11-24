import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkbox Page Object Model
 */
export class CheckboxPage extends BasePage {
  private readonly checkboxes = 'input[type="checkbox"]';
  private readonly checkbox1 = 'input[type="checkbox"]:nth-of-type(1)';
  private readonly checkbox2 = 'input[type="checkbox"]:nth-of-type(2)';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/checkboxes');
  }

  /**
   * Get all checkboxes
   */
  getCheckboxes() {
    return this.page.locator(this.checkboxes);
  }

  /**
   * Check first checkbox
   */
  async checkFirst(): Promise<void> {
    const checkbox = this.page.locator(this.checkbox1);
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  /**
   * Uncheck first checkbox
   */
  async uncheckFirst(): Promise<void> {
    const checkbox = this.page.locator(this.checkbox1);
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
    }
  }

  /**
   * Check second checkbox
   */
  async checkSecond(): Promise<void> {
    const checkbox = this.page.locator(this.checkbox2);
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  /**
   * Uncheck second checkbox
   */
  async uncheckSecond(): Promise<void> {
    const checkbox = this.page.locator(this.checkbox2);
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
    }
  }

  /**
   * Check if first checkbox is checked
   */
  async isFirstChecked(): Promise<boolean> {
    return await this.page.locator(this.checkbox1).isChecked();
  }

  /**
   * Check if second checkbox is checked
   */
  async isSecondChecked(): Promise<boolean> {
    return await this.page.locator(this.checkbox2).isChecked();
  }

  /**
   * Check all checkboxes
   */
  async checkAll(): Promise<void> {
    const checkboxes = this.getCheckboxes();
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }
  }

  /**
   * Uncheck all checkboxes
   */
  async uncheckAll(): Promise<void> {
    const checkboxes = this.getCheckboxes();
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).uncheck();
    }
  }
}
