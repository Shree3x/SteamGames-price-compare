import { test as base, expect } from '@playwright/test'
import { HomePage } from '../PageObjects/HomePage'
import { LoginPage } from '../PageObjects/LoginPage'



type MyFixtures = {
  loginPage: LoginPage
  homePage: HomePage
}

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  }
})

export { expect }



