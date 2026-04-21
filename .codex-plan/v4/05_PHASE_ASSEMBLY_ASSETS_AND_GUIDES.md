# Phase 5 — PPT 사진/영상 기반 조립 가이드 반영

Goal: Each kit page must help a student build with images, steps, and videos.

Rules:

- Do not paste whole PPT slides blindly.
- Use the most helpful image per step.
- Each step needs: title, mission, image, check question, caution if needed, optional video time.
- Add real part photos/thumbnails when available.
- If no part image exists, use fallback emoji but do not invent files.
- Do not add files over 90MB.

Create/update:

- `assets/js/assembly-guides.js`
- `assets/images/assembly/<kit-id>/...`
- `assets/images/parts/<kit-id>/...` if available
- `assets/media/assembly/<kit-id>/assembly.mp4` compressed if needed
- `assets/media/demo/<kit-id>/demo.mp4` compressed if needed

Guide schema:

```js
window.DORO_ASSEMBLY_GUIDES = {
  "1-bluetooth-speaker": {
    kitName: "도블투스",
    title: "블루투스 스피커 조립 가이드",
    guidePdf: "../../assets/docs/assembly/1-bluetooth-speaker/guide.pdf",
    assemblyVideo: "../../assets/media/assembly/1-bluetooth-speaker/assembly.mp4",
    demoVideo: "../../assets/media/demo/1-bluetooth-speaker/demo.mp4",
    steps: [
      {
        step: 1,
        title: "스피커 프레임 확인",
        mission: "판다 얼굴판과 스피커가 들어갈 위치를 확인해요.",
        image: "../../assets/images/assembly/1-bluetooth-speaker/step-01.jpg",
        check: "스피커가 들어갈 구멍 2개를 찾았나요?",
        caution: "MDF 판을 억지로 꺾지 마세요.",
        videoTime: "00:12"
      }
    ]
  }
};
```

Build UI changes:

- Button text: “완료하고 다음 단계로”
- Buttons:
  - 이전 단계
  - 완료하고 다음 단계로
  - 조립 영상 보기
  - 문제 해결 보기
- After next step, scroll current build card into view.
- Last step buttons:
  - 완성 확인하기
  - 작동 영상 보기
  - 도전 미션으로 이동

Minimum expected steps:

- 1-bluetooth-speaker: 6–10 steps
- 2-mood-light: 6–10 steps
- 3-walking-robot: 6–10 steps
- 4-ir-car: 6–10 steps
- 5-arduino-game: 6–10 steps, but no student-facing Arduino IDE upload flow
- 6-ultrasonic-piano: 6–10 steps, but no student-facing Arduino IDE upload flow

End commands:

```bash
find assets/images/assembly -type f | sort
find assets/images/parts -type f | sort || true
find assets/media/assembly -type f | sort || true
find assets/media/demo -type f | sort || true
find assets -type f -size +90M -print
grep -R "DORO_ASSEMBLY_GUIDES\|build-step-image\|완료하고 다음 단계로" assets/js assets/css || true
git status
git diff --stat
```

Report:

1. Steps per kit
2. Images per kit
3. Videos per kit
4. Missing assets
5. File size risks
