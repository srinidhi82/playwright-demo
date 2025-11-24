import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * File Upload Page Object Model
 */
export class FileUploadPage extends BasePage {
  private readonly fileInput = '#file-upload';
  private readonly uploadButton = '#file-submit';
  private readonly uploadedFiles = '#uploaded-files';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/upload');
  }

  /**
   * Upload a file
   */
  async uploadFile(filePath: string): Promise<void> {
    await this.page.setInputFiles(this.fileInput, filePath);
    await this.click(this.uploadButton);
  }

  /**
   * Get uploaded file name
   */
  async getUploadedFileName(): Promise<string | null> {
    await this.waitForElement(this.uploadedFiles);
    return await this.getText(this.uploadedFiles);
  }

  /**
   * Check if upload was successful
   */
  async isUploadSuccessful(): Promise<boolean> {
    try {
      await this.waitForElement(this.uploadedFiles, 5000);
      const fileName = await this.getUploadedFileName();
      return fileName !== null && fileName.trim().length > 0;
    } catch {
      return false;
    }
  }
}
