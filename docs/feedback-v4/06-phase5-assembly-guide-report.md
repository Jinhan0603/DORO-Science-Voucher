# Phase 5 Assembly Guide Report

## Steps Per Kit

- `1-bluetooth-speaker`: 9 steps
- `2-mood-light`: 9 steps
- `3-walking-robot`: 8 steps
- `4-ir-car`: 7 steps
- `5-arduino-game`: 9 steps
- `6-ultrasonic-piano`: 9 steps

## Images Per Kit

- `1-bluetooth-speaker`: 9 assembly images + 1 parts overview image
- `2-mood-light`: 9 assembly images + 1 parts overview image
- `3-walking-robot`: 8 assembly images + 1 parts overview image
- `4-ir-car`: 7 assembly images + no verified parts overview image in the source PPTX
- `5-arduino-game`: 9 assembly images + 1 parts overview image
- `6-ultrasonic-piano`: 9 assembly images + 1 parts overview image

## Videos Per Kit

- `1-bluetooth-speaker`: `assembly.mp4` 20.79 MB, `demo.mp4` 10.02 MB
- `2-mood-light`: `assembly.mp4` 2.53 MB, `demo.mp4` 20.84 MB
- `3-walking-robot`: `assembly.mp4` 16.27 MB, `demo.mp4` 14.36 MB
- `4-ir-car`: `assembly.mp4` 16.49 MB, `demo.mp4` 10.05 MB
- `5-arduino-game`: `assembly.mp4` 5.72 MB, `demo.mp4` 10.23 MB
- `6-ultrasonic-piano`: `assembly.mp4` 13.76 MB, `demo.mp4` 7.59 MB

## Public Asset Paths Added

- `assets/docs/assembly/<kit-id>/guide.pdf`
- `assets/images/assembly/<kit-id>/step-*.jpg`
- `assets/images/parts/<kit-id>/overview.jpg` when a verified source image existed
- `assets/media/assembly/<kit-id>/assembly.mp4`
- `assets/media/demo/<kit-id>/demo.mp4`

## Missing Assets

- `4-ir-car`: the source PPTX had no extractable raster parts-overview image on the parts slide. The public page uses a fallback emoji card and points students to the verified PDF and assembly video instead of inventing a parts photo.
- `2-mood-light`: several wiring slides contained non-raster or low-information board graphics, so the exported step set uses the verified component closeups and later case-assembly graphics that were extractable from the source PPTX.
- `3-walking-robot`: the source PPTX step for motor-wire twisting had no extractable raster image. The public guide uses the next verified body-assembly image from the same source instead of fabricating a photo.

## File Size Risks

- No file under `assets/` exceeded 90 MB after export.
- No recompression step was required because every copied public MP4 was already far below the 90 MB limit.
- Original source PPTX files were not copied into the repo.
