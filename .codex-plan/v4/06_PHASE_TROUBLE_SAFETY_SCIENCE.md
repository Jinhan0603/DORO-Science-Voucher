# Phase 6 — 문제 해결, 안전 약속, 과학 영상 정리

Goal: Rewrite vague explanations into grade 4–6 friendly language.

## Troubleshooting

Rewrite each troubleshooting item so a student knows exactly what to do.

Examples:

- Bad: “기존 연결 기록을 삭제해요.”
- Good: “Bluetooth 목록에서 스피커 이름 옆의 ⓘ 또는 톱니바퀴를 눌러요. ‘이 기기 지우기’ 또는 ‘등록 해제’를 누른 뒤 다시 연결해요.”

- Bad: “R+/L+ 위치를 확인해요.”
- Good: “앰프 보드에 R+, R-, L+, L-라고 적힌 작은 글자를 찾아요. 오른쪽 스피커 선은 R 쪽, 왼쪽 스피커 선은 L 쪽에 연결해요.”

## Arduino

Student pages must not require Arduino IDE install, setup, code writing, or upload.

Add a clear note:

> 이 키트는 코드가 미리 업로드된 상태로 사용하는 것을 기준으로 안내합니다. 학생은 선 연결, 배터리 연결, 전원 켜기, 작동 확인을 따라 하면 됩니다.

Move code details to parent/teacher resources only if they exist.

## Safety promise

Replace unrelated safety OX quizzes with actual safety checklist.

Required safety items:

- MDF 판을 분리할 때 힘으로 꺾지 않기
- 작은 부품을 입에 넣지 않기
- 전선을 연결하기 전 전원 끄기
- 배터리 + / - 방향 확인하기
- 젖은 손으로 전자 부품 만지지 않기
- 날카로운 모서리나 부품은 보호자에게 도움 요청하기
- 나사/드라이버 사용 시 손 조심하기
- 부품이 없거나 부서졌으면 억지로 만들지 말고 보호자에게 알리기

All safety items must be checked before build-guide is active.

## Science video

Simplify to:

- one short question
- one video link/player if verified
- one “직접 해보기” activity

No long explanation paragraphs.
No invented YouTube links.

End commands:

```bash
grep -R "기존 연결 기록\|R+/L+\|아두이노 설치\|코드 업로드\|안전 약속\|되돌아보기" assets/js assets/css programs || true
find assets -type f -size +90M -print
git status
git diff --stat
```

Report:

1. Troubleshooting rewrites
2. Arduino flow changes
3. Safety checklist/gate status
4. Science video/activity changes
