# C4L Clipboard Feature

## Overview
The clipboard feature allows users to cut, copy, and paste C4L components within the TinyMCE editor. This makes it easier to move and duplicate components without having to recreate them.

## Features

### Cut Component
- **Button**: Cut
- **When Enabled**: When the cursor is positioned inside a C4L component
- **Action**: Removes the component from the editor and stores it in the clipboard
- **User Feedback**: "Component cut! Close this dialog, move to the new location, click C4L, and select Paste."

### Copy Component
- **Button**: Copy
- **When Enabled**: When the cursor is positioned inside a C4L component
- **Action**: Copies the component to the clipboard while leaving the original in place
- **User Feedback**: "Component copied! Close this dialog, move to the new location, click C4L, and select Paste."

### Paste Component
- **Button**: Paste
- **When Enabled**: When the clipboard contains a C4L component
- **Action**: Inserts the clipboard component at the current cursor position and closes the dialog
- **User Feedback**: "Component pasted successfully."

## Nested Components
The clipboard feature intelligently handles nested components:
- When the cursor is inside a nested component, only that component is cut/copied
- When the cursor is in an outer component (but not in a nested one), the entire outer component including all nested components is cut/copied

## Technical Details

### Storage
- Uses **localStorage** as the primary storage mechanism
- Falls back to **sessionStorage** if localStorage is unavailable
- Data persists across browser sessions when using localStorage

### Component Detection
- Components are identified by CSS classes starting with `c4lv-`
- Examples: `c4lv-tip`, `c4lv-keyconcept`, `c4lv-quote`
- The algorithm traverses up the DOM tree to find the nearest parent element with a C4L class

### Undo Support
- Cut and paste operations are wrapped in TinyMCE undo transactions
- Users can undo clipboard operations using Ctrl+Z (or Cmd+Z on Mac)

### Button States
- Button enabled/disabled states are determined when the modal opens
- Cut/Copy buttons are disabled when cursor is not in a C4L component
- Paste button is disabled when clipboard is empty

## User Workflow

### Moving a Component
1. Position cursor inside the component you want to move
2. Click the C4L button to open the modal
3. Click **Cut**
4. Close the modal
5. Position cursor at the desired new location
6. Click the C4L button again
7. Click **Paste**

### Duplicating a Component
1. Position cursor inside the component you want to duplicate
2. Click the C4L button to open the modal
3. Click **Copy**
4. Close the modal
5. Position cursor at the desired location
6. Click the C4L button again
7. Click **Paste**
8. (Optional) Repeat steps 5-7 to paste multiple times

## Language Strings
The following language strings are used:
- `clipboard_cut` - Button label for Cut
- `clipboard_copy` - Button label for Copy
- `clipboard_paste` - Button label for Paste
- `clipboard_cut_success` - Success message for cut operation
- `clipboard_copy_success` - Success message for copy operation
- `clipboard_paste_success` - Success message for paste operation
- `clipboard_no_component` - Error when no component is found at cursor
- `clipboard_empty` - Error when clipboard is empty

## Files Modified/Created

### New Files
- `amd/src/clipboard.js` - Clipboard utility module with all clipboard operations
- `tests/CLIPBOARD_TEST_PLAN.md` - Comprehensive test plan for clipboard functionality
- `amd/doc/CLIPBOARD_FEATURE.md` - This documentation file

### Modified Files
- `lang/en/tiny_c4l.php` - Added clipboard language strings
- `templates/modal.mustache` - Added Cut/Copy/Paste buttons to modal footer
- `amd/src/ui.js` - Integrated clipboard functionality with modal

## Future Enhancements
Possible future improvements:
- Visual indicator showing which component is selected for cut/copy
- Keyboard shortcuts (Ctrl+X, Ctrl+C, Ctrl+V)
- Preview of clipboard content in the modal
- Support for copying multiple components at once
- Cross-editor clipboard (paste from one editor to another)
