import { test, expect } from '@playwright/test';
import { createApiClient } from '../../utils/api-client';
import { UserApi } from '../../api/user.api';

test('PATCH /users/:id — обновить данные пользователя', async () => {
  const api = await createApiClient();
  const userApi = new UserApi(api);

  // Сначала создаем пользователя, чтобы было кого обновлять
  const uniqueEmail = `updateuser_${Date.now()}@example.com`;
  const createResponse = await userApi.createUser({
    // api.post('users', {
    //   data: {
    //     name: 'Old Name',
    //     gender: 'male',
    //     email: uniqueEmail,
    //     status: 'active',
    //   },
    name: 'Old Name',
    gender: 'male',
    email: uniqueEmail,
    status: 'active',
  });

  expect(createResponse.status()).toBe(201);
  const createdUser = await createResponse.json();
  console.log(' Created user:', createdUser);

  // Обновляем часть данных через PATCH
  const updatedData = { name: 'Updated Name', status: 'inactive' };
  const updateResponse = await userApi.updateUser(createdUser.id, updatedData);

  console.log('PATCH URL:', updateResponse.url());
  console.log('PATCH Status:', updateResponse.status());
  console.log('PATCH Body Snippet:', (await updateResponse.text()).slice(0, 200));

  expect(updateResponse.status()).toBe(200);

  const updatedUser = await updateResponse.json();

  // Проверяем, что изменения применились
  expect(updatedUser).toMatchObject({
    id: createdUser.id,
    name: updatedData.name,
    status: updatedData.status,
  });

  // Удаляем созданного пользователя
  const userId = createdUser.id;
  const deleteResponse = await userApi.deleteUser(userId);
  // api.delete(`users/${userId}`);

  expect(deleteResponse.status()).toBe(204);
  console.log(` Deleted user with ID: ${userId}`);
});
