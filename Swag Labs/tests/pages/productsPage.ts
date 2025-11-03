import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page
    readonly logo: Locator
    readonly productList: Locator
    readonly shoppingCartIcon: Locator
    readonly productHeaderText: Locator
    readonly firstAddButton: Locator
    readonly firstRemoveButton: Locator
    readonly cartBadge: Locator
    readonly sortSelect: Locator

    constructor(page: Page) {
        this.page = page
        this.logo = page.locator('.app_logo')
        this.productList = page.locator('.inventory_item')
        this.shoppingCartIcon = page.locator('.shopping_cart_link')
        this.productHeaderText = page.locator('.product_label')
        this.firstAddButton = page.locator('button:has-text("Add to cart")').first()
        this.firstRemoveButton = page.locator('button:has-text("Remove")').first()
        this.cartBadge = page.locator('.shopping_cart_badge')
        this.sortSelect = page.locator('.product_sort_container')
    }

    async assertOnProductsPage() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async assertLogoVisible() {
        await expect(this.logo).toBeVisible()
    }

    async assertProductsCount(value: number) {
        await expect(this.productList).toHaveCount(value)
    }

    async assertCartIconVisible() {
        await expect(this.shoppingCartIcon).toBeVisible()
    }

    async assertHeaderTextVisible() {
        await expect(this.productHeaderText).toBeVisible()
    }

    async addFirstProductToCart() {
        await this.firstAddButton.click()
    }

    async removeFirstProductFromCart() {
        await this.firstRemoveButton.click()
    }

    async assertClickAddChangesToRemove() {
        await expect(this.firstRemoveButton).toBeVisible()
    }

    async assertCartCountIs(value: number) {

        await this.firstAddButton.click()

        if (value === 0) {
            await expect(this.cartBadge).toHaveCount(0)
        } else {
            await expect(this.cartBadge).toHaveText(String(value))
        }
    }

    async selectSortOption(options: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortSelect.selectOption(options)
    }

    async getProductNames(): Promise<string[]> {
        return await this.page.locator('.inventory_item_name').allTextContents()
    }

    async getProductsPrices(): Promise<number[]> {
        const priceTexts = this.page.locator('.inventory_item_price').allTextContents()
        return (await priceTexts).map(price => parseFloat(price.replace('$', '')))
    }

    async assertSortedByName(order: 'asc' | 'desc') {
        const names = await this.getProductNames()
        const sorted = [...names].sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a))
        expect(names).toEqual(sorted)
    }

    async assertSortedByPrice(order: 'asc' | 'desc') {
        const prices = await this.getProductsPrices()
        const sorted = [...prices].sort((a, b) => order === 'asc' ? a - b : b - a)
        expect(prices).toEqual(sorted)
    }
}