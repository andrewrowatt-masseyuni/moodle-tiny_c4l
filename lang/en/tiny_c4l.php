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

$string['accordion_insert_above'] = 'Insert accordion above';
$string['accordion_insert_below'] = 'Insert accordion below';
$string['accordion_move_down'] = 'Move accordion down';
$string['accordion_move_up'] = 'Move accordion up';
$string['accordion_remove'] = 'Delete accordion';
$string['accordion_space_above'] = 'Insert space above';
$string['accordion_space_below'] = 'Insert space below';
$string['accordion_style'] = 'Accordion style';
$string['accordion_style1'] = 'Style 1';
$string['accordion_style2'] = 'Style 2';
$string['accordion_style_none'] = 'None';
$string['additionalhtml'] = 'Additional HTML admin page';
$string['aimedatstudents'] = 'Aimed at Students';
$string['aimedatstudents_desc'] = 'By default, only selected components will be available for users with student capabilities when using the editor. To change the default setting, just check or uncheck you own preferred selection.';
$string['align-center'] = 'Align to center';
$string['align-left'] = 'Align to left';
$string['align-right'] = 'Align to right';
$string['allpurposecard'] = 'All-purpose card';
$string['attention'] = 'Attention';
$string['button_c4l'] = 'C4L';
$string['button_c4l_copy'] = 'Copy C4L component';
$string['button_c4l_cut'] = 'Cut C4L component';
$string['button_c4l_paste'] = 'Paste C4L component';
$string['c4l:use'] = 'Use TinyMCE C4L';
$string['c4l:viewplugin'] = 'View C4L plugin';
$string['caption'] = 'Caption';
$string['caption-above'] = 'Caption above';
$string['caption-below'] = 'Caption below';
$string['change_color'] = 'Colour';
$string['change_component'] = 'Change to';
$string['change_icon'] = 'Icon';
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
$string['enlarge_image'] = 'Enlarge image';
$string['enlarge_image_named'] = 'Enlarge image: {$a}';
$string['enlarge_image_title'] = 'Image';
$string['enlarge_next'] = 'Next image';
$string['enlarge_original'] = 'Open original image';
$string['enlarge_position'] = '{$a->current} of {$a->total}';
$string['enlarge_previous'] = 'Previous image';
$string['enlarge_table'] = 'Enlarge table';
$string['enlarge_table_title'] = 'Table';
$string['enlargeexclude'] = 'Exclude';
$string['enlargeexclude_desc'] = 'CSS selector for tables and images that must never be enlargeable, even inside an enlargeable component. A table or image is skipped when it, or any element around it, matches. Authors can opt a single table or image out by giving it, or an element around it, the class <code>c4l-noexpand</code>.';
$string['enlargeimages'] = 'Enlarge images';
$string['enlargeimages_desc'] = 'Overlay an enlarge icon on the top right of each image in an enlargeable component that is shown smaller than its natural size. Students can also click the image. The overlay steps through the other enlargeable images on the page.';
$string['enlargeinclude'] = 'Enlargeable components';
$string['enlargeinclude_desc'] = 'CSS selector for the components whose tables and images are enlargeable. The default covers the C4L Table and Figure components. Widen it, for example with <code>.mu-c4l</code>, to include tables and images inside other C4L components.';
$string['enlargeminimagewidth'] = 'Minimum image width';
$string['enlargeminimagewidth_desc'] = 'Smallest natural width, in pixels, of an enlargeable image. An image is only enlargeable when it is shown narrower than its natural width, so small icons and images already at full size are left alone. SVG images qualify when they are shown at least this wide.';
$string['enlargesettings'] = 'Enlarge tables and images';
$string['enlargesettings_desc'] = 'Overlay an enlarge icon on the tables and images in C4L components, so students can open them in a large overlay. Tables and images outside C4L components are left alone.';
$string['enlargetables'] = 'Enlarge tables';
$string['enlargetables_desc'] = 'Overlay an enlarge icon on the top right of each table in an enlargeable component. Tables with a single row or column, and tables inside other tables, are skipped.';
$string['estimatedtime'] = 'Estimated time';
$string['evaluative'] = 'Evaluative';
$string['example'] = 'Example';
$string['expectedfeedback'] = 'Expected feedback';
$string['figure'] = 'Figure';
$string['figure_caption_placeholder'] = 'Figure caption';
$string['figure_convert'] = 'Convert to C4L figure';
$string['figure_convert_caption'] = 'Convert to C4L figure with caption';
$string['figure_make_c4l'] = 'Make C4L figure';
$string['figure_source'] = 'Source:';
$string['figure_source_placeholder'] = 'Figure source';
$string['full-width'] = 'Full width';
$string['generalsettings'] = 'General';
$string['gradingvalue'] = 'Grading value';
$string['helper'] = 'Helper';
$string['helplinktext'] = 'C4L helper';
$string['inlinetag'] = 'Inline tag';
$string['keyconcept'] = 'Key concept';
$string['learningoutcomes'] = 'Learning outcomes';
$string['menuitem_c4l'] = 'Components for Learning (C4L)';
$string['menuitem_c4l_copy'] = 'Copy C4L component';
$string['menuitem_c4l_cut'] = 'Cut C4L component';
$string['menuitem_c4l_paste'] = 'Paste C4L component';
$string['min'] = 'min';
$string['move_component_down'] = 'Move component down';
$string['move_component_up'] = 'Move component up';
$string['mu-accordion'] = 'Accordion (Plain)';
$string['mu-accordion-style1'] = 'Accordion (Style 1)';
$string['mu-accordion-style2'] = 'Accordion (Style 2)';
$string['mu-accordion-summary'] = 'Accordion title';
$string['mu-activities'] = 'Activities';
$string['mu-activity'] = 'Activity';
$string['mu-aiasl1'] = 'No AI';
$string['mu-aiasl2'] = 'Planning';
$string['mu-aiasl3'] = 'Collaboration';
$string['mu-aiasl5'] = 'Exploration';
$string['mu-aiassessmentscale'] = 'AI Assessment Scale';
$string['mu-button1'] = 'Button';
$string['mu-button2'] = 'Button';
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
$string['mu-stack-2'] = 'Stack of 2 accordions';
$string['mu-stack-3'] = 'Stack of 3 accordions';
$string['mu-stack-4'] = 'Stack of 4 accordions';
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
$string['table_caption_above'] = 'Above';
$string['table_caption_below'] = 'Below';
$string['table_caption_none'] = 'None';
$string['table_caption_placeholder'] = 'Table caption';
$string['table_make_c4l'] = 'Make C4L table';
$string['tag'] = 'Tag';
$string['textplaceholder'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
$string['tip'] = 'Tip';
