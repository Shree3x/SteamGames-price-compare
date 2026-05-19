import { BasePage } from './BasePage';

export class AgeCheckPage extends BasePage {
    async bypass(day = 1, month = 'January', year = 1999) : Promise <void>{

        await this.page.locator('select[name="ageDay"]').selectOption(day.toString())
        await this.page.locator('select[name="ageMonth"]').selectOption(month)
        await this.page.locator('select[name="ageYear"]').selectOption(year.toString())
    }

    async clickViewPage(){
        await this.page.getByRole('button', {name:'View Page'}).click()
    }
}

