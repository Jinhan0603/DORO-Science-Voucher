/* ============================================
   DOROLAND V3 — Learning Portal JavaScript
   학생용 자기주도 학습 UI / localStorage 기반
   ============================================ */

(function () {
  'use strict';

  var SECTION_IDS = {
    kitView: 'kit-view',
    starterResources: 'starter-resources',
    starterQuiz: 'starter-quiz',
    componentCheck: 'component-check',
    safetyPromise: 'safety-promise',
    buildGuide: 'build-guide',
    troubleshooting: 'troubleshooting',
    scienceLab: 'science-lab',
    reviewQuiz: 'review-quiz',
    challengeMissions: 'challenge-missions',
    recordCertificate: 'record-certificate',
    resourcesVideos: 'resources-videos'
  };

  var SUPPORT_EMAIL = 'dorocoltd@doroedu.co.kr';
  var POST_SAFETY_SECTION_IDS = [
    SECTION_IDS.componentCheck,
    SECTION_IDS.buildGuide,
    SECTION_IDS.troubleshooting,
    SECTION_IDS.scienceLab,
    SECTION_IDS.reviewQuiz,
    SECTION_IDS.challengeMissions,
    SECTION_IDS.recordCertificate,
    SECTION_IDS.resourcesVideos
  ];
  var QUEST_GATED_SECTION_IDS = POST_SAFETY_SECTION_IDS.slice();
  var buildTransitionNotice = {};

  function toHash(id) {
    return '#' + id;
  }

  function getKitIdFromPath() {
    var parts = location.pathname.split('/');
    var idx = parts.indexOf('programs');
    return idx !== -1 ? parts[idx + 1] : null;
  }

  function getProgressKey(kitId) {
    return 'doro_v5_' + kitId;
  }

  function saveProgress(kitId, data) {
    try {
      var key = getProgressKey(kitId);
      var existing = loadProgress(kitId) || {};
      localStorage.setItem(key, JSON.stringify(Object.assign(existing, data)));
    } catch (e) {
      /* ignore */
    }
  }

  function loadProgress(kitId) {
    try {
      var raw = localStorage.getItem(getProgressKey(kitId));
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function resetProgress(kitId) {
    try {
      localStorage.removeItem(getProgressKey(kitId));
    } catch (e) {
      /* ignore */
    }
  }

  function cloneMap(source) {
    return Object.assign({}, source || {});
  }

  function getLang() {
    return (localStorage.getItem('doro-lang') || document.documentElement.lang || 'ko').indexOf('en') === 0 ? 'en' : 'ko';
  }

  function t(key, fallbackKo, fallbackEn) {
    var lang = getLang();
    var dict = window.i18n && window.i18n[lang];
    if (dict && dict[key] !== undefined) return dict[key];
    return lang === 'en' ? fallbackEn : fallbackKo;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function localizedCopy(value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      var lang = getLang();
      return value[lang] || value.ko || value.en || '';
    }
    return value || '';
  }

  function pixelIcon(name, className) {
    return window.getPixelIconMarkup ? window.getPixelIconMarkup(name, '', className || '') : '';
  }

  function withPixelIcon(name, text, className, position) {
    var icon = pixelIcon(name, className || 'pixel-icon-inline');
    var safeText = String(text == null ? '' : text);
    return position === 'after' ? safeText + icon : icon + safeText;
  }

  function sectionIconForKey(key) {
    var map = {
      'learning.parts.title': 'parts',
      'learning.starter.title': 'pdf',
      'learning.starter.quiz.title': 'check',
      'learning.safety.title': 'safety',
      'learning.build.title': 'build',
      'learning.trouble.title': 'help',
      'learning.lab.title': 'science',
      'learning.mission.title': 'mission',
      'learning.notebook.title': 'record',
      'learning.certificate.title': 'certificate',
      'learning.review.title': 'review'
    };
    return map[key] || 'parts';
  }

  function countStates(saved, state) {
    return Object.keys(saved || {}).filter(function (key) {
      return saved[key] === state;
    }).length;
  }

  function toggleMapValue(saved, idx, state) {
    var next = cloneMap(saved);
    if (next[idx] === state) {
      delete next[idx];
    } else {
      next[idx] = state;
    }
    return next;
  }

  function getPartKey(part, index) {
    return part && part.id ? part.id : String(index);
  }

  function normalizePartProgress(saved, parts) {
    var source = saved || {};
    var normalized = {};
    (parts || []).forEach(function (part, index) {
      var key = getPartKey(part, index);
      var value = source[key];
      if (value !== 'found' && value !== 'missing') {
        value = source[index];
      }
      if (value === 'found' || value === 'missing') {
        normalized[key] = value;
      }
    });
    return normalized;
  }

  function getQuizKey(item, index) {
    return item && item.id ? item.id : String(index);
  }

  function normalizeQuizProgress(saved, items) {
    var source = saved || {};
    var normalized = {};
    (items || []).forEach(function (item, index) {
      var key = getQuizKey(item, index);
      var value = source[key];
      if (typeof value !== 'boolean') value = source[index];
      if (typeof value === 'boolean') {
        normalized[key] = value;
      }
    });
    return normalized;
  }

  function setQuizAnswer(saved, key, value) {
    var next = cloneMap(saved);
    next[key] = value;
    return next;
  }

  function getSafetyPromises(kitId) {
    var root = window.DORO_SAFETY_PROMISES || {};
    var common = Array.isArray(root.common) ? root.common.slice() : [];
    var kits = root.kits || {};
    var specific = Array.isArray(kits[kitId]) ? kits[kitId].slice() : [];
    return common.concat(specific);
  }

  function normalizeSafetyProgress(saved, promises) {
    var source = saved || {};
    var allowed = {};
    var checkedIds = Array.isArray(source.checkedIds) ? source.checkedIds.slice() : [];
    var normalized = [];
    (promises || []).forEach(function (item) {
      allowed[item.id] = true;
    });
    checkedIds.forEach(function (id) {
      if (allowed[id] && normalized.indexOf(id) === -1) {
        normalized.push(id);
      }
    });
    var completed = normalized.length === (promises || []).length && (promises || []).length > 0;
    return {
      checkedIds: normalized,
      completed: completed,
      completedAt: source.completedAt || null
    };
  }

  function toggleSafetyChecked(checkedIds, id) {
    var next = Array.isArray(checkedIds) ? checkedIds.slice() : [];
    var idx = next.indexOf(id);
    if (idx === -1) {
      next.push(id);
    } else {
      next.splice(idx, 1);
    }
    return next;
  }

  function isSafetyCompleted(kitId, progress) {
    var promises = getSafetyPromises(kitId);
    if (!promises.length) return true;
    return normalizeSafetyProgress(progress && progress.safety, promises).completed;
  }

  function isPartMapComplete(partsMap, parts) {
    var list = parts || [];
    if (!list.length) return true;
    return list.every(function (part, index) {
      return partsMap[getPartKey(part, index)] === 'found';
    });
  }

  function isPartsComplete(kit, progress) {
    if (!kit) return false;
    return isPartMapComplete(normalizePartProgress(progress && progress.parts, kit.parts), kit.parts);
  }

  function isBuildComplete(kitId, kit, progress) {
    var steps = getAssemblySteps(kitId, kit);
    if (!steps.length) return true;
    var saved = progress && progress.build ? progress.build : {};
    return Number(saved.step || 0) >= steps.length;
  }

  function isScienceComplete(progress) {
    return !!(progress && progress.gates && progress.gates.scienceComplete === true);
  }

  function isReviewComplete(kit, progress) {
    var quiz = kit && Array.isArray(kit.reviewQuiz) ? kit.reviewQuiz : [];
    if (!quiz.length) return true;
    var saved = normalizeQuizProgress(progress && progress.reviewQuiz && progress.reviewQuiz.answers, quiz);
    return quiz.every(function (item, index) {
      return typeof saved[getQuizKey(item, index)] === 'boolean';
    });
  }

  function isChallengeComplete(kit, progress) {
    var missions = kit ? getAllMissions(kit) : [];
    if (!missions.length) return true;
    var saved = cloneMap(progress && progress.missions);
    return missions.every(function (_, index) {
      return saved[index] === true;
    });
  }

  function isRecordComplete(progress) {
    return !!(progress && progress.gates && progress.gates.recordComplete === true && progress.notebook && progress.notebook.savedAt);
  }

  function mergeGateData(kitId, patch) {
    var latest = loadProgress(kitId) || {};
    return Object.assign({}, latest.gates || {}, patch, {
      updatedAt: new Date().toISOString()
    });
  }

  function getQuestGateState(kitId, kit, progress) {
    var safetyComplete = isSafetyCompleted(kitId, progress);
    var partsComplete = safetyComplete && isPartsComplete(kit, progress);
    var buildComplete = partsComplete && isBuildComplete(kitId, kit, progress);
    var scienceComplete = buildComplete && isScienceComplete(progress);
    var reviewComplete = scienceComplete && isReviewComplete(kit, progress);
    var challengeComplete = reviewComplete && isChallengeComplete(kit, progress);
    var recordComplete = challengeComplete && isRecordComplete(progress);
    return {
      safetyComplete: safetyComplete,
      partsComplete: partsComplete,
      buildComplete: buildComplete,
      scienceComplete: scienceComplete,
      reviewComplete: reviewComplete,
      challengeComplete: challengeComplete,
      recordComplete: recordComplete
    };
  }

  function getGateLock(sectionId, gates) {
    if (isPostSafetySection(sectionId) && !gates.safetyComplete) {
      return {
        target: SECTION_IDS.safetyPromise,
        message: t('learning.safety.lock.toast', '안전 약속을 먼저 완료하면 다음 단계가 열려요.', 'Complete the safety promise to unlock the next steps.')
      };
    }
    if (sectionId !== SECTION_IDS.componentCheck && isPostSafetySection(sectionId) && !gates.partsComplete) {
      return {
        target: SECTION_IDS.componentCheck,
        message: t('learning.gate.parts.lock', '구성품을 모두 찾으면 만들기 단계가 열려요.', 'Complete the component check to unlock building.')
      };
    }
    if ([SECTION_IDS.scienceLab, SECTION_IDS.reviewQuiz, SECTION_IDS.challengeMissions, SECTION_IDS.recordCertificate, SECTION_IDS.resourcesVideos].indexOf(sectionId) !== -1 && !gates.buildComplete) {
      return {
        target: SECTION_IDS.buildGuide,
        message: t('learning.gate.build.lock', '모든 만들기 단계를 완료하면 과학 실험이 열려요.', 'Finish every build step to unlock the science lab.')
      };
    }
    if ([SECTION_IDS.reviewQuiz, SECTION_IDS.challengeMissions, SECTION_IDS.recordCertificate, SECTION_IDS.resourcesVideos].indexOf(sectionId) !== -1 && !gates.scienceComplete) {
      return {
        target: SECTION_IDS.scienceLab,
        message: t('learning.gate.science.lock', '과학 실험을 확인하면 되돌아보기가 열려요.', 'Complete the science lab to unlock the review quiz.')
      };
    }
    if ([SECTION_IDS.challengeMissions, SECTION_IDS.recordCertificate, SECTION_IDS.resourcesVideos].indexOf(sectionId) !== -1 && !gates.reviewComplete) {
      return {
        target: SECTION_IDS.reviewQuiz,
        message: t('learning.gate.review.lock', '되돌아보기를 완료하면 도전 미션이 열려요.', 'Complete the review quiz to unlock the challenge missions.')
      };
    }
    if ([SECTION_IDS.recordCertificate, SECTION_IDS.resourcesVideos].indexOf(sectionId) !== -1 && !gates.challengeComplete) {
      return {
        target: SECTION_IDS.challengeMissions,
        message: t('learning.gate.challenge.lock', '도전 미션을 완료하면 기록 단계가 열려요.', 'Complete the challenge missions to unlock the record step.')
      };
    }
    if (sectionId === SECTION_IDS.resourcesVideos && !gates.recordComplete) {
      return {
        target: SECTION_IDS.recordCertificate,
        message: t('learning.gate.record.lock', '기록을 완료하면 인증서와 자료·영상이 열려요.', 'Complete the record step to unlock the certificate and resources.')
      };
    }
    return null;
  }

  function getNextGateSectionId(gates) {
    if (!gates.safetyComplete) return SECTION_IDS.safetyPromise;
    if (!gates.partsComplete) return SECTION_IDS.componentCheck;
    if (!gates.buildComplete) return SECTION_IDS.buildGuide;
    if (!gates.scienceComplete) return SECTION_IDS.scienceLab;
    if (!gates.reviewComplete) return SECTION_IDS.reviewQuiz;
    if (!gates.challengeComplete) return SECTION_IDS.challengeMissions;
    if (!gates.recordComplete) return SECTION_IDS.recordCertificate;
    return SECTION_IDS.resourcesVideos;
  }

  function showLearningToast(message) {
    var toast = document.querySelector('.doro-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'doro-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showLearningToast.timer);
    showLearningToast.timer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  function preserveScroll(callback) {
    var x = window.scrollX || window.pageXOffset || 0;
    var y = window.scrollY || window.pageYOffset || 0;
    var restore = function () {
      window.scrollTo({ left: x, top: y, behavior: 'auto' });
    };
    callback();
    restore();
    window.requestAnimationFrame(function () {
      restore();
      window.requestAnimationFrame(function () {
        restore();
      });
    });
    window.setTimeout(restore, 80);
    window.setTimeout(restore, 180);
    window.setTimeout(restore, 320);
  }

  function rerenderLearningPreserveScroll() {
    preserveScroll(renderLearningUI);
  }

  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        if (document.execCommand('copy')) {
          resolve();
        } else {
          reject(new Error('copy failed'));
        }
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }

  function updateSupportFeedback(button, message) {
    var contact = button.closest('.support-contact');
    var feedback = contact && contact.querySelector('.support-copy-feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.classList.add('is-visible');
      window.setTimeout(function () {
        feedback.classList.remove('is-visible');
      }, 2400);
    }
    showLearningToast(message);
  }

  function openLearningDialog(message, actionLabel, cancelLabel, onAction) {
    var existing = document.querySelector('.doro-dialog-backdrop');
    if (existing) existing.remove();

    var backdrop = document.createElement('div');
    backdrop.className = 'doro-dialog-backdrop';
    backdrop.innerHTML =
      '<div class="doro-dialog" role="dialog" aria-modal="true">' +
        '<p class="doro-dialog-copy">' + escapeHtml(message) + '</p>' +
        '<div class="doro-dialog-actions">' +
          '<button type="button" class="doro-dialog-btn doro-dialog-btn-danger" data-dialog-action="ok">' + escapeHtml(actionLabel) + '</button>' +
          '<button type="button" class="doro-dialog-btn doro-dialog-btn-cancel" data-dialog-action="cancel">' + escapeHtml(cancelLabel) + '</button>' +
        '</div>' +
      '</div>';

    backdrop.addEventListener('click', function (event) {
      var action = event.target.getAttribute('data-dialog-action');
      if (action === 'cancel' || event.target === backdrop) {
        backdrop.remove();
        return;
      }
      if (action === 'ok') {
        backdrop.remove();
        onAction();
      }
    });

    document.body.appendChild(backdrop);
    var cancel = backdrop.querySelector('[data-dialog-action="cancel"]');
    if (cancel) cancel.focus();
  }

  function setPostSafetyVisibility(isVisible) {
    POST_SAFETY_SECTION_IDS.forEach(function (id) {
      var section = document.getElementById(id);
      if (!section) return;
      section.hidden = !isVisible;
      section.classList.toggle('post-safety-hidden', !isVisible);
      if (!isVisible) {
        section.onclick = null;
      }
    });
  }

  function setSectionGateVisibility(sectionId, isVisible) {
    var section = document.getElementById(sectionId);
    if (!section) return;
    section.hidden = !isVisible;
    section.classList.toggle('post-safety-hidden', !isVisible);
  }

  function setQuestGateVisibility(gates) {
    var visibility = {};
    visibility[SECTION_IDS.componentCheck] = gates.safetyComplete;
    visibility[SECTION_IDS.buildGuide] = gates.partsComplete;
    visibility[SECTION_IDS.troubleshooting] = gates.partsComplete;
    visibility[SECTION_IDS.scienceLab] = gates.buildComplete;
    visibility[SECTION_IDS.reviewQuiz] = gates.scienceComplete;
    visibility[SECTION_IDS.challengeMissions] = gates.reviewComplete;
    visibility[SECTION_IDS.recordCertificate] = gates.challengeComplete;
    visibility[SECTION_IDS.resourcesVideos] = gates.recordComplete;

    QUEST_GATED_SECTION_IDS.forEach(function (id) {
      setSectionGateVisibility(id, !!visibility[id]);
    });

    var certificate = document.getElementById('certificate');
    if (certificate) {
      certificate.hidden = !gates.recordComplete;
      certificate.classList.toggle('post-safety-hidden', !gates.recordComplete);
      if (!gates.recordComplete) {
        certificate.innerHTML = '';
      }
    }
  }

  function isPostSafetySection(sectionId) {
    return POST_SAFETY_SECTION_IDS.indexOf(sectionId) !== -1;
  }

  function supportContactHtml(messageKo, messageEn, extraClass) {
    var className = 'support-contact' + (extraClass ? ' ' + extraClass : '');
    return '' +
      '<div class="' + className + '">' +
        '<p class="support-contact-copy">' + t('learning.support.message', messageKo, messageEn) + '</p>' +
        '<div class="support-email-line"><span class="support-email-address">' + SUPPORT_EMAIL + '</span></div>' +
        '<div class="support-contact-actions">' +
          '<a href="https://pf.kakao.com/_RxofKG" target="_blank" rel="noopener noreferrer" class="support-link support-link-kakao">' + withPixelIcon('chat', t('learning.support.kakao', '카카오톡 문의', 'Kakao Inquiry'), 'pixel-icon-button') + '</a>' +
          '<button type="button" class="support-link support-link-email support-email-copy" data-copy-email="' + SUPPORT_EMAIL + '">' + withPixelIcon('email', t('learning.support.email.copy', '이메일 복사', 'Copy Email'), 'pixel-icon-button') + '</button>' +
          '<a href="mailto:' + SUPPORT_EMAIL + '?subject=DORO%20%ED%82%A4%ED%8A%B8%20%EB%AC%B8%EC%9D%98" class="support-link support-mail-link">' + withPixelIcon('email', t('learning.support.mail.open', '메일 앱 열기', 'Open Mail App'), 'pixel-icon-button') + '</a>' +
        '</div>' +
        '<div class="support-copy-feedback" aria-live="polite"></div>' +
      '</div>';
  }

  function handleSupportEmailClick(event) {
    var button = event.target.closest('.support-email-copy');
    if (!button) return;
    event.preventDefault();
    copyTextToClipboard(button.getAttribute('data-copy-email') || SUPPORT_EMAIL)
      .then(function () {
        updateSupportFeedback(button, t('learning.support.email.copied', '이메일이 복사되었습니다.', 'Email copied.'));
      })
      .catch(function () {
        updateSupportFeedback(button, t('learning.support.email.fallback', '이메일 주소를 직접 복사해 주세요.', 'Please copy the email address manually.'));
      });
  }

  function buildSectionTitle(key, fallbackKo, fallbackEn) {
    return withPixelIcon(sectionIconForKey(key), t(key, fallbackKo, fallbackEn), 'pixel-icon-heading');
  }

  function renderGatePanel(title, copy, buttonClass, buttonLabel) {
    var buttonIcon = 'arrow-next';
    if (buttonClass && buttonClass.indexOf('science-confirm') !== -1) buttonIcon = 'check';
    if (buttonClass && buttonClass.indexOf('science-review') !== -1) buttonIcon = 'review';
    if (buttonClass && buttonClass.indexOf('review-challenge') !== -1) buttonIcon = 'mission';
    if (buttonClass && buttonClass.indexOf('challenge-record') !== -1) buttonIcon = 'record';
    if (buttonClass && buttonClass.indexOf('notebook-certificate') !== -1) buttonIcon = 'certificate';
    if (buttonClass && buttonClass.indexOf('parts-build') !== -1) buttonIcon = 'build';
    return '' +
      '<div class="quest-gate-panel">' +
        '<div class="quest-gate-copy">' +
          '<strong>' + title + '</strong>' +
          '<p>' + copy + '</p>' +
        '</div>' +
        (buttonClass && buttonLabel
          ? '<div class="quest-gate-actions"><button type="button" class="resource-link-btn ' + buttonClass + '">' + withPixelIcon(buttonIcon, buttonLabel, 'pixel-icon-button') + '</button></div>'
          : '') +
      '</div>';
  }

  function handleQREntry() {
    var params = new URLSearchParams(location.search);
    if (params.get('from') !== 'qr') return;
    var kitId = getKitIdFromPath();

    var existing = document.querySelector('.qr-entry-banner');
    if (existing) existing.remove();

    var banner = document.createElement('div');
    banner.className = 'qr-entry-banner';
    banner.innerHTML =
      '<div class="qr-entry-inner">' +
        '<p class="qr-entry-title">' + withPixelIcon('parts', t('learning.qr.title', '키트를 받았다면 바로 시작해요.', 'If you have your kit, start here.'), 'pixel-icon-inline') + '</p>' +
        '<div class="qr-entry-btns">' +
          '<button type="button" class="qr-btn qr-btn-primary" data-scroll-target="' + toHash(SECTION_IDS.starterResources) + '">' + withPixelIcon('pdf', t('learning.starter.button', '교육자료 확인', 'Starter Resources'), 'pixel-icon-button') + '</button>' +
          '<button type="button" class="qr-btn qr-btn-help" data-action="start-build">' + withPixelIcon('arrow-up', t('learning.build.start', '만들기 시작', 'Start Building'), 'pixel-icon-button') + '</button>' +
        '</div>' +
      '</div>';

    banner.addEventListener('click', function (event) {
      var actionBtn = event.target.closest('[data-action="start-build"]');
      if (actionBtn) {
        var progress = kitId ? loadProgress(kitId) : {};
        var kit = kitId && window.DORO_KIT_DATA ? window.DORO_KIT_DATA[kitId] : null;
        var targetId = kit ? getNextGateSectionId(getQuestGateState(kitId, kit, progress)) : SECTION_IDS.safetyPromise;
        scrollToSection(targetId);
        return;
      }
      var btn = event.target.closest('[data-scroll-target]');
      if (!btn) return;
      var target = document.querySelector(btn.getAttribute('data-scroll-target'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });

    var hero = document.querySelector('.detail-hero');
    if (hero) hero.insertAdjacentElement('afterend', banner);
  }

  function renderComponentCheck(kitId, kit, progress) {
    var sec = document.getElementById(SECTION_IDS.componentCheck);
    if (!sec || !kit) return;
    sec.onclick = null;

    var saved = cloneMap(progress.parts);
    var total = kit.parts.length;
    var foundCount = countStates(saved, 'found');
    var missingCount = countStates(saved, 'missing');
    var checkedCount = foundCount + missingCount;

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.parts.title', '구성품 확인', 'Component Check') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.parts.desc.short', '상자 안의 부품을 하나씩 찾아요. 이름, 역할, 찾는 힌트를 확인하고 표시하세요.', 'Find each item in the box. Check its name, role, and hint, then mark it.') + '</p>' +
      '<div class="parts-toolbar">' +
        '<div class="parts-progress-chip">' + t('learning.parts.progress', '확인한 부품', 'Checked parts') + ' <strong>' + checkedCount + ' / ' + total + '</strong></div>' +
        '<div class="parts-toolbar-actions">' +
          '<button type="button" class="parts-reset-btn">' + withPixelIcon('reset', t('learning.parts.clear', '전체 선택 해제', 'Clear all'), 'pixel-icon-button') + '</button>' +
          (foundCount === total ? '<button type="button" class="parts-next-btn">' + withPixelIcon('arrow-next', t('learning.parts.next', '안전 약속으로 이동', 'Go to Safety Promise'), 'pixel-icon-button') + '</button>' : '') +
        '</div>' +
      '</div>' +
      '<div class="parts-grid" id="parts-grid"></div>' +
      '<div class="parts-summary" id="parts-summary"></div>';

    var grid = sec.querySelector('#parts-grid');
    kit.parts.forEach(function (part, i) {
      var found = saved[i] === 'found';
      var missing = saved[i] === 'missing';
      var card = document.createElement('article');
      card.className = 'part-card' + (found ? ' found' : missing ? ' missing' : '');
      card.innerHTML =
        '<div class="part-card-head">' +
          '<div class="part-icon" aria-hidden="true">' + pixelIcon(part.icon || 'parts', 'pixel-icon-part') + '</div>' +
          '<div class="part-name">' + part.name + '</div>' +
        '</div>' +
        '<div class="part-meta">' +
          '<div class="part-copy">' +
            '<span class="part-copy-label">' + t('learning.parts.role', '역할', 'Role') + '</span>' +
            '<p class="part-role">' + part.role + '</p>' +
          '</div>' +
          '<div class="part-copy">' +
            '<span class="part-copy-label">' + t('learning.parts.check', '찾는 힌트', 'Find hint') + '</span>' +
            '<p class="part-check">' + part.check + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="part-btns">' +
          '<button type="button" class="part-btn found-btn' + (found ? ' active' : '') + '" data-idx="' + i + '" data-state="found" aria-pressed="' + (found ? 'true' : 'false') + '" aria-label="' + part.name + ' ' + t('learning.parts.found', '있어요', 'Have it') + '">' + t('learning.parts.found', '있어요', 'Have it') + '</button>' +
          '<button type="button" class="part-btn missing-btn' + (missing ? ' active' : '') + '" data-idx="' + i + '" data-state="missing" aria-pressed="' + (missing ? 'true' : 'false') + '" aria-label="' + part.name + ' ' + t('learning.parts.missing', '없어요', 'Missing') + '">' + t('learning.parts.missing', '없어요', 'Missing') + '</button>' +
        '</div>' +
        (missing ? '<div class="part-missing-msg">' + supportContactHtml('부품이 없거나 부서졌다면 보호자와 함께 DORO에 문의해 주세요.', 'If a part is missing or broken, contact DORO with a parent or guardian.', 'support-contact--compact') + '</div>' : '');
      grid.appendChild(card);
    });

    sec.onclick = function (event) {
      var btn = event.target.closest('.part-btn');
      if (btn) {
        var idx = btn.getAttribute('data-idx');
        var state = btn.getAttribute('data-state');
        saveProgress(kitId, { parts: toggleMapValue(saved, idx, state) });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.parts-reset-btn')) {
        openLearningDialog(
          t('learning.parts.clear.question', '선택한 구성품 확인을 모두 지울까요?', 'Clear all component checks?'),
          t('learning.parts.clear.action', '해제하기', 'Clear'),
          t('learning.parts.clear.cancel', '취소', 'Cancel'),
          function () {
          saveProgress(kitId, { parts: {} });
          rerenderLearningPreserveScroll();
          showLearningToast(t('learning.parts.clear.done', '구성품 확인이 초기화되었습니다.', 'Component checks have been reset.'));
          }
        );
        return;
      }

      if (event.target.closest('.parts-next-btn')) {
        var nextSection = document.getElementById(SECTION_IDS.safetyPromise);
        if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    var summary = sec.querySelector('#parts-summary');
    if (summary) {
      summary.innerHTML =
        '<div class="parts-summary-copy">' +
          (foundCount === total
            ? withPixelIcon('check', t('learning.parts.complete', '모든 부품을 찾았어요! 안전 약속으로 이동해요!', 'You found every part! Move on to the Safety Promise.'), 'pixel-icon-inline')
            : t('learning.parts.status', '있어요 ' + foundCount + '개 · 없어요 ' + missingCount + '개', 'Have it: ' + foundCount + ' · Missing: ' + missingCount)) +
        '</div>';
    }
  }

  function renderStarterQuiz(kitId, kit, progress) {
    var sec = document.getElementById(SECTION_IDS.starterQuiz);
    if (!sec || !kit) return;
    sec.onclick = null;

    var quiz = kit.starterQuiz || [];
    var saved = normalizeQuizProgress(progress.starterQuiz && progress.starterQuiz.answers, quiz);
    var answeredCount = 0;
    var correctCount = 0;

    quiz.forEach(function (item, index) {
      var key = getQuizKey(item, index);
      if (typeof saved[key] === 'boolean') {
        answeredCount += 1;
        if (saved[key] === item.answer) correctCount += 1;
      }
    });
    var allAnswered = quiz.length === 0 || answeredCount === quiz.length;

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.starter.quiz.title', '시작 전 확인 퀴즈', 'Quick Start Check') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.starter.quiz.desc', '설명서와 조립 영상을 보고 시작할 준비가 되었는지 확인해요.', 'Check if you are ready after reviewing the guide and video.') + '</p>' +
      '<div class="quiz-toolbar">' +
        '<div class="quiz-progress-chip">' + t('learning.quiz.progress', '맞힌 문제', 'Correct answers') + ' <strong>' + correctCount + ' / ' + quiz.length + '</strong></div>' +
        '<div class="quiz-toolbar-actions">' +
          '<button type="button" class="quiz-action-btn quiz-action-secondary quiz-reset-btn" data-quiz-type="starter">' + withPixelIcon('reset', t('learning.quiz.reset', '다시 풀기', 'Retry'), 'pixel-icon-button') + '</button>' +
          '<button type="button" class="quiz-action-btn quiz-action-primary quiz-next-btn" data-quiz-type="starter">' + withPixelIcon('arrow-next', t('learning.starter.quiz.next', '안전 약속으로 이동', 'Go to Safety Promise'), 'pixel-icon-button') + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="quiz-card-grid">' +
        quiz.map(function (item, index) {
          var key = getQuizKey(item, index);
          var answer = saved[key];
          var answered = typeof answer === 'boolean';
          var correct = answered && answer === item.answer;
          var feedback = answered
            ? '<div class="quiz-feedback' + (correct ? ' is-correct' : ' is-wrong') + '">' +
                (correct
                  ? t('learning.quiz.correct', '맞아요!', 'Correct!')
                  : t('learning.quiz.wrong', '다시 자료를 보고 확인해요.', 'Check the guide and video again.')) +
                ' ' + item.note +
              '</div>'
            : '';
          return '' +
            '<article class="quiz-card' + (answered ? (correct ? ' is-correct' : ' is-wrong') : '') + '">' +
              '<div class="quiz-card-head">' +
                '<span class="quiz-step-chip">' + t('learning.quiz.question', '문항', 'Question') + ' ' + (index + 1) + '</span>' +
              '</div>' +
              '<p class="quiz-question">' + item.q + '</p>' +
              '<div class="quiz-answer-row">' +
                '<button type="button" class="quiz-answer-btn' + (answer === true ? ' active' : '') + '" data-quiz-type="starter" data-question-id="' + key + '" data-answer="true" aria-pressed="' + (answer === true ? 'true' : 'false') + '">' + t('learning.quiz.answer.o', 'O 맞아요', 'O True') + '</button>' +
                '<button type="button" class="quiz-answer-btn is-x' + (answer === false ? ' active' : '') + '" data-quiz-type="starter" data-question-id="' + key + '" data-answer="false" aria-pressed="' + (answer === false ? 'true' : 'false') + '">' + t('learning.quiz.answer.x', 'X 아니에요', 'X False') + '</button>' +
              '</div>' +
              feedback +
            '</article>';
        }).join('') +
      '</div>' +
      '<div class="quiz-summary">' +
        (answeredCount === quiz.length && correctCount === quiz.length
          ? t('learning.starter.quiz.ready', '설명서를 잘 확인했어요. 이제 안전 약속을 확인해요.', 'You reviewed the guide well. Next, complete the safety promise.')
          : t('learning.starter.quiz.tip', '헷갈리는 문장이 있으면 설명서와 영상을 다시 확인해요.', 'If a question feels unclear, reopen the guide and video.')) +
      '</div>';

    sec.onclick = function (event) {
      var answerBtn = event.target.closest('.quiz-answer-btn');
      if (answerBtn) {
        var key = answerBtn.getAttribute('data-question-id');
        var userAnswer = answerBtn.getAttribute('data-answer') === 'true';
        saveProgress(kitId, {
          starterQuiz: {
            answers: setQuizAnswer(saved, key, userAnswer)
          }
        });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.quiz-reset-btn[data-quiz-type="starter"]')) {
        saveProgress(kitId, { starterQuiz: { answers: {} } });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.quiz-next-btn[data-quiz-type="starter"]')) {
        scrollToSection(SECTION_IDS.safetyPromise);
      }
    };
  }

  function renderSafetyQuest(kitId, kit, progress) {
    var sec = document.getElementById(SECTION_IDS.safetyPromise);
    if (!sec || !kit) return;
    sec.onclick = null;

    var promises = getSafetyPromises(kitId);
    var saved = normalizeSafetyProgress(progress.safety, promises);
    var checkedCount = saved.checkedIds.length;
    var progressText = t('learning.safety.progress', '안전 약속 진행', 'Safety progress') + ' <strong>' + checkedCount + ' / ' + promises.length + '</strong>';

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.safety.title', '안전 약속', 'Safety Promise') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.safety.desc', '아래 약속을 모두 확인하면 만들기를 시작할 수 있어요.', 'Check every promise before you start building.') + '</p>' +
      '<div class="safety-card">' +
        '<div class="safety-card-head">' +
          '<div class="safety-progress-chip">' + progressText + '</div>' +
          (saved.completed
            ? '<span class="safety-complete-badge">' + withPixelIcon('check', t('learning.safety.complete', '안전 약속 완료', 'Safety Complete'), 'pixel-icon-inline') + '</span>'
            : '') +
        '</div>' +
        '<div class="safety-intro-copy">' + t('learning.safety.copy', '만들기 전에 안전 약속을 먼저 확인해요.', 'Check the safety promise before you start building.') + '</div>' +
        '<div class="safety-checklist">' +
          promises.map(function (item) {
            var checked = saved.checkedIds.indexOf(item.id) !== -1;
            return '' +
              '<label class="promise-item' + (checked ? ' is-checked' : '') + '">' +
                '<input type="checkbox" class="promise-checkbox" data-promise-id="' + item.id + '"' + (checked ? ' checked' : '') + '>' +
                '<span class="promise-copy">' +
                  '<span class="promise-text">' + item.text + '</span>' +
                  '<span class="promise-reason">' + item.reason + '</span>' +
                '</span>' +
              '</label>';
          }).join('') +
        '</div>' +
        (saved.completed
          ? '<div class="safety-complete-panel">' +
              '<strong>' + t('learning.safety.complete.title', '안전 약속이 완료되었어요.', 'Safety promise completed.') + '</strong>' +
              '<p>' + t('learning.safety.complete.copy', '이제 구성품 확인을 시작할 수 있어요.', 'You can now start checking components.') + '</p>' +
              '<div class="safety-complete-actions">' +
                '<button type="button" class="resource-link-btn safety-component-btn">' + withPixelIcon('arrow-next', t('learning.safety.component.cta', '구성품 확인으로 이동', 'Go to Component Check'), 'pixel-icon-button') + '</button>' +
                '<button type="button" class="resource-link-btn resource-link-btn-muted safety-reset-btn">' + withPixelIcon('reset', t('learning.safety.reset', '안전 약속 다시 확인', 'Reset Safety Promise'), 'pixel-icon-button') + '</button>' +
              '</div>' +
            '</div>'
          : '<div class="safety-action-row safety-action-row-muted">' +
              '<span class="safety-gate-note">' + t('learning.safety.waiting', '모든 약속을 확인하면 다음 단계가 자동으로 열려요.', 'The next steps unlock automatically after every promise is checked.') + '</span>' +
              (checkedCount > 0 ? '<button type="button" class="resource-link-btn resource-link-btn-muted safety-reset-btn">' + withPixelIcon('reset', t('learning.safety.reset', '안전 약속 다시 확인', 'Reset Safety Promise'), 'pixel-icon-button') + '</button>' : '') +
            '</div>') +
      '</div>' +
      '<div class="safety-support-note">' +
        supportContactHtml(
          '부품이 부러졌거나, 손이 아프거나, 위험해 보이면 혼자 계속하지 말고 보호자나 선생님에게 알려요.',
          'If a part breaks, your hand hurts, or something feels unsafe, stop and ask a parent or teacher for help.',
          'support-contact--compact'
        ) +
      '</div>';

    sec.onclick = function (event) {
      var checkbox = event.target.closest('.promise-checkbox');
      if (checkbox) {
        var nextCheckedIds = toggleSafetyChecked(saved.checkedIds, checkbox.getAttribute('data-promise-id'));
        var nextCompleted = nextCheckedIds.length === promises.length;
        saveProgress(kitId, {
          safety: {
            checkedIds: nextCheckedIds,
            completed: nextCompleted,
            completedAt: nextCompleted ? (saved.completedAt || new Date().toISOString()) : null
          },
          gates: mergeGateData(kitId, { safetyComplete: nextCompleted })
        });
        rerenderLearningPreserveScroll();
        if (nextCompleted && !saved.completed) {
          showLearningToast(t('learning.safety.complete.title', '안전 약속이 완료되었어요.', 'Safety promise completed.'));
        }
        return;
      }

      if (event.target.closest('.safety-reset-btn')) {
        saveProgress(kitId, {
          safety: {
            checkedIds: [],
            completed: false,
            completedAt: null
          },
          gates: mergeGateData(kitId, { safetyComplete: false })
        });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.safety-component-btn')) {
        scrollToSection(SECTION_IDS.componentCheck);
      }
    };
  }

  function renderReviewQuiz(kitId, kit, progress) {
    var sec = document.getElementById(SECTION_IDS.reviewQuiz);
    if (!sec || !kit) return;
    sec.onclick = null;

    var quiz = kit.reviewQuiz || [];
    var saved = normalizeQuizProgress(progress.reviewQuiz && progress.reviewQuiz.answers, quiz);
    var answeredCount = 0;
    var correctCount = 0;

    quiz.forEach(function (item, index) {
      var key = getQuizKey(item, index);
      if (typeof saved[key] === 'boolean') {
        answeredCount += 1;
        if (saved[key] === item.answer) correctCount += 1;
      }
    });
    var allAnswered = quiz.length === 0 || answeredCount === quiz.length;

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.review.title', '되돌아보기', 'Review Quiz') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.review.desc', '만들고 나서 원리를 다시 확인해요.', 'Review what you learned after building.') + '</p>' +
      '<div class="quiz-toolbar">' +
        '<div class="quiz-progress-chip">' + t('learning.quiz.progress', '맞힌 문제', 'Correct answers') + ' <strong>' + correctCount + ' / ' + quiz.length + '</strong></div>' +
        '<div class="quiz-toolbar-actions">' +
          '<button type="button" class="quiz-action-btn quiz-action-secondary quiz-reset-btn" data-quiz-type="review">' + withPixelIcon('reset', t('learning.quiz.reset', '다시 풀기', 'Retry'), 'pixel-icon-button') + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="quiz-card-grid review-quiz-grid">' +
        quiz.map(function (item, index) {
          var key = getQuizKey(item, index);
          var answer = saved[key];
          var answered = typeof answer === 'boolean';
          var correct = answered && answer === item.answer;
          var feedback = answered
            ? '<div class="quiz-feedback' + (correct ? ' is-correct' : ' is-wrong') + '">' +
                (correct
                  ? t('learning.review.correct', '잘 기억했어요!', 'Nice work!')
                  : t('learning.review.wrong', '다시 떠올려 보세요.', 'Try thinking about it again.')) +
                ' ' + item.note +
              '</div>'
            : '';
          return '' +
            '<article class="quiz-card review-quiz-card' + (answered ? (correct ? ' is-correct' : ' is-wrong') : '') + '">' +
              '<div class="quiz-card-head">' +
                '<span class="quiz-step-chip">' + t('learning.quiz.question', '문항', 'Question') + ' ' + (index + 1) + '</span>' +
              '</div>' +
              '<p class="quiz-question">' + item.q + '</p>' +
              '<div class="quiz-answer-row">' +
                '<button type="button" class="quiz-answer-btn' + (answer === true ? ' active' : '') + '" data-quiz-type="review" data-question-id="' + key + '" data-answer="true" aria-pressed="' + (answer === true ? 'true' : 'false') + '">' + t('learning.quiz.answer.o', 'O 맞아요', 'O True') + '</button>' +
                '<button type="button" class="quiz-answer-btn is-x' + (answer === false ? ' active' : '') + '" data-quiz-type="review" data-question-id="' + key + '" data-answer="false" aria-pressed="' + (answer === false ? 'true' : 'false') + '">' + t('learning.quiz.answer.x', 'X 아니에요', 'X False') + '</button>' +
              '</div>' +
              feedback +
            '</article>';
        }).join('') +
      '</div>' +
      '<div class="quiz-summary">' +
        (allAnswered && correctCount === quiz.length
          ? t('learning.review.complete', '잘 기억했어요. 이제 도전 미션도 해봐요.', 'Great review. Try the challenge missions too.')
          : t('learning.review.tip', '헷갈리는 문장이 있으면 과학 실험과 만들기 과정을 다시 떠올려 봐요.', 'If a question feels tricky, think back to the science lab and build steps.')) +
      '</div>' +
      (allAnswered
        ? renderGatePanel(
            t('learning.gate.review.complete.title', '되돌아보기 완료', 'Review Complete'),
            t('learning.gate.review.complete.copy', '이제 도전 미션을 해 볼 차례예요.', 'Now try the challenge missions.'),
            'review-challenge-btn',
            t('learning.gate.review.complete.cta', '도전 미션으로 이동', 'Go to Challenge')
          )
        : '<div class="quest-gate-note">' + t('learning.gate.review.waiting', '모든 문항에 답하면 도전 미션이 열려요.', 'Answer every review question to unlock the challenge missions.') + '</div>');

    sec.onclick = function (event) {
      var answerBtn = event.target.closest('.quiz-answer-btn');
      if (answerBtn) {
        var key = answerBtn.getAttribute('data-question-id');
        var userAnswer = answerBtn.getAttribute('data-answer') === 'true';
        saveProgress(kitId, {
          reviewQuiz: {
            answers: setQuizAnswer(saved, key, userAnswer)
          },
          gates: mergeGateData(kitId, {
            reviewComplete: isReviewComplete(kit, {
              reviewQuiz: {
                answers: setQuizAnswer(saved, key, userAnswer)
              }
            })
          })
        });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.quiz-reset-btn[data-quiz-type="review"]')) {
        saveProgress(kitId, {
          reviewQuiz: { answers: {} },
          gates: mergeGateData(kitId, { reviewComplete: false })
        });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.review-challenge-btn')) {
        scrollToSection(SECTION_IDS.challengeMissions);
      }
    };
  }

  function getAssemblyGuide(kitId) {
    return window.DORO_ASSEMBLY_GUIDES && window.DORO_ASSEMBLY_GUIDES[kitId]
      ? window.DORO_ASSEMBLY_GUIDES[kitId]
      : null;
  }

  function renderStarterResources(kitId) {
    var sec = document.getElementById(SECTION_IDS.starterResources);
    var guide = getAssemblyGuide(kitId) || {};
    var hasPdf = !!guide.guidePdf;
    var hasAssemblyVideo = !!guide.assemblyVideo;
    var hasDemoVideo = !!guide.demoVideo;
    var demoVideoSrc = hasDemoVideo ? escapeHtml(guide.demoVideo) : '';
    var demoAria = escapeHtml(t('learning.starter.demo.aria', '작동 데모 영상', 'Demo video'));
    var starterDemoHtml = hasDemoVideo
      ? '<article class="starter-demo-card">' +
          '<div class="starter-demo-copy">' +
            '<span class="starter-demo-kicker">' + t('learning.starter.demo.kicker', '완성 미리보기', 'Preview the Finished Kit') + '</span>' +
            '<h3>' + t('learning.starter.demo.title', '작동 데모 영상', 'Demo Video') + '</h3>' +
            '<p>' + t('learning.starter.demo.desc', '잘 따라 만들면 어떤 모습으로 작동하는지 먼저 확인해요.', 'See what your kit will look like when it works.') + '</p>' +
            '<p class="starter-demo-note">' + t('learning.starter.demo.note', '완성 후 움직임이나 소리가 어떻게 나오는지 짧게 볼 수 있어요.', 'Watch how it moves or sounds after completion.') + '</p>' +
          '</div>' +
          '<div class="starter-demo-video-wrap">' +
            '<video class="starter-demo-video" src="' + demoVideoSrc + '" controls preload="metadata" playsinline aria-label="' + demoAria + '"></video>' +
          '</div>' +
        '</article>'
      : '';

    if (!sec) return;

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.starter.title', '교육자료 다운로드&확인', 'Starter Resources') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.starter.desc', '부품 이름과 조립 순서를 먼저 확인해요. 설명서를 보고 시작하면 구성품을 더 쉽게 찾을 수 있어요.', 'Check the part names and build order first. Starting with the guide makes the components easier to find.') + '</p>' +
      starterDemoHtml +
      '<div class="resource-card-grid">' +
        '<article class="resource-card">' +
          '<div class="resource-card-icon">' + pixelIcon('pdf', 'pixel-icon-resource') + '</div>' +
          '<div class="resource-card-body">' +
            '<h3 class="resource-card-title">' + t('learning.starter.pdf.title', '조립 설명서 보기', 'Open the Assembly Guide') + '</h3>' +
            '<p class="resource-card-desc">' + t('learning.starter.pdf.desc', '부품 이름과 조립 순서를 먼저 확인해요.', 'Review the part names and build order before you begin.') + '</p>' +
          '</div>' +
          '<div class="resource-card-actions">' +
            (hasPdf
              ? '<a href="' + guide.guidePdf + '" target="_blank" rel="noopener" class="resource-link-btn">' + withPixelIcon('pdf', t('learning.starter.pdf.cta', 'PDF 보기', 'Open PDF'), 'pixel-icon-button') + '</a>'
              : '<span class="resource-link-btn resource-link-btn-disabled" aria-disabled="true">' + withPixelIcon('pdf', t('learning.starter.video.cta.pending', '준비 중', 'Coming Soon'), 'pixel-icon-button') + '</span>') +
          '</div>' +
        '</article>' +
        '<article class="resource-card">' +
          '<div class="resource-card-icon">' + pixelIcon('video', 'pixel-icon-resource') + '</div>' +
          '<div class="resource-card-body">' +
            '<h3 class="resource-card-title">' + t('learning.starter.video.title', '조립 영상 보기', 'Watch the Assembly Video') + '</h3>' +
            '<p class="resource-card-desc">' + t('learning.starter.video.desc', '만들기 전 전체 흐름을 영상으로 확인해요.', 'Check the full build flow in video before you start.') + '</p>' +
            (!hasAssemblyVideo ? '<p class="resource-card-note">' + t('learning.starter.video.pending', '영상은 다음 Phase에서 압축 후 반영될 예정이에요.', 'The assembly video will be added in a later phase after compression.') + '</p>' : '') +
          '</div>' +
          '<div class="resource-card-actions">' +
            (hasAssemblyVideo
              ? '<a href="' + guide.assemblyVideo + '" target="_blank" rel="noopener" class="resource-link-btn">' + withPixelIcon('video', t('learning.resources.video.cta', '영상 보기', 'Open Video'), 'pixel-icon-button') + '</a>'
              : '<span class="resource-link-btn resource-link-btn-disabled" aria-disabled="true">' + withPixelIcon('video', t('learning.starter.video.cta.pending', '준비 중', 'Coming Soon'), 'pixel-icon-button') + '</span>') +
          '</div>' +
        '</article>' +
      '</div>' +
      '<div class="starter-resources-footer">' +
        '<button type="button" class="resource-link-btn resource-link-btn-muted starter-next-btn">' + withPixelIcon('arrow-next', t('learning.starter.next', '시작 전 확인 퀴즈로 이동', 'Go to the Quick Start Check'), 'pixel-icon-button') + '</button>' +
      '</div>';

    sec.onclick = function (event) {
      if (!event.target.closest('.starter-next-btn')) return;
      var nextSection = document.getElementById(SECTION_IDS.starterQuiz);
      if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    };
  }

  function getAssemblySteps(kitId, kit) {
    var guide = getAssemblyGuide(kitId);
    if (guide && guide.steps && guide.steps.length) return guide.steps;
    return (kit.assemblySteps || []).map(function (step, idx) {
      return {
        step: idx + 1,
        title: step.title,
        mission: step.detail,
        check: step.tip || '',
        caution: ''
      };
    });
  }

  function parseVideoTime(value) {
    if (!value || typeof value !== 'string') return null;
    var parts = value.split(':').map(function (chunk) { return Number(chunk); });
    if (parts.some(function (n) { return Number.isNaN(n); })) return null;
    if (parts.length === 2) return (parts[0] * 60) + parts[1];
    if (parts.length === 3) return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
    return null;
  }

  function renderBuildStep(step, idx, total, guide) {
    var progressPct = Math.max(8, Math.round(((idx + 1) / total) * 100));
    var stepNum = step.step || (idx + 1);
    var hasVideo = !!(guide && guide.assemblyVideo);
    var videoHint = step.videoTime || step.videoHint || '';
    var hasVideoHint = hasVideo && !!videoHint;
    var mission = step.mission || step.detail || '';
    var check = step.check || step.tip || '';
    var caution = step.caution || '';
    return '' +
      '<div class="build-step-card">' +
        '<div class="build-step-head">' +
          '<div class="build-step-num">' + t('learning.build.step', '단계', 'Step') + ' ' + stepNum + ' / ' + total + '</div>' +
          '<button type="button" class="build-reset-btn">' + t('learning.build.reset', '처음부터', 'Restart') + '</button>' +
        '</div>' +
        '<div class="build-step-title">' + step.title + '</div>' +
        (step.image
          ? '<div class="build-step-media"><figure class="build-step-image"><img src="' + step.image + '" alt="' + (step.alt || step.title) + '" loading="lazy"></figure></div>'
          : '') +
        '<div class="build-step-block">' +
          '<div class="build-step-label">' + t('learning.build.today', '오늘의 미션', 'Today\'s Mission') + '</div>' +
          '<div class="build-step-mission">' + mission + '</div>' +
        '</div>' +
        (check
          ? '<div class="build-step-check"><strong>' + t('learning.build.check', '이렇게 되었나요?', 'Check This') + '</strong><p>' + check + '</p></div>'
          : '') +
        (caution
          ? '<div class="build-step-caution"><strong>' + t('learning.build.caution', '주의', 'Caution') + '</strong><p>' + caution + '</p></div>'
          : '') +
        (hasVideoHint
          ? '<div class="build-video-panel">' +
              '<div class="build-video-title">' + t('learning.build.video.title', '조립 영상 힌트', 'Assembly Video Hint') + '</div>' +
              '<p>' + t('learning.build.video.desc', '막히면 아래 조립 영상에서 같은 장면을 다시 확인할 수 있어요.', 'If you get stuck, review the matching scene in the assembly video below.') + '</p>' +
              (step.videoTime ? '<div class="build-video-time">' + t('learning.build.video.from', '추천 구간', 'Suggested time') + ': ' + step.videoTime + '</div>' : '') +
            '</div>'
          : '') +
        '<div class="build-step-progress-bar"><div class="build-step-progress-fill" style="width:' + progressPct + '%"></div></div>' +
      '</div>' +
      '<div class="build-step-btns">' +
        (idx > 0 ? '<button type="button" class="build-btn build-redo-btn">' + withPixelIcon('arrow-back', t('learning.build.redo', '이전 단계', 'Previous Step'), 'pixel-icon-button') + '</button>' : '') +
        '<button type="button" class="build-btn build-done-btn">' + withPixelIcon('check', t('learning.build.done', '완료하고 다음 단계로', 'Finish and go on'), 'pixel-icon-button') + '</button>' +
        (hasVideoHint ? '<button type="button" class="build-btn build-video-btn">' + withPixelIcon('video', t('learning.build.video.cta', '조립 영상 보기', 'Watch Assembly Video'), 'pixel-icon-button') + '</button>' : '') +
        '<button type="button" class="build-btn build-help-btn">' + withPixelIcon('help', t('learning.build.help', '도와줘요', 'Help me'), 'pixel-icon-button') + '</button>' +
      '</div>';
  }

  function renderBuildComplete(kit, guide) {
    return '' +
      '<div class="build-complete">' +
        withPixelIcon('check', t('learning.build.complete', '모든 단계를 완료했어요!', 'You finished every step!'), 'pixel-icon-inline') +
        '<br><small>' + kit.name + ' ' + t('learning.build.next', '완성! 이제 과학 실험과 도전 미션으로 넘어가요.', 'is complete! Move on to the science lab and challenge missions.') + '</small>' +
      '</div>' +
      '<div class="build-step-btns">' +
        '<button type="button" class="build-btn build-lab-btn">' + withPixelIcon('science', t('learning.lab.title', '과학 실험', 'Science Lab'), 'pixel-icon-button') + '</button>' +
        '<button type="button" class="build-btn build-mission-btn">' + withPixelIcon('mission', t('learning.mission.title', '도전 미션', 'Challenge Missions'), 'pixel-icon-button') + '</button>' +
        (guide && (guide.guidePdf || guide.assemblyVideo || guide.demoVideo)
          ? '<button type="button" class="build-btn build-resource-btn">' + withPixelIcon('video', t('prog.toc.resources', '자료·영상', 'Resources & Videos'), 'pixel-icon-button') + '</button>'
          : '') +
        '<button type="button" class="build-btn build-reset-btn">' + withPixelIcon('reset', t('learning.build.reset', '처음부터', 'Restart'), 'pixel-icon-button') + '</button>' +
      '</div>';
  }

  function renderBuildStepper(kitId, kit, progress) {
    var sec = document.getElementById(SECTION_IDS.buildGuide);
    if (!sec || !kit) return;
    sec.onclick = null;

    var saved = progress.build || {};
    var currentStep = saved.step || 0;
    var guide = getAssemblyGuide(kitId);
    var steps = getAssemblySteps(kitId, kit);
    var isComplete = currentStep >= steps.length;

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.build.title', '한 단계씩 만들기', 'Step-by-Step Build') + '</h2>' +
      (steps.length
        ? (isComplete ? renderBuildComplete(kit, guide) : renderBuildStep(steps[currentStep], currentStep, steps.length, guide))
        : '<div class="build-complete">' + withPixelIcon('parts', t('learning.build.empty', '조립 가이드를 준비하고 있어요.', 'The assembly guide is being prepared.'), 'pixel-icon-inline') + '</div>');

    sec.onclick = function (event) {
      if (event.target.closest('.build-done-btn')) {
        saveProgress(kitId, { build: { step: currentStep + 1 } });
        rerenderLearningAndScroll(SECTION_IDS.buildGuide);
        return;
      }

      if (event.target.closest('.build-redo-btn')) {
        saveProgress(kitId, { build: { step: Math.max(0, currentStep - 1) } });
        rerenderLearningAndScroll(SECTION_IDS.buildGuide);
        return;
      }

      if (event.target.closest('.build-help-btn')) {
        var trouble = document.getElementById(SECTION_IDS.troubleshooting);
        if (trouble) trouble.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (event.target.closest('.build-video-btn')) {
        var assemblyPanel = document.getElementById('assembly-video-player');
        if (assemblyPanel) {
          assemblyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          var assemblyVideo = assemblyPanel.querySelector('video');
          var step = steps[currentStep] || {};
          var targetTime = parseVideoTime(step.videoTime);
          if (assemblyVideo && targetTime !== null) {
            var seekToTime = function () {
              assemblyVideo.currentTime = targetTime;
            };
            if (assemblyVideo.readyState >= 1) {
              seekToTime();
            } else {
              assemblyVideo.addEventListener('loadedmetadata', seekToTime, { once: true });
            }
          }
        }
        return;
      }

      if (event.target.closest('.build-lab-btn')) {
        var lab = document.getElementById(SECTION_IDS.scienceLab);
        if (lab) lab.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (event.target.closest('.build-mission-btn')) {
        var mission = document.getElementById(SECTION_IDS.challengeMissions);
        if (mission) mission.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (event.target.closest('.build-resource-btn')) {
        var resources = document.getElementById(SECTION_IDS.resourcesVideos);
        if (resources) resources.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (event.target.closest('.build-reset-btn')) {
        openLearningDialog(
          t('learning.build.reset.confirm', '만들기 진행을 처음부터 다시 시작할까요?', 'Restart the build progress from the beginning?'),
          t('learning.build.reset', '처음부터', 'Restart'),
          t('learning.parts.clear.cancel', '취소', 'Cancel'),
          function () {
          saveProgress(kitId, { build: { step: 0 } });
          rerenderLearningAndScroll(SECTION_IDS.buildGuide);
          }
        );
      }
    };
  }

  function renderResourcesMedia(kitId, kit) {
    var sec = document.getElementById(SECTION_IDS.resourcesVideos);
    if (!sec || !kit) return;

    var guide = getAssemblyGuide(kitId);
    if (!guide) {
      sec.innerHTML =
        '<div class="student-group-header">' +
          '<h2 class="student-group-title">' + withPixelIcon('video', t('prog.resources.title', '자료·영상', 'Resources & Videos'), 'pixel-icon-heading') + '</h2>' +
          '<p class="student-group-desc">' + t('prog.resources.empty', '이 키트의 자료는 준비 중입니다.', 'Resources for this kit are being prepared.') + '</p>' +
        '</div>';
      return;
    }

    var cards = [];
    if (guide.guidePdf) {
      cards.push(
        '<article class="resource-card">' +
          '<div class="resource-card-icon">' + pixelIcon('pdf', 'pixel-icon-resource') + '</div>' +
          '<div class="resource-card-body">' +
            '<h3 class="resource-card-title">' + t('learning.resources.review.pdf.title', '조립 설명서 다시 보기', 'Reopen the Assembly Guide') + '</h3>' +
            '<p class="resource-card-desc">' + t('learning.resources.review.pdf.desc', '놓친 순서가 있으면 설명서를 다시 열어 확인해요.', 'Open the guide again if you want to review the steps you missed.') + '</p>' +
          '</div>' +
          '<div class="resource-card-actions">' +
            '<a href="' + guide.guidePdf + '" target="_blank" rel="noopener" class="resource-link-btn">' + withPixelIcon('pdf', t('learning.resources.review.pdf.cta', 'PDF 다시 보기', 'Reopen PDF'), 'pixel-icon-button') + '</a>' +
          '</div>' +
        '</article>'
      );
    }
    if (guide.assemblyVideo) {
      cards.push(
        '<article class="resource-card">' +
          '<div class="resource-card-icon">' + pixelIcon('video', 'pixel-icon-resource') + '</div>' +
          '<div class="resource-card-body">' +
            '<h3 class="resource-card-title">' + t('learning.resources.assembly.title', '조립 영상', 'Assembly Video') + '</h3>' +
            '<p class="resource-card-desc">' + t('learning.resources.assembly.desc', '순서가 헷갈릴 때 같은 장면을 영상으로 다시 확인해요.', 'Review the build in motion when a step feels unclear.') + '</p>' +
          '</div>' +
          '<div class="resource-card-actions">' +
            '<a href="#assembly-video-player" class="resource-link-btn">' + withPixelIcon('video', t('learning.resources.video.cta', '영상 보기', 'Open Video'), 'pixel-icon-button') + '</a>' +
          '</div>' +
        '</article>'
      );
    } else {
      cards.push(
        '<article class="resource-card">' +
          '<div class="resource-card-icon">' + pixelIcon('video', 'pixel-icon-resource') + '</div>' +
          '<div class="resource-card-body">' +
            '<h3 class="resource-card-title">' + t('learning.resources.video.pending.title', '조립 영상 준비 중', 'Assembly Video Coming Soon') + '</h3>' +
            '<p class="resource-card-desc">' + t('learning.resources.video.pending.desc', '학생용 공개 조립 영상은 다음 Phase에서 압축 후 반영할 예정이에요.', 'The student-facing assembly video will be added in a later phase after compression.') + '</p>' +
          '</div>' +
          '<div class="resource-card-actions">' +
            '<span class="resource-link-btn resource-link-btn-disabled" aria-disabled="true">' + withPixelIcon('video', t('learning.starter.video.cta.pending', '준비 중', 'Coming Soon'), 'pixel-icon-button') + '</span>' +
          '</div>' +
        '</article>'
      );
    }

    sec.innerHTML =
      '<div class="student-group-header">' +
        '<h2 class="student-group-title">' + withPixelIcon('video', t('learning.resources.review.title', '자료·영상 다시 보기', 'Review Resources'), 'pixel-icon-heading') + '</h2>' +
        '<p class="student-group-desc">' + t('learning.resources.review.desc', '조립 중 다시 보거나 끝난 뒤 복습할 자료를 모아 두었어요.', 'Reopen these materials during the build or review them after you finish.') + '</p>' +
      '</div>' +
      '<div class="resource-card-grid">' + cards.join('') + '</div>' +
      (guide.assemblyVideo
        ? '<article class="resource-video-panel" id="assembly-video-player">' +
            '<div class="resource-video-head">' +
              '<div><h3>' + t('learning.resources.assembly.title', '조립 영상', 'Assembly Video') + '</h3><p>' + t('learning.resources.assembly.desc', '순서가 헷갈릴 때 같은 장면을 영상으로 다시 확인해요.', 'Review the build in motion when a step feels unclear.') + '</p></div>' +
            '</div>' +
            '<video controls preload="metadata">' +
              '<source src="' + guide.assemblyVideo + '" type="video/mp4">' +
              'Your browser does not support the video tag.' +
            '</video>' +
          '</article>'
        : '');
  }

  function renderTroubleshooter(kitId, kit, progress) {
    var sec = document.getElementById('troubleshooting');
    if (!sec || !kit) return;
    sec.onclick = null;

    var openIdx = progress.trouble && typeof progress.trouble.openIdx === 'number' ? progress.trouble.openIdx : null;
    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.trouble.title', '왜 안 되지?', 'Why Won\'t It Work?') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.trouble.desc', '문제가 생겼나요? 증상을 누르면 해결 순서를 볼 수 있어요.', 'Something not working? Tap a symptom to see the fix steps.') + '</p>' +
      '<div class="trouble-list" id="trouble-list"></div>';

    var list = sec.querySelector('#trouble-list');
    list.onclick = null;
    kit.troubleshooting.forEach(function (item, i) {
      var isOpen = openIdx === i;
      var block = document.createElement('div');
      block.className = 'trouble-item' + (isOpen ? ' open' : '');
      block.innerHTML =
        '<button type="button" class="trouble-symptom-btn" data-idx="' + i + '" aria-expanded="' + (isOpen ? 'true' : 'false') + '">' + item.symptom + '</button>' +
        (isOpen
          ? '<div class="trouble-steps-card"><ol class="trouble-steps-list">' + item.steps.map(function (step) { return '<li>' + step + '</li>'; }).join('') + '</ol></div>'
          : '');
      list.appendChild(block);
    });

    var note = document.createElement('div');
    note.className = 'trouble-parent-note';
    note.innerHTML = supportContactHtml(
      '그래도 해결이 안 되면 보호자나 선생님과 함께 DORO에 문의해 주세요.',
      'If it still does not work, contact DORO with a parent, guardian, or teacher.',
      'support-contact--compact'
    );
    list.appendChild(note);

    list.onclick = function (event) {
      var btn = event.target.closest('.trouble-symptom-btn');
      if (!btn) return;
      var idx = Number(btn.getAttribute('data-idx'));
      var nextIdx = openIdx === idx ? null : idx;
      saveProgress(kitId, { trouble: { openIdx: nextIdx } });
      rerenderLearningPreserveScroll();
    };
  }

  function getAllMissions(kit) {
    return (kit.missions.required || []).map(function (text) {
      return { text: text, type: 'required' };
    }).concat((kit.missions.inquiry || []).map(function (text) {
      return { text: text, type: 'inquiry' };
    })).concat((kit.missions.creative || []).map(function (text) {
      return { text: text, type: 'creative' };
    }));
  }

  function renderScienceLab(kitId, kit, progress) {
    var sec = document.getElementById(SECTION_IDS.scienceLab);
    if (!sec || !kit) return;
    sec.onclick = null;

    var science = window.DORO_SCIENCE_RESOURCES && window.DORO_SCIENCE_RESOURCES[kitId];
    if (!science && kit.scienceLab) {
      science = {
        question: kit.scienceLab.question,
        summary: kit.scienceLab.explanation,
        hook: '',
        concepts: {
          ko: String(kit.scienceLab.concept || '').split(/[·,]/).map(function (item) { return item.trim(); }).filter(Boolean),
          en: String(kit.scienceLab.concept || '').split(/[·,]/).map(function (item) { return item.trim(); }).filter(Boolean)
        },
        tryIt: kit.scienceLab.experiment,
        kitConnection: '',
        learnMore: kit.scienceLab.explanation,
        videos: [],
        safetyNote: t(
          'learning.lab.parentNote',
          '외부 영상은 보호자와 함께 열어 주세요.',
          'Open external videos with a parent or teacher.'
        )
      };
    }
    if (!science) return;

    var concepts = science.concepts && science.concepts[getLang()] ? science.concepts[getLang()] : [];
    var videos = Array.isArray(science.videos) ? science.videos.slice(0, 2) : [];
    var question = escapeHtml(localizedCopy(science.question));
    var hook = escapeHtml(localizedCopy(science.hook));
    var summary = escapeHtml(localizedCopy(science.summary));
    var tryIt = escapeHtml(localizedCopy(science.tryIt));
    var kitConnection = escapeHtml(localizedCopy(science.kitConnection));
    var learnMore = escapeHtml(localizedCopy(science.learnMore));
    var safetyNote = escapeHtml(localizedCopy(science.safetyNote || t(
      'learning.lab.parentNote',
      '외부 영상은 보호자와 함께 열어 주세요.',
      'Open external videos with a parent or teacher.'
    )));
    var completed = isScienceComplete(progress);

    var conceptHtml = concepts.map(function (concept) {
      return '<span class="science-concept-chip">' + escapeHtml(concept) + '</span>';
    }).join('');

    var videoHtml = videos.map(function (video) {
      var title = escapeHtml(localizedCopy(video.title));
      var note = escapeHtml(localizedCopy(video.note));
      var href = escapeHtml(video.url || '#');
      var thumb = escapeHtml(video.thumbnail || '');
      var badge = escapeHtml(localizedCopy(video.badge || t('learning.lab.badge.recommended', '추천 영상', 'Recommended')));
      var channel = escapeHtml(video.channel || video.source || 'YouTube');
      var duration = escapeHtml(video.duration || '');
      var langLabel = video.language === 'en' ? 'EN' : 'KO';
      var thumbAlt = escapeHtml(t('learning.lab.thumbAlt', '영상 썸네일', 'Video thumbnail') + ': ' + title);
      return '' +
        '<a class="science-video-card" href="' + href + '" target="_blank" rel="noopener noreferrer" aria-label="' + title + '">' +
          '<div class="science-video-thumb">' +
            '<img src="' + thumb + '" alt="' + thumbAlt + '" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display=\'none\';this.parentNode.classList.add(\'is-fallback\');">' +
            '<span class="science-video-fallback-text">YouTube</span>' +
            '<span class="science-video-play" aria-hidden="true">' + pixelIcon('video', 'pixel-icon-play') + '</span>' +
            (duration ? '<span class="science-video-duration">' + duration + '</span>' : '') +
          '</div>' +
          '<div class="science-video-body">' +
            '<div class="science-video-meta">' +
              '<span class="science-video-badge">' + badge + '</span>' +
              '<span class="science-video-channel">' + channel + '</span>' +
              '<span class="science-video-lang">' + langLabel + '</span>' +
            '</div>' +
            '<h4 class="science-video-title">' + title + '</h4>' +
            '<p class="science-video-note">' + note + '</p>' +
            '<span class="science-video-cta">' + t('learning.lab.watch', '영상 열기', 'Open Video') + '</span>' +
          '</div>' +
        '</a>';
    }).join('');
    var videoSectionHtml = videoHtml
      ? '<div class="science-lab-block">' +
          '<span class="science-lab-label">' + t('learning.lab.videoLabel', '먼저 영상으로 보기', 'Watch First') + '</span>' +
          '<div class="science-video-grid">' + videoHtml + '</div>' +
          '<p class="science-video-ad-note">' + t('learning.lab.adNote', '유튜브에는 광고와 댓글이 있을 수 있어요.', 'YouTube may include ads and comments.') + '</p>' +
        '</div>'
      : '<div class="science-video-empty">' + t('learning.lab.videoEmpty', '바로 볼 외부 영상은 아직 준비 중이에요. 대신 아래 직접 해보기부터 먼저 해봐요.', 'External videos are not ready yet. Try the quick activity below first.') + '</div>';

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.lab.title', '과학 실험', 'Science Lab') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.lab.subtitle', '긴 설명보다, 영상부터 눌러 보고 손으로 직접 확인해요.', 'Tap a video first, then test it with your own hands.') + '</p>' +
      '<article class="science-lab-card">' +
        '<div class="science-lab-block">' +
          '<span class="science-lab-label">' + t('learning.lab.questionLabel', '궁금증', 'Big Question') + '</span>' +
          '<h3 class="science-lab-question">' + question + '</h3>' +
          (hook ? '<p class="science-lab-hook">' + hook + '</p>' : '') +
        '</div>' +
        videoSectionHtml +
        '<div class="science-lab-block">' +
          '<span class="science-lab-label">' + t('learning.lab.summaryLabel', '30초 핵심 설명', '30-Second Summary') + '</span>' +
          '<p class="science-lab-summary">' + summary + '</p>' +
          (conceptHtml ? '<div class="science-concept-chips">' + conceptHtml + '</div>' : '') +
        '</div>' +
        '<div class="science-mini-grid">' +
          '<div class="science-mini-card">' +
            '<span class="science-lab-label">' + t('learning.lab.tryLabel', '직접 해보기', 'Try It') + '</span>' +
            '<p class="science-mini-copy">' + tryIt + '</p>' +
          '</div>' +
          '<div class="science-mini-card">' +
            '<span class="science-lab-label">' + t('learning.lab.connectLabel', '키트와 연결', 'Connect to the Kit') + '</span>' +
            '<p class="science-mini-copy">' + kitConnection + '</p>' +
          '</div>' +
        '</div>' +
        (learnMore ? '' +
          '<details class="science-more-details">' +
            '<summary>' + t('learning.lab.learnMore', '더 알고 싶어요', 'Learn More') + '</summary>' +
            '<p class="science-more-copy">' + learnMore + '</p>' +
          '</details>' : '') +
        '<p class="science-parent-note">' + safetyNote + '</p>' +
      '</article>' +
      (completed
        ? renderGatePanel(
            t('learning.gate.science.complete.title', '과학 실험 확인 완료', 'Science Lab Complete'),
            t('learning.gate.science.complete.copy', '이제 되돌아보기로 배운 내용을 정리해요.', 'Now review what you learned.'),
            'science-review-btn',
            t('learning.gate.science.complete.cta', '되돌아보기로 이동', 'Go to Review')
          )
        : renderGatePanel(
            t('learning.gate.science.check.title', '과학 실험을 확인했나요?', 'Did you check the science lab?'),
            t('learning.gate.science.check.copy', '영상과 직접 해보기를 확인했다면 다음 단계가 열려요.', 'Check the video and quick activity to unlock the next step.'),
            'science-complete-btn',
            t('learning.gate.science.check.cta', '영상과 직접 해보기를 확인했어요', 'I checked the video and activity')
          ));

    sec.onclick = function (event) {
      if (event.target.closest('.science-complete-btn')) {
        saveProgress(kitId, {
          gates: mergeGateData(kitId, { scienceComplete: true })
        });
        rerenderLearningPreserveScroll();
        showLearningToast(t('learning.gate.science.complete.title', '과학 실험 확인 완료', 'Science Lab Complete'));
        return;
      }
      if (event.target.closest('.science-review-btn')) {
        scrollToSection(SECTION_IDS.reviewQuiz);
      }
    };
  }

  function renderMissionCards(kitId, kit, progress) {
    var sec = document.getElementById(SECTION_IDS.challengeMissions);
    if (!sec || !kit) return;
    sec.onclick = null;

    var saved = cloneMap(progress.missions);
    var allMissions = getAllMissions(kit);
    var doneCount = allMissions.filter(function (_, index) { return saved[index] === true; }).length;
    var allDone = allMissions.length === 0 || allMissions.every(function (_, index) { return saved[index] === true; });
    var typeLabels = {
      required: t('learning.mission.required', '필수', 'Required'),
      inquiry: t('learning.mission.inquiry', '탐구', 'Inquiry'),
      creative: t('learning.mission.creative', '창작', 'Creative')
    };

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.mission.title', '도전 미션', 'Challenge Missions') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.mission.desc', '도전하고 완료한 미션은 다시 눌러 해제할 수도 있어요.', 'Complete a mission, and tap again if you want to undo it.') + '</p>' +
      '<div class="mission-summary-bar">' +
        '<div class="mission-progress-chip">' + withPixelIcon('mission', t('learning.mission.progress', '완료한 미션', 'Completed'), 'pixel-icon-inline') + ' <strong>' + doneCount + ' / ' + allMissions.length + '</strong></div>' +
        '<button type="button" class="mission-reset-btn">' + t('learning.mission.clear', '미션 초기화', 'Reset missions') + '</button>' +
      '</div>' +
      '<div class="mission-cards-grid" id="mission-cards-grid"></div>' +
      (allDone
        ? renderGatePanel(
            t('learning.gate.challenge.complete.title', '도전 미션 완료', 'Challenge Complete'),
            t('learning.gate.challenge.complete.copy', '이제 내가 만든 키트를 기록해 볼 차례예요.', 'Now record the kit you built.'),
            'challenge-record-btn',
            t('learning.gate.challenge.complete.cta', '기록으로 이동', 'Go to Record')
          )
        : '<div class="quest-gate-note">' + t('learning.gate.challenge.waiting', '도전 미션을 모두 완료하면 기록 단계가 열려요.', 'Complete every challenge to unlock the record step.') + '</div>');

    var grid = sec.querySelector('#mission-cards-grid');
    allMissions.forEach(function (mission, i) {
      var done = saved[i] === true;
      var card = document.createElement('article');
      card.className = 'mission-card' + (done ? ' done' : '');
      card.innerHTML =
        '<span class="mission-type-badge mission-' + mission.type + '">' + typeLabels[mission.type] + '</span>' +
        '<div class="mission-text">' + mission.text + '</div>' +
        '<button type="button" class="mission-check-btn" data-idx="' + i + '" aria-pressed="' + (done ? 'true' : 'false') + '" aria-label="' + mission.text + ' ' + (done ? t('learning.mission.done', '완료됨', 'Done') : t('learning.mission.check', '완료 표시', 'Mark done')) + '">' +
          withPixelIcon('check', done ? t('learning.mission.done', '완료됨', 'Done') : t('learning.mission.check', '완료 표시', 'Mark done'), 'pixel-icon-button') +
        '</button>';
      grid.appendChild(card);
    });

    sec.onclick = function (event) {
      var btn = event.target.closest('.mission-check-btn');
      if (btn) {
        var idx = btn.getAttribute('data-idx');
        var next = cloneMap(saved);
        if (next[idx] === true) {
          delete next[idx];
        } else {
          next[idx] = true;
        }
        saveProgress(kitId, {
          missions: next,
          gates: mergeGateData(kitId, {
            challengeComplete: allMissions.every(function (_, index) { return next[index] === true; })
          })
        });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.challenge-record-btn')) {
        scrollToSection(SECTION_IDS.recordCertificate);
        return;
      }

      if (event.target.closest('.mission-reset-btn')) {
        openLearningDialog(
          t('learning.mission.clear.confirm', '도전 미션 표시를 모두 지울까요?', 'Clear all mission checks?'),
          t('learning.mission.clear', '미션 초기화', 'Reset missions'),
          t('learning.parts.clear.cancel', '취소', 'Cancel'),
          function () {
          saveProgress(kitId, {
            missions: {},
            gates: mergeGateData(kitId, { challengeComplete: false })
          });
          rerenderLearningPreserveScroll();
          }
        );
      }
    };
  }

  function renderNotebook(kitId, kit, progress) {
    var sec = document.getElementById('lab-notebook');
    if (!sec || !kit) return;
    sec.onclick = null;

    var saved = progress.notebook || {};
    var recordComplete = isRecordComplete(progress);
    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.notebook.title', '기록하기', 'Notes') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.notebook.desc', '오늘 만든 것과 배운 내용을 기록해 두어요!', 'Write down what you built and what you learned today!') + '</p>' +
      '<div class="notebook-form">' +
        '<label>' + t('learning.notebook.nickname', '닉네임', 'Nickname') + ' <span class="optional">(' + t('learning.notebook.optional', '선택', 'Optional') + ')</span></label>' +
        '<input type="text" id="nb-nickname" class="nb-input" maxlength="20" placeholder="' + t('learning.nickname.prompt', '닉네임을 입력하세요 (선택)', 'Enter a nickname (optional)') + '" value="' + (saved.nickname || '') + '">' +
        '<label>' + t('learning.notebook.hard', '가장 어려웠던 단계는?', 'Which step was the hardest?') + '</label>' +
        '<input type="text" id="nb-hard" class="nb-input" maxlength="100" placeholder="' + t('learning.notebook.hard.placeholder', '예: 케이블 연결하기', 'Ex: Connecting the cables') + '" value="' + (saved.hard || '') + '">' +
        '<label>' + t('learning.notebook.principle', '내가 발견한 과학 원리는?', 'What science idea did I discover?') + '</label>' +
        '<input type="text" id="nb-principle" class="nb-input" maxlength="100" placeholder="' + t('learning.notebook.principle.placeholder', '예: 빛이 어두울수록 LED가 켜졌어요', 'Ex: The LED turned on when it got darker') + '" value="' + (saved.principle || '') + '">' +
        '<label>' + t('learning.notebook.titleField', '작품 이름은?', 'What is your project name?') + '</label>' +
        '<input type="text" id="nb-title" class="nb-input" maxlength="50" placeholder="' + t('learning.notebook.title.placeholder', '예: 내 판다 스피커', 'Ex: My Panda Speaker') + '" value="' + (saved.title || '') + '">' +
        '<label>' + t('learning.notebook.next', '다음에 바꾸고 싶은 점은?', 'What would you change next time?') + '</label>' +
        '<input type="text" id="nb-next" class="nb-input" maxlength="100" placeholder="' + t('learning.notebook.next.placeholder', '예: 더 밝은 LED로 바꾸고 싶어요', 'Ex: I want to use a brighter LED') + '" value="' + (saved.next || '') + '">' +
        '<button type="button" class="nb-save-btn" id="nb-save-btn">' + withPixelIcon('record', t('learning.notebook.save', '기록 저장하기', 'Save notes'), 'pixel-icon-button') + '</button>' +
        '<div class="nb-saved-msg" id="nb-saved-msg" style="display:none;">' + withPixelIcon('check', t('learning.notebook.saved', '저장됐어요', 'Saved'), 'pixel-icon-inline') + '</div>' +
      '</div>' +
      (recordComplete
        ? renderGatePanel(
            t('learning.gate.record.complete.title', '기록 완료', 'Record Complete'),
            t('learning.gate.record.complete.copy', '모든 퀘스트 완료! 인증서와 자료·영상이 열렸어요.', 'All quests complete. Certificate and resources are now unlocked.'),
            'record-certificate-btn',
            t('learning.gate.record.complete.cta', '인증서 보기', 'View Certificate')
          )
        : '<div class="quest-gate-note">' + t('learning.gate.record.waiting', '기록을 저장하면 인증서와 자료·영상이 열려요.', 'Save your record to unlock the certificate and resources.') + '</div>');

    var saveBtn = sec.querySelector('#nb-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var fields = {
          nickname: sec.querySelector('#nb-nickname').value.trim(),
          hard: sec.querySelector('#nb-hard').value.trim(),
          principle: sec.querySelector('#nb-principle').value.trim(),
          title: sec.querySelector('#nb-title').value.trim(),
          next: sec.querySelector('#nb-next').value.trim()
        };
        var missingRequired = !fields.hard || !fields.principle || !fields.title || !fields.next;
        var msg = sec.querySelector('#nb-saved-msg');
        if (missingRequired) {
          if (msg) {
            msg.textContent = t('learning.gate.record.required', '기록 칸을 모두 채우면 인증서가 열려요.', 'Fill in every record field to unlock the certificate.');
            msg.style.display = 'block';
            window.setTimeout(function () { msg.style.display = 'none'; }, 2400);
          }
          showLearningToast(t('learning.gate.record.required', '기록 칸을 모두 채우면 인증서가 열려요.', 'Fill in every record field to unlock the certificate.'));
          return;
        }
        saveProgress(kitId, {
          notebook: {
            nickname: fields.nickname,
            hard: fields.hard,
            principle: fields.principle,
            title: fields.title,
            next: fields.next,
            savedAt: new Date().toLocaleDateString('ko-KR')
          },
          gates: mergeGateData(kitId, { recordComplete: true })
        });
        showLearningToast(t('learning.gate.record.complete.title', '기록 완료', 'Record Complete'));
        rerenderLearningPreserveScroll();
      });
    }

    sec.onclick = function (event) {
      if (event.target.closest('.record-certificate-btn')) {
        scrollToSection('certificate');
      }
    };
  }

  function renderCertificate(kitId, kit, progress) {
    var sec = document.getElementById('certificate');
    if (!sec || !kit) return;
    sec.onclick = null;

    if (!isRecordComplete(progress)) {
      sec.innerHTML = '';
      return;
    }

    var nb = progress.notebook || {};
    var nickname = nb.nickname || t('learning.certificate.defaultName', '도로 탐험가', 'DORO Explorer');
    var today = new Date().toLocaleDateString('ko-KR');

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.certificate.title', '인증하기', 'Certificate') + '</h2>' +
      '<div class="certificate-card" id="certificate-card">' +
        '<div class="cert-header"><div class="cert-logo">DORO</div><div class="cert-title">' + t('learning.certificate.name', '어린이 메이커 인증서', 'Young Maker Certificate') + '</div></div>' +
        '<div class="cert-body">' +
          '<div class="cert-name">' + nickname + '</div>' +
          '<div class="cert-text">' + kit.certificateText.replace(/\n/g, '<br>') + '</div>' +
          '<div class="cert-kit">' + t('learning.certificate.kit', '키트', 'Kit') + ': ' + kit.name + ' — ' + kit.subtitle + '</div>' +
          '<div class="cert-date">' + t('learning.certificate.date', '완료일', 'Completed') + ': ' + today + '</div>' +
        '</div>' +
        '<div class="cert-footer">DOROLAND V3 · DORO DIMC</div>' +
      '</div>' +
      '<div class="cert-btns">' +
        '<button type="button" class="cert-print-btn" onclick="window.print()">' + withPixelIcon('print', t('learning.certificate.print', '인증서 출력하기', 'Print certificate'), 'pixel-icon-button') + '</button>' +
        '<button type="button" class="cert-reset-btn">' + t('learning.progress.reset', '전체 진행 초기화', 'Reset all progress') + '</button>' +
        '<p class="cert-note">' + t('learning.certificate.note', '닉네임을 바꾸려면 위의 기록하기에서 수정하고 페이지를 새로고침 해요.', 'To change the nickname, update it above and refresh the page.') + '</p>' +
      '</div>';

    sec.onclick = function (event) {
      if (!event.target.closest('.cert-reset-btn')) return;
      openLearningDialog(
        t('learning.progress.reset.confirm', '이 키트의 진행 기록을 모두 초기화할까요?', 'Reset all saved progress for this kit?'),
        t('learning.progress.reset', '전체 진행 초기화', 'Reset all progress'),
        t('learning.parts.clear.cancel', '취소', 'Cancel'),
        function () {
        resetProgress(kitId);
        rerenderLearningPreserveScroll();
        }
      );
    };
  }

  function addLearningTOC() {
    var toc = document.querySelector('.toc-sidebar');
    if (!toc) return;
    var kitId = getKitIdFromPath();
    var progress = kitId ? loadProgress(kitId) : {};
    var kit = kitId && window.DORO_KIT_DATA ? window.DORO_KIT_DATA[kitId] : null;
    var gates = kit ? getQuestGateState(kitId, kit, progress) : {
      safetyComplete: true,
      partsComplete: true,
      buildComplete: true,
      scienceComplete: true,
      reviewComplete: true,
      challengeComplete: true,
      recordComplete: true
    };
    var nextGateId = getNextGateSectionId(gates);

    var items = [
      { id: SECTION_IDS.kitView, icon: 'photo', label: t('prog.toc.photos', '키트 보기', 'Kit View') },
      { id: SECTION_IDS.starterResources, icon: 'pdf', label: t('prog.toc.starter', '교육자료 확인', 'Starter Resources') },
      { id: SECTION_IDS.starterQuiz, icon: 'check', label: t('prog.toc.quiz', '시작 전 확인', 'Quick Start Check') },
      { id: SECTION_IDS.safetyPromise, icon: 'safety', label: t('prog.toc.safety', '안전 약속', 'Safety Promise') },
      { id: SECTION_IDS.componentCheck, icon: 'parts', label: t('prog.toc.components', '구성품 확인', 'Component Check') },
      { id: SECTION_IDS.buildGuide, icon: 'build', label: t('prog.toc.build', '한 단계씩 만들기', 'Step-by-Step Build') },
      { id: SECTION_IDS.troubleshooting, icon: 'help', label: t('prog.toc.trouble', '왜 안 되지?', 'Troubleshooting') },
      { id: SECTION_IDS.scienceLab, icon: 'science', label: t('prog.toc.lab', '과학 실험', 'Science Lab') },
      { id: SECTION_IDS.reviewQuiz, icon: 'review', label: t('prog.toc.review', '되돌아보기', 'Review Quiz') },
      { id: SECTION_IDS.challengeMissions, icon: 'mission', label: t('prog.toc.mission', '도전 미션', 'Challenge Missions') },
      { id: SECTION_IDS.recordCertificate, icon: 'record', label: t('prog.toc.record', '기록·인증', 'Notes & Certificate') },
      { id: SECTION_IDS.resourcesVideos, icon: 'video', label: t('prog.toc.resources', '자료·영상', 'Resources & Videos') }
    ].filter(function (item) {
      return !!document.getElementById(item.id);
    });

    var fragment = document.createDocumentFragment();
    items.forEach(function (item, index) {
      var lock = getGateLock(item.id, gates);
      var locked = !!lock;
      var link = document.createElement('a');
      link.href = toHash(item.id);
      link.setAttribute('data-toc-link', 'true');
      link.setAttribute('data-target', item.id);
      if (locked) {
        link.setAttribute('aria-disabled', 'true');
        link.setAttribute('data-safety-locked', 'true');
        link.setAttribute('data-locked-target', lock.target);
        link.setAttribute('data-locked-message', lock.message);
      }
      link.className = 'toc-item' + (index === 0 ? ' active' : '') + (locked ? ' is-disabled is-safety-gated is-quest-gated' : '') + (item.id === nextGateId ? ' is-next-step' : '');
      if (index === 0) link.setAttribute('aria-current', 'true');
      link.innerHTML = '<span class="toc-dot"></span>' + pixelIcon(item.icon, 'pixel-icon-toc') + '<span>' + item.label + '</span>';
      fragment.appendChild(link);
    });
    toc.innerHTML = '';
    toc.appendChild(fragment);
    toc.onclick = function (event) {
      var locked = event.target.closest('.toc-item.is-disabled');
      if (!locked) return;
      event.preventDefault();
      event.stopPropagation();
      showLearningToast(locked.getAttribute('data-locked-message') || t('learning.gate.lock.generic', '먼저 필요한 단계를 완료해 주세요.', 'Complete the required step first.'));
      scrollToSection(locked.getAttribute('data-locked-target') || nextGateId);
    };
  }

  function scrollToSection(sectionId) {
    var target = document.getElementById(sectionId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function rerenderLearningAndScroll(sectionId) {
    renderLearningUI();
    window.requestAnimationFrame(function () {
      scrollToSection(sectionId);
    });
  }

  function renderGuideNotice(guide) {
    if (!guide || !guide.studentNotice || !guide.studentNotice.length) return '';
    return '' +
      '<div class="build-guide-note">' +
        '<strong>' + t('learning.build.notice.title', '먼저 읽어요', 'Read This First') + '</strong>' +
        '<ul class="build-guide-note-list">' +
          guide.studentNotice.map(function (text) { return '<li>' + text + '</li>'; }).join('') +
        '</ul>' +
      '</div>';
  }

  function renderComponentCheck(kitId, kit, progress) {
    var sec = document.getElementById(SECTION_IDS.componentCheck);
    if (!sec || !kit) return;
    sec.onclick = null;

    if (!isSafetyCompleted(kitId, progress)) {
      sec.innerHTML = '';
      return;
    }

    var guide = getAssemblyGuide(kitId) || {};
    var saved = normalizePartProgress(progress.parts, kit.parts);
    var total = kit.parts.length;
    var foundCount = countStates(saved, 'found');
    var missingCount = countStates(saved, 'missing');
    var checkedCount = foundCount + missingCount;
    var partsComplete = isPartMapComplete(saved, kit.parts);

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.parts.title', '구성품 확인', 'Component Check') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.parts.desc.short', '상자 안의 부품을 하나씩 찾아요. 이름, 역할, 찾는 힌트를 확인하고 표시하세요.', 'Find each item in the box. Check its name, role, and hint, then mark it.') + '</p>' +
      (guide.partsOverviewImage
        ? '<article class="parts-overview-panel">' +
            '<div class="parts-overview-head">' +
              '<div><h3>' + t('learning.parts.overview.title', '전체 부품 사진', 'Parts Overview Photo') + '</h3><p>' + (guide.partsOverviewCaption || t('learning.parts.overview.desc', '설명서에 나온 전체 부품 사진을 보고 상자 안의 부품을 먼저 찾아봐요.', 'Use the overview photo from the guide to find the parts in the box first.')) + '</p></div>' +
            '</div>' +
            '<figure class="parts-overview-figure">' +
              '<img src="' + guide.partsOverviewImage + '" alt="' + (guide.partsOverviewAlt || t('learning.parts.overview.alt', '키트 전체 부품 사진', 'Overview photo of all kit parts')) + '" loading="lazy">' +
            '</figure>' +
          '</article>'
        : '') +
      '<div class="parts-toolbar">' +
        '<div class="parts-progress-chip">' + t('learning.parts.progress', '확인한 부품', 'Checked parts') + ' <strong>' + checkedCount + ' / ' + total + '</strong></div>' +
        '<div class="parts-toolbar-actions">' +
          '<button type="button" class="parts-reset-btn">' + withPixelIcon('reset', t('learning.parts.clear', '전체 선택 해제', 'Clear all'), 'pixel-icon-button') + '</button>' +
          (foundCount === total ? '<button type="button" class="parts-next-btn">' + withPixelIcon('arrow-next', t('learning.parts.next', '만들기로 이동', 'Go to Build'), 'pixel-icon-button') + '</button>' : '') +
        '</div>' +
      '</div>' +
      '<div class="parts-reset-panel" id="parts-reset-panel" hidden>' +
        '<p>' + t('learning.parts.clear.question', '선택한 구성품 확인을 모두 지울까요?', 'Clear all component checks?') + '</p>' +
        '<div class="parts-reset-panel-actions">' +
          '<button type="button" class="parts-reset-confirm-btn">' + t('learning.parts.clear.action', '해제하기', 'Clear') + '</button>' +
          '<button type="button" class="parts-reset-cancel-btn">' + t('learning.parts.clear.cancel', '취소', 'Cancel') + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="parts-grid" id="parts-grid"></div>' +
      '<div class="parts-summary" id="parts-summary"></div>' +
      (partsComplete
        ? renderGatePanel(
            t('learning.gate.parts.complete.title', '구성품 확인 완료', 'Component Check Complete'),
            t('learning.gate.parts.complete.copy', '이제 만들기와 문제 해결 도움을 볼 수 있어요.', 'You can now open the build guide and troubleshooting help.'),
            'parts-build-btn',
            t('learning.gate.parts.complete.cta', '만들기로 이동', 'Go to Build')
          )
        : '<div class="quest-gate-note">' +
            (missingCount > 0
              ? t('learning.gate.parts.missing', '부품을 찾거나 문의한 뒤 다시 확인해 주세요.', 'Find the missing part or contact DORO, then check again.')
              : t('learning.gate.parts.waiting', '구성품을 모두 찾으면 만들기 단계가 열려요.', 'Complete the component check to unlock building.')) +
          '</div>');

    var grid = sec.querySelector('#parts-grid');
    kit.parts.forEach(function (part, i) {
      var partKey = getPartKey(part, i);
      var found = saved[partKey] === 'found';
      var missing = saved[partKey] === 'missing';
      var visual = part.image
        ? '<figure class="part-thumb"><img src="' + part.image + '" alt="' + (part.alt || (part.name + ' ' + t('learning.parts.photo.alt', '부품 사진', 'part photo'))) + '" loading="lazy"></figure>'
        : '<div class="part-icon" aria-hidden="true">' + pixelIcon(part.icon || 'parts', 'pixel-icon-part') + '</div>';
      var card = document.createElement('article');
      card.className = 'part-card' + (part.image ? ' has-image' : '') + (found ? ' found' : missing ? ' missing' : '');
      card.innerHTML =
        '<div class="part-card-head">' +
          visual +
          '<div class="part-name">' + part.name + '</div>' +
        '</div>' +
        '<div class="part-meta">' +
          '<div class="part-copy">' +
            '<span class="part-copy-label">' + t('learning.parts.role', '역할', 'Role') + '</span>' +
            '<p class="part-role">' + part.role + '</p>' +
          '</div>' +
          '<div class="part-copy">' +
            '<span class="part-copy-label">' + t('learning.parts.check', '찾는 힌트', 'Find hint') + '</span>' +
            '<p class="part-check">' + part.check + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="part-btns">' +
          '<button type="button" class="part-btn found-btn' + (found ? ' active' : '') + '" data-part-id="' + partKey + '" data-state="found" aria-pressed="' + (found ? 'true' : 'false') + '" aria-label="' + part.name + ' ' + t('learning.parts.found', '있어요', 'Have it') + '">' + t('learning.parts.found', '있어요', 'Have it') + '</button>' +
          '<button type="button" class="part-btn missing-btn' + (missing ? ' active' : '') + '" data-part-id="' + partKey + '" data-state="missing" aria-pressed="' + (missing ? 'true' : 'false') + '" aria-label="' + part.name + ' ' + t('learning.parts.missing', '없어요', 'Missing') + '">' + t('learning.parts.missing', '없어요', 'Missing') + '</button>' +
        '</div>' +
        (missing ? '<div class="part-missing-msg">' + supportContactHtml('부품이 없거나 부서졌다면 보호자와 함께 DORO에 문의해 주세요.', 'If a part is missing or broken, contact DORO with a parent or guardian.', 'support-contact--compact') + '</div>' : '');
      grid.appendChild(card);
    });

    sec.onclick = function (event) {
      var btn = event.target.closest('.part-btn');
      if (btn) {
        var idx = btn.getAttribute('data-part-id');
        var state = btn.getAttribute('data-state');
        var nextParts = toggleMapValue(saved, idx, state);
        saveProgress(kitId, {
          parts: nextParts,
          gates: mergeGateData(kitId, { partsComplete: isPartMapComplete(nextParts, kit.parts) })
        });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.parts-reset-btn')) {
        var panel = sec.querySelector('#parts-reset-panel');
        if (panel) panel.hidden = false;
        return;
      }

      if (event.target.closest('.parts-reset-cancel-btn')) {
        var cancelPanel = sec.querySelector('#parts-reset-panel');
        if (cancelPanel) cancelPanel.hidden = true;
        return;
      }

      if (event.target.closest('.parts-reset-confirm-btn')) {
        saveProgress(kitId, {
          parts: {},
          gates: mergeGateData(kitId, { partsComplete: false })
        });
        rerenderLearningPreserveScroll();
        showLearningToast(t('learning.parts.clear.done', '구성품 확인이 초기화되었습니다.', 'Component checks have been reset.'));
        return;
      }

      if (event.target.closest('.parts-next-btn') || event.target.closest('.parts-build-btn')) {
        scrollToSection(SECTION_IDS.buildGuide);
      }
    };

    var summary = sec.querySelector('#parts-summary');
    if (summary) {
      summary.innerHTML =
        '<div class="parts-summary-copy">' +
          (foundCount === total
            ? t('learning.parts.complete', '모든 부품을 찾았어요! 이제 만들기를 시작해요.', 'You found every part. Now start building.')
            : t('learning.parts.status', '있어요 ' + foundCount + '개 · 없어요 ' + missingCount + '개', 'Have it: ' + foundCount + ' · Missing: ' + missingCount)) +
        '</div>';
    }
  }

  function renderBuildStep(step, idx, total, guide, showStepNotice) {
    var progressPct = Math.max(8, Math.round(((idx + 1) / total) * 100));
    var stepNum = step.step || (idx + 1);
    var hasVideo = !!(guide && guide.assemblyVideo);
    var videoHint = step.videoTime || step.videoHint || '';
    var hasVideoHint = !!videoHint;
    var mission = step.mission || step.detail || '';
    var check = step.check || step.tip || '';
    var caution = step.caution || '';
    var doneLabel = idx === total - 1
      ? t('learning.build.done.final', '완성 확인하기', 'Review the finish')
      : t('learning.build.done.next', '완료하고 다음 단계로', 'Finish and go on');
    var stepNoticeHtml = showStepNotice
      ? '<div class="build-step-transition-note" role="status">' +
          '<div>' +
            '<strong>' + t('learning.build.stepNotice.title', '다음 단계로 넘어갔어요.', 'Moved to the next step.') + '</strong>' +
            '<p>' + t('learning.build.stepNotice.current', '현재 단계', 'Current Step') + ' ' + (idx + 1) + ' / ' + total + ': ' + escapeHtml(step.title) + '</p>' +
          '</div>' +
          '<button type="button" class="build-step-top-btn">' + withPixelIcon('arrow-up', t('learning.build.stepNotice.cta', '단계 위로 보기', 'View Step Top'), 'pixel-icon-button') + '</button>' +
        '</div>'
      : '';

    return '' +
      '<div class="build-step-card">' +
        '<div class="build-step-head">' +
          '<div class="build-step-num">' + t('learning.build.step', '단계', 'Step') + ' ' + stepNum + ' / ' + total + '</div>' +
          '<button type="button" class="build-reset-btn">' + withPixelIcon('reset', t('learning.build.reset', '처음부터', 'Restart'), 'pixel-icon-button') + '</button>' +
        '</div>' +
        '<div class="build-step-title">' + step.title + '</div>' +
        (step.image
          ? '<div class="build-step-media"><figure class="build-step-image"><img src="' + step.image + '" alt="' + (step.alt || step.title) + '" loading="lazy"></figure></div>'
          : '') +
        '<div class="build-step-block">' +
          '<div class="build-step-label">' + t('learning.build.today', '오늘의 미션', 'Today\'s Mission') + '</div>' +
          '<div class="build-step-mission">' + mission + '</div>' +
        '</div>' +
        (check
          ? '<div class="build-step-check"><strong>' + t('learning.build.check', '이렇게 되었나요?', 'Check This') + '</strong><p>' + check + '</p></div>'
          : '') +
        (caution
          ? '<div class="build-step-caution"><strong>' + t('learning.build.caution', '주의', 'Caution') + '</strong><p>' + caution + '</p></div>'
          : '') +
        (hasVideoHint
          ? '<div class="build-video-panel">' +
              '<div class="build-video-title">' + t('learning.build.video.title', '조립 영상 힌트', 'Assembly Video Hint') + '</div>' +
              '<p>' + t('learning.build.video.desc', '막히면 아래 조립 영상에서 같은 장면을 다시 확인할 수 있어요.', 'If you get stuck, review the matching scene in the assembly video below.') + '</p>' +
              (step.videoTime ? '<div class="build-video-time">' + t('learning.build.video.from', '추천 구간', 'Suggested time') + ': ' + step.videoTime + '</div>' : '') +
            '</div>'
          : '') +
        '<div class="build-step-progress-bar"><div class="build-step-progress-fill" style="width:' + progressPct + '%"></div></div>' +
      '</div>' +
      stepNoticeHtml +
      '<div class="build-step-btns">' +
        (idx > 0 ? '<button type="button" class="build-btn build-redo-btn">' + withPixelIcon('arrow-back', t('learning.build.redo', '이전 단계', 'Previous Step'), 'pixel-icon-button') + '</button>' : '') +
        '<button type="button" class="build-btn build-done-btn">' + withPixelIcon('check', doneLabel, 'pixel-icon-button') + '</button>' +
        (hasVideo ? '<button type="button" class="build-btn build-video-btn">' + withPixelIcon('video', t('learning.build.video.cta', '조립 영상 보기', 'Watch Assembly Video'), 'pixel-icon-button') + '</button>' : '') +
        '<button type="button" class="build-btn build-help-btn">' + withPixelIcon('help', t('learning.build.help', '도와줘요', 'Help me'), 'pixel-icon-button') + '</button>' +
      '</div>';
  }

  function renderBuildComplete(kit, guide) {
    return '' +
      '<div class="build-complete">' +
        t('learning.gate.build.complete.title', '만들기 완료', 'Build Complete') +
        '<br><small>' + t('learning.gate.build.complete.copy', '이제 키트가 어떤 원리로 움직이는지 확인해 볼까요?', 'Now check how the kit works in the science lab.') + '</small>' +
      '</div>' +
      '<div class="build-step-btns">' +
        '<button type="button" class="build-btn build-lab-btn">' + withPixelIcon('science', t('learning.gate.build.complete.cta', '과학 실험으로 이동', 'Go to Science Lab'), 'pixel-icon-button') + '</button>' +
        '<button type="button" class="build-btn build-reset-btn">' + withPixelIcon('reset', t('learning.build.reset', '처음부터', 'Restart'), 'pixel-icon-button') + '</button>' +
      '</div>';
  }

  function renderBuildStepper(kitId, kit, progress) {
    var sec = document.getElementById(SECTION_IDS.buildGuide);
    if (!sec || !kit) return;
    sec.onclick = null;

    if (!isPartsComplete(kit, progress)) {
      sec.innerHTML = '';
      return;
    }

    var saved = progress.build || {};
    var currentStep = saved.step || 0;
    var guide = getAssemblyGuide(kitId);
    var steps = getAssemblySteps(kitId, kit);
    var isComplete = currentStep >= steps.length;
    var showStepNotice = buildTransitionNotice[kitId] === currentStep && !isComplete;

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.build.title', '한 단계씩 만들기', 'Step-by-Step Build') + '</h2>' +
      renderGuideNotice(guide) +
      (steps.length
        ? (isComplete ? renderBuildComplete(kit, guide) : renderBuildStep(steps[currentStep], currentStep, steps.length, guide, showStepNotice))
        : '<div class="build-complete">' + t('learning.build.empty', '조립 가이드를 준비하고 있어요.', 'The assembly guide is being prepared.') + '</div>');

    sec.onclick = function (event) {
      if (event.target.closest('.build-done-btn')) {
        var nextStep = currentStep + 1;
        if (nextStep < steps.length) {
          buildTransitionNotice[kitId] = nextStep;
        } else {
          delete buildTransitionNotice[kitId];
        }
        saveProgress(kitId, {
          build: { step: nextStep },
          gates: mergeGateData(kitId, { buildComplete: nextStep >= steps.length })
        });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.build-redo-btn')) {
        var previousStep = Math.max(0, currentStep - 1);
        buildTransitionNotice[kitId] = previousStep;
        saveProgress(kitId, {
          build: { step: previousStep },
          gates: mergeGateData(kitId, { buildComplete: false })
        });
        rerenderLearningPreserveScroll();
        return;
      }

      if (event.target.closest('.build-step-top-btn')) {
        scrollToSection(SECTION_IDS.buildGuide);
        return;
      }

      if (event.target.closest('.build-help-btn')) {
        scrollToSection(SECTION_IDS.troubleshooting);
        return;
      }

      if (event.target.closest('.build-video-btn')) {
        var assemblyPanel = document.getElementById('assembly-video-player');
        if (assemblyPanel && !assemblyPanel.hidden && !assemblyPanel.classList.contains('post-safety-hidden')) {
          assemblyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          var assemblyVideo = assemblyPanel.querySelector('video');
          var step = steps[currentStep] || {};
          var targetTime = parseVideoTime(step.videoTime);
          if (assemblyVideo && targetTime !== null) {
            var seekToTime = function () {
              assemblyVideo.currentTime = targetTime;
            };
            if (assemblyVideo.readyState >= 1) {
              seekToTime();
            } else {
              assemblyVideo.addEventListener('loadedmetadata', seekToTime, { once: true });
            }
          }
        } else {
          scrollToSection(SECTION_IDS.starterResources);
        }
        return;
      }

      if (event.target.closest('.build-demo-btn')) {
        scrollToSection('demo-video-player');
        return;
      }

      if (event.target.closest('.build-lab-btn')) {
        scrollToSection(SECTION_IDS.scienceLab);
        return;
      }

      if (event.target.closest('.build-reset-btn')) {
        openLearningDialog(
          t('learning.build.reset.confirm', '만들기 진행을 처음부터 다시 시작할까요?', 'Restart the build progress from the beginning?'),
          t('learning.build.reset', '처음부터', 'Restart'),
          t('learning.parts.clear.cancel', '취소', 'Cancel'),
          function () {
            delete buildTransitionNotice[kitId];
            saveProgress(kitId, {
              build: { step: 0 },
              gates: mergeGateData(kitId, { buildComplete: false })
            });
            rerenderLearningPreserveScroll();
          }
        );
      }
    };
  }

  function renderResourcesMedia(kitId, kit) {
    var sec = document.getElementById(SECTION_IDS.resourcesVideos);
    if (!sec || !kit) return;

    var guide = getAssemblyGuide(kitId);
    if (!guide) {
      sec.innerHTML =
        '<div class="student-group-header">' +
          '<h2 class="student-group-title">' + withPixelIcon('video', t('prog.resources.title', '자료·영상', 'Resources & Videos'), 'pixel-icon-heading') + '</h2>' +
          '<p class="student-group-desc">' + t('prog.resources.empty', '이 키트의 자료는 준비 중입니다.', 'Resources for this kit are being prepared.') + '</p>' +
        '</div>';
      return;
    }

    var cards = [];
    if (guide.guidePdf) {
      cards.push(
        '<article class="resource-card">' +
          '<div class="resource-card-icon">' + pixelIcon('pdf', 'pixel-icon-resource') + '</div>' +
          '<div class="resource-card-body">' +
            '<h3 class="resource-card-title">' + t('learning.resources.review.pdf.title', '조립 설명서 다시 보기', 'Reopen the Assembly Guide') + '</h3>' +
            '<p class="resource-card-desc">' + t('learning.resources.review.pdf.desc', '놓친 순서가 있으면 설명서를 다시 열어 확인해요.', 'Open the guide again if you want to review the steps you missed.') + '</p>' +
          '</div>' +
          '<div class="resource-card-actions">' +
            '<a href="' + guide.guidePdf + '" target="_blank" rel="noopener" class="resource-link-btn">' + withPixelIcon('pdf', t('learning.resources.review.pdf.cta', 'PDF 다시 보기', 'Reopen PDF'), 'pixel-icon-button') + '</a>' +
          '</div>' +
        '</article>'
      );
    }

    if (guide.assemblyVideo) {
      cards.push(
        '<article class="resource-card">' +
          '<div class="resource-card-icon">' + pixelIcon('build', 'pixel-icon-resource') + '</div>' +
          '<div class="resource-card-body">' +
            '<h3 class="resource-card-title">' + t('learning.resources.assembly.title', '조립 영상', 'Assembly Video') + '</h3>' +
            '<p class="resource-card-desc">' + t('learning.resources.assembly.desc', '순서가 헷갈릴 때 같은 장면을 영상으로 다시 확인해요.', 'Review the build in motion when a step feels unclear.') + '</p>' +
          '</div>' +
          '<div class="resource-card-actions">' +
            '<a href="#assembly-video-player" class="resource-link-btn">' + withPixelIcon('video', t('learning.resources.video.cta', '영상 보기', 'Open Video'), 'pixel-icon-button') + '</a>' +
          '</div>' +
        '</article>'
      );
    }

    if (guide.demoVideo) {
      cards.push(
        '<article class="resource-card">' +
          '<div class="resource-card-icon">' + pixelIcon('video', 'pixel-icon-resource') + '</div>' +
          '<div class="resource-card-body">' +
            '<h3 class="resource-card-title">' + t('learning.resources.demo.title', '작동 데모 영상', 'Demo Video') + '</h3>' +
            '<p class="resource-card-desc">' + t('learning.resources.demo.desc', '완성 후 어떤 모습으로 작동하는지 먼저 확인할 수 있어요.', 'See what the finished kit should look like when it works.') + '</p>' +
          '</div>' +
          '<div class="resource-card-actions">' +
            '<a href="#demo-video-player" class="resource-link-btn">' + withPixelIcon('video', t('learning.resources.video.cta', '영상 보기', 'Open Video'), 'pixel-icon-button') + '</a>' +
          '</div>' +
        '</article>'
      );
    }

    sec.innerHTML =
      '<div class="student-group-header">' +
        '<h2 class="student-group-title">' + withPixelIcon('video', t('learning.resources.review.title', '자료·영상 다시 보기', 'Review Resources'), 'pixel-icon-heading') + '</h2>' +
        '<p class="student-group-desc">' + t('learning.resources.review.desc', '조립 중 다시 보거나 끝난 뒤 복습할 자료를 모아 두었어요.', 'Reopen these materials during the build or review them after you finish.') + '</p>' +
      '</div>' +
      '<div class="resource-card-grid">' + cards.join('') + '</div>' +
      (guide.assemblyVideo
        ? '<article class="resource-video-panel" id="assembly-video-player">' +
            '<div class="resource-video-head">' +
              '<div><h3>' + t('learning.resources.assembly.title', '조립 영상', 'Assembly Video') + '</h3><p>' + t('learning.resources.assembly.desc', '순서가 헷갈릴 때 같은 장면을 영상으로 다시 확인해요.', 'Review the build in motion when a step feels unclear.') + '</p></div>' +
            '</div>' +
            '<video controls preload="metadata" aria-label="' + t('learning.resources.assembly.title', '조립 영상', 'Assembly Video') + '">' +
              '<source src="' + guide.assemblyVideo + '" type="video/mp4">' +
              'Your browser does not support the video tag.' +
            '</video>' +
          '</article>'
        : '') +
      (guide.demoVideo
        ? '<article class="resource-video-panel" id="demo-video-player">' +
            '<div class="resource-video-head">' +
              '<div><h3>' + t('learning.resources.demo.title', '작동 데모 영상', 'Demo Video') + '</h3><p>' + t('learning.resources.demo.desc', '완성 후 어떤 모습으로 작동하는지 먼저 확인할 수 있어요.', 'See what the finished kit should look like when it works.') + '</p></div>' +
            '</div>' +
            '<video controls preload="metadata" aria-label="' + t('learning.resources.demo.title', '작동 데모 영상', 'Demo Video') + '">' +
              '<source src="' + guide.demoVideo + '" type="video/mp4">' +
              'Your browser does not support the video tag.' +
            '</video>' +
          '</article>'
        : '');
  }

  function renderLearningUI() {
    var kitId = getKitIdFromPath();
    if (!kitId || !window.DORO_KIT_DATA) return;

    var kit = window.DORO_KIT_DATA[kitId];
    if (!kit) return;

    var progress = loadProgress(kitId);
    var gates = getQuestGateState(kitId, kit, progress);
    handleQREntry();
    renderStarterResources(kitId, kit);
    renderStarterQuiz(kitId, kit, progress);
    renderSafetyQuest(kitId, kit, progress);
    setQuestGateVisibility(gates);
    if (gates.safetyComplete) {
      renderComponentCheck(kitId, kit, progress);
    }
    if (gates.partsComplete) {
      renderBuildStepper(kitId, kit, progress);
      renderTroubleshooter(kitId, kit, progress);
    }
    if (gates.buildComplete) {
      renderScienceLab(kitId, kit, progress);
    }
    if (gates.scienceComplete) {
      renderReviewQuiz(kitId, kit, progress);
    }
    if (gates.reviewComplete) {
      renderMissionCards(kitId, kit, progress);
    }
    if (gates.challengeComplete) {
      renderNotebook(kitId, kit, progress);
    }
    if (gates.recordComplete) {
      renderCertificate(kitId, kit, progress);
      renderResourcesMedia(kitId, kit);
    }
    addLearningTOC();
    window.dispatchEvent(new CustomEvent('doro:v5learningrendered'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', handleSupportEmailClick);
    renderLearningUI();
  });

  window.addEventListener('doro:languagechange', function () {
    renderLearningUI();
  });
})();
