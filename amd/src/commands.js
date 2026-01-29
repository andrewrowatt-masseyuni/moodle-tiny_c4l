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
                onSetup: (buttonApi) => {
                    const updateState = () => {
                        buttonApi.setEnabled(isCursorInC4LComponent(editor));
                    };
                    updateState();
                    editor.on('NodeChange', updateState);
                    return () => editor.off('NodeChange', updateState);
                },
            });

            // Add Cut C4L Component Menu Item
            editor.ui.registry.addMenuItem(c4lCutMenuItemName, {
                icon: 'cut',
                text: c4lCutMenuItemNameTitle,
                onAction: () => cutC4LComponent(editor),
                onSetup: (api) => {
                    const updateState = () => {
                        api.setEnabled(isCursorInC4LComponent(editor));
                    };
                    updateState();
                    editor.on('NodeChange', updateState);
                    return () => editor.off('NodeChange', updateState);
                },
            });

            // Register Copy C4L Component Button
            editor.ui.registry.addButton(c4lCopyButtonName, {
                icon: 'copy',
                tooltip: c4lCopyButtonNameTitle,
                onAction: () => copyC4LComponent(editor),
                onSetup: (buttonApi) => {
                    const updateState = () => {
                        buttonApi.setEnabled(isCursorInC4LComponent(editor));
                    };
                    updateState();
                    editor.on('NodeChange', updateState);
                    return () => editor.off('NodeChange', updateState);
                },
            });

            // Add Copy C4L Component Menu Item
            editor.ui.registry.addMenuItem(c4lCopyMenuItemName, {
                icon: 'copy',
                text: c4lCopyMenuItemNameTitle,
                onAction: () => copyC4LComponent(editor),
                onSetup: (api) => {
                    const updateState = () => {
                        api.setEnabled(isCursorInC4LComponent(editor));
                    };
                    updateState();
                    editor.on('NodeChange', updateState);
                    return () => editor.off('NodeChange', updateState);
                },
            });

            // Register Paste C4L Component Button
            editor.ui.registry.addButton(c4lPasteButtonName, {
                icon: 'paste',
                tooltip: c4lPasteButtonNameTitle,
                onAction: () => pasteC4LComponent(editor),
                onSetup: (buttonApi) => {
                    const updateState = () => {
                        buttonApi.setEnabled(hasClipboardContent());
                    };
                    updateState();
                    // Update on selection change in case clipboard content changes
                    editor.on('NodeChange', updateState);
                    // Also check periodically for clipboard changes
                    const interval = setInterval(updateState, 500);
                    return () => {
                        editor.off('NodeChange', updateState);
                        clearInterval(interval);
                    };
                },
            });

            // Add Paste C4L Component Menu Item
            editor.ui.registry.addMenuItem(c4lPasteMenuItemName, {
                icon: 'paste',
                text: c4lPasteMenuItemNameTitle,
                onAction: () => pasteC4LComponent(editor),
                onSetup: (api) => {
                    const updateState = () => {
                        api.setEnabled(hasClipboardContent());
                    };
                    updateState();
                    editor.on('NodeChange', updateState);
                    const interval = setInterval(updateState, 500);
                    return () => {
                        editor.off('NodeChange', updateState);
                        clearInterval(interval);
                    };
                },
            });

            // Inject custom CSS.
            editor.options.set('content_style', getpreviewCSS(editor));
        }
    };
};
