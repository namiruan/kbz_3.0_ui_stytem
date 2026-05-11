# 프로젝트 지침

## Git 브랜치 전략

변경사항은 feature 브랜치나 PR 없이 **main에 직접 반영**한다.

- `git push origin main`이 403으로 막힐 경우 `mcp__github__push_files` 도구로 main에 직접 push한다.
- PR은 사용자가 명시적으로 요청할 때만 생성한다.
