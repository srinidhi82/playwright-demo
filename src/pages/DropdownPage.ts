import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Dropdown Page Object Model
 */
export class DropdownPage extends BasePage {
  private readonly dropdown = '#dropdown';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/dropdown');
  }

  /**
   * Select option by value
   */
  async selectOption(value: string): Promise<void> {
    await this.page.locator(this.dropdown).selectOption(value);
  }

  /**
   * Select option by label
   */
  async selectOptionByLabel(label: string): Promise<void> {
    await this.page.locator(this.dropdown).selectOption({ label });
  }

  /**
   * Get selected option value
   */
  async getSelectedValue(): Promise<string | null> {
    return await this.page.locator(this.dropdown).inputValue();
  }

  /**
   * Get selected option text
   */
  async getSelectedText(): Promise<string | null> {
    const select = this.page.locator(this.dropdown);
    const value = await select.inputValue();
    const option = select.locator(`option[value="${value}"]`);
    return await option.textContent();
  }

  /**
   * Get all available options
   */
  async getAllOptions(): Promise<string[]> {
    const options = this.page.locator(`${this.dropdown} option`);
    const count = await options.count();
    const texts: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    
    return texts;
  }
}
