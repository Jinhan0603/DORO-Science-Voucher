(function () {
  function getGroupRoot(groupName) {
    return document.querySelector('[data-check-group="' + groupName + '"]');
  }

  function getInputs(groupName) {
    const root = getGroupRoot(groupName);
    if (!root) return [];
    return Array.from(root.querySelectorAll('input[type="checkbox"]'));
  }

  function getStorageKey(pageId, groupName, itemId) {
    return 'doro-checklist-' + pageId + '-' + groupName + '-' + itemId;
  }

  function updateGroupProgress(groupName) {
    const root = getGroupRoot(groupName);
    if (!root) return;

    const inputs = getInputs(groupName);
    const checked = inputs.filter((input) => input.checked).length;
    const targetId = root.dataset.progressTarget;
    const target = targetId ? document.getElementById(targetId) : null;

    if (target) {
      const pct = inputs.length ? Math.round((checked / inputs.length) * 100) : 0;
      target.textContent = checked + '/' + inputs.length + ' 완료 (' + pct + '%)';
      target.style.color = checked === inputs.length && inputs.length ? 'var(--emerald)' : 'var(--text-secondary)';
    }
  }

  function updateSafetyGate() {
    const safetyInputs = getInputs('safety-quest');
    const buildSection = document.getElementById('build-guide');
    if (!buildSection || !safetyInputs.length) return;

    const complete = safetyInputs.every((input) => input.checked);
    const status = buildSection.querySelector('[data-build-status]');
    const help = buildSection.querySelector('[data-build-help]');

    document.body.dataset.safetyComplete = complete ? 'true' : 'false';
    buildSection.classList.toggle('is-locked', !complete);

    if (status) {
      status.textContent = complete
        ? '안전 약속을 모두 확인했어요. 이제 만들기를 시작할 수 있어요.'
        : '안전 약속을 먼저 모두 확인해 주세요.';
    }

    if (help) {
      help.textContent = complete
        ? '아래 순서대로 만들기 흐름을 따라가면 돼요.'
        : '안전 section에서 체크를 모두 마치면 만들기 section이 열려요.';
    }

    document.dispatchEvent(
      new CustomEvent('doro:safety-gate', {
        detail: { complete: complete }
      })
    );
  }

  function initChecklistGroup(groupName) {
    const root = getGroupRoot(groupName);
    if (!root) return;

    const pageId = window.location.pathname;
    const migrateLegacy = groupName === 'component-check';

    getInputs(groupName).forEach(function (input, index) {
      const itemId = input.dataset.checkId || String(index);
      const key = getStorageKey(pageId, groupName, itemId);
      let saved = localStorage.getItem(key);

      if (saved === null && migrateLegacy) {
        const legacyKey = 'doro-checklist-' + pageId + '-' + index;
        const legacyValue = localStorage.getItem(legacyKey);
        if (legacyValue !== null) {
          saved = legacyValue;
          localStorage.setItem(key, legacyValue);
        }
      }

      if (saved === 'true') {
        input.checked = true;
      }

      input.addEventListener('change', function () {
        localStorage.setItem(key, input.checked ? 'true' : 'false');
        updateGroupProgress(groupName);
        if (groupName === 'safety-quest') {
          updateSafetyGate();
        }
      });
    });

    updateGroupProgress(groupName);
  }

  function initLearningPage() {
    if (!document.body.classList.contains('detail-page')) return;

    initChecklistGroup('component-check');
    initChecklistGroup('safety-quest');
    updateSafetyGate();
  }

  document.addEventListener('DOMContentLoaded', initLearningPage);
})();
