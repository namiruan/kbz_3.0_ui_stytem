---
file: tokens/typography.md
version: 1.1.0
depends-on: tokens/_index.md
---

# 타이포그래피 시스템

3-tier 구조. Primitive(원시값) → Semantic(축별 의미) → Utility(컴포넌트 use case 묶음).
컴포넌트는 **`.text-*` 유틸 클래스**로 적용한다.

## Primitive

### Font Size

소형(11–15px)은 UI 밀도용, 중형(17–20px)은 UI 강조·소제목, 대형(28–32px)은 페이지 구조.

<!-- AI: :::scale font-size renders primitive font-size tokens:
--font-size-11: 11px  --font-size-12: 12px  --font-size-13: 13px
--font-size-14: 14px  --font-size-15: 15px  --font-size-17: 17px
--font-size-20: 20px  --font-size-28: 28px  --font-size-32: 32px
-->
:::scale font-size

### Font Weight · Line Height · Letter Spacing

<!-- AI: :::scale typography-props renders:
Font weight:    --font-weight-regular: 400 | --font-weight-medium: 500 | --font-weight-semibold: 600 | --font-weight-bold: 700
Line height:    --line-height-none: 1 | --line-height-tight: 1.25 | --line-height-base: 1.5 | --line-height-relaxed: 1.625
Letter spacing: --letter-spacing-tight: -0.02em | --letter-spacing-normal: 0em | --letter-spacing-wide: 0.05em
-->
:::scale typography-props

## Semantic — 5축

각 속성을 독립적인 축으로 분리한다. 유틸 클래스가 이 값을 조합한다.

| 축 | 사용처 | 토큰 |
|---|--------|------|
| `font-family` | 기본 서체 스택 — Pretendard 로드 실패 시 뒤의 폰트가 순서대로 대체 | `--font-family-base` |
| `font-size` | 역할별 크기 (11–32px) | `--font-size-meta`<br>`--font-size-label`<br>`--font-size-sm`<br>`--font-size-base`<br>`--font-size-lg`<br>`--font-size-h4`<br>`--font-size-h3`<br>`--font-size-h2`<br>`--font-size-h1` |
| `line-height` | 콘텐츠 성질 — 한 줄 UI · 다줄 본문 · 긴 글 | `--line-height-ui`<br>`--line-height-reading`<br>`--line-height-prose` |
| `letter-spacing` | 계층 — 기본 · 28px 이상 대형 헤딩 | `--letter-spacing-default`<br>`--letter-spacing-display` |
| `font-weight` | 강조 — 본문 · 헤딩·UI · 페이지 타이틀 | `--font-weight-body`<br>`--font-weight-heading`<br>`--font-weight-display` |

## Utility — Use Case별 묶음 클래스

컴포넌트 use case별로 5축을 묶은 클래스. **컴포넌트는 이 클래스로 적용한다.**

| 그룹 | 사용처 | 클래스 |
|------|--------|--------|
| `button` | 버튼 레이블 — 소·중·대 | `.text-button-sm`<br>`.text-button-md`<br>`.text-button-lg` |
| `form` | 인풋·라벨·헬퍼 — 인풋은 소·중 | `.text-input-sm`<br>`.text-input-md`<br>`.text-form-label`<br>`.text-helper` |
| `table` | 데이터 테이블 헤더·셀 — 소·중·대 | `.text-table-header-sm`<br>`.text-table-header-md`<br>`.text-table-header-lg`<br>`.text-table-cell-sm`<br>`.text-table-cell-md`<br>`.text-table-cell-lg` |
| `navigation` | 탭·브레드크럼·메뉴 — 메뉴는 1뎁스 항목·그룹 제목·하위 항목 | `.text-tab`<br>`.text-breadcrumb`<br>`.text-menu-item`<br>`.text-menu-group`<br>`.text-menu-list-item` |
| `hierarchy` | 페이지·카드 제목 | `.text-page-title`<br>`.text-card-title` |
| `modal` | 모달 타이틀 — 대·소 | `.text-modal-title`<br>`.text-modal-title-sm` |
| `status` | 뱃지·칩·툴팁 | `.text-badge`<br>`.text-chip`<br>`.text-tooltip` |
| `body·meta` | 기능 설명·본문·메타정보 | `.text-description`<br>`.text-body`<br>`.text-meta` |

## Do / Don't

> ✅ DO — `.text-*` 유틸 클래스 적용
> `<button class="text-button-md">버튼</button>`
> `<p class="text-body">본문</p>`

> ✅ DO — use case 없을 때 Semantic 토큰 직접 참조
> `font-size: var(--font-size-base);`
> `font-weight: var(--font-weight-heading);`

> ❌ DON'T — Primitive 직접 참조
> `font-size: var(--font-size-14);`

> ❌ DON'T — 임의값 직접 사용
> `font-size: 14px; line-height: 1.5;`

> ⚠️ 새 use case가 반복적으로 등장하면 → 새 `.text-*` 클래스 추가
> ⚠️ 본문 최소 13px (가독성)
