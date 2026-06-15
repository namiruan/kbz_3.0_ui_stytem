---
file: components/organisms/filter-bar.md
version: 0.7.0
status: draft
depends-on: components/_index.md, accessibility.md, components/atoms/button.md, components/atoms/icon.md, components/atoms/input.md, components/atoms/tag.md, components/atoms/tooltip.md, components/molecules/dropdown.md, components/molecules/date-range-picker.md, tokens/color.md, tokens/height.md, tokens/radius.md, tokens/space.md, tokens/stroke.md
---

# FilterBar

## 개요

테이블·목록 상단에 배치하는 검색·필터 도구 모음. 단일 선택 드롭다운 필터·날짜 범위 필터·텍스트 검색을 하나의 바로 연결한다. 선택 상태는 각 드롭다운·DRP 트리거에 직접 표시되므로 별도 태그 행이 필요 없다.

ActionGroup과의 차이 — ActionGroup은 버튼 기반 액션 모음(추가·수정·삭제 등). FilterBar는 조회 조건 전용 영역으로, 데이터 조작 버튼은 포함하지 않는다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| filter | multi (기본) → `dropdown--multi`, 아무것도 선택 안 한 상태 = 전체 | multi |
| daterange | 없음 (기본) · 있음 — `.drp.drp__trigger--ghost` | 없음 |
| search | 없음 (기본) · 있음 — `.filter-bar__search` | 없음 |

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
       ├─ div.drp[data-component][data-placeholder="계약기간"][data-max-date="today"] — 날짜 범위 필터.
       │    date-range-picker.md의 `.drp` 구조 그대로 사용.
       │    trigger: button.drp__trigger.drp__trigger--ghost (border·bg 없이 bar 컨테이너 스타일 수용)
       │    panel: div.drp__panel — DRP molecule이 자체 처리 (단축·직접입력·캘린더·확인/취소 포함)
       │    초기화: 외부에서 CustomEvent('drp:reset')를 디스패치하면 DRP 내부 상태 초기화
       ├─ .filter-bar__search — div (optional). flex: 1.
       │    ├─ div.filter-bar__search-tags — 추가된 검색 칩 컨테이너. 칩이 없으면 빈 상태.
       │    │    └─ span.tag.tag--removable — 검색어 칩. tag.md removable 패턴.
       │    │         텍스트노드("홍길동") + button.icon-on--badge.icon-on--brand[aria-label="홍길동 제거"]
       │    ├─ div.input-wrap — input.md 래퍼. 값 있을 때만 input-wrap--clearable 추가 (JS).
       │    │    ├─ input.input.input--ghost[type="search"][aria-label]
       │    │    └─ button.input-clear.icon-on--badge[aria-label="지우기"][hidden] — 값 있을 때만 표시.
       │    └─ button.icon-on--md[aria-label="검색"] — 우측 검색 제출 버튼.
       │
       │    검색어 추가 흐름: input에 텍스트 입력 → Enter → span.tag.tag--removable 생성 → input 비움.
       │    × 클릭 → 해당 칩 제거. 칩과 입력값 모두 없으면 syncReset이 초기화 버튼을 숨김.
       │    네이티브 <input type="search"> 기본 X 버튼은 appearance:none으로 숨김.
       └─ button.btn.btn--ghost.btn--sm[hidden] — 초기화 버튼.

동작:
- 단일 선택 드롭다운: 옵션 클릭 → 트리거 텍스트 갱신 + 패널 닫힘. "전체" 선택 시 placeholder 클래스 복원.
- 날짜 범위: DRP molecule이 자체 처리. drp:change 이벤트로 FilterBar JS가 초기화 버튼 가시성 동기화.
- 검색: 입력 시 X 버튼 표시. Enter 또는 검색 버튼 클릭으로 실행.
- 초기화: 모든 드롭다운 "전체"로 복귀 + DRP에 drp:reset 디스패치 + 검색어 초기화.
- 초기화 버튼 가시성: 기본값(전체·날짜 없음·검색어 없음)에서 벗어난 항목이 하나라도 있으면 표시.
-->

:::preview
<div style="padding-bottom:520px">

<div data-component class="filter-bar" id="fb-main">
  <div class="filter-bar__bar">

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
    <div data-component class="drp" id="fb-drp" data-placeholder="계약기간" data-max-date="today">
      <button class="drp__trigger drp__trigger--ghost" aria-haspopup="dialog" aria-expanded="false" aria-label="계약기간 선택">
        <span class="drp__trigger-label">계약기간</span>
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
      <div class="filter-bar__search-tags" id="fb-search-tags">
        <div class="filter-bar__search-overflow-panel elevation-overlay" id="fb-search-overflow-panel" hidden></div>
      </div>
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

    <button class="btn btn--ghost btn--sm" type="button" id="fb-reset" hidden>초기화</button>
  </div>
</div>

</div>
<script>
(function() {
  var fb = stage.querySelector('.filter-bar');
  var resetBtn = fb.querySelector('#fb-reset');
  var drpEl = fb.querySelector('#fb-drp');

  /* ── DRP 초기화 ── */
  initDRP(drpEl);

  /* ── 초기화 버튼 가시성 ── */
  function syncReset() {
    var anyFilter = Array.from(fb.querySelectorAll('.dropdown')).some(function(dd) {
      return !!dd.querySelector('.dropdown__option--selected');
    });
    var dateActive   = drpEl.classList.contains('drp--active');
    var searchActive = (searchInput && searchInput.value.trim().length > 0) ||
                       searchTags.length > 0;
    resetBtn.hidden = !(anyFilter || dateActive || searchActive);
  }

  /* ── 선택값 요약 + 툴팁 업데이트 ── */
  function updateSummary(dd) {
    var sel = Array.from(dd.querySelectorAll('.dropdown__option--selected'));
    var val   = dd.querySelector('.dropdown__value');
    var count = dd.querySelector('.dropdown__count');
    var tip   = dd.querySelector('.tooltip-panel');
    if (!val) return;
    if (count) count.hidden = true; /* "외 N" 텍스트로 이미 수 표시 — 뱃지 중복 제거 */
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

  /* ── 다중 선택 드롭다운 ── */
  initDropdown(fb);

  /* 원본 placeholder 텍스트 저장 + 툴팁 hover/focus 이벤트 */
  fb.querySelectorAll('.dropdown').forEach(function(dd) {
    var val = dd.querySelector('.dropdown__value');
    if (val) dd.dataset.placeholder = val.textContent.trim();
    var trigger = dd.querySelector('.dropdown__trigger');
    var tip = dd.querySelector('.tooltip-panel');
    if (!trigger || !tip) return;
    trigger.addEventListener('mouseenter', function() {
      if (tip.textContent.trim()) tip.classList.add('tooltip-panel--visible');
    });
    trigger.addEventListener('mouseleave', function() { tip.classList.remove('tooltip-panel--visible'); });
    trigger.addEventListener('focus', function() {
      if (tip.textContent.trim()) tip.classList.add('tooltip-panel--visible');
    });
    trigger.addEventListener('blur', function() { tip.classList.remove('tooltip-panel--visible'); });
  });

  fb.querySelectorAll('.dropdown .dropdown__option').forEach(function(opt) {
    opt.addEventListener('click', function() {
      setTimeout(function() {
        var dd = opt.closest('.dropdown');
        updateSummary(dd);
        syncReset();
      }, 0);
    });
  });

  /* ── 날짜 범위 (drp:change 이벤트로 동기화) ── */
  drpEl.addEventListener('drp:change', function() {
    syncReset();
  });

  /* ── 검색 ── */
  var searchInput = fb.querySelector('#fb-search-input');
  var searchWrap  = fb.querySelector('#fb-search-wrap');
  var clearBtn    = fb.querySelector('#fb-search-clear');
  var tagsArea    = fb.querySelector('#fb-search-tags');
  var searchTags  = []; /* 검색어 배열 — DOM이 아닌 여기를 단일 소스로 관리 */

  var overflowPanel = fb.querySelector('#fb-search-overflow-panel');

  /* 오버플로 패널 — searchTags 전체를 removable 칩으로 나열 */
  function renderOverflowPanel() {
    overflowPanel.innerHTML = '';
    searchTags.forEach(function(text, idx) {
      var chip = document.createElement('span');
      chip.className = 'tag tag--removable';
      chip.innerHTML = text +
        ' <button class="icon-on--badge icon-on--brand" type="button" aria-label="' + text + ' 제거">' +
          '<svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>' +
        '</button>';
      chip.querySelector('button').addEventListener('click', function() {
        searchTags.splice(idx, 1);
        renderSearchTags();
        if (searchTags.length === 0) closeOverflow();
        syncReset();
      });
      overflowPanel.appendChild(chip);
    });
  }

  function openOverflow() {
    renderOverflowPanel();
    overflowPanel.hidden = false;
  }
  function closeOverflow() {
    overflowPanel.hidden = true;
  }

  /* 배열 기준으로 태그 영역 재렌더링 — 첫 칩 + "+N" 오버플로 버튼 */
  function renderSearchTags() {
    tagsArea.innerHTML = '';
    if (searchTags.length === 0) return;

    /* 첫 번째 칩 */
    var first = searchTags[0];
    var chip = document.createElement('span');
    chip.className = 'tag tag--removable';
    chip.innerHTML = first +
      ' <button class="icon-on--badge icon-on--brand" type="button" aria-label="' + first + ' 제거">' +
        '<svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>' +
      '</button>';
    chip.querySelector('button').addEventListener('click', function() {
      searchTags.splice(0, 1);
      renderSearchTags();
      closeOverflow();
      syncReset();
    });
    tagsArea.appendChild(chip);

    /* +N 버튼 — 클릭 시 전체 목록 패널 열기 */
    if (searchTags.length > 1) {
      var more = document.createElement('button');
      more.className = 'filter-bar__search-overflow';
      more.type = 'button';
      more.textContent = '+' + (searchTags.length - 1);
      more.setAttribute('aria-label', '검색어 ' + (searchTags.length - 1) + '개 더 보기');
      more.addEventListener('click', function(e) {
        e.stopPropagation();
        overflowPanel.hidden ? openOverflow() : closeOverflow();
      });
      tagsArea.appendChild(more);
    } else {
      closeOverflow();
    }
  }

  /* 패널 외부 클릭 시 닫기 */
  document.addEventListener('click', function(e) {
    if (!tagsArea.contains(e.target) && !overflowPanel.contains(e.target)) {
      closeOverflow();
    }
  });

  function commitSearchTag(text) {
    if (!text) return;
    searchTags.push(text);
    renderSearchTags();
    searchInput.value = '';
    clearBtn.hidden = true;
    searchWrap.classList.remove('input-wrap--clearable');
    syncReset();
  }

  searchInput.addEventListener('input', function() {
    var hasVal = !!searchInput.value;
    clearBtn.hidden = !hasVal;
    if (hasVal) searchWrap.classList.add('input-wrap--clearable');
    else searchWrap.classList.remove('input-wrap--clearable');
    syncReset();
  });
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') commitSearchTag(searchInput.value.trim());
  });
  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    clearBtn.hidden = true;
    searchWrap.classList.remove('input-wrap--clearable');
    syncReset();
  });
  fb.querySelector('#fb-search-btn').addEventListener('click', function() {
    commitSearchTag(searchInput.value.trim());
  });

  /* ── 초기화 ── */
  resetBtn.addEventListener('click', function() {
    /* 다중 선택 드롭다운 — 전체 선택 해제 */
    fb.querySelectorAll('.dropdown').forEach(function(dd) {
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
    /* 날짜 초기화 — DRP 내부 상태까지 완전 초기화 */
    drpEl.dispatchEvent(new CustomEvent('drp:reset'));
    /* 검색 초기화 */
    searchTags = [];
    renderSearchTags();
    searchInput.value = '';
    clearBtn.hidden = true;
    searchWrap.classList.remove('input-wrap--clearable');
    syncReset();
  });
})();
</script>
:::

### 제약

- 바 안 드롭다운은 `dropdown--ghost dropdown--multi`만 사용한다. 바 컨테이너가 시각 프레임을 제공한다.
- "전체" 옵션을 넣지 않는다. 아무것도 선택 안 한 상태(count 0)가 전체이다.
- 날짜 범위는 `drp__trigger--ghost`를 가진 DateRangePicker molecule로만 구현한다. 커스텀 date input 패널 직접 구현 금지.
- 데이터 조작 버튼(추가·수정·삭제 등)은 FilterBar에 포함하지 않는다. 테이블 상단 ActionGroup으로 분리한다.
- 검색 인풋은 ghost 스타일만 사용한다.

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
/* 검색어 칩 컨테이너 — 항상 한 줄, 패널 앵커 */
.filter-bar__search-tags {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--space-gap-xs);
  align-items: center;
  overflow: hidden;
  position: relative; /* 오버플로 패널 position:absolute 기준 */
}
/* "+N" 오버플로 버튼 */
.filter-bar__search-overflow {
  flex-shrink: 0;
  padding: var(--space-inset-squish-2xs);
  border-radius: var(--radius-sm);
  border: none;
  background: none;
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  white-space: nowrap;
  cursor: pointer;
}
.filter-bar__search-overflow:hover {
  color: var(--color-text-label);
  background: var(--color-action-neutral-hover);
}
/* 전체 검색어 패널 — dropdown__panel 패턴 참조 */
.filter-bar__search-overflow-panel {
  position: absolute;
  top: calc(100% + var(--space-4));
  left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-xs);
  padding: var(--space-inset-md);
  border-radius: var(--radius-md);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  background: var(--color-surface-base);
  min-width: 160px;
  max-width: 320px;
  z-index: 10;
}
/* input-wrap이 남은 공간 차지 */
.filter-bar__search .input-wrap {
  flex: 1;
  min-width: 80px;
  position: relative;
}
/* 네이티브 search X 버튼 숨김 */
.filter-bar__search .input[type="search"]::-webkit-search-cancel-button {
  display: none;
}

/* ── Reset button 보정 ── */
.filter-bar__bar > .btn {
  height: 100%;
  border-radius: 0;
  padding-inline: var(--space-inset-md);
}
```

---

## 접근성

도구 모음 유형.

| 상황 | 마크업 |
|------|--------|
| 단일 선택 드롭다운 | `aria-haspopup="listbox"` — dropdown.md 패턴 동일 |
| 날짜 범위 DRP | `aria-haspopup="dialog"` — date-range-picker.md 패턴 동일 |
| 검색 인풋 | `aria-label="이름 또는 주민등록번호 검색"` — 검색 대상 명시 |
| 지우기 버튼 | `aria-label="지우기"` |
| 검색 버튼 | `aria-label="검색"` |

---

## Do / Don't

| Do | Don't |
|----|-------|
| 바 안 드롭다운은 `dropdown--ghost` | 바 안에 `dropdown--button` 기본 border 사용 |
| "전체" 옵션에 `data-default="true"` | 기본값 처리 없이 placeholder 상태를 별도 관리 |
| 날짜 범위는 `drp__trigger--ghost`를 가진 DRP molecule로 | 바 안에 date input 또는 커스텀 패널 직접 구현 |
| 데이터 조작 버튼은 FilterBar 밖 ActionGroup으로 | 추가·수정·삭제를 FilterBar에 포함 |
| DRP 초기화는 `drp:reset` CustomEvent 디스패치로 | DRP 내부 DOM 직접 조작 |
