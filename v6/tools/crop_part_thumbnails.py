from __future__ import annotations

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
MANIFEST_PATH = ROOT / "v5" / "assets" / "data" / "parts-crop-manifest.json"
MAX_SIZE = (720, 540)
PADDING = 10


def clamp_box(box: list[int], width: int, height: int) -> tuple[int, int, int, int]:
    left, top, right, bottom = box
    left = max(0, left - PADDING)
    top = max(0, top - PADDING)
    right = min(width, right + PADDING)
    bottom = min(height, bottom + PADDING)
    if right <= left:
        right = min(width, left + 1)
    if bottom <= top:
        bottom = min(height, top + 1)
    return left, top, right, bottom


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    for kit_id, payload in manifest.items():
        source = ROOT / payload["sourceImage"]
        image = Image.open(source).convert("RGB")
        for item in payload["items"]:
            output_path = ROOT / item["output"]
            output_path.parent.mkdir(parents=True, exist_ok=True)
            crop_box = clamp_box(item["box"], *image.size)
            cropped = image.crop(crop_box)
            cropped.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
            cropped.save(output_path, format="JPEG", quality=90, optimize=True)
            print(f"{kit_id}: wrote {output_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
