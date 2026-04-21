(function () {
  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getGuide() {
    const kitId = document.body.dataset.kitId;
    if (!kitId || !window.DORO_ASSEMBLY_GUIDES) return null;
    return window.DORO_ASSEMBLY_GUIDES[kitId] || null;
  }

  function getStepStorageKey() {
    return 'doro-assembly-step-' + window.location.pathname;
  }

  function getCurrentStep(totalSteps) {
    const saved = Number.parseInt(localStorage.getItem(getStepStorageKey()) || '1', 10);
    if (!Number.isFinite(saved)) return 1;
    return Math.min(Math.max(saved, 1), totalSteps);
  }

  function setCurrentStep(step, totalSteps) {
    const safeStep = Math.min(Math.max(step, 1), totalSteps);
    localStorage.setItem(getStepStorageKey(), String(safeStep));
  }

  function renderStartResources(guide) {
    const grid = document.querySelector('#start-resources .resource-grid');
    if (!grid) return;

    grid.innerHTML =
      '<article class="resource-card">' +
      '<h3>조립 설명서</h3>' +
      '<p>설명서 PDF를 열어 전체 순서를 먼저 훑어보면 중간에 덜 멈춰요.</p>' +
      '<div class="resource-actions">' +
      '<a href="' +
      guide.guidePdf +
      '" target="_blank" rel="noreferrer" class="button-secondary">PDF 보기</a>' +
      '</div>' +
      '</article>' +
      '<article class="resource-card">' +
      '<h3>조립 영상</h3>' +
      '<p>손으로 끼우는 방향이 헷갈릴 때는 조립 영상을 같이 보면 더 쉬워요.</p>' +
      '<div class="resource-actions">' +
      '<a href="' +
      guide.assemblyVideo +
      '" target="_blank" rel="noreferrer" class="button-secondary">영상 보기</a>' +
      '</div>' +
      '</article>' +
      '<article class="resource-card">' +
      '<h3>작동 영상</h3>' +
      '<p>완성 뒤 어떤 모습이 맞는지 미리 보면 마지막 확인이 빨라져요.</p>' +
      '<div class="resource-actions">' +
      '<a href="' +
      guide.demoVideo +
      '" target="_blank" rel="noreferrer" class="button-secondary">완성 모습 보기</a>' +
      '</div>' +
      '</article>';
  }

  function renderPartsReference(guide) {
    const section = document.getElementById('component-check');
    if (!section || section.querySelector('.parts-reference-card')) return;

    const card = document.createElement('div');
    const imageMarkup = guide.parts.image
      ? '<img src="' +
        guide.parts.image +
        '" alt="' +
        escapeHtml(guide.parts.alt) +
        '" loading="eager">'
      : '<div class="parts-fallback" aria-hidden="true">' + escapeHtml(guide.parts.fallbackEmoji || '🧩') + '</div>';

    const highlights = Array.isArray(guide.parts.highlights)
      ? guide.parts.highlights
          .map(function (item) {
            return '<span class="parts-chip">' + escapeHtml(item) + '</span>';
          })
          .join('')
      : '';

    card.className = 'parts-reference-card';
    card.innerHTML =
      '<div class="parts-reference-media">' +
      imageMarkup +
      '</div>' +
      '<div class="parts-reference-copy">' +
      '<h3>참고 부품 이미지</h3>' +
      '<p>' +
      escapeHtml(guide.parts.note || '') +
      '</p>' +
      '<div class="parts-chip-list">' +
      highlights +
      '</div>' +
      '<div class="resource-actions">' +
      '<a href="' +
      guide.guidePdf +
      '" target="_blank" rel="noreferrer" class="button-secondary">설명서 같이 보기</a>' +
      '</div>' +
      '</div>';

    const anchor = section.querySelector('.checklist-item');
    if (anchor) {
      section.insertBefore(card, anchor);
    } else {
      section.appendChild(card);
    }
  }

  function getStepStatusLabel(position, currentStep) {
    if (position < currentStep) return '완료';
    if (position === currentStep) return '진행 중';
    return '다음';
  }

  function getStepState(position, currentStep) {
    if (position < currentStep) return 'is-complete';
    if (position === currentStep) return 'is-current';
    return 'is-upcoming';
  }

  function renderCurrentStepActions(step, position, totalSteps, guide) {
    if (position === totalSteps) {
      return (
        '<div class="assembly-step-actions">' +
        '<a href="#record-verify" class="button-primary">완성 확인하기</a>' +
        '<a href="' +
        guide.demoVideo +
        '" target="_blank" rel="noreferrer" class="button-secondary">작동 영상 보기</a>' +
        '<a href="#challenge-missions" class="button-secondary">도전 미션으로 이동</a>' +
        '</div>'
      );
    }

    const previousButton =
      position > 1
        ? '<button type="button" class="button-secondary js-guide-prev" data-target-step="' +
          (position - 1) +
          '">이전 단계</button>'
        : '';

    return (
      '<div class="assembly-step-actions">' +
      previousButton +
      '<button type="button" class="button-primary js-guide-next" data-target-step="' +
      (position + 1) +
      '">완료하고 다음 단계로</button>' +
      '<a href="' +
      guide.assemblyVideo +
      '" target="_blank" rel="noreferrer" class="button-secondary">조립 영상 보기</a>' +
      '<a href="#troubleshooting" class="button-secondary">문제 해결 보기</a>' +
      '</div>'
    );
  }

  function renderGuideSteps(guide) {
    const totalSteps = guide.steps.length;
    const currentStep = getCurrentStep(totalSteps);

    return guide.steps
      .map(function (step, index) {
        const position = index + 1;
        const stateClass = getStepState(position, currentStep);
        const statusLabel = getStepStatusLabel(position, currentStep);
        const progressLabel = position + ' / ' + totalSteps + ' 단계';
        const imageMarkup =
          '<div class="assembly-step-media build-step-image">' +
          '<img src="' +
          step.image +
          '" alt="' +
          escapeHtml(step.alt) +
          '" loading="eager">' +
          '</div>';
        const cautionMarkup = step.caution
          ? '<div class="assembly-step-caution"><strong>주의</strong><p>' +
            escapeHtml(step.caution) +
            '</p></div>'
          : '';
        const helperMarkup =
          position < currentStep
            ? '<div class="assembly-step-helper"><span>이 단계는 완료했어요.</span><button type="button" class="button-secondary js-open-step" data-target-step="' +
              position +
              '">이 단계 다시 보기</button></div>'
            : position > currentStep
              ? '<div class="assembly-step-helper">앞 단계를 끝내면 이 단계가 열려요.</div>'
              : '';
        const bodyMarkup =
          position === currentStep
            ? '<div class="assembly-step-body">' +
              imageMarkup +
              '<div class="assembly-step-check"><strong>확인 질문</strong><p>' +
              escapeHtml(step.check) +
              '</p></div>' +
              cautionMarkup +
              renderCurrentStepActions(step, position, totalSteps, guide) +
              '</div>'
            : '';

        return (
          '<article class="assembly-step-card ' +
          stateClass +
          '" data-step-index="' +
          position +
          '">' +
          '<div class="assembly-step-top">' +
          '<span class="assembly-step-number">' +
          position +
          '</span>' +
          '<div class="assembly-step-heading">' +
          '<div class="assembly-step-heading-row">' +
          '<h3>' +
          escapeHtml(step.title) +
          '</h3>' +
          '<span class="assembly-step-status">' +
          statusLabel +
          '</span>' +
          '</div>' +
          '<p>' +
          escapeHtml(step.mission) +
          '</p>' +
          '<div class="assembly-step-meta">' +
          '<span class="assembly-step-badge">' +
          progressLabel +
          '</span>' +
          '</div>' +
          '</div>' +
          '</div>' +
          bodyMarkup +
          helperMarkup +
          '</article>'
        );
      })
      .join('');
  }

  function renderAssemblyGuide(guide) {
    const panel = document.querySelector('#build-guide .build-guide-panel');
    if (!panel) return;

    const noteMarkup = guide.arduinoNote
      ? '<div class="detail-note assembly-guide-note">' + escapeHtml(guide.arduinoNote) + '</div>'
      : '';

    panel.innerHTML =
      '<div class="assembly-guide-overview">' +
      '<div>' +
      '<strong>' +
      escapeHtml(guide.title) +
      '</strong>' +
      '<p>한 단계씩 따라가고, 헷갈리면 조립 설명서와 조립 영상을 함께 봐요.</p>' +
      noteMarkup +
      '</div>' +
      '<a href="' +
      guide.guidePdf +
      '" target="_blank" rel="noreferrer" class="button-secondary">설명서 보기</a>' +
      '</div>' +
      '<div class="assembly-step-list">' +
      renderGuideSteps(guide) +
      '</div>';
  }

  function renderTroubleshooting(guide) {
    const section = document.getElementById('troubleshooting');
    if (!section || !Array.isArray(guide.troubleshooting)) return;

    section.innerHTML =
      '<div class="section-badge">TROUBLESHOOTING</div>' +
      '<h2>왜 안 되지?</h2>' +
      guide.troubleshooting
        .map(function (item) {
          return (
            '<div class="faq-item">' +
            '<button class="faq-question">' +
            escapeHtml(item.question) +
            '</button>' +
            '<div class="faq-answer"><div class="faq-answer-inner">' +
            escapeHtml(item.answer) +
            '</div></div>' +
            '</div>'
          );
        })
        .join('');
  }

  function renderScienceSection(guide) {
    const section = document.getElementById('science-video');
    if (!section || !guide.science) return;

    section.innerHTML =
      '<div class="section-badge">SCIENCE</div>' +
      '<h2>짧게 생각하고 실험해요</h2>' +
      '<p class="science-question">질문: ' +
      escapeHtml(guide.science.question) +
      '</p>' +
      '<div class="resource-grid science-grid">' +
      '<article class="resource-card resource-card-video">' +
      '<h3>작동 영상으로 보기</h3>' +
      '<p>완성된 모습에서 어떤 반응이 일어나는지 먼저 짧게 확인해요.</p>' +
      '<div class="resource-preview">' +
      '<video controls preload="metadata" playsinline src="' +
      guide.demoVideo +
      '"></video>' +
      '</div>' +
      '</article>' +
      '<article class="resource-card">' +
      '<h3>' +
      escapeHtml(guide.science.activityTitle || '직접 해보기') +
      '</h3>' +
      '<p>' +
      escapeHtml(guide.science.activity) +
      '</p>' +
      '</article>' +
      '</div>';
  }

  function renderResourcesMedia(guide) {
    const grid = document.querySelector('#resources-media .resource-grid');
    if (!grid) return;

    grid.innerHTML =
      '<article class="resource-card">' +
      '<h3>조립 설명서 PDF</h3>' +
      '<p>종이 설명서가 멀리 있거나 그림을 크게 보고 싶을 때 열어 보세요.</p>' +
      '<div class="resource-actions">' +
      '<a href="' +
      guide.guidePdf +
      '" target="_blank" rel="noreferrer" class="button-secondary">설명서 열기</a>' +
      '</div>' +
      '</article>' +
      '<article class="resource-card resource-card-video">' +
      '<h3>조립 영상</h3>' +
      '<p>끼우는 방향이나 순서가 헷갈릴 때 바로 다시 볼 수 있어요.</p>' +
      '<div class="resource-preview">' +
      '<video controls preload="metadata" playsinline src="' +
      guide.assemblyVideo +
      '"></video>' +
      '</div>' +
      '<div class="resource-actions">' +
      '<a href="' +
      guide.assemblyVideo +
      '" target="_blank" rel="noreferrer" class="button-secondary">큰 화면으로 보기</a>' +
      '</div>' +
      '</article>' +
      '<article class="resource-card resource-card-video">' +
      '<h3>작동 영상</h3>' +
      '<p>완성 뒤 어떤 반응이 맞는지 비교하면서 확인해요.</p>' +
      '<div class="resource-preview">' +
      '<video controls preload="metadata" playsinline src="' +
      guide.demoVideo +
      '"></video>' +
      '</div>' +
      '<div class="resource-actions">' +
      '<a href="' +
      guide.demoVideo +
      '" target="_blank" rel="noreferrer" class="button-secondary">완성 모습 다시 보기</a>' +
      '</div>' +
      '</article>';
  }

  function scrollToCurrentStepCard() {
    const currentCard = document.querySelector('.assembly-step-card.is-current');
    if (!currentCard) return;
    currentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function bindAssemblyGuideActions(guide) {
    const totalSteps = guide.steps.length;

    document.querySelectorAll('.js-guide-prev, .js-guide-next, .js-open-step').forEach(function (button) {
      button.addEventListener('click', function () {
        const targetStep = Number.parseInt(button.dataset.targetStep || '1', 10);
        if (!Number.isFinite(targetStep)) return;
        setCurrentStep(targetStep, totalSteps);
        renderAssemblyGuide(guide);
        bindAssemblyGuideActions(guide);
        scrollToCurrentStepCard();
      });
    });
  }

  function initAssemblyGuides() {
    const guide = getGuide();
    if (!guide) return;

    renderStartResources(guide);
    renderPartsReference(guide);
    renderAssemblyGuide(guide);
    renderTroubleshooting(guide);
    renderScienceSection(guide);
    renderResourcesMedia(guide);
    bindAssemblyGuideActions(guide);
  }

  function initScrollAnimations() {
    const items = document.querySelectorAll('.fade-in');
    if (!items.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initNavScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  function initFAQAccordion() {
    document.querySelectorAll('.faq-question').forEach(function (button) {
      button.addEventListener('click', function () {
        const item = button.closest('.faq-item');
        const wasOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item').forEach(function (faq) {
          faq.classList.remove('open');
        });

        if (!wasOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  function initProgressBar() {
    const bar = document.getElementById('progress');
    if (!bar) return;

    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    });
  }

  function initTOC() {
    const toc = document.querySelector('.toc-sidebar');
    const sections = Array.from(document.querySelectorAll('[data-toc-label][id]'));
    if (!toc || !sections.length) return;

    toc.innerHTML = '';

    sections.forEach(function (section) {
      const link = document.createElement('a');
      link.href = '#' + section.id;
      link.className = 'toc-item';
      link.innerHTML = '<span class="toc-dot"></span>' + section.dataset.tocLabel;
      link.addEventListener('click', function (event) {
        event.preventDefault();
        scrollToId(section.id);
      });
      toc.appendChild(link);
    });

    const links = Array.from(toc.querySelectorAll('.toc-item'));
    const sectionMap = sections.map(function (section, index) {
      return { section: section, link: links[index] };
    });

    function updateActiveTOC() {
      let currentId = sections[0].id;
      const offset = window.scrollY + 180;

      sectionMap.forEach(function (item) {
        if (item.section.offsetTop <= offset) {
          currentId = item.section.id;
        }
      });

      links.forEach(function (link) {
        const active = link.getAttribute('href') === '#' + currentId;
        link.classList.toggle('active', active);
      });
    }

    updateActiveTOC();
    window.addEventListener('scroll', updateActiveTOC);
  }

  function initSafetyShortcuts() {
    document.querySelectorAll('.js-build-entry').forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (document.body.dataset.safetyComplete === 'true') return;
        event.preventDefault();
        scrollToId('safety-quest');
      });
    });

    document.querySelectorAll('.js-jump-safety').forEach(function (button) {
      button.addEventListener('click', function () {
        scrollToId('safety-quest');
      });
    });
  }

  function initQrState() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') === 'qr') {
      document.body.classList.add('from-qr');
    }
  }

  function initQuestBriefs() {
    const kitId = document.body.dataset.kitId;
    if (!kitId || !window.DORO_QUEST_BRIEFS || !window.DORO_QUEST_BRIEFS[kitId]) return;

    const brief = window.DORO_QUEST_BRIEFS[kitId];
    const restore = document.querySelector('[data-brief-restore]');
    const background = document.querySelector('[data-brief-background]');
    const mission = document.querySelector('[data-brief-mission]');

    if (restore) {
      restore.textContent = brief.restore;
    }
    if (background) {
      background.textContent = brief.background;
    }
    if (mission) {
      mission.textContent = brief.mission;
    }
  }

  function initDetailPage() {
    if (!document.body.classList.contains('detail-page')) return;

    initQrState();
    initQuestBriefs();
    initAssemblyGuides();
    initScrollAnimations();
    initNavScroll();
    initFAQAccordion();
    initProgressBar();
    initTOC();
    initSafetyShortcuts();
  }

  document.addEventListener('DOMContentLoaded', initDetailPage);
})();
