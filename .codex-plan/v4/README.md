# DORO Science Voucher Codex V4 작업팩

이 폴더를 **최신 GitHub repo 루트**에 복사한 뒤 Codex에게 `00_MASTER_AUTONOMOUS_PROMPT.md`를 읽고 실행하라고 지시하세요.

권장 위치:

```text
DORO-Science-Voucher/.codex-plan/v4/
```

권장 실행 전 준비:

```powershell
cd C:\Users\User\Documents\Jindex\proposal\2026science-voucher\DORO-Science-Voucher
git status
codex
```

Codex 안에서:

```text
/model gpt-5.4 xhigh
/permissions full access
/sandbox-add-read-dir C:\Users\User\Documents\Jindex\proposal\2026science-voucher\reference
/sandbox-add-read-dir C:\Users\User\Documents\Jindex\proposal\2026science-voucher\reference\extracted_images
```

그 다음 Codex에게:

```text
Read .codex-plan/v4/00_MASTER_AUTONOMOUS_PROMPT.md and execute it exactly.
```

주의: 로컬 Codex CLI는 PC가 절전 모드로 들어가면 계속 실행되지 않습니다. 긴 작업 동안에는 절전 모드를 끄거나 keep-awake 스크립트를 실행하세요.
