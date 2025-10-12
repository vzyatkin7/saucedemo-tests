import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Логин на SauceDemo', () => {
  test('Позитивный сценарий', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.assertLoginSuccess();
  });

  test('Негативный сценарий — неверный пароль', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.assertLoginError(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  // test('неверный пароль - тест упадет', async ({ page }) => {
  //   const loginPage = new LoginPage(page);

  //   await loginPage.goto();
  //   await loginPage.login('standard_user', 'wrong_password');
  //   await loginPage.assertLoginSuccess();
  // });
});
