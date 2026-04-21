# DORO V4 Final Report

## 1. Solved feedback list

- Reordered all six kit detail pages into a build-first QR flow:
  - `자료 확인`
  - `안전 약속`
  - `구성품 확인`
  - `한 단계씩 만들기`
  - `왜 안 되지?`
  - `짧게 생각하고 실험해요`
  - `도전 미션`
  - `완성 기록`
  - `자료·영상 모아보기`
- Replaced placeholder build content with verified local PDFs, PPT-derived step images, assembly videos, and demo videos for all six kits.
- Added a shared safety gate and preserved checklist progress with localStorage migration support.
- Split `배경` and `미션` into clear student-facing quest briefs from a shared data source.
- Rewrote troubleshooting into elementary-friendly action steps.
- Removed student-facing Arduino upload/setup instructions from the public support flow.
- Simplified science sections to one short question, one verified local video, and one direct hands-on activity.
- Completed desktop/mobile design QA and fixed the lower-section image-loading issue found during mobile review.

## 2. Unsolved feedback list

- No unresolved Notion feedback blocker remains in the public flow.
- Source limitation still exists for `4-ir-car`: the reference PPTX does not contain an extractable raster parts-overview image, so the public page intentionally uses a fallback parts card plus verified PDF/video links.

## Deployment packaging note

- After the V4 workflow completed, the public V4 site was packaged under `v4/` so the root `/` can stay on the existing V3 site.
- The final GitHub Pages layout is:
  - `/` → V3
  - `/v4/` → V4
- Root-level V4-only public assets were removed after packaging to avoid duplicating large media in both locations.

## 3. Modified file list

Workflow-owned code and content files:

- `v4/index.html`
- `v4/assets/**`
- `v4/programs/**`
- `tools/extract_pptx_assets.py`
- `tools/build_reference_manifest.py`
- `docs/feedback-v4/01-notion-feedback-analysis.md`
- `docs/feedback-v4/02-issue-backlog.md`
- `docs/feedback-v4/03-asset-and-data-plan.md`
- `docs/feedback-v4/04-implementation-phases.md`
- `docs/feedback-v4/05-reference-manifest-report.md`
- `docs/feedback-v4/06-phase5-assembly-guide-report.md`
- `docs/feedback-v4/07-phase6-support-content-report.md`
- `docs/feedback-v4/08-phase7-design-qa-report.md`
- `docs/feedback-v4/09-final-report.md`
- `.codex-plan/v4/run-log.md`
- `.codex-plan/v4/issue-tracker.md`
- `.codex-plan/v4/completion-matrix.md`

Pre-existing unrelated modified tracked files remain in the repo worktree and still make `git diff --stat` noisy:

- `assets/js/i18n.js`
- `index.html`

## 4. New asset list

- `v4/assets/docs/assembly/<kit-id>/guide.pdf` for all six kits
- `v4/assets/media/assembly/<kit-id>/assembly.mp4` for all six kits
- `v4/assets/media/demo/<kit-id>/demo.mp4` for all six kits
- `v4/assets/images/assembly/<kit-id>/step-*.jpg` for all six kits
  - total exported step images: `51`
- `v4/assets/images/parts/<kit-id>/overview.jpg` for five kits
- QA screenshots under `.codex-plan/v4/qa-shots/`

## 5. 6 kit status table

| Kit | PDF | PPT-derived images | Assembly video | Demo video | Component images | Build steps | Troubleshooting | Safety gate |
|---|---|---|---|---|---|---:|---|---|
| `1-bluetooth-speaker` | Yes | Yes | Yes | Yes | Yes | 9 | Yes | Yes |
| `2-mood-light` | Yes | Yes | Yes | Yes | Yes | 9 | Yes | Yes |
| `3-walking-robot` | Yes | Yes | Yes | Yes | Yes | 8 | Yes | Yes |
| `4-ir-car` | Yes | Yes | Yes | Yes | Fallback card | 7 | Yes | Yes |
| `5-arduino-game` | Yes | Yes | Yes | Yes | Yes | 9 | Yes | Yes |
| `6-ultrasonic-piano` | Yes | Yes | Yes | Yes | Yes | 9 | Yes | Yes |

## 6. Large file check result

- Result: PASS
- Final check found no file under `assets/` larger than `90 MB`.

## 7. Desktop test result

- Result: PASS
- Reviewed `1366x768` and `1440x900` screenshot sets for all six kit pages.
- Shared hero, quick-entry, card rhythm, and TOC layout remain consistent.
- Desktop pages are readable and not overly narrow.

## 8. Mobile test result

- Result: PASS
- Reviewed `390x844` screenshot set for all six kit pages.
- The top-to-bottom learning flow stays clear on mobile.
- After the eager-load fix, lower-section parts/build images render correctly in the targeted full-page recapture.

## 9. Known risks

- `4-ir-car` still lacks a source raster parts-overview image.
- Some video players can appear dark in static screenshots because no separate poster image is provided, even though the verified local MP4 files load with controls.
- The repository still has a pre-existing dirty worktree outside this workflow, so future diffs should continue to be reviewed carefully.

## 10. Recommended next human review points

- Open each kit page in a browser and play at least one assembly video and one demo video per kit.
- Spot-check the `4-ir-car` fallback parts card with the linked PDF to confirm the missing-image compromise is acceptable.
- Verify Korean copy tone with an actual grade 4–6 reader or teacher, especially in troubleshooting and challenge sections.
- Decide whether video poster images should be added later for a more polished paused-state appearance.
