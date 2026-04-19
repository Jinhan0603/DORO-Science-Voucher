/* ============================================
   DOROLAND Detail Page — Pixel Game UI v2
   ============================================ */
(function () {
  'use strict';

  function parseMinutes(el) {
    if (!el) return 15;
    const n = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10);
    return isNaN(n) ? 15 : n;
  }

  /* Inject a game-panel header before an element */
  function injectPanelHeader(beforeEl, badgeText, titleText, theme) {
    if (!beforeEl) return;
    const div = document.createElement('div');
    div.className = 'game-panel-header' + (theme ? ' ' + theme : '');
    div.innerHTML = `<span class="panel-badge">${badgeText}</span><span class="panel-title">${titleText}</span>`;
    beforeEl.parentElement.insertBefore(div, beforeEl);
  }

  /* ── Mission Steps ── */
  function initMissionSteps() {
    const steps = document.querySelectorAll('.mission-step');
    if (!steps.length) return;

    /* Replace h2 with game panel header */
    const section = document.querySelector('.mission-section');
    const h2 = section && section.querySelector('h2');
    const h2Text = h2 ? h2.textContent.replace(/^[^\w가-힣]+/, '').trim() : '교육 과정';
    if (h2) injectPanelHeader(h2, 'MISSION', h2Text);

    /* Inject QUEST label + XP badge above each step header */
    steps.forEach((step, i) => {
      const header = step.querySelector('.mission-step-header');
      const timeEl = step.querySelector('.mission-step-time');
      const xp = parseMinutes(timeEl);
      const num = String(i + 1).padStart(2, '0');

      const label = document.createElement('div');
      label.className = 'step-quest-label';
      label.innerHTML = `<span>QUEST ${num}</span><span class="step-xp-badge">+${xp} XP</span>`;
      step.insertBefore(label, header);
    });

    /* Quest progress bar */
    const firstStep = steps[0];
    if (firstStep && firstStep.parentElement) {
      const panel = document.createElement('div');
      panel.className = 'quest-progress-panel';
      panel.innerHTML = `
        <div class="quest-progress-top">
          <span>QUEST PROGRESS</span>
          <span id="qp-text">0 / ${steps.length} COMPLETED</span>
        </div>
        <div class="quest-progress-track">
          <div class="quest-progress-fill" id="qp-fill"></div>
        </div>`;
      firstStep.parentElement.insertBefore(panel, firstStep);
    }

    /* Track scroll-based progress (which step is in view) */
    function updateProgress() {
      let visible = 0;
      steps.forEach(s => {
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) visible++;
      });
      const pct = Math.round((visible / steps.length) * 100);
      const fill = document.getElementById('qp-fill');
      const text = document.getElementById('qp-text');
      if (fill) fill.style.width = pct + '%';
      if (text) text.textContent = visible + ' / ' + steps.length + ' COMPLETED';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ── Checklist: Inventory + EXP ── */
  function initInventoryChecklist() {
    const items = document.querySelectorAll('.checklist-item');
    if (!items.length) return;

    /* Replace title with game panel header */
    const section = document.querySelector('.checklist-section');
    const title = section && section.querySelector('.checklist-title');
    const titleText = title ? title.textContent.replace(/^[^\w가-힣]+/, '').trim() : '준비물 체크리스트';
    if (title) injectPanelHeader(title, 'INVENTORY', titleText, 'amber-theme');

    /* Sync item-checked class */
    function syncAll() {
      let checked = 0;
      items.forEach(item => {
        const cb = item.querySelector('input[type="checkbox"]');
        const isChecked = cb && cb.checked;
        item.classList.toggle('item-checked', !!isChecked);
        if (isChecked) checked++;
      });
      return checked;
    }

    items.forEach(item => {
      const cb = item.querySelector('input[type="checkbox"]');
      if (cb) cb.addEventListener('change', () => {
        const checked = syncAll();
        updateExp(checked);
      });
    });

    /* EXP bar */
    const expWrap = document.createElement('div');
    expWrap.className = 'checklist-exp-wrap';
    expWrap.innerHTML = `
      <div class="checklist-exp-label">
        <span>ITEM COLLECTION EXP</span>
        <span id="exp-text">0 / ${items.length}</span>
      </div>
      <div class="checklist-exp-track">
        <div class="checklist-exp-fill" id="exp-fill"></div>
      </div>`;
    if (section) section.appendChild(expWrap);

    /* MISSION CLEAR toast */
    const toast = document.createElement('div');
    toast.className = 'mission-clear-toast';
    toast.textContent = '★ INVENTORY COMPLETE — READY FOR MISSION! ★';
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
        setTimeout(() => toast.classList.remove('show'), 3500);
      }
    }

    syncAll();
    updateExp(document.querySelectorAll('.checklist-item.item-checked').length);
  }

  /* ── FAQ: Quest Codex header ── */
  function initFaqHeader() {
    const faq = document.querySelector('.faq-section');
    if (!faq) return;
    const h2 = faq.querySelector('h2');
    if (h2) injectPanelHeader(h2, 'CODEX', '자주 묻는 질문', 'purple-theme');
  }

  /* ── Media section header ── */
  function initMediaHeader() {
    const media = document.querySelector('.media-section');
    if (!media) return;
    const h2 = media.querySelector('h2');
    if (h2) injectPanelHeader(h2, 'DEMO', h2.textContent.replace(/^[^\w가-힣A-Z]+/, '').trim());
  }

  /* ── Kit Gallery label ── */
  function initGalleryLabel() {
    const photos = document.getElementById('photos');
    if (!photos) return;
    if (photos.querySelector('.kit-gallery-label')) return;
    const label = document.createElement('div');
    label.className = 'kit-gallery-label';
    label.textContent = '▸ KIT GALLERY';
    photos.prepend(label);
  }

  /* ── Init ── */
  function init() {
    initMissionSteps();
    initInventoryChecklist();
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
