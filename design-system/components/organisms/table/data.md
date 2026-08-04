---
file: components/organisms/table/data.md
version: 0.7.0
status: draft
updated: 2026-06-29
depends-on: components/organisms/table/index.md, components/molecules/table-cell.md, components/atoms/checkbox.md, components/atoms/badge.md, components/atoms/icon.md, components/atoms/icon-button.md, components/atoms/segment.md, components/atoms/tooltip.md
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
| 편집 방식 | 없음(읽기 전용) · 상시 편집(`table__cell--edit`) · 인라인 토글(`table__cell--editable`, 수정↔저장) | 없음 |
| toolbar | 없음 · 있음 | 없음 |
| 툴바 표준 액션 | 엑셀 다운로드(`icon-excel`) · 테이블 설정(`icon-settings`) | 조회·목록 테이블엔 두 아이콘 고정 |
| 도움말 버튼 | 없음 · 있음 (`icon-help`) | 없음 |
| 열고정 | 없음 · 있음 (`table__cell--sticky`) | 없음 |
| 헤더고정 | 없음 · 있음 (`table--sticky-head`) | 없음 |

---

<!-- AI:
데이터 테이블 구조 패턴:

선택(다중):
- 행 선택 동작은 initTableSelect(container)가 처리한다 — 체크박스 change 시 행에 table__row--selected + aria-selected 토글, 전체선택 일괄 토글, 부분선택 시 헤더 indeterminate. **직접 JS로 구현하지 않는다**(행 하이라이트 누락·불일치 방지). container = <table>을 감싸는 요소.
- thead th에 .table__cell--check + checkbox atom:
  <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
- tbody td에 .table__cell--check + checkbox atom (aria-label="N행 선택" 또는 행 식별 레이블)

정렬:
- thead th에 .table__head-cell--sort 추가
- th 내부에 <button class="table__sort-btn"> 배치
- 정렬 상태는 th에 aria-sort="ascending"|"descending"|"none" 토글

편집형 (editable) — 상시 편집:
- tbody td에 .table__cell--edit + 내부에 .input-wrap > .input 삽입 (셀이 항상 열려 있는 편집 상태)
- 헤더에 Badge (.badge) 추가 — 과세/비과세 구분
- tfoot에 .table__foot + 합계 행

인라인 편집 (수정 ↔ 저장 토글) — initTableCellEdit(container)가 처리:
- 기본은 읽기 상태. 셀별로 읽기값과 편집 컨트롤을 함께 담고, 수정 버튼을 누르면 그 셀만 편집으로 전환되고 버튼이 저장으로 바뀐다.
- 셀 구조:
  <td class="table__cell table__cell--editable" data-cell-edit>
    <div class="table__cell__edit-wrap">
      <span class="table__cell__view">읽기값</span>
      <div class="table__cell__editor"> ... 편집 컨트롤 ... </div>
      <button class="icon-on--sm table__cell__edit-toggle" type="button" aria-label="수정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-edit"/></svg></button>
    </div>
  </td>
- editor 안에는 .input(-wrap) · .dropdown · .dp 무엇이든 넣을 수 있다. 컨트롤러가 저장 시 컨트롤 값을 읽어 .table__cell__view에 반영한다.
- 수정 클릭 → .table__cell--editing 부여, 버튼 aria-label "저장" + 아이콘 icon-check. 저장 클릭 → 값 커밋 후 읽기 복귀(icon-edit). Enter=저장, Escape=취소.
- 셀 단위 토글이므로 각 셀이 독립적으로 편집된다. 행 전체를 한꺼번에 편집·적용해야 하면 상시 편집형(외부 적용 버튼)을 쓴다.

펼침형 (expandable):
- tbody 각 행 직후에 .table__row--sub를 형제로 배치
- 펼침 버튼: .table__cell--expand 안 <button>, 클릭 시 해당 행에 .table__row--expanded 토글
- 서브 행은 CSS adjacent sibling (.table__row--expanded + .table__row--sub)으로 표시/숨김
- 서브 행은 colgroup과 동일한 열 구조로 열별 독립 <td class="table__cell--sub">를 배치
  - 체크·펼침 열은 빈 <td class="table__cell--sub"></td>로 둠
  - info 영역: colspan으로 번호~직책 열 묶기
  - 금액 열: 각 열에 독립 td, 내부에 .table-sub-row 아이템 배치
  - 빈 열(내용 없음): <td class="table__cell--sub"></td> (빈 상태 유지, 플레이스홀더 금지)
- 펼침 버튼 아이콘: 접힌 상태 icon-chevron-down, 펼쳐진 상태 icon-collapse (accordion.md 동일 패턴)
  <span class="icon icon--sm accordion__icon--collapsed"><svg><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
  <span class="icon icon--sm accordion__icon--expanded"><svg><use href="icons/sprite.svg#icon-collapse"/></svg></span>

숫자 셀: .table__cell--number — text-align: right. 금액·수량 컬럼에만 사용. 순번·날짜·기간 등은 기본 좌측 정렬 유지.
액션 셀: .table__cell--action — 버튼/아이콘버튼 배치 전용, overflow: visible
줄바꿈 방지 열: .table__cell--fit — 날짜·코드 등 포맷 고정 열의 줄바꿈 방지(nowrap). 콘텐츠 폭으로 열을 고정하려면 table-layout:fixed + colgroup/명시 width와 함께 사용(단독으로는 열이 수축하지 않음). 상세: table-cell.md

열고정 (sticky) · 가로 스크롤:
- <table>을 .table__scroll 래퍼로 감싼다 (overflow-x:auto는 index.md CSS가 처리). 가로 스크롤이 래퍼에만 걸려 toolbar는 고정된다 — overflow를 table-container에 직접 주지 않는다.
- 고정할 th/td에 .table__cell--sticky 추가 (sticky는 .table__scroll 기준으로 고정)
- 두 번째 열 이후 고정 시 left 값을 inline style로 누적 지정 (예: style="left:120px")
- 고정 열 우측에 구분선 자동 표시 (box-shadow)

헤더고정 (sticky header) · 세로 스크롤:
- <table>에 .table--sticky-head 추가 → thead 헤더 셀이 세로 스크롤 시 상단(top:0)에 고정된다.
- 스크롤 컨테이너(.table__scroll 래퍼)에 max-height를 줘야 세로 스크롤이 생겨 헤더가 실제로 고정된다 (예: style="max-height:360px"). 높이 제한이 없으면 top:0은 동작하지 않는다.
- 헤더 셀 배경은 .table__head-cell base(surface-neutral)가 담당해 본문이 뒤로 스크롤된다. 색상 변형(--input·--caution·--total) 헤더도 자체 배경으로 그대로 고정된다.
- 열고정(.table__cell--sticky)과 함께 쓰면 헤더∩고정열 코너가 자동으로 최상단 레이어(z-index:4)에 놓여 어느 방향으로 스크롤해도 겹침이 올바르다.

하위 컴포넌트 사용 규칙 (반드시 각 컴포넌트 문서의 마크업을 따를 것):
- 체크박스: checkbox.md. label.checkbox.checkbox--sm > input[type=checkbox] + span.checkbox__control > span.checkbox__icon-check > svg 구조.
- 편집형 인풋: input.md. 테이블 셀 내 인라인 입력은 input--xs (height-tight, 24px) 사용.
  유효 크기 = 기본(클래스 없음) · input--sm · input--xs. input--md는 존재하지 않음.
- 뱃지: badge.md. style 클래스(badge--neutral 등) 필수. sm이 기본값이므로 badge--sm 불필요. md는 badge--md 명시.
- 툴바 표준 액션(고정): 조회·목록 데이터 테이블의 .table__toolbar-actions에는 엑셀 다운로드(icon-excel) → 테이블 설정(icon-settings)을 이 순서로 항상 둔다. 둘 다 button.icon-on--lg > svg (btn--* 컴포넌트 아님). aria-label은 각각 "엑셀 다운로드"·"테이블 설정". 인쇄(icon-print) 등 추가 액션이 있으면 이 둘 왼쪽에 붙여 표준 쌍 위치를 유지한다.
  - tooltip 필수: 아이콘만으로는 기능을 알 수 없으므로 각 버튼은 hover·focus 시 기능명 tooltip을 띄운다. button을 span.tooltip-wrapper로 감싸고(자체 스타일 icon-on--lg이므로 .tooltip-trigger 미사용) aria-describedby로 div.tooltip-panel.elevation-tooltip.tooltip-panel--left(role="tooltip", id 연결)를 잇는다. 툴팁 텍스트 = aria-label과 동일한 기능명.
  - 방향은 tooltip-panel--left 고정: table-container가 overflow:hidden이라 --top·--bottom 툴팁은 컨테이너에 잘린다. 좌측(툴바 내부 방향)으로 띄워 잘림을 피한다.
  - hover/focus 토글은 인라인 onmouseenter/onmouseleave/onfocus/onblur 핸들러로 처리한다(tooltip.md 패턴, 별도 JS 불필요).
- 도움말 버튼: btn btn--primary btn--solid btn--micro btn--icon-only > span.icon.icon--badge > svg icon-help.
- 셀 내 텍스트 액션 버튼(상세보기·미리보기 등): button.md btn--secondary btn--solid btn--xs.
- 셀 내 아이콘 단독 액션(수정·삭제·보기 등): 플레인 button.icon-on--sm > svg + aria-label, .table__cell--action 안에 둔다. **ActionGroup(테두리 박스)으로 묶지 않는다** — 행마다 반복되면 시각적으로 무겁다. 펼침 chevron의 icon-on--sm과 동일 계열.
  예: `<td class="table__cell table__cell--action"><button class="icon-on--sm" aria-label="수정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-edit"/></svg></button><button class="icon-on--sm" aria-label="삭제"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></button></td>`
-->

---

## 사용 지침

**툴바 표준 액션 (조회·목록 테이블)** — 조회·목록 성격의 데이터 테이블에는 툴바 우측(`table__toolbar-actions`)에 **엑셀 다운로드**(`icon-excel`) → **테이블 설정**(`icon-settings`) 아이콘을 이 순서로 **고정** 배치한다. 둘 다 `button.icon-on--lg`이며 `aria-label`은 각각 `"엑셀 다운로드"`·`"테이블 설정"`이다.

- 데이터 테이블의 표준 액션이므로 기본 포함한다 (export·열 설정은 업무 테이블의 공통 요구).
- **각 아이콘에 tooltip 필수** — 아이콘만으로는 기능 식별이 안 되므로 hover·focus 시 기능명을 보여준다. `tooltip-wrapper` + `aria-describedby` → `tooltip-panel`(tooltip.md 패턴). 텍스트는 `aria-label`과 같은 기능명.
- tooltip 방향은 `tooltip-panel--left`로 고정한다. `table-container`가 `overflow: hidden`이라 위/아래 tooltip은 잘리므로, 툴바 내부(왼쪽)로 띄워 잘림을 막는다.
- 인쇄(`icon-print`) 등 추가 액션이 필요하면 두 표준 아이콘의 **왼쪽**에 붙여 표준 쌍의 위치를 유지한다.
- 읽기 전용 정보 테이블(`info.md`)에는 적용하지 않는다.

**행 내 액션 버튼** — 행마다 두는 수정·삭제 같은 **아이콘 단독 액션**은 플레인 `icon-on--sm`(테두리 없음)으로 `table__cell--action`에 둔다. ActionGroup(브랜드 테두리 박스)으로 묶지 않는다 — 행마다 박스가 반복돼 시각적으로 무겁다. `승인`·`반려`처럼 **묶음 텍스트 퀵 액션**일 때만 ActionGroup을 쓴다(→ `action-group.md`). 텍스트 단일 액션(상세보기 등)은 `btn--secondary btn--solid btn--xs`.

:::preview
<div class="pattern-explorer">

  <div id="pattern-segment" class="segment" role="radiogroup" aria-label="패턴 탐색">
    <span class="segment__slider" aria-hidden="true"></span>
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-target="with-toolbar">Toolbar (기본)</button>
    <button class="segment__item" role="radio" aria-checked="false" data-target="editable">편집형</button>
    <button class="segment__item" role="radio" aria-checked="false" data-target="expandable">펼침형</button>
    <button class="segment__item" role="radio" aria-checked="false" data-target="sticky-col">열고정</button>
  </div>

  <div class="pattern-explorer__panel">
    <div>

      <div data-panel="with-toolbar" data-component class="table-container">
        <div class="table__toolbar">
          <div class="table__title-group">
            <span class="table__count" aria-live="polite">총 <b class="table__count-value">3</b>건</span>
            <div class="table__title" id="tbl-title-preview">근로자 검색 <button class="btn btn--primary btn--solid btn--micro btn--icon-only" type="button" aria-label="도움말" onclick="window.open('/guide/...')"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span></button></div>
          </div>
          <div class="table__toolbar-actions">
            <span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
              <button class="icon-on--lg" aria-label="엑셀 다운로드" aria-describedby="tip-tbl-excel" onfocus="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onblur="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-excel"/></svg></button>
              <div class="tooltip-panel elevation-tooltip tooltip-panel--left" id="tip-tbl-excel" role="tooltip">엑셀 다운로드</div>
            </span>
            <span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
              <button class="icon-on--lg" aria-label="테이블 설정" aria-describedby="tip-tbl-settings" onfocus="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onblur="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-settings"/></svg></button>
              <div class="tooltip-panel elevation-tooltip tooltip-panel--left" id="tip-tbl-settings" role="tooltip">테이블 설정</div>
            </span>
          </div>
        </div>
        <table class="table table--dense" aria-labelledby="tbl-title-preview">
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
              <th class="table__head-cell table__cell--fit" scope="col">입사일</th>
              <th class="table__head-cell table__cell--fit" scope="col">근무기간</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr class="table__row table__row--selected" aria-selected="true">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" checked aria-label="홍길동 선택됨"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell">홍길동</td><td class="table__cell">팀장</td><td class="table__cell">수석 연구원</td><td class="table__cell table__cell--fit">1991.02.28</td><td class="table__cell table__cell--fit">50년 12개월 99일</td>
            </tr>
            <tr class="table__row">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="김철수 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell">김철수</td><td class="table__cell">팀원</td><td class="table__cell">수석 연구원</td><td class="table__cell table__cell--fit">1991.02.28</td><td class="table__cell table__cell--fit">50년 12개월 99일</td>
            </tr>
            <tr class="table__row">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="이영희 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell">이영희</td><td class="table__cell">팀원</td><td class="table__cell">연구원</td><td class="table__cell table__cell--fit">1991.02.28</td><td class="table__cell table__cell--fit">50년 12개월 99일</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 편집형 -->
      <div data-panel="editable" data-component class="table-container" style="display:none;overflow-x:auto">
        <table class="table table--dense" aria-label="편집 가능 급여 테이블" style="table-layout:fixed;width:100%;min-width:640px">
          <thead class="table__head">
            <tr>
              <th class="table__head-cell" scope="col" style="width:40px">번호</th>
              <th class="table__head-cell" scope="col" style="width:10%">부서</th>
              <th class="table__head-cell" scope="col" style="width:10%">이름</th>
              <th class="table__head-cell table__head-cell--input table__cell--number" scope="col" style="width:18%">기본급 <span class="badge badge--neutral badge--sm">비과세</span></th>
              <th class="table__head-cell table__head-cell--input table__cell--number" scope="col" style="width:18%">식대 <span class="badge badge--neutral badge--sm">비과세</span></th>
              <th class="table__head-cell table__head-cell--input table__cell--number" scope="col" style="width:18%">직책수당 <span class="badge badge--caution badge--sm">과세</span></th>
              <th class="table__head-cell table__head-cell--total table__cell--number" scope="col" style="width:18%">고정급여 합계</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr class="table__row">
              <td class="table__cell">1</td><td class="table__cell">OO팀</td><td class="table__cell">홍길동</td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="3,000,000" aria-label="기본급 홍길동"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="100,000" aria-label="식대 홍길동"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="300,000" aria-label="직책수당 홍길동"></div></td>
              <td class="table__cell table__cell--number">3,400,000</td>
            </tr>
            <tr class="table__row">
              <td class="table__cell">2</td><td class="table__cell">OO팀</td><td class="table__cell">김철수</td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="3,000,000" aria-label="기본급 2행"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="100,000" aria-label="식대 2행"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="직책수당 2행"></div></td>
              <td class="table__cell table__cell--number">3,100,000</td>
            </tr>
            <tr class="table__row">
              <td class="table__cell">3</td><td class="table__cell">OO팀</td><td class="table__cell">이영희</td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="2,000,000" aria-label="기본급 3행"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="식대 3행"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="100,000" aria-label="직책수당 3행"></div></td>
              <td class="table__cell table__cell--number">2,100,000</td>
            </tr>
          </tbody>
          <tfoot class="table__foot">
            <tr class="table__row">
              <td class="table__cell" colspan="3">총합 3명</td>
              <td class="table__cell table__cell--number">8,000,000</td>
              <td class="table__cell table__cell--number">200,000</td>
              <td class="table__cell table__cell--number">400,000</td>
              <td class="table__cell table__cell--number">8,600,000</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- 펼침형 -->
      <div data-panel="expandable" data-component class="table-container" style="display:none;overflow-x:auto">
        <table class="table table--dense" aria-label="펼침형 급여 명세 테이블" style="table-layout:fixed;min-width:1060px">
          <colgroup>
            <col style="width:40px"><!-- check -->
            <col style="width:40px"><!-- expand -->
            <col style="width:48px"><!-- 번호 -->
            <col style="width:80px"><!-- 부서 -->
            <col style="width:80px"><!-- 이름 -->
            <col style="width:64px"><!-- 직책 -->
            <col style="width:160px"><!-- 고정급여 -->
            <col style="width:160px"><!-- 변동급여 -->
            <col style="width:160px"><!-- 공제금액 -->
            <col style="width:112px"><!-- 실지급액 -->
            <col style="width:116px"><!-- 전송상태 -->
          </colgroup>
          <thead class="table__head">
            <tr>
              <th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
              <th class="table__cell table__cell--expand" scope="col"></th>
              <th class="table__head-cell" scope="col">번호</th>
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
            <tr class="table__row table__row--expanded" id="exp-row-1">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="1행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell table__cell--expand"><button class="icon-on--sm" aria-expanded="true" aria-controls="sub-row-1" aria-label="행 접기"><span class="icon icon--sm accordion__icon--collapsed" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span><span class="icon icon--sm accordion__icon--expanded" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span></button></td>
              <td class="table__cell">1</td><td class="table__cell">OO팀</td><td class="table__cell">홍길동</td><td class="table__cell">대리</td>
              <td class="table__cell table__cell--number">2,000,000</td><td class="table__cell table__cell--number">0</td><td class="table__cell table__cell--number">60,000</td><td class="table__cell table__cell--number">1,940,000</td>
              <td class="table__cell"><button class="btn btn--secondary btn--solid btn--xs" type="button">미리보기</button></td>
            </tr>
            <tr class="table__row--sub" id="sub-row-1">
              <td class="table__cell--sub"></td>
              <td class="table__cell--sub"></td>
              <td class="table__cell--sub" colspan="4">
                <div class="table-sub-info">
                  <div><span class="table-sub-info__label">급여유형</span> 본사_정규직</div>
                  <div><span class="table-sub-info__label">급여계좌</span> 네모투자증권 XXX-BBBBB-YY-ZZC 홍길동</div>
                </div>
              </td>
              <td class="table__cell--sub">
                <div class="table-sub-row"><span class="badge badge--neutral badge--sm">비과세</span> 기본급 <span class="table-sub-row__amount">1,800,000</span></div>
                <div class="table-sub-row"><span class="badge badge--neutral badge--sm">비과세</span> 식대 <span class="table-sub-row__amount">200,000</span></div>
              </td>
              <td class="table__cell--sub"></td>
              <td class="table__cell--sub">
                <div class="table-sub-row">소득세 <span class="table-sub-row__amount">10,000</span></div>
                <div class="table-sub-row">건강보험 <span class="table-sub-row__amount">25,000</span></div>
                <div class="table-sub-row">국민연금 <span class="table-sub-row__amount">25,000</span></div>
              </td>
              <td class="table__cell--sub" colspan="2"></td>
            </tr>
            <tr class="table__row" id="exp-row-2">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="2행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell table__cell--expand"><button class="icon-on--sm" aria-expanded="false" aria-controls="sub-row-2" aria-label="행 펼치기"><span class="icon icon--sm accordion__icon--collapsed" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span><span class="icon icon--sm accordion__icon--expanded" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span></button></td>
              <td class="table__cell">2</td><td class="table__cell">OO팀</td><td class="table__cell">김철수</td><td class="table__cell">대리</td>
              <td class="table__cell table__cell--number">2,000,000</td><td class="table__cell table__cell--number">2,000,000</td><td class="table__cell table__cell--number">100,000</td><td class="table__cell table__cell--number">3,900,000</td>
              <td class="table__cell"><button class="btn btn--secondary btn--solid btn--xs" type="button">미리보기</button></td>
            </tr>
            <tr class="table__row--sub" id="sub-row-2">
              <td class="table__cell--sub"></td>
              <td class="table__cell--sub"></td>
              <td class="table__cell--sub" colspan="4">
                <div class="table-sub-info">
                  <div><span class="table-sub-info__label">급여유형</span> 본사_정규직</div>
                  <div><span class="table-sub-info__label">급여계좌</span> 네모투자증권 XXX-BBBBB-YY-ZZC 김철수</div>
                </div>
              </td>
              <td class="table__cell--sub">
                <div class="table-sub-row"><span class="badge badge--neutral badge--sm">비과세</span> 기본급 <span class="table-sub-row__amount">1,800,000</span></div>
                <div class="table-sub-row"><span class="badge badge--caution badge--sm">과세</span> 성과급 <span class="table-sub-row__amount">200,000</span></div>
              </td>
              <td class="table__cell--sub">
                <div class="table-sub-row">야간수당 <span class="table-sub-row__amount">1,000,000</span></div>
                <div class="table-sub-row">성과급 <span class="table-sub-row__amount">1,000,000</span></div>
              </td>
              <td class="table__cell--sub">
                <div class="table-sub-row">소득세 <span class="table-sub-row__amount">20,000</span></div>
                <div class="table-sub-row">건강보험 <span class="table-sub-row__amount">50,000</span></div>
                <div class="table-sub-row">국민연금 <span class="table-sub-row__amount">30,000</span></div>
              </td>
              <td class="table__cell--sub" colspan="2"></td>
            </tr>
          </tbody>
          <tfoot class="table__foot">
            <tr class="table__row">
              <td class="table__cell table__cell--check"></td><td class="table__cell table__cell--expand"></td>
              <td class="table__cell" colspan="4">총합 2명</td>
              <td class="table__cell table__cell--number">4,000,000</td><td class="table__cell table__cell--number">2,000,000</td><td class="table__cell table__cell--number">160,000</td><td class="table__cell table__cell--number">5,840,000</td>
              <td class="table__cell"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- 열고정 -->
      <div data-panel="sticky-col" data-component class="table-container" style="display:none">
        <div class="table__toolbar">
          <div class="table__title-group">
            <span class="table__count" aria-live="polite">총 <b class="table__count-value">3</b>건</span>
            <div class="table__title">급여 명세</div>
          </div>
          <div class="table__toolbar-actions">
            <span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
              <button class="icon-on--lg" aria-label="엑셀 다운로드" aria-describedby="tip-sticky-excel" onfocus="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onblur="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-excel"/></svg></button>
              <div class="tooltip-panel elevation-tooltip tooltip-panel--left" id="tip-sticky-excel" role="tooltip">엑셀 다운로드</div>
            </span>
            <span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
              <button class="icon-on--lg" aria-label="테이블 설정" aria-describedby="tip-sticky-settings" onfocus="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onblur="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-settings"/></svg></button>
              <div class="tooltip-panel elevation-tooltip tooltip-panel--left" id="tip-sticky-settings" role="tooltip">테이블 설정</div>
            </span>
          </div>
        </div>
        <div class="table__scroll">
        <table class="table table--dense" aria-label="열고정 급여 테이블" style="table-layout:fixed;min-width:762px">
          <colgroup>
            <col style="width:80px">
            <col style="width:60px">
            <col style="width:60px">
            <col style="width:112px">
            <col style="width:112px">
            <col style="width:112px">
            <col style="width:112px">
            <col style="width:112px">
            <col style="width:112px">
          </colgroup>
          <thead class="table__head">
            <tr>
              <th class="table__head-cell table__cell--sticky" scope="col" style="left:0">이름</th>
              <th class="table__head-cell table__cell--sticky" scope="col" style="left:80px">부서</th>
              <th class="table__head-cell table__cell--sticky table__cell--sticky--last" scope="col" style="left:140px">직책</th>
              <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">기본급</th>
              <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">식대</th>
              <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">직책수당</th>
              <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">야간수당</th>
              <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">성과급</th>
              <th class="table__head-cell table__head-cell--total table__cell--number" scope="col">실지급액</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr class="table__row">
              <td class="table__cell table__cell--sticky" style="left:0">홍길동</td>
              <td class="table__cell table__cell--sticky" style="left:80px">OO팀</td>
              <td class="table__cell table__cell--sticky table__cell--sticky--last" style="left:140px">팀장</td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="3,000,000" aria-label="기본급 홍길동"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="100,000" aria-label="식대 홍길동"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="300,000" aria-label="직책수당 홍길동"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="야간수당 홍길동"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="성과급 홍길동"></div></td>
              <td class="table__cell table__cell--number">3,400,000</td>
            </tr>
            <tr class="table__row">
              <td class="table__cell table__cell--sticky" style="left:0">김철수</td>
              <td class="table__cell table__cell--sticky" style="left:80px">OO팀</td>
              <td class="table__cell table__cell--sticky table__cell--sticky--last" style="left:140px">팀원</td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="2,500,000" aria-label="기본급 김철수"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="100,000" aria-label="식대 김철수"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="직책수당 김철수"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="200,000" aria-label="야간수당 김철수"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="성과급 김철수"></div></td>
              <td class="table__cell table__cell--number">2,800,000</td>
            </tr>
            <tr class="table__row">
              <td class="table__cell table__cell--sticky" style="left:0">이영희</td>
              <td class="table__cell table__cell--sticky" style="left:80px">OO팀</td>
              <td class="table__cell table__cell--sticky table__cell--sticky--last" style="left:140px">팀원</td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="2,000,000" aria-label="기본급 이영희"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="식대 이영희"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="직책수당 이영희"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="야간수당 이영희"></div></td>
              <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="500,000" aria-label="성과급 이영희"></div></td>
              <td class="table__cell table__cell--number">2,500,000</td>
            </tr>
          </tbody>
          <tfoot class="table__foot">
            <tr class="table__row">
              <td class="table__cell table__cell--sticky" style="left:0">합계</td>
              <td class="table__cell table__cell--sticky" style="left:80px"></td>
              <td class="table__cell table__cell--sticky table__cell--sticky--last" style="left:140px"></td>
              <td class="table__cell table__cell--number">7,500,000</td>
              <td class="table__cell table__cell--number">200,000</td>
              <td class="table__cell table__cell--number">300,000</td>
              <td class="table__cell table__cell--number">200,000</td>
              <td class="table__cell table__cell--number">500,000</td>
              <td class="table__cell table__cell--number">8,700,000</td>
            </tr>
          </tfoot>
        </table>
        </div>
      </div>

    </div>
  </div>
</div>
<script>
(function() {
  /* 선택·슬라이더·패널 전환은 initSegment(data-target/data-panel)가 처리 */
  initSegment(stage);

  /* 코드 블록을 활성 패널과 동기화 — build.py가 IIFE 이후 코드 블록을 생성하므로 setTimeout 필요 */
  var panels = Array.from(stage.querySelectorAll('[data-panel]'));
  var codeItems = [];
  setTimeout(function() {
    var codeList = stage.parentNode.querySelector('.component-code-list');
    if (!codeList) return;
    codeItems = Array.from(codeList.querySelectorAll('.component-code-item'));
    panels.forEach(function(p, i) {
      if (codeItems[i]) codeItems[i].style.display = p.style.display;
    });
  }, 0);

  stage.querySelector('#pattern-segment').querySelectorAll('.segment__item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var key = btn.getAttribute('data-target');
      panels.forEach(function(p, i) {
        if (codeItems[i]) codeItems[i].style.display = p.getAttribute('data-panel') === key ? '' : 'none';
      });
    });
  });

  /* 행 선택 — table-cell.md initTableSelect 위임 (행 하이라이트·전체선택·indeterminate) */
  initTableSelect(stage);

  /* 정렬 — table-cell.md initTableSort 위임 (아이콘·tooltip·다중 정렬·undo 포함) */
  initTableSort(stage);

  /* 편집 셀 초기값 complete 상태 적용 */
  stage.querySelectorAll('.table__cell--edit .input').forEach(function(input) {
    if (input.value) input.classList.add('input--complete');
    input.addEventListener('blur', function() {
      input.classList.toggle('input--complete', !!input.value);
    });
    input.addEventListener('input', function() {
      if (!input.value) input.classList.remove('input--complete');
    });
  });

  /* 펼침 버튼 — table__row--expanded 토글 */
  stage.querySelectorAll('.table__cell--expand button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var row = this.closest('tr');
      if (!row) return;
      var expanded = row.classList.toggle('table__row--expanded');
      this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      this.setAttribute('aria-label', expanded ? '행 접기' : '행 펼치기');
    });
  });

  var pe = stage.querySelector('.pattern-explorer');
  if (pe) pe.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:var(--space-gap-sm);width:100%';
  var panel = stage.querySelector('.pattern-explorer__panel');
  if (panel) panel.style.cssText = 'width:100%;min-width:0';
  stage.querySelector('#pattern-segment').style.cssText = 'width:max-content';
})();
</script>
:::

### 편집형 제약

- `table-layout: fixed` + `colgroup`(또는 `th` 인라인 `style="width:..."`)으로 열 너비를 명시한다. 금액 열은 최소 160px 권장.
- 편집 가능 셀의 합계는 JS로 실시간 계산해 `tfoot` 셀에 반영한다.
- 헤더 Badge는 `badge--neutral`(비과세)·`badge--caution`(과세)를 사용한다. 크기는 `badge--sm`(기본)만 허용한다.
- `tfoot`의 합계 행은 편집 셀 없이 숫자만 표시한다. 합계 셀은 `table__cell--number`를 유지한다.

### 편집 방식 선택 기준

| 방식 | 클래스 | 사용 상황 |
|------|--------|----------|
| 상시 편집 | `table__cell--edit` | 급여·전표처럼 **행 전체를 한 번에 입력·검토**하고 외부 버튼(저장/적용)이나 `tfoot` 합계로 확정하는 대량 입력 화면. 셀이 항상 열려 있다. |
| 인라인 토글 | `table__cell--editable` + `data-cell-edit` | 조회 중심 화면에서 **특정 셀만 즉시 고쳐 저장**해야 할 때. 평소엔 읽기 상태로 밀도를 유지하고, 수정 버튼을 누른 셀만 편집으로 전환된다. |

- 인라인 토글은 **셀 단위**다. 각 셀이 자기 수정↔저장 버튼을 갖고 독립적으로 전환된다. 한 행의 여러 값을 동시에 편집·적용해야 하면 상시 편집형을 쓴다.
- 저장 버튼 아이콘은 `icon-check`(체크)를 사용한다 — 수정(`icon-edit`) ↔ 저장(`icon-check`) 토글.
- **편집 가능 열의 헤더셀은 편집형과 동일하게 `table__head-cell--input`(검정)을 사용**해, 편집 방식(상시·인라인 토글)과 무관하게 "이 열은 편집 가능"을 일관되게 나타낸다. 인라인 토글에서는 total 열 없이도 이 헤더를 쓸 수 있다.
- 동작은 `initTableCellEdit(container)`에 위임한다. 프로토타입에서 토글·값 반영 로직을 직접 구현하지 않는다.
- editor에는 `.input`·`.dropdown`·`.dp` 무엇이든 담을 수 있다. 아래 데모는 텍스트 입력 editor로 셀 단위 전환을 보여준다.

:::preview
<div data-component class="table-container" style="width:420px">
  <table class="table" aria-label="셀 인라인 편집 데모" style="table-layout:fixed;width:100%">
    <thead class="table__head"><tr>
      <th class="table__head-cell table__head-cell--input" scope="col">이름</th>
      <th class="table__head-cell table__head-cell--input" scope="col">직위</th>
    </tr></thead>
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__cell table__cell--editable" data-cell-edit>
          <div class="table__cell__edit-wrap">
            <span class="table__cell__view">홍길동</span>
            <div class="table__cell__editor"><div class="input-wrap"><input class="input input--xs" type="text" value="홍길동" aria-label="이름 입력"></div></div>
            <button class="icon-on--sm table__cell__edit-toggle" type="button" aria-label="수정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-edit"/></svg></button>
          </div>
        </td>
        <td class="table__cell table__cell--editable" data-cell-edit>
          <div class="table__cell__edit-wrap">
            <span class="table__cell__view">과장</span>
            <div class="table__cell__editor"><div class="input-wrap"><input class="input input--xs" type="text" value="과장" aria-label="직위 입력"></div></div>
            <button class="icon-on--sm table__cell__edit-toggle" type="button" aria-label="수정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-edit"/></svg></button>
          </div>
        </td>
      </tr>
      <tr class="table__row">
        <td class="table__cell table__cell--editable" data-cell-edit>
          <div class="table__cell__edit-wrap">
            <span class="table__cell__view">김영희</span>
            <div class="table__cell__editor"><div class="input-wrap"><input class="input input--xs" type="text" value="김영희" aria-label="이름 입력"></div></div>
            <button class="icon-on--sm table__cell__edit-toggle" type="button" aria-label="수정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-edit"/></svg></button>
          </div>
        </td>
        <td class="table__cell table__cell--editable" data-cell-edit>
          <div class="table__cell__edit-wrap">
            <span class="table__cell__view">대리</span>
            <div class="table__cell__editor"><div class="input-wrap"><input class="input input--xs" type="text" value="대리" aria-label="직위 입력"></div></div>
            <button class="icon-on--sm table__cell__edit-toggle" type="button" aria-label="수정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-edit"/></svg></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<script>
  initTableCellEdit(stage);
</script>
:::

### 펼침형 제약

- `.table__row--sub`는 반드시 대응하는 `.table__row` 바로 다음 형제로 배치한다. CSS adjacent sibling(`+`)으로 표시/숨김을 제어한다.
- 서브 행은 `colgroup`과 동일한 열 구조를 따른다. 체크·펼침 열은 빈 `<td class="table__cell--sub">`로 두고, 내용이 있는 열에만 `.table-sub-row` 아이템을 배치한다.
- `table-layout: fixed` + `colgroup`으로 금액 열 너비를 고정해야 서브 행 내용과 헤더 열이 정렬된다. 금액 열은 최소 160px 권장.
- 펼침 버튼 아이콘: 접힌 상태 `icon-chevron-down`, 펼쳐진 상태 `icon-collapse`. 두 아이콘을 모두 마크업하고 `.table__row--expanded` 클래스로 표시/숨김을 CSS 제어한다.

### 열고정 제약

- `<table>`을 `.table__scroll` 래퍼로 감싸 가로 스크롤을 활성화한다(`overflow-x`는 컴포넌트 CSS가 처리). 스크롤이 표 영역에만 걸려 `table__toolbar`는 고정된다 — `.table-container`에 직접 `overflow`를 주면 toolbar까지 스크롤되므로 금지.
- 고정할 모든 `th`·`td`에 `.table__cell--sticky`를 추가한다. 두 번째 이후 고정 열은 `style="left: Npx"`로 누적 너비를 직접 지정한다.
- 고정 열의 배경은 행 컨텍스트에 맞게 명시한다: 헤더는 `--color-surface-neutral`, 바디는 `--color-surface-base`, tfoot은 `--color-surface-neutral`.
- 선택된 행(`table__row--selected`)의 고정 셀 배경은 `--color-action-neutral-selected`로 재정의한다.

---

## CSS

```css
/* sort, head check-border → table-cell.md 정의 참조 */

/* ── Number / Edit cells — 숫자·입력 열 공통 최솟값 ── */
.table__cell--number,
.table__cell--edit {
  min-width: 112px;
}

.table__cell--number {
  text-align: right;
}

/* ── Edit cell ── */
/* padding·vertical-align·box-sizing·border-bottom → table-cell.md 공통 규칙 상속 */

.table__cell--edit .input {
  width: 100%;
  text-align: right;
}

/* ── Action / Expand cells ── */
.table__cell--action {
  white-space: nowrap; /* 버튼 여러 개도 한 줄 유지 — 고정 width 없이 콘텐츠에 맞게 확장 */
  text-align: left;
  overflow: visible;
}

/* check 열과 동일 조건 — 아이콘 버튼 하나만 들어가는 고정 폭 열 */
.table__cell--expand {
  width: calc(var(--icon-sm) + var(--space-inset-md) * 2);
  text-align: center;
  padding: 0;
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
/* 테이블 내 badge는 sm 전용 — badge--md를 sm 크기로 강제 재정의 */
.table-container .badge--md { font-size: var(--font-size-label); }
.table__head-cell .badge {
  vertical-align: middle;
  margin-left: var(--space-gap-xs);
}

/* ── Expandable 아이콘 토글 (accordion.md 동일 패턴) ── */
.table__body .accordion__icon--expanded { display: none; }
.table__body .accordion__icon--collapsed { display: inline-flex; }
.table__row--expanded .accordion__icon--expanded { display: inline-flex; }
.table__row--expanded .accordion__icon--collapsed { display: none; }

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
  vertical-align: top;
}

.table__cell--sub + .table__cell--sub:not(:empty) {
  border-left: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
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

.table-sub-row {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-body);
  margin-bottom: var(--space-generic-xs);
}

.table-sub-row__amount {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
}

/* ── Sticky column ── */
.table__cell--sticky {
  position: sticky;
  left: 0;
  z-index: 1;
  /* 스크롤 중 내용 비침 방지 — 행 컨텍스트별 배경을 명시해야 함 */
}

.table__cell--sticky--last {
  /* inset box-shadow으로 구분선 구현 — border는 sticky 스크롤 시 함께 움직이지 않으므로 box-shadow 사용 */
  box-shadow: inset calc(-1 * var(--stroke-sm)) 0 0 var(--color-border-subtle);
}

.table__head .table__cell--sticky {
  background: var(--color-surface-neutral);
  z-index: 2; /* 바디 고정 셀(z-index:1)보다 위 — 세로 스크롤 시 헤더가 바디 고정 열 위에 덮여야 함 */
}

.table__body .table__cell--sticky {
  background: var(--color-surface-base);
}

.table__body .table__row--selected .table__cell--sticky {
  background: var(--color-action-neutral-selected);
}

.table__foot .table__cell--sticky {
  background: var(--color-surface-neutral);
}

/* ── Sticky header (opt-in: .table--sticky-head) ── */
/* 세로 스크롤 시 헤더 행을 상단에 고정. 스크롤 컨테이너(.table__scroll 또는 인라인 max-height를 준 래퍼)에
   높이 제한이 있어야 세로 스크롤이 생겨 실제로 고정된다 — 높이 제한이 없으면 top:0은 no-op.
   헤더 셀 배경은 table-cell.md의 .table__head-cell base(surface-neutral)가 담당한다. */
.table--sticky-head .table__head-cell {
  position: sticky;
  top: 0;
  z-index: 3; /* 바디 일반 셀(auto)·바디 고정열(z-index:1) 위로 덮음 */
}
/* 헤더 ∩ 고정열 교차 코너 — 고정 헤더(3)·고정열(1) 모두 위. 세로·가로 어느 쪽으로 스크롤해도 코너가 최상단 */
.table--sticky-head .table__head .table__cell--sticky {
  z-index: 4;
}

/* ── 인라인 편집 셀 (수정 ↔ 저장 토글) ──
   기본은 읽기 상태: 값(.table__cell__view)만 보이고 편집 컨트롤(.table__cell__editor)은 숨김.
   .table__cell--editing 이면 편집 컨트롤이 보이고 값은 숨긴다. 토글 버튼은 셀 우측에 고정. */
.table__cell__edit-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
  justify-content: space-between;
}
.table__cell__view { flex: 1 1 auto; min-width: 0; }
.table__cell__editor { flex: 1 1 auto; min-width: 0; display: none; }
.table__cell--editing .table__cell__view { display: none; }
.table__cell--editing .table__cell__editor { display: block; }
/* 토글 버튼은 기본 숨김(공간은 유지) — 행 hover·셀 포커스·편집 중일 때만 노출해 읽기 화면을 깔끔하게 유지 */
.table__cell__edit-toggle { flex: 0 0 auto; opacity: 0; transition: opacity var(--duration-fast) var(--easing-base); }
.table__body .table__row:hover .table__cell__edit-toggle,
.table__cell--editable:focus-within .table__cell__edit-toggle,
.table__cell--editing .table__cell__edit-toggle { opacity: 1; }
/* 편집 중(저장 대기)에는 토글이 저장(체크) 아이콘 — 브랜드 색으로 강조 */
.table__cell--editing .table__cell__edit-toggle { color: var(--color-text-brand-vivid); }
```

---

## 접근성

| 상황 | 마크업 |
|------|--------|
| 정렬 상태 | 정렬 중인 `<th>`에 `aria-sort="ascending"` 또는 `aria-sort="descending"`, 미정렬은 `aria-sort="none"` |
| 정렬 버튼 키보드 | `Enter`·`Space`로 정렬 상태 순환. `<button class="table__sort-btn">`이므로 기본 키보드 동작 자동 적용 |
| 전체 선택 체크박스 | `<input type="checkbox" aria-label="전체 선택">` |
| 행 선택 체크박스 | `<input type="checkbox" aria-label="N행 선택">` 또는 행 식별 가능한 레이블 |
| 펼침 버튼 | `aria-expanded="true/false"`, `aria-controls="[sub-row id]"`, 상태에 따른 `aria-label` |
| 편집 셀 | `<input aria-label="[컬럼명] [행 식별]">` |
| 인라인 편집 토글 | 수정 버튼 `aria-label="수정"` → 편집 진입 시 `"저장"`으로 갱신. 편집 컨트롤에는 `aria-label` 유지 |
| 선택된 행 | 행에 `aria-selected="true"` 추가 (role="row" 컨텍스트) |
| 열고정 | 고정 열에 별도 aria 속성 불필요. 스크롤 가능 영역임을 안내할 경우 컨테이너에 `aria-label` 또는 설명 추가 |

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

### JS — 셀 인라인 편집 (수정 ↔ 저장 토글)

`initTableCellEdit(container)`가 처리한다. `container`는 `[data-cell-edit]` 셀을 감싸는 요소(테이블·모달 등)이며, 내부의 모든 인라인 편집 셀에 토글 동작을 붙인다. 프로토타입에서 직접 구현하지 않는다.

```js init
function initTableCellEdit(container) {
  container.querySelectorAll('[data-cell-edit]').forEach(function (cell) {
    if (cell.dataset.initCellEdit) return;
    cell.dataset.initCellEdit = '1';
    var toggle = cell.querySelector('.table__cell__edit-toggle');
    var view   = cell.querySelector('.table__cell__view');
    var editor = cell.querySelector('.table__cell__editor');
    if (!toggle || !view || !editor) return;
    var useEl = toggle.querySelector('use');

    function setIcon(name) { if (useEl) useEl.setAttribute('href', '#' + name); }
    function control() { return editor.querySelector('.input, .dropdown, .dp'); }
    function readValue() {
      var el = control();
      if (!el) return view.textContent;
      if (el.classList.contains('input')) return el.value;
      if (el.classList.contains('dropdown')) {
        var v = el.querySelector('.dropdown__value');
        return v && !v.classList.contains('dropdown__value--placeholder') ? v.textContent.trim() : '';
      }
      if (el.classList.contains('dp')) {
        var p = el.querySelectorAll('.dp__value-part');
        return p.length === 3 && p[0].value ? (p[0].value + '.' + p[1].value + '.' + p[2].value) : '';
      }
      return view.textContent;
    }
    function focusControl() {
      var el = control(); if (!el) return;
      var f = el.classList.contains('input') ? el : el.querySelector('input, button, .dropdown__trigger, .dp__trigger');
      if (f && f.focus) f.focus();
    }
    function enter() { cell.classList.add('table__cell--editing'); toggle.setAttribute('aria-label', '저장'); setIcon('icon-check'); focusControl(); }
    function save()  { var val = readValue(); view.textContent = val === '' ? '—' : val; cell.classList.remove('table__cell--editing'); toggle.setAttribute('aria-label', '수정'); setIcon('icon-edit'); }
    function cancel(){ cell.classList.remove('table__cell--editing'); toggle.setAttribute('aria-label', '수정'); setIcon('icon-edit'); }

    toggle.addEventListener('click', function () {
      if (cell.classList.contains('table__cell--editing')) save(); else enter();
    });
    cell.addEventListener('keydown', function (e) {
      if (!cell.classList.contains('table__cell--editing')) return;
      /* 드롭다운·데이트피커 패널이 열린 Enter는 옵션·날짜 선택용이므로 저장하지 않는다 */
      if (e.key === 'Enter' && !e.target.closest('.dropdown__panel, .dp__panel')) { e.preventDefault(); save(); }
      else if (e.key === 'Escape') { e.preventDefault(); cancel(); }
    });
  });
}
if (!window.__componentInits.initTableCellEdit) window.__componentInits.initTableCellEdit = initTableCellEdit;
```

---

## Do / Don't

| Do | Don't |
|----|-------|
| 조회·목록 테이블 툴바에 엑셀 다운로드·테이블 설정 아이콘을 이 순서로 고정 | 표준 두 아이콘을 누락하거나, 텍스트 버튼·우측 외 위치로 대체 |
| 두 표준 아이콘은 `icon-on--lg`로 통일 | `btn--*` 텍스트 버튼이나 다른 크기 아이콘버튼으로 혼용 |
| 툴바 아이콘 버튼에 기능명 tooltip(hover·focus) 부착 | `aria-label`만 두고 시각적 tooltip 생략 — 마우스 사용자가 기능을 모름 |
| 툴바 tooltip은 `tooltip-panel--left` | `--top`·`--bottom` 사용 → `overflow:hidden` 컨테이너에 잘림 |
| 행 내 아이콘 액션(수정·삭제)은 플레인 `icon-on--sm` | 행 아이콘 액션을 `action-group`(테두리 박스)으로 묶기 — 행마다 박스 반복으로 무거움 |
| 금액·수량 컬럼은 `.table__cell--number`로 우측 정렬 | 순번·날짜·기간 컬럼에 `.table__cell--number` 적용 |
| 편집 셀 합계를 `tfoot`에 집계 | 합계를 tbody 마지막 행에 배치 |
| 셀 하나만 즉시 고치는 화면은 인라인 토글(`table__cell--editable` + `data-cell-edit`)로 읽기 밀도 유지 | 조회 화면 전체를 상시 편집형으로 열어두어 읽기 상태를 잃음 |
| 인라인 편집 저장 아이콘은 `icon-check`, 동작은 `initTableCellEdit`에 위임 | 저장을 다른 아이콘으로 표기하거나 토글 로직을 프로토타입에서 직접 구현 |
| 펼침 버튼에 `aria-expanded` + `aria-controls` 연결 | 펼침/접힘 상태를 시각적으로만 표현 |
| `.table__row--sub`를 대응 행 바로 다음 형제로 배치 | 서브 행을 tbody 끝에 몰아서 배치 |
| Badge로 과세/비과세 구분 명시 | 텍스트만으로 세금 유형 표현 |
| 열고정 열 배경을 행 컨텍스트(헤더/바디/선택)별로 명시 | `background: transparent` 방치로 스크롤 시 내용 비침 |
| 두 번째 이후 고정 열에 `style="left: Npx"` 누적 지정 | 두 번째 고정 열 `left: 0`으로 첫 열과 겹침 |
| 도움말 버튼은 별도 가이드 페이지가 있을 때만 표시 | 가이드 없이 도움말 버튼 배치 |
| 도움말 버튼 클릭 시 `window.open(url)` 또는 라우터로 가이드 페이지 이동 | 클릭해도 아무 동작 없는 도움말 버튼 배치 |
