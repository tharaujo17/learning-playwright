import { Page, Locator, expect } from '@playwright/test';

export class CheckOutStepTwoPage {
    readonly page: Page
    readonly cancelBtn: Locator
    readonly finishBtn: Locator
    readonly cartItem: Locator
    readonly quantityLocator: Locator

    constructor(page: Page) {
        this.page = page
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' })
        this.finishBtn = page.getByRole('button', { name: 'Finish' })
        this.cartItem = page.locator('.cart_item')
        this.quantityLocator = this.cartItem.locator('[data-test="item-quantity"]')
    }

    async assertCancelButtonWorks() {
        await this.cancelBtn.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async assertFinishButtonWorks() {
        await this.finishBtn.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
    }
    
    async assertProductInCart(productName: string) {
        await expect(this.page.locator('.cart_item', { hasText: productName })).toBeVisible();
    }

    async getFirstProductQuantity() {
        const quantity = await this.quantityLocator.innerText();
        return quantity;
    }

    async assertProductQuantity(expectedQuantity: string) {
        const actualQuantity = await this.getFirstProductQuantity();
        await expect(actualQuantity).toBe(expectedQuantity);
    }
}