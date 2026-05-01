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
 * Tiny C4L "Change to" feature.
 *
 * Adds a context toolbar that appears when the cursor is inside a
 * mu-activities component. The toolbar exposes a "Change to" menu with two
 * submenus:
 *   - Icon: switches the activity type (e.g. c4lv-mu-watch -> c4lv-mu-read)
 *   - Colour: switches the colour variant (e.g. c4l-mu-color-green-variant
 *     -> c4l-mu-color-teal-variant). Blue is treated as the default when no
 *     colour-variant class is present.
 *
 * @module      tiny_c4l/change
 * @copyright   2026 Massey University
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';
import {getButtonImage} from 'editor_tiny/utils';
import {components as Components} from './components';
import {component} from './common';

const ACTIVITY_TYPE = 'mu-activities';
const ACTIVITY_CLASS = 'c4l-mu-activities';
const ICON_CLASS_PREFIX = 'c4lv-mu-';
const COLOR_CLASS_PREFIX = 'c4l-mu-color-';
const COLOR_CLASS_SUFFIX = '-variant';
const DEFAULT_COLOR_CLASS = 'c4l-mu-color-blue-variant';
const ICON_NAME_PREFIX = 'tiny_c4l_change_icon_';
const COLOR_ICON_PREFIX = 'tiny_c4l_change_color_';

// Map each base activity class to its pix file (matches the icon mappings in
// styles.css). Used to register a TinyMCE icon for each menu item.
const ICON_PIX = {
    'c4lv-mu-watch': 'mu/video',
    'c4lv-mu-read': 'mu/book',
    'c4lv-mu-write': 'mu/pencil',
    'c4lv-mu-explore': 'mu/telescope',
    'c4lv-mu-listen': 'mu/headphones',
    'c4lv-mu-group': 'mu/user-group',
    'c4lv-mu-comment': 'mu/comments',
    'c4lv-mu-checkmark': 'mu/check',
    'c4lv-mu-guidance': 'mu/signs-post',
    'c4lv-mu-process': 'mu/gears',
    'c4lv-mu-map': 'mu/map',
    'c4lv-mu-questionmark': 'mu/circle-question',
    'c4lv-mu-important': 'mu/triangle-exclamation',
    'c4lv-mu-information': 'mu/circle-exclamation',
};

// Colour variants. Hex codes mirror --base-color-* in styles.css and are used
// to render the swatch SVG shown beside each menu item. Blue is included even
// though it is the implicit default.
const COLORS = [
    {key: 'mu-color-blue', cssClass: 'c4l-mu-color-blue-variant', hex: '#4c81af'},
    {key: 'mu-color-green', cssClass: 'c4l-mu-color-green-variant', hex: '#81ab5f'},
    {key: 'mu-color-grey', cssClass: 'c4l-mu-color-grey-variant', hex: '#757575'},
    {key: 'mu-color-teal', cssClass: 'c4l-mu-color-teal-variant', hex: '#44a4ad'},
    {key: 'mu-color-violet', cssClass: 'c4l-mu-color-violet-variant', hex: '#7561aa'},
    {key: 'mu-color-yellow', cssClass: 'c4l-mu-color-yellow-variant', hex: '#c3a542'},
];

const swatchSvg = (hex) =>
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    `<circle cx="12" cy="12" r="9" fill="${hex}" stroke="#666" stroke-width="1"/></svg>`;

const isActivityComponent = (node) => {
    if (!node || node.nodeType !== 1 || !node.classList) {
        return false;
    }
    return node.classList.contains(ACTIVITY_CLASS);
};

const findActivityComponent = (editor) => {
    let node = editor.selection.getNode();
    const body = editor.getBody();
    while (node && node !== body) {
        if (isActivityComponent(node)) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
};

const extractIconClasses = (code) => {
    const stripped = code.replace('{{VARIANTS}}', '').replace('{{PLACEHOLDER}}', '');
    const tmp = document.createElement('div');
    tmp.innerHTML = stripped.trim();
    const root = tmp.firstElementChild;
    if (!root) {
        return [];
    }
    return Array.from(root.classList).filter((cls) => cls.startsWith(ICON_CLASS_PREFIX));
};

/**
 * Of the c4lv-mu-* classes on a component, the "base" icon class is the one
 * without a trailing digit (e.g. c4lv-mu-watch, not c4lv-mu-watch1).
 *
 * @param {string[]} classes
 * @return {string|null}
 */
const getBaseIconClass = (classes) => {
    return classes.find((cls) => !/\d$/.test(cls)) || null;
};

/**
 * Build a deduplicated list of icons from mu-activities components, keyed by
 * the base c4lv-mu-* class. Each icon carries a langKey for its display name.
 *
 * @param {Array} activities
 * @return {Array}
 */
const collectIcons = (activities) => {
    const map = new Map();
    activities.forEach((c) => {
        const base = getBaseIconClass(extractIconClasses(c.code));
        if (!base || map.has(base)) {
            return;
        }
        // Component names like "mu-watch1" share the lang string with "mu-watch2";
        // either is fine as the display label for the base icon.
        map.set(base, {baseClass: base, langKey: c.name});
    });
    return Array.from(map.values());
};

const getCurrentIconBase = (componentEl) => {
    return Array.from(componentEl.classList)
        .find((cls) => cls.startsWith(ICON_CLASS_PREFIX) && !/\d$/.test(cls)) || null;
};

const getCurrentColorClass = (componentEl) => {
    const found = Array.from(componentEl.classList)
        .find((cls) => cls.startsWith(COLOR_CLASS_PREFIX) && cls.endsWith(COLOR_CLASS_SUFFIX));
    // Blue is the implicit default when no colour-variant class is set.
    return found || DEFAULT_COLOR_CLASS;
};

const changeIcon = (editor, icon, langStrings) => {
    const componentEl = findActivityComponent(editor);
    if (!componentEl) {
        return;
    }
    editor.undoManager.transact(() => {
        Array.from(componentEl.classList)
            .filter((cls) => cls.startsWith(ICON_CLASS_PREFIX))
            .forEach((cls) => componentEl.classList.remove(cls));
        componentEl.classList.add(icon.baseClass);
        const label = langStrings.get(icon.langKey) || icon.langKey;
        componentEl.setAttribute('aria-label', label);
    });
    editor.nodeChanged();
};

const changeColor = (editor, color) => {
    const componentEl = findActivityComponent(editor);
    if (!componentEl) {
        return;
    }
    editor.undoManager.transact(() => {
        Array.from(componentEl.classList)
            .filter((cls) => cls.startsWith(COLOR_CLASS_PREFIX) && cls.endsWith(COLOR_CLASS_SUFFIX))
            .forEach((cls) => componentEl.classList.remove(cls));
        componentEl.classList.add(color.cssClass);
    });
    editor.nodeChanged();
};

/**
 * Register the "Change to" context toolbar and its menu button on an editor.
 *
 * @param {object} editor TinyMCE editor instance
 */
export const setupChangeControls = async(editor) => {
    const activities = Components.filter((c) => c.type === ACTIVITY_TYPE);
    if (activities.length === 0) {
        return;
    }

    const icons = collectIcons(activities);
    const stringKeys = ['change_component', 'change_icon', 'change_color'];
    icons.forEach((i) => stringKeys.push(i.langKey));
    COLORS.forEach((c) => stringKeys.push(c.key));

    // Resolve strings and fetch icon SVGs in parallel.
    const iconImagePromises = icons.map((i) => {
        const pix = ICON_PIX[i.baseClass];
        return pix ? getButtonImage(pix, component) : Promise.resolve(null);
    });
    const [stringValues, ...iconImages] = await Promise.all([
        getStrings(stringKeys.map((key) => ({key, component}))),
        ...iconImagePromises,
    ]);
    const langStrings = new Map(stringKeys.map((key, idx) => [key, stringValues[idx]]));

    // Register an icon per activity type.
    icons.forEach((i, idx) => {
        const image = iconImages[idx];
        if (!image || !image.html) {
            return;
        }
        i.iconName = ICON_NAME_PREFIX + i.baseClass;
        editor.ui.registry.addIcon(i.iconName, image.html);
    });

    // Register a swatch icon per colour.
    COLORS.forEach((c) => {
        c.iconName = COLOR_ICON_PREFIX + c.key;
        editor.ui.registry.addIcon(c.iconName, swatchSvg(c.hex));
    });

    const buttonText = langStrings.get('change_component');

    editor.ui.registry.addMenuButton('tiny_c4l_change', {
        icon: 'preferences',
        tooltip: buttonText,
        fetch: (callback) => {
            const componentEl = findActivityComponent(editor);
            const currentIcon = componentEl ? getCurrentIconBase(componentEl) : null;
            const currentColor = componentEl ? getCurrentColorClass(componentEl) : null;

            const iconItems = icons.map((i) => ({
                type: 'togglemenuitem',
                text: langStrings.get(i.langKey) || i.langKey,
                icon: i.iconName,
                active: i.baseClass === currentIcon,
                onAction: () => changeIcon(editor, i, langStrings),
            }));

            const colorItems = COLORS.map((c) => ({
                type: 'togglemenuitem',
                text: langStrings.get(c.key) || c.key,
                icon: c.iconName,
                active: c.cssClass === currentColor,
                onAction: () => changeColor(editor, c),
            }));

            callback([
                {
                    type: 'nestedmenuitem',
                    text: langStrings.get('change_icon'),
                    getSubmenuItems: () => iconItems,
                },
                {
                    type: 'nestedmenuitem',
                    text: langStrings.get('change_color'),
                    getSubmenuItems: () => colorItems,
                },
            ]);
        },
    });

    editor.ui.registry.addContextToolbar('tiny_c4l_activity_toolbar', {
        predicate: isActivityComponent,
        items: 'tiny_c4l_change',
        position: 'node',
        scope: 'node',
    });
};
