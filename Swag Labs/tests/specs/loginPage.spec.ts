import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)

        await loginPage.goto()
    });

    test('logo aparece corretamente', async ({ page }) => {

        const logoElement = page.locator('.login_logo')
        await expect(logoElement).toBeVisible()
    })

    test('com sucesso', async ({ page }) => {

        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('sem sucesso', async () => {

        await loginPage.login('standard_user', 'secret')

        await loginPage.assertLoginError()
    })

    test('sem preencher campo de senha', async () => {

        await loginPage.login('standard_user', '')

        await loginPage.assertLoginError()
    })

    test('sem preencher campo de username', async () => {

        await loginPage.login('', 'secret_sauce')

        await loginPage.assertLoginError()

    })
})