# MASTER AUTONOMOUS PROMPT — DORO Science Voucher V4

You are working inside the DORO-Science-Voucher repository.

Primary goal: Apply the Notion “1차 피드백” to the DORO kit learning guide site so that elementary grade 4–6 students can use each kit page after scanning a QR code and complete the kit with the page, images, PDF resources, and videos.

You must work in phases. Do not skip phases. After each phase, run the matching review gate and update:

- `.codex-plan/v4/run-log.md`
- `.codex-plan/v4/issue-tracker.md`
- `.codex-plan/v4/completion-matrix.md`

Global rules:

1. Verify that you are in the correct Git repo root before editing.
2. Do not modify archived or unrelated folders under `archive/` or any repo other than the current repo root.
3. Use only verified files. Do not invent missing images, videos, PDFs, YouTube links, or Notion content.
4. Do not copy original large PPTX/MP4 files into the public repo. Never add files over 90MB to `assets`.
5. Keep the UI clean. Do not add more neon, heavy shadows, or decorative complexity.
6. Maintain existing localStorage progress unless the phase explicitly changes it.
7. Every phase must end with `git status`, `git diff --stat`, and `find assets -type f -size +90M -print`.
8. If a blocker occurs, stop, write it clearly to `run-log.md`, and report.

Execute these phases in order:

1. `01_PHASE_FEEDBACK_ANALYSIS.md`
2. `02_PHASE_REFERENCE_MANIFEST.md`
3. `03_PHASE_FLOW_AND_TOC.md`
4. `04_PHASE_QUEST_BRIEFS.md`
5. `05_PHASE_ASSEMBLY_ASSETS_AND_GUIDES.md`
6. `06_PHASE_TROUBLE_SAFETY_SCIENCE.md`
7. `07_PHASE_DESIGN_QA.md`

After every phase, run `08_PHASE_REVIEW_GATE.md`.

When all phases are complete, run `09_FINAL_REPORT.md` and produce a final summary.
