import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FlightListingPage extends BasePage {
  async filterAndSelect() {
    this.logStep('Waiting for flight results');
    await this.waitForDom();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});

    this.logStep('Applying the 2-stop filter');
    const twoStopFilter = this.page.locator('span', { hasText: '2 Stop' });
    await twoStopFilter.waitFor({ state: 'visible', timeout: 10000 });
    await twoStopFilter.dispatchEvent('click');
    await this.page.waitForTimeout(1000);

    const slider = this.page.locator('.rc-slider').first();
    const box = await slider.boundingBox();
    if (box) {
      this.logStep('Adjusting the price slider');
      await this.page.mouse.move(box.x + 5, box.y + box.height / 2);
      await this.page.mouse.down();
      await this.page.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2, { steps: 20 });
      await this.page.mouse.up();
      await this.page.waitForTimeout(500);
    }

    this.logStep('Filtering by Air Canada');
    const airCanadaFilter = this.page.locator('[id="Air Canada"]');
    await airCanadaFilter.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await airCanadaFilter.click({ force: true });
    await this.waitForNetwork();

    this.logStep('Sorting by earliest arrival');
    const sortButton = this.page.getByRole('button', { name: 'Sort by : Price (low to high)' });
    await sortButton.click();
    await this.page.waitForTimeout(300);
    await this.page.locator('p').filter({ hasText: 'Arrival (earliest)' }).last().click({ force: true });
    await this.page.waitForTimeout(500);

    this.logStep('Selecting the first matching flight');
    const firstFlight = this.page.locator(`div.flex > section.flex > div.flex`).first();
    await firstFlight.waitFor({ state: 'visible', timeout: 15000 });
    await firstFlight.click();
    this.logStep('Flight selected');
  }
}
