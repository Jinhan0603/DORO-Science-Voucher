/* ============================================
   DOROLAND Detail Page — Pixel Game UI
   Quest objectives, XP system, inventory
   ============================================ */
(function () {
  'use strict';

  /* ── Helpers ── */
  function parseMinutes(el) {
    if (!el) return 15;
    const n = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10);
    return isNaN(n) ? 15 : n;
  }

  /* ── Mission Steps: Quest Objective mode ── */
  function initMissionSteps() {
    const steps = document.querySelectorAll('.mission-step');
    if (!steps.length) return;

    /* XP values per step = minutes * 1 */
    steps.forEach((step, i) => {
      const header = step.querySelector('.mission-step-header');
      const timeEl = step.querySelector('.mission-step-time');
      const xp = parseMinutes(timeEl);

      /* Inject XP badge */
      const xpBadge = document.createElement('span');
      xpBadge.className = 'step-xp-badge';
      xpBadge.textContent = '+' + xp + ' XP';
      if (timeEl) header.insertBefore(xpBadge, timeEl);
      else header.appendChild(xpBadge);

      /* Toggle open/close on header click */
      step.classList.toggle('step-open', i === 0); // first step open
      header.addEventListener('click', () => {
        const isOpen = step.classList.contains('step-open');
        /* Close all, then open clicked (accordion) */
        steps.forEach(s => s.classList.remove('step-open'));
        if (!isOpen) step.classList.add('step-open');
        updateMissionProgress();
      });
    });

    /* Mission Progress Bar */
    const section = document.querySelector('.mission-section');
    if (section) {
      const h2 = section.querySelector('h2');
      const wrap = document.createElement('div');
      wrap.className = 'mission-progress-wrap';
      wrap.innerHTML = `
        <div class="mission-progress-label">
          <span>QUEST PROGRESS</span>
          <span id="mission-progress-text">STEP 1 / ${steps.length}</span>
        </div>
        <div class="mission-progress-track">
          <div class="mission-progress-fill" id="mission-progress-fill"></div>
        </div>`;
      h2.insertAdjacentElement('afterend', wrap);
    }

    updateMissionProgress();
  }

  function updateMissionProgress() {
    const steps = document.querySelectorAll('.mission-step');
    const open = Array.from(steps).findIndex(s => s.classList.contains('step-open'));
    const current = open >= 0 ? open + 1 : 1;
    const total = steps.length;
    const pct = Math.round((current / total) * 100);

    const fill = document.getElementById('mission-progress-fill');
    const text = document.getElementById('mission-progress-text');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = 'STEP ' + current + ' / ' + total;
  }

  /* ── Checklist: Inventory + EXP Bar ── */
  function initInventoryChecklist() {
    const items = document.querySelectorAll('.checklist-item');
    if (!items.length) return;

    /* Sync item-checked class with checkbox state */
    function syncItem(item) {
      const cb = item.querySelector('input[type="checkbox"]');
      if (!cb) return;
      item.classList.toggle('item-checked', cb.checked);
    }

    items.forEach(item => {
      syncItem(item);
      const cb = item.querySelector('input[type="checkbox"]');
      if (cb) cb.addEventListener('change', () => {
        syncItem(item);
        updateExpBar();
      });
    });

    /* Inject EXP bar after last checklist item */
    const section = document.querySelector('.checklist-section');
    if (section) {
      const expWrap = document.createElement('div');
      expWrap.className = 'checklist-exp-wrap';
      expWrap.innerHTML = `
        <div class="checklist-exp-label">
          <span>ITEM COLLECTION EXP</span>
          <span id="checklist-exp-text">0 / ${items.length}</span>
        </div>
        <div class="checklist-exp-track">
          <div class="checklist-exp-fill" id="checklist-exp-fill"></div>
        </div>`;
      section.appendChild(expWrap);
    }

    /* MISSION CLEAR toast */
    const toast = document.createElement('div');
    toast.className = 'mission-clear-toast';
    toast.textContent = '✓ ITEMS COLLECTED — MISSION CLEAR!';
    document.body.appendChild(toast);

    updateExpBar();

    function updateExpBar() {
      const total = items.length;
      const checked = document.querySelectorAll('.checklist-item.item-checked').length;
      const pct = Math.round((checked / total) * 100);

      const fill = document.getElementById('checklist-exp-fill');
      const text = document.getElementById('checklist-exp-text');
      if (fill) fill.style.width = pct + '%';
      if (text) text.textContent = checked + ' / ' + total;

      if (checked === total && total > 0) showClearToast(toast);
    }
  }

  function showClearToast(toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ── Section Rule Lines ── */
  function addSectionRules() {
    const targets = [
      '.mission-section > h2',
      '.faq-section > h2',
      '.checklist-title',
    ];
    targets.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      const rule = document.createElement('span');
      rule.className = 'section-rule';
      el.insertAdjacentElement('afterend', rule);
    });
  }

  /* ── Pixel art label for kit photos section ── */
  function addPhotoLabel() {
    const photosSection = document.querySelector('#photos h2');
    if (photosSection) return; // already has h2
    const section = document.getElementById('photos');
    if (!section) return;
    const label = document.createElement('div');
    label.style.cssText = 'font-family:var(--font-pixel);font-size:0.48rem;color:var(--emerald);letter-spacing:0.1em;margin-bottom:0.85rem;';
    label.textContent = '▸ KIT GALLERY';
    section.prepend(label);
  }

  /* ── Init ── */
  function init() {
    initMissionSteps();
    initInventoryChecklist();
    addSectionRules();
    addPhotoLabel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
