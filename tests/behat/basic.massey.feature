@editor  @tiny @editor_tiny  @tiny_c4l
Feature: Tiny editor components for learning - Massey customisations
  Write text with the c4l editor plugin
  Background:
    Given the following "courses" exist:
        | shortname | fullname |
        | C1        | Course 1 |
    And the following "users" exist:
        | username | firstname | lastname | email                |
        | teacher1 | Teacher   | 1        | teacher1@example.com |
    And the following "course enrolments" exist:
        | user     | course | role           |
        | teacher1 | C1     | editingteacher |
    And the following "activities" exist:
        | activity | name      | intro     | introformat | course | contentformat | idnumber |
        | page     | PageName1 | PageDesc1 | 1           | C1     | 1             | 1        |
  @javascript @external
  Scenario: TinyMCE can be used to embed AI Assessment C4L Content
    And I am on the PageName1 "page activity editing" page logged in as admin
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "AI Assessment Scale" "button"
    And I click on "No AI" "button"
    And I press "Save and display"
    And I should see "You must not use AI at any point during the assessment"

  @javascript @external
  Scenario: TinyMCE can be used to embed other Massey C4L Content
    And I am on the PageName1 "page activity editing" page logged in as admin
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "Massey (Other)" "button"
    And I click on "Read" "button"
    And I press "Save and display"
    And I should see "Donec lectus felis, pretium porttitor facilisis et, rhoncus quis ipsum"