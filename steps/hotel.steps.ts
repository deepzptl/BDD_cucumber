import { createBdd } from 'playwright-bdd';
import { test, Given, When, Then, setSharedPage, getSharedPage } from './common.steps';
import { HotelDetailPage } from '../pages/hotels/HotelDetailPage';
import { HotelGuestInfoPage } from '../pages/hotels/HotelGuestInfoPage';
import * as dotenv from 'dotenv';

dotenv.config();

let proceedFlag = false;

When('I search for a hotel with the following details', async ({ hotelSearchPage }, dataTable) => {
  const data: Record<string, string> = {};
  for (const row of dataTable.hashes()) {
    data[row.field] = row.value;
  }
  const hotelData = {
    location: data.location,
    locationSelect: data.locationSelect,
    checkInDaysFromToday: parseInt(data.checkInDaysFromToday) || parseInt(data.checkInDays) || 15,
    stayLengthDays: parseInt(data.stayLengthDays) || parseInt(data.stayLength) || 1,
    guest: { firstName: 'John', lastName: 'Smith', age: '35' }
  };
  await hotelSearchPage.search(hotelData);
  await hotelSearchPage.saveCurrentState('hotel-searched-state.json');
});

When('I select a hotel from the listing', async ({ hotelListingPage }) => {
  const newTabPage = await hotelListingPage.openHotelDetail();
  setSharedPage('currentHotelPage', newTabPage);
});

When('I click book now on the hotel', async ({}) => {
  const hotelPage = getSharedPage('currentHotelPage');
  if (hotelPage) {
    const hotelDetailPage = new HotelDetailPage(hotelPage);
    proceedFlag = await hotelDetailPage.clickBookNow();
  }
});

When('I fill in guest information', async ({}) => {
  if (proceedFlag) {
    const hotelPage = getSharedPage('currentHotelPage');
    if (hotelPage) {
      const hotelGuestInfoPage = new HotelGuestInfoPage(hotelPage);
      const testData = { guest: { firstName: 'John', lastName: 'Smith', age: '35' } };
      await hotelGuestInfoPage.fillInfo(testData, process.env.USER_EMAIL!);
    }
  }
});

Then('the hotel booking should be ready for payment', async ({}) => {
  const hotelPage = getSharedPage('currentHotelPage');
  if (hotelPage) {
    await hotelPage.waitForLoadState('domcontentloaded');
  }
});
