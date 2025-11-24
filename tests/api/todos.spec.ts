import { test, expect } from '@playwright/test';
import { apiGet, apiPost, apiPut, apiPatch, validateStatus, getJsonResponse, validateSchema } from '../../src/utils/apiHelpers';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Todos API Tests', () => {
  
  test('@smoke Should get all todos', async ({ request }) => {
    const response = await apiGet(request, `${API_BASE_URL}/todos`);
    validateStatus(response, 200);
    
    const todos = await getJsonResponse(response);
    expect(Array.isArray(todos)).toBe(true);
    expect(todos.length).toBeGreaterThan(0);
    
    if (todos.length > 0) {
      validateSchema(todos[0], ['id', 'title', 'completed', 'userId']);
    }
  });

  test('@regression Should get todo by id', async ({ request }) => {
    const todoId = 1;
    const response = await apiGet(request, `${API_BASE_URL}/todos/${todoId}`);
    validateStatus(response, 200);
    
    const todo = await getJsonResponse(response);
    validateSchema(todo, ['id', 'title', 'completed', 'userId']);
    expect(todo.id).toBe(todoId);
  });

  test('@regression Should get todos by user id', async ({ request }) => {
    const userId = 1;
    const response = await apiGet(request, `${API_BASE_URL}/todos`, {
      params: { userId: String(userId) },
    });
    validateStatus(response, 200);
    
    const todos = await getJsonResponse(response);
    expect(Array.isArray(todos)).toBe(true);
    todos.forEach((todo: any) => {
      expect(todo.userId).toBe(userId);
    });
  });

  test('@regression Should create a new todo', async ({ request }) => {
    const newTodo = {
      title: 'Test Todo',
      completed: false,
      userId: 1,
    };
    
    const response = await apiPost(request, `${API_BASE_URL}/todos`, {
      data: newTodo,
    });
    validateStatus(response, 201);
    
    const createdTodo = await getJsonResponse(response);
    expect(createdTodo.title).toBe(newTodo.title);
    expect(createdTodo.completed).toBe(newTodo.completed);
    expect(createdTodo.id).toBeTruthy();
  });

  test('@regression Should update todo completion status', async ({ request }) => {
    const todoId = 1;
    const update = {
      completed: true,
    };
    
    const response = await apiPatch(request, `${API_BASE_URL}/todos/${todoId}`, {
      data: update,
    });
    validateStatus(response, 200);
    
    const todo = await getJsonResponse(response);
    expect(todo.completed).toBe(true);
  });
});
