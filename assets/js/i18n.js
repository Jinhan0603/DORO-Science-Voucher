/* ============================================
   DOROLAND i18n — Korean ↔ English
   Covers: index.html + all 6 program pages
   ============================================ */

const i18n = {
  ko: {
    // Nav (main)
    'nav.quests': '퀘스트',
    'nav.story': '스토리',
    'nav.home': 'DORO 홈',
    'nav.back': '← 프로그램 목록',

    // Hero
    'hero.tagline1': '기술은 자연을 해치지 않아,',
    'hero.tagline2': '우리가 올바르게 사용한다면..',
    'hero.tagline3': '도로랜드가 멈춘 지금,',
    'hero.tagline4': '다시 움직이게 할 수 있는 건 너뿐이야',
    'hero.badge.label': 'DORO DIMC 홈러닝 키트',
    'hero.badge.desc': '2026 과학문화바우처 선정 프로그램',
    'hero.scroll': 'SCROLL',

    // DIMC Section
    'dimc.badge': 'ABOUT DORO DIMC',
    'dimc.title': 'DORO DIMC 홈러닝 디지털 키트',
    'dimc.subtitle': '직접 조립하는 디지털 키트에 학생용 활동지, 조립 설명서, 보호자/교사용 가이드, QR 영상을 묶은 <strong style="color:var(--text-primary)">과학학습 패키지</strong>입니다.',
    'dimc.card1.title': '과학 탐구',
    'dimc.card1.desc': '센서, 회로, 기구학 — 교과서 속 과학 개념을 직접 만들며 체험',
    'dimc.card2.title': '메이킹 경험',
    'dimc.card2.desc': '설계부터 조립, 작동 확인까지 모든 과정을 학생이 직접 수행',
    'dimc.card3.title': 'AI 확장 활동',
    'dimc.card3.desc': '선택형 AI 도구로 창작·분석·코딩까지 자연스럽게 확장',

    // Quest Section
    'quest.badge': 'QUESTS',
    'quest.title': '수행 가능한 퀘스트',
    'quest.desc': '구매하신 키트를 선택하면 미션 가이드로 이동합니다',
    'quest.tab.active': '🗡 수행 가능한 퀘스트 (6)',
    'quest.tab.locked': '🔒 잠긴 퀘스트 (0)',
    'quest.hover.hint': 'HOVER → 구성품 보기',

    // Story Section
    'story.badge': 'DOROLAND STORY',
    'story.title': '도로랜드의 이야기',
    'story.quote': '"기술은 자연을 해치지 않아, 우리가 올바르게 사용한다면.."',
    'story.p1': '도로랜드는 기술과 자연이 조화롭게 공존하던 테마파크. 어느 날 갑자기 모든 것이 멈추고, 도로랜드를 되살리기 위한 모험이 시작됩니다.',
    'story.p2': '사파리 구역의 센서를 살리고, 하모니아의 기계를 수리하고, 잊혀진 시간 속 비밀을 밝히세요. <strong style="color: var(--emerald);">당신이 도로랜드를 다시 움직이게 할 수 있는 유일한 사람입니다.</strong>',
    'story.chars.title': 'DOROLAND 캐릭터',

    // Science Section
    'science.badge': 'SCIENCE × MAKING',
    'science.title': 'DORO는 자체 설계된 디지털 키트에<br>교육자료를 결합한 <span class="text-gradient">과학문화상품</span>을 제공합니다',
    'science.desc': '각 상품은 센서, 입력-출력, 제어, 기구학, IoT, 피지컬 컴퓨팅 등 핵심 과학·공학 개념을 직접 만들고 체험하도록 설계되었습니다.',

    // Footer
    'footer.copy': '© 2026 DOROLAND · Do Challenge. To Ask. Be Together · 주식회사 도로(DORO)',
    'lang.toggle': 'EN',

    // ── Program Page Common ──
    'prog.photos': '📸 키트 사진',
    'prog.checklist.title': '🔧 준비물 체크리스트',
    'prog.checklist.desc': '키트 구성품을 확인하고 체크해주세요.',
    'prog.missions': '📖 STEP-BY-STEP 교육 과정',
    'prog.demo.title': '🎬 키트 작동 데모 영상',
    'prog.demo.note': '※ 키트가 완성된 상태에서 작동하는 모습을 보여주는 데모 영상입니다.',
    'prog.ai.label': '선택형 확장 활동',
    'prog.faq.title': '❓ 자주 묻는 질문',
    'prog.download.pdf': '조립 가이드 PDF 다운로드',
    'prog.download.mp4': '영상 MP4 다운로드',

    // ── Program 1: 도블투스 ──
    'p1.kit': 'DORO IoT 사운드 키트',
    'p1.title': '🔊 도블투스 — 블루투스 스피커',
    'p1.desc': '판다 캐릭터 블루투스 스피커를 조립하고, 블루투스 통신 원리와 소리의 과학을 탐구합니다.',
    'p1.science': '🔬 핵심 과학 개념: 블루투스 통신 · 소리의 진동 · 전자기유도 · 사물인터넷(IoT)',
    'p1.demo.caption': '📹 도블투스 블루투스 스피커 작동 데모',
    'p1.ai.title': '🎵 AI 작곡 도구 Suno 체험',
    'p1.ai.desc': 'AI 작곡 도구 Suno로 나만의 음악을 만들고, 직접 조립한 판다 스피커로 재생하는 창작 확장 활동이 가능합니다.',

    // ── Program 2: 도도무드 ──
    'p2.kit': 'DORO 센서 탐구 키트',
    'p2.title': '💡 도도무드 — 스마트 무드등',
    'p2.desc': '고양이 캐릭터 무드등을 조립하고, 조도센서로 빛을 감지해 자동 점등되는 스마트 조명을 만듭니다.',
    'p2.science': '🔬 핵심 과학 개념: 조도센서 · LED 회로 · 입력-출력 제어 · 광전효과',
    'p2.demo.caption': '📹 도도무드 스마트 무드등 작동 데모',
    'p2.ai.title': '🎨 조명 + 색깔 탐구',
    'p2.ai.desc': '색깔 셀로판지를 LED 앞에 놓아 다양한 색 조명 효과를 탐구하는 확장 활동이 가능합니다.',

    // ── Program 3: 도봇 ──
    'p3.kit': 'DORO 기구학 로봇 키트',
    'p3.title': '🤖 도봇 — 2족 보행 로봇',
    'p3.desc': '강아지 캐릭터 목재 프레임의 2족 보행 로봇을 조립하며 기구학과 원운동-보행운동 변환 원리를 탐구합니다.',
    'p3.science': '🔬 핵심 과학 개념: 기구학 · 원운동→보행운동 변환 · 모터 제어 · 전자 회로',
    'p3.demo.caption': '📹 도봇 보행 로봇 작동 데모',
    'p3.ai.title': '🤖 Teachable Machine으로 보행 패턴 인식',
    'p3.ai.desc': 'Google Teachable Machine으로 로봇의 보행 모션을 학습시키는 확장 활동이 가능합니다.',

    // ── Program 4: 도카 ──
    'p4.kit': 'DORO AI 모빌리티 키트',
    'p4.title': '🚗 도카 — AI 로봇 자동차',
    'p4.desc': 'DORO 브랜드가 새겨진 목재 로봇 자동차를 직접 조립하고, 적외선 센서로 손을 따라가는 자율주행 기초를 학습합니다.',
    'p4.science': '🔬 핵심 과학 개념: IR 적외선 센서 · 거리 측정 · 모터 제어 · 자율주행 기초',
    'p4.demo.caption': '📹 도카 IR 자동차 작동 데모',
    'p4.ai.title': '🤖 자율주행 시뮬레이션',
    'p4.ai.desc': '도카가 실제 자율주행 차량처럼 장애물을 감지하고 멈추는 시나리오를 직접 설계하는 확장 활동이 가능합니다.',

    // ── Program 5: 도텐도 ──
    'p5.kit': 'DORO 게임 코딩 키트',
    'p5.title': '🎮 도텐도 — 아두이노 게임기',
    'p5.desc': '파란 돼지 캐릭터 디자인의 목재 게임기를 조립하고, LCD 화면과 버튼으로 러닝 점프 게임을 코딩합니다.',
    'p5.science': '🔬 핵심 과학 개념: 디지털 입력 · LCD 출력 · 아두이노 코딩 · 피지컬 컴퓨팅',
    'p5.demo.caption': '📹 도텐도 아두이노 게임기 작동 데모',
    'p5.ai.title': '🤖 AI 난이도 적응 게임 설계',
    'p5.ai.desc': '플레이어 점수에 따라 난이도가 자동으로 올라가는 AI 적응형 게임 로직을 설계하는 심화 확장 활동이 가능합니다.',

    // ── Program 6: 도짜르트 ──
    'p6.kit': 'DORO 피지컬 컴퓨팅 키트',
    'p6.title': '🎹 도짜르트 — 초음파 피아노',
    'p6.desc': '개구리 캐릭터 피아노 건반을 조립하고, 초음파 센서 앞에서 손 거리를 조절하면 음높이가 바뀌는 인터랙티브 악기를 코딩합니다.',
    'p6.science': '🔬 핵심 과학 개념: 초음파 센서 · 거리-음높이 매핑 · 조건문 코딩 · 사운드 인터랙션',
    'p6.demo.caption': '📹 도짜르트 초음파 피아노 작동 데모',
    'p6.ai.title': '🎵 AI 작곡 + 피아노 연주',
    'p6.ai.desc': 'AI 작곡 도구 Suno로 멜로디를 만들고, 도짜르트 피아노로 그 멜로디를 재현하는 창작 확장 활동이 가능합니다.',
  },

  en: {
    // Nav
    'nav.quests': 'Quests',
    'nav.story': 'Story',
    'nav.home': 'DORO Home',
    'nav.back': '← Program List',

    // Hero
    'hero.tagline1': 'Technology doesn\'t harm nature,',
    'hero.tagline2': 'if we use it the right way..',
    'hero.tagline3': 'DOROLAND has stopped.',
    'hero.tagline4': 'You are the only one who can bring it back to life.',
    'hero.badge.label': 'DORO DIMC Home Learning Kit',
    'hero.badge.desc': '2026 Science & Culture Voucher Program',
    'hero.scroll': 'SCROLL',

    // DIMC
    'dimc.badge': 'ABOUT DORO DIMC',
    'dimc.title': 'DORO DIMC Home Learning Digital Kit',
    'dimc.subtitle': 'A <strong style="color:var(--text-primary)">science learning package</strong> combining hands-on digital kits with student worksheets, assembly guides, parent/teacher guides, and QR-linked video tutorials.',
    'dimc.card1.title': 'Science Inquiry',
    'dimc.card1.desc': 'Sensors, circuits, kinematics — learn textbook science by building it yourself',
    'dimc.card2.title': 'Making Experience',
    'dimc.card2.desc': 'Students perform the entire process: design, assemble, and verify',
    'dimc.card3.title': 'AI Extension',
    'dimc.card3.desc': 'Optional AI tools to naturally extend into creation, analysis, and coding',

    // Quest Section
    'quest.badge': 'QUESTS',
    'quest.title': 'Available Quests',
    'quest.desc': 'Select your purchased kit to access the mission guide',
    'quest.tab.active': '🗡 Available Quests (6)',
    'quest.tab.locked': '🔒 Locked Quests (0)',
    'quest.hover.hint': 'HOVER → View Components',

    // Story Section
    'story.badge': 'DOROLAND STORY',
    'story.title': 'The Story of DOROLAND',
    'story.quote': '"Technology doesn\'t harm nature, if we use it the right way.."',
    'story.p1': 'DOROLAND was a theme park where technology and nature coexisted in harmony. One day, everything suddenly stopped. The adventure to revive DOROLAND begins.',
    'story.p2': 'Revive the sensors of the Safari zone, repair the machines of Harmonia, and uncover the secrets lost in time. <strong style="color: var(--emerald);">You are the only one who can bring DOROLAND back to life.</strong>',
    'story.chars.title': 'DOROLAND Characters',

    // Science Section
    'science.badge': 'SCIENCE × MAKING',
    'science.title': 'DORO provides <span class="text-gradient">science & culture products</span><br>combining self-designed digital kits with educational materials',
    'science.desc': 'Each product is designed for hands-on learning of core science & engineering concepts: sensors, I/O, control, kinematics, IoT, and physical computing.',

    // Footer
    'footer.copy': '© 2026 DOROLAND · Do Challenge. To Ask. Be Together · DORO Inc.',
    'lang.toggle': '한',

    // ── Program Page Common ──
    'prog.photos': '📸 Kit Photos',
    'prog.checklist.title': '🔧 Components Checklist',
    'prog.checklist.desc': 'Check your kit components.',
    'prog.missions': '📖 STEP-BY-STEP Curriculum',
    'prog.demo.title': '🎬 Kit Demo Video',
    'prog.demo.note': '※ This video shows the completed kit in action (not an assembly guide).',
    'prog.ai.label': 'Optional Extension Activity',
    'prog.faq.title': '❓ Frequently Asked Questions',
    'prog.download.pdf': 'Download Assembly Guide PDF',
    'prog.download.mp4': 'Download Video MP4',

    // ── Program 1: Dobletooth ──
    'p1.kit': 'DORO IoT Sound Kit',
    'p1.title': '🔊 DOBLETOOTH — Bluetooth Speaker',
    'p1.desc': 'Assemble a panda-themed Bluetooth speaker and explore the science of Bluetooth communication and sound.',
    'p1.science': '🔬 Core Concepts: Bluetooth Communication · Sound Vibration · Electromagnetic Induction · IoT',
    'p1.demo.caption': '📹 DOBLETOOTH Bluetooth Speaker — Demo',
    'p1.ai.title': '🎵 AI Music with Suno',
    'p1.ai.desc': 'Create your own music with AI composition tool Suno and play it through your panda speaker.',

    // ── Program 2: Dodomood ──
    'p2.kit': 'DORO Sensor Exploration Kit',
    'p2.title': '💡 DODOMOOD — Smart Mood Light',
    'p2.desc': 'Build a cat-themed mood light and create a smart lamp that automatically responds to ambient light.',
    'p2.science': '🔬 Core Concepts: Light Sensor · LED Circuit · Input-Output Control · Photoelectric Effect',
    'p2.demo.caption': '📹 DODOMOOD Smart Mood Light — Demo',
    'p2.ai.title': '🎨 Light & Color Exploration',
    'p2.ai.desc': 'Place colored cellophane in front of the LED to explore different lighting color effects.',

    // ── Program 3: Dobot ──
    'p3.kit': 'DORO Kinematics Robot Kit',
    'p3.title': '🤖 DOBOT — Bipedal Walking Robot',
    'p3.desc': 'Assemble a dog-themed wooden bipedal robot and explore kinematics and rotary-to-linear motion conversion.',
    'p3.science': '🔬 Core Concepts: Kinematics · Rotary→Walking Motion · Motor Control · Electronic Circuits',
    'p3.demo.caption': '📹 DOBOT Walking Robot — Demo',
    'p3.ai.title': '🤖 Gait Pattern Recognition with Teachable Machine',
    'p3.ai.desc': 'Train Google Teachable Machine to recognize your robot\'s walking patterns.',

    // ── Program 4: Doca ──
    'p4.kit': 'DORO AI Mobility Kit',
    'p4.title': '🚗 DOCA — AI Robot Car',
    'p4.desc': 'Assemble a DORO-branded wooden robot car and learn autonomous driving basics with IR sensors.',
    'p4.science': '🔬 Core Concepts: IR Sensor · Distance Measurement · Motor Control · Autonomous Driving Basics',
    'p4.demo.caption': '📹 DOCA IR Robot Car — Demo',
    'p4.ai.title': '🤖 Autonomous Driving Simulation',
    'p4.ai.desc': 'Design a scenario where DOCA detects obstacles and stops, like a real autonomous vehicle.',

    // ── Program 5: Dotendo ──
    'p5.kit': 'DORO Game Coding Kit',
    'p5.title': '🎮 DOTENDO — Arduino Game Console',
    'p5.desc': 'Assemble a pig-themed wooden game console and code a running-jump game with LCD screen and button.',
    'p5.science': '🔬 Core Concepts: Digital Input · LCD Output · Arduino Coding · Physical Computing',
    'p5.demo.caption': '📹 DOTENDO Arduino Game Console — Demo',
    'p5.ai.title': '🤖 AI Adaptive Difficulty Design',
    'p5.ai.desc': 'Design an AI-adaptive game logic that automatically increases difficulty based on player score.',

    // ── Program 6: Dozzart ──
    'p6.kit': 'DORO Physical Computing Kit',
    'p6.title': '🎹 DOZZART — Ultrasonic Piano',
    'p6.desc': 'Assemble a frog-themed piano and code an interactive instrument where hand distance controls pitch.',
    'p6.science': '🔬 Core Concepts: Ultrasonic Sensor · Distance-Pitch Mapping · Conditional Coding · Sound Interaction',
    'p6.demo.caption': '📹 DOZZART Ultrasonic Piano — Demo',
    'p6.ai.title': '🎵 AI Composition + Piano Performance',
    'p6.ai.desc': 'Create a melody with AI composition tool Suno and recreate it on your DOZZART piano.',
  }
};

let currentLang = localStorage.getItem('doro-lang') || 'ko';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('doro-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = i18n[lang] && i18n[lang][key];
    if (text !== undefined) {
      if (text.includes('<') && text.includes('>')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'ko' ? 'EN' : '한';
    toggleBtn.setAttribute('title', lang === 'ko' ? 'Switch to English' : '한국어로 전환');
  }

  document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
}

function toggleLanguage() {
  applyLanguage(currentLang === 'ko' ? 'en' : 'ko');
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
});
