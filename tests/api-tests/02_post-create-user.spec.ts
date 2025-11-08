import { test, expect } from '@playwright/test';
import { createApiClient } from '../../utils/api-client';
import { stat } from 'fs';
import { UserApi } from '../../api/user.api';

// генерация уникальных email
function generateUniqueEmail() {
  const timestamp = Date.now();
  return `qa_user_${timestamp}@example.com`;
}

test('POST /users — создать нового пользователя', async () => {
  const api = await createApiClient();
  const userApi = new UserApi(api);

  // Данные нового пользователя
  const newUser = {
    name: 'QA User',
    gender: 'male',
    email: generateUniqueEmail(),
    status: 'active',
  };
  // Отправляем POST запрос на создание пользователя
  const response = await userApi.createUser(newUser);

  console.log('Request URL:', response.url());
  console.log('Response Status:', response.status());
  console.log('Response Body:', await response.text());

  // Проверяем, что статус ответа 201 Created
  expect(response.status()).toBe(201);

  // проверяем, что в ответе содержатся данные созданного пользователя
  const createdUser = await response.json();
  // сравниваем поля, кроме id
  expect(createdUser).toMatchObject({
    name: newUser.name,
    gender: newUser.gender,
    email: newUser.email,
    status: newUser.status,
  });

  // удаляем созданного пользователя
  const userId = createdUser.id;
  const deleteResponse = await userApi.deleteUser(userId);
  expect(deleteResponse.status()).toBe(204);
});
