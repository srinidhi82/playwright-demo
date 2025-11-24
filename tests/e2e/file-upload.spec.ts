import { test, expect } from '../../src/fixtures/testFixtures';
import { FileUploadPage } from '../../src/pages/FileUploadPage';
import * as fs from 'fs';
import * as path from 'path';

test.describe('File Upload Tests', () => {
  
  test('@smoke Should navigate to file upload page', async ({ page }) => {
    const fileUploadPage = new FileUploadPage(page);
    await fileUploadPage.navigate();
    expect(fileUploadPage.getCurrentUrl()).toContain('/upload');
  });

  test('@regression Should upload a text file', async ({ page }) => {
    const fileUploadPage = new FileUploadPage(page);
    await fileUploadPage.navigate();
    
    // Create a temporary test file
    const testFileName = 'test-upload.txt';
    const testFilePath = path.join(__dirname, '../../test-results', testFileName);
    const testDir = path.dirname(testFilePath);
    
    // Ensure directory exists
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    
    fs.writeFileSync(testFilePath, 'This is a test file for upload');
    
    try {
      await fileUploadPage.uploadFile(testFilePath);
      const uploadedFileName = await fileUploadPage.getUploadedFileName();
      
      expect(uploadedFileName).toBe(testFileName);
      expect(await fileUploadPage.isUploadSuccessful()).toBe(true);
    } finally {
      // Cleanup
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    }
  });
});
