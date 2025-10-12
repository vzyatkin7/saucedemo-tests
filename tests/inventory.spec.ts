import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { time } from 'console';

test.describe('Сортировка товаров на SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Сортировка Name A → Z', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.selectSort('az');

    const names = await inventory.getProductNames();
    console.log('Товары после сортировки A → Z:', names);

    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });

  test('Сортировка Name Z → A', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.selectSort('za');

    const names = await inventory.getProductNames();
    console.log('Товары после сортировки Z → A:', names);
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });
});

test.describe('Работа с корзиной добавление/удаление со списка', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Добавление товара Sauce Labs Bike Light в корзину со списка товаров', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Bike Light');
  });

  test('Удаление товара Sauce Labs Bike Light из корзины со списка товаров', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.removeProductFromCart('Sauce Labs Bike Light');
  });
});
