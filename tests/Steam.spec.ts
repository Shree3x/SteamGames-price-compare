import test, { expect, BrowserContext, Page } from '@playwright/test'
import { LoginPage } from '../src/PageObjects/LoginPage'
import { getUserData } from '../src/fixtures/dataFixture'

test.describe.serial('Steam Test Suite', () => {

    let context: BrowserContext
    let page: Page
    let userData = getUserData()

    test.beforeAll(async ({ browser }) => {

        context = await browser.newContext()
        page = await context.newPage()
        await page.goto('https://store.steampowered.com/')
    });

    test.afterAll(async () => {
        await context.close()
    })

    test('Launch URL and Verify Page Title', async () => {

        const title = await page.title()

        console.log('Title is ->', title)

        await expect(page).toHaveTitle(/Steam/)
    })

    test('Login to Steam', async () => {

        const loginPage = new LoginPage(page)

        await loginPage.login(userData.username,userData.password)
    })

})