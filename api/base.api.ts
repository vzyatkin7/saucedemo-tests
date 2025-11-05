import { request, APIRequestContext } from '@playwright/test';

// Базовый класс для API клиентов. Он создаёт контекст с общими настройками.
export class BaseApi {
  protected api: APIRequestContext;

  constructor(api: APIRequestContext) {
    this.api = api;
  }

  // Выполняет GET запрос к указанному endpoint
  async get(url: string) {
    return this.api.get(url);
  }

  // Выполняет POST запрос к указанному endpoint с переданными данными
  async post(url: string, data: object) {
    return this.api.post(url, { data });
  }

  // Выполняет PATCH запрос к указанному endpoint с переданными данными
  async patch(url: string, data: object) {
    return this.api.patch(url, { data });
  }

  // Выполняет DELETE запрос к указанному endpoint
  async delete(url: string) {
    return this.api.delete(url);
  }
}
