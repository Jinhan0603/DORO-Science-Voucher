from __future__ import annotations

import subprocess
from pathlib import Path

import imageio_ffmpeg

from assembly_source_config import DEMO_REFERENCE_DIR, KIT_CONFIGS, V5_ROOT


DEMO_DIR = V5_ROOT / "assets" / "media" / "demo"


def compress_video(source: Path, target: Path, ffmpeg_path: str) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    command = [
        ffmpeg_path,
        "-y",
        "-i",
        str(source),
        "-map",
        "0:v:0",
        "-map",
        "0:a?",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "28",
        "-pix_fmt",
        "yuv" + "420p",
        "-vf",
        "scale=min(1280\\,iw):-2",
        "-movflags",
        "+faststart",
        "-c:a",
        "aac",
        "-b:a",
        "96k",
        str(target),
    ]
    subprocess.run(command, check=True)


def main() -> None:
    ffmpeg_path = imageio_ffmpeg.get_ffmpeg_exe()
    for kit_id, config in KIT_CONFIGS.items():
        source = DEMO_REFERENCE_DIR / config["demoVideoName"]
        target = DEMO_DIR / kit_id / "demo.mp4"
        compress_video(source, target, ffmpeg_path)
        print(f"compressed {source.name} -> {target}")


if __name__ == "__main__":
    main()
