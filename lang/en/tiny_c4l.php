<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Plugin C4L strings for language en.
 *
 * @package     tiny_c4l
 * @category    string
 * @copyright   2022 Marc Català <reskit@gmail.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['additionalhtml'] = 'Additional HTML admin page';
$string['aimedatstudents'] = 'Aimed at Students';
$string['aimedatstudents_desc'] = 'By default, only selected components will be available for users with student capabilities when using the editor. To change the default setting, just check or uncheck you own preferred selection.';
$string['align-center'] = 'Align to center';
$string['align-left'] = 'Align to left';
$string['align-right'] = 'Align to right';
$string['allpurposecard'] = 'All-purpose card';
$string['attention'] = 'Attention';
$string['button_c4l'] = 'C4L';
$string['button_c4l_cut'] = 'Cut C4L component';
$string['button_c4l_copy'] = 'Copy C4L component';
$string['button_c4l_paste'] = 'Paste C4L component';
$string['c4l:use'] = 'Use TinyMCE C4L';
$string['c4l:viewplugin'] = 'View C4L plugin';
$string['caption'] = 'Caption';
$string['comfort-reading'] = 'Comfort reading';
$string['contextual'] = 'Contextual';
$string['custom'] = 'Custom';
$string['customcompcode'] = 'HTML code component {$a}';
$string['customcompcodedesc'] = 'The word <code>{{CUSTOMCLASS}}</code> is a mandatory class to be beside your main component CSS classes. <br />
Code example:
<pre>
&lt;div class="{{CUSTOMCLASS}} &lt;!-- Add your main CSS classes here --&gt;"&gt;
    &lt;p&gt;{{PLACEHOLDER}}&lt;/p&gt;
&lt;/div&gt;
</pre>
Be aware that any Javascript code or inline CSS will be removed before rendering.';
$string['customcompcount'] = 'Number of custom components';
$string['customcompcountdesc'] = 'Number of custom components to be created';
$string['customcompenable'] = 'Enable component {$a}';
$string['customcompenabledesc'] = 'If enabled, this component will be available.';
$string['customcompicon'] = 'Icon component {$a}';
$string['customcompicondesc'] = 'Optional icon component. Recommended size: 18x18 pixels.';
$string['customcompname'] = 'Button text component {$a}';
$string['customcompnamedesc'] = 'Text showed inside the button.';
$string['customcomponents'] = 'Custom components';
$string['customcompsortorder'] = 'Sort order component {$a}';
$string['customcompsortorderdesc'] = 'Sets the position of the component in the UI.';
$string['customcomptext'] = 'Placeholder text component {$a}';
$string['customcomptextdesc'] = 'Text to show as a placeholder in your component. Insert the word <code>{{PLACEHOLDER}}</code> in your code.';
$string['customcomptitle'] = 'Custom component {$a}';
$string['customcompvariant'] = 'Enable variants component {$a}';
$string['customcompvariantdesc'] = 'If enabled, full width variant will be available for this component.';
$string['customimagesbank'] = 'Bank of images';
$string['customimagesbankdesc'] = 'To insert any of the  uploaded images to your code, add this line:<br />
<code>&lt;img src="{{filename.extension}}" alt="Custom image"&gt;</code>';
$string['custompreviewcss'] = 'CSS code';
$string['custompreviewcssdesc'] = 'CSS used to preview components inside the editor.
<p>Any CSS code added here must be also included either to your theme or inside the style tags <code>&lt;style&gt;...&lt;style&gt;</code> and saved into the  <strong>additionalhtmlhead</strong> setting at {$a};
 otherwise your styles will not be applied to your components when rendered.</p>';
$string['do-card'] = 'Do card';
$string['dodontcards'] = 'Do/don\'t cards';
$string['dont-card'] = 'Don\'t card';
$string['dont-card-only'] = 'Don\'t card only';
$string['duedate'] = 'Due date';
$string['enablepreview'] = 'Enable preview';
$string['enablepreview_desc'] = 'If enabled, a preview is showed when you hover the mouse cursor over each component.';
$string['estimatedtime'] = 'Estimated time';
$string['evaluative'] = 'Evaluative';
$string['example'] = 'Example';
$string['expectedfeedback'] = 'Expected feedback';
$string['figure'] = 'Figure';
$string['full-width'] = 'Full width';
$string['generalsettings'] = 'General';
$string['gradingvalue'] = 'Grading value';
$string['helper'] = 'Helper';
$string['helplinktext'] = 'C4L helper';
$string['inlinetag'] = 'Inline tag';
$string['keyconcept'] = 'Key concept';
$string['learningoutcomes'] = 'Learning outcomes';
$string['menuitem_c4l'] = 'Components for Learning (C4L)';
$string['menuitem_c4l_cut'] = 'Cut C4L component';
$string['menuitem_c4l_copy'] = 'Copy C4L component';
$string['menuitem_c4l_paste'] = 'Paste C4L component';
$string['min'] = 'min';
$string['mu-activities'] = 'Activities';
$string['mu-activity'] = 'Activity';
$string['mu-aiasl1'] = 'No AI';
$string['mu-aiasl2'] = 'Planning';
$string['mu-aiasl3'] = 'Collaboration';
$string['mu-aiasl5'] = 'Exploration';
$string['mu-aiassessmentscale'] = 'AI Assessment Scale';
$string['mu-checkmark1'] = 'Checkmark';
$string['mu-checkmark2'] = 'Checkmark';
$string['mu-color-blue'] = 'Blue';
$string['mu-color-green'] = 'Green';
$string['mu-color-grey'] = 'Grey';
$string['mu-color-teal'] = 'Teal';
$string['mu-color-violet'] = 'Violet';
$string['mu-color-yellow'] = 'Yellow';
$string['mu-comment1'] = 'Comment';
$string['mu-comment2'] = 'Comment';
$string['mu-emphasis1'] = 'Emphasis';
$string['mu-emphasis2'] = 'Emphasis';
$string['mu-explore1'] = 'Explore';
$string['mu-explore2'] = 'Explore';
$string['mu-group1'] = 'Group';
$string['mu-group2'] = 'Group';
$string['mu-guidance1'] = 'Guidance';
$string['mu-guidance2'] = 'Guidance';
$string['mu-important1'] = 'Important';
$string['mu-important2'] = 'Important';
$string['mu-information1'] = 'Information';
$string['mu-information2'] = 'Information';
$string['mu-listen1'] = 'Listen';
$string['mu-listen2'] = 'Listen';
$string['mu-map1'] = 'Map';
$string['mu-map2'] = 'Map';
$string['mu-moreinformation'] = 'More information';
$string['mu-moreinformationabout'] = 'Click for more information about the \'{$a}\' component.';
$string['mu-others'] = 'Massey (Other)';
$string['mu-process1'] = 'Process';
$string['mu-process2'] = 'Process';
$string['mu-questionmark1'] = 'Question mark';
$string['mu-questionmark2'] = 'Question mark';
$string['mu-read1'] = 'Read';
$string['mu-read2'] = 'Read';
$string['mu-table'] = 'Table (Yellow)';
$string['mu-table-grey-variant'] = 'Table (Grey)';
$string['mu-tables'] = 'Tables';
$string['mu-watch1'] = 'Watch';
$string['mu-watch2'] = 'Watch';
$string['mu-write1'] = 'Write';
$string['mu-write2'] = 'Write';
$string['notintendedforstudents'] = 'Not intended for Students ';
$string['notintendedforstudents_desc'] = 'By default, evaluative and procedural components are not intended for users with student capabilities to use in the editor. To change the default setting, check the components you would like to make available to the students.';
$string['ordered-list'] = 'Ordered items';
$string['pluginname'] = 'Components for Learning (C4L)';
$string['preview'] = 'Preview';
$string['previewdefault'] = 'Place the pointer on any component to see its preview.';
$string['privacy:preference:components_variants'] = 'Preferred variants of each component';
$string['procedural'] = 'Procedural';
$string['proceduralcontext'] = 'Procedural context';
$string['quote'] = 'Quote';
$string['readingcontext'] = 'Reading context';
$string['reminder'] = 'Reminder';
$string['tag'] = 'Tag';
$string['textplaceholder'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
$string['tip'] = 'Tip';
