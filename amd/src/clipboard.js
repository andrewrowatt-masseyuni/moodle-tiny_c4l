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
 * Tiny C4L Clipboard utilities.
 *
 * @module      tiny_c4l/clipboard
 * @copyright   2022 Marc Català <reskit@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

const C4L_CLIPBOARD_KEY = 'c4lClipboard';

/**
 * Find the nearest C4L component relative to the current selection.
 *
 * @param {TinyMCE.Editor} editor The TinyMCE editor instance
 * @return {Element|null} The nearest C4L component element or null
 */
export const findNearestC4LComponent = (editor) => {
    const selection = editor.selection;
    let node = selection.getNode();

    // Traverse up the DOM tree to find a C4L component
    while (node && node !== editor.getBody()) {
        // Check if the current node is a C4L component
        if (node.nodeType === 1) { // Element node
            const classList = Array.from(node.classList || []);
            if (classList.some(cls => cls.startsWith('c4lv-'))) {
                return node;
            }
        }
        node = node.parentNode;
    }

    return null;
};

/**
 * Check if the cursor is currently within a C4L component.
 *
 * @param {TinyMCE.Editor} editor The TinyMCE editor instance
 * @return {boolean} True if cursor is in a C4L component
 */
export const isCursorInC4LComponent = (editor) => {
    return findNearestC4LComponent(editor) !== null;
};

/**
 * Get the HTML of the nearest C4L component (including nested components).
 *
 * @param {TinyMCE.Editor} editor The TinyMCE editor instance
 * @return {string|null} The HTML of the component or null if not found
 */
export const getC4LComponentHTML = (editor) => {
    const component = findNearestC4LComponent(editor);
    if (!component) {
        return null;
    }
    return component.outerHTML;
};

/**
 * Copy a C4L component to the clipboard.
 *
 * @param {TinyMCE.Editor} editor The TinyMCE editor instance
 * @return {boolean} True if copy was successful
 */
export const copyC4LComponent = (editor) => {
    const html = getC4LComponentHTML(editor);
    if (!html) {
        return false;
    }

    try {
        localStorage.setItem(C4L_CLIPBOARD_KEY, html);
        return true;
    } catch (e) {
        // Fallback to sessionStorage if localStorage is not available
        try {
            sessionStorage.setItem(C4L_CLIPBOARD_KEY, html);
            return true;
        } catch (e2) {
            return false;
        }
    }
};

/**
 * Cut a C4L component (copy and remove from editor).
 *
 * @param {TinyMCE.Editor} editor The TinyMCE editor instance
 * @return {boolean} True if cut was successful
 */
export const cutC4LComponent = (editor) => {
    const component = findNearestC4LComponent(editor);
    if (!component) {
        return false;
    }

    // First copy the component
    if (!copyC4LComponent(editor)) {
        return false;
    }

    // Wrap removal in undo transaction so it can be undone
    editor.undoManager.transact(() => {
        editor.dom.remove(component);
    });
    return true;
};

/**
 * Check if the clipboard has content.
 *
 * @return {boolean} True if clipboard has content
 */
export const hasClipboardContent = () => {
    try {
        const content = localStorage.getItem(C4L_CLIPBOARD_KEY);
        if (content) {
            return true;
        }
    } catch (e) {
        // Ignore localStorage errors
    }

    try {
        const content = sessionStorage.getItem(C4L_CLIPBOARD_KEY);
        if (content) {
            return true;
        }
    } catch (e) {
        // Ignore sessionStorage errors
    }

    return false;
};

/**
 * Paste a C4L component from the clipboard.
 *
 * @param {TinyMCE.Editor} editor The TinyMCE editor instance
 * @return {boolean} True if paste was successful
 */
export const pasteC4LComponent = (editor) => {
    let html = null;

    try {
        html = localStorage.getItem(C4L_CLIPBOARD_KEY);
    } catch (e) {
        // Try sessionStorage if localStorage fails
    }

    if (!html) {
        try {
            html = sessionStorage.getItem(C4L_CLIPBOARD_KEY);
        } catch (e) {
            // Both storage methods failed
        }
    }

    if (!html) {
        return false;
    }

    // Wrap insertion in undo transaction so it can be undone
    editor.undoManager.transact(() => {
        editor.selection.setContent(html);
    });
    return true;
};

/**
 * Clear the clipboard.
 */
export const clearClipboard = () => {
    try {
        localStorage.removeItem(C4L_CLIPBOARD_KEY);
    } catch (e) {
        // Ignore errors
    }

    try {
        sessionStorage.removeItem(C4L_CLIPBOARD_KEY);
    } catch (e) {
        // Ignore errors
    }
};
