---
file: components/organisms/table/index.md
version: 0.4.0
status: draft
updated: 2026-06-09
depends-on: components/_index.md, tokens/color.md, tokens/space.md, tokens/height.md, tokens/stroke.md, tokens/typography.md
---

# Table

## 개요

행·열 구조로 데이터를 표시하는 Organism의 공통 토대.

두 종류의 테이블이 있다:
- **[데이터 테이블 (data.md)](data.md)** — 정렬·선택·편집·펼침 기능을 가진 인터랙티브 테이블
- **[정보 테이블 (info.md)](info.md)** — 인터랙션 없이 정보를 구조적으로 표시하는 읽기 전용 테이블

TableToolbar(제목 + 우측 액션)를 포함한 `.table-container`로 감싸서 사용한다. 상단 검색·필터 영역은 FilterBar Organism이 담당하며 Table과 별도로 배치한다.

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

## CSS

```css
/* ── TableContainer ── */
.table-container {
  display: flex;
  flex-direction: column;
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
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
  gap: var(--space-4);
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

/* ── Size 토큰 (CSS 변수 cascade) ── */
.table            { --table-row-height: var(--height-base); }     /* 기본, 클래스 없음 */
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

/* ── Row height — thead tr도 동일 높이 적용 ── */
.table__row,
.table__head tr {
  height: var(--table-row-height);
}

/* ── Head hover — sort 셀은 button이 담당, 일반 헤더 셀은 직접 적용 ── */
.table__head-cell:not(.table__head-cell--sort):hover {
  background: var(--color-action-neutral-hover);
}

/* ── Body ── */
.table__body .table__row:hover {
  background: var(--color-action-neutral-hover);
}

/* ── Cell ── */
/* border-bottom은 td에 직접 — border-collapse:collapse에서 tr border는 일부 셀에 미적용됨 */
.table__body .table__row .table__cell {
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

.table__body .table__row:last-child .table__cell {
  border-bottom: none;
}

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
| 테이블 설명 | `<table aria-label="테이블 용도">` 또는 `<caption>` |
| TableToolbar 제목과 테이블 연결 | `table__title`의 텍스트가 테이블을 설명하면 `<table aria-labelledby="[title id]">`로 연결 |
| 헤더 연결 | `<th scope="col">` — 스크린리더가 셀 데이터와 헤더를 연결 |
| 키보드 | Tab으로 인터랙티브 요소(체크박스·정렬 버튼·편집 셀) 이동 |

---

## 하위 문서

- [data.md](data.md) — 정렬·선택·편집·펼침 기능을 가진 데이터 테이블
- [info.md](info.md) — 읽기 전용 정보 테이블 (rowspan/colspan, 행 헤더 포함)
