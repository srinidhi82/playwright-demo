import { test, expect } from '../../src/fixtures/testFixtures';

test.describe('Dynamic Content Tests', () => {
  
  test('@smoke Should navigate to dynamic content page', async ({ dynamicContentPage }) => {
    await dynamicContentPage.navigate();
    expect(dynamicContentPage.getCurrentUrl()).toContain('/dynamic_content');
  });

  test('@regression Should display dynamic content', async ({ dynamicContentPage }) => {
    await dynamicContentPage.navigate();
    const contentCount = await dynamicContentPage.getContentCount();
    
    expect(contentCount).toBeGreaterThan(0);
  });

  test('@regression Should get all content texts', async ({ dynamicContentPage }) => {
    await dynamicContentPage.navigate();
    const allContent = await dynamicContentPage.getAllContent();
    
    expect(allContent.length).toBeGreaterThan(0);
    allContent.forEach(content => {
      expect(content).toBeTruthy();
    });
  });

  test('@regression Should refresh and get new content', async ({ dynamicContentPage }) => {
    await dynamicContentPage.navigate();
    const initialContent = await dynamicContentPage.getAllContent();
    
    await dynamicContentPage.refresh();
    const refreshedContent = await dynamicContentPage.getAllContent();
    
    expect(refreshedContent.length).toBe(initialContent.length);
  });
});
