import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  // Locators
  get signInButton(): Locator {
    return this.page.locator('a.global_action_link')
  }

  get username(): Locator {
    return this.page.locator(
      "//div[contains(text(),'Sign in')]/following-sibling::input"
    )
  }

  get password(): Locator {
    return this.page.locator(
      "//div[contains(text(),'Password')]/following-sibling::input"
    )
  }

  get submitButton(): Locator {
    return this.page.locator(
      "//button[@type='submit' and text()='Sign in']"
    )
  }

  // Actions
  async login(username: string, password: string): Promise<void> {
    await this.signInButton.click()
    await this.username.fill(username)
    await this.password.fill(password)
    await this.submitButton.click()
  }
}