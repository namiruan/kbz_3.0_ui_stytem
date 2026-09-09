---
file: components/organisms/filter-bar.md
version: 0.17.0
status: draft
depends-on: components/_index.md, accessibility.md, components/atoms/button.md, components/atoms/icon.md, components/atoms/input.md, components/atoms/tooltip.md, components/atoms/calendar.md, components/molecules/dropdown.md, components/molecules/date-range-picker.md, tokens/color.md, tokens/radius.md, tokens/space.md, tokens/stroke.md, components/organisms/modal.md
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
       ├─ button.filter-bar__toggle[aria-expanded][aria-controls] — **sm 전용** 「필터」 트리거. md 이상에서는 숨는다.
  │    ├─ span.dropdown__count.filter-bar__toggle-count[hidden] — 걸린 **필터 개수**(옵션 수가 아니다). 0이면 hidden.
  │    │    뱃지 모양은 dropdown.md의 클래스가 맡는다(베끼지 않는다). BEM 쪽 클래스는 JS 훅.
  │    └─ span.dropdown__chevron — 여는 컨트롤임을 옆 칸 트리거와 **같은 기호**로 말한다. 열리면 뒤집힌다.
  ├─ div.filter-bar__sheet.modal-overlay[hidden] — 필터 시트. **modal.md 마크업 그대로.**
  │    md 이상에서는 overlay·modal·body가 display:contents가 되어 안의 컨트롤이 바의 칸으로 선다.
  │    role="dialog"·aria-modal은 **JS가 sm에서만** 붙인다(md에서는 바의 칸이라 역할이 없어야 한다).
  │    ├─ .modal__header — 제목 「필터」 + 닫기 버튼[data-fb-close]
  │    ├─ .modal__body — 드롭다운·DRP가 여기 산다(마크업의 유일한 자리다)
  │    └─ .modal__footer — [data-fb-reset] 초기화 · [data-fb-apply] 적용
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

  /* ── 필터 시트 (sm) ── */
  /* sm에서 필터 전부가 「필터」 버튼 하나 뒤로 들어간다. 마크업은 한 벌이고,
     md 이상에서는 CSS가 시트 껍데기를 display:contents로 없앤다.
     그래서 이 JS가 하는 일은 두 가지뿐이다 — 열고 닫기, 그리고 **폭에 따라 dialog 역할을 켜고 끄기.**
     역할을 그대로 두면 md에서 바 안에 열린 dialog가 하나 서 있는 셈이 되어
     스크린리더가 "대화상자"라고 읽는다. 보이는 것과 읽히는 것이 어긋나면 안 된다. */
  var toggle = container.querySelector('.filter-bar__toggle');
  var sheet  = container.querySelector('.filter-bar__sheet');
  var sheetModal = sheet ? sheet.querySelector('.modal') : null;
  var countEl = toggle ? toggle.querySelector('.filter-bar__toggle-count') : null;
  var smQuery = window.matchMedia('(max-width: 767px)');

  function activeFilterCount() {
    var n = Array.from(container.querySelectorAll('.dropdown')).filter(function(dd) {
      return !!dd.querySelector('.dropdown__option--selected');
    }).length;
    n += drpEls.filter(function(d) { return d.classList.contains('drp--active'); }).length;
    return n;
  }
  function syncCount() {
    if (!countEl) return;
    var n = activeFilterCount();
    countEl.textContent = n;
    countEl.hidden = n === 0;
  }
  function openSheet() {
    if (!sheet) return;
    sheet.hidden = false;
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    /* 뒤 목록이 같이 스크롤되면 시트를 닫고 나서 엉뚱한 자리에 있게 된다 */
    document.body.style.overflow = 'hidden';
    var first = sheet.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (first) first.focus();
  }
  function closeSheet(returnFocus) {
    if (!sheet) return;
    sheet.hidden = true;
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (returnFocus && toggle) toggle.focus();
  }
  /* 폭에 따라 dialog 역할을 켜고 끈다. md에서는 시트가 바의 칸일 뿐이라 역할이 없어야 한다. */
  function syncSheetRole() {
    if (!sheet || !sheetModal) return;
    if (smQuery.matches) {
      sheetModal.setAttribute('role', 'dialog');
      sheetModal.setAttribute('aria-modal', 'true');
      if (!sheet.hidden && toggle && toggle.getAttribute('aria-expanded') !== 'true') sheet.hidden = true;
    } else {
      sheetModal.removeAttribute('role');
      sheetModal.removeAttribute('aria-modal');
      closeSheet(false);      /* md로 넓어지면 열려 있던 시트를 닫는다(스크롤 잠금도 함께 풀린다) */
      sheet.hidden = false;   /* md에서는 바의 칸이므로 숨기지 않는다 */
    }
  }

  if (toggle && sheet) {
    toggle.addEventListener('click', function() {
      if (sheet.hidden) openSheet(); else closeSheet(true);
    });
    /* 배경(시트 바깥)을 누르면 닫는다 — 판 자체를 누른 것과 구분한다 */
    sheet.addEventListener('click', function(e) { if (e.target === sheet) closeSheet(true); });
    sheet.querySelectorAll('[data-fb-close], [data-fb-apply]').forEach(function(el) {
      el.addEventListener('click', function() { closeSheet(true); });
    });
    sheet.querySelectorAll('[data-fb-reset]').forEach(function(el) {
      el.addEventListener('click', function() { if (resetBtn) resetBtn.click(); });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !sheet.hidden && smQuery.matches) closeSheet(true);
    });
    smQuery.addEventListener('change', syncSheetRole);
    syncSheetRole();
  }

  /* 선택이 바뀔 때마다 「필터」 위의 수를 갱신한다 — 시트를 열지 않고도 걸린 것이 보여야 한다 */
  container.addEventListener('click', function() { setTimeout(syncCount, 0); });
  container.addEventListener('drp:change', syncCount);

  /* 초기 상태 동기화 */
  syncReset();
  syncCount();
}
```

:::preview
<div style="padding-bottom:520px">

<div data-component class="filter-bar" id="fb-main">
  <div class="filter-bar__bar" role="toolbar" aria-label="데이터 필터">

    <!-- sm 전용 트리거 — md 이상에서는 숨는다 -->
    <button class="filter-bar__toggle" type="button" aria-expanded="false" aria-controls="fb-main-sheet">
      필터
      <span class="dropdown__count filter-bar__toggle-count" hidden>0</span>
      <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
    </button>

    <!-- 필터 시트 — md 이상에서는 껍데기가 display:contents로 사라지고 안의 컨트롤이 바의 칸이 된다 -->
    <div class="filter-bar__sheet modal-overlay" id="fb-main-sheet" hidden>
      <div class="modal" aria-labelledby="fb-main-sheet-title">
        <div class="modal__header">
          <h2 class="modal__title text-modal-title-sm" id="fb-main-sheet-title">필터</h2>
          <button class="icon-on--md" type="button" aria-label="닫기" data-fb-close>
            <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
          </button>
        </div>
        <div class="modal__body">


        <!-- 공종 -->
        <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb-gongjong" data-placeholder="공종">
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
        <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb-status" data-placeholder="계약상태">
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
        <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb-form" data-placeholder="계약양식">
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
        </div>
        <div class="modal__footer">
          <button class="btn btn--ghost btn--md" type="button" data-fb-reset>초기화</button>
          <button class="btn btn--primary btn--md" type="button" data-fb-apply>적용</button>
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

### sm(<768px) — 바는 그대로, 필터만 시트로 들어간다

**바는 `md`와 같은 한 덩어리다.** 프레임(테두리·radius·면)도 세로 구분선도 그대로 두고, 달라지는 것은 **안에 무엇이 들어가느냐**뿐이다 — 필터들이 「필터」 버튼 뒤의 시트(Modal)로 빠지고, 바에는 **「필터」·검색·초기화 세 칸**만 남는다.

한때 `sm`에서 프레임을 버리고 컨트롤마다 테두리를 주는 안으로 만들었다가 되돌렸다 — 넘침은 사라졌지만 **같은 컴포넌트가 폭에 따라 다른 물건으로 보였다.** 폭이 바꾸는 것은 담긴 것이지 바 자신이 아니다.

- **왜 모으나** — 390px에서 컨트롤을 늘어놓으면 바가 **183px 넘친다**(실측: 드롭다운 3 + 기간 + 검색). 접어 넣어도 36px짜리 표적이 다섯 개 늘어서고, **누를 것이 많아질수록 잘못 누른다.** 표적을 하나로 모으고, 실제 선택은 넓은 시트 안에서 큰 행으로 한다(옵션 행 높이 36px, 폭 342px).
- **세 칸이면 한 줄에 들어간다** — 실측 390px에서 「필터」 58 · 검색 261 · 초기화 37, 바 358×36, 넘침 0.
- **검색은 시트에 넣지 않는다.** 목록을 좁히는 가장 잦은 행위라 한 번의 탭도 더 들이지 않는다. 「필터」와 한 줄에 나란히 선다.
- **마크업은 한 벌이다.** 시트는 Modal 마크업 그대로이고, `md` 이상에서는 그 껍데기(overlay·modal·body)를 `display: contents`로 없애 안의 컨트롤이 **바의 칸으로 그대로** 선다. 폭마다 다른 마크업을 두면 선택 상태가 두 곳에 생기고 어느 쪽이 진짜인지 갈린다 — ContentList의 칩 행에서 이미 겪었다.
- **「필터」는 옆 칸의 드롭다운 트리거와 같은 물건으로 보여야 한다.** padding·gap·글자 크기를 `.dropdown__trigger`와 같은 값으로 두고, 수 뱃지(`.dropdown__count`)와 셰브런(`.dropdown__chevron`)은 **드롭다운의 클래스를 그대로 재사용**한다. 눈대중으로 잡았던 padding 6 / gap 2가 옆 칸(8 / 4)과 어긋나 있었고, 여는 컨트롤인데 셰브런만 없었다.
- **걸린 필터 수는 버튼 위에 적는다.** 시트를 열지 않고도 "지금 걸려 있다"가 보여야 한다. 세는 단위는 **필터 개수**이지 선택한 옵션 수가 아니다(공종에서 둘을 골라도 `1`).
- **시트 안에서는 드롭다운이 열린 채로 선다.** 모달 본문이 스크롤 컨테이너라 겹쳐 뜨는 패널은 잘리고, 무엇보다 **겹치는 층을 하나 더 만들지 않는 것이 이 화면의 목적**이다. 라벨은 트리거가 아니라 `data-placeholder`가 댄다.
- **기간(DRP)만 예외다.** 달력·단축·확인/취소가 든 판이라 펼치면 시트가 통째로 달력 화면이 된다. 시트 위로 올라오는 **한 겹 더의 판**으로 띄운다 — 제 확인/취소를 갖고 있어 그 자체로 닫힌다.
- **초기화는 바의 마지막 칸으로 남는다.** 시트 푸터에도 「초기화」가 있어 표적은 둘이지만(푸터 쪽이 바의 버튼을 대신 누른다), **필터를 열지 않고 바에서 바로 되돌리는 길**을 남긴다 — 검색까지 한 번에 지우는 일은 시트 안에 있을 이유가 없다. 활성일 때만 보이므로 평소에는 자리를 먹지 않는다.
- **`role="dialog"`는 `sm`에서만 켠다.** `md`에서는 시트가 바의 칸일 뿐인데 역할을 남겨 두면 스크린리더가 "대화상자"라고 읽는다. JS가 폭에 따라 켜고 끈다.
- **순서를 바꾸지 않는다.** `order`로 검색을 위로 올리지 않는다 — 보이는 순서와 초점 순서가 어긋나면 키보드·스크린리더에서 다른 화면이 된다.
- **표적 크기 — `sm`에서도 바는 36(`--height-base`)이다.** 폭에 따라 높이를 올리지 않는다.
  - `adaptation.md`의 기준을 그대로 받는다: **단독으로 놓이는 주요 액션**은 48(`--height-loose`), **밀집 배치되는 보조 액션**은 32 이상. FilterBar는 조회 조건을 모아 둔 **보조 툴바**라 뒤쪽이고, 36은 그 하한보다 4px 위다.
  - **WCAG 2.5.8(최소 표적, AA) 24×24는 넉넉히 넘는다.** 44×44는 2.5.5(향상된 표적, **AAA**)이고 이 시스템의 기준이 아니다 — Pagination의 `sm`은 28, FileUpload 카드 액션은 32, 버튼 기본이 36이다. FilterBar만 40~44로 올리면 **바로 아래 목록·폼과 높이 축이 어긋난다.**
  - 실제로 어느 컴포넌트도 `sm`에서 컨트롤 높이를 올리지 않는다(전 문서의 `max-width: 767px` 블록을 훑어 확인했다). 여기서만 올리면 규칙이 아니라 예외가 된다.
  - **좁은 화면에서 필요한 것은 표적을 키우는 것이 아니라 표적을 줄이는 것**이라는 판단이 이 절 전체다 — 필터 다섯 개를 「필터」 하나로 모았다.
  - **대신 진짜 표적을 키웠다.** 재 보니 누르는 것은 칸(38×34)이 아니라 그 안의 `icon-on--md` **28×28**이었다 — 칸 안의 남는 여백은 눌러도 아무 일이 없다. 초기화·검색의 아이콘 버튼이 칸을 다 쓰게 해 **40×34**가 됐다(면적 2.2배). 문제는 **높이가 아니라 표적이 칸보다 작았던 것**이다.
  - **다시 볼 조건** — 44를 시스템 기준으로 삼기로 하면 `adaptation.md`에서 한 번에 바꾼다(버튼·페이지네이션·카드 액션이 함께 움직인다). FilterBar 혼자 올리지 않는다.
- 실측(390px) — 바 358×36 한 줄(테두리 1px·radius 8·흰 면 — `md`와 같은 값), 넘침 0, 문서폭 390. 시트: 390×635, 옵션 10개가 한 화면에, 「적용」으로 닫으면 포커스가 「필터」로 돌아오고 배경 스크롤 잠금이 풀린다. `Escape`·배경 탭·닫기 버튼도 같다. 1200px: 한 줄 36px에 테두리 없는 ghost 그대로.

> **필터가 하나뿐이면** 시트를 두지 않고 `md`와 같은 모양으로 두어도 된다. 표적을 줄이려고 모으는 장치라, 하나를 하나로 모으면 탭만 한 번 늘어난다.

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

/* ── 필터 시트 (sm) ── */
/* sm에서는 **검색을 뺀 필터 전부가 「필터」 버튼 하나 뒤로 들어간다.**
   390px에서 컨트롤을 늘어놓으면(드롭다운 3 + 기간 + 검색) 바가 183px 넘치고,
   접어서 넣어도 36px짜리 표적이 다섯 개가 된다 — 누를 것이 많아질수록 오터치가 는다.
   표적 하나로 모으고, 실제 선택은 넓은 모달 안에서 한다.

   **마크업은 한 벌이다.** 시트는 Modal 마크업 그대로이고, `md` 이상에서는 그 껍데기
   (overlay·modal·body)를 `display: contents`로 없애 안의 컨트롤이 바의 칸으로 그대로 선다.
   폭마다 다른 마크업을 두면 선택 상태가 두 곳에 생기고 어느 쪽이 진짜인지 갈린다
   (ContentList의 칩 행에서 겪은 그대로다). */

/* md 이상 — 시트 껍데기를 없애고 컨트롤만 바에 남긴다 */
@media (min-width: 768px) {
  .filter-bar__toggle { display: none; }
  /* `.modal-overlay`를 함께 적어 명시도를 (0,2,0)으로 올린다 — 같은 값이면
     modal CSS가 뒤에 실려 `display: flex`(고정 오버레이)가 이긴다.
     실제로 첫 렌더에서 md인데도 필터 전체가 화면 한가운데 오버레이로 떴다. */
  .filter-bar__sheet.modal-overlay,
  .filter-bar__sheet > .modal,
  .filter-bar__sheet .modal__body { display: contents; }
  .filter-bar__sheet .modal__header,
  .filter-bar__sheet .modal__footer { display: none; }
  /* 구분선 — 바의 직계 자식이 아니게 되므로 시트 안에서도 같은 선을 긋는다 */
  .filter-bar__sheet .modal__body > * + * {
    border-left: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  }
}

/* ── sm (<768px) ── */
@media (max-width: 767px) {
  /* **바는 md와 같은 한 덩어리다.** 프레임(테두리·radius·면)도 세로 구분선도 그대로 두고,
     달라지는 것은 **안에 뭐가 들어가느냐**뿐이다 — 필터들이 시트로 빠지면서
     바에는 「필터」·검색·초기화 세 칸만 남는다. 셋이면 390px에 한 줄로 들어간다
     (실측: 60 + 244 + 38). 프레임을 버리고 컨트롤마다 테두리를 주는 안도 만들어 봤지만,
     같은 컴포넌트가 폭에 따라 다른 물건으로 보였다 — 폭이 바꾸는 것은 **담긴 것**이지
     바 자신이 아니다. */

  /* 「필터」 트리거 — 바의 한 칸이고, **옆 칸의 ghost 드롭다운 트리거와 같은 물건으로 보여야 한다.**
     값을 눈대중으로 잡았더니 padding 6 / gap 2로 옆 칸(8 / 4)과 어긋났고, 여는 컨트롤인데
     셰브런이 없어 혼자 다른 종류처럼 보였다. 그래서 `.dropdown__trigger`의 값을 그대로 쓴다.
     수 뱃지와 셰브런은 **드롭다운의 클래스를 그대로 재사용**한다 — 스코프가 없는 클래스라
     그대로 적용되고, 베껴 쓰면 언젠가 값이 갈린다. */
  .filter-bar__toggle {
    display: inline-flex; align-items: center; gap: var(--space-gap-xs);
    flex: none;
    height: 100%;
    padding-inline: var(--space-inset-lg);
    border: 0; border-radius: 0;
    background: transparent;
    font-family: var(--font-family-base); font-size: var(--font-size-base);
    line-height: var(--line-height-ui);
    color: var(--color-text-body); cursor: pointer;
  }
  /* hover도 ghost 트리거와 같은 피드백 — 브랜드 링. 이 칸은 테두리가 없어 링만 남는다 */
  .filter-bar__toggle:hover { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover); }
  /* 열려 있으면 셰브런이 뒤집힌다 — 드롭다운의 `.dropdown--open`과 같은 규칙을 aria로 건다 */
  .filter-bar__toggle[aria-expanded="true"] .dropdown__chevron { transform: rotate(180deg); }

  /* 검색은 남은 자리를 쓴다 — 필터가 시트로 빠져 자리가 넉넉하다.
     min-width는 base(180px)를 그대로 쓴다. */

  /* 아이콘 버튼이 **칸을 다 쓰게** 한다. 실측해 보니 진짜 표적은 칸(38×34)이 아니라
     그 안의 `icon-on--md` **28×28**이었다 — 칸 안에서 위아래·좌우로 남는 여백은 눌러도
     아무 일이 없다. 보이는 칸이 곧 누를 수 있는 칸이어야 한다.
     칸의 padding을 버튼으로 옮기고 높이를 채워 40×34로 만든다(면적 기준 2.2배).
     바 높이(36)는 그대로다 — 높이를 올리지 않는 근거는 사용 지침 「표적 크기」 참조.
     선택자에 `.filter-bar__bar >`를 붙이는 이유: 이 sm 블록이 파일에서 base 규칙보다
     **앞**이라 같은 명시도로는 진다(첫 시도에서 그대로 38로 남았다). */
  .filter-bar__bar > .filter-bar__reset-wrap { padding-inline: 0; }
  .filter-bar__bar > .filter-bar__reset-wrap > button,
  .filter-bar__bar > .filter-bar__search > button {
    width: var(--height-spacious); height: 100%;
  }

  /* 시트 — 아래에서 올라오는 판. 화면 위쪽은 목록이 보이게 남긴다 */
  .filter-bar__sheet .modal {
    width: 100%; max-width: none; max-height: 85vh;
    margin-top: auto;
    border-end-start-radius: 0; border-end-end-radius: 0;
  }
  .filter-bar__sheet.modal-overlay { align-items: stretch; }
  .filter-bar__sheet .modal__body {
    display: block; overflow-y: auto;
    padding: 0 var(--space-inset-3xl) var(--space-inset-2xl);
  }
  .filter-bar__sheet .modal__footer { flex-shrink: 0; }

  /* 시트 안의 필터는 **열린 채로 선다.**
     ① 모달 본문이 스크롤 컨테이너라 겹쳐 뜨는 패널은 잘린다.
     ② 겹치는 층을 하나 더 만들지 않는 것이 이 화면의 목적이다 — 누를 것을 줄이려고 모은 자리다.
     라벨은 트리거가 아니라 `data-placeholder`가 댄다(마크업을 더하지 않는다). */
  .filter-bar__sheet .dropdown { display: block; }
  .filter-bar__sheet .dropdown::before {
    content: attr(data-placeholder);
    display: block;
    padding: var(--space-inset-md) 0 var(--space-inset-xs);
    font-size: var(--font-size-label); font-weight: var(--font-weight-heading);
    color: var(--color-text-label);
  }
  .filter-bar__sheet .dropdown__trigger { display: none; }
  .filter-bar__sheet .dropdown__panel {
    position: static; visibility: visible; opacity: 1; transform: none;
    /* 닫힌 패널은 pointer-events: none으로 눌리지 않게 해 둔다 — 여기서는 항상 열린 상태이므로 되돌린다.
       보이기만 하고 이걸 빠뜨리면 옵션이 눈에는 보이는데 눌리지 않는다(첫 렌더에서 그랬다). */
    pointer-events: auto;
    width: auto; min-width: 0; max-height: none;
    border: 0; border-radius: 0; box-shadow: none; overflow: visible;
  }
  .filter-bar__sheet .drp { display: block; margin-top: var(--space-16); }
  .filter-bar__sheet .drp__trigger {
    width: 100%; justify-content: space-between;
    height: var(--height-base);
    border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
    border-radius: var(--radius-sm);
  }
  /* 기간만은 열린 채로 세울 수 없다 — 달력·단축·확인/취소가 든 판이라 펼치면 시트가 달력 화면이 된다.
     대신 시트 위로 올라오는 **한 겹 더의 판**으로 띄운다. 제 확인/취소를 갖고 있어 그 자체로 닫힌다.
     그냥 두면 본문(overflow-y: auto)에 잘린다 — 실측: 패널이 y=720에서 열려 본문 바닥(733)과
     화면(800) 밖으로 나갔다. */
  .filter-bar__sheet .drp__panel {
    position: fixed;
    top: auto; right: 0; bottom: 0; left: 0;
    width: 100%; max-height: 90vh; overflow-y: auto;
    border-start-start-radius: var(--radius-lg); border-start-end-radius: var(--radius-lg);
    border-end-start-radius: 0; border-end-end-radius: 0;
    z-index: calc(var(--z-modal) + 1);
  }
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
| 「필터」 트리거(sm) | `aria-expanded` + `aria-controls`로 시트를 가리킨다 |
| 필터 시트(sm) | `role="dialog"` + `aria-modal="true"` — **sm에서만.** md에서는 바의 칸이라 JS가 역할을 뗀다 |

키보드 조작:

| 키 | 동작 |
|----|------|
| `Tab` / `Shift+Tab` | 필터 간 포커스 이동 |
| `Enter` / `Space` | 드롭다운·DRP 트리거 열기 |
| `↑` / `↓` | 열린 드롭다운 내 옵션 이동 — dropdown.md 패턴 |
| `Escape` | 열린 패널(드롭다운·DRP) 닫기, 트리거로 포커스 복귀 |
| `Enter` (검색 인풋) | 검색 실행 |
| `Escape` (sm 시트 열림) | 시트를 닫고 「필터」 트리거로 포커스 복귀 |

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
| `sm`에서 필터는 「필터」 버튼 뒤의 시트로 모은다 (표적을 줄여 오터치를 줄인다) | `sm`에서 필터를 늘어놓기 — 36px 표적이 다섯 개가 되고 바가 183px 넘친다 |
| 바 프레임은 폭과 무관하게 하나다 — `sm`에서도 테두리·radius·구분선을 그대로 둔다 | `sm`에서 프레임을 버리고 컨트롤마다 테두리 주기 — 같은 컴포넌트가 폭에 따라 다른 물건으로 보인다 |
| 검색은 시트 밖에 둔다 (가장 잦은 행위라 탭을 더 들이지 않는다) | 검색까지 시트에 넣기 |
| 시트는 Modal 마크업 한 벌, `md`에서 `display: contents`로 껍데기만 없앤다 | 폭별로 필터 마크업을 두 벌 두기 — 선택 상태가 두 곳에 생긴다 |
| 「필터」 위의 수는 **필터 개수** | 선택한 옵션 수를 적기 (공종에서 둘을 골라도 필터는 하나다) |
