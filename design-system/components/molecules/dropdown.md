---
file: components/molecules/dropdown.md
version: 0.3.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/height.md, tokens/typography.md, tokens/icon.md, components/atoms/button.md, components/atoms/icon.md
---

# Dropdown

## 개요

선택 전용 목록 선택기. 트리거를 클릭하면 listbox 패널이 열리고 항목을 선택한다. 텍스트 입력이 없으며 목록에서만 고른다.

트리거 스타일은 두 가지다. **Input형**(기본)은 폼 내 단일·복수 선택에 사용하며 FormField(Molecule)와 함께 사용한다. **Button형**(`dropdown--button`)은 필터·정렬 등 액션 컨텍스트에서 ActionGroup 안에 배치한다.

검색·타이핑이 필요하면 이 컴포넌트가 아닌 **Combobox**를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| trigger | input (기본, 클래스 없음) · button → `dropdown--button` | input |
| selection | single (기본, 클래스 없음) · multi → `dropdown--multi` | single |
| size | md (기본, 클래스 없음) · sm → `dropdown--sm` | md |
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

### 제약

- 옵션이 3개 이하이고 모두 항상 표시되어야 한다면 Radio 그룹을 사용한다.
- `dropdown--disabled`와 `dropdown--error`는 함께 사용하지 않는다.
- 선택값은 트리거 내부에만 표시한다. 별도 영역에 중복 표시하지 않는다.
- 검색·타이핑이 필요하면 Combobox를 사용한다.

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| 트리거 클릭 | `dropdown--open` 토글, `aria-expanded` 갱신 |
| 외부 클릭 | 패널 닫힘 |
| 옵션 클릭 (single) | `dropdown__option--selected` 교체 → 트리거 텍스트 갱신 → 패널 닫힘 |
| 옵션 클릭 (multi) | `dropdown__option--selected` 토글 → 트리거 카운트 갱신. 패널 유지 |
| `Escape` | 패널 닫힘. 트리거에 포커스 복귀 |
| `↑` / `↓` | 패널 내 옵션 포커스 이동 |
| `Enter` / `Space` | 포커스된 옵션 선택 (또는 트리거에서 패널 열기) |

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap;padding-bottom:260px">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">단일 선택 (Input형)</p>
  <div style="width:200px">
    <div class="dropdown" id="demo-dd-single">
      <button class="dropdown__trigger" type="button"
              aria-haspopup="listbox" aria-expanded="false"
              aria-controls="dd-single-list" aria-label="담당자 선택">
        <span class="dropdown__value dropdown__value--placeholder">담당자 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" id="dd-single-list" aria-label="담당자">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">김철수</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">이영희</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">박민준</span></li>
          <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="dropdown__option-label">정수빈</span></li>
        </ul>
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
    dd.querySelector('.dropdown__trigger').setAttribute('aria-expanded', 'true');
  }
  function closeDD(dd) {
    dd.classList.remove('dropdown--open');
    dd.querySelector('.dropdown__trigger').setAttribute('aria-expanded', 'false');
  }

  /* ── 단일 선택 ── */
  var ddS   = stage.querySelector('#demo-dd-single');
  var trigS = ddS.querySelector('.dropdown__trigger');
  var valS  = ddS.querySelector('.dropdown__value');
  var optsS = Array.from(ddS.querySelectorAll('.dropdown__option:not(.dropdown__option--disabled)'));

  trigS.addEventListener('click', function() {
    ddS.classList.contains('dropdown--open') ? closeDD(ddS) : openDD(ddS);
  });
  optsS.forEach(function(opt) {
    opt.addEventListener('click', function() {
      optsS.forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'true');
      valS.textContent = opt.querySelector('.dropdown__option-label').textContent;
      valS.classList.remove('dropdown__value--placeholder');
      closeDD(ddS);
      trigS.focus();
    });
  });
  ddS.addEventListener('keydown', function(e) {
    if (!ddS.classList.contains('dropdown--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDD(ddS); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddS); trigS.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var idx = optsS.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, optsS.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (optsS[idx]) optsS[idx].focus();
    } else if (e.key === 'Enter') {
      if (document.activeElement.classList.contains('dropdown__option')) document.activeElement.click();
    }
  });

  /* ── 복수 선택 ── */
  var ddM   = stage.querySelector('#demo-dd-multi');
  var trigM = ddM.querySelector('.dropdown__trigger');
  var valM  = ddM.querySelector('.dropdown__value');
  var cntM  = ddM.querySelector('.dropdown__count');
  var optsM = Array.from(ddM.querySelectorAll('.dropdown__option'));

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
    if (!ddS.contains(e.target)) closeDD(ddS);
    if (!ddM.contains(e.target)) closeDD(ddM);
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.dropdown. trigger·selection·size·state·open 클래스를 root에 조합.
- trigger 구조:
  - Input형 (기본): button.dropdown__trigger[type="button"][aria-haspopup="listbox"][aria-expanded][aria-controls="listbox-id"][aria-label]
    - 내부: span.dropdown__value (선택값 또는 placeholder) + span.dropdown__chevron
    - placeholder일 때 dropdown__value--placeholder 추가.
  - Button형 (dropdown--button): 동일 button 구조. border-radius pill + transparent 배경.
    - multi 선택 수: span.dropdown__count (hidden 기본, 선택 시 표시).
- dropdown--open: 패널 표시 + chevron 180도 회전. JS로 토글.
- panel: div.dropdown__panel. root에 dropdown--open 추가 시 표시. 항상 DOM에 존재.
  - dropdown__list: ul[role="listbox"]. multi일 때 aria-multiselectable="true".
  - dropdown__option: li[role="option"][aria-selected][tabindex="-1"].
    - dropdown__option-check: span[aria-hidden="true"] > svg icon-check. 선택 시 visible. 항상 DOM에 포함.
    - dropdown__option-label: span. JS에서 textContent로 트리거 텍스트 갱신에 사용.
    - 비활성: dropdown__option--disabled + aria-disabled="true". tabindex 제거.
    - 선택됨: dropdown__option--selected + aria-selected="true".
- keyboard: Enter/Space → 패널 열기/옵션 선택. ↑↓ → 옵션 이동. Escape → 닫기 + 트리거 포커스.
- disabled: button에 disabled+aria-disabled="true"+tabindex="-1". root에 dropdown--disabled.
-->

### 트리거 — Input형

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">선택됨</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value">김철수</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value">김철수</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">에러</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm dropdown--error">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" aria-invalid="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--error">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" aria-invalid="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">비활성</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm dropdown--disabled">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" disabled aria-disabled="true" tabindex="-1">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--disabled">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" disabled aria-disabled="true" tabindex="-1">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</div>
</div>
:::

### 트리거 — Button형

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">선택됨</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">진행 중</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">진행 중</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">복수 선택됨</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--multi dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--multi" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">열림</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm dropdown--open" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--open" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
</div>
:::

### 패널 — 단일 선택

:::preview
<div class="anatomy-grid" style="padding-bottom:220px">
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
</div>
:::

### 패널 — 복수 선택

:::preview
<div class="anatomy-grid" style="padding-bottom:200px">
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

/* ── Trigger: Input형 (기본) ── */
.dropdown__trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--height-base);
  padding: 0 var(--space-inset-lg);
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
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
/* 선택됨 — 브랜드 테두리 + 글자색 */
.dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) {
  border-color: var(--color-border-brand);
}
.dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) .dropdown__value {
  color: var(--color-text-brand);
}
.dropdown--open .dropdown__trigger {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.dropdown__trigger:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Trigger: Button형 ── */
.dropdown--button {
  display: inline-block;
}
.dropdown--button .dropdown__trigger {
  border-radius: var(--radius-pill);
  background: var(--color-surface-base);
  border-color: var(--color-border-default);
}
.dropdown--button .dropdown__value--placeholder { color: var(--color-fill-neutral); }
.dropdown--button .dropdown__chevron { color: var(--color-fill-neutral); margin-left: auto; }
.dropdown--button .dropdown__value { flex: 0 1 auto; }
.dropdown--button .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) {
  border-color: var(--color-border-brand-subtle);
  background: var(--color-action-brand-selected);
}
.dropdown--button .dropdown__value:not(.dropdown__value--placeholder) { color: var(--color-text-brand); }
.dropdown--button .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) .dropdown__chevron {
  color: var(--color-text-brand);
}
.dropdown--button .dropdown__trigger:hover:not(:disabled) {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.dropdown--button.dropdown--open .dropdown__trigger {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
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

/* ── Value ── */
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
  padding: 0 var(--space-inset-lg);
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

/* ── Option check ── */
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

/* ── Size: sm ── */
.dropdown--sm .dropdown__trigger { height: var(--height-compact); font-size: var(--font-size-sm); }
.dropdown--sm .dropdown__option { height: var(--height-compact); font-size: var(--font-size-sm); }

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
.dropdown--disabled .dropdown__chevron { color: var(--color-text-disabled); }
```

---

## 접근성

드롭다운 유형 (`accessibility.md` 드롭다운 행 적용).

| 상황 | 마크업 |
|------|--------|
| 트리거 | `<button type="button" aria-haspopup="listbox" aria-expanded="false/true" aria-controls="listbox-id" aria-label="레이블">` |
| 패널 (single) | `<ul role="listbox">` |
| 패널 (multi) | `<ul role="listbox" aria-multiselectable="true">` |
| 옵션 | `<li role="option" aria-selected="true/false" tabindex="-1">` |
| 비활성 옵션 | `aria-disabled="true"`. tabindex 생략 |
| 에러 연결 | 트리거에 `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| disabled | 트리거에 `disabled` + `aria-disabled="true"` + `tabindex="-1"`. root에 `dropdown--disabled` |

```js
dropdown.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') open();
  if (e.key === 'Escape')                 close();
  if (e.key === 'ArrowDown')              focusNext();
  if (e.key === 'ArrowUp')               focusPrev();
});
```

---

## Do / Don't

> ✅ DO — 트리거에 항상 접근 가능한 레이블 제공
> `<button aria-label="담당자 선택">` 또는 외부 레이블과 `aria-labelledby` 연결

> ❌ DON'T — 트리거에 `<div>` 또는 `<input>` 사용
> 검색이 필요하면 이 컴포넌트가 아닌 Combobox를 사용한다

> ✅ DO — multi 선택 카운트를 트리거에 표시
> 1개 선택: 해당 레이블. 2개 이상: `N` 배지 표시

> ❌ DON'T — 옵션이 3개 이하일 때 Dropdown 사용
> 항상 보여야 한다면 Radio 그룹을 사용한다

> ❌ DON'T — `dropdown--disabled`와 `dropdown--error` 동시 적용
> 비활성 상태에서는 에러를 표시하지 않는다
