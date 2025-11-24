import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Dynamic Content Page Object Model
 */
export class DynamicContentPage extends BasePage {
  private readonly contentDivs = '#content .row .large-10';
  private readonly pageLink = 'a[href="/dynamic_content"]';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/dynamic_content');
  }

  /**
   * Get all dynamic content texts
   */
  async getAllContent(): Promise<(string | null)[]> {
    const elements = this.page.locator(this.contentDivs);
    const count = await elements.count();
    const texts: (string | null)[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).textContent();
      texts.push(text);
    }
    
    return texts;
  }

  /**
   * Get content count
   */
  async getContentCount(): Promise<number> {
    return await this.page.locator(this.contentDivs).count();
  }

  /**
   * Refresh page to get new dynamic content
   */
  async refresh(): Promise<void> {
    await this.page.reload({ waitUntil: 'networkidle' });
  }
}
