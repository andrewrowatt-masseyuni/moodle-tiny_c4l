# Supplementary README — Fork of reskit/moodle-tiny_c4l

Note: This file is supplementary to the upstream README.md and exists only in this fork. It documents the purpose of this fork, any fork-specific changes, and instructions related to synchronizing with upstream.

Fork owner
- GitHub: andrewrowatt-masseyuni
- Created: 2025-10-20

Purpose of this fork
- Short summary of why this fork exists (e.g., experimenting with integrations, local deployment changes, custom TinyMCE components for a course).
- Whether changes will be proposed upstream via PRs or kept private here.

Key differences from upstream
- List of high-level changes:
  - Added additional hard-coded components based on existing Stream templates
- For detailed diffs, see commits or branch notes.

Keeping this fork in sync with upstream
- Add upstream (run once):
  git remote add upstream https://github.com/reskit/moodle-tiny_c4l.git
  git fetch upstream
- Update local main (example if upstream uses `main`):
  git checkout main
  git pull --rebase upstream main
  # Resolve conflicts if any, then push to this fork's origin:
  git push origin main
- If upstream uses `master`, substitute `master` for `main`.

License
- This fork follows the same license as upstream. See LICENSE in the upstream repository.

Contact
- GitHub: @andrewrowatt-masseyuni
- Email: A.J.Rowatt@massey.ac.nz

Change log
- See branch names / commits for history of fork-specific changes.