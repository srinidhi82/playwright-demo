import { test, expect } from '../../src/fixtures/testFixtures';
import { AlertsPage } from '../../src/pages/AlertsPage';

test.describe('JavaScript Alerts Tests', () => {
  
  test('@smoke Should navigate to alerts page', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.navigate();
    expect(alertsPage.getCurrentUrl()).toContain('/javascript_alerts');
  });

  test('@regression Should handle JS Alert - accept', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.navigate();
    const result = await alertsPage.clickJsAlert(true);
    
    expect(result).toContain('You successfully clicked an alert');
  });

  test('@regression Should handle JS Confirm - accept', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.navigate();
    const result = await alertsPage.clickJsConfirm(true);
    
    expect(result).toContain('You clicked: Ok');
  });

  test('@regression Should handle JS Confirm - dismiss', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.navigate();
    const result = await alertsPage.clickJsConfirm(false);
    
    expect(result).toContain('You clicked: Cancel');
  });

  test('@regression Should handle JS Prompt - accept with text', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.navigate();
    const result = await alertsPage.clickJsPrompt('Test Input', true);
    
    expect(result).toContain('You entered: Test Input');
  });
});
