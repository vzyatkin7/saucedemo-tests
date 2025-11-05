import { BaseApi } from './base.api';

// Класс для работы с API пользователей, наследуется от BaseApi
export class UserApi extends BaseApi {
  async getUsers() {
    return this.get('users');
  }

  // Создание нового пользователя
  async createUser(data: object) {
    return this.post('users', data);
  }

  // Обновление данных пользователя по ID
  async updateUser(id: number, data: object) {
    return this.patch(`users/${id}`, data);
  }

  // Удаление пользователя по ID
  async deleteUser(id: number) {
    return this.delete(`users/${id}`);
  }
}
