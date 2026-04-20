/* ============================================
   DOROLAND Education Portal - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  normalizeBaseBranding();
  initVariantBranding();
  initScrollAnimations();
  initNavScroll();
  initQuestTabs();
  initFAQAccordion();
  initChecklist();
  initProgressBar();
});

function normalizeBaseBranding() {
  document.title = document.title.replace(/V3-CODEX/gi, 'V3').replace(/V2\s+\|/i, 'V3 |');

  const footerBrand = document.querySelector('.footer-brand');
  if (footerBrand && /V3-CODEX/i.test(footerBrand.textContent)) {
    footerBrand.textContent = '⚔ DOROLAND V3 ⚔';
  }
}

function getVariant() {
  const params = new URLSearchParams(window.location.search);
  return (params.get('v') || '').trim().toLowerCase();
}

function initVariantBranding() {
  const variant = getVariant();
  if (!variant) return;

  let label = '';
  let note = '';

  if (variant === 'v3.1-codex') {
    label = 'V3.1-codex';
    note = '문구 통일 · 진행도 고정 · 로딩 최적화';
  } else if (variant === 'v3-codex') {
    label = 'V3-codex';
    note = 'Codex 작업 버전';
  }

  if (!label) return;

  document.querySelectorAll('.nav-version').forEach(el => {
    el.textContent = label;
  });

  const footerBrand = document.querySelector('.footer-brand');
  if (footerBrand) {
    footerBrand.textContent = `⚔ DOROLAND ${label} ⚔`;
  }

  const badge = document.querySelector('.hero-game-badge');
  if (badge && !document.querySelector('.variant-note')) {
    const noteEl = document.createElement('div');
    noteEl.className = 'variant-note';
    noteEl.textContent = `${label} · ${note}`;
    badge.insertAdjacentElement('afterend', noteEl);
  }

  const baseTitle = document.title.replace(/^DOROLAND\s+V[^\|]*\|\s*/i, '');
  document.title = `${label} | ${baseTitle}`;
}

/* --- Scroll Animations (Intersection Observer) --- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* --- Navigation Scroll Effect --- */
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* --- Quest Tabs --- */
function initQuestTabs() {
  const tabs = document.querySelectorAll('.quest-tab');
  if (!tabs.length) return;

  const questGrid = document.getElementById('quest-grid');
  const lockedQuests = document.getElementById('locked-quests');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabType = tab.dataset.tab;
      if (tabType === 'active') {
        if (questGrid) questGrid.style.display = '';
        if (lockedQuests) lockedQuests.style.display = 'none';
      } else {
        if (questGrid) questGrid.style.display = 'none';
        if (lockedQuests) lockedQuests.style.display = '';
      }
    });
  });
}

/* --- FAQ Accordion --- */
function initFAQAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* --- Checklist with LocalStorage --- */
function initChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  if (!checkboxes.length) return;

  const pageId = window.location.pathname;

  // Restore state
  checkboxes.forEach((cb, index) => {
    const key = `doro-checklist-${pageId}-${index}`;
    const saved = localStorage.getItem(key);
    if (saved === 'true') {
      cb.checked = true;
    }

    // Save on change
    cb.addEventListener('change', () => {
      localStorage.setItem(key, cb.checked);
      updateChecklistProgress();
    });
  });

  updateChecklistProgress();
}

function updateChecklistProgress() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const total = checkboxes.length;
  if (!total) return;

  const checked = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
  const progressEl = document.getElementById('checklist-progress');
  if (progressEl) {
    const pct = Math.round((checked / total) * 100);
    progressEl.textContent = `${checked}/${total} 완료 (${pct}%)`;
    progressEl.style.color = pct === 100 ? 'var(--emerald)' : 'var(--text-secondary)';
  }
}

/* --- Scroll Progress Bar --- */
function initProgressBar() {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
}

/* --- TOC Active State --- */
function initTOC() {
  const tocItems = document.querySelectorAll('.toc-item');
  if (!tocItems.length) return;

  const sections = [];
  tocItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) sections.push({ el: section, tocItem: item });
    }
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    let current = null;

    sections.forEach(({ el, tocItem }) => {
      if (el.offsetTop <= scrollY) {
        current = tocItem;
      }
    });

    tocItems.forEach(i => i.classList.remove('active'));
    if (current) current.classList.add('active');
  });
}

// Init TOC if present
if (document.querySelector('.toc-sidebar')) {
  initTOC();
}
