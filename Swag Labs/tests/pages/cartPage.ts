import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page
    readonly ctnShoppingBtn: Locator
    readonly checkoutBtn: Locator
    readonly productName: Locator
    readonly firstAddBtn: Locator
    readonly cartProductName: Locator
    readonly goToCartPage: Locator

    constructor(page: Page) {
        this.page = page
        this.ctnShoppingBtn = page.locator('[data-test="continue-shopping"]')
        this.checkoutBtn = page.locator('.checkout_button')
        this.productName = page.locator('.inventory_item_name')
        this.firstAddBtn = page.locator('button:has-text("ADD TO CART")').first()
        this.cartProductName = page.locator('.inventory_item_name').first()
        this.goToCartPage = page.locator('.shopping_cart_link')
    }
    
    async assertOnCartPage() {
        this.goToCartPage.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html')
    }

    async assertContinueShoppingRedirectsToProducts() {
        this.ctnShoppingBtn.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async assertCheckoutRedirectsToCheckoutPage() {
        this.checkoutBtn.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    }

    async assertAddedItemsAppearInCart() {
        await this.ctnShoppingBtn.click()
        await this.firstAddBtn.click()
        await expect(this.cartProductName).toHaveText(await this.productName.first().innerText())
    }
}