import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HomePage extends BasePage {
  async navigateToFlights() {
    this.logStep('Navigating to flight search');
    await this.page.goto('/');
    await this.page.getByRole('button', {name: 'Toggle menu'}).click();
    await this.page.getByRole('link', { name: 'Travel' }).click();
    await this.page.locator('.flex-grow.overflow-y-auto.custom-scrollbar').locator('a[href="/flights/search"]').first().click();
    this.logStep('Flight search page opened');
  }

  async navigateToHotels() {
    this.logStep('Navigating to hotel search');
    await this.page.goto('/');
    await this.page.getByRole('button', {name: 'Toggle menu'}).click();
    await this.page.getByRole('link', { name: 'Travel' }).click();
    await this.page.locator('.flex-grow.overflow-y-auto.custom-scrollbar').locator('a[href="/hotel/search"]').first().click();
    this.logStep('Hotel search page opened');
  }

  async openSavedTrips(): Promise<Page> {
    this.logStep('Opening saved trips');
    // The login step leaves us on the home page already logged in.
    // The 'Tripplanner saved trips' link is on this page; scroll to find it.
    await this.page.waitForLoadState('networkidle');

    const tripsLink = this.page.getByRole('link', { name: 'Tripplanner saved trips' });

    // Scroll down to make the link visible if it's below the fold
    for (let i = 0; i < 10; i++) {
      if (await tripsLink.isVisible().catch(() => false)) break;
      await this.page.mouse.wheel(0, 500);
      await this.page.waitForTimeout(500);
    }

    const [savedTripsPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 15000 }),
      tripsLink.click(),
    ]);

    await savedTripsPage.waitForLoadState('domcontentloaded');
    this.logStep('Saved trips page opened in a new tab');
    return savedTripsPage;
  }
}
