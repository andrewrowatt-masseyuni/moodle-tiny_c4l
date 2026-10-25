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
 * Tiny C4L figures.
 *
 * While a plain image (one not in a figure) is selected, this adds a "Make C4L figure" menu to the
 * image toolbar, which makes the image a full-width C4L figure, with or without a caption, as the
 * Figure component inserts it.
 *
 * The toolbar matches the image element itself, as the image toolbar does, so TinyMCE shows them
 * together. Each action is a single undo step.
 *
 * @module      tiny_c4l/figure
 * @copyright   2026 Massey University
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';
import {component, icon as c4lIcon} from './common';

const FIGURE_CLASSES = ['mu-c4l', 'c4lv-figure', 'c4l-full-width-variant'];
const CAPTION_CLASS = 'c4l-caption-variant';

/**
 * Whether a node is an image that isn't in a figure yet.
 *
 * @param {Node} node
 * @returns {boolean}
 */
const isPlainImage = (node) => node?.nodeName === 'IMG' &&
    node.matches(':not([data-mce-object]):not([data-mce-placeholder])') && !node.closest('figure');

/**
 * The selected image, if it is one that can be made a figure.
 *
 * @param {object} editor
 * @returns {HTMLImageElement|null}
 */
const getCurrentImage = (editor) => {
    const node = editor.selection.getNode();
    return isPlainImage(node) ? node : null;
};

/**
 * A figure's caption, with the same markup as the Figure component's caption variant and
 * placeholder text in place of its sample text.
 *
 * @param {object} editor
 * @param {Map} strings
 * @returns {HTMLElement}
 */
const createCaption = (editor, strings) => {
    const footer = editor.dom.create('em', {'class': 'c4l-figure-footer'},
        editor.dom.encode(strings.get('figure_caption_placeholder')));
    const source = editor.dom.create('span', {'class': 'c4l-figure-caption', 'aria-label': strings.get('caption')},
        `<strong>${editor.dom.encode(strings.get('figure_source'))} </strong>` +
        editor.dom.encode(strings.get('figure_source_placeholder')));
    const caption = editor.dom.create('figcaption');
    caption.append(footer, ' ', source);
    return caption;
};

/**
 * Make a plain image a full-width C4L figure. A figure can't go in a paragraph, so the paragraph
 * is split around the image; anything before or after the image stays where it was. An image in
 * a link keeps its link. A new caption's text is selected so it can be typed over.
 *
 * @param {object} editor
 * @param {boolean} withCaption
 * @param {Map} strings
 */
const makeC4LFigure = (editor, withCaption, strings) => {
    const image = getCurrentImage(editor);
    if (!image) {
        return;
    }
    let footer = null;
    editor.undoManager.transact(() => {
        const content = image.parentElement.nodeName === 'A' ? image.parentElement : image;

        // Split everything between the image and the nearest element a figure can go in.
        let outer = content;
        while (outer.parentElement !== editor.getBody() &&
                !editor.schema.isValidChild(outer.parentElement.nodeName.toLowerCase(), 'figure')) {
            outer = outer.parentElement;
        }
        if (outer !== content) {
            editor.dom.split(outer, content);
        }

        const classes = [...FIGURE_CLASSES];
        if (withCaption) {
            classes.push(CAPTION_CLASS);
        }
        const figure = editor.dom.create('figure', {'class': classes.join(' '), 'aria-label': strings.get('figure')});
        content.before(figure);
        figure.append(content);
        if (withCaption) {
            const caption = createCaption(editor, strings);
            figure.append(caption);
            footer = caption.firstChild;
        }
    });
    if (footer) {
        editor.selection.select(footer, true);
    } else {
        editor.selection.select(image);
    }
    editor.nodeChanged();
};

/**
 * Register the "Make C4L figure" menu and add it to the image toolbar.
 *
 * @param {object} editor TinyMCE editor instance
 */
export const setupFigureControls = async(editor) => {
    const keys = [
        'figure', 'caption', 'figure_make_c4l', 'figure_convert', 'figure_convert_caption',
        'figure_caption_placeholder', 'figure_source', 'figure_source_placeholder',
    ];
    const values = await getStrings(keys.map((key) => ({key, component})));
    const strings = new Map(keys.map((key, index) => [key, values[index]]));

    editor.ui.registry.addMenuButton('tiny_c4l_figure_make', {
        icon: c4lIcon,
        tooltip: strings.get('figure_make_c4l'),
        fetch: (callback) => callback([
            {
                type: 'menuitem',
                text: strings.get('figure_convert'),
                onAction: () => makeC4LFigure(editor, false, strings),
            },
            {
                type: 'menuitem',
                text: strings.get('figure_convert_caption'),
                onAction: () => makeC4LFigure(editor, true, strings),
            },
        ]),
    });

    editor.ui.registry.addContextToolbar('tiny_c4l_plain_image_toolbar', {
        predicate: isPlainImage,
        items: 'tiny_c4l_figure_make',
        position: 'node',
        scope: 'node',
    });
};
