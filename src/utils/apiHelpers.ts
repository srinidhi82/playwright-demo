import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * API helper utilities
 */

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: any;
}

/**
 * Perform GET request
 */
export async function apiGet(
  request: APIRequestContext,
  url: string,
  options?: ApiRequestOptions
): Promise<APIResponse> {
  return await request.get(url, {
    headers: options?.headers,
    params: options?.params,
  });
}

/**
 * Perform POST request
 */
export async function apiPost(
  request: APIRequestContext,
  url: string,
  options?: ApiRequestOptions
): Promise<APIResponse> {
  return await request.post(url, {
    headers: options?.headers,
    data: options?.data,
  });
}

/**
 * Perform PUT request
 */
export async function apiPut(
  request: APIRequestContext,
  url: string,
  options?: ApiRequestOptions
): Promise<APIResponse> {
  return await request.put(url, {
    headers: options?.headers,
    data: options?.data,
  });
}

/**
 * Perform PATCH request
 */
export async function apiPatch(
  request: APIRequestContext,
  url: string,
  options?: ApiRequestOptions
): Promise<APIResponse> {
  return await request.patch(url, {
    headers: options?.headers,
    data: options?.data,
  });
}

/**
 * Perform DELETE request
 */
export async function apiDelete(
  request: APIRequestContext,
  url: string,
  options?: ApiRequestOptions
): Promise<APIResponse> {
  return await request.delete(url, {
    headers: options?.headers,
  });
}

/**
 * Validate response status
 */
export function validateStatus(response: APIResponse, expectedStatus: number): void {
  if (response.status() !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus}, but got ${response.status()}. Response: ${response.statusText()}`
    );
  }
}

/**
 * Get response JSON
 */
export async function getJsonResponse(response: APIResponse): Promise<any> {
  return await response.json();
}

/**
 * Validate response schema (basic validation)
 */
export function validateSchema(data: any, requiredFields: string[]): void {
  const missingFields = requiredFields.filter(field => !(field in data));
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
}
