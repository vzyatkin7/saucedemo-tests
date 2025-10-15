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

export const productPageLocators = {
  addToCartButton: (page: Page) => page.getByRole('button', { name: `Add to cart` }),

  removeFromCartButton: (page: Page) => page.getByRole('button', { name: `Remove` }),
};

export const cartPageLocators = {
  shoppingCartBadge: (page: Page) => page.locator('.shopping_cart_link'),
  checkoutButton: (page: Page) => page.getByRole('button', { name: 'Checkout' }),
  continueShoppingButton: (page: Page) => page.getByRole('button', { name: 'Continue Shopping' }),
  cartItems: '.cart_item',

  removeFromCartButton: (page: Page, productName: string) =>
    page.locator('.cart_item', { hasText: productName }).getByRole('button', { name: 'Remove' }),
};

export const checkoutPageLocators = {
  firstNameInput: (page: Page) => page.getByRole('textbox', { name: 'First Name' }),
  lastNameInput: (page: Page) => page.getByRole('textbox', { name: 'Last Name' }),
  postalCodeInput: (page: Page) => page.getByRole('textbox', { name: 'Zip/Postal Code' }),
  continueButton: (page: Page) => page.getByRole('button', { name: 'Continue' }),
  finishButton: (page: Page) => page.getByRole('button', { name: 'Finish' }),
  errorMessage: '.error-message-container',
  cancelButton: (page: Page) => page.getByRole('button', { name: 'Cancel' }),
  itemTotal: '.summary_subtotal_label',
  tax: '.summary_tax_label',
  total: '.summary_total_label',
  completeHeader: '.complete-header',
  completeText: '.complete-text',
  backHomeButton: (page: Page) => page.getByRole('button', { name: 'Back Home' }),
};
