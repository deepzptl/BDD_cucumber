// Generated from: features\flight.feature
import { test } from "../../steps/common.steps.ts";

test.describe('Flight Booking Flow', () => {

  test('End-to-End Flight Booking Flow', { tag: ['@smoke', '@regression', '@all'] }, async ({ Given, When, Then, And, flightListingPage, flightSearchPage, flightSeatMapPage, flightTravellerInfoPage, flightTripSummaryPage, homePage, loginPage, page }) => { 
    await Given('I am logged into the application', null, { loginPage, page }); 
    await And('I navigate to the flight search page', null, { homePage }); 
    await When('I search for a flight with the following details', {"dataTable":{"rows":[{"cells":[{"value":"field"},{"value":"value"}]},{"cells":[{"value":"fromSearch"},{"value":"ahme"}]},{"cells":[{"value":"fromSelect"},{"value":"AMD - Sardar Vallabhbhai Patel International AirportAhmedabad, India"}]},{"cells":[{"value":"toSearch"},{"value":"toronto"}]},{"cells":[{"value":"toSelect"},{"value":"YYZ - Lester B. Pearson International AirportToronto, Canada"}]},{"cells":[{"value":"departureDaysFromToday"},{"value":"15"}]}]}}, { flightSearchPage }); 
    await And('I filter and select a flight', null, { flightListingPage }); 
    await And('I proceed to checkout', null, { flightTripSummaryPage }); 
    await And('I select seats for the flight', null, { flightSeatMapPage }); 
    await And('I fill in traveller information', null, { flightTravellerInfoPage }); 
    await Then('the flight booking should be ready for payment', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\flight.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@smoke","@regression","@all"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I am logged into the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And I navigate to the flight search page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I search for a flight with the following details","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I filter and select a flight","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And I proceed to checkout","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And I select seats for the flight","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I fill in traveller information","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the flight booking should be ready for payment","stepMatchArguments":[]}]},
]; // bdd-data-end