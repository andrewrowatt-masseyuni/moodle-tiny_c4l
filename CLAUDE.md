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

**Test scenarios:**
1. **basic.feature**: Tests embedding a "Tip" component via the C4L button
2. **basic.massey.feature**: Tests embedding "AI Assessment Scale" component with "No AI" option

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
│   ├── plugininfo.php       # Plugin info class
│   └── privacy/
│       └── provider.php     # Privacy API implementation
│
├── db/
│   └── access.php           # Capability definitions
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
- SCSS files are compiled by Moodle's theme system
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
