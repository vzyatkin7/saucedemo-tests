import { request } from '@playwright/test';

export async function createApiClient() {
  return await request.newContext({
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
