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
 * Tiny C4L tables.
 *
 * A C4L table is a table inside a div.mu-c4l.mu-table, as the Table (Yellow) and Table (Grey)
 * components insert. While the cursor is in a table, this adds to TinyMCE's own table toolbar:
 *   - in a C4L table, a "Change to" menu to switch its colour between yellow and grey, and to put
 *     its caption above or below the table or remove it, as the picker's caption variants do;
 *   - in any other table, a "Make C4L table" menu that wraps it as a yellow or grey C4L table.
 *
 * Both toolbars match the table element itself, as TinyMCE's table toolbar does, so TinyMCE shows
 * them together. Each action is a single undo step.
 *
 * @module      tiny_c4l/table
 * @copyright   2026 Massey University
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';
import {component, icon as c4lIcon} from './common';

const WRAPPER_SELECTOR = 'div.mu-c4l.mu-table';
const GREY_CLASS = 'mu-table-grey-variant';
const CAPTION_ABOVE_CLASS = 'c4l-caption-above-variant';
const CAPTION_BELOW_CLASS = 'c4l-caption-below-variant';
const SWATCH_ICON_PREFIX = 'tiny_c4l_table_swatch_';

// The colours a C4L table comes in, with the header colour from styles.css for the menu swatch.
const COLOURS = [
    {key: 'mu-color-yellow', componentKey: 'mu-table', grey: false, hex: '#f9f4e8'},
    {key: 'mu-color-grey', componentKey: 'mu-table-grey-variant', grey: true, hex: '#f1f1f1'},
];

const CAPTIONS = [
    {key: 'table_caption_above', position: 'above'},
    {key: 'table_caption_below', position: 'below'},
    {key: 'table_caption_none', position: 'none'},
];

const swatchSvg = (hex) =>
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    `<circle cx="12" cy="12" r="9" fill="${hex}" stroke="#666" stroke-width="1"/></svg>`;

/**
 * The C4L wrapper around a table, if it has one.
 *
 * @param {HTMLTableElement} table
 * @returns {HTMLElement|null}
 */
const getWrapper = (table) => (table.parentElement?.matches(WRAPPER_SELECTOR) ? table.parentElement : null);

const isTable = (node) => node?.nodeName === 'TABLE';
const isC4LTable = (node) => isTable(node) && !!getWrapper(node);
const isPlainTable = (node) => isTable(node) && !getWrapper(node);

/**
 * The innermost table around the cursor, which is the one the toolbars are showing for.
 *
 * @param {object} editor
 * @returns {HTMLTableElement|null}
 */
const getCurrentTable = (editor) => editor.dom.getParent(editor.selection.getStart(), 'table');

/**
 * Where a C4L table's caption is.
 *
 * @param {HTMLTableElement} table
 * @param {HTMLElement} wrapper
 * @returns {string} above, below or none
 */
const getCaptionPosition = (table, wrapper) => {
    if (!table.caption) {
        return 'none';
    }
    return wrapper.classList.contains(CAPTION_BELOW_CLASS) ? 'below' : 'above';
};

/**
 * Switch a C4L table between yellow and grey.
 *
 * @param {object} editor
 * @param {boolean} grey
 */
const setColour = (editor, grey) => {
    const table = getCurrentTable(editor);
    const wrapper = table && getWrapper(table);
    if (!wrapper) {
        return;
    }
    editor.undoManager.transact(() => wrapper.classList.toggle(GREY_CLASS, grey));
    editor.nodeChanged();
};

/**
 * Put a C4L table's caption above or below it, or remove it. A new caption gets placeholder text,
 * selected so it can be typed over.
 *
 * @param {object} editor
 * @param {string} position above, below or none
 * @param {string} placeholder
 */
const setCaption = (editor, position, placeholder) => {
    const table = getCurrentTable(editor);
    const wrapper = table && getWrapper(table);
    if (!wrapper) {
        return;
    }
    let newCaption = null;
    editor.undoManager.transact(() => {
        wrapper.classList.remove(CAPTION_ABOVE_CLASS, CAPTION_BELOW_CLASS);
        if (position === 'none') {
            if (table.caption) {
                editor.dom.remove(table.caption);
            }
            return;
        }
        wrapper.classList.add(position === 'below' ? CAPTION_BELOW_CLASS : CAPTION_ABOVE_CLASS);
        if (!table.caption) {
            // A caption must be the table's first child.
            newCaption = editor.dom.create('caption', {}, editor.dom.encode(placeholder));
            table.insertBefore(newCaption, table.firstChild);
        }
    });
    if (newCaption) {
        editor.selection.select(newCaption, true);
    }
    editor.nodeChanged();
};

/**
 * Make a plain table a C4L table by wrapping it, as the Table components insert it.
 *
 * @param {object} editor
 * @param {boolean} grey
 */
const makeC4LTable = (editor, grey) => {
    const table = getCurrentTable(editor);
    if (!table || getWrapper(table)) {
        return;
    }
    editor.undoManager.transact(() => {
        const classes = ['mu-c4l', 'mu-table'];
        if (grey) {
            classes.push(GREY_CLASS);
        }
        if (table.caption) {
            classes.push(CAPTION_ABOVE_CLASS);
        }
        const wrapper = editor.dom.create('div', {'class': classes.join(' ')});
        table.before(wrapper);
        wrapper.append(table);
    });
    editor.nodeChanged();
};

/**
 * Register the C4L table menus and add them to TinyMCE's table toolbar.
 *
 * @param {object} editor TinyMCE editor instance
 */
export const setupTableControls = async(editor) => {
    const keys = ['change_component', 'change_color', 'caption', 'table_make_c4l', 'table_caption_placeholder'];
    COLOURS.forEach((colour) => keys.push(colour.key, colour.componentKey));
    CAPTIONS.forEach((caption) => keys.push(caption.key));
    const values = await getStrings(keys.map((key) => ({key, component})));
    const strings = new Map(keys.map((key, index) => [key, values[index]]));

    COLOURS.forEach((colour) => {
        editor.ui.registry.addIcon(SWATCH_ICON_PREFIX + colour.key, swatchSvg(colour.hex));
    });

    editor.ui.registry.addMenuButton('tiny_c4l_table_change', {
        icon: 'preferences',
        tooltip: strings.get('change_component'),
        fetch: (callback) => {
            const table = getCurrentTable(editor);
            const wrapper = table && getWrapper(table);
            if (!wrapper) {
                callback([]);
                return;
            }
            const grey = wrapper.classList.contains(GREY_CLASS);
            const position = getCaptionPosition(table, wrapper);
            callback([
                {
                    type: 'nestedmenuitem',
                    text: strings.get('change_color'),
                    getSubmenuItems: () => COLOURS.map((colour) => ({
                        type: 'togglemenuitem',
                        text: strings.get(colour.key),
                        icon: SWATCH_ICON_PREFIX + colour.key,
                        active: colour.grey === grey,
                        onAction: () => setColour(editor, colour.grey),
                    })),
                },
                {
                    type: 'nestedmenuitem',
                    text: strings.get('caption'),
                    getSubmenuItems: () => CAPTIONS.map((caption) => ({
                        type: 'togglemenuitem',
                        text: strings.get(caption.key),
                        active: caption.position === position,
                        onAction: () => setCaption(editor, caption.position, strings.get('table_caption_placeholder')),
                    })),
                },
            ]);
        },
    });

    editor.ui.registry.addMenuButton('tiny_c4l_table_make', {
        icon: c4lIcon,
        tooltip: strings.get('table_make_c4l'),
        fetch: (callback) => callback(COLOURS.map((colour) => ({
            type: 'menuitem',
            text: strings.get(colour.componentKey),
            icon: SWATCH_ICON_PREFIX + colour.key,
            onAction: () => makeC4LTable(editor, colour.grey),
        }))),
    });

    editor.ui.registry.addContextToolbar('tiny_c4l_table_toolbar', {
        predicate: isC4LTable,
        items: 'tiny_c4l_table_change',
        position: 'node',
        scope: 'node',
    });

    editor.ui.registry.addContextToolbar('tiny_c4l_plain_table_toolbar', {
        predicate: isPlainTable,
        items: 'tiny_c4l_table_make',
        position: 'node',
        scope: 'node',
    });
};
