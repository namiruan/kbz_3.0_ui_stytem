---
file: components/molecules/table-cell.md
version: 0.1.0
status: draft
updated: 2026-06-09
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/height.md, tokens/stroke.md, tokens/typography.md, components/atoms/checkbox.md, components/atoms/badge.md, components/atoms/button.md, components/atoms/input.md, components/atoms/segment.md, components/atoms/action-group.md
---

# Table Cell

## 개요

`<table>` 요소와 그 안을 구성하는 헤더 셀·데이터 셀·행의 기본 스타일 Molecule.  
데이터 테이블([organisms/table/data.md](../organisms/table/data.md))과 정보 테이블([organisms/table/info.md](../organisms/table/info.md)) 두 Organism이 이 Molecule을 공유한다.

셀에 삽입되는 Checkbox·Badge·Input·Button 등의 스타일은 각 Atom 컴포넌트가 담당하며, 이 Molecule은 셀 컨테이너의 크기·배경·구분선만 정의한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | dense · compact · base · spacious | base (클래스 없음) |
| 헤더 유형 | plain · check (`table__cell--check`) · sort (`table__head-cell--sort`) | plain |
| 정렬 상태 | asc (`table__head-cell--sort-asc`) · desc (`table__head-cell--sort-desc`) | asc |
| 데이터 내용 | text · number · button · input · checkbox · badge · 조합 | text |

- **dense** `28px` — 급여·회계 등 고밀도 화면
- **compact** `32px` — 사이드바·패널 내 보조 테이블
- **base** `36px` — 일반 목록 화면 (기본)
- **spacious** `40px` — 터치 환경, 여유로운 레이아웃

---

<!-- AI:
헤더 셀 조합 규칙:
- plain:   <th class="table__head-cell" scope="col">
- check:   <th class="table__cell table__cell--check" scope="col"> + checkbox atom
- sort:    <th class="table__head-cell table__head-cell--sort" scope="col">
             <button class="table__sort-btn">레이블 + .icon</button>
           정렬 상태는 th에 클래스 토글:
             오름차순(기본): .table__head-cell--sort-asc
             내림차순: .table__head-cell--sort-desc

데이터 셀 내용:
- text:    <td class="table__cell">
- number:  <td class="table__cell table__cell--number"> — organisms/table/data.md에 정의
- button:  <td class="table__cell"> + <button class="btn btn--secondary btn--solid btn--xs">
- input:   <td class="table__cell--edit"> + <div class="input-wrap"><input class="input input--sm"></div> — xs 행에는 input--xs. organisms/table/data.md에 정의
- check:   <td class="table__cell table__cell--check"> + checkbox atom
- badge:   <td class="table__cell"> + <span class="badge ...">
- 조합:    <td class="table__cell" style="display:flex;align-items:center;gap:var(--space-6)"> + text + badge

size: <table class="table [table--dense|table--compact|table--spacious]">에 적용.
--table-row-height 변수가 cascade로 하위 셀에 전달됨.
-->

---

## 동작

sort 버튼 클릭으로 정렬 상태를 순환한다. 다른 열의 정렬 상태는 초기화된다. size 토글로 행 높이 변화를 확인할 수 있다.

| 이벤트 | 동작 |
|--------|------|
| sort 버튼 클릭 (오름차순) | `table__head-cell--sort-asc` → `table__head-cell--sort-desc` + `aria-sort="descending"` |
| sort 버튼 클릭 (내림차순) | `table__head-cell--sort-desc` → `table__head-cell--sort-asc` + `aria-sort="ascending"` |
| 다른 열 sort 클릭 | 기존 활성 열의 정렬 클래스·`aria-sort` 초기화 |

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-12)">
  <div style="display:flex;justify-content:center">
    <div id="size-segment" class="segment" role="radiogroup" aria-label="테이블 사이즈">
      <span class="segment__slider" aria-hidden="true"></span>
      <button class="segment__item" role="radio" aria-checked="false" data-size="table--dense">dense</button>
      <button class="segment__item" role="radio" aria-checked="false" data-size="table--compact">compact</button>
      <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-size="">base</button>
      <button class="segment__item" role="radio" aria-checked="false" data-size="table--spacious">spacious</button>
    </div>
  </div>
  <table data-component id="demo-table" class="table" style="border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)" aria-label="정렬·사이즈 동작 예시">
    <thead class="table__head">
      <tr>
        <th class="table__cell table__cell--check" scope="col">
          <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
        </th>
        <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none">
          <button class="table__sort-btn" aria-label="이름 정렬">이름<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순으로 정렬</div></span></button>
        </th>
        <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none">
          <button class="table__sort-btn" aria-label="입사일 정렬">입사일<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순으로 정렬</div></span></button>
        </th>
        <th class="table__head-cell" scope="col">직책</th>
        <th class="table__head-cell" scope="col">상태</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="홍길동 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
        <td class="table__cell">홍길동</td><td class="table__cell">1991.02.28</td><td class="table__cell">팀장</td>
        <td class="table__cell"><span class="badge badge--success">재직</span></td>
      </tr>
      <tr class="table__row">
        <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="김철수 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
        <td class="table__cell">김철수</td><td class="table__cell">2001.06.15</td><td class="table__cell">팀원</td>
        <td class="table__cell"><span class="badge badge--neutral">휴직</span></td>
      </tr>
      <tr class="table__row">
        <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="이영희 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
        <td class="table__cell">이영희</td><td class="table__cell">2010.11.03</td><td class="table__cell">팀원</td>
        <td class="table__cell"><span class="badge badge--success">재직</span></td>
      </tr>
    </tbody>
  </table>
</div>
<script>
(function() {
  var table = stage.querySelector('#demo-table');
  var sizeClasses = ['table--dense', 'table--compact', 'table--spacious'];

  // segment 슬라이더 초기화
  function updateSlider(group) {
    var slider = group.querySelector('.segment__slider');
    var selected = group.querySelector('.segment__item--selected');
    if (!slider || !selected) return;
    slider.style.width = selected.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
  }
  var seg = stage.querySelector('#size-segment');
  updateSlider(seg);

  // size 토글
  seg.querySelectorAll('.segment__item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      seg.querySelectorAll('.segment__item').forEach(function(b) {
        b.classList.remove('segment__item--selected');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('segment__item--selected');
      btn.setAttribute('aria-checked', 'true');
      updateSlider(seg);
      sizeClasses.forEach(function(c) { table.classList.remove(c); });
      if (btn.dataset.size) table.classList.add(btn.dataset.size);
    });
  });

  // sort 순환: 미정렬(subtle) → 오름차순(brand) → 내림차순(brand) → 오름차순(brand)
  var sortThs = stage.querySelectorAll('.table__head-cell--sort');
  sortThs.forEach(function(th) {
    var btn = th.querySelector('.table__sort-btn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      var isDesc = th.classList.contains('table__head-cell--sort-desc');
      // 다른 컬럼은 미정렬 상태로 초기화
      sortThs.forEach(function(t) {
        if (t === th) return;
        t.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
        t.setAttribute('aria-sort', 'none');
        var use = t.querySelector('.table__sort-btn .icon use');
        if (use) use.setAttribute('href', 'icons/sprite.svg#icon-sort-asc');
        var iconEl = t.querySelector('.table__sort-btn .icon');
        if (iconEl) iconEl.classList.remove('icon--brand');
        var tip = t.querySelector('.table__sort-btn .tooltip-panel');
        if (tip) tip.textContent = '오름차순으로 정렬';
      });
      var isAsc = th.classList.contains('table__head-cell--sort-asc');
      if (isDesc) {
        // desc → asc
        th.classList.remove('table__head-cell--sort-desc');
        th.classList.add('table__head-cell--sort-asc');
        th.setAttribute('aria-sort', 'ascending');
        var use = btn.querySelector('.icon use');
        if (use) use.setAttribute('href', 'icons/sprite.svg#icon-sort-asc');
        var iconEl = btn.querySelector('.icon');
        if (iconEl) iconEl.classList.add('icon--brand');
        var tip = btn.querySelector('.tooltip-panel');
        if (tip) tip.textContent = '내림차순으로 정렬';
      } else if (isAsc) {
        // asc → desc
        th.classList.remove('table__head-cell--sort-asc');
        th.classList.add('table__head-cell--sort-desc');
        th.setAttribute('aria-sort', 'descending');
        var use = btn.querySelector('.icon use');
        if (use) use.setAttribute('href', 'icons/sprite.svg#icon-sort-desc');
        var iconEl = btn.querySelector('.icon');
        if (iconEl) iconEl.classList.add('icon--brand');
        var tip = btn.querySelector('.tooltip-panel');
        if (tip) tip.textContent = '오름차순으로 정렬';
      } else {
        // 미정렬 → asc
        th.classList.add('table__head-cell--sort-asc');
        th.setAttribute('aria-sort', 'ascending');
        var use = btn.querySelector('.icon use');
        if (use) use.setAttribute('href', 'icons/sprite.svg#icon-sort-asc');
        var iconEl = btn.querySelector('.icon');
        if (iconEl) iconEl.classList.add('icon--brand');
        var tip = btn.querySelector('.tooltip-panel');
        if (tip) tip.textContent = '내림차순으로 정렬';
      }
    });
  });
})();
</script>
:::

---

## Anatomy

### 헤더 셀

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">plain</span>
  <table data-component class="table table--dense" style="width:160px"><thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">check</span>
  <table data-component class="table table--dense" style="width:44px"><thead class="table__head"><tr><th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th></tr></thead></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 미정렬</span>
  <table data-component class="table table--dense" style="width:160px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none"><button class="table__sort-btn" aria-label="컬럼명 정렬">컬럼명<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순으로 정렬</div></span></button></th></tr></thead></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 오름차순</span>
  <table data-component class="table table--dense" style="width:160px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col" aria-sort="ascending"><button class="table__sort-btn" aria-label="컬럼명 오름차순 정렬됨">컬럼명<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm icon--brand" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">내림차순으로 정렬</div></span></button></th></tr></thead></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 내림차순</span>
  <table data-component class="table table--dense" style="width:160px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-desc" scope="col" aria-sort="descending"><button class="table__sort-btn" aria-label="컬럼명 내림차순 정렬됨">컬럼명<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm icon--brand" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-desc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순으로 정렬</div></span></button></th></tr></thead></table>
</div>
</div>
:::

### 데이터 셀

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">text</span>
  <table data-component class="table table--dense" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell">텍스트 데이터</td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">button</span>
  <table data-component class="table table--dense" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><button class="btn btn--secondary btn--solid btn--xs">상세보기</button></td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">input · sm</span>
  <table data-component class="table table--dense" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="3,000,000" aria-label="입력"></div></td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">input · sm</span>
  <table data-component class="table table--dense" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="3,000,000" aria-label="입력"></div></td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">check</span>
  <table data-component class="table table--dense" style="width:44px"><tbody class="table__body"><tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">badge</span>
  <table data-component class="table table--dense" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><span class="badge badge--success">활성</span></td></tr></tbody></table>
</div>
</div>
:::

---

## CSS

```css
/* ── Size 토큰 (CSS 변수 cascade) ── */
/* --table-cell-py: tr height보다 작게 유지 → tr height가 단일행 높이를 결정, 멀티라인은 padding이 여백 확보 */
.table            { --table-row-height: var(--height-base);     --table-cell-py: var(--space-8); }
.table--dense     { --table-row-height: var(--height-dense);    --table-cell-py: var(--space-2); }
.table--compact   { --table-row-height: var(--height-compact);  --table-cell-py: var(--space-6); }
.table--spacious  { --table-row-height: var(--height-spacious); --table-cell-py: var(--space-12); }

/* ── Base ── */
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: var(--font-size-base);
  line-height: 1;
  color: var(--color-text-body);
}

/* ── Row height — td/th의 height는 min-height처럼 동작하므로 tr에 지정 ── */
.table__head tr,
.table__body .table__row {
  height: var(--table-row-height);
}

/* ── Head ── */
.table thead {
  background: var(--color-surface-neutral);
}

.table__head-cell {
  padding: var(--table-cell-py) var(--space-inset-xl);
  text-align: left;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── Head cell hover (sort 셀은 .table__sort-btn이 담당) ── */
.table__head-cell:not(.table__head-cell--sort):hover {
  background: var(--color-action-neutral-hover);
}

/* sort 셀 자체 padding 제거 — 버튼이 셀 전체를 채워 hover 영역이 plain과 동일하게 */
.table__head-cell--sort {
  padding: 0;
  overflow: visible;
}

/* ── Sort button — 셀 전체 채움, 아이콘 우측 끝 정렬 ── */
.table__sort-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: var(--table-cell-py) var(--space-inset-xl);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  text-align: left;
}

.table__sort-btn:hover {
  background: var(--color-action-neutral-hover);
}

.table__sort-btn:active {
  background: var(--color-action-neutral-active);
}


/* ── Cell border-bottom (border-collapse에서 tr border 미적용 우회) ── */
.table__body .table__row .table__cell {
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

.table__body .table__row:last-child .table__cell {
  border-bottom: none;
}

/* ── Cell ── */
.table__cell {
  padding: var(--table-cell-py) var(--space-inset-xl);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

/* 버튼이 포함된 셀은 hover 효과(box-shadow)가 잘리지 않도록 overflow 해제 */
.table__cell:has(.btn) {
  overflow: visible;
}

/* ── Check cell ── */
/* position:relative로 td를 기준점 삼아 자식을 절대 중앙 정렬 —
   vertical-align:middle은 x-height 기준이라 기하학적 중앙이 아님 */
.table__cell--check {
  width: 40px;
  padding: 0;
  overflow: visible;
  position: relative;
}

.table__cell--check > .checkbox,
.table__cell--check > input[type="checkbox"] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__head .table__cell--check {
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}
```

---

## 접근성

테이블 데이터 유형 (`accessibility.md` 테이블 행 적용).

| 상황 | 마크업 |
|------|--------|
| 열 헤더 | `<th scope="col" class="table__head-cell">` |
| 테이블 설명 | `<table aria-label="…">` 또는 `<caption>` |
| 정렬 상태 | 정렬 중인 `<th>`에 `aria-sort="ascending"` 또는 `aria-sort="descending"` |
| 체크 셀 레이블 | 헤더 `aria-label="전체 선택"`, 데이터 행 `aria-label="[행 식별값] 선택"` |

---

## Do / Don't

> ✅ DO — size modifier는 `<table>` 루트에만 적용
> `<table class="table table--dense">`

> ❌ DON'T — 개별 `<td>` · `<th>`에 size 클래스 추가
> size는 `--table-row-height` 변수로 cascade 전달되므로 루트 하나에만 적용

> ✅ DO — 정렬 상태를 클래스와 `aria-sort` 두 곳에 동시 반영
> `<th class="table__head-cell--sort-asc" aria-sort="ascending">`

> ❌ DON'T — 이 Molecule을 페이지에 직접 단독 사용
> 항상 Organism(`data.md` 또는 `info.md`)을 통해 `.table-container`로 감싸서 사용
