import { Page } from '@playwright/test';

export const loginPageLocators = {
  usernameInput: '#user-name',
  passwordInput: '#password',
  loginButton: '#login-button',
  errorMessage: '[data-test="error"]',
};

export const inventoryPageLocators = {
  productFilter: '[data-test="product-sort-container"]',
  productNames: '.inventory_item_name',

  addToCartButton: (page: Page, productName: string) =>
    page
      .locator('.inventory_item', { hasText: productName })
      .getByRole('button', { name: 'Add to cart' }),

  removeFromCartButton: (page: Page, productName: string) =>
    page
      .locator('.inventory_item', { hasText: productName })
      .getByRole('button', { name: 'Remove' }),

  shoppingCartBadge: '.shopping_cart_badge',
};
