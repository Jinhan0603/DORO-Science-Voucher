/* ============================================
   DOROLAND V3 — Learning Portal JavaScript
   학생용 자기주도 학습 UI / localStorage 기반
   ============================================ */

(function () {
  'use strict';

  function getKitIdFromPath() {
    var parts = location.pathname.split('/');
    var idx = parts.indexOf('programs');
    return idx !== -1 ? parts[idx + 1] : null;
  }

  function getProgressKey(kitId) {
    return 'doro_v3_' + kitId;
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

  function buildSectionTitle(key, fallbackKo, fallbackEn) {
    return t(key, fallbackKo, fallbackEn);
  }

  function handleQREntry() {
    var params = new URLSearchParams(location.search);
    if (params.get('from') !== 'qr') return;

    var existing = document.querySelector('.qr-entry-banner');
    if (existing) existing.remove();

    var banner = document.createElement('div');
    banner.className = 'qr-entry-banner';
    banner.innerHTML =
      '<div class="qr-entry-inner">' +
        '<p class="qr-entry-title">📦 ' + t('learning.qr.title', '키트를 받았다면 바로 시작해요.', 'If you have your kit, start here.') + '</p>' +
        '<div class="qr-entry-btns">' +
          '<button type="button" class="qr-btn qr-btn-primary" data-scroll-target="#parts-detective">🔍 ' + t('learning.parts.plain', '구성품 확인', 'Component Check') + '</button>' +
          '<button type="button" class="qr-btn qr-btn-help" data-scroll-target="#build-guide">🚀 ' + t('learning.build.start', '만들기 시작', 'Start Building') + '</button>' +
        '</div>' +
      '</div>';

    banner.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-scroll-target]');
      if (!btn) return;
      var target = document.querySelector(btn.getAttribute('data-scroll-target'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });

    var hero = document.querySelector('.detail-hero');
    if (hero) hero.insertAdjacentElement('afterend', banner);
  }

  function renderComponentCheck(kitId, kit, progress) {
    var sec = document.getElementById('parts-detective');
    if (!sec || !kit) return;
    sec.onclick = null;

    var saved = cloneMap(progress.parts);
    var total = kit.parts.length;
    var foundCount = countStates(saved, 'found');
    var missingCount = countStates(saved, 'missing');
    var checkedCount = foundCount + missingCount;

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.parts.title', '🔍 구성품 확인', '🔍 Component Check') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.parts.desc.short', '상자 안의 부품을 하나씩 찾아요. 이름, 역할, 찾는 힌트를 확인하고 표시하세요.', 'Find each item in the box. Check its name, role, and hint, then mark it.') + '</p>' +
      '<div class="parts-toolbar">' +
        '<div class="parts-progress-chip">' + t('learning.parts.progress', '확인 완료', 'Checked') + ' <strong>' + checkedCount + ' / ' + total + '</strong></div>' +
        '<div class="parts-toolbar-actions">' +
          '<button type="button" class="parts-reset-btn">' + t('learning.parts.clear', '전체 선택 해제', 'Clear all') + '</button>' +
          (foundCount === total ? '<button type="button" class="parts-next-btn">' + t('learning.parts.next', '안전 약속으로 이동', 'Go to Safety Promise') + '</button>' : '') +
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
          '<div class="part-emoji" aria-hidden="true">' + part.emoji + '</div>' +
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
          '<button type="button" class="part-btn found-btn' + (found ? ' active' : '') + '" data-idx="' + i + '" data-state="found" aria-pressed="' + (found ? 'true' : 'false') + '" aria-label="' + part.name + ' ' + t('learning.parts.found', '있어요 ✓', 'Have it ✓') + '">' + t('learning.parts.found', '있어요 ✓', 'Have it ✓') + '</button>' +
          '<button type="button" class="part-btn missing-btn' + (missing ? ' active' : '') + '" data-idx="' + i + '" data-state="missing" aria-pressed="' + (missing ? 'true' : 'false') + '" aria-label="' + part.name + ' ' + t('learning.parts.missing', '없어요', 'Missing') + '">' + t('learning.parts.missing', '없어요', 'Missing') + '</button>' +
        '</div>' +
        (missing ? '<div class="part-missing-msg">👨‍👩‍👧 ' + t('learning.parts.support', '보호자에게 알려주세요. 고객지원: doroedu.net', 'Tell a parent or guardian. Support: doroedu.net') + '</div>' : '');
      grid.appendChild(card);
    });

    sec.onclick = function (event) {
      var btn = event.target.closest('.part-btn');
      if (btn) {
        var idx = btn.getAttribute('data-idx');
        var state = btn.getAttribute('data-state');
        saveProgress(kitId, { parts: toggleMapValue(saved, idx, state) });
        renderLearningUI();
        return;
      }

      if (event.target.closest('.parts-reset-btn')) {
        if (window.confirm(t('learning.parts.clear.confirm', '구성품 확인 선택을 모두 지울까요?', 'Clear all component selections?'))) {
          saveProgress(kitId, { parts: {} });
          renderLearningUI();
        }
        return;
      }

      if (event.target.closest('.parts-next-btn')) {
        var nextSection = document.getElementById('safety-quest');
        if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    var summary = sec.querySelector('#parts-summary');
    if (summary) {
      summary.innerHTML =
        '<div class="parts-summary-copy">' +
          (foundCount === total
            ? t('learning.parts.complete', '🎉 모든 부품을 찾았어요! 안전 약속으로 이동해요!', '🎉 You found every part! Move on to the Safety Promise.')
            : t('learning.parts.status', '있어요 ' + foundCount + '개 · 없어요 ' + missingCount + '개', 'Have it: ' + foundCount + ' · Missing: ' + missingCount)) +
        '</div>';
    }
  }

  function renderSafetyQuest(kitId, kit, progress) {
    var sec = document.getElementById('safety-quest');
    if (!sec || !kit) return;
    sec.onclick = null;

    var saved = progress.safety || {};
    var quiz = kit.safetyQuiz || [];
    var quizIdx = saved.quizIdx || 0;

    if (saved.passed === true) {
      sec.innerHTML =
        '<h2 class="student-section-title">' + buildSectionTitle('learning.safety.title', '🛡 안전 약속', '🛡 Safety Promise') + '</h2>' +
        '<div class="safety-pass-badge">' +
          t('learning.safety.pass', '🎖 안전 대원 배지를 얻었어요!', '🎖 You earned the Safety Cadet badge!') +
          '<br><small>' + t('learning.safety.done', '이제 한 단계씩 만들기로 넘어가요.', 'Now move on to the build steps.') + '</small>' +
        '</div>' +
        '<div class="safety-complete-actions">' +
          '<button type="button" class="build-jump-btn">' + t('learning.safety.next', '만들기로 이동', 'Go to Build') + '</button>' +
          '<button type="button" class="safety-reset-btn">' + t('learning.safety.retry', '다시 풀기', 'Retry') + '</button>' +
        '</div>';

      sec.onclick = function (event) {
        if (event.target.closest('.build-jump-btn')) {
          var build = document.getElementById('build-guide');
          if (build) build.scrollIntoView({ behavior: 'smooth' });
        }
        if (event.target.closest('.safety-reset-btn')) {
          saveProgress(kitId, { safety: {} });
          renderLearningUI();
        }
      };
      return;
    }

    if (quizIdx >= quiz.length) {
      saveProgress(kitId, { safety: { passed: true, quizIdx: quiz.length } });
      renderLearningUI();
      return;
    }

    var current = quiz[quizIdx];
    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.safety.title', '🛡 안전 약속', '🛡 Safety Promise') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.safety.desc', '만들기 전에 안전 약속을 먼저 확인해요!', 'Check the safety promise before you start building!') + '</p>' +
      '<div class="safety-quiz-card">' +
        '<div class="safety-progress-chip">' + t('learning.safety.progress', '안전 약속 진행', 'Safety progress') + ' <strong>' + (quizIdx + 1) + ' / ' + quiz.length + '</strong></div>' +
        '<div class="safety-q-text">' + current.q + '</div>' +
        '<div class="safety-q-btns">' +
          '<button type="button" class="safety-btn safety-o" data-answer="true">⭕ ' + t('learning.safety.yes', '맞아요', 'Yes') + '</button>' +
          '<button type="button" class="safety-btn safety-x" data-answer="false">❌ ' + t('learning.safety.no', '아니에요', 'No') + '</button>' +
        '</div>' +
        '<div class="safety-feedback" id="safety-feedback"></div>' +
      '</div>';

    sec.querySelectorAll('.safety-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var userAnswer = this.getAttribute('data-answer') === 'true';
        var feedback = sec.querySelector('#safety-feedback');
        if (!feedback) return;

        if (userAnswer === current.answer) {
          feedback.innerHTML = '<div class="safety-correct">✅ ' + t('learning.safety.correct', '맞아요! 안전 대원이에요 ✓', 'Correct! You\'re a safety cadet ✓') + '</div>';
          setTimeout(function () {
            saveProgress(kitId, { safety: { quizIdx: quizIdx + 1 } });
            renderLearningUI();
          }, 900);
        } else {
          feedback.innerHTML = '<div class="safety-wrong">🔄 ' + t('learning.safety.wrong', '다시 확인해볼까요?', 'Let\'s check again?') + '</div>';
          setTimeout(function () {
            feedback.innerHTML = '';
          }, 1200);
        }
      });
    });
  }

  function renderBuildStep(step, idx, total) {
    var progressPct = Math.max(8, Math.round(((idx + 1) / total) * 100));
    return '' +
      '<div class="build-step-card">' +
        '<div class="build-step-head">' +
          '<div class="build-step-num">' + t('learning.build.step', '단계', 'Step') + ' ' + step.step + ' / ' + total + '</div>' +
          '<button type="button" class="build-reset-btn">' + t('learning.build.reset', '처음부터', 'Restart') + '</button>' +
        '</div>' +
        '<div class="build-step-title">' + step.title + '</div>' +
        '<div class="build-step-detail">' + step.detail + '</div>' +
        (step.tip ? '<div class="build-step-tip">💡 ' + step.tip + '</div>' : '') +
        '<div class="build-step-progress-bar"><div class="build-step-progress-fill" style="width:' + progressPct + '%"></div></div>' +
      '</div>' +
      '<div class="build-step-btns">' +
        '<button type="button" class="build-btn build-done-btn">✅ ' + t('learning.build.done', '완료했어요 ✓', 'Done ✓') + '</button>' +
        (idx > 0 ? '<button type="button" class="build-btn build-redo-btn">↩ ' + t('learning.build.redo', '이전 단계', 'Previous Step') + '</button>' : '') +
        '<button type="button" class="build-btn build-help-btn">🤔 ' + t('learning.build.help', '도와줘요', 'Help me') + '</button>' +
      '</div>';
  }

  function renderBuildComplete(kit) {
    return '' +
      '<div class="build-complete">' +
        '🎉 ' + t('learning.build.complete', '모든 단계를 완료했어요!', 'You finished every step!') +
        '<br><small>' + kit.name + ' ' + t('learning.build.next', '완성! 이제 과학 실험과 도전 미션으로 넘어가요.', 'is complete! Move on to the science lab and challenge missions.') + '</small>' +
      '</div>' +
      '<div class="build-step-btns">' +
        '<button type="button" class="build-btn build-lab-btn">🔬 ' + t('learning.lab.title', '과학 실험', 'Science Lab') + '</button>' +
        '<button type="button" class="build-btn build-reset-btn">↺ ' + t('learning.build.reset', '처음부터', 'Restart') + '</button>' +
      '</div>';
  }

  function renderBuildStepper(kitId, kit, progress) {
    var sec = document.getElementById('build-guide');
    if (!sec || !kit) return;
    sec.onclick = null;

    var saved = progress.build || {};
    var currentStep = saved.step || 0;
    var steps = kit.assemblySteps || [];
    var isComplete = currentStep >= steps.length;

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.build.title', '🔨 한 단계씩 만들기', '🔨 Step-by-Step Build') + '</h2>' +
      (isComplete ? renderBuildComplete(kit) : renderBuildStep(steps[currentStep], currentStep, steps.length));

    sec.onclick = function (event) {
      if (event.target.closest('.build-done-btn')) {
        saveProgress(kitId, { build: { step: currentStep + 1 } });
        renderLearningUI();
        return;
      }

      if (event.target.closest('.build-redo-btn')) {
        saveProgress(kitId, { build: { step: Math.max(0, currentStep - 1) } });
        renderLearningUI();
        return;
      }

      if (event.target.closest('.build-help-btn')) {
        var trouble = document.getElementById('troubleshooting');
        if (trouble) trouble.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (event.target.closest('.build-lab-btn')) {
        var lab = document.getElementById('science-lab');
        if (lab) lab.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (event.target.closest('.build-reset-btn')) {
        if (window.confirm(t('learning.build.reset.confirm', '만들기 진행을 처음부터 다시 시작할까요?', 'Restart the build progress from the beginning?'))) {
          saveProgress(kitId, { build: { step: 0 } });
          renderLearningUI();
        }
      }
    };
  }

  function renderTroubleshooter(kitId, kit, progress) {
    var sec = document.getElementById('troubleshooting');
    if (!sec || !kit) return;
    sec.onclick = null;

    var openIdx = progress.trouble && typeof progress.trouble.openIdx === 'number' ? progress.trouble.openIdx : null;
    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.trouble.title', '🤔 왜 안 되지?', '🤔 Why Won\'t It Work?') + '</h2>' +
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
    note.textContent = '👨‍👩‍👧 ' + t('learning.trouble.parent', '그래도 해결이 안 되면 보호자나 선생님에게 알려주세요.', 'If it still does not work, tell a parent or teacher.');
    list.appendChild(note);

    list.onclick = function (event) {
      var btn = event.target.closest('.trouble-symptom-btn');
      if (!btn) return;
      var idx = Number(btn.getAttribute('data-idx'));
      var nextIdx = openIdx === idx ? null : idx;
      saveProgress(kitId, { trouble: { openIdx: nextIdx } });
      renderLearningUI();
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

  function renderScienceLab(kitId, kit) {
    var sec = document.getElementById('science-lab');
    if (!sec || !kit) return;

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.lab.title', '🔬 과학 실험', '🔬 Science Lab') + '</h2>' +
      '<div class="lab-card">' +
        '<div class="lab-question">❓ ' + kit.scienceLab.question + '</div>' +
        '<div class="lab-explanation">' + kit.scienceLab.explanation + '</div>' +
        '<div class="lab-experiment">🧪 <strong>' + t('learning.lab.try', '직접 해봐요!', 'Try it yourself!') + '</strong><br>' + kit.scienceLab.experiment + '</div>' +
        '<div class="lab-concept">💡 <strong>' + t('learning.lab.concept', '핵심 개념', 'Key concept') + ':</strong> ' + kit.scienceLab.concept + '</div>' +
      '</div>';
  }

  function renderMissionCards(kitId, kit, progress) {
    var sec = document.getElementById('mission-cards');
    if (!sec || !kit) return;
    sec.onclick = null;

    var saved = cloneMap(progress.missions);
    var allMissions = getAllMissions(kit);
    var doneCount = Object.keys(saved).filter(function (key) { return saved[key] === true; }).length;
    var typeLabels = {
      required: t('learning.mission.required', '필수', 'Required'),
      inquiry: t('learning.mission.inquiry', '탐구', 'Inquiry'),
      creative: t('learning.mission.creative', '창작', 'Creative')
    };

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.mission.title', '🎯 도전 미션', '🎯 Challenge Missions') + '</h2>' +
      '<p class="student-section-desc">' + t('learning.mission.desc', '도전하고 완료한 미션은 다시 눌러 해제할 수도 있어요.', 'Complete a mission, and tap again if you want to undo it.') + '</p>' +
      '<div class="mission-summary-bar">' +
        '<div class="mission-progress-chip">' + t('learning.mission.progress', '완료한 미션', 'Completed') + ' <strong>' + doneCount + ' / ' + allMissions.length + '</strong></div>' +
        '<button type="button" class="mission-reset-btn">' + t('learning.mission.clear', '미션 초기화', 'Reset missions') + '</button>' +
      '</div>' +
      '<div class="mission-cards-grid" id="mission-cards-grid"></div>' +
      (doneCount === allMissions.length ? '<div class="mission-complete-banner">🏅 ' + t('learning.mission.complete', '도전 미션을 모두 완료했어요!', 'You completed every challenge!') + '</div>' : '');

    var grid = sec.querySelector('#mission-cards-grid');
    allMissions.forEach(function (mission, i) {
      var done = saved[i] === true;
      var card = document.createElement('article');
      card.className = 'mission-card' + (done ? ' done' : '');
      card.innerHTML =
        '<span class="mission-type-badge mission-' + mission.type + '">' + typeLabels[mission.type] + '</span>' +
        '<div class="mission-text">' + mission.text + '</div>' +
        '<button type="button" class="mission-check-btn" data-idx="' + i + '" aria-pressed="' + (done ? 'true' : 'false') + '" aria-label="' + mission.text + ' ' + (done ? t('learning.mission.done', '✅ 완료됨', '✅ Done') : t('learning.mission.check', '완료 표시', 'Mark done')) + '">' +
          (done ? t('learning.mission.done', '✅ 완료됨', '✅ Done') : t('learning.mission.check', '완료 표시', 'Mark done')) +
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
        saveProgress(kitId, { missions: next });
        renderLearningUI();
        return;
      }

      if (event.target.closest('.mission-reset-btn')) {
        if (window.confirm(t('learning.mission.clear.confirm', '도전 미션 표시를 모두 지울까요?', 'Clear all mission checks?'))) {
          saveProgress(kitId, { missions: {} });
          renderLearningUI();
        }
      }
    };
  }

  function renderNotebook(kitId, kit, progress) {
    var sec = document.getElementById('lab-notebook');
    if (!sec || !kit) return;

    var saved = progress.notebook || {};
    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.notebook.title', '📝 기록하기', '📝 Notes') + '</h2>' +
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
        '<button type="button" class="nb-save-btn" id="nb-save-btn">💾 ' + t('learning.notebook.save', '기록 저장하기', 'Save notes') + '</button>' +
        '<div class="nb-saved-msg" id="nb-saved-msg" style="display:none;">✅ ' + t('learning.notebook.saved', '저장됐어요 ✓', 'Saved ✓') + '</div>' +
      '</div>';

    var saveBtn = sec.querySelector('#nb-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        saveProgress(kitId, {
          notebook: {
            nickname: sec.querySelector('#nb-nickname').value,
            hard: sec.querySelector('#nb-hard').value,
            principle: sec.querySelector('#nb-principle').value,
            title: sec.querySelector('#nb-title').value,
            next: sec.querySelector('#nb-next').value,
            savedAt: new Date().toLocaleDateString('ko-KR')
          }
        });
        var msg = sec.querySelector('#nb-saved-msg');
        if (!msg) return;
        msg.style.display = 'block';
        setTimeout(function () { msg.style.display = 'none'; }, 2000);
      });
    }
  }

  function renderCertificate(kitId, kit, progress) {
    var sec = document.getElementById('certificate');
    if (!sec || !kit) return;
    sec.onclick = null;

    var nb = progress.notebook || {};
    var nickname = nb.nickname || t('learning.certificate.defaultName', '도로 탐험가', 'DORO Explorer');
    var today = new Date().toLocaleDateString('ko-KR');

    sec.innerHTML =
      '<h2 class="student-section-title">' + buildSectionTitle('learning.certificate.title', '🏆 인증하기', '🏆 Certificate') + '</h2>' +
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
        '<button type="button" class="cert-print-btn" onclick="window.print()">🖨️ ' + t('learning.certificate.print', '인증서 출력하기', 'Print certificate') + '</button>' +
        '<button type="button" class="cert-reset-btn">' + t('learning.progress.reset', '전체 진행 초기화', 'Reset all progress') + '</button>' +
        '<p class="cert-note">' + t('learning.certificate.note', '닉네임을 바꾸려면 위의 기록하기에서 수정하고 페이지를 새로고침 해요.', 'To change the nickname, update it above and refresh the page.') + '</p>' +
      '</div>';

    sec.onclick = function (event) {
      if (!event.target.closest('.cert-reset-btn')) return;
      if (window.confirm(t('learning.progress.reset.confirm', '이 키트의 진행 기록을 모두 초기화할까요?', 'Reset all saved progress for this kit?'))) {
        resetProgress(kitId);
        renderLearningUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  }

  function addLearningTOC() {
    var toc = document.querySelector('.toc-sidebar');
    if (!toc) return;

    var items = [
      { href: '#photos', label: t('prog.toc.photos', '키트 보기', 'Kit View') },
      { href: '#parts-detective', label: t('prog.toc.components', '구성품 확인', 'Component Check') },
      { href: '#safety-quest', label: t('prog.toc.safety', '안전 약속', 'Safety Promise') },
      { href: '#build-guide', label: t('prog.toc.build', '한 단계씩 만들기', 'Step-by-Step Build') },
      { href: '#troubleshooting', label: t('prog.toc.trouble', '왜 안 되지?', 'Troubleshooting') },
      { href: '#science-lab', label: t('prog.toc.lab', '과학 실험', 'Science Lab') },
      { href: '#mission-cards', label: t('prog.toc.mission', '도전 미션', 'Challenge Missions') },
      { href: '#record-verify', label: t('prog.toc.record', '기록·인증', 'Notes & Certificate') },
      { href: '#resources-media', label: t('prog.toc.resources', '자료·영상', 'Resources & Videos') }
    ];

    var fragment = document.createDocumentFragment();
    items.forEach(function (item, index) {
      var link = document.createElement('a');
      link.href = item.href;
      link.className = 'toc-item' + (index === 0 ? ' active' : '');
      link.innerHTML = '<span class="toc-dot"></span> ' + item.label;
      fragment.appendChild(link);
    });
    toc.innerHTML = '';
    toc.appendChild(fragment);
  }

  function renderLearningUI() {
    var kitId = getKitIdFromPath();
    if (!kitId || !window.DORO_KIT_DATA) return;

    var kit = window.DORO_KIT_DATA[kitId];
    if (!kit) return;

    var progress = loadProgress(kitId);
    handleQREntry();
    renderComponentCheck(kitId, kit, progress);
    renderSafetyQuest(kitId, kit, progress);
    renderBuildStepper(kitId, kit, progress);
    renderTroubleshooter(kitId, kit, progress);
    renderScienceLab(kitId, kit, progress);
    renderMissionCards(kitId, kit, progress);
    renderNotebook(kitId, kit, progress);
    renderCertificate(kitId, kit, progress);
    addLearningTOC();
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderLearningUI();
  });

  window.addEventListener('doro:languagechange', function () {
    renderLearningUI();
  });
})();
