---
file: components/molecules/accordion.md
version: 0.2.2
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/height.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/typography.md, tokens/icon.md, components/atoms/icon.md, components/atoms/badge.md, components/atoms/button.md
---

# Accordion

## 개요

섹션 제목을 클릭해 콘텐츠를 펼치고 접는 컴포넌트. 헤더(토글 아이콘·제목·카운트·액션)와 콘텐츠 영역으로 구성된다. 여러 섹션이 각자 독립적으로 열리고 닫히며, 동시에 여러 섹션을 열어 둘 수 있다.

Tab과의 차이 — Tab은 하나의 패널 영역에서 뷰를 전환한다. Accordion은 여러 섹션을 각자 펼침/접음으로 정보 밀도를 제어하며, 콘텐츠는 각 섹션 아래에 독립적으로 펼쳐진다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| state | collapsed (기본, 클래스 없음) · expanded → `accordion__item--expanded` | collapsed |
| count | 없음 (기본) · 있음 — `badge badge--brand badge--pill badge--line` 삽입 | 없음 |
| actions | 없음 (기본) · 있음 — `accordion__actions` 슬롯에 버튼 배치 | 없음 |

---

## 사용 지침

| 상황 | 권장 |
|------|------|
| 여러 섹션을 한 페이지에 배치, 초기 로드 시 일부 접기 | Accordion |
| 콘텐츠 패널을 하나만 활성화 | Tab |
| 섹션 내 항목 수를 함께 표시 | 헤더에 `badge` 삽입 |
| 섹션 고유 액션(추가·삭제·수정 등)이 있을 때 | `accordion__actions` 슬롯 활용 |

**제약**
- `accordion__actions`는 `accordion__header` 버튼의 형제 요소로 배치한다. 버튼 내부에 버튼을 중첩하면 HTML 유효성 위반 및 키보드 동작 이상이 발생한다.
- 섹션이 1개뿐인 경우에도 사용 가능 — `.accordion` 그룹 래퍼 없이 `.accordion__item` 단독 사용.

---

## 동작

헤더 클릭 시 `accordion__item--expanded` 토글 + `aria-expanded` 갱신. `prefers-reduced-motion: no-preference` 환경에서는 `max-height` transition으로 콘텐츠 영역이 자연스럽게 펼쳐진다.

| 이벤트 | 동작 |
|--------|------|
| 헤더 버튼 클릭 (접힌 상태) | `accordion__item--expanded` 추가 + `aria-expanded="true"` + body 펼침 |
| 헤더 버튼 클릭 (펼친 상태) | `accordion__item--expanded` 제거 + `aria-expanded="false"` + body 접힘 |
| `accordion__actions` 버튼 클릭 | 헤더와 별개 요소 — 토글 없이 액션만 실행 |
| `Enter` · `Space` (헤더 포커스 중) | `<button>` 기본 동작으로 클릭 이벤트 자동 발생 |

```js init
function initAccordion(container) {
  container.querySelectorAll('.accordion__item').forEach(function(item) {
    if (item.dataset.initAccordion) return;
    item.dataset.initAccordion = '1';
    var header = item.querySelector('.accordion__header');
    if (!header) return;
    header.addEventListener('click', function() {
      var expanded = item.classList.toggle('accordion__item--expanded');
      header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
}
if (window.__componentInits && !window.__componentInits.initAccordion) window.__componentInits.initAccordion = initAccordion;
```

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-md);max-width:680px">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">접힌 상태</p>
  <div data-component class="accordion__item">
    <div class="accordion__header-row">
      <button class="accordion__header" type="button" aria-expanded="false" aria-controls="demo-acc-body-1" id="demo-acc-h1">
        <span class="accordion__toggle" aria-hidden="true">
          <span class="icon icon--sm accordion__icon--collapsed"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
          <span class="icon icon--sm accordion__icon--expanded"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span>
        </span>
        <span class="accordion__title">입퇴사</span>
        <span class="badge badge--brand badge--pill badge--line" aria-label="2건">2</span>
      </button>
      <div class="accordion__actions">
        <button class="btn btn--ghost btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>삭제</button>
        <button class="btn btn--primary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>추가</button>
      </div>
    </div>
    <div class="accordion__body" id="demo-acc-body-1" role="region" aria-labelledby="demo-acc-h1">
      <div class="accordion__content">
        <p class="text-helper" style="color:var(--color-text-subtle)">입퇴사 콘텐츠 영역</p>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">펼친 상태 — 카운트 + 액션</p>
  <div data-component class="accordion__item accordion__item--expanded">
    <div class="accordion__header-row">
      <button class="accordion__header" type="button" aria-expanded="true" aria-controls="demo-acc-body-2" id="demo-acc-h2">
        <span class="accordion__toggle" aria-hidden="true">
          <span class="icon icon--sm accordion__icon--collapsed"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
          <span class="icon icon--sm accordion__icon--expanded"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span>
        </span>
        <span class="accordion__title">근무정보</span>
        <span class="badge badge--brand badge--pill badge--line" aria-label="7건">7</span>
      </button>
      <div class="accordion__actions">
        <button class="btn btn--ghost btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>삭제</button>
        <button class="btn btn--primary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>추가</button>
      </div>
    </div>
    <div class="accordion__body" id="demo-acc-body-2" role="region" aria-labelledby="demo-acc-h2">
      <div class="accordion__content">
        <p class="text-helper" style="color:var(--color-text-subtle)">근무정보 콘텐츠 영역</p>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">펼친 상태 — 카운트 없음</p>
  <div data-component class="accordion__item accordion__item--expanded">
    <div class="accordion__header-row">
      <button class="accordion__header" type="button" aria-expanded="true" aria-controls="demo-acc-body-3" id="demo-acc-h3">
        <span class="accordion__toggle" aria-hidden="true">
          <span class="icon icon--sm accordion__icon--collapsed"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
          <span class="icon icon--sm accordion__icon--expanded"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span>
        </span>
        <span class="accordion__title">기타 특이사항</span>
      </button>
      <div class="accordion__actions">
        <button class="btn btn--secondary btn--sm" type="button">수정하기</button>
      </div>
    </div>
    <div class="accordion__body" id="demo-acc-body-3" role="region" aria-labelledby="demo-acc-h3">
      <div class="accordion__content">
        <p class="text-helper" style="color:var(--color-text-subtle)">기타 특이사항 콘텐츠 영역</p>
      </div>
    </div>
  </div>
</div>

</div>
<script>
initAccordion(stage);
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.accordion__item — 단독 또는 div.accordion 그룹 안에서 사용.
- header-row = div.accordion__header-row — 헤더 버튼과 액션 슬롯을 나란히 배치하는 flex 행.
- header = button.accordion__header[aria-expanded="true/false"][aria-controls="body-id"][id="header-id"] — 토글 클릭 영역. flex:1로 actions를 제외한 가로 공간 전체 차지.
- toggle = span.accordion__toggle[aria-hidden="true"] — 두 icon 스팬이 항상 DOM에 존재. CSS로 collapsed/expanded 아이콘 전환.
  - accordion__icon--collapsed: span.icon.icon--sm — 기본 표시(icon-chevron-down), expanded 상태에서 숨김.
  - accordion__icon--expanded: span.icon.icon--sm — expanded 상태에서 표시(icon-collapse), 기본 숨김.
- title = span.accordion__title — 헤더 제목 텍스트. badge가 바로 이어서 옴.
- count = span.badge.badge--brand.badge--pill.badge--line[aria-label="N건"] — 선택적 카운트 뱃지. aria-label로 "N건" 제공. 없으면 생략 가능.
- actions = div.accordion__actions — 선택적 오른쪽 액션 슬롯. accordion__header의 형제 요소로 배치(버튼 내부 중첩 금지). 없으면 생략 가능.
- body = div.accordion__body[id=""][role="region"][aria-labelledby="header-id"] — 접힘/펼침 대상. 기본 display:none; expanded 시 display:block. prefers-reduced-motion 없을 때는 max-height 0→800px transition으로 애니메이션.
- content = div.accordion__content — 실제 콘텐츠 패딩 담당.
- expanded = accordion__item--expanded — JS 토글. accordion__header aria-expanded="true" + accordion__body 표시.
- 그룹 사용 시 div.accordion로 감싸면 gap 자동 적용. 단독 사용 시 래퍼 불필요.
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">collapsed</span>
  <div data-component class="accordion__item" style="max-width:480px;width:100%">
    <div class="accordion__header-row">
      <button class="accordion__header" type="button" aria-expanded="false" aria-controls="anat-acc-body-1" id="anat-acc-h1">
        <span class="accordion__toggle" aria-hidden="true">
          <span class="icon icon--sm accordion__icon--collapsed"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
          <span class="icon icon--sm accordion__icon--expanded"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span>
        </span>
        <span class="accordion__title">섹션 제목</span>
        <span class="badge badge--brand badge--pill badge--line" aria-label="3건">3</span>
      </button>
      <div class="accordion__actions">
        <button class="btn btn--primary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>추가</button>
      </div>
    </div>
    <div class="accordion__body" id="anat-acc-body-1" role="region" aria-labelledby="anat-acc-h1">
      <div class="accordion__content"><p class="text-helper" style="color:var(--color-text-subtle)">콘텐츠 영역</p></div>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">expanded</span>
  <div data-component class="accordion__item accordion__item--expanded" style="max-width:480px;width:100%">
    <div class="accordion__header-row">
      <button class="accordion__header" type="button" aria-expanded="true" aria-controls="anat-acc-body-2" id="anat-acc-h2">
        <span class="accordion__toggle" aria-hidden="true">
          <span class="icon icon--sm accordion__icon--collapsed"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
          <span class="icon icon--sm accordion__icon--expanded"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span>
        </span>
        <span class="accordion__title">섹션 제목</span>
        <span class="badge badge--brand badge--pill badge--line" aria-label="3건">3</span>
      </button>
      <div class="accordion__actions">
        <button class="btn btn--primary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>추가</button>
      </div>
    </div>
    <div class="accordion__body" id="anat-acc-body-2" role="region" aria-labelledby="anat-acc-h2">
      <div class="accordion__content"><p class="text-helper" style="color:var(--color-text-subtle)">콘텐츠 영역</p></div>
    </div>
  </div>
</div>

</div>
<script>
initAccordion(stage);
</script>
:::

---

## CSS

```css
/* ── Group wrapper (optional) ── */
/* 여러 accordion__item을 묶을 때 사용. gap으로 아이템 간 간격 자동 적용 */
.accordion {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
}

/* ── Item ── */
/* 단일 섹션 단위. background + radius로 카드 형태. overflow:hidden으로 body 펼침 중 radius 클리핑 */
.accordion__item {
  border-radius: var(--radius-lg);
  background: var(--color-surface-base);
  overflow: hidden;
  transition: box-shadow var(--duration-fast) var(--easing-base);
}
/* :has — 헤더 영역 hover 시 카드 전체에 브랜드 외곽선 */
.accordion__item:has(.accordion__header-row:hover) {
  box-shadow: 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle);
}

/* ── Header row ── */
/* 헤더 버튼과 액션 슬롯을 나란히 배치하는 flex 행 */
.accordion__header-row {
  display: flex;
  align-items: center;
  min-height: var(--height-loose);
  transition: background var(--duration-fast) var(--easing-base);
}
.accordion__header-row:hover {
  background: var(--color-action-brand-subtle);
}
.accordion__header-row:hover .accordion__title,
.accordion__header-row:hover .accordion__toggle {
  color: var(--color-text-brand);
}
/* expanded 상태가 hover보다 소스 뒤에 위치 — 명시도 동일(0,2,0)이므로 확장 중 hover 시 body 색(neutral)으로 유지됨. 의도된 동작 */
.accordion__item--expanded .accordion__title,
.accordion__item--expanded .accordion__toggle {
  color: var(--color-text-body);
}

/* ── Header button ── */
/* flex:1 — actions를 제외한 가로 공간 전체 차지 */
.accordion__header {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
  min-height: var(--height-loose);
  padding: var(--space-inset-sm) var(--space-inset-xl);
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}
.accordion__header:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Toggle icon ── */
/* span.icon.icon--sm 패턴 사용 — sprite use href로 icon-chevron-down/icon-minus 참조. aria-hidden — 시각 전용 */
.accordion__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-text-brand);
}

/* collapsed 상태: chevron-down 표시, minus 숨김 */
.accordion__icon--expanded { display: none; }
.accordion__icon--collapsed { display: inline-flex; }

/* expanded 상태: minus 표시, chevron 숨김 */
.accordion__item--expanded .accordion__icon--expanded { display: inline-flex; }
.accordion__item--expanded .accordion__icon--collapsed { display: none; }

/* ── Title ── */
.accordion__title {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-ui);
  color: var(--color-text-brand);
}

/* ── Actions slot ── */
/* accordion__header의 형제 요소 — 버튼 내부 중첩 금지. padding-right로 헤더와 우측 여백 통일 */
.accordion__actions {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  flex-shrink: 0;
  padding-right: var(--space-inset-xl);
}

/* ── Body (collapse/expand) ── */
.accordion__body {
  display: none;
}
.accordion__item--expanded .accordion__body {
  display: block;
}

.accordion__content {
  padding: var(--space-inset-2xl);
}

@media (prefers-reduced-motion: no-preference) {
  .accordion__body {
    display: block;
    overflow: hidden;
    max-height: 0;
    transition: max-height var(--duration-base) var(--easing-symmetric);
  }
  .accordion__item--expanded .accordion__body {
    max-height: 800px;
  }
}
```

---

## 접근성

disclosure(펼침/접힘) 패턴.

| 상황 | 마크업 |
|------|--------|
| 헤더 버튼 | `<button aria-expanded="false/true" aria-controls="body-id" id="header-id">` |
| 콘텐츠 영역 | `<div role="region" id="body-id" aria-labelledby="header-id">` |
| 토글 아이콘 | `aria-hidden="true"` — 시각 전용 |
| 카운트 badge | `aria-label="N건"` — 숫자만으로 의미 전달이 부족할 때 보조 텍스트 제공 |
| 비활성 | accordion에 disabled 상태 없음 — 섹션 자체를 숨기거나 콘텐츠 내 컨트롤을 개별 비활성 처리 |
| 키보드 — `Tab` · `Shift+Tab` | 헤더 버튼 및 액션 버튼 간 포커스 이동. `<button>` 기본 동작 |
| 키보드 — `Enter` · `Space` | 헤더 버튼 활성화 — `<button>` 기본 동작으로 자동 지원 |

```js
// 토글 핸들러 예시
header.addEventListener('click', function() {
  var expanded = item.classList.toggle('accordion__item--expanded');
  header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});
```

---

## Do / Don't

> ✅ DO — `accordion__actions`를 `accordion__header` 버튼의 형제로 배치
> `<div class="accordion__header-row"><button class="accordion__header">...</button><div class="accordion__actions">...</div></div>`

> ❌ DON'T — `accordion__actions` 버튼을 `accordion__header` 버튼 내부에 중첩
> 버튼 안에 버튼은 HTML 유효성 위반 — 키보드 탐색과 스크린리더 동작 이상 발생

> ✅ DO — `accordion__header`를 `<button>`으로 정의
> `Enter`·`Space` 키보드 동작과 스크린리더 버튼 역할 자동 지원

> ❌ DON'T — `<div>` · `<span>` 등 비버튼 요소에 `onclick` 부여
> 키보드 접근·스크린리더 인식 불가

> ✅ DO — 카운트 badge에 `aria-label="N건"` 제공
> 숫자 단독으로는 맥락이 전달되지 않으므로 보조 텍스트 명시

> ✅ DO — 여러 item을 묶을 때 `.accordion` 그룹 래퍼 사용
> gap이 자동 적용되어 아이템 간 간격을 일관되게 제어할 수 있다

> ❌ DON'T — 단일 섹션에 Tab 대신 Accordion 사용
> 섹션이 1개이고 항상 표시되어야 한다면 단독 카드·패널로 처리한다
