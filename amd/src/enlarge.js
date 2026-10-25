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
 * Lets students enlarge tables and images in rendered content.
 *
 * Loaded on every page by \tiny_c4l\hook_callbacks, not in the editor. Moodle strips buttons and
 * ARIA attributes wherever it cleans text, so nothing is stored in the content: the controls are
 * added here when the page loads, to the tables and images inside the configured components (by
 * default the C4L Table and Figure components).
 *
 * Each table, and each image shown narrower than its natural width, is put in a wrapper that
 * overlays an enlarge icon on its top right corner. Enlargeable images can also be clicked. The
 * image modal steps through every enlargeable image on the page.
 *
 * @module      tiny_c4l/enlarge
 * @copyright   2026 Massey University
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getString, getStrings} from 'core/str';
import Templates from 'core/templates';
import Pending from 'core/pending';
import {eventTypes as filterEventTypes} from 'core_filters/events';
import EnlargeModal, {DIALOG_CLASS} from './enlarge_modal';

const IMAGE_CLASS = 'tiny-c4l-enlargeable';
const SCALABLE_CLASS = 'tiny-c4l-enlarge-scalable';
const WRAP_CLASS = 'tiny-c4l-enlarge-wrap';
const WRAP_BLOCK_CLASS = 'tiny-c4l-enlarge-wrap-block';
const BUTTON_CLASS = 'tiny-c4l-enlarge-btn';

const STRING_KEYS = ['enlarge_image', 'enlarge_image_title', 'enlarge_table', 'enlarge_table_title'];

/** @type {{tables: boolean, images: boolean, minImageWidth: number, include: string, exclude: string}} */
let config;

// Strings and the rendered icon buttons, loaded the first time something is enlargeable.
let resourcesPromise = null;

// Tables and images already looked at, as components can be nested or announced twice.
const seen = new WeakSet();

// What each icon button enlarges.
const targets = new WeakMap();

// The table or image inside each wrapper.
const wrapped = new WeakMap();

// Waits until a loaded image is laid out with a size, so images in closed accordions or hidden
// tabs are measured when they are first shown.
let sizeObserver = null;

// Keeps each icon on the corner of its table or image as the page reflows.
let placementObserver = null;

/**
 * Load the strings and the rendered icon buttons.
 *
 * @returns {Promise<{strings: object, tableButton: string, imageButton: string}>}
 */
const getResources = () => {
    if (!resourcesPromise) {
        resourcesPromise = getStrings(STRING_KEYS.map((key) => ({key, component: 'tiny_c4l'})))
            .then(async(values) => {
                const strings = Object.fromEntries(STRING_KEYS.map((key, index) => [key, values[index]]));
                const [table, image] = await Promise.all([
                    Templates.renderForPromise('tiny_c4l/enlarge_trigger', {label: strings.enlarge_table}),
                    Templates.renderForPromise('tiny_c4l/enlarge_trigger', {label: strings.enlarge_image}),
                ]);
                return {strings, tableButton: table.html, imageButton: image.html};
            });
    }
    return resourcesPromise;
};

/**
 * Whether a CSS selector is valid.
 *
 * @param {string} selector
 * @returns {boolean}
 */
const isValidSelector = (selector) => {
    try {
        document.createDocumentFragment().querySelector(selector);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Whether a table or image must be left alone.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
const isExcluded = (element) => !!element.closest(`.${DIALOG_CLASS}`) ||
    (config.exclude !== '' && !!element.closest(config.exclude));

/**
 * Escape text for use as HTML.
 *
 * @param {string} text
 * @returns {string}
 */
const escapeHtml = (text) => {
    const element = document.createElement('span');
    element.textContent = text;
    return element.innerHTML;
};

/**
 * The text of an element with its whitespace collapsed.
 *
 * @param {HTMLElement|null|undefined} element
 * @returns {string}
 */
const textOf = (element) => (element?.textContent ?? '').replace(/\s+/g, ' ').trim();

/**
 * Move a wrapper's icon to the top right corner of its table or image.
 *
 * The wrapper can be wider than what it holds: a narrow or centred table, a centred image, or a
 * table wider than the page that scrolls sideways (the icon then stays at the visible edge).
 *
 * @param {HTMLElement} wrap
 */
const placeIcon = (wrap) => {
    const wrapBox = wrap.getBoundingClientRect();
    const box = wrapped.get(wrap).getBoundingClientRect();
    wrap.style.setProperty('--tiny-c4l-enlarge-right', `${Math.max(0, wrapBox.right - box.right)}px`);
    wrap.style.setProperty('--tiny-c4l-enlarge-top', `${Math.max(0, box.top - wrapBox.top)}px`);
};

/**
 * Overlay an icon button on a wrapped table or image.
 *
 * @param {HTMLElement} wrap The wrapper, already holding the table or image.
 * @param {HTMLElement} content The table or image, whose corner the icon sits on.
 * @param {string} html The rendered icon button.
 * @param {object} target What the button enlarges.
 * @returns {HTMLButtonElement}
 */
const addIcon = (wrap, content, html, target) => {
    // Before the content, so the button is reached first with the keyboard or a screen reader.
    wrap.insertAdjacentHTML('afterbegin', html);
    const button = wrap.querySelector(`:scope > .${BUTTON_CLASS}`);
    targets.set(button, target);

    wrapped.set(wrap, content);
    if (!placementObserver) {
        placementObserver = new ResizeObserver((entries) => entries.forEach(({target: observed}) => {
            placeIcon(observed.closest(`.${WRAP_CLASS}`));
        }));
    }
    placementObserver.observe(wrap);
    placementObserver.observe(content);
    return button;
};

/**
 * Add an enlarge icon to a table.
 *
 * @param {HTMLTableElement} table
 */
const enhanceTable = async(table) => {
    if (seen.has(table)) {
        return;
    }
    seen.add(table);

    if (isExcluded(table) || table.parentElement.closest('table')) {
        return;
    }
    // A single row or column is a layout box rather than data.
    const columns = Math.max(0, ...Array.from(table.rows, (row) => row.cells.length));
    if (table.rows.length < 2 || columns < 2) {
        return;
    }

    // Keep a C4L table's wrapper, which carries its styles.
    const parent = table.parentElement;
    const anchor = parent.classList.contains('mu-c4l') && parent.children.length === 1 ? parent : table;

    const pending = new Pending('tiny_c4l/enlarge:enhanceTable');
    const {tableButton} = await getResources();
    const wrap = document.createElement('div');
    wrap.className = `${WRAP_CLASS} ${WRAP_BLOCK_CLASS}`;
    anchor.before(wrap);
    wrap.append(anchor);
    addIcon(wrap, table, tableButton, {table, anchor});
    pending.resolve();
};

/**
 * Put an image in a wrapper without changing where it sits or how big it is.
 *
 * An inline image gets an inline-block wrapper that takes over its float. If that changes the
 * image's width (a percentage width now measured against the wrapper), or the image is already a
 * block, the wrapper is a block instead.
 *
 * @param {HTMLImageElement} image
 * @returns {HTMLElement} The wrapper.
 */
const wrapImage = (image) => {
    const {display, cssFloat} = window.getComputedStyle(image);
    const width = image.getBoundingClientRect().width;
    const inlineFloat = image.style.cssFloat;

    const wrap = document.createElement('span');
    wrap.className = WRAP_CLASS;
    image.before(wrap);
    wrap.append(image);

    if (!display.startsWith('inline')) {
        wrap.classList.add(WRAP_BLOCK_CLASS);
        return wrap;
    }
    if (cssFloat !== 'none') {
        wrap.style.cssFloat = cssFloat;
        image.style.cssFloat = 'none';
    }
    if (Math.abs(image.getBoundingClientRect().width - width) > 1) {
        wrap.style.cssFloat = '';
        image.style.cssFloat = inlineFloat;
        wrap.classList.add(WRAP_BLOCK_CLASS);
    }
    return wrap;
};

/**
 * Make an image enlargeable if it is shown narrower than it really is.
 *
 * @param {HTMLImageElement} image
 */
const qualifyImage = async(image) => {
    const shown = image.clientWidth;
    const scalable = /\.svg([?#]|$)/i.test(image.src) || /^data:image\/svg/i.test(image.src);
    const eligible = scalable ?
        shown >= config.minImageWidth :
        image.naturalWidth >= config.minImageWidth && shown + 1 < image.naturalWidth;
    if (!eligible) {
        return;
    }

    const pending = new Pending('tiny_c4l/enlarge:qualifyImage');
    const {imageButton} = await getResources();
    const alt = image.getAttribute('alt')?.trim();

    image.classList.add(IMAGE_CLASS);
    if (scalable) {
        image.classList.add(SCALABLE_CLASS);
    }
    const button = addIcon(wrapImage(image), image, imageButton, {image});
    if (alt) {
        button.setAttribute('aria-label', await getString('enlarge_image_named', 'tiny_c4l', alt));
    }
    pending.resolve();
};

/**
 * Look at a loaded image now if it is laid out, or else when it is first shown.
 *
 * @param {HTMLImageElement} image
 */
const measureImage = (image) => {
    if (image.clientWidth > 0) {
        qualifyImage(image);
        return;
    }
    if (!sizeObserver) {
        sizeObserver = new ResizeObserver((entries) => entries.forEach(({target}) => {
            if (target.clientWidth > 0) {
                sizeObserver.unobserve(target);
                qualifyImage(target);
            }
        }));
    }
    sizeObserver.observe(image);
};

/**
 * Look at an image once it has loaded.
 *
 * @param {HTMLImageElement} image
 */
const enhanceImage = (image) => {
    if (seen.has(image)) {
        return;
    }
    seen.add(image);

    if (isExcluded(image)) {
        return;
    }
    if (image.complete) {
        measureImage(image);
        return;
    }
    // A lazy image may never load, so only wait on eager ones.
    const pending = image.loading === 'lazy' ? null : new Pending('tiny_c4l/enlarge:loadImage');
    image.addEventListener('load', () => {
        measureImage(image);
        pending?.resolve();
    }, {once: true});
    image.addEventListener('error', () => pending?.resolve(), {once: true});
};

/**
 * Enhance the tables and images in the enlargeable components in or around a node.
 *
 * @param {Node} root
 */
const enhance = (root) => {
    if (!(root instanceof Element)) {
        return;
    }
    const containers = root.closest(config.include) ? [root] : root.querySelectorAll(config.include);
    containers.forEach((container) => {
        if (config.tables) {
            container.querySelectorAll('table').forEach(enhanceTable);
        }
        if (config.images) {
            container.querySelectorAll('img').forEach(enhanceImage);
        }
    });
};

/**
 * Copy part of the page for the modal, without its ids, scripts or enlarge controls.
 *
 * @param {HTMLElement} element
 * @returns {HTMLElement}
 */
const cleanCopy = (element) => {
    const copy = element.cloneNode(true);
    copy.removeAttribute('id');
    copy.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    copy.querySelectorAll(`script, .${BUTTON_CLASS}`).forEach((node) => node.remove());
    copy.querySelectorAll(`img.${IMAGE_CLASS}`).forEach((image) => image.classList.remove(IMAGE_CLASS, SCALABLE_CLASS));
    return copy;
};

/**
 * Show a table in the modal.
 *
 * @param {HTMLElement} trigger
 * @param {HTMLTableElement} table
 * @param {HTMLElement} anchor The table, or its C4L wrapper.
 */
const openTable = async(trigger, table, anchor) => {
    const pending = new Pending('tiny_c4l/enlarge:openTable');
    const {strings} = await getResources();
    const caption = textOf(table.caption);
    const title = caption || table.getAttribute('aria-label') || table.getAttribute('title') ||
        strings.enlarge_table_title;

    const copy = cleanCopy(anchor);
    if (caption) {
        // The caption is the modal title, so only screen readers need it on the table too.
        (copy.matches('table') ? copy : copy.querySelector('table')).caption.classList.add('sr-only');
    }

    await EnlargeModal.create({
        title: escapeHtml(title),
        body: `<div class="tiny-c4l-enlarge-table">${copy.outerHTML}</div>`,
        returnElement: trigger,
    });
    pending.resolve();
};

/**
 * Show an image in the modal, with buttons to step through the other enlargeable images.
 *
 * @param {HTMLElement} trigger
 * @param {HTMLImageElement} image
 */
const openImage = async(trigger, image) => {
    const pending = new Pending('tiny_c4l/enlarge:openImage');
    const {strings} = await getResources();
    const images = Array.from(document.querySelectorAll(`img.${IMAGE_CLASS}`))
        .filter((candidate) => !candidate.closest(`.${DIALOG_CLASS}`));
    const gallery = images.length > 1;

    const {html} = await Templates.renderForPromise('tiny_c4l/enlarge_image', {gallery});
    const modal = await EnlargeModal.create({title: '', body: html, returnElement: trigger});
    const body = modal.getBody()[0];
    const shownImage = body.querySelector('[data-region="image"]');
    const original = body.querySelector('[data-region="original"]');
    const position = body.querySelector('[data-region="position"]');
    const previous = body.querySelector('[data-action="previous"]');
    const next = body.querySelector('[data-action="next"]');
    let index = images.indexOf(image);

    const show = async(newIndex) => {
        index = newIndex;
        const current = images[index];

        shownImage.src = current.src;
        if (current.srcset) {
            shownImage.srcset = current.srcset;
            shownImage.sizes = '95vw';
        } else {
            shownImage.removeAttribute('srcset');
            shownImage.removeAttribute('sizes');
        }
        shownImage.alt = current.alt;
        shownImage.classList.toggle(SCALABLE_CLASS, current.classList.contains(SCALABLE_CLASS));

        original.href = current.src;
        original.hidden = current.src.startsWith('data:');

        const figure = current.parentElement.closest('figure');
        modal.setTitle(escapeHtml(textOf(figure?.querySelector('figcaption')) || current.alt.trim() ||
            strings.enlarge_image_title));

        if (gallery) {
            // Keep focus in the modal when the focused button is disabled at either end.
            const focused = document.activeElement;
            previous.disabled = index === 0;
            next.disabled = index === images.length - 1;
            if (focused?.disabled) {
                (focused === previous ? next : previous).focus();
            }
            position.textContent = await getString('enlarge_position', 'tiny_c4l',
                {current: index + 1, total: images.length});
        }
    };

    if (gallery) {
        const step = (offset) => {
            const newIndex = index + offset;
            if (newIndex >= 0 && newIndex < images.length) {
                show(newIndex);
            }
        };
        body.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            if (action === 'previous' || action === 'next') {
                step(action === 'next' ? 1 : -1);
            }
        });
        modal.getRoot()[0].addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                step(e.key === 'ArrowRight' ? 1 : -1);
            }
        });
    }

    await show(index);
    pending.resolve();
};

/**
 * Start enhancing tables and images on the page.
 *
 * @param {object} options Configuration from \tiny_c4l\hook_callbacks.
 * @param {boolean} options.tables Whether tables are enlargeable.
 * @param {boolean} options.images Whether images are enlargeable.
 * @param {number} options.minImageWidth Smallest natural width of an enlargeable image.
 * @param {string} options.include Selector for the enlargeable components.
 * @param {string} options.exclude Selector for tables and images to leave alone.
 */
export const init = (options) => {
    config = {...options, include: options.include.trim(), exclude: options.exclude.trim()};
    if (config.include === '') {
        return;
    }
    if (!isValidSelector(config.include) || (config.exclude !== '' && !isValidSelector(config.exclude))) {
        window.console.warn('tiny_c4l/enlarge: the enlargeable components or exclude setting is not a valid CSS selector.');
        return;
    }

    // The icon buttons are the keyboard route; clicking an enlargeable image is a mouse shortcut.
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest?.(`.${BUTTON_CLASS}, img.${IMAGE_CLASS}`);
        if (!trigger || trigger.closest(`.${DIALOG_CLASS}`)) {
            return;
        }
        e.preventDefault();
        const target = trigger.matches('img') ? {image: trigger} : targets.get(trigger);
        if (target?.table) {
            openTable(trigger, target.table, target.anchor);
        } else if (target?.image) {
            openImage(trigger, target.image);
        }
    });

    // Content loaded later, such as a Page shown inline on a Snap course page.
    document.addEventListener(filterEventTypes.filterContentUpdated, (e) => {
        Array.from(e.detail.nodes).forEach(enhance);
    });

    enhance(document.body);
};
