# 프로젝트 지침

## 디렉터리 구조

```
tokens/          # 디자인 토큰 CSS 원본 (color.css, icon.css, space.css 등)
utilities/       # 유틸리티 클래스 CSS (icon.css, layout.css, elevation.css 등)
                 # ← tokens/에 없는 클래스가 있으면 여기를 확인한다
design-system/   # 문서 md 파일 (tokens/*.md, components/**/*.md, workflow/*.md)
icons/           # SVG 아이콘 파일 + sprite.svg + categories.json
scripts/         # sync_icons.py 등 자동화 스크립트
tokens.css       # build.py가 tokens/ + utilities/ 를 번들한 결과물 (편집 금지)
design-system.html # build.py 결과물 (편집 금지, python3 build.py로 재생성)
build.py         # HTML 빌드 스크립트
```

CSS 클래스나 토큰을 찾을 때는 `tokens/`, `utilities/`, `design-system/` 세 곳을 모두 확인한다.

## Git 브랜치 전략

변경사항은 feature 브랜치나 PR 없이 **main에 직접 반영**한다.

- `git push origin main`이 403으로 막힐 경우 `mcp__github__push_files` 도구로 main에 직접 push한다.
- PR은 사용자가 명시적으로 요청할 때만 생성한다.

## 개발 서버 (미리보기)

이 프로젝트는 `preview_start` 도구를 지원하지 않는다. 미리보기 확인이 필요할 때:

- 서버는 `ruby -run -e httpd -- -p 7890 /Users/KMS_MISO/Downloads/kbz_3.0_ui_stytem` 로 사용자가 수동 실행
- 빌드: `python3 build.py` 실행 후 브라우저에서 `http://localhost:7890/design-system.html` 확인
- `preview_*` 도구는 이 프로젝트에서 사용 불가 — 호출하지 말 것
