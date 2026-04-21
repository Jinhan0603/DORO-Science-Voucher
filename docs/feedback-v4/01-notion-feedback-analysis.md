# DORO V4 Notion Feedback Analysis

## Scope

- Source of truth for this analysis:
  - Notion page `키트 소개 페이지 업데이트` fetched on 2026-04-22
  - Current repo pages in `index.html` and `programs/*/index.html`
- This document excludes private discussion comments, internal mentions, and unrelated business notes.
- Goal: translate the feedback into concrete public-site requirements for elementary grade 4-6 students.

## Current Repo Snapshot

### Home page

- The landing page helps users pick a kit, but the guide copy still describes a broad lesson flow instead of a QR-entry build flow.
- The story section assumes some DOROLAND context, but the detail pages do not clearly separate background from mission.

### Detail pages

- All six kit pages share the same high-level pattern:
  - `구성품 확인`
  - `한 단계씩 만들기`
  - `더 해보기`
  - `문제 해결`
- The pages read like workshop lesson plans, not self-guided build manuals.
- The TOC is shallow and does not match the intended student sequence from the feedback.
- There is no real safety gate before build steps.
- Component descriptions are mostly text only.
- Build steps are generic activity summaries, not PPT/photo-backed assembly instructions.
- Troubleshooting is too abstract for first-time elementary users.

### Highest-risk page

- `programs/5-arduino-game/index.html` still asks students to upload code.
- This directly conflicts with the feedback requirement that student pages assume pre-uploaded code.

## Feedback Summary

### A. Quest and background explanation

- Problem:
  - Current quest wording assumes prior knowledge of DOROLAND.
  - Students scanning a QR code may not understand the setting, role, or purpose.
- Requirement:
  - Split the top narrative into `배경 설명` and `미션`.
  - Keep both short and concrete.

### B. Table of contents and navigation

- Problem:
  - TOC behavior must keep users on the same page and scroll to valid sections.
  - Current TOC structure is too short for the intended flow and is vulnerable to stale anchors.
- Requirement:
  - Rebuild TOC against real section IDs only.
  - Smooth-scroll within the current page.

### C. Layout and learning order

- Problem:
  - Current detail pages start with component checking before students review materials or safety.
  - This makes the experience confusing for first-time solo users.
- Required order:
  1. 미션 배경
  2. 교육자료 다운로드&확인
  3. 시작 전 이해 확인
  4. 안전 약속
  5. 구성품 확인
  6. 한 단계씩 만들기
  7. 왜 안 되지?
  8. 과학 영상/실험
  9. 도전 미션
  10. 기록·인증
  11. 자료·영상

### D. Component explanation shortage

- Problem:
  - Text-only lists are not enough for children to identify parts.
  - Several current checklist items mention documents or activities that are not visually supported on the page.
- Requirement:
  - Add real part photos or thumbnails when available.
  - Use clear labels for each part and only use fallback icons when no verified image exists.

### E. Build step explanation shortage

- Problem:
  - Current mission steps summarize a class session instead of guiding assembly.
  - There are no explicit previous/next step controls.
  - Build media from the reference PPT and videos is not reflected on the site yet.
- Requirement:
  - Replace generic lesson blocks with step cards based on verified PPT/images/videos.
  - Each step needs image, short mission, check prompt, and caution when needed.

### F. Troubleshooting is too vague

- Problem:
  - Current answers assume technical vocabulary or hidden prior knowledge.
  - Students need step-by-step actions, not compressed expert shorthand.
- Requirement:
  - Rewrite all troubleshooting in grade 4-6 language.
  - Explain terms like Bluetooth reset, `R+ / L+`, wire order, and power checks in plain Korean.

### G. Arduino risk

- Problem:
  - Student-facing install, setup, and upload flow is too difficult for a solo elementary user.
  - The current game page still includes upload expectations.
- Requirement:
  - Student pages must assume firmware/code is already uploaded.
  - Student flow should focus on wiring, power, and operation checks.
  - Teacher/guardian-only code material must stay separate and only be linked if verified.

### H. Science video

- Problem:
  - Long explanation-heavy science sections are likely to be skipped.
- Requirement:
  - Simplify to one short question, one verified video if available, and one short activity.
  - Do not invent YouTube links.

### I. Safety promise

- Problem:
  - Existing safety treatment is not a real safety checklist.
  - Safety currently lacks gating behavior.
- Requirement:
  - Replace unrelated OX-style content with real safety items:
    - MDF board handling
    - small parts
    - power-off before wiring
    - battery polarity
    - wet hands
    - sharp edges
    - screwdriver use
    - stop-and-ask-for-help rule
  - Build guide must stay locked until safety is completed.

### J. Design and UX

- Problem:
  - Current detail pages are readable but too generic and too narrow in learning purpose.
  - Build flow, CTAs, image hierarchy, and mobile rhythm need a clearer system.
- Requirement:
  - Make next actions obvious.
  - Keep UI clean and consistent across all six kits.
  - Preserve desktop and mobile readability.

## Repo Findings Mapped to the Feedback

| Area | Current repo state | Gap |
|---|---|---|
| Quest intro | One short story sentence near top | Needs separate background and mission card |
| TOC | Four links only | Needs full in-page build order |
| Resource check | Not present as a dedicated section | Must be added before safety and build |
| Start check | Not present | Must be added |
| Safety | No actual gate | Must gate build access |
| Components | Text checklist only | Needs photos/thumbnails |
| Build guide | Generic lesson blocks | Needs verified step-by-step assembly cards |
| Troubleshooting | Abstract answers | Needs child-friendly instructions |
| Science | Long-form concept framing | Needs short question + video + activity |
| Arduino pages | Student-facing upload language remains | Must be removed from student flow |

## Affected Kits

- All six kits are affected by the new learning order, TOC, safety gate, and cleaner build UX.
- Highest-content risk:
  - `1-bluetooth-speaker`
  - `5-arduino-game`
  - `6-ultrasonic-piano`
- Highest-media dependency risk:
  - `3-walking-robot`
  - `4-ir-car`
  - `5-arduino-game`
  - `6-ultrasonic-piano`

## Top 10 Priorities

1. Remove student-facing Arduino upload/setup flow from relevant pages.
2. Rebuild detail-page order around resource check -> safety -> parts -> build.
3. Add a real safety checklist and lock build until it is completed.
4. Replace generic lesson blocks with verified assembly step data.
5. Repair TOC links so every item scrolls to a valid in-page section.
6. Add short background/mission cards for all six kits.
7. Add real part photos or thumbnails from verified reference materials.
8. Rewrite troubleshooting in elementary-friendly language.
9. Simplify science sections to short question + verified video/activity.
10. Unify mobile and desktop spacing, buttons, and progress behavior across all six kit pages.

## Non-Negotiable Constraints

- Only edit files inside the active repo root.
- Treat `reference` as read-only.
- Do not copy original large PPTX/MP4 source files into the repo.
- Do not add public assets larger than 90MB.
- Do not invent missing files, links, or media.
- Do not surface private/internal Notion details on the public site.
