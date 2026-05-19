import { createBrowser } from "../fixtures/browserFixture"
import { getUserData } from "../fixtures/dataFixture"
import { createPageObjects } from "../fixtures/pageObejctFixute"
import {saveJson} from "../utils/fileUtils"
import games from "../testData/input_games.json"
import dotenv from 'dotenv';
dotenv.config();


(async function runSteamAutomationTool() {
    
    const { browser, page } = await createBrowser() // headless = default is true

    const { loginPage, homePage, ageCheckPage, gameDetailViewPage } = createPageObjects(page)

    //loading userInput.json
    // const userData = getUserData()
    //used for GithubActions
    const username = process.env.MY_USERNAME ??""
    const password = process.env.MY_PASSWORD ??""

    await page.goto('https://store.steampowered.com/')
    await loginPage.signInButton.waitFor({state:"visible", timeout:5000 })
    await loginPage.login(username, password)
    await page.getByRole('button', { name: username }).waitFor();


    const allGamesWithPrices: Record<string, any[]> = {}; // flat object

    for (const game of games) {
        await homePage.searchForGame(game.title)
        await homePage.clickGameFromSearchSuggestions(game.title)

        try {
            await page.locator('select[name="ageDay"]').waitFor({ state: 'visible', timeout: 3000 })
            await ageCheckPage.bypass()
            await ageCheckPage.clickViewPage()
        } catch (error) {
            console.log("Age check gate did not appear, skipping.")
        }

        //await page.waitForLoadState('networkidle') //can be used but below is the better one

        //attached is only used for scraping the element if you want to click then visible should be used
        await gameDetailViewPage.gameVersionTitle.first().waitFor({ state: 'attached', timeout: 5000 })
        const versionWithPrices = await gameDetailViewPage.getAllVersionsWithPrices()
        allGamesWithPrices[game.title] = versionWithPrices
    }
    
    console.log(JSON.stringify(allGamesWithPrices, null, 2))

    saveJson('./games_current_price.json', allGamesWithPrices)
    console.log('Game pricing saved successfully!')

    console.log('Script completed successfully')
    await browser.close()
})()
