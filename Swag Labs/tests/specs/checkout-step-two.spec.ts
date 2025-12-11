import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CheckoutStepOne } from '../pages/checkoutStepOnePage';
import { CheckOutStepTwoPage } from '../pages/checkoutStepTwoPage';
import { ProductPage } from '../pages/productsPage';

test.describe('Checkout Step Two', () => {
    let loginPage: LoginPage
    let checkoutStepOnePage: CheckoutStepOne
    let checkoutStepTwoPage: CheckOutStepTwoPage
    let productPage: ProductPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        checkoutStepOnePage = new CheckoutStepOne(page)
        checkoutStepTwoPage = new CheckOutStepTwoPage(page)
        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce')
        await productPage.addFirstProductToCart()
        await checkoutStepOnePage.assertOnCheckoutStepOne()
        await checkoutStepOnePage.fillCheckoutInputs('First Name', 'Last Name', '123')
        await checkoutStepOnePage.continueBtn.click()
        await checkoutStepOnePage.assertClickContinueBtnRedirectsToStepTwoPage('https://www.saucedemo.com/checkout-step-two.html')
    })

    test('Validar se botão Cancel está funcionando corretamente', async ({}) => {
        await checkoutStepTwoPage.assertCancelButtonWorks()
    })

    test('Validar se botão Finish está funcionando corretamente', async ({}) => {
        await checkoutStepTwoPage.assertFinishButtonWorks()
    })

    test('Verificar se está exibindo o produto selecionado', async ({}) => {
        const productName = 'Sauce Labs Backpack';
        await checkoutStepTwoPage.assertProductInCart(productName);
    })

    test('Verificar a quantidade de um produto', async ({}) => {
        const expectedQuantity = '1';
        await checkoutStepTwoPage.assertProductQuantity(expectedQuantity);
    })
})
