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
 * Tiny C4L accordions.
 *
 * A C4L accordion is a native details element with the c4lv-mu-accordion class, a summary and
 * its body directly inside it. While the cursor is in one, a context toolbar offers to change its
 * style, stack another accordion of the same style above or below it, insert space above or below
 * it, move it past its neighbour and delete it. Each action is a single undo step.
 *
 * TinyMCE stops a click on a summary from toggling its details, so a collapsed accordion could not
 * be edited. Accordions are therefore always open in the editor, and always saved closed.
 *
 * @module      tiny_c4l/accordion
 * @copyright   2026 Massey University
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';
import {component} from './common';

const ACCORDION_CLASS = 'c4lv-mu-accordion';
const NAME_PREFIX = 'tiny_c4l_accordion_';

// The style classes an accordion can carry. None is the plain browser look.
const STYLES = [
    {key: 'accordion_style_none', cssClass: null},
    {key: 'accordion_style1', cssClass: 'mu-style1'},
    {key: 'accordion_style2', cssClass: 'mu-style2'},
];
const STYLE_CLASSES = STYLES.filter((style) => style.cssClass).map((style) => style.cssClass);

/** @var {string} The start of every button's icon. */
const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" aria-hidden="true">';

/**
 * A box in the icons that insert something above or below: an empty one for space, one with a
 * summary marker for an accordion.
 *
 * @param {number} y Where its top is.
 * @param {boolean} marker Whether it has a summary marker.
 * @returns {string}
 */
const box = (y, marker) => `<rect x="1.75" y="${y}" width="12.5" height="5.5" rx="1" fill="none" stroke="currentColor" ` +
    'stroke-width="1.5"/>' + (marker ? `<path fill="currentColor" d="M4.5 ${y + 1.5}l2.5 1.25-2.5 1.25z"/>` : '');

const PLUS_ABOVE = '<path fill="currentColor" d="M7.25 1h1.5v2h2v1.5h-2v2h-1.5v-2h-2V3h2z"/>';
const PLUS_BELOW = '<path fill="currentColor" d="M7.25 9.5h1.5v2h2V13h-2v2h-1.5v-2h-2v-1.5h2z"/>';

/** @var {object} Each icon by name: arrows to move, a plus above or below a box to insert. */
const ICONS = {
    moveup: SVG + '<path fill="currentColor" d="M8 3.5 2.5 9l1.06 1.06L8 5.62l4.44 4.44L13.5 9z"/></svg>',
    movedown: SVG + '<path fill="currentColor" d="M8 12.5 13.5 7l-1.06-1.06L8 10.38 3.56 5.94 2.5 7z"/></svg>',
    insertabove: SVG + PLUS_ABOVE + box(8.75, true) + '</svg>',
    insertbelow: SVG + box(1.75, true) + PLUS_BELOW + '</svg>',
    spaceabove: SVG + PLUS_ABOVE + box(8.75, false) + '</svg>',
    spacebelow: SVG + box(1.75, false) + PLUS_BELOW + '</svg>',
};

/**
 * Whether a node is a C4L accordion.
 *
 * @param {Node} node
 * @returns {boolean}
 */
const isAccordion = (node) => !!node && node.nodeName === 'DETAILS' && node.classList.contains(ACCORDION_CLASS);

/**
 * Whether a parsed node is a C4L accordion.
 *
 * @param {tinymce.html.Node} node
 * @returns {boolean}
 */
const isAccordionNode = (node) => (node.attr('class') || '').split(/\s+/).includes(ACCORDION_CLASS);

/**
 * The accordion the cursor is in, the innermost one if they are nested.
 *
 * @param {TinyMCE} editor
 * @returns {HTMLElement|null}
 */
const findAccordion = (editor) => editor.dom.getParent(editor.selection.getNode(), isAccordion, editor.getBody());

/**
 * The element an accordion would move past, if there is one.
 *
 * TinyMCE's own scaffolding, such as the fake caret, is not content, and is stepped over.
 *
 * @param {HTMLElement} accordion
 * @param {string} direction up or down.
 * @returns {HTMLElement|null}
 */
const neighbour = (accordion, direction) => {
    const step = (node) => (direction === 'up' ? node.previousElementSibling : node.nextElementSibling);

    let node = step(accordion);
    while (node && node.hasAttribute('data-mce-bogus')) {
        node = step(node);
    }

    return node;
};

/**
 * The style an accordion has.
 *
 * @param {HTMLElement} accordion
 * @returns {object} One of STYLES.
 */
const getStyle = (accordion) => STYLES.find((style) => style.cssClass && accordion.classList.contains(style.cssClass))
    || STYLES[0];

/**
 * An empty paragraph, kept open by TinyMCE's own filler, which is never saved.
 *
 * @param {TinyMCE} editor
 * @returns {HTMLElement}
 */
const createParagraph = (editor) => {
    const block = editor.dom.create(editor.options.get('forced_root_block') || 'p');
    block.innerHTML = '<br data-mce-bogus="1">';
    return block;
};

/**
 * A new, open accordion with an empty body.
 *
 * @param {TinyMCE} editor
 * @param {string|null} styleClass
 * @param {string} summaryText
 * @returns {HTMLElement}
 */
const createAccordion = (editor, styleClass, summaryText) => {
    const details = editor.dom.create('details', {
        'class': ['mu-c4l', ACCORDION_CLASS, styleClass].filter((cls) => cls).join(' '),
        'open': 'open',
    });
    const summary = editor.dom.create('summary');
    summary.textContent = summaryText;
    details.append(summary, createParagraph(editor));
    return details;
};

const noop = () => {
    return;
};

/**
 * Give an accordion one of STYLES, in place of the one it has.
 *
 * @param {TinyMCE} editor
 * @param {HTMLElement} accordion
 * @param {object} style One of STYLES.
 */
const setStyle = (editor, accordion, style) => {
    editor.undoManager.transact(() => {
        accordion.classList.remove(...STYLE_CLASSES);
        if (style.cssClass) {
            accordion.classList.add(style.cssClass);
        }
    });
    editor.nodeChanged();
};

/**
 * Stack a new accordion, of the same style, above or below one, with its summary selected so that
 * typing replaces it.
 *
 * @param {TinyMCE} editor
 * @param {HTMLElement} accordion
 * @param {string} where above or below.
 * @param {string} summaryText
 */
const insertAccordion = (editor, accordion, where, summaryText) => {
    const added = createAccordion(editor, getStyle(accordion).cssClass, summaryText);

    editor.undoManager.transact(() => {
        if (where === 'above') {
            accordion.before(added);
        } else {
            accordion.after(added);
        }
    });
    const summary = added.querySelector('summary');
    editor.focus();
    editor.selection.select(summary, true);
    editor.selection.scrollIntoView(summary);
    editor.nodeChanged();
};

/**
 * Put an empty paragraph above or below an accordion, and the cursor in it. Without it, an
 * accordion at the start or end of the text, or next to another component, would leave nowhere
 * to type on that side of it.
 *
 * @param {TinyMCE} editor
 * @param {HTMLElement} accordion
 * @param {string} where above or below.
 */
const insertSpace = (editor, accordion, where) => {
    const block = createParagraph(editor);

    editor.undoManager.transact(() => {
        if (where === 'above') {
            accordion.before(block);
        } else {
            accordion.after(block);
        }
    });
    editor.focus();
    editor.selection.setCursorLocation(block, 0);
    editor.selection.scrollIntoView(block);
    editor.nodeChanged();
};

/**
 * Move an accordion past its neighbour, and keep the cursor where it was inside it, so that it can
 * be moved again.
 *
 * @param {TinyMCE} editor
 * @param {HTMLElement} accordion
 * @param {string} direction up or down.
 */
const move = (editor, accordion, direction) => {
    const target = neighbour(accordion, direction);
    if (!target) {
        return;
    }

    // Taking the accordion out of the document collapses the selection, so it is put back by hand.
    // The nodes it points at move with the accordion, unchanged.
    const {startContainer, startOffset, endContainer, endOffset} = editor.selection.getRng();

    editor.undoManager.transact(() => {
        if (direction === 'up') {
            target.before(accordion);
        } else {
            target.after(accordion);
        }
    });
    if (accordion.contains(startContainer) && accordion.contains(endContainer)) {
        const rng = editor.dom.createRng();
        rng.setStart(startContainer, startOffset);
        rng.setEnd(endContainer, endOffset);
        editor.selection.setRng(rng);
    }
    editor.selection.scrollIntoView(accordion);
    editor.nodeChanged();
};

/**
 * Delete an accordion, and put the cursor in what follows it, or in a new paragraph if nothing does.
 *
 * @param {TinyMCE} editor
 * @param {HTMLElement} accordion
 */
const remove = (editor, accordion) => {
    editor.undoManager.transact(() => {
        let next = neighbour(accordion, 'down');
        if (!next) {
            next = createParagraph(editor);
            accordion.after(next);
        }
        accordion.remove();
        editor.selection.select(next, true);
        editor.selection.collapse(true);
    });
    editor.focus();
    editor.nodeChanged();
};

/**
 * If the cursor is in a summary, any summary, move it to a new paragraph after that summary's
 * details: a component inserted inside a summary would be broken HTML.
 *
 * @param {TinyMCE} editor
 * @returns {boolean} Whether the cursor was moved.
 */
export const leaveSummary = (editor) => {
    const summary = editor.dom.getParent(editor.selection.getNode(), 'summary', editor.getBody());
    const details = summary ? editor.dom.getParent(summary, 'details', editor.getBody()) : null;
    if (!details) {
        return false;
    }

    const block = createParagraph(editor);
    details.after(block);
    editor.selection.setCursorLocation(block, 0);
    return true;
};

/**
 * Open accordions as they are loaded into the editor, and close them as they are saved.
 *
 * @param {TinyMCE} editor
 */
const registerFilters = (editor) => {
    editor.parser.addNodeFilter('details', (nodes) => {
        nodes.filter(isAccordionNode).forEach((node) => node.attr('open', 'open'));
    });
    editor.serializer.addNodeFilter('details', (nodes) => {
        nodes.filter(isAccordionNode).forEach((node) => node.attr('open', null));
    });
};

/**
 * Register the accordion context toolbar, and the filters that open and close accordions, on an
 * editor.
 *
 * @param {TinyMCE} editor
 */
export const setupAccordionControls = async(editor) => {
    // Registered before waiting for the strings, which can take longer than the editor takes to
    // reach PreInit.
    editor.on('PreInit', () => registerFilters(editor));

    const stringKeys = [
        'accordion_style',
        'accordion_insert_above',
        'accordion_insert_below',
        'accordion_space_above',
        'accordion_space_below',
        'accordion_move_up',
        'accordion_move_down',
        'accordion_remove',
        'mu-accordion-summary',
        ...STYLES.map((style) => style.key),
    ];
    const stringValues = await getStrings(stringKeys.map((key) => ({key, component})));
    const langStrings = new Map(stringKeys.map((key, index) => [key, stringValues[index]]));

    Object.entries(ICONS).forEach(([name, svg]) => editor.ui.registry.addIcon(NAME_PREFIX + name, svg));

    editor.ui.registry.addMenuButton(NAME_PREFIX + 'style', {
        icon: 'format-painter',
        tooltip: langStrings.get('accordion_style'),
        fetch: (callback) => {
            const accordion = findAccordion(editor);
            const current = accordion ? getStyle(accordion) : null;
            callback(STYLES.map((style) => ({
                type: 'togglemenuitem',
                text: langStrings.get(style.key),
                active: style === current,
                onAction: () => {
                    const target = findAccordion(editor);
                    if (target) {
                        setStyle(editor, target, style);
                    }
                },
            })));
        },
    });

    /**
     * Add a toolbar button that acts on the accordion the cursor is in.
     *
     * @param {string} name The button's name, after the prefix, which is also its icon's.
     * @param {string|null} icon A built-in icon, instead of the button's own.
     * @param {string} labelKey
     * @param {Function} action Called with the accordion.
     * @param {Function|null} isEnabled Called with the accordion, whenever the editor's node changes.
     */
    const addButton = (name, icon, labelKey, action, isEnabled = null) => {
        editor.ui.registry.addButton(NAME_PREFIX + name, {
            icon: icon || NAME_PREFIX + name,
            tooltip: langStrings.get(labelKey),
            onAction: () => {
                const accordion = findAccordion(editor);
                if (accordion) {
                    action(accordion);
                }
            },
            onSetup: (api) => {
                if (!isEnabled) {
                    return noop;
                }
                const update = () => {
                    const accordion = findAccordion(editor);
                    api.setEnabled(!!accordion && isEnabled(accordion));
                };
                update();
                editor.on('NodeChange', update);
                return () => editor.off('NodeChange', update);
            },
        });
    };

    const summaryText = langStrings.get('mu-accordion-summary');
    addButton('insertabove', null, 'accordion_insert_above',
        (accordion) => insertAccordion(editor, accordion, 'above', summaryText));
    addButton('insertbelow', null, 'accordion_insert_below',
        (accordion) => insertAccordion(editor, accordion, 'below', summaryText));
    addButton('spaceabove', null, 'accordion_space_above', (accordion) => insertSpace(editor, accordion, 'above'));
    addButton('spacebelow', null, 'accordion_space_below', (accordion) => insertSpace(editor, accordion, 'below'));
    addButton('moveup', null, 'accordion_move_up', (accordion) => move(editor, accordion, 'up'),
        (accordion) => !!neighbour(accordion, 'up'));
    addButton('movedown', null, 'accordion_move_down', (accordion) => move(editor, accordion, 'down'),
        (accordion) => !!neighbour(accordion, 'down'));
    addButton('remove', 'remove', 'accordion_remove', (accordion) => remove(editor, accordion));

    const item = (name) => NAME_PREFIX + name;
    editor.ui.registry.addContextToolbar(NAME_PREFIX + 'toolbar', {
        predicate: isAccordion,
        items: [
            item('style'),
            [item('insertabove'), item('insertbelow')].join(' '),
            [item('spaceabove'), item('spacebelow')].join(' '),
            [item('moveup'), item('movedown')].join(' '),
            item('remove'),
        ].join(' | '),
        position: 'node',
        scope: 'node',
    });
};
