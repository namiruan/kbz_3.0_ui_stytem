---
file: adaptation.md
version: 1.1.0
updated: 2026-06-16
---

# 반응형 & 다크모드

> **언제 참조하나:** 레이아웃 결정·테마 처리 시 모든 사람

---

## 반응형 & Breakpoint

김반장 3.0은 **데스크톱 우선**이다. 태블릿까지 지원, 모바일은 추후 검토.

| Breakpoint | 너비 | 대응 디바이스 | 지원 여부 |
|------------|------|--------------|----------|
| sm | < 768px | 모바일 | ✗ 미지원 |
| md | 768px–1023px | 태블릿 | △ 부분 지원 |
| lg | 1024px–1439px | 데스크톱 (기본) | ✓ |
| xl | ≥ 1440px | 와이드 모니터 | ✓ |

### 레이아웃 토큰

| 토큰 | 값 | 용도 |
|------|----|------|
| `--layout-sidebar-width` | 304px | 사이드바 전개 너비 |
| `--layout-sidebar-width-collapsed` | 76px | 사이드바 축소 너비 |
| `--layout-topbar-height` | 56px | 상단 글로벌 네비게이션 높이 |

### Breakpoint별 동작

**lg (1024px+) — 기본**
- 사이드바 고정 표시 (`--layout-sidebar-width`: 304px)
- 콘텐츠 영역: 화면 전체 - 사이드바. max-width 없음

**md (768px–1023px) — 태블릿**
- 사이드바 collapse (`--layout-sidebar-width-collapsed`: 76px) 또는 overlay
- 터치 타겟 최소 44×44px 확보 (`--height-base`: 36px 컴포넌트는 상하 패딩 보완)
- Table: 가로 스크롤 허용. 컬럼 reflow·숨김 금지 (데이터 비교 가능성 유지)

**sm (< 768px) — 미지원**
- 현재 별도 대응 없음. 추가 필요 시 기획 후 결정

### 미디어 쿼리 예시

```css
/* 기본(lg+): 규칙 없이 작성 */
.sidebar { width: var(--layout-sidebar-width); }

/* md 이하 — 태블릿 대응 */
@media (max-width: 1023px) {
  .sidebar { width: var(--layout-sidebar-width-collapsed); }
}

/* md 이상 — 태블릿 전용 override */
@media (min-width: 768px) and (max-width: 1023px) {
  .table-container { overflow-x: auto; }
}
```

### 규칙

- 컴포넌트는 컨테이너 너비에 따라 자연스럽게 stretch한다
- Modal은 모든 breakpoint에서 크기별 max-width 고정 + 화면 가운데 정렬
- 컴포넌트 내부 레이아웃 reflow는 각 컴포넌트 `.md` 명세를 따른다
- 모바일(< 768px) 대응이 필요한 컴포넌트는 별도 기획 후 추가

> ⚠️ B2B 워크플로우 특성상 태블릿 미만은 디자인 의사결정 필요.

---

## 다크모드 정책

**현재 라이트 모드만 지원.** 토큰 구조는 다크모드 전환을 전제로 설계되어 있으나 정식 지원은 추후 결정.

### 규칙

- 컴포넌트에서 hex값·Primitive 토큰(`--color-gray-*` 등) 직접 사용 금지
- `surface`, `text`, `border`, `shadow`는 반드시 Semantic 토큰 경유
- 향후 다크모드 도입 시 Primitive 추가 + Semantic 매핑 변경만으로 전환 가능하도록 유지

> ✅ DO — Semantic 경유. 다크모드 전환 시 토큰만 바뀌면 됨
> `.card { background: var(--color-surface-base); color: var(--color-text-body); }`

> ❌ DON'T — hex·Primitive 직접 참조 (다크모드 전환 불가)
> `.card { background: #ffffff; color: var(--color-gray-900); }`

> 💡 Semantic 토큰을 지키는 한 다크모드는 토큰 레벨 작업으로 끝난다. 컴포넌트 코드는 그대로.

### Semantic 토큰 분류 (요약)

| 분류 | 접두사 | 예시 |
|------|--------|------|
| 배경·표면 | `--color-surface-*` | `surface-base`, `surface-subtle`, `surface-dark` |
| 텍스트 | `--color-text-*` | `text-body`, `text-subtle`, `text-disabled` |
| 테두리 | `--color-border-*` | `border-default`, `border-brand`, `border-error` |
| 액션(hover·pressed) | `--color-action-*` | `action-brand-hover`, `action-neutral-pressed` |
| 채우기(버튼·뱃지) | `--color-fill-*` | `fill-brand`, `fill-error` |

색상 전체 목록 → `tokens/color.md`
