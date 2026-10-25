# Tiny C4L Plugin - Claude Context

## Project Overview

**Plugin Name**: `tiny_c4l` (Components for Learning)
**Type**: TinyMCE Editor Plugin for Moodle
**Version**: 3.0.3
**Author**: Marc Català <reskit@gmail.com>
**License**: GNU GPL v3 or later

**Repository**: https://github.com/andrewrowatt-masseyuni/moodle-tiny_c4l
**Moodle Version**: 4.5 (MOODLE_405_STABLE)

## Environment Setup

### Docker Configuration

This project uses moodle-docker. Required environment variables:

```bash
export COMPOSE_PROJECT_NAME=moodle405_c4l
export MOODLE_DOCKER_WWWROOT=/home/arowatt/moodle405_c4l
export MOODLE_DOCKER_DB=pgsql
```

### Docker Containers

- **webserver**: `moodlehq/moodle-php-apache:8.1` (http://localhost:8053)
- **db**: `postgres:14` (port 5453)
- **selenium**: `selenium/standalone-chrome:4` (VNC port 5953)
- **mailpit**: `axllent/mailpit:v1.10`
- **exttests**: `moodlehq/moodle-exttests`

### Docker Compose Path

```bash
/home/arowatt/moodle-docker/bin/moodle-docker-compose
```

## Testing

### Behat Tests

**IMPORTANT: Before running behat tests, always check for new test files:**

```bash
# Check for all behat test files in the plugin
find lib/editor/tiny/plugins/c4l/tests/behat -name "*.feature"

# Or use glob to list them
ls -la lib/editor/tiny/plugins/c4l/tests/behat/*.feature
```

**Initialize behat environment:**
```bash
/home/arowatt/moodle-docker/bin/moodle-docker-compose exec webserver php admin/tool/behat/cli/init.php
```

**Run behat tests for this plugin:**
```bash
/home/arowatt/moodle-docker/bin/moodle-docker-compose exec -u www-data webserver php admin/tool/behat/cli/run.php --tags=@tiny_c4l --format progress --format moodle_screenshot
```

**IMPORTANT: If behat tests fail:**
1. **First, check the latest faildumps folder** to determine what the fault is
2. Use the commands below to inspect the failure screenshots and HTML dumps
3. The screenshots show the exact state of the page when the test failed

**Behat test files:**
- `tests/behat/basic.feature` - Original scenario testing C4L Tip component embedding
- `tests/behat/basic.massey.feature` - Massey customizations testing AI Assessment Scale component
- `tests/behat/enlarge.massey.feature` - Enlarge C4L tables and figure images on view pages (content made with the page generator, no editor)

**Test scenarios:**
1. **basic.feature**: Tests embedding a "Tip" component via the C4L button
2. **basic.massey.feature**: Tests embedding "AI Assessment Scale" component with "No AI" option, other Massey components, and accordions (saved closed; stacked and restyled from the context toolbar)
   Also: table caption above/below switch each other off, and the saved table has a single caption below it
   Also: the hover move buttons move a figure, procedural context (`<p>`) and tip (`<div>`) up (the step hovers the hidden button itself, as hovering the component then clicking scrolls the mouse off a short component), including a table or figure just made with "Make C4L table" / "Make C4L figure"
3. **enlarge.massey.feature**: C4L table enlarge icon (skips plain, nested, single-column and `c4l-noexpand` tables), image icons and gallery (prev/next, counter, open original), and turning tables off

**New feature files are only picked up after** `php admin/tool/behat/cli/util.php --enable` (or `init.php`).

**Tags:**
- `@editor`
- `@tiny`
- `@editor_tiny`
- `@tiny_c4l`
- `@javascript`
- `@external`

### Behat Failure Screenshots

**Web Access (from host):**
```
http://localhost:8053/_/faildumps/
```

**Web Access (from container):**
```
http://webserver/_/faildumps/
```

**Structure:**
```
/_/faildumps/
├── 20251016_094739/          # Date/time folder (YYYYMMDD_HHMMSS)
│   └── 1-Tiny-editor-components-for-learning/
│       ├── 1-the-following-courses-exist-.html
│       ├── 1-the-following-courses-exist-.png
│       ├── 5-I-am-on-the-PageName1-page-activity-editing-page-logged-in-as-admin.html
│       ├── 5-I-am-on-the-PageName1-page-activity-editing-page-logged-in-as-admin.png
│       └── ... (one .html + .png per behat step)
└── 20251119_111252/
    └── ...
```

**Commands to inspect failures:**

```bash
# Get list of recent failure timestamps (last 5)
/home/arowatt/moodle-docker/bin/moodle-docker-compose exec webserver curl -s http://localhost/_/faildumps/ | grep -o '[0-9]\{8\}_[0-9]\{6\}' | tail -5

# Check latest failure folder (replace YYYYMMDD_HHMMSS with actual timestamp)
/home/arowatt/moodle-docker/bin/moodle-docker-compose exec webserver curl -s "http://localhost/_/faildumps/YYYYMMDD_HHMMSS/"

# View HTML content of a specific failure step
/home/arowatt/moodle-docker/bin/moodle-docker-compose exec webserver curl -s "http://localhost/_/faildumps/YYYYMMDD_HHMMSS/folder/filename.html"

# Search for specific text in failure HTML (e.g., button names)
/home/arowatt/moodle-docker/bin/moodle-docker-compose exec webserver curl -s "http://localhost/_/faildumps/YYYYMMDD_HHMMSS/folder/filename.html" | grep -i "search term"
```

## Plugin Structure

```
lib/editor/tiny/plugins/c4l/
├── version.php              # Plugin version and metadata
├── settings.php             # Plugin settings
├── lib.php                  # Plugin callbacks
├── README.md                # Plugin documentation
├── LICENSE.txt              # GPL license
├── package.json             # NPM dependencies
│
├── classes/
│   ├── hook_callbacks.php   # Loads tiny_c4l/enlarge on every page (before_footer_html_generation)
│   ├── plugininfo.php       # Plugin info class
│   └── privacy/
│       └── provider.php     # Privacy API implementation
│
├── db/
│   ├── access.php           # Capability definitions
│   └── hooks.php            # Hook callback registration
│
├── amd/src/                 # JavaScript modules (AMD format)
│   ├── plugin.js            # Main plugin entry point
│   ├── commands.js          # TinyMCE commands
│   ├── ui.js                # UI components
│   ├── modal.js             # Modal dialogs
│   ├── configuration.js     # Plugin configuration
│   ├── options.js           # Plugin options
│   ├── common.js            # Common utilities
│   ├── variants.js          # Component variants
│   ├── accordion.js         # Accordion context toolbar and open/close filters
│   ├── change.js            # "Change to" context toolbar: icon (activities) and colour (activities, emphasis, buttons)
│   ├── table.js             # C4L table colour/caption menu and "Make C4L table", merged into TinyMCE's table toolbar
│   ├── figure.js            # "Make C4L figure" on plain images, merged into the image toolbar
│   ├── enlarge.js           # VIEW-TIME (not editor): enlarge controls on C4L tables/figure images in rendered content
│   ├── enlarge_modal.js     # Near full-screen core/modal subclass used by enlarge.js
│   └── variantslib.js       # Variants library
│
├── scss/                    # SCSS stylesheets
│   ├── _buttons.scss
│   └── _buttons_variants.scss
│
├── pix/                     # Plugin icons and images
│   ├── icon.svg             # Plugin icon
│   ├── c4l_*.svg            # Component icons
│   ├── variants/            # Variant icons
│   └── noun_project_icons/  # Noun Project icons
│
├── tests/
│   └── behat/
│       ├── basic.feature         # Original behat test (Tip component)
│       └── basic.massey.feature  # Massey customizations (AI Assessment)
│
└── .github/
    ├── workflows/
    │   └── moodle-ci.yml    # CI/CD workflow
    └── ISSUE_TEMPLATE/
        └── bug_report.md    # Bug report template
```

## Plugin Features

The C4L (Components for Learning) plugin provides educational content components:

- **Tip** - Display helpful tips
- **Learning Outcomes** - Show learning objectives
- **Attention** - Highlight important information
- **Example** - Provide examples
- **Quote** - Display quotations
- **Figure** - Add figures with captions
- **Do/Don't Cards** - Show best practices
- **Multipurpose Card** - Generic content cards
- **All Purpose Card** - Flexible content containers
- **Custom Component** - User-defined components
- **Inline Tag** - Inline semantic tags
- **Reading Context** - Reading comprehension aids
- **Procedural Context** - Step-by-step instructions
- **Preview** - Content previews
- **AI Assessment Scale** - Massey customization for AI usage guidelines (No AI, Limited AI, Full AI)
- **Accordion** - Massey customization: native `<details class="mu-c4l c4lv-mu-accordion [mu-style1|mu-style2]">`. Context toolbar (style, stack above/below, space above/below, move, delete); always open in the editor, always saved closed. "Stack of 2/3/4" variants (`mu-stack-*`, `group: "mu-stack"`, ids 108-110) insert that many accordions: their variant HTML is `{{COPY}}` placeholders, which `ui.js` (`expandVariantsHtml`) expands to copies of the chosen component so the copies match its style. HTMLPurifier strips details/summary where Moodle cleans text (e.g. forum posts)
- **Colour variants** - Massey `mu-color-*` variants are in `variants.js` (ids 102-107, `group: "mu-color"`), so only one colour can be chosen and the choice is remembered. Component sets: blue/green/grey and teal/violet/yellow. Blue has `isDefault: true`: no colour class means blue, so the blue toggle shows on whenever no other colour is chosen, choosing it switches the others off and it is never stored (`isDefaultVariant`, `isVariantOn`). Massey variant ids start at 100 so upstream ids can't clash with saved preferences
- **Change to (context toolbar)** - `change.js`: in a mu-activities, emphasis (`c4l-mu-others`) or button (`c4l-mu-buttons`) component, a "Change to" menu switches the colour (all six); activities can also switch the icon. Toolbars only show for the nearest ancestor with any context toolbar
- **C4L table toolbar** - `table.js`: two context toolbars on the `<table>` element itself, so TinyMCE merges them into its own table toolbar (a toolbar on the wrapper div would never show, as the table matches first). In a C4L table (`table` in `div.mu-c4l.mu-table`): "Change to" > Colour (yellow/grey) and Caption (above/below/none, same markup and classes as the caption variants; a new caption gets selected placeholder text). In any other table: "Make C4L table" (C4L icon) wraps it as a yellow or grey C4L table
- **C4L figure from an image** - `figure.js`: a context toolbar on any `<img>` not already in a `<figure>`, merged into tiny_media's image toolbar. "Make C4L figure" (C4L icon) > "Convert to C4L figure" / "Convert to C4L figure with caption" wraps it as a full-width figure (`mu-c4l c4lv-figure c4l-full-width-variant`, plus `c4l-caption-variant` and the caption variant's `figcaption` markup with selected placeholder text). A figure can't sit in a `<p>`, so `dom.split` splits the image's paragraph (or other phrasing ancestors, per `editor.schema.isValidChild`) around it; empty halves are dropped. An image whose parent is a link takes the link into the figure. No conversion back
- **Table captions** - Massey customization: `mu-table` and `mu-table-grey-variant` have "Caption above" / "Caption below" variants (`variants.js` ids 100/101, Massey icons in `pix/mu_icons/variants/caption-*`). Both insert one real `<caption>` straight after `<table>` (`{{VARIANTSHTML}}`); "below" adds `c4l-caption-below-variant` to the wrapper for `caption-side: bottom`. They share `group: "table-caption"`, so the picker switches one off when the other is switched on (`getVariantGroupSiblings`). A table caption can't sit in the picker's preview span, so `ui.js` replaces the preview table's caption directly (`hasTableCaptionVariants`, `setVariantsPreviewHtml`)
- **Enlarge tables and images** (#25) - Massey customization, view-time only, nothing stored in content (HTMLPurifier would strip buttons/ARIA). `db/hooks.php` loads `tiny_c4l/enlarge` on every page; it wraps each table, and each image shown narrower than its natural width, inside the C4L Table and Figure components (`enlargeinclude`, default `div.mu-c4l.mu-table, figure.c4lv-figure`; plain tables and images are left alone) in a `position: relative` `.tiny-c4l-enlarge-wrap` and overlays a round icon button on its top right, dimmed until the wrapper is hovered on hover-capable devices (modelled on Snap's `.snap-expand-link`, no Snap dependency; a ResizeObserver keeps the icon on the table/image corner when it is narrower than the wrapper). Image wrappers are inline-block and take over the image's float, falling back to a block wrapper if wrapping would resize the image. Enlargeable images are also clickable (mouse only; the icon is the keyboard route). Anything matching `enlargeexclude` is skipped (C4L picker previews in `.modal`, the editor UI, links, buttons, labels). Image modal steps through all enlargeable images on the page. Authors opt out with class `c4l-noexpand`. Settings: `enlargetables`, `enlargeimages`, `enlargeminimagewidth`, `enlargeinclude`, `enlargeexclude`. Re-scans on `core_filters/contentUpdated` (Snap loads Page content by AJAX)

### Component Variants

Components support variants for different layouts and styles:
- Alignment (left, center, right)
- Full-width layout
- With/without captions
- Ordered/unordered lists
- Comfort reading mode
- Quote styles
- Do/Don't card modes

## Git Information

**Current Branch**: `MOODLE_405_STABLE`
**Main Branch**: `main` (use for PRs)

**Untracked Files:**
```
lib/editor/tiny/plugins/c4l/
local/codechecker/
local/moodlecheck/
theme/snap/
```

## GitHub Issues

Currently **no open or closed issues** in the fork.

## Development Workflow

1. Make changes to plugin files
2. **If you modified any JavaScript files (.js) in `amd/src/`**: Run grunt to compile AMD modules
   ```bash
   cd /home/arowatt/moodle405_c4l/lib/editor/tiny/plugins/c4l
   grunt --max-lint-warnings=15 amd
   ```
3. Clear Moodle caches: `php admin/cli/purge_caches.php`
4. Run behat tests to verify functionality
5. **If tests fail: Check the latest faildumps folder FIRST to diagnose the issue**
6. Review screenshots and HTML dumps to understand failure context
7. Commit changes and push to GitHub
8. Create pull request to main branch

## Useful Commands

**Enter webserver container:**
```bash
/home/arowatt/moodle-docker/bin/moodle-docker-compose exec webserver bash
```

**Check container status:**
```bash
/home/arowatt/moodle-docker/bin/moodle-docker-compose ps
```

**Clear Moodle caches:**
```bash
/home/arowatt/moodle-docker/bin/moodle-docker-compose exec webserver php admin/cli/purge_caches.php
```

**View container logs:**
```bash
/home/arowatt/moodle-docker/bin/moodle-docker-compose logs -f webserver
```

**Build JavaScript AMD modules (after modifying .js files):**
```bash
cd /home/arowatt/moodle405_c4l/lib/editor/tiny/plugins/c4l
grunt --max-lint-warnings=15 amd
```
Note: This compiles JavaScript files from `amd/src/` into AMD modules that Moodle can use. Must be run after any changes to JavaScript source files.

## Notes for Claude

- **ALWAYS check for new behat test files before running tests** - Use Glob tool to find `lib/editor/tiny/plugins/c4l/tests/behat/*.feature`
- **If behat tests fail: FIRST check the latest faildumps folder** - Use curl commands to inspect HTML/screenshots and determine the exact failure cause
- **After modifying JavaScript files in `amd/src/`: ALWAYS run `grunt --max-lint-warnings=15 amd`** - JavaScript must be compiled to AMD format before changes take effect
- All behat tests use the `@tiny_c4l` tag
- Screenshots are accessible via curl from within the webserver container
- Plugin follows Moodle coding standards (check with local/codechecker)
- JavaScript uses AMD module format (not ES6 modules)
- `styles.css` (view pages) and `editor_styles.css` (editor iframe) are HAND-EDITED below their compressed first line; do NOT run `npm run sass`, it would wipe the Massey styles. The `scss/` sources are stale upstream copies
- Plugin integrates with TinyMCE 6.x editor
- Privacy API is implemented (GDPR compliance)

## Quick Reference

| Item | Value |
|------|-------|
| Plugin Component | `tiny_c4l` |
| Plugin Path | `/home/arowatt/moodle405_c4l/lib/editor/tiny/plugins/c4l` |
| Moodle Root | `/home/arowatt/moodle405_c4l` |
| Web URL | http://localhost:8053 |
| Screenshots | http://localhost:8053/_/faildumps/ |
| DB Type | PostgreSQL |
| PHP Version | 8.1 |
| Moodle Version | 4.5.7+ |
