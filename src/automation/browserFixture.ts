import { firefox, Browser, Page, chromium } from 'playwright'

/**
 * @summary Launches a Chromium browser and creates a new page.
 * @param headless - set to false if you want to see the browser UI
 * @returns { browser, page } - reusable browser and page
 */ 
export async function createBrowser(headless = true): Promise<{ browser: Browser; page: Page }> {
    const browser = await chromium.launch({ headless })
    const page = await browser.newPage()
    return { browser, page }
}