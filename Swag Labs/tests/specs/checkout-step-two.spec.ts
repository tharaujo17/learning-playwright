import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/')
    await expect(page).toHaveTitle('Swag Labs');

    const usernameInput = page.locator('#user-name')
    const passwordInput = page.locator('#password')
    const submitButton = page.locator('#login-button')
    const cartIcon = page.locator('.fa-shopping-cart')
    const checkoutButton = page.locator('.checkout_button')
    const continueButton = page.getByRole('button', { name: 'CONTINUE'} )

    await usernameInput.fill('standard_user')
    await passwordInput.fill('secret_sauce')
    await submitButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
    await page.locator('button:has-text("ADD TO CART")').first().click();

    await cartIcon.click()
    await checkoutButton.click()

    const firstNameInput = page.locator('#first-name')
    const lastNameInput = page.locator('#last-name')
    const postalCodeInput = page.locator('#postal-code')

    await firstNameInput.fill('Name')
    await lastNameInput.fill('Last Name')
    await postalCodeInput.fill('123')

    await continueButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-step-two.html')
});

test('Validar se botão Cancel está funcionando corretamente', async ({page}) => {
    const cancelButton = page.getByRole('link', { name: 'CANCEL' })

    await cancelButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html')
})

test('Validar se botão Finish está funcionando corretamente', async ({page}) => {
    const finishButton = page.getByRole('link', { name: 'FINISH' })

    await finishButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-complete.html')
})

test('Verificr se está exibibindo o produto selecionado', async ({page}) => {
    await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
})

test('Verificar a quantidade de um produto', async ({page}) => {
    const productName = 'Sauce Labs Backpack';
    const expectedQuantity = '1';
    
    const cartItem = page.locator('.cart_item', { hasText: productName });
    const quantity = await cartItem.locator('.summary_quantity').innerText();

    await expect(quantity).toBe(expectedQuantity)
})