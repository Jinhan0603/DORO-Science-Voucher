# DORO V4 Asset And Data Plan

## Goal

Prepare the minimum verified data and media needed to transform each kit page from a generic lesson page into a self-guided student build guide.

## Read-Only Source Material

### Repo-local source

- Existing public assets in `assets/images/programs`
- Existing page copy in `index.html` and `programs/*/index.html`

### Reference source

- `C:\Users\User\Documents\Jindex\proposal\2026science-voucher\reference`
- `C:\Users\User\Documents\Jindex\proposal\2026science-voucher\reference\extracted_images`
- `C:\Users\User\Documents\Jindex\proposal\2026science-voucher\reference\public-notice`
- `6종_키트_안내서_조립PPT 및 영상`
- `실제작동영상`

## Public Repo Outputs To Create

### Data files

- `assets/data/reference-manifest.json`
- `assets/js/quest-briefs.js`
- `assets/js/assembly-guides.js`
- `assets/js/learning.js`
- `assets/js/detail.js`

### Media and documents

- `assets/images/assembly/<kit-id>/...`
- `assets/images/parts/<kit-id>/...`
- `assets/media/assembly/<kit-id>/assembly.mp4`
- `assets/media/demo/<kit-id>/demo.mp4`
- `assets/docs/assembly/<kit-id>/guide.pdf`

## Data Model Plan

### Quest briefs

- Purpose:
  - provide compact top-of-page narrative context
- Data per kit:
  - `restore`
  - `background`
  - `mission`

### Reference manifest

- Purpose:
  - map verified source files to each kit
- Data per kit:
  - source PDF/PPTX
  - assembly video path
  - demo video path
  - slide count
  - warnings/missing status

### Assembly guides

- Purpose:
  - drive the step UI instead of hard-coded lesson blocks
- Data per kit:
  - guide PDF
  - assembly video
  - demo video
  - part list
  - step list
  - check prompts
  - cautions

## Per-Kit Content Targets

| Kit | Needed verified outputs |
|---|---|
| 1-bluetooth-speaker | part thumbnails, 6-10 build images, guide PDF, assembly video, demo video |
| 2-mood-light | part thumbnails, 6-10 build images, guide PDF, assembly video, demo video |
| 3-walking-robot | part thumbnails, 6-10 build images, guide PDF, assembly video, demo video |
| 4-ir-car | part thumbnails, 6-10 build images, guide PDF, assembly video, demo video |
| 5-arduino-game | part thumbnails, 6-10 build images, guide PDF, assembly video, demo video, no student upload flow |
| 6-ultrasonic-piano | part thumbnails, 6-10 build images, guide PDF, assembly video, demo video, no student upload flow |

## Selection Rules

- Prefer the clearest single photo per step over full-slide screenshots.
- Derive images from extracted assets where possible before creating new exports.
- Use compressed public MP4 only if size and quality are acceptable.
- Do not publish original PPTX or large raw MP4 files.
- Do not invent missing part photos or video links.
- If media is missing, the data model must record the gap explicitly.

## Likely Gaps To Validate In Phase 2

- Whether every kit has a distinct assembly video and a distinct demo video
- Whether PPT-derived images are clear enough for part identification
- Whether PDFs exist per kit or only as shared references
- Whether game/piano assets contain parent-only coding materials that must stay off the student page

## Student-Facing Structure Needed From The Data

1. 자료 확인
2. 안전 약속
3. 구성품 확인
4. 단계별 만들기
5. 작동 확인
6. 문제 해결
7. 과학 영상/활동
8. 도전 미션
9. 기록/인증
10. 자료/영상 모음

## File Size And Publishing Constraints

- No file larger than 90MB may be added to `assets`.
- Prefer JPG/WebP for step and part images when possible.
- Compress public MP4 files before copying into repo.
- Keep teacher-only or source-heavy materials in `reference`, not in the public repo.
