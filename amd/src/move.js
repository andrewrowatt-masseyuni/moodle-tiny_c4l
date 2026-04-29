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
 * Tiny C4L Move controls.
 *
 * Adds hover-revealed up/down arrow buttons to top-level C4L components
 * (direct children of the editor body whose class includes "mu-c4l").
 * Clicking an arrow swaps the component with its previous/next element
 * sibling at the editor-body level in a single undo step.
 *
 * @module      tiny_c4l/move
 * @copyright   2026 Massey University
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_string as getString} from 'core/str';

const COMPONENT_SELECTOR = 'div.mu-c4l';
const CONTROLS_CLASS = 'c4l-move-controls';
const UP_CLASS = 'c4l-move-up';
const DOWN_CLASS = 'c4l-move-down';

const noop = () => {
    return;
};

const UP_ARROW_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">' +
    '<path fill="currentColor" d="M8 3.5 2.5 9l1.06 1.06L8 5.62l4.44 4.44L13.5 9z"/></svg>';

const DOWN_ARROW_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">' +
    '<path fill="currentColor" d="M8 12.5 13.5 7l-1.06-1.06L8 10.38 3.56 5.94 2.5 7z"/></svg>';

const isTopLevelComponent = (editor, node) => {
    if (!node || node.nodeType !== 1) {
        return false;
    }
    if (!node.classList || !node.classList.contains('mu-c4l')) {
        return false;
    }
    return node.parentNode === editor.getBody();
};

const buildControlsTemplate = (upLabel, downLabel) => {
    const wrapper = document.createElement('div');
    wrapper.className = CONTROLS_CLASS;
    wrapper.setAttribute('data-mce-bogus', 'all');
    wrapper.setAttribute('contenteditable', 'false');

    const upButton = document.createElement('button');
    upButton.type = 'button';
    upButton.className = UP_CLASS;
    upButton.tabIndex = -1;
    upButton.setAttribute('aria-label', upLabel);
    upButton.setAttribute('title', upLabel);
    upButton.innerHTML = UP_ARROW_SVG;

    const downButton = document.createElement('button');
    downButton.type = 'button';
    downButton.className = DOWN_CLASS;
    downButton.tabIndex = -1;
    downButton.setAttribute('aria-label', downLabel);
    downButton.setAttribute('title', downLabel);
    downButton.innerHTML = DOWN_ARROW_SVG;

    wrapper.appendChild(upButton);
    wrapper.appendChild(downButton);
    return wrapper;
};

const ensureControls = (editor, controlsTemplate) => {
    if (editor.mode && typeof editor.mode.get === 'function' && editor.mode.get() === 'readonly') {
        return;
    }
    const body = editor.getBody();
    if (!body) {
        return;
    }
    const wasDirty = editor.isDirty();
    editor.undoManager.ignore(() => {
        Array.from(body.children).forEach((child) => {
            if (!isTopLevelComponent(editor, child)) {
                return;
            }
            if (child.querySelector(`:scope > .${CONTROLS_CLASS}`)) {
                return;
            }
            child.appendChild(controlsTemplate.cloneNode(true));
        });
    });
    if (!wasDirty) {
        editor.setDirty(false);
    }
};

const updateDisabledState = (component) => {
    const controls = component.querySelector(`:scope > .${CONTROLS_CLASS}`);
    if (!controls) {
        return;
    }
    const upButton = controls.querySelector(`.${UP_CLASS}`);
    const downButton = controls.querySelector(`.${DOWN_CLASS}`);
    if (upButton) {
        upButton.disabled = !component.previousElementSibling;
    }
    if (downButton) {
        downButton.disabled = !component.nextElementSibling;
    }
};

const moveComponent = (editor, component, direction) => {
    const parent = component.parentNode;
    if (!parent || parent !== editor.getBody()) {
        return;
    }
    const sibling = direction === 'up'
        ? component.previousElementSibling
        : component.nextElementSibling;
    if (!sibling) {
        return;
    }
    const bookmark = editor.selection.getBookmark(2);
    editor.undoManager.transact(() => {
        if (direction === 'up') {
            parent.insertBefore(component, sibling);
        } else {
            parent.insertBefore(sibling, component);
        }
    });
    try {
        editor.selection.moveToBookmark(bookmark);
    } catch (e) {
        // Bookmark may be invalid if the moved subtree contained the selection
        // and the editor relocated it; safe to ignore.
    }
    editor.nodeChanged();
};

/**
 * Initialise hover-revealed move controls for the given editor.
 *
 * @param {object} editor TinyMCE editor instance
 * @return {Function} Cleanup function that removes listeners
 */
export const setupMoveControls = async(editor) => {
    const [upLabel, downLabel] = await Promise.all([
        getString('move_component_up', 'tiny_c4l'),
        getString('move_component_down', 'tiny_c4l'),
    ]);

    const controlsTemplate = buildControlsTemplate(upLabel, downLabel);
    const body = editor.getBody();
    if (!body) {
        return noop;
    }

    const refresh = () => ensureControls(editor, controlsTemplate);
    refresh();

    const onContentChange = () => refresh();
    editor.on('SetContent Undo Redo', onContentChange);

    const onMouseOver = (event) => {
        const target = event.target;
        if (!target || target.nodeType !== 1) {
            return;
        }
        const component = target.closest(COMPONENT_SELECTOR);
        if (component && isTopLevelComponent(editor, component)) {
            updateDisabledState(component);
        }
    };
    body.addEventListener('mouseover', onMouseOver);

    const onClick = (event) => {
        const target = event.target;
        if (!target || target.nodeType !== 1) {
            return;
        }
        const button = target.closest(`.${UP_CLASS}, .${DOWN_CLASS}`);
        if (!button) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (button.disabled) {
            return;
        }
        const componentEl = button.closest(COMPONENT_SELECTOR);
        if (!componentEl || !isTopLevelComponent(editor, componentEl)) {
            return;
        }
        const direction = button.classList.contains(UP_CLASS) ? 'up' : 'down';
        moveComponent(editor, componentEl, direction);
        // After moving, the same component is still hovered; refresh disabled state.
        updateDisabledState(componentEl);
    };
    body.addEventListener('click', onClick);

    return () => {
        editor.off('SetContent Undo Redo', onContentChange);
        body.removeEventListener('mouseover', onMouseOver);
        body.removeEventListener('click', onClick);
    };
};
