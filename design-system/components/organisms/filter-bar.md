---
file: components/organisms/filter-bar.md
version: 0.12.0
status: draft
depends-on: components/_index.md, accessibility.md, components/atoms/button.md, components/atoms/icon.md, components/atoms/input.md, components/atoms/tooltip.md, components/atoms/calendar.md, components/molecules/dropdown.md, components/molecules/date-range-picker.md, tokens/color.md, tokens/radius.md, tokens/space.md, tokens/stroke.md
---

# FilterBar

## 개요

테이블·목록 상단에 배치하는 검색·필터 도구 모음. 다중 선택 드롭다운 필터·날짜 범위 필터·텍스트 검색을 하나의 바로 연결한다. 선택 상태는 각 드롭다운·DRP 트리거에 직접 표시되므로 별도 태그 행이 필요 없다. 필터 없이 **텍스트 검색만 있는 단독 검색**도 같은 바 프레임으로 구성한다 — 화면 안 모든 조회/검색 입력의 시각을 통일하기 위함이다.

이 통일은 **폼 안의 단독 조회·룩업 필드(주소 검색·우편번호 찾기 등)에도 적용한다.** 필드 값을 채우는 조회도 일반 테두리 `input` + 텍스트 버튼이 아니라 같은 바 프레임(`filter-bar__search`: `input--ghost` + 우측 **돋보기 검색 아이콘 버튼**)으로 구성한다. 폼 필드 안에 놓일 때도 `form-field__label`은 그대로 두고 컨트롤 자리에 이 바를 쓴다. 검색 제출은 돋보기 아이콘 버튼(`icon-on--md`)이며 **텍스트 버튼을 두지 않는다.**

ActionGroup과의 차이 — ActionGroup은 버튼 기반 액션 모음(추가·수정·삭제 등). FilterBar는 조회 조건 전용 영역으로, 데이터 조작 버튼은 포함하지 않는다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| filter | 없음 · multi → `dropdown--multi`, 아무것도 선택 안 한 상태 = 전체 | 없음 |
| daterange | 없음 (기본) · 있음 — `.drp.drp__trigger--ghost` | 없음 |
| search | 없음 (기본) · 있음 — `.filter-bar__search` | 없음 |

- filter·daterange·search 중 **최소 1개** 이상으로 구성한다. 검색만 있는 단독 구성도 허용한다.
- **폼 내 단독 조회·룩업**(주소·우편번호 찾기)도 search 단독 구성으로 쓴다 — 검색 제출은 돋보기 아이콘 버튼(`icon-on--md`), 텍스트 버튼 없음.

- 다중 선택 필터: 선택 항목 수를 count badge로 표시. 아무것도 선택 안 한 상태가 "전체"이므로 별도 "전체" 옵션 불필요.
- 날짜 범위: DateRangePicker molecule(`date-range-picker.md`)을 `drp__trigger--ghost`로 삽입한다. 단축·직접입력·캘린더·확인/취소는 DRP가 자체 처리한다.
- 초기화 버튼은 필터·검색어가 하나라도 활성일 때만 표시한다.

---

## 사용 지침

<!-- AI:
레이어 계층: FilterBar — 레이아웃 루트 (div.filter-bar)
  └─ .filter-bar__bar — div. 외곽 border+radius 컨테이너. height: var(--height-base). overflow:hidden 미사용(드롭다운·DRP 패널 클리핑 방지). 직접 자식끼리 border-left 구분선.
       ├─ div.dropdown.dropdown--button.dropdown--ghost.dropdown--multi — 다중 선택 필터. dropdown.md 참조. 필터마다 1개.
       │    trigger 구조: button.dropdown__trigger[aria-describedby="tip-{id}"] > span.dropdown__value[.dropdown__value--placeholder] + span.dropdown__count[hidden] + span.dropdown__chevron
       │    "전체" 옵션 없음 — 아무것도 선택 안 한 상태(count 0)가 전체. ul[aria-multiselectable="true"] 필수.
       │    선택 완료 시 dropdown__value 텍스트: 선택 1개 → "목수", 복수 → "목수 외 2" (JS가 직접 갱신)
       │    tooltip: div.tooltip-panel.elevation-tooltip.tooltip-panel--bottom[role="tooltip"] — dropdown div 내부 마지막에 삽입. 선택값 있을 때만 표시 (선택값 전체를 쉼표로 나열). tooltip.md 패턴 참조.
       ├─ div.drp[data-component][data-placeholder="전체기간"][data-max-date="today"] — 날짜 범위 필터.
       │    date-range-picker.md의 `.drp` 구조 그대로 사용.
       │    trigger: button.drp__trigger.drp__trigger--ghost (border·bg 없이 bar 컨테이너 스타일 수용)
       │    panel: div.drp__panel — DRP molecule이 자체 처리 (단축·직접입력·캘린더·확인/취소 포함)
       │    초기화: 외부에서 CustomEvent('drp:reset')를 디스패치하면 DRP 내부 상태 초기화. label도 data-placeholder("전체기간")로 복원.
       ├─ .filter-bar__search — div (optional). flex: 1.
       │    ├─ div.input-wrap — input.md 래퍼. 값 있을 때만 input-wrap--clearable 추가 (JS).
       │    │    ├─ input.input.input--ghost[type="search"][aria-label]
       │    │    └─ button.input-clear.icon-on--badge[aria-label="지우기"][hidden] — 값 있을 때만 표시.
       │    └─ button.icon-on--md[aria-label="검색"] — 우측 검색 제출 버튼.
       │    네이티브 <input type="search"> 기본 X 버튼은 appearance:none으로 숨김.
       └─ div.filter-bar__reset-wrap[hidden] — 초기화 버튼 래퍼. 필터 활성 시에만 표시(JS가 hidden 제거).
            ├─ button.icon-on--md[aria-label="초기화"][aria-describedby="tip-reset"]
            │    <svg><use href="icons/sprite.svg#icon-refresh"/>
            └─ div.tooltip-panel.elevation-tooltip.tooltip-panel--bottom[role="tooltip"] — "초기화" 텍스트

동작:
- 다중 선택 드롭다운: 옵션 클릭 → dropdown__option--selected 토글 → updateSummary() 호출. 선택 1개 → "목수", 복수 → "목수 외 2". 선택 0개 = placeholder 클래스 복원(전체 상태).
- 날짜 범위: DRP molecule이 자체 처리. drp:change 이벤트로 FilterBar JS가 초기화 버튼 가시성 동기화.
- 검색: 입력 시 X 버튼 표시. Enter 또는 검색 버튼 클릭으로 실행.
- 초기화: 모든 드롭다운 선택 해제 + DRP에 drp:reset 디스패치 + 검색어 초기화.
- 초기화 버튼 가시성: 기본값(선택 없음·전체기간·검색어 없음)에서 벗어난 항목이 하나라도 있으면 표시.

JS 의존:
- initFilterBar(container): FilterBar 인터랙션 전체 초기화 — js init 블록 참조. container = div.filter-bar.
- initDropdown(container): dropdown.md JS — 패널 열기/닫기·옵션 선택. initFilterBar 내부에서 호출.
- initDRP(el): date-range-picker.md JS — DRP 인터랙션 전체. initFilterBar 내부에서 호출.
- stage: preview 전용 전역값(_spec.md 참조).
-->

```js init
function initFilterBar(container) {
  if (!container || container.dataset.initFilterBar) return;
  container.dataset.initFilterBar = '1';

  var resetWrap   = container.querySelector('.filter-bar__reset-wrap');
  var resetBtn    = resetWrap ? resetWrap.querySelector('button') : null;
  var resetTip    = resetWrap ? resetWrap.querySelector('.tooltip-panel') : null;
  var drpEls      = Array.from(container.querySelectorAll('.drp'));
  var searchInput = container.querySelector('.filter-bar__search input[type="search"]');
  var searchWrap  = searchInput ? searchInput.closest('.input-wrap') : null;
  var clearBtn    = container.querySelector('.filter-bar__search .input-clear');
  var searchBtn   = container.querySelector('.filter-bar__search .icon-on--md');

  /* 하위 컴포넌트 초기화 */
  initDropdown(container);
  drpEls.forEach(function(drp) { initDRP(drp); });

  /* 초기화 버튼 가시성 동기화 */
  function syncReset() {
    if (!resetWrap) return;
    var anyFilter = Array.from(container.querySelectorAll('.dropdown')).some(function(dd) {
      return !!dd.querySelector('.dropdown__option--selected');
    });
    var anyDrp    = drpEls.some(function(d) { return d.classList.contains('drp--active'); });
    var anySearch = searchInput ? searchInput.value.trim().length > 0 : false;
    resetWrap.hidden = !(anyFilter || anyDrp || anySearch);
  }

  /* 초기화 버튼 tooltip */
  if (resetBtn && resetTip) {
    resetBtn.addEventListener('mouseenter', function() { resetTip.classList.add('tooltip-panel--visible'); });
    resetBtn.addEventListener('mouseleave', function() { resetTip.classList.remove('tooltip-panel--visible'); });
    resetBtn.addEventListener('focus',      function() { resetTip.classList.add('tooltip-panel--visible'); });
    resetBtn.addEventListener('blur',       function() { resetTip.classList.remove('tooltip-panel--visible'); });
  }

  /* 드롭다운 선택값 요약 업데이트 */
  function updateSummary(dd) {
    var sel   = Array.from(dd.querySelectorAll('.dropdown__option--selected'));
    var val   = dd.querySelector('.dropdown__value');
    var count = dd.querySelector('.dropdown__count');
    var tip   = dd.querySelector('.tooltip-panel');
    if (!val) return;
    if (count) count.hidden = true;
    if (sel.length === 0) {
      val.textContent = dd.dataset.placeholder || '';
      val.classList.add('dropdown__value--placeholder');
      if (tip) tip.textContent = '';
    } else {
      var labels = sel.map(function(o) { return o.querySelector('.dropdown__option-label').textContent; });
      val.textContent = labels.length > 1 ? labels[0] + ' 외 ' + (labels.length - 1) : labels[0];
      val.classList.remove('dropdown__value--placeholder');
      if (tip) tip.textContent = labels.join(', ');
    }
  }

  /* 드롭다운 placeholder 저장 + tooltip hover */
  container.querySelectorAll('.dropdown').forEach(function(dd) {
    var val = dd.querySelector('.dropdown__value');
    if (val) dd.dataset.placeholder = val.textContent.trim();
    var trigger = dd.querySelector('.dropdown__trigger');
    var tip     = dd.querySelector('.tooltip-panel');
    if (!trigger || !tip) return;
    trigger.addEventListener('mouseenter', function() { if (tip.textContent.trim()) tip.classList.add('tooltip-panel--visible'); });
    trigger.addEventListener('mouseleave', function() { tip.classList.remove('tooltip-panel--visible'); });
    trigger.addEventListener('focus',      function() { if (tip.textContent.trim()) tip.classList.add('tooltip-panel--visible'); });
    trigger.addEventListener('blur',       function() { tip.classList.remove('tooltip-panel--visible'); });
  });

  /* 드롭다운 옵션 클릭 → 요약 + reset 동기화 */
  container.querySelectorAll('.dropdown .dropdown__option').forEach(function(opt) {
    opt.addEventListener('click', function() {
      setTimeout(function() {
        var dd = opt.closest('.dropdown');
        if (dd) updateSummary(dd);
        syncReset();
      }, 0);
    });
  });

  /* DRP change 이벤트 → reset 동기화 */
  drpEls.forEach(function(drp) {
    drp.addEventListener('drp:change', function() { syncReset(); });
  });

  /* 검색 clear 버튼 — 텍스트 바로 옆(input.md positionClear 패턴 동일) */
  function getSearchTextWidth() {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var cs = getComputedStyle(searchInput);
    ctx.font = cs.fontSize + ' ' + cs.fontFamily;
    return ctx.measureText(searchInput.value).width;
  }
  function positionClear() {
    if (!clearBtn || clearBtn.hidden) return;
    var cs  = getComputedStyle(searchInput);
    var pl  = parseFloat(cs.paddingLeft);
    var pr  = parseFloat(cs.paddingRight);
    var max = searchInput.offsetWidth - pr - (clearBtn.offsetWidth || 16);
    clearBtn.style.left  = Math.min(pl + getSearchTextWidth() + 4, max) + 'px';
    clearBtn.style.right = 'auto';
  }

  /* 검색 */
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var hasVal = !!searchInput.value;
      if (clearBtn) clearBtn.hidden = !hasVal;
      if (searchWrap) searchWrap.classList.toggle('input-wrap--clearable', hasVal);
      positionClear();
      syncReset();
    });
    searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') syncReset(); });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (searchInput) searchInput.value = '';
      clearBtn.hidden = true;
      clearBtn.style.left  = '';
      clearBtn.style.right = '';
      if (searchWrap) searchWrap.classList.remove('input-wrap--clearable');
      syncReset();
    });
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', function() { syncReset(); });
  }

  /* 초기화 */
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      container.querySelectorAll('.dropdown').forEach(function(dd) {
        dd.querySelectorAll('.dropdown__option').forEach(function(o) {
          o.classList.remove('dropdown__option--selected');
          o.setAttribute('aria-selected', 'false');
        });
        var val   = dd.querySelector('.dropdown__value');
        var count = dd.querySelector('.dropdown__count');
        var tip   = dd.querySelector('.tooltip-panel');
        if (val)   { val.textContent = dd.dataset.placeholder || ''; val.classList.add('dropdown__value--placeholder'); }
        if (count) count.hidden = true;
        if (tip)   { tip.textContent = ''; tip.classList.remove('tooltip-panel--visible'); }
      });
      drpEls.forEach(function(drp) { drp.dispatchEvent(new CustomEvent('drp:reset')); });
      if (searchInput) searchInput.value = '';
      if (clearBtn)    clearBtn.hidden = true;
      if (searchWrap)  searchWrap.classList.remove('input-wrap--clearable');
      syncReset();
    });
  }

  /* 초기 상태 동기화 */
  syncReset();
}
```

:::preview
<div style="padding-bottom:520px">

<div data-component class="filter-bar" id="fb-main">
  <div class="filter-bar__bar" role="toolbar" aria-label="데이터 필터">

    <!-- 공종 -->
    <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb-gongjong">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="공종 선택" aria-describedby="tip-gongjong">
        <span class="dropdown__value dropdown__value--placeholder">공종</span>
        <span class="dropdown__count" hidden aria-hidden="true"></span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="공종">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">목수</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">전기</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">미지정</span></li>
        </ul>
      </div>
      <div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" id="tip-gongjong" role="tooltip"></div>
    </div>

    <!-- 계약상태 -->
    <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb-status">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="계약상태 선택" aria-describedby="tip-status">
        <span class="dropdown__value dropdown__value--placeholder">계약상태</span>
        <span class="dropdown__count" hidden aria-hidden="true"></span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="계약상태">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">임시저장</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">파기요청</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">파기완료</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">사명완료</span></li>
        </ul>
      </div>
      <div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" id="tip-status" role="tooltip"></div>
    </div>

    <!-- 계약양식 -->
    <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb-form">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="계약양식 선택" aria-describedby="tip-form">
        <span class="dropdown__value dropdown__value--placeholder">계약양식</span>
        <span class="dropdown__count" hidden aria-hidden="true"></span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="계약양식">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">일급제</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">월급제</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">시급제</span></li>
        </ul>
      </div>
      <div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" id="tip-form" role="tooltip"></div>
    </div>

    <!-- 계약기간 — DateRangePicker molecule (drp__trigger--ghost로 bar에 통합) -->
    <div data-component class="drp" id="fb-drp" data-placeholder="전체기간" data-max-date="today">
      <button class="drp__trigger drp__trigger--ghost" aria-haspopup="dialog" aria-expanded="false" aria-label="계약기간 선택">
        <span class="drp__trigger-label">전체기간</span>
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
      </button>
      <div class="drp__panel" role="dialog" aria-label="계약기간 선택" aria-modal="true" hidden>
        <div class="drp__inputs">
          <button class="drp__nav-btn" type="button" aria-label="이전 달">
            <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
          </button>
          <div class="drp__date-group">
            <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
            <span class="drp__value-sep" aria-hidden="true">.</span>
            <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
            <span class="drp__value-sep" aria-hidden="true">.</span>
            <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
          </div>
          <span class="drp__input-sep" aria-hidden="true">~</span>
          <div class="drp__date-group">
            <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
            <span class="drp__value-sep" aria-hidden="true">.</span>
            <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
            <span class="drp__value-sep" aria-hidden="true">.</span>
            <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
          </div>
          <button class="drp__nav-btn" type="button" aria-label="다음 달">
            <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
          </button>
        </div>
        <div class="drp__body">
          <ul class="drp__shortcuts" role="listbox" aria-label="기간 단축 선택">
            <li class="drp__shortcut" role="option" aria-selected="false" tabindex="0" data-shortcut="all">전체</li>
            <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="today">오늘</li>
            <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="yesterday">어제</li>
            <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="last-week">지난주</li>
            <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="this-month">이번달</li>
            <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="last-month">지난달</li>
          </ul>
          <div class="drp__cal-area">
            <div class="drp__weekdays" role="row" aria-hidden="true">
              <span role="columnheader" aria-label="일요일">일</span>
              <span role="columnheader" aria-label="월요일">월</span>
              <span role="columnheader" aria-label="화요일">화</span>
              <span role="columnheader" aria-label="수요일">수</span>
              <span role="columnheader" aria-label="목요일">목</span>
              <span role="columnheader" aria-label="금요일">금</span>
              <span role="columnheader" aria-label="토요일">토</span>
            </div>
            <div class="drp__scroll-inner">
              <div class="drp__scroll-body"></div>
            </div>
          </div>
        </div>
        <div class="drp__footer">
          <button class="btn btn--ghost btn--sm" type="button">취소</button>
          <button class="btn btn--primary btn--sm" type="button">확인</button>
        </div>
      </div>
    </div>

    <!-- 검색 -->
    <div class="filter-bar__search">
      <div class="input-wrap" id="fb-search-wrap">
        <input class="input input--ghost" type="search" placeholder="이름 / 주민등록번호" aria-label="이름 또는 주민등록번호 검색" id="fb-search-input">
        <button class="input-clear icon-on--badge" type="button" aria-label="지우기" hidden id="fb-search-clear">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
        </button>
      </div>
      <button class="icon-on--md" type="button" aria-label="검색" id="fb-search-btn">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>
      </button>
    </div>

    <div class="filter-bar__reset-wrap" id="fb-reset-wrap" hidden>
      <button class="icon-on--md" type="button" aria-label="초기화" id="fb-reset" aria-describedby="tip-reset">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-refresh"/></svg>
      </button>
      <div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" id="tip-reset" role="tooltip">초기화</div>
    </div>
  </div>
</div>

</div>
<script>
(function() {
  var fb = stage.querySelector('.filter-bar');
  initFilterBar(fb);
})();
</script>
:::

### sm(<768px) — 바가 컨트롤로 흩어진다

`md` 이상에서는 컨트롤들이 **한 줄짜리 바** 안에 세로선으로 나뉘어 붙어 있다. `sm`에서는 그 프레임을 버린다 — 바의 테두리와 세로 구분선을 걷고, 각 컨트롤이 제 테두리를 갖고 접힌다. 검색은 한 줄을 통째로 쓴다.

- **왜 프레임을 버리나** — 한 줄짜리 바는 데스크톱의 장치다. 390px에서는 필터 셋만 되어도 들어가지 않는다(실측: 드롭다운 3 + 기간 + 검색이 바 358px 안에서 **183px 넘쳐** 페이지가 가로로 스크롤됐다).
- **줄바꿈만으로는 안 된다.** 구분선을 `> * + *`의 `border-left`로 긋고 있어 줄이 바뀌면 그 세로선이 **새 줄의 첫 칸 왼쪽**에 남는다. CSS에는 "줄의 첫 칸"을 고르는 방법이 없다. 그래서 세로선을 쓰지 않고, 묶어 주던 일을 **간격(근접성)** 이 대신한다.
- **검색이 한 줄을 다 쓰는 이유** — 필터와 나눠 쓰면 입력 폭이 150px 아래로 떨어져 무엇을 치고 있는지 보이지 않는다. 390px에서 입력 폭 **312px**을 확보한다.
- **순서는 바꾸지 않는다.** `order`로 검색을 위로 올리지 않는다 — 보이는 순서와 초점 순서가 어긋나면 키보드·스크린리더에서 다른 화면이 된다.
- **초기화는 줄을 차지하지 않는다.** 아이콘 하나라 필터들 뒤에 그대로 흐른다(활성일 때만 보인다).
- 실측 — 390px: 바 358×124, 넘침 0, 문서폭 390(가로 스크롤 없음), 컨트롤 높이 36. 1200px: 한 줄 36px에 테두리 없는 ghost 그대로.

---

### 제약

- 바 안 드롭다운은 `dropdown--ghost dropdown--multi`만 사용한다. 바 컨테이너가 시각 프레임을 제공한다.
- "전체" 옵션을 넣지 않는다. 아무것도 선택 안 한 상태(count 0)가 전체이다.
- 날짜 범위는 `drp__trigger--ghost`를 가진 DateRangePicker molecule로만 구현한다. 커스텀 date input 패널 직접 구현 금지.
- 데이터 조작 버튼(추가·수정·삭제 등)은 FilterBar에 포함하지 않는다. 테이블 상단 ActionGroup으로 분리한다.
- 검색 인풋은 ghost 스타일만 사용한다. (`sm`에서 검색 칸이 테두리를 갖는 것은 **바깥 래퍼**(`.filter-bar__search`)이지 인풋이 아니다.)
- 필터·날짜 범위·검색 중 **하나 이상**으로 구성한다. **검색만 있는 단독 구성도 허용**한다 — 필터 없이 검색만 있어도 FilterBar의 바 프레임·`input--ghost`를 그대로 써서 다른 검색바와 시각을 통일한다. (단독 검색을 일반 테두리 `input`으로 따로 만들지 않는다.)

---

## CSS

```css
/* ── Base ── */
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
}

/* ── Bar (통합 컨테이너) ── */
/* overflow:hidden 미사용 — 드롭다운·DRP 패널(position:absolute)이 클리핑되므로 */
.filter-bar__bar {
  display: flex;
  align-items: stretch;
  height: var(--height-base);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
}

/* 섹션 구분선 */
.filter-bar__bar > * + * {
  border-left: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── Dropdown trigger 보정 ── */
.filter-bar__bar .dropdown__trigger {
  height: 100%;
  border-radius: 0;
}

/* ── DRP 통합 — ghost trigger를 bar에 맞춤 ── */
.filter-bar__bar .drp {
  display: flex;
  align-self: stretch;
}
.filter-bar__bar .drp__trigger {
  height: 100%;
}

/* ── Search section ── */
.filter-bar__search {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  flex: 1;
  min-width: 180px;
  padding: 0 var(--space-inset-md);
}
.filter-bar__search .input-wrap {
  flex: 1;
  min-width: 0;
  position: relative;
}
/* badge 크기 clear 버튼에 맞춰 padding-right 축소; JS positionClear()로 버튼을 텍스트 바로 옆에 배치 */
.filter-bar__search .input-wrap--clearable .input {
  padding-right: calc(var(--space-4) + var(--icon-badge) + var(--space-4));
}
/* 네이티브 search X 버튼 숨김 */
.filter-bar__search .input[type="search"]::-webkit-search-cancel-button {
  display: none;
}

/* ── sm (<768px) — 바가 컨트롤로 흩어진다 ── */
/* 한 줄짜리 바는 데스크톱의 장치다. 390px에서는 필터 셋만 되어도 들어가지 않는다
   (실측: 드롭다운 3 + 기간 + 검색이 바 358px 안에서 183px 넘쳐 페이지가 가로로 스크롤됐다).

   **줄바꿈만으로는 안 된다.** 칸 사이 구분선을 `> * + *`의 border-left로 긋고 있어서,
   줄이 바뀌면 그 세로선이 새 줄의 **첫 칸 왼쪽**에 남는다. CSS에는 "줄의 첫 칸"을 고르는
   방법이 없다. 그래서 sm에서는 **바의 테두리와 세로선을 걷고, 각 컨트롤이 제 테두리를 갖는다** —
   묶어 주던 일은 이제 간격(근접성)이 한다. 컨트롤이 몇 개든 자연스럽게 접힌다.

   검색은 한 줄을 통째로 쓴다. 필터와 나눠 쓰면 입력 폭이 150px 아래로 떨어져
   무엇을 치고 있는지 보이지 않는다. **순서는 바꾸지 않는다**(order로 검색을 위로 올리지 않는다) —
   보이는 순서와 초점 순서가 어긋나면 키보드·스크린리더에서 다른 화면이 된다. */
@media (max-width: 767px) {
  .filter-bar__bar {
    flex-wrap: wrap;
    height: auto;
    gap: var(--space-gap-sm);
    border: 0;
    border-radius: 0;
    background: transparent;
  }
  /* 세로 구분선을 걷는다 — 줄이 바뀌면 첫 칸 왼쪽에 남는다 */
  .filter-bar__bar > * + * { border-left: 0; }

  /* 각 컨트롤이 제 테두리를 갖는다.
     드롭다운 쪽 선택자를 길게 쓴 이유 — ghost의 "테두리 없음"이
     `.dropdown--button.dropdown--ghost .dropdown__trigger`(0,3,0)라
     `.filter-bar__bar .dropdown__trigger`(0,2,0)로는 지고, 소스 순서로는 이길 수 없다.
     같은 값으로 맞춰 순서에 기대는 대신 한 단계 위로 올린다. */
  .filter-bar__bar .dropdown--button.dropdown--ghost .dropdown__trigger,
  .filter-bar__bar .drp__trigger {
    height: var(--height-base);
    border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
    border-radius: var(--radius-sm);
    background: var(--color-surface-base);
  }

  /* 검색은 한 줄 전체 */
  .filter-bar__search {
    flex-basis: 100%;
    height: var(--height-base);
    border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
    border-radius: var(--radius-sm);
    background: var(--color-surface-base);
  }

  /* 초기화는 아이콘 하나라 줄을 차지하지 않는다 — 필터들 뒤에 그대로 흐른다 */
  .filter-bar__reset-wrap { padding-inline: var(--space-inset-xs); }
}

/* ── Reset button 보정 ── */
.filter-bar__reset-wrap {
  display: flex;
  align-items: center;
  padding-inline: var(--space-inset-sm);
  position: relative; /* tooltip 앵커 */
}
```

---

## 접근성

toolbar 유형 (`role="toolbar" aria-label="데이터 필터"` — filter-bar__bar에 적용).

| 상황 | 마크업 |
|------|--------|
| 도구 모음 컨테이너 | `role="toolbar" aria-label="데이터 필터"` — 스크린리더가 필터 영역을 랜드마크로 탐색 가능 |
| 다중 선택 드롭다운 | `aria-haspopup="listbox"` — dropdown.md 패턴 동일 |
| 날짜 범위 DRP | `aria-haspopup="dialog"` — date-range-picker.md 패턴 동일 |
| 검색 인풋 | `aria-label="이름 또는 주민등록번호 검색"` — 검색 대상 명시 |
| 지우기 버튼 | `aria-label="지우기"` |
| 검색 버튼 | `aria-label="검색"` |
| 초기화 버튼(아이콘 전용) | `aria-label="초기화"` — 텍스트 없는 단독 아이콘 버튼 필수 |

키보드 조작:

| 키 | 동작 |
|----|------|
| `Tab` / `Shift+Tab` | 필터 간 포커스 이동 |
| `Enter` / `Space` | 드롭다운·DRP 트리거 열기 |
| `↑` / `↓` | 열린 드롭다운 내 옵션 이동 — dropdown.md 패턴 |
| `Escape` | 열린 패널(드롭다운·DRP) 닫기, 트리거로 포커스 복귀 |
| `Enter` (검색 인풋) | 검색 실행 |

---

## Do / Don't

| Do | Don't |
|----|-------|
| 바 안 드롭다운은 `dropdown--ghost dropdown--multi` | "전체" 옵션 추가 — 아무것도 선택 안 한 상태가 전체 |
| 날짜 범위는 `drp__trigger--ghost`를 가진 DRP molecule로 | 바 안에 date input 또는 커스텀 패널 직접 구현 |
| 데이터 조작 버튼은 FilterBar 밖 ActionGroup으로 | 추가·수정·삭제를 FilterBar에 포함 |
| DRP 초기화는 `drp:reset` CustomEvent 디스패치로 | DRP 내부 DOM 직접 조작 |
| 필터·날짜·검색 중 1개 이상으로 구성 (검색만도 가능) | 셋 다 없는 빈 FilterBar |
| 단독 검색도 FilterBar(바 프레임 + `input--ghost`)로 통일 | 단독 검색을 일반 테두리 `input`으로 따로 만들어 시각 불일치 |
| `sm`에서는 컨트롤이 각자 테두리를 갖고 접힌다 (바 프레임을 버린다) | `sm`에서 바 프레임을 유지한 채 `flex-wrap`만 켜기 — 세로 구분선이 새 줄 첫 칸 왼쪽에 남는다 |
