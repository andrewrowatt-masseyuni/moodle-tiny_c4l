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
  Scenario: A C4L component with the c4l-expand class can be enlarged, but the tables and images in it cannot
    Given the following "activities" exist:
      | activity | name      | course | idnumber | contentformat | content |
      | page     | PageName1 | C1     | page1    | 1             | <div id="expandable" class="mu-c4l c4l-mu-activities c4lv-mu-read c4lv-mu-read1 c4l-expand" aria-label="Read"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><div class="mu-c4l mu-table"><table id="innertable"><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table></div><figure class="mu-c4l c4lv-figure"><img src="/theme/boost/pix/screenshot.png" alt="Inner screenshot" style="width: 200px;"></figure><div id="nestedexpandable" class="mu-c4l c4l-expand"><p>Nested component</p></div></div><div id="tablecomponent" class="mu-c4l mu-table c4l-expand"><table><caption>Table component</caption><tbody><tr><td>e</td><td>f</td></tr><tr><td>g</td><td>h</td></tr></tbody></table></div><div id="plaincomponent" class="mu-c4l c4lv-tip"><p>Plain tip</p></div><div class="mu-c4l mu-table c4l-expand c4l-noexpand"><table id="optedouttable"><tbody><tr><td>i</td><td>j</td></tr><tr><td>k</td><td>l</td></tr></tbody></table></div><div class="mu-c4l mu-table"><table id="regulartable"><tbody><tr><td>m</td><td>n</td></tr><tr><td>o</td><td>p</td></tr></tbody></table></div> |
    When I am on the "PageName1" "page activity" page logged in as student1
    Then ".tiny-c4l-enlarge-wrap > button[title='Enlarge content'] + #expandable" "css_element" should exist
    And ".tiny-c4l-enlarge-wrap > button[title='Enlarge content'] + #tablecomponent" "css_element" should exist
    And ".tiny-c4l-enlarge-wrap > button[title='Enlarge table'] + div.mu-table > #regulartable" "css_element" should exist
    And "#expandable .tiny-c4l-enlarge-btn" "css_element" should not exist
    And "#tablecomponent .tiny-c4l-enlarge-btn" "css_element" should not exist
    And "#expandable img.tiny-c4l-enlargeable" "css_element" should not exist
    And ".tiny-c4l-enlarge-wrap #plaincomponent" "css_element" should not exist
    And ".tiny-c4l-enlarge-wrap #optedouttable" "css_element" should not exist
    And I hover "#expandable" "css_element"
    And I click on "Enlarge content" "button"
    And I should see "Read" in the ".tiny-c4l-enlarge-dialog .modal-title" "css_element"
    And I should see "Nested component" in the ".tiny-c4l-enlarge-dialog .modal-body" "css_element"
    And "table" "css_element" should exist in the ".tiny-c4l-enlarge-dialog .modal-body" "css_element"
    And "img[alt='Inner screenshot']" "css_element" should exist in the ".tiny-c4l-enlarge-dialog .modal-body" "css_element"
    And ".tiny-c4l-enlarge-dialog .tiny-c4l-enlarge-btn" "css_element" should not exist
    And I press the escape key
    And ".tiny-c4l-enlarge-dialog" "css_element" should not exist
    And I hover "#tablecomponent" "css_element"
    And I click on "//div[@id='tablecomponent']/preceding-sibling::button" "xpath_element"
    And I should see "Table component" in the ".tiny-c4l-enlarge-dialog .modal-title" "css_element"

  @javascript
  Scenario: Enlarging tables can be turned off
    Given the following config values are set as admin:
      | enlargetables | 0 | tiny_c4l |
    And the following "activities" exist:
      | activity | name      | course | idnumber | contentformat | content |
      | page     | PageName1 | C1     | page1    | 1             | <div class="mu-c4l mu-table"><table><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table></div><figure class="mu-c4l c4lv-figure"><img src="/theme/boost/pix/screenshot.png" alt="First screenshot" style="width: 200px;"></figure><div class="mu-c4l c4l-expand"><p>Whole component</p></div> |
    When I am on the "PageName1" "page activity" page logged in as student1
    Then "button[aria-label='Enlarge image: First screenshot']" "css_element" should exist
    And "Enlarge content" "button" should exist
    And "Enlarge table" "button" should not exist
