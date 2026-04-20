/* ============================================
   DOROLAND i18n — Korean ↔ English  (full)
   index.html + 6 program pages
   ============================================ */

const i18n = {
  ko: {
    // Nav
    'nav.quests': '퀘스트', 'nav.story': '스토리', 'nav.home': 'DORO 홈', 'nav.back': '← 프로그램 목록',

    // Hero
    'hero.tagline1': '기술은 자연을 해치지 않아,', 'hero.tagline2': '우리가 올바르게 사용한다면..',
    'hero.tagline3': '도로랜드가 멈춘 지금,', 'hero.tagline4': '다시 움직이게 할 수 있는 건 너뿐이야',
    'hero.badge.label': 'DORO DIMC 홈러닝 키트', 'hero.badge.desc': '2026 과학문화바우처 신청 예정 상품',
    'hero.scroll': 'SCROLL',

    // DIMC Section
    'dimc.badge': 'ABOUT DORO DIMC', 'dimc.title': 'DORO DIMC 홈러닝 디지털 키트',
    'dimc.subtitle': '직접 조립하는 디지털 키트에 학생용 활동지, 조립 설명서, 보호자/교사용 가이드, QR 영상을 묶은 <strong style="color:var(--text-primary)">과학학습 패키지</strong>입니다.',
    'dimc.card1.title': '과학 탐구', 'dimc.card1.desc': '센서, 회로, 기구학 — 교과서 속 과학 개념을 직접 만들며 체험',
    'dimc.card2.title': '메이킹 경험', 'dimc.card2.desc': '설계부터 조립, 작동 확인까지 모든 과정을 학생이 직접 수행',
    'dimc.card3.title': 'AI 확장 활동', 'dimc.card3.desc': '선택형 AI 도구로 창작·분석·코딩까지 자연스럽게 확장',

    // Quest Section
    'quest.badge': 'QUESTS', 'quest.title': '수행 가능한 퀘스트',
    'quest.desc': '구매하신 키트를 선택하면 미션 가이드로 이동합니다',
    'quest.tab.active': '🗡 수행 가능한 퀘스트 (6)',
    'quest.tab.locked': '🔒 잠긴 퀘스트 (3)',
    'quest.hover.hint': 'HOVER → 구성품 보기',
    'quest.cta': '미션 시작 →',

    // Story Section
    'story.badge': 'DOROLAND STORY', 'story.title': '도로랜드의 이야기',
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

    // ── Info Bar Common Labels ──
    'info.time.label': '⏱ 소요시간', 'info.age.label': '👤 대상',
    'info.level.label': '⭐ 난이도', 'info.type.label': '🏠 학습형태',

    // ── Program Page Common ──
    'prog.nav.back': '프로그램 목록',
    'prog.photos': '📸 키트 사진', 'prog.checklist.title': '🔧 준비물 확인 체크리스트',
    'prog.missions': '📖 STEP-BY-STEP 교육 과정',
    'prog.demo.title': '🎬 키트 작동 데모 영상',
    'prog.demo.note': '※ 키트가 완성된 상태에서 작동하는 모습을 보여주는 데모 영상입니다.',
    'prog.ai.label': '선택형 확장 활동', 'prog.faq.title': '❓ 자주 묻는 질문',
    'prog.docs.title': '📚 교육 자료 다운로드',
    'prog.docs.overview': '교육 개요서', 'prog.docs.guide': '교육 지도서',
    'prog.toc.photos': '키트 사진', 'prog.toc.checklist': '준비물 확인',
    'prog.toc.missions': '교육 과정', 'prog.toc.media': '데모 영상',
    'prog.toc.ai': 'AI 확장', 'prog.toc.faq': 'FAQ',

    // Step Times
    'time.10': '⏱ 10분', 'time.15': '⏱ 15분', 'time.20': '⏱ 20분',
    'time.25': '⏱ 25분', 'time.30': '⏱ 30분', 'time.35': '⏱ 35분',
    'time.50': '⏱ 50분', 'time.90': '⏱ 90분', 'time.120': '⏱ 120분',

    // ── P1: 도블투스 ──
    'p1.kit': 'DORO IoT 사운드 키트', 'p1.title': '🔊 도블투스 — 블루투스 스피커',
    'p1.desc': '판다 캐릭터 블루투스 스피커를 조립하고, 블루투스 통신 원리와 소리의 과학을 탐구합니다.',
    'p1.science': '🔬 핵심 과학 개념: 블루투스 통신 · 소리의 진동 · 전자기유도 · 사물인터넷(IoT)',
    'p1.card.desc': 'IoT 블루투스 스피커를 직접 조립하고 블루투스 통신과 소리의 원리를 체험하는 과학탐구 키트. 판다 디자인 목재 프레임.',
    'p1.age': '4~6학년', 'p1.tag1': '#블루투스통신', 'p1.tag2': '#사물인터넷', 'p1.tag3': '#소리의원리',
    'p1.card.meta': '⏱ 90분 · 초등 4~6학년',
    'p1.info.time': '90분', 'p1.info.age': '초등 4~6학년', 'p1.info.level': '★★☆',
    'p1.info.ai.label': '🎵 AI 확장', 'p1.info.ai': 'Suno (선택)',
    'p1.info.type': '홈러닝 키트', 'p1.info.char.label': '🐼 캐릭터', 'p1.info.char': '판다',
    'p1.step1.title': '왜 이 키트를 배우는가 — 도입', 'p1.step2.title': '오늘의 과학 개념',
    'p1.step3.title': '조립 — 판다 스피커 만들기', 'p1.step4.title': '작동 확인 + 소리 탐구',
    'p1.step5.title': '정리 + 발표',
    'p1.demo.caption': '📹 도블투스 블루투스 스피커 작동 데모',
    'p1.ai.title': '🎵 AI 작곡 도구 Suno 체험',
    'p1.ai.desc': 'AI 작곡 도구 Suno로 나만의 음악을 만들고, 직접 조립한 판다 스피커로 재생하는 창작 확장 활동이 가능합니다.',
    'p1.faq1.q': '블루투스 연결이 안 될 때는 어떻게 하나요?',
    'p1.faq2.q': '소리가 너무 작거나 안 나올 때는?',
    'p1.faq3.q': 'Suno를 꼭 사용해야 하나요?',
    'p1.faq4.q': '보호자/교사 지도 가이드가 있나요?',

    // ── P2: 도도무드 ──
    'p2.kit': 'DORO 센서 탐구 키트', 'p2.title': '💡 도도무드 — 스마트 무드등',
    'p2.desc': '고양이 캐릭터 무드등을 조립하고, 조도센서로 빛을 감지해 자동 점등되는 스마트 조명을 만듭니다.',
    'p2.science': '🔬 핵심 과학 개념: 조도센서 · LED 회로 · 입력-출력 · 전기 에너지 변환',
    'p2.card.desc': '조도센서와 LED로 밝기 변화를 감지하는 스마트 무드등 제작. 고양이 디자인 목재 베이스 + 실리콘 캐릭터 갓.',
    'p2.age': '3~6학년', 'p2.tag1': '#조도센서', 'p2.tag2': '#LED회로', 'p2.tag3': '#입력출력제어',
    'p2.card.meta': '⏱ 90분 · 초등 3~6학년',
    'p2.info.time': '90분', 'p2.info.age': '초등 3~6학년', 'p2.info.level': '★★☆',
    'p2.info.ai.label': '🎨 AI 확장', 'p2.info.ai': '없음 (기본)',
    'p2.info.type': '홈러닝 키트', 'p2.info.char.label': '🐱 캐릭터', 'p2.info.char': '고양이',
    'p2.step1.title': '도입 — 빛과 센서의 세계', 'p2.step2.title': '과학 개념 — 회로와 센서',
    'p2.step3.title': '조립 — 고양이 무드등 제작', 'p2.step4.title': '작동 확인 + 탐구',
    'p2.step5.title': '정리 + 발표',
    'p2.demo.caption': '📹 도도무드 스마트 무드등 작동 데모',
    'p2.ai.title': '🎨 조명 + 색깔 탐구',
    'p2.ai.desc': '색깔 셀로판지를 LED 앞에 놓아 다양한 색 조명 효과를 탐구하는 확장 활동이 가능합니다.',
    'p2.faq1.q': 'LED가 켜지지 않을 때는?',
    'p2.faq2.q': '조도센서가 반응하지 않을 때는?',
    'p2.faq3.q': '실리콘 갓은 어떻게 끼우나요?',

    // ── P3: 도봇 ──
    'p3.kit': 'DORO 기구학 로봇 키트', 'p3.title': '🤖 도봇 — 2족 보행 로봇',
    'p3.desc': '강아지 캐릭터 목재 프레임의 2족 보행 로봇을 조립하며 기구학과 원운동-보행운동 변환 원리를 탐구합니다.',
    'p3.science': '🔬 핵심 과학 개념: 기구학 · 원운동→보행운동 변환 · 모터 제어 · 전자 회로',
    'p3.card.desc': '두 발로 걷는 강아지 로봇을 조립하며 기구학과 원운동-보행운동 변환 원리를 탐구. 색깔 점프 와이어가 두 발 역할.',
    'p3.age': '4~중등', 'p3.tag1': '#기구학', 'p3.tag2': '#보행메커니즘', 'p3.tag3': '#전자회로',
    'p3.card.meta': '⏱ 120분 · 초등 4~중등',
    'p3.info.time': '120분', 'p3.info.age': '초등 4~중등', 'p3.info.level': '★★★',
    'p3.info.type': '홈러닝 키트', 'p3.info.char.label': '🐶 캐릭터', 'p3.info.char': '강아지',
    'p3.step1.title': '도입 — 어떻게 걷는가?', 'p3.step2.title': '과학 개념 — 기구학과 모터',
    'p3.step3.title': '조립 — 강아지 로봇 제작', 'p3.step4.title': '작동 + 탐구',
    'p3.step5.title': '정리 + 발표',
    'p3.demo.caption': '📹 도봇 보행 로봇 작동 데모',
    'p3.ai.title': '🤖 Teachable Machine으로 보행 패턴 인식',
    'p3.ai.desc': 'Google Teachable Machine으로 로봇의 보행 모션을 학습시키는 확장 활동이 가능합니다.',
    'p3.faq1.q': '로봇이 걷지 않고 한 자리에서 돌 때는?',
    'p3.faq2.q': '모터가 돌지 않을 때는?',
    'p3.faq3.q': '조립 시간이 부족할 때는?',

    // ── P4: 도카 ──
    'p4.kit': 'DORO AI 모빌리티 키트', 'p4.title': '🚗 도카 — AI 로봇 자동차',
    'p4.desc': 'DORO 브랜드가 새겨진 목재 로봇 자동차를 직접 조립하고, 적외선 센서로 손을 따라가는 자율주행 기초를 학습합니다.',
    'p4.science': '🔬 핵심 과학 개념: IR 적외선 센서 · 거리 측정 · 모터 제어 · 자율주행 기초',
    'p4.card.desc': '적외선 센서로 손을 따라가는 DORO 브랜드 로봇 자동차를 조립하며 거리 측정과 자율주행 기초를 학습.',
    'p4.age': '4~중등', 'p4.tag1': '#IR센서', 'p4.tag2': '#거리측정', 'p4.tag3': '#자율주행기초',
    'p4.card.meta': '⏱ 120분 · 초등 4~중등',
    'p4.info.time': '120분', 'p4.info.age': '초등 4~중등', 'p4.info.level': '★★★',
    'p4.info.type': '홈러닝 키트', 'p4.info.feat.label': '🚗 특징', 'p4.info.feat': '4바퀴 구동',
    'p4.step1.title': '도입 — 자동차가 스스로 움직이다?', 'p4.step2.title': '과학 개념 — IR 센서와 거리 측정',
    'p4.step3.title': '조립 — DORO 로봇 자동차 제작', 'p4.step4.title': '작동 + 탐구',
    'p4.step5.title': '정리 + 발표',
    'p4.demo.caption': '📹 도카 IR 자동차 작동 데모',
    'p4.ai.title': '🤖 자율주행 시뮬레이션',
    'p4.ai.desc': '도카가 실제 자율주행 차량처럼 장애물을 감지하고 멈추는 시나리오를 직접 설계하는 확장 활동이 가능합니다.',
    'p4.faq1.q': '자동차가 손을 따라가지 않을 때는?',
    'p4.faq2.q': '한쪽 바퀴만 돌 때는?',

    // ── P5: 도텐도 ──
    'p5.kit': 'DORO 게임 코딩 키트', 'p5.title': '🎮 도텐도 — 아두이노 게임기',
    'p5.desc': '파란 돼지 캐릭터 디자인의 목재 게임기를 조립하고, LCD 화면과 버튼으로 러닝 점프 게임을 코딩합니다.',
    'p5.science': '🔬 핵심 과학 개념: 디지털 입력 · LCD 출력 · 아두이노 코딩 · 피지컬 컴퓨팅',
    'p5.card.desc': '파란 돼지 캐릭터 목재 게임기를 조립하고 버튼 + LCD 화면으로 러닝 점프 게임을 코딩하며 피지컬 컴퓨팅 체험.',
    'p5.age': '4~중등', 'p5.tag1': '#LCD디스플레이', 'p5.tag2': '#게임로직', 'p5.tag3': '#피지컬컴퓨팅',
    'p5.card.meta': '⏱ 120분 · 초등 4~중등',
    'p5.info.time': '120분', 'p5.info.age': '초등 4~중등', 'p5.info.level': '★★★',
    'p5.info.coding.label': '💻 코딩', 'p5.info.coding': 'MakeCode/아두이노',
    'p5.info.char.label': '🐷 캐릭터', 'p5.info.char': '돼지',
    'p5.step1.title': '도입 — 게임기의 원리', 'p5.step2.title': '과학·코딩 개념',
    'p5.step3.title': '조립 — 게임기 제작', 'p5.step4.title': '코딩 — 러닝 점프 게임 만들기',
    'p5.step5.title': '게임 대회 + 발표',
    'p5.demo.caption': '📹 도텐도 아두이노 게임기 작동 데모',
    'p5.ai.title': '🤖 AI 난이도 적응 게임 설계',
    'p5.ai.desc': '플레이어 점수에 따라 난이도가 자동으로 올라가는 AI 적응형 게임 로직을 설계하는 심화 확장 활동이 가능합니다.',
    'p5.faq1.q': 'LCD에 아무것도 표시되지 않을 때는?',
    'p5.faq2.q': '버튼을 눌러도 점프가 안 될 때는?',
    'p5.faq3.q': '코딩을 전혀 모르는 학생도 할 수 있나요?',

    // ── P6: 도짜르트 ──
    'p6.kit': 'DORO 피지컬 컴퓨팅 키트', 'p6.title': '🎹 도짜르트 — 초음파 피아노',
    'p6.desc': '개구리 캐릭터 피아노 건반을 조립하고, 초음파 센서 앞에서 손 거리를 조절하면 음높이가 바뀌는 인터랙티브 악기를 코딩합니다.',
    'p6.science': '🔬 핵심 과학 개념: 초음파 센서 · 거리-음높이 매핑 · 조건문 코딩 · 사운드 인터랙션',
    'p6.card.desc': '개구리 캐릭터 피아노 건반을 조립하고 초음파 센서 + 조건문으로 거리별 음높이를 코딩하는 인터랙티브 악기.',
    'p6.age': '4~중등', 'p6.tag1': '#초음파센서', 'p6.tag2': '#조건문코딩', 'p6.tag3': '#사운드인터랙션',
    'p6.card.meta': '⏱ 90분 · 초등 4~중등',
    'p6.info.time': '90분', 'p6.info.age': '초등 4~중등', 'p6.info.level': '★★★',
    'p6.info.feat.label': '🎵 특징', 'p6.info.feat': '손으로 연주',
    'p6.info.char.label': '🐸 캐릭터', 'p6.info.char': '개구리',
    'p6.step1.title': '도입 — 손이 악기가 되다', 'p6.step2.title': '과학·코딩 개념',
    'p6.step3.title': '조립 — 개구리 피아노 제작', 'p6.step4.title': '코딩 — 거리-음 매핑',
    'p6.step5.title': '연주 + 발표',
    'p6.demo.caption': '📹 도짜르트 초음파 피아노 작동 데모',
    'p6.ai.title': '🎵 AI 작곡 + 피아노 연주',
    'p6.ai.desc': 'AI 작곡 도구 Suno로 멜로디를 만들고, 도짜르트 피아노로 그 멜로디를 재현하는 창작 확장 활동이 가능합니다.',
    'p6.faq1.q': '손을 움직여도 소리가 안 날 때는?',
    'p6.faq2.q': '소리가 계속 같은 음만 날 때는?',
    'p6.faq3.q': '특정 음을 더 쉽게 내려면?',

    // ── V3 Learning Portal ──
    'learning.parts.title': '🔍 부품 확인 미션',
    'learning.safety.title': '🛡 안전 퀘스트',
    'learning.build.title': '🔨 한 단계씩 만들기',
    'learning.trouble.title': '🤔 왜 안 되지?',
    'learning.lab.title': '🔬 과학 원리 실험실',
    'learning.mission.title': '🎯 미션 카드',
    'learning.notebook.title': '📓 나만의 실험 기록장',
    'learning.certificate.title': '🏆 완성 인증서',
    'learning.parts.found': '찾았어요! ✓',
    'learning.parts.missing': '없어요 — 보호자에게 알려주세요',
    'learning.safety.correct': '맞아요! 안전 대원이에요 ✓',
    'learning.safety.wrong': '다시 확인해볼까요?',
    'learning.safety.pass': '🎖 안전 대원 배지를 얻었어요!',
    'learning.build.done': '완료했어요 ✓',
    'learning.build.redo': '다시 볼래요',
    'learning.build.help': '도와줘요',
    'learning.trouble.select': '무엇이 문제인가요?',
    'learning.notebook.save': '기록 저장하기',
    'learning.notebook.saved': '저장됐어요 ✓',
    'learning.certificate.print': '인증서 출력하기',
    'learning.nickname.prompt': '닉네임을 입력하세요 (선택)',
    'learning.parent.note': '👨‍👩‍👧 보호자/교사와 함께하기',
  },

  en: {
    // Nav
    'nav.quests': 'Quests', 'nav.story': 'Story', 'nav.home': 'DORO Home', 'nav.back': '← Program List',

    // Hero
    'hero.tagline1': 'Technology doesn\'t harm nature,', 'hero.tagline2': 'if we use it the right way..',
    'hero.tagline3': 'DOROLAND has stopped.', 'hero.tagline4': 'You are the only one who can bring it back.',
    'hero.badge.label': 'DORO DIMC Home Learning Kit', 'hero.badge.desc': '2026 Science Culture Voucher Application Product',
    'hero.scroll': 'SCROLL',

    // DIMC
    'dimc.badge': 'ABOUT DORO DIMC', 'dimc.title': 'DORO DIMC Home Learning Digital Kit',
    'dimc.subtitle': 'A <strong style="color:var(--text-primary)">science learning package</strong> combining hands-on digital kits with student worksheets, assembly guides, parent/teacher guides, and QR-linked video tutorials.',
    'dimc.card1.title': 'Science Inquiry', 'dimc.card1.desc': 'Sensors, circuits, kinematics — experience textbook science by building it yourself',
    'dimc.card2.title': 'Making Experience', 'dimc.card2.desc': 'Students lead the full process: design, assemble, and verify',
    'dimc.card3.title': 'AI Extension', 'dimc.card3.desc': 'Optional AI tools to naturally extend into creation, analysis, and coding',

    // Quest Section
    'quest.badge': 'QUESTS', 'quest.title': 'Available Quests',
    'quest.desc': 'Select your kit to access the mission guide',
    'quest.tab.active': '🗡 Available Quests (6)',
    'quest.tab.locked': '🔒 Locked Quests (3)',
    'quest.hover.hint': 'HOVER → View Components',
    'quest.cta': 'Start Mission →',

    // Story Section
    'story.badge': 'DOROLAND STORY', 'story.title': 'The Story of DOROLAND',
    'story.quote': '"Technology doesn\'t harm nature, if we use it the right way.."',
    'story.p1': 'DOROLAND was a theme park where technology and nature coexisted in harmony. One day everything suddenly stopped. The adventure to revive DOROLAND begins.',
    'story.p2': 'Revive the sensors of the Safari zone, repair the machines of Harmonia, and uncover secrets lost in time. <strong style="color: var(--emerald);">You are the only one who can bring DOROLAND back to life.</strong>',
    'story.chars.title': 'DOROLAND Characters',

    // Science Section
    'science.badge': 'SCIENCE × MAKING',
    'science.title': 'DORO provides <span class="text-gradient">science & culture products</span><br>combining self-designed digital kits with educational materials',
    'science.desc': 'Each product is designed for hands-on learning of core science & engineering: sensors, I/O, control, kinematics, IoT, and physical computing.',

    // Footer
    'footer.copy': '© 2026 DOROLAND · Do Challenge. To Ask. Be Together · DORO Inc.',
    'lang.toggle': '한',

    // Info Bar Common Labels
    'info.time.label': '⏱ Duration', 'info.age.label': '👤 Target Age',
    'info.level.label': '⭐ Difficulty', 'info.type.label': '🏠 Learning Type',

    // Program Page Common
    'prog.nav.back': 'Program List',
    'prog.photos': '📸 Kit Photos', 'prog.checklist.title': '🔧 Materials Verification Checklist',
    'prog.missions': '📖 STEP-BY-STEP Curriculum',
    'prog.demo.title': '🎬 Kit Demo Video',
    'prog.demo.note': '※ This video shows the completed kit in action (not an assembly guide).',
    'prog.ai.label': 'Optional Extension Activity', 'prog.faq.title': '❓ FAQ',
    'prog.docs.title': '📚 Educational Resources',
    'prog.docs.overview': 'Program Overview', 'prog.docs.guide': 'Teaching Guide',
    'prog.toc.photos': 'Kit Photos', 'prog.toc.checklist': 'Materials Check',
    'prog.toc.missions': 'Curriculum', 'prog.toc.media': 'Demo Video',
    'prog.toc.ai': 'AI Extension', 'prog.toc.faq': 'FAQ',

    // Step Times
    'time.10': '⏱ 10 min', 'time.15': '⏱ 15 min', 'time.20': '⏱ 20 min',
    'time.25': '⏱ 25 min', 'time.30': '⏱ 30 min', 'time.35': '⏱ 35 min',
    'time.50': '⏱ 50 min', 'time.90': '⏱ 90 min', 'time.120': '⏱ 120 min',

    // ── P1: DOBLETOOTH ──
    'p1.kit': 'DORO IoT Sound Kit', 'p1.title': '🔊 DOBLETOOTH — Bluetooth Speaker',
    'p1.desc': 'Assemble a panda-themed Bluetooth speaker and explore Bluetooth communication and the science of sound.',
    'p1.science': '🔬 Core Concepts: Bluetooth · Sound Vibration · Electromagnetic Induction · IoT',
    'p1.card.desc': 'Assemble an IoT Bluetooth speaker and explore Bluetooth communication and the science of sound. Panda-design wooden frame.',
    'p1.age': 'Gr. 4–6', 'p1.tag1': '#bluetooth', 'p1.tag2': '#IoT', 'p1.tag3': '#acoustics',
    'p1.card.meta': '⏱ 90 min · Grades 4–6',
    'p1.info.time': '90 min', 'p1.info.age': 'Grades 4–6', 'p1.info.level': '★★☆',
    'p1.info.ai.label': '🎵 AI Ext.', 'p1.info.ai': 'Suno (optional)',
    'p1.info.type': 'Home Learning Kit', 'p1.info.char.label': '🐼 Character', 'p1.info.char': 'Panda',
    'p1.step1.title': 'Introduction — Why This Kit?', 'p1.step2.title': 'Science Concepts',
    'p1.step3.title': 'Assembly — Build the Panda Speaker', 'p1.step4.title': 'Test & Sound Exploration',
    'p1.step5.title': 'Wrap-up & Presentation',
    'p1.demo.caption': '📹 DOBLETOOTH Bluetooth Speaker — Demo',
    'p1.ai.title': '🎵 AI Music Creation with Suno',
    'p1.ai.desc': 'Create your own music with AI composition tool Suno and play it through your handmade panda speaker.',
    'p1.faq1.q': 'Bluetooth won\'t connect — what do I do?',
    'p1.faq2.q': 'Sound is too quiet or not playing?',
    'p1.faq3.q': 'Is Suno required?',
    'p1.faq4.q': 'Is there a parent/teacher guide?',

    // ── P2: DODOMOOD ──
    'p2.kit': 'DORO Sensor Exploration Kit', 'p2.title': '💡 DODOMOOD — Smart Mood Light',
    'p2.desc': 'Build a cat-themed mood light and create a smart lamp that automatically lights up in response to darkness.',
    'p2.science': '🔬 Core Concepts: Light Sensor · LED Circuit · Input-Output · Electrical Energy Conversion',
    'p2.card.desc': 'Build a smart mood light that responds to darkness using a light sensor and LED. Cat-design wooden base + silicone shade.',
    'p2.age': 'Gr. 3–6', 'p2.tag1': '#lightsensor', 'p2.tag2': '#LEDcircuit', 'p2.tag3': '#inputoutput',
    'p2.card.meta': '⏱ 90 min · Grades 3–6',
    'p2.info.time': '90 min', 'p2.info.age': 'Grades 3–6', 'p2.info.level': '★★☆',
    'p2.info.ai.label': '🎨 AI Ext.', 'p2.info.ai': 'None (basic)',
    'p2.info.type': 'Home Learning Kit', 'p2.info.char.label': '🐱 Character', 'p2.info.char': 'Cat',
    'p2.step1.title': 'Intro — The World of Light & Sensors', 'p2.step2.title': 'Science — Circuits & Sensors',
    'p2.step3.title': 'Assembly — Build the Cat Mood Light', 'p2.step4.title': 'Test & Explore',
    'p2.step5.title': 'Wrap-up & Presentation',
    'p2.demo.caption': '📹 DODOMOOD Smart Mood Light — Demo',
    'p2.ai.title': '🎨 Light & Color Exploration',
    'p2.ai.desc': 'Place colored cellophane in front of the LED to explore different lighting color effects.',
    'p2.faq1.q': 'LED won\'t light up?',
    'p2.faq2.q': 'Light sensor not responding?',
    'p2.faq3.q': 'How do I attach the silicone shade?',

    // ── P3: DOBOT ──
    'p3.kit': 'DORO Kinematics Robot Kit', 'p3.title': '🤖 DOBOT — Bipedal Walking Robot',
    'p3.desc': 'Assemble a dog-themed wooden bipedal robot and explore kinematics and rotary-to-walking motion conversion.',
    'p3.science': '🔬 Core Concepts: Kinematics · Rotary→Walking Motion · Motor Control · Electronic Circuits',
    'p3.card.desc': 'Assemble a dog-robot that walks on two legs and explore kinematics and rotary-to-walking motion conversion.',
    'p3.age': 'Gr. 4–9', 'p3.tag1': '#kinematics', 'p3.tag2': '#gaitdesign', 'p3.tag3': '#electronics',
    'p3.card.meta': '⏱ 120 min · Grades 4–9',
    'p3.info.time': '120 min', 'p3.info.age': 'Grades 4–9', 'p3.info.level': '★★★',
    'p3.info.type': 'Home Learning Kit', 'p3.info.char.label': '🐶 Character', 'p3.info.char': 'Dog',
    'p3.step1.title': 'Intro — How Do We Walk?', 'p3.step2.title': 'Science — Kinematics & Motors',
    'p3.step3.title': 'Assembly — Build the Dog Robot', 'p3.step4.title': 'Test & Explore',
    'p3.step5.title': 'Wrap-up & Presentation',
    'p3.demo.caption': '📹 DOBOT Walking Robot — Demo',
    'p3.ai.title': '🤖 Gait Pattern Recognition with Teachable Machine',
    'p3.ai.desc': 'Train Google Teachable Machine to recognize your robot\'s walking and stopped states.',
    'p3.faq1.q': 'Robot spins in place instead of walking?',
    'p3.faq2.q': 'Motor not turning?',
    'p3.faq3.q': 'Running short on assembly time?',

    // ── P4: DOCA ──
    'p4.kit': 'DORO AI Mobility Kit', 'p4.title': '🚗 DOCA — AI Robot Car',
    'p4.desc': 'Assemble a DORO-branded wooden robot car and learn autonomous driving basics using IR sensors.',
    'p4.science': '🔬 Core Concepts: IR Sensor · Distance Measurement · Motor Control · Autonomous Driving Basics',
    'p4.card.desc': 'Assemble a DORO-branded robot car that follows your hand via IR sensors and learn distance measurement and autonomous driving basics.',
    'p4.age': 'Gr. 4–9', 'p4.tag1': '#IRsensor', 'p4.tag2': '#distance', 'p4.tag3': '#autonomousdriving',
    'p4.card.meta': '⏱ 120 min · Grades 4–9',
    'p4.info.time': '120 min', 'p4.info.age': 'Grades 4–9', 'p4.info.level': '★★★',
    'p4.info.type': 'Home Learning Kit', 'p4.info.feat.label': '🚗 Feature', 'p4.info.feat': '4-Wheel Drive',
    'p4.step1.title': 'Intro — Cars That Drive Themselves?', 'p4.step2.title': 'Science — IR Sensors & Distance',
    'p4.step3.title': 'Assembly — Build the DORO Robot Car', 'p4.step4.title': 'Test & Explore',
    'p4.step5.title': 'Wrap-up & Presentation',
    'p4.demo.caption': '📹 DOCA IR Robot Car — Demo',
    'p4.ai.title': '🤖 Autonomous Driving Simulation',
    'p4.ai.desc': 'Design a scenario where DOCA detects obstacles and stops, just like a real autonomous vehicle.',
    'p4.faq1.q': 'Car won\'t follow hand?',
    'p4.faq2.q': 'Only one wheel turning?',

    // ── P5: DOTENDO ──
    'p5.kit': 'DORO Game Coding Kit', 'p5.title': '🎮 DOTENDO — Arduino Game Console',
    'p5.desc': 'Assemble a pig-themed wooden game console and code a running-jump game with LCD screen and buttons.',
    'p5.science': '🔬 Core Concepts: Digital Input · LCD Output · Arduino Coding · Physical Computing',
    'p5.card.desc': 'Assemble a pig-themed wooden game console and code a running-jump game using a button and LCD screen.',
    'p5.age': 'Gr. 4–9', 'p5.tag1': '#LCD', 'p5.tag2': '#gamelogic', 'p5.tag3': '#physicalcomputing',
    'p5.card.meta': '⏱ 120 min · Grades 4–9',
    'p5.info.time': '120 min', 'p5.info.age': 'Grades 4–9', 'p5.info.level': '★★★',
    'p5.info.coding.label': '💻 Coding', 'p5.info.coding': 'MakeCode / Arduino',
    'p5.info.char.label': '🐷 Character', 'p5.info.char': 'Pig',
    'p5.step1.title': 'Intro — How Game Consoles Work', 'p5.step2.title': 'Science & Coding Concepts',
    'p5.step3.title': 'Assembly — Build the Game Console', 'p5.step4.title': 'Coding — Build the Running Jump Game',
    'p5.step5.title': 'Game Tournament & Presentation',
    'p5.demo.caption': '📹 DOTENDO Arduino Game Console — Demo',
    'p5.ai.title': '🤖 AI Adaptive Difficulty Design',
    'p5.ai.desc': 'Design an AI-adaptive game logic that automatically increases difficulty based on player score.',
    'p5.faq1.q': 'Nothing showing on LCD?',
    'p5.faq2.q': 'Button press not jumping?',
    'p5.faq3.q': 'Can students with no coding experience do this?',

    // ── P6: DOZZART ──
    'p6.kit': 'DORO Physical Computing Kit', 'p6.title': '🎹 DOZZART — Ultrasonic Piano',
    'p6.desc': 'Assemble a frog-themed piano and code an interactive instrument where hand distance controls musical pitch.',
    'p6.science': '🔬 Core Concepts: Ultrasonic Sensor · Distance-Pitch Mapping · Conditional Coding · Sound Interaction',
    'p6.card.desc': 'Assemble a frog-themed piano and code an interactive instrument where hand distance controls musical pitch.',
    'p6.age': 'Gr. 4–9', 'p6.tag1': '#ultrasonics', 'p6.tag2': '#conditionalcode', 'p6.tag3': '#soundinteraction',
    'p6.card.meta': '⏱ 90 min · Grades 4–9',
    'p6.info.time': '90 min', 'p6.info.age': 'Grades 4–9', 'p6.info.level': '★★★',
    'p6.info.feat.label': '🎵 Feature', 'p6.info.feat': 'Play with Hands',
    'p6.info.char.label': '🐸 Character', 'p6.info.char': 'Frog',
    'p6.step1.title': 'Intro — Your Hand Is the Instrument', 'p6.step2.title': 'Science & Coding Concepts',
    'p6.step3.title': 'Assembly — Build the Frog Piano', 'p6.step4.title': 'Coding — Distance-Pitch Mapping',
    'p6.step5.title': 'Perform & Present',
    'p6.demo.caption': '📹 DOZZART Ultrasonic Piano — Demo',
    'p6.ai.title': '🎵 AI Composition + Piano Performance',
    'p6.ai.desc': 'Create a melody with AI composition tool Suno and recreate it on your DOZZART piano.',
    'p6.faq1.q': 'Moving hand but no sound?',
    'p6.faq2.q': 'Only one note keeps playing?',
    'p6.faq3.q': 'How to make a specific note easier to hit?',

    // ── V3 Learning Portal ──
    'learning.parts.title': '🔍 Parts Check Mission',
    'learning.safety.title': '🛡 Safety Quest',
    'learning.build.title': '🔨 Step-by-Step Build',
    'learning.trouble.title': '🤔 Why Won\'t It Work?',
    'learning.lab.title': '🔬 Science Lab',
    'learning.mission.title': '🎯 Mission Cards',
    'learning.notebook.title': '📓 My Experiment Journal',
    'learning.certificate.title': '🏆 Completion Certificate',
    'learning.parts.found': 'Found it! ✓',
    'learning.parts.missing': 'Missing — please tell a parent',
    'learning.safety.correct': 'Correct! You\'re a safety cadet ✓',
    'learning.safety.wrong': 'Let\'s check again?',
    'learning.safety.pass': '🎖 You earned the Safety Cadet badge!',
    'learning.build.done': 'Done ✓',
    'learning.build.redo': 'See again',
    'learning.build.help': 'Help me',
    'learning.trouble.select': 'What is the problem?',
    'learning.notebook.save': 'Save notes',
    'learning.notebook.saved': 'Saved ✓',
    'learning.certificate.print': 'Print certificate',
    'learning.nickname.prompt': 'Enter a nickname (optional)',
    'learning.parent.note': '👨‍👩‍👧 Do this with a parent/teacher',
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
      if (/<[a-z][\s\S]*>/i.test(text)) { el.innerHTML = text; }
      else { el.textContent = text; }
    }
  });
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.textContent = lang === 'ko' ? 'EN' : '한';
    btn.title = lang === 'ko' ? 'Switch to English' : '한국어로 전환';
  }
  document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
}

function toggleLanguage() { applyLanguage(currentLang === 'ko' ? 'en' : 'ko'); }

document.addEventListener('DOMContentLoaded', () => applyLanguage(currentLang));
