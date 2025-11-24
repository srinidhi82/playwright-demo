import { test, expect } from '../../src/fixtures/testFixtures';

test.describe('Form Authentication Tests', () => {
  
  test('@smoke @regression Should login with valid credentials', async ({ formAuthPage }) => {
    await formAuthPage.navigate();
    await formAuthPage.login('tomsmith', 'SuperSecretPassword!');
    
    const flashMessage = await formAuthPage.getFlashMessage();
    expect(flashMessage).toContain('You logged into');
    expect(await formAuthPage.isLoggedIn()).toBe(true);
  });

  test('@regression Should show error with invalid username', async ({ formAuthPage }) => {
    await formAuthPage.navigate();
    await formAuthPage.login('invalid_user', 'SuperSecretPassword!');
    
    const flashMessage = await formAuthPage.getFlashMessage();
    expect(flashMessage).toContain('Your username is invalid');
  });

  test('@regression Should show error with invalid password', async ({ formAuthPage }) => {
    await formAuthPage.navigate();
    await formAuthPage.login('tomsmith', 'wrong_password');
    
    const flashMessage = await formAuthPage.getFlashMessage();
    expect(flashMessage).toContain('Your password is invalid');
  });

  test('@regression Should logout successfully', async ({ formAuthPage }) => {
    await formAuthPage.navigate();
    await formAuthPage.login('tomsmith', 'SuperSecretPassword!');
    await formAuthPage.clickLogout();
    
    const flashMessage = await formAuthPage.getFlashMessage();
    expect(flashMessage).toContain('You logged out');
  });

  test('@regression Should not login with empty credentials', async ({ formAuthPage }) => {
    await formAuthPage.navigate();
    await formAuthPage.clickLogin();
    
    // Should remain on login page
    expect(formAuthPage.getCurrentUrl()).toContain('/login');
  });
});
