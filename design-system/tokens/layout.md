---
file: tokens/layout.md
version: 0.1.0
depends-on: tokens/_index.md
---

# 레이아웃 시스템

페이지 골격 치수를 토큰으로 정의하고, 반복되는 구조 패턴을 유틸리티 클래스로 제공한다.

## Semantic

Primitive 없음. 페이지 골격 치수는 설계 결정값이므로 Semantic만 존재한다.

<!-- AI: :::scale layout renders layout dimension tokens:
--layout-max-width: 1440px      페이지 최대 너비
--layout-sidebar-width: 240px   사이드바 너비
--layout-topbar-height: 56px    상단 바 높이
-->
:::scale layout

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `max-width` | 페이지 콘텐츠 최대 너비 — 이 값 이상에서 중앙 정렬 | `--layout-max-width` |
| `sidebar-width` | 글로벌 내비게이션 사이드바 너비 | `--layout-sidebar-width` |
| `topbar-height` | 글로벌 상단 바 높이 | `--layout-topbar-height` |

## Utility

반복되는 레이아웃 구조 패턴을 클래스로 제공한다. 간격 값은 `tokens/space.css`의 `--space-gap-*`을 참조한다.

| 그룹 | 사용처 | 클래스 |
|------|--------|--------|
| `two-panel` | 고정 너비 패널 + 유동 패널 나란히 — 페이지·모달 공용 | `.layout-two-panel` |
| `row-between` | flex row 양끝 정렬 — 툴바·섹션 헤더 공용 | `.layout-row-between` |
| `form` | 폼 필드 수직 스택 / 폼 내 가로 필드 묶음 | `.layout-form-stack`<br>`.layout-form-row` |

> `.layout-two-panel`의 고정 패널 너비는 유틸리티가 지정하지 않는다. 컴포넌트에서 직접 `width` 또는 `flex-basis`로 설정한다.

## Do / Don't

> ✅ DO — `.layout-two-panel`로 패널 구조 적용
> `<div class="layout-two-panel"><aside style="width:240px">...</aside><main>...</main></div>`

> ✅ DO — `.layout-form-stack` + `.layout-form-row` 중첩
> `<div class="layout-form-stack"><div class="layout-form-row"><input><input></div></div>`

> ✅ DO — `.layout-row-between`을 툴바와 섹션 헤더에 공용으로 사용
> `<div class="layout-row-between"><span>섹션 제목</span><button>+ 추가</button></div>`

> ❌ DON'T — 레이아웃 패턴을 컴포넌트 CSS에서 반복 정의
> `.my-form { display: flex; flex-direction: column; gap: 20px; }` ← `.layout-form-stack` 사용

> ❌ DON'T — `.layout-two-panel` 자식에 `flex: 1`을 둘 다 적용
> 유동 패널은 자동으로 남은 공간을 차지한다. 고정 패널에만 `width`를 지정한다.

> ⚠️ `.layout-row-between`은 자식 간 gap을 지정하지 않는다. 자식 그룹 내부 간격이 필요하면 `.layout-form-row` 또는 `--space-gap-*` 직접 참조
