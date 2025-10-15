import { Page, expect } from '@playwright/test';
import { cartPageLocators } from '../locators/locators';

export class CartPage {
  constructor(public page: Page) {}

  // переход в корзину
  async gotoCart() {
    await cartPageLocators.shoppingCartBadge(this.page).click();
    await expect(this.page).toHaveURL(/.*cart.html/);
  }

  // клик по кнопке Checkout
  async clickToCheckout() {
    const checkoutButton = cartPageLocators.checkoutButton(this.page);
    await checkoutButton.click();
  }
  // клик по кнопке Continue Shopping
  async clickToContinueShopping() {
    const continueShoppingButton = cartPageLocators.continueShoppingButton(this.page);
    await continueShoppingButton.click();
  }
  // удаление товара из корзины по имени продукта
  async removeProductFromCart(productName: string) {
    const removeFromCartButton = cartPageLocators.removeFromCartButton(this.page, productName);
    await removeFromCartButton.click();
    await expect(this.page.locator(cartPageLocators.cartItems)).toHaveCount(0);
  }
}
