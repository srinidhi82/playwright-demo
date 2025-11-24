import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Form Authentication Page Object Model
 * (The Internet - Form Authentication)
 */
export class FormAuthenticationPage extends BasePage {
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = 'button[type="submit"]';
  private readonly flashMessage = '#flash';
  private readonly logoutButton = '.button.secondary';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/login');
  }

  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  async clickLogin(): Promise<void> {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getFlashMessage(): Promise<string | null> {
    await this.waitForElement(this.flashMessage);
    return await this.getText(this.flashMessage);
  }

  async clickLogout(): Promise<void> {
    await this.click(this.logoutButton);
  }

  async isLoggedIn(): Promise<boolean> {
    const message = await this.getFlashMessage();
    return message?.includes('You logged into') || false;
  }
}
