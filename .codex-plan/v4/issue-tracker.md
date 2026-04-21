# DORO V4 Issue Tracker

| ID | Type | Status | Summary | Notes |
|---|---|---|---|---|
| ENV-001 | Environment | Open | Working tree already contains modified site files before V4 changes start. | Treat as pre-existing work. Avoid reverting unrelated edits. |
| ENV-002 | Environment | Watching | `.codex-plan/` and `docs/` are currently untracked. | Expected during workflow execution unless the user requests staging/commit. |
| PLAN-001 | Risk | Watching | Phase-end `git diff -- <path>` commands do not show untracked new files. | Use `git status` plus file inspection to verify doc-only outputs until files are staged. |
| TOOL-001 | Tooling | Watching | `soffice`, `ffmpeg`, `magick`, and `pdftoppm` are not available on `PATH`. | Phase 2 completed with metadata inspection only. Reuse `reference\extracted_images` and embedded PPT assets in later phases. |
| TOOL-002 | Verification | Closed | Browser-level rendering checks were completed with Playwright screenshot QA in phase 7. | Reviewed desktop `1366x768` and `1440x900`, plus mobile `390x844`, then re-captured the affected mobile full-page page after the eager-image fix. |
| CONTENT-001 | Content | Closed | Student-facing Arduino upload/setup flow has been removed from the public support flow. | Closed in phase 6. |
| CONTENT-002 | Content | Closed | Verified build-step content, real step images, PDFs, and assembly/demo videos are now wired through shared guide data. | Closed in phase 5. |
| CONTENT-003 | Content | Watching | Mood-light has two demo-style reference videos. | Use `무드등.mp4` as demo and treat `무드등 만드는과정.mp4` as extra process footage if needed. |
| CONTENT-004 | Content | Closed | Resource sections use verified PDFs/videos and science sections now use the simplified question + video + activity format. | Closed in phase 6. |
| CONTENT-005 | Content | Watching | `4-ir-car` source PPTX has no extractable raster parts-overview image. | Public page uses a fallback emoji parts card plus verified PDF/video links instead of an invented image. |
| DESIGN-001 | Design | Closed | Optional AI-tool fallback notes were smaller than the target reading comfort for grade 4–6 students. | Fixed in phase 7 by increasing the affected inline note size from `0.85rem` to `1rem` on five kit pages. |
| DESIGN-002 | Design | Closed | Lower-section parts reference imagery could appear blank in mobile full-page QA because of lazy loading. | Fixed in phase 7 by rendering the shared parts reference image eagerly and re-capturing the affected page. |

## Blocking Status

- No active blocker after phase 1.
- No active blocker after phase 2.
- No active blocker after phase 3.
- No active blocker after phase 4.
- No active blocker after phase 5.
- No active blocker after phase 6.
- No active blocker after phase 7.
- Proceed to the final report.
