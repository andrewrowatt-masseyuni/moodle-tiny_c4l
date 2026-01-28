# Clipboard Functionality Test Plan

## Overview
This document describes the test scenarios for the Cut/Copy/Paste functionality for C4L components.

## Test Scenarios

### Test 1: Cut Operation - Simple Component
**Setup:**
1. Create a TinyMCE editor with a simple C4L component (e.g., Tip component)
2. Place cursor inside the Tip component

**Steps:**
1. Click the C4L button to open the modal
2. Verify that the Cut button is enabled
3. Click the Cut button
4. Verify success notification appears with message: "Component cut! Close this dialog, move to the new location, click C4L, and select Paste."
5. Verify the component is removed from the editor
6. Verify localStorage contains the component HTML

**Expected Result:**
- Component is removed from editor
- Clipboard contains the component HTML
- Success notification is shown

### Test 2: Copy Operation - Simple Component
**Setup:**
1. Create a TinyMCE editor with a simple C4L component (e.g., Key Concept component)
2. Place cursor inside the Key Concept component

**Steps:**
1. Click the C4L button to open the modal
2. Verify that the Copy button is enabled
3. Click the Copy button
4. Verify success notification appears with message: "Component copied! Close this dialog, move to the new location, click C4L, and select Paste."
5. Verify the component is still in the editor
6. Verify localStorage contains the component HTML

**Expected Result:**
- Component remains in editor
- Clipboard contains the component HTML
- Success notification is shown

### Test 3: Paste Operation
**Setup:**
1. Have a C4L component in the clipboard (from Test 1 or 2)
2. Place cursor at a new location in the editor

**Steps:**
1. Click the C4L button to open the modal
2. Verify that the Paste button is enabled
3. Click the Paste button
4. Verify success notification appears with message: "Component pasted successfully."
5. Verify the modal closes
6. Verify the component is inserted at the cursor location

**Expected Result:**
- Component is pasted at cursor position
- Modal closes automatically
- Success notification is shown

### Test 4: Nested Components - Cut Operation
**Setup:**
1. Create a C4L component that contains another C4L component (nested)
2. Place cursor in the outer component (not in the nested one)

**Steps:**
1. Click the C4L button to open the modal
2. Click the Cut button
3. Verify the entire outer component (including nested component) is in clipboard

**Expected Result:**
- Both outer and nested components are cut
- Clipboard contains both components

### Test 5: Nested Components - Cursor in Inner Component
**Setup:**
1. Create a C4L component that contains another C4L component (nested)
2. Place cursor in the INNER/nested component

**Steps:**
1. Click the C4L button to open the modal
2. Click the Cut button
3. Verify only the nearest (inner) component is in clipboard

**Expected Result:**
- Only the nearest component (inner) is cut
- Outer component remains

### Test 6: Cut/Copy When No Component Selected
**Setup:**
1. Place cursor outside any C4L component

**Steps:**
1. Click the C4L button to open the modal
2. Verify that Cut button is disabled
3. Verify that Copy button is disabled

**Expected Result:**
- Cut button is disabled
- Copy button is disabled

### Test 7: Paste When Clipboard is Empty
**Setup:**
1. Clear localStorage/sessionStorage
2. Place cursor anywhere in editor

**Steps:**
1. Click the C4L button to open the modal
2. Verify that Paste button is disabled

**Expected Result:**
- Paste button is disabled

### Test 8: Button State Updates
**Setup:**
1. Have various editor states

**Steps:**
1. Open modal with cursor outside C4L component
   - Verify Cut/Copy disabled, Paste enabled/disabled based on clipboard
2. Close modal, move cursor inside C4L component, reopen modal
   - Verify Cut/Copy enabled
3. Perform copy, reopen modal
   - Verify Paste enabled

**Expected Result:**
- Button states correctly reflect current context

## Component Classes Used for Detection
The following CSS class prefix is used to identify C4L components:
- `c4lv-*` (e.g., `c4lv-keyconcept`, `c4lv-tip`, `c4lv-reminder`)

## Sample Component HTML

### Simple Tip Component
```html
<div class="c4lv-tip" aria-label="Tip">
  <p>This is a helpful tip for students.</p>
</div>
```

### Nested Components Example
```html
<div class="c4lv-readingcontext" aria-label="Reading context">
  <p>Outer reading context component</p>
  <div class="c4lv-quote" aria-label="Quote">
    <p>This is a nested quote inside the reading context.</p>
  </div>
  <p>More content in outer component</p>
</div>
```

## Notes
- Clipboard uses localStorage as primary storage, sessionStorage as fallback
- Component detection traverses up the DOM tree to find nearest parent with `c4lv-*` class
- Nested components are included in cut/copy operations when the cursor is in the outer component
- User feedback is provided via Moodle notifications
