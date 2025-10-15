import { Page, expect } from '@playwright/test';
import { cartPageLocators } from '../locators/locators';
import { checkoutPageLocators } from '../locators/locators';

export class CheckoutPage {
  constructor(public page: Page) {}

  // заполнение информации для оформления заказа
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await checkoutPageLocators.firstNameInput(this.page).fill(firstName);
    await checkoutPageLocators.lastNameInput(this.page).fill(lastName);
    await checkoutPageLocators.postalCodeInput(this.page).fill(postalCode);
  }

  // клик по кнопке Continue
  async clickContinue() {
    const continueButton = checkoutPageLocators.continueButton(this.page);
    await continueButton.click();
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  }

  // клик по кнопке Finish
  async clickFinish() {
    const finishButton = checkoutPageLocators.finishButton(this.page);
    await finishButton.click();
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
  }
  // проверка завершения оформления заказа
  async assertOrderComplete() {
    await expect(this.page.locator(checkoutPageLocators.completeHeader)).toHaveText(
      'Thank you for your order!',
    );
    await expect(checkoutPageLocators.backHomeButton(this.page)).toBeVisible();
  }
}
