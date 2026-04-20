/* ============================================
   DOROLAND V3 — Learning Portal JavaScript
   학생용 학습 기능: 부품탐정, 안전퀘스트, 조립, 트러블슈팅, 과학실험실, 미션카드, 기록장, 인증서
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

  // ── QR 진입 감지 ──────────────────────────────────
  function handleQREntry(kitId) {
    var params = new URLSearchParams(location.search);
    if (params.get('from') !== 'qr') return;
    var banner = document.createElement('div');
    banner.className = 'qr-entry-banner';
    banner.innerHTML = '<div class="qr-entry-inner"><p class="qr-entry-title">📦 키트를 받으셨나요?</p><div class="qr-entry-btns"><button onclick="document.getElementById(\'parts-detective\').scrollIntoView({behavior:\'smooth\'})" class="qr-btn qr-btn-primary">🔍 부품부터 확인하기</button><button onclick="document.getElementById(\'build-guide\').scrollIntoView({behavior:\'smooth\'})" class="qr-btn qr-btn-secondary">🚀 미션 시작하기</button><button onclick="document.getElementById(\'troubleshooting\').scrollIntoView({behavior:\'smooth\'})" class="qr-btn qr-btn-help">🤔 도와줘요</button></div></div>';
    var hero = document.querySelector('.detail-hero');
    if (hero) hero.insertAdjacentElement('afterend', banner);
  }

  // ── 1. 부품 탐정 ──────────────────────────────────
  function renderPartsDetective(kitId, kit, progress) {
    var sec = document.getElementById('parts-detective');
    if (!sec || !kit) return;
    var saved = progress.parts || {};
    sec.innerHTML = '<h2 class="student-section-title">🔍 부품 탐정</h2><p class="student-section-desc">상자에서 부품을 꺼내 하나씩 확인해요! 찾으면 버튼을 눌러요.</p><div class="parts-grid" id="parts-grid"></div><div class="parts-summary" id="parts-summary"></div>';
    var grid = sec.querySelector('#parts-grid');
    kit.parts.forEach(function(part, i) {
      var found = saved[i] === 'found';
      var missing = saved[i] === 'missing';
      var card = document.createElement('div');
      card.className = 'part-card' + (found ? ' found' : missing ? ' missing' : '');
      card.innerHTML = '<div class="part-emoji">' + part.emoji + '</div><div class="part-name">' + part.name + '</div><div class="part-role">' + part.role + '</div><div class="part-check">💡 ' + part.check + '</div><div class="part-btns"><button class="part-btn found-btn' + (found ? ' active' : '') + '" data-idx="' + i + '" data-state="found">찾았어요! ✓</button><button class="part-btn missing-btn' + (missing ? ' active' : '') + '" data-idx="' + i + '" data-state="missing">없어요</button></div>' + (missing ? '<div class="part-missing-msg">👨‍👩‍👧 보호자에게 알려주세요. 고객지원: doroedu.net</div>' : '');
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
      renderPartsDetective(kitId, kit, loadProgress(kitId));
    });
    updatePartsSummary(sec, kit, loadProgress(kitId).parts || {});
  }

  function updatePartsSummary(sec, kit, saved) {
    var summary = sec.querySelector('#parts-summary');
    if (!summary) return;
    var total = kit.parts.length;
    var found = Object.values(saved).filter(function(v) { return v === 'found'; }).length;
    var missing = Object.values(saved).filter(function(v) { return v === 'missing'; }).length;
    if (found === total) {
      summary.innerHTML = '<div class="parts-complete">🎉 모든 부품을 찾았어요! 안전 퀘스트로 이동해요!</div>';
    } else {
      summary.innerHTML = '<div class="parts-progress">확인한 부품: ' + (found + missing) + '/' + total + '</div>';
    }
  }

  // ── 2. 안전 퀘스트 ──────────────────────────────────
  function renderSafetyQuest(kitId, kit, progress) {
    var sec = document.getElementById('safety-quest');
    if (!sec || !kit) return;
    var saved = progress.safety || {};
    var allPassed = saved.passed === true;
    if (allPassed) {
      sec.innerHTML = '<h2 class="student-section-title">🛡 안전 퀘스트</h2><div class="safety-pass-badge">🎖 안전 대원 배지를 얻었어요!<br><small>이미 안전 퀘스트를 통과했어요.</small></div>';
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
    sec.innerHTML = '<h2 class="student-section-title">🛡 안전 퀘스트</h2><p class="student-section-desc">만들기 전에 안전을 먼저 확인해요! (' + (quizIdx + 1) + '/' + quiz.length + ')</p><div class="safety-quiz-card"><div class="safety-q-text">' + q.q + '</div><div class="safety-q-btns"><button class="safety-btn safety-o" data-answer="true">⭕ 맞아요</button><button class="safety-btn safety-x" data-answer="false">❌ 아니에요</button></div><div class="safety-feedback" id="safety-feedback"></div></div><div class="safety-progress">안전 퀘스트 진행: ' + quizIdx + '/' + quiz.length + '</div>';
    sec.querySelectorAll('.safety-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var userAnswer = this.dataset.answer === 'true';
        var feedback = sec.querySelector('#safety-feedback');
        if (userAnswer === q.answer) {
          feedback.innerHTML = '<div class="safety-correct">✅ 맞아요! 안전 대원이에요!</div>';
          setTimeout(function() {
            saveProgress(kitId, { safety: { quizIdx: quizIdx + 1 } });
            renderSafetyQuest(kitId, kit, loadProgress(kitId));
          }, 1200);
        } else {
          feedback.innerHTML = '<div class="safety-wrong">🔄 다시 확인해볼까요?</div>';
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
    sec.innerHTML = '<h2 class="student-section-title">🔨 한 단계씩 만들기</h2>' + (isComplete ? renderBuildComplete(kit) : renderBuildStep(steps[currentStep], currentStep, steps.length));
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
    return '<div class="build-step-card"><div class="build-step-num">' + step.step + ' / ' + total + '</div><div class="build-step-title">' + step.title + '</div><div class="build-step-detail">' + step.detail + '</div>' + (step.tip ? '<div class="build-step-tip">💡 ' + step.tip + '</div>' : '') + '<div class="build-step-progress-bar"><div class="build-step-progress-fill" style="width:' + (idx / total * 100) + '%"></div></div></div><div class="build-step-btns"><button class="build-btn build-done-btn">✅ 완료했어요</button>' + (idx > 0 ? '<button class="build-btn build-redo-btn">🔄 이전 단계</button>' : '') + '<button class="build-btn build-help-btn">🤔 도와줘요</button></div>';
  }

  function renderBuildComplete(kit) {
    return '<div class="build-complete">🎉 모든 단계를 완료했어요!<br><small>' + kit.name + '를 완성했어요! 과학 실험실로 이동해요.</small></div>';
  }

  // ── 4. 왜 안 되지? 오류 해결 ───────────────────────
  function renderTroubleshooter(kitId, kit) {
    var sec = document.getElementById('troubleshooting');
    if (!sec || !kit) return;
    sec.innerHTML = '<h2 class="student-section-title">🤔 왜 안 되지?</h2><p class="student-section-desc">문제가 생겼나요? 아래에서 증상을 골라요!</p><div class="trouble-list" id="trouble-list"></div>';
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
    sec.innerHTML = '<h2 class="student-section-title">🔬 과학 원리 실험실</h2><div class="lab-card"><div class="lab-question">❓ ' + kit.scienceLab.question + '</div><div class="lab-explanation">' + kit.scienceLab.explanation + '</div><div class="lab-experiment">🧪 <strong>직접 해봐요!</strong><br>' + kit.scienceLab.experiment + '</div><div class="lab-concept">💡 <strong>핵심 개념:</strong> ' + kit.scienceLab.concept + '</div></div>';
  }

  // ── 6. 미션 카드 ──────────────────────────────────
  function renderMissionCards(kitId, kit, progress) {
    var sec = document.getElementById('mission-cards');
    if (!sec || !kit) return;
    var saved = progress.missions || {};
    sec.innerHTML = '<h2 class="student-section-title">🎯 미션 카드</h2><p class="student-section-desc">미션을 완료하면 체크해요!</p><div class="mission-cards-grid" id="mission-cards-grid"></div>';
    var grid = sec.querySelector('#mission-cards-grid');
    var allMissions = kit.missions.required.map(function(m) { return { text: m, type: 'required' }; })
      .concat(kit.missions.inquiry.map(function(m) { return { text: m, type: 'inquiry' }; }))
      .concat(kit.missions.creative.map(function(m) { return { text: m, type: 'creative' }; }));
    var typeLabels = { required: '🎯 필수', inquiry: '🔭 탐구', creative: '✨ 창작' };
    allMissions.forEach(function(m, i) {
      var done = saved[i] === true;
      var card = document.createElement('div');
      card.className = 'mission-card' + (done ? ' done' : '');
      card.innerHTML = '<span class="mission-type-badge mission-' + m.type + '">' + typeLabels[m.type] + '</span><div class="mission-text">' + m.text + '</div><button class="mission-check-btn" data-idx="' + i + '">' + (done ? '✅ 완료!' : '체크하기') + '</button>';
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
    sec.innerHTML = '<h2 class="student-section-title">📓 나만의 실험 기록장</h2><p class="student-section-desc">오늘 만든 것을 기록해 두어요!</p><div class="notebook-form"><label>닉네임 <span class="optional">(선택)</span></label><input type="text" id="nb-nickname" class="nb-input" maxlength="20" placeholder="닉네임을 입력하세요" value="' + (saved.nickname || '') + '"><label>가장 어려웠던 단계는?</label><input type="text" id="nb-hard" class="nb-input" maxlength="100" placeholder="예: 케이블 연결하기" value="' + (saved.hard || '') + '"><label>내가 발견한 과학 원리는?</label><input type="text" id="nb-principle" class="nb-input" maxlength="100" placeholder="예: 빛이 어두울수록 LED가 켜졌어요" value="' + (saved.principle || '') + '"><label>작품 이름은?</label><input type="text" id="nb-title" class="nb-input" maxlength="50" placeholder="예: 내 판다 스피커" value="' + (saved.title || '') + '"><label>다음에 바꾸고 싶은 점은?</label><input type="text" id="nb-next" class="nb-input" maxlength="100" placeholder="예: 더 밝은 LED로 바꾸고 싶어요" value="' + (saved.next || '') + '"><button class="nb-save-btn" id="nb-save-btn">💾 기록 저장하기</button><div class="nb-saved-msg" id="nb-saved-msg" style="display:none;">✅ 저장됐어요!</div></div>';
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
    sec.innerHTML = '<h2 class="student-section-title">🏆 완성 인증서</h2><div class="certificate-card" id="certificate-card"><div class="cert-header"><div class="cert-logo">DORO</div><div class="cert-title">어린이 메이커 인증서</div></div><div class="cert-body"><div class="cert-name">' + nickname + '</div><div class="cert-text">' + kit.certificateText.replace(/\n/g, '<br>') + '</div><div class="cert-kit">키트: ' + kit.name + ' — ' + kit.subtitle + '</div><div class="cert-date">완료일: ' + today + '</div></div><div class="cert-footer">DOROLAND V3 · DORO DIMC 홈러닝 키트</div></div><div class="cert-btns"><button class="cert-print-btn" onclick="window.print()">🖨️ 인증서 출력하기</button><p class="cert-note">닉네임을 바꾸려면 위의 실험 기록장에서 수정하고 페이지를 새로고침 해요.</p></div>';
  }

  // ── 초기화 ─────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    var kitId = getKitIdFromPath();
    if (!kitId || !window.DORO_KIT_DATA) return;
    var kit = window.DORO_KIT_DATA[kitId];
    if (!kit) return;
    var progress = loadProgress(kitId);
    handleQREntry(kitId);
    renderPartsDetective(kitId, kit, progress);
    renderSafetyQuest(kitId, kit, progress);
    renderBuildStepper(kitId, kit, progress);
    renderTroubleshooter(kitId, kit);
    renderScienceLab(kitId, kit, progress);
    renderMissionCards(kitId, kit, progress);
    renderNotebook(kitId, kit, progress);
    renderCertificate(kitId, kit, progress);
    addLearningTOC();
  });

  function addLearningTOC() {
    var toc = document.querySelector('.toc-sidebar');
    if (!toc) return;
    var items = [
      { href: '#parts-detective', label: '🔍 부품 탐정' },
      { href: '#safety-quest', label: '🛡 안전 퀘스트' },
      { href: '#build-guide', label: '🔨 만들기' },
      { href: '#troubleshooting', label: '🤔 왜 안 되지?' },
      { href: '#science-lab', label: '🔬 과학 실험실' },
      { href: '#mission-cards', label: '🎯 미션' },
      { href: '#lab-notebook', label: '📓 기록장' },
      { href: '#certificate', label: '🏆 인증서' }
    ];
    items.forEach(function(item) {
      var a = document.createElement('a');
      a.href = item.href;
      a.className = 'toc-item';
      a.innerHTML = '<span class="toc-dot"></span> ' + item.label;
      toc.appendChild(a);
    });
  }

})();
