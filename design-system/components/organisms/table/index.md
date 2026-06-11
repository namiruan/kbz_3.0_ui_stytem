---
file: components/organisms/table/index.md
version: 0.6.0
status: draft
updated: 2026-06-11
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

---

## 사용 지침

- `table-container`는 toolbar(선택)와 `<table>` 하나만 포함한다.
- toolbar 제목이 있으면 `<table aria-labelledby="[id]">`로 연결하고, 없으면 `<table aria-label="…">`을 사용한다.
- 도움말 버튼은 연결할 가이드 페이지가 있을 때만 표시한다. `onclick="window.open(url)"`으로 이동.

---

<!-- AI:
TableContainer 구조:
<div class="table-container">
  <div class="table__toolbar">          ← optional
    <div class="table__title">
      제목
      <button class="btn btn--primary btn--solid btn--micro btn--icon-only" aria-label="도움말" onclick="window.open('/guide/...')">  ← optional
        <span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
      </button>
    </div>
    <div class="table__toolbar-actions">
      <!-- icon-button들 -->
    </div>
  </div>
  <table class="table [modifier]">…</table>
</div>

- .table-container: border + radius + overflow:hidden으로 내부 테이블을 감쌈
- .table__toolbar: 상단 제목+액션 영역. 없으면 생략 가능
- .table__title: div 사용 (heading 태그는 UA 마진으로 레이아웃 깨짐)
  - 도움말 버튼(icon-on--sm + icon-help)은 선택적. 있을 경우 클릭 시 가이드 페이지로 이동
  - aria-label="도움말", onclick으로 guide URL 연결
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
  height: var(--height-dense);
  padding: 0 var(--space-inset-xl);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  background: var(--color-surface-neutral);
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

---

---

## Do / Don't

| Do | Don't |
|----|-------|
| `<div class="table__title">` 사용 | `<h3>` 등 heading 태그 사용 (UA 마진으로 레이아웃 깨짐) |
| toolbar 제목이 있으면 `aria-labelledby`로 테이블에 연결 | 제목 있는데 `aria-label`로 중복 선언 |
| 도움말 버튼은 가이드 페이지가 있을 때만 표시 | 클릭해도 아무 동작 없는 도움말 버튼 배치 |
