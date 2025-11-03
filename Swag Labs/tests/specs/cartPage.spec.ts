import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/')
    await expect(page).toHaveTitle('Swag Labs');

    const usernameInput = page.locator('#user-name')
    const passwordInput = page.locator('#password')
    const submitButton = page.locator('#login-button')
    const cartIcon = page.locator('.fa-shopping-cart')

    await usernameInput.fill('standard_user')
    await passwordInput.fill('secret_sauce')
    await submitButton.click()

    await cartIcon.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/cart.html')
});

test('quando clicar no botão de Continue Shopping retorna a página dos produtos', async ({ page }) => {
    const ctnShoppingBtn = page.locator('a:has-text("Continue Shopping")')

    await ctnShoppingBtn.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html')
})

test('quando clicar no botão Checkout é redirecionado para a página de Checkout', async ({ page }) => {

    const checkoutButton = page.locator('.checkout_button')

    await checkoutButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-step-one.html')
})

test('itens adicionados na página de produtos aparecem no carrinho', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/inventory.html')

    const productName = await page.locator('.inventory_item_name').first().innerText()

    await page.locator('button:has-text("ADD TO CART")').first().click()
    await page.goto('https://www.saucedemo.com/v1/cart.html')

    const cartProductName = page.locator('.inventory_item_name').first()

    await expect(cartProductName).toHaveText(productName)
})