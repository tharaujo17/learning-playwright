import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CheckoutStepOne } from '../pages/checkoutStepOnePage';

test.describe('Checkout Step One', () => {
    let loginPage: LoginPage
    let checkoutStepOnePage: CheckoutStepOne

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        checkoutStepOnePage = new CheckoutStepOne(page)
        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce')
        await checkoutStepOnePage.assertOnCheckoutStepOne()
    })

    test('Preenche todos os dados e clica no botão Continue', async () => {
        await checkoutStepOnePage.fillCheckoutInputs('First Name', 'Last Name', '123')
        await checkoutStepOnePage.continueBtn.click()
        await checkoutStepOnePage.assertClickContinueBtnRedirectsToStepTwoPage('https://www.saucedemo.com/checkout-step-two.html')
    })
    
    test('Não preenche nenhum campo', async () => {
        await checkoutStepOnePage.continueBtn.click()
        await checkoutStepOnePage.fillCheckoutInputs('', '', '')
        await checkoutStepOnePage.assertErrorBtnIsVisible()
        await checkoutStepOnePage.assertErrorText('Error: First Name is required')
    })
    
    test('Preenche First Name mas não preenche os outros campos', async () => {
        await checkoutStepOnePage.fillCheckoutInputs('Name', '', '')
        await checkoutStepOnePage.continueBtn.click()
        await checkoutStepOnePage.assertErrorBtnIsVisible()
        await checkoutStepOnePage.assertErrorText('Error: Last Name is required')
    })
    
    test('Preenche Last Name mas não preenche os outros campos', async () => {
        await checkoutStepOnePage.fillCheckoutInputs('', 'Last Name', '')
        await checkoutStepOnePage.continueBtn.click()
        await checkoutStepOnePage.assertErrorBtnIsVisible() 
        await checkoutStepOnePage.assertErrorText('Error: First Name is required')
    })
    
    test('Preenche Postal Code mas não preenche os outros campos', async () => {
        await checkoutStepOnePage.fillCheckoutInputs('', '', '123')
        await checkoutStepOnePage.continueBtn.click()
        await checkoutStepOnePage.assertErrorBtnIsVisible() 
        await checkoutStepOnePage.assertErrorText('Error: First Name is required')
    })
    
    test('Preenche First Name e Last Name mas não preenche o campo de Postal Code', async () => {
        await checkoutStepOnePage.fillCheckoutInputs('First Name', 'Last Name', '')
        await checkoutStepOnePage.continueBtn.click()
        await checkoutStepOnePage.assertErrorBtnIsVisible() 
        await checkoutStepOnePage.assertErrorText('Error: Postal Code is required')
    })
    
    test('Ao clicar no botão Cancel é enviado para a página do Carrinho', async () => {
        await checkoutStepOnePage.cancelBtn.click()
        await checkoutStepOnePage.assertClickCancelBtnRedirectsToCartPage('https://www.saucedemo.com/cart.html')
    })
})
