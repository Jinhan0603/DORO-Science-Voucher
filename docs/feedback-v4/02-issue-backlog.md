# DORO V4 Issue Backlog

## Priority Scale

- `P0`: blocks safe student use or the required workflow
- `P1`: major usability/content gap
- `P2`: polish or consistency follow-up

| ID | Priority | Problem | Affected kits | Planned phase | Status |
|---|---|---|---|---|---|
| FQ-001 | P1 | Quest copy assumes DOROLAND knowledge and does not separate background from mission. | All 6 | Phase 4 | Planned |
| NAV-001 | P0 | TOC must scroll within the page and point only to valid sections in the new order. | All 6 | Phase 3 | Planned |
| LAY-001 | P0 | Detail page order starts too early with parts/build and lacks resource check plus start check. | All 6 | Phase 3 | Planned |
| PART-001 | P1 | Component lists are text-only and do not help children identify the correct part. | All 6 | Phases 2, 5 | Planned |
| BUILD-001 | P0 | Build content is generic lesson text, not verified assembly guidance using reference assets. | All 6 | Phases 2, 5 | Planned |
| BUILD-002 | P1 | Build flow lacks clear previous/next step controls and completion guidance. | All 6 | Phase 5 | Planned |
| TROUBLE-001 | P0 | Troubleshooting is too vague and uses unexplained terms. | All 6 | Phase 6 | Planned |
| SAFETY-001 | P0 | Safety is not a real checklist and does not gate access to the build guide. | All 6 | Phases 3, 6 | Planned |
| ARD-001 | P0 | Student pages still imply Arduino IDE setup/upload for kits that must assume pre-uploaded code. | 5, 6 | Phase 6 | Planned |
| SCI-001 | P1 | Science sections are too explanation-heavy and need short question + verified video/activity. | All 6 | Phase 6 | Planned |
| UX-001 | P1 | Desktop/mobile hierarchy, spacing, and button rhythm need cleanup after content rebuild. | All 6 | Phase 7 | Planned |

## Dependency Notes

| ID | Depends on | Notes |
|---|---|---|
| BUILD-001 | Phase 2 manifest output | Requires verified mapping for PDFs, PPT-derived images, and videos |
| BUILD-002 | LAY-001, BUILD-001 | Step buttons should reflect the new learning order |
| SAFETY-001 | LAY-001 | Gate logic belongs in the new section structure |
| SCI-001 | Phase 2 manifest output | Only verified media can be linked |
| UX-001 | All content phases | Final cleanup should happen after structure and content land |

## Acceptance Signals

| ID | Done when |
|---|---|
| FQ-001 | Each kit shows one compact `배경` block and one compact `미션` block near the top |
| NAV-001 | Every TOC item scrolls to a real section on the same page |
| LAY-001 | New section order matches the V4 flow across all six kit pages |
| PART-001 | Each kit has a visual part area using verified images where available |
| BUILD-001 | Each kit has 6-10 verified build steps with image and check prompt |
| BUILD-002 | Students can move through build steps with explicit previous/next controls |
| TROUBLE-001 | Each troubleshooting item tells the student exactly what to do |
| SAFETY-001 | Build guide remains locked until safety items are checked |
| ARD-001 | No student page requires Arduino IDE install or code upload |
| SCI-001 | Science section contains short prompt + verified media/activity only |
| UX-001 | All six pages share the same clean rhythm on mobile and desktop |

## Initial Risks

- Reference assets may not exist evenly across all six kits.
- Some part photos may need to come from PPT-derived crops rather than standalone files.
- Existing repo changes in HTML/CSS/JS must be preserved while V4 structure is layered in.
- Video compression may be required before any public video is added.
