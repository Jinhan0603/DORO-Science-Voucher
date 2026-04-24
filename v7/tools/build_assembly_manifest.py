from __future__ import annotations

import json
from pathlib import Path

from pptx import Presentation

from assembly_source_config import ASSEMBLY_REFERENCE_DIR, KIT_CONFIGS, V7_ROOT


DATA_DIR = V7_ROOT / "assets" / "data"
JS_DIR = V7_ROOT / "assets" / "js"
COVERAGE_PATH = DATA_DIR / "assembly-slide-coverage.json"
GUIDES_PATH = JS_DIR / "assembly-guides.js"


def build_guide_object(kit_id: str, config: dict) -> dict:
    guide = {
        "kitName": config["kitName"],
        "title": config["guideTitle"],
        "guidePdf": f"../../assets/docs/assembly/{kit_id}/guide.pdf",
        "assemblyVideo": f"../../assets/media/assembly/{kit_id}/assembly.mp4",
        "demoVideo": f"../../assets/media/demo/{kit_id}/demo.mp4",
        "partsOverviewImage": f"../../assets/images/parts/{kit_id}/overview.jpg",
        "partsOverviewAlt": config["partsOverviewAlt"],
        "partsOverviewCaption": config["partsOverviewCaption"],
        "steps": [],
    }
    if config.get("studentNotice"):
        guide["studentNotice"] = config["studentNotice"]

    for step in config["steps"]:
        asset = f"../../assets/images/assembly/{kit_id}/slides/step-{int(step['step']):02d}.jpg"
        item = {
            "step": step["step"],
            "title": step["title"],
            "mission": step["mission"],
            "image": asset,
            "alt": step["alt"],
            "check": step["check"],
            "caution": step["caution"],
            "sourceSlides": step["sourceSlides"],
        }
        if step.get("videoTime"):
            item["videoTime"] = step["videoTime"]
        guide["steps"].append(item)
    return guide


def build_coverage(kit_id: str, config: dict) -> dict:
    slide_count = len(Presentation(str(ASSEMBLY_REFERENCE_DIR / config["pptxName"])).slides)
    coverage = []

    step_map = {}
    for step in config["steps"]:
        asset = f"v7/assets/images/assembly/{kit_id}/slides/step-{int(step['step']):02d}.jpg"
        for slide in step["sourceSlides"]:
            step_map[slide] = {
                "slide": slide,
                "type": "assembly-step",
                "action": "build-step",
                "step": step["step"],
                "asset": asset,
            }

    excluded = config.get("excludedSlides", {})
    for slide_number in range(1, slide_count + 1):
        if slide_number == config["partsOverviewSlide"]:
            coverage.append(
                {
                    "slide": slide_number,
                    "type": "parts-overview",
                    "action": "component-check-overview",
                    "asset": f"v7/assets/images/parts/{kit_id}/overview.jpg",
                }
            )
            continue

        if slide_number in step_map:
            coverage.append(step_map[slide_number])
            continue

        if slide_number in excluded:
            entry = {
                "slide": slide_number,
                "type": excluded[slide_number]["type"],
                "action": "skipped",
                "reason": excluded[slide_number]["reason"],
            }
            coverage.append(entry)
            continue

        coverage.append(
            {
                "slide": slide_number,
                "type": "other",
                "action": "skipped",
                "reason": "보조 설명 슬라이드 또는 같은 내용을 다른 단계 문구에 통합 반영",
            }
        )

    return {"slides": coverage}


def write_js(guides: dict) -> None:
    payload = json.dumps(guides, ensure_ascii=False, indent=2)
    content = (
        "(function () {\n"
        "  'use strict';\n\n"
        f"  window.DORO_ASSEMBLY_GUIDES = {payload};\n"
        "})();\n"
    )
    GUIDES_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    JS_DIR.mkdir(parents=True, exist_ok=True)

    guides = {}
    coverage = {}
    for kit_id, config in KIT_CONFIGS.items():
        guides[kit_id] = build_guide_object(kit_id, config)
        coverage[kit_id] = build_coverage(kit_id, config)

    write_js(guides)
    COVERAGE_PATH.write_text(
        json.dumps(coverage, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"wrote {GUIDES_PATH}")
    print(f"wrote {COVERAGE_PATH}")


if __name__ == "__main__":
    main()


