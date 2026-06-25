import { createBdd } from 'playwright-bdd';
import { test, Given, When, Then, setSharedPage, getSharedPage } from './common.steps';
import { TripSavedTripsPage } from '../pages/trips/TripSavedTripsPage';
import { TripPlannerPage } from '../pages/trips/TripPlannerPage';
import { TripSearchPage } from '../pages/trips/TripSearchPage';
import { TripPlanPage } from '../pages/trips/TripPlanPage';

When('I clean up existing trips and create a new trip', async ({}) => {
  const savedTripsTab = getSharedPage('savedTripsTab');
  if (savedTripsTab) {
    const tripSavedTripsPage = new TripSavedTripsPage(savedTripsTab);
    const tripPlannerTab = await tripSavedTripsPage.cleanUpAndCreate();
    setSharedPage('tripPlannerTab', tripPlannerTab);
  }
});

When('I dismiss the welcome popup', async ({}) => {
  const tripPlannerTab = getSharedPage('tripPlannerTab');
  if (tripPlannerTab) {
    const tripPlannerPage = new TripPlannerPage(tripPlannerTab);
    await tripPlannerPage.dismissPopup();
  }
});

When('I search and plan a trip with the following details', async ({}, dataTable) => {
  const data: Record<string, string> = {};
  for (const row of dataTable.hashes()) {
    data[row.field] = row.value;
  }
  const tripPlannerTab = getSharedPage('tripPlannerTab');
  if (tripPlannerTab) {
    const tripSearchPage = new TripSearchPage(tripPlannerTab);
    const tripPlanTab = await tripSearchPage.searchAndPlan({
      fromSearch: data.fromSearch,
      fromSelect: data.fromSelect,
      toSearch: data.toSearch,
      toSelect: data.toSelect,
      startDaysFromToday: parseInt(data.startDaysFromToday) || 15,
      tripLengthDays: parseInt(data.tripLengthDays) || 1
    });
    setSharedPage('tripPlanTab', tripPlanTab);
  }
});

When('I save the trip plan', async ({}) => {
  const tripPlanTab = getSharedPage('tripPlanTab');
  if (tripPlanTab) {
    const tripPlanPage = new TripPlanPage(tripPlanTab);
    await tripPlanPage.save();
    await tripPlanPage.saveCurrentState('trip-planned-state.json');
  }
});

Then('the trip should be saved successfully', async ({}) => {
  const tripPlanTab = getSharedPage('tripPlanTab');
  if (tripPlanTab) {
    await tripPlanTab.waitForLoadState('domcontentloaded');
  }
});
