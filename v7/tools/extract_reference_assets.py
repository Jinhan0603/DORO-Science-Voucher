from __future__ import annotations

import json
from collections import Counter
from collections import deque
from pathlib import Path

from PIL import Image


V7_ROOT = Path(__file__).resolve().parents[1]
DESIGN_DIR = V7_ROOT / "design"
ICON_SOURCE = DESIGN_DIR / "Gemini_Generated_Image_be856fbe856fbe85.jpg"
CHAR_SOURCE = DESIGN_DIR / "Gemini_Generated_Image_j04frej04frej04f.jpg"

ICON_OUTPUT_DIR = V7_ROOT / "assets" / "pixel-icons" / "reference"
CHAR_OUTPUT_DIR = V7_ROOT / "assets" / "images" / "pixel"
MANIFEST_PATH = V7_ROOT / "assets" / "pixel-icons" / "icon-manifest.json"


ICON_GRID = {
    "hammer": (0, 0),
    "science": (1, 0),
    "arrow-next": (2, 0),
    "arrow-back": (3, 0),
    "arrow-up": (4, 0),
    "level": (5, 0),
    "student": (0, 1),
    "home": (1, 1),
    "question": (2, 1),
    "wrench": (3, 1),
    "record": (4, 1),
    "reset": (5, 1),
    "parts": (0, 2),
    "shield-check": (1, 2),
    "certificate": (2, 2),
    "trophy": (3, 2),
    "time": (4, 2),
    "clipboard": (5, 2),
    "book": (0, 3),
    "video": (1, 3),
    "email": (2, 3),
    "chat": (3, 3),
    "pdf": (4, 3),
    "warning": (5, 3),
}

CHAR_GRID = {
    "cat": (0, 0),
    "panda": (1, 0),
    "ray": (0, 1),
    "elephant": (1, 1),
    "dog": (0, 2),
    "snake": (1, 2),
}

SPAN_FILL_ICONS = {"pdf", "record", "clipboard", "email", "book", "certificate"}
TOP_NOISE_CLEAN_ICONS = {"pdf", "record", "warning", "clipboard", "certificate"}
NO_BORDER_MATCH_ICONS = {"shield-check"}


ICON_MANIFEST = {
    "speaker": "assets/pixel-icons/reference/parts.png",
    "lamp": "assets/pixel-icons/reference/parts.png",
    "robot": "assets/pixel-icons/reference/parts.png",
    "car": "assets/pixel-icons/reference/parts.png",
    "gamepad": "assets/pixel-icons/reference/parts.png",
    "piano": "assets/pixel-icons/reference/parts.png",
    "parts": "assets/pixel-icons/reference/parts.png",
    "safety": "assets/pixel-icons/reference/shield-check.png",
    "build": "assets/pixel-icons/reference/hammer.png",
    "help": "assets/pixel-icons/reference/question.png",
    "science": "assets/pixel-icons/reference/science.png",
    "review": "assets/pixel-icons/reference/clipboard.png",
    "mission": "assets/pixel-icons/reference/trophy.png",
    "record": "assets/pixel-icons/reference/record.png",
    "certificate": "assets/pixel-icons/reference/certificate.png",
    "video": "assets/pixel-icons/reference/video.png",
    "pdf": "assets/pixel-icons/reference/pdf.png",
    "email": "assets/pixel-icons/reference/email.png",
    "chat": "assets/pixel-icons/reference/chat.png",
    "time": "assets/pixel-icons/reference/time.png",
    "level": "assets/pixel-icons/reference/level.png",
    "age": "assets/pixel-icons/reference/student.png",
    "lock": "assets/pixel-icons/reference/warning.png",
    "unlock": "assets/pixel-icons/reference/shield-check.png",
    "check": "assets/pixel-icons/reference/shield-check.png",
    "reset": "assets/pixel-icons/reference/reset.png",
    "arrow-next": "assets/pixel-icons/reference/arrow-next.png",
    "arrow-back": "assets/pixel-icons/reference/arrow-back.png",
    "arrow-up": "assets/pixel-icons/reference/arrow-up.png",
    "warning": "assets/pixel-icons/reference/warning.png",
    "home": "assets/pixel-icons/reference/home.png",
    "quest": "assets/pixel-icons/reference/question.png",
    "story": "assets/pixel-icons/reference/book.png",
    "photo": "assets/pixel-icons/reference/video.png",
    "ai": "assets/pixel-icons/reference/science.png",
    "coding": "assets/pixel-icons/reference/science.png",
    "music": "assets/pixel-icons/reference/science.png",
    "print": "assets/pixel-icons/reference/certificate.png",
    "battery": "assets/pixel-icons/reference/parts.png",
    "wire": "assets/pixel-icons/reference/parts.png",
    "circuit": "assets/pixel-icons/reference/science.png",
    "breadboard": "assets/pixel-icons/reference/parts.png",
    "motor": "assets/pixel-icons/reference/wrench.png",
    "sensor": "assets/pixel-icons/reference/science.png",
    "chip": "assets/pixel-icons/reference/science.png",
    "wheel": "assets/pixel-icons/reference/wrench.png",
    "screen": "assets/pixel-icons/reference/record.png",
    "button": "assets/pixel-icons/reference/record.png",
    "power": "assets/pixel-icons/reference/warning.png",
}


def ensure_dirs() -> None:
    ICON_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    CHAR_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def is_icon_background(pixel: tuple[int, int, int, int]) -> bool:
    r, g, b, _ = pixel
    spread = max(r, g, b) - min(r, g, b)
    return spread < 42 and min(r, g, b) > 150


def is_char_background(pixel: tuple[int, int, int, int]) -> bool:
    r, g, b, _ = pixel
    spread = max(r, g, b) - min(r, g, b)
    return spread < 36 and min(r, g, b) > 214


def build_border_matcher(image: Image.Image, tolerance: int):
    rgba = image.convert("RGBA")
    width, height = rgba.size
    samples: list[tuple[int, int, int]] = []
    px = rgba.load()

    for x in range(width):
        samples.append(px[x, 0][:3])
        samples.append(px[x, height - 1][:3])
    for y in range(height):
        samples.append(px[0, y][:3])
        samples.append(px[width - 1, y][:3])

    def quantize(color: tuple[int, int, int]) -> tuple[int, int, int]:
        return tuple(int(round(channel / 12.0) * 12) for channel in color)

    counts = Counter(quantize(color) for color in samples)
    palette = [color for color, _ in counts.most_common(8)]

    def matches(pixel: tuple[int, int, int, int]) -> bool:
        rgb = pixel[:3]
        for candidate in palette:
            if max(abs(rgb[i] - candidate[i]) for i in range(3)) <= tolerance:
                return True
        return False

    return matches


def remove_background(image: Image.Image, predicate, pad_ratio: float = 0.08, fill_spans: bool = False) -> Image.Image:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    pixels = rgba.load()

    visited = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()

    def push_if_bg(x: int, y: int) -> None:
        if not (0 <= x < width and 0 <= y < height):
            return
        if visited[y][x]:
            return
        if predicate(pixels[x, y]):
            visited[y][x] = True
            queue.append((x, y))

    for x in range(width):
        push_if_bg(x, 0)
        push_if_bg(x, height - 1)
    for y in range(height):
        push_if_bg(0, y)
        push_if_bg(width - 1, y)

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            push_if_bg(nx, ny)

    result = rgba.copy()
    out = result.load()
    solid = [[False] * width for _ in range(height)]
    for y in range(height):
        for x in range(width):
            if visited[y][x]:
                out[x, y] = (0, 0, 0, 0)
            elif out[x, y][3] > 0:
                solid[y][x] = True

    components: list[list[tuple[int, int]]] = []
    seen = [[False] * width for _ in range(height)]
    for y in range(height):
        for x in range(width):
            if not solid[y][x] or seen[y][x]:
                continue
            queue = deque([(x, y)])
            seen[y][x] = True
            component: list[tuple[int, int]] = []
            while queue:
                cx, cy = queue.popleft()
                component.append((cx, cy))
                for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
                    if 0 <= nx < width and 0 <= ny < height and solid[ny][nx] and not seen[ny][nx]:
                        seen[ny][nx] = True
                        queue.append((nx, ny))
            components.append(component)

    if not components:
        return result

    largest = max(len(component) for component in components)
    keep_pixels: set[tuple[int, int]] = set()
    min_keep = max(40, int(largest * 0.03))
    for component in components:
        if len(component) >= min_keep:
            keep_pixels.update(component)

    xs = [x for x, _ in keep_pixels]
    ys = [y for _, y in keep_pixels]
    if not xs or not ys:
        return result

    for y in range(height):
        for x in range(width):
            if out[x, y][3] > 0 and (x, y) not in keep_pixels:
                out[x, y] = (0, 0, 0, 0)

    transparent_seen = [[False] * width for _ in range(height)]
    for y in range(height):
        for x in range(width):
            if out[x, y][3] != 0 or transparent_seen[y][x]:
                continue
            queue = deque([(x, y)])
            transparent_seen[y][x] = True
            hole: list[tuple[int, int]] = []
            touches_border = False
            while queue:
                cx, cy = queue.popleft()
                hole.append((cx, cy))
                if cx == 0 or cy == 0 or cx == width - 1 or cy == height - 1:
                    touches_border = True
                for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
                    if 0 <= nx < width and 0 <= ny < height and out[nx, ny][3] == 0 and not transparent_seen[ny][nx]:
                        transparent_seen[ny][nx] = True
                        queue.append((nx, ny))
            if not touches_border:
                for hx, hy in hole:
                    out[hx, hy] = rgba.getpixel((hx, hy))

    bbox = (min(xs), min(ys), max(xs) + 1, max(ys) + 1)
    trimmed = result.crop(bbox)
    source_trimmed = rgba.crop(bbox)

    if fill_spans:
        tp = trimmed.load()
        sp = source_trimmed.load()
        tw, th = trimmed.size

        for y in range(th):
            opaque = [x for x in range(tw) if tp[x, y][3] > 0]
            if len(opaque) >= 2:
                left, right = min(opaque), max(opaque)
                for x in range(left, right + 1):
                    if tp[x, y][3] == 0:
                        tp[x, y] = sp[x, y]

        for x in range(tw):
            opaque = [y for y in range(th) if tp[x, y][3] > 0]
            if len(opaque) >= 2:
                top, bottom = min(opaque), max(opaque)
                for y in range(top, bottom + 1):
                    if tp[x, y][3] == 0:
                        tp[x, y] = sp[x, y]

    pad = max(4, round(max(trimmed.size) * pad_ratio))
    canvas_size = max(trimmed.size) + pad * 2
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    left = (canvas_size - trimmed.width) // 2
    top = (canvas_size - trimmed.height) // 2
    canvas.paste(trimmed, (left, top), trimmed)
    return canvas


def extract_grid_items(source: Path, cols: int, rows: int, mapping: dict[str, tuple[int, int]], predicate, output_dir: Path, pad_ratio: float = 0.08, inset_ratio: float = 0.05) -> None:
    image = Image.open(source).convert("RGBA")
    cell_w = image.width / cols
    cell_h = image.height / rows

    inset_x = int(round(cell_w * inset_ratio))
    inset_y = int(round(cell_h * inset_ratio))

    for name, (col, row) in mapping.items():
        left = int(round(col * cell_w)) + inset_x
        top = int(round(row * cell_h)) + inset_y
        right = int(round((col + 1) * cell_w)) - inset_x
        bottom = int(round((row + 1) * cell_h)) - inset_y
        crop = image.crop((left, top, right, bottom))
        matcher = build_border_matcher(crop, tolerance=20)

        def combined(pixel):
            if name in NO_BORDER_MATCH_ICONS:
                return predicate(pixel)
            return matcher(pixel) or predicate(pixel)
        result = remove_background(crop, combined, pad_ratio=pad_ratio, fill_spans=name in SPAN_FILL_ICONS)
        if name in TOP_NOISE_CLEAN_ICONS:
            result = clean_top_noise(result)
        result.save(output_dir / f"{name}.png")


def clean_top_noise(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    px = rgba.load()
    seen = [[False] * width for _ in range(height)]

    for y in range(height):
        for x in range(width):
            if px[x, y][3] == 0 or seen[y][x]:
                continue
            queue = deque([(x, y)])
            seen[y][x] = True
            component: list[tuple[int, int]] = []
            touches_main = False
            while queue:
                cx, cy = queue.popleft()
                component.append((cx, cy))
                if cy > height * 0.18:
                    touches_main = True
                for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
                    if 0 <= nx < width and 0 <= ny < height and px[nx, ny][3] > 0 and not seen[ny][nx]:
                        seen[ny][nx] = True
                        queue.append((nx, ny))

            ys = [point[1] for point in component]
            if not touches_main and max(ys) < height * 0.16 and len(component) < 180:
                for cx, cy in component:
                    px[cx, cy] = (0, 0, 0, 0)

    return rgba


def write_manifest() -> None:
    MANIFEST_PATH.write_text(
        json.dumps(ICON_MANIFEST, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    ensure_dirs()
    extract_grid_items(ICON_SOURCE, 6, 4, ICON_GRID, is_icon_background, ICON_OUTPUT_DIR, pad_ratio=0.04, inset_ratio=0.065)
    extract_grid_items(CHAR_SOURCE, 2, 3, CHAR_GRID, is_char_background, CHAR_OUTPUT_DIR, pad_ratio=0.025, inset_ratio=0.04)
    write_manifest()
    print(f"Extracted {len(ICON_GRID)} icons to {ICON_OUTPUT_DIR}")
    print(f"Extracted {len(CHAR_GRID)} characters to {CHAR_OUTPUT_DIR}")
    print(f"Updated manifest: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
