import { test, expect } from '@playwright/test';
import { apiGet, apiPost, apiPut, apiDelete, validateStatus, getJsonResponse, validateSchema } from '../../src/utils/apiHelpers';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API Tests', () => {
  
  test('@smoke Should get all posts', async ({ request }) => {
    const response = await apiGet(request, `${API_BASE_URL}/posts`);
    validateStatus(response, 200);
    
    const posts = await getJsonResponse(response);
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    
    if (posts.length > 0) {
      validateSchema(posts[0], ['id', 'title', 'body', 'userId']);
    }
  });

  test('@smoke Should get post by id', async ({ request }) => {
    const postId = 1;
    const response = await apiGet(request, `${API_BASE_URL}/posts/${postId}`);
    validateStatus(response, 200);
    
    const post = await getJsonResponse(response);
    validateSchema(post, ['id', 'title', 'body', 'userId']);
    expect(post.id).toBe(postId);
  });

  test('@regression Should get posts by user id', async ({ request }) => {
    const userId = 1;
    const response = await apiGet(request, `${API_BASE_URL}/posts`, {
      params: { userId: String(userId) },
    });
    validateStatus(response, 200);
    
    const posts = await getJsonResponse(response);
    expect(Array.isArray(posts)).toBe(true);
    posts.forEach((post: any) => {
      expect(post.userId).toBe(userId);
    });
  });

  test('@regression Should create a new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1,
    };
    
    const response = await apiPost(request, `${API_BASE_URL}/posts`, {
      data: newPost,
    });
    validateStatus(response, 201);
    
    const createdPost = await getJsonResponse(response);
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.id).toBeTruthy();
  });

  test('@regression Should update post', async ({ request }) => {
    const postId = 1;
    const updatedPost = {
      id: postId,
      title: 'Updated Post Title',
      body: 'Updated post body',
      userId: 1,
    };
    
    const response = await apiPut(request, `${API_BASE_URL}/posts/${postId}`, {
      data: updatedPost,
    });
    validateStatus(response, 200);
    
    const post = await getJsonResponse(response);
    expect(post.title).toBe(updatedPost.title);
    expect(post.body).toBe(updatedPost.body);
  });

  test('@regression Should delete post', async ({ request }) => {
    const postId = 1;
    const response = await apiDelete(request, `${API_BASE_URL}/posts/${postId}`);
    validateStatus(response, 200);
  });
});
