# Review Gate — Run after every phase

Run this review before moving to the next phase.

Checklist:

1. Did the phase stay within scope?
2. Did you solve the actual Notion feedback, not just superficial design?
3. Are all 6 kit pages covered when relevant?
4. Is localStorage progress preserved?
5. Are anchors, buttons, image paths, and video paths valid?
6. Did you avoid copying original large PPTX/MP4 into assets?
7. Are there any files over 90MB in assets?
8. Does desktop layout remain clean?
9. Does mobile layout remain clean?
10. Are grade 4–6 students likely to understand the copy?
11. Does git diff include unrelated changes?

Commands:

```bash
git status
git diff --stat
find assets -type f -size +90M -print
```

If issues are found:

- Fix them before the next phase.
- Update `.codex-plan/v4/run-log.md`.
- Update `.codex-plan/v4/issue-tracker.md`.

Review result format:

```text
Review Gate Result: PASS/FAIL
Problems found:
Fixes applied:
Remaining risks:
Next phase allowed: YES/NO
```
