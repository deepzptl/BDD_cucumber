import { createBdd, test as bddTest } from 'playwright-bdd';
import * as dotenv from 'dotenv';
import { HomePage } from '../pages/common/HomePage';
import { LoginPage } from '../pages/common/LoginPage';
import { FlightSearchPage } from '../pages/flights/FlightSearchPage';
import { FlightListingPage } from '../pages/flights/FlightListingPage';
import { FlightTripSummaryPage } from '../pages/flights/FlightTripSummaryPage';
import { FlightSeatMapPage } from '../pages/flights/FlightSeatMapPage';
import { FlightTravellerInfoPage } from '../pages/flights/FlightTravellerInfoPage';
import { HotelSearchPage } from '../pages/hotels/HotelSearchPage';
import { HotelListingPage } from '../pages/hotels/HotelListingPage';
import { Page } from '@playwright/test';

dotenv.config();

const sharedPages: Record<string, Page> = {};

export const test = bddTest.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  flightSearchPage: FlightSearchPage;
  flightListingPage: FlightListingPage;
  flightTripSummaryPage: FlightTripSummaryPage;
  flightSeatMapPage: FlightSeatMapPage;
  flightTravellerInfoPage: FlightTravellerInfoPage;
  hotelSearchPage: HotelSearchPage;
  hotelListingPage: HotelListingPage;
}>({
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  flightSearchPage: async ({ page }, use) => { await use(new FlightSearchPage(page)); },
  flightListingPage: async ({ page }, use) => { await use(new FlightListingPage(page)); },
  flightTripSummaryPage: async ({ page }, use) => { await use(new FlightTripSummaryPage(page)); },
  flightSeatMapPage: async ({ page }, use) => { await use(new FlightSeatMapPage(page)); },
  flightTravellerInfoPage: async ({ page }, use) => { await use(new FlightTravellerInfoPage(page)); },
  hotelSearchPage: async ({ page }, use) => { await use(new HotelSearchPage(page)); },
  hotelListingPage: async ({ page }, use) => { await use(new HotelListingPage(page)); },
});

const { Given, When, Then } = createBdd(test);

export function setSharedPage(key: string, page: Page) {
  sharedPages[key] = page;
}

export function getSharedPage(key: string): Page | undefined {
  return sharedPages[key];
}

Given('I am logged into the application', async ({ loginPage }) => {
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await loginPage.saveCurrentState('login-state.json');
});

Given('I navigate to the flight search page', async ({ homePage }) => {
  await homePage.navigateToFlights();
});

Given('I navigate to the hotel search page', async ({ homePage }) => {
  await homePage.navigateToHotels();
});

Given('I open the saved trips page', async ({ homePage }) => {
  const savedTripsTab = await homePage.openSavedTrips();
  setSharedPage('savedTripsTab', savedTripsTab);
});

export { Given, When, Then };
