import { Page } from '@playwright/test';
import { inventoryPageLocators } from '../locators/locators';

export class InventoryPage {
  constructor(public page: Page) {}

  async selectSort(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.locator(inventoryPageLocators.productFilter).selectOption(option);
  }

  //получаем список продуктов для проверки сортировки
  async getProductNames(): Promise<string[]> {
    return await this.page.locator(inventoryPageLocators.productNames).allTextContents();
  }
}
