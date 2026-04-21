# DORO V4 Run Log

## 2026-04-22

### Preflight

- Active repo root confirmed:
  - `C:\Users\User\Documents\Jindex\proposal\2026science-voucher\DORO-Science-Voucher`
- Reference access confirmed:
  - `reference`
  - `reference\extracted_images`
  - `reference\public-notice`
- Archive folders confirmed as non-targets:
  - `archive\DORO-Science-Voucher-V2`
  - `archive\DORO-Science-Voucher-V3`
- Workflow backup confirmed readable:
  - `workflow\doro_codex_v4_workflow_pack`
- Notion access confirmed:
  - page `키트 소개 페이지 업데이트` fetched successfully
- Path hygiene check:
  - no active-project references to `DORO-Science-Voucher-V2` or `DORO-Science-Voucher-V3` remain in `.codex-plan/v4`
  - `reference\extracted_images` references are already aligned with the current workspace layout
- Existing worktree warning before execution:
  - modified: `assets/css/style.css`
  - modified: `assets/js/i18n.js`
  - modified: `index.html`
  - modified: `programs/1-bluetooth-speaker/index.html`
  - modified: `programs/2-mood-light/index.html`
  - modified: `programs/3-walking-robot/index.html`
  - modified: `programs/4-ir-car/index.html`
  - modified: `programs/5-arduino-game/index.html`
  - modified: `programs/6-ultrasonic-piano/index.html`

### Phase 1 — Notion feedback analysis

- Scope: doc-only analysis, no site code edits
- Source inputs used:
  - Notion feedback page
  - `index.html`
  - `programs/1-bluetooth-speaker/index.html`
  - `programs/5-arduino-game/index.html`
  - `assets/js/main.js`
  - `assets/js/i18n.js`
  - workflow phase files `01` through `09`
- Files created:
  - `docs/feedback-v4/01-notion-feedback-analysis.md`
  - `docs/feedback-v4/02-issue-backlog.md`
  - `docs/feedback-v4/03-asset-and-data-plan.md`
  - `docs/feedback-v4/04-implementation-phases.md`
- Key findings recorded:
  - detail pages behave like generic lesson pages instead of build-first QR guides
  - Arduino game page still implies student-facing code upload
  - safety gate, resource check, and verified step media are missing

### Phase 1 Review Gate

Review Gate Result: PASS
Problems found:
- The repo already contains unrelated modified site files from before this workflow run.
- `git diff -- docs/feedback-v4` shows no content because the new docs are untracked rather than staged.
Fixes applied:
- None required for site code in this phase.
- Phase 1 remained doc-only and stayed within scope.
Remaining risks:
- Later diffs must be read carefully because the worktree was already dirty before V4 execution.
Next phase allowed: YES

### Phase 2 — Reference manifest

- Scope: reference analysis, tooling, manifest data, and report only
- Tool checks:
  - `python`: available
  - `python-pptx`: available
  - `soffice`: not found on `PATH`
  - `ffmpeg`: not found on `PATH`
  - `magick`: not found on `PATH`
  - `pdftoppm`: not found on `PATH`
- Reference scan completed for:
  - `reference\6종_키트_안내서_조립PPT 및 영상`
  - `reference\실제작동영상`
  - `reference\extracted_images`
- Files created:
  - `tools/extract_pptx_assets.py`
  - `tools/build_reference_manifest.py`
  - `assets/data/reference-manifest.json`
  - `docs/feedback-v4/05-reference-manifest-report.md`
- Verified per-kit source mapping:
  - `1-bluetooth-speaker`: PDF, PPTX, assembly video, demo video present, 22 slides
  - `2-mood-light`: PDF, PPTX, assembly video, demo video present, 26 slides
  - `3-walking-robot`: PDF, PPTX, assembly video, demo video present, 22 slides
  - `4-ir-car`: PDF, PPTX, assembly video, demo video present, 27 slides
  - `5-arduino-game`: PDF, PPTX, assembly video, demo video present, 17 slides
  - `6-ultrasonic-piano`: PDF, PPTX, assembly video, demo video present, 24 slides
- Notable findings:
  - no kit is missing its primary PDF, PPTX, assembly video, or demo video source
  - mood-light has an extra process-style demo candidate: `무드등 만드는과정.mp4`
  - slide metadata extraction works, but rendered slide export tools are not on `PATH`

### Phase 2 Review Gate

Review Gate Result: PASS
Problems found:
- Reference rendering/compression helpers are not available on `PATH`, so phase 2 can inspect PPTX structure but cannot rely on external slide rendering binaries.
- The repo still contains unrelated pre-existing site changes outside this phase.
Fixes applied:
- Added resilient PPTX inspection so picture shapes without embedded payloads do not crash manifest generation.
- Recorded tool limitations in the manifest report instead of treating them as missing source files.
Remaining risks:
- Phase 5 will need to rely on verified existing extracted images or embedded PPT assets unless additional rendering tools are discovered later.
Next phase allowed: YES

### Phase 3 — Flow and TOC

- Scope: restructure detail-page order, TOC anchors, QR entry buttons, and safety gate shell behavior
- Shared files added:
  - `assets/js/learning.js`
  - `assets/js/detail.js`
- Shared file updated:
  - `assets/css/style.css`
- Detail pages updated:
  - `programs/1-bluetooth-speaker/index.html`
  - `programs/2-mood-light/index.html`
  - `programs/3-walking-robot/index.html`
  - `programs/4-ir-car/index.html`
  - `programs/5-arduino-game/index.html`
  - `programs/6-ultrasonic-piano/index.html`
- New detail-page order applied on all six kits:
  1. `mission-brief`
  2. `start-resources`
  3. `start-check`
  4. `safety-quest`
  5. `component-check`
  6. `build-guide`
  7. `troubleshooting`
  8. `science-video`
  9. `challenge-missions`
  10. `record-verify`
  11. `resources-media`
- Behavior changes:
  - TOC is now generated from real in-page sections only
  - QR quick-entry buttons now point to `자료 확인`, `안전 약속`, `만들기 시작`
  - build guide is locked until safety checklist is complete
  - component checklist uses a new grouped storage key and migrates legacy per-page checklist values
- Static verification completed:
  - all six pages contain the new section IDs
  - old anchors `#checklist`, `#missions`, `#ai-ext`, `#faq` are no longer used by the page chrome
  - all six pages now load `learning.js` and `detail.js`

### Phase 3 Review Gate

Review Gate Result: PASS
Problems found:
- Browser rendering could not be exercised directly in this terminal-only environment, so phase 3 verification is static rather than visual.
- The repo still contains unrelated pre-existing site changes outside this workflow.
Fixes applied:
- Replaced stale TOC anchors with generated in-page links from actual section IDs.
- Added safety-gate logic plus legacy component-checklist migration to preserve existing localStorage progress.
Remaining risks:
- Visual rhythm and final Korean copy still need cleanup after quest briefs, assembly content, and troubleshooting rewrites land.
Next phase allowed: YES

### Phase 4 — Quest briefs

- Scope: separate student-facing `배경` and `미션` copy from a shared data source
- Shared file created:
  - `assets/js/quest-briefs.js`
- Shared files updated:
  - `assets/js/detail.js`
  - `assets/css/style.css`
- Detail pages updated:
  - `programs/1-bluetooth-speaker/index.html`
  - `programs/2-mood-light/index.html`
  - `programs/3-walking-robot/index.html`
  - `programs/4-ir-car/index.html`
  - `programs/5-arduino-game/index.html`
  - `programs/6-ultrasonic-piano/index.html`
- Quest-brief changes:
  - added shared `restore`, `background`, and `mission` data for all six kits
  - mission-brief cards now display `복구할 기능`, `배경`, `미션`
  - removed duplicate short story line from the hero area
  - detail pages now load `quest-briefs.js` before `detail.js`

### Phase 4 Review Gate

Review Gate Result: PASS
Problems found:
- Browser rendering is still unverified in this terminal-only environment.
- Pre-existing unrelated repo changes remain outside this workflow.
Fixes applied:
- Centralized the quest copy in `quest-briefs.js`.
- Removed duplicate hero-level story text so the top section now has a single compact source for background and mission.
Remaining risks:
- The build sections still use legacy lesson-style content and need the verified PPT/image/video step treatment in phase 5.
Next phase allowed: YES

### Phase 5 — Assembly assets and guides

- Scope: replace placeholder build resources with verified assembly images, PDFs, and videos sourced from the active `reference` tree only
- Shared file created:
  - `assets/js/assembly-guides.js`
- Shared files updated:
  - `assets/js/detail.js`
  - `assets/css/style.css`
- Detail pages updated:
  - `programs/1-bluetooth-speaker/index.html`
  - `programs/2-mood-light/index.html`
  - `programs/3-walking-robot/index.html`
  - `programs/4-ir-car/index.html`
  - `programs/5-arduino-game/index.html`
  - `programs/6-ultrasonic-piano/index.html`
- Public assets created:
  - `assets/docs/assembly/<kit-id>/guide.pdf` for all six kits
  - `assets/media/assembly/<kit-id>/assembly.mp4` for all six kits
  - `assets/media/demo/<kit-id>/demo.mp4` for all six kits
  - `assets/images/assembly/<kit-id>/step-*.jpg` for all six kits
  - `assets/images/parts/<kit-id>/overview.jpg` for five kits with extractable source parts imagery
- Phase 5 report created:
  - `docs/feedback-v4/06-phase5-assembly-guide-report.md`
- Step counts now wired in shared data:
  - `1-bluetooth-speaker`: 9
  - `2-mood-light`: 9
  - `3-walking-robot`: 8
  - `4-ir-car`: 7
  - `5-arduino-game`: 9
  - `6-ultrasonic-piano`: 9
- Verification completed:
  - `node --check assets/js/detail.js`
  - `node --check assets/js/assembly-guides.js`
  - exported asset trees listed under `assets/images/assembly`, `assets/images/parts`, `assets/media/assembly`, `assets/media/demo`
  - all guide-relative asset paths resolved successfully from each program page
  - no files over `90 MB` found under `assets`
- Source constraints recorded instead of fabricated around:
  - `4-ir-car` parts slide has no extractable raster overview image
  - selected `2-mood-light` and `3-walking-robot` steps use the closest verified extractable PPT assets where some original slides had no usable raster image

### Phase 5 Review Gate

Review Gate Result: PASS
Problems found:
- The repo still contains unrelated pre-existing modifications, so `git diff --stat` mixes current phase work with earlier dirty-worktree changes.
- Browser rendering could not be exercised directly in this terminal-only environment.
- `4-ir-car` has no extractable raster parts-overview image in the source PPTX.
Fixes applied:
- Added shared assembly-guide data and renderer so all six kit pages now reference verified PDF, image, and MP4 assets from the active repo.
- Validated every guide-relative asset path with a Node-based path-resolution check from each program page.
- Used a fallback emoji parts card for `4-ir-car` instead of inventing a source image.
- Kept all copied public media under the `90 MB` limit without copying any PPTX into `assets`.
Remaining risks:
- Phase 6 still needs to rewrite troubleshooting and remaining student-facing Arduino/setup copy in source HTML.
- Final visual QA remains pending because no browser render pass is available in this terminal run.
Next phase allowed: YES

### Phase 6 — Trouble, safety, science

- Scope: replace vague troubleshooting copy, remove student-facing upload/setup flow, and simplify science sections for grade 4–6 readers
- Shared files updated:
  - `assets/js/assembly-guides.js`
  - `assets/js/detail.js`
  - `assets/css/style.css`
- Source HTML cleanup:
  - `programs/5-arduino-game/index.html`
  - `programs/6-ultrasonic-piano/index.html`
- Phase 6 report created:
  - `docs/feedback-v4/07-phase6-support-content-report.md`
- Troubleshooting changes:
  - all six kits now render concrete step-by-step troubleshooting guidance from shared kit data
  - vague or adult-only wording was replaced by student-action instructions
- Arduino flow changes:
  - `5-arduino-game` and `6-ultrasonic-piano` now show a clear preloaded-code note in the shared build-guide renderer
  - stale `코드 업로드` phrases were removed from the two affected source HTML files
- Science section changes:
  - each kit now renders one short question, one verified local demo-video player, and one short `직접 해보기` activity
  - no invented YouTube links were added
- Validation completed:
  - `node --check assets/js/detail.js`
  - `node --check assets/js/assembly-guides.js`
  - `rg -n "기존 연결 기록|R\\+/L\\+|아두이노 설치|코드 업로드|안전 약속|되돌아보기" assets/js assets/css programs`
    - only expected `안전 약속` matches remain
  - no files over `90 MB` found under `assets`

### Phase 6 Review Gate

Review Gate Result: PASS
Problems found:
- The repo still contains unrelated pre-existing modifications, so phase-end `git diff --stat` remains noisy.
- Browser rendering could not be exercised directly in this terminal-only environment.
Fixes applied:
- Removed remaining student-facing upload/setup wording from the affected public source HTML.
- Simplified science sections to a question + verified video + direct activity pattern across all six kits.
- Kept the safety checklist and gate behavior intact while updating support content.
Remaining risks:
- Final spacing, card rhythm, and mobile/desktop polish still need the design QA pass in phase 7.
- `4-ir-car` still lacks a source raster parts-overview image and remains a documented source limitation.
Next phase allowed: YES

### Phase 7 — Design QA and final polish

- Scope: visual QA across all six kit pages, small readability fixes, and targeted render cleanup only
- QA artifacts captured:
  - `.codex-plan/v4/qa-shots/desktop-1366x768-contact-sheet.jpg`
  - `.codex-plan/v4/qa-shots/desktop-1440x900-contact-sheet.jpg`
  - `.codex-plan/v4/qa-shots/mobile-390x844-contact-sheet.jpg`
  - `.codex-plan/v4/qa-shots/full/1-bluetooth-speaker-full-unlocked-eager.png`
  - `.codex-plan/v4/qa-shots/full/5-arduino-game-390-full-unlocked-eager.png`
- Shared file updated:
  - `assets/js/detail.js`
- Detail pages updated for readability:
  - `programs/2-mood-light/index.html`
  - `programs/3-walking-robot/index.html`
  - `programs/4-ir-car/index.html`
  - `programs/5-arduino-game/index.html`
  - `programs/6-ultrasonic-piano/index.html`
- Phase 7 report created:
  - `docs/feedback-v4/08-phase7-design-qa-report.md`
- Problems fixed:
  - parts reference images in lower sections could appear blank during mobile full-page QA because they were lazily loaded
  - optional AI-tool fallback notes on five pages were smaller than the target readability level
- Fixes applied:
  - switched the shared parts reference image renderer to `loading="eager"`
  - re-captured the affected mobile full-page QA shot and verified components/build imagery now render
  - increased the five optional AI-tool fallback notes from `0.85rem` to `1rem`
- Per-kit result:
  - all six kit pages passed the desktop and mobile visual review
  - `4-ir-car` keeps the intentional fallback parts card because no source raster overview image exists
- Validation completed:
  - `node --check assets/js/detail.js`
  - `git status --short`
  - `git diff --stat`
  - no files over `90 MB` found under `assets`
  - `rg -n "font-size:0($|[^0-9])|letter-spacing" assets/css assets/js programs`
    - no tiny-text or letter-spacing hack issue remained after the note-size cleanup
  - `rg -n "완료했어요|완료하고 다음 단계로|안전 약속|자료 확인" assets/js programs`
    - expected labels/buttons were present across the shared renderer and all six kit pages

### Phase 7 Review Gate

Review Gate Result: PASS
Problems found:
- The repo still contains unrelated pre-existing modifications, so `git diff --stat` remains noisy even after phase 7.
- `4-ir-car` still has no source raster parts-overview image to display in the component reference card.
- Some video players show a dark first frame in static screenshots because no separate poster images were provided.
Fixes applied:
- Closed the browser-verification gap with a Playwright screenshot sweep at `1366x768`, `1440x900`, and `390x844`.
- Changed the shared parts reference image to eager loading and re-captured the affected mobile page.
- Increased the optional AI-tool fallback notes to `1rem` on the five affected kit pages.
Remaining risks:
- `4-ir-car` remains dependent on the intentional fallback parts card plus verified PDF/video links.
- Static screenshots cannot fully represent in-player video motion, so final human review should still spot-check video playback in-browser.
Next phase allowed: YES

### Final Report

- Final report created:
  - `docs/feedback-v4/09-final-report.md`
- Final command results:
  - `git status --short`
    - workflow-owned additions remain untracked as expected under `.codex-plan`, `assets/data`, `assets/docs`, `assets/images`, `assets/js`, `assets/media`, `docs`, and `tools`
    - pre-existing tracked modifications outside this workflow still include `assets/js/i18n.js` and `index.html`
  - `git diff --stat`
    - remains noisy because of the pre-existing dirty worktree
  - large-file scan
    - no files over `90 MB` found under `assets`
- Final workflow state:
  - all seven phases completed
  - all seven review gates passed
  - final report generated

### Post-Workflow Packaging

- Deployment layout adjusted after the workflow so the root site stays on the existing V3 build.
- Public V4 site packaged under:
  - `v4/index.html`
  - `v4/assets/`
  - `v4/programs/`
- Root-level V4-only public asset copies were removed after packaging to avoid duplicating large media under both `/` and `/v4/`.
- README updated to expose only:
  - `V3 운영 버전`
  - `V4 가이드 미리보기`
