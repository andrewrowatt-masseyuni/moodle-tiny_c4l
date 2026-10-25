@editor @tiny @editor_tiny @tiny_c4l
Feature: Students can enlarge the tables and images in C4L components
  In order to read wide tables and detailed images
  As a student
  I need to open them in a large overlay

  Background:
    Given the following "courses" exist:
      | shortname | fullname |
      | C1        | Course 1 |
    And the following "users" exist:
      | username | firstname | lastname | email                |
      | student1 | Student   | 1        | student1@example.com |
    And the following "course enrolments" exist:
      | user     | course | role    |
      | student1 | C1     | student |
    And I change the window size to "large"

  @javascript
  Scenario: A C4L table can be enlarged, but plain, nested, single-column and opted-out tables cannot
    Given the following "activities" exist:
      | activity | name      | course | idnumber | contentformat | content |
      | page     | PageName1 | C1     | page1    | 1             | <div class="mu-c4l mu-table"><table><caption>Results</caption><tbody><tr><th>Name</th><th>Score</th></tr><tr><td>Ann</td><td><table id="nested"><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table></td></tr></tbody></table></div><table id="plain"><tbody><tr><td>w</td><td>x</td></tr><tr><td>y</td><td>z</td></tr></tbody></table><div class="mu-c4l mu-table"><table id="optedout" class="c4l-noexpand"><tbody><tr><td>w</td><td>x</td></tr><tr><td>y</td><td>z</td></tr></tbody></table></div><div class="mu-c4l mu-table"><table id="singlecolumn"><tbody><tr><td>Single column</td></tr><tr><td>Box</td></tr></tbody></table></div> |
    When I am on the "PageName1" "page activity" page logged in as student1
    Then "div.tiny-c4l-enlarge-wrap > button[title='Enlarge table'] + div.mu-table > table > caption" "css_element" should exist
    And "#plain" "css_element" should exist
    And ".tiny-c4l-enlarge-wrap #plain" "css_element" should not exist
    And "td .tiny-c4l-enlarge-wrap" "css_element" should not exist
    And ".tiny-c4l-enlarge-wrap #optedout" "css_element" should not exist
    And ".tiny-c4l-enlarge-wrap #singlecolumn" "css_element" should not exist
    And I hover ".tiny-c4l-enlarge-wrap table" "css_element"
    And I click on "Enlarge table" "button"
    And I should see "Results" in the ".tiny-c4l-enlarge-dialog .modal-title" "css_element"
    And "table" "css_element" should exist in the ".tiny-c4l-enlarge-dialog .modal-body" "css_element"
    And I press the escape key
    And ".tiny-c4l-enlarge-dialog" "css_element" should not exist

  @javascript
  Scenario: Images in C4L figures shown smaller than their natural size can be enlarged and stepped through
    Given the following "activities" exist:
      | activity | name      | course | idnumber | contentformat | content |
      | page     | PageName1 | C1     | page1    | 1             | <figure class="mu-c4l c4lv-figure"><img src="/theme/boost/pix/screenshot.png" alt="First screenshot" style="width: 200px;"></figure><figure class="mu-c4l c4lv-figure"><img src="/theme/boost/pix/screenshot.png?v=2" alt="Second screenshot" style="width: 200px;"><figcaption>Second figure</figcaption></figure><p><img src="/theme/boost/pix/screenshot.png?v=3" alt="Plain screenshot" style="width: 200px;"></p><figure class="mu-c4l c4lv-figure"><img src="/pix/y/loading.gif" alt="Small image"></figure><figure class="mu-c4l c4lv-figure"><a href="#"><img src="/theme/boost/pix/screenshot.png?v=4" alt="Linked screenshot" style="width: 200px;"></a></figure> |
    When I am on the "PageName1" "page activity" page logged in as student1
    Then "button[aria-label='Enlarge image: First screenshot']" "css_element" should exist
    And "button[aria-label='Enlarge image: Second screenshot']" "css_element" should exist
    And "img[alt='Plain screenshot']" "css_element" should exist
    And "button[aria-label='Enlarge image: Plain screenshot']" "css_element" should not exist
    And "button[aria-label='Enlarge image: Small image']" "css_element" should not exist
    And "button[aria-label='Enlarge image: Linked screenshot']" "css_element" should not exist
    And "img.tiny-c4l-enlargeable[alt='Plain screenshot']" "css_element" should not exist
    And I click on "img[alt='First screenshot']" "css_element"
    And I should see "1 of 2" in the ".tiny-c4l-enlarge-dialog" "css_element"
    And I should see "First screenshot" in the ".tiny-c4l-enlarge-dialog .modal-title" "css_element"
    And "Open original image" "link" should exist in the ".tiny-c4l-enlarge-dialog" "css_element"
    And the "Previous image" "button" should be disabled
    And I click on "Next image" "button"
    And I should see "2 of 2" in the ".tiny-c4l-enlarge-dialog" "css_element"
    And I should see "Second figure" in the ".tiny-c4l-enlarge-dialog .modal-title" "css_element"
    And the "Next image" "button" should be disabled
    And I press the left key
    And I should see "1 of 2" in the ".tiny-c4l-enlarge-dialog" "css_element"
    And I press the escape key
    And ".tiny-c4l-enlarge-dialog" "css_element" should not exist
    And I hover "img[alt='Second screenshot']" "css_element"
    And I click on "button[aria-label='Enlarge image: Second screenshot']" "css_element"
    And I should see "2 of 2" in the ".tiny-c4l-enlarge-dialog" "css_element"

  @javascript
  Scenario: Enlarging tables can be turned off
    Given the following config values are set as admin:
      | enlargetables | 0 | tiny_c4l |
    And the following "activities" exist:
      | activity | name      | course | idnumber | contentformat | content |
      | page     | PageName1 | C1     | page1    | 1             | <div class="mu-c4l mu-table"><table><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table></div><figure class="mu-c4l c4lv-figure"><img src="/theme/boost/pix/screenshot.png" alt="First screenshot" style="width: 200px;"></figure> |
    When I am on the "PageName1" "page activity" page logged in as student1
    Then "button[aria-label='Enlarge image: First screenshot']" "css_element" should exist
    And "Enlarge table" "button" should not exist
