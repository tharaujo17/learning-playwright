import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { LoginPage } from '../pages/loginPage';

test.describe('Cart Page', () => {
    let loginPage: LoginPage
    let cartPage: CartPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        cartPage = new CartPage(page)

        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce');
        await cartPage.assertOnCartPage()
    })

    test('quando clicar no botão de Continue Shopping retorna a página dos produtos', async () => {
        await cartPage.assertContinueShoppingRedirectsToProducts()
    })

    test('quando clicar no botão Checkout é redirecionado para a página de Checkout', async () => {
        await cartPage.assertCheckoutRedirectsToCheckoutPage()
    })

    test('itens adicionados na página de produtos aparecem no carrinho', async () => {
        await cartPage.assertAddedItemsAppearInCart()
    })
})
