import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/')
    await expect(page).toHaveTitle('Swag Labs');
});


test('logo aparece corretamente', async ({ page }) => {
    const logoElement = page.locator('.login_logo')
    await expect(logoElement).toBeVisible()
})

test('faz login com sucesso', async ({ page }) => {
    const usernameInput = page.locator('#user-name')
    const passwordInput = page.locator('#password')
    const submitButton = page.locator('#login-button')

    await usernameInput.fill('standard_user')
    await passwordInput.fill('secret_sauce')
    await submitButton.click()
    
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html')
})

test('login sem sucesso', async ({ page }) => {
    const usernameInput = page.locator('#user-name')
    const passwordInput = page.locator('#password')
    const submitButton = page.locator('#login-button')

    await usernameInput.fill('standard_user')
    await passwordInput.fill('secret')
    await submitButton.click()

    const errorButton = page.locator('.error-button')
    await expect(errorButton).toBeVisible()

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
})

test('tentativa de login sem senha', async ({ page }) => {
    const usernameInput = page.locator('#user-name')
    const passwordInput = page.locator('#password')
    const submitButton = page.locator('#login-button')

    await usernameInput.fill('standard_user')
    await passwordInput.fill('')
    await submitButton.click()

    const errorButton = page.locator('.error-button')
    await expect(errorButton).toBeVisible()

    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible()
})


test('tentativa de login sem username', async ({ page }) => {
    const usernameInput = page.locator('#user-name')
    const passwordInput = page.locator('#password')
    const submitButton = page.locator('#login-button')

    await usernameInput.fill('')
    await passwordInput.fill('123')
    await submitButton.click()

    const errorButton = page.locator('.error-button')
    await expect(errorButton).toBeVisible()

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible()
})
