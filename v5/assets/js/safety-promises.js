(function () {
  'use strict';

  window.DORO_SAFETY_PROMISES = {
    common: [
      {
        id: 'small-parts',
        text: '작은 부품을 입에 넣지 않아요.',
        reason: '작은 부품은 삼키면 위험해요.'
      },
      {
        id: 'mdf-care',
        text: 'MDF 판은 억지로 꺾지 않고 천천히 떼어내요.',
        reason: '세게 꺾으면 부품이 부러지거나 손이 아플 수 있어요.'
      },
      {
        id: 'power-off',
        text: '전선을 연결하거나 고칠 때는 전원을 꺼요.',
        reason: '전원이 켜진 채 만지면 연결이 헷갈리거나 부품이 망가질 수 있어요.'
      },
      {
        id: 'dry-hands',
        text: '젖은 손으로 전자 부품을 만지지 않아요.',
        reason: '물기가 있으면 전자 부품이 망가질 수 있어요.'
      },
      {
        id: 'no-force',
        text: '잘 안 끼워지는 부품은 힘으로 누르지 않고 도움을 요청할게요.',
        reason: '억지로 누르면 부품이 부러지거나 손이 다칠 수 있어요.'
      }
    ],
    kits: {
      '1-bluetooth-speaker': [
        {
          id: 'speaker-battery-check',
          text: 'AAA 건전지의 +, - 방향을 먼저 확인해요.',
          reason: '방향이 바뀌면 전원이 켜지지 않거나 배터리가 뜨거워질 수 있어요.'
        },
        {
          id: 'speaker-ear',
          text: '스피커를 귀에 가까이 대고 크게 틀지 않아요.',
          reason: '큰 소리는 귀에 무리가 될 수 있어요.'
        },
        {
          id: 'speaker-wire-pull',
          text: '스피커 선과 스위치 선을 세게 잡아당기지 않아요.',
          reason: '가느다란 선은 쉽게 빠지거나 끊어질 수 있어요.'
        }
      ],
      '2-mood-light': [
        {
          id: 'mood-battery-check',
          text: '건전지의 +, - 방향을 먼저 확인해요.',
          reason: '방향이 바뀌면 불이 켜지지 않거나 부품이 뜨거워질 수 있어요.'
        },
        {
          id: 'mood-bend',
          text: 'LED와 센서를 억지로 구부리지 않아요.',
          reason: '가느다란 다리가 꺾이면 연결이 어려워져요.'
        },
        {
          id: 'mood-cover',
          text: '빛을 시험할 때 센서는 손으로 살짝만 가려요.',
          reason: '센서를 세게 누르면 다리가 휘어질 수 있어요.'
        }
      ],
      '3-walking-robot': [
        {
          id: 'robot-battery-check',
          text: '배터리 홀더의 +, - 방향을 먼저 확인해요.',
          reason: '방향이 바뀌면 모터가 움직이지 않거나 홀더가 뜨거워질 수 있어요.'
        },
        {
          id: 'robot-fingers',
          text: '다리가 움직일 때 손가락을 가까이 대지 않아요.',
          reason: '움직이는 다리 사이에 손가락이 끼일 수 있어요.'
        },
        {
          id: 'robot-motor-force',
          text: '모터와 다리 부품을 힘으로 억지로 돌리지 않아요.',
          reason: '축이 틀어지면 걸음이 어긋날 수 있어요.'
        },
        {
          id: 'robot-flat-floor',
          text: '로봇 테스트는 평평한 곳에서 해요.',
          reason: '울퉁불퉁한 곳에서는 로봇이 넘어질 수 있어요.'
        }
      ],
      '4-ir-car': [
        {
          id: 'car-battery-check',
          text: '건전지 3개의 +, - 방향을 먼저 확인해요.',
          reason: '방향이 바뀌면 자동차가 움직이지 않거나 전원이 불안정해질 수 있어요.'
        },
        {
          id: 'car-wheels',
          text: '바퀴가 돌 때 손가락을 가까이 대지 않아요.',
          reason: '움직이는 바퀴에 손이 닿으면 놀라거나 다칠 수 있어요.'
        },
        {
          id: 'car-floor-test',
          text: '자동차는 바닥이나 넓은 곳에서 테스트해요.',
          reason: '책상 끝에서 시험하면 떨어질 수 있어요.'
        },
        {
          id: 'car-sensor-touch',
          text: '센서를 만질 때 세게 누르지 않아요.',
          reason: '센서 위치가 틀어지면 주행 반응이 달라질 수 있어요.'
        }
      ],
      '5-arduino-game': [
        {
          id: 'game-battery-check',
          text: '건전지 홀더의 +, - 방향을 먼저 확인해요.',
          reason: '방향이 바뀌면 화면이 켜지지 않거나 전원이 불안정해질 수 있어요.'
        },
        {
          id: 'game-buttons',
          text: '버튼을 너무 세게 누르지 않아요.',
          reason: '버튼 다리나 앞판이 휘어질 수 있어요.'
        },
        {
          id: 'game-power-off',
          text: '전선을 바꿀 때는 전원을 먼저 꺼요.',
          reason: '전원이 켜진 채 선을 바꾸면 연결이 꼬일 수 있어요.'
        },
        {
          id: 'game-wire-pull',
          text: '화면과 보드에 꽂힌 선을 세게 잡아당기지 않아요.',
          reason: '선이 빠지면 화면이나 버튼 반응이 멈출 수 있어요.'
        }
      ],
      '6-ultrasonic-piano': [
        {
          id: 'piano-buzzer-ear',
          text: '부저를 귀에 가까이 대고 테스트하지 않아요.',
          reason: '가까운 소리는 귀를 놀라게 할 수 있어요.'
        },
        {
          id: 'piano-sensor-touch',
          text: '초음파 센서를 손으로 세게 누르지 않아요.',
          reason: '센서가 기울면 거리 읽기가 달라질 수 있어요.'
        },
        {
          id: 'piano-table-test',
          text: '피아노는 책상 위에 놓고 얼굴 가까이 들지 않은 채 시험해요.',
          reason: '몸체를 들고 움직이면 선이 빠지거나 센서 위치가 흔들릴 수 있어요.'
        }
      ]
    }
  };
})();
