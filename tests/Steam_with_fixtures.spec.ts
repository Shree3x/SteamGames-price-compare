import test, { BrowserContext, Page } from "@playwright/test"
import { LoginPage } from "../src/PageObjects/LoginPage"
import { HomePage } from "../src/PageObjects/HomePage"
import { getUserData } from "../src/fixtures/dataFixture"

test.describe.serial('Steam Test Suite', () => {

    let context: BrowserContext
    let page: Page
    let loginPage: any
    let homePage: any
    let userData = getUserData() // load user data once


    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()

        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await page.goto('https://store.steampowered.com/')
        await loginPage.login(userData.username, userData.password)
        await page.getByRole('button', { name: userData.username }).waitFor()
    })

    test('Login with Fixture and Verify Your Name', async () => {
        await loginPage.clickOnWishlist()
        await page.locator('h2', { hasText: `${userData.username}'S WISHLIST` }).waitFor()
    })

    test('Search Game and Verify Results', async () => {
        await homePage.searchForGame("GTA")
        await homePage.clickSearchButton()
        await page.waitForTimeout(3000)
    })

    test.afterAll(async () => {
        await context.close()
    })
})