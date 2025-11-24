import { test, expect } from '@playwright/test';
import { apiGet, apiPost, validateStatus, getJsonResponse, validateSchema } from '../../src/utils/apiHelpers';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Albums API Tests', () => {
  
  test('@smoke Should get all albums', async ({ request }) => {
    const response = await apiGet(request, `${API_BASE_URL}/albums`);
    validateStatus(response, 200);
    
    const albums = await getJsonResponse(response);
    expect(Array.isArray(albums)).toBe(true);
    expect(albums.length).toBeGreaterThan(0);
    
    if (albums.length > 0) {
      validateSchema(albums[0], ['id', 'title', 'userId']);
    }
  });

  test('@regression Should get album by id', async ({ request }) => {
    const albumId = 1;
    const response = await apiGet(request, `${API_BASE_URL}/albums/${albumId}`);
    validateStatus(response, 200);
    
    const album = await getJsonResponse(response);
    validateSchema(album, ['id', 'title', 'userId']);
    expect(album.id).toBe(albumId);
  });

  test('@regression Should get albums by user id', async ({ request }) => {
    const userId = 1;
    const response = await apiGet(request, `${API_BASE_URL}/albums`, {
      params: { userId: String(userId) },
    });
    validateStatus(response, 200);
    
    const albums = await getJsonResponse(response);
    expect(Array.isArray(albums)).toBe(true);
    albums.forEach((album: any) => {
      expect(album.userId).toBe(userId);
    });
  });

  test('@regression Should create a new album', async ({ request }) => {
    const newAlbum = {
      title: 'Test Album',
      userId: 1,
    };
    
    const response = await apiPost(request, `${API_BASE_URL}/albums`, {
      data: newAlbum,
    });
    validateStatus(response, 201);
    
    const createdAlbum = await getJsonResponse(response);
    expect(createdAlbum.title).toBe(newAlbum.title);
    expect(createdAlbum.id).toBeTruthy();
  });
});
