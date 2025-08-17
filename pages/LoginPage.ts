import { Page, expect } from '@playwright/test';
import { loginPageLocators as loc } from '../locators/loginPage.locators';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string) {
    await this.page.fill(loc.usernameInput, username);
    await this.page.fill(loc.passwordInput, password);
    await this.page.click(loc.loginButton);
  }
  async assertLoginSuccess() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  async assertLoginError(message: string) {
    await expect(this.page.locator(loc.errorMessage)).toHaveText(message);
  }
}
