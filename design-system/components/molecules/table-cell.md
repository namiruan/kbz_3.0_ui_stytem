---
file: components/molecules/table-cell.md
version: 0.1.0
status: draft
updated: 2026-06-09
depends-on: components/_index.md, tokens/color.md, tokens/space.md, tokens/height.md, tokens/stroke.md, tokens/typography.md
---

# Table Cell

## 개요

`<table>` 요소와 그 안을 구성하는 셀·행·헤더의 기본 스타일 Molecule.  
데이터 테이블([organisms/table/data.md](../organisms/table/data.md))과 정보 테이블([organisms/table/info.md](../organisms/table/info.md)) 두 Organism이 이 Molecule을 공유한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | dense · compact · base · spacious | base (클래스 없음) |

- **dense** `28px` — 데이터 밀도가 높은 급여·회계 화면
- **compact** `32px` — 사이드바·패널 내 보조 테이블
- **base** `36px` — 일반 목록 화면 (기본)
- **spacious** `40px` — 터치 지원 환경, 여유로운 레이아웃

---

<!-- AI:
테이블 구조:
<table class="table [table--dense|table--compact|table--spacious]">
  <thead class="table__head">
    <tr>
      <th class="table__head-cell" scope="col">헤더</th>
    </tr>
  </thead>
  <tbody class="table__body">
    <tr class="table__row">
      <td class="table__cell">데이터</td>
    </tr>
  </tbody>
</table>

size: .table에 modifier 클래스 추가. --table-row-height 변수가 cascade로 하위에 전달됨.
행 높이: .table__row와 .table__head tr에 height: var(--table-row-height) 적용.
셀 세로 정렬: vertical-align: middle.
헤더 구분선: .table__head-cell에 border-bottom.
데이터 행 구분선: .table__body .table__row .table__cell에 border-bottom. 마지막 행 제외.
hover: .table__body .table__row:hover — Organism에서 .table--info로 재정의 가능(none).
-->

---

## 사용 지침

:::preview
<div class="anatomy-grid">

<!-- ── Size ── -->
<div class="anatomy-row">
  <span class="anatomy-label">size</span>
  <div style="display:flex;gap:var(--space-16);align-items:flex-start">
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
      <span style="font-size:var(--font-size-xs);color:var(--color-text-subtle)">dense · 28px</span>
      <table class="table table--dense" style="border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:var(--radius-sm);overflow:hidden;width:120px">
        <thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead>
        <tbody class="table__body"><tr class="table__row"><td class="table__cell">데이터</td></tr></tbody>
      </table>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
      <span style="font-size:var(--font-size-xs);color:var(--color-text-subtle)">compact · 32px</span>
      <table class="table table--compact" style="border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:var(--radius-sm);overflow:hidden;width:120px">
        <thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead>
        <tbody class="table__body"><tr class="table__row"><td class="table__cell">데이터</td></tr></tbody>
      </table>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
      <span style="font-size:var(--font-size-xs);color:var(--color-text-subtle)">base · 36px</span>
      <table class="table" style="border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:var(--radius-sm);overflow:hidden;width:120px">
        <thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead>
        <tbody class="table__body"><tr class="table__row"><td class="table__cell">데이터</td></tr></tbody>
      </table>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
      <span style="font-size:var(--font-size-xs);color:var(--color-text-subtle)">spacious · 40px</span>
      <table class="table table--spacious" style="border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:var(--radius-sm);overflow:hidden;width:120px">
        <thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead>
        <tbody class="table__body"><tr class="table__row"><td class="table__cell">데이터</td></tr></tbody>
      </table>
    </div>
  </div>
</div>

<!-- ── Head Cell ── -->
<div class="anatomy-row">
  <span class="anatomy-label">헤더 · plain</span>
  <table class="table" style="width:160px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:var(--radius-sm) var(--radius-sm) 0 0;overflow:hidden">
    <thead class="table__head"><tr><th class="table__head-cell" scope="col">컬럼명</th></tr></thead>
  </table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">헤더 · check</span>
  <table class="table" style="width:60px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:var(--radius-sm) var(--radius-sm) 0 0;overflow:hidden">
    <thead class="table__head"><tr>
      <th class="table__cell table__cell--check" scope="col">
        <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
      </th>
    </tr></thead>
  </table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">헤더 · sort</span>
  <div style="display:flex;gap:var(--space-12);align-items:flex-end">
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
      <span style="font-size:var(--font-size-xs);color:var(--color-text-subtle)">미정렬</span>
      <table class="table" style="width:140px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:var(--radius-sm) var(--radius-sm) 0 0;overflow:hidden">
        <thead class="table__head"><tr>
          <th class="table__head-cell table__head-cell--sort" scope="col">
            <button class="table__sort-btn" aria-label="정렬">컬럼명<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button>
          </th>
        </tr></thead>
      </table>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
      <span style="font-size:var(--font-size-xs);color:var(--color-text-subtle)">오름차순</span>
      <table class="table" style="width:140px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:var(--radius-sm) var(--radius-sm) 0 0;overflow:hidden">
        <thead class="table__head"><tr>
          <th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col">
            <button class="table__sort-btn" aria-label="오름차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-up"/></svg></span></button>
          </th>
        </tr></thead>
      </table>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
      <span style="font-size:var(--font-size-xs);color:var(--color-text-subtle)">내림차순</span>
      <table class="table" style="width:140px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:var(--radius-sm) var(--radius-sm) 0 0;overflow:hidden">
        <thead class="table__head"><tr>
          <th class="table__head-cell table__head-cell--sort table__head-cell--sort-desc" scope="col">
            <button class="table__sort-btn" aria-label="내림차순 정렬됨">컬럼명<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span></button>
          </th>
        </tr></thead>
      </table>
    </div>
  </div>
</div>

<!-- ── Data Cell ── -->
<div class="anatomy-row">
  <span class="anatomy-label">데이터 · text</span>
  <table class="table" style="width:160px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:0 0 var(--radius-sm) var(--radius-sm);overflow:hidden">
    <tbody class="table__body"><tr class="table__row"><td class="table__cell">텍스트 데이터</td></tr></tbody>
  </table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">데이터 · button</span>
  <table class="table" style="width:160px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:0 0 var(--radius-sm) var(--radius-sm);overflow:hidden">
    <tbody class="table__body"><tr class="table__row"><td class="table__cell"><button class="btn btn--ghost btn--sm">상세보기</button></td></tr></tbody>
  </table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">데이터 · input</span>
  <table class="table" style="width:200px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:0 0 var(--radius-sm) var(--radius-sm);overflow:hidden">
    <tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="3,000,000" aria-label="기본급"></div></td></tr></tbody>
  </table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">데이터 · check</span>
  <table class="table" style="width:60px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:0 0 var(--radius-sm) var(--radius-sm);overflow:hidden">
    <tbody class="table__body"><tr class="table__row">
      <td class="table__cell table__cell--check">
        <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
      </td>
    </tr></tbody>
  </table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">데이터 · badge</span>
  <table class="table" style="width:160px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:0 0 var(--radius-sm) var(--radius-sm);overflow:hidden">
    <tbody class="table__body"><tr class="table__row"><td class="table__cell"><span class="badge badge--success">활성</span></td></tr></tbody>
  </table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">데이터 · text+badge</span>
  <table class="table" style="width:200px;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);border-radius:0 0 var(--radius-sm) var(--radius-sm);overflow:hidden">
    <tbody class="table__body"><tr class="table__row"><td class="table__cell" style="display:flex;align-items:center;gap:var(--space-6)">홍길동<span class="badge badge--brand badge--sm">신규</span></td></tr></tbody>
  </table>
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
  padding: var(--space-8) var(--space-inset-xl);
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
  padding: var(--space-8) var(--space-inset-xl);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}
```

---

## 접근성

| 상황 | 마크업 |
|------|--------|
| 열 헤더 | `<th scope="col" class="table__head-cell">` |
| 테이블 설명 | `<table aria-label="…">` 또는 `<caption>` |

---

## Do / Don't

> ✅ DO — size modifier는 `.table`에만 적용
> `<table class="table table--dense">`

> ❌ DON'T — 이 Molecule을 직접 페이지에 단독 사용
> 항상 Organism(data.md 또는 info.md)을 통해 사용한다
