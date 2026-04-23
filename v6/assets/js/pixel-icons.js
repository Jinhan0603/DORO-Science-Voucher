/* DOROLAND V5 pixel icon registry */
(function () {
  'use strict';

  var iconKeys = [
    'speaker',
    'lamp',
    'robot',
    'car',
    'gamepad',
    'piano',
    'parts',
    'safety',
    'build',
    'help',
    'science',
    'review',
    'mission',
    'record',
    'certificate',
    'video',
    'pdf',
    'email',
    'chat',
    'time',
    'level',
    'age',
    'lock',
    'unlock',
    'check',
    'reset',
    'arrow-next',
    'arrow-back',
    'arrow-up',
    'warning',
    'home',
    'quest',
    'story',
    'photo',
    'ai',
    'coding',
    'music',
    'print',
    'battery',
    'wire',
    'circuit',
    'breadboard',
    'motor',
    'sensor',
    'chip',
    'wheel',
    'screen',
    'button',
    'power'
  ];

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
    photo: 'photo',
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

  var iconManifest = {};
  iconKeys.forEach(function (key) {
    iconManifest[key] = 'assets/pixel-icons/individual/' + key + '.svg';
  });

  var manifestPromise = null;

  function getScriptSrc() {
    if (document.currentScript && document.currentScript.src) {
      return document.currentScript.src;
    }
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i -= 1) {
      var src = scripts[i].src || scripts[i].getAttribute('src') || '';
      if (src.indexOf('assets/js/pixel-icons.js') !== -1) {
        return src;
      }
    }
    return '';
  }

  function getV5BaseUrl() {
    var scriptSrc = getScriptSrc();
    if (scriptSrc) {
      return new URL('../../', scriptSrc).href;
    }

    var base = document.baseURI || window.location.href;
    var marker = '/v5/';
    var index = base.indexOf(marker);
    if (index !== -1) {
      return base.slice(0, index + marker.length);
    }
    return new URL('v5/', base).href;
  }

  var v5BaseUrl = getV5BaseUrl();
  var manifestUrl = new URL('assets/pixel-icons/icon-manifest.json', v5BaseUrl).href;

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

  function mergeManifest(manifest) {
    if (!manifest || typeof manifest !== 'object') return;
    Object.keys(manifest).forEach(function (key) {
      if (!key || typeof manifest[key] !== 'string') return;
      iconManifest[key] = manifest[key];
    });
  }

  function loadIconManifest() {
    if (manifestPromise) return manifestPromise;
    if (!window.fetch) return Promise.resolve(iconManifest);

    manifestPromise = fetch(manifestUrl, { credentials: 'same-origin' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('DORO pixel icon manifest request failed: ' + response.status);
        }
        return response.json();
      })
      .then(function (manifest) {
        mergeManifest(manifest);
        return iconManifest;
      })
      .catch(function (error) {
        console.warn('[DORO Pixel Icons] Using built-in icon manifest fallback:', error);
        return iconManifest;
      });

    return manifestPromise;
  }

  function resolveIconSrc(name) {
    var iconName = normalizeName(name);
    var assetPath = iconManifest[iconName];
    if (!assetPath) return '';
    return new URL(assetPath, v5BaseUrl).href;
  }

  function getPixelIconMarkup(name, label, className) {
    var iconName = normalizeName(name);
    var src = resolveIconSrc(iconName);
    if (!iconName || !src) return '';

    var classes = ('pixel-icon pixel-icon-' + iconName + ' ' + (className || '')).trim();
    var hidden = label ? '' : ' aria-hidden="true"';
    return '<img class="' + escapeAttr(classes) + '" src="' + escapeAttr(src) + '" width="16" height="16" alt="' + escapeAttr(label || '') + '"' + hidden + ' decoding="async">';
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
      var text = iconOnly ? '' : node.textContent;
      var icon = getPixelIconMarkup(iconName, label, iconClass);

      node.classList.add('has-pixel-icon');
      if (iconOnly) {
        node.classList.add('has-pixel-icon-only');
        node.innerHTML = icon;
        return;
      }

      var safeText = '<span class="pixel-icon-text">' + escapeHtml(text.trim()) + '</span>';
      node.innerHTML = position === 'after' ? safeText + icon : icon + safeText;
    });
  }

  function applyAfterManifest(root) {
    return loadIconManifest().then(function () {
      applyDoroPixelIcons(root || document);
    });
  }

  window.DORO_PIXEL_ICONS = {
    base: v5BaseUrl,
    manifestUrl: manifestUrl,
    manifest: iconManifest,
    mode: 'individual-svg',
    aliases: aliases,
    resolve: resolveIconSrc
  };
  window.getPixelIconMarkup = getPixelIconMarkup;
  window.renderPixelIcon = getPixelIconMarkup;
  window.applyDoroPixelIcons = applyDoroPixelIcons;
  window.loadDoroPixelIconManifest = loadIconManifest;
  window.injectDoroPixelSprite = function () {
    return Promise.resolve();
  };

  loadIconManifest();

  document.addEventListener('DOMContentLoaded', function () {
    applyAfterManifest(document);
  });

  window.addEventListener('doro:languagechange', function () {
    applyDoroPixelIcons(document);
  });
})();
