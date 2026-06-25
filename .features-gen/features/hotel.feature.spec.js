// Generated from: features/hotel.feature
import { test } from "../../steps/common.steps.ts";

test.describe('Hotel Booking Flow', () => {

  test.describe('End-to-End Hotel Booking Flow with MySQL Data', () => {

    test('Example #1', { tag: ['@smoke', '@regression', '@all', '@mysql'] }, async ({ Given, When, Then, And, homePage, hotelListingPage, hotelSearchPage, loginPage, page }) => { 
      await Given('I am logged into the application', null, { loginPage, page }); 
      await And('I navigate to the hotel search page', null, { homePage }); 
      await When('I search for a hotel with the following details', {"dataTable":{"rows":[{"cells":[{"value":"field"},{"value":"value"}]},{"cells":[{"value":"location"},{"value":"hyderabad"}]},{"cells":[{"value":"locationSelect"},{"value":"HYD, Hyderabad, India"}]},{"cells":[{"value":"checkInDaysFromToday"},{"value":"15"}]},{"cells":[{"value":"stayLengthDays"},{"value":"1"}]}]}}, { hotelSearchPage }); 
      await And('I select a hotel from the listing', null, { hotelListingPage }); 
      await And('I click book now on the hotel'); 
      await And('I fill in guest information'); 
      await Then('the hotel booking should be ready for payment'); 
    });

    test('Example #2', { tag: ['@smoke', '@regression', '@all', '@mysql'] }, async ({ Given, When, Then, And, homePage, hotelListingPage, hotelSearchPage, loginPage, page }) => { 
      await Given('I am logged into the application', null, { loginPage, page }); 
      await And('I navigate to the hotel search page', null, { homePage }); 
      await When('I search for a hotel with the following details', {"dataTable":{"rows":[{"cells":[{"value":"field"},{"value":"value"}]},{"cells":[{"value":"location"},{"value":"mumbai"}]},{"cells":[{"value":"locationSelect"},{"value":"BOM, Mumbai, India"}]},{"cells":[{"value":"checkInDaysFromToday"},{"value":"20"}]},{"cells":[{"value":"stayLengthDays"},{"value":"2"}]}]}}, { hotelSearchPage }); 
      await And('I select a hotel from the listing', null, { hotelListingPage }); 
      await And('I click book now on the hotel'); 
      await And('I fill in guest information'); 
      await Then('the hotel booking should be ready for payment'); 
    });

    test('Example #3', { tag: ['@smoke', '@regression', '@all', '@mysql'] }, async ({ Given, When, Then, And, homePage, hotelListingPage, hotelSearchPage, loginPage, page }) => { 
      await Given('I am logged into the application', null, { loginPage, page }); 
      await And('I navigate to the hotel search page', null, { homePage }); 
      await When('I search for a hotel with the following details', {"dataTable":{"rows":[{"cells":[{"value":"field"},{"value":"value"}]},{"cells":[{"value":"location"},{"value":"delhi"}]},{"cells":[{"value":"locationSelect"},{"value":"DEL, Delhi, India"}]},{"cells":[{"value":"checkInDaysFromToday"},{"value":"10"}]},{"cells":[{"value":"stayLengthDays"},{"value":"3"}]}]}}, { hotelSearchPage }); 
      await And('I select a hotel from the listing', null, { hotelListingPage }); 
      await And('I click book now on the hotel'); 
      await And('I fill in guest information'); 
      await Then('the hotel booking should be ready for payment'); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/hotel.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":23,"tags":["@smoke","@regression","@all","@mysql"],"steps":[{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I am logged into the application","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And I navigate to the hotel search page","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I search for a hotel with the following details","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And I select a hotel from the listing","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I click book now on the hotel","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And I fill in guest information","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the hotel booking should be ready for payment","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":24,"tags":["@smoke","@regression","@all","@mysql"],"steps":[{"pwStepLine":19,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I am logged into the application","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And I navigate to the hotel search page","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I search for a hotel with the following details","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And I select a hotel from the listing","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I click book now on the hotel","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And I fill in guest information","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the hotel booking should be ready for payment","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":25,"tags":["@smoke","@regression","@all","@mysql"],"steps":[{"pwStepLine":29,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I am logged into the application","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And I navigate to the hotel search page","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I search for a hotel with the following details","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And I select a hotel from the listing","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I click book now on the hotel","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And I fill in guest information","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the hotel booking should be ready for payment","stepMatchArguments":[]}]},
]; // bdd-data-end