---
file: components/organisms/table/variants.md
version: 0.1.0
status: draft
updated: 2026-06-09
depends-on: components/organisms/table/index.md, components/atoms/badge.md, components/atoms/input.md, components/atoms/icon-button.md
---

# Table — Variants

편집형·펼침형 패턴의 사용 지침과 인터랙티브 데모.  
기본 구조·CSS·접근성 공통 규칙은 `table/index.md` 참조.

---

<!-- AI:
편집형 (editable):
- tbody td에 .table__cell--edit + 내부에 .input 삽입
- 헤더에 Badge (.badge) 추가 — 과세/비과세 구분
- tfoot에 .table__foot + 합계 행

펼침형 (expandable):
- tbody 각 행 직후에 .table__row--sub를 형제로 배치
- 펼침 버튼: .table__cell--expand 안 <button>, 클릭 시 해당 행에 .table__row--expanded 토글
- 서브 행은 CSS adjacent sibling (.table__row--expanded + .table__row--sub)으로 표시/숨김
- 서브 콘텐츠는 .table-sub-content → .table-sub-info + .table-sub-group 조합
- colspan은 thead의 th 개수와 동일하게 설정
-->

## 편집형

:::preview
<table data-component class="table" aria-label="편집 가능 급여 테이블">
  <thead class="table__head">
    <tr>
      <th class="table__cell table__cell--check" scope="col"><input type="checkbox" aria-label="전체 선택"></th>
      <th class="table__head-cell" scope="col" style="width:48px">번호</th>
      <th class="table__head-cell" scope="col">부서</th>
      <th class="table__head-cell" scope="col">이름</th>
      <th class="table__head-cell" scope="col">직책</th>
      <th class="table__head-cell table__cell--number" scope="col">
        기본급
        <span class="badge badge--neutral badge--sm">비과세</span>
      </th>
      <th class="table__head-cell table__cell--number" scope="col">
        식대
        <span class="badge badge--neutral badge--sm">비과세</span>
      </th>
      <th class="table__head-cell table__cell--number" scope="col">
        직책수당
        <span class="badge badge--caution badge--sm">과세</span>
      </th>
      <th class="table__head-cell table__cell--number" scope="col">고정급여 합계</th>
    </tr>
  </thead>
  <tbody class="table__body">
    <tr class="table__row">
      <td class="table__cell table__cell--check"><input type="checkbox" aria-label="1행 선택"></td>
      <td class="table__cell table__cell--number">1</td>
      <td class="table__cell">OO팀</td>
      <td class="table__cell">홍길동</td>
      <td class="table__cell">대리</td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="3,000,000" aria-label="기본급 홍길동"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="100,000" aria-label="식대 홍길동"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="300,000" aria-label="직책수당 홍길동"></div></td>
      <td class="table__cell table__cell--number">3,710,000</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell table__cell--check"><input type="checkbox" aria-label="2행 선택"></td>
      <td class="table__cell table__cell--number">2</td>
      <td class="table__cell">OO팀</td>
      <td class="table__cell">홍길동</td>
      <td class="table__cell">대리</td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="3,000,000" aria-label="기본급 2행"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="100,000" aria-label="식대 2행"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="0" aria-label="직책수당 2행"></div></td>
      <td class="table__cell table__cell--number">3,110,000</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell table__cell--check"><input type="checkbox" aria-label="3행 선택"></td>
      <td class="table__cell table__cell--number">3</td>
      <td class="table__cell">OO팀</td>
      <td class="table__cell">홍길동</td>
      <td class="table__cell">대리</td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="2,000,000" aria-label="기본급 3행"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="0" aria-label="식대 3행"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input" type="text" value="100,000" aria-label="직책수당 3행"></div></td>
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
  stage.querySelectorAll('.table__cell--edit .input').forEach(initInput);
})();
</script>
:::

### 편집형 제약

- 편집 가능 셀의 합계는 JS로 실시간 계산해 `tfoot` 셀에 반영한다.
- 헤더 Badge는 `badge--neutral`(비과세)·`badge--caution`(과세)를 사용한다.
- `tfoot`의 합계 행은 편집 셀 없이 숫자만 표시한다. 합계 셀은 `table__cell--number`를 유지한다.

---

## 펼침형

:::preview
<table data-component class="table" aria-label="펼침형 급여 명세 테이블">
  <thead class="table__head">
    <tr>
      <th class="table__cell table__cell--check" scope="col"><input type="checkbox" aria-label="전체 선택"></th>
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
      <td class="table__cell table__cell--check"><input type="checkbox" aria-label="1행 선택"></td>
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
        <button class="btn btn--ghost btn--sm text-button-sm" type="button">미리보기</button>
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
      <td class="table__cell table__cell--check"><input type="checkbox" aria-label="2행 선택"></td>
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
        <button class="btn btn--ghost btn--sm text-button-sm" type="button">미리보기</button>
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

### 펼침형 제약

- `.table__row--sub`는 반드시 대응하는 `.table__row` 바로 다음 형제로 배치한다. CSS adjacent sibling(`+`)으로 표시/숨김을 제어한다.
- `colspan`은 `thead`의 `th` 개수와 정확히 일치시킨다.
- 서브 콘텐츠 내 그룹 수(고정급여·변동급여·공제금액 등)가 달라지면 `.table-sub-content`의 `grid-template-columns`를 인라인 style로 조정한다.
- 펼침 버튼 아이콘은 접힌 상태 `icon-plus`, 펼쳐진 상태 `icon-minus`를 사용한다.
