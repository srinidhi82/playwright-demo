import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model
 */
export class LoginPage extends BasePage {
  // Selectors
  private readonly usernameInput = '[name="username"]';
  private readonly passwordInput = '[name="password"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '.flash.error';
  private readonly successMessage = '.flash.success';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigate(): Promise<void> {
    await this.goto('/login');
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await this.click(this.loginButton);
  }

  /**
   * Login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string | null> {
    await this.waitForElement(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string | null> {
    await this.waitForElement(this.successMessage);
    return await this.getText(this.successMessage);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    try {
      await this.waitForElement(this.errorMessage, 3000);
      return true;
    } catch {
      return false;
    }
  }
}
