import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/')
    await expect(page).toHaveTitle('Swag Labs');

    const usernameInput = page.locator('#user-name')
    const passwordInput = page.locator('#password')
    const submitButton = page.locator('#login-button')

    await usernameInput.fill('standard_user')
    await passwordInput.fill('secret_sauce')
    await submitButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html')
});

// UI
test('logo aparece corretamente na navbar', async ({ page }) => {
    const logoElement = page.locator('.app_logo')
    await expect(logoElement).toBeVisible()
})

test('aparecem 6 produtos na página', async ({ page }) => {
    const productsList = page.locator('.inventory_item')

    await expect(productsList).toHaveCount(6)
})

test('ícone do carrinho aparece corretamente', async ({ page }) => {
    const shoppingCartIcon = page.locator('.svg-inline--fa')

    await expect(shoppingCartIcon).toBeVisible()
})

test('header com texto Products aparecete corretamente', async ({ page }) => {
    const productHeaderText = page.locator('.product_label')

    await expect(productHeaderText).toBeVisible()
})

// Funcionais
test('Clicar no botão Add to cart muda o botão para Remove', async ({ page }) => {
    const addButton = page.locator('button:has-text("Add to cart")').first()

    await addButton.click()

    const removeButton = page.locator('button:has-text("Remove")').first()
    await expect(removeButton).toBeVisible()
})

test('Adiciona um produto no carrinho e o numero no carrinho aumenta', async ({ page }) => {
    const shoppingCart = page.locator('.shopping_cart_badge')
    await expect(shoppingCart).toHaveCount(0)

    await page.locator('button:has-text("Add to cart")').first().click()

    await expect(shoppingCart).toHaveText('1')
});

test('Remover um produto diminui o número do carrinho', async ({ page }) => {

    await page.locator('button:has-text("Add to cart")').first().click()
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1')

    await page.locator('button:has-text("Remove")').first().click()

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0)
});

test('Verifica se o filtro de A to Z está ordenando corretamente', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('az')
    const productNames = await page.locator('.inventory_item_name').allTextContents()

    const sortedNames = [...productNames];
    sortedNames.sort((a, b) => a.localeCompare(b))

    await expect(productNames).toEqual(sortedNames)
})

test('Verifica se o filtro de Z to A está ordenando corretamente', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('za')
    const productNames = await page.locator('.inventory_item_name').allTextContents()

    const sortedNames = [...productNames];
    sortedNames.sort((a, b) => b.localeCompare(a)) // Z para A

    await expect(productNames).toEqual(sortedNames)
})

test('Verifica se o filtro de Price (low to high) está ordenando corretamente', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('lohi')
    const priceList = await page.locator('.inventory_item_price').allTextContents()

    const prices = priceList.map(price => parseFloat(price.replace('$', '')))

    const sortedPrices = [...prices].sort((a, b) => a - b);

    await expect(prices).toEqual(sortedPrices)
})

test('Verifica se o filtro de Price (high to low) está ordenando corretamente', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('hilo')
    const priceList = await page.locator('.inventory_item_price').allTextContents()

    const prices = priceList.map(price => parseFloat(price.replace('$', '')))

    const sortedPrices = [...prices].sort((a, b) => b - a);

    await expect(prices).toEqual(sortedPrices)
})


