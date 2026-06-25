Feature: Trip Planner Flow
  As a traveler
  I want to plan and save trips
  So that I can organize my travel itinerary

  @regression @all
  Scenario: Create Trip Planner Flow
    Given I am logged into the application
    And I open the saved trips page
    When I clean up existing trips and create a new trip
    And I dismiss the welcome popup
    And I search and plan a trip with the following details
      | field               | value                                                                  |
      | fromSearch          | amd                                                                    |
      | fromSelect          | AMD -Sardar Vallabhbhai Patel International AirportAhmedabad, India     |
      | toSearch            | hydera                                                                 |
      | toSelect            | HYD -Rajiv Gandhi International AirportHyderabad, India                |
      | startDaysFromToday  | 15                                                                     |
      | tripLengthDays      | 1                                                                      |
    And I save the trip plan
    Then the trip should be saved successfully
