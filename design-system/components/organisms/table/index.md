---
file: components/organisms/table/index.md
version: 0.3.0
status: draft
updated: 2026-06-09
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/height.md, tokens/stroke.md, tokens/typography.md, components/atoms/checkbox.md, components/atoms/badge.md, components/atoms/icon.md, components/atoms/icon-button.md, components/molecules/dropdown.md
---

# Table

## 개요

행·열 구조로 데이터를 표시하는 Organism. 정렬·선택·펼침·편집 기능을 선택적으로 조합한다.

TableToolbar(제목 + 우측 액션)를 포함한 `.table-container`로 감싸서 사용한다. 상단 검색·필터 영역은 FilterBar Organism이 담당하며 Table과 별도로 배치한다.

세 가지 패턴으로 구분한다:
- **기본형** — 텍스트 셀 + 정렬 가능 헤더 + 체크박스 선택
- **편집형** — 셀에 Input 삽입, 합계 행 포함 (`variants.md`)
- **펼침형** — 행 expand/collapse, 서브 콘텐츠 포함 (`variants.md`)

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | dense · compact · base · spacious | base (클래스 없음) |
| 선택 | 없음 · 단일 · 다중 | 없음 (클래스 없음) |
| 정렬 | 없음 · asc · desc | 없음 (클래스 없음) |
| toolbar | 없음 · 있음 | 없음 (클래스 없음) |

- **dense** `28px` — 데이터 밀도가 높은 급여·회계 화면
- **compact** `32px` — 사이드바·패널 내 보조 테이블
- **base** `36px` — 일반 목록 화면 (기본)
- **spacious** `40px` — 터치 지원 환경, 여유로운 레이아웃

---

<!-- AI:
레이어 계층:
TableContainer (.table-container, <div>) — Table + TableToolbar 전체 래퍼
  ├─ TableToolbar (.table__toolbar, <div>) — optional
  │    ├─ TableTitle (.table__title, <h2>|<h3>) — 테이블 제목 텍스트
  │    │    └─ 도움말 버튼 (<button aria-label="도움말">) — optional
  │    └─ TableToolbarActions (.table__toolbar-actions, <div>) — 우측 아이콘 버튼 묶음
  │         └─ icon-button (엑셀 내보내기·필터·설정 등)
  └─ Table (.table, <table>)
       ├─ TableHead (.table__head, <thead>)
  │    └─ <tr>
  │         ├─ CheckCell (.table__cell--check, <th>) — 다중 선택 시 optional
  │         ├─ SortHeadCell (.table__head-cell .table__head-cell--sort, <th>)
  │         │    └─ SortButton (.table__sort-btn, <button>)
  │         │         상태 — 부모 th에 클래스 토글:
  │         │           오름차순: .table__head-cell--sort-asc
  │         │           내림차순: .table__head-cell--sort-desc
  │         └─ HeadCell (.table__head-cell, <th>) — 정렬 불필요한 컬럼
  ├─ TableBody (.table__body, <tbody>)
  │    └─ DataRow (.table__row, <tr>)
  │         상태 — JS 클래스 토글:
  │           선택됨: .table__row--selected
  │           펼쳐짐: .table__row--expanded (variants.md 펼침형 전용)
  │         └─ Cell 종류:
  │              .table__cell          — 기본 텍스트
  │              .table__cell--number  — 숫자 (오른쪽 정렬, tabular-nums)
  │              .table__cell--check   — 체크박스 셀
  │              .table__cell--action  — 아이콘 버튼 셀 (즐겨찾기 등)
  │              .table__cell--edit    — Input 삽입 셀 (편집형 전용)
  │              .table__cell--expand  — 펼침 토글 셀 (펼침형 전용)
       └─ TableFoot (.table__foot, <tfoot>) — 합계 행, optional

동작:
- 행 단일 선택: 행 클릭 → row.classList.toggle('table__row--selected'), 라디오처럼 이전 선택 해제
- 다중 선택: checkbox.change → row.classList.toggle('table__row--selected')
- 전체 선택: head checkbox.change → tbody 모든 row + checkbox 동기화
- 정렬: .table__sort-btn 클릭 → 부모 th에서 sort-asc/sort-desc 토글, 다른 th의 정렬 상태 초기화
- 정렬 드롭다운: 오름차순·내림차순·다중 정렬 선택 — molecules/dropdown.md 참조
-->

## 사용 지침

:::preview
<div class="pattern-explorer">

  <nav class="pattern-explorer__tree" aria-label="size 패턴">
    <span class="pattern-explorer__group-label" style="margin-top:0">Toolbar</span>
    <button class="pattern-explorer__item active" data-region="with-toolbar">제목 + 액션</button>
    <span class="pattern-explorer__group-label">Size</span>
    <button class="pattern-explorer__item" data-region="size-base">base (기본)</button>
    <button class="pattern-explorer__item" data-region="size-dense">dense</button>
    <button class="pattern-explorer__item" data-region="size-compact">compact</button>
    <button class="pattern-explorer__item" data-region="size-spacious">spacious</button>
  </nav>

  <div class="pattern-explorer__panel">
    <div data-component>

      <div data-region="with-toolbar" class="table-container">
        <div class="table__toolbar">
          <h3 class="table__title">근로자 검색 <button class="icon-on--sm" aria-label="도움말"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help-circle"/></svg></button></h3>
          <div class="table__toolbar-actions">
            <button class="icon-on--sm" aria-label="엑셀 내보내기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-excel"/></svg></button>
            <button class="icon-on--sm" aria-label="컬럼 설정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-settings"/></svg></button>
          </div>
        </div>
        <table class="table" aria-labelledby="tbl-title-preview">
          <thead class="table__head">
            <tr>
              <th class="table__cell table__cell--check" scope="col"><input type="checkbox" aria-label="전체 선택"></th>
              <th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col">
                <button class="table__sort-btn" aria-label="이름 오름차순 정렬됨">이름<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-up"/></svg></span></button>
              </th>
              <th class="table__head-cell table__head-cell--sort" scope="col">
                <button class="table__sort-btn" aria-label="직책 정렬">직책<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button>
              </th>
              <th class="table__head-cell" scope="col">직위</th>
              <th class="table__head-cell" scope="col">입사일</th>
              <th class="table__head-cell table__cell--number" scope="col">근무기간</th>
              <th class="table__head-cell table__cell--action" scope="col"></th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr class="table__row table__row--selected">
              <td class="table__cell table__cell--check"><input type="checkbox" checked aria-label="홍길동 선택됨"></td>
              <td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td>
              <td class="table__cell table__cell--action"><button class="icon-on--sm icon--brand" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star-fill"/></svg></button></td>
            </tr>
            <tr class="table__row">
              <td class="table__cell table__cell--check"><input type="checkbox" aria-label="김철수 선택"></td>
              <td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td>
              <td class="table__cell table__cell--action"><button class="icon-on--sm" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star"/></svg></button></td>
            </tr>
            <tr class="table__row">
              <td class="table__cell table__cell--check"><input type="checkbox" aria-label="이영희 선택"></td>
              <td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td>
              <td class="table__cell table__cell--action"><button class="icon-on--sm" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star"/></svg></button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div data-region="size-base" class="table-container">
        <div class="table__toolbar" hidden>
          <h2 class="table__title">근로자 목록</h2>
          <div class="table__toolbar-actions"></div>
        </div>
        <table class="table" aria-label="기본 테이블 예시">
          <thead class="table__head">
            <tr>
              <th class="table__cell table__cell--check"><input type="checkbox" aria-label="전체 선택"></th>
              <th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc">
                <button class="table__sort-btn" aria-label="이름 오름차순 정렬됨">이름<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-up"/></svg></span></button>
              </th>
              <th class="table__head-cell table__head-cell--sort"><button class="table__sort-btn" aria-label="직책 정렬">직책<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button></th>
              <th class="table__head-cell">직위</th>
              <th class="table__head-cell">입사일</th>
              <th class="table__head-cell table__cell--number">근무기간</th>
              <th class="table__head-cell table__cell--action"></th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr class="table__row table__row--selected"><td class="table__cell table__cell--check"><input type="checkbox" checked aria-label="홍길동 선택됨"></td><td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td><td class="table__cell table__cell--action"><button class="icon-on--sm icon--brand" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star-fill"/></svg></button></td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="김철수 선택"></td><td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td><td class="table__cell table__cell--action"><button class="icon-on--sm" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star"/></svg></button></td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="이영희 선택"></td><td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td><td class="table__cell table__cell--action"><button class="icon-on--sm" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star"/></svg></button></td></tr>
          </tbody>
        </table>
      </div>

      <div data-region="size-dense" class="table-container">
        <div class="table__toolbar" hidden>
          <h2 class="table__title">근로자 목록</h2>
          <div class="table__toolbar-actions"></div>
        </div>
        <table class="table table--dense" aria-label="dense 테이블 예시">
          <thead class="table__head">
            <tr>
              <th class="table__cell table__cell--check"><input type="checkbox" aria-label="전체 선택"></th>
              <th class="table__head-cell table__head-cell--sort"><button class="table__sort-btn" aria-label="이름 정렬">이름<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button></th>
              <th class="table__head-cell">직책</th><th class="table__head-cell">직위</th><th class="table__head-cell">입사일</th><th class="table__head-cell table__cell--number">근무기간</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="홍길동 선택"></td><td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="김철수 선택"></td><td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="이영희 선택"></td><td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
          </tbody>
        </table>
      </div>

      <div data-region="size-compact" class="table-container">
        <div class="table__toolbar" hidden>
          <h2 class="table__title">근로자 목록</h2>
          <div class="table__toolbar-actions"></div>
        </div>
        <table class="table table--compact" aria-label="compact 테이블 예시">
          <thead class="table__head">
            <tr>
              <th class="table__cell table__cell--check"><input type="checkbox" aria-label="전체 선택"></th>
              <th class="table__head-cell table__head-cell--sort"><button class="table__sort-btn" aria-label="이름 정렬">이름<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button></th>
              <th class="table__head-cell">직책</th><th class="table__head-cell">직위</th><th class="table__head-cell">입사일</th><th class="table__head-cell table__cell--number">근무기간</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="홍길동 선택"></td><td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="김철수 선택"></td><td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="이영희 선택"></td><td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
          </tbody>
        </table>
      </div>

      <div data-region="size-spacious" class="table-container">
        <div class="table__toolbar" hidden>
          <h2 class="table__title">근로자 목록</h2>
          <div class="table__toolbar-actions"></div>
        </div>
        <table class="table table--spacious" aria-label="spacious 테이블 예시">
          <thead class="table__head">
            <tr>
              <th class="table__cell table__cell--check"><input type="checkbox" aria-label="전체 선택"></th>
              <th class="table__head-cell table__head-cell--sort"><button class="table__sort-btn" aria-label="이름 정렬">이름<span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort"/></svg></span></button></th>
              <th class="table__head-cell">직책</th><th class="table__head-cell">직위</th><th class="table__head-cell">입사일</th><th class="table__head-cell table__cell--number">근무기간</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="홍길동 선택"></td><td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="김철수 선택"></td><td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><input type="checkbox" aria-label="이영희 선택"></td><td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>
<script>
(function() {
  var navItems = stage.querySelectorAll('.pattern-explorer__item[data-region]');
  var panels = stage.querySelectorAll('[data-region]');
  var codeLines = [];

  function showRegion(key) {
    panels.forEach(function(p) {
      if (!p.classList.contains('pattern-explorer__item')) {
        p.style.display = p.getAttribute('data-region') === key ? '' : 'none';
      }
    });
  }

  function getRegionRange(key) {
    var start = -1, indent = 0;
    for (var i = 0; i < codeLines.length; i++) {
      if (codeLines[i].textContent.indexOf('data-region="' + key + '"') !== -1) {
        start = i;
        var m = codeLines[i].textContent.match(/^(\s*)/);
        indent = m ? m[1].length : 0;
        break;
      }
    }
    if (start === -1) return [0, 0];
    for (var j = start + 1; j < codeLines.length; j++) {
      var t = codeLines[j].textContent;
      var ind = t.search(/\S/);
      if (ind >= 0 && ind <= indent && t.trimLeft().indexOf('</') === 0) return [start, j];
    }
    return [start, codeLines.length - 1];
  }

  function highlightCode(key) {
    codeLines.forEach(function(l) { l.classList.remove('code-region-active'); });
    var r = getRegionRange(key);
    for (var i = r[0]; i <= r[1]; i++) codeLines[i].classList.add('code-region-active');
  }

  navItems.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var key = btn.getAttribute('data-region');
      navItems.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      showRegion(key);
      if (codeLines.length) highlightCode(key);
    });
  });

  setTimeout(function() {
    var previewBox = stage.parentNode;
    var tree = stage.querySelector('.pattern-explorer__tree');
    if (previewBox && tree && previewBox.parentNode) {
      var layout = document.createElement('div');
      layout.style.cssText = 'display:flex;gap:var(--space-gap-xl);align-items:flex-start;';
      previewBox.parentNode.insertBefore(layout, previewBox);
      layout.appendChild(tree);
      layout.appendChild(previewBox);
    }

    navItems[0].click();

    var snippet = previewBox && previewBox.querySelector('.component-code-snippet');
    if (!snippet) return;
    snippet.innerHTML = snippet.innerHTML.split('\n').map(function(l) {
      return '<span class="code-line">' + l + '</span>';
    }).join('');
    codeLines = Array.from(snippet.querySelectorAll('.code-line'));
    var active = stage.querySelector('.pattern-explorer__item.active');
    if (active) highlightCode(active.getAttribute('data-region'));
  }, 0);
})();
</script>
:::

### 제약

- `table-layout: fixed` 기본. 컬럼 너비는 `<col>` 또는 첫 행 셀에 `style="width:Npx"` 인라인으로 지정한다.
- `table__cell--check`·`table__cell--expand`·`table__cell--action` 컬럼은 고정 너비(`40px`)를 사용한다.
- 텍스트 셀은 기본적으로 한 줄 truncation (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`). 다줄이 필요하면 해당 셀에 `white-space: normal`을 인라인으로 지정한다.
- 정렬 드롭다운(오름차순·내림차순·다중 정렬)은 `molecules/dropdown.md`를 사용한다. `table__sort-btn`에 드롭다운 트리거를 연결한다.

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
  padding: 0 var(--space-inset-xl);
  text-align: left;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

.table__head-cell--sort {
  padding: 0;
}

/* ── Sort 버튼 ── */
.table__sort-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
  height: var(--table-row-height);
  padding: 0 var(--space-inset-xl);
  background: none;
  border: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
}

.table__sort-btn:hover {
  background: var(--color-action-neutral-hover);
}

.table__head-cell--sort-asc .table__sort-btn,
.table__head-cell--sort-desc .table__sort-btn {
  color: var(--color-text-brand);
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

.table__row--selected {
  background: var(--color-action-brand-selected);
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
  padding: 0 var(--space-inset-xl);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
}

.table__cell--number {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.table__cell--check,
.table__cell--action,
.table__cell--expand {
  width: 40px;
  padding: 0;
  text-align: center;
}

/* 헤더 체크 셀 — border-bottom은 .table__head-cell이 아니므로 직접 지정 */
.table__head .table__cell--check {
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* 체크박스 — checkbox.md CSS 미주입 환경에서 직접 스타일링 */
.table__cell--check input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: var(--icon-sm);
  height: var(--icon-sm);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

.table__cell--check input[type="checkbox"]:checked {
  background: var(--color-action-brand-default);
  border-color: var(--color-action-brand-default);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 8 6.5 11.5 13 4.5'/%3E%3C/svg%3E");
  background-size: contain;
}

/* 편집 셀 */
.table__cell--edit {
  padding: var(--space-2) var(--space-4);
}
.table__cell--edit .input {
  height: calc(var(--table-row-height) - var(--space-4));
}

/* ── Foot ── */
.table__foot .table__row {
  background: var(--color-surface-neutral);
}

.table__foot .table__cell {
  font-weight: var(--font-weight-heading);
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-bottom: none;
}

/* ── 헤더 Badge (과세·비과세) ── */
.table__head-cell .badge {
  margin-left: var(--space-4);
  vertical-align: middle;
}

/* ── 펼침형 — SubRow ── */
.table__row--sub {
  display: none;
  background: var(--color-surface-brand-subtle);
}

.table__row--expanded + .table__row--sub {
  display: table-row;
}

/* 펼쳐진 행 왼쪽 브랜드 강조선 */
.table__row--expanded > .table__cell:first-child,
.table__row--sub > .table__cell:first-child {
  box-shadow: inset var(--stroke-md) 0 0 var(--color-border-brand);
}

.table__cell--sub {
  height: auto;
  padding: var(--space-inset-xl);
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
}

/* 서브 콘텐츠 내부 레이아웃 */
.table-sub-content {
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  gap: var(--space-gap-xl);
  align-items: start;
}

.table-sub-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-body);
  padding-right: var(--space-inset-xl);
  border-right: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

.table-sub-info__label {
  color: var(--color-text-subtle);
  min-width: 4em;
  display: inline-block;
}

.table-sub-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
}

.table-sub-group__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  margin-bottom: var(--space-2);
}

.table-sub-row {
  display: flex;
  align-items: center;
  gap: var(--space-gap-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-body);
}

.table-sub-row__amount {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
}
```

---

## 접근성

데이터 테이블 유형 (`accessibility.md` 테이블 행 적용).

| 상황 | 마크업 |
|------|--------|
| TableToolbar 제목과 테이블 연결 | `table__title`의 텍스트가 테이블을 설명하면 `<table aria-labelledby="[title id]">`로 연결. 그렇지 않으면 `aria-label` 별도 지정 |
| 테이블 설명 | `<table aria-label="테이블 용도">` 또는 `<caption>` |
| 헤더 연결 | `<th scope="col">` — 스크린리더가 셀 데이터와 헤더를 연결 |
| 정렬 상태 | 정렬 중인 th에 `aria-sort="ascending"` 또는 `aria-sort="descending"` |
| 체크박스 | 각 행 체크박스에 `aria-label="[행 식별값] 선택"`, 전체 선택에 `aria-label="전체 선택"` |
| 전체 선택 중간 상태 | 일부만 선택 시 head checkbox에 `indeterminate = true` (JS), `aria-checked="mixed"` |
| 펼침 버튼 | `<button aria-expanded="false">`, 펼쳐지면 `aria-expanded="true"`. `aria-controls="[sub-row id]"` |
| 편집 셀 | Input에 `aria-label="[컬럼명] [행 식별값]"` |
| 키보드 | Tab으로 인터랙티브 요소(체크박스·정렬 버튼·편집 셀) 이동. 행 선택은 Space |

```js
// 정렬 상태 동기화
sortBtn.addEventListener('click', () => {
  const th = sortBtn.closest('th');
  const isAsc = th.classList.contains('table__head-cell--sort-asc');
  // 다른 th 초기화
  document.querySelectorAll('.table__head-cell--sort').forEach(el => {
    el.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
    el.removeAttribute('aria-sort');
  });
  // 현재 th 토글
  if (isAsc) {
    th.classList.add('table__head-cell--sort-desc');
    th.setAttribute('aria-sort', 'descending');
  } else {
    th.classList.add('table__head-cell--sort-asc');
    th.setAttribute('aria-sort', 'ascending');
  }
});
```

---

## Do / Don't

> ✅ DO — TableToolbar 제목으로 테이블을 설명할 때 `aria-labelledby` 연결
> `<h3 id="tbl-title" class="table__title">근로자 검색</h3>`
> `<table aria-labelledby="tbl-title">`

> ❌ DON'T — FilterBar(검색·필터)를 `.table-container` 안에 포함
> FilterBar는 Table과 별도 Organism. `.table-container` 밖에 배치하고 레이아웃으로 조합한다

> ✅ DO — `scope="col"` 로 헤더 명시
> `<th scope="col" class="table__head-cell">이름</th>`

> ✅ DO — 정렬 활성 상태를 클래스와 aria-sort 두 곳에 동시 반영
> `<th class="table__head-cell--sort table__head-cell--sort-asc" aria-sort="ascending">`

> ✅ DO — 컬럼 너비는 `<col>` 또는 첫 행 셀 인라인 style로 지정
> `<col style="width:160px">` 또는 `<th style="width:160px">`

> ❌ DON'T — 정렬 버튼 없이 th 클릭 전체에 정렬 이벤트 바인딩
> th 내 button이 없으면 키보드 접근 불가

> ❌ DON'T — 편집 셀에 Input label 생략
> 셀 컨텍스트가 시각적으로 있어도 스크린리더는 컬럼 헤더와 연결되지 않으므로 `aria-label` 필수

> ❌ DON'T — `table__cell--edit`에서 Input height를 행 높이와 맞추지 않고 기본값 사용
> size variant마다 `--table-row-height`가 달라지므로 CSS `calc()`로 연동
