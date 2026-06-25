Feature: Hotel Booking Flow
  As a traveler
  I want to search and book hotels
  So that I can find accommodation for my trip

  @smoke @regression @all @mysql
  Scenario Outline: End-to-End Hotel Booking Flow with MySQL Data
    Given I am logged into the application
    And I navigate to the hotel search page
    When I search for a hotel with the following details
      | field                  | value             |
      | location               | <location>        |
      | locationSelect         | <locationSelect>  |
      | checkInDaysFromToday   | <checkInDays>     |
      | stayLengthDays         | <stayLength>      |
    And I select a hotel from the listing
    And I click book now on the hotel
    And I fill in guest information
    Then the hotel booking should be ready for payment

    Examples:
      | location   | locationSelect              | checkInDays | stayLength |
      | hyderabad  | HYD, Hyderabad, India       | 15          | 1          |
      | mumbai     | BOM, Mumbai, India          | 20          | 2          |
      | delhi      | DEL, Delhi, India           | 10          | 3          |
