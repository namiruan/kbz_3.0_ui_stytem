---
file: components/molecules/table-cell.md
version: 0.1.0
status: draft
updated: 2026-06-09
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/height.md, tokens/stroke.md, tokens/typography.md, components/atoms/checkbox.md, components/atoms/badge.md, components/atoms/button.md, components/atoms/input.md
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
| 정렬 상태 | 없음 · asc (`table__head-cell--sort-asc`) · desc (`table__head-cell--sort-desc`) | 없음 |
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
             오름차순: .table__head-cell--sort-asc
             내림차순: .table__head-cell--sort-desc

데이터 셀 내용:
- text:    <td class="table__cell">
- number:  <td class="table__cell table__cell--number"> — organisms/table/data.md에 정의
- button:  <td class="table__cell"> + <button class="btn btn--ghost btn--sm">
- input:   <td class="table__cell--edit"> + <div class="input-wrap"><input class="input"></div> — organisms/table/data.md에 정의
- check:   <td class="table__cell table__cell--check"> + checkbox atom
- badge:   <td class="table__cell"> + <span class="badge ...">
- 조합:    <td class="table__cell" style="display:flex;align-items:center;gap:var(--space-6)"> + text + badge

size: <table class="table [table--dense|table--compact|table--spacious]">에 적용.
--table-row-height 변수가 cascade로 하위 셀에 전달됨.
-->

---

## 동작

sort 버튼 클릭으로 정렬 상태를 순환한다. 다른 열의 정렬 상태는 초기화된다.

| 이벤트 | 동작 |
|--------|------|
| sort 버튼 클릭 (미정렬) | 부모 `<th>`에 `table__head-cell--sort-asc` + `aria-sort="ascending"` |
| sort 버튼 클릭 (오름차순) | `table__head-cell--sort-asc` → `table__head-cell--sort-desc` + `aria-sort="descending"` |
| sort 버튼 클릭 (내림차순) | 정렬 클래스·`aria-sort` 제거 (미정렬로 복귀) |
| 다른 열 sort 클릭 | 기존 활성 열의 정렬 클래스·`aria-sort` 초기화 |

:::preview
<table data-component class="table" style="border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)" aria-label="정렬 동작 예시">
  <thead class="table__head">
    <tr>
      <th class="table__cell table__cell--check" scope="col">
        <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
      </th>
      <th class="table__head-cell table__head-cell--sort" scope="col">
        <button class="table__sort-btn" aria-label="이름 정렬">이름<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button>
      </th>
      <th class="table__head-cell table__head-cell--sort" scope="col">
        <button class="table__sort-btn" aria-label="입사일 정렬">입사일<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button>
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
<script>
(function() {
  var sortThs = stage.querySelectorAll('.table__head-cell--sort');
  sortThs.forEach(function(th) {
    var btn = th.querySelector('.table__sort-btn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      var isAsc = th.classList.contains('table__head-cell--sort-asc');
      var isDesc = th.classList.contains('table__head-cell--sort-desc');
      // 모든 열 초기화
      sortThs.forEach(function(t) {
        t.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
        t.removeAttribute('aria-sort');
        var icon = t.querySelector('.table__sort-btn .icon use');
        if (icon) icon.setAttribute('href', 'icons/sprite.svg#icon-sort');
        var iconEl = t.querySelector('.table__sort-btn .icon');
        if (iconEl) { iconEl.classList.remove('icon--brand'); iconEl.classList.add('icon--disabled'); }
      });
      // 현재 열 상태 순환: 미정렬 → asc → desc → 미정렬
      if (!isAsc && !isDesc) {
        th.classList.add('table__head-cell--sort-asc');
        th.setAttribute('aria-sort', 'ascending');
        var icon = btn.querySelector('.icon use');
        if (icon) icon.setAttribute('href', 'icons/sprite.svg#icon-chevron-up');
        var iconEl = btn.querySelector('.icon');
        if (iconEl) { iconEl.classList.remove('icon--disabled'); iconEl.classList.add('icon--brand'); }
      } else if (isAsc) {
        th.classList.add('table__head-cell--sort-desc');
        th.setAttribute('aria-sort', 'descending');
        var icon = btn.querySelector('.icon use');
        if (icon) icon.setAttribute('href', 'icons/sprite.svg#icon-chevron-down');
        var iconEl = btn.querySelector('.icon');
        if (iconEl) { iconEl.classList.remove('icon--disabled'); iconEl.classList.add('icon--brand'); }
      }
      // isDesc면 이미 위에서 초기화됨 (미정렬로 복귀)
    });
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
Anatomy는 셀 종류(행) × 사이즈(열) 그리드.
각 행: anatomy-label(종류명) + 4개 mini-table(dense/compact/base/spacious) 나란히 배치.
사이즈 헤더 행을 첫 번째 anatomy-row로 두어 열 레이블을 표시한다.
-->

### 헤더 셀

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label"></span>
  <div style="display:flex;gap:var(--space-8)">
    <span style="width:100px;font-size:var(--font-size-xs);color:var(--color-text-subtle);text-align:center">dense</span>
    <span style="width:100px;font-size:var(--font-size-xs);color:var(--color-text-subtle);text-align:center">compact</span>
    <span style="width:100px;font-size:var(--font-size-xs);color:var(--color-text-subtle);text-align:center">base</span>
    <span style="width:100px;font-size:var(--font-size-xs);color:var(--color-text-subtle);text-align:center">spacious</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">plain</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead></table>
    <table data-component class="table table--compact" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead></table>
    <table data-component class="table" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead></table>
    <table data-component class="table table--spacious" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">check</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:44px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th></tr></thead></table>
    <table data-component class="table table--compact" style="width:44px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th></tr></thead></table>
    <table data-component class="table" style="width:44px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th></tr></thead></table>
    <table data-component class="table table--spacious" style="width:44px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th></tr></thead></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 미정렬</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort" scope="col"><button class="table__sort-btn" aria-label="정렬">컬럼명<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button></th></tr></thead></table>
    <table data-component class="table table--compact" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort" scope="col"><button class="table__sort-btn" aria-label="정렬">컬럼명<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button></th></tr></thead></table>
    <table data-component class="table" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort" scope="col"><button class="table__sort-btn" aria-label="정렬">컬럼명<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button></th></tr></thead></table>
    <table data-component class="table table--spacious" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort" scope="col"><button class="table__sort-btn" aria-label="정렬">컬럼명<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button></th></tr></thead></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 오름차순</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col" aria-sort="ascending"><button class="table__sort-btn" aria-label="오름차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-up"/></svg></span></button></th></tr></thead></table>
    <table data-component class="table table--compact" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col" aria-sort="ascending"><button class="table__sort-btn" aria-label="오름차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-up"/></svg></span></button></th></tr></thead></table>
    <table data-component class="table" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col" aria-sort="ascending"><button class="table__sort-btn" aria-label="오름차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-up"/></svg></span></button></th></tr></thead></table>
    <table data-component class="table table--spacious" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col" aria-sort="ascending"><button class="table__sort-btn" aria-label="오름차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-up"/></svg></span></button></th></tr></thead></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 내림차순</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-desc" scope="col" aria-sort="descending"><button class="table__sort-btn" aria-label="내림차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span></button></th></tr></thead></table>
    <table data-component class="table table--compact" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-desc" scope="col" aria-sort="descending"><button class="table__sort-btn" aria-label="내림차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span></button></th></tr></thead></table>
    <table data-component class="table" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-desc" scope="col" aria-sort="descending"><button class="table__sort-btn" aria-label="내림차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span></button></th></tr></thead></table>
    <table data-component class="table table--spacious" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-desc" scope="col" aria-sort="descending"><button class="table__sort-btn" aria-label="내림차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span></button></th></tr></thead></table>
  </div>
</div>
</div>
:::

### 데이터 셀

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label"></span>
  <div style="display:flex;gap:var(--space-8)">
    <span style="width:100px;font-size:var(--font-size-xs);color:var(--color-text-subtle);text-align:center">dense</span>
    <span style="width:100px;font-size:var(--font-size-xs);color:var(--color-text-subtle);text-align:center">compact</span>
    <span style="width:100px;font-size:var(--font-size-xs);color:var(--color-text-subtle);text-align:center">base</span>
    <span style="width:100px;font-size:var(--font-size-xs);color:var(--color-text-subtle);text-align:center">spacious</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">text</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell">텍스트</td></tr></tbody></table>
    <table data-component class="table table--compact" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell">텍스트</td></tr></tbody></table>
    <table data-component class="table" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell">텍스트</td></tr></tbody></table>
    <table data-component class="table table--spacious" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell">텍스트</td></tr></tbody></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">button</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><button class="btn btn--ghost btn--sm">보기</button></td></tr></tbody></table>
    <table data-component class="table table--compact" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><button class="btn btn--ghost btn--sm">보기</button></td></tr></tbody></table>
    <table data-component class="table" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><button class="btn btn--ghost btn--sm">보기</button></td></tr></tbody></table>
    <table data-component class="table table--spacious" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><button class="btn btn--ghost btn--sm">보기</button></td></tr></tbody></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">input · sm</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="값" aria-label="입력"></div></td></tr></tbody></table>
    <table data-component class="table table--compact" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="값" aria-label="입력"></div></td></tr></tbody></table>
    <table data-component class="table" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="값" aria-label="입력"></div></td></tr></tbody></table>
    <table data-component class="table table--spacious" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="값" aria-label="입력"></div></td></tr></tbody></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">input · md</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="값" aria-label="입력"></div></td></tr></tbody></table>
    <table data-component class="table table--compact" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="값" aria-label="입력"></div></td></tr></tbody></table>
    <table data-component class="table" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="값" aria-label="입력"></div></td></tr></tbody></table>
    <table data-component class="table table--spacious" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="값" aria-label="입력"></div></td></tr></tbody></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">check</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:44px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td></tr></tbody></table>
    <table data-component class="table table--compact" style="width:44px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td></tr></tbody></table>
    <table data-component class="table" style="width:44px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td></tr></tbody></table>
    <table data-component class="table table--spacious" style="width:44px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td></tr></tbody></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">badge</span>
  <div style="display:flex;gap:var(--space-8)">
    <table data-component class="table table--dense" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><span class="badge badge--success">활성</span></td></tr></tbody></table>
    <table data-component class="table table--compact" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><span class="badge badge--success">활성</span></td></tr></tbody></table>
    <table data-component class="table" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><span class="badge badge--success">활성</span></td></tr></tbody></table>
    <table data-component class="table table--spacious" style="width:100px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle)"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><span class="badge badge--success">활성</span></td></tr></tbody></table>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Size 토큰 (CSS 변수 cascade) ── */
.table            { --table-row-height: var(--height-base); }
.table--dense     { --table-row-height: var(--height-dense); }
.table--compact   { --table-row-height: var(--height-compact); }
.table--spacious  { --table-row-height: var(--height-spacious); }

/* ── Base ── */
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: var(--font-size-base);
  line-height: 1;
  color: var(--color-text-body);
}

/* ── Head ── */
.table thead {
  background: var(--color-surface-neutral);
}

.table__head-cell {
  /* 상하 padding 제거 — height 토큰이 행 높이를 단독 제어 */
  padding: 0 var(--space-inset-xl);
  height: var(--table-row-height);
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

/* ── Row height ── */
.table__row,
.table__head tr {
  height: var(--table-row-height);
}

/* ── Head cell hover (sort 셀은 .table__sort-btn이 담당) ── */
.table__head-cell:not(.table__head-cell--sort):hover {
  background: var(--color-action-neutral-hover);
}

/* ── Body row hover ── */
.table__body .table__row:hover {
  background: var(--color-action-neutral-hover);
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
  /* 상하 padding 제거 — height 토큰이 행 높이를 단독 제어 */
  padding: 0 var(--space-inset-xl);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
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
