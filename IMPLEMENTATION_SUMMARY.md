# Cut/Copy/Paste Feature Implementation - Summary

## Overview
This PR implements Cut, Copy, and Paste functionality for C4L components within the TinyMCE editor, allowing users to easily move and duplicate components without recreating them.

## Implementation Summary

### Files Changed/Added (7 files, +878 lines)

#### New Files
1. **amd/src/clipboard.js** (201 lines)
   - Core clipboard utilities module
   - Functions to detect C4L components in DOM
   - Cut/Copy/Paste operations with localStorage/sessionStorage
   - Handles nested components correctly

2. **amd/doc/CLIPBOARD_FEATURE.md** (102 lines)
   - Complete feature documentation
   - User workflows and technical details
   - Future enhancement ideas

3. **tests/CLIPBOARD_TEST_PLAN.md** (158 lines)
   - Comprehensive test scenarios
   - Expected behaviors for all operations
   - Edge cases and nested component handling

4. **tests/manual/clipboard-test.html** (250 lines)
   - Interactive manual test page
   - Sample C4L components for testing
   - Visual feedback for operations

#### Modified Files
5. **lang/en/tiny_c4l.php** (+8 lines)
   - Added 7 new language strings for clipboard operations
   - Success/error messages for user feedback

6. **templates/modal.mustache** (+13 lines)
   - Added footer section with Cut/Copy/Paste buttons
   - Buttons use Moodle's standard button styling

7. **amd/src/ui.js** (+146 lines)
   - Imported clipboard module and Notification module
   - Added setupClipboardButtons function
   - Added clipboard operation handlers
   - Integrated clipboard strings into getAllStrings
   - Button state management

## Key Features

### 1. Cut Operation
- Enabled when cursor is inside a C4L component
- Removes component from editor
- Stores HTML in localStorage (sessionStorage fallback)
- Wrapped in undo transaction (can be undone with Ctrl+Z)
- Shows success notification with instructions

### 2. Copy Operation
- Enabled when cursor is inside a C4L component
- Leaves original component in place
- Stores HTML in localStorage (sessionStorage fallback)
- Shows success notification with instructions

### 3. Paste Operation
- Enabled when clipboard contains a C4L component
- Inserts component at cursor position
- Wrapped in undo transaction (can be undone)
- Auto-closes modal after paste
- Shows success notification

### 4. Nested Component Handling
- Intelligently detects nearest C4L component
- When cursor in nested component → selects only that component
- When cursor in outer component → selects entire tree including nested components
- Uses DOM traversal to find components with `c4lv-*` classes

### 5. Button State Management
- Cut/Copy disabled when not in a C4L component
- Paste disabled when clipboard is empty
- States updated when modal opens

### 6. User Feedback
- Clear success messages using Moodle notifications
- Error messages for invalid operations
- Instructions on next steps for cut/copy operations

## Technical Highlights

### Component Detection
- Traverses DOM tree upward from cursor position
- Identifies components by CSS class prefix `c4lv-*`
- Returns nearest parent component

### Storage Strategy
- Primary: localStorage (persists across sessions)
- Fallback: sessionStorage (session only)
- Stores raw HTML (no JSON encoding needed)

### Undo Support
- Cut operation wrapped in `editor.undoManager.transact()`
- Paste operation wrapped in `editor.undoManager.transact()`
- Users can undo clipboard operations with standard shortcuts

### Code Quality
- Clean, well-documented code
- Follows Moodle coding standards
- No CodeQL security alerts
- Addresses all code review feedback

## Testing

### Manual Testing
- Interactive test page created (`tests/manual/clipboard-test.html`)
- Can test all operations in isolation
- Visual feedback for success/failure
- Sample nested components included

### Test Coverage
- Comprehensive test plan with 8 scenarios
- Simple component operations
- Nested component operations
- Error cases (no component, empty clipboard)
- Button state verification

### Security
- CodeQL scan completed: 0 alerts
- HTML content from trusted source (editor content)
- No XSS vulnerabilities introduced

## Future Enhancements
Documented in CLIPBOARD_FEATURE.md:
- Visual indicator for selected component
- Keyboard shortcuts (Ctrl+X, Ctrl+C, Ctrl+V)
- Preview of clipboard content
- Multiple component selection
- Cross-editor clipboard

## Build Requirements
- JavaScript source files need to be built with grunt in Moodle environment
- Command: `grunt amd` from Moodle root
- This generates minified files in `amd/build/` directory

## Installation Notes
1. Install plugin in Moodle
2. Run `grunt amd` to build JavaScript modules
3. Clear Moodle caches
4. Test functionality in TinyMCE editor

## User Documentation
Users will see:
- Three new buttons in C4L modal footer: Cut, Copy, Paste
- Button enabled/disabled based on context
- Clear notification messages guiding them through operations
- Standard undo support for all clipboard operations

## Backwards Compatibility
- No breaking changes
- All existing functionality preserved
- New feature is additive only
- No database changes required
- No settings or configuration needed

## Issue Resolution
This PR fully addresses the issue requirements:
- ✅ Cut/Copy/Paste buttons added to modal footer
- ✅ Buttons enabled/disabled based on cursor position
- ✅ Private clipboard using localStorage
- ✅ User feedback with notifications and instructions
- ✅ Nested component handling (nearest component selected)
- ✅ Test documentation created (manual test infrastructure)
