import { test, expect } from '../../src/fixtures/testFixtures';
import { HoversPage } from '../../src/pages/HoversPage';

test.describe('Hovers Tests', () => {
  
  test('@smoke Should navigate to hovers page', async ({ page }) => {
    const hoversPage = new HoversPage(page);
    await hoversPage.navigate();
    expect(hoversPage.getCurrentUrl()).toContain('/hovers');
  });

  test('@regression Should hover over first figure', async ({ page }) => {
    const hoversPage = new HoversPage(page);
    await hoversPage.navigate();
    await hoversPage.hoverOverFigure(0);
    
    const caption = await hoversPage.getFigureCaption(0);
    expect(caption).toBeTruthy();
    expect(caption).toContain('name: user1');
  });

  test('@regression Should hover over second figure', async ({ page }) => {
    const hoversPage = new HoversPage(page);
    await hoversPage.navigate();
    await hoversPage.hoverOverFigure(1);
    
    const caption = await hoversPage.getFigureCaption(1);
    expect(caption).toBeTruthy();
    expect(caption).toContain('name: user2');
  });

  test('@regression Should get figure count', async ({ page }) => {
    const hoversPage = new HoversPage(page);
    await hoversPage.navigate();
    const count = await hoversPage.getFigureCount();
    
    expect(count).toBeGreaterThan(0);
  });
});
