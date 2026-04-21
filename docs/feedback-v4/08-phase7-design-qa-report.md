# Phase 7 Design QA Report

## Result

- Design QA result: PASS

## Problems fixed

- Mobile full-page QA showed that the parts reference image could remain blank in deep sections because it was rendered with `loading="lazy"`.
- The optional AI-tool fallback notes on five kit pages used `font-size:0.85rem`, which was smaller than the target reading comfort for grade 4–6 students.

## Fixes applied

- Updated the shared detail renderer so the parts reference image now uses `loading="eager"`.
- Reconfirmed that the active build-step image renders eagerly and re-captured the affected mobile page.
- Raised the optional AI-tool fallback note size from `0.85rem` to `1rem` on:
  - `2-mood-light`
  - `3-walking-robot`
  - `4-ir-car`
  - `5-arduino-game`
  - `6-ultrasonic-piano`

## QA artifacts reviewed

- Desktop contact sheets:
  - `.codex-plan/v4/qa-shots/desktop-1366x768-contact-sheet.jpg`
  - `.codex-plan/v4/qa-shots/desktop-1440x900-contact-sheet.jpg`
- Mobile contact sheet:
  - `.codex-plan/v4/qa-shots/mobile-390x844-contact-sheet.jpg`
- Full-page checks:
  - `.codex-plan/v4/qa-shots/full/1-bluetooth-speaker-full-unlocked-eager.png`
  - `.codex-plan/v4/qa-shots/full/5-arduino-game-390-full-unlocked-eager.png`

## Per-kit page check

| Kit | Desktop | Mobile | Notes |
|---|---|---|---|
| `1-bluetooth-speaker` | Pass | Pass | Build-step image and components image verified in full-page QA |
| `2-mood-light` | Pass | Pass | Layout rhythm matches shared pattern |
| `3-walking-robot` | Pass | Pass | TOC and top-of-page flow are consistent |
| `4-ir-car` | Pass | Pass | Intentional fallback parts card remains; source raster image does not exist |
| `5-arduino-game` | Pass | Pass | Mobile full-page recapture passed after eager image fix |
| `6-ultrasonic-piano` | Pass | Pass | Mobile and desktop top-fold hierarchy remain clear |

## Desktop result

- All six pages share the same hero, quick-entry, card, and TOC rhythm.
- The desktop TOC remains visible without crowding the hero.
- Image cards and build-guide sections stay visually balanced at `1366x768` and `1440x900`.

## Mobile result

- The top flow remains readable and uncluttered at `390x844`.
- Section order is easy to follow: resources, safety, components, build, troubleshooting, science, and record.
- After the eager-load fix, lower-section reference imagery appears correctly in the targeted full-page mobile capture.

## Remaining risks

- Some video players show a dark first frame in static screenshots because no separate poster image is provided, though the verified MP4 assets load with working controls.
- `4-ir-car` still has no source raster parts-overview image, so the public page intentionally keeps the fallback card plus verified PDF/video links.
