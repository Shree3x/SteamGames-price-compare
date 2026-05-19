import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class GameDetailViewPage extends BasePage {
  constructor(page: Page) {
    super(page)

  }

get gameTitle() : Locator {
    return this.page.locator(
        "#appHubAppName"
    )
}

get gameVersionTitle() : Locator {
    return this.page.locator(
        ".game_area_purchase_game .title"
    )
}

//OG gives you addion of discounted percentage as well as gameID
// async getAllVersionsWithPrices() : Promise<{ versionName:string; gameId:string|null; regular:number|null; discounted:number|null; discountPercentage:string|null; }[]>{

//   const versionNames = (await this.gameVersionTitle.allTextContents()).map(name => this.cleanText(name))
//   const result = []

//   for (let i = 0; i < versionNames.length; i++) {

//     const versionBlock = this.gameVersionTitle.nth(i).locator('..') //calling parent container of title + prices
//     const regularLocator = versionBlock.locator(".game_purchase_price");
//     const regular = (await regularLocator.count() > 0) ? this.parsePrice(await regularLocator.innerText()) : null
//     const discountLocator = versionBlock.locator(".discount_final_price");
//     const discounted = (await discountLocator.count() > 0) ? this.parsePrice(await discountLocator.innerText()) : null
//     const discountPercentageLocator = versionBlock.locator(".discount_pct")
//     const discountPercentage = (await discountPercentageLocator.count() > 0) ? this.cleanText(await discountPercentageLocator.innerText()) : null

//     const gameId = (await versionBlock.locator(".btn_green_steamui").getAttribute("href"))?.match(/\((\d+)\)/)?.[1] ?? null;
    
//     result.push({
//       versionName: versionNames[i],
//       gameId,
//       regular,
//       discounted,
//       discountPercentage
//     })
//   }
//   return result
// }


async getAllVersionsWithPrices() : Promise<{ versionName:string; /*gameId:string|null;*/ regular:number|null; discounted:number|null; }[]>{

  const versionNames = (await this.gameVersionTitle.allTextContents()).map(name => this.cleanText(name))
  const result = []

  for (let i = 0; i < versionNames.length; i++) {

    const versionBlock = this.gameVersionTitle.nth(i).locator('..') //calling parent container of title + prices
    const regularLocator = versionBlock.locator(".game_purchase_price")
    const regular = (await regularLocator.count() > 0) ? this.parsePrice(await regularLocator.innerText()) : null
    const discountLocator = versionBlock.locator(".discount_final_price")
    const discounted = (await discountLocator.count() > 0) ? this.parsePrice(await discountLocator.innerText()) : null

    // const gameId = (await versionBlock.locator(".btn_green_steamui").getAttribute("href"))?.match(/\((\d+)\)/)?.[1] ?? null;
    
    result.push({
      versionName: versionNames[i],
      // gameId,
      regular,
      discounted,
    })
  }
  return result
}
}

