# Phase 7 — 디자인 QA 및 최종 정리

Goal: Make the site feel clean, consistent, and useful after all content is added.

Review criteria:

1. Students immediately know what to do next.
2. Detail order is clear.
3. TOC works.
4. Resource check → safety → component check → build makes sense.
5. Part cards are visual but not oversized.
6. Build step images are large and not cropped.
7. Buttons are not cluttered.
8. “완료하고 다음 단계로” is clear.
9. Troubleshooting copy is elementary-friendly.
10. Safety is actual safety.
11. Science section is not explanation-heavy.
12. Mobile layout is clean.
13. Desktop layout is not too narrow.
14. All six pages share the same UI rhythm.

Design rules:

- No extra neon.
- No heavy decorative effects.
- Same function = same button/card design.
- Consistent image ratio.
- Clear spacing.
- No tiny text.
- Korean copy: `word-break: keep-all`, `text-wrap: pretty/balance` where supported.

Check pages:

- `/programs/1-bluetooth-speaker/index.html?from=qr`
- `/programs/2-mood-light/index.html?from=qr`
- `/programs/3-walking-robot/index.html?from=qr`
- `/programs/4-ir-car/index.html?from=qr`
- `/programs/5-arduino-game/index.html?from=qr`
- `/programs/6-ultrasonic-piano/index.html?from=qr`

Screen sizes:

- 1366×768
- 1440×900
- 390×844

Commands:

```bash
git status
git diff --stat
find assets -type f -size +90M -print
grep -R "font-size:0\|letter-spacing" assets/css assets/js programs || true
grep -R "완료했어요\|완료하고 다음 단계로\|안전 약속\|자료 확인" assets/js programs || true
```

Report:

1. Design QA result
2. Problems fixed
3. Per-kit page check result
4. Mobile result
5. Desktop result
6. Remaining risks
