---
file: tokens/typography.md
version: 3.0.0
depends-on: tokens/_index.md
---

# 타이포그래피

3-tier 구조. Primitive(원시값) → Semantic(축별 의미) → Utility(컴포넌트 use case 묶음).
컴포넌트는 **`.text-*` 유틸 클래스**로 적용한다.

## Primitive

### Font Family · Font Size

단일값. Pretendard 로드 실패 시 뒤의 값이 순서대로 대체된다. 소형(11–15px)은 UI 밀도용, 중형(17–20px)은 UI 강조·소제목, 대형(28–32px)은 페이지 구조.

| 토큰 | 값 |
|------|----|
| `--font-family-base` | Pretendard, Apple SD Gothic Neo, Malgun Gothic |

:::scale font-size

### Font Weight · Line Height · Letter Spacing

:::scale typography-props

## Semantic — 4축

각 속성을 독립적인 축으로 분리한다. 유틸 클래스가 이 값을 조합한다.

| 축 | 사용처 | 토큰 |
|---|--------|------|
| `font-size` | 역할별 크기 (11–32px) | `--font-size-meta`, `--font-size-label`, `--font-size-sm`, `--font-size-base`, `--font-size-lg`, `--font-size-h4`, `--font-size-h3`, `--font-size-h2`, `--font-size-h1` |
| `line-height` | 콘텐츠 성질 — 한 줄 UI · 다줄 본문 · 긴 글 | `--line-height-ui`, `--line-height-reading`, `--line-height-prose` |
| `letter-spacing` | 계층 — 기본 · 28px 이상 대형 헤딩 | `--letter-spacing-default`, `--letter-spacing-display` |
| `font-weight` | 강조 — 본문 · 헤딩·UI · 페이지 타이틀 | `--font-weight-body`, `--font-weight-heading`, `--font-weight-display` |

## Utility — Use Case별 묶음 클래스

컴포넌트 use case별로 4축을 묶은 클래스. **컴포넌트는 이 클래스로 적용한다.**

| 그룹 | 사용처 | 클래스 |
|------|--------|--------|
| `button` | 버튼 레이블 — 소·중·대 | `.text-button-sm`, `.text-button-md`, `.text-button-lg` |
| `form` | 인풋·라벨·헬퍼 — 인풋은 소·중 | `.text-input-sm`, `.text-input-md`, `.text-form-label`, `.text-helper` |
| `table` | 데이터 테이블 헤더·셀 — 소·중·대 | `.text-table-header-sm`, `.text-table-header-md`, `.text-table-header-lg`, `.text-table-cell-sm`, `.text-table-cell-md`, `.text-table-cell-lg` |
| `navigation` | 탭·브레드크럼·메뉴 — 메뉴는 1뎁스(아이콘 보조)·그룹 제목·하위 항목 | `.text-tab`, `.text-breadcrumb`, `.text-menu-primary`, `.text-menu-group`, `.text-menu-secondary` |
| `hierarchy` | 페이지·섹션·서브섹션·카드 제목 | `.text-page-title`, `.text-section-title`, `.text-subsection-title`, `.text-card-title` |
| `modal` | 모달 타이틀 | `.text-modal-title` |
| `status` | 뱃지·태그·툴팁 | `.text-badge`, `.text-tag`, `.text-tooltip` |
| `body·meta` | 본문·캡션·메타정보 | `.text-body`, `.text-caption`, `.text-meta` |

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
