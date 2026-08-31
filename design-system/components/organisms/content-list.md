---
file: components/organisms/content-list.md
version: 0.2.1
status: draft
updated: 2026-08-31
depends-on: components/_index.md, components/organisms/table/info.md, components/atoms/badge.md, components/atoms/icon.md, components/organisms/empty-state.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/icon.md, adaptation.md, product.md, accessibility.md
---

# ContentList

## 개요

게시판·자료실처럼 **읽을거리를 나열하는** 목록. 한 항목이 하나의 콘텐츠이고, 사용자는 그중 하나를 골라 읽는다.

데이터 테이블과의 차이 — 데이터 테이블은 행끼리 **비교**하기 위한 격자다(정렬·선택·엑셀·컬럼 설정이 붙는다). ContentList는 비교 대상이 아니라 **선택 대상**의 나열이라 컬럼 헤더가 없고, 제목만 시각 위계 최상위에 둔다. 좁은 화면에서 데이터 테이블은 가로 스크롤을 유지하지만 ContentList는 세로로 접힌다(→ `adaptation.md`).

정보 테이블과의 차이 — 시각 톤은 정보 테이블에서 가져왔다(좌우 라인·radius 없이 상하 구분선만, 줄바꿈 허용, 동일 행 높이). 갈리는 지점은 두 가지다. 정보 테이블은 클릭 대상이 아니라 hover를 껐지만 ContentList는 **행 전체가 링크**라 hover가 필수다. 그리고 정보 테이블은 `<table>`이라 컬럼 폭이 고정되지만 ContentList는 `<ul>`이라 `sm`에서 접힌다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| layout | row (기본, 클래스 없음) · stack → `content-list--stack` | row |
| header | 없음 (기본) · 있음 — `.content-list__header` 슬롯 | 없음 |
| excerpt | 없음 (기본) · 있음 — `.content-list__excerpt` 슬롯 | 없음 |
| 신규 표시 | 없음 (기본) · 있음 — `.content-list__new` 슬롯 | 없음 |

- **row** — 제목(좌)과 메타(우)를 한 줄에 둔다. 제목만으로 판단이 되는 목록의 기본형.
- **stack** — 제목 아래 메타를 놓는다. 요약문(`__excerpt`)이 있어 한 줄에 담기지 않을 때 쓴다. `sm`에서는 layout과 무관하게 stack으로 접힌다.

---

## 사용 지침

### 어느 목록에 쓰나

| 판단 | 컴포넌트 |
|------|---------|
| 사용자가 행끼리 **비교**한다 (정렬·선택·일괄 처리·엑셀) | 데이터 테이블 (`table/data.md`) |
| 사용자가 한 건을 **골라 읽는다** (게시판·자료실·공지·뉴스) | **ContentList** |
| 한 건의 **속성**을 나열한다 (계약 정보·상세 항목) | 정보 테이블 (`table/info.md`) |

### 메타에 무엇을 넣나

메타는 **읽을지 말지 판단을 돕는 정보만** 넣는다. 목록 전체에서 값이 같은 항목은 정보량이 0이므로 넣지 않는다.

- ✅ 분류(Badge) · 작성일 · 조회수 — 항목마다 다르고 선택에 영향을 준다
- ❌ 게시물 번호 — 내부 시퀀스라 읽는 사람에게 의미가 없다
- ❌ 전 건이 동일한 작성자 — 작성자가 항목마다 다른 목록에서만 넣는다

### 상태 (→ `product.md`)

| 상태 | 처리 |
|------|------|
| empty | `.content-list` 자리에 `empty-state--compact`. header(총 건수)와 검색·필터는 그대로 둔다 |
| loading | 항목 자리에 `skeleton`. 행 수와 높이를 유지해 레이아웃이 흔들리지 않게 한다 |
| error | 목록 위에 `banner--error`. 목록 구조는 유지한다 |

### 제약

- 항목 안에 버튼·체크박스 등 **별개의 클릭 대상을 넣지 않는다.** 행 전체가 링크라 클릭 영역이 겹친다. 항목별 액션이 필요하면 데이터 테이블을 쓸 화면이다.
- 페이지 제목·Breadcrumb은 이 컴포넌트가 담당하지 않는다. `__header`는 목록 자체의 건수·소제목만 다룬다.
- 총 건수와 Pagination의 총량을 중복 표기하지 않는다. 총 건수의 정본은 `__header` 한 곳이다.

<!-- AI:
레이어 계층: ContentList
  .content-list-container — div. 루트. 상하 구분선만 갖는 프레임.
  ├─ .content-list__header — div. optional. 총 건수 + 소제목.
  │    ├─ .content-list__count — span. aria-live="polite" 필수(필터 결과로 값이 바뀜).
  │    │    숫자만 <b class="content-list__count-value">로 감싼다. "총"·"건"은 subtle 유지.
  │    └─ .content-list__heading — div. 소제목. 건수 뒤에 오면 세로 구분선이 자동 삽입된다.
  │         heading 태그가 아니라 div (UA 마진으로 레이아웃 깨짐 — table__title과 동일 이유).
  └─ .content-list — ul. list-style:none.
       └─ .content-list__item — li. position:relative (링크 오버레이 기준점).
            ├─ .content-list__main — div. 제목+요약 묶음. flex:1 min-width:0.
            │    ├─ .content-list__link — a. **제목 텍스트만 감싼다.**
            │    │    ::after가 item 전체를 덮어 행 전체가 클릭된다(stretched link 패턴).
            │    │    링크명이 제목만으로 읽히므로 스크린리더에서 메타가 링크명에 섞이지 않는다.
            │    │    └─ .content-list__new — span. optional. icon-new. aria-label="신규" 필요.
            │    └─ .content-list__excerpt — p. optional. 본문 요약 2줄.
            └─ .content-list__meta — div. 분류 Badge · 작성일 · 조회수.
                 ├─ .badge.badge--neutral — 분류. badge.md 컴포넌트 직접 사용.
                 ├─ .content-list__date — span. YYYY.MM.DD (product.md 날짜 포맷).
                 └─ .content-list__views — span. icon-show + 숫자. 앞에 .sr-only "조회수" 필수.

- __header는 table__toolbar와 같은 시각 언어를 갖지만 클래스를 재사용하지 않는다.
  Organism이 다른 Organism의 파트를 참조하면 계층 규칙(_index.md)을 어기기 때문이다.
  세 번째 사용처가 생기면 Molecule로 분리한다.
- 메타는 링크 오버레이(::after) 아래에 깔린다. 메타 텍스트는 드래그 선택되지 않는다 — 목록 행에서 필요한 동작이 아니므로 허용한다.
- 아이콘은 icons/categories.json의 ID만 사용한다. 조회수는 icon-show, 신규 표시는 icon-new. sprite 경로는 icons/sprite.svg#[id].
- 외부 클래스 의존: .sr-only(components.css 전역 리셋) · .badge.badge--neutral(atoms/badge.md) · .text-badge(tokens/typography.css) ·
  empty-state--compact(organisms/empty-state.md) · skeleton(atoms/skeleton.md) · banner--error(molecules/banner.md).
- disabled 상태는 정의하지 않는다. 항목은 콘텐츠로 가는 링크일 뿐이라 비활성 개념이 없다 —
  읽을 수 없는 항목은 목록에서 제외하지, 흐리게 표시하지 않는다.
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-3xl)">

<!-- row (기본) -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">row (기본) — header 있음</p>
  <div data-component class="content-list-container">
    <div class="content-list__header">
      <span class="content-list__count" aria-live="polite">총 <b class="content-list__count-value">165</b>건</span>
      <div class="content-list__heading">자료 목록</div>
    </div>
    <ul class="content-list">
      <li class="content-list__item">
        <div class="content-list__main">
          <a class="content-list__link" href="#">2024년 건설보험료신고_노무제공자신고<span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span></a>
        </div>
        <div class="content-list__meta">
          <span class="badge badge--neutral text-badge">4대보험</span>
          <span class="content-list__date">2024.03.20</span>
          <span class="content-list__views"><span class="sr-only">조회수</span><svg aria-hidden="true"><use href="icons/sprite.svg#icon-show"/></svg>1,011</span>
        </div>
      </li>
      <li class="content-list__item">
        <div class="content-list__main">
          <a class="content-list__link" href="#">2021년 귀속 보수총액신고 방법 안내_ 비즈씨/세무사랑 사용자편</a>
        </div>
        <div class="content-list__meta">
          <span class="badge badge--neutral text-badge">4대보험</span>
          <span class="content-list__date">2022.02.21</span>
          <span class="content-list__views"><span class="sr-only">조회수</span><svg aria-hidden="true"><use href="icons/sprite.svg#icon-show"/></svg>918</span>
        </div>
      </li>
      <li class="content-list__item">
        <div class="content-list__main">
          <a class="content-list__link" href="#">건설업교육 일정 연기에 따른 교육미이수 업체 부담완화 조치방안 안내</a>
        </div>
        <div class="content-list__meta">
          <span class="badge badge--neutral text-badge">김반장뉴스레터</span>
          <span class="content-list__date">2020.09.22</span>
          <span class="content-list__views"><span class="sr-only">조회수</span><svg aria-hidden="true"><use href="icons/sprite.svg#icon-show"/></svg>89</span>
        </div>
      </li>
    </ul>
  </div>
</div>

<!-- stack — 요약문 있음 -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">stack — 요약문 있음, header 없음</p>
  <div data-component class="content-list-container">
    <ul class="content-list content-list--stack">
      <li class="content-list__item">
        <div class="content-list__main">
          <a class="content-list__link" href="#">건설업 보험료신고 이론</a>
          <p class="content-list__excerpt">건설현장에 투입된 노무제공자(건설기계, 건설화물)의 보수총액 산정 방식을 정리한 강의 자료입니다.</p>
        </div>
        <div class="content-list__meta">
          <span class="badge badge--neutral text-badge">4대보험</span>
          <span class="content-list__date">2021.03.08</span>
          <span class="content-list__views"><span class="sr-only">조회수</span><svg aria-hidden="true"><use href="icons/sprite.svg#icon-show"/></svg>1,685</span>
        </div>
      </li>
      <li class="content-list__item">
        <div class="content-list__main">
          <a class="content-list__link" href="#">보험료신고안내 — 원도급공사만 진행</a>
          <p class="content-list__excerpt">원도급공사만 수행하는 사업장의 고용·산재보험 보험료 신고 절차를 단계별로 안내합니다.</p>
        </div>
        <div class="content-list__meta">
          <span class="badge badge--neutral text-badge">4대보험</span>
          <span class="content-list__date">2021.03.08</span>
          <span class="content-list__views"><span class="sr-only">조회수</span><svg aria-hidden="true"><use href="icons/sprite.svg#icon-show"/></svg>220</span>
        </div>
      </li>
    </ul>
  </div>
</div>

<!-- empty -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">empty — 검색 결과 없음</p>
  <div data-component class="content-list-container">
    <div class="content-list__header">
      <span class="content-list__count" aria-live="polite">총 <b class="content-list__count-value">0</b>건</span>
      <div class="content-list__heading">자료 목록</div>
    </div>
    <div class="empty-state empty-state--compact">
      <p class="empty-state__title text-body">조건에 맞는 자료가 없어요</p>
    </div>
  </div>
</div>

</div>
:::

---

## Anatomy

:::preview
<div data-component class="content-list-container">
  <ul class="content-list">
    <li class="content-list__item">
      <div class="content-list__main">
        <a class="content-list__link" href="#">2024년 건설보험료신고_노무제공자신고<span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span></a>
      </div>
      <div class="content-list__meta">
        <span class="badge badge--neutral text-badge">4대보험</span>
        <span class="content-list__date">2024.03.20</span>
        <span class="content-list__views"><span class="sr-only">조회수</span><svg aria-hidden="true"><use href="icons/sprite.svg#icon-show"/></svg>1,011</span>
      </div>
    </li>
  </ul>
</div>
:::

---

## CSS

```css
/* ── Container ── */
/* table--info와 같은 톤 — 좌우 라인·radius 없이 상하 구분선만.
   읽기 전용 콘텐츠라 카드형 프레임 없이 본문 흐름에 얹힌다. */
.content-list-container {
  display: flex;
  flex-direction: column;
  background: var(--color-surface-base);
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── Header (optional) ── */
/* table__toolbar와 같은 시각 언어. 계층 규칙상 클래스를 재사용하지 않고 별도로 정의한다. */
.content-list__header {
  display: flex;
  align-items: center;
  height: var(--height-compact);
  padding: 0 var(--space-inset-xl);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  background: var(--color-surface-neutral);
}

.content-list__count {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
}

.content-list__count-value {
  color: var(--color-text-body);
  font-weight: var(--font-weight-heading);
}

.content-list__heading {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-body);
}

/* 건수가 앞에 있을 때만 세로 구분선 삽입 — 별도 마크업 불필요 */
.content-list__count + .content-list__heading {
  margin-left: var(--space-gap-md);
  padding-left: var(--space-gap-md);
  border-left: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── List ── */
.content-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ── Item ── */
/* position:relative — __link::after 오버레이의 기준점 */
.content-list__item {
  display: flex;
  align-items: center;
  gap: var(--space-gap-lg);
  position: relative;
  /* 행 사이 간격은 border만 담당한다 — margin을 명시해 호스트 페이지의 li 스타일에 흔들리지 않게 한다.
     전역 리셋 `*`(명시도 0,0,0)에 기대면 호스트가 `li { margin }`(0,0,1) 하나만 둬도 무너진다. */
  margin: 0;
  /* 좌우 inset은 table__cell과 동일 — 표와 위아래로 쌓여도 세로선이 맞는다 */
  /* 세로 padding은 --space-6 — 한 줄 제목(15px × line-height-reading ≈ 23px)에 12px를 더하면
     35px라 min-height 36px가 이긴다. 결과적으로 한 줄 행이 .table 기본 행 높이와 정확히 같아진다.
     --space-8이면 39px가 되어 표와 나란히 놓았을 때 행 높이가 어긋난다. */
  padding: var(--space-6) var(--space-inset-xl);
  min-height: var(--height-base);   /* .table 기본 행 높이 — 밀도 정책 동일(product.md) */
}

.content-list__item + .content-list__item {
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── Main (제목 + 요약) ── */
.content-list__main {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2xs);
  flex: 1;
  min-width: 0;
}

/* ── Link (제목) ── */
/* ::after가 item 전체를 덮어 행 전체가 클릭 영역이 된다.
   링크 텍스트는 제목만이라 스크린리더 링크명에 메타가 섞이지 않는다. */
/* -webkit-line-clamp는 display:-webkit-box + -webkit-box-orient:vertical과 함께여야 동작한다.
   세 속성이 한 세트이므로 따로 떼어내지 않는다. 텍스트는 DOM에 그대로 남아 스크린리더는 전문을 읽는다. */
.content-list__link {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-reading);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-body);
  text-decoration: none;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.content-list__link::after {
  content: '';
  position: absolute;
  inset: 0;
}

/* ── Excerpt (optional) ── */
/* line-clamp 3속성 세트 — __link와 동일 */
.content-list__excerpt {
  font-size: var(--font-size-base);
  line-height: var(--line-height-reading);
  color: var(--color-text-subtle);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ── New mark (optional) ── */
.content-list__new {
  display: inline-flex;
  vertical-align: middle;
  margin-left: var(--space-gap-2xs);
}

.content-list__new svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
  fill: var(--color-fill-error);
}

/* ── Meta ── */
.content-list__meta {
  display: flex;
  align-items: center;
  gap: var(--space-gap-md);
  flex-shrink: 0;
}

.content-list__date {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.content-list__views {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.content-list__views svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
  fill: var(--color-text-subtle);
}

/* ── Hover ── */
/* 정보 테이블은 hover가 없다(클릭 대상이 아님). 목록은 행 전체가 링크라 hover가 필수다.
   배경은 데이터 테이블 행 hover(.table__body .table__row:hover)와 같은 토큰을 쓴다 —
   "이 행은 누를 수 있다"는 신호는 시스템 전체에서 하나여야 한다.
   neutral 계열 hover를 쓰면 badge--neutral(surface-neutral)과 색이 겹쳐 hover 시 칩이 사라져 보인다. */
.content-list__item:hover {
  background: var(--color-action-brand-subtle);
}

.content-list__item:hover .content-list__link {
  color: var(--color-text-brand);
  text-decoration: underline;
}

/* ── Focus ── */
/* 오버레이(::after)가 아니라 제목 박스에 outline이 걸린다 — 무엇이 포커스됐는지 명확 */
.content-list__link:focus-visible {
  outline: var(--stroke-md) var(--stroke-solid) var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Layout: stack ── */
.content-list--stack .content-list__item {
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-gap-sm);
}

/* ── sm (<768px) — 세로 스택 ── */
/* 데이터 테이블과 갈리는 지점(adaptation.md). 항목이 비교 대상이 아니라 접어도 의미가 유지된다. */
@media (max-width: 767px) {
  .content-list__item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-gap-sm);
  }
  .content-list__meta { flex-wrap: wrap; }
  .content-list__link { font-size: var(--font-size-base); }
}
```

---

## 접근성

목록 유형 (`design-system/accessibility.md` 목록 행 적용).  
키보드 접근·focus·색상 대비 해당. loading·disabled 상태 없음.

| 조작 | 동작 |
|------|------|
| `Tab` | 항목의 제목 링크로 순서대로 이동. 메타는 포커스 대상이 아니다 |
| `Enter` | 포커스된 항목 열기 |

네이티브 `<a>`의 기본 동작이므로 JS 키보드 핸들러를 두지 않는다. 항목을 `<div>` + `onclick`으로 만들면 이 동작이 사라진다.

- 목록은 `<ul>` + `<li>`로 마크업한다. 스크린리더가 "목록, 항목 6개"로 항목 수를 먼저 안내한다.
- 링크는 **제목 텍스트만** 감싼다. 메타까지 `<a>`로 묶으면 링크명이 "제목 4대보험 2024.03.20 조회수 1,011"로 읽혀 목록 훑기가 불가능해진다. 행 전체 클릭은 `::after` 오버레이가 담당한다.
- 조회수는 아이콘과 숫자뿐이라 의미가 전달되지 않는다. `<span class="sr-only">조회수</span>`를 숫자 앞에 둔다.
- 신규 표시 아이콘은 장식이 아니라 정보다. `aria-label="신규"`를 부여한다(`aria-hidden` 금지).
- `content-list__count`에 `aria-live="polite"` — 검색·필터 결과로 값이 바뀔 때 읽힌다.
- 제목 2줄 말줄임은 CSS `-webkit-line-clamp`이므로 텍스트가 DOM에 그대로 남는다. 스크린리더는 전체 제목을 읽는다.

---

## Do / Don't

> ✅ DO — 링크는 제목만 감싸고, 행 전체 클릭은 오버레이로 처리
> `<div class="content-list__main"><a class="content-list__link" href="...">제목</a></div>`
> `<div class="content-list__meta">…</div>`

> ❌ DON'T — 항목 전체를 `<a>`로 감싸기 (링크명에 메타가 섞임)
> `<a class="content-list__link"><span class="content-list__title">제목</span><span class="content-list__meta">…</span></a>`

> ✅ DO — 목록 전체에서 값이 다른 메타만 표시
> `<span class="badge badge--neutral text-badge">4대보험</span> <span class="content-list__date">2024.03.20</span>`

> ❌ DON'T — 내부 시퀀스 번호·전 건 동일한 작성자 표시
> `<span class="content-list__no">165</span> <span>관리자</span>`

> ❌ DON'T — 항목 안에 별개의 클릭 대상 배치 (행 링크와 영역이 겹침)
> `<div class="content-list__meta"><button class="btn btn--sm">다운로드</button></div>`

> ❌ DON'T — 컬럼 헤더를 붙여 표처럼 만들기 (`sm`에서 접히지 않음)
> `<div class="content-list__head"><span>제목</span><span>분야</span><span>작성일</span></div>`
