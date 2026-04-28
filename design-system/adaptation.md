---
file: adaptation.md
version: 0.4.1
---

# 반응형 & 다크모드

> **언제 참조하나:** 레이아웃 결정·테마 처리 시 모든 사람

## 반응형 & Breakpoint

김반장 3.0은 **데스크톱 우선**이다. 태블릿까지 지원, 모바일은 추후 검토.

| Breakpoint | 너비 | 대응 디바이스 |
|------------|------|--------------|
| sm | < 768px | (현재 미지원) |
| md | 768–1024px | 태블릿 |
| lg | 1024–1440px | 데스크톱 (기본) |
| xl | ≥ 1440px | 와이드 모니터 |

Container max width: `--layout-max-width: 1440px`

### 규칙

- 컴포넌트는 컨테이너 너비에 따라 자연스럽게 stretch한다.
- Sidebar는 `lg` 이상에서만 고정. `md`에서는 collapse.
- Table은 `md` 이하에서 가로 스크롤 허용. **컬럼 reflow 금지**(데이터 비교 가능성 유지).
- Modal은 모든 breakpoint에서 max-width 고정 + 화면 가운데 정렬.

> ⚠️ 모바일(< 768px) 대응이 필요한 컴포넌트는 별도 기획 후 추가.
> ⚠️ B2B 워크플로우 특성상 태블릿 미만은 디자인 의사결정 필요.

## 다크모드 정책

**현재 라이트 모드만 지원.** 토큰 구조는 다크모드 전환을 전제로 설계되어 있으나 정식 지원은 추후 결정.

### 규칙

- 컴포넌트에서 hex값 직접 사용 금지(다크모드 전환 시 일괄 갈아끼울 수 없게 됨).
- Surface, text, border, shadow는 반드시 Semantic 토큰 경유.
- 향후 다크모드 도입 시 Primitive 추가 + Semantic 매핑 변경만으로 전환 가능하도록 유지.

> ✅ DO — Semantic 경유. 다크모드 전환 시 토큰만 바뀌면 됨
> `.card { background: var(--color-surface-base); color: var(--color-text-body); }`

> ❌ DON'T — hex·Primitive 직접 참조 (다크모드 전환 불가)
> `.card { background: #ffffff; color: var(--color-gray-900); }`

> 💡 Semantic 토큰을 지키는 한 다크모드는 토큰 레벨 작업으로 끝난다. 컴포넌트 코드는 그대로.
