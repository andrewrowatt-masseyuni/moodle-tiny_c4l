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
 * Tiny C4L commands.
 *
 * @module      tiny_c4l/commands
 * @copyright   2022 Marc Català <reskit@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {handleAction} from './ui';
import {
    component,
    c4lButtonName,
    c4lMenuItemName,
    c4lCutButtonName,
    c4lCutMenuItemName,
    c4lCopyButtonName,
    c4lCopyMenuItemName,
    c4lPasteButtonName,
    c4lPasteMenuItemName,
    icon,
} from './common';
import {
        isC4LVisible,
        getpreviewCSS
} from './options';
import {
    isCursorInC4LComponent,
    cutC4LComponent,
    copyC4LComponent,
    pasteC4LComponent,
    hasClipboardContent,
} from './clipboard';

export const getSetup = async() => {
    const [
        c4lButtonNameTitle,
        c4lMenuItemNameTitle,
        c4lCutButtonNameTitle,
        c4lCutMenuItemNameTitle,
        c4lCopyButtonNameTitle,
        c4lCopyMenuItemNameTitle,
        c4lPasteButtonNameTitle,
        c4lPasteMenuItemNameTitle,
        buttonImage,
    ] = await Promise.all([
        getString('button_c4l', component),
        getString('menuitem_c4l', component),
        getString('button_c4l_cut', component),
        getString('menuitem_c4l_cut', component),
        getString('button_c4l_copy', component),
        getString('menuitem_c4l_copy', component),
        getString('button_c4l_paste', component),
        getString('menuitem_c4l_paste', component),
        getButtonImage('icon', component),
    ]);

    /**
     * Helper function to set up state management for clipboard buttons
     *
     * @param {object} api The button/menu API
     * @param {Function} checkState Function to check if button should be enabled
     * @param {boolean} usePolling Whether to poll for state changes
     * @return {Function} Cleanup function
     */
    const setupStateManagement = (api, checkState, usePolling = false) => {
        const updateState = () => {
            api.setEnabled(checkState());
        };
        updateState();
        editor.on('NodeChange', updateState);

        let interval = null;
        if (usePolling) {
            // Poll at 1 second intervals for clipboard state changes
            interval = setInterval(updateState, 1000);
        }

        return () => {
            editor.off('NodeChange', updateState);
            if (interval) {
                clearInterval(interval);
            }
        };
    };

    return (editor) => {
        if (isC4LVisible(editor)) {
            // Register the C4L Icon.
            editor.ui.registry.addIcon(icon, buttonImage.html);

            // Register the C4L Toolbar Button.
            editor.ui.registry.addButton(c4lButtonName, {
                icon,
                tooltip: c4lButtonNameTitle,
                onAction: () => handleAction(editor),
            });

            // Add the C4L Menu Item.
            // This allows it to be added to a standard menu, or a context menu.
            editor.ui.registry.addMenuItem(c4lMenuItemName, {
                icon,
                text: c4lMenuItemNameTitle,
                onAction: () => handleAction(editor),
            });

            // Register Cut C4L Component Button
            editor.ui.registry.addButton(c4lCutButtonName, {
                icon: 'cut',
                tooltip: c4lCutButtonNameTitle,
                onAction: () => cutC4LComponent(editor),
                onSetup: (buttonApi) => setupStateManagement(buttonApi, () => isCursorInC4LComponent(editor)),
            });

            // Add Cut C4L Component Menu Item
            editor.ui.registry.addMenuItem(c4lCutMenuItemName, {
                icon: 'cut',
                text: c4lCutMenuItemNameTitle,
                onAction: () => cutC4LComponent(editor),
                onSetup: (api) => setupStateManagement(api, () => isCursorInC4LComponent(editor)),
            });

            // Register Copy C4L Component Button
            editor.ui.registry.addButton(c4lCopyButtonName, {
                icon: 'copy',
                tooltip: c4lCopyButtonNameTitle,
                onAction: () => copyC4LComponent(editor),
                onSetup: (buttonApi) => setupStateManagement(buttonApi, () => isCursorInC4LComponent(editor)),
            });

            // Add Copy C4L Component Menu Item
            editor.ui.registry.addMenuItem(c4lCopyMenuItemName, {
                icon: 'copy',
                text: c4lCopyMenuItemNameTitle,
                onAction: () => copyC4LComponent(editor),
                onSetup: (api) => setupStateManagement(api, () => isCursorInC4LComponent(editor)),
            });

            // Register Paste C4L Component Button
            editor.ui.registry.addButton(c4lPasteButtonName, {
                icon: 'paste',
                tooltip: c4lPasteButtonNameTitle,
                onAction: () => pasteC4LComponent(editor),
                onSetup: (buttonApi) => setupStateManagement(buttonApi, hasClipboardContent, true),
            });

            // Add Paste C4L Component Menu Item
            editor.ui.registry.addMenuItem(c4lPasteMenuItemName, {
                icon: 'paste',
                text: c4lPasteMenuItemNameTitle,
                onAction: () => pasteC4LComponent(editor),
                onSetup: (api) => setupStateManagement(api, hasClipboardContent, true),
            });

            // Inject custom CSS.
            editor.options.set('content_style', getpreviewCSS(editor));
        }
    };
};
