import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  get searchBox(): Locator {
    return this.page.getByRole(
      "combobox" ,{name: "Search the store"}
    )
  }

  get searchButton() : Locator {
    return this.page.getByLabel(
      "Search", {exact : true}
    )
  }

    get advanceSearchButton() : Locator {
    return this.page.getByRole(
      'link', { name: 'Advanced Search' }
    )
  }

  getGameFromSearchSuggestions(gameName: string) {
      return this.page.getByRole('link', { name: new RegExp(gameName, 'i') });
  }

  // getGameFromSearchSuggestions(gameName:string){
  //   return this.page.locator
  //     ('#searchSuggestions_«r0»', { hasText: new RegExp(gameName, 'i') })
  // }

  async searchForGame(name:string){
    await this.searchBox.fill(name)
  }

  async clickSearchButton(): Promise<void>{
    await this.searchButton.click()
  }
    
  async clickGameFromSearchSuggestions(name: string): Promise<void> {
    await this.advanceSearchButton.waitFor({state: 'visible'})
    await this.getGameFromSearchSuggestions(name).first().click()
  }

}