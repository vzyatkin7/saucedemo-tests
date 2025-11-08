import { test, expect } from '@playwright/test';
import { createApiClient } from '../../utils/api-client';
import { UserApi } from '../../api/user.api';

// Тест для получения списка пользователей
test('GET /users — получить список пользователей', async () => {
  const api = await createApiClient(); // Создаем API клиент
  const userApi = new UserApi(api); // Создаем экземпляр UserApi

  const response = await userApi.getUsers(); // Выполняем GET запрос к /users

  console.log('Request URL:', response.url());
  console.log('Response Status:', response.status());
  console.log('Response Body Snippet:', (await response.text()).slice(0, 200));

  expect(response.status()).toBe(200);

  const users = await response.json();
  // Проверяем, что ответ — массив
  expect(Array.isArray(users)).toBeTruthy();
});
