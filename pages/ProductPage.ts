import { Page, expect } from '@playwright/test';
import { inventoryPageLocators, productPageLocators } from '../locators/locators';

export class ProductPage {
  constructor(public page: Page) {}

  // переход на страницу продукта и добавление в корзину
  async addProductToCartOnPage(productName: string) {
    // Клик по названию нужного продукта для перехода на его страницу
    await this.page.locator(`text=${productName}`).click();
    // Клик по кнопке "Добавить в корзину" на странице продукта
    const addToCartButtonProduct = productPageLocators.addToCartButton(this.page);
    await addToCartButtonProduct.click();
  }

  // удаление товара из корзины на странице продукта
  async removeProductFromCartOnPage(productName: string) {
    // Клик по названию нужного продукта для перехода на его страницу
    await this.page.locator(`text=${productName}`).click();
    // Клик по кнопке "Удалить из корзины" на странице продукта
    const removeFromCartButtonProduct = productPageLocators.removeFromCartButton(this.page);
    await removeFromCartButtonProduct.click();
  }
}
