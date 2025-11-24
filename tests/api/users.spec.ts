import { test, expect } from '@playwright/test';
import { apiGet, apiPost, apiPut, apiPatch, apiDelete, validateStatus, getJsonResponse, validateSchema } from '../../src/utils/apiHelpers';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Users API Tests', () => {
  
  test('@smoke Should get all users', async ({ request }) => {
    const response = await apiGet(request, `${API_BASE_URL}/users`);
    validateStatus(response, 200);
    
    const users = await getJsonResponse(response);
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    
    // Validate schema
    if (users.length > 0) {
      validateSchema(users[0], ['id', 'name', 'email', 'username']);
    }
  });

  test('@smoke Should get user by id', async ({ request }) => {
    const userId = 1;
    const response = await apiGet(request, `${API_BASE_URL}/users/${userId}`);
    validateStatus(response, 200);
    
    const user = await getJsonResponse(response);
    validateSchema(user, ['id', 'name', 'email', 'username']);
    expect(user.id).toBe(userId);
  });

  test('@regression Should create a new user', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      username: 'testuser',
      email: 'testuser@example.com',
      phone: '123-456-7890',
      website: 'test.com',
    };
    
    const response = await apiPost(request, `${API_BASE_URL}/users`, {
      data: newUser,
    });
    validateStatus(response, 201);
    
    const createdUser = await getJsonResponse(response);
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.id).toBeTruthy();
  });

  test('@regression Should update user with PUT', async ({ request }) => {
    const userId = 1;
    const updatedUser = {
      id: userId,
      name: 'Updated User',
      username: 'updateduser',
      email: 'updated@example.com',
    };
    
    const response = await apiPut(request, `${API_BASE_URL}/users/${userId}`, {
      data: updatedUser,
    });
    validateStatus(response, 200);
    
    const user = await getJsonResponse(response);
    expect(user.name).toBe(updatedUser.name);
    expect(user.email).toBe(updatedUser.email);
  });

  test('@regression Should partially update user with PATCH', async ({ request }) => {
    const userId = 1;
    const partialUpdate = {
      email: 'patched@example.com',
    };
    
    const response = await apiPatch(request, `${API_BASE_URL}/users/${userId}`, {
      data: partialUpdate,
    });
    validateStatus(response, 200);
    
    const user = await getJsonResponse(response);
    expect(user.email).toBe(partialUpdate.email);
  });

  test('@regression Should delete user', async ({ request }) => {
    const userId = 1;
    const response = await apiDelete(request, `${API_BASE_URL}/users/${userId}`);
    validateStatus(response, 200);
  });

  test('@regression Should handle invalid user id', async ({ request }) => {
    const response = await apiGet(request, `${API_BASE_URL}/users/99999`);
    expect(response.status()).toBe(404);
  });
});
