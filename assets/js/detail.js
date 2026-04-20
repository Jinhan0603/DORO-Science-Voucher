/* ============================================
   DOROLAND Detail Page Enhancer
   학습 흐름 중심의 가벼운 보정만 수행
   ============================================ */
(function () {
  'use strict';

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

  function injectZoneStory(kit) {
    var infoBar = document.querySelector('.info-bar');
    if (!infoBar || !kit) return;

    var existing = document.querySelector('.doro-zone-story');
    if (existing) existing.remove();

    var story = document.createElement('div');
    story.className = 'doro-zone-story';
    story.innerHTML =
      '<div class="doro-zone-story-inner">' +
        '<span class="doro-zone-badge">' + t('detail.story.badge', 'DOROLAND 구역 퀘스트', 'DOROLAND Zone Quest') + '</span>' +
        '<p>' + kit.story + '</p>' +
      '</div>';

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

  function streamlineLearningHub() {
    var toc = document.querySelector('.toc-sidebar');
    var learningHubLink = toc && toc.querySelector('a[href="#learning-hub"]');
    if (learningHubLink) learningHubLink.remove();
  }

  function init() {
    var kitId = detectKitId();
    var kit = kitId && window.DORO_KIT_DATA ? window.DORO_KIT_DATA[kitId] : null;

    refineDetailLayout();
    injectZoneStory(kit);
    initInventoryChecklist();
    normalizeChecklistCopy();
    initMissionSteps();
    streamlineLearningHub();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
