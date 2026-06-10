---
file: components/organisms/table/data.md
version: 0.1.2
status: draft
updated: 2026-06-09
depends-on: components/organisms/table/index.md, components/molecules/table-cell.md, components/atoms/checkbox.md, components/atoms/badge.md, components/atoms/icon.md, components/atoms/icon-button.md, components/molecules/dropdown.md
---

# Table — 데이터 테이블

## 개요

정렬·선택·편집·펼침 기능을 가진 인터랙티브 데이터 테이블.  
공통 구조·base CSS·접근성 기본 규칙은 [`table/index.md`](index.md) 참조.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 선택 | 없음 · 단일(radio) · 다중(checkbox) | 없음 |
| 정렬 | 없음 · asc · desc | 없음 |
| toolbar | 없음 · 있음 | 없음 |

---

<!-- AI:
데이터 테이블 구조 패턴:

선택(다중):
- thead th에 .table__cell--check + checkbox atom:
  <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
- tbody td에 .table__cell--check + checkbox atom (aria-label="N행 선택" 또는 행 식별 레이블)

정렬:
- thead th에 .table__head-cell--sort 추가
- th 내부에 <button class="table__sort-btn"> 배치
- 정렬 상태는 th에 aria-sort="ascending"|"descending"|"none" 토글

편집형 (editable):
- tbody td에 .table__cell--edit + 내부에 .input-wrap > .input 삽입
- 헤더에 Badge (.badge) 추가 — 과세/비과세 구분
- tfoot에 .table__foot + 합계 행

펼침형 (expandable):
- tbody 각 행 직후에 .table__row--sub를 형제로 배치
- 펼침 버튼: .table__cell--expand 안 <button>, 클릭 시 해당 행에 .table__row--expanded 토글
- 서브 행은 CSS adjacent sibling (.table__row--expanded + .table__row--sub)으로 표시/숨김
- 서브 콘텐츠는 .table-sub-content → .table-sub-info + .table-sub-group 조합
- colspan은 thead의 th 개수와 동일하게 설정

숫자 셀: .table__cell--number — text-align: right
액션 셀: .table__cell--action — 버튼/아이콘버튼 배치 전용, overflow: visible
-->

---

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
              <th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
              <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none">
                <button class="table__sort-btn" aria-label="이름 정렬">이름<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button>
              </th>
              <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none">
                <button class="table__sort-btn" aria-label="직책 정렬">직책<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button>
              </th>
              <th class="table__head-cell" scope="col">직위</th>
              <th class="table__head-cell" scope="col">입사일</th>
              <th class="table__head-cell table__cell--number" scope="col">근무기간</th>
              <th class="table__head-cell table__cell--action" scope="col"></th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr class="table__row table__row--selected">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" checked aria-label="홍길동 선택됨"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td>
              <td class="table__cell table__cell--action"><button class="icon-on--sm icon--brand" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star-fill"/></svg></button></td>
            </tr>
            <tr class="table__row">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="김철수 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td>
              <td class="table__cell table__cell--action"><button class="icon-on--sm" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star"/></svg></button></td>
            </tr>
            <tr class="table__row">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="이영희 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td>
              <td class="table__cell table__cell--action"><button class="icon-on--sm" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star"/></svg></button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div data-region="size-base" class="table-container">
        <div class="table__toolbar" hidden><h2 class="table__title">근로자 목록</h2><div class="table__toolbar-actions"></div></div>
        <table class="table" aria-label="base 테이블 예시">
          <thead class="table__head"><tr>
            <th class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
            <th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc"><button class="table__sort-btn" aria-label="이름 오름차순">이름<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
            <th class="table__head-cell table__head-cell--sort"><button class="table__sort-btn" aria-label="직책 정렬">직책<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
            <th class="table__head-cell">직위</th><th class="table__head-cell">입사일</th><th class="table__head-cell table__cell--number">근무기간</th><th class="table__head-cell table__cell--action"></th>
          </tr></thead>
          <tbody class="table__body">
            <tr class="table__row table__row--selected"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" checked aria-label="홍길동 선택됨"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td><td class="table__cell table__cell--action"><button class="icon-on--sm icon--brand" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star-fill"/></svg></button></td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="김철수 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td><td class="table__cell table__cell--action"><button class="icon-on--sm" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star"/></svg></button></td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="이영희 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td><td class="table__cell table__cell--action"><button class="icon-on--sm" aria-label="즐겨찾기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-star"/></svg></button></td></tr>
          </tbody>
        </table>
      </div>

      <div data-region="size-dense" class="table-container">
        <div class="table__toolbar" hidden><h2 class="table__title">근로자 목록</h2><div class="table__toolbar-actions"></div></div>
        <table class="table table--dense" aria-label="dense 테이블 예시">
          <thead class="table__head"><tr>
            <th class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
            <th class="table__head-cell table__head-cell--sort"><button class="table__sort-btn" aria-label="이름 정렬">이름<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
            <th class="table__head-cell">직책</th><th class="table__head-cell">직위</th><th class="table__head-cell">입사일</th><th class="table__head-cell table__cell--number">근무기간</th>
          </tr></thead>
          <tbody class="table__body">
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="홍길동 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="김철수 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="이영희 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
          </tbody>
        </table>
      </div>

      <div data-region="size-compact" class="table-container">
        <div class="table__toolbar" hidden><h2 class="table__title">근로자 목록</h2><div class="table__toolbar-actions"></div></div>
        <table class="table table--compact" aria-label="compact 테이블 예시">
          <thead class="table__head"><tr>
            <th class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
            <th class="table__head-cell table__head-cell--sort"><button class="table__sort-btn" aria-label="이름 정렬">이름<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
            <th class="table__head-cell">직책</th><th class="table__head-cell">직위</th><th class="table__head-cell">입사일</th><th class="table__head-cell table__cell--number">근무기간</th>
          </tr></thead>
          <tbody class="table__body">
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="홍길동 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="김철수 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="이영희 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
          </tbody>
        </table>
      </div>

      <div data-region="size-spacious" class="table-container">
        <div class="table__toolbar" hidden><h2 class="table__title">근로자 목록</h2><div class="table__toolbar-actions"></div></div>
        <table class="table table--spacious" aria-label="spacious 테이블 예시">
          <thead class="table__head"><tr>
            <th class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
            <th class="table__head-cell table__head-cell--sort"><button class="table__sort-btn" aria-label="이름 정렬">이름<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm icon--disabled" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
            <th class="table__head-cell">직책</th><th class="table__head-cell">직위</th><th class="table__head-cell">입사일</th><th class="table__head-cell table__cell--number">근무기간</th>
          </tr></thead>
          <tbody class="table__body">
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="홍길동 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="김철수 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
            <tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="이영희 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td><td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell">1991.02.28</td><td class="table__cell table__cell--number">50년 12개월 99일</td></tr>
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

### 편집형

:::preview
<table data-component class="table" aria-label="편집 가능 급여 테이블">
  <thead class="table__head">
    <tr>
      <th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
      <th class="table__head-cell" scope="col" style="width:48px">번호</th>
      <th class="table__head-cell" scope="col">부서</th>
      <th class="table__head-cell" scope="col">이름</th>
      <th class="table__head-cell" scope="col">직책</th>
      <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">
        기본급
        <span class="badge badge--neutral badge--sm">비과세</span>
      </th>
      <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">
        식대
        <span class="badge badge--neutral badge--sm">비과세</span>
      </th>
      <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">
        직책수당
        <span class="badge badge--caution badge--sm">과세</span>
      </th>
      <th class="table__head-cell table__head-cell--total table__cell--number" scope="col">고정급여 합계</th>
    </tr>
  </thead>
  <tbody class="table__body">
    <tr class="table__row">
      <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="1행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
      <td class="table__cell table__cell--number">1</td>
      <td class="table__cell">OO팀</td>
      <td class="table__cell">홍길동</td>
      <td class="table__cell">대리</td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="3,000,000" aria-label="기본급 홍길동"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="100,000" aria-label="식대 홍길동"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="300,000" aria-label="직책수당 홍길동"></div></td>
      <td class="table__cell table__cell--number">3,710,000</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="2행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
      <td class="table__cell table__cell--number">2</td>
      <td class="table__cell">OO팀</td>
      <td class="table__cell">홍길동</td>
      <td class="table__cell">대리</td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="3,000,000" aria-label="기본급 2행"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="100,000" aria-label="식대 2행"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="0" aria-label="직책수당 2행"></div></td>
      <td class="table__cell table__cell--number">3,110,000</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="3행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
      <td class="table__cell table__cell--number">3</td>
      <td class="table__cell">OO팀</td>
      <td class="table__cell">홍길동</td>
      <td class="table__cell">대리</td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="2,000,000" aria-label="기본급 3행"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="0" aria-label="식대 3행"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="100,000" aria-label="직책수당 3행"></div></td>
      <td class="table__cell table__cell--number">2,100,000</td>
    </tr>
  </tbody>
  <tfoot class="table__foot">
    <tr class="table__row">
      <td class="table__cell table__cell--check"></td>
      <td class="table__cell" colspan="4">총합 3명</td>
      <td class="table__cell table__cell--number">8,000,000</td>
      <td class="table__cell table__cell--number">200,000</td>
      <td class="table__cell table__cell--number">400,000</td>
      <td class="table__cell table__cell--number">8,920,000</td>
    </tr>
  </tfoot>
</table>
<script>
(function() {
  stage.querySelectorAll('.table__cell--edit .input').forEach(function(input) {
    if (input.value) input.classList.add('input--complete');
    input.addEventListener('blur', function() {
      input.classList.toggle('input--complete', !!input.value);
    });
    input.addEventListener('input', function() {
      if (!input.value) input.classList.remove('input--complete');
    });
  });
})();
</script>
:::

#### 편집형 제약

- 편집 가능 셀의 합계는 JS로 실시간 계산해 `tfoot` 셀에 반영한다.
- 헤더 Badge는 `badge--neutral`(비과세)·`badge--caution`(과세)를 사용한다.
- `tfoot`의 합계 행은 편집 셀 없이 숫자만 표시한다. 합계 셀은 `table__cell--number`를 유지한다.

---

### 펼침형

:::preview
<table data-component class="table" aria-label="펼침형 급여 명세 테이블">
  <thead class="table__head">
    <tr>
      <th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
      <th class="table__cell table__cell--expand" scope="col"></th>
      <th class="table__head-cell" scope="col" style="width:48px">번호</th>
      <th class="table__head-cell" scope="col">부서</th>
      <th class="table__head-cell" scope="col">이름</th>
      <th class="table__head-cell" scope="col">직책</th>
      <th class="table__head-cell table__cell--number" scope="col">고정급여</th>
      <th class="table__head-cell table__cell--number" scope="col">변동급여</th>
      <th class="table__head-cell table__cell--number" scope="col">공제금액</th>
      <th class="table__head-cell table__cell--number" scope="col">실지급액</th>
      <th class="table__head-cell" scope="col">전송상태</th>
    </tr>
  </thead>
  <tbody class="table__body">

    <!-- 행 1 (펼쳐진 상태) -->
    <tr class="table__row table__row--expanded" id="exp-row-1">
      <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="1행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
      <td class="table__cell table__cell--expand">
        <button class="icon-on--sm" aria-expanded="true" aria-controls="sub-row-1" aria-label="행 접기">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg>
        </button>
      </td>
      <td class="table__cell table__cell--number">1</td>
      <td class="table__cell">OO팀</td>
      <td class="table__cell">홍길동</td>
      <td class="table__cell">대리</td>
      <td class="table__cell table__cell--number">2,000,000</td>
      <td class="table__cell table__cell--number">0</td>
      <td class="table__cell table__cell--number">60,000</td>
      <td class="table__cell table__cell--number">2,000,000</td>
      <td class="table__cell">
        <button class="btn btn--secondary btn--solid btn--xs" type="button">미리보기</button>
      </td>
    </tr>
    <tr class="table__row--sub" id="sub-row-1">
      <td class="table__cell--sub" colspan="11">
        <div class="table-sub-content">
          <div class="table-sub-info">
            <div><span class="table-sub-info__label">급여유형</span> 본사_정규직</div>
            <div><span class="table-sub-info__label">급여계좌</span> 네모투자증권<br>XXX-BBBBB-YY-ZZC<br>홍길동</div>
          </div>
          <div class="table-sub-group">
            <div class="table-sub-group__title">고정급여</div>
            <div class="table-sub-row"><span class="badge badge--neutral badge--sm">비과세</span> 기본급 <span class="table-sub-row__amount">1,800,000</span></div>
            <div class="table-sub-row"><span class="badge badge--neutral badge--sm">비과세</span> 식대 <span class="table-sub-row__amount">200,000</span></div>
          </div>
          <div class="table-sub-group">
            <div class="table-sub-group__title">변동급여</div>
            <div class="table-sub-row" style="color:var(--color-text-subtle)">—</div>
          </div>
          <div class="table-sub-group">
            <div class="table-sub-group__title">공제금액</div>
            <div class="table-sub-row">소득세 <span class="table-sub-row__amount">10,000</span></div>
            <div class="table-sub-row">건강보험 <span class="table-sub-row__amount">25,000</span></div>
            <div class="table-sub-row">국민연금 <span class="table-sub-row__amount">25,000</span></div>
          </div>
        </div>
      </td>
    </tr>

    <!-- 행 2 (접힌 상태) -->
    <tr class="table__row" id="exp-row-2">
      <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="2행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
      <td class="table__cell table__cell--expand">
        <button class="icon-on--sm" aria-expanded="false" aria-controls="sub-row-2" aria-label="행 펼치기">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg>
        </button>
      </td>
      <td class="table__cell table__cell--number">2</td>
      <td class="table__cell">OO팀</td>
      <td class="table__cell">홍길동</td>
      <td class="table__cell">대리</td>
      <td class="table__cell table__cell--number">2,000,000</td>
      <td class="table__cell table__cell--number">2,000,000</td>
      <td class="table__cell table__cell--number">100,000</td>
      <td class="table__cell table__cell--number">3,900,000</td>
      <td class="table__cell">
        <button class="btn btn--secondary btn--solid btn--xs" type="button">미리보기</button>
      </td>
    </tr>
    <tr class="table__row--sub" id="sub-row-2">
      <td class="table__cell--sub" colspan="11">
        <div class="table-sub-content">
          <div class="table-sub-info">
            <div><span class="table-sub-info__label">급여유형</span> 본사_정규직</div>
            <div><span class="table-sub-info__label">급여계좌</span> 네모투자증권<br>XXX-BBBBB-YY-ZZC<br>홍길동</div>
          </div>
          <div class="table-sub-group">
            <div class="table-sub-group__title">고정급여</div>
            <div class="table-sub-row"><span class="badge badge--neutral badge--sm">비과세</span> 기본급 <span class="table-sub-row__amount">1,800,000</span></div>
            <div class="table-sub-row"><span class="badge badge--neutral badge--sm">비과세</span> 식대 <span class="table-sub-row__amount">200,000</span></div>
            <div class="table-sub-row"><span class="badge badge--caution badge--sm">과세</span> 성과급 <span class="table-sub-row__amount">0</span></div>
          </div>
          <div class="table-sub-group">
            <div class="table-sub-group__title">변동급여</div>
            <div class="table-sub-row">휴일야간연장수당 <span class="table-sub-row__amount">500,000</span></div>
            <div class="table-sub-row">야간연장수당 <span class="table-sub-row__amount">500,000</span></div>
            <div class="table-sub-row">야간수당 <span class="table-sub-row__amount">500,000</span></div>
          </div>
          <div class="table-sub-group">
            <div class="table-sub-group__title">공제금액</div>
            <div class="table-sub-row">소득세 <span class="table-sub-row__amount">10,000</span></div>
            <div class="table-sub-row">산재보험 <span class="table-sub-row__amount">10,000</span></div>
            <div class="table-sub-row">고용보험 <span class="table-sub-row__amount">25,000</span></div>
            <div class="table-sub-row">건강보험 <span class="table-sub-row__amount">25,000</span></div>
            <div class="table-sub-row">국민연금 <span class="table-sub-row__amount">15,000</span></div>
          </div>
        </div>
      </td>
    </tr>

  </tbody>
  <tfoot class="table__foot">
    <tr class="table__row">
      <td class="table__cell table__cell--check"></td>
      <td class="table__cell table__cell--expand"></td>
      <td class="table__cell" colspan="4">총합 2명</td>
      <td class="table__cell table__cell--number">4,000,000</td>
      <td class="table__cell table__cell--number">2,000,000</td>
      <td class="table__cell table__cell--number">160,000</td>
      <td class="table__cell table__cell--number">5,900,000</td>
      <td class="table__cell"></td>
    </tr>
  </tfoot>
</table>
<script>
(function() {
  stage.querySelectorAll('.table__cell--expand button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var row = btn.closest('.table__row');
      var isExpanded = row.classList.toggle('table__row--expanded');
      btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      // 아이콘 전환
      var use = btn.querySelector('use');
      if (use) use.setAttribute('href', isExpanded ? 'icons/sprite.svg#icon-minus' : 'icons/sprite.svg#icon-plus');
      btn.setAttribute('aria-label', isExpanded ? '행 접기' : '행 펼치기');
    });
  });
})();
</script>
:::

#### 펼침형 제약

- `.table__row--sub`는 반드시 대응하는 `.table__row` 바로 다음 형제로 배치한다. CSS adjacent sibling(`+`)으로 표시/숨김을 제어한다.
- `colspan`은 `thead`의 `th` 개수와 정확히 일치시킨다.
- 서브 콘텐츠 내 그룹 수(고정급여·변동급여·공제금액 등)가 달라지면 `.table-sub-content`의 `grid-template-columns`를 인라인 style로 조정한다.
- 펼침 버튼 아이콘은 접힌 상태 `icon-plus`, 펼쳐진 상태 `icon-minus`를 사용한다.

---

## CSS

```css
/* sort, head check-border → table-cell.md 정의 참조 */

/* ── Number / Check / Action / Expand cells ── */
.table__cell--number {
  text-align: right;
}


.table__cell--action {
  width: 56px;
  text-align: center;
  vertical-align: middle;
  overflow: visible;
}

.table__cell--expand {
  width: 36px;
  text-align: center;
  padding: 0 var(--space-generic-xs);
}

/* ── Edit cell ── */
/* padding·border-bottom → table-cell.md 공통 규칙 상속 */
.table__cell--edit {
  vertical-align: middle;
  box-sizing: border-box;
}

.table__cell--edit .input {
  width: 100%;
  text-align: right;
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

/* ── Head Badge ── */
.table__head-cell .badge {
  vertical-align: middle;
  margin-left: var(--space-gap-xs);
}

/* ── Expandable sub-row ── */
.table__row--sub {
  display: none;
}

.table__row--expanded + .table__row--sub {
  display: table-row;
}

.table__cell--sub {
  padding: var(--space-inset-xl);
  background: var(--color-surface-subtle);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

.table-sub-content {
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
  gap: var(--space-gap-md);
}

.table-sub-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-body);
}

.table-sub-info__label {
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  margin-right: var(--space-generic-sm);
}

.table-sub-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-xs);
}

.table-sub-group__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  margin-bottom: var(--space-generic-xs);
}

.table-sub-row {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
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

| 상황 | 마크업 |
|------|--------|
| 정렬 상태 | 정렬 중인 `<th>`에 `aria-sort="ascending"` 또는 `aria-sort="descending"`, 미정렬은 `aria-sort="none"` |
| 전체 선택 체크박스 | `<input type="checkbox" aria-label="전체 선택">` |
| 행 선택 체크박스 | `<input type="checkbox" aria-label="N행 선택">` 또는 행 식별 가능한 레이블 |
| 펼침 버튼 | `aria-expanded="true/false"`, `aria-controls="[sub-row id]"`, 상태에 따른 `aria-label` |
| 편집 셀 | `<input aria-label="[컬럼명] [행 식별]">` |
| 선택된 행 | 행에 `aria-selected="true"` 추가 (role="row" 컨텍스트) |

### JS — 정렬 상태 동기화

```js
// 정렬 버튼 클릭 시 aria-sort 토글 예시
sortBtn.addEventListener('click', function () {
  const th = this.closest('th');
  const current = th.getAttribute('aria-sort');
  // 모든 정렬 헤더 초기화
  document.querySelectorAll('[aria-sort]').forEach(el => el.setAttribute('aria-sort', 'none'));
  // 현재 열 상태 순환: none → ascending → descending → none
  if (current === 'none' || !current) {
    th.setAttribute('aria-sort', 'ascending');
  } else if (current === 'ascending') {
    th.setAttribute('aria-sort', 'descending');
  } else {
    th.setAttribute('aria-sort', 'none');
  }
});
```

---

## Do / Don't

| Do | Don't |
|----|-------|
| 숫자 컬럼은 `.table__cell--number`로 우측 정렬 | 숫자 컬럼을 기본 좌측 정렬로 방치 |
| 편집 셀 합계를 `tfoot`에 집계 | 합계를 tbody 마지막 행에 배치 |
| 펼침 버튼에 `aria-expanded` + `aria-controls` 연결 | 펼침/접힘 상태를 시각적으로만 표현 |
| `.table__row--sub`를 대응 행 바로 다음 형제로 배치 | 서브 행을 tbody 끝에 몰아서 배치 |
| Badge로 과세/비과세 구분 명시 | 텍스트만으로 세금 유형 표현 |
