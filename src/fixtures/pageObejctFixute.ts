import { Page } from 'playwright';
import { LoginPage } from '../PageObjects/LoginPage';
import { HomePage } from '../PageObjects/HomePage';
import { AgeCheckPage } from '../PageObjects/AgeCheckPage';
import { GameDetailViewPage } from '../PageObjects/GameDetailViewPage';



/**
 * Returns initialized page objects
 * @param page - Playwright Page instance
 * @returns loginPage, homePage, ageCheckPage, gameDetailViewPage
 */
export function createPageObjects(page: Page) {

    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const ageCheckPage = new AgeCheckPage(page)
    const gameDetailViewPage = new GameDetailViewPage(page)

    return { loginPage, homePage, ageCheckPage, gameDetailViewPage }
}