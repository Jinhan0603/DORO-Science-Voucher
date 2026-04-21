# Phase 1 — Notion 1차 피드백 분석만 수행

Do not edit site files in this phase.

Tasks:

1. Verify repo root:
   - `pwd`
   - `git status`
   - `ls`
2. Fetch or inspect the Notion page if connector is available:
   - `https://www.notion.so/dojeonrobot/349a7faf513d8056ac57cfb0128ec400?source=copy_link`
3. If Notion connector is unavailable, use this feedback summary as the source of truth and state that in the report.

Feedback categories to analyze:

A. Quest/background explanation
- Current quest wording assumes students already know DOROLAND.
- Separate “background” and “mission” text.

B. Table of contents/navigation
- TOC must scroll to sections on the same page.
- It must not navigate to the wrong page or broken anchors.

C. Layout and learning order
- Suggested order:
  1. 교육자료 다운로드&확인
  2. OX/이해 확인
  3. 안전 약속
  4. 구성품 확인
  5. 제작
- Current flow starts with parts check before students know the materials.

D. Component explanation shortage
- Text-only part descriptions are insufficient.
- Add photos or visual thumbnails for parts when possible.

E. Build step explanation shortage
- PPT content is partially missing.
- Need visible next/previous buttons, step photos, and assembly video access.

F. Troubleshooting is too vague
- Explain terms such as Bluetooth reset, R+/L+, wire connection in grade 4–6 language.

G. Arduino risk
- Arduino install/setup/code upload is too hard for solo elementary students.
- Student page should assume code is pre-uploaded.
- Move code material to parent/teacher resources if needed.

H. Science video
- Too much explanation; students may not read.
- Prefer short question + video + short activity.

I. Safety promise
- Must be actual safety, not unrelated OX quiz.
- MDF separation, small parts, battery polarity, wet hands, wires, screwdriver safety.
- Build should be gated by safety completion.

J. Design and UX
- PC and mobile must both be readable.
- Images and text must be large enough.
- Cards/buttons must be clean and consistent.

Create or update these files only:

- `docs/feedback-v4/01-notion-feedback-analysis.md`
- `docs/feedback-v4/02-issue-backlog.md`
- `docs/feedback-v4/03-asset-and-data-plan.md`
- `docs/feedback-v4/04-implementation-phases.md`

Backlog IDs to use:

- FQ-001 Quest background/mission separation
- NAV-001 TOC anchor scroll repair
- LAY-001 Detail learning order restructure
- PART-001 Component photos/thumbnails
- BUILD-001 PPT-based step images and build guide
- BUILD-002 Explicit next/previous step UX
- TROUBLE-001 Grade 4–6 troubleshooting rewrite
- SAFETY-001 Real safety checklist and gate
- ARD-001 Remove student-facing Arduino code upload
- SCI-001 Science section simplified to video/activity
- UX-001 Desktop/mobile clean design QA

End commands:

```bash
git status
git diff -- docs/feedback-v4
```

Report:

1. Feedback summary
2. Files created
3. Top 10 priorities
4. Whether no site files were edited
