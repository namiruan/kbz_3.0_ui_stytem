---
file: components/organisms/table/index.md
version: 0.5.2
status: draft
updated: 2026-06-09
depends-on: components/_index.md, components/molecules/table-cell.md, tokens/color.md, tokens/space.md, tokens/stroke.md
---

# Table

## 개요

`.table-container`로 Table Molecule과 Toolbar를 감싸는 Organism 공통 셸.  
셀·행·헤더 스타일은 [`molecules/table-cell.md`](../../molecules/table-cell.md) 참조.

두 종류의 테이블:
- **[데이터 테이블 (data.md)](data.md)** — 정렬·선택·편집·펼침 기능
- **[정보 테이블 (info.md)](info.md)** — 읽기 전용, rowspan/colspan 구조

---

<!-- AI:
TableContainer 구조:
<div class="table-container">
  <div class="table__toolbar">          ← optional
    <h2 class="table__title">제목</h2>
    <div class="table__toolbar-actions">
      <!-- icon-button들 -->
    </div>
  </div>
  <table class="table [modifier]">…</table>
</div>

- .table-container: border + radius + overflow:hidden으로 내부 테이블을 감쌈
- .table__toolbar: 상단 제목+액션 영역. 없으면 생략 가능
- .table__title: h2~h3 사용, 도움말 버튼 포함 가능
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
  padding: var(--space-inset-xl);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  background: var(--color-surface-base);
}

.table__title {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-body);
  line-height: var(--line-height-ui);
}

.table__toolbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
}
```

---

## 접근성

| 상황 | 마크업 |
|------|--------|
| Toolbar 제목으로 테이블 설명 | `<table aria-labelledby="[title-id]">` |
| Toolbar 없이 테이블 단독 | `<table aria-label="테이블 용도">` |

---

## 하위 문서

- [data.md](data.md) — 정렬·선택·편집·펼침 기능을 가진 데이터 테이블
- [info.md](info.md) — 읽기 전용 정보 테이블
