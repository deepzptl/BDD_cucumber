Feature: Flight Booking Flow
  As a traveler
  I want to search and book flights
  So that I can travel to my destination

  @smoke @regression @all
  Scenario: End-to-End Flight Booking Flow
    Given I am logged into the application
    And I navigate to the flight search page
    When I search for a flight with the following details
      | field                   | value                                  |
      | fromSearch              | ahme                                   |
      | fromSelect               | AMD - Sardar Vallabhbhai Patel International AirportAhmedabad, India |
      | toSearch                 | toronto                                |
      | toSelect                 | YYZ - Lester B. Pearson International AirportToronto, Canada |
      | departureDaysFromToday   | 15                                     |
    And I filter and select a flight
    And I proceed to checkout
    And I select seats for the flight
    And I fill in traveller information
    Then the flight booking should be ready for payment
