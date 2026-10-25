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
 * Near full-screen modal that shows an enlarged table or image.
 *
 * Bootstrap 4 has no full-screen modal, so the dialog is widened with the
 * tiny-c4l-enlarge-dialog class (see styles.css).
 *
 * @module      tiny_c4l/enlarge_modal
 * @copyright   2026 Massey University
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Modal from 'core/modal';

export const DIALOG_CLASS = 'tiny-c4l-enlarge-dialog';

export default class EnlargeModal extends Modal {
    static TYPE = 'tiny_c4l/enlarge_modal';
    static TEMPLATE = 'core/modal';

    /**
     * Configure the modal.
     *
     * @param {object} modalConfig The modal configuration.
     */
    configure(modalConfig) {
        super.configure({
            ...modalConfig,
            show: true,
            removeOnClose: true,
        });

        this.getModal().addClass(DIALOG_CLASS);
    }
}
