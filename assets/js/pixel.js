/* ============================================
   DOROLAND Pixel Art Engine
   Only applies to character sprites — NOT kit photos
   ============================================ */
(function () {
  'use strict';

  function pixelate(img, blockSize) {
    function run() {
      try {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        if (!w || !h) return;

        const c1 = document.createElement('canvas');
        c1.width  = Math.max(1, Math.round(w / blockSize));
        c1.height = Math.max(1, Math.round(h / blockSize));
        const x1 = c1.getContext('2d');
        x1.imageSmoothingEnabled = false;
        x1.drawImage(img, 0, 0, c1.width, c1.height);

        const c2 = document.createElement('canvas');
        c2.width = w; c2.height = h;
        const x2 = c2.getContext('2d');
        x2.imageSmoothingEnabled = false;
        x2.drawImage(c1, 0, 0, w, h);

        /* scanline overlay */
        for (let y = 0; y < h; y += 2) {
          x2.fillStyle = 'rgba(0,0,0,0.08)';
          x2.fillRect(0, y, w, 1);
        }

        img.src = c2.toDataURL('image/jpeg', 0.88);
      } catch (e) { /* CORS / tainted canvas — skip */ }
    }

    if (img.complete && img.naturalWidth) run();
    else img.addEventListener('load', run, { once: true });
  }

  function initPixelArt() {
    /* Character sprites only — 8-bit look */
    document.querySelectorAll('.doroland-char-frame img').forEach(img => {
      img.crossOrigin = 'anonymous';
      pixelate(img, 16);
    });

    /* Quest card flip photos on the MAIN page (not program pages) */
    document.querySelectorAll('.photo-front img, .photo-back img').forEach(img => {
      img.crossOrigin = 'anonymous';
      pixelate(img, 10);
    });

    /* Kit thumb row photos: pixelate only the small thumbs, NOT the hero photo */
    document.querySelectorAll('.detail-kit-thumb img').forEach(img => {
      img.crossOrigin = 'anonymous';
      pixelate(img, 8);
    });

    /* Mission step images: keep original — do NOT pixelate */
    /* (user request: kit photos stay original) */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPixelArt);
  } else {
    initPixelArt();
  }
})();
