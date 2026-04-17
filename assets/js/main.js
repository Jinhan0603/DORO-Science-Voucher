/* ============================================
   DOROLAND Education Portal - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavScroll();
  initQuestTabs();
  initFAQAccordion();
  initChecklist();
  initProgressBar();
});

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

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabType = tab.dataset.tab;
      const cards = document.querySelectorAll('.quest-card');
      cards.forEach(card => {
        if (tabType === 'active') {
          card.style.display = card.classList.contains('locked') ? 'none' : '';
        } else {
          card.style.display = card.classList.contains('locked') ? '' : 'none';
        }
      });
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
