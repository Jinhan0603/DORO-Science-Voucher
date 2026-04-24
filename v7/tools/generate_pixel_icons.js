const fs = require('fs');
const path = require('path');
const vm = require('vm');

const v7Root = path.resolve(__dirname, '..');
const previewPath = path.join(v7Root, 'design', 'pixel-icon-preview.html');
const iconDir = path.join(v7Root, 'assets', 'pixel-icons', 'individual');

function loadPreviewExports() {
  const html = fs.readFileSync(previewPath, 'utf8').replace(/\u041a/g, 'K');
  const start = html.indexOf('<script>');
  const end = html.lastIndexOf('</script>');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Failed to locate script block in pixel-icon-preview.html');
  }

  const script = html.slice(start + '<script>'.length, end);
  const defs = script.split('/* ── 렌더링 ── */')[0];
  const context = { console };
  context.globalThis = context;
  vm.runInNewContext(
    defs + '\n;globalThis.__PIXEL_PREVIEW_EXPORTS__ = { P, ICONS };',
    context,
    { filename: 'pixel-icon-preview.html' }
  );
  return context.__PIXEL_PREVIEW_EXPORTS__;
}

function captureRects(draw) {
  const rects = [];
  const ctx = {
    fillStyle: '#000000',
    fillRect(x, y, w, h) {
      rects.push({ x, y, w, h, fill: this.fillStyle });
    }
  };
  draw(ctx, 1);
  return rects;
}

function svgFromRects(rects) {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="64" height="64" shape-rendering="crispEdges">',
    '  <rect width="16" height="16" fill="none"/>',
    ...rects.map((rect) =>
      `  <rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" fill="${rect.fill}"/>`
    ),
    '</svg>',
    ''
  ].join('\n');
}

function createHelpers(P) {
  function fill(ctx, key, x, y, w, h) {
    if (!key || key === '_') return;
    ctx.fillStyle = P[key];
    ctx.fillRect(x, y, w, h);
  }

  function pixels(ctx, rows) {
    rows.forEach((row, y) => {
      [...String(row || '').replace(/\u041a/g, 'K')].forEach((key, x) => {
        if (key !== '_' && P[key]) {
          ctx.fillStyle = P[key];
          ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  return { fill, pixels };
}

const { P, ICONS } = loadPreviewExports();
const { fill, pixels } = createHelpers(P);

const extraIcons = {
  story(ctx) {
    fill(ctx, 'K', 1, 3, 6, 10);
    fill(ctx, 'K', 9, 3, 6, 10);
    fill(ctx, 'K', 7, 2, 2, 12);
    fill(ctx, 'E', 2, 4, 4, 8);
    fill(ctx, 'E', 10, 4, 4, 8);
    fill(ctx, 'W', 2, 4, 3, 1);
    fill(ctx, 'W', 10, 4, 3, 1);
    fill(ctx, 'h', 6, 4, 1, 8);
    fill(ctx, 'h', 9, 4, 1, 8);
    fill(ctx, 'b', 3, 6, 2, 1);
    fill(ctx, 'b', 3, 8, 2, 1);
    fill(ctx, 'b', 11, 6, 2, 1);
    fill(ctx, 'b', 11, 8, 2, 1);
    fill(ctx, 'N', 7, 4, 1, 8);
    fill(ctx, 'N', 8, 4, 1, 8);
    fill(ctx, 'Y', 7, 13, 2, 1);
  },

  photo(ctx) {
    fill(ctx, 'K', 1, 2, 14, 11);
    fill(ctx, 'D', 2, 3, 12, 9);
    fill(ctx, 'W', 3, 4, 10, 7);
    fill(ctx, 'b', 3, 4, 10, 3);
    fill(ctx, 'Y', 4, 5, 2, 2);
    fill(ctx, 'G', 4, 9, 8, 2);
    fill(ctx, 'A', 8, 8, 4, 2);
    fill(ctx, 'C', 6, 7, 3, 2);
    fill(ctx, 'K', 2, 13, 12, 1);
    fill(ctx, 'y', 3, 3, 3, 1);
  },

  speaker(ctx) {
    fill(ctx, 'K', 1, 5, 4, 6);
    fill(ctx, 'H', 2, 6, 2, 4);
    fill(ctx, 'L', 2, 6, 1, 1);
    fill(ctx, 'K', 5, 3, 5, 10);
    fill(ctx, 'H', 6, 4, 3, 8);
    fill(ctx, 'L', 6, 4, 2, 2);
    fill(ctx, 'C', 7, 6, 1, 4);
    fill(ctx, 'K', 10, 4, 2, 1);
    fill(ctx, 'K', 10, 10, 2, 1);
    fill(ctx, 'K', 12, 3, 2, 2);
    fill(ctx, 'K', 12, 9, 2, 2);
    fill(ctx, 'Y', 10, 5, 2, 1);
    fill(ctx, 'Y', 10, 9, 2, 1);
    fill(ctx, 'y', 12, 4, 1, 1);
    fill(ctx, 'y', 12, 9, 1, 1);
  },

  lamp(ctx) {
    fill(ctx, 'K', 5, 1, 6, 7);
    fill(ctx, 'Y', 6, 2, 4, 4);
    fill(ctx, 'y', 6, 2, 2, 1);
    fill(ctx, 'K', 6, 8, 4, 3);
    fill(ctx, 'H', 7, 8, 2, 2);
    fill(ctx, 'L', 7, 8, 1, 1);
    fill(ctx, 'K', 7, 11, 2, 2);
    fill(ctx, 'n', 7, 11, 2, 2);
    fill(ctx, 'K', 4, 13, 8, 2);
    fill(ctx, 'Y', 5, 13, 6, 1);
    fill(ctx, 'W', 7, 4, 1, 1);
    fill(ctx, 'W', 8, 3, 1, 1);
  },

  robot(ctx) {
    fill(ctx, 'K', 7, 0, 2, 2);
    fill(ctx, 'Y', 7, 0, 2, 1);
    fill(ctx, 'K', 3, 2, 10, 5);
    fill(ctx, 'H', 4, 3, 8, 3);
    fill(ctx, 'L', 4, 3, 4, 1);
    fill(ctx, 'C', 5, 4, 2, 1);
    fill(ctx, 'C', 9, 4, 2, 1);
    fill(ctx, 'K', 6, 6, 4, 1);
    fill(ctx, 'K', 4, 7, 8, 5);
    fill(ctx, 'B', 5, 8, 6, 3);
    fill(ctx, 'b', 5, 8, 3, 1);
    fill(ctx, 'K', 2, 8, 2, 3);
    fill(ctx, 'K', 12, 8, 2, 3);
    fill(ctx, 'T', 2, 9, 1, 2);
    fill(ctx, 'T', 13, 9, 1, 2);
    fill(ctx, 'K', 5, 12, 2, 3);
    fill(ctx, 'K', 9, 12, 2, 3);
    fill(ctx, 'H', 5, 12, 1, 2);
    fill(ctx, 'H', 9, 12, 1, 2);
  },

  car(ctx) {
    fill(ctx, 'K', 2, 10, 3, 3);
    fill(ctx, 'K', 11, 10, 3, 3);
    fill(ctx, 'H', 3, 11, 1, 1);
    fill(ctx, 'H', 12, 11, 1, 1);
    fill(ctx, 'K', 1, 7, 14, 4);
    fill(ctx, 'Y', 2, 8, 12, 2);
    fill(ctx, 'y', 2, 8, 5, 1);
    fill(ctx, 'K', 4, 5, 7, 3);
    fill(ctx, 'C', 5, 6, 5, 1);
    fill(ctx, 'c', 5, 6, 2, 1);
    fill(ctx, 'K', 1, 9, 1, 2);
    fill(ctx, 'K', 14, 9, 1, 2);
    fill(ctx, 'R', 12, 8, 1, 1);
  },

  gamepad(ctx) {
    fill(ctx, 'K', 3, 5, 10, 6);
    fill(ctx, 'K', 1, 7, 2, 4);
    fill(ctx, 'K', 13, 7, 2, 4);
    fill(ctx, 'H', 4, 6, 8, 4);
    fill(ctx, 'L', 4, 6, 4, 1);
    fill(ctx, 'W', 5, 7, 1, 3);
    fill(ctx, 'W', 4, 8, 3, 1);
    fill(ctx, 'Y', 10, 7, 1, 1);
    fill(ctx, 'G', 11, 8, 1, 1);
    fill(ctx, 'R', 9, 8, 1, 1);
    fill(ctx, 'B', 10, 9, 1, 1);
    fill(ctx, 'K', 7, 4, 2, 1);
    fill(ctx, 'W', 7, 6, 2, 1);
  },

  piano(ctx) {
    fill(ctx, 'K', 1, 4, 14, 8);
    fill(ctx, 'Y', 2, 4, 12, 2);
    fill(ctx, 'y', 2, 4, 5, 1);
    fill(ctx, 'W', 2, 6, 12, 5);
    fill(ctx, 'K', 4, 6, 1, 5);
    fill(ctx, 'K', 7, 6, 1, 5);
    fill(ctx, 'K', 10, 6, 1, 5);
    fill(ctx, 'K', 3, 6, 1, 3);
    fill(ctx, 'K', 6, 6, 1, 3);
    fill(ctx, 'K', 9, 6, 1, 3);
    fill(ctx, 'K', 12, 6, 1, 3);
    fill(ctx, 'C', 5, 2, 1, 2);
    fill(ctx, 'C', 8, 1, 1, 3);
    fill(ctx, 'C', 11, 2, 1, 2);
  },

  ai(ctx) {
    fill(ctx, 'K', 3, 3, 10, 10);
    fill(ctx, 'B', 5, 5, 6, 6);
    fill(ctx, 'b', 5, 5, 3, 2);
    fill(ctx, 'K', 1, 5, 2, 1);
    fill(ctx, 'K', 1, 8, 2, 1);
    fill(ctx, 'K', 13, 5, 2, 1);
    fill(ctx, 'K', 13, 8, 2, 1);
    fill(ctx, 'K', 5, 1, 1, 2);
    fill(ctx, 'K', 8, 1, 1, 2);
    fill(ctx, 'K', 5, 13, 1, 2);
    fill(ctx, 'K', 8, 13, 1, 2);
    fill(ctx, 'Y', 7, 7, 2, 2);
    fill(ctx, 'W', 6, 6, 1, 1);
  },

  coding(ctx) {
    fill(ctx, 'K', 1, 2, 14, 11);
    fill(ctx, 'H', 2, 3, 12, 9);
    fill(ctx, 'L', 2, 3, 5, 2);
    fill(ctx, 'K', 4, 6, 2, 2);
    fill(ctx, 'K', 4, 9, 2, 2);
    fill(ctx, 'K', 10, 6, 2, 2);
    fill(ctx, 'K', 10, 9, 2, 2);
    fill(ctx, 'Y', 5, 7, 2, 1);
    fill(ctx, 'Y', 5, 8, 2, 1);
    fill(ctx, 'Y', 9, 7, 2, 1);
    fill(ctx, 'Y', 9, 8, 2, 1);
    fill(ctx, 'C', 7, 6, 2, 4);
  },

  circuit(ctx) {
    fill(ctx, 'K', 2, 2, 12, 12);
    fill(ctx, 'G', 3, 3, 10, 10);
    fill(ctx, 'g', 3, 3, 5, 2);
    fill(ctx, 'K', 4, 5, 8, 1);
    fill(ctx, 'K', 4, 8, 5, 1);
    fill(ctx, 'K', 8, 8, 1, 3);
    fill(ctx, 'K', 10, 5, 1, 5);
    fill(ctx, 'Y', 3, 5, 1, 1);
    fill(ctx, 'Y', 12, 5, 1, 1);
    fill(ctx, 'Y', 8, 11, 1, 1);
    fill(ctx, 'W', 6, 8, 1, 1);
  },

  sensor(ctx) {
    fill(ctx, 'K', 2, 5, 8, 6);
    fill(ctx, 'H', 3, 6, 6, 4);
    fill(ctx, 'C', 3, 6, 2, 2);
    fill(ctx, 'C', 7, 6, 2, 2);
    fill(ctx, 'K', 11, 5, 2, 1);
    fill(ctx, 'K', 12, 6, 2, 1);
    fill(ctx, 'K', 13, 7, 2, 2);
    fill(ctx, 'K', 12, 9, 2, 1);
    fill(ctx, 'K', 11, 10, 2, 1);
    fill(ctx, 'Y', 11, 6, 1, 1);
    fill(ctx, 'y', 12, 7, 1, 1);
    fill(ctx, 'y', 11, 9, 1, 1);
    fill(ctx, 'K', 3, 11, 1, 2);
    fill(ctx, 'K', 8, 11, 1, 2);
  },

  motor(ctx) {
    fill(ctx, 'K', 2, 5, 8, 6);
    fill(ctx, 'H', 3, 6, 6, 4);
    fill(ctx, 'L', 3, 6, 3, 1);
    fill(ctx, 'Y', 4, 6, 1, 4);
    fill(ctx, 'K', 10, 7, 4, 2);
    fill(ctx, 'L', 11, 7, 2, 1);
    fill(ctx, 'K', 4, 3, 2, 2);
    fill(ctx, 'C', 4, 3, 1, 1);
    fill(ctx, 'K', 4, 11, 2, 2);
    fill(ctx, 'C', 4, 12, 1, 1);
  },

  music(ctx) {
    fill(ctx, 'K', 8, 2, 2, 8);
    fill(ctx, 'Y', 9, 3, 1, 6);
    fill(ctx, 'K', 6, 2, 5, 2);
    fill(ctx, 'Y', 7, 3, 3, 1);
    fill(ctx, 'K', 4, 9, 4, 4);
    fill(ctx, 'K', 9, 8, 4, 4);
    fill(ctx, 'Y', 5, 10, 2, 2);
    fill(ctx, 'Y', 10, 9, 2, 2);
    fill(ctx, 'y', 5, 10, 1, 1);
    fill(ctx, 'y', 10, 9, 1, 1);
  },

  mission(ctx) {
    fill(ctx, 'K', 5, 2, 6, 5);
    fill(ctx, 'Y', 6, 3, 4, 3);
    fill(ctx, 'y', 6, 3, 2, 1);
    fill(ctx, 'K', 3, 3, 2, 3);
    fill(ctx, 'K', 11, 3, 2, 3);
    fill(ctx, 'Y', 4, 4, 1, 1);
    fill(ctx, 'Y', 11, 4, 1, 1);
    fill(ctx, 'K', 7, 7, 2, 2);
    fill(ctx, 'Y', 7, 7, 2, 1);
    fill(ctx, 'K', 5, 9, 6, 2);
    fill(ctx, 'Y', 6, 9, 4, 1);
    fill(ctx, 'K', 4, 11, 8, 3);
    fill(ctx, 'Y', 5, 12, 6, 1);
  },

  review(ctx) {
    fill(ctx, 'K', 3, 1, 10, 14);
    fill(ctx, 'D', 5, 0, 6, 3);
    fill(ctx, 'n', 6, 1, 4, 1);
    fill(ctx, 'E', 4, 3, 8, 11);
    fill(ctx, 'W', 4, 3, 4, 1);
    fill(ctx, 'B', 5, 6, 2, 2);
    fill(ctx, 'B', 5, 10, 2, 2);
    fill(ctx, 'b', 8, 6, 3, 1);
    fill(ctx, 'b', 8, 8, 3, 1);
    fill(ctx, 'b', 8, 10, 3, 1);
  },

  certificate(ctx) {
    fill(ctx, 'K', 2, 1, 12, 13);
    fill(ctx, 'E', 3, 2, 10, 11);
    fill(ctx, 'W', 3, 2, 5, 1);
    fill(ctx, 'Y', 4, 3, 8, 1);
    fill(ctx, 'b', 5, 6, 5, 1);
    fill(ctx, 'b', 5, 8, 4, 1);
    fill(ctx, 'K', 9, 9, 4, 4);
    fill(ctx, 'Y', 10, 10, 2, 2);
    fill(ctx, 'O', 11, 11, 1, 1);
    fill(ctx, 'R', 10, 13, 1, 2);
    fill(ctx, 'R', 12, 13, 1, 2);
  },

  pdf(ctx) {
    fill(ctx, 'K', 3, 1, 10, 14);
    fill(ctx, 'W', 4, 2, 8, 12);
    fill(ctx, 'L', 4, 2, 4, 1);
    fill(ctx, 'R', 2, 2, 6, 4);
    fill(ctx, 'r', 2, 2, 2, 2);
    fill(ctx, 'W', 3, 4, 1, 1);
    fill(ctx, 'W', 5, 4, 1, 1);
    fill(ctx, 'W', 6, 4, 1, 1);
    fill(ctx, 'b', 5, 8, 5, 1);
    fill(ctx, 'b', 5, 10, 4, 1);
    fill(ctx, 'b', 5, 12, 5, 1);
  },

  email(ctx) {
    fill(ctx, 'K', 1, 4, 14, 9);
    fill(ctx, 'W', 2, 5, 12, 7);
    fill(ctx, 'L', 2, 5, 6, 1);
    fill(ctx, 'K', 2, 6, 1, 1);
    fill(ctx, 'K', 3, 7, 1, 1);
    fill(ctx, 'K', 4, 8, 1, 1);
    fill(ctx, 'K', 5, 9, 1, 1);
    fill(ctx, 'K', 6, 10, 2, 1);
    fill(ctx, 'K', 12, 6, 1, 1);
    fill(ctx, 'K', 11, 7, 1, 1);
    fill(ctx, 'K', 10, 8, 1, 1);
    fill(ctx, 'K', 9, 9, 1, 1);
    fill(ctx, 'K', 8, 10, 2, 1);
    fill(ctx, 'h', 3, 11, 10, 1);
  },

  chat(ctx) {
    fill(ctx, 'K', 2, 3, 12, 8);
    fill(ctx, 'Y', 3, 4, 10, 6);
    fill(ctx, 'y', 3, 4, 4, 1);
    fill(ctx, 'K', 4, 11, 4, 2);
    fill(ctx, 'Y', 5, 11, 2, 2);
    fill(ctx, 'N', 5, 7, 6, 1);
  },

  reset(ctx) {
    pixels(ctx, [
      '________________',
      '_____KKKKK______',
      '____KYYYYYK_____',
      '___KYYYYYYYK____',
      '__KYYYKKKYYYK___',
      '__KYYK___KYYK___',
      '__KYYK__________',
      '_KYYYK__________',
      '_KYYYK__________',
      '__KYYK____KKKK__',
      '__KYYK___KYYYYK_',
      '___KYYYKKYYYYK__',
      '____KYYYYYYYK___',
      '_____KYYYYYK____',
      '______KKYKK_____',
      '________K_______'
    ]);
  },

  print(ctx) {
    fill(ctx, 'K', 4, 1, 8, 4);
    fill(ctx, 'W', 5, 2, 6, 3);
    fill(ctx, 'K', 2, 5, 12, 6);
    fill(ctx, 'H', 3, 6, 10, 4);
    fill(ctx, 'L', 3, 6, 4, 1);
    fill(ctx, 'K', 4, 10, 8, 5);
    fill(ctx, 'W', 5, 11, 6, 3);
    fill(ctx, 'b', 6, 12, 4, 1);
    fill(ctx, 'Y', 11, 7, 1, 1);
  }
};

const draws = new Map(ICONS.map((icon) => [icon.key, icon.draw]));
Object.entries(extraIcons).forEach(([key, draw]) => {
  draws.set(key, draw);
});

const keys = Array.from(draws.keys()).sort();
keys.forEach((key) => {
  const rects = captureRects(draws.get(key));
  const svg = svgFromRects(rects);
  fs.writeFileSync(path.join(iconDir, `${key}.svg`), svg, 'utf8');
});

console.log(`Generated ${keys.length} pixel icons in ${iconDir}`);
