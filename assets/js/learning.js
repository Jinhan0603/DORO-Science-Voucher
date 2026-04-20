/* ============================================
   DOROLAND V3 — Learning Portal JavaScript
   학생용 학습 기능: 부품 확인 미션, 안전퀘스트, 조립, 트러블슈팅, 과학실험실, 미션카드, 기록장, 인증서
   localStorage 기반, 백엔드 없음, GitHub Pages 동작
   ============================================ */

(function () {
  'use strict';

  // ── 유틸 ──────────────────────────────────────────
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
    } catch (e) { /* localStorage 불가 환경 무시 */ }
  }

  function loadProgress(kitId) {
    try {
      var raw = localStorage.getItem(getProgressKey(kitId));
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
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

  // ── QR 진입 감지 ──────────────────────────────────
  function handleQREntry(kitId) {
    var params = new URLSearchParams(location.search);
    if (params.get('from') !== 'qr') return;
    var existing = document.querySelector('.qr-entry-banner');
    if (existing) existing.remove();
    var qrTitle = getLang() === 'en' ? 'Did you get your kit?' : '키트를 받으셨나요?';
    var banner = document.createElement('div');
    banner.className = 'qr-entry-banner';
    banner.innerHTML = '<div class="qr-entry-inner"><p class="qr-entry-title">📦 ' + qrTitle + '</p><div class="qr-entry-btns"><button onclick="document.getElementById(\'parts-detective\').scrollIntoView({behavior:\'smooth\'})" class="qr-btn qr-btn-primary">🔍 ' + t('learning.parts.title', '구성품 확인', 'Component Check').replace(/^[^\s가-힣A-Za-z0-9]+/, '') + '</button><button onclick="document.getElementById(\'build-guide\').scrollIntoView({behavior:\'smooth\'})" class="qr-btn qr-btn-help">🚀 ' + t('learning.build.title', '만들기 시작', 'Start Building').replace('🔨 ', '').replace('Step-by-Step Build', 'Start Building') + '</button></div></div>';
    var hero = document.querySelector('.detail-hero');
    if (hero) hero.insertAdjacentElement('afterend', banner);
  }

  // ── 1. 구성품 확인 ─────────────────────────────
  function renderComponentCheck(kitId, kit, progress) {
    var sec = document.getElementById('parts-detective');
    if (!sec || !kit) return;
    var saved = progress.parts || {};
    sec.innerHTML = '<h2 class="student-section-title">' + t('learning.parts.title', '🔍 구성품 확인', '🔍 Component Check') + '</h2><p class="student-section-desc">' + t('learning.parts.desc', '상자 안의 부품을 하나씩 찾아요. 부품의 이름, 역할, 찾는 힌트를 확인하고 ‘있어요’ 또는 ‘없어요’를 선택하세요.', 'Find each item in the box one by one. Check the part name, what it does, and the hint for finding it, then choose “Have it ✓” or “Missing.”') + '</p><div class="parts-grid" id="parts-grid"></div><div class="parts-summary" id="parts-summary"></div>';
    var grid = sec.querySelector('#parts-grid');
    kit.parts.forEach(function(part, i) {
      var found = saved[i] === 'found';
      var missing = saved[i] === 'missing';
      var card = document.createElement('div');
      card.className = 'part-card' + (found ? ' found' : missing ? ' missing' : '');
      card.innerHTML = '<div class="part-emoji">' + part.emoji + '</div><div class="part-name">' + part.name + '</div><div class="part-role-label">' + t('learning.parts.role', '역할', 'What it does') + '</div><div class="part-role">' + part.role + '</div><div class="part-check-label">' + t('learning.parts.check', '찾는 힌트', 'Find hint') + '</div><div class="part-check">💡 ' + part.check + '</div><div class="part-btns"><button class="part-btn found-btn' + (found ? ' active' : '') + '" data-idx="' + i + '" data-state="found">' + t('learning.parts.found', '있어요 ✓', 'Have it ✓') + '</button><button class="part-btn missing-btn' + (missing ? ' active' : '') + '" data-idx="' + i + '" data-state="missing">' + t('learning.parts.missing', '없어요', 'Missing') + '</button></div>' + (missing ? '<div class="part-missing-msg">👨‍👩‍👧 보호자에게 알려주세요. 고객지원: doroedu.net</div>' : '');
      grid.appendChild(card);
    });
    grid.addEventListener('click', function(e) {
      var btn = e.target.closest('.part-btn');
      if (!btn) return;
      var idx = btn.dataset.idx;
      var state = btn.dataset.state;
      var update = {};
      update[idx] = state;
      saveProgress(kitId, { parts: Object.assign(saved, update) });
      renderComponentCheck(kitId, kit, loadProgress(kitId));
    });
    updateComponentCheckSummary(sec, kit, loadProgress(kitId).parts || {});
  }

  function updateComponentCheckSummary(sec, kit, saved) {
    var summary = sec.querySelector('#parts-summary');
    if (!summary) return;
    var total = kit.parts.length;
    var found = Object.values(saved).filter(function(v) { return v === 'found'; }).length;
    var missing = Object.values(saved).filter(function(v) { return v === 'missing'; }).length;
    if (found === total) {
      summary.innerHTML = '<div class="parts-complete">' + t('learning.parts.complete', '🎉 모든 부품을 찾았어요! 안전 약속으로 이동해요!', '🎉 You found every part! Move on to the Safety Promise.') + '</div>';
    } else {
      summary.innerHTML = '<div class="parts-progress">' + t('learning.parts.progress', '확인한 부품', 'Checked parts') + ': ' + (found + missing) + '/' + total + '</div>';
    }
  }

  // ── 2. 안전 약속 ──────────────────────────────────
  function renderSafetyQuest(kitId, kit, progress) {
    var sec = document.getElementById('safety-quest');
    if (!sec || !kit) return;
    var saved = progress.safety || {};
    var allPassed = saved.passed === true;
    if (allPassed) {
      sec.innerHTML = '<h2 class="student-section-title">' + t('learning.safety.title', '🛡 안전 약속', '🛡 Safety Promise') + '</h2><div class="safety-pass-badge">' + t('learning.safety.pass', '🎖 안전 대원 배지를 얻었어요!', '🎖 You earned the Safety Cadet badge!') + '<br><small>' + t('learning.safety.done', '이미 안전 약속을 모두 확인했어요.', 'You already completed the safety promise.') + '</small></div>';
      return;
    }
    var quizIdx = saved.quizIdx || 0;
    var quiz = kit.safetyQuiz;
    if (quizIdx >= quiz.length) {
      saveProgress(kitId, { safety: { passed: true, quizIdx: quiz.length } });
      renderSafetyQuest(kitId, kit, loadProgress(kitId));
      return;
    }
    var q = quiz[quizIdx];
    sec.innerHTML = '<h2 class="student-section-title">' + t('learning.safety.title', '🛡 안전 약속', '🛡 Safety Promise') + '</h2><p class="student-section-desc">' + t('learning.safety.desc', '만들기 전에 안전 약속을 먼저 확인해요!', 'Check the safety promise before you start building!') + ' (' + (quizIdx + 1) + '/' + quiz.length + ')</p><div class="safety-quiz-card"><div class="safety-q-text">' + q.q + '</div><div class="safety-q-btns"><button class="safety-btn safety-o" data-answer="true">⭕ ' + t('learning.safety.yes', '맞아요', 'Yes') + '</button><button class="safety-btn safety-x" data-answer="false">❌ ' + t('learning.safety.no', '아니에요', 'No') + '</button></div><div class="safety-feedback" id="safety-feedback"></div></div><div class="safety-progress">' + t('learning.safety.progress', '안전 약속 진행', 'Safety progress') + ': ' + quizIdx + '/' + quiz.length + '</div>';
    sec.querySelectorAll('.safety-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var userAnswer = this.dataset.answer === 'true';
        var feedback = sec.querySelector('#safety-feedback');
        if (userAnswer === q.answer) {
          feedback.innerHTML = '<div class="safety-correct">✅ ' + t('learning.safety.correct', '맞아요! 안전 대원이에요 ✓', 'Correct! You\'re a safety cadet ✓') + '</div>';
          setTimeout(function() {
            saveProgress(kitId, { safety: { quizIdx: quizIdx + 1 } });
            renderSafetyQuest(kitId, kit, loadProgress(kitId));
          }, 1200);
        } else {
          feedback.innerHTML = '<div class="safety-wrong">🔄 ' + t('learning.safety.wrong', '다시 확인해볼까요?', 'Let\'s check again?') + '</div>';
          setTimeout(function() { feedback.innerHTML = ''; }, 1500);
        }
      });
    });
  }

  // ── 3. 한 단계씩 조립 모드 ──────────────────────────
  function renderBuildStepper(kitId, kit, progress) {
    var sec = document.getElementById('build-guide');
    if (!sec || !kit) return;
    var saved = progress.build || {};
    var currentStep = saved.step || 0;
    var steps = kit.assemblySteps;
    var isComplete = currentStep >= steps.length;
    sec.innerHTML = '<h2 class="student-section-title">' + t('learning.build.title', '🔨 한 단계씩 만들기', '🔨 Step-by-Step Build') + '</h2>' + (isComplete ? renderBuildComplete(kit) : renderBuildStep(steps[currentStep], currentStep, steps.length));
    if (!isComplete) {
      var doneBtn = sec.querySelector('.build-done-btn');
      var redoBtn = sec.querySelector('.build-redo-btn');
      var helpBtn = sec.querySelector('.build-help-btn');
      if (doneBtn) doneBtn.addEventListener('click', function() {
        saveProgress(kitId, { build: { step: currentStep + 1 } });
        renderBuildStepper(kitId, kit, loadProgress(kitId));
      });
      if (redoBtn) redoBtn.addEventListener('click', function() {
        saveProgress(kitId, { build: { step: Math.max(0, currentStep - 1) } });
        renderBuildStepper(kitId, kit, loadProgress(kitId));
      });
      if (helpBtn) helpBtn.addEventListener('click', function() {
        var ts = document.getElementById('troubleshooting');
        if (ts) ts.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function renderBuildStep(step, idx, total) {
    return '<div class="build-step-card"><div class="build-step-num">' + step.step + ' / ' + total + '</div><div class="build-step-title">' + step.title + '</div><div class="build-step-detail">' + step.detail + '</div>' + (step.tip ? '<div class="build-step-tip">💡 ' + step.tip + '</div>' : '') + '<div class="build-step-progress-bar"><div class="build-step-progress-fill" style="width:' + (idx / total * 100) + '%"></div></div></div><div class="build-step-btns"><button class="build-btn build-done-btn">✅ ' + t('learning.build.done', '완료했어요 ✓', 'Done ✓') + '</button>' + (idx > 0 ? '<button class="build-btn build-redo-btn">🔄 ' + t('learning.build.redo', '이전 단계', 'Previous Step') + '</button>' : '') + '<button class="build-btn build-help-btn">🤔 ' + t('learning.build.help', '도와줘요', 'Help me') + '</button></div>';
  }

  function renderBuildComplete(kit) {
    return '<div class="build-complete">🎉 ' + t('learning.build.complete', '모든 단계를 완료했어요!', 'You finished every step!') + '<br><small>' + kit.name + t('learning.build.next', '를 완성했어요! 과학 실험으로 이동해요.', ' is complete! Move on to the science lab.') + '</small></div>';
  }

  // ── 4. 왜 안 되지? 오류 해결 ───────────────────────
  function renderTroubleshooter(kitId, kit) {
    var sec = document.getElementById('troubleshooting');
    if (!sec || !kit) return;
    sec.innerHTML = '<h2 class="student-section-title">' + t('learning.trouble.title', '🤔 왜 안 되지?', '🤔 Why Won\'t It Work?') + '</h2><p class="student-section-desc">' + t('learning.trouble.desc', '문제가 생겼나요? 아래에서 증상을 골라요!', 'Something not working? Pick the symptom below!') + '</p><div class="trouble-list" id="trouble-list"></div>';
    var list = sec.querySelector('#trouble-list');
    kit.troubleshooting.forEach(function(item, i) {
      var btn = document.createElement('button');
      btn.className = 'trouble-symptom-btn';
      btn.textContent = item.symptom;
      btn.addEventListener('click', function() { showTroubleSteps(list, item, i); });
      list.appendChild(btn);
    });
    var parentNote = document.createElement('div');
    parentNote.className = 'trouble-parent-note';
    parentNote.innerHTML = '👨‍👩‍👧 그래도 해결이 안 되면 보호자/교사에게 알려주세요.';
    list.appendChild(parentNote);
  }

  function showTroubleSteps(list, item, idx) {
    var existing = list.querySelector('.trouble-steps-card');
    if (existing) existing.remove();
    var card = document.createElement('div');
    card.className = 'trouble-steps-card';
    card.innerHTML = '<div class="trouble-steps-title">' + item.symptom + '</div><ol class="trouble-steps-list">' + item.steps.map(function(s) { return '<li>' + s + '</li>'; }).join('') + '</ol><button class="trouble-close-btn" onclick="this.parentElement.remove()">닫기</button>';
    list.querySelectorAll('.trouble-symptom-btn')[idx].insertAdjacentElement('afterend', card);
  }

  // ── 5. 과학 원리 실험실 ──────────────────────────────
  function renderScienceLab(kitId, kit, progress) {
    var sec = document.getElementById('science-lab');
    if (!sec || !kit) return;
    sec.innerHTML = '<h2 class="student-section-title">' + t('learning.lab.title', '🔬 과학 실험', '🔬 Science Lab') + '</h2><div class="lab-card"><div class="lab-question">❓ ' + kit.scienceLab.question + '</div><div class="lab-explanation">' + kit.scienceLab.explanation + '</div><div class="lab-experiment">🧪 <strong>' + t('learning.lab.try', '직접 해봐요!', 'Try it yourself!') + '</strong><br>' + kit.scienceLab.experiment + '</div><div class="lab-concept">💡 <strong>' + t('learning.lab.concept', '핵심 개념:', 'Key concept:') + '</strong> ' + kit.scienceLab.concept + '</div></div>';
  }

  // ── 6. 미션 카드 ──────────────────────────────────
  function renderMissionCards(kitId, kit, progress) {
    var sec = document.getElementById('mission-cards');
    if (!sec || !kit) return;
    var saved = progress.missions || {};
    sec.innerHTML = '<h2 class="student-section-title">' + t('learning.mission.title', '🎯 도전 미션', '🎯 Challenge Missions') + '</h2><p class="student-section-desc">' + t('learning.mission.desc', '도전해 보고 완료하면 체크해요!', 'Try each challenge and check it off when you finish!') + '</p><div class="mission-cards-grid" id="mission-cards-grid"></div>';
    var grid = sec.querySelector('#mission-cards-grid');
    var allMissions = kit.missions.required.map(function(m) { return { text: m, type: 'required' }; })
      .concat(kit.missions.inquiry.map(function(m) { return { text: m, type: 'inquiry' }; }))
      .concat(kit.missions.creative.map(function(m) { return { text: m, type: 'creative' }; }));
    var typeLabels = {
      required: t('learning.mission.required', '🎯 필수', '🎯 Required'),
      inquiry: t('learning.mission.inquiry', '🔭 탐구', '🔭 Inquiry'),
      creative: t('learning.mission.creative', '✨ 창작', '✨ Creative')
    };
    allMissions.forEach(function(m, i) {
      var done = saved[i] === true;
      var card = document.createElement('div');
      card.className = 'mission-card' + (done ? ' done' : '');
      card.innerHTML = '<span class="mission-type-badge mission-' + m.type + '">' + typeLabels[m.type] + '</span><div class="mission-text">' + m.text + '</div><button class="mission-check-btn" data-idx="' + i + '">' + (done ? t('learning.mission.done', '✅ 완료!', '✅ Done!') : t('learning.mission.check', '체크하기', 'Check off')) + '</button>';
      grid.appendChild(card);
    });
    grid.addEventListener('click', function(e) {
      var btn = e.target.closest('.mission-check-btn');
      if (!btn) return;
      var idx = btn.dataset.idx;
      var update = {};
      update[idx] = true;
      saveProgress(kitId, { missions: Object.assign(saved, update) });
      renderMissionCards(kitId, kit, loadProgress(kitId));
    });
  }

  // ── 7. 나만의 실험 기록장 ─────────────────────────
  function renderNotebook(kitId, kit, progress) {
    var sec = document.getElementById('lab-notebook');
    if (!sec || !kit) return;
    var saved = progress.notebook || {};
    sec.innerHTML = '<h2 class="student-section-title">' + t('learning.notebook.title', '📝 기록하기', '📝 Record It') + '</h2><p class="student-section-desc">' + t('learning.notebook.desc', '오늘 만든 것과 배운 내용을 기록해 두어요!', 'Write down what you built and what you learned today!') + '</p><div class="notebook-form"><label>' + t('learning.notebook.nickname', '닉네임', 'Nickname') + ' <span class="optional">(' + t('learning.notebook.optional', '선택', 'Optional') + ')</span></label><input type="text" id="nb-nickname" class="nb-input" maxlength="20" placeholder="' + t('learning.nickname.prompt', '닉네임을 입력하세요 (선택)', 'Enter a nickname (optional)') + '" value="' + (saved.nickname || '') + '"><label>' + t('learning.notebook.hard', '가장 어려웠던 단계는?', 'Which step was the hardest?') + '</label><input type="text" id="nb-hard" class="nb-input" maxlength="100" placeholder="' + t('learning.notebook.hard.placeholder', '예: 케이블 연결하기', 'Ex: Connecting the cables') + '" value="' + (saved.hard || '') + '"><label>' + t('learning.notebook.principle', '내가 발견한 과학 원리는?', 'What science idea did I discover?') + '</label><input type="text" id="nb-principle" class="nb-input" maxlength="100" placeholder="' + t('learning.notebook.principle.placeholder', '예: 빛이 어두울수록 LED가 켜졌어요', 'Ex: The LED turned on when it got darker') + '" value="' + (saved.principle || '') + '"><label>' + t('learning.notebook.titleField', '작품 이름은?', 'What is your project name?') + '</label><input type="text" id="nb-title" class="nb-input" maxlength="50" placeholder="' + t('learning.notebook.title.placeholder', '예: 내 판다 스피커', 'Ex: My Panda Speaker') + '" value="' + (saved.title || '') + '"><label>' + t('learning.notebook.next', '다음에 바꾸고 싶은 점은?', 'What would you change next time?') + '</label><input type="text" id="nb-next" class="nb-input" maxlength="100" placeholder="' + t('learning.notebook.next.placeholder', '예: 더 밝은 LED로 바꾸고 싶어요', 'Ex: I want to use a brighter LED') + '" value="' + (saved.next || '') + '"><button class="nb-save-btn" id="nb-save-btn">💾 ' + t('learning.notebook.save', '기록 저장하기', 'Save notes') + '</button><div class="nb-saved-msg" id="nb-saved-msg" style="display:none;">✅ ' + t('learning.notebook.saved', '저장됐어요 ✓', 'Saved ✓') + '</div></div>';
    sec.querySelector('#nb-save-btn').addEventListener('click', function() {
      var data = {
        notebook: {
          nickname: sec.querySelector('#nb-nickname').value,
          hard: sec.querySelector('#nb-hard').value,
          principle: sec.querySelector('#nb-principle').value,
          title: sec.querySelector('#nb-title').value,
          next: sec.querySelector('#nb-next').value,
          savedAt: new Date().toLocaleDateString('ko-KR')
        }
      };
      saveProgress(kitId, data);
      var msg = sec.querySelector('#nb-saved-msg');
      msg.style.display = 'block';
      setTimeout(function() { msg.style.display = 'none'; }, 2000);
    });
  }

  // ── 8. 완성 인증서 ──────────────────────────────────
  function renderCertificate(kitId, kit, progress) {
    var sec = document.getElementById('certificate');
    if (!sec || !kit) return;
    var nb = progress.notebook || {};
    var nickname = nb.nickname || '도로 탐험가';
    var today = new Date().toLocaleDateString('ko-KR');
    sec.innerHTML = '<h2 class="student-section-title">' + t('learning.certificate.title', '🏆 인증하기', '🏆 Verify It') + '</h2><div class="certificate-card" id="certificate-card"><div class="cert-header"><div class="cert-logo">DORO</div><div class="cert-title">' + t('learning.certificate.name', '어린이 메이커 인증서', 'Young Maker Certificate') + '</div></div><div class="cert-body"><div class="cert-name">' + nickname + '</div><div class="cert-text">' + kit.certificateText.replace(/\n/g, '<br>') + '</div><div class="cert-kit">' + t('learning.certificate.kit', '키트', 'Kit') + ': ' + kit.name + ' — ' + kit.subtitle + '</div><div class="cert-date">' + t('learning.certificate.date', '완료일', 'Completed') + ': ' + today + '</div></div><div class="cert-footer">DOROLAND V3 · DORO DIMC 홈러닝 키트</div></div><div class="cert-btns"><button class="cert-print-btn" onclick="window.print()">🖨️ ' + t('learning.certificate.print', '인증서 출력하기', 'Print certificate') + '</button><p class="cert-note">' + t('learning.certificate.note', '닉네임을 바꾸려면 위의 기록하기에서 수정하고 페이지를 새로고침 해요.', 'To change the nickname, update it in Record It above and refresh the page.') + '</p></div>';
  }

  function renderLearningUI() {
    var kitId = getKitIdFromPath();
    if (!kitId || !window.DORO_KIT_DATA) return;
    var kit = window.DORO_KIT_DATA[kitId];
    if (!kit) return;
    var progress = loadProgress(kitId);
    handleQREntry(kitId);
    renderComponentCheck(kitId, kit, progress);
    renderSafetyQuest(kitId, kit, progress);
    renderBuildStepper(kitId, kit, progress);
    renderTroubleshooter(kitId, kit);
    renderScienceLab(kitId, kit, progress);
    renderMissionCards(kitId, kit, progress);
    renderNotebook(kitId, kit, progress);
    renderCertificate(kitId, kit, progress);
    addLearningTOC();
  }

  // ── 초기화 ─────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    renderLearningUI();
  });

  window.addEventListener('doro:languagechange', function() {
    renderLearningUI();
  });

  function addLearningTOC() {
    var toc = document.querySelector('.toc-sidebar');
    if (!toc) return;
    var items = [
      { href: '#photos', label: t('prog.toc.photos', '키트 보기', 'Kit View') },
      { href: '#parts-detective', label: t('prog.toc.components', '구성품 확인', 'Component Check') },
      { href: '#safety-quest', label: t('prog.toc.safety', '안전 약속', 'Safety Promise') },
      { href: '#build-guide', label: t('prog.toc.build', '한 단계씩 만들기', 'Step-by-Step Build') },
      { href: '#troubleshooting', label: t('prog.toc.trouble', '왜 안 되지?', 'Why Won\'t It Work?') },
      { href: '#science-lab', label: t('prog.toc.lab', '과학 실험', 'Science Lab') },
      { href: '#mission-cards', label: t('prog.toc.mission', '도전 미션', 'Challenge Missions') },
      { href: '#record-verify', label: t('prog.toc.record', '기록·인증', 'Record & Verify') },
      { href: '#resources-media', label: t('prog.toc.resources', '자료·영상', 'Resources & Videos') }
    ];
    var existingByHref = {};
    Array.prototype.slice.call(toc.querySelectorAll('.toc-item')).forEach(function(link) {
      var href = link.getAttribute('href');
      if (!href) return;
      if (!existingByHref[href]) {
        existingByHref[href] = link;
      } else {
        link.remove();
      }
    });
    var fragment = document.createDocumentFragment();
    items.forEach(function(item, index) {
      var link = existingByHref[item.href] || document.createElement('a');
      link.href = item.href;
      link.className = 'toc-item' + (index === 0 ? ' active' : '');
      link.innerHTML = '<span class="toc-dot"></span> ' + item.label;
      fragment.appendChild(link);
    });
    toc.innerHTML = '';
    toc.appendChild(fragment);
  }

})();
