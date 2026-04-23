/* ============================================
   DOROLAND Detail Page Enhancer
   학습 흐름 중심의 가벼운 보정만 수행
   ============================================ */
(function () {
  'use strict';

  var tocEventsBound = false;

  function detectKitId() {
    var path = window.location.pathname;
    var keys = window.DORO_KIT_DATA ? Object.keys(window.DORO_KIT_DATA) : [];
    for (var i = 0; i < keys.length; i++) {
      if (path.indexOf(keys[i]) !== -1) return keys[i];
    }
    return null;
  }

  function getLang() {
    return (localStorage.getItem('doro-lang') || 'ko').indexOf('en') === 0 ? 'en' : 'ko';
  }

  function t(key, fallbackKo, fallbackEn) {
    var lang = getLang();
    var dict = window.i18n && window.i18n[lang];
    if (dict && dict[key] !== undefined) return dict[key];
    return lang === 'en' ? fallbackEn : fallbackKo;
  }

  function getQuestBrief(kitId) {
    var lang = getLang();
    var store = window.DORO_QUEST_BRIEFS || {};
    var brief = store[kitId];
    if (!brief) return null;
    return brief[lang] || brief.ko || null;
  }

  function renderParagraphs(lines) {
    return (lines || []).map(function (line) {
      return '<p class="quest-brief-copy">' + line + '</p>';
    }).join('');
  }

  function injectZoneStory(kitId, kit) {
    var infoBar = document.querySelector('.info-bar');
    if (!infoBar || !kit) return;

    var existing = document.querySelector('.doro-zone-story');
    if (existing) existing.remove();

    var brief = getQuestBrief(kitId);
    var story = document.createElement('div');
    story.className = 'doro-zone-story';
    if (brief) {
      story.innerHTML =
        '<div class="doro-zone-story-inner quest-brief-card">' +
          '<span class="doro-zone-badge">' + t('detail.story.badge', 'DOROLAND 구역 퀘스트', 'DOROLAND Zone Quest') + '</span>' +
          '<div class="quest-brief-grid">' +
            '<div class="quest-brief-block">' +
              '<span class="quest-brief-label">' + brief.backgroundTitle + '</span>' +
              renderParagraphs(brief.background) +
            '</div>' +
            '<div class="quest-brief-block quest-brief-mission">' +
              '<span class="quest-brief-label">' + brief.missionTitle + '</span>' +
              '<p class="quest-brief-copy"><strong>' + brief.mission + '</strong></p>' +
            '</div>' +
          '</div>' +
        '</div>';
    } else {
      story.innerHTML =
        '<div class="doro-zone-story-inner">' +
          '<span class="doro-zone-badge">' + t('detail.story.badge', 'DOROLAND 구역 퀘스트', 'DOROLAND Zone Quest') + '</span>' +
          '<p>' + kit.story + '</p>' +
        '</div>';
    }

    infoBar.parentNode.insertBefore(story, infoBar);
  }

  function refineDetailLayout() {
    var hero = document.querySelector('.detail-hero');
    var content = document.querySelector('.detail-content');
    if (hero) hero.classList.add('detail-hero-clean');
    if (content) content.classList.add('detail-content-clean');
  }

  function initInventoryChecklist() {
    var legacyChecklist = document.getElementById('checklist');
    if (legacyChecklist) {
      legacyChecklist.remove();
    }
  }

  function normalizeChecklistCopy() {
    var toc = document.querySelector('.toc-sidebar');
    var legacyLink = toc && toc.querySelector('a[href="#checklist"]');
    if (legacyLink) legacyLink.remove();
  }

  function initMissionSteps() {
    var steps = document.querySelectorAll('.mission-step');
    if (!steps.length) return;
  }

  function getTocLinks() {
    return Array.prototype.slice.call(document.querySelectorAll('.toc-sidebar .toc-item[href^="#"], .toc-sidebar [data-toc-link]'));
  }

  function getTargetId(link) {
    if (!link) return null;
    var rawTarget = link.getAttribute('data-target') || link.getAttribute('data-section') || link.getAttribute('href') || '';
    if (!rawTarget) return null;
    if (rawTarget.charAt(0) === '#') return rawTarget.slice(1);
    if (/^[A-Za-z0-9_-]+$/.test(rawTarget)) return rawTarget;
    return null;
  }

  function setActiveTocLink(activeId) {
    getTocLinks().forEach(function (link) {
      var isActive = getTargetId(link) === activeId;
      link.classList.toggle('active', isActive);
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function syncTocActiveState() {
    var links = getTocLinks();
    if (!links.length) return;

    var nav = document.getElementById('navbar');
    var threshold = (nav ? nav.offsetHeight : 0) + 28;
    var viewportPriority = Math.max(threshold + 48, Math.floor(window.innerHeight * 0.45));
    var hashId = window.location.hash.replace(/^#/, '');
    var hashTarget = hashId && document.getElementById(hashId);
    var nextId = null;
    var nextTop = null;
    var activeId = null;

    if (hashTarget && !hashTarget.hidden && !hashTarget.classList.contains('post-safety-hidden')) {
      var hashTop = hashTarget.getBoundingClientRect().top;
      if (hashTop >= 0 && hashTop <= viewportPriority) {
        setActiveTocLink(hashId);
        return;
      }
    }

    links.forEach(function (link) {
      var targetId = getTargetId(link);
      var target = targetId && document.getElementById(targetId);
      var top = 0;
      if (!target) return;
      if (target.hidden || target.classList.contains('post-safety-hidden')) return;
      top = target.getBoundingClientRect().top;
      if (top <= threshold) {
        activeId = targetId;
      } else if (nextId === null || top < nextTop) {
        nextId = targetId;
        nextTop = top;
      }
    });

    if (!activeId) {
      activeId = nextId || getTargetId(links[0]);
    }

    if (activeId) setActiveTocLink(activeId);
  }

  function scrollToHashTarget(targetId, behavior) {
    var target = targetId && document.getElementById(targetId);
    if (!target) {
      console.warn('[V5 TOC] Missing target:', targetId);
      return;
    }
    if (target.hidden || target.classList.contains('post-safety-hidden')) {
      return;
    }

    target.scrollIntoView({
      behavior: behavior || 'smooth',
      block: 'start'
    });

    if (history.replaceState) {
      history.replaceState(null, '', '#' + targetId);
    } else {
      window.location.hash = targetId;
    }

    setActiveTocLink(targetId);
  }

  function bindTocEvents() {
    if (tocEventsBound) return;

    document.addEventListener('click', function (event) {
      var link = event.target.closest('.toc-sidebar .toc-item, .toc-sidebar [data-toc-link]');
      if (!link) return;

      var targetId = getTargetId(link);
      if (!targetId) return;

      if (!document.getElementById(targetId)) {
        console.warn('[V5 TOC] Missing target:', targetId);
        return;
      }

      event.preventDefault();
      scrollToHashTarget(targetId, 'smooth');
    });

    window.addEventListener('scroll', syncTocActiveState, { passive: true });
    window.addEventListener('resize', syncTocActiveState);
    window.addEventListener('hashchange', function () {
      syncTocActiveState();
    });

    tocEventsBound = true;
  }

  function streamlineLearningHub() {
    var toc = document.querySelector('.toc-sidebar');
    var learningHubLink = toc && toc.querySelector('a[href="#learning-hub"]');
    if (learningHubLink) learningHubLink.remove();
  }

  function init() {
    var kitId = detectKitId();
    var kit = kitId && window.DORO_KIT_DATA ? window.DORO_KIT_DATA[kitId] : null;

    refineDetailLayout();
    injectZoneStory(kitId, kit);
    initInventoryChecklist();
    normalizeChecklistCopy();
    initMissionSteps();
    streamlineLearningHub();
    bindTocEvents();
    syncTocActiveState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('doro:languagechange', init);
  window.addEventListener('doro:v5learningrendered', function () {
    syncTocActiveState();
    if (window.location.hash) {
      window.requestAnimationFrame(function () {
        scrollToHashTarget(window.location.hash.replace(/^#/, ''), 'auto');
      });
    }
  });
})();
