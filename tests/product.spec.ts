import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Работа с корзиной добавление/удаление со страницы товара', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Добавление товара Sauce Labs Bike Light в корзину со страницы товара', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.addProductToCartOnPage('Sauce Labs Bike Light');
  });

  test('Удаление товара Sauce Labs Bike Light из корзины со страницы товара', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.addProductToCartOnPage('Sauce Labs Bike Light');
    await productPage.removeProductFromCartOnPage('Sauce Labs Bike Light');
  });
});
