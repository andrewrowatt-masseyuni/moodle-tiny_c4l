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
    And I change the window size to "large"

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
    And I click on "button[data-filter=\"mu-activities\"]" "css"
    And I click on "Watch" "button"
    And I press "Save and display"
    And I should see "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  @javascript @external
  Scenario: TinyMCE can be used to embed a C4L accordion, which is saved closed
    And I am on the PageName1 "page activity editing" page logged in as admin
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "button[data-filter=\"mu-others\"]" "css"
    And I click on "Accordion (Style 1)" "button"
    And I press "Save and display"
    Then "details.mu-c4l.c4lv-mu-accordion.mu-style1" "css_element" should exist
    And "details.c4lv-mu-accordion[open]" "css_element" should not exist
    And I should see "Accordion title"
    And I should not see "Lorem ipsum dolor sit amet, consectetur adipiscing elit"

  @javascript @external
  Scenario: A C4L accordion can be stacked and restyled from its context toolbar
    And I am on the PageName1 "page activity editing" page logged in as admin
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "button[data-filter=\"mu-others\"]" "css"
    And I click on "Accordion (Style 1)" "button"
    # The accordion toolbar shows for a cursor; selected text shows the formatting toolbar instead.
    And I switch to the "Page content" TinyMCE editor iframe
    And I click on "details > summary" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Insert accordion below\"]" "css_element"
    And I switch to the "Page content" TinyMCE editor iframe
    And I click on "details + details > summary" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Accordion style\"]" "css_element"
    And I click on "//div[@role='menuitemcheckbox'][contains(normalize-space(.), 'Style 2')]" "xpath_element"
    And I press "Save and display"
    Then "details.c4lv-mu-accordion.mu-style1 + details.c4lv-mu-accordion.mu-style2" "css_element" should exist

  @javascript @external
  Scenario: A C4L table caption can go above or below the table, but not both
    And I am on the PageName1 "page activity editing" page logged in as admin
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "button[data-filter=\"mu-others\"]" "css"
    And I click on "button[data-id=\"mu-table\"] span[data-variant=\"caption-above\"]" "css_element"
    And "button[data-id=\"mu-table\"] span[data-variant=\"caption-above\"][data-state=\"on\"]" "css_element" should exist
    And I click on "button[data-id=\"mu-table\"] span[data-variant=\"caption-below\"]" "css_element"
    Then "button[data-id=\"mu-table\"] span[data-variant=\"caption-below\"][data-state=\"on\"]" "css_element" should exist
    And "button[data-id=\"mu-table\"] span[data-variant=\"caption-above\"][data-state=\"off\"]" "css_element" should exist
    # Let the toggle's tooltip close first: closing the picker with it open leaves Behat waiting on it.
    And I hover "button[data-filter=\"mu-others\"]" "css_element"
    And I click on "Table (Yellow)" "button"
    And I press "Save and display"
    And "div.mu-table.c4l-caption-below-variant > table > caption" "css_element" should exist
    And ".c4l-caption-above-variant" "css_element" should not exist
    And I should see "1" node occurrences of type "caption" in the "#region-main" "css_element"
    And I should see "Table 1: Consectetur adipiscing elit."

  @javascript @external
  Scenario: Only one colour can be chosen for a C4L component, and blue is the default
    And I am on the PageName1 "page activity editing" page logged in as admin
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "button[data-filter=\"mu-activities\"]" "css"
    And "button[data-id=\"mu-questionmark1\"] span[data-variant=\"mu-color-blue\"][data-state=\"on\"]" "css_element" should exist
    And I click on "button[data-id=\"mu-questionmark1\"] span[data-variant=\"mu-color-green\"]" "css_element"
    And "button[data-id=\"mu-questionmark1\"] span[data-variant=\"mu-color-blue\"][data-state=\"off\"]" "css_element" should exist
    And I click on "button[data-id=\"mu-questionmark1\"] span[data-variant=\"mu-color-grey\"]" "css_element"
    Then "button[data-id=\"mu-questionmark1\"] span[data-variant=\"mu-color-grey\"][data-state=\"on\"]" "css_element" should exist
    And "button[data-id=\"mu-questionmark1\"] span[data-variant=\"mu-color-green\"][data-state=\"off\"]" "css_element" should exist
    And I click on "button[data-id=\"mu-questionmark1\"] span[data-variant=\"mu-color-blue\"]" "css_element"
    And "button[data-id=\"mu-questionmark1\"] span[data-variant=\"mu-color-blue\"][data-state=\"on\"]" "css_element" should exist
    And "button[data-id=\"mu-questionmark1\"] span[data-variant=\"mu-color-grey\"][data-state=\"off\"]" "css_element" should exist
    And I click on "button[data-id=\"mu-questionmark2\"] span[data-variant=\"mu-color-teal\"]" "css_element"
    # Let the toggle's tooltip close first: closing the picker with it open leaves Behat waiting on it.
    And I hover "button[data-filter=\"mu-activities\"]" "css_element"
    And I click on "button[data-id=\"mu-questionmark1\"] .c4l-button-text" "css_element"
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "button[data-filter=\"mu-activities\"]" "css"
    And I click on "button[data-id=\"mu-questionmark2\"] .c4l-button-text" "css_element"
    And I press "Save and display"
    And "div.c4lv-mu-questionmark1" "css_element" should exist
    And "div.c4lv-mu-questionmark1[class*=\"c4l-mu-color-\"]" "css_element" should not exist
    And "div.c4lv-mu-questionmark2.c4l-mu-color-teal-variant" "css_element" should exist

  @javascript @external
  Scenario: An accordion can be inserted as a stack of 2, 3 or 4 of the same style
    And I am on the PageName1 "page activity editing" page logged in as admin
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "button[data-filter=\"mu-others\"]" "css"
    And I click on "button[data-id=\"mu-accordion-style1\"] span[data-variant=\"mu-stack-2\"]" "css_element"
    And I click on "button[data-id=\"mu-accordion-style1\"] span[data-variant=\"mu-stack-3\"]" "css_element"
    Then "button[data-id=\"mu-accordion-style1\"] span[data-variant=\"mu-stack-3\"][data-state=\"on\"]" "css_element" should exist
    And "button[data-id=\"mu-accordion-style1\"] span[data-variant=\"mu-stack-2\"][data-state=\"off\"]" "css_element" should exist
    # Let the toggle's tooltip close first: closing the picker with it open leaves Behat waiting on it.
    And I hover "button[data-filter=\"mu-others\"]" "css_element"
    And I click on "Accordion (Style 1)" "button"
    And I press "Save and display"
    And I should see "3" node occurrences of type "details" in the "#region-main" "css_element"
    And "details.c4lv-mu-accordion.mu-style1 + details.c4lv-mu-accordion.mu-style1 + details.c4lv-mu-accordion.mu-style1" "css_element" should exist
    And "details[open]" "css_element" should not exist

  @javascript @external
  Scenario Outline: The colour of an emphasis or button component can be changed from its context toolbar
    And I am on the PageName1 "page activity editing" page logged in as admin
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "button[data-filter=\"mu-others\"]" "css"
    And I click on "button[data-id=\"<component>\"] .c4l-button-text" "css_element"
    And I switch to the "Page content" TinyMCE editor iframe
    And I click on "<inside>" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Change to\"]" "css_element"
    And "//div[@role='menuitem'][contains(normalize-space(.), 'Icon')]" "xpath_element" should not exist
    And I click on "//div[@role='menuitem'][contains(normalize-space(.), 'Colour')]" "xpath_element"
    And I click on "//div[@role='menuitemcheckbox'][contains(normalize-space(.), 'Green')]" "xpath_element"
    And I press "Save and display"
    Then "div.c4lv-<component>.c4l-mu-color-green-variant" "css_element" should exist

    Examples:
      | component    | inside                  |
      | mu-emphasis1 | div.c4lv-mu-emphasis1 p |
      | mu-button1   | div.c4lv-mu-button1 a   |

  @javascript @external
  Scenario: A C4L table's colour and caption can be changed from the table toolbar
    And I am on the PageName1 "page activity editing" page logged in as admin
    And I click on the "C4L" button for the "Page content" TinyMCE editor
    And I click on "button[data-filter=\"mu-others\"]" "css"
    And I click on "Table (Yellow)" "button"
    And I switch to the "Page content" TinyMCE editor iframe
    # Selected text has a formatting toolbar floating below it, so click the header row or caption.
    And I click on "div.mu-table thead td" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Change to\"]" "css_element"
    And I click on "//div[@role='menuitem'][contains(normalize-space(.), 'Colour')]" "xpath_element"
    And I click on "//div[@role='menuitemcheckbox'][contains(normalize-space(.), 'Grey')]" "xpath_element"
    And I switch to the "Page content" TinyMCE editor iframe
    And I click on "div.mu-table thead td" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Change to\"]" "css_element"
    And I click on "//div[@role='menuitem'][contains(normalize-space(.), 'Caption')]" "xpath_element"
    And I click on "//div[@role='menuitemcheckbox'][contains(normalize-space(.), 'Below')]" "xpath_element"
    And I switch to the "Page content" TinyMCE editor iframe
    And "div.mu-table.c4l-caption-below-variant > table > caption" "css_element" should exist
    And I click on "div.mu-table caption" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Change to\"]" "css_element"
    And I click on "//div[@role='menuitem'][contains(normalize-space(.), 'Caption')]" "xpath_element"
    And I click on "//div[@role='menuitemcheckbox'][contains(normalize-space(.), 'None')]" "xpath_element"
    And I switch to the "Page content" TinyMCE editor iframe
    And "div.mu-table caption" "css_element" should not exist
    And I click on "div.mu-table thead td" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Change to\"]" "css_element"
    And I click on "//div[@role='menuitem'][contains(normalize-space(.), 'Caption')]" "xpath_element"
    And I click on "//div[@role='menuitemcheckbox'][contains(normalize-space(.), 'Above')]" "xpath_element"
    And I press "Save and display"
    Then "div.mu-table.mu-table-grey-variant.c4l-caption-above-variant > table > caption" "css_element" should exist
    And ".c4l-caption-below-variant" "css_element" should not exist
    And I should see "Table caption"

  @javascript @external
  Scenario: A plain table can be made a C4L table from the table toolbar
    Given the following "activities" exist:
      | activity | name      | course | idnumber | contentformat | content |
      | page     | PageName2 | C1     | 2        | 1             | <table><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table> |
    And I am on the PageName2 "page activity editing" page logged in as admin
    And I switch to the "Page content" TinyMCE editor iframe
    And I click on "td" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Make C4L table\"]" "css_element"
    And I click on "//div[@role='menuitem'][contains(normalize-space(.), 'Table (Grey)')]" "xpath_element"
    And I press "Save and display"
    Then "div.mu-c4l.mu-table.mu-table-grey-variant > table" "css_element" should exist

  @javascript @external
  Scenario: A plain image can be made a C4L figure, with or without a caption, from the image toolbar
    Given the following "activities" exist:
      | activity | name      | course | idnumber | contentformat | content |
      | page     | PageName2 | C1     | 2        | 1             | <p>Before <img src="/theme/boost/pix/screenshot.png" alt="First screenshot" style="width: 200px;"> after</p><p><a href="#"><img src="/theme/boost/pix/screenshot.png?v=2" alt="Linked screenshot" style="width: 200px;"></a></p> |
    And I am on the PageName2 "page activity editing" page logged in as admin
    And I switch to the "Page content" TinyMCE editor iframe
    And I click on "img[alt='First screenshot']" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Make C4L figure\"]" "css_element"
    And I click on "//div[@role='menuitem'][normalize-space(.)='Convert to C4L figure']" "xpath_element"
    And I switch to the "Page content" TinyMCE editor iframe
    And I click on "img[alt='Linked screenshot']" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"Make C4L figure\"]" "css_element"
    And I click on "//div[@role='menuitem'][normalize-space(.)='Convert to C4L figure with caption']" "xpath_element"
    And I press "Save and display"
    # The image's paragraph is split around the figure, which can't go in a paragraph. The enlarge
    # control wraps the image on the view page, so it isn't the figure's child.
    Then "p + figure.mu-c4l.c4lv-figure.c4l-full-width-variant:not(.c4l-caption-variant) img[alt='First screenshot']" "css_element" should exist
    # No empty paragraphs are left where the linked image's paragraph was.
    And "figure.c4lv-figure:not(.c4l-caption-variant) + p + figure.c4lv-figure.c4l-caption-variant" "css_element" should exist
    And "figure.c4lv-figure:not(.c4l-caption-variant) figcaption" "css_element" should not exist
    And I should see "Before"
    And I should see "after"
    And "figure.mu-c4l.c4lv-figure.c4l-full-width-variant.c4l-caption-variant > a > img[alt='Linked screenshot']" "css_element" should exist
    And "figure.c4l-caption-variant > figcaption > em.c4l-figure-footer" "css_element" should exist
    And I should see "Figure caption"
    And I should see "Source: Figure source"

  @javascript @external
  Scenario Outline: A C4L <name> can be moved with its move buttons
    Given the following "activities" exist:
      | activity | name      | course | idnumber | contentformat | content |
      | page     | PageName2 | C1     | 2        | 1             | <p>Paragraph before</p><html> |
    And I am on the PageName2 "page activity editing" page logged in as admin
    And I switch to the "Page content" TinyMCE editor iframe
    # Hover where the button is (it is hidden until its component is hovered), so the click doesn't scroll.
    And I hover "<component> > .c4l-move-controls .c4l-move-up" "css_element"
    And I click on "<component> > .c4l-move-controls .c4l-move-up" "css_element"
    And I switch to the main frame
    And I press "Save and display"
    Then "<component> + p" "css_element" should exist
    And ".c4l-move-controls" "css_element" should not exist

    Examples:
      | name               | component                   | html |
      | figure             | figure.c4lv-figure          | <figure class="mu-c4l c4lv-figure"><img src="" alt="Figure image"><figcaption><em class="c4l-figure-footer">Figure caption</em></figcaption></figure> |
      | procedural context | p.c4lv-proceduralcontext    | <p class="mu-c4l c4lv-proceduralcontext">Procedural context</p> |
      | tip                | div.c4lv-tip                | <div class="mu-c4l c4lv-tip"><p>Tip text</p></div> |

  @javascript @external
  Scenario Outline: A <name> made from a plain one has move buttons
    Given the following "activities" exist:
      | activity | name      | course | idnumber | contentformat | content |
      | page     | PageName2 | C1     | 2        | 1             | <p>Paragraph before</p><html> |
    And I am on the PageName2 "page activity editing" page logged in as admin
    And I switch to the "Page content" TinyMCE editor iframe
    And I click on "<element>" "css_element"
    And I switch to the main frame
    And I click on ".tox-pop button[aria-label=\"<button>\"]" "css_element"
    And I click on "//div[@role='menuitem'][contains(normalize-space(.), '<menuitem>')]" "xpath_element"
    And I switch to the "Page content" TinyMCE editor iframe
    And I hover "<component> > .c4l-move-controls .c4l-move-up" "css_element"
    And I click on "<component> > .c4l-move-controls .c4l-move-up" "css_element"
    And I switch to the main frame
    And I press "Save and display"
    # The enlarge control wraps a C4L table on the view page, so the paragraph isn't its sibling.
    Then "<component>" "css_element" should appear before "Paragraph before" "text"

    Examples:
      | name       | html                                                                                         | element | button          | menuitem                           | component           |
      | C4L table  | <table><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table>     | td      | Make C4L table  | Table (Grey)                       | div.mu-c4l.mu-table |
      | C4L figure | <p><img src="/theme/boost/pix/screenshot.png" alt="Screenshot" style="width: 200px;"></p>    | img     | Make C4L figure | Convert to C4L figure with caption | figure.c4lv-figure  |
