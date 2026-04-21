# Phase 2 — reference 자료 분석 및 manifest 작성

Do not edit UI/site behavior in this phase.

Reference folders:

```text
C:\Users\User\Documents\Jindex\proposal\2026science-voucher\reference
C:\Users\User\Documents\Jindex\proposal\2026science-voucher\reference\extracted_images
```

Scan subfolders, especially:

- `6종_키트_안내서_조립PT 및 영상`
- `실제작동영상`

Kit mapping:

| kit id | Korean name | aliases |
|---|---|---|
| 1-bluetooth-speaker | 블루투스 스피커 | 도블투스, 스피커 |
| 2-mood-light | 스마트 무드등 | 도도무드, 무드등 |
| 3-walking-robot | 워킹 로봇 | 도봇, 2족 보행 로봇 |
| 4-ir-car | IR 자동차 | 도카, IR자동차 |
| 5-arduino-game | 아두이노 게임기 | 도텐도, 게임기 |
| 6-ultrasonic-piano | 초음파 피아노 | 도짜르트, 피아노 |

Tasks:

1. List all files with path, extension, size.
2. Map PDF/PPTX/assembly MP4/demo MP4 to each kit.
3. Check tools:

```powershell
python --version
python -c "import pptx; print('python-pptx ok')"
where soffice
where ffmpeg
where magick
where pdftoppm
```

4. Create tools:
   - `tools/build_reference_manifest.py`
   - `tools/extract_pptx_assets.py`

5. Generate:
   - `assets/data/reference-manifest.json`
   - `docs/feedback-v4/05-reference-manifest-report.md`

Manifest schema:

```json
{
  "1-bluetooth-speaker": {
    "kitName": "블루투스 스피커",
    "source": {
      "pdf": "absolute/path/or/null",
      "pptx": "absolute/path/or/null",
      "assemblyVideo": "absolute/path/or/null",
      "demoVideo": "absolute/path/or/null"
    },
    "ppt": {
      "slideCount": 0,
      "slides": []
    },
    "status": {
      "missing": [],
      "warnings": []
    }
  }
}
```

Do not copy original large assets into `assets`. Only analyze and extract metadata.

End commands:

```bash
git status
git diff -- tools assets/data docs/feedback-v4
find assets -type f -size +90M -print
```

Report:

1. 6 kit asset mapping
2. Missing assets
3. PPT extraction status
4. Video size/compression need
5. Files created
