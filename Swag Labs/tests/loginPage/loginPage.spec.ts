import { test, expect, Page} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await expect(page).toHaveTitle('Swag Labs');
});

const locators = {
    username: '#user-name',
    password: '#password',
    submit: '#login-button',
    errorButton: '.error-button',
    logo: '.login_logo'
}

async function login(page: Page, username: string, password: string) {
  await page.locator(locators.username).fill(username);
  await page.locator(locators.password).fill(password);
  await page.locator(locators.submit).click();
}

test.describe('Login', () => {
    test('logo aparece corretamente', async ({ page }) => {
        const logoElement = page.locator(locators.logo)
        await expect(logoElement).toBeVisible()
    })
    
    test('com sucesso', async ({ page }) => {

        await login(page, 'standard_user', 'secret_sauce')
        
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })
    
    test('sem sucesso', async ({ page }) => {

        await login(page, 'standard_user', 'secret')
    
        const errorButton = page.locator(locators.errorButton)
        await expect(errorButton).toBeVisible()
    
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
    })
    
    test('sem preencher campo de senha', async ({ page }) => {

        await login(page, 'standard_user', '')
        
        const errorButton = page.locator(locators.errorButton)
        await expect(errorButton).toBeVisible()
    
        await expect(page.getByText('Epic sadface: Password is required')).toBeVisible()
    })
    
    test('sem preencher campo de username', async ({ page }) => {
        
        await login(page, '', 'secret_sauce')

        const errorButton = page.locator(locators.errorButton)
        await expect(errorButton).toBeVisible()
    
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible()
    })
})