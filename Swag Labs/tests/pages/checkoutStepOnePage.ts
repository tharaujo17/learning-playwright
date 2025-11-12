import { Page, Locator, expect } from '@playwright/test';

export class CheckoutStepOne {
    readonly page: Page
    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continueBtn: Locator
    readonly cartIcon: Locator
    readonly errorBtn: Locator
    readonly cancelBtn: Locator
    readonly checkoutBtn: Locator
    readonly errorText: Locator

    constructor(page: Page) {
        this.page = page
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')
        this.continueBtn = page.getByRole('button', { name: 'CONTINUE' })
        this.cartIcon = page.locator('.shopping_cart_link')
        this.errorBtn = page.locator('[data-test="error-button"]')
        this.cancelBtn = page.locator('[data-test="cancel"]')
        this.checkoutBtn = page.locator('.checkout_button')
        this.errorText = page.locator('[data-test="error"]');
    }

    async assertOnCheckoutStepOne() {
        await this.cartIcon.click()
        await this.checkoutBtn.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    }

    async assertErrorBtnIsVisible() {
        await expect(this.errorBtn).toBeVisible()
    }

    async assertErrorText(expectedText: string) {
        await expect(this.errorText).toBeVisible();
        await expect(this.errorText).toHaveText(expectedText);
    }

    async fillCheckoutInputs(firstNameInput: string, lastNameInput: string, postalCodeInput: string) {
        await this.firstName.fill(firstNameInput)
        await this.lastName.fill(lastNameInput)
        await this.postalCode.fill(postalCodeInput)
    }

    async assertClickCancelBtnRedirectsToCartPage(url: string) {
        await expect(this.page).toHaveURL(`${url}`)
    }

    async assertClickContinueBtnRedirectsToStepTwoPage(url: string) {
        await expect(this.page).toHaveURL(`${url}`)
    }

}