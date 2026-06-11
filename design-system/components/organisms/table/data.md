---
file: components/organisms/table/data.md
version: 0.2.0
status: draft
updated: 2026-06-09
depends-on: components/organisms/table/index.md, components/molecules/table-cell.md, components/atoms/checkbox.md, components/atoms/badge.md, components/atoms/icon.md, components/atoms/icon-button.md, components/molecules/dropdown.md, components/atoms/segment.md
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
- 서브 콘텐츠는 .table-sub-content → .table-sub-info + .table-sub-group 조합
- colspan은 thead의 th 개수와 동일하게 설정

숫자 셀: .table__cell--number — text-align: right. 금액·수량 컬럼에만 사용. 순번·날짜·기간 등은 기본 좌측 정렬 유지.
액션 셀: .table__cell--action — 버튼/아이콘버튼 배치 전용, overflow: visible

열고정 (sticky):
- .table-container에 overflow-x: auto 추가
- 고정할 th/td에 .table__cell--sticky 추가
- 두 번째 열 이후 고정 시 left 값을 inline style로 누적 지정 (예: style="left:120px")
- 고정 열 우측에 구분선 자동 표시 (box-shadow)
-->

---

## 사용 지침

:::preview
<div class="pattern-explorer">

  <div id="pattern-segment" class="segment" role="radiogroup" aria-label="패턴 탐색">
    <span class="segment__slider" aria-hidden="true"></span>
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-region="with-toolbar">Toolbar (기본)</button>
    <button class="segment__item" role="radio" aria-checked="false" data-region="editable">편집형</button>
    <button class="segment__item" role="radio" aria-checked="false" data-region="expandable">펼침형</button>
    <button class="segment__item" role="radio" aria-checked="false" data-region="sticky-col">열고정</button>
  </div>

  <div class="pattern-explorer__panel">
    <div>

      <div data-region="with-toolbar" data-component class="table-container">
        <div class="table__toolbar" style="background:var(--color-surface-neutral)">
          <div class="table__title">근로자 검색 <button class="btn btn--primary btn--solid btn--micro btn--icon-only" aria-label="도움말" onclick="window.open('/guide/...')"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span></button></div>
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
            <tr class="table__row table__row--selected">
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
      <div data-region="editable" data-component class="table-container" style="overflow-x:auto">
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
      <div data-region="expandable" data-component class="table-container">
        <table class="table table--dense" aria-label="펼침형 급여 명세 테이블">
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
            <tr class="table__row table__row--expanded" id="exp-row-1">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="1행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell table__cell--expand"><button class="icon-on--sm" aria-expanded="true" aria-controls="sub-row-1" aria-label="행 접기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></button></td>
              <td class="table__cell">1</td><td class="table__cell">OO팀</td><td class="table__cell">홍길동</td><td class="table__cell">대리</td>
              <td class="table__cell table__cell--number">2,000,000</td><td class="table__cell table__cell--number">0</td><td class="table__cell table__cell--number">60,000</td><td class="table__cell table__cell--number">1,940,000</td>
              <td class="table__cell"><button class="btn btn--secondary btn--solid btn--xs" type="button">미리보기</button></td>
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
            <tr class="table__row" id="exp-row-2">
              <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="2행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
              <td class="table__cell table__cell--expand"><button class="icon-on--sm" aria-expanded="false" aria-controls="sub-row-2" aria-label="행 펼치기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></button></td>
              <td class="table__cell">2</td><td class="table__cell">OO팀</td><td class="table__cell">김철수</td><td class="table__cell">대리</td>
              <td class="table__cell table__cell--number">2,000,000</td><td class="table__cell table__cell--number">2,000,000</td><td class="table__cell table__cell--number">100,000</td><td class="table__cell table__cell--number">3,900,000</td>
              <td class="table__cell"><button class="btn btn--secondary btn--solid btn--xs" type="button">미리보기</button></td>
            </tr>
            <tr class="table__row--sub" id="sub-row-2">
              <td class="table__cell--sub" colspan="11">
                <div class="table-sub-content">
                  <div class="table-sub-info">
                    <div><span class="table-sub-info__label">급여유형</span> 본사_정규직</div>
                    <div><span class="table-sub-info__label">급여계좌</span> 네모투자증권<br>XXX-BBBBB-YY-ZZC<br>김철수</div>
                  </div>
                  <div class="table-sub-group">
                    <div class="table-sub-group__title">고정급여</div>
                    <div class="table-sub-row"><span class="badge badge--neutral badge--sm">비과세</span> 기본급 <span class="table-sub-row__amount">1,800,000</span></div>
                    <div class="table-sub-row"><span class="badge badge--caution badge--sm">과세</span> 성과급 <span class="table-sub-row__amount">200,000</span></div>
                  </div>
                  <div class="table-sub-group">
                    <div class="table-sub-group__title">변동급여</div>
                    <div class="table-sub-row">야간수당 <span class="table-sub-row__amount">1,000,000</span></div>
                    <div class="table-sub-row">성과급 <span class="table-sub-row__amount">1,000,000</span></div>
                  </div>
                  <div class="table-sub-group">
                    <div class="table-sub-group__title">공제금액</div>
                    <div class="table-sub-row">소득세 <span class="table-sub-row__amount">20,000</span></div>
                    <div class="table-sub-row">건강보험 <span class="table-sub-row__amount">50,000</span></div>
                    <div class="table-sub-row">국민연금 <span class="table-sub-row__amount">30,000</span></div>
                  </div>
                </div>
              </td>
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
      <div data-region="sticky-col" data-component class="table-container" style="overflow:auto">
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
  var seg = stage.querySelector('#pattern-segment');
  var segItems = seg.querySelectorAll('.segment__item');
  var panels = stage.querySelectorAll('[data-region]:not(.segment__item)');
  var codeItems = [];

  // 세그먼트 슬라이더 위치 갱신
  function updateSlider() {
    var slider = seg.querySelector('.segment__slider');
    var selected = seg.querySelector('.segment__item--selected');
    if (!slider || !selected) return;
    slider.style.width = selected.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
  }

  function showRegion(key) {
    panels.forEach(function(p, i) {
      var active = p.getAttribute('data-region') === key;
      p.style.display = active ? '' : 'none';
      if (codeItems[i]) codeItems[i].style.display = active ? '' : 'none';
    });
  }

  // 코드 블록은 IIFE 이후에 생성되므로 setTimeout으로 연결
  setTimeout(function() {
    var codeList = stage.parentNode.querySelector('.component-code-list');
    if (codeList) {
      codeItems = Array.from(codeList.querySelectorAll('.component-code-item'));
      panels.forEach(function(p, i) {
        if (codeItems[i]) codeItems[i].style.display = p.style.display;
      });
    }
  }, 0);

  // 세그먼트 클릭
  segItems.forEach(function(btn) {
    btn.addEventListener('click', function() {
      segItems.forEach(function(b) {
        b.classList.remove('segment__item--selected');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('segment__item--selected');
      btn.setAttribute('aria-checked', 'true');
      updateSlider();
      showRegion(btn.getAttribute('data-region'));
    });
  });

  // pattern-explorer를 column 레이아웃으로, 세그먼트를 상단에 배치
  var pe = stage.querySelector('.pattern-explorer');
  if (pe) pe.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:var(--space-gap-sm);width:100%';
  var panel = stage.querySelector('.pattern-explorer__panel');
  if (panel) panel.style.cssText = 'width:100%;min-width:0';
  seg.style.cssText = 'width:max-content';

  showRegion('with-toolbar');
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      updateSlider();
    });
  });
})();
</script>
:::

### 편집형 제약

- 편집 가능 셀의 합계는 JS로 실시간 계산해 `tfoot` 셀에 반영한다.
- 헤더 Badge는 `badge--neutral`(비과세)·`badge--caution`(과세)를 사용한다. 크기는 `badge--sm`(기본)만 허용한다.
- `tfoot`의 합계 행은 편집 셀 없이 숫자만 표시한다. 합계 셀은 `table__cell--number`를 유지한다.

### 펼침형 제약

- `.table__row--sub`는 반드시 대응하는 `.table__row` 바로 다음 형제로 배치한다. CSS adjacent sibling(`+`)으로 표시/숨김을 제어한다.
- `colspan`은 `thead`의 `th` 개수와 정확히 일치시킨다.
- 서브 콘텐츠 내 그룹 수(고정급여·변동급여·공제금액 등)가 달라지면 `.table-sub-content`의 `grid-template-columns`를 인라인 style로 조정한다.
- 펼침 버튼 아이콘은 접힌 상태 `icon-plus`, 펼쳐진 상태 `icon-minus`를 사용한다.

### 열고정 제약

- `.table-container`에 `overflow: auto`(또는 `overflow-x: auto`)를 추가해 가로 스크롤을 활성화한다.
- 고정할 모든 `th`·`td`에 `.table__cell--sticky`를 추가한다. 두 번째 이후 고정 열은 `style="left: Npx"`로 누적 너비를 직접 지정한다.
- 고정 열의 배경은 행 컨텍스트에 맞게 명시한다: 헤더는 `--color-surface-neutral`, 바디는 `--color-surface-base`, tfoot은 `--color-surface-neutral`.
- 선택된 행(`table__row--selected`)의 고정 셀 배경은 `--color-action-neutral-selected`로 재정의한다.

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
  min-width: 112px;
}

.table__cell--number {
  min-width: 112px;
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

/* ── Sticky column ── */
.table__cell--sticky {
  position: sticky;
  left: 0;
  z-index: 1;
  /* 스크롤 중 내용 비침 방지 — 행 컨텍스트별 배경을 명시해야 함 */
}

.table__cell--sticky--last {
  box-shadow: inset -1px 0 0 var(--color-border-subtle); /* 마지막 고정 열 우측 구분선 */
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
