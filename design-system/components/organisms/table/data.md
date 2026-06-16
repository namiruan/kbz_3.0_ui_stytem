---
file: components/organisms/table/data.md
version: 0.3.0
status: draft
updated: 2026-06-11
depends-on: components/organisms/table/index.md, components/molecules/table-cell.md, components/atoms/checkbox.md, components/atoms/badge.md, components/atoms/icon.md, components/atoms/icon-button.md, components/atoms/segment.md
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
| 도움말 버튼 | 없음 · 있음 (`icon-help`) | 없음 |
| 열고정 | 없음 · 있음 (`table__cell--sticky`) | 없음 |

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
콘텐츠 맞춤 열: .table__cell--fit — 날짜·코드 등 포맷 고정 열, 콘텐츠 최대 길이에 맞게 너비 수축. 상세: table-cell.md

열고정 (sticky):
- .table-container에 overflow-x: auto 추가
- 고정할 th/td에 .table__cell--sticky 추가
- 두 번째 열 이후 고정 시 left 값을 inline style로 누적 지정 (예: style="left:120px")
- 고정 열 우측에 구분선 자동 표시 (box-shadow)

하위 컴포넌트 사용 규칙 (반드시 각 컴포넌트 문서의 마크업을 따를 것):
- 체크박스: checkbox.md. label.checkbox.checkbox--sm > input[type=checkbox] + span.checkbox__control > span.checkbox__icon-check > svg 구조.
- 편집형 인풋: input.md. 테이블 셀 내 인라인 입력은 input--xs (height-tight, 24px) 사용.
  유효 크기 = 기본(클래스 없음) · input--sm · input--xs. input--md는 존재하지 않음.
- 뱃지: badge.md. style 클래스(badge--neutral 등) 필수. sm이 기본값이므로 badge--sm 불필요. md는 badge--md 명시.
- 툴바 액션 버튼: icon-on--lg (엑셀·프린트 등 toolbar 아이콘버튼). btn--* 컴포넌트가 아님.
- 도움말 버튼: btn btn--primary btn--solid btn--micro btn--icon-only > span.icon.icon--badge > svg icon-help.
- 셀 내 액션 버튼(보기·수정 등): button.md btn--secondary btn--solid btn--xs.
-->

---

## 사용 지침

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
          <div class="table__title">근로자 검색 <button class="btn btn--primary btn--solid btn--micro btn--icon-only" type="button" aria-label="도움말" onclick="window.open('/guide/...')"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span></button></div>
          <div class="table__toolbar-actions">
            <button class="icon-on--lg" aria-label="엑셀 내보내기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-excel"/></svg></button>
            <button class="icon-on--lg" aria-label="컬럼 설정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-settings"/></svg></button>
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
      <div data-panel="sticky-col" data-component class="table-container" style="display:none;overflow:auto">
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

### 펼침형 제약

- `.table__row--sub`는 반드시 대응하는 `.table__row` 바로 다음 형제로 배치한다. CSS adjacent sibling(`+`)으로 표시/숨김을 제어한다.
- 서브 행은 `colgroup`과 동일한 열 구조를 따른다. 체크·펼침 열은 빈 `<td class="table__cell--sub">`로 두고, 내용이 있는 열에만 `.table-sub-row` 아이템을 배치한다.
- `table-layout: fixed` + `colgroup`으로 금액 열 너비를 고정해야 서브 행 내용과 헤더 열이 정렬된다. 금액 열은 최소 160px 권장.
- 펼침 버튼 아이콘: 접힌 상태 `icon-chevron-down`, 펼쳐진 상태 `icon-collapse`. 두 아이콘을 모두 마크업하고 `.table__row--expanded` 클래스로 표시/숨김을 CSS 제어한다.

### 열고정 제약

- `.table-container`에 `overflow: auto`(또는 `overflow-x: auto`)를 추가해 가로 스크롤을 활성화한다.
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
  text-align: center;
  overflow: visible;
}

/* check 열과 동일 조건 — 아이콘 버튼 하나만 들어가는 고정 폭 열 */
.table__cell--expand {
  width: calc(var(--icon-sm) + var(--space-inset-md) * 2);
  text-align: center;
  padding: 0;
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
  z-index: 2;
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

---

## Do / Don't

| Do | Don't |
|----|-------|
| 금액·수량 컬럼은 `.table__cell--number`로 우측 정렬 | 순번·날짜·기간 컬럼에 `.table__cell--number` 적용 |
| 편집 셀 합계를 `tfoot`에 집계 | 합계를 tbody 마지막 행에 배치 |
| 펼침 버튼에 `aria-expanded` + `aria-controls` 연결 | 펼침/접힘 상태를 시각적으로만 표현 |
| `.table__row--sub`를 대응 행 바로 다음 형제로 배치 | 서브 행을 tbody 끝에 몰아서 배치 |
| Badge로 과세/비과세 구분 명시 | 텍스트만으로 세금 유형 표현 |
| 열고정 열 배경을 행 컨텍스트(헤더/바디/선택)별로 명시 | `background: transparent` 방치로 스크롤 시 내용 비침 |
| 두 번째 이후 고정 열에 `style="left: Npx"` 누적 지정 | 두 번째 고정 열 `left: 0`으로 첫 열과 겹침 |
| 도움말 버튼은 별도 가이드 페이지가 있을 때만 표시 | 가이드 없이 도움말 버튼 배치 |
| 도움말 버튼 클릭 시 `window.open(url)` 또는 라우터로 가이드 페이지 이동 | 클릭해도 아무 동작 없는 도움말 버튼 배치 |

---

## 플래너 패턴

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="table-container">
  <div class="table__toolbar">
    <div class="table__title" id="{title-id}">{테이블 제목}</div>
    <div class="table__toolbar-actions"><!-- 액션 버튼 --></div>
  </div>
  <table class="table table--dense" aria-labelledby="{title-id}">
    <thead class="table__head">
      <tr>
        <th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
        <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none"><button class="table__sort-btn" aria-label="{컬럼명} 정렬">{컬럼명}</button></th>
        <th class="table__head-cell table__cell--fit" scope="col">{날짜/코드 컬럼}</th>
        <th class="table__head-cell" scope="col">{컬럼명}</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="{행 식별값} 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
        <td class="table__cell">{텍스트}</td>
        <td class="table__cell table__cell--fit">{날짜}</td>
        <td class="table__cell table__cell--number">{금액}</td>
      </tr>
    </tbody>
    <tfoot class="table__foot">
      <tr class="table__row table__row--total">
        <td class="table__cell" colspan="{N}">합계</td>
        <td class="table__cell table__cell--number">{합계 금액}</td>
      </tr>
    </tfoot>
  </table>
</div>
```

행 변형: `table__row--selected` (선택) · `table__row--sub` (서브 행, 대응 행 바로 다음) · `table__row--total` (합계)
편집 셀: `td.table__cell--edit` > `div.input-wrap` > `input.input.input--sm`
펼침 버튼: `button[aria-expanded][aria-controls]` — 접힘 아이콘 `accordion__icon--collapsed` + 펼침 아이콘 `accordion__icon--expanded`
JS init: 없음 (정렬·선택·펼침 이벤트 직접 구현)
