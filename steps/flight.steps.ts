import { createBdd } from 'playwright-bdd';
import { test, Given, When, Then } from './common.steps';
import * as dotenv from 'dotenv';

dotenv.config();

When('I search for a flight with the following details', async ({ flightSearchPage }, dataTable) => {
  const data: Record<string, string> = {};
  for (const row of dataTable.hashes()) {
    data[row.field] = row.value;
  }
  await flightSearchPage.searchFlight({
    fromSearch: data.fromSearch,
    fromSelect: data.fromSelect,
    toSearch: data.toSearch,
    toSelect: data.toSelect,
    departureDaysFromToday: parseInt(data.departureDaysFromToday) || 15,
    passenger: { firstName: 'John', middleName: 'Moris', lastName: 'Doe', dob: '2004-11-14' },
    contact: { address: '123 Main St, Anytown, USA', zip: '382531', city: 'Anytown', phone: '9512345678' }
  });
  await flightSearchPage.saveCurrentState('flight-searched-state.json');
});

When('I filter and select a flight', async ({ flightListingPage }) => {
  await flightListingPage.filterAndSelect();
  await flightListingPage.saveCurrentState('flight-selected-state.json');
});

When('I proceed to checkout', async ({ flightTripSummaryPage }) => {
  await flightTripSummaryPage.proceed();
});

When('I select seats for the flight', async ({ flightSeatMapPage }) => {
  await flightSeatMapPage.handleSeats();
});

When('I fill in traveller information', async ({ flightTravellerInfoPage }) => {
  const testData = {
    passenger: { firstName: 'John', middleName: 'Moris', lastName: 'Doe', dob: '2004-11-14' },
    contact: { address: '123 Main St, Anytown, USA', zip: '382531', city: 'Anytown', phone: '9512345678' }
  };
  await flightTravellerInfoPage.fillInfo(testData, process.env.USER_EMAIL!);
});

Then('the flight booking should be ready for payment', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});
