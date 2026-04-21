# DORO V4 Implementation Phases

## Overview

This plan converts the current repo from a general kit portal into a QR-entry student build guide that matches the Notion feedback and the V4 workflow pack.

## Phase Sequence

### Phase 1. Feedback analysis and planning

- Outputs:
  - `01-notion-feedback-analysis.md`
  - `02-issue-backlog.md`
  - `03-asset-and-data-plan.md`
  - `04-implementation-phases.md`
- Rule:
  - no site code edits

### Phase 2. Reference manifest and tooling

- Outputs:
  - `tools/build_reference_manifest.py`
  - `tools/extract_pptx_assets.py`
  - `assets/data/reference-manifest.json`
  - `docs/feedback-v4/05-reference-manifest-report.md`
- Goal:
  - verify what source media exists for each kit before changing public pages

### Phase 3. Learning flow and TOC rebuild

- Outputs:
  - new section structure across all detail pages
  - TOC that only targets valid in-page anchors
  - safety gate shell logic
- Goal:
  - get the page order right before adding heavy content

### Phase 4. Quest briefs

- Outputs:
  - `assets/js/quest-briefs.js`
  - top-of-page background and mission card UI
- Goal:
  - make each kit understandable even for students who do not know DOROLAND

### Phase 5. Assembly assets and build guide UI

- Outputs:
  - `assets/js/assembly-guides.js`
  - optimized assembly images
  - part images
  - compressed assembly/demo videos where verified and needed
- Goal:
  - replace generic lesson blocks with real build guidance

### Phase 6. Troubleshooting, safety, science rewrite

- Outputs:
  - child-friendly troubleshooting
  - actual safety checklist content
  - science sections simplified to short prompt + verified media/activity
- Goal:
  - make the guide usable without adult-level inference

### Phase 7. Design QA and cleanup

- Outputs:
  - consistent rhythm across all six pages
  - mobile and desktop spacing cleanup
  - final copy and button consistency pass
- Goal:
  - make the finished experience feel clean and reliable

## Shared Acceptance Criteria

- The detail pages follow the same order across all six kits.
- TOC links stay on the same page and scroll correctly.
- Safety must be completed before build steps are active.
- Existing checklist/localStorage progress remains functional.
- No public asset exceeds 90MB.
- No student page requires Arduino IDE install, setup, or code upload.
- No private/internal Notion details are surfaced on the public site.

## Implementation Strategy

### Content first

- Use data-driven JS sources for quest briefs and build guides.
- Keep section markup consistent so all six pages can share behavior.

### Verified media only

- Treat `reference` as source material only.
- Promote only optimized, verified derivatives into the repo.

### Preserve current work

- Do not overwrite unrelated existing edits in `assets/css/style.css`, `assets/js/i18n.js`, `index.html`, or `programs/*/index.html`.
- Layer the V4 structure on top of the current repo carefully.

## Review Gate Expectations After Every Phase

- `git status`
- `git diff --stat`
- large-file check for `assets`
- update:
  - `.codex-plan/v4/run-log.md`
  - `.codex-plan/v4/issue-tracker.md`
  - `.codex-plan/v4/completion-matrix.md`

## Expected Deliverable Shape At The End

- Home page:
  - clearer QR-entry framing
- Detail pages:
  - short mission context
  - verified resources
  - safety gate
  - visual component checks
  - step-based build guide
  - child-friendly troubleshooting
  - simplified science activity
  - resource/video wrap-up
