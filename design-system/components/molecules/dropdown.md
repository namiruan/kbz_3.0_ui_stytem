---
file: components/molecules/dropdown.md
version: 0.2.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/height.md, tokens/typography.md, tokens/icon.md, components/atoms/input.md, components/atoms/button.md, components/atoms/icon.md
---

# Dropdown

## 개요

트리거를 클릭하면 옵션 패널이 열리는 선택 컴포넌트. 네이티브 `<select>`를 대체하며 검색·복수 선택을 지원한다.

트리거 스타일은 두 가지다. **Input형**(기본)은 폼 내 단일·복수 선택에 사용하며 FormField(Molecule)와 함께 사용한다. **Button형**(`dropdown--button`)은 필터·정렬 등 액션 컨텍스트에서 ActionGroup 안에 배치한다.

`dropdown--searchable`은 **Input형 전용** 옵션이다. 트리거가 `<button>` 대신 `<input role="combobox">`로 교체되어 트리거 입력란에서 직접 타이핑하면 옵션이 실시간으로 필터링된다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| trigger | input (기본, 클래스 없음) · button → `dropdown--button` | input |
| selection | single (기본, 클래스 없음) · multi → `dropdown--multi` | single |
| size | md (기본, 클래스 없음) · sm → `dropdown--sm` | md |
| searchable | 없음 (기본, 클래스 없음) · 있음 → `dropdown--searchable` (input형 전용) | 없음 |
| state | error → `dropdown--error` · disabled → `dropdown--disabled` | — |
| open | `dropdown--open` (JS 제어) | — |

---

## 사용 지침

### trigger 선택 기준

| 상황 | trigger |
|------|---------|
| 폼 필드 내 선택 | input (기본) — FormField와 함께 사용 |
| 페이지 상단 필터·정렬 | button — ActionGroup 또는 독립 배치 |

### selection 선택 기준

| 상황 | selection |
|------|-----------|
| 옵션 중 하나만 선택 | single (기본) |
| 여러 항목 동시 선택 | multi |

### searchable 추가 기준

옵션이 7개 이상이거나 사용자가 원하는 항목을 예측하기 어려울 때 `dropdown--searchable`을 추가한다. input형 전용이며, 트리거 자체가 combobox input으로 전환된다.

### 제약

- 옵션이 3개 이하이고 모두 항상 표시되어야 한다면 Radio 그룹을 사용한다.
- `dropdown--disabled`와 `dropdown--error`는 함께 사용하지 않는다.
- `dropdown--searchable`은 `dropdown--button`과 함께 사용하지 않는다.
- 선택값은 트리거 내부에만 표시한다. 별도 영역에 중복 표시하지 않는다.

---

## 동작

패널 열기/닫기·옵션 선택·검색은 JS로 제어한다.

| 이벤트 | 동작 |
|--------|------|
| 트리거 클릭 (비searchable) | `dropdown--open` 토글. `aria-expanded` 갱신 |
| 트리거 클릭 / 포커스 (searchable) | 패널 열림. 입력값 초기화 → 전체 옵션 표시 |
| 트리거 타이핑 (searchable) | 패널 열림 + 검색어로 옵션 실시간 필터링 |
| 외부 클릭 / blur (searchable) | 패널 닫힘. 입력값을 선택된 레이블로 복원 |
| 옵션 클릭 (single) | `dropdown__option--selected` 교체 → 트리거 텍스트(또는 입력값) 갱신 → 패널 닫힘 |
| 옵션 클릭 (multi) | `dropdown__option--selected` 토글 → 트리거 카운트 갱신. 패널 유지 |
| 검색 결과 없음 | `dropdown__empty` `hidden` 제거 |
| `Escape` | 패널 닫힘. 트리거(또는 입력)에 포커스 복귀 |
| `↑` / `↓` | 패널 내 옵션 포커스 이동 |
| `Enter` / `Space` | 포커스된 옵션 선택 (또는 트리거에서 패널 열기) |

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap;padding-bottom:260px">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">단일 선택 + 검색 (Input형)</p>
  <div style="width:200px">
    <div class="dropdown dropdown--searchable" id="demo-dd-single">
      <div class="dropdown__trigger">
        <input class="dropdown__input" type="text" role="combobox"
               aria-haspopup="listbox" aria-expanded="false"
               aria-autocomplete="list" aria-controls="dd-single-list"
               placeholder="담당자 선택" />
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </div>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" id="dd-single-list" aria-label="담당자">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">김철수</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">이영희</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">박민준</span></li>
          <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">정수빈</span></li>
        </ul>
        <div class="dropdown__empty" hidden>검색 결과가 없어요.</div>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">복수 선택 (Button형)</p>
  <div style="width:180px">
    <div class="dropdown dropdown--button dropdown--multi" id="demo-dd-multi">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태</span>
        <span class="dropdown__count" hidden aria-hidden="true"></span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="상태">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">진행 중</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">완료</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">검토 중</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">보류</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>

</div>
<script>
(function() {
  function openDD(dd) {
    dd.classList.add('dropdown--open');
    var input = dd.querySelector('.dropdown__input');
    var btn = dd.querySelector('button.dropdown__trigger');
    (input || btn).setAttribute('aria-expanded', 'true');
  }
  function closeDD(dd) {
    dd.classList.remove('dropdown--open');
    var input = dd.querySelector('.dropdown__input');
    var btn = dd.querySelector('button.dropdown__trigger');
    (input || btn).setAttribute('aria-expanded', 'false');
  }

  /* ── 단일 선택 + 검색 (combobox) ── */
  var ddS    = stage.querySelector('#demo-dd-single');
  var trigS  = ddS.querySelector('.dropdown__trigger');
  var inputS = ddS.querySelector('.dropdown__input');
  var optsS  = Array.from(ddS.querySelectorAll('.dropdown__option:not(.dropdown__option--disabled)'));
  var emptyS = ddS.querySelector('.dropdown__empty');
  var selectedLabelS = null;

  function filterS(q) {
    var any = false;
    optsS.forEach(function(o) {
      var show = !q || o.querySelector('.dropdown__option-label').textContent.toLowerCase().includes(q);
      o.hidden = !show;
      if (show) any = true;
    });
    emptyS.hidden = any;
  }

  trigS.addEventListener('click', function(e) {
    if (e.target === inputS) return; /* input 클릭은 input 이벤트로 처리 */
    if (!ddS.classList.contains('dropdown--open')) {
      openDD(ddS);
      inputS.value = '';
      filterS('');
      inputS.focus();
    }
  });

  inputS.addEventListener('focus', function() {
    if (!ddS.classList.contains('dropdown--open')) {
      openDD(ddS);
      inputS.value = '';
      filterS('');
    }
  });

  inputS.addEventListener('input', function() {
    if (!ddS.classList.contains('dropdown--open')) openDD(ddS);
    filterS(inputS.value.toLowerCase());
  });

  /* mousedown preventDefault: 옵션 클릭 시 input blur 방지 */
  optsS.forEach(function(opt) {
    opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
    opt.addEventListener('click', function() {
      optsS.forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'true');
      selectedLabelS = opt.querySelector('.dropdown__option-label').textContent;
      inputS.value = selectedLabelS;
      closeDD(ddS);
      inputS.focus();
    });
  });

  inputS.addEventListener('blur', function() {
    setTimeout(function() {
      if (!ddS.contains(document.activeElement)) {
        closeDD(ddS);
        inputS.value = selectedLabelS || '';
        filterS('');
      }
    }, 150);
  });

  ddS.addEventListener('keydown', function(e) {
    if (!ddS.classList.contains('dropdown--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDD(ddS); filterS(''); inputS.focus(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddS); inputS.value = selectedLabelS || ''; inputS.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var vis = optsS.filter(function(o) { return !o.hidden; });
      var idx = vis.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (vis[idx]) vis[idx].focus();
    } else if (e.key === 'Enter') {
      if (document.activeElement.classList.contains('dropdown__option')) document.activeElement.click();
    }
  });

  /* ── 복수 선택 ── */
  var ddM    = stage.querySelector('#demo-dd-multi');
  var trigM  = ddM.querySelector('.dropdown__trigger');
  var valM   = ddM.querySelector('.dropdown__value');
  var cntM   = ddM.querySelector('.dropdown__count');
  var optsM  = Array.from(ddM.querySelectorAll('.dropdown__option'));

  function syncMultiVal() {
    var sel = optsM.filter(function(o) { return o.classList.contains('dropdown__option--selected'); });
    if (!sel.length) {
      valM.classList.add('dropdown__value--placeholder');
      cntM.hidden = true;
      return;
    }
    valM.classList.remove('dropdown__value--placeholder');
    cntM.textContent = sel.length;
    cntM.hidden = false;
  }
  trigM.addEventListener('click', function() {
    ddM.classList.contains('dropdown--open') ? closeDD(ddM) : openDD(ddM);
  });
  optsM.forEach(function(opt) {
    opt.addEventListener('click', function() {
      var s = opt.classList.toggle('dropdown__option--selected');
      opt.setAttribute('aria-selected', s.toString());
      syncMultiVal();
    });
  });
  ddM.addEventListener('keydown', function(e) {
    if (!ddM.classList.contains('dropdown--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigM.click(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddM); trigM.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var idx = optsM.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, optsM.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (optsM[idx]) optsM[idx].focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
    }
  });

  /* ── 외부 클릭 닫기 ── */
  document.addEventListener('click', function(e) {
    if (!ddM.contains(e.target)) closeDD(ddM);
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.dropdown. trigger·selection·size·searchable·state·open 클래스를 root에 조합.
- trigger 구조는 searchable 여부에 따라 달라진다:
  - 비searchable (input형·button형): button.dropdown__trigger[type="button"][aria-haspopup="listbox"][aria-expanded]
    - 내부: span.dropdown__value (선택값 또는 placeholder) + span.dropdown__chevron (icon-chevron-down)
    - placeholder일 때 dropdown__value--placeholder 추가.
  - searchable (input형 전용): div.dropdown__trigger (시각적 래퍼)
    - 내부: input.dropdown__input[type="text"][role="combobox"][aria-haspopup="listbox"][aria-expanded][aria-autocomplete="list"][aria-controls="listbox-id"] + span.dropdown__chevron
    - placeholder는 input의 placeholder 속성. 선택 시 input.value에 레이블 기입.
    - aria-expanded는 button이 아닌 input에 설정.
- dropdown--button: button형 trigger. border-radius-sm + transparent 배경. searchable과 함께 사용 불가.
- dropdown--open: 패널 표시 + chevron 180도 회전. JS로 토글.
- panel: div.dropdown__panel. root에 dropdown--open 추가 시 표시. 항상 DOM에 존재.
  - searchable일 때 panel 안에 별도 검색 input 없음 — 트리거 input이 검색창 역할.
  - dropdown__list: ul[role="listbox"]. multi일 때 aria-multiselectable="true".
  - dropdown__option: li[role="option"][aria-selected][tabindex="-1"].
    - dropdown__option-check: span[aria-hidden="true"] > svg icon-check. 선택 시 visible. 항상 DOM에 포함.
    - dropdown__option-label: span. JS에서 textContent로 트리거 입력값 갱신에 사용.
    - 비활성: dropdown__option--disabled + aria-disabled="true". tabindex 제거.
    - 선택됨: dropdown__option--selected + aria-selected="true".
  - dropdown__empty: div[hidden]. 검색 결과 없을 때 hidden 제거.
- keyboard: Enter/Space → 패널 열기/옵션 선택. ↑↓ → 옵션 이동. Escape → 닫기 + 트리거(또는 input) 포커스.
- searchable 옵션 mousedown에 preventDefault — blur 발생 전 click을 처리하기 위한 필수 패턴.
- disabled: 비searchable은 button에 disabled+aria-disabled. searchable은 input에 disabled+aria-disabled. root에 dropdown--disabled.
-->

### 트리거 — Input형

:::preview
<div class="anatomy-grid">
<!-- 기본 (placeholder): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
      </div>
    </div>
  </div>
</div>
<!-- 선택됨: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">선택됨</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value">김철수</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value">김철수</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
      </div>
    </div>
  </div>
</div>
<!-- 검색 가능 (combobox): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">검색 가능</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm dropdown--searchable">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-sm-list-s"
                 placeholder="선택하세요" />
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox" id="anat-sm-list-s"></ul></div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--searchable">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-md-list-s"
                 placeholder="선택하세요" />
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox" id="anat-md-list-s"></ul></div>
      </div>
    </div>
  </div>
</div>
<!-- 에러: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">에러</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm dropdown--error">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" aria-invalid="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--error">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" aria-invalid="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
      </div>
    </div>
  </div>
</div>
<!-- 비활성: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">비활성</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm dropdown--disabled">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" disabled aria-disabled="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--disabled">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" disabled aria-disabled="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
      </div>
    </div>
  </div>
</div>
</div>
:::

### 트리거 — Button형

:::preview
<div class="anatomy-grid">
<!-- 기본: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
    </div>
    <div data-component class="dropdown dropdown--button" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
    </div>
  </div>
</div>
<!-- 선택됨: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">선택됨</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">진행 중</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
    </div>
    <div data-component class="dropdown dropdown--button" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">진행 중</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel"><ul class="dropdown__list" role="listbox"></ul></div>
    </div>
  </div>
</div>
<!-- 복수 선택됨: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">복수 선택됨</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--multi dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel"><ul class="dropdown__list" role="listbox" aria-multiselectable="true"></ul></div>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--multi" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel"><ul class="dropdown__list" role="listbox" aria-multiselectable="true"></ul></div>
    </div>
  </div>
</div>
</div>
:::

### 패널 — 단일 선택

:::preview
<div class="anatomy-grid" style="padding-bottom:220px">
<!-- 기본: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:160px">
      <div data-component class="dropdown dropdown--sm dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="담당자">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="담당자">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">김철수</span></li>
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">이영희</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">박민준</span></li>
            <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:200px">
      <div data-component class="dropdown dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="담당자">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="담당자">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">김철수</span></li>
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">이영희</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">박민준</span></li>
            <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- 검색 (combobox): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">검색</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:160px">
      <div data-component class="dropdown dropdown--sm dropdown--open dropdown--searchable">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="true"
                 aria-autocomplete="list" aria-controls="p-sm-search"
                 placeholder="검색" value="이" />
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" id="p-sm-search" aria-label="담당자">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">이영희</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:200px">
      <div data-component class="dropdown dropdown--open dropdown--searchable">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="true"
                 aria-autocomplete="list" aria-controls="p-md-search"
                 placeholder="검색" value="이" />
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" id="p-md-search" aria-label="담당자">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">이영희</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

### 패널 — 복수 선택

:::preview
<div class="anatomy-grid" style="padding-bottom:200px">
<!-- 복수 선택: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">복수 선택</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:160px">
      <div data-component class="dropdown dropdown--multi dropdown--sm dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
          <span class="dropdown__value">2개 선택</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="상태">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">진행 중</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">완료</span></li>
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">검토 중</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">보류</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:200px">
      <div data-component class="dropdown dropdown--multi dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
          <span class="dropdown__value">2개 선택</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="상태">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">진행 중</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">완료</span></li>
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">검토 중</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">보류</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Root ── */
.dropdown {
  position: relative;
  display: block;
}

/* ── Trigger: Input형 (기본, 비searchable) ── */
.dropdown__trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--height-base);
  padding: 0 var(--space-inset-2xl);
  gap: var(--space-gap-xs);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}
.dropdown__trigger:hover:not(:disabled) {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.dropdown--open .dropdown__trigger {
  border-color: var(--color-border-brand);
}
.dropdown__trigger:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Trigger: Button형 — secondary solid 버튼 패턴 적용 ── */
/* root를 inline-block으로 전환 — 버튼처럼 콘텐츠 너비에 맞게 */
.dropdown--button {
  display: inline-block;
}
.dropdown--button .dropdown__trigger {
  border-radius: var(--radius-pill);
  background: var(--color-surface-base);
  border-color: var(--color-border-default);   /* 기본: 그레이 라인 */
}
/* 기본 (placeholder) */
.dropdown--button .dropdown__value--placeholder { color: var(--color-fill-neutral); }
.dropdown--button .dropdown__chevron { color: var(--color-fill-neutral); margin-left: auto; }
/* value가 flex-grow하지 않도록 — count badge가 바로 옆에 붙게 */
.dropdown--button .dropdown__value { flex: 0 1 auto; }
/* 선택됨 — 라인 브랜드, 배경 브랜드 계열, 텍스트 브랜드 */
.dropdown--button .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) {
  border-color: var(--color-border-brand);
  background: var(--color-action-brand-selected);
}
.dropdown--button .dropdown__value:not(.dropdown__value--placeholder) { color: var(--color-text-brand); }
.dropdown--button .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) .dropdown__chevron {
  color: var(--color-text-brand);
}
/* hover — 기본 */
.dropdown--button .dropdown__trigger:hover:not(:disabled) {
  border-color: var(--color-border-default);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-neutral-hover);
}
/* hover — 선택됨 */
.dropdown--button .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)):hover:not(:disabled) {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
/* open */
.dropdown--button.dropdown--open .dropdown__trigger {
  background: var(--color-action-neutral-selected);
  border-color: var(--color-fill-neutral);
  box-shadow: none;
}
.dropdown--button.dropdown--open .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) {
  border-color: var(--color-border-brand);
  background: var(--color-action-brand-selected);
}

/* ── Count badge (multi 선택 수) ── */
.dropdown__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--space-16);
  height: var(--space-16);
  padding: 0 var(--space-4);
  border-radius: var(--radius-pill);
  background: var(--color-fill-brand);
  color: var(--color-text-inverse);
  font-family: var(--font-family-base);
  font-size: var(--font-size-meta);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  flex-shrink: 0;
}

/* ── Trigger: Searchable (combobox) — div 래퍼 + input ── */
/* button 대신 div를 래퍼로 사용. focus ring은 :focus-within으로 처리 */
.dropdown--searchable .dropdown__trigger {
  cursor: text;
}
.dropdown--searchable .dropdown__trigger:hover {
  border-color: var(--color-border-brand);
}
.dropdown--open.dropdown--searchable .dropdown__trigger {
  border-color: var(--color-border-brand);
}
.dropdown--searchable .dropdown__trigger:focus-within {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-color: var(--color-border-brand);
}

.dropdown__input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
  padding: 0;
}
.dropdown__input::placeholder { color: var(--color-text-subtle); }

/* ── Value (비searchable 트리거 텍스트) ── */
.dropdown__value {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-text-body);
  text-align: left;
}
.dropdown__value--placeholder { color: var(--color-text-subtle); }

/* ── Chevron ── */
.dropdown__chevron {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: var(--icon-sm);
  height: var(--icon-sm);
  color: var(--color-text-subtle);
  transition: transform 0.15s ease;
}
.dropdown__chevron svg { width: 100%; height: 100%; display: block; }
.dropdown--open .dropdown__chevron { transform: rotate(180deg); }

/* ── Panel ── */
.dropdown__panel {
  position: absolute;
  top: calc(100% + var(--space-4));
  left: 0;
  min-width: 100%;
  background: var(--color-surface-base);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transform: translateY(calc(-1 * var(--space-4)));
  pointer-events: none;
  /* 닫힐 때: opacity+transform 먼저, visibility는 지연 */
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s linear 0.15s;
}
.dropdown--open .dropdown__panel {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

/* ── List ── */
.dropdown__list {
  list-style: none;
  margin: 0;
  padding: var(--space-inset-xs) 0;
  max-height: 220px;
  overflow-y: auto;
}

/* ── Option ── */
.dropdown__option {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  height: var(--height-base);
  padding: 0 var(--space-inset-2xl);
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
  outline: none;
}
.dropdown__option:hover:not(.dropdown__option--disabled),
.dropdown__option:focus:not(.dropdown__option--disabled) {
  background: var(--color-action-neutral-hover);
}
.dropdown__option--selected {
  color: var(--color-text-brand);
  background: var(--color-action-brand-selected);
}
.dropdown__option--selected:hover:not(.dropdown__option--disabled),
.dropdown__option--selected:focus:not(.dropdown__option--disabled) {
  background: var(--color-action-brand-hover);
}
.dropdown__option--disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: default;
}

/* ── Option check (선택 표시 — 항상 공간 예약, 선택 시 표시) ── */
.dropdown__option-check {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--icon-sm);
  height: var(--icon-sm);
  color: var(--color-fill-brand);
  visibility: hidden;
}
.dropdown__option-check svg { width: 100%; height: 100%; display: block; }
.dropdown__option--selected .dropdown__option-check { visibility: visible; }
.dropdown__option--disabled .dropdown__option-check { color: var(--color-text-disabled); }

/* ── Empty state ── */
.dropdown__empty {
  padding: var(--space-inset-squish-lg);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  text-align: center;
}

/* ── Size: sm ── */
.dropdown--sm .dropdown__trigger {
  height: var(--height-compact);
  padding: 0 var(--space-inset-xl);
  font-size: var(--font-size-sm);
}
.dropdown--sm .dropdown__input { font-size: var(--font-size-sm); }
.dropdown--sm .dropdown__option {
  height: var(--height-compact);
  padding: 0 var(--space-inset-xl);
  font-size: var(--font-size-sm);
}

/* ── State: error ── */
.dropdown--error .dropdown__trigger { border-color: var(--color-border-error); }
.dropdown--error .dropdown__trigger:hover:not(:disabled) { border-color: var(--color-border-error); }

/* ── State: disabled ── */
.dropdown--disabled .dropdown__trigger {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  pointer-events: none;
  cursor: default;
}
.dropdown--disabled .dropdown__value { color: var(--color-text-disabled); }
.dropdown--disabled .dropdown__input { color: var(--color-text-disabled); }
.dropdown--disabled .dropdown__chevron { color: var(--color-text-disabled); }
```

---

## 접근성

드롭다운·컴보박스 유형 (`accessibility.md` 드롭다운 행 적용).

| 상황 | 마크업 |
|------|--------|
| 트리거 (비searchable) | `<button aria-haspopup="listbox" aria-expanded="false/true">` |
| 트리거 (searchable) | `<input role="combobox" aria-haspopup="listbox" aria-expanded aria-autocomplete="list" aria-controls="listbox-id">` |
| 패널 (single) | `<ul role="listbox">` |
| 패널 (multi) | `<ul role="listbox" aria-multiselectable="true">` |
| 옵션 | `<li role="option" aria-selected="true/false" tabindex="-1">` |
| 비활성 옵션 | `aria-disabled="true"`. tabindex 생략 |
| 트리거 레이블 | 비searchable: `aria-label` 또는 `aria-labelledby`. searchable: `aria-label` 또는 연결된 `<label for>` |
| 에러 연결 | 트리거에 `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| 키보드 | `Enter`/`Space`: 열기·선택. `↑↓`: 옵션 이동. `Escape`: 닫기 + 트리거 포커스 복귀 |
| disabled | 비searchable: button에 `disabled`+`aria-disabled`. searchable: input에 `disabled`+`aria-disabled`. root에 `dropdown--disabled` |

```js
// 키보드 핸들러 예시 (panel 내부)
panel.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { close(); trigger.focus(); }
  if (e.key === 'ArrowDown') focusNext();
  if (e.key === 'ArrowUp')   focusPrev();
  if (e.key === 'Enter' || e.key === ' ') selectFocused();
});
```

---

## Do / Don't

> ✅ DO — 트리거에 항상 접근 가능한 레이블 제공
> `<button aria-label="담당자 선택">` 또는 외부 레이블과 `aria-labelledby` 연결

> ❌ DON'T — 트리거를 `<div>` 또는 `<span>`으로 구현 (비searchable)
> 비searchable은 `<button>` 사용. searchable은 `<input role="combobox">` 사용

> ✅ DO — 검색 결과가 없으면 빈 상태 텍스트 표시
> `<div class="dropdown__empty">검색 결과가 없어요.</div>` — `hidden` 제거로 표시

> ❌ DON'T — 옵션이 3개 이하일 때 Dropdown 사용
> 모두 항상 보여야 한다면 Radio 그룹을 사용한다. Dropdown은 항목이 많아 공간이 제한될 때 사용한다

> ✅ DO — multi 선택 카운트를 트리거에 표시
> 1개 선택: 해당 레이블. 2개 이상: "N개 선택"

> ❌ DON'T — `dropdown--searchable`을 `dropdown--button`과 함께 사용
> searchable은 input형 전용이다. button형에는 검색 기능을 추가하지 않는다

> ❌ DON'T — `dropdown--disabled`와 `dropdown--error` 동시 적용
> 비활성 상태에서는 에러를 표시하지 않는다
