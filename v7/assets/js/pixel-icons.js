/* DOROLAND V7 emoji icon registry based on V3 */
(function () {
  'use strict';

  var aliases = {
    box: 'parts',
    docs: 'pdf',
    document: 'pdf',
    book: 'review',
    starter: 'pdf',
    quiz: 'check',
    next: 'arrow-next',
    previous: 'arrow-back',
    up: 'arrow-up',
    success: 'check',
    done: 'check',
    clear: 'reset',
    restart: 'reset',
    kakao: 'chat',
    mail: 'email',
    wood: 'parts',
    ring: 'parts',
    switch: 'power',
    bluetooth: 'circuit',
    electronics: 'circuit',
    board: 'circuit',
    arduino: 'circuit',
    led: 'lamp',
    leg: 'build',
    axle: 'build',
    panel: 'parts',
    buzzer: 'music'
  };

  var emojiManifest = {
    speaker: '🔊',
    lamp: '💡',
    robot: '🤖',
    car: '🚗',
    gamepad: '🎮',
    piano: '🎹',
    parts: '📦',
    safety: '🛡️',
    build: '🛠️',
    help: '❓',
    science: '🧪',
    review: '📋',
    mission: '🏆',
    record: '📝',
    certificate: '📜',
    video: '🎥',
    pdf: '📄',
    email: '📧',
    chat: '💬',
    time: '⏱',
    level: '⭐',
    age: '🎯',
    lock: '🔒',
    unlock: '🔓',
    check: '✅',
    reset: '🔄',
    'arrow-next': '➡️',
    'arrow-back': '⬅️',
    'arrow-up': '⬆️',
    warning: '⚠️',
    home: '🏠',
    quest: '⚔️',
    story: '📖',
    photo: '📷',
    ai: '🤖',
    coding: '💻',
    music: '🎵',
    print: '🖨️',
    battery: '🔋',
    wire: '🔌',
    circuit: '⚡',
    breadboard: '🔩',
    motor: '⚙️',
    sensor: '📡',
    chip: '💾',
    wheel: '🛞',
    screen: '🖥️',
    button: '🔘',
    power: '⚡'
  };

  function escapeAttr(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeName(name) {
    var key = String(name || '').trim();
    return aliases[key] || key;
  }

  function resolveIconGlyph(name) {
    var iconName = normalizeName(name);
    return emojiManifest[iconName] || '❓';
  }

  function getPixelIconMarkup(name, label, className) {
    var iconName = normalizeName(name);
    var glyph = resolveIconGlyph(iconName);
    if (!iconName || !glyph) return '';

    var classes = ('pixel-icon pixel-icon-' + iconName + ' ' + (className || '')).trim();
    var attrs = label
      ? ' role="img" aria-label="' + escapeAttr(label) + '"'
      : ' aria-hidden="true"';

    return '<span class="' + escapeAttr(classes) + '"' + attrs + '>' + escapeHtml(glyph) + '</span>';
  }

  function getNodeText(node) {
    var textNode = node.querySelector ? node.querySelector('.pixel-icon-text') : null;
    return textNode ? textNode.textContent : node.textContent;
  }

  function applyDoroPixelIcons(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll ? scope.querySelectorAll('[data-pixel-icon]') : [];

    Array.prototype.forEach.call(nodes, function (node) {
      var iconName = node.getAttribute('data-pixel-icon');
      var iconClass = node.getAttribute('data-pixel-icon-class') || '';
      var position = node.getAttribute('data-pixel-icon-position') || 'before';
      var iconOnly = node.hasAttribute('data-pixel-icon-only');
      var label = node.getAttribute('data-pixel-icon-label') || '';
      var text = iconOnly ? '' : getNodeText(node);
      var icon = getPixelIconMarkup(iconName, label, iconClass);

      node.classList.add('has-pixel-icon');
      if (iconOnly) {
        node.classList.add('has-pixel-icon-only');
        node.innerHTML = icon;
        return;
      }

      var safeText = '<span class="pixel-icon-text">' + escapeHtml(String(text || '').trim()) + '</span>';
      node.innerHTML = position === 'after' ? safeText + icon : icon + safeText;
    });
  }

  function loadEmojiManifest() {
    return Promise.resolve(emojiManifest);
  }

  window.DORO_PIXEL_ICONS = {
    manifest: emojiManifest,
    mode: 'emoji',
    aliases: aliases,
    resolve: resolveIconGlyph
  };
  window.getPixelIconMarkup = getPixelIconMarkup;
  window.renderPixelIcon = getPixelIconMarkup;
  window.applyDoroPixelIcons = applyDoroPixelIcons;
  window.loadDoroPixelIconManifest = loadEmojiManifest;
  window.injectDoroPixelSprite = function () {
    return Promise.resolve();
  };

  document.addEventListener('DOMContentLoaded', function () {
    applyDoroPixelIcons(document);
  });

  window.addEventListener('doro:languagechange', function () {
    applyDoroPixelIcons(document);
  });
})();
