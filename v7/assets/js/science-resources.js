(function () {
  'use strict';

  function text(ko, en) {
    return { ko: ko, en: en };
  }

  function thumb(videoId) {
    return 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
  }

  function video(options) {
    return options;
  }

  window.DORO_SCIENCE_RESOURCES = {
    '1-bluetooth-speaker': {
      question: text(
        '스피커가 진짜 떨린다고?',
        'Does the speaker really vibrate?'
      ),
      hook: text(
        '소리는 안 보이지만, 스피커의 떨림은 손으로 느낄 수 있어요.',
        'You cannot see sound, but you can still feel the speaker vibrating.'
      ),
      summary: text(
        '블루투스는 음악 신호를 무선으로 보내요. 스피커 안의 작은 떨림이 공기를 흔들면 우리가 소리로 듣게 돼요.',
        'Bluetooth sends music wirelessly. Tiny vibrations inside the speaker shake the air, and that becomes the sound we hear.'
      ),
      concepts: {
        ko: ['블루투스', '전기 신호', '진동', '소리'],
        en: ['Bluetooth', 'Electric Signal', 'Vibration', 'Sound']
      },
      tryIt: text(
        '볼륨을 낮게 켜고 스피커 가까이에 손을 대 보세요. 음악이 나올 때 작은 떨림이 느껴지는지 확인해요.',
        'Play music at a low volume and place your hand near the speaker. Check whether you can feel a small vibration.'
      ),
      kitConnection: text(
        '내가 연결한 스피커 유닛과 블루투스 모듈이 함께 소리를 만들어요.',
        'The speaker units and Bluetooth module you connected work together to make the sound.'
      ),
      learnMore: text(
        '스피커 안에서는 전기 신호가 진동으로 바뀌어요. 그 진동이 공기를 흔들면 우리가 듣는 소리가 돼요.',
        'Inside the speaker, an electrical signal changes into vibration. That vibration shakes the air and becomes the sound we hear.'
      ),
      videos: [
        video({
          title: text(
            'How Speakers Make Sound || Working Of Speakers || 3D Animation',
            'How Speakers Make Sound || Working Of Speakers || 3D Animation'
          ),
          channel: 'Mech Tech',
          url: 'https://www.youtube.com/watch?v=9JsqxlTuP6Y',
          videoId: '9JsqxlTuP6Y',
          thumbnail: thumb('9JsqxlTuP6Y'),
          source: 'YouTube',
          language: 'en',
          type: 'video',
          badge: text('추천 영상', 'Recommended'),
          duration: '1:30',
          note: text(
            '스피커 안 진동판이 움직이며 소리가 생기는 흐름을 짧게 볼 수 있어요.',
            'A short visual showing how the speaker cone moves and creates sound.'
          )
        }),
        video({
          title: text(
            'Vibration & Sound: Make Sprinkles Dance | STEM Activity',
            'Vibration & Sound: Make Sprinkles Dance | STEM Activity'
          ),
          channel: 'Science Buddies',
          url: 'https://www.youtube.com/watch?v=j9IvcwZFx9s',
          videoId: 'j9IvcwZFx9s',
          thumbnail: thumb('j9IvcwZFx9s'),
          source: 'YouTube',
          language: 'en',
          type: 'video',
          badge: text('직접 연결 영상', 'See It in Action'),
          duration: '1:02',
          note: text(
            '소리와 진동을 눈으로 볼 수 있는 간단한 실험이라 직접 해보기와 잘 이어져요.',
            'A simple experiment that lets you see vibration and connect it to your own kit.'
          )
        })
      ],
      safetyNote: text(
        '외부 영상은 보호자와 함께 열어 주세요. 영상 속 실험을 그대로 따라 하기보다, 원리를 이해하는 참고 자료로 봐 주세요.',
        'Open external videos with a parent or teacher. Use them to understand the idea, not to copy risky experiments.'
      )
    },
    '2-mood-light': {
      question: text(
        '빛이 사라지면 무드등은 어떻게 알아챌까요?',
        'How does the mood light notice when the room gets dark?'
      ),
      hook: text(
        '센서를 손으로 가리면, 무드등이 밤이 온 줄 알고 반응해요.',
        'Cover the sensor with your hand and the mood light reacts as if night has arrived.'
      ),
      summary: text(
        '조도센서는 주변이 밝은지 어두운지 느끼는 부품이에요. 어두워지면 LED가 켜지도록 회로가 반응해요.',
        'A light sensor checks whether the room is bright or dark. When it gets darker, the circuit reacts and turns on the LED.'
      ),
      concepts: {
        ko: ['조도센서', '빛', 'LED', '입력·출력'],
        en: ['Light Sensor', 'Light', 'LED', 'Input/Output']
      },
      tryIt: text(
        '손이나 종이로 센서를 살짝 가려 보세요. 빛이 바뀌는지 바로 확인해요.',
        'Cover the sensor gently with your hand or paper and see if the light changes.'
      ),
      kitConnection: text(
        '조도센서가 주변 밝기를 느끼고, LED가 빛으로 반응해요.',
        'The light sensor feels the room brightness, and the LED responds with light.'
      ),
      learnMore: text(
        '센서는 주변 빛이 줄어들면 신호를 바꿔요. 보드는 그 변화를 읽고 LED를 켤지 말지 정해요.',
        'When the room gets darker, the sensor changes its signal. The board reads that change and decides whether the LED should turn on.'
      ),
      videos: [
        video({
          title: text(
            'How To Build An Automatic Night-Light',
            'How To Build An Automatic Night-Light'
          ),
          channel: 'BuildElectronicCircuits by Ohmify',
          url: 'https://www.youtube.com/watch?v=mHBG2sBcyTM',
          videoId: 'mHBG2sBcyTM',
          thumbnail: thumb('mHBG2sBcyTM'),
          source: 'YouTube',
          language: 'en',
          type: 'video',
          badge: text('추천 영상', 'Recommended'),
          duration: '1:38',
          note: text(
            '어두워지면 켜지는 밤 조명의 반응을 짧게 먼저 볼 수 있어요.',
            'A quick look at how a night light turns on when the room gets dark.'
          )
        }),
        video({
          title: text(
            'Electronic Circuit: Dark Activated LED light with photoresistor',
            'Electronic Circuit: Dark Activated LED light with photoresistor'
          ),
          channel: 'educ8s.tv',
          url: 'https://www.youtube.com/watch?v=eEBMTpxdPiE',
          videoId: 'eEBMTpxdPiE',
          thumbnail: thumb('eEBMTpxdPiE'),
          source: 'YouTube',
          language: 'en',
          type: 'video',
          badge: text('원리 보기', 'How It Works'),
          duration: '4:40',
          note: text(
            'photoresistor가 LED 반응과 연결되는 장면을 눈으로 따라가기 좋아요.',
            'A clear demo of how the photoresistor connects to the LED response.'
          )
        })
      ],
      safetyNote: text(
        '외부 영상은 보호자와 함께 열어 주세요. 영상 속 실험을 그대로 따라 하기보다, 원리를 이해하는 참고 자료로 봐 주세요.',
        'Open external videos with a parent or teacher. Use them to understand the idea, not to copy risky experiments.'
      )
    },
    '3-walking-robot': {
      question: text(
        '빙글빙글 도는 모터가 어떻게 걸음이 될까요?',
        'How does a spinning motor turn into walking?'
      ),
      hook: text(
        '다리 부품을 보면 회전이 걸음으로 바뀌는 순간을 볼 수 있어요.',
        'Watch the leg parts closely and you can see spinning turn into walking.'
      ),
      summary: text(
        '모터가 빙글빙글 돌면, 다리 부품이 앞뒤로 움직여요. 회전 운동이 걷는 움직임으로 바뀌는 거예요.',
        'When the motor spins, the leg parts move back and forth. A spinning motion changes into a walking motion.'
      ),
      concepts: {
        ko: ['모터', '회전 운동', '연결 부품', '보행'],
        en: ['Motor', 'Rotation', 'Linkage', 'Walking']
      },
      tryIt: text(
        '로봇을 들어 올린 상태에서 다리가 어떻게 움직이는지 천천히 관찰해요.',
        'Hold the robot up and watch how the legs move.'
      ),
      kitConnection: text(
        '내가 조립한 다리와 연결 부품이 모터의 회전을 걸음으로 바꿔 줘요.',
        'The legs and link parts you assembled turn the motor rotation into steps.'
      ),
      learnMore: text(
        '모터는 계속 같은 방향으로 돌아도, 연결된 부품 모양이 다리의 앞뒤 움직임을 만들어 줘요.',
        'Even when the motor keeps spinning in one direction, the connected parts change that into forward and backward leg motion.'
      ),
      videos: [
        video({
          title: text(
            'Simple Walking Robot',
            'Simple Walking Robot'
          ),
          channel: 'Science Buddies',
          url: 'https://www.youtube.com/watch?v=nOQPDmxIo68',
          videoId: 'nOQPDmxIo68',
          thumbnail: thumb('nOQPDmxIo68'),
          source: 'YouTube',
          language: 'en',
          type: 'shorts',
          badge: text('짧게 보기', 'Quick Look'),
          duration: '0:11',
          note: text(
            '짧지만 다리 링크가 실제 걸음으로 바뀌는 장면이 바로 보여요.',
            'A very short clip that shows the linkage turning into a real walking motion.'
          )
        }),
        video({
          title: text(
            'Walking Robot Mechanism 3D Model',
            'Walking Robot Mechanism 3D Model'
          ),
          channel: 'trinityscsp',
          url: 'https://www.youtube.com/watch?v=VbSL5W8Ua6M',
          videoId: 'VbSL5W8Ua6M',
          thumbnail: thumb('VbSL5W8Ua6M'),
          source: 'YouTube',
          language: 'en',
          type: 'video',
          badge: text('원리 보기', 'How It Works'),
          duration: '1:29',
          note: text(
            '회전이 보행으로 바뀌는 구조를 3D로 보여 줘서 이해하기 쉬워요.',
            'A 3D view makes it easy to see how rotation becomes walking.'
          )
        })
      ],
      safetyNote: text(
        '외부 영상은 보호자와 함께 열어 주세요. 영상 속 실험을 그대로 따라 하기보다, 원리를 이해하는 참고 자료로 봐 주세요.',
        'Open external videos with a parent or teacher. Use them to understand the idea, not to copy risky experiments.'
      )
    },
    '4-ir-car': {
      question: text(
        '자동차가 앞을 보는 눈은 어디에 있을까요?',
        'Where are the eyes that help the car see ahead?'
      ),
      hook: text(
        '센서 앞에 손을 대면 도카가 주변을 느끼는 방법을 확인할 수 있어요.',
        'Put your hand in front of the sensor and you can see how the car notices its surroundings.'
      ),
      summary: text(
        '센서는 눈에 잘 보이지 않는 빛이나 거리를 감지해요. 자동차는 센서가 느낀 정보를 보고 바퀴를 움직여요.',
        'The sensor detects invisible light or distance. The car reads that information and moves its wheels.'
      ),
      concepts: {
        ko: ['센서', '적외선', '거리', '모터'],
        en: ['Sensor', 'Infrared', 'Distance', 'Motor']
      },
      tryIt: text(
        '손을 센서 앞에 가까이 댔다가 멀리해 보세요. 자동차 반응이 달라지는지 확인해요.',
        'Move your hand closer to the sensor and then farther away. Check whether the car reacts differently.'
      ),
      kitConnection: text(
        '센서가 앞쪽 상황을 느끼고, 모터가 바퀴를 움직여요.',
        'The sensor checks what is in front of the car, and the motor turns the wheels.'
      ),
      learnMore: text(
        '센서는 앞쪽 정보를 숫자처럼 읽고, 그 신호에 맞춰 자동차가 멈추거나 움직이게 해요.',
        'The sensor reads what is in front like information, and that signal tells the car when to move or stop.'
      ),
      videos: [
        video({
          title: text(
            'Line Following Robot | Sparklebox Robotics Kit | Easy Robotics Projects for kids | Sparkle Box',
            'Line Following Robot | Sparklebox Robotics Kit | Easy Robotics Projects for kids | Sparkle Box'
          ),
          channel: 'Sparkle Box',
          url: 'https://www.youtube.com/watch?v=OgHTdUaifJg',
          videoId: 'OgHTdUaifJg',
          thumbnail: thumb('OgHTdUaifJg'),
          source: 'YouTube',
          language: 'en',
          type: 'video',
          badge: text('추천 영상', 'Recommended'),
          duration: '7:12',
          note: text(
            '아이용 로봇 키트 예시로 라인을 따라가는 센서 자동차를 안전하게 볼 수 있어요.',
            'A safe kid-focused example showing a sensor car following a line.'
          )
        }),
        video({
          title: text(
            'Arduino Line Follower Robot IR Sensor PathFinder RoboTracker SmartTracer',
            'Arduino Line Follower Robot IR Sensor PathFinder RoboTracker SmartTracer'
          ),
          channel: 'TECHDELIVERS',
          url: 'https://www.youtube.com/watch?v=Rt6Jg4eJtC8',
          videoId: 'Rt6Jg4eJtC8',
          thumbnail: thumb('Rt6Jg4eJtC8'),
          source: 'YouTube',
          language: 'en',
          type: 'shorts',
          badge: text('짧게 보기', 'Quick Look'),
          duration: '0:50',
          note: text(
            'IR 센서가 선을 따라 움직이는 핵심 반응을 짧게 확인할 수 있어요.',
            'A short clip showing the key IR sensor reaction as the car follows a path.'
          )
        })
      ],
      safetyNote: text(
        '외부 영상은 보호자와 함께 열어 주세요. 영상 속 실험을 그대로 따라 하기보다, 원리를 이해하는 참고 자료로 봐 주세요.',
        'Open external videos with a parent or teacher. Use them to understand the idea, not to copy risky experiments.'
      )
    },
    '5-arduino-game': {
      question: text(
        '버튼을 누르는 순간, 게임기는 어떻게 알아들을까요?',
        'How does the game device know the moment you press a button?'
      ),
      hook: text(
        '버튼은 게임기에 보내는 작은 신호예요. 누르면 화면이 바로 반응해요.',
        'A button is a tiny signal for the game device. Press it and the screen reacts right away.'
      ),
      summary: text(
        '버튼을 누르면 전기 신호가 바뀌어요. 보드는 그 신호를 읽고 화면이나 게임 동작을 바꿔요.',
        'When you press a button, the electrical signal changes. The board reads that signal and changes the screen or game action.'
      ),
      concepts: {
        ko: ['버튼', '입력', '출력', '화면'],
        en: ['Button', 'Input', 'Output', 'Screen']
      },
      tryIt: text(
        '버튼을 하나씩 눌러 보고, 화면이나 소리가 어떻게 달라지는지 확인해요.',
        'Press the buttons one by one and see how the screen or sound changes.'
      ),
      kitConnection: text(
        '버튼은 입력, 화면은 출력이에요. 내가 누른 신호가 게임 동작으로 바뀌어요.',
        'Buttons are the input and the screen is the output. The signal from your hand turns into game action.'
      ),
      learnMore: text(
        '보드는 버튼이 눌렸는지 아주 빠르게 읽고 바로 다음 화면을 보여 줘요. 그래서 게임이 바로 반응하는 것처럼 보여요.',
        'The board reads button presses very quickly and updates the next screen right away. That is why the game reacts instantly.'
      ),
      videos: [
        video({
          title: text(
            'Arduino Project - LCD Dino Game | Chrome Dinosaur (View description for parts & diagram) #shorts',
            'Arduino Project - LCD Dino Game | Chrome Dinosaur (View description for parts & diagram) #shorts'
          ),
          channel: 'Max Imagination',
          url: 'https://www.youtube.com/watch?v=ijXk2A4cci8',
          videoId: 'ijXk2A4cci8',
          thumbnail: thumb('ijXk2A4cci8'),
          source: 'YouTube',
          language: 'en',
          type: 'shorts',
          badge: text('추천 영상', 'Recommended'),
          duration: '1:01',
          note: text(
            '버튼 입력이 LCD 게임 화면 반응으로 이어지는 장면을 바로 볼 수 있어요.',
            'You can immediately see how button input changes the LCD game screen.'
          )
        }),
        video({
          title: text(
            'Joystick-Controlled Brick Breaker on Arduino!#Arduino #OLEDGame',
            'Joystick-Controlled Brick Breaker on Arduino!#Arduino #OLEDGame'
          ),
          channel: 'SunFounder Maker Education',
          url: 'https://www.youtube.com/watch?v=QwznNbmEpXE',
          videoId: 'QwznNbmEpXE',
          thumbnail: thumb('QwznNbmEpXE'),
          source: 'YouTube',
          language: 'en',
          type: 'shorts',
          badge: text('직접 연결 영상', 'See It in Action'),
          duration: '0:22',
          note: text(
            '조이스틱 입력이 화면 출력으로 바뀌는 입력·출력 개념을 짧게 보여 줘요.',
            'A short clip showing how joystick input becomes movement on the screen.'
          )
        })
      ],
      safetyNote: text(
        '외부 영상은 보호자와 함께 열어 주세요. 영상 속 실험을 그대로 따라 하기보다, 원리를 이해하는 참고 자료로 봐 주세요.',
        'Open external videos with a parent or teacher. Use them to understand the idea, not to copy risky experiments.'
      )
    },
    '6-ultrasonic-piano': {
      question: text(
        '손을 가까이 대면 왜 소리가 달라질까요?',
        'Why does the sound change when your hand gets closer?'
      ),
      hook: text(
        '초음파 센서는 눈에 보이지 않는 소리로 거리를 재요.',
        'An ultrasonic sensor measures distance using sound you cannot hear.'
      ),
      summary: text(
        '초음파 센서는 소리보다 높은 진동을 보내고, 다시 돌아오는 시간을 재요. 손이 가까운지 먼지에 따라 다른 소리를 낼 수 있어요.',
        'An ultrasonic sensor sends very high vibrations and measures how long they take to return. It can make different sounds depending on how near or far your hand is.'
      ),
      concepts: {
        ko: ['초음파', '거리', '센서', '소리'],
        en: ['Ultrasonic', 'Distance', 'Sensor', 'Sound']
      },
      tryIt: text(
        '손을 센서 가까이, 중간, 멀리 움직여 보세요. 소리 높이가 어떻게 바뀌는지 들어 봐요.',
        'Move your hand close to the sensor, then to the middle, then far away. Listen to how the pitch changes.'
      ),
      kitConnection: text(
        '초음파 센서가 손의 거리를 느끼고, 부저가 소리로 알려 줘요.',
        'The ultrasonic sensor measures the distance to your hand, and the buzzer turns that into sound.'
      ),
      learnMore: text(
        '센서는 손까지의 거리를 계속 재고, 그 값에 따라 다른 음을 고를 수 있어요. 그래서 손 위치를 바꾸면 연주 소리도 달라져요.',
        'The sensor keeps measuring the distance to your hand and can choose different notes from that value. That is why the sound changes as you move.'
      ),
      videos: [
        video({
          title: text(
            '[코딩교구]코블 스크래치#6. 건반없이 피아노를 칠 수 있다고? 초음파센서를 활용하여 코딩하는 에어피아노!',
            '[COBL Scratch #6] Air Piano with an Ultrasonic Sensor'
          ),
          channel: '코딩블록 코블COBL',
          url: 'https://www.youtube.com/watch?v=RdIESlNEFlg',
          videoId: 'RdIESlNEFlg',
          thumbnail: thumb('RdIESlNEFlg'),
          source: 'YouTube',
          language: 'ko',
          type: 'video',
          badge: text('추천 영상', 'Recommended'),
          duration: '6:47',
          note: text(
            '건반 없이 손 움직임으로 소리를 바꾸는 한국어 예시라 바로 이해하기 좋아요.',
            'A Korean example that shows how hand movement changes sound without piano keys.'
          )
        }),
        video({
          title: text(
            'Touchless Musical Instrument using ESP32 | Ultrasonic Sensor Based Air Piano',
            'Touchless Musical Instrument using ESP32 | Ultrasonic Sensor Based Air Piano'
          ),
          channel: 'Roboarmy',
          url: 'https://www.youtube.com/watch?v=fkU00Zf1KfE',
          videoId: 'fkU00Zf1KfE',
          thumbnail: thumb('fkU00Zf1KfE'),
          source: 'YouTube',
          language: 'en',
          type: 'video',
          badge: text('원리 보기', 'How It Works'),
          duration: '6:16',
          note: text(
            '손을 가까이 대며 소리가 바뀌는 에어 피아노 원리를 화면으로 보기 좋아요.',
            'A clear air-piano example that shows how the sound changes as a hand moves closer.'
          )
        })
      ],
      safetyNote: text(
        '외부 영상은 보호자와 함께 열어 주세요. 영상 속 실험을 그대로 따라 하기보다, 원리를 이해하는 참고 자료로 봐 주세요.',
        'Open external videos with a parent or teacher. Use them to understand the idea, not to copy risky experiments.'
      )
    }
  };
})();
