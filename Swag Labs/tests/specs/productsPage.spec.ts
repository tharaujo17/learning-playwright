import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productsPage';

test.describe('Products page', () => {
    let loginPage: LoginPage
    let productPage: ProductPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce');
        productPage.assertOnProductsPage()
    });

    // UI
    test('logo aparece corretamente na navbar', async () => {
        await productPage.assertLogoIsVisible()
    })

    test('aparecem 6 produtos na página', async () => {
        await productPage.assertProductsCount(6)
    })

    test('ícone do carrinho aparece corretamente', async () => {
        await productPage.assertCartIconVisible()
    })

    test('header com texto Products aparecete corretamente', async () => {
        await productPage.assertHeaderTextVisible()
    })

    // Funcionais
    test('Clicar no botão Add to cart muda o botão para Remove', async () => {
        await productPage.firstAddButton.click()

        await productPage.assertClickAddChangesToRemove()
    })

    test('Adiciona um produto no carrinho e o numero no carrinho aumenta', async () => {
        await productPage.assertCartCountIs(1)
    });

    test('Remover um produto diminui o número do carrinho', async () => {

        productPage.firstRemoveButton.click()
        await productPage.assertCartCountIs(0)
    });

    test('Verifica se o filtro de A to Z está ordenando corretamente', async ({ page }) => {
        await productPage.selectSortOption('az')
        await productPage.getProductNames()

        await productPage.assertSortedByName('asc')
    })

    test('Verifica se o filtro de Z to A está ordenando corretamente', async ({ page }) => {
        await productPage.selectSortOption('za')
        await productPage.getProductNames()

        await productPage.assertSortedByName('desc')
    })

    test('Verifica se o filtro de Price (low to high) está ordenando corretamente', async ({ page }) => {
        await productPage.selectSortOption('lohi')
        await productPage.getProductsPrices()

        await productPage.assertSortedByPrice('asc')
    })

    test('Verifica se o filtro de Price (high to low) está ordenando corretamente', async ({ page }) => {
        await productPage.selectSortOption('hilo')
        await productPage.getProductsPrices()

        await productPage.assertSortedByPrice('desc')
    })
})



