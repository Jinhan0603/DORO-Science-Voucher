from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import fitz

from extract_reference_assets import (
    DEFAULT_OUTPUT_DIR,
    KIT_SPECS,
    LARGE_FILE_BYTES,
    catalog_reference_materials,
    collect_slide_texts,
    detect_tooling,
    file_record,
    infer_assembly_step_candidates,
    safe_rel,
)


def pdf_page_count(pdf_path: Path | None) -> int:
    if not pdf_path or not pdf_path.exists():
        return 0
    with fitz.open(str(pdf_path)) as doc:
        return doc.page_count


def list_extracted_files(path: Path, repo_root: Path) -> list[str]:
    if not path.exists():
        return []
    return [safe_rel(p, repo_root) for p in sorted(path.iterdir()) if p.is_file()]


def build_manifest(reference_root: Path, repo_root: Path, output_root: Path | None = None) -> dict[str, Any]:
    output_root = output_root or (repo_root / DEFAULT_OUTPUT_DIR)
    kits = catalog_reference_materials(reference_root)
    tooling = detect_tooling()

    manifest_kits: list[dict[str, Any]] = []
    oversized_reference_files: list[dict[str, Any]] = []

    for spec in KIT_SPECS:
        kit = next(item for item in kits if item["kit_id"] == spec.kit_id)
        pptx_path = kit["assembly_pptx"]
        pdf_path = kit["assembly_pdf"]
        slides_dir = output_root / spec.kit_id / "slides"
        raw_dir = output_root / spec.kit_id / "raw"

        slide_entries = collect_slide_texts(pptx_path) if pptx_path else []
        slide_images = list_extracted_files(slides_dir, repo_root)
        raw_media = list_extracted_files(raw_dir, repo_root)
        candidates = infer_assembly_step_candidates(slide_entries)

        for source_path in [pptx_path, pdf_path, kit["assembly_video"], *kit["operation_videos"], *kit["extra_videos"]]:
            if source_path and source_path.exists() and source_path.stat().st_size >= LARGE_FILE_BYTES:
                oversized_reference_files.append(
                    {
                        "kit_id": spec.kit_id,
                        "file": file_record(source_path, reference_root),
                    }
                )

        slides: list[dict[str, Any]] = []
        for slide in slide_entries:
            index = slide["slide_number"] - 1
            slides.append(
                {
                    "slide_number": slide["slide_number"],
                    "image": slide_images[index] if index < len(slide_images) else None,
                    "text_blocks": slide["text_blocks"],
                    "combined_text": slide["combined_text"],
                    "assembly_step_candidate": slide["slide_number"] in candidates,
                }
            )

        notes: list[str] = []
        if pdf_path and pptx_path and pdf_page_count(pdf_path) != len(slide_entries):
            notes.append("PPTX 슬라이드 수와 PDF 페이지 수가 다름")
        if pptx_path and pptx_path.stat().st_size >= LARGE_FILE_BYTES:
            notes.append("PPTX 원본이 90MB 이상이라 repo에는 원본 복사 금지")
        if not slide_images:
            notes.append("슬라이드 이미지가 아직 추출되지 않음")
        if not raw_media:
            notes.append("PPTX 내부 이미지 추출 결과가 없음")
        if not kit["assembly_video"]:
            notes.append("조립 영상 파일 누락")
        if not kit["operation_videos"]:
            notes.append("실제 작동 영상 파일 누락")

        manifest_kits.append(
            {
                "kit_id": spec.kit_id,
                "kit_name_ko": spec.kit_name_ko,
                "source_files": {
                    "assembly_pdf": file_record(pdf_path, reference_root),
                    "assembly_pptx": file_record(pptx_path, reference_root),
                    "assembly_video": file_record(kit["assembly_video"], reference_root),
                    "operation_videos": [
                        file_record(path, reference_root) for path in kit["operation_videos"] if path
                    ],
                    "extra_videos": [
                        file_record(path, reference_root) for path in kit["extra_videos"] if path
                    ],
                },
                "slide_count": len(slide_entries),
                "pdf_page_count": pdf_page_count(pdf_path),
                "extractable_slide_image_count": len(slide_images),
                "extractable_raw_media_count": len(raw_media),
                "slide_images": slide_images,
                "raw_media_files": raw_media,
                "assembly_step_candidates": candidates,
                "slides": slides,
                "missing_assets": kit["missing_assets"],
                "notes": notes,
            }
        )

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "reference_root": str(reference_root.resolve()),
        "repo_root": str(repo_root.resolve()),
        "tooling": tooling,
        "policy": {
            "max_source_file_bytes_for_repo_copy": LARGE_FILE_BYTES,
            "max_source_file_mb_for_repo_copy": round(LARGE_FILE_BYTES / 1024 / 1024, 2),
            "video_guidance": "대용량 원본 MP4는 reference에만 두고, 사이트 반영 시 720p H.264 faststart로 압축 권장",
        },
        "kits": manifest_kits,
        "oversized_reference_files": oversized_reference_files,
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a reference manifest for DORO assembly assets.")
    parser.add_argument(
        "--reference-root",
        type=Path,
        default=Path(__file__).resolve().parents[2] / "reference",
        help="Path to the external reference folder.",
    )
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="Path to the site repository root.",
    )
    parser.add_argument(
        "--output-path",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "assets" / "data" / "reference-manifest.json",
        help="Where to save the manifest JSON.",
    )
    return parser.parse_args()


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    args = parse_args()
    manifest = build_manifest(args.reference_root, args.repo_root)
    args.output_path.parent.mkdir(parents=True, exist_ok=True)
    args.output_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
