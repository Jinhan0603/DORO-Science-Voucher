/* DORO Science Voucher V5 Kit Data */
window.DORO_KIT_DATA = {
  "1-bluetooth-speaker": {
    id: "1-bluetooth-speaker",
    name: "도블투스",
    subtitle: "판다 블루투스 스피커",
    grade: "초등 4~6학년",
    time: "90분",
    color: "var(--emerald)",
    story: "도블투스를 완성해 사운드 사파리에 음악을 되돌려 주세요.",
    concepts: ["블루투스 통신", "소리의 진동", "앰프", "전기 회로"],
    parts: [
      { id: "body-plates", name: "목재 몸체 판 세트", icon: "wood", image: "../../assets/images/parts/1-bluetooth-speaker/body-plates.jpg", alt: "블루투스 스피커 목재 몸체 판 세트 사진", role: "스피커 몸체를 만드는 목재 판이에요.", check: "스피커 구멍이 있는 앞면 판과 긴 옆면 판들을 찾아요." },
      { id: "speaker-supports", name: "스피커 지지대 4개", icon: "wood", image: "../../assets/images/parts/1-bluetooth-speaker/speaker-supports.jpg", alt: "블루투스 스피커 지지대 4개 사진", role: "스피커를 안쪽에서 받쳐 주는 긴 막대예요.", check: "가늘고 긴 목재 조각 네 개를 찾아요." },
      { id: "speaker-rings", name: "스피커 고정대 2개", icon: "ring", image: "../../assets/images/parts/1-bluetooth-speaker/speaker-rings.jpg", alt: "블루투스 스피커 고정대 2개 사진", role: "앞면에서 스피커를 단단하게 잡아 주는 둥근 고정대예요.", check: "도넛처럼 가운데가 뚫린 판 두 개를 찾아요." },
      { id: "speakers", name: "스피커 2개", icon: "speaker", image: "../../assets/images/parts/1-bluetooth-speaker/speakers.jpg", alt: "블루투스 스피커 2개 사진", role: "진동으로 실제 소리를 내는 부품이에요.", check: "검은 원형 스피커 두 개가 나란히 있어요." },
      { id: "switch", name: "스위치", icon: "switch", image: "../../assets/images/parts/1-bluetooth-speaker/switch.jpg", alt: "블루투스 스피커 전원 스위치 사진", role: "전원을 켜고 끄는 작은 스위치예요.", check: "다리 세 개가 달린 작은 검은 스위치를 찾아요." },
      { id: "battery-holder", name: "AAA 4구 배터리 홀더", icon: "battery", image: "../../assets/images/parts/1-bluetooth-speaker/battery-holder.jpg", alt: "AAA 4구 배터리 홀더 사진", role: "AAA 건전지를 넣어 스피커에 전기를 보내는 통이에요.", check: "+, - 표시가 있는 검은 홀더를 찾아요." },
      { id: "batteries", name: "AAA 건전지 4개", icon: "battery", image: "../../assets/images/parts/1-bluetooth-speaker/batteries.jpg", alt: "AAA 건전지 4개 사진", role: "스피커가 켜지도록 전기를 보내는 건전지예요.", check: "같은 크기의 AAA 건전지 네 개를 찾아요." },
      { id: "bluetooth-module", name: "블루투스 모듈", icon: "bluetooth", image: "../../assets/images/parts/1-bluetooth-speaker/bluetooth-module.jpg", alt: "블루투스 모듈 사진", role: "휴대폰에서 보낸 음악을 받아 스피커로 보내는 회로예요.", check: "작은 회로판 모양의 블루투스 부품을 찾아요." },
      { id: "switch-wire", name: "스위치 전선", icon: "wire", image: "../../assets/images/parts/1-bluetooth-speaker/switch-wire.jpg", alt: "스위치 전선 사진", role: "스위치와 전원을 이어 주는 빨강, 검정 전선이에요.", check: "빨강선과 검정선이 한 쌍으로 붙어 있는 전선을 찾아요." },
      { id: "speaker-wire", name: "스피커 전선 2개", icon: "wire", image: "../../assets/images/parts/1-bluetooth-speaker/speaker-wire.jpg", alt: "스피커 전선 2개 사진", role: "스피커 두 개를 회로와 이어 주는 노랑, 파랑 전선이에요.", check: "노랑선과 파랑선이 붙은 전선 두 개를 찾아요." }
    ],
    starterQuiz: [
      { id: "guide-first", q: "만들기 전에 설명서와 조립 영상을 먼저 보면 부품을 찾기 쉬워요.", answer: true, note: "설명서와 영상을 먼저 보면 부품 이름과 순서를 훨씬 쉽게 찾을 수 있어요." },
      { id: "power-on-first", q: "전선을 연결하기 전에 전원을 먼저 켜고 시작해야 해요.", answer: false, note: "전원은 선 연결이 끝난 뒤에 켜야 안전하게 시험할 수 있어요." },
      { id: "speaker-wire-check", q: "스피커 선은 색깔과 연결 위치를 확인하며 꽂아야 해요.", answer: true, note: "노란선과 파란선 위치를 설명서 사진과 비교하면서 맞춰야 해요." }
    ],
    reviewQuiz: [
      { id: "speaker-sound", q: "스피커는 작은 떨림으로 공기를 흔들어 소리를 만들어요.", answer: true, note: "소리는 공기가 흔들릴 때 들려요. 스피커는 그 떨림을 만들어 주는 부품이에요." },
      { id: "speaker-module", q: "블루투스 모듈은 휴대폰에서 보낸 음악 신호를 받아요.", answer: true, note: "휴대폰에서 보낸 신호를 모듈이 받아 스피커 쪽으로 보내요." },
      { id: "speaker-stop", q: "볼륨을 크게 하면 스피커의 떨림은 완전히 멈춰요.", answer: false, note: "볼륨이 커질수록 스피커 떨림은 더 크게 느껴질 수 있어요." }
    ],
    assemblySteps: [
      { step: 1, title: "전선과 스피커를 먼저 나눠요.", detail: "노란선과 파란선, 스피커 두 개를 헷갈리지 않게 책상 위에 정리해요.", tip: "같은 부품끼리 한쪽에 모아 두면 쉬워요." },
      { step: 2, title: "스피커에 전선을 연결해요.", detail: "스피커의 +, - 표시를 보고 선을 같은 방향으로 연결해요.", tip: "두 스피커 모두 같은 방향이 되게 연결해요." },
      { step: 3, title: "스위치와 배터리선을 연결해요.", detail: "설명서 그림대로 스위치와 배터리선을 먼저 이어요.", tip: "금속 부분끼리 닿지 않게 정리해요." },
      { step: 4, title: "프레임 안쪽에 부품을 넣어요.", detail: "본체 안에 블루투스 모듈과 배터리 팩을 자리에 맞게 넣어요.", tip: "선이 프레임 틈에 끼지 않게 해요." },
      { step: 5, title: "스피커를 고정하고 전원을 켜요.", detail: "스피커를 앞면에 넣은 뒤 전원을 켜고 휴대폰과 연결해 소리를 확인해요.", tip: "처음에는 짧은 음악으로 테스트해요." }
    ],
    troubleshooting: [
      {
        symptom: "소리가 안 나요",
        steps: [
          "전원 스위치가 켜져 있는지 먼저 봐요.",
          "배터리 팩의 +, - 방향이 맞는지 다시 확인해요.",
          "휴대폰 볼륨과 스피커 볼륨 노브를 조금씩 올려 봐요.",
          "블루투스 모듈과 스피커선이 빠진 곳이 없는지 손으로 살짝 눌러 확인해요.",
          "그래도 조용하면 보호자나 선생님께 알려 주세요."
        ]
      },
      {
        symptom: "블루투스 연결이 안 돼요",
        steps: [
          "휴대폰의 설정 앱을 열고 Bluetooth 메뉴를 찾아요.",
          "Bluetooth를 껐다가 3초 뒤 다시 켜요.",
          "목록에서 스피커 이름을 찾아 눌러 연결해요.",
          "예전에 연결한 적이 있으면 이름 옆의 톱니바퀴나 ⓘ를 누른 뒤 이 기기 지우기를 선택해요.",
          "스피커 전원을 다시 켜고 목록에 나타나는지 다시 봐요."
        ]
      },
      {
        symptom: "소리가 한쪽에서만 나요",
        steps: [
          "앞면의 스피커 두 개가 모두 단단히 끼워졌는지 확인해요.",
          "노란선과 파란선이 두 스피커에 같은 방향으로 연결됐는지 봐요.",
          "블루투스 모듈에 연결된 선이 한쪽만 빠지지 않았는지 손으로 살짝 눌러 봐요.",
          "연결이 헷갈리면 설명서의 스피커 배선 그림을 다시 보고 같은 모양으로 맞춰요."
        ]
      },
      {
        symptom: "전원이 안 켜져요",
        steps: [
          "배터리 팩에 배터리가 제대로 들어 있는지 확인해요.",
          "배터리 팩 선과 스위치 선이 잘 이어져 있는지 봐요.",
          "스위치를 한 번 껐다가 다시 켜 보고 손으로 끝까지 밀렸는지 확인해요.",
          "배터리가 오래됐거나 약하면 새 배터리로 바꿔 다시 켜 봐요."
        ]
      }
    ],
    scienceLab: {
      question: "휴대폰 음악은 어떻게 스피커에서 소리가 될까요?",
      explanation: "휴대폰이 보낸 음악 신호를 블루투스 모듈이 받아요. 모듈 안의 회로가 그 신호를 스피커로 보내고, 스피커 안쪽이 진동하면서 공기를 흔들어 소리가 나요.",
      experiment: "볼륨을 아주 작게 켠 뒤 스피커 가까이에 손을 대 보세요. 볼륨을 조금씩 올릴 때 진동 느낌이 어떻게 달라지는지 관찰해 보세요.",
      concept: "무선 신호에서 전기 신호, 진동, 소리로 이어지는 흐름"
    },
    missions: {
      required: ["블루투스 스피커 조립 완성", "휴대폰과 연결해 소리 듣기"],
      inquiry: ["볼륨을 바꿨을 때 소리와 진동이 어떻게 달라지는지 확인하기", "스피커를 다른 위치에 놓았을 때 소리가 어떻게 들리는지 비교하기"],
      creative: ["내 판다 스피커에 이름 붙이기", "가장 잘 어울리는 음악 한 곡 골라 보기"]
    },
    certificateText: "나는 도블투스 판다 블루투스 스피커를 직접 만들고,\n블루투스 통신과 소리의 원리를 탐구했습니다."
  },

  "2-mood-light": {
    id: "2-mood-light",
    name: "도도무드",
    subtitle: "스마트 무드등",
    grade: "초등 4~6학년",
    time: "60~90분",
    color: "var(--purple)",
    story: "도도무드를 완성해 어두워진 무드 가든에 빛을 되돌려 주세요.",
    concepts: ["조도센서", "LED", "전기 회로", "입력과 출력"],
    parts: [
      { id: "cat-shade", name: "야옹이 등 갓", icon: "lamp", image: "../../assets/images/parts/2-mood-light/cat-shade.jpg", alt: "야옹이 등 갓 사진", role: "빛을 부드럽게 퍼뜨리는 고양이 모양 등갓이에요.", check: "반투명하고 말랑한 고양이 모양 부품을 찾아요." },
      { id: "body-plates", name: "목재 몸체 판 세트", icon: "wood", image: "../../assets/images/parts/2-mood-light/body-plates.jpg", alt: "스마트 무드등 목재 몸체 판 세트 사진", role: "무드등 몸체를 세우는 목재 판 세트예요.", check: "가운데 구멍이 있는 판과 긴 옆면 판들을 찾아요." },
      { id: "battery-holder", name: "건전지 홀더", icon: "battery", image: "../../assets/images/parts/2-mood-light/battery-holder.jpg", alt: "스마트 무드등 건전지 홀더 사진", role: "건전지를 넣어 회로에 전기를 보내는 홀더예요.", check: "빨간선과 검은선이 달린 검은 홀더를 찾아요." },
      { id: "batteries", name: "AA 건전지", icon: "battery", image: "../../assets/images/parts/2-mood-light/batteries.jpg", alt: "스마트 무드등 AA 건전지 사진", role: "무드등이 켜지도록 전기를 보내는 건전지예요.", check: "같은 크기의 원통형 건전지를 찾아요." },
      { id: "breadboard", name: "브레드보드", icon: "breadboard", image: "../../assets/images/parts/2-mood-light/breadboard.jpg", alt: "스마트 무드등 브레드보드 사진", role: "전자 부품과 선을 꽂아 회로를 만드는 작은 판이에요.", check: "구멍이 많이 나 있는 흰색 판을 찾아요." },
      { id: "electronics-set", name: "전자 부품 세트", icon: "electronics", image: "../../assets/images/parts/2-mood-light/electronics-set.jpg", alt: "스마트 무드등 전자 부품 세트 사진", role: "LED, 센서, 저항처럼 회로를 만드는 작은 전자 부품 묶음이에요.", check: "작고 가는 전자 부품들이 한곳에 모여 있는지 찾아요." }
    ],
    starterQuiz: [
      { id: "guide-first", q: "만들기 전에 설명서와 조립 영상을 먼저 보면 부품을 찾기 쉬워요.", answer: true, note: "설명서를 먼저 보면 어떤 부품부터 찾을지 바로 알 수 있어요." },
      { id: "power-on-first", q: "전선을 연결하기 전에 전원을 먼저 켜고 시작해야 해요.", answer: false, note: "선과 부품 위치를 다 맞춘 뒤에 전원을 연결해야 해요." },
      { id: "light-part-direction", q: "LED와 센서는 설명서 사진처럼 다리 방향을 보고 꽂아야 해요.", answer: true, note: "다리 방향이 바뀌면 불이 켜지지 않거나 센서 반응이 달라질 수 있어요." }
    ],
    reviewQuiz: [
      { id: "light-sensor", q: "조도센서는 주변 밝기를 느끼는 부품이에요.", answer: true, note: "밝기가 달라지면 센서가 보내는 신호도 달라져요." },
      { id: "led-output", q: "LED는 전기가 흐르면 빛을 낼 수 있어요.", answer: true, note: "LED는 전기를 빛으로 바꿔 주는 부품이에요." },
      { id: "sensor-cover", q: "센서를 가리면 무드등은 주변이 어두워졌다고 느낄 수 있어요.", answer: true, note: "손이나 종이로 가리면 센서가 들어오는 빛이 줄어들어요." }
    ],
    assemblySteps: [
      { step: 1, title: "브레드보드에 센서와 LED를 꽂아요.", detail: "부품의 방향을 보고 설명서와 같은 줄에 꽂아요.", tip: "한 번에 하나씩 꽂으면 덜 헷갈려요." },
      { step: 2, title: "점퍼선과 저항을 연결해요.", detail: "점퍼선으로 LED와 센서가 서로 이어지게 연결해요.", tip: "색이 같은 줄을 손가락으로 짚으며 확인해요." },
      { step: 3, title: "전원선을 꽂고 먼저 테스트해요.", detail: "배터리선을 연결한 뒤 센서를 손으로 가려 LED가 켜지는지 봐요.", tip: "어두운 곳에서 더 잘 보여요." },
      { step: 4, title: "몸체를 조립해요.", detail: "받침판과 기둥, 윗부분을 차례대로 끼워 모양을 완성해요.", tip: "선이 몸체 틈에 끼지 않게 정리해요." },
      { step: 5, title: "실리콘 갓을 씌워요.", detail: "갓을 위에서 천천히 눌러 씌운 뒤 빛이 잘 퍼지는지 확인해요.", tip: "한쪽만 들뜨지 않게 둥글게 씌워요." }
    ],
    troubleshooting: [
      {
        symptom: "불이 안 켜져요",
        steps: [
          "건전지 방향이 +, - 표시와 같은지 먼저 확인해요.",
          "LED의 긴 다리와 짧은 다리가 설명서와 같은 방향인지 봐요.",
          "빨간선과 검은선이 전원 자리에 제대로 꽂혔는지 손으로 살짝 눌러 봐요.",
          "조도센서를 손바닥으로 완전히 가리고 다시 확인해요."
        ]
      },
      {
        symptom: "어두워져도 반응하지 않아요",
        steps: [
          "조도센서가 브레드보드에서 빠지지 않았는지 확인해요.",
          "센서 앞을 손으로 완전히 덮어 빛이 안 들어가게 해 봐요.",
          "LED와 센서를 이어 주는 점퍼선이 빠진 곳이 없는지 설명서 그림과 비교해요.",
          "아주 밝은 곳이라면 조금 그늘진 곳으로 옮겨 다시 시험해요."
        ]
      },
      {
        symptom: "LED가 너무 약해요",
        steps: [
          "건전지가 약하지 않은지 먼저 확인해요.",
          "LED 다리가 브레드보드에 끝까지 들어갔는지 확인해요.",
          "실리콘 갓이 LED를 너무 눌러 방향이 바뀌지 않았는지 봐요.",
          "배터리선이 느슨하면 빛이 약해질 수 있으니 다시 눌러 꽂아요."
        ]
      },
      {
        symptom: "전선이 헷갈려요",
        steps: [
          "설명서를 옆에 두고 선을 한 줄씩만 따라가요.",
          "지금 확인하는 선 하나만 손가락으로 짚고 시작해요.",
          "같은 색 선끼리 먼저 모아 놓고, 끝이 어디에 꽂혀 있는지 차례대로 봐요.",
          "헷갈리는 선이 있으면 모두 빼지 말고 한 줄만 다시 맞춰 보세요."
        ]
      }
    ],
    scienceLab: {
      question: "왜 어두워지면 무드등이 켜질까요?",
      explanation: "조도센서는 주변 밝기를 느끼는 부품이에요. 밝을 때와 어두울 때 전기가 흐르는 정도가 달라지고, 그 변화에 따라 LED가 켜지거나 꺼져요.",
      experiment: "밝은 곳과 어두운 곳에서 센서를 가렸다 열었다 해 보세요. 빛의 반응 속도나 밝기가 어떻게 달라지는지 비교해 보세요.",
      concept: "빛 감지가 전기 흐름 변화와 LED 켜짐으로 이어지는 흐름"
    },
    missions: {
      required: ["무드등 회로 연결 완성", "센서를 가려 LED 켜기"],
      inquiry: ["센서를 조금만 가렸을 때와 완전히 가렸을 때 빛이 어떻게 다른지 보기", "밝은 방과 어두운 방에서 반응을 비교하기"],
      creative: ["내 무드등에 이름 붙이기", "어디에 두면 가장 잘 어울릴지 생각하기"]
    },
    certificateText: "나는 도도무드 스마트 무드등을 직접 만들고,\n조도센서와 LED의 입력-출력 원리를 탐구했습니다."
  },

  "3-walking-robot": {
    id: "3-walking-robot",
    name: "도봇",
    subtitle: "걷는 로봇",
    grade: "초등 4~6학년",
    time: "90~120분",
    color: "var(--rose)",
    story: "도봇을 완성해 멈춰 버린 기계 숲의 움직임을 되살려 주세요.",
    concepts: ["모터", "크랭크 구조", "회전 운동", "로봇 움직임"],
    parts: [
      { id: "body-plates", name: "MDF 몸체 판 세트", icon: "robot", image: "../../assets/images/parts/3-walking-robot/body-plates.jpg", alt: "워킹 로봇 MDF 몸체 판 세트 사진", role: "로봇 몸체를 만드는 큰 목재 판 세트예요.", check: "파란 그림이 붙어 있는 큰 목재 판을 찾아요." },
      { id: "leg-parts", name: "다리 부품 세트", icon: "leg", image: "../../assets/images/parts/3-walking-robot/leg-parts.jpg", alt: "워킹 로봇 다리 부품 세트 사진", role: "걸음이 나오도록 움직이는 다리 부품 세트예요.", check: "갈색과 하늘색 플라스틱 다리 조각을 찾아요." },
      { id: "motor-set", name: "모터 세트", icon: "motor", image: "../../assets/images/parts/3-walking-robot/motor-set.jpg", alt: "워킹 로봇 모터 세트 사진", role: "전기를 움직임으로 바꿔 다리를 돌리는 모터예요.", check: "노란색 모터 부품을 찾아요." },
      { id: "power-set", name: "배터리 홀더와 건전지", icon: "battery", image: "../../assets/images/parts/3-walking-robot/power-set.jpg", alt: "워킹 로봇 배터리 홀더와 건전지 사진", role: "로봇에 전기를 보내는 전원 세트예요.", check: "건전지가 들어 있는 검은 홀더를 찾아요." },
      { id: "jumper-set", name: "점퍼선 세트", icon: "wire", image: "../../assets/images/parts/3-walking-robot/jumper-set.jpg", alt: "워킹 로봇 점퍼선 세트 사진", role: "센서와 칩을 서로 이어 주는 여러 종류의 선이에요.", check: "끝 모양이 다른 여러 색 점퍼선을 찾아요." },
      { id: "ir-sensor", name: "IR 센서", icon: "sensor", image: "../../assets/images/parts/3-walking-robot/ir-sensor.jpg", alt: "워킹 로봇 IR 센서 사진", role: "앞쪽을 살피는 작은 센서예요.", check: "작은 파란 기판에 센서가 붙은 부품을 찾아요." },
      { id: "switch", name: "스위치", icon: "switch", image: "../../assets/images/parts/3-walking-robot/switch.jpg", alt: "워킹 로봇 스위치 사진", role: "전원을 켜고 끄는 작은 스위치예요.", check: "다리 세 개가 달린 검은 스위치를 찾아요." },
      { id: "mini-breadboard", name: "미니 브레드보드", icon: "breadboard", image: "../../assets/images/parts/3-walking-robot/mini-breadboard.jpg", alt: "워킹 로봇 미니 브레드보드 사진", role: "작은 부품과 선을 꽂는 흰색 판이에요.", check: "구멍이 촘촘한 작은 흰 판을 찾아요." },
      { id: "l293d", name: "L293D 모터 드라이버", icon: "chip", image: "../../assets/images/parts/3-walking-robot/l293d.jpg", alt: "워킹 로봇 L293D 모터 드라이버 사진", role: "모터 움직임을 조절하는 검은 칩이에요.", check: "다리가 여러 개 달린 긴 검은 칩을 찾아요." }
    ],
    starterQuiz: [
      { id: "guide-first", q: "만들기 전에 설명서와 조립 영상을 먼저 보면 부품을 찾기 쉬워요.", answer: true, note: "부품 수가 많을수록 설명서 사진을 먼저 보는 게 중요해요." },
      { id: "power-on-first", q: "전선을 연결하기 전에 전원을 먼저 켜고 시작해야 해요.", answer: false, note: "배선과 몸체 방향을 다 맞춘 뒤 전원을 넣어야 해요." },
      { id: "leg-direction", q: "다리 부품은 방향이 중요해서 설명서 사진과 비교해야 해요.", answer: true, note: "왼쪽과 오른쪽 다리 방향이 바뀌면 로봇이 비뚤게 걸을 수 있어요." }
    ],
    reviewQuiz: [
      { id: "robot-motor", q: "모터의 회전이 다리 움직임으로 바뀌면 로봇이 걸을 수 있어요.", answer: true, note: "돌기만 하던 힘이 다리 부품을 만나 걸음으로 바뀌어요." },
      { id: "robot-legs", q: "다리 방향이 달라지면 로봇의 걸음도 달라질 수 있어요.", answer: true, note: "다리 각도와 연결 위치가 걸음 모양을 바꿔요." },
      { id: "robot-stop", q: "모터는 멈춰 있어야 로봇이 앞으로 걸어요.", answer: false, note: "모터가 돌아야 다리도 움직이고 로봇이 걸을 수 있어요." }
    ],
    assemblySteps: [
      { step: 1, title: "몸체를 세워요.", detail: "바닥판과 옆판을 먼저 끼워 로봇의 기본 몸체를 만들어요.", tip: "홈 방향을 먼저 맞추면 쉬워요." },
      { step: 2, title: "모터를 양쪽에 끼워요.", detail: "모터 두 개를 몸체 양옆에 끼우고 선을 위로 정리해요.", tip: "선이 축에 닿지 않게 해요." },
      { step: 3, title: "다리를 연결해요.", detail: "연결 막대와 다리 판을 차례대로 끼워 네 다리를 완성해요.", tip: "좌우 방향이 뒤집히지 않게 확인해요." },
      { step: 4, title: "윗판과 회로 부품을 올려요.", detail: "윗판을 덮고 미니 브레드보드와 L293D 칩, 전원 부품을 올려 자리를 잡아요.", tip: "선이 안쪽에서 눌리지 않게 해요." },
      { step: 5, title: "배선을 꽂고 걸음을 확인해요.", detail: "설명서대로 배선을 마친 뒤 평평한 바닥에서 로봇이 걷는지 봐요.", tip: "처음에는 가까이에서 천천히 시험해요." }
    ],
    troubleshooting: [
      {
        symptom: "다리가 움직이지 않아요",
        steps: [
          "전원 스위치가 켜져 있는지 먼저 확인해요.",
          "배터리 팩 선이 회로 부품 쪽 연결 자리에서 빠지지 않았는지 봐요.",
          "모터선 두 개가 빠진 곳이 없는지 손으로 살짝 눌러 확인해요.",
          "다리나 연결 막대가 몸체에 걸려 멈춘 곳이 없는지 옆에서 봐요."
        ]
      },
      {
        symptom: "한쪽 다리만 움직여요",
        steps: [
          "움직이지 않는 쪽 모터선이 회로 부품 쪽에서 빠지지 않았는지 확인해요.",
          "그쪽 다리 막대가 빠지거나 비뚤게 끼워지지 않았는지 봐요.",
          "좌우 다리 높이가 비슷한지 책상 위에 올려 비교해요.",
          "한쪽 다리가 몸체 판에 닿아 걸리는지 손으로 천천히 움직여 봐요."
        ]
      },
      {
        symptom: "앞으로 걷지 않아요",
        steps: [
          "로봇을 평평한 바닥에 놓았는지 확인해요.",
          "네 다리가 모두 바닥에 닿는지 옆에서 살펴봐요.",
          "다리 방향이 좌우 서로 다르게 끼워지지 않았는지 설명서 그림과 비교해요.",
          "걸음이 제자리에서만 나오면 다리 연결 막대 위치를 다시 맞춰 봐요."
        ]
      },
      {
        symptom: "전원이 안 켜져요",
        steps: [
          "배터리가 들어 있는지, 방향이 맞는지 먼저 봐요.",
          "배터리 팩 스위치를 끝까지 밀었는지 확인해요.",
          "배터리 팩 선이 회로 부품 쪽에서 빠지지 않았는지 손으로 살짝 눌러 봐요.",
          "배터리가 약하면 새 배터리로 바꿔 다시 확인해요."
        ]
      }
    ],
    scienceLab: {
      question: "빙글빙글 도는 모터가 어떻게 걸음이 될까요?",
      explanation: "모터는 계속 돌기만 하지만, 다리와 연결 막대가 그 회전을 앞뒤 움직임으로 바꿔 줘요. 이 구조 덕분에 로봇이 실제로 걷는 것처럼 움직일 수 있어요.",
      experiment: "전원을 켜기 전에 다리 한쪽을 손으로 천천히 움직여 보세요. 어느 부분이 돌고, 어느 부분이 앞뒤로 흔들리는지 관찰해 보세요.",
      concept: "회전 운동이 연결 막대를 거쳐 걷는 움직임으로 바뀌는 원리"
    },
    missions: {
      required: ["도봇 조립 완성", "평평한 바닥에서 걷기 성공"],
      inquiry: ["바닥이 다른 곳에서 걸음이 어떻게 달라지는지 비교하기", "다리 움직임의 순서를 천천히 관찰하기"],
      creative: ["내 로봇에 이름과 역할 정하기", "로봇이 탐험할 장소를 상상해 보기"]
    },
    certificateText: "나는 도봇 걷는 로봇을 직접 만들고,\n회전 운동과 걷는 움직임의 원리를 탐구했습니다."
  },

  "4-ir-car": {
    id: "4-ir-car",
    name: "도카",
    subtitle: "IR 자동차",
    grade: "초등 4~6학년",
    time: "60~90분",
    color: "var(--amber)",
    story: "도카를 완성해 멈춘 트랙 위의 주행 미션을 다시 시작해 주세요.",
    concepts: ["IR 센서", "모터", "주행 제어", "반사와 감지"],
    parts: [
      { id: "body-plates", name: "자동차 MDF 몸체 판", icon: "car", image: "../../assets/images/parts/4-ir-car/body-plates.jpg", alt: "IR 자동차 MDF 몸체 판 사진", role: "자동차 몸체를 만드는 큰 목재 판이에요.", check: "자동차 모양이 한 장에 같이 붙어 있는 MDF 판을 찾아요." },
      { id: "motor-set", name: "모터 세트", icon: "motor", image: "../../assets/images/parts/4-ir-car/motor-set.jpg", alt: "IR 자동차 모터 세트 사진", role: "바퀴를 돌려 자동차를 움직이게 하는 모터예요.", check: "노란색 모터 부품을 찾아요." },
      { id: "batteries", name: "AA 건전지 3개", icon: "battery", image: "../../assets/images/parts/4-ir-car/batteries.jpg", alt: "IR 자동차 AA 건전지 3개 사진", role: "자동차가 움직이도록 전기를 보내는 건전지예요.", check: "같은 크기의 건전지 세 개를 찾아요." },
      { id: "battery-holder", name: "AA 건전지 3구 홀더", icon: "battery", image: "../../assets/images/parts/4-ir-car/battery-holder.jpg", alt: "IR 자동차 AA 건전지 3구 홀더 사진", role: "건전지 3개를 넣는 검은 홀더예요.", check: "세 칸짜리 건전지 홀더를 찾아요." },
      { id: "jumper-set", name: "점퍼선 세트", icon: "wire", image: "../../assets/images/parts/4-ir-car/jumper-set.jpg", alt: "IR 자동차 점퍼선 세트 사진", role: "센서와 모터 드라이버를 이어 주는 여러 길이의 선이에요.", check: "길이가 다른 여러 색 점퍼선을 찾아요." },
      { id: "wheels", name: "바퀴 4개", icon: "wheel", image: "../../assets/images/parts/4-ir-car/wheels.jpg", alt: "IR 자동차 바퀴 4개 사진", role: "모터 힘을 바닥에 전해 자동차가 굴러가게 해요.", check: "초록색 바퀴 네 개를 찾아요." },
      { id: "axle-set", name: "축 세트", icon: "axle", image: "../../assets/images/parts/4-ir-car/axle-set.jpg", alt: "IR 자동차 축 세트 사진", role: "바퀴를 끼워 돌게 하는 금속 축 세트예요.", check: "길이가 다른 은색 축을 찾아요." },
      { id: "ir-sensor", name: "IR 센서", icon: "sensor", image: "../../assets/images/parts/4-ir-car/ir-sensor.jpg", alt: "IR 자동차 IR 센서 사진", role: "바닥 선을 읽는 작은 센서예요.", check: "작은 파란 센서 기판을 찾아요." },
      { id: "motor-driver", name: "모터 드라이버", icon: "chip", image: "../../assets/images/parts/4-ir-car/motor-driver.jpg", alt: "IR 자동차 모터 드라이버 사진", role: "모터가 움직이도록 신호를 정리하는 칩이에요.", check: "다리가 여러 개 달린 검은 칩을 찾아요." },
      { id: "breadboard", name: "브레드보드", icon: "breadboard", image: "../../assets/images/parts/4-ir-car/breadboard.jpg", alt: "IR 자동차 브레드보드 사진", role: "작은 부품과 선을 꽂는 흰색 판이에요.", check: "작은 구멍이 많은 흰 판을 찾아요." },
      { id: "jumper-cases", name: "점퍼선 케이스", icon: "parts", image: "../../assets/images/parts/4-ir-car/jumper-cases.jpg", alt: "IR 자동차 점퍼선 케이스 사진", role: "점퍼선을 꽂거나 정리할 때 쓰는 작은 케이스예요.", check: "파란색과 하얀색 작은 케이스를 찾아요." }
    ],
    starterQuiz: [
      { id: "guide-first", q: "만들기 전에 설명서와 조립 영상을 먼저 보면 부품을 찾기 쉬워요.", answer: true, note: "자동차는 바퀴와 센서 방향이 중요해서 자료를 먼저 보는 게 좋아요." },
      { id: "power-on-first", q: "전선을 연결하기 전에 전원을 먼저 켜고 시작해야 해요.", answer: false, note: "센서와 모터 방향을 먼저 맞춘 뒤 전원을 넣어야 해요." },
      { id: "car-direction", q: "바퀴와 센서 방향은 주행에 영향을 줄 수 있어요.", answer: true, note: "센서가 앞을 잘 보고 바퀴가 바르게 끼워져야 주행이 안정돼요." }
    ],
    reviewQuiz: [
      { id: "car-sensor", q: "IR 센서는 바닥이나 앞쪽의 차이를 읽어 자동차 움직임을 도와요.", answer: true, note: "센서가 읽은 차이를 바탕으로 자동차가 방향을 정해요." },
      { id: "car-wheels", q: "왼쪽 바퀴와 오른쪽 바퀴가 다르게 돌면 방향이 바뀔 수 있어요.", answer: true, note: "두 바퀴의 움직임이 달라지면 자동차 방향도 바뀔 수 있어요." },
      { id: "car-decoration", q: "센서는 자동차와 상관없는 장식 부품이에요.", answer: false, note: "센서는 자동차가 앞을 읽고 반응하게 돕는 중요한 부품이에요." }
    ],
    assemblySteps: [
      { step: 1, title: "센서와 모터 방향을 확인해요.", detail: "센서가 앞과 아래를 보고, 모터가 좌우에 맞게 들어가는지 먼저 봐요.", tip: "앞뒤가 바뀌지 않게 설명서를 같이 봐요." },
      { step: 2, title: "차체를 세워요.", detail: "바닥판과 옆판, 앞뒤 프레임을 차례대로 끼워 몸체를 만들어요.", tip: "홈을 억지로 밀지 말고 방향을 먼저 맞춰요." },
      { step: 3, title: "센서와 모터 드라이버를 연결해요.", detail: "센서선과 모터선을 모터 드라이버와 브레드보드 자리에 맞춰 꽂아요.", tip: "왼쪽과 오른쪽이 바뀌지 않게 해요." },
      { step: 4, title: "배터리 팩과 바퀴를 끼워요.", detail: "전원을 연결하고 바퀴를 축에 끼워 자동차 모양을 완성해요.", tip: "선이 바퀴에 닿지 않게 정리해요." },
      { step: 5, title: "트랙에서 시험해요.", detail: "검은 선이 있는 바닥에 놓고 자동차가 움직이는지 확인해요.", tip: "처음에는 손으로 바로 잡을 준비를 해요." }
    ],
    troubleshooting: [
      {
        symptom: "바퀴가 안 돌아요",
        steps: [
          "전원 스위치가 켜져 있는지 먼저 확인해요.",
          "배터리 팩에 건전지가 제대로 들어 있는지 봐요.",
          "모터선 두 개가 모터 드라이버 쪽에 꽂혀 있는지 손으로 살짝 눌러 확인해요.",
          "바퀴가 축에 너무 빡빡하게 끼워져 멈춘 것은 아닌지 손으로 가볍게 돌려 봐요."
        ]
      },
      {
        symptom: "한쪽 바퀴만 돌아요",
        steps: [
          "돌지 않는 쪽 모터선이 보드에서 빠지지 않았는지 확인해요.",
          "그쪽 바퀴가 축 끝까지 제대로 끼워졌는지 봐요.",
          "왼쪽과 오른쪽 모터선이 서로 바뀌지 않았는지 설명서 그림과 비교해요.",
          "한쪽 바퀴에 선이 닿아 걸리는 곳이 없는지 확인해요."
        ]
      },
      {
        symptom: "손이나 선을 따라오지 않아요",
        steps: [
          "IR 센서 두 개가 앞쪽 아래를 향하고 있는지 먼저 봐요.",
          "센서 높이가 바닥에서 너무 멀지 않은지 확인해요.",
          "검은 선이 있는 트랙이라면 선이 진하게 보이는지 살펴봐요.",
          "손으로 시험할 때는 센서 바로 앞 가까운 거리에서 천천히 움직여 봐요."
        ]
      },
      {
        symptom: "전원이 안 켜져요",
        steps: [
          "건전지 방향이 +, - 표시와 맞는지 확인해요.",
          "배터리 팩 선이 모터 드라이버 쪽에 제대로 꽂혔는지 봐요.",
          "전원 스위치를 끝까지 밀었는지 다시 확인해요.",
          "건전지가 약하면 새 건전지로 바꿔 시험해요."
        ]
      }
    ],
    scienceLab: {
      question: "IR 센서는 어떻게 길을 찾을까요?",
      explanation: "IR 센서는 눈에 보이지 않는 빛을 보내고 다시 돌아오는 정도를 느껴요. 밝은 바닥과 어두운 선은 반사되는 빛이 달라서 자동차가 어느 쪽으로 움직일지 정할 수 있어요.",
      experiment: "검은 선과 밝은 종이를 번갈아 센서 아래에 두고 반응이 어떻게 달라지는지 관찰해 보세요.",
      concept: "보이지 않는 빛과 반사 차이로 방향을 결정하는 원리"
    },
    missions: {
      required: ["IR 자동차 조립 완성", "트랙에서 주행 시작하기"],
      inquiry: ["검은 선 굵기가 다를 때 움직임이 어떻게 달라지는지 보기", "센서 높이를 조금 바꿨을 때 반응을 비교하기"],
      creative: ["내 자동차에 이름 붙이기", "직접 작은 트랙을 만들어 보기"]
    },
    certificateText: "나는 도카 IR 자동차를 직접 만들고,\n센서와 주행 제어의 기초 원리를 탐구했습니다."
  },

  "5-arduino-game": {
    id: "5-arduino-game",
    name: "도텐도",
    subtitle: "아두이노 게임기",
    grade: "초등 4~6학년",
    time: "90~120분",
    color: "var(--cyan)",
    story: "도텐도를 완성해 멈춰 버린 게임 존의 미션을 다시 실행해 주세요.",
    concepts: ["버튼 입력", "화면 출력", "전기 회로", "게임 반응"],
    parts: [
      { id: "arduino-board", name: "아두이노 보드", icon: "arduino", image: "../../assets/images/parts/5-arduino-game/arduino-board.jpg", alt: "아두이노 게임기 아두이노 보드 사진", role: "게임기의 중심이 되는 파란 보드예요.", check: "UNO라고 적힌 파란 회로판을 찾아요." },
      { id: "lcd", name: "LCD 화면", icon: "screen", image: "../../assets/images/parts/5-arduino-game/lcd.jpg", alt: "아두이노 게임기 LCD 화면 사진", role: "게임 화면과 글자를 보여 주는 부품이에요.", check: "초록색 창이 있는 화면 부품을 찾아요." },
      { id: "switch-button-set", name: "스위치 버튼 세트", icon: "button", image: "../../assets/images/parts/5-arduino-game/switch-button-set.jpg", alt: "아두이노 게임기 스위치 버튼 세트 사진", role: "손가락으로 누르는 버튼 캡과 스위치 부품이에요.", check: "파란 버튼 캡과 검은 스위치가 같이 있는지 찾아요." },
      { id: "battery-holder", name: "건전지 홀더", icon: "battery", image: "../../assets/images/parts/5-arduino-game/battery-holder.jpg", alt: "아두이노 게임기 건전지 홀더 사진", role: "게임기에 전기를 보내는 건전지 홀더예요.", check: "전원 잭과 선이 달린 검은 홀더를 찾아요." },
      { id: "jumper-set", name: "점퍼선 세트", icon: "wire", image: "../../assets/images/parts/5-arduino-game/jumper-set.jpg", alt: "아두이노 게임기 점퍼선 세트 사진", role: "보드와 화면을 서로 이어 주는 선 묶음이에요.", check: "길이가 다른 여러 색 암수 점퍼선을 찾아요." },
      { id: "body-plates", name: "게임기 MDF 몸체 판 세트", icon: "wood", image: "../../assets/images/parts/5-arduino-game/body-plates.jpg", alt: "아두이노 게임기 MDF 몸체 판 세트 사진", role: "게임기 모양을 만드는 목재 판 세트예요.", check: "초록색 배경 위에 몸체 판들이 같이 있는 큰 조각을 찾아요." }
    ],
    starterQuiz: [
      { id: "guide-first", q: "만들기 전에 설명서와 조립 영상을 먼저 보면 부품을 찾기 쉬워요.", answer: true, note: "게임기는 버튼과 화면 위치를 설명서와 같이 보며 확인해야 해요." },
      { id: "power-on-first", q: "전선을 연결하기 전에 전원을 먼저 켜고 시작해야 해요.", answer: false, note: "버튼과 화면 위치를 다 맞춘 뒤 마지막에 전원을 연결해요." },
      { id: "game-layout", q: "버튼과 화면은 연결 위치를 확인하며 꽂아야 해요.", answer: true, note: "같은 모양이라도 연결 위치가 바뀌면 화면이나 버튼 반응이 달라질 수 있어요." }
    ],
    reviewQuiz: [
      { id: "game-input", q: "버튼은 게임기에 보내는 입력이에요.", answer: true, note: "손가락으로 누른 정보가 보드 쪽으로 들어가는 입력이에요." },
      { id: "game-output", q: "화면은 게임 상태를 보여 주는 출력이에요.", answer: true, note: "보드가 처리한 결과를 화면이 보여 주는 거예요." },
      { id: "game-signal", q: "버튼을 눌러도 전기 신호는 바뀌지 않아요.", answer: false, note: "버튼을 누르면 입력 신호가 바뀌고 게임 반응도 함께 달라져요." }
    ],
    assemblySteps: [
      { step: 1, title: "보드와 화면 자리를 확인해요.", detail: "설명서를 보며 보드, 화면, 버튼이 어디에 들어가는지 먼저 확인해요.", tip: "설치나 추가 준비 없이 선 연결부터 시작해요." },
      { step: 2, title: "스위치 버튼을 연결해요.", detail: "파란 버튼 캡과 검은 스위치 방향을 맞춘 뒤, 설명서처럼 전선을 연결해 게임 조작 자리를 만들어요.", tip: "버튼 다리와 전선이 꺾이지 않게 천천히 연결해요." },
      { step: 3, title: "화면과 선을 연결해요.", detail: "화면과 버튼에서 나오는 선을 설명서대로 보드에 꽂아요.", tip: "한 줄씩 손가락으로 짚으면서 연결해요." },
      { step: 4, title: "몸체를 조립해요.", detail: "앞판과 옆판, 뒤판을 차례대로 끼워 게임기 모양을 완성해요.", tip: "버튼이 앞면 구멍과 잘 맞는지 봐요." },
      { step: 5, title: "전원을 넣고 반응을 확인해요.", detail: "화면이 켜지고 버튼을 눌렀을 때 반응하는지 확인해요.", tip: "화면이 켜지지 않으면 전원선부터 다시 봐요." }
    ],
    troubleshooting: [
      {
        symptom: "화면이 안 켜져요",
        steps: [
          "전원선이 보드에 제대로 꽂혀 있는지 먼저 확인해요.",
          "화면 부품이 앞면이 보이도록 올바른 방향으로 들어갔는지 봐요.",
          "화면과 보드를 잇는 선이 빠진 곳이 없는지 설명서 그림과 한 줄씩 비교해요.",
          "전원을 다시 연결한 뒤 3초 정도 기다려 화면이 켜지는지 확인해요."
        ]
      },
      {
        symptom: "버튼을 눌러도 반응이 없어요",
        steps: [
          "스위치 버튼에서 나온 전선 두 개가 보드에서 빠지지 않았는지 확인해요.",
          "파란 버튼 캡과 검은 스위치가 앞면 구멍에 걸려 눌리지 않는지 손으로 눌러 봐요.",
          "버튼 선과 화면 선이 서로 자리를 바꾸지 않았는지 설명서 그림과 비교해요.",
          "버튼 다리가 비뚤어지면 눌림이 약해질 수 있으니 방향을 다시 맞춰 봐요."
        ]
      },
      {
        symptom: "전원이 안 들어와요",
        steps: [
          "전원선 양쪽이 제대로 연결됐는지 먼저 확인해요.",
          "보드에 표시등이 켜지는지 가까이에서 살펴봐요.",
          "전원선이 몸체 판에 눌려 빠진 곳이 없는지 봐요.",
          "다른 전원 연결로 바꿀 수 있으면 보호자와 함께 한 번 더 시험해요."
        ]
      },
      {
        symptom: "선 연결이 헷갈려요",
        steps: [
          "설명서를 옆에 두고 한 줄씩만 따라가요.",
          "지금 보는 선 하나만 손가락으로 짚고 시작해요.",
          "화면 선, 버튼 선처럼 같은 곳에서 나온 선끼리 먼저 모아 두어요.",
          "모두 빼지 말고 헷갈리는 선 하나만 다시 맞춰 보세요."
        ]
      }
    ],
    scienceLab: {
      question: "버튼을 누르면 왜 화면이 바뀔까요?",
      explanation: "버튼을 누르면 전기 신호가 보드로 들어가요. 보드는 미리 준비된 프로그램대로 그 신호를 읽고, 화면에 글자나 게임 장면을 바꿔 보여 줘요.",
      experiment: "버튼을 하나씩 천천히 눌러 보고, 눌렀을 때 화면이 어떻게 달라지는지 비교해 보세요.",
      concept: "버튼 입력을 보드가 판단해 화면 출력으로 연결하는 흐름"
    },
    missions: {
      required: ["게임기 회로 연결 완성", "화면 켜기", "버튼으로 게임 조작"],
      inquiry: ["버튼마다 화면 반응이 어떻게 다른지 확인하기", "천천히 누를 때와 빠르게 누를 때 반응을 비교하기"],
      creative: ["내 게임기에 이름 붙이기", "내가 만들고 싶은 게임 규칙 상상하기"]
    },
    certificateText: "나는 도텐도 아두이노 게임기를 직접 만들고,\n입력과 출력이 이어지는 원리를 탐구했습니다."
  },

  "6-ultrasonic-piano": {
    id: "6-ultrasonic-piano",
    name: "도짜르트",
    subtitle: "초음파 피아노",
    grade: "초등 4~6학년",
    time: "90~120분",
    color: "var(--amber)",
    story: "도짜르트를 완성해 조용해진 음악 성에 멜로디를 되돌려 주세요.",
    concepts: ["초음파 센서", "거리 측정", "부저", "소리 높이"],
    parts: [
      { id: "base-panel", name: "아랫판", icon: "wood", image: "../../assets/images/parts/6-ultrasonic-piano/base-panel.jpg", alt: "초음파 피아노 아랫판 사진", role: "피아노 몸체 바닥이 되는 큰 판이에요.", check: "왼쪽에 넓게 놓인 큰 목재 판을 찾아요." },
      { id: "arduino-wall-set", name: "아두이노 벽 세트", icon: "wood", image: "../../assets/images/parts/6-ultrasonic-piano/arduino-wall-set.jpg", alt: "초음파 피아노 아두이노 벽 세트 사진", role: "보드와 몸체를 세워 주는 작은 벽판 세트예요.", check: "가늘고 짧은 목재 조각들을 찾아요." },
      { id: "arduino-board", name: "아두이노 보드", icon: "arduino", image: "../../assets/images/parts/6-ultrasonic-piano/arduino-board.jpg", alt: "초음파 피아노 아두이노 보드 사진", role: "센서와 소리가 함께 움직이도록 도와주는 중심 보드예요.", check: "UNO라고 적힌 파란 회로판을 찾아요." },
      { id: "jumper-set", name: "점퍼선 세트", icon: "wire", image: "../../assets/images/parts/6-ultrasonic-piano/jumper-set.jpg", alt: "초음파 피아노 점퍼선 세트 사진", role: "센서와 보드, 부저를 이어 주는 여러 색 선이에요.", check: "색이 다른 점퍼선 묶음을 찾아요." },
      { id: "buzzer", name: "부저", icon: "buzzer", image: "../../assets/images/parts/6-ultrasonic-piano/buzzer.jpg", alt: "초음파 피아노 부저 사진", role: "전기 신호를 소리로 바꿔 음을 들려주는 부품이에요.", check: "다리 두 개가 달린 작은 검은 부품을 찾아요." },
      { id: "ultrasonic-sensor", name: "초음파 센서", icon: "sensor", image: "../../assets/images/parts/6-ultrasonic-piano/ultrasonic-sensor.jpg", alt: "초음파 피아노 초음파 센서 사진", role: "손까지의 거리를 재는 눈 역할을 하는 센서예요.", check: "동그란 눈 두 개처럼 보이는 센서를 찾아요." },
      { id: "breadboard", name: "브레드보드", icon: "breadboard", image: "../../assets/images/parts/6-ultrasonic-piano/breadboard.jpg", alt: "초음파 피아노 브레드보드 사진", role: "센서와 부저, 선을 꽂아 회로를 만드는 작은 판이에요.", check: "구멍이 많이 나 있는 흰색 판을 찾아요." },
      { id: "keyboard-panel", name: "피아노 건반", icon: "piano", image: "../../assets/images/parts/6-ultrasonic-piano/keyboard-panel.jpg", alt: "초음파 피아노 건반 판 사진", role: "도레미가 적힌 긴 건반 판이에요.", check: "길고 넓은 건반 모양 목재 판을 찾아요." },
      { id: "sensor-guard", name: "초음파 가림막", icon: "wood", image: "../../assets/images/parts/6-ultrasonic-piano/sensor-guard.jpg", alt: "초음파 피아노 초음파 가림막 사진", role: "센서 앞쪽을 가려 주는 세로 판이에요.", check: "세로로 긴 목재 판 한 장을 찾아요." }
    ],
    starterQuiz: [
      { id: "guide-first", q: "만들기 전에 설명서와 조립 영상을 먼저 보면 부품을 찾기 쉬워요.", answer: true, note: "센서와 부저 위치를 먼저 보면 조립 순서를 따라가기 쉬워요." },
      { id: "power-on-first", q: "전선을 연결하기 전에 전원을 먼저 켜고 시작해야 해요.", answer: false, note: "센서 방향과 선 위치를 다 확인한 뒤 마지막에 전원을 넣어야 해요." },
      { id: "piano-sensor-direction", q: "초음파 센서는 앞쪽 방향이 중요해요.", answer: true, note: "센서 두 눈이 앞을 잘 봐야 손 거리를 제대로 읽을 수 있어요." }
    ],
    reviewQuiz: [
      { id: "piano-distance", q: "초음파 센서는 손과 센서 사이의 거리를 알 수 있어요.", answer: true, note: "센서는 손이 얼마나 가까운지 읽고 보드에 알려 줘요." },
      { id: "piano-sound", q: "손 위치가 바뀌면 부저 소리도 달라질 수 있어요.", answer: true, note: "거리가 바뀌면 보드가 다른 음으로 반응할 수 있어요." },
      { id: "piano-buzzer", q: "부저는 빛을 내는 부품이에요.", answer: false, note: "부저는 전기 신호를 소리로 바꿔 주는 부품이에요." }
    ],
    assemblySteps: [
      { step: 1, title: "센서와 보드 자리를 확인해요.", detail: "센서가 앞을 보고, 보드와 브레드보드가 몸체 안에 들어갈 자리를 먼저 봐요.", tip: "추가 설치 없이 선 연결부터 시작해요." },
      { step: 2, title: "몸체를 세워요.", detail: "아랫판과 옆판을 끼워 피아노 몸체의 기본 모양을 만들어요.", tip: "센서가 들어갈 앞면 방향을 먼저 확인해요." },
      { step: 3, title: "센서와 부저를 연결해요.", detail: "센서선과 부저 선을 설명서 번호에 맞춰 하나씩 꽂아요.", tip: "이름이 적힌 선부터 차례대로 연결해요." },
      { step: 4, title: "선을 정리하고 전원을 넣어요.", detail: "선이 센서 앞을 가리지 않게 정리한 뒤 전원을 연결해요.", tip: "전원선은 마지막에 다시 한 번 확인해요." },
      { step: 5, title: "손으로 소리를 시험해요.", detail: "손을 센서 앞에서 가까이 했다 멀리 했다 하며 음이 달라지는지 확인해요.", tip: "천천히 움직이면 더 잘 들려요." }
    ],
    troubleshooting: [
      {
        symptom: "소리가 안 나요",
        steps: [
          "전원선이 보드에 제대로 꽂혀 있는지 먼저 확인해요.",
          "부저의 + 표시 방향이 설명서와 같은지 봐요.",
          "부저와 보드를 잇는 선이 빠지지 않았는지 손으로 살짝 눌러 확인해요.",
          "전원을 다시 연결한 뒤 손을 센서 앞 가까이에 두고 한 번 더 들어 봐요."
        ]
      },
      {
        symptom: "손을 가까이 해도 반응하지 않아요",
        steps: [
          "초음파 센서의 두 눈이 앞쪽을 보고 있는지 확인해요.",
          "센서선 네 개가 설명서와 같은 이름 자리에 꽂혀 있는지 봐요.",
          "손을 센서 바로 앞에서 천천히 움직여 보고 너무 빠르게 흔들지 않아요.",
          "센서 앞을 가리는 선이나 판이 없는지 살펴봐요."
        ]
      },
      {
        symptom: "음이 이상하게 나요",
        steps: [
          "부저가 반대로 끼워지지 않았는지 먼저 확인해요.",
          "센서와 손 사이 거리를 천천히 바꿔 보며 어느 구간에서 소리가 흔들리는지 들어 봐요.",
          "센서선이 헐거우면 거리 읽기가 흔들릴 수 있으니 다시 눌러 꽂아요.",
          "주변에서 센서 앞을 계속 지나가는 물건이 없는지 확인해요."
        ]
      },
      {
        symptom: "전원이 안 들어와요",
        steps: [
          "전원선이 보드에 제대로 꽂혀 있는지 먼저 봐요.",
          "선이 몸체 판에 눌려 빠진 곳이 없는지 확인해요.",
          "보드에 표시등이 켜지는지 가까이에서 살펴봐요.",
          "다른 전원 연결로 바꿀 수 있으면 보호자와 함께 다시 시험해요."
        ]
      }
    ],
    scienceLab: {
      question: "손의 거리를 어떻게 재서 소리로 바꿀까요?",
      explanation: "초음파 센서는 아주 높은 소리를 보내고 다시 돌아오는 시간을 재요. 그 시간 차이로 손과의 거리를 알아내고, 그 거리에 따라 부저가 다른 음을 내게 돼요.",
      experiment: "손을 아주 가까이, 중간, 멀리 세 위치에 두고 어떤 음이 나는지 차례대로 들어 보세요.",
      concept: "거리 측정이 신호 변화와 음 높이 변화로 이어지는 흐름"
    },
    missions: {
      required: ["초음파 피아노 회로 연결 완성", "손의 거리로 소리 내기", "높은 음과 낮은 음 구분하기"],
      inquiry: ["손을 움직이는 속도에 따라 소리가 어떻게 달라지는지 보기", "가까운 거리와 먼 거리에서 음 높이를 비교하기"],
      creative: ["짧은 멜로디를 만들어 보기", "내 피아노에 어울리는 이름 붙이기"]
    },
    certificateText: "나는 도짜르트 초음파 피아노를 직접 만들고,\n거리 측정과 소리의 원리를 탐구했습니다."
  }
};
