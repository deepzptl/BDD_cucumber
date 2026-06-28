import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HotelSearchPage extends BasePage {
  async search(data: any) {
    await expect(this.page).toHaveURL(/.*hotel\/search/);
    await this.page.getByRole('textbox', { name: 'What hotel you looking for?' }).fill(data.location);
    await this.page.waitForTimeout(2000);
    // Try exact match first, fallback to partial text match
    const exactMatch = this.page.locator('div').filter({ hasText: new RegExp(`^${data.locationSelect}$`) }).first();
    if (await exactMatch.isVisible({ timeout: 5000 }).catch(() => false)) {
      await exactMatch.click();
    } else {
      const partialMatch = this.page.getByText(data.locationSelect).first();
      await partialMatch.waitFor({ state: 'visible', timeout: 10000 });
      await partialMatch.click();
    }
    await this.page.waitForTimeout(1500);
    
    await this.page.getByRole('button', { name: 'showing selected date' }).click();
    const checkInDays = data.checkInDaysFromToday ?? 15;
    const stayLengthDays = data.stayLengthDays ?? 1;
    await this.selectCalendarDate(checkInDays);
    await this.selectCalendarDate(checkInDays + stayLengthDays);
    
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(1000);
    
    await this.page.getByRole('button', { name: 'Room, 1 Guest' }).click();
    await this.page.waitForTimeout(1000);
    
    await this.page.getByRole('button', { name: 'Increase adults' }).click();
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('button', { name: 'Increase children' }).click();
    await this.page.waitForTimeout(1000);
    
    await this.page.getByRole('button', { name: 'Search' }).click();
  }
}
