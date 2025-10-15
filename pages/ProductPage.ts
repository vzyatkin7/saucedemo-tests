import { Page, expect } from '@playwright/test';
import { cartPageLocators, inventoryPageLocators, productPageLocators } from '../locators/locators';

export class ProductPage {
  constructor(public page: Page) {}

  // переход на страницу продукта и добавление в корзину
  async addProductToCartOnPage(productName: string) {
    // Клик по названию нужного продукта для перехода на его страницу
    await this.page.locator(`text=${productName}`).click();
    // Клик по кнопке "Добавить в корзину" на странице продукта
    const addToCartButtonProduct = productPageLocators.addToCartButton(this.page);
    await addToCartButtonProduct.click();
    await expect(cartPageLocators.shoppingCartBadge(this.page)).toHaveText('1');
  }

  // удаление товара из корзины на странице продукта
  async removeProductFromCartOnPage(productName: string) {
    // Клик по названию нужного продукта для перехода на его страницу
    await this.page.locator(`text=${productName}`).click();

    // Клик по кнопке "Удалить из корзины" на странице продукта
    const removeFromCartButtonProduct = productPageLocators.removeFromCartButton(this.page);
    await removeFromCartButtonProduct.click();

    // проверка что нету бейджа 1 у значка корзины
    await expect(cartPageLocators.shoppingCartBadge(this.page)).toHaveCount(0);

    // Проверка, что кнопка изменилась обратно на "Add to cart"
    const addToCartButtonProduct = productPageLocators.addToCartButton(this.page);
    await addToCartButtonProduct.waitFor({ state: 'visible' });
  }
}
