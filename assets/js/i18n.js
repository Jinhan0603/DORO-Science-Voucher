/* ============================================
   DOROLAND i18n (Internationalization) System
   Korean ↔ English Language Toggle
   ============================================ */

const i18n = {
  ko: {
    // Nav
    'nav.quests': '퀘스트',
    'nav.story': '스토리',
    'nav.home': 'DORO 홈',

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
    'dimc.subtitle': '직접 조립하는 디지털 키트에 학생용 활동지, 조립 설명서, 보호자/교사용 가이드, QR 영상을 묶은 <strong style="color:var(--text-primary)">과학학습 패키지</strong>입니다. 센서, 입력-출력, 제어, 기구학, IoT, 피지컬 컴퓨팅 등 핵심 과학·공학 개념을 직접 만들고 체험합니다.',
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
    'quest.tab.active': '수행 가능한 퀘스트 (6)',
    'quest.tab.locked': '잠긴 퀘스트 (0)',

    // Quest Cards
    'quest1.kit': 'DORO IoT 사운드 키트',
    'quest1.title': '🔊 도블투스 — 블루투스 스피커',
    'quest1.desc': 'IoT 블루투스 스피커를 직접 조립하고, 블루투스 통신과 소리의 원리를 체험하는 과학탐구 키트',
    'quest1.tag1': '#블루투스통신', 'quest1.tag2': '#사물인터넷', 'quest1.tag3': '#소리의원리',
    'quest1.time': '⏱ 90분', 'quest1.target': '👤 초등 4~6학년', 'quest1.cta': '미션 시작 →',

    'quest2.kit': 'DORO 센서 탐구 키트',
    'quest2.title': '💡 도도무드 — 스마트 무드등',
    'quest2.desc': '조도센서와 LED로 밝기 변화를 감지하는 스마트 무드등을 제작하며 입력-출력 제어를 학습',
    'quest2.tag1': '#조도센서', 'quest2.tag2': '#LED', 'quest2.tag3': '#입력출력',
    'quest2.time': '⏱ 90분', 'quest2.target': '👤 초등 3~6학년', 'quest2.cta': '미션 시작 →',

    'quest3.kit': 'DORO 기구학 로봇 키트',
    'quest3.title': '🤖 도봇 — 2족 보행 로봇',
    'quest3.desc': '두 발로 걷는 로봇을 조립하며 기구학과 원운동-보행운동 변환 원리를 탐구하는 심화형 과학키트',
    'quest3.tag1': '#기구학', 'quest3.tag2': '#보행메커니즘', 'quest3.tag3': '#전자회로',
    'quest3.time': '⏱ 120분', 'quest3.target': '👤 초등 4~중등', 'quest3.cta': '미션 시작 →',

    'quest4.kit': 'DORO AI 모빌리티 키트',
    'quest4.title': '🚗 도카 — AI 로봇 자동차',
    'quest4.desc': '적외선 센서로 손을 따라가는 로봇 자동차를 만들며 거리 측정과 자율주행 기초를 학습',
    'quest4.tag1': '#IR센서', 'quest4.tag2': '#거리측정', 'quest4.tag3': '#자율주행기초',
    'quest4.time': '⏱ 120분', 'quest4.target': '👤 초등 4~중등', 'quest4.cta': '미션 시작 →',

    'quest5.kit': 'DORO 게임 코딩 키트',
    'quest5.title': '🎮 도텐도 — 아두이노 게임기',
    'quest5.desc': '입력장치와 출력장치를 연결해 나만의 러닝 점프 게임기를 만들며 피지컬 컴퓨팅을 체험',
    'quest5.tag1': '#입력장치', 'quest5.tag2': '#게임로직', 'quest5.tag3': '#피지컬컴퓨팅',
    'quest5.time': '⏱ 120분', 'quest5.target': '👤 초등 4~중등', 'quest5.cta': '미션 시작 →',

    'quest6.kit': 'DORO 피지컬 컴퓨팅 키트',
    'quest6.title': '🎹 도짜르트 — 초음파 피아노',
    'quest6.desc': '초음파 센서와 조건문으로 거리별 음 높이를 제어하는 인터랙티브 피아노를 코딩하며 사운드 인터랙션을 탐구',
    'quest6.tag1': '#초음파센서', 'quest6.tag2': '#조건문', 'quest6.tag3': '#사운드인터랙션',
    'quest6.time': '⏱ 90분', 'quest6.target': '👤 초등 4~중등', 'quest6.cta': '미션 시작 →',

    // Story Section
    'story.badge': 'DOROLAND STORY',
    'story.title': '도로랜드의 이야기',
    'story.quote': '"기술은 자연을 해치지 않아, 우리가 올바르게 사용한다면.."',
    'story.p1': '도로랜드는 기술과 자연이 조화롭게 공존하던 테마파크. 어느 날 갑자기 모든 것이 멈추고, 도로랜드를 되살리기 위한 모험이 시작됩니다. 각 키트는 도로랜드의 구역을 복구하는 미션과 연결되어 있습니다.',
    'story.p2': '사파리 구역의 센서를 살리고, 하모니아의 기계를 수리하고, 잊혀진 시간 속 비밀을 밝히세요. <strong style="color: var(--emerald);">당신이 도로랜드를 다시 움직이게 할 수 있는 유일한 사람입니다.</strong>',

    // Science message
    'science.badge': 'SCIENCE × MAKING',
    'science.title': 'DORO는 자체 설계된 디지털 키트에<br>교육자료를 결합한 <span class="text-gradient">과학문화상품</span>을 제공합니다',
    'science.desc': '각 상품은 센서, 입력-출력, 제어, 기구학, IoT, 피지컬 컴퓨팅 등 핵심 과학·공학 개념을 직접 만들고 체험하도록 설계되었습니다. 학생용 활동지, 조립설명서, 보호자/교사 가이드, QR 영상이 함께 제공됩니다.',

    // Footer
    'footer.copy': '© 2026 DOROLAND · Do Challenge. To Ask. Be Together · 주식회사 도로(DORO)',

    // Lang toggle
    'lang.toggle': 'EN',
  },

  en: {
    // Nav
    'nav.quests': 'Quests',
    'nav.story': 'Story',
    'nav.home': 'DORO Home',

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
    'dimc.subtitle': 'A <strong style="color:var(--text-primary)">science learning package</strong> combining hands-on digital kits with student worksheets, assembly guides, parent/teacher guides, and QR-linked video tutorials. Students directly build and experience core science & engineering concepts: sensors, I/O, control systems, kinematics, IoT, and physical computing.',
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
    'quest.tab.active': 'Available Quests (6)',
    'quest.tab.locked': 'Locked Quests (0)',

    // Quest Cards
    'quest1.kit': 'DORO IoT Sound Kit',
    'quest1.title': '🔊 DOBLETOOTH — Bluetooth Speaker',
    'quest1.desc': 'Build an IoT Bluetooth speaker hands-on and experience the principles of Bluetooth communication and sound',
    'quest1.tag1': '#Bluetooth', 'quest1.tag2': '#IoT', 'quest1.tag3': '#SoundScience',
    'quest1.time': '⏱ 90 min', 'quest1.target': '👤 Ages 10-12', 'quest1.cta': 'Start Mission →',

    'quest2.kit': 'DORO Sensor Exploration Kit',
    'quest2.title': '💡 DODOMOOD — Smart Mood Light',
    'quest2.desc': 'Build a smart mood light with light sensors and LEDs to learn input-output control systems',
    'quest2.tag1': '#LightSensor', 'quest2.tag2': '#LED', 'quest2.tag3': '#I/O Control',
    'quest2.time': '⏱ 90 min', 'quest2.target': '👤 Ages 9-12', 'quest2.cta': 'Start Mission →',

    'quest3.kit': 'DORO Kinematics Robot Kit',
    'quest3.title': '🤖 DOBOT — Bipedal Walking Robot',
    'quest3.desc': 'Assemble a walking robot to explore kinematics and rotary-to-linear motion conversion',
    'quest3.tag1': '#Kinematics', 'quest3.tag2': '#WalkingMechanism', 'quest3.tag3': '#Electronics',
    'quest3.time': '⏱ 120 min', 'quest3.target': '👤 Ages 10-14', 'quest3.cta': 'Start Mission →',

    'quest4.kit': 'DORO AI Mobility Kit',
    'quest4.title': '🚗 DOCA — AI Robot Car',
    'quest4.desc': 'Build a hand-following robot car with IR sensors to learn distance measurement and autonomous driving basics',
    'quest4.tag1': '#IR Sensor', 'quest4.tag2': '#DistanceMeasure', 'quest4.tag3': '#AutonomousDriving',
    'quest4.time': '⏱ 120 min', 'quest4.target': '👤 Ages 10-14', 'quest4.cta': 'Start Mission →',

    'quest5.kit': 'DORO Game Coding Kit',
    'quest5.title': '🎮 DOTENDO — Arduino Game Console',
    'quest5.desc': 'Connect input and output devices to build your own running-jump game console and experience physical computing',
    'quest5.tag1': '#InputDevices', 'quest5.tag2': '#GameLogic', 'quest5.tag3': '#PhysicalComputing',
    'quest5.time': '⏱ 120 min', 'quest5.target': '👤 Ages 10-14', 'quest5.cta': 'Start Mission →',

    'quest6.kit': 'DORO Physical Computing Kit',
    'quest6.title': '🎹 DOZZART — Ultrasonic Piano',
    'quest6.desc': 'Code an interactive piano using ultrasonic sensors and conditionals to control pitch by distance',
    'quest6.tag1': '#Ultrasonic', 'quest6.tag2': '#Conditionals', 'quest6.tag3': '#SoundInteraction',
    'quest6.time': '⏱ 90 min', 'quest6.target': '👤 Ages 10-14', 'quest6.cta': 'Start Mission →',

    // Story Section
    'story.badge': 'DOROLAND STORY',
    'story.title': 'The Story of DOROLAND',
    'story.quote': '"Technology doesn\'t harm nature, if we use it the right way.."',
    'story.p1': 'DOROLAND was a theme park where technology and nature coexisted in harmony. One day, everything suddenly stopped. The adventure to revive DOROLAND begins. Each kit is connected to a mission to restore a zone of DOROLAND.',
    'story.p2': 'Revive the sensors of the Safari zone, repair the machines of Harmonia, and uncover the secrets lost in time. <strong style="color: var(--emerald);">You are the only one who can bring DOROLAND back to life.</strong>',

    // Science message
    'science.badge': 'SCIENCE × MAKING',
    'science.title': 'DORO provides <span class="text-gradient">science & culture products</span><br>combining self-designed digital kits with educational materials',
    'science.desc': 'Each product is designed for hands-on learning of core science & engineering concepts: sensors, I/O, control, kinematics, IoT, and physical computing. Includes student worksheets, assembly guides, parent/teacher guides, and QR video tutorials.',

    // Footer
    'footer.copy': '© 2026 DOROLAND · Do Challenge. To Ask. Be Together · DORO Inc.',

    // Lang toggle
    'lang.toggle': '한',
  }
};

// Current language state
let currentLang = localStorage.getItem('doro-lang') || 'ko';

// Apply translations
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('doro-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = i18n[lang][key];
    if (text) {
      // Check if it contains HTML
      if (text.includes('<') && text.includes('>')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update toggle button
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = i18n[lang]['lang.toggle'];
    toggleBtn.setAttribute('title', lang === 'ko' ? 'Switch to English' : '한국어로 전환');
  }

  // Update html lang attribute
  document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
}

// Toggle language
function toggleLanguage() {
  const newLang = currentLang === 'ko' ? 'en' : 'ko';
  applyLanguage(newLang);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
});
