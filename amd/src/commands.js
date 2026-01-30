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
    c4lCutMenuItemName,
    c4lCopyMenuItemName,
    c4lPasteMenuItemName,
    c4lCutIcon,
    c4lCopyIcon,
    c4lPasteIcon,
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
        cutIconImage,
        copyIconImage,
        pasteIconImage,
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
        getButtonImage('c4l_cut', component),
        getButtonImage('c4l_copy', component),
        getButtonImage('c4l_paste', component),
    ]);

    /**
     * Helper function to set up state management for C4L clipboard menu items.
     *
     * This function handles both event-based and polling-based state updates.
     * Polling is particularly important for the C4L Paste menu item, as it needs to detect
     * clipboard state changes that occur outside the editor's awareness. For example, when
     * a user copies a C4L component from one editor instance to another, the Paste menu
     * item in the second editor won't receive a NodeChange event and wouldn't know that
     * new content is available to paste. Polling ensures the UI stays synchronized.
     *
     * @param {object} editor The TinyMCE editor instance
     * @param {object} api The menu item API
     * @param {Function} checkState Function to check if the menu item should be enabled
     * @param {boolean} usePolling Whether to enable polling for state changes (useful for clipboard detection)
     * @return {Function} Cleanup function to unbind listeners
     */
    const setupStateManagement = (editor, api, checkState, usePolling = false) => {
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
            editor.ui.registry.addIcon(c4lCutIcon, cutIconImage.html);
            editor.ui.registry.addIcon(c4lCopyIcon, copyIconImage.html);
            editor.ui.registry.addIcon(c4lPasteIcon, pasteIconImage.html);

            // Register the C4L Split Toolbar Button.
            // The main button triggers the C4L insert action, and the dropdown menu
            // provides Cut, Copy, and Paste options.
            editor.ui.registry.addSplitButton(c4lButtonName, {
                icon,
                tooltip: c4lButtonNameTitle,
                onAction: () => handleAction(editor),
                onItemAction: (api, value) => {
                    // Handle the selected action from the dropdown menu
                    switch (value) {
                        case 'cut':
                            cutC4LComponent(editor);
                            break;
                        case 'copy':
                            copyC4LComponent(editor);
                            break;
                        case 'paste':
                            pasteC4LComponent(editor);
                            break;
                    }
                },
                fetch: (callback) => {
                    const items = [
                        {
                            type: 'choiceitem',
                            icon: c4lCutIcon,
                            text: c4lCutButtonNameTitle,
                            value: 'cut',
                            enabled: isCursorInC4LComponent(editor),
                        },
                        {
                            type: 'choiceitem',
                            icon: c4lCopyIcon,
                            text: c4lCopyButtonNameTitle,
                            value: 'copy',
                            enabled: isCursorInC4LComponent(editor),
                        },
                        {
                            type: 'choiceitem',
                            icon: c4lPasteIcon,
                            text: c4lPasteButtonNameTitle,
                            value: 'paste',
                            enabled: hasClipboardContent(),
                        },
                    ];
                    callback(items);
                },
                onSetup: (api) => {
                    // The main C4L button should always be enabled.
                    // Menu item availability is handled in onItemAction.
                    api.setEnabled(true);

                    return () => {};
                },
            });

            // Add the C4L Menu Item.
            // This allows it to be added to a standard menu, or a context menu.
            editor.ui.registry.addMenuItem(c4lMenuItemName, {
                icon,
                text: c4lMenuItemNameTitle,
                onAction: () => handleAction(editor),
            });

            // Add Cut C4L Component Menu Item
            editor.ui.registry.addMenuItem(c4lCutMenuItemName, {
                icon: c4lCutIcon,
                text: c4lCutMenuItemNameTitle,
                onAction: () => cutC4LComponent(editor),
                onSetup: (api) => setupStateManagement(editor, api, () => isCursorInC4LComponent(editor)),
            });

            // Add Copy C4L Component Menu Item
            editor.ui.registry.addMenuItem(c4lCopyMenuItemName, {
                icon: c4lCopyIcon,
                text: c4lCopyMenuItemNameTitle,
                onAction: () => copyC4LComponent(editor),
                onSetup: (api) => setupStateManagement(editor, api, () => isCursorInC4LComponent(editor)),
            });

            // Add Paste C4L Component Menu Item
            editor.ui.registry.addMenuItem(c4lPasteMenuItemName, {
                icon: c4lPasteIcon,
                text: c4lPasteMenuItemNameTitle,
                onAction: () => pasteC4LComponent(editor),
                onSetup: (api) => setupStateManagement(editor, api, hasClipboardContent, true),
            });

            // Inject custom CSS.
            editor.options.set('content_style', getpreviewCSS(editor));
        }
    };
};
