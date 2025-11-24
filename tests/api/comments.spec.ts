import { test, expect } from '@playwright/test';
import { apiGet, apiPost, validateStatus, getJsonResponse, validateSchema } from '../../src/utils/apiHelpers';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Comments API Tests', () => {
  
  test('@smoke Should get all comments', async ({ request }) => {
    const response = await apiGet(request, `${API_BASE_URL}/comments`);
    validateStatus(response, 200);
    
    const comments = await getJsonResponse(response);
    expect(Array.isArray(comments)).toBe(true);
    expect(comments.length).toBeGreaterThan(0);
    
    if (comments.length > 0) {
      validateSchema(comments[0], ['id', 'postId', 'name', 'email', 'body']);
    }
  });

  test('@smoke Should get comment by id', async ({ request }) => {
    const commentId = 1;
    const response = await apiGet(request, `${API_BASE_URL}/comments/${commentId}`);
    validateStatus(response, 200);
    
    const comment = await getJsonResponse(response);
    validateSchema(comment, ['id', 'postId', 'name', 'email', 'body']);
    expect(comment.id).toBe(commentId);
  });

  test('@regression Should get comments by post id', async ({ request }) => {
    const postId = 1;
    const response = await apiGet(request, `${API_BASE_URL}/comments`, {
      params: { postId: String(postId) },
    });
    validateStatus(response, 200);
    
    const comments = await getJsonResponse(response);
    expect(Array.isArray(comments)).toBe(true);
    comments.forEach((comment: any) => {
      expect(comment.postId).toBe(postId);
    });
  });

  test('@regression Should create a new comment', async ({ request }) => {
    const newComment = {
      postId: 1,
      name: 'Test Commenter',
      email: 'commenter@example.com',
      body: 'This is a test comment',
    };
    
    const response = await apiPost(request, `${API_BASE_URL}/comments`, {
      data: newComment,
    });
    validateStatus(response, 201);
    
    const createdComment = await getJsonResponse(response);
    expect(createdComment.name).toBe(newComment.name);
    expect(createdComment.email).toBe(newComment.email);
    expect(createdComment.id).toBeTruthy();
  });
});
