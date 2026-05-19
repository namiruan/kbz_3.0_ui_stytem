# 프로젝트 지침

## Git 브랜치 전략

변경사항은 feature 브랜치나 PR 없이 **main에 직접 반영**한다.

- `git push origin main`이 403으로 막힐 경우 `mcp__github__push_files` 도구로 main에 직접 push한다.
- PR은 사용자가 명시적으로 요청할 때만 생성한다.

## 개발 서버 (미리보기)

이 프로젝트는 `preview_start` 도구를 지원하지 않는다. 미리보기 확인이 필요할 때:

- 서버는 `ruby -run -e httpd -- -p 7890 /Users/KMS_MISO/Downloads/kbz_3.0_ui_stytem` 로 사용자가 수동 실행
- 빌드: `python3 build.py` 실행 후 브라우저에서 `http://localhost:7890/design-system.html` 확인
- `preview_*` 도구는 이 프로젝트에서 사용 불가 — 호출하지 말 것
