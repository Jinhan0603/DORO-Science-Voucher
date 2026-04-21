# Phase 3 — 상세 페이지 학습 순서와 목차 수정

Goal: Fix the detail page learning order and TOC before adding heavy media.

Target order:

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

Section IDs:

- `mission-brief`
- `start-resources`
- `start-check`
- `safety-quest`
- `component-check`
- `build-guide`
- `troubleshooting`
- `science-video`
- `challenge-missions`
- `record-verify`
- `resources-media`

Tasks:

1. Update TOC generation so every TOC item points to an existing in-page section.
2. Make TOC click smoothly scroll within the same page.
3. Remove stale anchors and duplicated terms such as old “준비물 확인/부품 확인 미션”.
4. Adjust QR entry buttons to the new flow:
   - 자료 확인
   - 안전 약속
   - 만들기 시작
5. Add safety gate behavior:
   - If safety is incomplete, build guide shows a clear message and button to safety section.
   - If safety is complete, build guide is active.
6. Preserve localStorage progress.

Files likely affected:

- `assets/js/learning.js`
- `assets/js/detail.js`
- `assets/js/i18n.js`
- `assets/css/style.css`
- `programs/*/index.html`

End commands:

```bash
git status
grep -R "mission-brief\|start-resources\|start-check\|safety-quest\|component-check\|build-guide" assets/js assets/css programs || true
find assets -type f -size +90M -print
```

Manual check pages:

- `/programs/1-bluetooth-speaker/index.html?from=qr`
- `/programs/2-mood-light/index.html?from=qr`
- `/programs/3-walking-robot/index.html?from=qr`
- `/programs/4-ir-car/index.html?from=qr`
- `/programs/5-arduino-game/index.html?from=qr`
- `/programs/6-ultrasonic-piano/index.html?from=qr`

Report:

1. New order
2. TOC fixes
3. Safety gate status
4. Files changed
