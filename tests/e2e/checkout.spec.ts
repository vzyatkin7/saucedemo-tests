import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/checkoutPage';

test.describe('Оформление заказа', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Оформление заказа 1 шт', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Fleece Jacket');

    const cart = new CartPage(page);
    await cart.gotoCart();
    await cart.clickToCheckout();

    const checkout = new CheckoutPage(page);
    await checkout.fillCheckoutInformation('TEST', 'TEST', '12345');
    await checkout.clickContinue();
    await checkout.clickFinish();
    await checkout.assertOrderComplete();
  });
});
