# Phase 4 — 퀘스트 배경/미션 문구 분리

Goal: Students who do not know DOROLAND must understand why they are building the kit.

Create or update a data source such as:

- `assets/js/quest-briefs.js`

Data structure:

```js
window.DORO_QUEST_BRIEFS = {
  "1-bluetooth-speaker": {
    restore: "소리",
    background: "...",
    mission: "..."
  }
};
```

Kit copy:

1. 도블투스 — 블루투스 스피커
- Background: 도로랜드 사파리에서는 원래 곳곳에서 신나는 음악이 흘러나왔어요. 그런데 소리를 전달하던 장치가 멈추면서 사파리가 조용해졌어요.
- Mission: 도블투스를 완성하고, 멈춘 사운드 사파리에 음악을 되돌려 주세요.

2. 도도무드 — 스마트 무드등
- Background: 하모니아 빛 구역은 어두워지면 스스로 빛나는 조명으로 가득했어요. 그런데 빛을 감지하는 장치가 멈추면서 구역이 어두워졌어요.
- Mission: 도도무드를 완성하고, 어둠에 반응하는 빛을 다시 켜 주세요.

3. 도봇 — 워킹 로봇
- Background: 기계 숲에는 걸어 다니는 작은 로봇들이 길을 안내했어요. 그런데 움직임을 만드는 장치가 멈추면서 숲의 길잡이들이 멈춰 버렸어요.
- Mission: 도봇을 완성하고, 기계 숲의 움직임을 되살려 주세요.

4. 도카 — IR 자동차
- Background: 도로랜드의 트랙에서는 자동차들이 신호를 따라 움직였어요. 그런데 거리와 방향을 감지하는 장치가 멈추면서 자동차들이 길을 잃었어요.
- Mission: 도카를 완성하고, 트랙 위의 주행 미션을 다시 시작해 주세요.

5. 도텐도 — 아두이노 게임기
- Background: 게임 왕국은 버튼과 화면으로 움직이는 미션 게임이 가득한 구역이에요. 그런데 입력과 출력 장치가 멈추면서 게임이 시작되지 않아요.
- Mission: 도텐도를 완성하고, 게임 왕국의 미션을 다시 실행해 주세요.

6. 도짜르트 — 초음파 피아노
- Background: 음악 성에서는 손의 움직임에 따라 다양한 소리가 만들어졌어요. 그런데 거리를 감지하는 장치가 멈추면서 멜로디가 사라졌어요.
- Mission: 도짜르트를 완성하고, 음악 성에 소리를 되돌려 주세요.

UI:

- Show one compact mission card near top.
- Visually separate “배경” and “미션”.
- Remove or merge duplicate zone story panels.
- Do not add long chapter story.

End commands:

```bash
git status
grep -R "DORO_QUEST_BRIEFS\|배경\|미션" assets/js programs || true
find assets -type f -size +90M -print
```

Report:

1. 6 quest brief copy
2. Changed files
3. Removed duplicated story UI
