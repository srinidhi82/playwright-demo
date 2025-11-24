import { test, expect } from '../../src/fixtures/testFixtures';
import { DragDropPage } from '../../src/pages/DragDropPage';

test.describe('Drag and Drop Tests', () => {
  
  test('@smoke Should navigate to drag and drop page', async ({ page }) => {
    const dragDropPage = new DragDropPage(page);
    await dragDropPage.navigate();
    expect(dragDropPage.getCurrentUrl()).toContain('/drag_and_drop');
  });

  test('@regression Should drag column A to column B', async ({ page }) => {
    const dragDropPage = new DragDropPage(page);
    await dragDropPage.navigate();
    
    const headerA = await dragDropPage.getColumnAHeader();
    await dragDropPage.dragAToB();
    
    const newHeaderB = await dragDropPage.getColumnBHeader();
    expect(newHeaderB).toContain(headerA || 'A');
  });

  test('@regression Should drag column B to column A', async ({ page }) => {
    const dragDropPage = new DragDropPage(page);
    await dragDropPage.navigate();
    
    const headerB = await dragDropPage.getColumnBHeader();
    await dragDropPage.dragBToA();
    
    const newHeaderA = await dragDropPage.getColumnAHeader();
    expect(newHeaderA).toContain(headerB || 'B');
  });
});
