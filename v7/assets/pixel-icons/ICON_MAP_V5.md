# DOROLAND V7 Pixel Icon Map

이 문서는 V7에서 쓰는 픽셀 아이콘의 교체 지도를 정리합니다. `v7/assets/js/pixel-icons.js`는 `v7/assets/pixel-icons/icon-manifest.json`과 같은 key 구조를 사용하며, 실제 UI 렌더링은 `v7/assets/pixel-icons/individual/<key>.svg` 개별 파일을 `<img>`로 참조합니다.

교체 원칙:
- 일반 UI 아이콘은 `v7/assets/pixel-icons/individual/<key>.svg` 파일만 같은 이름으로 교체하면 V7 전체에 반영됩니다.
- `build`는 `v7/assets/pixel-icons/individual/build.svg`만 교체하면 "한 단계씩 만들기" 관련 UI가 함께 바뀝니다.
- 캐릭터는 generic `character` 아이콘을 쓰지 않습니다. 기존 DOROLAND sprite인 `assets/images/pixel/*.svg`를 직접 재사용합니다.

## Icon Inventory

| key | 의미 | 사용 위치 | 현재 자산 | 우선도 | 추천 파일명 | 비고 |
| --- | --- | --- | --- | --- | --- | --- |
| home | DORO 홈, 학습형태 | `v7/index.html` 상단 DORO 홈 링크, `v7/programs/*/index.html` QUEST INFO 학습형태 | `v7/assets/pixel-icons/individual/home.svg` | 높음 | `home.svg` | 집 실루엣으로 의미가 바로 읽혀야 함 |
| quest | 퀘스트, 미션 영역 | `v7/index.html` 상단 퀘스트 nav, QUESTS section badge | `v7/assets/pixel-icons/individual/quest.svg` | 높음 | `quest.svg` | 미션/깃발/두루마리 계열 |
| story | 도로랜드 이야기 | `v7/index.html` 상단 스토리 nav, story section badge | `v7/assets/pixel-icons/individual/story.svg` | 중간 | `story.svg` | 이야기/지도/책 느낌 |
| parts | 키트 안내, 구성품 확인, 부품 묶음 | `v7/index.html` 키트 안내 badge/DIMC 카드, `v7/assets/js/learning.js` 구성품 section/TOC/QR intro/empty guide, `kit-data.js` alias `wood`, `ring`, `panel` | `v7/assets/pixel-icons/individual/parts.svg` | 높음 | `parts.svg` | 상자+돋보기 계열 유지 |
| build | 한 단계씩 만들기, 조립, 다리/축 부품 alias | `v7/index.html` DIMC 카드, `v7/assets/js/learning.js` section title/TOC/parts gate/resource card, `kit-data.js` alias `leg`, `axle` | `v7/assets/pixel-icons/individual/build.svg` | 높음 | `build.svg` | 가장 먼저 파일 교체 가능해야 하는 핵심 아이콘 |
| record | 기록, 기록·인증 묶음 | `v7/index.html` DIMC 카드, `v7/programs/*/index.html` 기록·인증 제목, `v7/assets/js/learning.js` 기록 section/TOC/save button | `v7/assets/pixel-icons/individual/record.svg` | 중간 | `record.svg` | 노트/메모장 의미 |
| speaker | 도블투스, 스피커 부품 | `v7/index.html` p1 카드 제목, `v7/programs/1-bluetooth-speaker/index.html` badge/hero, `doroland-stories.js`, `kit-data.js` speaker part | `v7/assets/pixel-icons/individual/speaker.svg` | 중간 | `speaker.svg` | 키트 대표 아이콘 |
| lamp | 도도무드, 전구/무드등, LED alias | `v7/index.html` p2 카드 제목, `v7/programs/2-mood-light/index.html` badge/hero, `doroland-stories.js`, `kit-data.js` cat shade, alias `led` | `v7/assets/pixel-icons/individual/lamp.svg` | 중간 | `lamp.svg` | 키트 대표 아이콘 |
| robot | 도봇, 로봇 몸체 | `v7/index.html` p3 카드 제목, `v7/programs/3-walking-robot/index.html` badge/hero, `doroland-stories.js`, `kit-data.js` robot body | `v7/assets/pixel-icons/individual/robot.svg` | 중간 | `robot.svg` | 키트 대표 아이콘 |
| car | 도카, 자동차/4바퀴 특징 | `v7/index.html` p4 카드 제목, `v7/programs/4-ir-car/index.html` badge/hero/QUEST INFO 특징, `doroland-stories.js`, `kit-data.js` car body | `v7/assets/pixel-icons/individual/car.svg` | 중간 | `car.svg` | UI 아이콘이며 캐릭터 sprite와는 별도 |
| gamepad | 도텐도, 게임기 | `v7/index.html` hero badge/p5 카드 제목, `v7/programs/5-arduino-game/index.html` badge/hero, `doroland-stories.js` | `v7/assets/pixel-icons/individual/gamepad.svg` | 중간 | `gamepad.svg` | 키트 대표 아이콘 |
| piano | 도짜르트, 피아노 | `v7/index.html` p6 카드 제목, `v7/programs/6-ultrasonic-piano/index.html` badge/hero, `doroland-stories.js`, `kit-data.js` keyboard panel | `v7/assets/pixel-icons/individual/piano.svg` | 중간 | `piano.svg` | 키트 대표 아이콘 |
| time | 소요시간, TIME | `v7/index.html` 모든 카드 TIME/meta, `v7/programs/*/index.html` QUEST INFO 소요시간 | `v7/assets/pixel-icons/individual/time.svg` | 높음 | `time.svg` | 시계 형태가 작아도 읽혀야 함 |
| level | 난이도, LV | `v7/index.html` 모든 카드 LV, `v7/programs/*/index.html` QUEST INFO 난이도 | `v7/assets/pixel-icons/individual/level.svg` | 높음 | `level.svg` | 별/레벨 배지 형태 권장 |
| age | 대상 연령, AGE | `v7/index.html` 모든 카드 AGE/meta, `v7/programs/*/index.html` QUEST INFO 대상 | `v7/assets/pixel-icons/individual/age.svg` | 높음 | `age.svg` | 학생 배지 형태 권장 |
| science | 과학 실험, 핵심 과학 개념 | `v7/programs/*/index.html` science badge, `v7/assets/js/learning.js` 과학 실험 section/TOC/build complete button | `v7/assets/pixel-icons/individual/science.svg` | 높음 | `science.svg` | 비커/플라스크 실루엣 |
| photo | 키트 사진, 사진/카메라 | `v7/programs/*/index.html` 키트 사진 제목, `v7/assets/js/learning.js` TOC 키트 보기 | `v7/assets/pixel-icons/individual/photo.svg` | 중간 | `photo.svg` | 카메라/사진 프레임 |
| pdf | 교육자료, PDF, 문서 | `v7/assets/js/learning.js` starter resources title/card/button, TOC 교육자료, resources PDF card/button, alias `docs`, `document`, `starter` | `v7/assets/pixel-icons/individual/pdf.svg` | 중간 | `pdf.svg` | 접힌 문서 형태 |
| check | 완료, 체크, 퀴즈 | `v7/assets/js/learning.js` starter quiz section/TOC, 완료 badge, build done, mission done, saved message, alias `quiz`, `success`, `done` | `v7/assets/pixel-icons/individual/check.svg` | 중간 | `check.svg` | 상태 아이콘 |
| safety | 안전 약속 | `v7/assets/js/learning.js` 안전 section title/TOC | `v7/assets/pixel-icons/individual/safety.svg` | 중간 | `safety.svg` | 방패 형태 |
| help | 왜 안 되지, 도움말 | `v7/assets/js/learning.js` troubleshooting section/TOC, build help button | `v7/assets/pixel-icons/individual/help.svg` | 높음 | `help.svg` | 말풍선+공구 계열 |
| review | 되돌아보기 | `v7/assets/js/learning.js` review section/TOC, alias `book` | `v7/assets/pixel-icons/individual/review.svg` | 중간 | `review.svg` | 체크리스트/책 |
| mission | 도전 미션 | `v7/assets/js/learning.js` mission section/TOC/progress chip/build complete button | `v7/assets/pixel-icons/individual/mission.svg` | 중간 | `mission.svg` | 트로피/메달 |
| certificate | 인증하기, 인증서 | `v7/assets/js/learning.js` certificate section title | `v7/assets/pixel-icons/individual/certificate.svg` | 중간 | `certificate.svg` | 리본 문서 |
| video | 자료·영상, 조립/작동 영상 | `v7/assets/js/learning.js` starter/resource cards, video buttons, science video play, resources TOC/title | `v7/assets/pixel-icons/individual/video.svg` | 중간 | `video.svg` | 플레이 버튼이 명확해야 함 |
| email | 이메일 문의 | `v7/assets/js/learning.js` support email copy/mail buttons, alias `mail` | `v7/assets/pixel-icons/individual/email.svg` | 중간 | `email.svg` | 봉투 형태 |
| chat | 카카오톡 문의, 채팅 | `v7/assets/js/learning.js` support kakao button, alias `kakao` | `v7/assets/pixel-icons/individual/chat.svg` | 중간 | `chat.svg` | 브랜드 로고가 아닌 말풍선 |
| reset | 다시 풀기, 초기화, 처음부터 | `v7/assets/js/learning.js` parts/safety/quiz/build reset buttons, alias `clear`, `restart` | `v7/assets/pixel-icons/individual/reset.svg` | 중간 | `reset.svg` | 회전 화살표 |
| arrow-next | 다음, 이동 CTA | `v7/index.html` 미션 시작 CTA, `v7/assets/js/learning.js` next/gate buttons, alias `next` | `v7/assets/pixel-icons/individual/arrow-next.svg` | 높음 | `arrow-next.svg` | blocky filled arrow |
| arrow-back | 이전, 프로그램 목록 | `v7/programs/*/index.html` back nav, `v7/assets/js/learning.js` 이전 단계, alias `previous` | `v7/assets/pixel-icons/individual/arrow-back.svg` | 높음 | `arrow-back.svg` | blocky filled arrow |
| arrow-up | 위로, 만들기 시작/단계 위로 | `v7/assets/js/learning.js` QR 시작, build step top, alias `up` | `v7/assets/pixel-icons/individual/arrow-up.svg` | 높음 | `arrow-up.svg` | blocky filled arrow |
| music | 음악, 사운드, 부저 alias | `v7/programs/1-bluetooth-speaker/index.html` QUEST INFO AI 확장, `v7/programs/6-ultrasonic-piano/index.html` QUEST INFO 특징, `kit-data.js` alias `buzzer` | `v7/assets/pixel-icons/individual/music.svg` | 중간 | `music.svg` | 음표/소리 |
| ai | AI 확장 | `v7/programs/2-mood-light/index.html` QUEST INFO AI 확장 | `v7/assets/pixel-icons/individual/ai.svg` | 낮음 | `ai.svg` | 단일 상세 페이지 사용 |
| coding | 코딩 | `v7/programs/5-arduino-game/index.html` QUEST INFO 코딩 | `v7/assets/pixel-icons/individual/coding.svg` | 낮음 | `coding.svg` | 보드/코드 의미 |
| print | 인증서 출력 | `v7/assets/js/learning.js` certificate print button | `v7/assets/pixel-icons/individual/print.svg` | 낮음 | `print.svg` | 프린터 |
| battery | 배터리/건전지 | `v7/assets/js/kit-data.js` 배터리/홀더 part icons | `v7/assets/pixel-icons/individual/battery.svg` | 낮음 | `battery.svg` | 부품 카드용 |
| wire | 전선/점퍼선 | `v7/assets/js/kit-data.js` wire/jumper part icons | `v7/assets/pixel-icons/individual/wire.svg` | 낮음 | `wire.svg` | 부품 카드용 |
| circuit | 회로/블루투스/아두이노 alias | `v7/assets/js/kit-data.js` alias `bluetooth`, `electronics`, `board`, `arduino` | `v7/assets/pixel-icons/individual/circuit.svg` | 낮음 | `circuit.svg` | 회로판 공용 |
| breadboard | 브레드보드 | `v7/assets/js/kit-data.js` breadboard/mini-breadboard part icons | `v7/assets/pixel-icons/individual/breadboard.svg` | 낮음 | `breadboard.svg` | 부품 카드용 |
| motor | 모터 | `v7/assets/js/kit-data.js` motor part icons | `v7/assets/pixel-icons/individual/motor.svg` | 낮음 | `motor.svg` | 부품 카드용 |
| sensor | 센서 | `v7/assets/js/kit-data.js` IR/초음파 sensor part icons | `v7/assets/pixel-icons/individual/sensor.svg` | 낮음 | `sensor.svg` | 부품 카드용 |
| chip | 칩/모터 드라이버 | `v7/assets/js/kit-data.js` L293D/motor driver part icons | `v7/assets/pixel-icons/individual/chip.svg` | 낮음 | `chip.svg` | 부품 카드용 |
| wheel | 바퀴 | `v7/assets/js/kit-data.js` IR car wheels | `v7/assets/pixel-icons/individual/wheel.svg` | 낮음 | `wheel.svg` | 부품 카드용 |
| screen | LCD 화면 | `v7/assets/js/kit-data.js` Arduino game LCD | `v7/assets/pixel-icons/individual/screen.svg` | 낮음 | `screen.svg` | 부품 카드용 |
| button | 버튼/스위치 버튼 | `v7/assets/js/kit-data.js` Arduino game switch-button set | `v7/assets/pixel-icons/individual/button.svg` | 낮음 | `button.svg` | 부품 카드용 |
| power | 전원 스위치 | `v7/assets/js/kit-data.js` alias `switch` | `v7/assets/pixel-icons/individual/power.svg` | 낮음 | `power.svg` | 부품 카드용 |
| warning | 경고/주의 | 현재 직접 사용 없음, manifest 예약 | `v7/assets/pixel-icons/individual/warning.svg` | 낮음 | `warning.svg` | 추후 caution UI용 |
| lock | 잠금 | 현재 직접 사용 없음, manifest 예약 | `v7/assets/pixel-icons/individual/lock.svg` | 낮음 | `lock.svg` | gate 상태용 예약 |
| unlock | 해제 | 현재 직접 사용 없음, manifest 예약 | `v7/assets/pixel-icons/individual/unlock.svg` | 낮음 | `unlock.svg` | gate 상태용 예약 |
| wood | 목재 판 alias | `v7/assets/js/kit-data.js` 여러 kit body/base/wood parts | `v7/assets/pixel-icons/individual/parts.svg` | 낮음 | `parts.svg` | `pixel-icons.js`에서 `parts`로 resolve |
| ring | 링/고정대 alias | `v7/assets/js/kit-data.js` p1 speaker rings | `v7/assets/pixel-icons/individual/parts.svg` | 낮음 | `parts.svg` | `pixel-icons.js`에서 `parts`로 resolve |
| panel | 판/패널 alias | `v7/assets/js/kit-data.js` 일부 panel part | `v7/assets/pixel-icons/individual/parts.svg` | 낮음 | `parts.svg` | `pixel-icons.js`에서 `parts`로 resolve |
| leg | 다리 부품 alias | `v7/assets/js/kit-data.js` p3 leg-parts | `v7/assets/pixel-icons/individual/build.svg` | 높음 | `build.svg` | `build` 교체 시 함께 변경 |
| axle | 축 세트 alias | `v7/assets/js/kit-data.js` p4 axle-set | `v7/assets/pixel-icons/individual/build.svg` | 높음 | `build.svg` | `build` 교체 시 함께 변경 |
| switch | 스위치 alias | `v7/assets/js/kit-data.js` power switch parts | `v7/assets/pixel-icons/individual/power.svg` | 낮음 | `power.svg` | `pixel-icons.js`에서 `power`로 resolve |
| bluetooth | 블루투스 모듈 alias | `v7/assets/js/kit-data.js` p1 bluetooth-module | `v7/assets/pixel-icons/individual/circuit.svg` | 낮음 | `circuit.svg` | `pixel-icons.js`에서 `circuit`로 resolve |
| electronics | 전자 부품 alias | `v7/assets/js/kit-data.js` p2 electronics-set | `v7/assets/pixel-icons/individual/circuit.svg` | 낮음 | `circuit.svg` | `pixel-icons.js`에서 `circuit`로 resolve |
| board | 보드 alias | `v7/assets/js/kit-data.js` reserved/alias | `v7/assets/pixel-icons/individual/circuit.svg` | 낮음 | `circuit.svg` | `pixel-icons.js`에서 `circuit`로 resolve |
| arduino | 아두이노 보드 alias | `v7/assets/js/kit-data.js` p5/p6 Arduino board | `v7/assets/pixel-icons/individual/circuit.svg` | 낮음 | `circuit.svg` | `pixel-icons.js`에서 `circuit`로 resolve |
| led | LED alias | `v7/assets/js/kit-data.js` reserved/alias | `v7/assets/pixel-icons/individual/lamp.svg` | 낮음 | `lamp.svg` | `pixel-icons.js`에서 `lamp`로 resolve |
| buzzer | 부저 alias | `v7/assets/js/kit-data.js` p6 buzzer | `v7/assets/pixel-icons/individual/music.svg` | 낮음 | `music.svg` | `pixel-icons.js`에서 `music`로 resolve |

## build 아이콘 교체 영향 범위

교체 파일: `v7/assets/pixel-icons/individual/build.svg`

현재 직접 연결된 UI binding은 5곳이고, part alias 2개가 추가로 `build.svg`를 공유합니다.

| 범위 | 위치 | 영향 |
| --- | --- | --- |
| 메인 안내 카드 | `v7/index.html:93` | DIMC "한 단계씩 만들기" 카드의 큰 아이콘 |
| 상세 섹션 제목 | `v7/assets/js/learning.js`, `sectionIconForKey('learning.build.title')` | 6개 상세 페이지의 "한 단계씩 만들기" section heading |
| 구성품 완료 후 이동 CTA | `v7/assets/js/learning.js`, `parts-build` button icon mapping | 구성품 확인 완료 후 만들기로 이동하는 버튼 |
| 동적 TOC | `v7/assets/js/learning.js`, `SECTION_IDS.buildGuide` TOC item | 6개 상세 페이지의 "한 단계씩 만들기" TOC 아이콘 |
| 자료·영상 카드 | `v7/assets/js/learning.js`, resources assembly card | 조립 영상/조립 자료 카드의 resource icon |
| 부품 alias | `v7/assets/js/kit-data.js` icon `leg`, `pixel-icons.js` alias `leg -> build` | 도봇 다리 부품 카드 |
| 부품 alias | `v7/assets/js/kit-data.js` icon `axle`, `pixel-icons.js` alias `axle -> build` | 도카 축 세트 부품 카드 |

정리: `build.svg`만 같은 파일명으로 교체하면 위 위치가 함께 변경됩니다. `kit-data.js`의 `leg`, `axle` 문자열은 유지하고, alias가 계속 `build`로 모이게 두는 구조입니다.

## Character Sprite Inventory

캐릭터는 `v7/assets/pixel-icons/individual/` 아래 generic icon으로 관리하지 않습니다. 기존 DOROLAND pixel sprite를 직접 사용합니다.

| 키트 | 캐릭터 의미 | 사용 위치 | sprite 경로 | 비고 |
| --- | --- | --- | --- | --- |
| 도블투스 | 판다 | `v7/index.html` 카드 우상단/도로랜드 이야기, `v7/programs/1-bluetooth-speaker/index.html` QUEST INFO 캐릭터 | `assets/images/pixel/panda.svg` | 상세 페이지 상대경로는 `../../../assets/images/pixel/panda.svg` |
| 도도무드 | 고양이 | `v7/index.html` 카드 우상단/도로랜드 이야기, `v7/programs/2-mood-light/index.html` QUEST INFO 캐릭터 | `assets/images/pixel/cat.svg` | 상세 페이지 상대경로는 `../../../assets/images/pixel/cat.svg` |
| 도봇 | 강아지 | `v7/index.html` 카드 우상단/도로랜드 이야기, `v7/programs/3-walking-robot/index.html` QUEST INFO 캐릭터 | `assets/images/pixel/dog.svg` | 상세 페이지 상대경로는 `../../../assets/images/pixel/dog.svg` |
| 도카 | 자동차 캐릭터 | `v7/index.html` 카드 우상단/도로랜드 이야기 | `assets/images/pixel/car.svg` | p4 QUEST INFO는 generic character 없이 특징 row에서 `car` UI icon 사용 |
| 도텐도 | 하늘색 가오리 | `v7/index.html` 카드 우상단/도로랜드 이야기, `v7/programs/5-arduino-game/index.html` QUEST INFO 캐릭터 | `v7/assets/images/pixel/ray.svg` | 상세 페이지 상대경로는 `../../assets/images/pixel/ray.svg` |
| 도짜르트 | 초록색 뱀 | `v7/index.html` 카드 우상단/도로랜드 이야기, `v7/programs/6-ultrasonic-piano/index.html` QUEST INFO 캐릭터 | `v7/assets/images/pixel/snake.svg` | 상세 페이지 상대경로는 `../../assets/images/pixel/snake.svg` |

## Replacement Checklist

1. 바꿀 key를 위 표에서 찾습니다.
2. `v7/assets/pixel-icons/individual/<key>.svg` 파일만 같은 이름으로 교체합니다.
3. key를 새로 추가할 때만 `v7/assets/pixel-icons/icon-manifest.json`과 `v7/assets/js/pixel-icons.js`의 `iconKeys`에 같은 key를 추가합니다.
4. 캐릭터는 `assets/images/pixel/*.svg` sprite를 교체하거나 확장하고, generic `character` key를 만들지 않습니다.


