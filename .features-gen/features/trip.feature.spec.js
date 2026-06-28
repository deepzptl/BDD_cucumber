// Generated from: features\trip.feature
import { test } from "../../steps/common.steps.ts";

test.describe('Trip Planner Flow', () => {

  test('Create Trip Planner Flow', { tag: ['@regression', '@all'] }, async ({ Given, When, Then, And, homePage, loginPage, page }) => { 
    await Given('I am logged into the application', null, { loginPage, page }); 
    await And('I open the saved trips page', null, { homePage }); 
    await When('I clean up existing trips and create a new trip'); 
    await And('I dismiss the welcome popup'); 
    await And('I search and plan a trip with the following details', {"dataTable":{"rows":[{"cells":[{"value":"field"},{"value":"value"}]},{"cells":[{"value":"fromSearch"},{"value":"amd"}]},{"cells":[{"value":"fromSelect"},{"value":"AMD -Sardar Vallabhbhai Patel International AirportAhmedabad, India"}]},{"cells":[{"value":"toSearch"},{"value":"hydera"}]},{"cells":[{"value":"toSelect"},{"value":"HYD -Rajiv Gandhi International AirportHyderabad, India"}]},{"cells":[{"value":"startDaysFromToday"},{"value":"15"}]},{"cells":[{"value":"tripLengthDays"},{"value":"1"}]}]}}); 
    await And('I save the trip plan'); 
    await Then('the trip should be saved successfully'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\trip.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@regression","@all"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I am logged into the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And I open the saved trips page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I clean up existing trips and create a new trip","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I dismiss the welcome popup","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I search and plan a trip with the following details","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I save the trip plan","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the trip should be saved successfully","stepMatchArguments":[]}]},
]; // bdd-data-end