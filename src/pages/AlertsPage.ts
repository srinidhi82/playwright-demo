import { Page, Dialog } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * JavaScript Alerts Page Object Model
 */
export class AlertsPage extends BasePage {
  private readonly jsAlertButton = 'button:has-text("Click for JS Alert")';
  private readonly jsConfirmButton = 'button:has-text("Click for JS Confirm")';
  private readonly jsPromptButton = 'button:has-text("Click for JS Prompt")';
  private readonly resultText = '#result';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/javascript_alerts');
  }

  /**
   * Click JS Alert button and handle dialog
   */
  async clickJsAlert(accept: boolean = true): Promise<string | null> {
    this.page.once('dialog', (dialog: Dialog) => {
      if (accept) {
        dialog.accept();
      } else {
        dialog.dismiss();
      }
    });
    
    await this.click(this.jsAlertButton);
    await this.page.waitForTimeout(500); // Wait for result
    
    return await this.getText(this.resultText);
  }

  /**
   * Click JS Confirm button and handle dialog
   */
  async clickJsConfirm(accept: boolean = true): Promise<string | null> {
    this.page.once('dialog', (dialog: Dialog) => {
      if (accept) {
        dialog.accept();
      } else {
        dialog.dismiss();
      }
    });
    
    await this.click(this.jsConfirmButton);
    await this.page.waitForTimeout(500);
    
    return await this.getText(this.resultText);
  }

  /**
   * Click JS Prompt button and handle dialog with text
   */
  async clickJsPrompt(text: string, accept: boolean = true): Promise<string | null> {
    this.page.once('dialog', (dialog: Dialog) => {
      if (accept) {
        dialog.accept(text);
      } else {
        dialog.dismiss();
      }
    });
    
    await this.click(this.jsPromptButton);
    await this.page.waitForTimeout(500);
    
    return await this.getText(this.resultText);
  }

  /**
   * Get result text
   */
  async getResult(): Promise<string | null> {
    return await this.getText(this.resultText);
  }
}
