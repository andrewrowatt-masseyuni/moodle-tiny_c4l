# Changelog — Fork of reskit/moodle-tiny_c4l

This file records fork-specific changes. All notable changes to this fork will be documented in this file.

## [Unreleased]
### Added
- Added AI Assessment Framework options
- Added Accordion components (native details/summary, no style, Style 1 or Style 2) with a context toolbar to change the style, stack accordions, insert space, move and delete them
- The emphasis and button components have the "Change to" context toolbar to change their colour, like the activities
- C4L tables have a "Change to" menu on TinyMCE's table toolbar to change their colour and put their caption above, below or remove it
- Any other table can be made a C4L table (yellow or grey) from TinyMCE's table toolbar
- Any image not already in a figure can be made a full-width C4L figure, with or without a caption, from the image toolbar
- Added "Stack of 2", "Stack of 3" and "Stack of 4" options to the Accordion components, inserting that many accordions of the chosen style
- Added "Caption above" and "Caption below" options to the Massey Table (Yellow) and Table (Grey) components, like the Figure caption; the two options switch each other off
- Added an enlarge icon to the C4L Table and Figure components in rendered content, opening the table or image in a large overlay; images can be stepped through and opened at full size. Configurable under "Enlarge tables and images" in the plugin settings (#25)
- Describe new features added in this fork. (Link to commit/PR: https://github.com/<your>/moodle-tiny_c4l/commit/abcd1234)

### Changed
- Colour variants are exclusive (choosing one switches the others off) and remembered between sessions; blue is shown as chosen by default. The colour sets are now blue/green/grey and teal/violet/yellow
- Describe behavioral or configuration changes specific to the fork. (e.g., "Adjusted build to support Node 18" — link to branch/commit)

### Fixed
- Bugfixes that are fork-specific. Link to commits/PRs where possible.

### Removed
- Items intentionally removed for the fork.

## [v0.0.1-fork] - 2025-10-21
### Added
- Initial fork notes and local build tweaks.

---

Notes
- When a change is accepted upstream, add a short cross-reference like: "Merged upstream in reskit/moodle-tiny_c4l commit <sha>."
- For visibility, include a short note in your README.FORK.md linking to this CHANGELOG.FORK.md.
