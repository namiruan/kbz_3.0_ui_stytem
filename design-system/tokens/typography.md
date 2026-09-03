---
file: tokens/typography.md
version: 1.1.0
depends-on: tokens/_index.md
---

# 타이포그래피 시스템

3-tier 구조. Primitive(원시값) → Semantic(축별 의미) → Utility(use case 묶음).
**컴포넌트 CSS는 Semantic 토큰을 직접 사용한다.** `.text-*` 유틸 클래스는 컴포넌트 밖 텍스트 영역(테이블 셀, 네비게이션, 페이지 본문 등 HTML에서 직접 타이포그래피를 지정해야 하는 비컴포넌트 영역)전용이다.

## Primitive

### Font Size

소형(11–15px)은 UI 밀도용, 중형(17–24px)은 UI 강조·소제목·게시판 본문, 대형(28–32px)은 페이지 구조.

<!-- AI: :::scale font-size renders primitive font-size tokens:
--font-size-11: 11px  --font-size-12: 12px  --font-size-13: 13px
--font-size-14: 14px  --font-size-15: 15px  --font-size-17: 17px
--font-size-20: 20px  --font-size-24: 24px  --font-size-28: 28px
--font-size-32: 32px
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
| `font-size` | **업무 화면** 역할별 크기 (11–32px) | `--font-size-meta`<br>`--font-size-label`<br>`--font-size-sm`<br>`--font-size-base`<br>`--font-size-lg`<br>`--font-size-h4`<br>`--font-size-h3`<br>`--font-size-h2`<br>`--font-size-h1` |
| `font-size` | **게시판 본문**(에디터 영역) 크기 (17–32px) — 아래 「게시판 본문 사다리」 | `--font-size-board-body`<br>`--font-size-board-h4`<br>`--font-size-board-h3`<br>`--font-size-board-h2`<br>`--font-size-board-h1` |
| `line-height` | 콘텐츠 성질 — 한 줄 UI · 다줄 본문 · 긴 글 · 줄바꿈되는 헤딩 | `--line-height-ui`<br>`--line-height-reading`<br>`--line-height-prose`<br>`--line-height-heading` |
| `letter-spacing` | 계층 — 기본 · 28px 이상 대형 헤딩 | `--letter-spacing-default`<br>`--letter-spacing-display` |
| `font-weight` | 강조 — 본문 · 헤딩·UI · 페이지 타이틀 | `--font-weight-body`<br>`--font-weight-heading`<br>`--font-weight-display` |

### 게시판 본문 사다리

업무 화면의 `h1`~`h4`는 **사다리가 아니라 역할 이름**이다 — `h4`는 카드 제목·대형 버튼, `h3`은 섹션 제목,
`h2`는 모달 제목, `h1`은 페이지 제목이다. 서로 다른 자리의 크기라서 단계 사이 비율이 고르지 않다
(`20→28`은 한 번에 1.4배 뛴다). 반면 에디터의 `h1`~`h4`는 **한 문서 안의 목차**라서 단계가 고르게 벌어져야 한다.
그래서 업무 화면 사다리를 17/14배로 늘리는 방식(→ 17·21·24·34·39)은 쓰지 않았다 — 뜻이 없는 1.4배 점프가
그대로 따라오고, 24와 34 사이가 끊어져 보인다.

대신 시스템이 **이미 가진 구간**을 고르게 폈다. 본문 17px은 업무 화면의 `h4`이고 꼭대기 32px은 `h1`이다.
이 17~32를 4단계 등비(≈1.17)로 나눈 것이 게시판 사다리다. 새로 만든 원시값은 `--font-size-24` 하나뿐이다.

| 토큰 | 크기 | 앞 단계 대비 | 쓰는 곳 |
|---|---|---|---|
| `--font-size-board-h1` | 32px | ×1.14 | 글 제목 — **본문 안에서는 쓰지 않는다** (아래 참조) |
| `--font-size-board-h2` | 28px | ×1.17 | 본문 최상위 헤딩 |
| `--font-size-board-h3` | 24px | ×1.20 | 본문 중간 헤딩 |
| `--font-size-board-h4` | 20px | ×1.18 | 본문 하위 헤딩 |
| `--font-size-board-body` | 17px | — | 본문 문단 |

> ⚠️ **본문 안의 헤딩은 글 제목보다 클 수 없다.** 글 제목이 그 문서의 `h1`이므로 본문은 `h2`부터 쓴다
> (HTML 아웃라인 규칙이기도 하다). 에디터 툴바가 `h1`을 제공한다면 그 자리에는 `board-h1`이 아니라
> `board-h2`를 매핑한다.

> ⚠️ **글 제목이 `board-h1`(32px)로 올라가면 게시판 이름은 그 아래로 내려야 한다.** 현재 상세 화면은
> 게시판 이름에 `.text-page-title`(32px), 글 제목에 `.text-modal-title`(20px)을 써서 계층이 뒤집혀 있다 —
> "작아 보인다"의 실체가 이것이다. 게시판 이름은 Breadcrumb 계열로 내리는 것이 맞다. 화면 조립 규칙이라
> 이 문서가 아니라 `components/_requests.md`의 DetailPage에서 확정한다.

> ⚠️ 목록(ContentList)·폼·테이블은 **업무 화면 크기를 그대로 쓴다.** 게시판 화면이라는 이유로 목록까지
> 17px로 올리지 않는다 — 목록은 읽는 글이 아니라 훑는 UI다. 필요해지면 그때 별도로 판단한다.

## Utility — Use Case별 묶음 클래스

컴포넌트 밖 텍스트 영역에서 use case별로 5축을 묶어 쓰는 클래스. **컴포넌트 CSS 내부에는 사용하지 않는다 — 컴포넌트는 Semantic 토큰을 직접 정의한다.**

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
| `board` | 게시판 본문(에디터 영역) 문단·헤딩 | `.text-board-h1`<br>`.text-board-h2`<br>`.text-board-h3`<br>`.text-board-h4`<br>`.text-board-body` |

## Do / Don't

> ✅ DO — 컴포넌트 밖 텍스트에 `.text-*` 유틸 클래스 사용
> `<td class="text-table-cell-sm">값</td>`
> `<p class="text-body">본문</p>`
> `<span class="text-meta">2024-01-01</span>`

> ✅ DO — 컴포넌트 CSS 내부에서는 Semantic 토큰 직접 정의
> `.my-component__label { font-size: var(--font-size-base); line-height: var(--line-height-ui); }`

> ❌ DON'T — 컴포넌트 CSS 내부에 `.text-*` 유틸 클래스 혼용
> 컴포넌트는 CSS에서 토큰을 직접 사용한다 — 유틸 클래스는 HTML에서 비컴포넌트 텍스트에만 적용

> ❌ DON'T — Primitive 직접 참조
> `font-size: var(--font-size-14);`

> ❌ DON'T — 임의값 직접 사용
> `font-size: 14px; line-height: 1.5;`

> ✅ DO — 게시판 본문에는 board 사다리
> `<h2 class="text-board-h2">지적사항</h2>`
> `<p class="text-board-body">현장별 조치 기한은…</p>`

> ❌ DON'T — 게시판 화면이라는 이유로 목록·폼·테이블까지 board 사다리 적용
> `<td class="text-board-body">2024.03.20</td>` — 셀은 읽는 글이 아니라 훑는 UI다. `.text-table-cell-sm`을 쓴다

> ❌ DON'T — 본문 헤딩에 `--line-height-ui`(1.0)
> 본문 헤딩은 길이를 시스템이 정하지 못해 두 줄로 넘어간다. `--line-height-heading`(1.25)을 쓴다

> ⚠️ 새 use case가 반복적으로 등장하면 → 새 `.text-*` 클래스 추가
> ⚠️ 본문 최소 13px (가독성) — 업무 화면 기준. 게시판 본문은 17px이 기본이다
