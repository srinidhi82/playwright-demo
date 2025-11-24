import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Hovers Page Object Model
 */
export class HoversPage extends BasePage {
  private readonly figureElements = '.figure';
  private readonly viewProfileLink = 'a[href*="users"]';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/hovers');
  }

  /**
   * Hover over figure by index (0-based)
   */
  async hoverOverFigure(index: number): Promise<void> {
    const figure = this.page.locator(this.figureElements).nth(index);
    await figure.hover();
  }

  /**
   * Get figure caption by index
   */
  async getFigureCaption(index: number): Promise<string | null> {
    const caption = this.page.locator(this.figureElements).nth(index).locator('.figcaption');
    return await caption.textContent();
  }

  /**
   * Click view profile link for figure
   */
  async clickViewProfile(index: number): Promise<void> {
    await this.hoverOverFigure(index);
    const link = this.page.locator(this.figureElements).nth(index).locator(this.viewProfileLink);
    await link.click();
  }

  /**
   * Get total number of figures
   */
  async getFigureCount(): Promise<number> {
    return await this.page.locator(this.figureElements).count();
  }
}
