import { Locator, Page } from '@playwright/test';

export class BasePage {
  // Protected means child classes can access this.page
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Static locator
  get wishlist(): Locator {
    return this.page.getByRole('link', { name: 'Wishlist' })
  }

  // Dynamic locator
  menuItem(name: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(`^${name}$`, 'i') })
  }

  // Actions
  async clickOnWishlist(): Promise<void> {
    await this.wishlist.click()
  }

  async clickOnMenuItem(name: string): Promise<void> {
    await this.menuItem(name).click()
  }

  async clickOnSubMenuItem(name:string,subMenuName:string): Promise<void> {
    await this.menuItem(name).hover()
    const subMenu = this.page.getByRole('link', { name: new RegExp(`^${subMenuName}$`, 'i') })
    await subMenu.waitFor({state:'visible'})
    await subMenu.click()
  }

  















/**
 * Clean text by trimming and removing whitespace and Buy text
 */
protected cleanText(text: string): string {
  return text
    .trim()                    // remove leading/trailing spaces
    .replace(/^Buy\s*/i, '')   // remove 'Buy' at the start (case-insensitive)
    .replace(/\(\?\)/g, '')    // remove all '(?)'
    .replace(/\s+/g, ' ')      // replace multiple spaces/newlines/tabs with a single space
    .trim();                   // trim again in case removals leave extra spaces
}

/**
 * Clean text by trimming and removing whitespace and Buy text
 */
protected parsePrice(text: string | null): number | null {
  if (!text) return null;
  const match = text.match(/[\d,.]+/)
  return match ? Number(match[0].replace(/,/g, '')) : null
}

}