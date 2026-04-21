# Phase 6 Support Content Report

## Troubleshooting Rewrites

- All six kits now use shared troubleshooting content from `assets/js/assembly-guides.js`.
- Each troubleshooting item was rewritten as a concrete student action:
  - what to check first
  - where to look on the kit
  - what to compare next
- Vague or adult-only phrasing was removed from the public troubleshooting layer.

## Arduino Flow Changes

- `5-arduino-game` now shows a clear preloaded-code note:
  - `이 키트는 코드가 미리 업로드된 상태로 사용하는 것을 기준으로 안내합니다. 학생은 선 연결, 배터리 연결, 전원 켜기, 작동 확인을 따라 하면 됩니다.`
- `6-ultrasonic-piano` now shows the same preloaded-code note.
- The stale source HTML phrases `코드 업로드` were removed from:
  - `programs/5-arduino-game/index.html`
  - `programs/6-ultrasonic-piano/index.html`

## Safety Checklist And Gate

- Existing safety checklist items remain active and unchanged.
- Build-guide access is still blocked until all safety items are checked.
- No unrelated OX quiz behavior was reintroduced.

## Science Video And Activity

- All six kits now use a simplified science section rendered from shared data:
  - one short question
  - one verified local video player using the kit demo video
  - one short `직접 해보기` activity
- No invented YouTube links were added.

## Validation

- `node --check assets/js/detail.js`
- `node --check assets/js/assembly-guides.js`
- `rg -n "기존 연결 기록|R\\+/L\\+|아두이노 설치|코드 업로드|안전 약속|되돌아보기" assets/js assets/css programs`
  - result: only expected `안전 약속` matches remain
- no `assets` file exceeded `90 MB`
