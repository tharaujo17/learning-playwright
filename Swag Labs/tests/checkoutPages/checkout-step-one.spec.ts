import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/')
    await expect(page).toHaveTitle('Swag Labs');

    const usernameInput = page.locator('#user-name')
    const passwordInput = page.locator('#password')
    const submitButton = page.locator('#login-button')
    const cartIcon = page.locator('.fa-shopping-cart')
    const checkoutButton = page.locator('.checkout_button')

    await usernameInput.fill('standard_user')
    await passwordInput.fill('secret_sauce')
    await submitButton.click()

    await cartIcon.click()
    await checkoutButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-step-one.html')
});

test('Preenche todos os dados e clica no botão Continue', async ({page}) => {
    const firstNameInput = page.locator('#first-name')
    const lastNameInput = page.locator('#last-name')
    const postalCodeInput = page.locator('#postal-code')
    const continueButton = page.getByRole('button', { name: 'CONTINUE'} )

    await firstNameInput.fill('Name')
    await lastNameInput.fill('Last Name')
    await postalCodeInput.fill('123')

    await continueButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-step-two.html')
})

test('Não preenche nenhum campo', async ({page}) => {
    const continueButton = page.getByRole('button', { name: 'CONTINUE'} )

    await continueButton.click()

    await expect(page.locator('.error-button')).toBeVisible()

    await expect(page.getByText('Error: First Name is required')).toBeVisible()
})

test('Preenche First Name mas não preenche os outros campos', async ({page}) => {
    const firstNameInput = page.locator('#first-name')
    const continueButton = page.getByRole('button', { name: 'CONTINUE'} )

    await firstNameInput.fill('Name')

    await continueButton.click()

    await expect(page.locator('.error-button')).toBeVisible()

    await expect(page.getByText('Error: Last Name is required')).toBeVisible()
})

test('Preenche Last Name mas não preenche os outros campos', async ({page}) => {
    const lastNameInput = page.locator('#last-name')
    const continueButton = page.getByRole('button', { name: 'CONTINUE'} )

    await lastNameInput.fill('Last Name')

    await continueButton.click()

    await expect(page.locator('.error-button')).toBeVisible()

    await expect(page.getByText('Error: First Name is required')).toBeVisible()
})

test('Preenche Postal Code mas não preenche os outros campos', async ({page}) => {
    const postalCodeInput = page.locator('#postal-code')
    const continueButton = page.getByRole('button', { name: 'CONTINUE'} )

    await postalCodeInput.fill('123')

    await continueButton.click()

    await expect(page.locator('.error-button')).toBeVisible()

    await expect(page.getByText('Error: First Name is required')).toBeVisible()
})

test('Preenche First Name e Last Name mas não preenche o campo de Postal Code', async ({page}) => {
    const firstNameInput = page.locator('#first-name')
    const lastNameInput = page.locator('#last-name')
    const continueButton = page.getByRole('button', { name: 'CONTINUE'} )

    await firstNameInput.fill('Name')
    await lastNameInput.fill('Last Name')

    await continueButton.click()

    await expect(page.locator('.error-button')).toBeVisible()

    await expect(page.getByText('Error: Postal Code is required')).toBeVisible()
})

test('Ao clicar no botão Cancel é enviado para a página do Carrinho', async ({page}) => {
    const cancelButton = page.getByRole('link', { name: 'CANCEL' } )

    await cancelButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/cart.html')
})