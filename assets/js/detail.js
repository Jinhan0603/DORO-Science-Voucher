/* ============================================
   DOROLAND Detail Page — Game UI
   World-building: each page = a DOROLAND zone quest
   ============================================ */
(function () {
  'use strict';

  /* ── DOROLAND Zone Data ── */
  const ZONES = {
    '1-bluetooth-speaker': {
      zone: '사운드 사파리 구역',     zoneEn: 'SOUND SAFARI ZONE',
      char: '도블투스',               charEn: 'DOBLETOOTH',
      charImg: '../../assets/images/pixel/panda.svg',
      dialogue: '"블루투스를 연결하면 사운드 사파리가 다시 깨어나!!"',
      dialogueEn: '"Connect Bluetooth to wake the Sound Safari again!!"',
      color: 'var(--emerald)',
      zoneDesc: '도블투스의 사운드 사파리 구역이 멈췄습니다. 블루투스 스피커를 완성해 음악을 흘려보내면 동물들이 다시 움직이기 시작합니다.',
    },
    '2-mood-light': {
      zone: '하모니아 빛 구역',       zoneEn: 'HARMONIA LIGHT ZONE',
      char: '도도무드',               charEn: 'DODOMOOD',
      charImg: '../../assets/images/pixel/cat.svg',
      dialogue: '"빛을 되찾아야 해. 무드등이 켜지면 하모니아가 빛날 거야!"',
      dialogueEn: '"Restore the light — when the mood lamp glows, Harmonia shines!"',
      color: 'var(--amber)',
      zoneDesc: '도도무드의 하모니아 빛 구역이 어둠에 잠겼습니다. 스마트 무드등을 완성해 빛 센서가 반응하면 구역 전체가 다시 빛납니다.',
    },
    '3-walking-robot': {
      zone: '기계 숲 구역',           zoneEn: 'MECHANIC FOREST ZONE',
      char: '도봇',                   charEn: 'DOBOT',
      charImg: '../../assets/images/pixel/dog.svg',
      dialogue: '"기계 숲이 멈췄어! 로봇을 고쳐 걷게 하면 숲이 살아나!"',
      dialogueEn: '"The Mechanic Forest stopped! Fix the robot walker to revive it!"',
      color: 'var(--sky)',
      zoneDesc: '도봇의 기계 숲 구역이 멈춰버렸습니다. 워킹 로봇을 조립하고 움직임을 완성하면 기계 숲의 모든 장치가 다시 작동합니다.',
    },
    '4-ir-car': {
      zone: '레이싱 트랙 구역',       zoneEn: 'RACING TRACK ZONE',
      char: '도드림',                 charEn: 'DODREAM',
      charImg: '../../assets/images/pixel/car.svg',
      dialogue: '"IR 신호를 보내! 트랙이 다시 달릴 준비가 됐어!"',
      dialogueEn: '"Send the IR signal! The track is ready to race again!"',
      color: 'var(--coral)',
      zoneDesc: '도드림의 레이싱 트랙 구역의 자동차들이 멈췄습니다. 적외선 자동차를 완성하고 리모컨으로 조종하면 트랙이 되살아납니다.',
    },
    '5-arduino-game': {
      zone: '게임 왕국 구역',         zoneEn: 'GAME KINGDOM ZONE',
      char: '도게임',                 charEn: 'DOGAME',
      charImg: '../../assets/images/pixel/pig.svg',
      dialogue: '"코드를 입력해! 게임 왕국이 다시 시작될 거야!"',
      dialogueEn: '"Enter the code! The Game Kingdom will start again!"',
      color: 'var(--purple)',
      zoneDesc: '도게임의 게임 왕국 구역이 멈췄습니다. 아두이노 게임 컨트롤러를 조립하고 코딩을 완성하면 왕국이 다시 살아납니다.',
    },
    '6-ultrasonic-piano': {
      zone: '음악 성 구역',           zoneEn: 'MUSIC CASTLE ZONE',
      char: '도피아노',               charEn: 'DOPIANO',
      charImg: '../../assets/images/pixel/frog.svg',
      dialogue: '"손을 흔들어 소리를 만들어! 음악 성에 멜로디가 흘러야 해!"',
      dialogueEn: '"Wave your hand to make sound! Music Castle needs its melody!"',
      color: 'var(--rose)',
      zoneDesc: '도피아노의 음악 성 구역에서 모든 소리가 사라졌습니다. 초음파 피아노를 완성하고 연주하면 성 전체에 음악이 돌아옵니다.',
    },
  };

  /* Detect current program from URL */
  function detectZone() {
    const path = window.location.pathname;
    for (const key of Object.keys(ZONES)) {
      if (path.includes(key)) return { key, data: ZONES[key] };
    }
    return null;
  }

  /* Get current language */
  function isEn() {
    return (localStorage.getItem('doro-lang') || 'ko') === 'en';
  }

  /* ── Inject DOROLAND Character Card (replaces simple pixel-char-hero) ── */
  function injectCharCard(zoneData) {
    const hero = document.querySelector('.detail-hero');
    if (!hero) return;

    const existing = hero.querySelector('.pixel-char-hero');
    const en = isEn();

    const card = document.createElement('div');
    card.className = 'doro-char-card';
    card.style.setProperty('--zone-color', zoneData.color);
    card.innerHTML = `
      <div class="doro-char-sprite">
        <img src="${zoneData.charImg}" alt="${zoneData.char}" class="pixel-char-img">
      </div>
      <div class="doro-char-info">
        <div class="doro-char-name">
          <span class="doro-char-label">CHARACTER</span>
          <span class="doro-char-value">${en ? zoneData.charEn : zoneData.char}</span>
        </div>
        <div class="doro-char-zone">
          <span class="doro-char-label">ZONE</span>
          <span class="doro-char-value zone-name">${en ? zoneData.zoneEn : zoneData.zone}</span>
        </div>
        <div class="doro-char-dialogue">${en ? zoneData.dialogueEn : zoneData.dialogue}</div>
      </div>`;

    if (existing) {
      existing.replaceWith(card);
    } else {
      hero.prepend(card);
    }

    /* Zone story card before info bar */
    const infoBar = document.querySelector('.info-bar');
    if (infoBar) {
      const story = document.createElement('div');
      story.className = 'doro-zone-story';
      story.innerHTML = `
        <div class="doro-zone-story-inner">
          <span class="doro-zone-badge">${en ? '▸ DOROLAND ZONE QUEST' : '▸ 도로랜드 구역 퀘스트'}</span>
          <p>${en ? zoneData.dialogueEn : zoneData.zoneDesc}</p>
        </div>`;
      infoBar.parentElement.insertBefore(story, infoBar);
    }
  }

  /* ── Inject a DOROLAND game-panel header ── */
  function injectPanelHeader(beforeEl, badgeText, titleText, themeClass) {
    if (!beforeEl) return;
    const div = document.createElement('div');
    div.className = 'game-panel-header' + (themeClass ? ' ' + themeClass : '');
    div.innerHTML = `<span class="panel-badge">${badgeText}</span><span class="panel-title">${titleText}</span>`;
    beforeEl.parentElement.insertBefore(div, beforeEl);
  }

  /* ── Mission Steps ── */
  function initMissionSteps(zoneData) {
    const steps = document.querySelectorAll('.mission-step');
    if (!steps.length) return;
    const en = isEn();
    const color = zoneData ? zoneData.color : 'var(--emerald)';

    const section = document.querySelector('.mission-section');
    const h2 = section && section.querySelector('h2');
    const h2Text = h2 ? h2.textContent.replace(/^[^\w가-힣A-Z]+/, '').trim() : (en ? 'Curriculum' : '교육 과정');
    if (h2) injectPanelHeader(h2, en ? 'DOROLAND MISSION' : '도로랜드 미션', h2Text);

    /* Inject QUEST label + DP badge per step */
    steps.forEach((step, i) => {
      const header = step.querySelector('.mission-step-header');
      const timeEl = step.querySelector('.mission-step-time');
      const mins = timeEl ? parseInt(timeEl.textContent.replace(/[^0-9]/g, ''), 10) || 15 : 15;
      const dp = mins;
      const num = String(i + 1).padStart(2, '0');

      const label = document.createElement('div');
      label.className = 'step-quest-label';
      label.style.setProperty('--zone-color', color);
      label.innerHTML = `<span>QUEST ${num}</span><span class="step-xp-badge">+${dp} DP</span>`;
      step.insertBefore(label, header);
    });

    /* DOROLAND Restore Progress Bar */
    const firstStep = steps[0];
    if (firstStep && firstStep.parentElement) {
      const panel = document.createElement('div');
      panel.className = 'quest-progress-panel';
      const zoneName = zoneData ? (en ? zoneData.zoneEn : zoneData.zone) : (en ? 'ZONE' : '구역');
      panel.innerHTML = `
        <div class="quest-progress-top">
          <span>${en ? 'DOROLAND RESTORE RATE' : '도로랜드 복구율'} — ${zoneName}</span>
          <span id="qp-text">0%</span>
        </div>
        <div class="quest-progress-track">
          <div class="quest-progress-fill" id="qp-fill"></div>
        </div>`;
      firstStep.parentElement.insertBefore(panel, firstStep);
    }

    function updateProgress() {
      let visible = 0;
      steps.forEach(s => {
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) visible++;
      });
      const pct = Math.round((visible / steps.length) * 100);
      const fill = document.getElementById('qp-fill');
      const text = document.getElementById('qp-text');
      if (fill) fill.style.width = pct + '%';
      if (text) text.textContent = pct + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ── Checklist: DOROLAND Inventory ── */
  function initInventoryChecklist(zoneData) {
    const items = document.querySelectorAll('.checklist-item');
    if (!items.length) return;
    const en = isEn();

    const section = document.querySelector('.checklist-section');
    const title = section && section.querySelector('.checklist-title');
    const titleText = title ? title.textContent.replace(/^[^\w가-힣A-Z]+/, '').trim() : (en ? 'Checklist' : '준비물 체크리스트');
    if (title) injectPanelHeader(title, en ? 'DOROLAND INVENTORY' : '도로랜드 인벤토리', titleText, 'amber-theme');

    function syncAll() {
      let checked = 0;
      items.forEach(item => {
        const cb = item.querySelector('input[type="checkbox"]');
        const ok = cb && cb.checked;
        item.classList.toggle('item-checked', !!ok);
        if (ok) checked++;
      });
      return checked;
    }

    items.forEach(item => {
      const cb = item.querySelector('input[type="checkbox"]');
      if (cb) cb.addEventListener('change', () => {
        const n = syncAll();
        updateExp(n);
      });
    });

    const expWrap = document.createElement('div');
    expWrap.className = 'checklist-exp-wrap';
    expWrap.innerHTML = `
      <div class="checklist-exp-label">
        <span>${en ? 'ITEM EXP' : '아이템 EXP'}</span>
        <span id="exp-text">0 / ${items.length}</span>
      </div>
      <div class="checklist-exp-track">
        <div class="checklist-exp-fill" id="exp-fill"></div>
      </div>`;
    if (section) section.appendChild(expWrap);

    const toast = document.createElement('div');
    toast.className = 'mission-clear-toast';
    const charName = zoneData ? (en ? zoneData.charEn : zoneData.char) : 'DORO';
    toast.textContent = `★ ${charName}: ${en ? 'ALL ITEMS READY — START MISSION!' : '준비 완료 — 미션을 시작해!'} ★`;
    document.body.appendChild(toast);

    function updateExp(checked) {
      const total = items.length;
      const pct = Math.round((checked / total) * 100);
      const fill = document.getElementById('exp-fill');
      const text = document.getElementById('exp-text');
      if (fill) fill.style.width = pct + '%';
      if (text) text.textContent = checked + ' / ' + total;
      if (checked === total) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
      }
    }

    syncAll();
    updateExp(document.querySelectorAll('.checklist-item.item-checked').length);
  }

  /* ── FAQ: DOROLAND Codex ── */
  function initFaqHeader() {
    const faq = document.querySelector('.faq-section');
    if (!faq) return;
    const h2 = faq.querySelector('h2');
    const en = isEn();
    if (h2) injectPanelHeader(h2, en ? 'DOROLAND CODEX' : '도로랜드 코덱스', en ? 'FAQ' : '자주 묻는 질문', 'purple-theme');
  }

  /* ── Media Header ── */
  function initMediaHeader() {
    const media = document.querySelector('.media-section');
    if (!media) return;
    const h2 = media.querySelector('h2');
    const en = isEn();
    if (h2) injectPanelHeader(h2, en ? 'DEMO' : '데모', h2.textContent.replace(/^[^\w가-힣A-Z]+/, '').trim());
  }

  /* ── Kit Gallery Label ── */
  function initGalleryLabel() {
    const photos = document.getElementById('photos');
    if (!photos || photos.querySelector('.kit-gallery-label')) return;
    const label = document.createElement('div');
    label.className = 'kit-gallery-label';
    label.textContent = '▸ KIT GALLERY';
    photos.prepend(label);
  }

  /* ── INIT ── */
  function init() {
    const zone = detectZone();
    const zoneData = zone ? zone.data : null;

    injectCharCard(zoneData);
    initMissionSteps(zoneData);
    initInventoryChecklist(zoneData);
    initFaqHeader();
    initMediaHeader();
    initGalleryLabel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
