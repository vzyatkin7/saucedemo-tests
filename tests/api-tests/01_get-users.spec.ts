import { test, expect } from '@playwright/test';
import { createApiClient } from '../../utils/api-client';

test('GET /users — получить список пользователей', async () => {
  const api = await createApiClient(); // ждём, т.к. это async функция

  const response = await api.get('users');

  console.log('Request URL:', response.url());
  console.log('Response Status:', response.status());
  console.log('Response Body Snippet:', (await response.text()).slice(0, 200));

  expect(response.status()).toBe(200);

  const users = await response.json();
  // Проверяем, что ответ — массив
  expect(Array.isArray(users)).toBeTruthy();
});
