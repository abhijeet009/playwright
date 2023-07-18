import { Page, expect, Locator, Selectors } from '@playwright/test';
import { Console } from 'console';

const waitForElement = 12000
export class Utils {
 
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async forceClick(locator: Locator): Promise<void> {
    await locator.click({ force: true })
  }
  async clickElement(locator: Locator): Promise<void> {
    await locator.click()
  }
  async waitForElementAttached(locator: Locator): Promise<void> {
    await locator.waitFor({
      state:"attached"
    });
  }

  async verifyElementIsDisplayed(locator: Locator) {
    await locator.isVisible();
  }

  async enterElementText(locator: Locator, text: any) {
    await locator.fill(text)
  }
  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async pressKeyBoardKey(key : any){
    await this.page.keyboard.press(key)
  }
  async isElementEnabled(locator: Locator): Promise<void>{
    await expect(locator.isEnabled());
  }
}