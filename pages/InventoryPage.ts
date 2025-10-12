import { Page, expect } from '@playwright/test';
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

  // добавление товара в корзину по имени продукта
  async addProductToCart(productName: string) {
    const addToCartButton = inventoryPageLocators.addToCartButton(this.page, productName);
    await addToCartButton.click();
  }

  // проверка, что 1 товар добавлен в корзину
  async verifyProductInCart(productName: string) {
    const removeFromCartButton = inventoryPageLocators.removeFromCartButton(this.page, productName);
    await removeFromCartButton.waitFor({ state: 'visible' });
    await expect(this.page.locator(inventoryPageLocators.shoppingCartBadge)).toHaveText('1');
  }
}
