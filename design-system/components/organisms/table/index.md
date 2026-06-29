---
file: components/organisms/table/index.md
version: 0.7.1
status: draft
updated: 2026-06-29
depends-on: components/_index.md, components/molecules/table-cell.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md
---

# Table

## 개요

`.table-container`로 Table Molecule과 Toolbar를 감싸는 Organism 공통 셸.  
셀·행·헤더 스타일은 [`molecules/table-cell.md`](../../molecules/table-cell.md) 참조.

두 종류의 테이블:
- **[데이터 테이블 (data.md)](data.md)** — 정렬·선택·편집·펼침 기능
- **[정보 테이블 (info.md)](info.md)** — 읽기 전용, rowspan/colspan 구조

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 종류 | 데이터(`data.md`) · 정보(`info.md`) | — |
| toolbar | 없음 · 있음 (`table__toolbar`) | 없음 |
| 총 건수 | 없음 · 있음 (`table__count`) | 없음 |

---

## 사용 지침

- `table-container`는 toolbar(선택)와 `<table>` 하나만 포함한다.
- toolbar 제목이 있으면 `<table aria-labelledby="[id]">`로 연결하고, 없으면 `<table aria-label="…">`을 사용한다.
- 도움말 버튼은 연결할 가이드 페이지가 있을 때만 표시한다. `onclick="window.open(url)"`으로 이동.

### 총 건수 (`table__count`)

- 총 데이터 건수는 toolbar 왼쪽 묶음(`table__title-group`)의 **맨 앞**에 두고, 제목과는 세로 구분선으로 나눈다. 위치를 고정해 제목 길이·유무와 무관하게 일관된 앵커가 되게 한다.
- 구분선은 `table__count + table__title` 규칙이 자동 삽입한다 — 건수가 제목 앞에 있을 때만 나타난다.
- 제목·액션이 없어도 건수만으로 toolbar를 둘 수 있다. 이때 `table__title-group`에 `table__count`만 넣는다(구분선 없음).
- FilterBar가 있는 조회 페이지에서는 **필터 결과 건수**를 반영해 갱신한다. 값이 바뀌므로 `aria-live="polite"`를 부여해 스크린리더가 변화를 읽도록 한다.
- 0건일 때도 `총 0건`을 표시하고, tbody에는 `empty-state--compact`를 둔다(→ `product.md` 표시 범위 규칙).
- 숫자는 `table__count-value`로 감싸 강조하고, "총"·"건" 단위 텍스트는 subtle로 둔다.
- 하단 Pagination과 총량을 중복 표기하지 않는다. 총 건수의 정본은 toolbar 한 곳이며, Pagination은 페이지 위치만 다룬다.

---

<!-- AI:
TableContainer 구조:
<div class="table-container">
  <div class="table__toolbar">          ← optional
    <div class="table__title-group">    ← 왼쪽 묶음 (총 건수 → 제목 순서)
      <span class="table__count" aria-live="polite">총 <b class="table__count-value">120</b>건</span>  ← optional, 맨 앞
      <div class="table__title" id="tbl-title">
        제목
        <button class="icon-on--sm" aria-label="도움말" onclick="window.open('/guide/...')">  ← optional
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg>
        </button>
      </div>
    </div>
    <div class="table__toolbar-actions">
      <!-- icon-button들 -->
    </div>
  </div>
  <table class="table [modifier]">…</table>
</div>

- .table-container: border + radius + overflow:hidden으로 내부 테이블을 감쌈
- .table__toolbar: 상단 제목+액션 영역. 없으면 생략 가능. justify-content:space-between으로 왼쪽 묶음 ↔ 액션 분리.
- .table__title-group: 건수·제목을 묶는 왼쪽 컨테이너. 건수가 있으면 사용한다. 건수 없이 제목만 둘 땐 .table__title을 toolbar 직계로 둬도 된다(레이아웃 동일).
- .table__count: 총 데이터 건수. optional. 항상 묶음의 맨 앞(가장 왼쪽)에 둔다 — 제목 길이·유무와 무관하게 위치가 고정돼 일관된 앵커가 된다.
  - aria-live="polite" 필수 — 필터 결과로 값이 바뀔 때 읽힘.
  - 숫자만 <b class="table__count-value">로 감싸 강조. "총"·"건" 등 단위는 .table__count의 subtle 색을 그대로 따른다.
  - 제목 없이 건수만 둘 경우에도 .table__title-group 안에 .table__count만 넣는다.
- .table__title: div 사용 (heading 태그는 UA 마진으로 레이아웃 깨짐). 건수 뒤에 온다.
  - 건수가 앞에 있으면 .table__count + .table__title 규칙이 둘 사이에 세로 구분선을 자동 삽입한다(별도 마크업 불필요).
  - 도움말 버튼: button.icon-on--sm > svg icon-help. 선택적. 있을 경우 클릭 시 가이드 페이지로 이동.
  - aria-label="도움말", onclick으로 guide URL 연결. btn--* 버튼 컴포넌트가 아님
-->

---

## CSS

```css
/* ── TableContainer ── */
.table-container {
  display: flex;
  flex-direction: column;
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface-base);
}

/* ── TableToolbar ── */
.table__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--height-compact);
  padding: 0 var(--space-inset-xl);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  background: var(--color-surface-neutral);
}

/* 총 건수(맨 앞) + 제목을 묶는 왼쪽 컨테이너 */
.table__title-group {
  display: flex;
  align-items: center;
  gap: var(--space-gap-md);
  min-width: 0;
}

.table__title {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  margin: 0;
  padding: 0;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-body);
  line-height: var(--line-height-ui);
}

/* 총 건수 — 제목보다 한 단계 약하게(sm·subtle). 숫자만 count-value로 강조 */
.table__count {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  line-height: var(--line-height-ui);
  white-space: nowrap;
}
.table__count-value {
  font-weight: var(--font-weight-heading);
  color: var(--color-text-body);
}
/* 건수가 제목 앞에 올 때만 둘 사이에 세로 구분선. gap(12px)과 padding(12px)으로 좌우 대칭 */
.table__count + .table__title {
  border-left: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  padding-left: var(--space-inset-xl);
}

.table__toolbar-actions {
  display: flex;
  align-items: center;
}
```

---

## 접근성

| 상황 | 마크업 |
|------|--------|
| Toolbar 제목으로 테이블 설명 | `<table aria-labelledby="[title-id]">` |
| Toolbar 없이 테이블 단독 | `<table aria-label="테이블 용도">` |
| 총 건수가 필터로 갱신됨 | `<span class="table__count" aria-live="polite">` — 변경된 건수를 스크린리더가 읽음 |

---

---

## Do / Don't

| Do | Don't |
|----|-------|
| `<div class="table__title">` 사용 | `<h3>` 등 heading 태그 사용 (UA 마진으로 레이아웃 깨짐) |
| toolbar 제목이 있으면 `aria-labelledby`로 테이블에 연결 | 제목 있는데 `aria-label`로 중복 선언 |
| 도움말 버튼은 가이드 페이지가 있을 때만 표시 | 클릭해도 아무 동작 없는 도움말 버튼 배치 |
| 총 건수는 왼쪽 묶음 맨 앞에 두고 제목과 구분선으로 분리 | 총 건수를 제목 뒤나 `table__toolbar-actions`(우측)에 배치 |
| 총 건수의 정본은 toolbar 한 곳에만 | 같은 총량을 toolbar·Pagination 양쪽에 중복 표기 |
