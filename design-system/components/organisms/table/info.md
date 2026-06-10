---
file: components/organisms/table/info.md
version: 0.1.0
status: draft
updated: 2026-06-09
depends-on: components/organisms/table/index.md, components/molecules/table-cell.md
---

# Table — 정보 테이블

## 개요

인터랙션 없이 정보를 구조적으로 표시하는 읽기 전용 테이블.  
rowspan/colspan으로 셀 병합, 행 헤더(`th scope="row"`)를 포함할 수 있다.  
공통 구조·base CSS·접근성 기본 규칙은 [`table/index.md`](index.md) 참조.

---

<!-- AI:
정보 테이블 구조 패턴:

기본 정보 테이블:
- thead th scope="col" + tbody td 단순 구조
- table--info modifier 사용 (table-layout: auto, white-space: normal)

셀 병합:
- rowspan: 같은 열에서 여러 행을 하나로 병합 (예: 카테고리 레이블)
- colspan: 같은 행에서 여러 열을 하나로 병합 (예: 전체 주소)
- 병합 셀은 vertical-align: middle 적용 확인

행 헤더:
- th scope="row" — 행 전체를 설명하는 헤더 셀 (예: 항목명, 구분)
- .table__row-header 클래스 적용
- 배경색으로 헤더 셀임을 시각적으로 구분

복잡 테이블 (rowspan + colspan 혼용):
- id/headers 방식으로 셀-헤더 연결
- caption 또는 aria-label로 테이블 설명 제공
-->

---

## 사용 지침

### 기본 정보 테이블

:::preview
<div class="table-container">
  <div class="table__toolbar">
    <h3 class="table__title" id="basic-info-title">계약 정보</h3>
  </div>
  <table class="table table--info" aria-labelledby="basic-info-title">
    <thead class="table__head">
      <tr>
        <th class="table__head-cell" scope="col">항목</th>
        <th class="table__head-cell" scope="col">내용</th>
        <th class="table__head-cell" scope="col">비고</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__cell">계약번호</td>
        <td class="table__cell">2026-CT-001234</td>
        <td class="table__cell">—</td>
      </tr>
      <tr class="table__row">
        <td class="table__cell">계약일</td>
        <td class="table__cell">2026-01-15</td>
        <td class="table__cell">—</td>
      </tr>
      <tr class="table__row">
        <td class="table__cell">계약기간</td>
        <td class="table__cell">2026-01-15 ~ 2027-01-14</td>
        <td class="table__cell">1년</td>
      </tr>
      <tr class="table__row">
        <td class="table__cell">계약금액</td>
        <td class="table__cell">120,000,000원</td>
        <td class="table__cell">부가세 포함</td>
      </tr>
    </tbody>
  </table>
</div>
:::

---

### 셀 병합 테이블

:::preview
<div class="table-container">
  <div class="table__toolbar">
    <h3 class="table__title" id="merge-info-title">주소 정보</h3>
  </div>
  <table class="table table--info" aria-labelledby="merge-info-title">
    <thead class="table__head">
      <tr>
        <th class="table__head-cell" scope="col">구분</th>
        <th class="table__head-cell" scope="col">항목</th>
        <th class="table__head-cell" scope="col">내용</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__cell" rowspan="3">본사</td>
        <td class="table__cell">우편번호</td>
        <td class="table__cell">04524</td>
      </tr>
      <tr class="table__row">
        <td class="table__cell">기본주소</td>
        <td class="table__cell">서울특별시 중구 세종대로 110</td>
      </tr>
      <tr class="table__row">
        <td class="table__cell">상세주소</td>
        <td class="table__cell">서울시청 본관 3층</td>
      </tr>
      <tr class="table__row">
        <td class="table__cell" rowspan="2">지사</td>
        <td class="table__cell">우편번호</td>
        <td class="table__cell">48058</td>
      </tr>
      <tr class="table__row">
        <td class="table__cell">기본주소</td>
        <td class="table__cell">부산광역시 해운대구 센텀중앙로 48</td>
      </tr>
    </tbody>
  </table>
</div>
:::

---

### 행 헤더 테이블

:::preview
<div class="table-container">
  <div class="table__toolbar">
    <h3 class="table__title" id="row-header-title">개인 정보 상세</h3>
  </div>
  <table class="table table--info" aria-labelledby="row-header-title">
    <tbody class="table__body">
      <tr class="table__row">
        <th class="table__head-cell table__row-header" scope="row">성명</th>
        <td class="table__cell">홍길동</td>
        <th class="table__head-cell table__row-header" scope="row">생년월일</th>
        <td class="table__cell">1990-03-15</td>
      </tr>
      <tr class="table__row">
        <th class="table__head-cell table__row-header" scope="row">부서</th>
        <td class="table__cell">인사팀</td>
        <th class="table__head-cell table__row-header" scope="row">직책</th>
        <td class="table__cell">대리</td>
      </tr>
      <tr class="table__row">
        <th class="table__head-cell table__row-header" scope="row">입사일</th>
        <td class="table__cell">2018-07-01</td>
        <th class="table__head-cell table__row-header" scope="row">고용형태</th>
        <td class="table__cell">정규직</td>
      </tr>
      <tr class="table__row">
        <th class="table__head-cell table__row-header" scope="row">이메일</th>
        <td class="table__cell" colspan="3">hong.gildong@example.com</td>
      </tr>
    </tbody>
  </table>
</div>
:::

---

## CSS

```css
/* ── Info Table modifier ── */
/* 마크다운 문서 테이블에도 이 클래스를 자동 부여 — build.py DOM 후처리 */
.table--info {
  table-layout: auto;
  white-space: normal;
  margin-bottom: var(--space-12);
  /* 상하 border만 — 좌우 라인·radius 없음 */
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* hover 없음 — 읽기 전용 테이블 */
.table--info .table__body .table__row:hover {
  background: none;
}

/* 헤더 셀 hover 없음 */
.table--info .table__head-cell:not(.table__head-cell--sort):hover {
  background: none;
}

/* .table-container 안에서는 컨테이너가 border를 담당 */
.table-container .table--info {
  margin-bottom: 0;
  border: none;
}

/* 마지막 행 하단 border 제거 */
.table--info .table__body .table__row:last-child .table__cell {
  border-bottom: none;
}

/* rowspan 셀 border 유지 (마지막 행 규칙 예외) */
.table--info .table__cell[rowspan] {
  vertical-align: middle;
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-right: none;
}

.table--info .table__body .table__row:last-child .table__cell[rowspan] {
  border-bottom: none;
}

/* 같은 그룹 내 내부 행은 구분선 제거 */
.table--info .table__row.group-inner .table__cell:not([rowspan]) {
  border-bottom: none;
}

/* 멀티라인 허용 — 데이터 테이블의 overflow:hidden이 문서 테이블 내용을 클리핑하지 않도록 */
.table--info .table__cell,
.table--info .table__head-cell {
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
}

/* ── Row Header (th scope="row") ── */
.table__row-header {
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  background: var(--color-surface-neutral);
  white-space: nowrap;
  width: fit-content;
  text-align: left;
}
```

---

## 접근성

| 상황 | 마크업 |
|------|--------|
| 열 헤더 | `<th scope="col">` |
| 행 헤더 | `<th scope="row">` |
| 열 그룹 헤더 | `<th scope="colgroup" colspan="N">` |
| 테이블 설명 | `<table aria-label="…">` 또는 `<caption>` |
| 복잡 병합 테이블 | 각 헤더 셀에 `id`, 데이터 셀에 `headers="[id목록]"` 로 명시적 연결 |

### 복잡 테이블 예시 (id/headers)

```html
<table class="table table--info" aria-label="분기별 부서 실적">
  <thead class="table__head">
    <tr>
      <th id="dept" scope="col" class="table__head-cell">부서</th>
      <th id="q1" scope="col" class="table__head-cell">1분기</th>
      <th id="q2" scope="col" class="table__head-cell">2분기</th>
    </tr>
  </thead>
  <tbody class="table__body">
    <tr class="table__row">
      <th id="sales" headers="dept" scope="row" class="table__head-cell table__row-header">영업팀</th>
      <td headers="sales q1" class="table__cell">1,200만</td>
      <td headers="sales q2" class="table__cell">1,450만</td>
    </tr>
  </tbody>
</table>
```

---

## Do / Don't

| Do | Don't |
|----|-------|
| `table--info` modifier로 `table-layout: auto` 적용 | 정보 테이블에 `table-layout: fixed` 강제 |
| 행 헤더는 `th scope="row"` + `.table__row-header` | 행 레이블을 `td`로 마크업 |
| 병합 셀 수가 thead th 개수와 일치하도록 rowspan/colspan 계산 | colspan 합산이 컬럼 수를 초과하도록 방치 |
| 복잡 테이블은 `id/headers`로 셀-헤더 연결 | rowspan·colspan 혼용 테이블에서 scope만으로 연결 |
| `caption` 또는 `aria-label`로 테이블 목적 명시 | 테이블 제목 없이 시각적 위치만으로 구분 |
