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

/**
 * Tiny C4L common.
 *
 * @module      tiny_c4l/common
 * @copyright   2022 Marc Català <reskit@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

const component = 'tiny_c4l';

export default {
    component,
    pluginName: `${component}/plugin`,
    icon: `${component}`,
    c4lCutIcon: `${component}_cut_icon`,
    c4lCopyIcon: `${component}_copy_icon`,
    c4lPasteIcon: `${component}_paste_icon`,
    c4lButtonName: `${component}`,
    c4lMenuItemName: `${component}`,
    c4lCutButtonName: `${component}_cut`,
    c4lCutMenuItemName: `${component}_cut`,
    c4lCopyButtonName: `${component}_copy`,
    c4lCopyMenuItemName: `${component}_copy`,
    c4lPasteButtonName: `${component}_paste`,
    c4lPasteMenuItemName: `${component}_paste`,
};
