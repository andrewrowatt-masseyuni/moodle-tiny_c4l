<?php
// This file is part of Moodle - http://moodle.org/
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
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace tiny_c4l;

use core\hook\output\before_footer_html_generation;

/**
 * Hook callbacks for the tiny_c4l plugin.
 *
 * @package    tiny_c4l
 * @copyright  2026 Massey University
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class hook_callbacks {
    /** @var string Default selector for the components whose tables and images can be enlarged: C4L tables and figures. */
    public const ENLARGE_INCLUDE_DEFAULT = 'div.mu-c4l.mu-table, figure.c4lv-figure';

    /** @var string Default selector for tables and images that must not be enlargeable, such as the C4L picker previews. */
    public const ENLARGE_EXCLUDE_DEFAULT = '.modal, .tox, a, button, label, .c4l-noexpand';

    /** @var int Default minimum natural width, in pixels, of an enlargeable image. */
    public const ENLARGE_MINIMAGEWIDTH_DEFAULT = 300;

    /**
     * Load the script that lets students enlarge tables and images in rendered content.
     *
     * The controls are added by the script rather than stored in the content, because Moodle
     * strips buttons and ARIA attributes wherever it cleans text.
     *
     * @param before_footer_html_generation $hook
     */
    public static function before_footer_html_generation(before_footer_html_generation $hook): void {
        global $PAGE;

        if (during_initial_install() || get_config('tiny_c4l', 'disabled')) {
            return;
        }

        $config = get_config('tiny_c4l');
        $tables = !empty($config->enlargetables ?? 1);
        $images = !empty($config->enlargeimages ?? 1);
        if (!$tables && !$images) {
            return;
        }

        $PAGE->requires->js_call_amd('tiny_c4l/enlarge', 'init', [[
            'tables' => $tables,
            'images' => $images,
            'minImageWidth' => (int) ($config->enlargeminimagewidth ?? self::ENLARGE_MINIMAGEWIDTH_DEFAULT),
            'include' => $config->enlargeinclude ?? self::ENLARGE_INCLUDE_DEFAULT,
            'exclude' => $config->enlargeexclude ?? self::ENLARGE_EXCLUDE_DEFAULT,
        ]]);
    }
}
